/*!
 * VL Tech Official | Copy code on double click v1.0.0
 * Designed and developed by Vijaya Kumar L (RisewithVJ)
 * https://vltechofficialblog.blogspot.com | https://github.com/risewithvj
 * (c) 2026 Vijaya Kumar L. Behaviour adapted from Plus UI / ngylduy/blog (MIT, (c) ngylduy); code rewritten.
 */
(function () {
  'use strict';
  function copyText(text, done) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () {});
      return;
    }
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', '');
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) {}
    document.body.removeChild(ta);
  }
  Array.prototype.forEach.call(document.getElementsByTagName('pre'), function (pre) {
    pre.addEventListener('dblclick', function () {
      copyText(pre.innerText, function () {
        toastNotif(PuSet.preCopy.copiedMes);
        vibRate(75);
      });
    });
  });
})();
