// js/main.js

(async function () {

  UI.showScreen('screen-loading');

  await SDK.init();

  // ── Режим просмотра чужого результата (#share/NNN) ────────
  const shareMatch = location.hash.match(/^#share\/(\d+)$/);
  if (shareMatch) {
    const sharedIQ = parseInt(shareMatch[1]);
    if (sharedIQ >= 60 && sharedIQ <= 160) {
      UI.showShareView(sharedIQ);
      document.getElementById('btn-share-start').addEventListener('click', () => {
        history.replaceState(null, '', location.pathname);
        location.reload();
      });
      return;
    }
  }

  const savedData    = await SDK.loadData();
  let currentAge     = Math.max(10, Math.min(90, savedData.lastAge || 25));
  let currentNickname = savedData.nickname || '';

  UI.setBestScore(savedData.bestIQ || null);
  document.getElementById('age-value').textContent = currentAge;
  UI.updateAgeHint(currentAge);

  UI.showScreen('screen-welcome', 'right');

  // ── Главная ───────────────────────────────────────────────

  document.getElementById('btn-start').addEventListener('click', () => {
    UI.showScreen('screen-age', 'right');
  });

  document.getElementById('btn-leaderboard').addEventListener('click', async () => {
    UI.showScreen('screen-leaderboard', 'right');
    await loadLeaderboard();
  });

  // ── Возраст ───────────────────────────────────────────────

  function setAge(val) {
    currentAge = Math.max(10, Math.min(90, val));
    document.getElementById('age-value').textContent = currentAge;
    UI.updateAgeHint(currentAge);
  }

  document.getElementById('age-minus').addEventListener('click', () => setAge(currentAge - 1));
  document.getElementById('age-plus').addEventListener('click',  () => setAge(currentAge + 1));

  let _ty = 0;
  const ageEl = document.getElementById('age-value');
  ageEl.addEventListener('touchstart', e => { _ty = e.touches[0].clientY; });
  ageEl.addEventListener('touchmove', e => {
    e.preventDefault();
    const dy = _ty - e.touches[0].clientY;
    if (Math.abs(dy) > 8) { setAge(currentAge + (dy > 0 ? 1 : -1)); _ty = e.touches[0].clientY; }
  }, { passive: false });

  document.getElementById('btn-age-next').addEventListener('click', () => {
    UI.showScreen('screen-nickname', 'right');
    initNicknameScreen();
  });

  // ── Никнейм ── (листенеры вешаются один раз) ─────────────

  const nicknameInput = document.getElementById('nickname-input');
  const nicknameHint  = document.getElementById('nickname-hint');
  const btnNicknameNext = document.getElementById('btn-nickname-next');
  const btnNicknameSkip = document.getElementById('btn-nickname-skip');

  function validateNickname() {
    const len = nicknameInput.value.trim().length;
    if (len === 0) {
      nicknameHint.textContent = 'от 2 до 20 символов';
      nicknameHint.style.color = '';
      btnNicknameNext.disabled = true;
    } else if (len < 2) {
      nicknameHint.textContent = 'слишком короткое имя';
      nicknameHint.style.color = 'var(--red)';
      btnNicknameNext.disabled = true;
    } else {
      nicknameHint.textContent = `${len} / 20`;
      nicknameHint.style.color = 'var(--text-2)';
      btnNicknameNext.disabled = false;
    }
  }

  nicknameInput.addEventListener('input', () => {
    validateNickname();
  });

  btnNicknameNext.addEventListener('click', () => {
    currentNickname = nicknameInput.value.trim();
    proceedToInstructions();
  });

  btnNicknameSkip.addEventListener('click', () => {
    currentNickname = SDK.getPlayerName() || 'Игрок';
    proceedToInstructions();
  });

  // Вызывается при каждом входе на экран никнейма
  function initNicknameScreen() {
    nicknameInput.value = currentNickname;
    validateNickname();
    nicknameInput.focus();
  }

  // ── Инструкция ────────────────────────────────────────────

  function proceedToInstructions() {
    UI.showScreen('screen-instructions', 'right');
    startCountdown();
  }

  let _cdInterval = null;

  function startCountdown() {
    clearInterval(_cdInterval);
    let n = 5;
    const numEl   = document.getElementById('countdown-num');
    const fillEl  = document.getElementById('countdown-fill');
    const startBtn = document.getElementById('btn-instructions-start');

    if (numEl) numEl.parentElement.style.display = '';
    startBtn.disabled = true;
    startBtn.textContent = 'Начать тест';
    if (numEl)  numEl.textContent = n;
    if (fillEl) fillEl.style.width = '100%';

    _cdInterval = setInterval(() => {
      n--;
      if (numEl)  numEl.textContent = n;
      if (fillEl) fillEl.style.width = `${(n / 5) * 100}%`;
      if (n <= 0) {
        clearInterval(_cdInterval);
        startBtn.disabled = false;
        startBtn.textContent = '▶  Начать тест';
        if (numEl) numEl.parentElement.style.display = 'none';
      }
    }, 1000);
  }

  document.getElementById('btn-instructions-start').addEventListener('click', () => {
    clearInterval(_cdInterval);
    UI.showScreen('screen-quiz', 'right');
    SDK.hideBanner();
    Quiz.startNew(currentAge, currentNickname);
  });

  // ── Результаты ────────────────────────────────────────────

  document.getElementById('btn-retry').addEventListener('click', () => {
    UI.showScreen('screen-age', 'left');
    setAge(currentAge);
    const numEl = document.getElementById('countdown-num');
    if (numEl) numEl.parentElement.style.display = '';
  });

  document.getElementById('btn-share').addEventListener('click', () => {
    const iq = Quiz.getLastIQ();
    if (!iq) return;
    const url = `${location.origin}${location.pathname}#share/${iq}`;

    function copyFallback() {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url)
          .then(() => UI.showToast('Ссылка скопирована!'))
          .catch(() => UI.showToast('Ссылка: ' + url));
      } else {
        UI.showToast('Ссылка: ' + url);
      }
    }

    if (navigator.share) {
      navigator.share({ title: `Мой IQ: ${iq}`, text: `Я прошёл IQ-тест и набрал ${iq} баллов! Пройди и ты →`, url })
        .catch(() => copyFallback());
    } else {
      copyFallback();
    }
  });

  document.getElementById('btn-leaderboard-full').addEventListener('click', async () => {
    UI.showScreen('screen-leaderboard', 'right');
    await loadLeaderboard();
  });

  // ── Лидерборд ─────────────────────────────────────────────

  async function loadLeaderboard() {
    const listEl = document.getElementById('leaderboard-full-list');
    if (listEl) listEl.innerHTML = '<div class="lb-loading">Загрузка...</div>';
    const entries = await SDK.getLeaderboardEntries();
    UI.renderLeaderboard(entries, Quiz.getLastIQ());
  }

  document.getElementById('btn-back-from-leaderboard').addEventListener('click', async () => {
    UI.showScreen('screen-welcome', 'left');
    const data = await SDK.loadData();
    UI.setBestScore(data.bestIQ || null);
  });

})();
