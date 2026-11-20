/*!
 * VL Tech Official | Bookmarks (read later) v1.0.0
 * Designed and developed by Vijaya Kumar L (RisewithVJ)
 * https://vltechofficialblog.blogspot.com | https://github.com/risewithvj
 * (c) 2026 Vijaya Kumar L. Original code; works with the Plus UI bookmark markup.
 */
(function () {
  'use strict';
  var KEY = 'Bookmark_Post';
  var cfg = PuSet.bookmark || {};
  var host = document.querySelector('.isBkm');
  if (!host) return;

  function load() {
    try { return JSON.parse(Pu.gLS(KEY) || '{}') || {}; } catch (e) { return {}; }
  }
  function save(data) { Pu.sLS(KEY, JSON.stringify(data)); }
  function safeUrl(u) { return /^https?:\/\//i.test(u || '') ? u : ''; }
  function el(tag, cls, attrs) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    for (var k in attrs || {}) n.setAttribute(k, attrs[k]);
    return n;
  }

  // Panel markup (built with DOM methods, no user text is parsed as HTML)
  var input = el('input', 'bkmI hidden', { id: 'offBkm', type: 'checkbox' });
  var panel = el('div', 'wBkm sl');
  var inner = el('div', 'bkmS fixL');
  var head = el('div', 'bkmH fixH fixT', { 'data-text': cfg.bmTitle || 'Bookmark Posts' });
  head.appendChild(el('label', 'c', { 'data-text': cfg.closeText || 'Close', for: 'offBkm' }));
  var list = el('div', 'bkmC fixLs', { id: 'bkmList' });
  inner.appendChild(head); inner.appendChild(list); panel.appendChild(inner);
  host.appendChild(input); host.appendChild(panel);
  host.appendChild(el('label', 'bkmCls', { for: 'offBkm' }));

  var counter = host.querySelector('.tBkmt');

  function render() {
    var data = load();
    var ids = Object.keys(data);
    list.textContent = '';
    if (counter) {
      counter.setAttribute('data-text', ids.length);
      counter.classList.toggle('n', ids.length === 0);
    }
    if (!ids.length) {
      var empty = el('div', 'n');
      empty.innerHTML = cfg.noBmIcon || ''; // icon markup comes from the theme settings, not from visitors
      var p = el('p'); p.textContent = cfg.noBmMes || 'No bookmarks yet.';
      var a = el('a', 'button', { href: cfg.noBmLink || '/search' }); a.textContent = cfg.noBmAll || 'View all articles';
      empty.appendChild(p); empty.appendChild(a); list.appendChild(empty);
      return;
    }
    ids.forEach(function (id) {
      var it = data[id] || {};
      var url = safeUrl(it.url), img = safeUrl(it.image || it.img);
      var row = el('div', 'item', { id: 'bkm' + id });
      var th = el('div', 'pThmb');
      var ta = el('a', 'thmb', { href: url || '#', 'aria-label': it.title || '' });
      var pic = el('div', 'bkmImg');
      if (img) pic.style.backgroundImage = 'url("' + img.replace(/["\\]/g, '') + '")';
      ta.appendChild(pic); th.appendChild(ta);
      var tt = el('div', 'itmTtl');
      var ttl = el('a', '', { href: url || '#' }); ttl.textContent = it.title || '';
      tt.appendChild(ttl);
      var del = el('span', 'del', { role: 'button', 'aria-label': 'Remove' });
      del.innerHTML = cfg.delIcon || '&times;';
      del.addEventListener('click', function () {
        row.classList.add('d');
        setTimeout(function () { remove(id); toastNotif(cfg.removedNtf); }, 1000);
      });
      row.appendChild(th); row.appendChild(tt); row.appendChild(del);
      list.appendChild(row);
    });
  }
  function mark(id, on) {
    document.querySelectorAll('.bmPs[bm-id="' + String(id).replace(/[^\w-]/g, '') + '"]')
      .forEach(function (b) { b.classList.toggle('a', on); });
  }
  function remove(id) { var d = load(); delete d[id]; save(d); mark(id, false); render(); }

  document.querySelectorAll('.bmPs').forEach(function (btn) {
    var id = btn.getAttribute('bm-id');
    if (load()[id]) btn.classList.add('a');
    btn.addEventListener('click', function () {
      var d = load();
      if (d[id]) { remove(id); toastNotif(cfg.removedNtf); return; }
      d[id] = {
        id: id,
        title: btn.getAttribute('bm-ttl') || '',
        url: btn.getAttribute('bm-url') || '',
        image: btn.getAttribute('bm-img') || ''
      };
      save(d); mark(id, true); render(); toastNotif(cfg.addedNtf);
    });
  });
  render();
})();
