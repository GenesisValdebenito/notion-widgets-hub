/* ===========================
   NOTION WIDGET — Calendario
   script.js  (rama: widget/calendar)
   =========================== */

// ── i18n ─────────────────────────────────────────────────
const I18N = {
  es: {
    months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    days_mon: ['Lu','Ma','Mi','Ju','Vi','Sá','Do'],
    days_sun: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
    today_fmt: (d) => {
      const dias = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
      const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
      return `Hoy, ${dias[d.getDay()]} ${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
    },
    weeks_label: (n) => `${n} sem. en el mes`,
    days_left: (n) => n === 0 ? '¡Último día!' : `${n} días restantes`,
    cfg_lang: 'Idioma',
    cfg_theme: 'Tema',
    cfg_accent: 'Color acento',
    cfg_start: 'Inicio semana',
    cfg_week: 'N.º de semana',
    theme_dark: 'Oscuro',
    theme_light: 'Claro',
    theme_trans: 'Cristal',
    start_mon: 'Lunes',
    start_sun: 'Domingo',
    weeknum_no: 'No',
    weeknum_yes: 'Sí',
    btn_copy_link: '📋 Copiar enlace Notion',
    toast_copied: '✓ Enlace copiado al portapapeles',
    week_abbr: 'S',
  },
  en: {
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    days_mon: ['Mo','Tu','We','Th','Fr','Sa','Su'],
    days_sun: ['Su','Mo','Tu','We','Th','Fr','Sa'],
    today_fmt: (d) => {
      const dias = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const meses = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      return `Today, ${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}`;
    },
    weeks_label: (n) => `${n} weeks in month`,
    days_left: (n) => n === 0 ? 'Last day!' : `${n} days remaining`,
    cfg_lang: 'Language',
    cfg_theme: 'Theme',
    cfg_accent: 'Accent color',
    cfg_start: 'Week start',
    cfg_week: 'Week number',
    theme_dark: 'Dark',
    theme_light: 'Light',
    theme_trans: 'Glass',
    start_mon: 'Monday',
    start_sun: 'Sunday',
    weeknum_no: 'No',
    weeknum_yes: 'Yes',
    btn_copy_link: '📋 Copy Notion link',
    toast_copied: '✓ Link copied to clipboard',
    week_abbr: 'W',
  },
  pt: {
    months: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    days_mon: ['Se','Te','Qu','Qu','Se','Sá','Do'],
    days_sun: ['Do','Se','Te','Qu','Qu','Se','Sá'],
    today_fmt: (d) => {
      const dias = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
      const meses = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
      return `Hoje, ${dias[d.getDay()]} ${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
    },
    weeks_label: (n) => `${n} sem. no mês`,
    days_left: (n) => n === 0 ? 'Último dia!' : `${n} dias restantes`,
    cfg_lang: 'Idioma',
    cfg_theme: 'Tema',
    cfg_accent: 'Cor de destaque',
    cfg_start: 'Início da semana',
    cfg_week: 'N.º da semana',
    theme_dark: 'Escuro',
    theme_light: 'Claro',
    theme_trans: 'Cristal',
    start_mon: 'Segunda',
    start_sun: 'Domingo',
    weeknum_no: 'Não',
    weeknum_yes: 'Sim',
    btn_copy_link: '📋 Copiar link Notion',
    toast_copied: '✓ Link copiado',
    week_abbr: 'S',
  }
};

// ── ESTADO ────────────────────────────────────────────────
const state = {
  lang:     'es',
  theme:    'dark',
  accent:   '#6C63FF',
  weekStart:'mon',   // 'mon' | 'sun'
  showWeekNum: false,
  year:  new Date().getFullYear(),
  month: new Date().getMonth(),   // 0-based
};

const today = new Date();
today.setHours(0,0,0,0);

// ── HELPERS ───────────────────────────────────────────────
function getWeekNumber(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay(); // 0=Sun
}

function setAccentCSSVar(color) {
  document.documentElement.style.setProperty('--accent', color);
  // Soft & glow derivados
  document.documentElement.style.setProperty('--accent-soft', hexToRgba(color, 0.15));
  document.documentElement.style.setProperty('--accent-glow', hexToRgba(color, 0.35));
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ── RENDER CALENDARIO ─────────────────────────────────────
function renderCalendar() {
  const t = I18N[state.lang];
  const { year, month, weekStart, showWeekNum } = state;

  // Título
  document.getElementById('monthName').textContent = t.months[month];
  document.getElementById('yearName').textContent = year;

  // Hoy strip
  document.getElementById('todayLabel').textContent = t.today_fmt(today);

  // Cabecera días
  const daysHeader = document.getElementById('daysHeader');
  daysHeader.innerHTML = '';

  const dayLabels = weekStart === 'mon' ? t.days_mon : t.days_sun;
  const weekendIndices = weekStart === 'mon' ? [5,6] : [0,6]; // Sa,Do | Do,Sa

  if (showWeekNum) {
    const wl = document.createElement('div');
    wl.className = 'week-num-label';
    wl.textContent = t.week_abbr;
    daysHeader.appendChild(wl);
  }

  dayLabels.forEach((label, i) => {
    const el = document.createElement('div');
    el.className = 'day-label' + (weekendIndices.includes(i) ? ' weekend' : '');
    el.textContent = label;
    daysHeader.appendChild(el);
  });

  // Grid
  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  // Columnas
  const cols = showWeekNum ? 'show-weeknum' : '';
  grid.parentElement.className = 'cal-grid-wrap ' + cols;

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month); // 0=Sun

  // Ajustar primer día según weekStart
  // Si weekStart=mon, lunes=0: convertir de Sun=0 a Mon=0
  let startOffset = weekStart === 'mon'
    ? (firstDay + 6) % 7
    : firstDay;

  const daysInPrev = getDaysInMonth(year, month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1);

  let processedRows = new Set();

  // Generar celdas
  let cells = [];

  // Días del mes anterior (relleno)
  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, type: 'other-month prev' });
  }
  // Días del mes actual
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, type: 'cur-month' });
  }
  // Días del mes siguiente (relleno hasta completar cuadrícula)
  const total = Math.ceil(cells.length / 7) * 7;
  let nextDay = 1;
  while (cells.length < total) {
    cells.push({ day: nextDay++, type: 'other-month next' });
  }

  let weekCount = 0;
  cells.forEach((cell, idx) => {
    // Número de semana al inicio de cada fila
    if (showWeekNum && idx % 7 === 0) {
      weekCount++;
      // Calcular fecha real para esta celda
      const cellDate = new Date(year, month, cells[idx].type === 'cur-month' ? cells[idx].day : (cells[idx].type.includes('prev') ? -startOffset + idx + 1 : daysInMonth + (idx - (startOffset + daysInMonth - 1))));
      const wn = getWeekNumber(new Date(year, month, 1 + (idx - startOffset)));
      const wnEl = document.createElement('div');
      wnEl.className = 'cal-cell week-num';
      wnEl.textContent = wn;
      grid.appendChild(wnEl);
    }

    const el = document.createElement('div');
    el.className = 'cal-cell ' + cell.type;

    // ¿Es fin de semana?
    const colInWeek = idx % 7;
    if (weekendIndices.includes(colInWeek)) el.classList.add('weekend');

    // ¿Es hoy?
    if (cell.type === 'cur-month') {
      const cellDate = new Date(year, month, cell.day);
      cellDate.setHours(0,0,0,0);
      if (cellDate.getTime() === today.getTime()) {
        el.classList.add('today');
      }
    }

    el.textContent = cell.day;
    el.style.animationDelay = `${idx * 8}ms`;
    grid.appendChild(el);
  });

  // Footer
  const weeks = cells.length / 7;
  const lastDayOfMonth = new Date(year, month, daysInMonth);
  lastDayOfMonth.setHours(0,0,0,0);
  const daysLeft = Math.max(0, Math.ceil((lastDayOfMonth - today) / 86400000));
  document.getElementById('footerWeeks').textContent = t.weeks_label(weeks);
  document.getElementById('footerDaysLeft').textContent =
    (year === today.getFullYear() && month === today.getMonth())
      ? t.days_left(daysLeft)
      : '';

  // Traducciones config panel
  applyTranslations();
}

