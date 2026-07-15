# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static site for GabrielKey's privacy policy and app/game showcase. Deployed on GitHub Pages — no build step, no dependencies to install. Open `index.html` directly in a browser to preview.

## Architecture

| File | Role |
|---|---|
| `index.html` | Markup only. No logic. All translatable text starts empty — content is injected by `i18n.js` at load. Plain `<script>` tags (no `type="module"` — see load-order note below). |
| `assets/js/languages.js` | Data only: `window.LANGUAGES`, an array of `{ code, name, flag, htmlLang, dir, urlName }` — one entry per supported language. Single source of truth for the language dropdown, the i18n engine, and the stable URL folder names. |
| `assets/js/i18n.js` | Engine: builds `T[code]` from `window.LANGUAGES` + each `window.LOCALE_<CODE>`, exposes `window.setLang()` for the `onclick` handlers in HTML and `window.getCurrentLang()` for other scripts, and initializes the page (sets `<html lang>` and `dir` per language, including `rtl` for Arabic/Urdu). Language choice is persisted in `localStorage` under the key `gks-lang`, and can be forced via the `?lang=<code>` query string (see "Language URLs" below). |
| `assets/js/locales/<code>.js` | All strings for one language — assigns `window.LOCALE_<CODE> = { ... }` (e.g. `LOCALE_PT`, `LOCALE_JA`). 20 languages currently: en, pt, es, fr, de, it, ja, ko, ar, ru, zh, id, tr, vi, th, pl, hi, bn, ur, nl — matching the languages shipped in the `geo` app ([data/i18n/*.ts](../geo/data/i18n)). Every locale file must have the exact same key set as the others (checked by a parity script — see "How to add a new language"). |
| `assets/js/lang-menu.js` | Engine: builds and controls the language-picker dropdown in the nav from `LANGUAGES`, reading/writing via `window.setLang()` / `window.getCurrentLang()`. Exposes `window.toggleLangMenu()` / `window.selectLang(code)`. Keeps the nav button (flag + code) in sync via `window.onLangChange`, called by `i18n.js` on every language switch. |
| `assets/js/store-links.js` | Data only: `window.STORE_LINKS = { appN: { android, ios } }`. Use `null` (not `''`) for a platform that isn't published yet. |
| `assets/js/store-modal.js` | Engine: builds and controls the Android/iOS store-picker dialog on demand, reading from `STORE_LINKS`. `STORE_MODAL_TEXT` has its own translations for all 20 languages (falls back to `en` for unknown codes). Exposes `window.openStoreModal(appKey)`, used by the "Ver na loja" button on each app card. A platform with a `null` link renders as disabled with an "unavailable" label instead of being hidden. |
| `english/`, `portuguese/`, `spanish/`, `french/`, `german/`, `italian/`, `japanese/`, `korean/`, `arabic/`, `russian/`, `chinese/`, `indonesian/`, `turkish/`, `vietnamese/`, `thai/`, `polish/`, `hindi/`, `bengali/`, `urdu/`, `dutch/` | Static redirect stubs (meta-refresh + JS `location.replace`), one per language in `LANGUAGES` (`urlName` field), so e.g. `/japanese/` is a shareable, stable URL that lands on `index.html?lang=ja`. See "Language URLs" below. |
| `assets/flags/*.svg` | From [hampusborgos/country-flags](https://github.com/hampusborgos/country-flags) — copied from the `geo` app's own `assets/flags/` where possible, so both projects stay visually consistent. Add a new SVG here if a new language is added. |

Styling is Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com">`). No `tailwind.config.js` — utility classes only.

> **Load order matters:** `index.html` carrega `languages.js` → cada `locales/<code>.js` (en primeiro, depois os demais) → `i18n.js` → `lang-menu.js` → `store-links.js` → `store-modal.js` nessa sequência. `languages.js` e todos os locales precisam estar na `window` antes do `i18n.js` rodar; `i18n.js` precisa rodar antes de `lang-menu.js` e `store-modal.js` (ambos dependem de `window.getCurrentLang()`). Não usar `type="module"` — ES modules são bloqueados por CORS no protocolo `file://`, o que impede testar localmente sem servidor.

## Language URLs

The root page always works with client-side language switching (`localStorage['gks-lang']` + the nav dropdown), but every language also has a stable, shareable URL under its `urlName` from `languages.js` (e.g. `/japanese/`, `/arabic/`) — useful for linking from app store listings or from the `geo` app's own in-app language context, where you can't rely on the visitor's browser having a saved preference. These are static redirect stubs (no server-side routing on GitHub Pages) that forward to `index.html?lang=<code>`; `resolveInitialLang()` in `i18n.js` reads that query param with priority over `localStorage`, then persists the choice so subsequent visits to `/` stay in that language.

## How to add a new app or game card

1. Copy an existing card block in `index.html` (look for `<!-- CARD —`).
2. Set a new key prefix, e.g. `app2`, and update the icon (`assets/apps/<slug>.png`) and platform badges.
3. Add `'app2.name'` and `'app2.desc'` to **every** file in `assets/js/locales/` — use the app's own localized name per language if one exists (e.g. from the app's own `data/i18n/<code>.ts`), not a machine translation, so the name shown here matches what's inside the app.
4. Add an `app2` entry to `assets/js/store-links.js` with the real store URLs (`null` for platforms not published yet), and point the card's button at `onclick="openStoreModal('app2')"` — the Android/iOS picker and "unavailable" state are automatic from there, no modal markup to duplicate.

## How to add a new language

1. Add an entry to `window.LANGUAGES` in `assets/js/languages.js`: `code` (ISO 639-1), `name` (native name, e.g. `'Čeština'`), `flag` (path under `assets/flags/`), `htmlLang` (BCP47), `dir` (`'ltr'` or `'rtl'`), `urlName` (English word used for the stable URL folder).
2. Copy `assets/js/locales/en.js` → `assets/js/locales/<code>.js`, translate every value professionally (not literally), and assign to `window.LOCALE_<CODE>` (uppercase).
3. Add a `<script src="assets/js/locales/<code>.js"></script>` tag in `index.html`, anywhere before `i18n.js`.
4. Add the flag SVG to `assets/flags/<code>.svg` (source: [hampusborgos/country-flags](https://github.com/hampusborgos/country-flags); the `geo` app's `assets/flags/` already has most of them).
5. Add translations for the 7 keys in `STORE_MODAL_TEXT` inside `assets/js/store-modal.js`.
6. Add a stable language URL: copy `english/index.html` into `<urlName>/index.html` and change `?lang=en` to the new code in the meta-refresh, canonical link, and `location.replace` call (add `dir="rtl"` on `<html>` for RTL languages).
7. Verify: `node -c` every new file, and confirm the new locale has the exact same key set as the others — e.g. `python3 -c "import re; ref=set(re.findall(r\"'([\w.]+)':\", open('assets/js/locales/en.js').read())); new=set(re.findall(r\"'([\w.]+)':\", open('assets/js/locales/<code>.js').read())); print(ref - new, new - ref)"` should print two empty sets.

## i18n key conventions

- `nav.*` — navigation link labels  
- `hero.*` — hero section  
- `platform.*` — platform strip  
- `apps.*` — apps section header and shared labels  
- `appN.name` / `appN.desc` — per-card content (N = 1, 2, 3 …)  
- `sN.*` — privacy policy section N (title, body, intro, items)  
- `contact.*` — contact section  
- `footer.*` — footer  

Keys ending in `.items` hold **arrays** and are rendered by `buildList()` into `<ul data-list="...">` elements. All other keys are plain strings assigned via `el.textContent`. Store platform names/labels (Android, iOS, "unavailable", etc.) live in `STORE_MODAL_TEXT` inside `store-modal.js`, not in the locale files, since they're shared UI chrome rather than page content.
