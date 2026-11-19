import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const src = (f) => readFileSync(new URL('../shared/js/' + f, import.meta.url), 'utf8');

const loaded = (dom) => new Promise((r) => (dom.window.document.readyState === 'complete' ? r() : dom.window.addEventListener('load', r)));

async function page(html, file) {
  const dom = new JSDOM('<!doctype html><body>' + html + '</body>', { runScripts: 'outside-only', url: 'https://example.com/' });
  await loaded(dom);
  dom.window.eval(src(file));
  return dom.window;
}

test('cookie-consent shows banner and stores accept', async () => {
  const w = await page('', 'cookie-consent.js');
  assert.ok(w.document.getElementById('vj-cc'), 'banner present');
  w.document.querySelector('.vj-cc__btn--primary').click();
  assert.equal(w.VJ.consent.get(), 'accepted');
});

test('cookie-consent stays hidden when choice already stored', async () => {
  const dom = new JSDOM('<!doctype html><body></body>', { runScripts: 'outside-only', url: 'https://example.com/' });
  await loaded(dom);
  dom.window.document.cookie = 'vj_consent=declined; path=/';
  dom.window.eval(src('cookie-consent.js'));
  assert.equal(dom.window.document.getElementById('vj-cc'), null);
});

test('cookie-consent emits vj:consent event', async () => {
  const w = await page('', 'cookie-consent.js');
  let got = null;
  w.addEventListener('vj:consent', (e) => { got = e.detail.value; });
  w.document.querySelector('.vj-cc__btn--ghost').click();
  assert.equal(got, 'declined');
});

test('toc builds list with unique ids and skips when too few headings', async () => {
  const w = await page('<div id="toc"></div><div class="post-body"><h2>Intro</h2><h2>Intro</h2><h3>Deep dive</h3></div>', 'toc.js');
  const links = w.document.querySelectorAll('#toc a');
  assert.equal(links.length, 3);
  const ids = [...w.document.querySelectorAll('.post-body h2, .post-body h3')].map((h) => h.id);
  assert.equal(new Set(ids).size, 3);
  const few = await page('<div id="toc"></div><div class="post-body"><h2>Only</h2></div>', 'toc.js');
  assert.equal(few.document.querySelectorAll('#toc a').length, 0);
});

test('toc escapes heading text (no HTML injection)', async () => {
  const w = await page('<div id="toc"></div><div class="post-body"><h2>&lt;img src=x onerror=alert(1)&gt;</h2><h2>B</h2><h2>C</h2></div>', 'toc.js');
  assert.equal(w.document.querySelector('#toc img'), null);
});

test('copy-code adds one button per block and copies without button text', async () => {
  let copied = '';
  const dom = new JSDOM('<!doctype html><body><article><pre><code>npm test</code></pre></article></body>', { runScripts: 'outside-only', url: 'https://example.com/' });
  await loaded(dom);
  Object.defineProperty(dom.window.navigator, 'clipboard', { value: { writeText: async (t) => { copied = t; } } });
  dom.window.eval(src('copy-code.js'));
  dom.window.VJ.copyCode.init(); // second init must not duplicate
  const btns = dom.window.document.querySelectorAll('.vj-copy');
  assert.equal(btns.length, 1);
  btns[0].click();
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(copied, 'npm test');
});
