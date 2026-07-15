# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static site for GabrielKey's privacy policy and app/game showcase. Deployed on GitHub Pages — no build step, no dependencies to install. Open `index.html` directly in a browser to preview.

## Architecture

| File | Role |
|---|---|
| `index.html` | Markup only. No logic. All translatable text starts empty — content is injected by `i18n.js` at load. Plain `<script>` tags (no `type="module"` — see load-order note below). |
| `assets/js/i18n.js` | Engine: reads `window.LOCALE_PT` / `window.LOCALE_EN` (set by the locale scripts), exposes `window.setLang()` for the `onclick` handlers in HTML and `window.getCurrentLang()` for other scripts, and initializes the page. Language choice is persisted in `localStorage` under the key `gks-lang`, and can be forced via the `?lang=pt` / `?lang=en` query string (see "Language URLs" below). |
| `assets/js/locales/pt.js` | All Brazilian Portuguese strings — assigns `window.LOCALE_PT = { ... }`. |
| `assets/js/locales/en.js` | All English strings — assigns `window.LOCALE_EN = { ... }`. |
| `assets/js/store-links.js` | Data only: `window.STORE_LINKS = { appN: { android, ios } }`. Use `null` (not `''`) for a platform that isn't published yet. |
| `assets/js/store-modal.js` | Engine: builds and controls the Android/iOS store-picker dialog on demand, reading from `STORE_LINKS`. Exposes `window.openStoreModal(appKey)`, used by the "Ver na loja" button on each app card. A platform with a `null` link renders as disabled with an "unavailable" label instead of being hidden. |
| `english/index.html`, `portuguese/index.html` | Static redirect stubs (meta-refresh + JS `location.replace`) so `/english/` and `/portuguese/` are shareable, stable URLs that land on `index.html?lang=en` / `?lang=pt`. See "Language URLs" below. |
| `assets/flags/br.svg` / `us.svg` | From [hampusborgos/country-flags](https://github.com/hampusborgos/country-flags). Add a new SVG here if a new language is added. |

Styling is Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com">`). No `tailwind.config.js` — utility classes only.

> **Load order matters:** `index.html` carrega `pt.js` → `en.js` → `i18n.js` → `store-links.js` → `store-modal.js` nessa sequência. Os locales precisam estar na `window` antes do engine rodar, e `i18n.js` precisa rodar antes de `store-modal.js` (que depende de `window.getCurrentLang()`). Não usar `type="module"` — ES modules são bloqueados por CORS no protocolo `file://`, o que impede testar localmente sem servidor.

## Language URLs

The root page always works with client-side language switching (`localStorage['gks-lang']`), but `/english/` and `/portuguese/` exist as stable, shareable URLs that force a specific language — useful for linking from app store listings or from an app's in-app language context, where you can't rely on the visitor's browser having a saved preference. They are static redirect stubs (no server-side routing on GitHub Pages) that forward to `index.html?lang=en` / `?lang=pt`; `resolveInitialLang()` in `i18n.js` reads that query param with priority over `localStorage`, then persists the choice so subsequent visits to `/` stay in that language.

## How to add a new app or game card

1. Copy an existing card block in `index.html` (look for `<!-- CARD —`).
2. Set a new key prefix, e.g. `app2`, and update the icon (`assets/apps/<slug>.png`) and platform badges.
3. Add `'app2.name'` and `'app2.desc'` to **both** `assets/js/locales/pt.js` and `assets/js/locales/en.js`.
4. Add an `app2` entry to `assets/js/store-links.js` with the real store URLs (`null` for platforms not published yet), and point the card's button at `onclick="openStoreModal('app2')"` — the Android/iOS picker and "unavailable" state are automatic from there, no modal markup to duplicate.

## How to add a new language

1. Copy `assets/js/locales/en.js` → `assets/js/locales/<code>.js` and translate all values.
2. Import it in `assets/js/i18n.js` and add to the `T` object.
3. Add a `<button>` in the nav language-switcher in `index.html`, following the `btn-pt` / `btn-en` pattern.
4. Save the corresponding flag SVG to `assets/flags/<code>.svg` (source: [hampusborgos/country-flags](https://github.com/hampusborgos/country-flags)).
5. Extend the `if/else` in `setLang()` inside `i18n.js` to handle the new button's `active`/`inactive` classes.
6. Optionally add a stable language URL: copy `english/index.html` into a new `<language-name>/index.html` and change `?lang=en` to the new code in both the meta-refresh and the `location.replace` call.

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
