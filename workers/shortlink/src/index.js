/*!
 * VL Tech Official | Short link service for go.trendit.in
 * Designed and developed by Vijaya Kumar L (RisewithVJ)
 * https://vltechofficialblog.blogspot.com | https://github.com/risewithvj/vjkit
 *
 * Flow: go.trendit.in/CODE -> real post on the blog (step 1) -> real post (step 2)
 *       -> Turnstile check -> destination. Every step is signed and timed by this Worker.
 *       If Turnstile cannot load or Cloudflare's check is down, a signed proof-of-work check is used instead,
 *       so visitors are never stuck.
 * Secrets (set in Cloudflare, never in the repo): TURNSTILE_SECRET, ADMIN_TOKEN, SIGN_KEY
 */

const SHORTENERS = new Set(['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'is.gd', 'cutt.ly', 'rb.gy', 'shorturl.at',
  'ow.ly', 'tiny.cc', 'rebrand.ly', 's.id', 'v.gd', 'buff.ly', 'shorte.st', 'adf.ly', 'ouo.io', 'bc.vc', 'linkvertise.com',
  'shrinkme.io', 'exe.io', 'gplinks.co', 'go.trendit.in', 'url.trendit.in']);
const RESERVED = new Set(['api', 'admin', 'robots', 'robots.txt', 'favicon.ico', 'favicon', 'sitemap', 'sitemap.xml',
  'health', 'login', 'signup', 'report', 'stats', 'about', 'contact', 'privacy', 'terms', 'help', 'www', 'static', 'assets']);
const BANNED_WORDS = ['porn', 'sex', 'xxx', 'nude', 'casino', 'betting', 'gambl', 'crack', 'keygen', 'warez', 'phish',
  'hack', 'free-money', 'lottery', 'loan-app', 'escort', 'drug'];
const BOT_UA = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|slack|discord|skype|embedly|pinterest|vkshare|quora|linkedin|headless|curl|wget|python|java\/|okhttp|go-http/i;
const B62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const enc = new TextEncoder();

export default {
  async fetch(req, env, ctx) {
    try {
      return await route(req, env, ctx);
    } catch (e) {
      console.error('unhandled', e && e.stack || e);
      return json({ ok: false, error: 'Something went wrong. Please try again.' }, 500, req, env);
    }
  }
};

async function route(req, env, ctx) {
  const url = new URL(req.url);
  const path = url.pathname;
  if (req.method === 'OPTIONS') return cors(new Response(null, { status: 204 }), req, env, true);

  if (path === '/') return Response.redirect(env.BLOG + env.SHORTENER_PAGE, 301);
  if (path === '/robots.txt') return text('User-agent: *\nDisallow: /api/\nDisallow: /admin/\n');
  if (path === '/favicon.ico') return new Response(null, { status: 204 });
  if (path === '/vt/loader.js') return siteLoader(ctx);

  if (path.startsWith('/api/')) {
    if (!originOk(req, env) && req.method !== 'GET') return json({ ok: false, error: 'Not allowed' }, 403, req, env);
    if (path === '/api/create' && req.method === 'POST') return create(req, env, ctx);
    if (path === '/api/step' && req.method === 'POST') return step(req, env);
    if (path === '/api/next' && req.method === 'POST') return next(req, env, ctx);
    if (path === '/api/pow' && req.method === 'POST') return powIssue(req, env);
    if (path === '/api/stats' && req.method === 'GET') return stats(req, env, url);
    return json({ ok: false, error: 'Not found' }, 404, req, env);
  }
  if (path.startsWith('/admin/')) return admin(req, env, url, path);

  const code = decodeURIComponent(path.slice(1)).replace(/\/+$/, '');
  if (!/^[A-Za-z0-9-]{3,30}$/.test(code)) return page(env, 404, 'Link not found', 'This short link does not exist. Check the address and try again.');
  return open(req, env, ctx, code);
}

/* ---------- site asset loader (always the latest from GitHub, cached 2 minutes) ----------
 * jsDelivr caches the @main branch for hours, so the blog loads its loader from here instead.
 * The loader itself pins every other file to an exact commit on jsDelivr. */
