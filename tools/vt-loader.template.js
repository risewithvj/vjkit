/*!
 * VL Tech Official | Asset loader v1.5.0
 * Designed and developed by Vijaya Kumar L (RisewithVJ)
 * https://vltechofficialblog.blogspot.com | https://github.com/risewithvj/vjkit
 * GENERATED FILE - do not edit. Edit tools/vt-loader.template.js; the GitHub Action rebuilds this on every push.
 * Build: __DATE__ | Files pinned to commit __SHA__
 */
(function () {
  'use strict';
  if (window.vtLoader) return;
  // Two copies of the same pinned files: if the first CDN fails, the second is tried. Integrity hashes still apply.
  var BASES = [
    'https://cdn.jsdelivr.net/gh/risewithvj/vjkit@__SHA__/sites/vl-tech-official/assets',
    'https://fastly.jsdelivr.net/gh/risewithvj/vjkit@__SHA__/sites/vl-tech-official/assets'
  ];
  var SRI = __SRI__;
  window.vtLoader = { version: '1.5.0', commit: '__SHA__', built: '__DATE__' };

  function add(kind, path, id, done, n) {
    n = n || 0;
    if (!n && document.getElementById(id)) return;
    var el = document.createElement(kind === 'js' ? 'script' : 'link');
    el.id = id;
    if (kind === 'js') { el.src = BASES[n] + '/' + path; el.async = true; }
    else { el.rel = 'stylesheet'; el.href = BASES[n] + '/' + path; }
    if (SRI[path]) { el.integrity = SRI[path]; el.crossOrigin = 'anonymous'; }
    if (done) el.onload = done;
    el.onerror = function () {
      if (n + 1 < BASES.length) { if (el.parentNode) el.parentNode.removeChild(el); add(kind, path, id, done, n + 1); }
    };
    (kind === 'js' ? document.body : document.head).appendChild(el);
  }
  function js(p, id, done) { add('js', p, id, done); }
  function css(p, id, done) { add('css', p, id, done); }
  function q(s) { return document.querySelector(s); }

  // Fonts as early as possible
  css('css/vt-fonts.css', 'vt-fonts-css');

  var started = false, EVENTS = ['scroll', 'click', 'touchstart', 'keydown', 'mousemove'];
  function start() {
    if (started) return;
    started = true;
    // Page flags written by the theme (const isSingleItem, isPost, isPrivateBlog).
    // Read here, not at load time: this file runs in <head> before the theme defines them.
    var single = typeof isSingleItem !== 'undefined' && isSingleItem === 'true';
    var post = typeof isPost !== 'undefined' && isPost === 'true';
    var privateBlog = typeof isPrivateBlog !== 'undefined' && isPrivateBlog === 'true';
    EVENTS.forEach(function (e) { window.removeEventListener(e, start, true); });
    js('js/vt-core.js', 'vt-core-js', function () { if (q('#themeBtn')) css('css/vt-theme-color.css', 'vt-thmC-css'); });
    js('js/vt-offline.js', 'vt-noInt-js');
    if (single && document.querySelectorAll('#postBody pre').length) js('js/vt-copy-pre.js', 'vt-pre-js');
    if (single && q('#postToc')) css('css/vt-toc.css', 'vt-toc-css');
    if (post && !privateBlog && q('#aChp')) js('js/vt-auto-chapters.js', 'vt-aChp-js');
    if (q('.isBkm')) css('css/vt-bookmarks.css', 'vt-bkm-css', function () { js('js/vt-bookmarks.js', 'vt-bkm-js'); });
    if (q('#ckWrap') && document.cookie.indexOf('CookiePolicy=Accepted') < 0) {
      setTimeout(function () {
        css('css/vt-cookie-consent.css', 'vt-ck-css', function () { js('js/vt-cookie-consent.js', 'vt-ck-js'); });
      }, 3000);
    }
    try { localStorage.setItem('vt_seen', '1'); } catch (e) {}
  }
  // Tools (contact form, URL shortener, click counter, short-link steps) load at once on the pages that need them.
  function tools() {
    var go = /(^|[#&])vtgo=/.test(location.hash);
    var short = q('#vtShort') || q('#vtStats');
    var contact = q('#vtContact');
    if (!go && !short && !contact) return;
    css('css/vt-tools.css', 'vt-tools-css');
    if (go || short) js('js/vt-golink.js', 'vt-golink-js');
    if (contact) js('js/vt-contact.js', 'vt-contact-js');
  }

  function ready() {
    js('js/vt-nav-icons.js', 'vt-nav-js', function () { // animated header + sidebar menu icons
      if (q('.vj-topics')) js('js/vt-topics.js', 'vt-topics-js'); // home page topic cards, built from your labels
    });
    tools();
    var seen = false;
    try { seen = !!localStorage.getItem('vt_seen'); } catch (e) {}
    if (seen || (document.documentElement.scrollTop || document.body.scrollTop) > 0) { start(); return; }
    EVENTS.forEach(function (e) { window.addEventListener(e, start, { capture: true, passive: true }); });
    setTimeout(start, 6000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
})();
