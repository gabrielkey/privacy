// ─────────────────────────────────────────────────────────────
//  GabrielKey — motor de internacionalização (i18n)
//  Depende de: languages.js (window.LANGUAGES)
//              locales/<code>.js (window.LOCALE_<CODE>), um por
//              idioma listado em LANGUAGES. Carregados como
//              scripts normais antes deste arquivo.
// ─────────────────────────────────────────────────────────────

const T = {};
window.LANGUAGES.forEach(({ code }) => {
  T[code] = window[`LOCALE_${code.toUpperCase()}`];
});

const VALID_LANGS = window.LANGUAGES.map(l => l.code);

function langMeta(lang) {
  return window.LANGUAGES.find(l => l.code === lang);
}

const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;

function buildList(key, lang) {
  return (T[lang][key] ?? [])
    .map(item => `<li class="flex items-start gap-2 text-slate-400 text-sm">${CHECK_ICON}<span>${item}</span></li>`)
    .join('');
}

let currentLang = 'pt';

function setLang(lang) {
  if (!VALID_LANGS.includes(lang)) return;

  currentLang = lang;
  const meta = langMeta(lang);
  localStorage.setItem('gks-lang', lang);
  document.documentElement.lang = meta.htmlLang;
  document.documentElement.dir = meta.dir;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = T[lang][el.dataset.i18n];
    if (val !== undefined) el.textContent = val;
  });

  document.querySelectorAll('[data-list]').forEach(el => {
    el.innerHTML = buildList(el.dataset.list, lang);
  });

  const mailLink = document.getElementById('mail-link');
  if (mailLink) {
    const subject = encodeURIComponent(T[lang]['contact.subjectValue']);
    mailLink.href = `mailto:flocov10@gmail.com?subject=${subject}`;
  }

  if (typeof window.onLangChange === 'function') window.onLangChange(lang);
}

// Expõe globalmente para os onclick no HTML e para outros scripts
// (lang-menu.js, store-modal.js) lerem o idioma ativo.
window.setLang = setLang;
window.getCurrentLang = () => currentLang;

// Idioma inicial: ?lang= na URL (usado pelas pastas english/,
// portuguese/, spanish/ etc.) > idioma salvo em localStorage > PT
// como padrão.
function resolveInitialLang() {
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (VALID_LANGS.includes(urlLang)) return urlLang;

  const saved = localStorage.getItem('gks-lang');
  if (VALID_LANGS.includes(saved)) return saved;

  return 'pt';
}

setLang(resolveInitialLang());
