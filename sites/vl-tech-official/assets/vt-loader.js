/*!
 * VL Tech Official | Asset loader v1.5.0
 * Designed and developed by Vijaya Kumar L (RisewithVJ)
 * https://vltechofficialblog.blogspot.com | https://github.com/risewithvj/vjkit
 * GENERATED FILE - do not edit. Edit tools/vt-loader.template.js; the GitHub Action rebuilds this on every push.
 * Build: 2026-11-20T20:52:18.177Z | Files pinned to commit 3e119080efa2185e60dd453db2c27ef9bb40f4bb
 */
(function () {
  'use strict';
  if (window.vtLoader) return;
  // Two copies of the same pinned files: if the first CDN fails, the second is tried. Integrity hashes still apply.
  var BASES = [
    'https://cdn.jsdelivr.net/gh/risewithvj/vjkit@3e119080efa2185e60dd453db2c27ef9bb40f4bb/sites/vl-tech-official/assets',
    'https://fastly.jsdelivr.net/gh/risewithvj/vjkit@3e119080efa2185e60dd453db2c27ef9bb40f4bb/sites/vl-tech-official/assets'
  ];
  var SRI = {"js/vt-auto-chapters.js":"sha384-tDrgbIhEwzbRzQOF62GZnAEQg7SGqB7bPss9YpDwqkkgQ3/8uzSw7veiwP6fVDy+","js/vt-bookmarks.js":"sha384-OJvNoZEKE99n3aSofswyNQvQNc8YQNemvuPnAE5NFh6UDpYjSAkVsSbdMeuw81mk","js/vt-contact.js":"sha384-1nW5wMGbuIzx6kTjn/wvfwelTSminITAAApzJuh/WzKNvII/+msR9y6AVneKiEfE","js/vt-cookie-consent.js":"sha384-+yKCs5XKqukMd/dfeWEwRv23G0C9cz3lYrVlblZ1YkUd4b2WPabdjSGlLVwA0CkJ","js/vt-copy-pre.js":"sha384-GeBcN0SaadtpVwpyZ2Y7yYphz0RJGYts8Takm3KWg2ggLxw9f2DIZtdfwyjARADM","js/vt-core.js":"sha384-74fBP/JfCkMI0XHryeTDV3ve2Nq6wyTc+6p4bgP2nGAKvys3vbb/Qf7g/8+hOfH8","js/vt-golink.js":"sha384-pFnwvG3N75Odo4hwmjGWKK6wJlaMz0yB5AauMRUpnrINS+Odh2WJkK+LdDJTTyt8","js/vt-nav-icons.js":"sha384-bzfIRJXhJ/rB8m5wYG/vEAyqI6e82iYbzqU2qyfwK07cU804AGDxukbKAb+u3wtg","js/vt-offline.js":"sha384-BrgaLPe8pmMVgtACxAGGBC6sZDFPoRtg5+Qo77ZLEqbgwF5Vrj0GZRweIQlF6+e7","js/vt-topics.js":"sha384-PFSsGtLsTmkbUerJmuxz0pSgjguOO8ikW/KAhCSsZx/Mi+lQrE2fSyw5aNg+MroX","css/vt-bookmarks.css":"sha384-y7nA9nMf0RosIh47WryJmro5qby3ldCAArvG+H/ND2qJ57vv7XioNDxBLsAcPolR","css/vt-cookie-consent.css":"sha384-DKYR4F4Gjc9Np7m3/bayi/9Lb/2rvANXG1QBUz5XQZNyOeQwsWHPm2M+SbuvIYnB","css/vt-fonts.css":"sha384-I88XXgemYANVuXpOSl3MxTlp8jSRjAX884GOvsR+TffpirbpP2fxFFIqIU5P+9t9","css/vt-theme-color.css":"sha384-NUIcPJdz0n13l1g07HzDZwQJCJ0QHNcfxUqrs1JYxaEXKZOf5yod/vV6lZtz8Jml","css/vt-toc.css":"sha384-LnRggOg44FvL0ufFP7bifCEvA0Dx49Qrqu3HpcfcMJI/6Bm43tNDGqLQ1trNT4hj","css/vt-tools.css":"sha384-MX5PI1TewnL9cJ3LGPbeTjln6+RDRvIG172PSt2cuUtO5Q4zTG6UVwiZQM1ALUCp"};
  window.vtLoader = { version: '1.5.0', commit: '3e119080efa2185e60dd453db2c27ef9bb40f4bb', built: '2026-11-20T20:52:18.177Z' };

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
