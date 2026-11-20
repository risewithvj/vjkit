/*!
 * VL Tech Official | go.trendit.in short links: shortener, click counter and link steps (v2)
 * Designed and developed by Vijaya Kumar L (RisewithVJ) | https://github.com/risewithvj/vjkit
 * Pages: <div id="vtShort"></div> (shortener), <div id="vtStats"></div> (click counter),
 *        <div id="vtLanding"> ... </div> wraps the full-width shortener landing page.
 * Steps run on real posts when the address ends with #vtgo=<signed token> from go.trendit.in.
 * Verification: Cloudflare Turnstile first; if it cannot load or Cloudflare is down, a quick
 * signed proof-of-work check runs in the browser instead, so nobody gets stuck.
 */
(function () {
  'use strict';
  if (window.vtGo) return;
  window.vtGo = true;

  var API = 'https://go.trendit.in/api';
  var SHORT = 'go.trendit.in';
  var STATS_PAGE = '/p/short-link-click-counter.html';
  var CONTACT = '/p/contact.html';
  var SITEKEY = '0x4AAAAAAGKDy3VB40o0Bt8A';
  var AD_CLIENT = 'ca-pub-4768654892299165';
  var AD = { display: '7676213101', inArticle: '3850626152' };

  /* Animated line icons (same set as assets/icons, original artwork) */
  var IP = {"shield":["tick",["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],["m8.5 12 2.5 2.5 4.5-5"]],"sparkles":["twinkle",["M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"],["M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z","M5 3l.5 1.5L7 5l-1.5.5L5 7l-.5-1.5L3 5l1.5-.5z"]],"link":["wiggle",["M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"],["M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"]],"scissors":["swing",["M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],["M8.6 7.6 20 18","M8.6 16.4 20 6"]],"check":["tick",["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"],["m8 12 3 3 5-6"]],"copy":["float",["M5 15V5a2 2 0 0 1 2-2h10"],["M11 9h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z"]],"open":["float",["M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"],["M14 3h7v7","M10 14 21 3"]],"share":["pulse",["M8.6 13.5 15.4 17.5","M15.4 6.5 8.6 10.5"],["M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"]],"chart":["grow",["M3 3v18h18"],["M8 17v-5","M13 17V7","M18 17v-8"]],"flag":["swing",["M4 22V4"],["M4 4h13l-2 4 2 4H4"]],"hourglass":["spin",["M6 2h12","M6 22h12"],["M7 2v3a5 5 0 0 0 10 0V2","M7 22v-3a5 5 0 0 1 10 0v3"]],"arrowdown":["bounce",[],["M12 4v14","m6 12 6 6 6-6"]]};
  function ic(n, size, loop) {
    var i = IP[n], p = function (a, c) { return a.map(function (d) { return '<path class="' + c + '" pathLength="100" d="' + d + '"/>'; }).join(''); };
    return '<svg class="vti vti-in' + (loop ? ' vti-loop' : '') + '" data-m="' + i[0] + '" viewBox="0 0 24 24" aria-hidden="true"' + (size ? ' style="--vti-s:' + size + 'px"' : '') + '>' + p(i[1], 'd') + p(i[2], 'a') + '</svg>';
  }

  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function post(path, body) {
    return fetch(API + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return { ok: false, error: 'Service unavailable. Please try again.' }; }); })
      .catch(function () { return { ok: false, error: 'Network error. Check your connection and try again.' }; });
  }
  function fmtDate(ms) { if (!ms) return '—'; try { return new Date(ms).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch (e) { return new Date(ms).toISOString(); } }
  function num(n) { try { return Number(n || 0).toLocaleString(); } catch (e) { return String(n || 0); } }
  function copy(text, btn) {
    var done = function () { var t = btn.innerHTML; btn.innerHTML = 'Copied!'; setTimeout(function () { btn.innerHTML = t; }, 1600); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    function fallback() { var i = document.createElement('textarea'); i.value = text; i.style.position = 'fixed'; i.style.opacity = '0'; document.body.appendChild(i); i.select(); try { document.execCommand('copy'); done(); } catch (e) {} i.remove(); }
  }

  /* ---------------- Ads (AdSense units already used on the site) ---------------- */
  // Each unit is labelled, kept away from buttons by spacing, and hidden when unfilled.
  function adBox(slot, inArticle) {
    var w = document.createElement('div');
    w.className = 'vtg-ad';
    w.innerHTML = '<span class="vtg-adl">Advertisement</span><ins class="adsbygoogle" style="display:block' + (inArticle ? ';text-align:center' : '') + '" data-ad-client="' + AD_CLIENT + '" data-ad-slot="' + slot + '"' +
      (inArticle ? ' data-ad-layout="in-article" data-ad-format="fluid"' : ' data-ad-format="auto" data-full-width-responsive="true"') + '></ins>';
    return w;
  }
  function fillAds(list) {
    list.forEach(function (w) {
      if (!w.isConnected) return;
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { w.hidden = true; }
    });
    // Hide boxes that stay empty (ad blockers, no fill) so no blank gaps are left.
    setTimeout(function () { list.forEach(function (w) { var i = w.querySelector('ins'); if (i && i.getAttribute('data-ad-status') !== 'filled' && !i.offsetHeight) w.classList.add('vtg-ad-empty'); }); }, 8000);
  }

  /* ---------------- Human check: Turnstile + backup ---------------- */
  var tsReady = null;
  function turnstileLib() {
    if (tsReady) return tsReady;
    tsReady = new Promise(function (res, rej) {
      if (window.turnstile) return res(window.turnstile);
      var timer = setTimeout(function () { rej(new Error('timeout')); }, 10000);
      window.vtTsLoaded = function () { clearTimeout(timer); res(window.turnstile); };
      var s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=vtTsLoaded';
      s.async = true; s.defer = true; s.onerror = function () { clearTimeout(timer); tsReady = null; rej(new Error('ts')); };
      document.head.appendChild(s);
    });
    return tsReady;
  }
  function solvePow(chal, bits, onProgress) {
    var te = new TextEncoder(), want = Math.pow(2, bits), n = 0, BATCH = 128;
    function zero(b) { var z = 0; for (var i = 0; i < b.length; i++) { if (b[i] === 0) { z += 8; continue; } z += Math.clz32(b[i]) - 24; break; } return z; }
    return new Promise(function (res, rej) {
      if (!window.crypto || !crypto.subtle) return rej(new Error('nocrypto'));
      (function round() {
        var jobs = [];
        for (var k = 0; k < BATCH; k++) (function (x) { jobs.push(crypto.subtle.digest('SHA-256', te.encode(chal + ':' + x)).then(function (h) { return zero(new Uint8Array(h)) >= bits ? x : -1; })); })(n + k);
        n += BATCH;
        Promise.all(jobs).then(function (r) {
          for (var i = 0; i < r.length; i++) if (r[i] >= 0) return res(String(r[i]));
          onProgress(Math.min(97, Math.round((1 - Math.exp(-n / want)) * 100)));
          setTimeout(round, 0);
        }, rej);
      })();
    });
  }
  // Returns { creds(), reset(), backup() }; onState(ready:boolean) is called on every change.
  function verifier(box, purpose, linkToken, onState) {
    box.classList.add('vtv');
    box.innerHTML = '<div class="vtv-ts"></div>' +
      '<div class="vtv-bk" hidden>' + ic('shield', 22, true) + '<div><b>Quick security check</b><span class="vtv-st">Starting…</span><i class="vtv-bar"><i></i></i></div></div>' +
      '<button type="button" class="vtv-alt" hidden>Verification not loading? Use the quick check</button>';
    var tsEl = $('.vtv-ts', box), bk = $('.vtv-bk', box), alt = $('.vtv-alt', box), st = $('.vtv-st', box), fill = $('.vtv-bar i', box);
    var creds = null, id = null, mode = 'ts', interactive = false, timers = [];
    function set(c) { creds = c; onState(!!c); }
    function backup() {
      if (mode === 'pow') return;
      mode = 'pow'; set(null); timers.forEach(clearTimeout);
      tsEl.hidden = true; alt.hidden = true; bk.hidden = false; bk.classList.remove('ok');
      st.textContent = 'Checking your browser…'; fill.style.width = '4%';
      post('/pow', { purpose: purpose, token: linkToken }).then(function (d) {
        if (!d.ok) { st.textContent = d.error || 'Check failed. Please reload the page.'; return; }
        return solvePow(d.chal, d.bits, function (p) { fill.style.width = p + '%'; st.textContent = 'Checking your browser… ' + p + '%'; }).then(function (n) {
          fill.style.width = '100%'; st.textContent = 'Verified. You are good to go.'; bk.classList.add('ok');
          set({ pow: { c: d.chal, n: n } });
        });
      }).catch(function () { st.textContent = 'Your browser blocked the check. Please update it or try another browser.'; });
    }
    function mount() {
      mode = 'ts'; interactive = false; tsEl.hidden = false; bk.hidden = true;
      turnstileLib().then(function (ts) {
        id = ts.render(tsEl, {
          sitekey: SITEKEY, theme: 'light', size: 'flexible',
          callback: function (t) { if (mode === 'ts') { alt.hidden = true; set({ cf: t }); } },
          'expired-callback': function () { if (mode === 'ts') set(null); },
          'before-interactive-callback': function () { interactive = true; },
          'error-callback': function () { backup(); return true; },
          'unsupported-callback': function () { backup(); },
          'timeout-callback': function () { if (mode === 'ts') set(null); }
        });
      }).catch(backup);
      timers = [
        setTimeout(function () { if (!creds && mode === 'ts') alt.hidden = false; }, 8000),
        setTimeout(function () { if (!creds && mode === 'ts' && !interactive) backup(); }, 20000)
      ];
    }
    alt.addEventListener('click', backup);
    mount();
    return {
      creds: function () { return creds; },
      backup: backup,
      reset: function () {
        timers.forEach(clearTimeout);
        if (mode === 'pow') { mode = 'x'; backup(); return; }
        set(null); if (window.turnstile && id !== null) try { window.turnstile.reset(id); } catch (e) {}
      }
    };
  }

  /* ---------------- Shortener page ---------------- */
  function shortener(root) {
    root.className = 'vtx';
    root.innerHTML =
      '<section class="vtx-panel" aria-labelledby="vtxST">' +
        '<svg aria-hidden="true" class="vtx-globe" fill="none" stroke="#fff" stroke-width=".6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4.2" ry="10"/><path d="M2 12h20M4 7h16M4 17h16"/></svg>' +
        '<p class="vtx-ey">' + ic('sparkles', 14, true) + ' Free tool · No sign-up</p><h2 id="vtxST">Shorten a long link</h2>' +
        '<p class="vtx-sub">Paste any link to get a short go.trendit.in link you can share anywhere. Free, safe and with a live click counter.</p>' +
        '<form class="vtx-grid" novalidate>' +
          '<div class="vtx-f vtx-full"><label for="vtxU">Long URL</label><div class="vtx-in">' + ic('link', 18) + '<input id="vtxU" name="url" type="url" inputmode="url" autocomplete="url" placeholder="https://example.com/your-long-link" maxlength="2048" required></div></div>' +
          '<div class="vtx-f vtx-full"><label for="vtxA">Custom name (optional)</label><div class="vtx-in"><span class="vtx-pre">' + SHORT + '/</span><input id="vtxA" name="alias" maxlength="30" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="my-link"></div><span class="vtx-hint">Use 4 to 30 letters, numbers or hyphens. Leave empty for a random short code.</span></div>' +
          '<div class="vtx-full vtx-ts"></div>' +
          '<div class="vtx-full"><button class="vtx-btn vtx-go" type="submit" disabled>' + ic('scissors', 16) + 'Shorten link</button>' +
          '<p class="vtx-consent">By creating a link you agree to our <a href="/p/terms-and-conditions.html">Terms</a>. Harmful, illegal or misleading links are removed.</p>' +
          '<div class="vtx-msg" role="alert" hidden></div></div>' +
        '</form>' +
      '</section>' +
      '<div class="vtx-card vtx-result" hidden><h3>' + ic('check', 20, true) + ' Your short link is ready</h3><div class="vtx-out"><input readonly aria-label="Short link"><button class="vtx-btn vtx-blue" type="button" data-a="copy">' + ic('copy', 16) + 'Copy</button><a class="vtx-btn vtx-ghost" data-a="open" target="_blank" rel="noopener">' + ic('open', 16) + 'Open</a><button class="vtx-btn vtx-ghost" type="button" data-a="share" hidden>' + ic('share', 16) + 'Share</button><a class="vtx-btn vtx-ghost" data-a="stats">' + ic('chart', 16) + 'Clicks</a></div></div>' +
      '<div class="vtx-card vtx-recent" hidden><h3>Your recent links</h3><ul class="vtx-list"></ul><p class="vtx-hint" style="color:inherit;margin:10px 0 0">Saved only in this browser.</p></div>';

    var form = $('form', root), btn = $('button[type=submit]', form), msg = $('.vtx-msg', form), alias = form.elements.alias;
    var label = btn.innerHTML, pending = false;
    var v = verifier($('.vtx-ts', form), 'create', '', function (ready) { btn.disabled = !ready; if (ready && pending) { pending = false; send(); } });
    function say(t) { msg.hidden = !t; msg.className = 'vtx-msg bad'; msg.textContent = t || ''; }

    function send() {
      var u = form.elements.url.value.trim();
      btn.disabled = true; btn.textContent = 'Creating…';
      var body = { url: u, alias: alias.value.trim() }, c = v.creds() || {};
      if (c.cf) body.cf = c.cf; if (c.pow) body.pow = c.pow;
      post('/create', body).then(function (d) {
        btn.innerHTML = label;
        if (!d.ok && d.fallback) { pending = true; say(''); v.backup(); return; }
        v.reset();
        if (!d.ok) return say(d.error || 'Could not create the link.');
        showResult(d.short, u); remember(d.short, u); form.reset();
      });
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault(); say('');
      if (!form.elements.url.value.trim()) { form.elements.url.focus(); return say('Paste the link you want to shorten.'); }
      if (!v.creds()) return say('Please wait for the security check to finish.');
      send();
    });

    var res = $('.vtx-result', root), out = $('input', res);
    function showResult(short) {
      res.hidden = false; out.value = short;
      $('[data-a=open]', res).href = short;
      $('[data-a=stats]', res).href = STATS_PAGE + '?c=' + encodeURIComponent(short.split('/').pop());
      var sh = $('[data-a=share]', res); sh.hidden = !navigator.share;
      sh.onclick = function () { navigator.share({ title: 'Link', url: short }).catch(function () {}); };
      res.classList.remove('vtx-pop'); void res.offsetWidth; res.classList.add('vtx-pop');
      res.scrollIntoView({ behavior: 'smooth', block: 'center' }); out.select();
    }
    $('[data-a=copy]', res).addEventListener('click', function () { copy(out.value, this); });

    function load() { try { return JSON.parse(localStorage.getItem('vt_links') || '[]'); } catch (e) { return []; } }
    function remember(s, l) { var a = load().filter(function (x) { return x.s !== s; }); a.unshift({ s: s, l: l, t: Date.now() }); try { localStorage.setItem('vt_links', JSON.stringify(a.slice(0, 10))); } catch (e) {} list(); }
    function list() {
      var a = load(), box = $('.vtx-recent', root), ul = $('ul', box);
      box.hidden = !a.length;
      ul.innerHTML = a.map(function (x, i) { var code = x.s.split('/').pop(); return '<li><div><a href="' + esc(x.s) + '" target="_blank" rel="noopener">' + esc(x.s.replace(/^https:\/\//, '')) + '</a><div class="vtx-dst">' + esc(x.l.slice(0, 90)) + '</div></div><div class="vtx-row" style="flex-wrap:nowrap"><button class="vtx-mini" type="button" data-i="' + i + '">Copy</button><a class="vtx-mini" href="' + STATS_PAGE + '?c=' + encodeURIComponent(code) + '">Clicks</a></div></li>'; }).join('');
      ul.querySelectorAll('button[data-i]').forEach(function (b) { b.addEventListener('click', function () { copy(a[+b.dataset.i].s, b); }); });
    }
    list();
  }

  /* ---------------- Click counter page ---------------- */
  function counter(root) {
    root.className = 'vtx';
    root.innerHTML =
      '<section class="vtx-panel" aria-labelledby="vtxCT2">' +
        '<svg aria-hidden="true" class="vtx-globe" fill="none" stroke="#fff" stroke-width=".6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4.2" ry="10"/><path d="M2 12h20M4 7h16M4 17h16"/></svg>' +
        '<p class="vtx-ey">' + ic('chart', 14, true) + ' Free tool</p><h2 id="vtxCT2">Check clicks on your short link</h2>' +
        '<p class="vtx-sub">Paste a go.trendit.in link to see how many people opened it and reached the destination.</p>' +
        '<form class="vtx-grid" novalidate><div class="vtx-f vtx-full"><label for="vtxC">Short link</label><div class="vtx-in">' + ic('link', 18) + '<input id="vtxC" name="c" inputmode="url" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="https://go.trendit.in/abc123" required></div></div>' +
        '<div class="vtx-full"><button class="vtx-btn" type="submit">Check clicks</button><div class="vtx-msg" role="alert" hidden></div></div></form>' +
      '</section><div class="vtx-card vtx-stats" hidden aria-live="polite"></div>';
    var form = $('form', root), msg = $('.vtx-msg', form), box = $('.vtx-stats', root), btn = $('button', form);
    function say(t) { msg.hidden = !t; msg.className = 'vtx-msg bad'; msg.textContent = t || ''; }
    function run(v) {
      say(''); btn.disabled = true; btn.textContent = 'Checking…';
      fetch(API + '/stats?c=' + encodeURIComponent(v)).then(function (r) { return r.json(); }).catch(function () { return { ok: false, error: 'Network error. Please try again.' }; }).then(function (d) {
        btn.disabled = false; btn.textContent = 'Check clicks';
        if (!d.ok) { box.hidden = true; return say(d.error || 'Could not load the stats.'); }
        var max = Math.max.apply(null, d.days.map(function (x) { return x.opens; }).concat([1]));
        var active = d.status === 'active';
        box.hidden = false;
        box.innerHTML = '<div class="vtx-row" style="justify-content:space-between;margin-bottom:10px"><h3 style="margin:0">' + esc(d.short.replace(/^https:\/\//, '')) + '</h3><span class="vtx-pill' + (active ? '' : ' off') + '">' + (active ? 'Active' : 'Removed') + '</span></div>' +
          '<p style="margin:0 0 14px;font-size:14px">Goes to: <b>' + esc(d.domain) + '</b></p>' +
          '<div class="vtx-kpis"><div class="vtx-kpi"><b>' + num(d.opens) + '</b><span>Total visits</span></div><div class="vtx-kpi"><b>' + num(d.clicks) + '</b><span>Reached destination</span></div><div class="vtx-kpi"><b style="font-size:15px">' + esc(fmtDate(d.created_at)) + '</b><span>Created</span></div><div class="vtx-kpi"><b style="font-size:15px">' + esc(fmtDate(d.last_click)) + '</b><span>Last click</span></div></div>' +
          '<h3 style="font-size:15px">Visits in the last 7 days</h3><div class="vtx-bars" role="img" aria-label="Visits per day for the last 7 days">' + d.days.map(function (x) { return '<div class="vtx-bar"><small>' + x.opens + '</small><i style="height:' + Math.round((x.opens / max) * 90) + '%"></i></div>'; }).join('') + '</div>' +
          '<div class="vtx-days">' + d.days.map(function (x) { return '<span>' + esc(x.day.slice(8)) + '</span>'; }).join('') + '</div>' +
          '<div class="vtx-row" style="justify-content:space-between;margin-top:16px"><span style="font-size:12.5px">Updated every minute. Visitor details are never stored.</span><a class="vtx-report" href="' + CONTACT + '?report=' + encodeURIComponent(d.code) + '">' + ic('flag', 14) + 'Report this link</a></div>';
      });
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); var v = form.elements.c.value.trim(); if (!v) return say('Paste a go.trendit.in short link.'); history.replaceState(null, '', '?c=' + encodeURIComponent(v.split('/').pop())); run(v); });
    var pre = new URLSearchParams(location.search).get('c');
    if (pre) { form.elements.c.value = 'https://' + SHORT + '/' + pre.replace(/[^A-Za-z0-9-]/g, ''); run(pre); }
  }

  /* ---------------- Link steps on real posts ---------------- */
  function steps(token) {
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    var host = $('#postBody') || $('.postBody') || $('#main') || document.body;
    var card = document.createElement('div');
    card.className = 'vtx vtg'; card.setAttribute('role', 'region'); card.setAttribute('aria-label', 'Your link');
    card.innerHTML =
      '<div class="vtg-top"><span class="vtg-ico">' + ic('hourglass', 18, true) + '</span><b>Your link is almost ready</b><span class="vtg-chip">Step 1 of 2</span></div>' +
      '<p class="vtg-dst"><span class="vtg-shield">' + ic('shield', 20, true) + '</span><span class="vtg-dtx">Checking your link…</span></p>' +
      '<div class="vtg-bar" aria-hidden="true"><i></i></div>' +
      '<div class="vtg-row"><p class="vtg-txt" aria-live="polite">Please wait…</p><span class="vtg-sec" aria-hidden="true"></span></div>' +
      '<button type="button" class="vtx-btn vtx-blue vtg-jump" hidden>' + ic('arrowdown', 16, true) + '<span>Scroll down to continue</span></button>' +
      '<div class="vtg-foot"><span>Free short link by VL Tech Official</span><a class="vtx-report" href="' + CONTACT + '">' + ic('flag', 14) + 'Report this link</a></div>';
    var adTop = adBox(AD.display), adUnder = adBox(AD.display);
    host.insertBefore(adTop, host.firstChild);
    adTop.after(card);
    card.after(adUnder);

    var go = document.createElement('div');
    go.className = 'vtx vtg-go'; go.hidden = true; go.id = 'vtgGo';
    go.innerHTML = '<div class="vtg-go-ico">' + ic('check', 26, true) + '</div><p class="vtg-msg">Tap the button to continue to your link.</p><div class="vtg-ver" hidden></div><button class="vtx-btn vtx-blue vtg-cta" type="button" disabled>Continue</button><div class="vtx-msg bad" role="alert" hidden></div>';
    var goAdTop = adBox(AD.inArticle, true), goAdBottom = adBox(AD.inArticle, true);
    goAdTop.hidden = goAdBottom.hidden = true;
    placeGo(host, go);
    go.before(goAdTop); go.after(goAdBottom);
    fillAds([adTop, adUnder]);

    var sticky = document.createElement('div');
    sticky.className = 'vtx vtg-sticky'; sticky.hidden = true;
    sticky.innerHTML = '<span>' + ic('check', 16, true) + 'Your link is ready</span><button class="vtx-btn" type="button">Go to button ' + ic('arrowdown', 16, true) + '</button>';
    document.body.appendChild(sticky);
    function toGo() { go.scrollIntoView({ behavior: 'smooth', block: 'center' }); go.classList.remove('vtg-flash'); void go.offsetWidth; go.classList.add('vtg-flash'); }
    $('button', sticky).addEventListener('click', toGo);
    $('.vtg-jump', card).addEventListener('click', toGo);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { sticky.dataset.inview = en[0].isIntersecting ? '1' : ''; sticky.hidden = !sticky.dataset.ready || !!sticky.dataset.inview; }).observe(go);

    var bar = $('.vtg-bar i', card), txt = $('.vtg-txt', card), sec = $('.vtg-sec', card), btn = $('.vtg-cta', go), err = $('.vtx-msg', go), v = null, pending = false;
    function fail(t) { txt.textContent = t; bar.style.width = '0'; card.classList.add('vtg-bad'); }

    post('/step', { token: token }).then(function (d) {
      if (!d.ok) return fail(d.error || 'This link session expired. Please open the short link again.');
      $('.vtg-chip', card).textContent = 'Step ' + d.step + ' of ' + d.total;
      $('.vtg-dtx', card).innerHTML = 'Destination: <b>' + esc(d.domain) + '</b><span class="vtg-safe">Checked for malware</span>';
      card.classList.add('vtg-checked');
      $('.vtx-report', card).href = CONTACT + '?report=' + encodeURIComponent(d.code);
      var total = Math.max(1, d.wait), left = d.wait;
      function tick() {
        bar.style.width = Math.round(((total - left) / total) * 100) + '%';
        if (left > 0) { txt.textContent = 'Please wait, your link is being prepared…'; sec.textContent = left + 's'; left--; setTimeout(tick, 1000); return; }
        bar.style.width = '100%'; sec.textContent = '';
        $('.vtg-ico', card).innerHTML = ic('check', 18, true);
        txt.innerHTML = d.final ? '<b>Done!</b> Scroll down, verify and tap “Get link”.' : '<b>Done!</b> Scroll down and tap “Continue”.';
        card.classList.add('vtg-done');
        $('.vtg-jump', card).hidden = false;
        go.hidden = false; goAdTop.hidden = goAdBottom.hidden = false; fillAds([goAdTop, goAdBottom]);
        sticky.dataset.ready = '1'; sticky.hidden = !!sticky.dataset.inview;
        if (d.final) {
          btn.textContent = 'Get link'; $('.vtg-msg', go).textContent = 'Confirm you are human, then get your link.';
          var vb = $('.vtg-ver', go); vb.hidden = false;
          v = verifier(vb, 'go', token, function (ready) { btn.disabled = !ready; if (ready && pending) { pending = false; next(); } });
        } else { btn.textContent = 'Continue (step ' + d.step + ' of ' + d.total + ')'; btn.disabled = false; }
      }
      tick();
      function next() {
        err.hidden = true; btn.disabled = true; var label = btn.textContent; btn.textContent = 'Please wait…';
        var body = { token: token }, c = (v && v.creds()) || {};
        if (c.cf) body.cf = c.cf; if (c.pow) body.pow = c.pow;
        post('/next', body).then(function (r) {
          if (r.ok && r.next) { location.href = r.next; return; }
          if (r.ok && r.url) { btn.textContent = 'Opening your link…'; location.href = r.url; return; }
          btn.textContent = label;
          if (r.fallback && v) { pending = true; v.backup(); return; }
          if (v) v.reset(); else btn.disabled = false;
          err.hidden = false; err.textContent = r.error || 'Something went wrong. Please try again.';
        });
      }
      btn.addEventListener('click', next);
    });
  }
  function placeGo(host, go) {
    // Middle of the article, never right next to another ad unit (AdSense: keep buttons away from ads).
    var blocks = [].filter.call(host.children, function (el) { return /^(P|H2|H3|UL|OL|DIV|FIGURE|TABLE|BLOCKQUOTE)$/.test(el.tagName) && !el.classList.contains('vtg') && !el.classList.contains('vtg-ad'); });
    var isAd = function (el) { return !!el && (el.tagName === 'INS' || /adsbygoogle|vj-mad|google-auto-placed|ad-|vtg-ad/i.test(el.className || '') || !!(el.querySelector && el.querySelector('ins.adsbygoogle'))); };
    var start = Math.floor(blocks.length / 2), target = null;
    for (var i = start; i < blocks.length && !target; i++) if (blocks[i].tagName === 'P' && !isAd(blocks[i].nextElementSibling) && !isAd(blocks[i])) target = blocks[i];
    if (target) target.after(go); else host.appendChild(go);
  }

  /* ---------------- Landing page helpers ---------------- */
  function landing(root) {
    document.body.classList.add('vt-wide');
    // The theme puts its "In this guide" box before the first heading, which is inside the hero. Move it below the hero.
    var hero = root.querySelector('.vl-hero');
    function moveToc() { var t = hero && hero.querySelector('.vj-toc'); if (!t) return; var after = hero.nextElementSibling && /vl-ad/.test(hero.nextElementSibling.className) ? hero.nextElementSibling : hero; after.after(t); t.open = false; t.removeAttribute('open'); }
    moveToc(); setTimeout(moveToc, 1200); setTimeout(moveToc, 4000);
    // Draw the icons when they scroll into view.
    var icons = root.querySelectorAll('.vti:not(.vti-in)');
    if (!('IntersectionObserver' in window)) { icons.forEach(function (s) { s.classList.add('vti-in'); }); return; }
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vti-in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -10% 0px' });
    icons.forEach(function (s) { io.observe(s); });
    root.querySelectorAll('[data-count]').forEach(function (el) {
      var n = parseInt(el.getAttribute('data-count'), 10) || 0;
      var o = new IntersectionObserver(function (en) {
        if (!en[0].isIntersecting) return; o.disconnect();
        var t0 = performance.now();
        (function f(t) { var p = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))).toLocaleString() + (el.getAttribute('data-suffix') || ''); if (p < 1) requestAnimationFrame(f); })(t0);
      });
      o.observe(el);
    });
  }

  function boot() {
    var m = location.hash.match(/vtgo=([A-Za-z0-9_\-.]+)/);
    if (m) steps(m[1]);
    var l = document.getElementById('vtLanding'); if (l && !l.dataset.ready) { l.dataset.ready = '1'; landing(l); }
    var s = document.getElementById('vtShort'); if (s && !s.dataset.ready) { s.dataset.ready = '1'; shortener(s); }
    var c = document.getElementById('vtStats'); if (c && !c.dataset.ready) { c.dataset.ready = '1'; counter(c); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
