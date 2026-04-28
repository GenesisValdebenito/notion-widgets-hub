/* ===========================
   NOTION WIDGETS HUB — script.js
   =========================== */

// ── i18n ────────────────────────────────────────────────
const TRANSLATIONS = {
  es: {
    badge: "Open Source · GitHub Pages",
    hero_line1: "Widgets interactivos",
    hero_line2: "para tu Notion",
    hero_sub: "Calendarios, relojes, cronómetros y más. Personaliza colores, idioma y transparencia. Copia el enlace e insértalo en cualquier página de Notion.",
    cta_explore: "Explorar widgets",
    cta_how: "Cómo funciona",
    stat_widgets: "Widgets",
    stat_langs: "Idiomas",
    stat_themes: "Temas",
    how_title: "Cómo insertar en Notion",
    step1_title: "Elige un widget",
    step1_desc: "Selecciona el widget de la galería. Configura su tema, colores e idioma con los controles integrados.",
    step2_title: "Copia el enlace",
    step2_desc: 'Haz clic en "Copiar enlace". Obtienes la URL directa del widget alojado en GitHub Pages.',
    step3_title: "Inserta en Notion",
    step3_desc: "En Notion, escribe /embed, pega el enlace y listo. El widget aparece interactivo en tu página.",
    gallery_title: "Biblioteca de Widgets",
    filter_all: "Todos",
    filter_time: "Tiempo",
    filter_prod: "Productividad",
    filter_visual: "Visual",
    tag_time: "Tiempo",
    tag_prod: "Productividad",
    tag_visual: "Visual",
    widget_cal: "Calendario",
    widget_cal_desc: "Calendario mensual interactivo con navegación. Fondo transparente o personalizable.",
    widget_clock: "Reloj",
    widget_clock_desc: "Reloj analógico y digital en tiempo real. Elige entre múltiples estilos y zonas horarias.",
    widget_timer: "Temporizador",
    widget_timer_desc: "Temporizador con modo Pomodoro. Configura intervalos de trabajo y descanso.",
    widget_stop: "Cronómetro",
    widget_stop_desc: "Cronómetro con registro de vueltas. Precisión de centésimas de segundo.",
    widget_quote: "Frase del Día",
    widget_quote_desc: "Frases inspiradoras que cambian cada día. Categorías: motivación, filosofía, ciencia.",
    widget_prog: "Progreso del Año",
    widget_prog_desc: "Barras de progreso para el año, mes y semana en curso. Actualización automática.",
    status_ready: "● Disponible",
    status_soon: "○ Próximamente",
    btn_copy: "Copiar enlace",
    btn_soon: "En desarrollo",
    prev_running: "En marcha...",
    prev_year: "Año 2025",
    prev_month: "Mes",
    prev_week: "Semana",
    footer: "Hecho con ♥ · Open Source en GitHub · Los widgets son gratuitos para siempre",
    toast_copied: "✓ Enlace copiado",
    toast_pending: "○ Widget en desarrollo"
  },
  en: {
    badge: "Open Source · GitHub Pages",
    hero_line1: "Interactive widgets",
    hero_line2: "for your Notion",
    hero_sub: "Calendars, clocks, stopwatches and more. Customize colors, language and transparency. Copy the link and embed it in any Notion page.",
    cta_explore: "Explore widgets",
    cta_how: "How it works",
    stat_widgets: "Widgets",
    stat_langs: "Languages",
    stat_themes: "Themes",
    how_title: "How to embed in Notion",
    step1_title: "Choose a widget",
    step1_desc: "Select the widget from the gallery. Configure its theme, colors, and language using the built-in controls.",
    step2_title: "Copy the link",
    step2_desc: 'Click "Copy link". You get the direct URL of the widget hosted on GitHub Pages.',
    step3_title: "Embed in Notion",
    step3_desc: "In Notion, type /embed, paste the link and done. The widget appears interactive on your page.",
    gallery_title: "Widget Library",
    filter_all: "All",
    filter_time: "Time",
    filter_prod: "Productivity",
    filter_visual: "Visual",
    tag_time: "Time",
    tag_prod: "Productivity",
    tag_visual: "Visual",
    widget_cal: "Calendar",
    widget_cal_desc: "Interactive monthly calendar with navigation. Transparent or customizable background.",
    widget_clock: "Clock",
    widget_clock_desc: "Analog and digital real-time clock. Choose between multiple styles and time zones.",
    widget_timer: "Timer",
    widget_timer_desc: "Timer with Pomodoro mode. Configure work and break intervals.",
    widget_stop: "Stopwatch",
    widget_stop_desc: "Stopwatch with lap recording. Hundredths of a second precision.",
    widget_quote: "Quote of the Day",
    widget_quote_desc: "Inspiring quotes that change daily. Categories: motivation, philosophy, science.",
    widget_prog: "Year Progress",
    widget_prog_desc: "Progress bars for the current year, month and week. Automatic updates.",
    status_ready: "● Available",
    status_soon: "○ Coming soon",
    btn_copy: "Copy link",
    btn_soon: "In development",
    prev_running: "Running...",
    prev_year: "Year 2025",
    prev_month: "Month",
    prev_week: "Week",
    footer: "Made with ♥ · Open Source on GitHub · Widgets are free forever",
    toast_copied: "✓ Link copied",
    toast_pending: "○ Widget in development"
  },
  pt: {
    badge: "Open Source · GitHub Pages",
    hero_line1: "Widgets interativos",
    hero_line2: "para o seu Notion",
    hero_sub: "Calendários, relógios, cronômetros e mais. Personalize cores, idioma e transparência. Copie o link e insira em qualquer página do Notion.",
    cta_explore: "Explorar widgets",
    cta_how: "Como funciona",
    stat_widgets: "Widgets",
    stat_langs: "Idiomas",
    stat_themes: "Temas",
    how_title: "Como inserir no Notion",
    step1_title: "Escolha um widget",
    step1_desc: "Selecione o widget da galeria. Configure seu tema, cores e idioma com os controles integrados.",
    step2_title: "Copie o link",
    step2_desc: 'Clique em "Copiar link". Você obtém a URL direta do widget hospedado no GitHub Pages.',
    step3_title: "Insira no Notion",
    step3_desc: "No Notion, digite /embed, cole o link e pronto. O widget aparece interativo na sua página.",
    gallery_title: "Biblioteca de Widgets",
    filter_all: "Todos",
    filter_time: "Tempo",
    filter_prod: "Produtividade",
    filter_visual: "Visual",
    tag_time: "Tempo",
    tag_prod: "Produtividade",
    tag_visual: "Visual",
    widget_cal: "Calendário",
    widget_cal_desc: "Calendário mensal interativo com navegação. Fundo transparente ou personalizável.",
    widget_clock: "Relógio",
    widget_clock_desc: "Relógio analógico e digital em tempo real. Escolha entre vários estilos e fusos horários.",
    widget_timer: "Temporizador",
    widget_timer_desc: "Temporizador com modo Pomodoro. Configure intervalos de trabalho e descanso.",
    widget_stop: "Cronômetro",
    widget_stop_desc: "Cronômetro com registro de voltas. Precisão de centésimos de segundo.",
    widget_quote: "Frase do Dia",
    widget_quote_desc: "Frases inspiradoras que mudam a cada dia. Categorias: motivação, filosofia, ciência.",
    widget_prog: "Progresso do Ano",
    widget_prog_desc: "Barras de progresso para o ano, mês e semana correntes. Atualização automática.",
    status_ready: "● Disponível",
    status_soon: "○ Em breve",
    btn_copy: "Copiar link",
    btn_soon: "Em desenvolvimento",
    prev_running: "Rodando...",
    prev_year: "Ano 2025",
    prev_month: "Mês",
    prev_week: "Semana",
    footer: "Feito com ♥ · Open Source no GitHub · Widgets são gratuitos para sempre",
    toast_copied: "✓ Link copiado",
    toast_pending: "○ Widget em desenvolvimento"
  }
};

