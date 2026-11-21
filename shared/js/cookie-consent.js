/*! VJKit cookie-consent v0.1.0 | (c) 2021-2026 Vijaya Kumar L (RisewithVJ). All rights reserved. */
(function (w, d) {
  'use strict';
  var KEY = 'vj_consent';
  var script = d.currentScript || d.querySelector('script[src*="cookie-consent"]');

  function opt(name, fallback) {
    var v = script && script.getAttribute('data-' + name);
    return v ? v : fallback;
  }

  var cfg = {
    days: parseInt(opt('days', '180'), 10) || 180,
    message: opt('message', 'We use cookies to analyse traffic, remember your preferences and show ads. You can accept or decline non-essential cookies.'),
    privacyUrl: opt('privacy-url', '/p/privacy-policy.html'),
    privacyText: opt('privacy-text', 'Privacy Policy'),
    accept: opt('accept-text', 'Accept'),
    decline: opt('decline-text', 'Decline')
  };

  function read() {
    var m = d.cookie.match(new RegExp('(?:^|; )' + KEY + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function write(value) {
    var c = KEY + '=' + encodeURIComponent(value) + '; max-age=' + (cfg.days * 86400) + '; path=/; SameSite=Lax';
    if (w.location && w.location.protocol === 'https:') c += '; Secure';
    d.cookie = c;
  }

  function clear() {
    d.cookie = KEY + '=; max-age=0; path=/; SameSite=Lax';
  }

  function emit(value) {
    var ev;
    try { ev = new w.CustomEvent('vj:consent', { detail: { value: value } }); }
    catch (e) { ev = d.createEvent('CustomEvent'); ev.initCustomEvent('vj:consent', false, false, { value: value }); }
    w.dispatchEvent(ev);
  }

  function el(tag, cls, text) {
    var n = d.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function show() {
    if (d.getElementById('vj-cc')) return;
    var box = el('div', 'vj-cc');
    box.id = 'vj-cc';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-live', 'polite');
    box.setAttribute('aria-label', 'Cookie notice');

    var p = el('p', 'vj-cc__text', cfg.message + ' ');
    var a = el('a', 'vj-cc__link', cfg.privacyText);
    a.href = cfg.privacyUrl;
    p.appendChild(a);

    var actions = el('div', 'vj-cc__actions');
    var no = el('button', 'vj-cc__btn vj-cc__btn--ghost', cfg.decline);
    var yes = el('button', 'vj-cc__btn vj-cc__btn--primary', cfg.accept);
    no.type = yes.type = 'button';

    function choose(value) {
      write(value);
      box.classList.add('vj-cc--hide');
      setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 400);
      emit(value);
    }
    no.addEventListener('click', function () { choose('declined'); });
    yes.addEventListener('click', function () { choose('accepted'); });

    actions.appendChild(no);
    actions.appendChild(yes);
    box.appendChild(p);
    box.appendChild(actions);
    d.body.appendChild(box);
  }

  w.VJ = w.VJ || {};
  w.VJ.consent = {
    get: read,
    set: function (v) { write(v); emit(v); },
    reset: function () { clear(); show(); }
  };

  function init() { if (!read()) show(); }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init);
  else init();
})(window, document);