const LOADER_SRC = 'https://raw.githubusercontent.com/risewithvj/vjkit/main/sites/vl-tech-official/assets/vt-loader.js';
const LOADER_FALLBACK = 'https://cdn.jsdelivr.net/gh/risewithvj/vjkit@main/sites/vl-tech-official/assets/vt-loader.js';
async function siteLoader(ctx) {
  const cache = caches.default;
  const key = new Request('https://cache.internal/vt-loader-v1');
  const hit = await cache.match(key);
  if (hit) return hit;
  let body = null;
  try {
    const up = await fetch(LOADER_SRC, { cf: { cacheTtl: 60 }, signal: AbortSignal.timeout(5000) });
    if (up.ok) body = await up.text();
  } catch (e) { body = null; }
  if (!body || !/Asset loader v\d/.test(body)) return Response.redirect(LOADER_FALLBACK, 302);
  const res = new Response(body, { headers: {
    'Content-Type': 'application/javascript; charset=utf-8', 'Cache-Control': 'public, max-age=120',
    'Access-Control-Allow-Origin': '*', 'X-Content-Type-Options': 'nosniff', 'Cross-Origin-Resource-Policy': 'cross-origin'
  } });
  ctx.waitUntil(cache.put(key, res.clone()));
  return res;
}

/* ---------- visitor: open a short link ---------- */
async function open(req, env, ctx, code) {
  const row = await env.DB.prepare('SELECT code, status, domain FROM links WHERE code = ?').bind(code).first();
  if (!row) return page(env, 404, 'Link not found', 'This short link does not exist. Check the address and try again.');
  if (row.status !== 'active') return page(env, 410, 'Link removed', 'This short link was removed because it was reported as broken or unsafe.');

  const bot = BOT_UA.test(req.headers.get('user-agent') || '');
  if (!bot) ctx.waitUntil(bump(env, code, 'opens'));

  const n = clamp(int(env.STEPS, 2), 1, 4);
  const posts = await pickPosts(env, n);
  const token = await sign(env, { c: code, s: 1, n, w: waitSecs(env), t: Date.now(), p: posts });
  const target = posts[0] + '#vtgo=' + token;
  return new Response(null, { status: 302, headers: { Location: target, 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' } });
}

/* ---------- visitor: describe current step ---------- */
async function step(req, env) {
  const body = await readJson(req);
  const tok = await verify(env, body && body.token);
  if (!tok) return json({ ok: false, error: 'This link session expired. Please open the short link again.' }, 400, req, env);
  const row = await env.DB.prepare('SELECT status, domain FROM links WHERE code = ?').bind(tok.c).first();
  if (!row || row.status !== 'active') return json({ ok: false, error: 'This short link was removed.' }, 410, req, env);
  const left = Math.max(0, Math.ceil((tok.t + tok.w * 1000 - Date.now()) / 1000));
  return json({ ok: true, code: tok.c, step: tok.s, total: tok.n, wait: left, domain: row.domain, final: tok.s >= tok.n, sitekey: env.TURNSTILE_SITEKEY }, 200, req, env);
}

/* ---------- visitor: go to the next step or the destination ---------- */
async function next(req, env, ctx) {
  const body = await readJson(req);
  const tok = await verify(env, body && body.token);
  if (!tok) return json({ ok: false, error: 'This link session expired. Please open the short link again.' }, 400, req, env);
  if (Date.now() < tok.t + tok.w * 1000 - 400) return json({ ok: false, error: 'Please wait for the timer to finish.' }, 429, req, env);

  if (tok.s < tok.n) {
    const nt = await sign(env, { c: tok.c, s: tok.s + 1, n: tok.n, w: waitSecs(env), t: Date.now(), p: tok.p });
    const nextPost = tok.p[tok.s] || tok.p[tok.p.length - 1];
    return json({ ok: true, next: nextPost + '#vtgo=' + nt }, 200, req, env);
  }

  const h = await human(env, req, body, 'go', tok.c + ':' + tok.t);
  if (!h.ok) return json({ ok: false, fallback: h.fallback, error: h.fallback ? 'Verification is busy. Running a quick backup check…' : 'Please complete the verification and try again.' }, 403, req, env);
  const row = await env.DB.prepare('SELECT url, status FROM links WHERE code = ?').bind(tok.c).first();
  if (!row || row.status !== 'active') return json({ ok: false, error: 'This short link was removed.' }, 410, req, env);
  ctx.waitUntil(bump(env, tok.c, 'clicks'));
  return json({ ok: true, url: row.url }, 200, req, env);
}

/* ---------- create a short link ---------- */
async function create(req, env, ctx) {
  const body = await readJson(req);
  if (!body) return json({ ok: false, error: 'Invalid request.' }, 400, req, env);
  const h = await human(env, req, body, 'create', '');
  if (!h.ok) return json({ ok: false, fallback: h.fallback, error: h.fallback ? 'Verification is busy. Running a quick backup check…' : 'Please complete the verification and try again.' }, 403, req, env);

  const who = await visitor(env, req);
  const hour = Math.floor(Date.now() / 3600e3), day = Math.floor(Date.now() / 86400e3);
  if (!(await allow(env, `c:h:${who}:${hour}`, int(env.CREATE_PER_HOUR, 15), 3600)) ||
      !(await allow(env, `c:d:${who}:${day}`, int(env.CREATE_PER_DAY, 60), 86400)) ||
      (body.pow && !(await allow(env, `c:p:${who}:${hour}`, int(env.CREATE_POW_PER_HOUR, 5), 3600)))) {
    return json({ ok: false, error: 'You have created many links in a short time. Please try again later.' }, 429, req, env);
  }

  const checked = await checkUrl(env, String(body.url || ''));
  if (checked.error) return json({ ok: false, error: checked.error }, 400, req, env);
  const { href, host } = checked;

  let code = null;
  const alias = String(body.alias || '').trim().toLowerCase();
  if (alias) {
    if (!/^[a-z0-9][a-z0-9-]{2,28}[a-z0-9]$/.test(alias) || alias.includes('--')) return json({ ok: false, error: 'Custom name: use 4 to 30 letters, numbers or single hyphens.' }, 400, req, env);
    if (RESERVED.has(alias) || BANNED_WORDS.some(w => alias.includes(w))) return json({ ok: false, error: 'That custom name is not available.' }, 400, req, env);
    const taken = await env.DB.prepare('SELECT 1 FROM links WHERE code = ?').bind(alias).first();
    if (taken) return json({ ok: false, error: 'That custom name is already taken. Try another one.' }, 409, req, env);
    code = alias;
  } else {
    const same = await env.DB.prepare("SELECT code, created_at FROM links WHERE url = ? AND status = 'active' LIMIT 1").bind(href).first();
    if (same) return json({ ok: true, code: same.code, short: `https://${env.SHORT_HOST}/${same.code}`, existing: true }, 200, req, env);
    for (let i = 0; i < 6 && !code; i++) {
      const c = randomCode(6);
      if (!(await env.DB.prepare('SELECT 1 FROM links WHERE code = ?').bind(c).first())) code = c;
    }
    if (!code) return json({ ok: false, error: 'Please try again.' }, 500, req, env);
  }

  const now = Date.now();
  await env.DB.prepare('INSERT INTO links (code, url, domain, created_at, creator, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .bind(code, href, host, now, who, 'active', now).run();
  if (Math.random() < 0.05) ctx.waitUntil(env.DB.prepare('DELETE FROM limits WHERE expires < ?').bind(now).run());
  return json({ ok: true, code, short: `https://${env.SHORT_HOST}/${code}` }, 200, req, env);
}

/* ---------- public click counter ---------- */
async function stats(req, env, url) {
  let c = (url.searchParams.get('c') || '').trim();
  const m = c.match(/^(?:https?:\/\/)?go\.trendit\.in\/([A-Za-z0-9-]{3,30})\/?$/i);
  if (m) c = m[1];
  if (!/^[A-Za-z0-9-]{3,30}$/.test(c)) return json({ ok: false, error: 'Enter a go.trendit.in short link.' }, 400, req, env);
  const row = await env.DB.prepare('SELECT code, domain, created_at, status, opens, clicks, last_click FROM links WHERE code = ?').bind(c).first();
  if (!row) return json({ ok: false, error: 'We could not find that short link.' }, 404, req, env);
  const since = dayStr(Date.now() - 6 * 86400e3);
  const rs = await env.DB.prepare('SELECT day, opens, clicks FROM daily WHERE code = ? AND day >= ? ORDER BY day').bind(c, since).all();
  const map = Object.fromEntries((rs.results || []).map(r => [r.day, r]));
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = dayStr(Date.now() - i * 86400e3);
    days.push({ day: d, opens: (map[d] && map[d].opens) || 0, clicks: (map[d] && map[d].clicks) || 0 });
  }
  const res = json({ ok: true, code: row.code, short: `https://${env.SHORT_HOST}/${row.code}`, domain: row.domain,
    created_at: row.created_at, status: row.status, opens: row.opens, clicks: row.clicks, last_click: row.last_click, days }, 200, req, env);
  res.headers.set('Cache-Control', 'public, max-age=60');
  return res;
}

/* ---------- admin (Google Sheet) ---------- */
async function admin(req, env, url, path) {
  const auth = req.headers.get('authorization') || '';
  if (!env.ADMIN_TOKEN || !(await safeEqual(auth, 'Bearer ' + env.ADMIN_TOKEN))) return new Response('Unauthorized', { status: 401 });

  if (path === '/admin/export' && req.method === 'GET') {
    const since = int(url.searchParams.get('since'), 0);
    const links = await env.DB.prepare('SELECT code, url, domain, created_at, status, opens, clicks, last_click, note, updated_at FROM links WHERE updated_at >= ? ORDER BY updated_at LIMIT 5000').bind(since).all();
    const daily = await env.DB.prepare('SELECT day, SUM(opens) AS opens, SUM(clicks) AS clicks, COUNT(*) AS links FROM daily WHERE day >= ? GROUP BY day ORDER BY day').bind(dayStr(Date.now() - 60 * 86400e3)).all();
    const created = await env.DB.prepare("SELECT strftime('%Y-%m-%d', created_at / 1000, 'unixepoch') AS day, COUNT(*) AS n FROM links WHERE created_at >= ? GROUP BY day").bind(Date.now() - 60 * 86400e3).all();
    const totals = await env.DB.prepare('SELECT COUNT(*) AS links, SUM(opens) AS opens, SUM(clicks) AS clicks FROM links').first();
    return Response.json({ ok: true, now: Date.now(), links: links.results, daily: daily.results, created: created.results, totals });
  }
  if (path === '/admin/update' && req.method === 'POST') {
    const b = await readJson(req);
    if (!b || !b.code) return Response.json({ ok: false, error: 'code required' }, { status: 400 });
    const sets = [], vals = [];
    if (b.status) {
      if (!['active', 'disabled', 'blocked'].includes(b.status)) return Response.json({ ok: false, error: 'bad status' }, { status: 400 });
      sets.push('status = ?'); vals.push(b.status);
    }
    if (b.url) {
      const ck = await checkUrl(env, String(b.url));
      if (ck.error) return Response.json({ ok: false, error: ck.error }, { status: 400 });
      sets.push('url = ?', 'domain = ?'); vals.push(ck.href, ck.host);
    }
    if (typeof b.note === 'string') { sets.push('note = ?'); vals.push(b.note.slice(0, 500)); }
    if (!sets.length) return Response.json({ ok: false, error: 'nothing to change' }, { status: 400 });
    sets.push('updated_at = ?'); vals.push(Date.now());
    const r = await env.DB.prepare(`UPDATE links SET ${sets.join(', ')} WHERE code = ?`).bind(...vals, b.code).run();
    return Response.json({ ok: true, changed: r.meta.changes });
  }
  if (path === '/admin/block' && req.method === 'POST') {
    const b = await readJson(req);
    const d = String(b && b.domain || '').toLowerCase().replace(/^www\./, '');
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(d)) return Response.json({ ok: false, error: 'bad domain' }, { status: 400 });
    const now = Date.now();
    await env.DB.batch([
      env.DB.prepare('INSERT OR REPLACE INTO blocklist (domain, reason, added_at) VALUES (?, ?, ?)').bind(d, String(b.reason || '').slice(0, 200), now),
      env.DB.prepare("UPDATE links SET status = 'blocked', updated_at = ? WHERE domain = ? OR domain LIKE ?").bind(now, d, '%.' + d)
    ]);
    return Response.json({ ok: true });
  }
  return new Response('Not found', { status: 404 });
}

/* ---------- helpers ---------- */
async function checkUrl(env, raw) {
  raw = raw.trim();
  if (!raw || raw.length > 2048) return { error: 'Enter a valid link (up to 2,048 characters).' };
  if (!/^https?:\/\//i.test(raw)) raw = 'https://' + raw;
  let u;
  try { u = new URL(raw); } catch (e) { return { error: 'That does not look like a valid link.' }; }
  if (!['http:', 'https:'].includes(u.protocol)) return { error: 'Only http and https links are allowed.' };
  if (u.username || u.password) return { error: 'Links with a username or password are not allowed.' };
  const host = u.hostname.toLowerCase().replace(/\.$/, '');
  if (!host.includes('.') || /^[\d.]+$/.test(host) || host.includes(':') || /(^|\.)(localhost|local|internal|lan|home)$/.test(host)) return { error: 'Please use a public website address.' };
  if (u.port && !['80', '443'].includes(u.port)) return { error: 'Links with custom ports are not allowed.' };
  const bare = host.replace(/^www\./, '');
  if (SHORTENERS.has(bare)) return { error: 'Links from other URL shorteners are not allowed. Use the original link.' };
  const parts = bare.split('.');
  const candidates = parts.map((_, i) => parts.slice(i).join('.')).filter(d => d.includes('.'));
  const placeholders = candidates.map(() => '?').join(',');
  const blocked = await env.DB.prepare(`SELECT domain FROM blocklist WHERE domain IN (${placeholders}) LIMIT 1`).bind(...candidates).first();
  if (blocked) return { error: 'Links to this website are not allowed.' };
  const safety = await dnsSafety(host);
  if (safety === 'unsafe') return { error: 'This website is flagged for malware or phishing, so it cannot be shortened.' };
  if (safety === 'nxdomain') return { error: 'This website address does not exist. Check the link.' };
  return { href: u.href, host: bare };
}

// Cloudflare's malware-blocking resolver answers 0.0.0.0 for domains it classifies as malicious.
async function dnsSafety(host) {
  try {
    const r = await fetch(`https://security.cloudflare-dns.com/dns-query?name=${encodeURIComponent(host)}&type=A`, {
      headers: { accept: 'application/dns-json' }, cf: { cacheTtl: 300 }
    });
    if (!r.ok) return 'unknown';
    const d = await r.json();
    if (d.Status === 3) return 'nxdomain';
    const ans = (d.Answer || []).filter(a => a.type === 1).map(a => a.data);
    if (ans.includes('0.0.0.0')) return 'unsafe';
    return 'ok';
  } catch (e) { return 'unknown'; }
}

async function pickPosts(env, n) {
  const cache = caches.default;
  const key = new Request('https://cache.internal/vl-posts-v1');
  let list = null;
  const hit = await cache.match(key);
  if (hit) list = await hit.json();
  if (!list) {
    try {
      const r = await fetch(`${env.BLOG}/feeds/posts/summary?alt=json&max-results=150`, { headers: { 'user-agent': 'VL-Shortlink/1.0' } });
      const d = await r.json();
      list = (d.feed.entry || []).map(e => (e.link.find(l => l.rel === 'alternate') || {}).href).filter(h => h && h.startsWith(env.BLOG + '/'));
      if (list.length) await cache.put(key, new Response(JSON.stringify(list), { headers: { 'Cache-Control': 'public, max-age=21600', 'Content-Type': 'application/json' } }));
    } catch (e) { list = []; }
  }
  if (!list.length) return Array(n).fill(env.BLOG + '/');
  const out = [], pool = list.slice();
  while (out.length < n && pool.length) out.push(pool.splice(Math.floor(rnd() * pool.length), 1)[0]);
  while (out.length < n) out.push(out[out.length - 1]);
  return out;
}

async function bump(env, code, field) {
  const now = Date.now(), d = dayStr(now);
  const col = field === 'clicks' ? 'clicks' : 'opens';
  const extra = col === 'clicks' ? ', last_click = ?' : '';
  const binds = col === 'clicks' ? [now, now, code] : [now, code];
  await env.DB.batch([
    env.DB.prepare(`UPDATE links SET ${col} = ${col} + 1, updated_at = ?${extra} WHERE code = ?`).bind(...binds),
    env.DB.prepare(`INSERT INTO daily (code, day, ${col}) VALUES (?, ?, 1) ON CONFLICT(code, day) DO UPDATE SET ${col} = ${col} + 1`).bind(code, d)
  ]);
}

async function allow(env, key, max, ttl) {
  const now = Date.now();
  const r = await env.DB.prepare('INSERT INTO limits (key, count, expires) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET count = count + 1 RETURNING count')
    .bind(key, now + ttl * 1000).first();
  return !r || r.count <= max;
}

/* ---------- human check: Turnstile first, proof-of-work as the backup ---------- */
async function human(env, req, body, purpose, bind) {
  if (body && body.pow) return { ok: await powVerify(env, body.pow, purpose, bind), fallback: false };
  const t = await turnstile(env, body && body.cf, req);
  if (t === true) return { ok: true };
  return { ok: false, fallback: t === 'down' };
}

async function powIssue(req, env) {
  const body = await readJson(req);
  const purpose = body && body.purpose === 'create' ? 'create' : 'go';
  let bind = '';
  if (purpose === 'go') {
    const tok = await verify(env, body && body.token);
    if (!tok) return json({ ok: false, error: 'This link session expired. Please open the short link again.' }, 400, req, env);
    bind = tok.c + ':' + tok.t;
  }
  const who = await visitor(env, req);
  if (!(await allow(env, `pow:${who}:${Math.floor(Date.now() / 3600e3)}`, int(env.POW_PER_HOUR, 40), 3600))) {
    return json({ ok: false, error: 'Too many checks. Please wait a few minutes and try again.' }, 429, req, env);
  }
  const bits = clamp(int(purpose === 'create' ? env.POW_BITS_CREATE : env.POW_BITS_GO, purpose === 'create' ? 18 : 16), 8, 24);
  const r = b64u(crypto.getRandomValues(new Uint8Array(12)));
  const chal = await sign(env, { k: purpose, b: bits, h: bind, r, t: Date.now(), x: Date.now() + 10 * 60e3 });
  return json({ ok: true, chal, bits }, 200, req, env);
}

async function powVerify(env, pow, purpose, bind) {
  if (!pow || typeof pow.c !== 'string' || !/^\d{1,12}$/.test(String(pow.n))) return false;
  const o = await verify(env, pow.c);
  if (!o || o.k !== purpose || o.h !== bind || Date.now() > o.x) return false;
  const hash = new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(pow.c + ':' + pow.n)));
  if (zeroBits(hash) < o.b) return false;
  const r = await env.DB.prepare('INSERT INTO limits (key, count, expires) VALUES (?, 1, ?) ON CONFLICT(key) DO NOTHING').bind('powused:' + o.r, o.x).run();
  return !!(r && r.meta && r.meta.changes === 1); // each solved check works once
}
function zeroBits(bytes) {
  let n = 0;
  for (const b of bytes) { if (b === 0) { n += 8; continue; } n += Math.clz32(b) - 24; break; }
  return n;
}

async function turnstile(env, token, req) {
  if (!token || typeof token !== 'string' || token.length > 2048) return false;
  if (env.DEV_MODE === '1' && token === 'dev-pass') return true; // local tests only (.dev.vars), never set in Cloudflare
  if (!env.TURNSTILE_SECRET) return 'down';
  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET);
  form.append('response', token);
  const ip = req.headers.get('cf-connecting-ip');
  if (ip) form.append('remoteip', ip);
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form, signal: AbortSignal.timeout(6000) });
    if (r.status >= 500) return 'down';
    const d = await r.json();
    if (!d.success) return (d['error-codes'] || []).includes('internal-error') ? 'down' : false;
    const okHost = [new URL(env.BLOG).hostname, env.SHORT_HOST];
    return !d.hostname || okHost.includes(d.hostname);
  } catch (e) { return 'down'; }
}

