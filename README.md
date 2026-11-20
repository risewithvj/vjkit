# vjkit

Self-hosted front-end assets for **VL Tech Official**
(https://vltechofficialblog.blogspot.com), designed and developed by
**Vijaya Kumar L (RisewithVJ)**.

This repository only holds files that the website loads in visitors' browsers.
The Blogger theme, the components kit, the content calendar, documentation and
post drafts are kept **on the owner's laptop only** and are blocked by `.gitignore`.

## What is in this repository

| Folder | Purpose |
|---|---|
| `sites/vl-tech-official/assets/js` | Site scripts: readable source (`*.js`) and the served files (`*.min.js`) |
| `sites/vl-tech-official/assets/css` | Site stylesheets: source and `*.min.css` |
| `sites/vl-tech-official/assets/fonts` | Inter, Space Grotesk and JetBrains Mono (SIL OFL 1.1) |
| `sites/vl-tech-official/assets/sri.json` | sha384 integrity hash of every served file |
| `shared/` | Shared modules: cookie consent, copy code, table of contents |
| `tools/`, `test/` | SRI generator and tests for `shared/` |

## How the website uses these files

The theme loads every file from a **fixed release tag**, never from a branch:

```
https://cdn.jsdelivr.net/gh/risewithvj/vjkit@v1.0.0/sites/vl-tech-official/assets/<path>
```

Each script and stylesheet is loaded with `integrity` (sha384) and
`crossorigin="anonymous"`. If a served file is changed in any way, the browser
refuses to run it. Fonts are referenced from the theme's `@font-face` rules.

| Script | Loads when | Does |
|---|---|---|
| `js/vt-core.min.js` | first scroll or tap | Light, dark and system mode, colour themes, back-to-top progress |
| `js/vt-copy-pre.min.js` | post has a code block | Double-click a code block to copy it |
| `js/vt-offline.min.js` | always (lazy) | Offline and back-online notice |
| `js/vt-auto-chapters.min.js` | post page with `#aChp` | Random previous/next post links from this blog's own feed |
| `js/vt-bookmarks.min.js` | header has the bookmark button | Read-later list stored in the visitor's browser |
| `js/vt-cookie-consent.min.js` | cookie not yet accepted | Cookie consent bar |

## Security

- No third-party code: everything the site loads from this repository is
  readable source in this repository. Nothing is obfuscated or packed with `eval`.
- Pinned to a tag (`v1.0.0`) and protected with Subresource Integrity.
- `assets/.gitattributes` stops Git from changing line endings, so the files on
  the CDN stay byte-for-byte equal to the hashes.
- Bookmarks build their HTML with DOM methods, so a post title can never inject markup.
- Removed in v1.0.0: the third-party CDN (`ngylduy/blog`), Google Translate,
  Vue 2.6 (end of life), jQuery, highlight.js, the music player, the countdown
  download box, the second AdSense loader, and about 35 unused preconnect hints.

## Releasing a new version

1. Edit the readable source file (for example `js/vt-core.js`).
2. Minify it to the matching `.min` file and recompute the sha384 hash
   (`openssl dgst -sha384 -binary FILE | openssl base64 -A`).
3. Update `sri.json`, commit, and create a new tag such as `v1.0.1`.
4. In the theme, change `@v1.0.0` in `baseUrl` and the hashes in `vtSri` to the new values.
   Never move or delete an existing tag: the live site depends on it.

## Current hashes (v1.0.0)

| File | sha384 |
|---|---|
| `css/vt-bookmarks.min.css` | `sha384-tun0vKEzXy9bfOvpIHmeBLQ4RpIcei8ljNFX/FgwZ7BbcLrLpvv9SeVSLlniTvOJ` |
| `css/vt-cookie-consent.min.css` | `sha384-l+/iW9gndrFmM2/aJBrvP7B+eP2Tyqsrg8+ZeD2V/a1VyPv2T7WFL/9xHVgCmGr4` |
| `css/vt-theme-color.min.css` | `sha384-7Z/NyJcqaKI8gywpIme768lZ7l2Dx570VFqTbeONLplaq9HGdKL4PWI6/95e1Ojc` |
| `css/vt-toc.min.css` | `sha384-+123INNpDLjNSTyMM6+6CTWfXGwv8Pjc7D65cJJ/KDIM1JyRjcIktlqVhB065iOL` |
| `fonts/inter-latin-400-normal.woff2` | `sha384-tqh0FAOjwwo8QcrfmptsbU/OH9394dupGj2d2zJQ7lFJdE5ouzRr13+2JlwV7vrE` |
| `fonts/inter-latin-700-normal.woff2` | `sha384-NGcYd/FCvDHllHDMcTSfVMPboX0S7euHIaQdNCSO2Bz/MkHMbUyYg7dtiwvrEX1E` |
| `fonts/jetbrains-mono-latin-400-normal.woff2` | `sha384-/4dCc3INKaFZBsZMku6bd44i8Gr1uXW1GYvdcNjsbHXHh2nGnk9G4RAhHf8hx3GT` |
| `fonts/space-grotesk-latin-700-normal.woff2` | `sha384-dzNBpK7RDu9924/vftG9SLd0DYqA0R0++LY8OV8n2QiTkmPXhBEeVd9d1ARQGnmX` |
| `js/vt-auto-chapters.min.js` | `sha384-zgngqI9UMSyPYDu8ADUKaG451DD1P2i79T0piFByH0DHPL0TE4fJDFtPFrNLoabu` |
| `js/vt-bookmarks.min.js` | `sha384-//BRY4FiMqDcXF8wwOOECWC4Aav14OeydqUzOWipnsLA7g5BnSx4ajiFTM47ny2Z` |
| `js/vt-cookie-consent.min.js` | `sha384-VNSszvk27jB42N5ksEXAK5E6+JdqclvOApFko38at3P0wmwpo490aOaTIu8mYrHk` |
| `js/vt-copy-pre.min.js` | `sha384-G6ZxX9DwJzvRCioUgUC+mdxUBMtCNF/K0GlZGexOrXQg8/J7u19t0Xs3FODRWnyP` |
| `js/vt-core.min.js` | `sha384-8G7JHw0n619J2sJDRsLtxImKbLv4bwwdS4phovlNvqanSqtBAEFOLLwwFfWDFFRs` |
| `js/vt-offline.min.js` | `sha384-PHK5NIl5DkZozsGpqzlrX6X9x5oNvHz65ToYeFlRcMkkwG/F0vTV2FMUbVKgKENu` |

## Licence and credits

(c) 2026 Vijaya Kumar L (RisewithVJ). All rights reserved for original code.
Parts adapted from Plus UI / ngylduy/blog under the MIT licence, and fonts under the
SIL Open Font License 1.1. See `sites/vl-tech-official/assets/NOTICE.md`.

Contact: https://www.linkedin.com/in/vijayakumarl/ | https://github.com/risewithvj