// ── TRADUCCIONES PANEL CONFIG ─────────────────────────────
function applyTranslations() {
  const t = I18N[state.lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });
}

// ── NAVEGACIÓN ────────────────────────────────────────────
document.getElementById('prevMonth').addEventListener('click', () => {
  state.month--;
  if (state.month < 0) { state.month = 11; state.year--; }
  renderCalendar();
});
document.getElementById('nextMonth').addEventListener('click', () => {
  state.month++;
  if (state.month > 11) { state.month = 0; state.year++; }
  renderCalendar();
});

// ── CONFIG PANEL ──────────────────────────────────────────
const panel = document.getElementById('configPanel');

document.getElementById('fabConfig').addEventListener('click', () => {
  panel.classList.toggle('open');
});
document.getElementById('configToggle').addEventListener('click', () => {
  panel.classList.remove('open');
});

// Idioma
document.querySelectorAll('#langGroup .pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#langGroup .pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.lang = btn.dataset.val;
    document.documentElement.lang = state.lang;
    renderCalendar();
  });
});

// Tema
document.querySelectorAll('#themeGroup .pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#themeGroup .pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.theme = btn.dataset.val;
    document.body.className = `theme-${state.theme}`;
    saveState();
  });
});

// Acento
document.querySelectorAll('#accentGroup .swatch:not(.custom-swatch)').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#accentGroup .swatch').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.accent = btn.dataset.color;
    setAccentCSSVar(state.accent);
    saveState();
  });
});

