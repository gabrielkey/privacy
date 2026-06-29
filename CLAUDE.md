# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static site for GabrielKey's privacy policy and app/game showcase. Deployed on GitHub Pages — no build step, no dependencies to install. Open `index.html` directly in a browser to preview.

## Architecture

| File | Role |
|---|---|
| `index.html` | Markup only. No logic. All translatable text starts empty — content is injected by `i18n.js` at load. Uses `<script type="module">` so ES imports work on GitHub Pages (HTTP). |
| `assets/js/i18n.js` | Engine: reads `window.LOCALE_PT` / `window.LOCALE_EN` (set by the locale scripts), exposes `window.setLang()` for the `onclick` handlers in HTML, and initializes the page. Language choice is persisted in `localStorage` under the key `gks-lang`. |
| `assets/js/locales/pt.js` | All Brazilian Portuguese strings — assigns `window.LOCALE_PT = { ... }`. |
| `assets/js/locales/en.js` | All English strings — assigns `window.LOCALE_EN = { ... }`. |
| `assets/flags/br.svg` / `us.svg` | From [hampusborgos/country-flags](https://github.com/hampusborgos/country-flags). Add a new SVG here if a new language is added. |

Styling is Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com">`). No `tailwind.config.js` — utility classes only.

> **Load order matters:** `index.html` carrega `pt.js` → `en.js` → `i18n.js` nessa sequência. Os locales precisam estar na `window` antes do engine rodar. Não usar `type="module"` — ES modules são bloqueados por CORS no protocolo `file://`, o que impede testar localmente sem servidor.

## How to add a new app or game card

1. Copy an existing card block in `index.html` (look for `<!-- CARD —`).
2. Set a new key prefix, e.g. `app2`, and update the emoji, platform badges, and `href`.
3. Add `'app2.name'` and `'app2.desc'` to **both** `assets/js/locales/pt.js` and `assets/js/locales/en.js`.

## How to add a new language

1. Copy `assets/js/locales/en.js` → `assets/js/locales/<code>.js` and translate all values.
2. Import it in `assets/js/i18n.js` and add to the `T` object.
3. Add a `<button>` in the nav language-switcher in `index.html`, following the `btn-pt` / `btn-en` pattern.
4. Save the corresponding flag SVG to `assets/flags/<code>.svg` (source: [hampusborgos/country-flags](https://github.com/hampusborgos/country-flags)).
5. Extend the `if/else` in `setLang()` inside `i18n.js` to handle the new button's `active`/`inactive` classes.

## i18n key conventions

- `nav.*` — navigation link labels  
- `hero.*` — hero section  
- `platform.*` — platform strip  
- `apps.*` — apps section header and shared labels  
- `appN.name` / `appN.desc` — per-card content (N = 1, 2, 3 …)  
- `sN.*` — privacy policy section N (title, body, intro, items)  
- `contact.*` — contact section  
- `footer.*` — footer  

Keys ending in `.items` hold **arrays** and are rendered by `buildList()` into `<ul data-list="...">` elements. All other keys are plain strings assigned via `el.textContent`.
