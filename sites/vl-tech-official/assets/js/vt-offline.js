/*!
 * VL Tech Official | Offline / online notice v1.0.0
 * Designed and developed by Vijaya Kumar L (RisewithVJ)
 * https://vltechofficialblog.blogspot.com | https://github.com/risewithvj
 * (c) 2026 Vijaya Kumar L. Behaviour adapted from Plus UI / ngylduy/blog (MIT, (c) ngylduy); code rewritten.
 */
(function () {
  'use strict';
  var pop = document.getElementById('noInternet');
  var cfg = PuSet.noInternet || {};
  function note(icon, msg) {
    if (cfg.enableToast === 'true') toastNotif("<span><i class='" + icon + "'></i>" + msg + '</span>');
  }
  window.addEventListener('offline', function () {
    if (pop) addCt(pop, 'visible');
    note('offWifi', cfg.offlineMes);
  });
  window.addEventListener('online', function () {
    if (pop) remCt(pop, 'visible');
    note('onWifi', cfg.onlineMes);
  });
})();