// Color personalizado
document.getElementById('customColor').addEventListener('input', (e) => {
  document.querySelectorAll('#accentGroup .swatch').forEach(b => b.classList.remove('active'));
  document.querySelector('.custom-swatch').classList.add('active');
  state.accent = e.target.value;
  setAccentCSSVar(state.accent);
  saveState();
});

// Inicio semana
document.querySelectorAll('#startGroup .pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#startGroup .pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.weekStart = btn.dataset.val;
    renderCalendar();
    saveState();
  });
});

// Número de semana
document.querySelectorAll('#weekNumGroup .pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#weekNumGroup .pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.showWeekNum = btn.dataset.val === 'yes';
    renderCalendar();
    saveState();
  });
});

// ── COPIAR ENLACE ─────────────────────────────────────────
document.getElementById('btnCopyLink').addEventListener('click', () => {
  // Construye la URL con los parámetros actuales como query string
  const params = new URLSearchParams({
    lang:  state.lang,
    theme: state.theme,
    accent: encodeURIComponent(state.accent),
    weekStart: state.weekStart,
    weekNum: state.showWeekNum ? '1' : '0'
  });
  const url = `${location.origin}${location.pathname}?${params.toString()}`;
  navigator.clipboard.writeText(url).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = url; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy');
    document.body.removeChild(ta);
  });
  showToast(I18N[state.lang].toast_copied);
});

// ── PERSISTENCIA (localStorage + URL params) ──────────────
function saveState() {
  try {
    localStorage.setItem('nw_cal', JSON.stringify({
      lang: state.lang, theme: state.theme,
      accent: state.accent, weekStart: state.weekStart,
      showWeekNum: state.showWeekNum
    }));
  } catch(e) {}
}

function loadState() {
  // 1. URL params tienen prioridad (para embed configurado)
  const params = new URLSearchParams(location.search);
  if (params.has('lang'))      state.lang      = params.get('lang');
  if (params.has('theme'))     state.theme     = params.get('theme');
  if (params.has('accent'))    state.accent    = decodeURIComponent(params.get('accent'));
  if (params.has('weekStart')) state.weekStart = params.get('weekStart');
  if (params.has('weekNum'))   state.showWeekNum = params.get('weekNum') === '1';

  // 2. Sino, localStorage
  if (!params.has('theme')) {
    try {
      const saved = JSON.parse(localStorage.getItem('nw_cal') || '{}');
      if (saved.lang)      state.lang      = saved.lang;
      if (saved.theme)     state.theme     = saved.theme;
      if (saved.accent)    state.accent    = saved.accent;
      if (saved.weekStart) state.weekStart = saved.weekStart;
      if (saved.showWeekNum !== undefined) state.showWeekNum = saved.showWeekNum;
    } catch(e) {}
  }
}

// ── TOAST ─────────────────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── APLICAR ESTADO INICIAL ────────────────────────────────
function applyInitialState() {
  document.body.className = `theme-${state.theme}`;
  setAccentCSSVar(state.accent);
  document.documentElement.lang = state.lang;

  // Pills activos
  document.querySelectorAll('#langGroup .pill').forEach(b => {
    b.classList.toggle('active', b.dataset.val === state.lang);
  });
  document.querySelectorAll('#themeGroup .pill').forEach(b => {
    b.classList.toggle('active', b.dataset.val === state.theme);
  });
  document.querySelectorAll('#startGroup .pill').forEach(b => {
    b.classList.toggle('active', b.dataset.val === state.weekStart);
  });
  document.querySelectorAll('#weekNumGroup .pill').forEach(b => {
    b.classList.toggle('active', b.dataset.val === (state.showWeekNum ? 'yes' : 'no'));
  });

  // Swatch activo por color
  let found = false;
  document.querySelectorAll('#accentGroup .swatch:not(.custom-swatch)').forEach(b => {
    const match = b.dataset.color === state.accent;
    b.classList.toggle('active', match);
    if (match) found = true;
  });
  if (!found) {
    document.querySelector('.custom-swatch').classList.add('active');
    document.getElementById('customColor').value = state.accent;
  }
}

// ── INIT ──────────────────────────────────────────────────
loadState();
applyInitialState();
renderCalendar();