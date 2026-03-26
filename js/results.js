// js/results.js
// Расчёт IQ с нормализацией по возрасту и описание категорий

const RESULTS = {

  // Рассчитывает IQ на основе правильных ответов и возраста
  calculate(correctAnswers, totalQuestions, age) {
    const rawPercent = correctAnswers / totalQuestions; // 0..1

    // Базовый IQ по проценту правильных ответов (нелинейная шкала)
    let baseIQ;
    if      (rawPercent >= 0.96) baseIQ = 145;
    else if (rawPercent >= 0.88) baseIQ = 135;
    else if (rawPercent >= 0.80) baseIQ = 125;
    else if (rawPercent >= 0.70) baseIQ = 115;
    else if (rawPercent >= 0.58) baseIQ = 105;
    else if (rawPercent >= 0.46) baseIQ = 95;
    else if (rawPercent >= 0.34) baseIQ = 85;
    else if (rawPercent >= 0.22) baseIQ = 78;
    else                          baseIQ = 70;

    // Возрастная поправка (IQ-тесты нормируются по возрастным группам)
    let ageAdj = 0;
    if      (age >= 10 && age <= 14) ageAdj = +5;
    else if (age >= 15 && age <= 19) ageAdj = +3;
    else if (age >= 20 && age <= 34) ageAdj =  0;
    else if (age >= 35 && age <= 49) ageAdj = -2;
    else if (age >= 50 && age <= 64) ageAdj = -4;
    else if (age >= 65)              ageAdj = -6;

    // Небольшая псевдослучайная вариабельность (±2) — реалистичность
    const noise = Math.floor(Math.random() * 5) - 2;

    const finalIQ = Math.min(160, Math.max(65, baseIQ + ageAdj + noise));
    return finalIQ;
  },

  // Балл по каждой категории (0-5 правильных)
  categoryScores(answers) {
    const types = ['sequence','logic','verbal','matrix','spatial'];
    const scores = {};
    types.forEach(t => { scores[t] = 0; });

    answers.forEach(a => {
      if (a.correct && a.type) scores[a.type] = (scores[a.type] || 0) + 1;
    });
    return scores; // { sequence: 3, logic: 4, ... }
  },

  // Описание категории результата
  getCategory(iq) {
    if      (iq >= 150) return { title: 'Исключительный интеллект', stars: 5, color: '#f39c12' };
    else if (iq >= 140) return { title: 'Одарённость',              stars: 5, color: '#e67e22' };
    else if (iq >= 130) return { title: 'Очень высокий интеллект',  stars: 4, color: '#9b59b6' };
    else if (iq >= 120) return { title: 'Высокий интеллект',        stars: 4, color: '#3498db' };
    else if (iq >= 110) return { title: 'Хороший интеллект',        stars: 3, color: '#2ecc71' };
    else if (iq >= 100) return { title: 'Выше среднего',            stars: 3, color: '#27ae60' };
    else if (iq >= 90)  return { title: 'Средний уровень',          stars: 2, color: '#95a5a6' };
    else if (iq >= 80)  return { title: 'Ниже среднего',            stars: 2, color: '#7f8c8d' };
    else                return { title: 'Требует развития',          stars: 1, color: '#bdc3c7' };
  },

  // Развёрнутое описание по IQ
  getDescription(iq, age) {
    const ageNote = age < 18
      ? `В вашем возрасте (${age} лет) когнитивные способности продолжают активно развиваться.`
      : age > 55
      ? `Для вашего возраста (${age} лет) результат особенно значим — опыт дополняет интеллект.`
      : '';

    if (iq >= 140) {
      return `Ваш IQ входит в топ 0.4% населения Земли. Вы обладаете исключительными способностями к абстрактному мышлению, системному анализу и быстрому решению сложных задач. ${ageNote}`;
    } else if (iq >= 130) {
      return `Ваш IQ входит в топ 2% населения. Вы демонстрируете выдающиеся способности к логическому мышлению и обнаружению паттернов. ${ageNote}`;
    } else if (iq >= 120) {
      return `Ваш IQ входит в топ 9% населения. Вы обладаете отличными аналитическими способностями и склонностью к системному мышлению. ${ageNote}`;
    } else if (iq >= 110) {
      return `Ваш IQ выше среднего — вы входите в топ 25%. Хорошие способности к логике, анализу и быстрому обучению. ${ageNote}`;
    } else if (iq >= 100) {
      return `Ваш IQ соответствует среднестатистическому уровню — это норма для большинства людей. Вы справляетесь с повседневными интеллектуальными задачами уверенно. ${ageNote}`;
    } else if (iq >= 90) {
      return `Ваш IQ немного ниже среднего. Регулярные упражнения на логику, чтение и решение задач помогут улучшить результат. ${ageNote}`;
    } else {
      return `Ваш результат говорит о том, что есть зоны роста. Практикуйте математику, логические пазлы и чтение — это значительно повышает когнитивные способности. ${ageNote}`;
    }
  },

  // Процент людей с более низким IQ (для мотивации)
  getPercentile(iq) {
    // Нормальное распределение IQ (среднее 100, СО 15)
    const table = [
      {iq:70,pct:2},{iq:75,pct:5},{iq:80,pct:9},{iq:85,pct:16},
      {iq:90,pct:25},{iq:95,pct:37},{iq:100,pct:50},{iq:105,pct:63},
      {iq:110,pct:75},{iq:115,pct:84},{iq:120,pct:91},{iq:125,pct:95},
      {iq:130,pct:98},{iq:135,pct:99},{iq:140,pct:99.6},{iq:145,pct:99.9}
    ];
    let pct = 50;
    for (let i = 0; i < table.length - 1; i++) {
      if (iq >= table[i].iq && iq <= table[i+1].iq) {
        const t = (iq - table[i].iq) / (table[i+1].iq - table[i].iq);
        pct = table[i].pct + t * (table[i+1].pct - table[i].pct);
        break;
      }
    }
    if (iq > 145) pct = 99.9;
    if (iq < 70)  pct = 2;
    return Math.round(pct);
  },

  // Название способности по категории вопроса
  abilityName(type) {
    const map = {
      sequence: 'Числовое мышление',
      logic:    'Логика и анализ',
      verbal:   'Вербальные способности',
      matrix:   'Абстрактное мышление',
      spatial:  'Пространственный интеллект'
    };
    return map[type] || type;
  }
};
