/*!
 * VL Tech Official | Core: dark mode, colour themes, back-to-top v1.0.0
 * Designed and developed by Vijaya Kumar L (RisewithVJ)
 * https://vltechofficialblog.blogspot.com | https://github.com/risewithvj
 * (c) 2026 Vijaya Kumar L. Behaviour adapted from Plus UI / ngylduy/blog (MIT, (c) ngylduy); code rewritten.
 */
(function () {
  'use strict';
  var root = document.body;
  var mql = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var THEMES = [];
  for (var i = 0; i <= 20; i++) THEMES.push('theme' + i);

  function setMode(mode) {
    root.classList.remove('lgT', 'drK', 'syD');
    root.classList.add(mode);
  }
  // Light mode
  window.modeL = function () { Pu.sLS('webMode', 'lgT'); setMode('lgT'); themeColor('themeC'); };
  // Dark mode
  window.modeD = function () { Pu.sLS('webMode', 'drK'); setMode('drK'); themeColor('themeC'); };
  // Follow the system setting
  window.modeS = function () {
    if (!mql) return;
    Pu.sLS('webMode', 'syD');
    root.classList.add('syD');
    if (mql.matches) { remCt(root, 'lgT'); addCt(root, 'drK'); }
    else { remCt(root, 'drK'); addCt(root, 'lgT'); }
    themeColor('themeC');
  };
  // Colour theme picker (theme0 to theme20)
  window.webTheme = function (name) {
    if (THEMES.indexOf(name) < 0) return;
    Pu.sLS('webTheme', name);
    THEMES.forEach(function (t) { root.classList.remove(t); });
    addCt(root, name);
    themeColor('themeC');
    vibRate(50);
  };
  if (mql && mql.addEventListener) {
    mql.addEventListener('change', function (e) {
      if (Pu.gLS('webMode') !== 'syD') return;
      if (e.matches) { remCt(root, 'lgT'); addCt(root, 'drK'); }
      else { remCt(root, 'drK'); addCt(root, 'lgT'); }
      themeColor('themeC');
    });
  }
  // Back to top button with scroll progress ring
  var back = document.getElementById('backTop');
  if (back) {
    var ring = back.querySelector('.scrollProgress');
    var onScroll = function () {
      var top = window.pageYOffset || document.documentElement.scrollTop;
      (top > 200 ? addCt : remCt)(back, 'vsbl');
      if (ring) {
        var el = document.documentElement;
        var max = el.scrollHeight - el.clientHeight;
        var pct = max > 0 ? (top / max) * 100 : 0;
        ring.style.strokeDashoffset = 100 - pct;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
