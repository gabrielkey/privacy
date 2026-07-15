// ─────────────────────────────────────────────────────────────
//  GabrielKey — metadados dos idiomas suportados
//  Fonte da verdade única para: i18n.js (carregar o locale certo),
//  lang-menu.js (montar o dropdown de idiomas) e para nomear as
//  pastas de URL estável (english/, portuguese/, spanish/, ...).
//
//  Para adicionar um novo idioma, veja "How to add a new language"
//  no CLAUDE.md — resume-se a: 1) uma entrada aqui, 2) um novo
//  assets/js/locales/<code>.js, 3) uma nova pasta <urlName>/index.html.
// ─────────────────────────────────────────────────────────────

window.LANGUAGES = [
  { code: 'en', name: 'English',          flag: 'assets/flags/us.svg', htmlLang: 'en',    dir: 'ltr', urlName: 'english' },
  { code: 'pt', name: 'Português',        flag: 'assets/flags/br.svg', htmlLang: 'pt-BR', dir: 'ltr', urlName: 'portuguese' },
  { code: 'es', name: 'Español',          flag: 'assets/flags/es.svg', htmlLang: 'es',    dir: 'ltr', urlName: 'spanish' },
  { code: 'fr', name: 'Français',         flag: 'assets/flags/fr.svg', htmlLang: 'fr',    dir: 'ltr', urlName: 'french' },
  { code: 'de', name: 'Deutsch',          flag: 'assets/flags/de.svg', htmlLang: 'de',    dir: 'ltr', urlName: 'german' },
  { code: 'it', name: 'Italiano',         flag: 'assets/flags/it.svg', htmlLang: 'it',    dir: 'ltr', urlName: 'italian' },
  { code: 'ja', name: '日本語',            flag: 'assets/flags/jp.svg', htmlLang: 'ja',    dir: 'ltr', urlName: 'japanese' },
  { code: 'ko', name: '한국어',            flag: 'assets/flags/kr.svg', htmlLang: 'ko',    dir: 'ltr', urlName: 'korean' },
  { code: 'ar', name: 'العربية',          flag: 'assets/flags/sa.svg', htmlLang: 'ar',    dir: 'rtl', urlName: 'arabic' },
  { code: 'ru', name: 'Русский',          flag: 'assets/flags/ru.svg', htmlLang: 'ru',    dir: 'ltr', urlName: 'russian' },
  { code: 'zh', name: '简体中文',          flag: 'assets/flags/cn.svg', htmlLang: 'zh-CN', dir: 'ltr', urlName: 'chinese' },
  { code: 'id', name: 'Bahasa Indonesia', flag: 'assets/flags/id.svg', htmlLang: 'id',    dir: 'ltr', urlName: 'indonesian' },
  { code: 'tr', name: 'Türkçe',           flag: 'assets/flags/tr.svg', htmlLang: 'tr',    dir: 'ltr', urlName: 'turkish' },
  { code: 'vi', name: 'Tiếng Việt',       flag: 'assets/flags/vn.svg', htmlLang: 'vi',    dir: 'ltr', urlName: 'vietnamese' },
  { code: 'th', name: 'ไทย',              flag: 'assets/flags/th.svg', htmlLang: 'th',    dir: 'ltr', urlName: 'thai' },
  { code: 'pl', name: 'Polski',           flag: 'assets/flags/pl.svg', htmlLang: 'pl',    dir: 'ltr', urlName: 'polish' },
  { code: 'hi', name: 'हिन्दी',           flag: 'assets/flags/in.svg', htmlLang: 'hi',    dir: 'ltr', urlName: 'hindi' },
  { code: 'bn', name: 'বাংলা',            flag: 'assets/flags/bd.svg', htmlLang: 'bn',    dir: 'ltr', urlName: 'bengali' },
  { code: 'ur', name: 'اردو',             flag: 'assets/flags/pk.svg', htmlLang: 'ur',    dir: 'rtl', urlName: 'urdu' },
  { code: 'nl', name: 'Nederlands',       flag: 'assets/flags/nl.svg', htmlLang: 'nl',    dir: 'ltr', urlName: 'dutch' },
];
