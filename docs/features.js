/* vjkit public docs: feature list, live demos and copy-paste code. (c) 2026 Vijaya Kumar L (RisewithVJ) */
(function () {
  'use strict';
  var CDN = 'https://cdn.jsdelivr.net/gh/risewithvj/vjkit@1/public/';
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function css(p) { return '<link rel="stylesheet" href="' + CDN + p + '">'; }
  function js(p, attrs) { return '<script defer src="' + CDN + p + '"' + (attrs ? ' ' + attrs : '') + '></script>'; }
  function lorem(n) { var s = ''; for (var i = 0; i < n; i++) s += '<p>Sample paragraph for the demo. Your real post text goes here.</p>'; return s; }

  var F = [
    { id: 'toc', icon: 'list', name: 'Table of contents', tag: '5 styles',
      desc: 'Builds a clickable contents list from your post headings, highlights where the reader is, and scrolls smoothly.',
      code: function (o) { return css('css/vj-toc.min.css') + '\n' + js('js/vj-toc.min.js') + '\n\n<!-- where the contents should appear -->\n<div data-vj-toc data-style="' + o + '" data-target=".post-body" data-levels="h2,h3" data-title="Contents"></div>'; },
      styles: ['box', 'numbered', 'sidebar', 'progress', 'float'],
      opts: [['data-style', 'box, numbered, sidebar, progress, float'], ['data-target', 'CSS selector of your post body (default: article, .post-body, main)'], ['data-levels', 'Headings to include, e.g. h2,h3'], ['data-title', 'Heading text'], ['data-open', '"false" to start closed'], ['data-offset', 'Space for a fixed header in px (default 70)']],
      demo: function (box, s) {
        box.innerHTML = '<div class="demo-cols"><div><div data-vj-toc data-style="' + s + '" data-target="#tocDemo' + s + '"></div></div><div id="tocDemo' + s + '" class="demo-post"><h2>Why this happens</h2>' + lorem(1) + '<h3>Quick check</h3>' + lorem(1) + '<h2>How to fix it</h2>' + lorem(1) + '<h3>Step 1</h3>' + lorem(1) + '<h2>Final words</h2>' + lorem(1) + '</div></div>';
        window.VJToc && VJToc.init();
      } },
    { id: 'copy', icon: 'copy', name: 'Copy code button', tag: '4 styles',
      desc: 'Adds a copy button to every code block. Double-click a block to copy it too.',
      code: function (o) { return css('css/vj-copy.min.css') + '\n' + js('js/vj-copy.min.js', 'data-style="' + o + '" data-selector="pre"'); },
      styles: ['corner', 'label', 'icon', 'bar'],
      opts: [['data-style (on the script)', 'corner, label, icon, bar'], ['data-selector', 'Which blocks get a button (default: pre)'], ['data-text / data-done', 'Button words, e.g. "Copy" / "Copied"'], ['On one block', '<pre data-vj-copy="bar" data-lang="HTML"> or data-vj-copy="off"']],
      demo: function (box, s) { box.innerHTML = '<pre data-vj-copy="' + s + '" data-lang="HTML"><code>&lt;p&gt;Hello from vjkit!&lt;/p&gt;\nconsole.log("copied");</code></pre>'; window.VJCopy && VJCopy.init(); } },
    { id: 'cookie', icon: 'shield', name: 'Cookie consent', tag: '5 styles',
      desc: 'A clean consent banner that remembers the choice and updates Google Consent Mode v2 automatically.',
      code: function (o) { return css('css/vj-cookie.min.css') + '\n' + js('js/vj-cookie.min.js', 'data-style="' + o + '" data-policy="/privacy-policy"') + '\n\n<!-- optional: a link to reopen the settings -->\n<a href="#" data-vj-cookie-open>Cookie settings</a>'; },
      styles: ['card', 'bar', 'minimal', 'modal', 'choices'],
      opts: [['data-style', 'card, bar, minimal, modal, choices'], ['data-policy', 'Link to your privacy policy'], ['data-text, data-title', 'Your own words'], ['data-accept, data-decline, data-save', 'Button words'], ['data-days', 'How long to remember (default 180)'], ['Event', 'document "vj:consent" with { analytics, ads }']],
      demo: function (box, s) {
        box.innerHTML = '<p>Click to preview the <b>' + s + '</b> style. It appears on this page.</p><button class="vj-btn" type="button">Show ' + s + ' banner</button>';
        box.querySelector('button').onclick = function () {
          try { localStorage.removeItem('vj-consent-v1'); } catch (e) {}
          document.querySelectorAll('.vj-cookie').forEach(function (e) { e.remove(); });
          delete window.VJCookie;
          var sc = document.createElement('script'); sc.src = 'lib/js/vj-cookie.min.js'; sc.dataset.style = s; sc.dataset.policy = 'licence/'; document.body.appendChild(sc);
        };
      } },
    { id: 'offline', icon: 'wifi', name: 'Offline / online notice', tag: '4 styles',
      desc: 'Tells readers when their internet drops and when it is back, so they know why a page stopped loading.',
      code: function (o) { return css('css/vj-offline.min.css') + '\n' + js('js/vj-offline.min.js', 'data-style="' + o + '" data-offline="You are offline" data-online="Back online"'); },
      styles: ['toast', 'bar', 'pill', 'full'],
      opts: [['data-style', 'toast, bar, pill, full'], ['data-offline / data-online', 'Your messages'], ['data-hide', 'Hide the "back online" note after ms (default 3000)'], ['Test', 'VJOffline.show("offline") in the browser console']],
      demo: function (box, s) {
        box.innerHTML = '<p>Preview without turning off your internet:</p><div class="row"><button class="vj-btn" data-o="offline">Show offline</button><button class="vj-btn vj-ghost" data-o="online">Show back online</button></div>';
        box.onclick = function (e) { var b = e.target.closest('[data-o]'); if (!b) return; document.querySelectorAll('.vj-off').forEach(function (x) { x.remove(); }); delete window.VJOffline;
          var sc = document.createElement('script'); sc.src = 'lib/js/vj-offline.min.js'; sc.dataset.style = s; sc.onload = function () { VJOffline.show(b.dataset.o); if (b.dataset.o === 'offline') setTimeout(function () { VJOffline.show('online'); }, 4000); }; document.body.appendChild(sc); };
      } },
    { id: 'theme', icon: 'moon', name: 'Dark mode, colours and back-to-top', tag: 'one script',
      desc: 'A dark mode switch that remembers the reader\'s choice, colour themes, and a back-to-top button with a reading-progress ring.',
      code: function () { return css('css/vj-theme.min.css') + '\n' + js('js/vj-theme.min.js', 'data-toggle="auto" data-colors="blue,green,purple,orange,pink" data-top="true"') + '\n\n<!-- optional: your own switch and a colour picker -->\n<button data-vj-dark>Dark mode</button>\n<div data-vj-colors></div>\n\n<!-- style your site for dark mode -->\n<style>html[data-vj-theme=dark] body{background:#0b1120;color:#e5e7eb}</style>'; },
      opts: [['data-toggle', '"auto" adds a floating switch, "none" if you use your own [data-vj-dark] button'], ['data-colors', 'blue, green, purple, orange, pink, red, teal, navy'], ['data-top', '"false" to hide back-to-top'], ['CSS', 'Use html[data-vj-theme=dark] and var(--vj-accent) in your styles']],
      demo: function (box) { box.innerHTML = '<div class="row"><button class="vj-btn" data-vj-dark>Toggle dark mode</button><div data-vj-colors></div></div><p class="muted">Pick a colour: buttons and links on this page change. Scroll down to see back-to-top.</p>';
        var t = window.VJTheme; if (!t) return; var list = ['blue', 'green', 'purple', 'orange', 'pink']; var c = box.querySelector('[data-vj-colors]'); c.classList.add('vj-swatches');
        c.innerHTML = list.map(function (k) { return '<button type="button" class="vj-swatch" data-c="' + k + '" style="--c:' + t.colors[k] + '" aria-label="' + k + '"></button>'; }).join('');
        c.onclick = function (e) { var s = e.target.closest('.vj-swatch'); if (s) t.color(s.dataset.c); }; } },
    { id: 'bookmarks', icon: 'bookmark', name: 'Read later', tag: 'saved in browser',
      desc: 'Readers save posts to read later. The list stays in their own browser; nothing is sent anywhere.',
      code: function () { return css('css/vj-bookmarks.min.css') + '\n' + js('js/vj-bookmarks.min.js', 'data-float="true"') + '\n\n<!-- save button on a post -->\n<button data-vj-save></button>\n\n<!-- a "Saved posts" page -->\n<div data-vj-saved></div>'; },
      opts: [['data-float', '"true" adds a floating saved-list button'], ['data-vj-save', 'On any button; data-url and data-title are optional'], ['data-vj-saved', 'Shows the saved list'], ['data-vj-saved-count', 'Shows the number saved']],
      demo: function (box) { box.innerHTML = '<div class="row"><button data-vj-save data-url="https://example.com/post-1" data-title="How to speed up Windows 11"></button><button data-vj-save data-url="https://example.com/post-2" data-title="Best free QR code tools"></button></div><h4>Saved list</h4><div data-vj-saved></div>'; window.VJBookmarks && VJBookmarks.refresh(); } },
    { id: 'qr', icon: 'qr', name: 'QR code generator', tag: 'widget + API',
      desc: 'A complete QR tool (links, Wi-Fi, email, phone, SMS, WhatsApp) with colours and PNG/SVG download. Or show a QR for any text with one line.',
      code: function () { return css('css/vj-qr.min.css') + '\n' + js('js/vj-qr.min.js') + '\n\n<!-- full tool -->\n<div data-vj-qr-tool></div>\n\n<!-- a QR for this page -->\n<div data-vj-qr data-size="160"></div>\n\n<!-- a QR for any text or link -->\n<div data-vj-qr data-text="https://example.com" data-size="200" data-dark="#0a1931"></div>\n\n<script>\n  // JavaScript API\n  const svg = VJQR.svg("Hello", { level: "M" });\n  const png = VJQR.png("Hello", { size: 512 }); // data: URL\n</script>'; },
      opts: [['data-text', 'Text or link (default: the current page)'], ['data-size', 'Size in px'], ['data-dark / data-light', 'Colours'], ['data-level', 'L, M, Q, H (higher survives damage, needs more space)'], ['Link API', 'risewithvj.github.io/vjkit/qr/?text=...']],
      demo: function (box) { box.innerHTML = '<div data-vj-qr-tool data-text="https://risewithvj.github.io/vjkit/"></div>'; window.VJQR && VJQR.init(); } },
    { id: 'wa', icon: 'chat', name: 'WhatsApp tools', tag: 'tool + links',
      desc: 'Message any number without saving it, make click-to-chat links, or add a floating WhatsApp button.',
      code: function () { return css('css/vj-wa.min.css') + '\n' + js('js/vj-wa.min.js', 'data-float="919876543210" data-text="Hi!" data-label="Chat with us"') + '\n\n<!-- full tool -->\n<div data-vj-wa-tool></div>\n\n<!-- a click-to-chat link -->\n<a data-vj-wa data-phone="919876543210" data-text="Hi, I have a question">Chat on WhatsApp</a>'; },
      opts: [['data-float', 'Your number with country code: adds a floating button'], ['data-label, data-position', 'Button words, "left" to move it left'], ['data-vj-wa', 'On any link: data-phone, data-text'], ['Link API', 'risewithvj.github.io/vjkit/wa/?phone=...&text=...']],
      demo: function (box) { box.innerHTML = '<div data-vj-wa-tool></div>'; window.VJWA && VJWA.init(); } },
    { id: 'icons', icon: 'sparkles', name: 'Icons with animation', tag: '179 icons',
      desc: 'Line icons that follow your text colour, with 13 animations. Use them in posts, buttons, lists and menus.',
      code: function () { return css('css/vj-icons.min.css') + '\n' + js('js/vj-icons.min.js') + '\n\n<span data-vji="rocket"></span> Launch day\n<span data-vji="bell" data-anim="wiggle" data-color="amber"></span>\n<span data-vji="ai" data-color="purple" data-size="40" data-bg></span>\n<a href="#">Read more <span data-vji="arrow-right" data-anim="hover-bounce"></span></a>\n\n<ul data-vji-list="check-circle" data-color="green">\n  <li>Free</li><li>Fast</li>\n</ul>'; },
      opts: [['data-vji', 'Icon name (see the gallery below)'], ['data-color', 'blue, green, red, amber, purple, pink, teal, gray'], ['data-size / data-bg', 'Size in px / soft background'], ['data-anim', 'bounce, spin, pulse, wiggle, float, beat, shake, draw, draw-loop, hover-pop, hover-bounce, hover-spin, hover-wiggle'], ['JS', 'VJI.svg("phone"), VJI.key("Android tips"), VJI.render()']],
      demo: function (box) {
        var names = window.VJI ? Object.keys(VJI.P) : [];
        box.innerHTML = '<input class="search" type="search" placeholder="Search ' + names.length + ' icons"><div class="icons">' + names.map(function (n) { return '<button type="button" data-n="' + n + '" title="Copy"><span data-vji="' + n + '" data-anim="hover-pop"></span><small>' + n + '</small></button>'; }).join('') + '</div>' +
          '<div class="anims">' + ['bounce', 'spin', 'pulse', 'wiggle', 'float', 'beat', 'shake', 'draw-loop'].map(function (a) { return '<span><span data-vji="star" data-anim="' + a + '" data-size="28" data-color="blue"></span><small>' + a + '</small></span>'; }).join('') + '</div>';
        window.VJI && VJI.render(box);
        box.querySelector('.search').oninput = function () { var v = this.value.toLowerCase(); box.querySelectorAll('.icons button').forEach(function (b) { b.hidden = v && b.dataset.n.indexOf(v) < 0; }); };
        box.querySelector('.icons').onclick = function (e) { var b = e.target.closest('button'); if (b && window.VJCopy) VJCopy.copy('<span data-vji="' + b.dataset.n + '"></span>').then(function () { b.classList.add('ok'); setTimeout(function () { b.classList.remove('ok'); }, 900); }); };
      } },
    { id: 'seo', icon: 'search', name: 'SEO structured data', tag: 'any platform',
      desc: 'Adds BlogPosting, Breadcrumb and FAQ schema (JSON-LD) to your posts automatically, and never duplicates schema you already have.',
      code: function () { return js('js/vj-seo.min.js', 'data-type="BlogPosting" data-author="Your Name" data-publisher="Your Site" data-logo="https://.../logo.png" data-content=".post-body"') + '\n\n<!-- recommended post structure -->\n<article class="post-body">\n  <h1>Post title</h1>\n  <nav data-vj-breadcrumb><a href="/">Home</a><a href="/search/label/SEO">SEO</a></nav>\n  <time data-vj-published datetime="2026-11-22">22 Nov 2026</time>\n  <time data-vj-modified datetime="2026-11-23">Updated 23 Nov 2026</time>\n  <p>Short answer first: what the reader will learn.</p>\n  <div data-vj-toc></div>\n  <h2>Main section</h2> ...\n  <div data-vj-faq>\n    <details><summary>Question one?</summary><p>Answer one.</p></details>\n  </div>\n</article>'; },
      opts: [['data-type', 'BlogPosting, Article, NewsArticle, TechArticle'], ['data-author, data-author-url', 'Author'], ['data-publisher, data-logo', 'Site name and logo'], ['data-article="false"', 'Only breadcrumb + FAQ'], ['Check', 'Test a page with Google\'s Rich Results Test']],
      demo: function (box) { box.innerHTML = '<p>This script works silently. After adding it, open your post in <a href="https://search.google.com/test/rich-results" rel="noopener">Google\'s Rich Results Test</a> to see the schema it found.</p><p class="muted">Note: Google shows FAQ rich results only for some well-known sites, but the FAQ schema still helps search engines and AI answers understand your page.</p>'; } },
    { id: 'adblock', icon: 'warning', name: 'Polite ad-blocker notice', tag: '3 styles',
      desc: 'Kindly asks readers who block ads to support your site. Not a hard wall: readers can close it, and it waits a few days before asking again.',
      code: function (o) { return css('css/vj-adblock.min.css') + '\n' + js('js/vj-adblock.min.js', 'data-style="' + o + '" data-again="3"'); },
      styles: ['card', 'banner', 'modal'],
      opts: [['data-style', 'card, banner, modal'], ['data-title, data-text', 'Your own words'], ['data-again', 'Days before asking again after "Maybe later"'], ['data-strict', '"true" removes the close button (modal only, use with care)'], ['Event', 'document "vj:adblock" with { blocked }']],
      demo: function (box, s) { box.innerHTML = '<button class="vj-btn" type="button">Preview ' + s + '</button>';
        box.querySelector('button').onclick = function () { document.querySelectorAll('.vj-ab').forEach(function (e) { e.remove(); }); delete window.VJAdblock;
          var sc = document.createElement('script'); sc.src = 'lib/js/vj-adblock.min.js'; sc.dataset.style = s; sc.onload = function () { VJAdblock.show(); }; document.body.appendChild(sc); }; } },
    { id: 'blogger', icon: 'pen', name: 'Blogger: topics and series', tag: 'Blogger only',
      desc: 'Topic cards that build themselves from your labels (with matching icons), and previous/next links inside a series.',
      code: function () { return css('blogger/vj-blogger.min.css') + '\n' + css('css/vj-icons.min.css') + '\n' + js('js/vj-icons.min.js') + '\n' + js('blogger/vj-topics.min.js') + '\n' + js('blogger/vj-chapters.min.js') + '\n\n<!-- home page: topic cards -->\n<div data-vj-topics data-max="12" data-style="cards"></div>\n\n<!-- post page: previous / next in the same label -->\n<div data-vj-chapters data-style="cards"></div>'; },
      opts: [['data-vj-topics', 'data-max, data-scan, data-style (cards, pills, list), data-hide'], ['data-vj-chapters', 'data-label (optional), data-style (cards, simple)'], ['data-blog', 'Your blog address, only if the widget is on another site']],
      demo: function (box) { box.innerHTML = '<p class="muted">Live on <a href="https://vltechofficialblog.blogspot.com" rel="noopener">VL Tech Official</a>. These read your blog\'s own feed, so they show your topics only on your Blogger site.</p>'; } }
  ];

  var cards = document.getElementById('cards'), docs = document.getElementById('docs');
  cards.innerHTML = F.map(function (f) { return '<a class="card" href="#' + f.id + '"><span class="ci" data-vji="' + f.icon + '" data-anim="hover-pop"></span><b>' + f.name + '</b><small>' + f.desc + '</small><em>' + f.tag + '</em></a>'; }).join('');
  docs.innerHTML = F.map(function (f) {
    var st = f.styles ? '<div class="styles" role="tablist">' + f.styles.map(function (s, i) { return '<button type="button" data-s="' + s + '" aria-selected="' + (i === 0) + '">' + s + '</button>'; }).join('') + '</div>' : '';
    return '<section class="block feat" id="' + f.id + '"><h2><span data-vji="' + f.icon + '"></span> ' + f.name + '</h2><p>' + f.desc + '</p>' + st +
      '<div class="demo" data-demo></div><div class="code"><button type="button" class="vj-btn vj-ghost cp">Copy code</button><pre data-vj-copy="off"><code data-code></code></pre></div>' +
      '<table class="opts"><thead><tr><th>Option</th><th>What it does</th></tr></thead><tbody>' + f.opts.map(function (o) { return '<tr><td><code>' + esc(o[0]) + '</code></td><td>' + esc(o[1]) + '</td></tr>'; }).join('') + '</tbody></table></section>';
  }).join('');
  function show(f, s) {
    var sec = document.getElementById(f.id);
    sec.querySelector('[data-code]').textContent = f.code(s);
    f.demo(sec.querySelector('[data-demo]'), s);
    window.VJI && VJI.render(sec);
  }
  function boot() {
    F.forEach(function (f) {
      var sec = document.getElementById(f.id);
      show(f, f.styles ? f.styles[0] : '');
      sec.addEventListener('click', function (e) {
        var b = e.target.closest('[data-s]');
        if (b) { sec.querySelectorAll('[data-s]').forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); }); show(f, b.dataset.s); }
        if (e.target.closest('.cp')) { var c = e.target.closest('.cp'); VJCopy.copy(sec.querySelector('[data-code]').textContent).then(function () { c.textContent = 'Copied'; setTimeout(function () { c.textContent = 'Copy code'; }, 1400); }); }
      });
    });
    document.querySelectorAll('[data-tabs]').forEach(function (t) {
      t.addEventListener('click', function (e) { var b = e.target.closest('[data-tab]'); if (!b) return;
        t.querySelectorAll('[data-tab]').forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
        t.querySelectorAll('[data-panel]').forEach(function (p) { p.hidden = p.dataset.panel !== b.dataset.tab; }); });
    });
    window.VJI && VJI.render();
  }
  if (window.VJI && window.VJToc) boot(); else window.addEventListener('load', boot);
})();
