// Builds the animated icon files: node tools/icons/build-icons.mjs
// Public site copies -> sites/vl-tech-official/assets/icons/anim/  (served by jsDelivr)
// Extra colour variants and a preview page -> private/kit/icons/vt-anim/ (local only)
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ICONS, ICON_CSS, icon, file } from './vt-icons.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const pub = join(root, 'sites/vl-tech-official/assets/icons/anim');
mkdirSync(pub, { recursive: true });
const names = Object.keys(ICONS);
for (const n of names) writeFileSync(join(pub, n + '.svg'), file(n));
writeFileSync(join(root, 'sites/vl-tech-official/assets/icons/vt-icons.css'), '/*! VL Tech Official | Animated line icons | (c) 2021-2026 Vijaya Kumar L (RisewithVJ). All rights reserved. */\n' + ICON_CSS + '\n');

const kit = join(root, 'private/kit/icons/vt-anim');
const variants = { navy: ['#1f2a44', '#0363fc'], blue: ['#0363fc', '#0363fc'], white: ['#ffffff', '#cfe0ff'], dark: ['#e6ebf5', '#4d8dff'] };
for (const [v, [m, a]] of Object.entries(variants)) {
  mkdirSync(join(kit, v), { recursive: true });
  for (const n of names) writeFileSync(join(kit, v, n + '.svg'), file(n, { main: m, accent: a }));
}
const cards = names.map(n => `<figure tabindex="0">${icon(n, { size: 40 })}<figcaption>${n}</figcaption></figure>`).join('');
writeFileSync(join(kit, 'index.html'), `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>VL Tech Official animated icons (${names.length})</title>
<style>${ICON_CSS}body{font:14px system-ui;margin:24px;background:#f6f8fc;color:#1f2a44}h1{font-size:20px}p{color:#56607a}.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px}figure{margin:0;background:#fff;border:1px solid #e3e8f2;border-radius:14px;padding:18px 8px;text-align:center;cursor:pointer}figcaption{margin-top:8px;font-size:12px}</style>
<h1>VL Tech Official animated icons (${names.length})</h1><p>Hover an icon to play its motion. Files: navy/, blue/, white/, dark/ (self-animating SVG). Inline use: tools/icons/vt-icons.mjs icon(name).</p>
<div class="g">${cards}</div><script>document.querySelectorAll('.vti').forEach(function(s,i){setTimeout(function(){s.classList.add('vti-in')},i*30)})</script>`);
console.log('icons:', names.length);
