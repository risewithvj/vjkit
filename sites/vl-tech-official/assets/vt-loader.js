/*!
 * VL Tech Official | Asset loader v1.6.0
 * Designed and developed by Vijaya Kumar L (RisewithVJ)
 * https://vltechofficialblog.blogspot.com | https://github.com/risewithvj/vjkit
 * GENERATED FILE - do not edit. Edit tools/vt-loader.template.js; the GitHub Action rebuilds this on every push.
 * Build: 2026-11-21T21:54:07.712Z | Files pinned to commit a6c9f70c92e99a4be340f09b54f63e42f8c5d0cf
 */
(function () {
  'use strict';
  if (window.vtLoader) return;
  // Two copies of the same pinned files: if the first CDN fails, the second is tried. Integrity hashes still apply.
  var BASES = [
    'https://cdn.jsdelivr.net/gh/risewithvj/vjkit@a6c9f70c92e99a4be340f09b54f63e42f8c5d0cf/sites/vl-tech-official/assets',
    'https://fastly.jsdelivr.net/gh/risewithvj/vjkit@a6c9f70c92e99a4be340f09b54f63e42f8c5d0cf/sites/vl-tech-official/assets'
  ];
  var SRI = {"js/vt-auto-chapters.js":"sha384-yXKT+Q6yy4QYEF8HyiI51uoRFXYptRWxNrvbGu7vYvi2Eewrt5WY9/JFxFDHUQSB","js/vt-bookmarks.js":"sha384-o1cR/poS2eN+tuOdPLXr7EzSBP2os0bmt7k4X25CUc2HOclBAyENoDFC4rd0mTUW","js/vt-contact.js":"sha384-9ES5pJRBQwsxeCMe4780bhZWfcScg1IqLl0d3ZbRip5GlzZAC7gRibMGxUs5dgHq","js/vt-cookie-consent.js":"sha384-L7paItG0K2VxBw8KxuatjX2q99kSIHmfeufMa7Lh5HqgMHXFA/X+6/QNwK9i0EF9","js/vt-copy-pre.js":"sha384-BxWzQybFGgmpVvAhNSPmAFL57K7ja6Ki5OO0TuW8UGKFM2kpXLKRzIVSQa5kvliW","js/vt-core.js":"sha384-4ChtRmWIZ+sxqoLwLvf/AyQ+IdBcW8mc+/lxmAz9HVQhcNMw+F2iLFcOAUw4oyLo","js/vt-golink.js":"sha384-1lZdVLjKJISQ7NxeQPd3ms/0DrSE5z4GZmve+B9nwyoVCOhP84so+phsvpYJWMh9","js/vt-nav-icons.js":"sha384-n58seCC8LnU23k+64ALNMnIgRiPNVKt2j5ZWEKh44SBI3lGuOgz5fQsU5je9g9gd","js/vt-offline.js":"sha384-HPdu+ZZ+RIHNyoqzgfY1a6u2z2fVR5VQ/08+zt6MHceU5ok8u8CHyFd3Wv4LcBUc","js/vt-qr.js":"sha384-2rIsapCnv7HsZGUCtctU9UyduVGShcKyyCFiKqQzSHDgZ/qM5xJEIk+rE2X+tPMu","js/vt-topics.js":"sha384-Iw3xiT/1b7FiNoJf7ryaUIhkOi+EJ2tz6vbrzptxeU4RC2i94Zb1Zy23+y3hnqUw","js/vt-wa.js":"sha384-2ppUvtJ0IBimh0Vj5zF9pnKZZWYbSsEokfvUXwfyGwTKFvVMOv4q4xQr6p+4Hu2u","css/vt-bookmarks.css":"sha384-Nb7v8sds2evnHPU5go6pXJQ3Wp8CIBHmsUmkKVheT3Ul4XWG14LIJCc1p5awIMeg","css/vt-cookie-consent.css":"sha384-JpXhx3ypgxQOfYJrms9zqrfChpB3OVx+MUwpkE2YfCq9hG61ZrpPXK5kKC512nYU","css/vt-fonts.css":"sha384-L6JX3yGYHQL+T9AhFgG8ZfKC2EWec6qz66vqqu4DhjCXV/7hzCF9Qh7L1qUva+l2","css/vt-theme-color.css":"sha384-zT85sr7Qn1D1jzYZdzJaDfsp3LutG/9Iiv9Jf08jcax2hz2cEYpG9a7TwAvqkZv8","css/vt-toc.css":"sha384-On7yzQr9A1iBNkqnksQoQBO89yW3dYmksVkgBv24q8iis9Rz/gHW1H2RjJI6s/0q","css/vt-tools.css":"sha384-LMBGUXF8RYJEw+vrVxg7OSpxKJIx9ozMN1VnHGd9Ar44dr+0GedFbsGrfNpJUYoz"};
  window.vtLoader = { version: '1.6.0', commit: 'a6c9f70c92e99a4be340f09b54f63e42f8c5d0cf', built: '2026-11-21T21:54:07.712Z' };

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
  // Tools (contact form, URL shortener, click counter, short-link steps, QR code, WhatsApp) load at once on the pages that need them.
  function tools() {
    var go = /(^|[#&])vtgo=/.test(location.hash);
    var short = q('#vtShort') || q('#vtStats');
    var contact = q('#vtContact');
    var qr = q('#vtQr'), wa = q('#vtWa');
    if (!go && !short && !contact && !qr && !wa) return;
    css('css/vt-tools.css', 'vt-tools-css');
    if (go || short) js('js/vt-golink.js', 'vt-golink-js');
    if (contact) js('js/vt-contact.js', 'vt-contact-js');
    if (qr || wa) js('js/vt-qr.js', 'vt-qr-js', function () { if (wa) js('js/vt-wa.js', 'vt-wa-js'); }); // own QR encoder, WhatsApp tool
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
