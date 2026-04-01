// js/sdk.js
// Обёртка над Яндекс Games SDK с graceful fallback для локального тестирования

const SDK = {
  ysdk: null,
  player: null,
  isReady: false,

  // Стартовые «заглушки» — вытесняются реальными игроками
  _SEED_ENTRIES: [
    { name: 'Алексей М.',  score: 148 },
    { name: 'Светлана К.', score: 143 },
    { name: 'Дмитрий Р.',  score: 138 },
    { name: 'Ирина В.',    score: 135 },
    { name: 'Сергей Н.',   score: 131 },
    { name: 'Наталья П.',  score: 128 },
    { name: 'Михаил Т.',   score: 126 },
    { name: 'Екатерина С.',score: 123 },
    { name: 'Андрей Л.',   score: 120 },
    { name: 'Ольга В.',    score: 118 }
  ],

  async init() {
    try {
      this.ysdk = await YaGames.init();
      this.isReady = true;
      console.log('[SDK] Яндекс SDK инициализирован');

      try {
        this.player = await this.ysdk.getPlayer({ scopes: false });
        console.log('[SDK] Игрок загружен, авторизован:', this.player.isAuthorized());
      } catch (e) {
        console.warn('[SDK] Не удалось загрузить игрока:', e);
      }

      this._showBanner();

      // Обработка паузы/возобновления от платформы (реклама, переключение вкладки)
      this.ysdk.on('game_api_pause', () => {
        if (this._onPause) this._onPause();
        if (window.gameAudio) window.gameAudio.pause();
      });
      this.ysdk.on('game_api_resume', () => {
        if (this._onResume) this._onResume();
        if (window.gameAudio) window.gameAudio.play();
      });

      document.addEventListener('visibilitychange', () => {
        if (window.gameAudio) {
          if (document.hidden) window.gameAudio.pause();
          else window.gameAudio.play();
        }
      });

    } catch (e) {
      console.warn('[SDK] Яндекс SDK недоступен (локальный режим):', e);
      this.isReady = false;
    }
  },

  // ── Игровые события (обязательные для Яндекс) ────────────

  gameReady() {
    if (!this.ysdk || !this.isReady) return;
    try { this.ysdk.features.LoadingAPI?.ready(); } catch(e) {}
    console.log('[SDK] LoadingAPI.ready()');
  },

  gameplayStart() {
    if (this.ysdk && this.isReady) {
      try { this.ysdk.features.GameplayAPI?.start(); } catch(e) {}
    }
    console.log('[SDK] GameplayAPI.start()');
  },

  gameplayStop() {
    if (this.ysdk && this.isReady) {
      try { this.ysdk.features.GameplayAPI?.stop(); } catch(e) {}
    }
    console.log('[SDK] GameplayAPI.stop()');
  },

  // Коллбэки паузы/возобновления (устанавливаются из Quiz)
  _onPause: null,
  _onResume: null,

  onPause(fn) { this._onPause = fn; },
  onResume(fn) { this._onResume = fn; },

  // ── Данные игрока ──────────────────────────────────────────

  async saveData(data) {
    // Всегда сохраняем в localStorage (для лидерборда)
    try {
      const existing = this._loadLocalData();
      const merged = { ...existing, ...data };
      localStorage.setItem('iq_game_data', JSON.stringify(merged));
    } catch(e) {}

    if (!this.player) return;
    try {
      await this.player.setData(data);
      await this.player.setStats({ bestIQ: data.bestIQ || 0 });
    } catch (e) {
      console.warn('[SDK] Ошибка сохранения:', e);
    }
  },

  async loadData() {
    if (!this.player) {
      return this._loadLocalData();
    }
    try {
      const data = await this.player.getData(['bestIQ', 'gamesPlayed', 'lastAge', 'nickname']);
      // Синхронизируем с localStorage
      if (data && data.bestIQ) {
        const local = this._loadLocalData();
        if (!local.bestIQ || data.bestIQ > local.bestIQ) {
          localStorage.setItem('iq_game_data', JSON.stringify({ ...local, ...data }));
        }
      }
      return data || {};
    } catch (e) {
      console.warn('[SDK] Ошибка загрузки:', e);
      return this._loadLocalData();
    }
  },

  _loadLocalData() {
    try {
      const raw = localStorage.getItem('iq_game_data');
      return raw ? JSON.parse(raw) : {};
    } catch(e) { return {}; }
  },

  // ── Авторизация ────────────────────────────────────────────

  async authorize() {
    if (!this.ysdk || !this.isReady) return false;
    if (this.player && this.player.isAuthorized()) return true;
    try {
      await this.ysdk.auth.openAuthDialog();
      this.player = await this.ysdk.getPlayer({ scopes: false });
      return this.player.isAuthorized();
    } catch (e) {
      return false;
    }
  },

  // ── Реклама ────────────────────────────────────────────────

  _showBanner() {
    if (!this.ysdk || !this.isReady) return;
    try {
      this.ysdk.adv.getBannerAdvStatus().then(({ stickyAdvIsShowing }) => {
        if (!stickyAdvIsShowing) this.ysdk.adv.showBannerAdv();
      }).catch(() => {});
    } catch(e) {}
  },

  hideBanner() {
    if (!this.ysdk || !this.isReady) return;
    try { this.ysdk.adv.hideBannerAdv(); } catch(e) {}
  },

  showBanner() {
    if (!this.ysdk || !this.isReady) return;
    try { this.ysdk.adv.showBannerAdv(); } catch(e) {}
  },

  showFullscreenAd(callbacks = {}) {
    if (!this.ysdk || !this.isReady) {
      setTimeout(() => {
        if (callbacks.onClose) callbacks.onClose(false);
      }, 500);
      return;
    }
    try {
      this.ysdk.adv.showFullscreenAdv({
        callbacks: {
          onOpen:  () => { if (callbacks.onOpen)  callbacks.onOpen(); },
          onClose: (wasShown) => { if (callbacks.onClose) callbacks.onClose(wasShown); },
          onError: (e) => {
            console.warn('[SDK] Ошибка рекламы:', e);
            if (callbacks.onClose) callbacks.onClose(false);
          }
        }
      });
    } catch(e) {
      if (callbacks.onClose) callbacks.onClose(false);
    }
  },

  // ── Таблица лидеров ────────────────────────────────────────

  // Сохранить результат в лидерборд (localStorage + Яндекс если авторизован)
  async setLeaderboardScore(iq, nickname) {
    // Всегда сохраняем локально
    this._saveLocalLeaderboardEntry(iq, nickname);

    if (!this.ysdk || !this.isReady || !this.player || !this.player.isAuthorized()) return;
    try {
      await this.ysdk.leaderboards.setScore('iq_score', iq);
    } catch(e) {
      console.warn('[SDK] Ошибка лидерборда:', e);
    }
  },

  // Сохраняет запись в локальный лидерборд (до 50 записей)
  _saveLocalLeaderboardEntry(iq, nickname) {
    try {
      const name = (nickname || 'Игрок').trim() || 'Игрок';
      const entries = this._loadLocalLeaderboard();
      const ts = Date.now();

      // Ищем существующую запись с тем же именем — обновляем только если лучше
      const existingIdx = entries.findIndex(e => e.name === name && e.real);
      if (existingIdx >= 0) {
        if (iq > entries[existingIdx].score) {
          entries[existingIdx].score = iq;
          entries[existingIdx].ts = ts;
        }
      } else {
        entries.push({ name, score: iq, real: true, ts });
      }

      // Сортируем по убыванию, оставляем топ-50
      entries.sort((a, b) => b.score - a.score || b.ts - a.ts);
      const top50 = entries.slice(0, 50);
      localStorage.setItem('iq_leaderboard', JSON.stringify(top50));
    } catch(e) {}
  },

  _loadLocalLeaderboard() {
    try {
      const raw = localStorage.getItem('iq_leaderboard');
      return raw ? JSON.parse(raw) : [];
    } catch(e) { return []; }
  },

  // Получить итоговый лидерборд: реальные + заглушки (только если мест меньше 10)
  async getLeaderboardEntries() {
    // Пробуем Яндекс-лидерборд если есть SDK
    if (this.ysdk && this.isReady) {
      try {
        const data = await this.ysdk.leaderboards.getEntries('iq_score', {
          quantityTop: 10,
          includeUser: true,
          quantityAround: 3
        });
        const yandexEntries = data.entries.map(e => ({
          rank:  e.rank,
          name:  e.player.publicName || 'Аноним',
          score: e.score,
          real:  true
        }));
        // Доливаем локальные которых нет в Яндекс
        return this._mergeWithLocal(yandexEntries);
      } catch(e) {
        console.warn('[SDK] Ошибка получения лидерборда Яндекс:', e);
      }
    }

    // Локальный режим: реальные игроки + заглушки
    return this._buildLocalLeaderboard();
  },

  _buildLocalLeaderboard() {
    const real = this._loadLocalLeaderboard();
    const all = [...real];

    // Добавляем заглушки чтобы всегда было 10 записей
    for (const seed of this._SEED_ENTRIES) {
      if (all.length >= 10) break;
      // Не добавляем если реальный игрок с таким именем уже есть
      if (!all.some(e => e.name === seed.name)) {
        all.push({ name: seed.name, score: seed.score, real: false });
      }
    }

    // Сортируем и присваиваем ранги
    all.sort((a, b) => b.score - a.score);
    return all.slice(0, 10).map((e, i) => ({ ...e, rank: i + 1 }));
  },

  _mergeWithLocal(yandexEntries) {
    const local = this._loadLocalLeaderboard();
    const combined = [...yandexEntries];

    // Добавляем локальных которых нет в Яндекс (по имени)
    for (const le of local) {
      if (!combined.some(e => e.name === le.name)) {
        combined.push(le);
      }
    }

    combined.sort((a, b) => b.score - a.score);
    return combined.slice(0, 10).map((e, i) => ({ ...e, rank: i + 1 }));
  },

  // ── Оценка и ярлык ─────────────────────────────────────────

  async tryRequestReview() {
    if (!this.ysdk || !this.isReady) return;
    try {
      const { value } = await this.ysdk.feedback.canReview();
      if (value) {
        await this.ysdk.feedback.requestReview();
      }
    } catch(e) {
      console.warn('[SDK] Ошибка requestReview:', e);
    }
  },

  async tryShowShortcutPrompt() {
    if (!this.ysdk || !this.isReady) return;
    try {
      const prompt = await this.ysdk.shortcut.canShowPrompt();
      if (prompt.canShow) {
        await this.ysdk.shortcut.showPrompt();
      }
    } catch(e) {
      console.warn('[SDK] Ошибка shortcut:', e);
    }
  },

  isAuthorized() {
    return !!(this.player && this.player.isAuthorized());
  },

  // Имя игрока
  getPlayerName() {
    if (this.player && this.player.isAuthorized()) {
      return this.player.getName() || null;
    }
    return null;
  }
};