async function visitor(env, req) {
  const ip = req.headers.get('cf-connecting-ip') || 'unknown';
  return (await hmacHex(env.SIGN_KEY || 'dev', 'visitor:' + ip)).slice(0, 20); // no raw IP is stored
}

async function sign(env, obj) {
  const p = b64u(enc.encode(JSON.stringify(obj)));
  const s = await hmacB64u(env.SIGN_KEY || 'dev', p);
  return p + '.' + s;
}
async function verify(env, tok) {
  if (!tok || typeof tok !== 'string' || tok.length > 4096) return null;
  const [p, s] = tok.split('.');
  if (!p || !s) return null;
  if (!(await safeEqual(s, await hmacB64u(env.SIGN_KEY || 'dev', p)))) return null;
  try {
    const o = JSON.parse(new TextDecoder().decode(unb64u(p)));
    if (Date.now() - o.t > 30 * 60e3) return null;
    return o;
  } catch (e) { return null; }
}
async function hmacKey(secret) {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
}
async function hmacB64u(secret, msg) { return b64u(new Uint8Array(await crypto.subtle.sign('HMAC', await hmacKey(secret), enc.encode(msg)))); }
async function hmacHex(secret, msg) { return [...new Uint8Array(await crypto.subtle.sign('HMAC', await hmacKey(secret), enc.encode(msg)))].map(b => b.toString(16).padStart(2, '0')).join(''); }
async function safeEqual(a, b) {
  const ha = new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(String(a))));
  const hb = new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(String(b))));
  let diff = 0;
  for (let i = 0; i < ha.length; i++) diff |= ha[i] ^ hb[i];
  return diff === 0;
}
function b64u(bytes) { let s = ''; bytes.forEach(b => { s += String.fromCharCode(b); }); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function unb64u(s) { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return Uint8Array.from(atob(s), c => c.charCodeAt(0)); }
function rnd() { return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296; }
function randomCode(len) { const a = crypto.getRandomValues(new Uint8Array(len)); return [...a].map(x => B62[x % 62]).join(''); }
function waitSecs(env) { const lo = int(env.WAIT_MIN, 5), hi = Math.max(lo, int(env.WAIT_MAX, 8)); return lo + Math.floor(rnd() * (hi - lo + 1)); }
function int(v, d) { const n = parseInt(v, 10); return Number.isFinite(n) ? n : d; }
function clamp(n, a, b) { return Math.min(b, Math.max(a, n)); }
function dayStr(ms) { return new Date(ms).toISOString().slice(0, 10); }
async function readJson(req) { try { const t = await req.text(); return t.length > 10000 ? null : JSON.parse(t); } catch (e) { return null; } }
function originOk(req, env) { const o = req.headers.get('origin'); return !o || o === env.BLOG; }
function cors(res, req, env, preflight) {
  const o = req.headers.get('origin');
  if (o === env.BLOG) {
    res.headers.set('Access-Control-Allow-Origin', o);
    res.headers.set('Vary', 'Origin');
    if (preflight) {
      res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
      res.headers.set('Access-Control-Max-Age', '86400');
    }
  }
  return res;
}
function json(obj, status, req, env) {
  const res = new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
  return cors(res, req, env, false);
}
function text(t) { return new Response(t, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } }); }
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function page(env, status, title, msg) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${esc(title)} | VL Tech Official</title><style>body{margin:0;font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f5f7fb;color:#0a1931;display:grid;place-items:center;min-height:100vh;padding:20px;box-sizing:border-box}.c{max-width:440px;background:#fff;border:1px solid #e3e8f2;border-radius:16px;padding:28px;text-align:center;box-shadow:0 8px 30px rgba(10,25,49,.06)}h1{font-size:22px;margin:0 0 8px}p{margin:0 0 20px;color:#4a5670}a{display:inline-block;background:#1a5cff;color:#fff;text-decoration:none;padding:10px 18px;border-radius:10px;font-weight:600;margin:4px}a.s{background:#eef3ff;color:#1a5cff}</style></head><body><main class="c"><h1>${esc(title)}</h1><p>${esc(msg)}</p><a href="${esc(env.BLOG + env.SHORTENER_PAGE)}">Create a short link</a><a class="s" href="${esc(env.BLOG)}/">Visit VL Tech Official</a></main></body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex', 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'no-referrer', 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'" } });
}
