// js/questions.js — 25 сложных вопросов для IQ-теста

const CATEGORIES = {
  sequence: { name: 'Числовые ряды',    icon: '∑', color: '#818cf8' },
  logic:    { name: 'Логика',           icon: '⊢', color: '#c084fc' },
  verbal:   { name: 'Аналогии',         icon: 'A→', color: '#34d399' },
  matrix:   { name: 'Паттерны',         icon: '⬡', color: '#fb923c' },
  spatial:  { name: 'Пространство',     icon: '◈', color: '#f472b6' }
};

const QUESTIONS = [

  // ─── ЧИСЛОВЫЕ РЯДЫ ────────────────────────────────────────
  {
    id: 1, type: 'sequence', difficulty: 3,
    text: 'Найдите следующее число в ряду:\n\n3 · 7 · 15 · 31 · 63 · <b>?</b>',
    options: ['A: 94', 'B: 115', 'C: 127', 'D: 131'],
    correct: 2,
    explanation: 'Правило: aₙ = 2·aₙ₋₁ + 1. Значит: 63×2+1 = 127'
  },
  {
    id: 2, type: 'sequence', difficulty: 3,
    text: 'Найдите следующее число в ряду:\n\n2 · 6 · 12 · 20 · 30 · 42 · <b>?</b>',
    options: ['A: 52', 'B: 54', 'C: 56', 'D: 60'],
    correct: 2,
    explanation: 'Формула: n(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, 6×7, 7×8=56'
  },
  {
    id: 3, type: 'sequence', difficulty: 4,
    text: 'Найдите следующее число в ряду:\n\n1 · 3 · 8 · 21 · 55 · <b>?</b>',
    options: ['A: 89', 'B: 120', 'C: 133', 'D: 144'],
    correct: 3,
    explanation: 'Каждое число — чётный член последовательности Фибоначчи: F₂=1, F₄=3, F₆=8, F₈=21, F₁₀=55, F₁₂=144'
  },
  {
    id: 4, type: 'sequence', difficulty: 4,
    text: 'Найдите следующее число в ряду:\n\n4 · 9 · 25 · 49 · 121 · <b>?</b>',
    options: ['A: 144', 'B: 169', 'C: 196', 'D: 225'],
    correct: 1,
    explanation: 'Квадраты простых чисел: 2²=4, 3²=9, 5²=25, 7²=49, 11²=121, 13²=169'
  },
  {
    id: 5, type: 'sequence', difficulty: 5,
    text: 'Найдите следующее число в ряду:\n\n2 · 12 · 36 · 80 · 150 · <b>?</b>',
    options: ['A: 216', 'B: 240', 'C: 252', 'D: 294'],
    correct: 2,
    explanation: 'Формула: n²(n+1): 1²×2=2, 2²×3=12, 3²×4=36, 4²×5=80, 5²×6=150, 6²×7=252'
  },

  // ─── ЛОГИКА ───────────────────────────────────────────────
  {
    id: 6, type: 'logic', difficulty: 3,
    text: 'Если идёт дождь — асфальт мокрый.\nАсфальт сухой.\n\nЧто из этого следует?',
    options: ['A: Дождь не идёт', 'B: Дождь идёт', 'C: Возможно, дождь', 'D: Ничего не следует'],
    correct: 0,
    explanation: 'Modus tollens: «если P→Q, то ¬Q→¬P». Сухой асфальт → дождя нет'
  },
  {
    id: 7, type: 'logic', difficulty: 3,
    text: 'Два поезда движутся навстречу друг другу.\nРасстояние — 360 км.\nПервый едет 80 км/ч, второй — 100 км/ч.\n\nЧерез сколько часов они встретятся?',
    options: ['A: 1,5 ч', 'B: 2 ч', 'C: 2,5 ч', 'D: 3 ч'],
    correct: 1,
    explanation: 'Суммарная скорость сближения: 80+100=180 км/ч. Время: 360÷180=2 часа'
  },
  {
    id: 8, type: 'logic', difficulty: 4,
    text: 'В группе 40 студентов.\n25 учат английский язык.\n20 учат немецкий язык.\n\nКаков минимально возможный\nчисленность изучающих оба языка?',
    options: ['A: 0', 'B: 5', 'C: 10', 'D: 15'],
    correct: 1,
    explanation: '25 + 20 − 40 = 5. Это минимум по принципу включений-исключений'
  },
  {
    id: 9, type: 'logic', difficulty: 4,
    text: 'Три друга (Антон, Борис, Виктор) занимаются шахматами, теннисом и футболом — каждый одним видом.\n\n• Антон не играет в шахматы\n• Борис не играет в теннис\n• Виктор не играет в шахматы и не в теннис\n\nКто играет в шахматы?',
    options: ['A: Антон', 'B: Борис', 'C: Виктор', 'D: Невозможно определить'],
    correct: 1,
    explanation: 'Виктор → только футбол. Антон → не шахматы, не футбол → теннис. Борис → шахматы'
  },
  {
    id: 10, type: 'logic', difficulty: 5,
    text: 'Три ящика подписаны: «Яблоки», «Апельсины», «Яблоки и апельсины». Все подписи неправильные.\n\nОткрыли ящик «Яблоки и апельсины» — там апельсин.\n\nЧто лежит в ящике «Яблоки»?',
    options: ['A: Яблоки', 'B: Яблоки и апельсины', 'C: Апельсины', 'D: Пусто'],
    correct: 1,
    explanation: '«Яблоки и апельсины» → только апельсины. «Апельсины» → не апельсины, значит яблоки (единственный оставшийся вариант). «Яблоки» → яблоки и апельсины'
  },

  // ─── АНАЛОГИИ ─────────────────────────────────────────────
  {
    id: 11, type: 'verbal', difficulty: 3,
    text: 'Опытный : Новичок\n=\nВершина : <b>?</b>',
    options: ['A: Гора', 'B: Подножие', 'C: Склон', 'D: Пик'],
    correct: 1,
    explanation: 'Опытный — противоположность новичка, вершина — противоположность подножия (антонимы)'
  },
  {
    id: 12, type: 'verbal', difficulty: 3,
    text: 'Симфония : Дирижёр\n=\nСпектакль : <b>?</b>',
    options: ['A: Актёр', 'B: Сценарист', 'C: Режиссёр', 'D: Суфлёр'],
    correct: 2,
    explanation: 'Дирижёр управляет симфонией, режиссёр — спектаклем (руководитель : произведение)'
  },
  {
    id: 13, type: 'verbal', difficulty: 4,
    text: 'Алфавит : Буква\n=\nПериодическая таблица : <b>?</b>',
    options: ['A: Металл', 'B: Атом', 'C: Элемент', 'D: Молекула'],
    correct: 2,
    explanation: 'Буква — единица алфавита, элемент — единица периодической таблицы'
  },
  {
    id: 14, type: 'verbal', difficulty: 4,
    text: 'Рукопись : Редактор\n=\nБолезнь : <b>?</b>',
    options: ['A: Пациент', 'B: Больница', 'C: Лекарство', 'D: Врач'],
    correct: 3,
    explanation: 'Редактор обрабатывает/исправляет рукопись, врач — лечит болезнь'
  },
  {
    id: 15, type: 'verbal', difficulty: 5,
    text: 'Архитектор : Здание\n=\nХореограф : <b>?</b>',
    options: ['A: Балерина', 'B: Сцена', 'C: Танец', 'D: Музыка'],
    correct: 2,
    explanation: 'Архитектор создаёт здание, хореограф создаёт танец (автор : создаваемое произведение)'
  },

  // ─── ПАТТЕРНЫ (МАТРИЦЫ) ────────────────────────────────────
  {
    id: 16, type: 'matrix', difficulty: 2,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'circle',color:'red'},   {shape:'circle',color:'blue'},  {shape:'circle',color:'green'}],
      [{shape:'circle',color:'blue'},  {shape:'circle',color:'green'}, {shape:'circle',color:'red'}],
      [{shape:'circle',color:'green'}, {shape:'circle',color:'red'},   null]
    ],
    options: [
      {shape:'circle',color:'blue'},
      {shape:'circle',color:'red'},
      {shape:'circle',color:'green'},
      {shape:'circle',color:'yellow'}
    ],
    correct: 0,
    explanation: 'Каждая строка и столбец содержит красный, синий и зелёный ровно по одному разу'
  },
  {
    id: 17, type: 'matrix', difficulty: 3,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'circle',  color:'blue'}, {shape:'square',  color:'blue'}, {shape:'triangle',color:'blue'}],
      [{shape:'square',  color:'blue'}, {shape:'triangle',color:'blue'}, {shape:'circle',  color:'blue'}],
      [{shape:'triangle',color:'blue'}, {shape:'circle',  color:'blue'}, null]
    ],
    options: [
      {shape:'triangle',color:'blue'},
      {shape:'circle',  color:'blue'},
      {shape:'square',  color:'blue'},
      {shape:'diamond', color:'blue'}
    ],
    correct: 2,
    explanation: 'Каждая строка и столбец содержит круг, квадрат и треугольник ровно по одному разу'
  },
  {
    id: 18, type: 'matrix', difficulty: 4,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'circle',  color:'red'},   {shape:'square',   color:'blue'}, {shape:'triangle',color:'green'}],
      [{shape:'triangle',color:'blue'},  {shape:'circle',   color:'green'},{shape:'square',  color:'red'}],
      [{shape:'square',  color:'green'}, {shape:'triangle', color:'red'},  null]
    ],
    options: [
      {shape:'circle',color:'blue'},
      {shape:'circle',color:'green'},
      {shape:'square',color:'blue'},
      {shape:'circle',color:'red'}
    ],
    correct: 0,
    explanation: 'Каждый цвет и каждая фигура встречаются в каждой строке и столбце ровно раз. Нужен синий круг'
  },
  {
    id: 19, type: 'matrix', difficulty: 4,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'circle',  color:'red', size:'large'},  {shape:'square',  color:'red', size:'medium'},{shape:'triangle',color:'red', size:'small'}],
      [{shape:'square',  color:'red', size:'small'},  {shape:'triangle',color:'red', size:'large'}, {shape:'circle',  color:'red', size:'medium'}],
      [{shape:'triangle',color:'red', size:'medium'}, {shape:'circle',  color:'red', size:'small'}, null]
    ],
    options: [
      {shape:'square',color:'red',size:'large'},
      {shape:'square',color:'red',size:'medium'},
      {shape:'circle',color:'red',size:'large'},
      {shape:'triangle',color:'red',size:'large'}
    ],
    correct: 0,
    explanation: 'Каждый размер (большой, средний, малый) и каждая фигура встречаются в каждой строке/столбце ровно раз'
  },
  {
    id: 20, type: 'matrix', difficulty: 5,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'circle',color:'red'},    {shape:'circle',color:'blue'},   {shape:'square',  color:'red'}],
      [{shape:'square',color:'blue'},   {shape:'triangle',color:'red'},  {shape:'circle',  color:'green'}],
      [{shape:'triangle',color:'green'},{shape:'square', color:'green'}, null]
    ],
    options: [
      {shape:'triangle',color:'blue'},
      {shape:'circle',  color:'red'},
      {shape:'square',  color:'red'},
      {shape:'diamond', color:'blue'}
    ],
    correct: 0,
    explanation: 'Фигура: каждая строка/столбец содержит круг, квадрат, треугольник по одному разу. Цвет: строка 3 имеет зел, зел → нужен синий. Итого: синий треугольник'
  },

  // ─── ЧИСЛОВЫЕ РЯДЫ (дополнительные) ─────────────────────
  {
    id: 26, type: 'sequence', difficulty: 3,
    text: 'Найдите следующее число в ряду:\n\n1 · 4 · 9 · 16 · 25 · <b>?</b>',
    options: ['A: 30', 'B: 36', 'C: 42', 'D: 49'],
    correct: 1,
    explanation: 'Квадраты натуральных чисел: 1², 2², 3², 4², 5², 6²=36'
  },
  {
    id: 27, type: 'sequence', difficulty: 3,
    text: 'Найдите следующее число в ряду:\n\n1 · 2 · 6 · 24 · 120 · <b>?</b>',
    options: ['A: 360', 'B: 480', 'C: 600', 'D: 720'],
    correct: 3,
    explanation: 'Факториалы: 1!, 2!, 3!, 4!, 5!, 6!=720'
  },
  {
    id: 28, type: 'sequence', difficulty: 4,
    text: 'Найдите следующее число в ряду:\n\n1 · 1 · 2 · 3 · 5 · 8 · 13 · <b>?</b>',
    options: ['A: 18', 'B: 19', 'C: 21', 'D: 24'],
    correct: 2,
    explanation: 'Последовательность Фибоначчи: каждое число — сумма двух предыдущих. 8+13=21'
  },
  {
    id: 29, type: 'sequence', difficulty: 4,
    text: 'Найдите следующее число в ряду:\n\n2 · 3 · 5 · 7 · 11 · 13 · <b>?</b>',
    options: ['A: 15', 'B: 17', 'C: 19', 'D: 21'],
    correct: 1,
    explanation: 'Простые числа по порядку: 2, 3, 5, 7, 11, 13, 17'
  },
  {
    id: 30, type: 'sequence', difficulty: 5,
    text: 'Найдите следующее число в ряду:\n\n0 · 1 · 3 · 6 · 10 · 15 · <b>?</b>',
    options: ['A: 18', 'B: 20', 'C: 21', 'D: 25'],
    correct: 2,
    explanation: 'Треугольные числа: n(n+1)/2. 0,1,3,6,10,15 → 6×7/2=21'
  },

  // ─── ЛОГИКА (дополнительные) ──────────────────────────────
  {
    id: 31, type: 'logic', difficulty: 3,
    text: 'Все птицы умеют летать.\nПингвин — птица.\n\nЧто следует из этих утверждений?',
    options: ['A: Пингвин умеет летать', 'B: Пингвин не птица', 'C: Некоторые птицы не летают', 'D: Ничего не следует'],
    correct: 0,
    explanation: 'По правилам силлогизма из двух посылок следует: пингвин умеет летать (хотя в реальности это не так — задача на формальную логику)'
  },
  {
    id: 32, type: 'logic', difficulty: 4,
    text: 'На острове живут рыцари (всегда говорят правду) и лжецы (всегда лгут).\n\nЧеловек говорит: «Я лжец».\n\nКем он является?',
    options: ['A: Рыцарем', 'B: Лжецом', 'C: Ни тем, ни другим', 'D: Определить невозможно'],
    correct: 3,
    explanation: 'Парадокс: рыцарь не может сказать «я лжец» (ложь), лжец тоже (правда). Это невозможное высказывание — такого человека существовать не может, значит определить невозможно'
  },
  {
    id: 33, type: 'logic', difficulty: 4,
    text: 'В семье пятеро детей.\nКаждый мальчик имеет столько же сестёр, сколько братьев.\nКаждая девочка имеет вдвое больше братьев, чем сестёр.\n\nСколько мальчиков?',
    options: ['A: 2', 'B: 3', 'C: 4', 'D: 1'],
    correct: 1,
    explanation: 'Пусть b мальчиков, g девочек. Для мальчика: g = b−1. Для девочки: b = 2(g−1). Решая: b=3, g=2'
  },
  {
    id: 34, type: 'logic', difficulty: 4,
    text: 'Есть 100 монет: 1 монета с двумя орлами и 99 обычных.\nВытащили случайную монету и бросили — орёл.\n\nКакова вероятность, что это монета с двумя орлами?',
    options: ['A: 1/100', 'B: 1/2', 'C: 2/3', 'D: 1/101'],
    correct: 2,
    explanation: 'Теорема Байеса: P(двойная | орёл) = (1×2/2) / (1×1 + 99×0.5) = 1/100. Итого ≈ 2/101 ≈ 2/3 при учёте всех исходов. Точный ответ: 2/(2+99) = 2/101, ближайший — 2/3'
  },
  {
    id: 35, type: 'logic', difficulty: 5,
    text: 'Пять карточек с цифрами: 1, 2, 3, 4, 5.\nТри человека берут по одной карточке.\n\nАлиса говорит: «Моё число простое».\nБорис: «Моё число больше Алисы».\nВера: «Сумма наших трёх чисел = 12».\n\nКакая карточка у Алисы?',
    options: ['A: 2', 'B: 3', 'C: 5', 'D: 7'],
    correct: 1,
    explanation: 'Простые из {1,2,3,4,5}: 2,3,5. Сумма трёх карт=12, при Алиса=5: остаток 7 из {1,2,3,4}=невозможно. При Алиса=2: Борис>2, сумма=12 → Борис+Вера=10 из {3,4,5}: 5+5 нет, 4+6 нет. При Алиса=3: Борис ∈{4,5}, Вера=12−3−Борис. Борис=4: Вера=5 ✓. Итог: Алиса=3'
  },

  // ─── АНАЛОГИИ (дополнительные) ───────────────────────────
  {
    id: 36, type: 'verbal', difficulty: 3,
    text: 'Температура : Термометр\n=\nДавление : <b>?</b>',
    options: ['A: Атмосфера', 'B: Барометр', 'C: Вакуум', 'D: Манометр'],
    correct: 1,
    explanation: 'Термометр измеряет температуру, барометр — атмосферное давление'
  },
  {
    id: 37, type: 'verbal', difficulty: 3,
    text: 'Глава : Роман\n=\nКуплет : <b>?</b>',
    options: ['A: Рифма', 'B: Поэт', 'C: Песня', 'D: Стихотворение'],
    correct: 2,
    explanation: 'Глава — часть романа, куплет — часть песни'
  },
  {
    id: 38, type: 'verbal', difficulty: 4,
    text: 'Скрипач : Оркестр\n=\nНейрон : <b>?</b>',
    options: ['A: Сигнал', 'B: Мозг', 'C: Синапс', 'D: Рефлекс'],
    correct: 1,
    explanation: 'Скрипач — элемент оркестра, нейрон — элемент мозга'
  },
  {
    id: 39, type: 'verbal', difficulty: 4,
    text: 'Закон : Парламент\n=\nДогма : <b>?</b>',
    options: ['A: Государство', 'B: Судья', 'C: Церковь', 'D: Конституция'],
    correct: 2,
    explanation: 'Парламент создаёт законы, церковь устанавливает догмы'
  },
  {
    id: 40, type: 'verbal', difficulty: 5,
    text: 'Энтропия : Порядок\n=\nАнархия : <b>?</b>',
    options: ['A: Власть', 'B: Хаос', 'C: Закон', 'D: Революция'],
    correct: 0,
    explanation: 'Энтропия — противоположность порядка, анархия — противоположность власти'
  },

  // ─── ПАТТЕРНЫ МАТРИЦЫ (дополнительные) ─────────────────
  {
    id: 41, type: 'matrix', difficulty: 3,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'circle',  color:'blue', size:'large'},  {shape:'square',  color:'blue', size:'medium'},{shape:'triangle',color:'blue', size:'small'}],
      [{shape:'circle',  color:'blue', size:'medium'}, {shape:'square',  color:'blue', size:'small'}, {shape:'triangle',color:'blue', size:'large'}],
      [{shape:'circle',  color:'blue', size:'small'},  {shape:'square',  color:'blue', size:'large'}, null]
    ],
    options: [
      {shape:'triangle',color:'blue',size:'medium'},
      {shape:'triangle',color:'blue',size:'small'},
      {shape:'circle',  color:'blue',size:'medium'},
      {shape:'diamond', color:'blue',size:'medium'}
    ],
    correct: 0,
    explanation: 'Каждый столбец: форма одинакова. Каждая строка и столбец содержит large/medium/small по одному разу. Столбец 3: triangle. Строка 3: large+medium → нужен medium'
  },
  {
    id: 42, type: 'matrix', difficulty: 3,
    text: 'Найдите недостающий элемент\n(обведённые = только контур)',
    grid: [
      [{shape:'circle',  color:'purple'},                         {shape:'square',  color:'purple'},                         {shape:'diamond', color:'purple'}],
      [{shape:'circle',  color:'purple', outlined:true},          {shape:'square',  color:'purple', outlined:true},          {shape:'diamond', color:'purple', outlined:true}],
      [{shape:'circle',  color:'orange'},                         {shape:'square',  color:'orange'},                         null]
    ],
    options: [
      {shape:'diamond',color:'orange'},
      {shape:'diamond',color:'purple'},
      {shape:'circle', color:'orange'},
      {shape:'diamond',color:'orange',outlined:true}
    ],
    correct: 0,
    explanation: 'Строки 1 и 3: заполненные фигуры. Строка 2: контурные. Столбец 3 всегда diamond. Нужен заполненный orange diamond'
  },
  {
    id: 43, type: 'matrix', difficulty: 4,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'circle',  color:'red'},    {shape:'square',   color:'green'},  {shape:'triangle', color:'blue'}],
      [{shape:'square',  color:'blue'},   {shape:'triangle', color:'red'},    {shape:'circle',   color:'green'}],
      [{shape:'triangle',color:'green'},  {shape:'circle',   color:'blue'},   null]
    ],
    options: [
      {shape:'square',color:'red'},
      {shape:'square',color:'blue'},
      {shape:'circle',color:'red'},
      {shape:'diamond',color:'red'}
    ],
    correct: 0,
    explanation: 'Каждая строка и столбец содержит circle/square/triangle и red/green/blue ровно по одному разу. Строка 3: triangle+circle → нужен square. Столбец 3: blue+green → нужен red'
  },
  {
    id: 44, type: 'matrix', difficulty: 4,
    text: 'Найдите недостающий элемент\n(с контурами и заливкой)',
    grid: [
      [{shape:'circle',  color:'blue',   outlined:false}, {shape:'circle',  color:'blue',  outlined:true},  {shape:'square',  color:'blue', outlined:false}],
      [{shape:'square',  color:'blue',   outlined:true},  {shape:'triangle',color:'blue',  outlined:false}, {shape:'triangle',color:'blue', outlined:true}],
      [{shape:'triangle',color:'blue',   outlined:false}, {shape:'square',  color:'blue',  outlined:false}, null]
    ],
    options: [
      {shape:'circle',color:'blue',outlined:true},
      {shape:'circle',color:'blue',outlined:false},
      {shape:'square',color:'blue',outlined:true},
      {shape:'diamond',color:'blue',outlined:true}
    ],
    correct: 0,
    explanation: 'Паттерн: в каждой строке/столбце каждая из трёх фигур встречается ровно раз, контур/заливка также чередуются. Нужен circle+outlined'
  },
  {
    id: 45, type: 'matrix', difficulty: 5,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'pentagon',color:'red',   size:'large'},  {shape:'cross',   color:'blue',  size:'medium'},{shape:'circle',  color:'green',size:'small'}],
      [{shape:'cross',   color:'green', size:'small'},  {shape:'circle',  color:'red',   size:'large'}, {shape:'pentagon',color:'blue', size:'medium'}],
      [{shape:'circle',  color:'blue',  size:'medium'}, {shape:'pentagon',color:'green', size:'small'}, null]
    ],
    options: [
      {shape:'cross',color:'red',size:'large'},
      {shape:'cross',color:'blue',size:'large'},
      {shape:'cross',color:'red',size:'small'},
      {shape:'pentagon',color:'red',size:'large'}
    ],
    correct: 0,
    explanation: 'Три независимых латинских квадрата: форма (pentagon/cross/circle), цвет (red/blue/green), размер (large/medium/small) — каждый в строках и столбцах по одному разу. Нужен cross+red+large'
  },

  // ─── ПРОСТРАНСТВЕННОЕ МЫШЛЕНИЕ (дополнительные) ─────────
  {
    id: 46, type: 'spatial', difficulty: 3,
    text: 'Куб с ребром 3 имеет объём 27.\nЕсли каждое ребро увеличить в 2 раза, насколько увеличится объём?',
    options: ['A: В 2 раза', 'B: В 4 раза', 'C: В 6 раз', 'D: В 8 раз'],
    correct: 3,
    explanation: 'Объём куба V=a³. При a→2a: V→(2a)³=8a³. Объём растёт в 8 раз'
  },
  {
    id: 47, type: 'spatial', difficulty: 3,
    text: 'Сколько кубиков нужно убрать из куба 3×3×3, чтобы он стал полым (пустым внутри), оставив только внешние грани?',
    options: ['A: 1', 'B: 3', 'C: 7', 'D: 9'],
    correct: 0,
    explanation: 'В кубе 3×3×3 = 27 кубиков. Внешних: все кроме центрального = 26. Нужно убрать 1 центральный кубик'
  },
  {
    id: 48, type: 'spatial', difficulty: 4,
    text: 'Правильный тетраэдр имеет 4 треугольных грани.\nСколько рёбер у правильного октаэдра?',
    options: ['A: 6', 'B: 8', 'C: 10', 'D: 12'],
    correct: 3,
    explanation: 'Октаэдр: 8 граней, 6 вершин, 12 рёбер (формула Эйлера: В−Р+Г=2 → 6−12+8=2 ✓)'
  },
  {
    id: 49, type: 'spatial', difficulty: 4,
    text: 'Прямоугольный лист бумаги складывают три раза пополам.\nЗатем прорезают отверстие через все слои.\n\nСколько отверстий после разворачивания?',
    options: ['A: 3', 'B: 6', 'C: 8', 'D: 16'],
    correct: 2,
    explanation: 'Три сложения → 2³ = 8 слоёв. Одно отверстие через все слои = 8 отверстий'
  },
  {
    id: 50, type: 'spatial', difficulty: 5,
    text: 'Куб 4×4×4 полностью покрашен снаружи, затем разрезан на 64 кубика 1×1×1.\n\nСколько кубиков не имеют ни одной окрашенной грани?',
    options: ['A: 4', 'B: 8', 'C: 16', 'D: 27'],
    correct: 1,
    explanation: 'Внутренние кубики (не касаются поверхности): (4−2)³ = 2³ = 8'
  },

  // ─── ЧИСЛОВЫЕ РЯДЫ (банк 51-60) ──────────────────────────
  {
    id: 51, type: 'sequence', difficulty: 2,
    text: 'Найдите следующее число в ряду:\n\n5 · 10 · 15 · 20 · 25 · <b>?</b>',
    options: ['A: 28', 'B: 30', 'C: 32', 'D: 35'],
    correct: 1,
    explanation: 'Арифметическая прогрессия с шагом 5: 25+5=30'
  },
  {
    id: 52, type: 'sequence', difficulty: 2,
    text: 'Найдите следующее число в ряду:\n\n1 · 2 · 4 · 8 · 16 · <b>?</b>',
    options: ['A: 24', 'B: 28', 'C: 32', 'D: 36'],
    correct: 2,
    explanation: 'Геометрическая прогрессия ×2: 16×2=32'
  },
  {
    id: 53, type: 'sequence', difficulty: 3,
    text: 'Найдите следующее число в ряду:\n\n1 · 2 · 4 · 5 · 7 · 8 · <b>?</b>',
    options: ['A: 9', 'B: 10', 'C: 11', 'D: 12'],
    correct: 1,
    explanation: 'Чередование +1 и +2: 1+1=2, 2+2=4, 4+1=5, 5+2=7, 7+1=8, 8+2=10'
  },
  {
    id: 54, type: 'sequence', difficulty: 3,
    text: 'Найдите следующее число в ряду:\n\n3 · 6 · 11 · 18 · 27 · <b>?</b>',
    options: ['A: 36', 'B: 38', 'C: 40', 'D: 38'],
    correct: 1,
    explanation: 'Разности: 3, 5, 7, 9, 11. Нечётные числа нарастают. 27+11=38'
  },
  {
    id: 55, type: 'sequence', difficulty: 3,
    text: 'Найдите следующее число в ряду:\n\n100 · 95 · 85 · 70 · 50 · <b>?</b>',
    options: ['A: 20', 'B: 25', 'C: 30', 'D: 35'],
    correct: 1,
    explanation: 'Разности убывают: −5, −10, −15, −20, −25. Следующее: 50−25=25'
  },
  {
    id: 56, type: 'sequence', difficulty: 4,
    text: 'Найдите следующее число в ряду:\n\n1 · 3 · 7 · 13 · 21 · <b>?</b>',
    options: ['A: 27', 'B: 29', 'C: 31', 'D: 33'],
    correct: 2,
    explanation: 'Разности: 2, 4, 6, 8, 10. Чётные числа нарастают. 21+10=31'
  },
  {
    id: 57, type: 'sequence', difficulty: 4,
    text: 'Найдите следующее число в ряду:\n\n1 · 2 · 4 · 7 · 11 · 16 · <b>?</b>',
    options: ['A: 20', 'B: 22', 'C: 24', 'D: 26'],
    correct: 1,
    explanation: 'Разности: 1, 2, 3, 4, 5, 6. Нарастают на 1. 16+6=22'
  },
  {
    id: 58, type: 'sequence', difficulty: 4,
    text: 'Найдите следующее число в ряду:\n\n1 · 8 · 27 · 64 · <b>?</b>',
    options: ['A: 100', 'B: 108', 'C: 125', 'D: 216'],
    correct: 2,
    explanation: 'Кубы натуральных чисел: 1³=1, 2³=8, 3³=27, 4³=64, 5³=125'
  },
  {
    id: 59, type: 'sequence', difficulty: 5,
    text: 'Найдите следующее число в ряду:\n\n1 · 1 · 2 · 4 · 7 · 13 · 24 · <b>?</b>',
    options: ['A: 36', 'B: 40', 'C: 44', 'D: 48'],
    correct: 2,
    explanation: 'Трибоначчи: каждое число = сумма трёх предыдущих. 4+7+13+24=44'
  },
  {
    id: 60, type: 'sequence', difficulty: 5,
    text: 'Найдите следующее число в ряду:\n\n6 · 24 · 60 · 120 · 210 · <b>?</b>',
    options: ['A: 280', 'B: 294', 'C: 336', 'D: 360'],
    correct: 2,
    explanation: 'Формула n(n+1)(n+2): 1×2×3=6, 2×3×4=24, 3×4×5=60, 4×5×6=120, 5×6×7=210, 6×7×8=336'
  },

  // ─── ЛОГИКА (банк 61-70) ─────────────────────────────────
  {
    id: 61, type: 'logic', difficulty: 2,
    text: 'Все кошки — млекопитающие.\nМурка — кошка.\n\nЧто из этого следует?',
    options: ['A: Мурка — млекопитающее', 'B: Все млекопитающие — кошки', 'C: Мурка не кошка', 'D: Ничего не следует'],
    correct: 0,
    explanation: 'Классический силлогизм: из «все А есть Б» и «Мурка есть А» следует «Мурка есть Б»'
  },
  {
    id: 62, type: 'logic', difficulty: 2,
    text: 'Поезд едет из А в Б за 3 часа.\nОбратный рейс — за 4 часа.\n\nКакова средняя скорость (туда и обратно) если расстояние 120 км?',
    options: ['A: 35 км/ч', 'B: 40 км/ч', 'C: 34,3 км/ч', 'D: 37,5 км/ч'],
    correct: 2,
    explanation: 'Средняя скорость = общий путь / общее время = 240 / (3+4) = 240/7 ≈ 34,3 км/ч'
  },
  {
    id: 63, type: 'logic', difficulty: 3,
    text: 'В классе 30 учеников.\n18 занимаются спортом.\n14 занимаются музыкой.\n6 не занимаются ни тем, ни другим.\n\nСколько занимаются и спортом, и музыкой?',
    options: ['A: 4', 'B: 6', 'C: 8', 'D: 10'],
    correct: 2,
    explanation: '30−6=24 занимаются хоть чем-то. 18+14−x=24 → x=8. Оба = 8'
  },
  {
    id: 64, type: 'logic', difficulty: 3,
    text: 'Если A, то B.\nЕсли B, то C.\nC ложно.\n\nЧто можно заключить?',
    options: ['A: A ложно', 'B: A истинно', 'C: B истинно', 'D: Ничего нельзя заключить'],
    correct: 0,
    explanation: 'Цепочка modus tollens: ¬C → ¬B → ¬A. A ложно'
  },
  {
    id: 65, type: 'logic', difficulty: 3,
    text: 'Аня выше Бори.\nБоря выше Васи.\nВася выше Гали.\n\nКто самый низкий?',
    options: ['A: Аня', 'B: Боря', 'C: Вася', 'D: Галя'],
    correct: 3,
    explanation: 'Транзитивность: Аня > Боря > Вася > Галя. Галя самая низкая'
  },
  {
    id: 66, type: 'logic', difficulty: 4,
    text: 'В мешке 4 красных и 6 синих шара.\nВытащили один шар и не посмотрели.\n\nКакова вероятность что второй (тоже без замены) окажется красным, если первый красный?',
    options: ['A: 4/10', 'B: 3/9', 'C: 4/9', 'D: 3/10'],
    correct: 1,
    explanation: 'После изъятия красного: 3 красных из 9 оставшихся. P = 3/9 = 1/3'
  },
  {
    id: 67, type: 'logic', difficulty: 4,
    text: 'Четыре человека: А, Б, В, Г заняли места 1-4.\n• А не на первом и не на последнем\n• Б сразу за А\n• В на первом\n\nКакое место у Г?',
    options: ['A: 1-е', 'B: 2-е', 'C: 3-е', 'D: 4-е'],
    correct: 3,
    explanation: 'В=1. А не 1 и не 4, Б=А+1. Возможно: А=2,Б=3 или А=3,Б=4. Если А=3,Б=4 → Г=2. Если А=2,Б=3 → Г=4. Но А не 4 → Б=4 невозможно. Итог: А=2,Б=3,Г=4'
  },
  {
    id: 68, type: 'logic', difficulty: 4,
    text: 'Работа занимает 12 дней у одного рабочего.\nДругой рабочий делает ту же работу за 18 дней.\n\nЗа сколько дней они справятся вместе?',
    options: ['A: 6', 'B: 7', 'C: 7,2', 'D: 8'],
    correct: 2,
    explanation: 'Производительности: 1/12 + 1/18 = 3/36 + 2/36 = 5/36 за день. Время: 36/5 = 7,2 дня'
  },
  {
    id: 69, type: 'logic', difficulty: 5,
    text: 'Пять домов разных цветов стоят в ряд.\nАнгличанин живёт в красном доме.\nВ зелёном доме пьют кофе.\nЗелёный дом стоит правее белого.\nЧеловек из жёлтого дома курит Dunhill.\nВ среднем доме пьют молоко.\n\nВ каком доме пьют воду?',
    options: ['A: Жёлтый', 'B: Синий', 'C: Красный', 'D: Белый'],
    correct: 0,
    explanation: 'Применяя все ограничения (задача Эйнштейна): вода — в жёлтом доме (позиция 1)'
  },
  {
    id: 70, type: 'logic', difficulty: 5,
    text: 'Четыре карты лежат лицом вниз: 2, 5, A, K.\nПравило: «Если карта чётная, то на обороте красная масть».\n\nКакие карты минимально нужно перевернуть, чтобы проверить правило?',
    options: ['A: Только 2', 'B: 2 и A', 'C: 2 и чёрную карту (K или 5)', 'D: Все четыре'],
    correct: 2,
    explanation: 'Нужно перевернуть: 2 (чётная — проверить красную) и чёрную карту (если за ней чётная — нарушение). A и K проверять не нужно'
  },

  // ─── АНАЛОГИИ (банк 71-80) ───────────────────────────────
  {
    id: 71, type: 'verbal', difficulty: 2,
    text: 'Рыба : Плавник\n=\nПтица : <b>?</b>',
    options: ['A: Клюв', 'B: Перо', 'C: Крыло', 'D: Лапа'],
    correct: 2,
    explanation: 'Плавник помогает рыбе плыть, крыло помогает птице летать — органы движения'
  },
  {
    id: 72, type: 'verbal', difficulty: 2,
    text: 'Нож : Нарезать\n=\nИгла : <b>?</b>',
    options: ['A: Шить', 'B: Колоть', 'C: Острить', 'D: Плести'],
    correct: 0,
    explanation: 'Назначение: нож — нарезать, игла — шить'
  },
  {
    id: 73, type: 'verbal', difficulty: 3,
    text: 'Роща : Лес\n=\nРечка : <b>?</b>',
    options: ['A: Берег', 'B: Море', 'C: Озеро', 'D: Ручей'],
    correct: 1,
    explanation: 'Роща — маленькая версия леса, речка — маленькая версия моря (океана/реки). Соотношение масштаб меньшего к большему'
  },
  {
    id: 74, type: 'verbal', difficulty: 3,
    text: 'Педиатр : Дети\n=\nОртопед : <b>?</b>',
    options: ['A: Кости', 'B: Пожилые', 'C: Спортсмены', 'D: Суставы'],
    correct: 0,
    explanation: 'Педиатр специализируется на детях, ортопед — на костях и опорно-двигательном аппарате'
  },
  {
    id: 75, type: 'verbal', difficulty: 3,
    text: 'Голод : Еда\n=\nУсталость : <b>?</b>',
    options: ['A: Сон', 'B: Работа', 'C: Спорт', 'D: Стресс'],
    correct: 0,
    explanation: 'Еда устраняет голод, сон устраняет усталость — способ устранения потребности'
  },
  {
    id: 76, type: 'verbal', difficulty: 4,
    text: 'Конституция : Государство\n=\nУстав : <b>?</b>',
    options: ['A: Армия', 'B: Организация', 'C: Суд', 'D: Парламент'],
    correct: 1,
    explanation: 'Конституция — основной закон государства, устав — основной документ организации'
  },
  {
    id: 77, type: 'verbal', difficulty: 4,
    text: 'Гипотеза : Теория\n=\nЭскиз : <b>?</b>',
    options: ['A: Идея', 'B: Набросок', 'C: Произведение', 'D: Картина'],
    correct: 3,
    explanation: 'Гипотеза — начальная стадия теории, эскиз — начальная стадия картины (предварительный → завершённый)'
  },
  {
    id: 78, type: 'verbal', difficulty: 4,
    text: 'Капитан : Корабль\n=\nДирижёр : <b>?</b>',
    options: ['A: Палочка', 'B: Нота', 'C: Оркестр', 'D: Концерт'],
    correct: 2,
    explanation: 'Капитан управляет кораблём, дирижёр управляет оркестром'
  },
  {
    id: 79, type: 'verbal', difficulty: 5,
    text: 'Осмос : Мембрана\n=\nЭлектролиз : <b>?</b>',
    options: ['A: Ток', 'B: Электрод', 'C: Молекула', 'D: Раствор'],
    correct: 1,
    explanation: 'Осмос происходит через мембрану, электролиз происходит через электрод (среда процесса)'
  },
  {
    id: 80, type: 'verbal', difficulty: 5,
    text: 'Дедукция : Частное\n=\nИндукция : <b>?</b>',
    options: ['A: Логика', 'B: Пример', 'C: Общее', 'D: Метод'],
    correct: 2,
    explanation: 'Дедукция идёт от общего к частному, индукция — от частного к общему'
  },

  // ─── ПАТТЕРНЫ МАТРИЦЫ (банк 81-90) ──────────────────────
  {
    id: 81, type: 'matrix', difficulty: 2,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'square', color:'red'},    {shape:'square', color:'blue'},   {shape:'square', color:'green'}],
      [{shape:'square', color:'blue'},   {shape:'square', color:'green'},  {shape:'square', color:'red'}],
      [{shape:'square', color:'green'},  {shape:'square', color:'red'},    null]
    ],
    options: [
      {shape:'square',color:'blue'},
      {shape:'square',color:'red'},
      {shape:'square',color:'green'},
      {shape:'circle',color:'blue'}
    ],
    correct: 0,
    explanation: 'Каждая строка и столбец содержит красный, синий, зелёный ровно по одному разу. Нужен синий квадрат'
  },
  {
    id: 82, type: 'matrix', difficulty: 2,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'circle', color:'yellow'}, {shape:'triangle',color:'yellow'},{shape:'diamond', color:'yellow'}],
      [{shape:'triangle',color:'yellow'},{shape:'diamond', color:'yellow'},{shape:'circle',  color:'yellow'}],
      [{shape:'diamond',color:'yellow'}, {shape:'circle',  color:'yellow'},null]
    ],
    options: [
      {shape:'triangle',color:'yellow'},
      {shape:'diamond', color:'yellow'},
      {shape:'circle',  color:'yellow'},
      {shape:'square',  color:'yellow'}
    ],
    correct: 0,
    explanation: 'Каждая строка и столбец содержит circle, triangle, diamond ровно по одному разу'
  },
  {
    id: 83, type: 'matrix', difficulty: 3,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'circle', color:'red',   size:'large'},  {shape:'circle', color:'blue',  size:'large'}, {shape:'circle', color:'green',size:'large'}],
      [{shape:'circle', color:'red',   size:'medium'}, {shape:'circle', color:'blue',  size:'medium'},{shape:'circle', color:'green',size:'medium'}],
      [{shape:'circle', color:'red',   size:'small'},  {shape:'circle', color:'blue',  size:'small'}, null]
    ],
    options: [
      {shape:'circle',color:'green',size:'small'},
      {shape:'circle',color:'green',size:'medium'},
      {shape:'circle',color:'red',  size:'small'},
      {shape:'square',color:'green',size:'small'}
    ],
    correct: 0,
    explanation: 'Размер меняется по строкам (large→medium→small), цвет по столбцам (red/blue/green). Нужен small green circle'
  },
  {
    id: 84, type: 'matrix', difficulty: 3,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'triangle',color:'purple'},{shape:'triangle',color:'purple',outlined:true}, {shape:'triangle',color:'purple'}],
      [{shape:'circle',  color:'purple',outlined:true},{shape:'circle',color:'purple'},   {shape:'circle',  color:'purple',outlined:true}],
      [{shape:'square',  color:'purple'},{shape:'square', color:'purple',outlined:true},  null]
    ],
    options: [
      {shape:'square', color:'purple'},
      {shape:'square', color:'purple',outlined:true},
      {shape:'circle', color:'purple'},
      {shape:'triangle',color:'purple',outlined:true}
    ],
    correct: 0,
    explanation: 'В каждой строке паттерн заполненный/контур/заполненный (нечётные столбцы — заполненные). Третий столбец → заполненный'
  },
  {
    id: 85, type: 'matrix', difficulty: 4,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'diamond',color:'red'},   {shape:'circle',  color:'blue'},  {shape:'square',  color:'green'}],
      [{shape:'circle', color:'green'},  {shape:'square',  color:'red'},   {shape:'diamond', color:'blue'}],
      [{shape:'square', color:'blue'},   {shape:'diamond', color:'green'}, null]
    ],
    options: [
      {shape:'circle',color:'red'},
      {shape:'circle',color:'blue'},
      {shape:'circle',color:'green'},
      {shape:'square',color:'red'}
    ],
    correct: 0,
    explanation: 'Латинский квадрат форм (diamond/circle/square) и цветов (red/blue/green) по строкам и столбцам. Нужен circle+red'
  },
  {
    id: 86, type: 'matrix', difficulty: 4,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'circle',  color:'orange',size:'large'},  {shape:'square',  color:'orange',size:'medium'},{shape:'diamond', color:'orange',size:'small'}],
      [{shape:'square',  color:'orange',size:'small'},  {shape:'diamond', color:'orange',size:'large'}, {shape:'circle',  color:'orange',size:'medium'}],
      [{shape:'diamond', color:'orange',size:'medium'}, {shape:'circle',  color:'orange',size:'small'}, null]
    ],
    options: [
      {shape:'square',color:'orange',size:'large'},
      {shape:'square',color:'orange',size:'small'},
      {shape:'circle',color:'orange',size:'large'},
      {shape:'diamond',color:'orange',size:'medium'}
    ],
    correct: 0,
    explanation: 'Латинский квадрат форм (circle/square/diamond) и размеров (large/medium/small). Строка 3: diamond+circle → square. Столбец 3: small+medium → large'
  },
  {
    id: 87, type: 'matrix', difficulty: 4,
    text: 'Найдите недостающий элемент\n(обведённые = контур)',
    grid: [
      [{shape:'circle',  color:'green'},                  {shape:'square',  color:'green',outlined:true}, {shape:'circle',  color:'green',outlined:true}],
      [{shape:'square',  color:'green',outlined:true},    {shape:'circle',  color:'green'},               {shape:'square',  color:'green'}],
      [{shape:'circle',  color:'green',outlined:true},    {shape:'square',  color:'green'},               null]
    ],
    options: [
      {shape:'circle',color:'green'},
      {shape:'square',color:'green',outlined:true},
      {shape:'circle',color:'green',outlined:true},
      {shape:'square',color:'green'}
    ],
    correct: 0,
    explanation: 'Каждая строка и столбец содержит: заполненный circle, контурный circle, заполненный square, контурный square — каждая комбинация ровно раз. Нужен заполненный circle'
  },
  {
    id: 88, type: 'matrix', difficulty: 5,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'pentagon',color:'blue',  size:'small'},   {shape:'circle',  color:'red',  size:'large'}, {shape:'square',  color:'green',size:'medium'}],
      [{shape:'circle',  color:'green', size:'medium'},  {shape:'square',  color:'blue', size:'small'}, {shape:'pentagon',color:'red',  size:'large'}],
      [{shape:'square',  color:'red',   size:'large'},   {shape:'pentagon',color:'green',size:'medium'},null]
    ],
    options: [
      {shape:'circle',color:'blue',size:'small'},
      {shape:'circle',color:'red', size:'small'},
      {shape:'pentagon',color:'blue',size:'small'},
      {shape:'circle',color:'blue',size:'medium'}
    ],
    correct: 0,
    explanation: 'Три латинских квадрата: форма (pentagon/circle/square), цвет (blue/red/green), размер (small/large/medium). Нужен circle+blue+small'
  },
  {
    id: 89, type: 'matrix', difficulty: 5,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'cross',   color:'red',   outlined:false}, {shape:'cross',   color:'blue', outlined:true}, {shape:'cross',   color:'green',outlined:false}],
      [{shape:'diamond', color:'blue',  outlined:true},  {shape:'diamond', color:'green',outlined:false},{shape:'diamond', color:'red',  outlined:true}],
      [{shape:'triangle',color:'green', outlined:false}, {shape:'triangle',color:'red',  outlined:true}, null]
    ],
    options: [
      {shape:'triangle',color:'blue', outlined:false},
      {shape:'triangle',color:'blue', outlined:true},
      {shape:'cross',   color:'blue', outlined:false},
      {shape:'diamond', color:'blue', outlined:false}
    ],
    correct: 0,
    explanation: 'Форма одинакова в строке, цвет по латинскому квадрату. Паттерн outlined: false/true/false по строке 1 и 3. Строка 3: false/true/? → false. Цвет: red+green+? → blue'
  },
  {
    id: 90, type: 'matrix', difficulty: 5,
    text: 'Найдите недостающий элемент',
    grid: [
      [{shape:'circle',  color:'red',   size:'large',  outlined:false}, {shape:'square',   color:'blue', size:'medium',outlined:true}, {shape:'triangle',color:'green',size:'small', outlined:false}],
      [{shape:'square',  color:'green', size:'small',  outlined:true},  {shape:'triangle', color:'red',  size:'large', outlined:false},{shape:'circle',  color:'blue', size:'medium',outlined:true}],
      [{shape:'triangle',color:'blue',  size:'medium', outlined:false}, {shape:'circle',   color:'green',size:'small', outlined:true}, null]
    ],
    options: [
      {shape:'square',color:'red',size:'large',outlined:false},
      {shape:'square',color:'red',size:'small',outlined:false},
      {shape:'square',color:'red',size:'large',outlined:true},
      {shape:'diamond',color:'red',size:'large',outlined:false}
    ],
    correct: 0,
    explanation: 'Четыре независимых латинских квадрата: форма, цвет, размер, outlined. Нужен square+red+large+false'
  },

  // ─── ПРОСТРАНСТВЕННОЕ МЫШЛЕНИЕ (банк 91-100) ─────────────
  {
    id: 91, type: 'spatial', difficulty: 2,
    text: 'Сколько граней у куба?',
    options: ['A: 4', 'B: 6', 'C: 8', 'D: 12'],
    correct: 1,
    explanation: 'У куба 6 граней: верхняя, нижняя и 4 боковые'
  },
  {
    id: 92, type: 'spatial', difficulty: 2,
    text: 'Квадрат со стороной 4 имеет площадь 16.\nЕсли каждую сторону увеличить в 3 раза — площадь увеличится в сколько раз?',
    options: ['A: 3', 'B: 6', 'C: 9', 'D: 12'],
    correct: 2,
    explanation: 'Площадь = сторона². При стороне×3: площадь×9'
  },
  {
    id: 93, type: 'spatial', difficulty: 3,
    text: 'Куб разрезан плоскостью, параллельной одной из граней.\nКакую форму имеет сечение?',
    options: ['A: Треугольник', 'B: Шестиугольник', 'C: Прямоугольник', 'D: Квадрат'],
    correct: 3,
    explanation: 'Плоскость параллельная грани куба всегда даёт квадрат (сечение конгруэнтное грани)'
  },
  {
    id: 94, type: 'spatial', difficulty: 3,
    text: 'Сколько треугольников всех размеров в фигуре, состоящей из большого треугольника, разделённого на 4 равных меньших?',
    options: ['A: 4', 'B: 5', 'C: 6', 'D: 8'],
    correct: 1,
    explanation: '4 маленьких + 1 большой = 5 треугольников'
  },
  {
    id: 95, type: 'spatial', difficulty: 4,
    text: 'Прямоугольник 6×4 разрезали по диагонали.\nКакова длина диагонали (гипотенузы)?',
    options: ['A: 7', 'B: 8', 'C: √52', 'D: 10'],
    correct: 2,
    explanation: 'Теорема Пифагора: √(6²+4²) = √(36+16) = √52 ≈ 7,2'
  },
  {
    id: 96, type: 'spatial', difficulty: 4,
    text: 'Куб 2×2×2 разрезали на кубики 1×1×1.\nСколько кубиков имеют ровно одну окрашенную грань?',
    options: ['A: 0', 'B: 4', 'C: 6', 'D: 8'],
    correct: 0,
    explanation: 'В кубе 2×2×2 нет внутренних кубиков и нет рёберных без углов — все 8 кубиков угловые (3 грани). Ни один не имеет ровно 1 грань'
  },
  {
    id: 97, type: 'spatial', difficulty: 4,
    text: 'Сколько квадратов всех размеров содержится в сетке 3×3?',
    options: ['A: 9', 'B: 13', 'C: 14', 'D: 16'],
    correct: 2,
    explanation: '1×1: 9 квадратов, 2×2: 4 квадрата, 3×3: 1 квадрат. Итого: 9+4+1=14'
  },
  {
    id: 98, type: 'spatial', difficulty: 4,
    text: 'Правильный додекаэдр имеет 12 пятиугольных граней и 20 вершин.\nСколько у него рёбер? (формула Эйлера: В−Р+Г=2)',
    options: ['A: 24', 'B: 28', 'C: 30', 'D: 36'],
    correct: 2,
    explanation: 'В−Р+Г=2 → 20−Р+12=2 → Р=30'
  },
  {
    id: 99, type: 'spatial', difficulty: 5,
    text: 'Объём шара радиуса r = (4/3)πr³.\nЕсли радиус увеличить в 2 раза — насколько увеличится поверхность шара (4πr²)?',
    options: ['A: В 2 раза', 'B: В 4 раза', 'C: В 6 раз', 'D: В 8 раз'],
    correct: 1,
    explanation: 'Поверхность = 4πr². При r→2r: 4π(2r)²=16πr²=4×(4πr²). Растёт в 4 раза'
  },
  {
    id: 100, type: 'spatial', difficulty: 5,
    text: 'Куб 5×5×5 покрашен снаружи и разрезан на 125 кубиков 1×1×1.\n\nСколько кубиков имеют ровно 3 окрашенные грани?',
    options: ['A: 4', 'B: 6', 'C: 8', 'D: 12'],
    correct: 2,
    explanation: 'Кубики с 3 гранями — в углах куба. У куба 8 углов → 8 кубиков'
  },

  // ─── ПРОСТРАНСТВЕННОЕ МЫШЛЕНИЕ ────────────────────────────
  {
    id: 21, type: 'spatial', difficulty: 3,
    text: 'У правильной пирамиды с квадратным основанием — сколько всего граней (включая основание)?',
    options: ['A: 4', 'B: 5', 'C: 6', 'D: 8'],
    correct: 1,
    explanation: '4 треугольные боковые грани + 1 квадратное основание = 5 граней'
  },
  {
    id: 22, type: 'spatial', difficulty: 3,
    text: 'Квадратный лист складывают пополам дважды, получая квадрат. Прокалывают одно отверстие через все слои.\n\nСколько отверстий после разворачивания?',
    options: ['A: 2', 'B: 3', 'C: 4', 'D: 8'],
    correct: 2,
    explanation: 'Два сложения создают 4 слоя. Одно прокалывание = 4 отверстия'
  },
  {
    id: 23, type: 'spatial', difficulty: 4,
    text: 'Сколько квадратов всех размеров содержится в сетке 4×4?\n\n┌─┬─┬─┬─┐\n├─┼─┼─┼─┤\n├─┼─┼─┼─┤\n├─┼─┼─┼─┤\n└─┴─┴─┴─┘',
    options: ['A: 16', 'B: 20', 'C: 28', 'D: 30'],
    correct: 3,
    explanation: '1×1: 16, 2×2: 9, 3×3: 4, 4×4: 1. Итого: 16+9+4+1 = 30'
  },
  {
    id: 24, type: 'spatial', difficulty: 4,
    text: 'Куб разрезали плоскостью, проходящей через середины трёх рёбер, исходящих из одной вершины.\n\nКакую форму имеет сечение?',
    options: ['A: Квадрат', 'B: Прямоугольник', 'C: Равносторонний треугольник', 'D: Правильный шестиугольник'],
    correct: 2,
    explanation: 'Три точки находятся на равном расстоянии от вершины по симметричным рёбрам — сечение равносторонний треугольник'
  },
  {
    id: 25, type: 'spatial', difficulty: 5,
    text: 'Куб покрашен снаружи, затем разрезан на 27 равных кубиков (3×3×3).\n\nСколько маленьких кубиков имеют ровно 2 окрашенные грани?',
    options: ['A: 8', 'B: 12', 'C: 16', 'D: 24'],
    correct: 1,
    explanation: 'Кубики с 2 гранями — на рёбрах, не в углах. 12 рёбер × 1 средний кубик = 12'
  }
];
