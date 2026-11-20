/*!
 * VL Tech Official | Previous / next post chapters v1.0.0
 * Designed and developed by Vijaya Kumar L (RisewithVJ)
 * https://vltechofficialblog.blogspot.com | https://github.com/risewithvj
 * (c) 2026 Vijaya Kumar L. Behaviour adapted from Plus UI / ngylduy/blog (MIT, (c) ngylduy); code rewritten.
 */
(function () {
  'use strict';
  var cfg = window.autoChapterConfig || {};
  var box = document.getElementById(cfg.containerId || 'aChp');
  if (!box) return;
  var home = (cfg.homePage || location.origin).replace(/\/$/, '');
  if (home.indexOf(location.hostname) === -1) home = location.origin; // only read this blog's own feed
  var label = (window.labelArray && labelArray.length)
    ? '/-/' + encodeURIComponent(labelArray[Math.floor(Math.random() * labelArray.length)]) : '';
  var maxLen = cfg.titleLength === 'auto' ? 0 : parseInt(cfg.titleLength, 10) || 0;
  function feed(q) {
    return fetch(home + '/feeds/posts/summary' + label + '?alt=json&orderby=updated' + q)
      .then(function (r) { return r.json(); });
  }
  feed('&max-results=0').then(function (d) {
    var total = parseInt(d.feed.openSearch$totalResults.$t, 10) - 2;
    var start = Math.floor(Math.random() * Math.max(total, 1)) + 1;
    return feed('&start-index=' + start + '&max-results=2');
  }).then(function (d) {
    var list = (d.feed.entry || []).slice(0, 2);
    if (!list.length) return;
    var wrap = document.createElement('div');
    wrap.className = 'chpN';
    list.forEach(function (en) {
      var link = (en.link || []).filter(function (l) { return l.rel === 'alternate'; })[0];
      var title = en.title.$t;
      if (maxLen && title.length > maxLen) title = title.slice(0, maxLen) + '…';
      var a = document.createElement('a');
      a.href = link ? link.href : '#';
      a.setAttribute('data-text', title);
      if (cfg.newTabLink) { a.target = '_blank'; a.rel = 'noopener'; }
      wrap.appendChild(a);
    });
    box.textContent = '';
    box.appendChild(wrap);
    if (typeof cfg.callBack === 'function') cfg.callBack();
  }).catch(function () {});
})();
