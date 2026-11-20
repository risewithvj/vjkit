/*! VJKit copy-code v0.1.0 | MIT | Vijaya Kumar L (RisewithVJ) */
(function (w, d) {
  'use strict';
  var script = d.currentScript || d.querySelector('script[src*="copy-code"]');
  var selector = (script && script.getAttribute('data-selector')) || '.post-body pre, #postBody pre, article pre';

  function legacyCopy(text) {
    return new Promise(function (resolve, reject) {
      var ta = d.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      d.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = d.execCommand('copy'); } catch (e) { ok = false; }
      d.body.removeChild(ta);
      ok ? resolve() : reject(new Error('copy failed'));
    });
  }

  function copy(text) {
    if (w.navigator && w.navigator.clipboard && w.isSecureContext !== false) {
      return w.navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
    }
    return legacyCopy(text);
  }

  function textOf(pre) {
    var clone = pre.cloneNode(true);
    var b = clone.querySelector('.vj-copy');
    if (b) b.parentNode.removeChild(b);
    return clone.textContent;
  }

  function attach(pre) {
    if (pre.getAttribute('data-vj-copy')) return;
    pre.setAttribute('data-vj-copy', '1');
    pre.classList.add('vj-copy-host');
    var btn = d.createElement('button');
    btn.type = 'button';
    btn.className = 'vj-copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.textContent = 'Copy';
    var timer;
    btn.addEventListener('click', function () {
      copy(textOf(pre)).then(function () { btn.textContent = 'Copied'; }, function () { btn.textContent = 'Press Ctrl+C'; });
      clearTimeout(timer);
      timer = setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
    });
    pre.appendChild(btn);
  }

  function init() {
    var list = d.querySelectorAll(selector);
    for (var i = 0; i < list.length; i++) attach(list[i]);
  }

  w.VJ = w.VJ || {};
  w.VJ.copyCode = { init: init };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init);
  else init();
})(window, document);
