// ─────────────────────────────────────────────────────────────
//  GabrielKey — dropdown do seletor de idioma (nav)
//  Depende de: languages.js (window.LANGUAGES)
//              i18n.js (window.setLang, window.getCurrentLang),
//              carregados antes deste arquivo.
//
//  Marcação esperada em index.html:
//    <button id="lang-menu-btn" onclick="toggleLangMenu()">
//      <img id="lang-menu-flag"> <span id="lang-menu-code"></span>
//    </button>
//    <div id="lang-menu-panel" class="hidden">...</div>
// ─────────────────────────────────────────────────────────────

const LANG_CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-indigo-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;

function buildLangMenuPanel() {
  const panel = document.getElementById('lang-menu-panel');
  if (!panel) return;

  const active = window.getCurrentLang();
  panel.innerHTML = window.LANGUAGES.map(({ code, name, flag }) => `
    <button type="button" onclick="selectLang('${code}')"
            class="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left hover:bg-slate-800/70 transition-colors ${code === active ? 'bg-slate-800/40' : ''}">
      <img src="${flag}" alt="" class="w-5 h-3.5 rounded-sm object-cover flex-shrink-0">
      <span class="flex-1 min-w-0 truncate ${code === active ? 'text-white font-medium' : 'text-slate-300'}">${name}</span>
      ${code === active ? LANG_CHECK_ICON : ''}
    </button>
  `).join('');
}

function renderLangMenuButton() {
  const meta = window.LANGUAGES.find(l => l.code === window.getCurrentLang());
  const flagEl = document.getElementById('lang-menu-flag');
  const codeEl = document.getElementById('lang-menu-code');
  if (!meta || !flagEl || !codeEl) return;

  flagEl.src = meta.flag;
  flagEl.alt = meta.name;
  codeEl.textContent = meta.code.toUpperCase();
}

function openLangMenu() {
  const panel = document.getElementById('lang-menu-panel');
  if (!panel) return;
  buildLangMenuPanel();
  panel.classList.remove('hidden');
  document.getElementById('lang-menu-btn')?.setAttribute('aria-expanded', 'true');
}

function closeLangMenu() {
  const panel = document.getElementById('lang-menu-panel');
  if (!panel) return;
  panel.classList.add('hidden');
  document.getElementById('lang-menu-btn')?.setAttribute('aria-expanded', 'false');
}

function toggleLangMenu() {
  const panel = document.getElementById('lang-menu-panel');
  if (!panel) return;
  panel.classList.contains('hidden') ? openLangMenu() : closeLangMenu();
}

function selectLang(code) {
  window.setLang(code);
  closeLangMenu();
}

document.addEventListener('click', (e) => {
  const panel = document.getElementById('lang-menu-panel');
  const btn = document.getElementById('lang-menu-btn');
  if (!panel || panel.classList.contains('hidden')) return;
  if (!panel.contains(e.target) && !btn.contains(e.target)) closeLangMenu();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLangMenu();
});

// i18n.js chama isso a cada troca de idioma para manter o botão
// do nav (bandeira + código) sincronizado.
window.onLangChange = renderLangMenuButton;

// Expõe globalmente para os onclick no HTML
window.toggleLangMenu = toggleLangMenu;
window.selectLang = selectLang;

renderLangMenuButton();
