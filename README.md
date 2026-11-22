<div align="center">

# vjkit · Free JavaScript & CSS Website Tools

**Lightweight, dependency-free UI scripts for Blogger, WordPress, React, Next.js and any HTML website — loaded from jsDelivr in one line.**

By **[Vijaya Kumar L (RisewithVJ)](https://www.linkedin.com/in/vijayakumarl/)**

[![jsDelivr hits per month](https://data.jsdelivr.com/v1/stats/packages/gh/risewithvj/vjkit/badge?style=rounded)](https://www.jsdelivr.com/package/gh/risewithvj/vjkit?tab=stats)
[![jsDelivr rank](https://data.jsdelivr.com/v1/stats/packages/gh/risewithvj/vjkit/badge?type=rank&style=rounded)](https://www.jsdelivr.com/package/gh/risewithvj/vjkit?tab=stats)
[![Docs](https://img.shields.io/badge/docs-live%20demos-2563eb?style=flat-square)](https://risewithvj.github.io/vjkit/)
[![Licence](https://img.shields.io/badge/licence-free%20with%20credit-059669?style=flat-square)](https://risewithvj.github.io/vjkit/licence/)
[![No dependencies](https://img.shields.io/badge/dependencies-0-0a1931?style=flat-square)](#)

[**Live demos & docs**](https://risewithvj.github.io/vjkit/) · [**Usage stats**](https://risewithvj.github.io/vjkit/stats/) · [**QR tool**](https://risewithvj.github.io/vjkit/qr/) · [**WhatsApp tool**](https://risewithvj.github.io/vjkit/wa/) · [**llms.txt**](https://risewithvj.github.io/vjkit/llms.txt)

</div>

---

## Why vjkit

- **One line to add, zero setup.** Paste a `<link>` and a `<script>` from jsDelivr's global CDN. No npm, no build step, no framework.
- **Tiny and fast.** Plain ES2018 JavaScript and CSS, minified, loaded with `defer`. No jQuery, no trackers, no cookies of our own.
- **Works everywhere.** Blogger, WordPress, React, Next.js, Vue, Webflow, Shopify, Wix, Ghost, Hugo, Jekyll and static HTML.
- **Multiple styles per feature.** Configure with simple `data-` attributes and theme with CSS variables (`--vj-accent`, `--vj-radius` …).
- **Accessible by default.** Keyboard focus, ARIA roles, `prefers-color-scheme` dark mode and `prefers-reduced-motion` support.
- **Privacy-friendly.** QR codes, WhatsApp links and bookmarks are created in the visitor's browser. Nothing is sent to any server.

## Features

| Feature | What it does | Styles | Files (`public/`) |
|---|---|---|---|
| **Table of contents** | Auto TOC from headings, active-section highlight, smooth scroll, reading progress | box · numbered · sidebar · progress · float | `js/vj-toc` · `css/vj-toc` |
| **Copy code button** | One-click copy for code blocks, double-click to copy | corner · label · icon · bar | `js/vj-copy` · `css/vj-copy` |
| **Cookie consent** | GDPR-style banner with Google Consent Mode v2 support | card · bar · minimal · modal · choices | `js/vj-cookie` · `css/vj-cookie` |
| **Offline notice** | Tells readers when the connection drops and returns | toast · bar · pill · full-screen | `js/vj-offline` · `css/vj-offline` |
| **Dark mode & themes** | Remembered dark mode, 8 accent colours, back-to-top with progress ring | auto / custom toggle | `js/vj-theme` · `css/vj-theme` |
| **Read later** | Bookmarks saved in the visitor's browser, saved list and counter | buttons · list · floating panel | `js/vj-bookmarks` · `css/vj-bookmarks` |
| **QR code generator** | Full QR tool (link, Wi-Fi, email, phone, SMS, WhatsApp), PNG/SVG export, JS API | tool · inline QR · API | `js/vj-qr` · `css/vj-qr` |
| **WhatsApp tools** | Message without saving the number, click-to-chat links, floating button | tool · link · floating | `js/vj-wa` · `css/vj-wa` |
| **Animated icons** | 179 line icons, 13 animations, colours, sizes, icon lists | inline · list · menu | `js/vj-icons` · `css/vj-icons` |
| **SEO structured data** | Automatic JSON-LD: BlogPosting/Article, BreadcrumbList, FAQPage (no duplicates) | — | `js/vj-seo` |
| **Ad-blocker notice** | Polite, dismissible notice that re-asks after N days | card · banner · modal | `js/vj-adblock` · `css/vj-adblock` |
| **Blogger topics & series** | Topic cards from labels with icons; previous/next post in a series | cards · pills · list | `blogger/vj-topics` · `blogger/vj-chapters` |
| **All-in-one bundle** | TOC + copy + offline + theme + read later + icons in one file | — | `js/vj-all` · `css/vj-all` |

## Quick start

```html
<!-- Table of contents in 2 lines -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/risewithvj/vjkit@1/public/css/vj-toc.min.css">
<script defer src="https://cdn.jsdelivr.net/gh/risewithvj/vjkit@1/public/js/vj-toc.min.js"></script>

<div data-vj-toc data-style="numbered" data-target=".post-body"></div>
```

```html
<!-- Free QR code generator widget -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/risewithvj/vjkit@1/public/css/vj-qr.min.css">
<script defer src="https://cdn.jsdelivr.net/gh/risewithvj/vjkit@1/public/js/vj-qr.min.js"></script>

<div data-vj-qr-tool></div>
```

**Versioning:** `@1` always serves the newest 1.x release (safe updates). Pin an exact release such as `@1.2.0` for zero changes.
Every option, style and live demo: **https://risewithvj.github.io/vjkit/**

### Platform guides
- **Blogger:** Theme → Edit HTML → `<link>` before `</head>`, `<script>` before `</body>`. Widgets go in an HTML gadget or the post's HTML view.
- **WordPress:** use a header/footer plugin (e.g. WPCode) or a Custom HTML block; developers can `wp_enqueue_script()` the jsDelivr URL.
- **React / Next.js:** load once with `next/script`, then call `VJToc.init()`, `VJI.render()` or `VJQR.init()` in `useEffect` after content renders.
- **Any HTML site:** paste in `<head>` / before `</body>`; Webflow, Shopify, Wix, Ghost, Hugo and Jekyll all have a custom code box.

## Link APIs (no code)

| API | URL | Notes |
|---|---|---|
| **QR code** | `https://risewithvj.github.io/vjkit/qr/?text=Hello&size=400&dark=0a1931&level=M` | `download=png\|svg` triggers a download. Rendered in the browser (not an image URL). |
| **WhatsApp chat** | `https://risewithvj.github.io/vjkit/wa/?phone=919876543210&text=Hi` | Opens WhatsApp directly. Phone with country code, digits only. |

## JavaScript APIs

```js
VJQR.svg('https://example.com', { level: 'M', dark: '#0a1931' }); // SVG string
VJQR.png('Hello', { size: 512 });                                   // PNG data URL
VJWA.link('919876543210', 'Hi!');                                   // https://wa.me/919876543210?text=Hi!
VJI.svg('rocket'); VJI.key('Android tips');                         // icon SVG / best icon name
VJTheme.set('dark'); VJTheme.color('green');                        // theme control
VJCookie.get(); VJCookie.open();                                    // consent state / reopen banner
VJBookmarks.list();                                                 // saved posts
VJToc.init(); VJCopy.init();                                        // re-run after dynamic content (SPAs)
```

Events: `vj:consent` `{ analytics, ads }`, `vj:bookmarks`, `vj:adblock` `{ blocked }`.

## For AI assistants and coding agents

- Machine-readable summary of every module, option and URL: **[llms.txt](https://risewithvj.github.io/vjkit/llms.txt)**
- File list with versions: `https://cdn.jsdelivr.net/gh/risewithvj/vjkit@1/public/manifest.json`
- Use the jsDelivr URLs as they are, with `@1` or an exact version. Do not copy, modify or re-host the files; keep the credit comment.

## Usage statistics

Public CDN statistics are available at the **[vjkit stats page](https://risewithvj.github.io/vjkit/stats/)** (requests per day, public-library vs. website split, top files)
and on **[jsDelivr](https://www.jsdelivr.com/package/gh/risewithvj/vjkit?tab=stats)**.

## Repository layout

| Folder | Contents |
|---|---|
| `public/` | The free public library (minified JS/CSS, fonts, licence, manifest) |
| `docs/` | The documentation site served by GitHub Pages |
| `sites/` | Assets for the author's own websites (not part of the public library; all rights reserved) |

## Licence and credit

**Free to use** on personal and commercial websites, under the [vjkit Public Use Licence](https://risewithvj.github.io/vjkit/licence/):

- ✅ Use it on unlimited sites, load it from jsDelivr, configure it with the documented options.
- ✅ Keep the credit comment in each file and any visible "by RisewithVJ" link.
- ✅ Credit the author, for example: *Tools by Vijaya Kumar L (RisewithVJ) – risewithvj.github.io/vjkit*
- ❌ Do not modify, rewrite, resell, re-publish or claim the files as your own.

Fonts in `public/fonts/` (Inter, Space Grotesk, JetBrains Mono) are third-party and remain under the SIL Open Font License 1.1.
Files under `sites/` are © Vijaya Kumar L (RisewithVJ), all rights reserved.

## Contact

Feature requests, bug reports, permission for changes or white-label use:
**[risewithvj@gmail.com](mailto:risewithvj@gmail.com)** · **[LinkedIn](https://www.linkedin.com/in/vijayakumarl/)** · **[VL Tech Official](https://vltechofficialblog.blogspot.com)**

<sub>Keywords: free javascript widgets, blogger table of contents script, wordpress copy code button, cookie consent banner javascript, google consent mode v2, offline notification script, dark mode toggle javascript, qr code generator javascript, whatsapp click to chat link generator, animated svg icons, json-ld schema generator, adblock detector, jsdelivr cdn, no-dependency ui components.</sub>

<div align="center"><sub>© 2026 Vijaya Kumar L (RisewithVJ)</sub></div>
