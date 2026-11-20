# vjkit

Self-hosted front-end assets for **VL Tech Official**
(https://vltechofficialblog.blogspot.com), designed and developed by
**Vijaya Kumar L (RisewithVJ)**.

This repository only holds files that the website loads in visitors' browsers.
The Blogger theme, components kit, content calendar, documentation and post
drafts stay **on the owner's laptop only** and are blocked by `.gitignore`.

## How updates reach the website (no theme edits)

```
edit files in C:\Users\offic\OneDrive\Documents\vjkit
        |
.\tools\publish.ps1 "what you changed"      (commits as Vijaya Kumar L, pushes)
        |
GitHub Action "VL Tech Official loader"     (1-3 minutes)
   - checks every JavaScript file parses
   - hashes every js/css file (sha384)
   - rebuilds assets/vt-loader.js pinned to your exact commit
   - refreshes the jsDelivr cache
        |
website loads the new files on the next page view
```

The Blogger theme contains **one** script tag, written once and never changed again:

```html
<script async src="https://cdn.jsdelivr.net/gh/risewithvj/vjkit@main/sites/vl-tech-official/assets/vt-loader.js"></script>
```

`vt-loader.js` points to the files at the exact commit you pushed (an address
that can never change) and gives each one an integrity hash, so the browser
refuses any file that differs from what you pushed.

## Day-to-day tasks

| I want to | Do this |
|---|---|
| Change a feature | Edit the file in `sites/vl-tech-official/assets/js` or `css`, then `.\tools\publish.ps1 "message"` |
| Add a new script | Add the file, add one line to `tools/vt-loader.template.js` (copy an existing `js(...)` line), publish |
| Remove a feature | Delete its line in `tools/vt-loader.template.js` (and the file), publish |
| Check it went live | https://github.com/risewithvj/vjkit/actions (green tick), then reload the site |
| Undo a bad change | `git revert HEAD` then `.\tools\publish.ps1 "revert"` |

Never edit `vt-loader.js` or `sri.json` by hand: the Action rebuilds both.

## Files

| Path | Purpose |
|---|---|
| `sites/vl-tech-official/assets/vt-loader.js` | Generated loader (the only file the theme references) |
| `sites/vl-tech-official/assets/js/` | Site scripts (readable source, served as is) |
| `sites/vl-tech-official/assets/css/` | Site styles, including `vt-fonts.css` |
| `sites/vl-tech-official/assets/fonts/` | Inter, Space Grotesk, JetBrains Mono (SIL OFL 1.1) |
| `sites/vl-tech-official/assets/sri.json` | Generated hashes and the commit they belong to |
| `tools/vt-loader.template.js` | Loader source: which file loads on which page |
| `tools/build-vt-loader.mjs` | Builds the loader (run by the Action) |
| `tools/publish.ps1` | Commit and push as Vijaya Kumar L |
| `.github/workflows/vt-loader.yml` | The GitHub Action |
| `shared/`, `tools/sri.mjs`, `test/` | Shared modules, SRI tool and tests (v0.1.0) |

## What the loader loads

| File | When | Does |
|---|---|---|
| `css/vt-fonts.css` | Immediately | Site fonts |
| `js/vt-core.js` (+ `css/vt-theme-color.css`) | First scroll, tap or key press (or after 6 s) | Light, dark and system mode, colour themes, back-to-top |
| `js/vt-offline.js` | Same | Offline and back-online notice |
| `js/vt-copy-pre.js` | Post with a code block | Double-click to copy |
| `css/vt-toc.css` | Post with a table of contents | Contents box styles |
| `js/vt-auto-chapters.js` | Post with `#aChp` | Random previous/next post links from this blog's own feed |
| `css/vt-bookmarks.css` + `js/vt-bookmarks.js` | Header has the bookmark button | Read-later list in the visitor's browser |
| `css/vt-cookie-consent.css` + `js/vt-cookie-consent.js` | Cookie not yet accepted (after 3 s) | Cookie bar |

## Security

- Only code from this repository runs; nothing is obfuscated or packed with `eval`.
- Every script and stylesheet is served from an exact commit with a sha384 integrity hash.
- Keep two-factor sign-in on the `risewithvj` GitHub account: whoever can push to `main` can change the site.
- `assets/.gitattributes` stops line-ending changes, so served bytes match the hashes.
- Bookmarks build their HTML with DOM methods, so a post title can never inject markup.
- Removed in v1.0.0: the third-party CDN (`ngylduy/blog`), Google Translate, Vue 2.6,
  jQuery, highlight.js, the music player, the countdown box, a second AdSense loader,
  about 35 unused preconnect hints and the dead Firebase view counter.

## Versions

- `v1.0.0` (tag): first self-hosted release, pinned in theme v5.0.0.
- `v1.1.0`: auto-update loader and GitHub Action (theme v5.2.0 and later).

## Licence and credits

(c) 2026 Vijaya Kumar L (RisewithVJ). All rights reserved for original code.
Parts adapted from Plus UI / ngylduy/blog (MIT) and fonts under the SIL Open Font
License 1.1. See `sites/vl-tech-official/assets/NOTICE.md`.

Contact: https://www.linkedin.com/in/vijayakumarl/ | https://github.com/risewithvj
