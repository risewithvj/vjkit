/*! VJKit toc v0.1.0 | MIT | Vijaya Kumar L (RisewithVJ) */
(function (w, d) {
  'use strict';
  var script = d.currentScript || d.querySelector('script[src*="toc"]');
  function opt(n, f) { var v = script && script.getAttribute('data-' + n); return v ? v : f; }

  var cfg = {
    source: opt('source', '.post-body, #postBody'),
    target: opt('target', '#toc'),
    levels: opt('levels', 'h2, h3'),
    min: parseInt(opt('min', '3'), 10) || 3,
    title: opt('title', 'In this article')
  };

  function slug(text, used) {
    var base = text.toLowerCase().replace(/[^a-z0-9஀-௿]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
    var id = base, n = 2;
    while (used[id] || d.getElementById(id)) { id = base + '-' + n++; }
    used[id] = true;
    return id;
  }

  function build() {
    var src = d.querySelector(cfg.source);
    var tgt = d.querySelector(cfg.target);
    if (!src || !tgt) return false;
    var heads = src.querySelectorAll(cfg.levels);
    if (heads.length < cfg.min) return false;

    var used = {};
    var nav = d.createElement('nav');
    nav.className = 'vj-toc';
    nav.setAttribute('aria-label', cfg.title);
    var h = d.createElement('p');
    h.className = 'vj-toc__title';
    h.textContent = cfg.title;
    var ul = d.createElement('ul');
    ul.className = 'vj-toc__list';
    var links = [];

    for (var i = 0; i < heads.length; i++) {
      var hd = heads[i];
      var label = (hd.textContent || '').replace(/\s+/g, ' ').trim();
      if (!label) continue;
      if (!hd.id) hd.id = slug(label, used);
      var li = d.createElement('li');
      li.className = 'vj-toc__item vj-toc__item--' + hd.tagName.toLowerCase();
      var a = d.createElement('a');
      a.href = '#' + hd.id;
      a.textContent = label;
      li.appendChild(a);
      ul.appendChild(li);
      links.push({ a: a, h: hd });
    }
    if (!links.length) return false;

    nav.appendChild(h);
    nav.appendChild(ul);
    while (tgt.firstChild) tgt.removeChild(tgt.firstChild);
    tgt.appendChild(nav);

    if ('IntersectionObserver' in w) {
      var io = new w.IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (l) { l.a.classList.toggle('is-active', l.h === e.target); });
        });
      }, { rootMargin: '0px 0px -70% 0px' });
      links.forEach(function (l) { io.observe(l.h); });
    }
    return true;
  }

  w.VJ = w.VJ || {};
  w.VJ.toc = { build: build };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', build);
  else build();
})(window, document);
