/*!
 * VL Tech Official | Animated icons for the header menu, sidebar menu and home page cards
 * Designed and developed by Vijaya Kumar L (RisewithVJ) | https://github.com/risewithvj/vjkit
 * Swaps the leading icon of each menu item for the matching animated line icon (same size and stroke
 * as the theme). Icons draw in once when the page loads and move on hover. Chevrons are not touched.
 */
(function () {
  'use strict';
  if (window.vtNavIcons) return;
  window.vtNavIcons = true;

  var IP = {"activity":["pulse",["M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6z"],["M4 12h4l1.5-3 3 6 1.5-3h6"]],"bag":["bounce",["M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z","M3 6h18"],["M16 10a4 4 0 0 1-8 0"]],"chart":["grow",["M3 3v18h18"],["M8 17v-5","M13 17V7","M18 17v-8"]],"chat":["pulse",["M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z"],["M8 12h.01","M12 12h.01","M16 12h.01"]],"code":["wiggle",[],["m16 18 6-6-6-6","m8 6-6 6 6 6"]],"compass":["spin",["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"],["m15.5 8.5-2 5-5 2 2-5z"]],"edit":["wiggle",["M12 20h9"],["M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"]],"flame":["flash",[],["M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.3.4 1.6 1.4 2.8 2.5 2.8z"]],"grid":["pulse",["M4 4h6v6H4z","M14 14h6v6h-6z"],["M14 4h6v6h-6z","M4 14h6v6H4z"]],"heart":["pulse",[],["M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6z"]],"home":["bounce",["M3 10.5 12 3l9 7.5","M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"],["M10 21v-6h4v6"]],"image":["float",["M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"],["M9 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z","m21 15-5-5L5 21"]],"info":["bounce",["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"],["M12 16v-4","M12 8h.01"]],"layout":["blink",["M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"],["M3 9h18","M9 21V9"]],"link":["wiggle",["M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"],["M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"]],"lock":["bounce",["M6 11h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z","M12 15v2"],["M8 11V7a4 4 0 0 1 8 0v4"]],"mail":["bounce",["M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"],["m22 7-10 7L2 7"]],"megaphone":["blink",["M3 10v4a1 1 0 0 0 1 1h3l6 4V5L7 9H4a1 1 0 0 0-1 1z"],["M17 8a5 5 0 0 1 0 8","M19.5 5.5a8.5 8.5 0 0 1 0 13"]],"monitor":["float",["M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"],["M8 21h8","M12 16v5"]],"plane":["float",[],["M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"]],"play":["pulse",["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"],["m10 8 6 4-6 4V8z"]],"qr":["blink",["M3 3h7v7H3z","M14 3h7v7h-7z","M3 14h7v7H3z"],["M14 14h3v3h-3z","M18 18h3v3h-3z","M14 20v1","M20 14v1"]],"send":["float",[],["m22 2-7 20-4-9-9-4z","M22 2 11 13"]],"star":["twinkle",[],["M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z"]],"trend":["grow",["M3 3v18h18"],["m7 15 4-4 3 3 6-7","M20 7v4","M20 7h-4"]],"phone":["bounce",["M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"],["M11 18h2"]],"book":["float",["M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"],["M8 7h8","M8 11h6"]],"utensils":["wiggle",["M7 2v20","M4 2v6a3 3 0 0 0 6 0V2"],["M17 22V2c-2 1.5-3 4-3 7v4h3"]]};
  var CSS = ".vti{width:var(--vti-s,28px);height:var(--vti-s,28px);fill:none;stroke:currentColor;stroke-width:var(--vti-w,1.25);stroke-linecap:round;stroke-linejoin:round;overflow:visible;flex:none}.vti .a{stroke:var(--vti-a,#0363fc);transform-box:fill-box;transform-origin:center}.vti .d,.vti .a{stroke-dasharray:100 100;stroke-dashoffset:0}.vti-in .d,.vti-in .a{animation:vtiDraw .9s cubic-bezier(.65,0,.35,1) both}.vti-in .a{animation-delay:.25s}@keyframes vtiDraw{from{stroke-dashoffset:100}}.vti-loop .a,:hover>.vti .a,:focus-visible>.vti .a,.vti:hover .a{animation:var(--vti-m) 2.2s ease-in-out infinite}.vti[data-m=bounce]{--vti-m:vtiBounce}.vti[data-m=pulse]{--vti-m:vtiPulse}.vti[data-m=spin]{--vti-m:vtiSpin}.vti[data-m=wiggle]{--vti-m:vtiWiggle}.vti[data-m=float]{--vti-m:vtiFloat}.vti[data-m=grow]{--vti-m:vtiGrow}.vti[data-m=blink]{--vti-m:vtiBlink}.vti[data-m=twinkle]{--vti-m:vtiTwinkle}.vti[data-m=flash]{--vti-m:vtiFlash}.vti[data-m=swing]{--vti-m:vtiSwing}.vti[data-m=tick]{--vti-m:vtiTick}.vti[data-m=spin] .a{transform-origin:50% 50%}@keyframes vtiBounce{0%,100%{transform:translateY(0)}45%{transform:translateY(-2.5px)}65%{transform:translateY(.8px)}}@keyframes vtiPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}@keyframes vtiSpin{to{transform:rotate(360deg)}}@keyframes vtiWiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-9deg)}75%{transform:rotate(9deg)}}@keyframes vtiFloat{0%,100%{transform:translate(0,0)}50%{transform:translate(1.5px,-1.5px)}}@keyframes vtiGrow{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.6)}}@keyframes vtiBlink{0%,100%{opacity:1}50%{opacity:.25}}@keyframes vtiTwinkle{0%,100%{transform:scale(1) rotate(0);opacity:1}50%{transform:scale(.7) rotate(20deg);opacity:.6}}@keyframes vtiFlash{0%,100%{opacity:1;filter:none}50%{opacity:.55}}@keyframes vtiSwing{0%,100%{transform:rotate(0)}30%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}}@keyframes vtiTick{0%{stroke-dashoffset:100}30%,100%{stroke-dashoffset:0}}@media (prefers-reduced-motion:reduce){.vti .d,.vti .a{animation:none!important}}.vti-nav{--vti-a:currentColor}:hover>.vti-nav{--vti-a:#0363fc}svg.vti.vti-nav{fill:none!important;stroke:currentColor;stroke-width:var(--vti-w,1.5)}svg.vti-nav path{fill:none!important}.vti-card{--vti-a:#0363fc}a:hover .vti-card .a{animation:var(--vti-m) 2.2s ease-in-out infinite}";
  var MAP = [
    [/^home\b/i, 'home'], [/^trending/i, 'flame'], [/^tech\b/i, 'monitor'], [/^marketing/i, 'megaphone'],
    [/^guides?\b/i, 'compass'], [/^lifestyle/i, 'heart'], [/^food/i, 'utensils'], [/^travel/i, 'plane'],
    [/^health/i, 'activity'], [/^entertainment/i, 'play'], [/^reviews?\b/i, 'star'], [/^shopping/i, 'bag'],
    [/^blogger/i, 'edit'], [/^wordpress/i, 'layout'], [/^editing/i, 'image'], [/^(online|free) tools/i, 'grid'],
    [/^about/i, 'info'], [/^contact/i, 'mail'], [/^guest post/i, 'edit'], [/^safelink/i, 'link'],
    [/^more\b/i, 'grid'], [/telegram/i, 'send'], [/^sitemap/i, 'layout'], [/^privacy/i, 'lock'], [/^disclaimer/i, 'info'],
    [/^blogging/i, 'trend'], [/^qr code/i, 'qr'], [/^whatsapp/i, 'chat'], [/^robots/i, 'code'], [/shortener|short link/i, 'link'], [/click counter/i, 'chart'],
    [/tech news|industry/i, 'megaphone'], [/gadget|tech reviews|product reviews|service reviews/i, 'star'], [/software|apps/i, 'grid'],
    [/windows|laptop|troubleshoot/i, 'monitor'], [/android|iphone|mobile/i, 'phone'], [/^business|case stud/i, 'chart'],
    [/digital marketing|social media/i, 'megaphone'], [/seo|adsense|monetiz|earn/i, 'trend'], [/branding/i, 'star'],
    [/content writing|writing/i, 'edit'], [/beginner|how-to|how to/i, 'compass'], [/advanced|tutorial|code/i, 'code'],
    [/productivity/i, 'activity'], [/resource/i, 'link'], [/recipe|cooking|restaurant|food/i, 'utensils'],
    [/destination|travel|getaway|tips & hacks/i, 'plane'], [/wellness|fitness/i, 'activity'], [/fashion|style/i, 'bag'],
    [/home & living|home/i, 'home'], [/movie|web series|video/i, 'play'], [/book/i, 'book'], [/deals|buying|purchase/i, 'bag'],
    [/ai\b|tech/i, 'monitor'], [/tools/i, 'grid']
  ];
  var SCOPES = '#LinkList77, #LinkList78, .vj-nav, .mobNav';
  var CARDS = 'a.vj-hbtn, a.vj-tool, a.vj-topic'; // home page hero buttons and Free online tools cards

  function pick(text) {
    text = String(text || '').replace(/\s+/g, ' ').trim();
    for (var i = 0; i < MAP.length; i++) if (MAP[i][0].test(text)) return MAP[i][1];
    return null;
  }
  function make(name, old) {
    var i = IP[name], ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', (old.getAttribute('class') || 'line') + ' vti vti-nav');
    svg.setAttribute('data-m', i[0]);
    var r = old.getBoundingClientRect(), cs = getComputedStyle(old);
    var size = Math.round(r.width) || parseFloat(cs.width) || 20;
    svg.style.setProperty('--vti-s', size + 'px');
    var shape = old.querySelector('path, line, circle, rect, polyline');
    var filled = cs.fill && cs.fill !== 'none';
    var w = filled ? 1.5 : (parseFloat(shape ? getComputedStyle(shape).strokeWidth : cs.strokeWidth) || 1.5);
    w = Math.min(1.75, Math.max(1, w));
    svg.style.setProperty('--vti-w', String(w));
    [[i[1], 'd'], [i[2], 'a']].forEach(function (g) {
      g[0].forEach(function (d) { var p = document.createElementNS(ns, 'path'); p.setAttribute('class', g[1]); p.setAttribute('pathLength', '100'); p.setAttribute('d', d); svg.appendChild(p); });
    });
    return svg;
  }
  function run() {
    if (!document.getElementById('vt-icons-css')) {
      var st = document.createElement('style'); st.id = 'vt-icons-css'; st.textContent = CSS; document.head.appendChild(st);
    }
    var n = 0;
    document.querySelectorAll(SCOPES).forEach(function (scope) {
      scope.querySelectorAll('a, label, button').forEach(function (el) {
        var old = el.querySelector(':scope > svg.line:not(.vti)');
        if (!old || el.querySelector(':scope > svg.vti')) return;
        var first = el.querySelector(':scope > svg');
        if (first !== old) return; // only the leading icon, never the chevron
        var name = pick(el.textContent);
        if (!name || !IP[name]) return;
        var svg = make(name, old);
        old.replaceWith(svg);
        (function (s, k) { setTimeout(function () { s.classList.add('vti-in'); }, 40 * k); })(svg, n++);
      });
    });
    document.querySelectorAll(CARDS).forEach(function (el) {
      var old = el.querySelector('svg:not(.vti)');
      if (!old || el.querySelector('svg.vti')) return;
      var tx = el.querySelector('b');
      var name = pick(tx ? tx.textContent : el.textContent) || (el.classList.contains('vj-topic') ? 'compass' : null);
      if (!name || !IP[name]) return;
      var svg = make(name, old);
      svg.classList.add('vti-card');
      old.replaceWith(svg);
      (function (s, k) { setTimeout(function () { s.classList.add('vti-in'); }, 60 * k); })(svg, n++);
    });
  }
  // Shared with vt-topics.js so cards it builds get the same animated icons
  window.vtIcons = { run: run, pick: pick, has: function (n) { return !!IP[n]; } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
