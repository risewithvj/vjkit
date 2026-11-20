/*!
 * VL Tech Official | Animated line icons (original artwork, MIT, part of vjkit)
 * Designed and developed by Vijaya Kumar L (RisewithVJ)
 *
 * Each icon: 24x24, 1.25px rounded strokes, same style as the site sidebar.
 *  d  = main strokes (drawn in when the icon appears)
 *  a  = accent strokes (blue, move on hover / loop)
 *  loop = accent motion: bounce | pulse | spin | wiggle | float | grow | blink | twinkle | flash | swing | tick
 */
export const ICONS = {
  link:      { loop: 'wiggle', d: ['M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5'], a: ['M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5'] },
  scissors:  { loop: 'swing',  d: ['M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'], a: ['M8.6 7.6 20 18', 'M8.6 16.4 20 6'] },
  paste:     { loop: 'grow',   d: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z'], a: ['M8 12h8', 'M8 16h5'] },
  copy:      { loop: 'float',  d: ['M5 15V5a2 2 0 0 1 2-2h10'], a: ['M11 9h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z'] },
  share:     { loop: 'pulse',  d: ['M8.6 13.5 15.4 17.5', 'M15.4 6.5 8.6 10.5'], a: ['M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'] },
  chart:     { loop: 'grow',   d: ['M3 3v18h18'], a: ['M8 17v-5', 'M13 17V7', 'M18 17v-8'] },
  shield:    { loop: 'tick',   d: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'], a: ['m8.5 12 2.5 2.5 4.5-5'] },
  gift:      { loop: 'bounce', d: ['M3 8h18v4H3z', 'M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8', 'M12 8v13'], a: ['M12 8C10 4 6.5 3.5 6.5 6S10 8 12 8z', 'M12 8c2-4 5.5-4.5 5.5-2S14 8 12 8z'] },
  nosignup:  { loop: 'pulse',  d: ['M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M3 21a7 7 0 0 1 12.5-4.3'], a: ['m17 15 4 4', 'm21 15-4 4'] },
  tag:       { loop: 'swing',  d: ['M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z'], a: ['M7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'] },
  bolt:      { loop: 'flash',  d: [], a: ['M13 2 4 14h7l-1 8 9-12h-7l1-8z'] },
  lock:      { loop: 'bounce', d: ['M6 11h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z', 'M12 15v2'], a: ['M8 11V7a4 4 0 0 1 8 0v4'] },
  phone:     { loop: 'wiggle', d: ['M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z'], a: ['M11 18h2'] },
  flag:      { loop: 'swing',  d: ['M4 22V4'], a: ['M4 4h13l-2 4 2 4H4'] },
  qr:        { loop: 'blink',  d: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M3 14h7v7H3z'], a: ['M14 14h3v3h-3z', 'M18 18h3v3h-3z', 'M14 20v1', 'M20 14v1'] },
  chat:      { loop: 'pulse',  d: ['M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z'], a: ['M8 12h.01', 'M12 12h.01', 'M16 12h.01'] },
  globe:     { loop: 'spin',   d: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M2 12h20'], a: ['M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z'] },
  clock:     { loop: 'spin',   d: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z'], a: ['M12 7v5l3 2'] },
  sparkles:  { loop: 'twinkle', d: ['M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z'], a: ['M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z', 'M5 3l.5 1.5L7 5l-1.5.5L5 7l-.5-1.5L3 5l1.5-.5z'] },
  check:     { loop: 'tick',   d: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z'], a: ['m8 12 3 3 5-6'] },
  arrowdown: { loop: 'bounce', d: [], a: ['M12 4v14', 'm6 12 6 6 6-6'] },
  rocket:    { loop: 'float',  d: ['M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2', 'M9 18l-3-3'], a: ['M14.5 4.5C17 2 21 3 21 3s1 4-1.5 6.5L13 16l-5-5 6.5-6.5z', 'M16 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'] },
  eye:       { loop: 'blink',  d: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z'], a: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'] },
  hourglass: { loop: 'spin',   d: ['M6 2h12', 'M6 22h12'], a: ['M7 2v3a5 5 0 0 0 10 0V2', 'M7 22v-3a5 5 0 0 1 10 0v3'] },
  click:     { loop: 'pulse',  d: ['M9 9l11 4-5 2-2 5-4-11z'], a: ['M5 3l1 2', 'M3 7l2 1', 'M11 3l-1 2'] },
  open:      { loop: 'float',  d: ['M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5'], a: ['M14 3h7v7', 'M10 14 21 3'] },
  heart:     { loop: 'pulse',  d: [], a: ['M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6z'] },
  star:      { loop: 'twinkle', d: [], a: ['M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z'] },
  mail:      { loop: 'bounce', d: ['M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z'], a: ['m22 7-10 7L2 7'] },
  search:    { loop: 'wiggle', d: ['M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z'], a: ['m21 21-4.3-4.3'] },
  download:  { loop: 'bounce', d: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'], a: ['M12 3v12', 'm7 10 5 5 5-5'] },
  settings:  { loop: 'spin',   d: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'], a: ['M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z'] },
  bell:      { loop: 'swing',  d: ['M10.3 21a1.9 1.9 0 0 0 3.4 0'], a: ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9'] },
  trophy:    { loop: 'bounce', d: ['M6 9H4.5a2.5 2.5 0 0 1 0-5H6', 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18', 'M4 22h16', 'M10 14.7V17c0 .6-.5 1-1 1.2C7.8 18.8 7 20.2 7 22', 'M14 14.7V17c0 .6.5 1 1 1.2 1.2.5 2 2 2 3.8'], a: ['M18 2H6v7a6 6 0 0 0 12 0V2z'] },
  code:      { loop: 'wiggle', d: [], a: ['m16 18 6-6-6-6', 'm8 6-6 6 6 6'] },
  wifi:      { loop: 'blink',  d: ['M12 20h.01'], a: ['M2 8.8a15 15 0 0 1 20 0', 'M5 12.9a10 10 0 0 1 14 0', 'M8.5 16.4a5 5 0 0 1 7 0'] },
  cart:      { loop: 'swing',  d: ['M8 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z', 'M19 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'], a: ['M2 2h3l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6'] },
  play:      { loop: 'pulse',  d: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z'], a: ['m10 8 6 4-6 4V8z'] },
  user:      { loop: 'float',  d: ['M4 21a8 8 0 0 1 16 0'], a: ['M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10z'] },
  calendar:  { loop: 'blink',  d: ['M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M16 2v4', 'M8 2v4', 'M3 10h18'], a: ['M8 14h.01', 'M12 14h.01', 'M16 14h.01', 'M8 18h.01', 'M12 18h.01'] },
  book:      { loop: 'float',  d: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20'], a: ['M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'] },
  bulb:      { loop: 'flash',  d: ['M9 18h6', 'M10 22h4'], a: ['M15 14c.2-1 .7-1.7 1.5-2.5A6 6 0 1 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5'] },
  trend:     { loop: 'grow',   d: ['M3 3v18h18'], a: ['m7 15 4-4 3 3 6-7', 'M20 7v4', 'M20 7h-4'] },
  home:      { loop: 'bounce', d: ['M3 10.5 12 3l9 7.5', 'M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5'], a: ['M10 21v-6h4v6'] },
  monitor:   { loop: 'float',  d: ['M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z'], a: ['M8 21h8', 'M12 16v5'] },
  megaphone: { loop: 'blink',  d: ['M3 10v4a1 1 0 0 0 1 1h3l6 4V5L7 9H4a1 1 0 0 0-1 1z'], a: ['M17 8a5 5 0 0 1 0 8', 'M19.5 5.5a8.5 8.5 0 0 1 0 13'] },
  compass:   { loop: 'spin',   d: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z'], a: ['m15.5 8.5-2 5-5 2 2-5z'] },
  utensils:  { loop: 'wiggle', d: ['M7 2v20', 'M4 2v6a3 3 0 0 0 6 0V2'], a: ['M17 22V2c-2 1.5-3 4-3 7v4h3'] },
  plane:     { loop: 'float',  d: [], a: ['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'] },
  activity:  { loop: 'pulse',  d: ['M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6z'], a: ['M4 12h4l1.5-3 3 6 1.5-3h6'] },
  bag:       { loop: 'bounce', d: ['M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z', 'M3 6h18'], a: ['M16 10a4 4 0 0 1-8 0'] },
  edit:      { loop: 'wiggle', d: ['M12 20h9'], a: ['M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'] },
  layout:    { loop: 'blink',  d: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z'], a: ['M3 9h18', 'M9 21V9'] },
  image:     { loop: 'float',  d: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z'], a: ['M9 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', 'm21 15-5-5L5 21'] },
  grid:      { loop: 'pulse',  d: ['M4 4h6v6H4z', 'M14 14h6v6h-6z'], a: ['M14 4h6v6h-6z', 'M4 14h6v6H4z'] },
  send:      { loop: 'float',  d: [], a: ['m22 2-7 20-4-9-9-4z', 'M22 2 11 13'] },
  flame:     { loop: 'flash',  d: [], a: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.3.4 1.6 1.4 2.8 2.5 2.8z'] },
  info:      { loop: 'bounce', d: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z'], a: ['M12 16v-4', 'M12 8h.01'] }
};

const MOTION = `
.vti{width:var(--vti-s,28px);height:var(--vti-s,28px);fill:none;stroke:currentColor;stroke-width:var(--vti-w,1.25);stroke-linecap:round;stroke-linejoin:round;overflow:visible;flex:none}
.vti .a{stroke:var(--vti-a,#0363fc);transform-box:fill-box;transform-origin:center}
.vti .d,.vti .a{stroke-dasharray:100 100;stroke-dashoffset:0}
.vti-in .d,.vti-in .a{animation:vtiDraw .9s cubic-bezier(.65,0,.35,1) both}
.vti-in .a{animation-delay:.25s}
@keyframes vtiDraw{from{stroke-dashoffset:100}}
.vti-loop .a,:hover>.vti .a,:focus-visible>.vti .a,.vti:hover .a{animation:var(--vti-m) 2.2s ease-in-out infinite}
.vti[data-m=bounce]{--vti-m:vtiBounce}.vti[data-m=pulse]{--vti-m:vtiPulse}.vti[data-m=spin]{--vti-m:vtiSpin}
.vti[data-m=wiggle]{--vti-m:vtiWiggle}.vti[data-m=float]{--vti-m:vtiFloat}.vti[data-m=grow]{--vti-m:vtiGrow}
.vti[data-m=blink]{--vti-m:vtiBlink}.vti[data-m=twinkle]{--vti-m:vtiTwinkle}.vti[data-m=flash]{--vti-m:vtiFlash}
.vti[data-m=swing]{--vti-m:vtiSwing}.vti[data-m=tick]{--vti-m:vtiTick}
.vti[data-m=spin] .a{transform-origin:50% 50%}
@keyframes vtiBounce{0%,100%{transform:translateY(0)}45%{transform:translateY(-2.5px)}65%{transform:translateY(.8px)}}
@keyframes vtiPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}
@keyframes vtiSpin{to{transform:rotate(360deg)}}
@keyframes vtiWiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-9deg)}75%{transform:rotate(9deg)}}
@keyframes vtiFloat{0%,100%{transform:translate(0,0)}50%{transform:translate(1.5px,-1.5px)}}
@keyframes vtiGrow{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.6)}}
@keyframes vtiBlink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes vtiTwinkle{0%,100%{transform:scale(1) rotate(0);opacity:1}50%{transform:scale(.7) rotate(20deg);opacity:.6}}
@keyframes vtiFlash{0%,100%{opacity:1;filter:none}50%{opacity:.55}}
@keyframes vtiSwing{0%,100%{transform:rotate(0)}30%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}}
@keyframes vtiTick{0%{stroke-dashoffset:100}30%,100%{stroke-dashoffset:0}}
@media (prefers-reduced-motion:reduce){.vti .d,.vti .a{animation:none!important}}`;
export const ICON_CSS = MOTION.trim();

/** Inline SVG for HTML pages (colour follows the text colour; accent = --vti-a). */
export function icon(name, { size, cls = '', loop = false, label } = {}) {
  const i = ICONS[name];
  if (!i) throw new Error('Unknown icon ' + name);
  const st = size ? ` style="--vti-s:${size}px"` : '';
  const aria = label ? ` role="img" aria-label="${label}"` : ' aria-hidden="true"';
  const p = (arr, c) => arr.map(d => `<path class="${c}" pathLength="100" d="${d}"/>`).join('');
  return `<svg class="vti${loop ? ' vti-loop' : ''}${cls ? ' ' + cls : ''}" data-m="${i.loop}" viewBox="0 0 24 24"${st}${aria}>${p(i.d, 'd')}${p(i.a, 'a')}</svg>`;
}

/** Standalone, self-animating SVG file (works as <img>, in Canva, Figma, etc.). */
export function file(name, { main = '#1f2a44', accent = '#0363fc', loop = true } = {}) {
  const i = ICONS[name];
  const css = ICON_CSS.replace('stroke:currentColor', `stroke:${main}`).replace('var(--vti-a,#0363fc)', accent);
  const p = (arr, c) => arr.map(d => `<path class="${c}" pathLength="100" d="${d}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" class="vti vti-in${loop ? ' vti-loop' : ''}" data-m="${i.loop}" viewBox="0 0 24 24" width="96" height="96"><title>${name}</title><desc>VL Tech Official animated icon by Vijaya Kumar L (RisewithVJ). MIT.</desc><style>${css}.vti{width:100%;height:100%}</style>${p(i.d, 'd')}${p(i.a, 'a')}</svg>\n`;
}
