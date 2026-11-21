// Fills __IP__ (icon paths) and __CSS__ in a JS file from vt-icons.mjs. Usage: node tools/icons/inline-icons.mjs <file> [names...|--all]
import { readFileSync, writeFileSync } from 'node:fs';
import { ICONS, ICON_CSS } from './vt-icons.mjs';
const [file, ...names] = process.argv.slice(2);
let s = readFileSync(file, 'utf8');
const pick = names[0] === '--all' ? Object.keys(ICONS) : names.length ? names : [...new Set([...s.matchAll(/ic\('([a-z]+)'/g)].map(m => m[1]))];
const o = {}; for (const n of pick) o[n] = [ICONS[n].loop, ICONS[n].d, ICONS[n].a];
const NAV = '.vti-nav{--vti-a:currentColor}:hover>.vti-nav{--vti-a:#0363fc}svg.vti.vti-nav{fill:none!important;stroke:currentColor;stroke-width:var(--vti-w,1.5)}svg.vti-nav path{fill:none!important}.vti-card{--vti-a:#0363fc}a:hover .vti-card .a{animation:var(--vti-m) 2.2s ease-in-out infinite}';
s = s.replace('__IP__', JSON.stringify(o)).replace('__CSS__', JSON.stringify(ICON_CSS.replace(/\n/g, '') + NAV));
writeFileSync(file, s); console.log(file, Object.keys(o).length, 'icons');
