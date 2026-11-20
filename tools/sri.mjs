// Writes sri.json: sha384 integrity value for every .js/.css file under shared/ and sites/.
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const files = {};

function walk(dir) {
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(js|css)$/.test(name)) {
      const hash = createHash('sha384').update(readFileSync(p)).digest('base64');
      files[relative(root, p).split(sep).join('/')] = 'sha384-' + hash;
    }
  }
}
['shared', 'sites'].forEach((d) => { try { walk(join(root, d)); } catch { /* folder missing */ } });
writeFileSync(join(root, 'sri.json'), JSON.stringify({ version: pkg.version, files }, null, 2) + '\n');
console.log(`sri.json written for v${pkg.version}: ${Object.keys(files).length} files`);
