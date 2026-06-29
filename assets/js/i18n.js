// ─────────────────────────────────────────────────────────────
//  GabrielKey — motor de internacionalização (i18n)
//  Depende de: locales/pt.js (window.LOCALE_PT)
//              locales/en.js (window.LOCALE_EN)
//  Carregados como scripts normais antes deste arquivo.
// ─────────────────────────────────────────────────────────────

const T = { pt: window.LOCALE_PT, en: window.LOCALE_EN };

const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;

function buildList(key, lang) {
  return (T[lang][key] ?? [])
    .map(item => `<li class="flex items-start gap-2 text-slate-400 text-sm">${CHECK_ICON}<span>${item}</span></li>`)
    .join('');
}

function setLang(lang) {
  localStorage.setItem('gks-lang', lang);
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

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

  const btnPt = document.getElementById('btn-pt');
  const btnEn = document.getElementById('btn-en');
  if (lang === 'pt') {
    btnPt.classList.replace('inactive', 'active');
    btnEn.classList.replace('active', 'inactive');
  } else {
    btnEn.classList.replace('inactive', 'active');
    btnPt.classList.replace('active', 'inactive');
  }
}

// Expõe globalmente para os onclick no HTML
window.setLang = setLang;

// Inicializa com o idioma salvo ou PT como padrão
setLang(localStorage.getItem('gks-lang') || 'pt');