let currentLang = 'es';

function applyTranslations(lang) {
  currentLang = lang;
  const t = TRANSLATIONS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });
  // update html lang
  document.documentElement.lang = lang;
}

// Language buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyTranslations(btn.dataset.lang);
  });
});

// ── FILTER ────────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.card').forEach(card => {
      const cats = card.dataset.category || '';
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── COPY LINK ─────────────────────────────────────────────
const BASE_URL = 'https://github.com/GenesisValdebenito/notion-widgets-hub.git';

// Widget → branch mapping (GitHub Pages deploy from branch)
const WIDGET_BRANCHES = {
  'widget/calendar':  `${BASE_URL}/widget-calendar/`,
  'widget/clock':     `${BASE_URL}/widget-clock/`,
  'widget/timer':     `${BASE_URL}/widget-timer/`,
  'widget/stopwatch': `${BASE_URL}/widget-stopwatch/`,
};

function copyLink(widgetPath) {
  const url = WIDGET_BRANCHES[widgetPath];
  const t = TRANSLATIONS[currentLang];
  if (!url) {
    showToast(t.toast_pending);
    return;
  }
  navigator.clipboard.writeText(url).then(() => {
    showToast(`${t.toast_copied}: ${url}`);
  }).catch(() => {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = url;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(t.toast_copied);
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── SCROLL REVEAL ─────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => observer.observe(card));

// ── LIVE CLOCK PREVIEW ────────────────────────────────────
function updateClockPreview() {
  const now = new Date();
  const h = now.getHours() % 12;
  const m = now.getMinutes();
  const s = now.getSeconds();
  const hourDeg  = h * 30 + m * 0.5;
  const minDeg   = m * 6 + s * 0.1;
  const hourHand = document.getElementById('demoHour');
  const minHand  = document.getElementById('demoMin');
  const digital  = document.querySelector('.clock-digital');
  if (hourHand) hourHand.style.transform = `rotate(${hourDeg}deg)`;
  if (minHand)  minHand.style.transform  = `rotate(${minDeg}deg)`;
  if (digital) {
    const hh = String(now.getHours()).padStart(2,'0');
    const mm = String(now.getMinutes()).padStart(2,'0');
    const ss = String(now.getSeconds()).padStart(2,'0');
    digital.textContent = `${hh}:${mm}:${ss}`;
  }
}
setInterval(updateClockPreview, 1000);
updateClockPreview();

// ── INIT ──────────────────────────────────────────────────
applyTranslations('es');