/*!
 * VL Tech Official | "Browse by topic" cards that update themselves
 * Designed and developed by Vijaya Kumar L (RisewithVJ) | https://github.com/risewithvj/vjkit
 * Reads the labels of your latest published posts from the blog feed, counts them and shows the
 * most-used topics as cards. A new label appears automatically once a published post uses it.
 * The cards written in the Layout gadget stay as the fallback if the feed cannot be read.
 */
(function () {
  'use strict';
  if (window.vtTopics) return;
  window.vtTopics = true;

  var MAX_CARDS = 12;          // how many topic cards to show
  var SCAN = 150;              // how many latest posts to read labels from
  // Labels never shown as topics (template, housekeeping and badge labels)
  var HIDE = /^(v3 sample|v2 sample|sample|trending|sponsored|featured|draft|test)$/i;

  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function render(box, list) {
    var html = '';
    list.forEach(function (t, i) {
      html += '<a class="vj-topic t' + ((i % 6) + 1) + '" href="/search/label/' + encodeURIComponent(t.name) + '">' +
        '<span aria-hidden="true" class="ic"><svg aria-hidden="true" class="line" viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="8"/></svg></span>' +
        '<span class="tx"><b>' + esc(t.name) + '</b><small>' + t.n + (t.n === 1 ? ' guide' : ' guides') + ' &#8250;</small></span></a>';
    });
    box.innerHTML = html;
    box.setAttribute('data-auto', 'done');
    if (window.vtIcons && window.vtIcons.run) window.vtIcons.run();
  }

  function run() {
    var box = document.querySelector('.vj-topics');
    if (!box || box.getAttribute('data-static') !== null) return; // add data-static in Layout to keep manual cards
    var url = '/feeds/posts/summary?alt=json&max-results=' + SCAN;
    fetch(url, { credentials: 'omit' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      var entries = (d && d.feed && d.feed.entry) || [];
      var count = {};
      entries.forEach(function (e) {
        (e.category || []).forEach(function (c) {
          var n = c.term;
          if (!n || HIDE.test(n)) return;
          count[n] = (count[n] || 0) + 1;
        });
      });
      var list = Object.keys(count).map(function (k) { return { name: k, n: count[k] }; })
        .sort(function (a, b) { return b.n - a.n || a.name.localeCompare(b.name); })
        .slice(0, MAX_CARDS);
      if (list.length >= 3) render(box, list); // too few labels: keep the Layout cards
    }).catch(function () { /* keep the Layout cards */ });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
