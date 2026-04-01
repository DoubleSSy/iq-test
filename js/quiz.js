// js/quiz.js
// Логика теста: таймер, переходы, подсчёт очков

const Quiz = {

  // ── Состояние ─────────────────────────────────────────────
  state: {
    questions: [],       // перетасованный массив вопросов
    currentIndex: 0,
    answers: [],         // { questionId, type, selected, correct, timeSpent }
    age: 25,
    timerInterval: null,
    nextTimeout: null,
    timeLeft: 40,
    minTimeLeft: 40,     // минимальное время до появления кнопки "Далее" (будет отсчитывать от 40)
    MIN_DISPLAY_TIME: 2, // секунд минимум до активации кнопок ответа
    QUESTION_TIME: 40,   // секунд на вопрос
    MIN_NEXT_UNLOCK: 33, // кнопка "Далее" появляется когда таймер = 33, т.е. прошло 7 секунд
    answered: false,
    selectedOption: -1,
    startTime: null,
    questionStartTime: null
  },

  // ── Инициализация нового теста ────────────────────────────

  startNew(age, nickname) {
    this.state.age = age;
    this.state.nickname = nickname || 'Игрок';
    this.state.currentIndex = 0;
    this.state.answers = [];
    this.state.finished = false;
    this.state.startTime = Date.now();

    // Перетасовать вопросы внутри каждой категории, сохраняя нарастание сложности
    this.state.questions = this._shuffleQuestions(QUESTIONS);

    // Уведомляем SDK о начале геймплея
    SDK.gameplayStart();

    // Обработка паузы/возобновления от платформы (реклама, вкладка)
    SDK.onPause(() => this._pauseTimer());
    SDK.onResume(() => this._resumeTimer());

    this.loadQuestion(0);
  },

  _shuffleQuestions(qs) {
    const byType = {};
    qs.forEach(q => {
      if (!byType[q.type]) byType[q.type] = [];
      byType[q.type].push({...q});
    });
    const result = [];
    const types = ['sequence', 'logic', 'verbal', 'matrix', 'spatial'];
    types.forEach(type => {
      const arr = byType[type] || [];
      // Fisher-Yates shuffle
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      // Берём первые 5, сортируем по сложности (лёгкие → сложные)
      arr.slice(0, 5).sort((a, b) => a.difficulty - b.difficulty).forEach(q => result.push(q));
    });
    return result;
  },

  // ── Загрузка вопроса ──────────────────────────────────────

  loadQuestion(index) {
    const q = this.state.questions[index];
    if (!q) { this.finish(); return; }

    this.state.answered      = false;
    this.state.selectedOption = -1;
    this.state.timeLeft       = this.state.QUESTION_TIME;
    this.state.questionStartTime = Date.now();

    // Рендер
    UI.renderQuestion(q, index, this.state.questions.length);
    UI.updateTimer(this.state.timeLeft, this.state.QUESTION_TIME);

    // Заблокировать кнопки ответа на MIN_DISPLAY_TIME секунд
    const optBtns = document.querySelectorAll('.option-btn');
    optBtns.forEach(btn => btn.disabled = true);
    document.getElementById('btn-next').disabled = true;

    // Разблокировать варианты после минимального времени
    clearTimeout(this._unlockTimeout);
    this._unlockTimeout = setTimeout(() => {
      if (!this.state.answered) {
        document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = false);
      }
    }, this.state.MIN_DISPLAY_TIME * 1000);

    // Запуск таймера
    this._startTimer();

    // Навешиваем обработчики ответов
    this._bindOptions();
    this._bindNext();
  },

  _bindOptions() {
    document.querySelectorAll('.option-btn').forEach(btn => {
      // Удаляем старые листенеры через замену ноды (clone)
      const fresh = btn.cloneNode(true);
      btn.parentNode.replaceChild(fresh, btn);
      fresh.addEventListener('click', () => {
        if (this.state.answered) return;
        this._handleAnswer(parseInt(fresh.dataset.index));
      });
    });
  },

  _bindNext() {
    const btn = document.getElementById('btn-next');
    const fresh = btn.cloneNode(true);
    btn.parentNode.replaceChild(fresh, btn);
    fresh.addEventListener('click', () => {
      if (!fresh.disabled) this._goNext();
    });
  },

  // ── Обработка ответа ──────────────────────────────────────

  _handleAnswer(selectedIndex) {
    if (this.state.answered) return;
    this.state.answered = true;
    this.state.selectedOption = selectedIndex;

    const q = this.state.questions[this.state.currentIndex];
    const isCorrect = selectedIndex === q.correct;
    const timeSpent = Math.round((Date.now() - this.state.questionStartTime) / 1000);

    this.state.answers.push({
      questionId: q.id,
      type:       q.type,
      selected:   selectedIndex,
      correct:    isCorrect,
      timeSpent
    });

    UI.markAnswer(selectedIndex, q.correct);

    // Разблокировать "Далее" только после MIN_NEXT_UNLOCK — остаток таймера
    // Или сразу если таймер уже ниже порога
    if (this.state.timeLeft <= this.state.MIN_NEXT_UNLOCK) {
      UI.enableNext();
    }
    // Иначе enableNext сработает когда таймер достигнет MIN_NEXT_UNLOCK
    // (обрабатывается в _tick)
  },

  // ── Таймер ────────────────────────────────────────────────

  _startTimer() {
    clearInterval(this.state.timerInterval);
    this.state.timeLeft = this.state.QUESTION_TIME;
    this.state.paused = false;

    this.state.timerInterval = setInterval(() => this._tick(), 1000);
  },

  _pauseTimer() {
    if (this.state.paused || this.state.finished) return;
    this.state.paused = true;
    clearInterval(this.state.timerInterval);
  },

  _resumeTimer() {
    if (!this.state.paused || this.state.finished) return;
    this.state.paused = false;
    this.state.timerInterval = setInterval(() => this._tick(), 1000);
  },

  _tick() {
    this.state.timeLeft--;
    UI.updateTimer(this.state.timeLeft, this.state.QUESTION_TIME);

    // Разблокировать "Далее" когда таймер достиг порога (если уже ответили)
    if (this.state.answered && this.state.timeLeft <= this.state.MIN_NEXT_UNLOCK) {
      UI.enableNext();
    }

    // Время вышло — автоматически переходим к следующему
    if (this.state.timeLeft <= 0) {
      clearInterval(this.state.timerInterval);
      if (!this.state.answered) {
        // Засчитать как неправильный
        const q = this.state.questions[this.state.currentIndex];
        this.state.answers.push({
          questionId: q.id,
          type:       q.type,
          selected:   -1,
          correct:    false,
          timeSpent:  this.state.QUESTION_TIME
        });
        UI.markAnswer(-1, q.correct);
      }
      // Автопереход через 1.5 сек
      this._autoNextTimeout = setTimeout(() => this._goNext(), 1500);
    }
  },

  // ── Следующий вопрос ──────────────────────────────────────

  _goNext() {
    clearInterval(this.state.timerInterval);
    this.state.currentIndex++;

    if (this.state.currentIndex >= this.state.questions.length) {
      this.finish();
    } else {
      // Небольшая анимация перехода
      const card = document.getElementById('question-card');
      if (card) {
        card.classList.add('exit');
        setTimeout(() => {
          card.classList.remove('exit');
          this.loadQuestion(this.state.currentIndex);
        }, 300);
      } else {
        this.loadQuestion(this.state.currentIndex);
      }
    }
  },

  // ── Завершение теста ──────────────────────────────────────

  finish() {
    if (this.state.finished) return;
    this.state.finished = true;
    clearInterval(this.state.timerInterval);
    clearTimeout(this._unlockTimeout);
    clearTimeout(this._autoNextTimeout);

    // Уведомляем SDK об окончании геймплея
    SDK.gameplayStop();
    SDK.onPause(null);
    SDK.onResume(null);

    // Показываем экран анализа
    UI.showScreen('screen-analyzing', 'right');
    SDK.hideBanner();

    // Показываем fullscreen рекламу пока идёт анализ
    SDK.showFullscreenAd({
      onClose: () => {
        // Анализ — 4 шага × 900 мс = 3.6 сек
        UI.startAnalyzing(() => {
          this._showResults();
        });
      }
    });
  },

  _showResults() {
    const correct = this.state.answers.filter(a => a.correct).length;
    const iq = RESULTS.calculate(correct, this.state.questions.length, this.state.age);
    const categoryScores = RESULTS.categoryScores(this.state.answers);

    // Показать экран НЕМЕДЛЕННО — не ждать async-операций
    UI.showScreen('screen-results', 'right');
    SDK.showBanner();
    UI.renderResults(iq, this.state.age, categoryScores, null);
    this.state.lastIQ = iq;

    // Сохранение и лидерборд — в фоне
    SDK.loadData().then(saved => {
      const bestIQ = saved.bestIQ || 0;
      SDK.saveData({
        bestIQ:      Math.max(bestIQ, iq),
        gamesPlayed: (saved.gamesPlayed || 0) + 1,
        lastAge:     this.state.age,
        nickname:    this.state.nickname
      });
      SDK.setLeaderboardScore(iq, this.state.nickname);
      // Обновить индикатор рекорда
      if (iq > bestIQ) {
        const el = document.getElementById('result-record');
        if (el) el.innerHTML = '<span class="result-new-record">🎉 Новый рекорд!</span>';
      }
    }).catch(() => {});

    SDK.getLeaderboardEntries().then(entries => {
      UI.renderLeaderboard(entries, iq);
    }).catch(() => {});

    // Через 3 сек предложить оценить игру, через 10 сек — ярлык
    setTimeout(() => SDK.tryRequestReview(), 3000);
    setTimeout(() => SDK.tryShowShortcutPrompt(), 10000);
  },

  getLastIQ() {
    return this.state.lastIQ || null;
  }
};
