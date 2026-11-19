# VJKit

Small, dependency-free scripts and styles shared across the websites of **Vijaya Kumar L (RisewithVJ)**.
Everything is plain JavaScript and CSS, served through [jsDelivr](https://www.jsdelivr.com/) from version tags.

## Layout

| Folder | Purpose |
|---|---|
| `shared/js`, `shared/css` | Modules reused by every site |
| `sites/<site-name>/` | Files for one site only |
| `sri.json` | Integrity (SRI) hash for every file, per version |
| `test/` | Automated tests (`npm test`) |

## Modules (v0.1.0)

| Module | What it does |
|---|---|
| `cookie-consent` | Cookie notice with Accept / Decline, 180-day first-party cookie, `vj:consent` event |
| `copy-code` | "Copy" button on code blocks (clipboard API with fallback) |
| `toc` | Table of contents built from `h2`/`h3`, with active-heading highlight |

## Use on a page

Always pin a version tag and add the hash from `sri.json`:

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/risewithvj/vjkit@v0.1.0/shared/css/cookie-consent.css"
      integrity="sha384-..." crossorigin="anonymous">
<script defer
        src="https://cdn.jsdelivr.net/gh/risewithvj/vjkit@v0.1.0/shared/js/cookie-consent.js"
        data-privacy-url="/p/privacy-policy.html"
        integrity="sha384-..." crossorigin="anonymous"></script>
```

Options are `data-*` attributes on the script tag (for example `data-days`, `data-message`, `data-source`, `data-target`, `data-min`).

## Notes

- The cookie notice records a choice. It is **not** a Google-certified consent platform. For AdSense in the EEA/UK, also enable Google's Privacy & messaging in your AdSense account.
- Never load `@main` in production. Release a new tag, update `sri.json` with `npm run sri`, then change the version in your theme.

## Develop

```
npm install
npm test
npm run sri
```

## Licence

MIT, see `LICENSE`. Designed and developed by [Vijaya Kumar L](https://www.linkedin.com/in/vijayakumarl/).
