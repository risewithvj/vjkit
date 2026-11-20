// VL Tech Official | builds sites/vl-tech-official/assets/vt-loader.js and sri.json
// Designed and developed by Vijaya Kumar L (RisewithVJ). Run by the GitHub Action on every push.
// Usage: node tools/build-vt-loader.mjs <full-commit-sha>
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const sha = process.argv[2];
if (!/^[0-9a-f]{40}$/.test(sha || '')) { console.error('Pass the full 40-character commit SHA'); process.exit(1); }
const assets = 'sites/vl-tech-official/assets';
const sri = {};
for (const dir of ['js', 'css']) {
  for (const f of readdirSync(join(assets, dir)).sort()) {
    if (!/\.(js|css)$/.test(f)) continue;
    const buf = readFileSync(join(assets, dir, f));
    sri[`${dir}/${f}`] = 'sha384-' + createHash('sha384').update(buf).digest('base64');
  }
}
const tpl = readFileSync('tools/vt-loader.template.js', 'utf8');
const used = [...tpl.matchAll(/'((?:js|css)\/[\w.-]+\.(?:js|css))'/g)].map(m => m[1]);
const missing = used.filter(p => !sri[p]);
if (missing.length) { console.error('Loader refers to missing files: ' + missing.join(', ')); process.exit(1); }
const out = tpl.replaceAll('__SHA__', sha)
  .replaceAll('__DATE__', new Date().toISOString())
  .replace('__SRI__', JSON.stringify(sri));
writeFileSync(join(assets, 'vt-loader.js'), out);
writeFileSync(join(assets, 'sri.json'), JSON.stringify({ commit: sha, files: sri }, null, 2) + '\n');
console.log(`vt-loader.js built for ${sha.slice(0, 7)} with ${Object.keys(sri).length} files`);
