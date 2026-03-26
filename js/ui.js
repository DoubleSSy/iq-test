// js/ui.js

const UI = {

  // ── Экраны ────────────────────────────────────────────────

  showScreen(id, direction = 'right') {
    const screens = document.querySelectorAll('.screen');
    const target = document.getElementById(id);
    if (!target) return;

    screens.forEach(s => {
      if (s.classList.contains('active') && s !== target) {
        const cls = direction === 'right' ? 'slide-out-left' : 'slide-out-right';
        s.classList.add(cls);
        setTimeout(() => {
          s.classList.remove('active', 'slide-out-left', 'slide-out-right');
          s.style.opacity = '0';
          s.style.pointerEvents = 'none';
          s.style.transform = 'translateX(60px)';
        }, 300);
      }
    });

    // Clear any inline styles left from a previous hide operation
    target.style.opacity = '';
    target.style.pointerEvents = '';
    target.style.transform = '';

    const inCls = direction === 'right' ? 'slide-in-right' : 'slide-in-left';
    target.classList.add('active', inCls);
    target.scrollTop = 0;
    setTimeout(() => target.classList.remove('slide-in-right', 'slide-in-left'), 300);
  },

  // ── SVG фигуры ─────────────────────────────────────────────

  COLORS: {
    red:    '#f87171',
    blue:   '#60a5fa',
    green:  '#4ade80',
    yellow: '#fbbf24',
    purple: '#c084fc',
    orange: '#fb923c'
  },

  drawShape(shape, color, size = 'medium', svgSize = 60, outlined = false) {
    const c = this.COLORS[color] || color;
    const cx = svgSize / 2, cy = svgSize / 2;
    const r = size === 'large'  ? svgSize * 0.38 :
              size === 'small'  ? svgSize * 0.19 :
                                  svgSize * 0.28;
    const fill = outlined ? 'none' : c;
    const stroke = outlined ? `stroke="${c}" stroke-width="3"` : '';

    let path = '';
    if (shape === 'circle') {
      path = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${stroke}/>`;
    } else if (shape === 'square') {
      path = `<rect x="${cx-r}" y="${cy-r}" width="${r*2}" height="${r*2}" fill="${fill}" rx="4" ${stroke}/>`;
    } else if (shape === 'triangle') {
      const pts = `${cx},${cy-r} ${cx+r*1.1},${cy+r*0.85} ${cx-r*1.1},${cy+r*0.85}`;
      path = `<polygon points="${pts}" fill="${fill}" ${stroke}/>`;
    } else if (shape === 'diamond') {
      const pts = `${cx},${cy-r} ${cx+r},${cy} ${cx},${cy+r} ${cx-r},${cy}`;
      path = `<polygon points="${pts}" fill="${fill}" ${stroke}/>`;
    } else if (shape === 'pentagon') {
      const pts = [0,1,2,3,4].map(i => {
        const a = (i * 2 * Math.PI / 5) - Math.PI / 2;
        return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
      }).join(' ');
      path = `<polygon points="${pts}" fill="${fill}" ${stroke}/>`;
    } else if (shape === 'cross') {
      const t = r * 0.35;
      path = `<path d="M${cx-t},${cy-r} L${cx+t},${cy-r} L${cx+t},${cy-t} L${cx+r},${cy-t} L${cx+r},${cy+t} L${cx+t},${cy+t} L${cx+t},${cy+r} L${cx-t},${cy+r} L${cx-t},${cy+t} L${cx-r},${cy+t} L${cx-r},${cy-t} L${cx-t},${cy-t} Z" fill="${fill}" ${stroke}/>`;
    }

    return `<svg viewBox="0 0 ${svgSize} ${svgSize}" width="${svgSize}" height="${svgSize}" xmlns="http://www.w3.org/2000/svg">${path}</svg>`;
  },

  renderMatrix(grid) {
    let html = '<div class="matrix-grid">';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = grid[i][j];
        if (!cell) {
          html += '<div class="matrix-cell matrix-cell--missing"><span class="q-mark">?</span></div>';
        } else {
          html += `<div class="matrix-cell">${this.drawShape(cell.shape, cell.color, cell.size || 'medium', 60, cell.outlined || false)}</div>`;
        }
      }
    }
    html += '</div>';
    return html;
  },

  // ── Рендер вопроса ─────────────────────────────────────────

  renderQuestion(q, index, total) {
    const cat = CATEGORIES[q.type];

    // Категория-тег
    const catEl = document.getElementById('question-category');
    catEl.innerHTML = `<span class="q-cat-icon">${cat.icon}</span> <span style="color:${cat.color}">${cat.name}</span>`;

    document.getElementById('question-counter').textContent = `${index + 1} / ${total}`;
    document.getElementById('category-meta').textContent = cat.name;

    // Текст
    document.getElementById('question-text').innerHTML = q.text.replace(/\n/g, '<br>');

    // Визуал
    const visualEl = document.getElementById('question-visual');
    if (q.type === 'matrix' && q.grid) {
      visualEl.innerHTML = this.renderMatrix(q.grid);
      visualEl.style.display = 'flex';
    } else {
      visualEl.innerHTML = '';
      visualEl.style.display = 'none';
    }

    // Варианты
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    const labels = ['A', 'B', 'C', 'D'];

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.dataset.index = i;

      if (q.type === 'matrix' && typeof opt === 'object') {
        btn.classList.add('option-btn--shape');
        btn.innerHTML = `<span class="opt-letter">${labels[i]}</span>
                         <span class="opt-shape-svg">${this.drawShape(opt.shape, opt.color, opt.size || 'medium', 44, opt.outlined || false)}</span>`;
      } else {
        btn.innerHTML = `<span class="opt-letter">${labels[i]}</span>
                         <span class="opt-text">${opt}</span>`;
      }
      grid.appendChild(btn);
    });

    // Прогресс
    document.getElementById('progress-fill').style.width = `${(index / total) * 100}%`;

    // Кнопка Далее
    const btnNext = document.getElementById('btn-next');
    btnNext.disabled = true;
    btnNext.classList.remove('btn-next--ready');
  },

  markAnswer(selectedIdx, correctIdx) {
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true);

    if (selectedIdx >= 0) {
      btns[selectedIdx].classList.add(
        selectedIdx === correctIdx ? 'option-btn--correct' : 'option-btn--wrong'
      );
    }
    if (selectedIdx !== correctIdx) {
      btns[correctIdx].classList.add('option-btn--correct');
    }
  },

  enableNext() {
    const btn = document.getElementById('btn-next');
    btn.disabled = false;
    btn.classList.add('btn-next--ready');
  },

  updateTimer(remaining, total) {
    const textEl = document.getElementById('timer-text');
    const arc    = document.getElementById('timer-arc');
    if (!textEl || !arc) return;

    textEl.textContent = remaining;
    const circ = 2 * Math.PI * 16; // r=16
    const pct = remaining / total;
    arc.style.strokeDasharray  = circ;
    arc.style.strokeDashoffset = circ * (1 - pct);

    // Цвет
    const col = pct > 0.5 ? 'var(--green)' : pct > 0.25 ? 'var(--amber)' : 'var(--red)';
    arc.style.stroke = col;
    textEl.style.color = pct <= 0.25 ? 'var(--red)' : 'var(--text-2)';
  },

  // ── Экран анализа ──────────────────────────────────────────

  startAnalyzing(cb) {
    const steps = ['step1','step2','step3','step4'];
    const prog  = document.getElementById('analyze-progress');
    let i = 0;
    steps.forEach(id => document.getElementById(id)?.classList.remove('step--done'));
    if (prog) prog.style.width = '0%';

    const iv = setInterval(() => {
      if (i < steps.length) {
        document.getElementById(steps[i])?.classList.add('step--done');
        if (prog) prog.style.width = `${(i + 1) / steps.length * 100}%`;
        i++;
      } else {
        clearInterval(iv);
        setTimeout(cb, 500);
      }
    }, 800);
  },

  // ── Результаты ─────────────────────────────────────────────

  renderResults(iq, age, catScores, savedBest) {
    const cat  = RESULTS.getCategory(iq);
    const pct  = RESULTS.getPercentile(iq);
    const desc = RESULTS.getDescription(iq, age);
    const isBest = !savedBest || iq > savedBest;

    // Анимация IQ
    this.animateNumber(document.getElementById('iq-score'), 0, iq, 1400);

    // Категория и звёзды
    document.getElementById('result-category').innerHTML =
      `<span style="color:${cat.color}">${cat.title}</span>`;
    document.getElementById('result-stars').textContent =
      '★'.repeat(cat.stars) + '☆'.repeat(5 - cat.stars);
    document.getElementById('result-pct').textContent =
      `Вы умнее ${pct}% людей`;

    const recEl = document.getElementById('result-record');
    if (isBest && savedBest) {
      recEl.innerHTML = '<span class="result-new-record">🎉 Новый рекорд!</span>';
    } else {
      recEl.innerHTML = '';
    }

    document.getElementById('result-desc').textContent = desc;

    // Bars
    const barsEl = document.getElementById('breakdown-bars');
    barsEl.innerHTML = '';
    ['sequence','logic','verbal','matrix','spatial'].forEach(type => {
      const score = catScores[type] || 0;
      const info  = CATEGORIES[type];
      barsEl.innerHTML += `
        <div class="bar-row">
          <div class="bar-label">${info.icon} ${RESULTS.abilityName(type)}</div>
          <div class="bar-track">
            <div class="bar-fill" style="background:${info.color}" data-w="${score/5*100}"></div>
          </div>
          <div class="bar-val">${score}/5</div>
        </div>`;
    });
    // Задержка для анимации
    setTimeout(() => {
      document.querySelectorAll('.bar-fill').forEach(el => {
        el.style.width = el.dataset.w + '%';
      });
    }, 200);
  },

  renderLeaderboard(entries, userIQ) {
    const containers = ['leaderboard-entries', 'leaderboard-full-list'];
    const medals = ['🥇','🥈','🥉'];

    containers.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      if (!entries || !entries.length) {
        el.innerHTML = '<div class="lb-loading">Нет данных</div>';
        return;
      }

      const limit = id === 'leaderboard-entries' ? 5 : entries.length;
      let html = '';

      entries.slice(0, limit).forEach((e, i) => {
        const medal = medals[i] || '';
        html += `<div class="lb-row">
          ${medal ? `<span class="lb-medal">${medal}</span>` : `<span class="lb-rank">${e.rank || i+1}</span>`}
          <span class="lb-name">${e.name}</span>
          <span class="lb-score">${e.score} IQ</span>
        </div>`;
      });

      if (userIQ && id === 'leaderboard-full-list') {
        html += `<div class="lb-user-row">Ваш результат: <b style="color:var(--accent)">${userIQ} IQ</b></div>`;
      }
      el.innerHTML = html;
    });
  },

  animateNumber(el, from, to, ms) {
    const start = performance.now();
    const tick = now => {
      const t = Math.min((now - start) / ms, 1);
      el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },

  setBestScore(iq) {
    const el = document.getElementById('best-score-display');
    if (!el) return;
    el.innerHTML = iq
      ? `<div class="best-result-pill">🏅 &nbsp;Лучший результат: <b>${iq} IQ</b></div>`
      : '';
  },

  showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
  },

  showShareView(iq) {
    const cat = RESULTS.getCategory(iq);
    const pct = RESULTS.getPercentile(iq);
    document.getElementById('share-iq').textContent = iq;
    document.getElementById('share-category').innerHTML = `<span style="color:${cat.color}">${cat.title}</span>`;
    document.getElementById('share-stars').textContent = '★'.repeat(cat.stars) + '☆'.repeat(5 - cat.stars);
    document.getElementById('share-pct').textContent = `Умнее ${pct}% людей`;
    this.showScreen('screen-share-view');
  },

  updateAgeHint(age) {
    const map = [
      [12, 'Когнитивные способности активно формируются'],
      [18, 'Отличное время для интеллектуального роста'],
      [25, 'Пик скорости обработки информации'],
      [35, 'Зрелое аналитическое мышление'],
      [50, 'Опыт усиливает интеллект'],
      [70, 'Богатый опыт — ваш главный ресурс']
    ];
    let hint = map[map.length - 1][1];
    for (const [maxAge, text] of map) {
      if (age <= maxAge) { hint = text; break; }
    }
    const el = document.getElementById('age-hint');
    if (el) el.textContent = `${age} лет — ${hint}`;
  }
};
