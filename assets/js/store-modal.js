// ─────────────────────────────────────────────────────────────
//  GabrielKey — modal de seleção de loja (Android / iOS)
//  Depende de: store-links.js (window.STORE_LINKS)
//              i18n.js (window.getCurrentLang), carregados antes.
//
//  Uso: <button onclick="openStoreModal('app1')">Ver na loja</button>
//  Para reutilizar em um novo card de app, basta chamar
//  openStoreModal('appX') apontando para a chave em store-links.js —
//  nenhum HTML ou JS adicional é necessário.
// ─────────────────────────────────────────────────────────────

const STORE_MODAL_TEXT = {
  en: { title: 'Choose your platform', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'Not available yet', close: 'Close' },
  pt: { title: 'Escolha sua plataforma', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'Indisponível no momento', close: 'Fechar' },
  es: { title: 'Elige tu plataforma', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'No disponible por el momento', close: 'Cerrar' },
  fr: { title: 'Choisissez votre plateforme', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'Pas encore disponible', close: 'Fermer' },
  de: { title: 'Wählen Sie Ihre Plattform', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'Derzeit nicht verfügbar', close: 'Schließen' },
  it: { title: 'Scegli la tua piattaforma', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'Non ancora disponibile', close: 'Chiudi' },
  ja: { title: 'プラットフォームを選択', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: '現在ご利用いただけません', close: '閉じる' },
  ko: { title: '플랫폼을 선택하세요', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: '아직 이용할 수 없음', close: '닫기' },
  ar: { title: 'اختر منصتك', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'غير متاح حاليًا', close: 'إغلاق' },
  ru: { title: 'Выберите платформу', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'Пока недоступно', close: 'Закрыть' },
  zh: { title: '选择您的平台', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: '暂不可用', close: '关闭' },
  id: { title: 'Pilih platform Anda', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'Belum tersedia', close: 'Tutup' },
  tr: { title: 'Platformunuzu seçin', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'Henüz kullanılamıyor', close: 'Kapat' },
  vi: { title: 'Chọn nền tảng của bạn', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'Chưa khả dụng', close: 'Đóng' },
  th: { title: 'เลือกแพลตฟอร์มของคุณ', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'ยังไม่พร้อมใช้งาน', close: 'ปิด' },
  pl: { title: 'Wybierz swoją platformę', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'Jeszcze niedostępne', close: 'Zamknij' },
  hi: { title: 'अपना प्लेटफ़ॉर्म चुनें', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'अभी उपलब्ध नहीं है', close: 'बंद करें' },
  bn: { title: 'আপনার প্ল্যাটফর্ম নির্বাচন করুন', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'এখনও উপলব্ধ নয়', close: 'বন্ধ করুন' },
  ur: { title: 'اپنا پلیٹ فارم منتخب کریں', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'ابھی دستیاب نہیں', close: 'بند کریں' },
  nl: { title: 'Kies uw platform', android: 'Android', androidSub: 'Google Play', ios: 'iOS', iosSub: 'App Store', unavailable: 'Nog niet beschikbaar', close: 'Sluiten' },
};

function storeModalText() {
  return STORE_MODAL_TEXT[window.getCurrentLang()] || STORE_MODAL_TEXT.en;
}

let storeModalEl = null;

function buildStoreModal() {
  const el = document.createElement('div');
  el.id = 'store-modal';
  el.className = 'fixed inset-0 z-[100] hidden items-center justify-center p-4';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-labelledby', 'store-modal-title');

  el.innerHTML = `
    <div data-store-backdrop class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
    <div class="relative bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
      <div class="flex items-center justify-between mb-5">
        <h3 id="store-modal-title" class="text-white font-semibold text-lg"></h3>
        <button data-store-close type="button" class="text-slate-500 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div data-store-options class="space-y-3"></div>
    </div>
  `;

  document.body.appendChild(el);
  el.querySelector('[data-store-backdrop]').addEventListener('click', closeStoreModal);
  el.querySelector('[data-store-close]').addEventListener('click', closeStoreModal);

  return el;
}

function storePlatformRow(label, sublabel, url) {
  if (url) {
    return `
      <a href="${url}" target="_blank" rel="noopener noreferrer"
         class="flex items-center gap-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl p-4 transition-colors">
        <div class="flex-1 min-w-0 text-left">
          <div class="text-white font-medium text-sm">${label}</div>
          <div class="text-slate-400 text-xs">${sublabel}</div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>`;
  }

  const text = storeModalText();
  return `
    <div class="flex items-center gap-3 bg-slate-800/20 border border-slate-800 rounded-xl p-4 opacity-60 cursor-not-allowed" aria-disabled="true">
      <div class="flex-1 min-w-0 text-left">
        <div class="text-slate-400 font-medium text-sm">${label}</div>
        <div class="text-slate-500 text-xs">${text.unavailable}</div>
      </div>
    </div>`;
}

function openStoreModal(appKey) {
  const links = (window.STORE_LINKS && window.STORE_LINKS[appKey]) || {};
  const text = storeModalText();

  if (!storeModalEl) storeModalEl = buildStoreModal();

  storeModalEl.querySelector('#store-modal-title').textContent = text.title;
  storeModalEl.querySelector('[data-store-close]').setAttribute('aria-label', text.close);
  storeModalEl.querySelector('[data-store-options]').innerHTML =
    storePlatformRow(text.android, text.androidSub, links.android || null) +
    storePlatformRow(text.ios, text.iosSub, links.ios || null);

  storeModalEl.classList.remove('hidden');
  storeModalEl.classList.add('flex');
  document.body.classList.add('overflow-hidden');
}

function closeStoreModal() {
  if (!storeModalEl) return;
  storeModalEl.classList.add('hidden');
  storeModalEl.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && storeModalEl && !storeModalEl.classList.contains('hidden')) {
    closeStoreModal();
  }
});

// Expõe globalmente para os onclick no HTML
window.openStoreModal = openStoreModal;
window.closeStoreModal = closeStoreModal;
