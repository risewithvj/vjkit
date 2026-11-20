/*!
 * VL Tech Official | Cookie consent v1.0.0
 * Designed and developed by Vijaya Kumar L (RisewithVJ)
 * https://vltechofficialblog.blogspot.com | https://github.com/risewithvj
 * (c) 2026 Vijaya Kumar L (RisewithVJ). Original code. MIT licence: see LICENSE.
 */
(function () {
  'use strict';
  var wrap = document.getElementById('ckWrap');
  var btn = document.getElementById('ckAccept');
  if (!wrap || !btn) return;
  if (document.cookie.indexOf('CookiePolicy=Accepted') !== -1) return;
  wrap.classList.add('v');
  btn.addEventListener('click', function () {
    var age = parseInt(PuSet.cookieCon.consentMaxAge, 10) || 2592000;
    document.cookie = 'CookiePolicy=Accepted;max-age=' + age + ';path=/;SameSite=Lax;Secure';
    if (document.cookie.indexOf('CookiePolicy=Accepted') !== -1) {
      wrap.classList.add('a');
    } else {
      fixedNotif(PuSet.cookieCon.cookieError);
      if ('vibrate' in navigator) navigator.vibrate([100, 75, 100, 75, 500]);
    }
  });
})();
