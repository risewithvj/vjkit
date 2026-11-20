// Local tests for the short-link Worker (node >= 22): node --test workers/shortlink/test/
import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('..', import.meta.url));
globalThis.caches = { default: { match: async () => null, put: async () => {} } };
const W = (await import(dir + 'src/index.js')).default;
const db = new DatabaseSync(':memory:');
db.exec(readFileSync(dir + 'migrations/0001_init.sql', 'utf8'));
const D1 = { prepare(sql) { let b = []; const st = { bind(...a) { b = a; return st; }, async first() { return db.prepare(sql).get(...b) ?? null; }, async all() { return { results: db.prepare(sql).all(...b) }; }, async run() { const r = db.prepare(sql).run(...b); return { meta: { changes: r.changes } }; } }; return st; }, async batch(a) { for (const x of a) await x.run(); } };
const env = { DB: D1, BLOG: 'https://vltechofficialblog.blogspot.com', SHORT_HOST: 'go.trendit.in', SHORTENER_PAGE: '/p/free-url-shortener.html', SIGN_KEY: 'k', TURNSTILE_SECRET: 's', STEPS: '2', WAIT_MIN: '0', WAIT_MAX: '0', POW_BITS_GO: '12', POW_BITS_CREATE: '12' };
const ctx = { waitUntil() {} };
let TS = 'ok';
globalThis.fetch = async (u) => {
  u = String(u);
  if (u.includes('/feeds/posts')) return Response.json({ feed: { entry: [1, 2, 3].map(i => ({ link: [{ rel: 'alternate', href: env.BLOG + '/2024/0' + i + '/p.html' }] })) } });
  if (u.includes('siteverify')) { if (TS === 'down') throw new Error('down'); if (TS === '500') return new Response('x', { status: 503 }); return Response.json({ success: TS === 'ok' }); }
  if (u.includes('cloudflare-dns')) return Response.json({ Status: 0, Answer: [{ type: 1, data: '93.184.216.34' }] });
  throw new Error('unexpected fetch ' + u);
};
const call = (path, body, extra = {}) => W.fetch(new Request('https://go.trendit.in' + path, { method: 'POST', headers: { 'content-type': 'application/json', origin: env.BLOG, 'cf-connecting-ip': '1.2.3.4' }, body: JSON.stringify(body) }), { ...env, ...extra }, ctx).then(r => r.json());
const solve = (c, b) => { for (let n = 0; ; n++) { const h = createHash('sha256').update(c + ':' + n).digest(); let z = 0; for (const x of h) { if (x === 0) { z += 8; continue; } z += Math.clz32(x) - 24; break; } if (z >= b) return String(n); } };
db.prepare("INSERT INTO links (code,url,domain,created_at,status,updated_at) VALUES ('abc','https://example.com/x','example.com',1,'active',1)").run();

async function finalToken() {
  const r = await W.fetch(new Request('https://go.trendit.in/abc', { headers: { 'user-agent': 'Mozilla/5.0' } }), env, ctx);
  assert.equal(r.status, 302);
  const n1 = await call('/api/next', { token: r.headers.get('location').split('#vtgo=')[1] });
  assert.ok(n1.ok && n1.next);
  return n1.next.split('#vtgo=')[1];
}

test('Turnstile pass reaches the destination', async () => {
  TS = 'ok'; const token = await finalToken();
  const f = await call('/api/next', { token, cf: 'good' });
  assert.equal(f.url, 'https://example.com/x');
});
test('failed Turnstile is rejected without the backup flag', async () => {
  TS = 'bad'; const f = await call('/api/next', { token: await finalToken(), cf: 'x' });
  assert.equal(f.ok, false); assert.equal(f.fallback, false);
});
test('Turnstile outage (error, 5xx, missing secret) asks for the backup check', async () => {
  const token = await finalToken();
  TS = 'down'; assert.equal((await call('/api/next', { token, cf: 'x' })).fallback, true);
  TS = '500'; assert.equal((await call('/api/next', { token, cf: 'x' })).fallback, true);
  TS = 'ok'; assert.equal((await call('/api/next', { token, cf: 'x' }, { TURNSTILE_SECRET: '' })).fallback, true);
});
test('backup check: solved works once, wrong answer and other purposes fail', async () => {
  const token = await finalToken();
  const ch = await call('/api/pow', { purpose: 'go', token });
  assert.ok(ch.ok); assert.equal(ch.bits, 12);
  const n = solve(ch.chal, 12);
  if (n !== '0') assert.equal((await call('/api/next', { token, pow: { c: ch.chal, n: '0' } })).ok, false);
  assert.equal((await call('/api/next', { token, pow: { c: ch.chal, n } })).url, 'https://example.com/x');
  assert.equal((await call('/api/next', { token, pow: { c: ch.chal, n } })).ok, false, 'single use');
  const cc = await call('/api/pow', { purpose: 'create' });
  assert.equal((await call('/api/next', { token, pow: { c: cc.chal, n: solve(cc.chal, 12) } })).ok, false, 'create check not valid for visits');
  const other = await finalToken();
  const ch2 = await call('/api/pow', { purpose: 'go', token: other });
  assert.equal((await call('/api/next', { token, pow: { c: ch2.chal, n: solve(ch2.chal, 12) } })).ok, false, 'bound to its own visit');
});
test('timer is still enforced with the backup check', async () => {
  const r = await W.fetch(new Request('https://go.trendit.in/abc', { headers: { 'user-agent': 'Mozilla/5.0' } }), { ...env, WAIT_MIN: '30', WAIT_MAX: '30' }, ctx);
  const token = r.headers.get('location').split('#vtgo=')[1];
  const f = await call('/api/next', { token }, { WAIT_MIN: '30', WAIT_MAX: '30' });
  assert.equal(f.ok, false);
});
test('create works with the backup check, limited to 5 per hour', async () => {
  let last;
  for (let i = 0; i < 6; i++) {
    const c = await call('/api/pow', { purpose: 'create' });
    last = await call('/api/create', { url: 'https://example.org/p' + i, pow: { c: c.chal, n: solve(c.chal, 12) } });
    if (i < 5) assert.ok(last.ok, 'create ' + i + ' ' + last.error);
  }
  assert.equal(last.ok, false);
});

test('site loader is served from GitHub with a jsDelivr fallback', async () => {
  const real = globalThis.fetch;
  globalThis.fetch = async (u) => String(u).includes('raw.githubusercontent.com') ? new Response('/*! VL Tech Official | Asset loader v1.4.0 */') : real(u);
  let r = await W.fetch(new Request('https://go.trendit.in/vt/loader.js'), env, ctx);
  assert.equal(r.status, 200); assert.match(r.headers.get('content-type'), /javascript/); assert.match(await r.text(), /Asset loader v1\.4\.0/);
  globalThis.fetch = async (u) => String(u).includes('raw.githubusercontent.com') ? new Response('nope', { status: 404 }) : real(u);
  r = await W.fetch(new Request('https://go.trendit.in/vt/loader.js'), env, ctx);
  assert.equal(r.status, 302); assert.match(r.headers.get('location'), /cdn\.jsdelivr\.net\/gh\/risewithvj\/vjkit@main/);
  globalThis.fetch = real;
});
