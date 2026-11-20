/*!
 * VL Tech Official | Contact form (sends to the site's Google Form)
 * Designed and developed by Vijaya Kumar L (RisewithVJ) | https://github.com/risewithvj/vjkit
 * Usage: <div id="vtContact"></div> on the Contact page. ?report=CODE pre-fills a short-link report.
 */
(function () {
  'use strict';
  var root = document.getElementById('vtContact');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = '1';

  var FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSe4VbOAY8maHD7b9zVSH_4o-c9nE4gIDtk7yj5T4GRl1wZOuQ/formResponse';
  var F = { name: 'entry.2051488482', email: 'entry.1127909230', type: 'entry.1821900992', subject: 'entry.1921715333', message: 'entry.438870285' };
  var TYPES = ['General Inquiry', 'Technical Support', 'Website Feedback', 'Business Partnership', 'Guest Post Request', 'Advertising & Sponsorship', 'Report an Issue', 'Other'];
  var shown = Date.now();

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var params = new URLSearchParams(location.search);
  var report = (params.get('report') || '').replace(/[^A-Za-z0-9-]/g, '').slice(0, 30);
  var presetType = report ? 'Report an Issue' : (TYPES.indexOf(params.get('type')) > -1 ? params.get('type') : 'General Inquiry');
  var presetSubject = report ? 'Report short link go.trendit.in/' + report : '';
  var presetMsg = report ? 'Short link: https://go.trendit.in/' + report + '\nProblem (broken link / harmful / spam / other): \nDetails: ' : '';

  root.className = 'vtx';
  root.innerHTML =
    '<section class="vtx-panel" aria-labelledby="vtxCT">' +
      '<svg aria-hidden="true" class="vtx-globe" fill="none" stroke="#fff" stroke-width=".6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4.2" ry="10"/><path d="M2 12h20M4 7h16M4 17h16"/></svg>' +
      '<p class="vtx-ey">' + (report ? 'Report a link' : 'Contact') + '</p>' +
      '<h2 id="vtxCT">' + (report ? 'Report this short link' : 'Send us a message') + '</h2>' +
      '<p class="vtx-sub">' + (report ? 'Tell us what is wrong with this link. We review every report and remove harmful or broken links.' : 'Questions, corrections, business or collaboration ideas. We usually reply within 2 to 3 working days.') + '</p>' +
      '<form class="vtx-grid" novalidate>' +
        '<div class="vtx-f"><label for="vtxN">Full name</label><input id="vtxN" name="name" autocomplete="name" maxlength="80" required></div>' +
        '<div class="vtx-f"><label for="vtxE">Email address</label><input id="vtxE" name="email" type="email" autocomplete="email" inputmode="email" maxlength="120" required></div>' +
        '<div class="vtx-f"><label for="vtxT">Inquiry type</label><select id="vtxT" name="type">' + TYPES.map(function (t) { return '<option' + (t === presetType ? ' selected' : '') + '>' + esc(t) + '</option>'; }).join('') + '</select></div>' +
        '<div class="vtx-f"><label for="vtxS">Subject</label><input id="vtxS" name="subject" maxlength="140" required value="' + esc(presetSubject) + '"></div>' +
        '<div class="vtx-f vtx-full"><label for="vtxM">Message</label><textarea id="vtxM" name="message" maxlength="4000" required>' + esc(presetMsg) + '</textarea></div>' +
        '<div class="vtx-hp" aria-hidden="true"><label for="vtxW">Website</label><input id="vtxW" name="website" tabindex="-1" autocomplete="off"></div>' +
        '<div class="vtx-full"><button class="vtx-btn" type="submit">Send message</button>' +
        '<p class="vtx-consent">By submitting this form, you agree that VL Tech Official may use this information to respond to your inquiry. See our <a href="/p/privacy-policy.html">Privacy Policy</a>.</p>' +
        '<div class="vtx-msg" role="status" aria-live="polite" hidden></div></div>' +
      '</form>' +
    '</section>';

  var form = root.querySelector('form'), btn = form.querySelector('button'), msg = form.querySelector('.vtx-msg');
  function say(t, ok) { msg.hidden = false; msg.className = 'vtx-msg ' + (ok ? 'ok' : 'bad'); msg.textContent = t; }
  function bad(el, t) { el.classList.add('vtx-err-f'); el.setAttribute('aria-invalid', 'true'); el.focus(); say(t, false); return false; }
  form.addEventListener('input', function (e) { e.target.classList.remove('vtx-err-f'); e.target.removeAttribute('aria-invalid'); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = function (n) { return form.elements[n].value.trim(); };
    if (v('website')) { say('Thanks! Your message has been sent.', true); return; }
    if (v('name').length < 2) return bad(form.elements.name, 'Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) return bad(form.elements.email, 'Please enter a valid email address.');
    if (v('subject').length < 3) return bad(form.elements.subject, 'Please add a short subject.');
    if (v('message').length < 10) return bad(form.elements.message, 'Please write a little more detail (at least 10 characters).');
    if (Date.now() - shown < 3000) return say('Please take a moment to check your message, then send it again.', false);

    var data = new URLSearchParams();
    data.append(F.name, v('name')); data.append(F.email, v('email')); data.append(F.type, form.elements.type.value);
    data.append(F.subject, v('subject')); data.append(F.message, v('message'));
    btn.disabled = true; btn.textContent = 'Sending...';
    fetch(FORM, { method: 'POST', mode: 'no-cors', body: data }).then(function () {
      form.reset(); form.querySelectorAll('input,select,textarea,button').forEach(function (el) { el.disabled = true; });
      say('Thank you! Your message has been sent. We will reply to your email soon.', true);
      btn.textContent = 'Message sent';
    }).catch(function () {
      btn.disabled = false; btn.textContent = 'Send message';
      say('Your message could not be sent. Check your internet connection and try again, or email cc.techpointofficial@outlook.com.', false);
    });
  });
})();
