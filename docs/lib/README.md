# vjkit public library

Free, lightweight, dependency-free JavaScript and CSS for any website: Blogger, WordPress, React, Next.js, Webflow, Shopify, Wix, Ghost or plain HTML.
Designed and developed by **Vijaya Kumar L (RisewithVJ)** · [risewithvj@gmail.com](mailto:risewithvj@gmail.com) · [LinkedIn](https://www.linkedin.com/in/vijayakumarl/)

[![jsDelivr hits per month](https://data.jsdelivr.com/v1/stats/packages/gh/risewithvj/vjkit/badge?style=rounded)](https://www.jsdelivr.com/package/gh/risewithvj/vjkit?tab=stats)
[![Docs](https://img.shields.io/badge/docs-live%20demos-2563eb?style=flat-square)](https://risewithvj.github.io/vjkit/)
[![Licence](https://img.shields.io/badge/licence-free%20with%20credit-059669?style=flat-square)](https://risewithvj.github.io/vjkit/licence/)

**Live demos, every option and copy-paste code:** https://risewithvj.github.io/vjkit/
**Usage stats:** https://risewithvj.github.io/vjkit/stats/ · **For AI tools:** https://risewithvj.github.io/vjkit/llms.txt

## Load from jsDelivr

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/risewithvj/vjkit@1/public/css/vj-toc.min.css">
<script defer src="https://cdn.jsdelivr.net/gh/risewithvj/vjkit@1/public/js/vj-toc.min.js"></script>
```

- `@1` = newest 1.x release (recommended). `@1.2.0` = this exact release.
- Base URL for every file: `https://cdn.jsdelivr.net/gh/risewithvj/vjkit@1/public/`
- Mirror (GitHub Pages): `https://risewithvj.github.io/vjkit/lib/`

## Files

| JavaScript | CSS | Feature | Main options |
|---|---|---|---|
| `js/vj-toc.min.js` | `css/vj-toc.min.css` | Table of contents | `data-style` box, numbered, sidebar, progress, float · `data-target` · `data-levels` |
| `js/vj-copy.min.js` | `css/vj-copy.min.css` | Copy code button | `data-style` corner, label, icon, bar · `data-selector` |
| `js/vj-cookie.min.js` | `css/vj-cookie.min.css` | Cookie consent (Consent Mode v2) | `data-style` card, bar, minimal, modal, choices · `data-policy` |
| `js/vj-offline.min.js` | `css/vj-offline.min.css` | Offline / online notice | `data-style` toast, bar, pill, full |
| `js/vj-theme.min.js` | `css/vj-theme.min.css` | Dark mode, colours, back-to-top | `data-toggle` · `data-colors` · `data-top` |
| `js/vj-bookmarks.min.js` | `css/vj-bookmarks.min.css` | Read later | `data-float` · `[data-vj-save]` · `[data-vj-saved]` |
| `js/vj-qr.min.js` | `css/vj-qr.min.css` | QR code generator + API | `[data-vj-qr-tool]` · `[data-vj-qr]` · `VJQR.svg()` |
| `js/vj-wa.min.js` | `css/vj-wa.min.css` | WhatsApp tools | `[data-vj-wa-tool]` · `[data-vj-wa]` · `data-float` |
| `js/vj-icons.min.js` | `css/vj-icons.min.css` | 179 animated icons | `data-vji` · `data-anim` · `data-color` · `data-size` |
| `js/vj-seo.min.js` | — | JSON-LD structured data | `data-type` · `data-author` · `data-publisher` |
| `js/vj-adblock.min.js` | `css/vj-adblock.min.css` | Ad-blocker notice | `data-style` card, banner, modal · `data-again` |
| `blogger/vj-topics.min.js` | `blogger/vj-blogger.min.css` | Blogger topic cards | `[data-vj-topics]` `data-style` cards, pills, list |
| `blogger/vj-chapters.min.js` | `blogger/vj-blogger.min.css` | Blogger previous / next | `[data-vj-chapters]` |
| `js/vj-all.min.js` | `css/vj-all.min.css` | Bundle: toc, copy, offline, theme, bookmarks, icons | — |
| — | `fonts/vj-fonts.css` | Inter, Space Grotesk, JetBrains Mono (SIL OFL 1.1, third-party) | — |

`manifest.json` lists every file and the current version.

## Link APIs
- QR: `https://risewithvj.github.io/vjkit/qr/?text=Hello&size=400` (`dark`, `light`, `level`, `download=png|svg`)
- WhatsApp: `https://risewithvj.github.io/vjkit/wa/?phone=919876543210&text=Hi`

## Licence
Free for personal and commercial use **with credit**. Do not modify, resell, re-publish or remove the credit notice.
Full text: [LICENCE.md](LICENCE.md) · https://risewithvj.github.io/vjkit/licence/
Permission and support: risewithvj@gmail.com · https://www.linkedin.com/in/vijayakumarl/
