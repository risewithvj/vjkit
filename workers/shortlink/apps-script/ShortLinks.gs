/**
 * VL Tech Official | Short links log for Google Sheets (go.trendit.in)
 * Designed and developed by Vijaya Kumar L (RisewithVJ) | https://github.com/risewithvj/vjkit
 *
 * Install once:
 *   1. Create a blank Google Sheet named "VL Short Links".
 *   2. Extensions > Apps Script, paste this file as ShortLinks.gs, save.
 *   3. Reload the Sheet. Menu "Short links" > "Set up" (asks for the admin password once).
 * After that it refreshes itself every hour. Menu actions change links instantly.
 */

var WORKER = 'https://go.trendit.in';
var TABS = {
  summary: 'Summary',
  links: 'Links',
  daily: 'Daily',
  log: 'Admin log'
};
var LINK_HEAD = ['Code', 'Short link', 'Destination', 'Domain', 'Created', 'Status', 'Visits', 'Reached destination', 'Last click', 'Note', 'Updated'];

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Short links')
    .addItem('Refresh now', 'syncNow')
    .addSeparator()
    .addItem('Disable selected link', 'disableSelected')
    .addItem('Restore selected link', 'restoreSelected')
    .addItem('Change destination of selected link', 'changeDestination')
    .addItem('Block a website (all its links)', 'blockDomain')
    .addSeparator()
    .addItem('Set up', 'setup')
    .addItem('Change admin password', 'setToken')
    .addItem('Full re-sync', 'fullSync')
    .addToUi();
}

/* ---------- setup ---------- */
function setup() {
  var ss = SpreadsheetApp.getActive();
  sheet_(TABS.summary, ['Metric', 'Value']);
  sheet_(TABS.links, LINK_HEAD);
  sheet_(TABS.daily, ['Day (UTC)', 'Links created', 'Visits', 'Reached destination', 'Links with traffic']);
  sheet_(TABS.log, ['When', 'Who', 'Action', 'Code / website', 'Details', 'Result']);
  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('ADMIN_TOKEN')) setToken();
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'syncNow') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('syncNow').timeBased().everyHours(1).create();
  fullSync();
  ss.toast('Set up done. The Sheet refreshes every hour.', 'Short links', 6);
}

function setToken() {
  var ui = SpreadsheetApp.getUi();
  var r = ui.prompt('Admin password', 'Paste the ADMIN_TOKEN value you saved in Cloudflare. It is stored only in this script\'s private settings.', ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  var v = r.getResponseText().trim();
  if (v.length < 24) { ui.alert('That password looks too short. Please paste the full value.'); return; }
  PropertiesService.getScriptProperties().setProperty('ADMIN_TOKEN', v);
  ui.alert('Saved.');
}

/* ---------- sync ---------- */
function fullSync() {
  PropertiesService.getScriptProperties().deleteProperty('SINCE');
  syncNow();
}

function syncNow() {
  var props = PropertiesService.getScriptProperties();
  var since = Number(props.getProperty('SINCE') || 0);
  var data = api_('get', '/admin/export?since=' + Math.max(0, since - 2 * 3600e3));
  var ss = SpreadsheetApp.getActive();

  // Links: update rows in place by code, add new ones at the bottom
  var sh = sheet_(TABS.links, LINK_HEAD);
  var last = sh.getLastRow();
  var codes = last > 1 ? sh.getRange(2, 1, last - 1, 1).getValues().map(function (r) { return String(r[0]); }) : [];
  var index = {};
  codes.forEach(function (c, i) { index[c] = i + 2; });
  var adds = [];
  (data.links || []).forEach(function (l) {
    var row = [l.code, WORKER + '/' + l.code, l.url, l.domain, d_(l.created_at), l.status, l.opens, l.clicks, d_(l.last_click), l.note || '', d_(l.updated_at)];
    if (index[l.code]) sh.getRange(index[l.code], 1, 1, row.length).setValues([row]);
    else adds.push(row);
  });
  if (adds.length) sh.getRange(sh.getLastRow() + 1, 1, adds.length, LINK_HEAD.length).setValues(adds);
  if (sh.getLastRow() > 1) {
    sh.getRange(2, 5, sh.getLastRow() - 1, 1).setNumberFormat('dd mmm yyyy hh:mm');
    sh.getRange(2, 9, sh.getLastRow() - 1, 1).setNumberFormat('dd mmm yyyy hh:mm');
    sh.getRange(2, 11, sh.getLastRow() - 1, 1).setNumberFormat('dd mmm yyyy hh:mm');
  }

  // Daily totals (last 60 days)
  var created = {};
  (data.created || []).forEach(function (c) { created[c.day] = c.n; });
  var days = {};
  (data.daily || []).forEach(function (d) { days[d.day] = d; });
  Object.keys(created).forEach(function (k) { if (!days[k]) days[k] = { day: k, opens: 0, clicks: 0, links: 0 }; });
  var rows = Object.keys(days).sort().reverse().map(function (k) { var d = days[k]; return [k, created[k] || 0, d.opens || 0, d.clicks || 0, d.links || 0]; });
  var dsh = sheet_(TABS.daily, ['Day (UTC)', 'Links created', 'Visits', 'Reached destination', 'Links with traffic']);
  if (dsh.getLastRow() > 1) dsh.getRange(2, 1, dsh.getLastRow() - 1, 5).clearContent();
  if (rows.length) dsh.getRange(2, 1, rows.length, 5).setValues(rows);

  // Summary
  var t = data.totals || {};
  var ssh = sheet_(TABS.summary, ['Metric', 'Value']);
  var counts = { active: 0, disabled: 0, blocked: 0 };
  if (sh.getLastRow() > 1) sh.getRange(2, 6, sh.getLastRow() - 1, 1).getValues().forEach(function (r) { counts[r[0]] = (counts[r[0]] || 0) + 1; });
  var sum = [
    ['Total short links', t.links || 0],
    ['Active links', counts.active || 0],
    ['Disabled links', counts.disabled || 0],
    ['Blocked links', counts.blocked || 0],
    ['Total visits', t.opens || 0],
    ['Total reached destination', t.clicks || 0],
    ['Last refreshed', new Date()]
  ];
  if (ssh.getLastRow() > 1) ssh.getRange(2, 1, ssh.getLastRow() - 1, 2).clearContent();
  ssh.getRange(2, 1, sum.length, 2).setValues(sum);
  ssh.getRange(sum.length + 1, 2).setNumberFormat('dd mmm yyyy hh:mm');

  props.setProperty('SINCE', String(data.now || Date.now()));
}

/* ---------- admin actions ---------- */
function disableSelected() { setStatus_('disabled', 'Disable'); }
function restoreSelected() { setStatus_('active', 'Restore'); }

function setStatus_(status, label) {
  var code = selectedCode_();
  if (!code) return;
  var ui = SpreadsheetApp.getUi();
  var r = ui.prompt(label + ' ' + code, 'Reason (saved as the note, for example "reported broken" or "phishing report"):', ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  var res = api_('post', '/admin/update', { code: code, status: status, note: r.getResponseText().trim() });
  log_(label, code, r.getResponseText().trim(), res.ok ? 'done' : (res.error || 'failed'));
  ui.alert(res.ok ? code + ' is now ' + status + '.' : 'Could not change it: ' + (res.error || 'unknown error'));
  syncNow();
}

function changeDestination() {
  var code = selectedCode_();
  if (!code) return;
  var ui = SpreadsheetApp.getUi();
  var r = ui.prompt('New destination for ' + code, 'Paste the new full link (https://...). The short link stays the same.', ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  var url = r.getResponseText().trim();
  var res = api_('post', '/admin/update', { code: code, url: url, note: 'destination changed' });
  log_('Change destination', code, url, res.ok ? 'done' : (res.error || 'failed'));
  ui.alert(res.ok ? 'Destination updated.' : 'Could not update: ' + (res.error || 'unknown error'));
  syncNow();
}

function blockDomain() {
  var ui = SpreadsheetApp.getUi();
  var sel = SpreadsheetApp.getActiveSheet().getName() === TABS.links ? String(SpreadsheetApp.getActiveSheet().getRange(SpreadsheetApp.getActiveRange().getRow(), 4).getValue() || '') : '';
  var r = ui.prompt('Block a website', 'Website to block (for example badsite.com). All its short links stop working and no new ones can be made.' + (sel ? '\nSelected row: ' + sel : ''), ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  var domain = (r.getResponseText().trim() || sel).toLowerCase();
  if (!domain) return;
  var why = ui.prompt('Reason', 'Why is it blocked? (for example phishing, malware, spam)', ui.ButtonSet.OK).getResponseText().trim();
  var res = api_('post', '/admin/block', { domain: domain, reason: why });
  log_('Block website', domain, why, res.ok ? 'done' : (res.error || 'failed'));
  ui.alert(res.ok ? domain + ' is blocked.' : 'Could not block: ' + (res.error || 'unknown error'));
  syncNow();
}

/* ---------- helpers ---------- */
function api_(method, path, body) {
  var token = PropertiesService.getScriptProperties().getProperty('ADMIN_TOKEN');
  if (!token) throw new Error('Run "Short links > Set up" first.');
  var opt = { method: method, muteHttpExceptions: true, headers: { Authorization: 'Bearer ' + token }, contentType: 'application/json' };
  if (body) opt.payload = JSON.stringify(body);
  var r = UrlFetchApp.fetch(WORKER + path, opt);
  var code = r.getResponseCode();
  if (code === 401) throw new Error('The admin password was not accepted. Use "Short links > Change admin password".');
  try { return JSON.parse(r.getContentText()); } catch (e) { return { ok: false, error: 'HTTP ' + code }; }
}

function selectedCode_() {
  var sh = SpreadsheetApp.getActiveSheet();
  var ui = SpreadsheetApp.getUi();
  if (sh.getName() !== TABS.links || SpreadsheetApp.getActiveRange().getRow() < 2) {
    var r = ui.prompt('Which short link?', 'Type the code (the part after go.trendit.in/), or select its row on the Links tab first.', ui.ButtonSet.OK_CANCEL);
    if (r.getSelectedButton() !== ui.Button.OK) return '';
    return r.getResponseText().trim().replace(/^https?:\/\/go\.trendit\.in\//i, '');
  }
  return String(sh.getRange(SpreadsheetApp.getActiveRange().getRow(), 1).getValue()).trim();
}

function sheet_(name, head) {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold').setBackground('#0363fc').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  return sh;
}

function log_(action, target, details, result) {
  var sh = sheet_(TABS.log, ['When', 'Who', 'Action', 'Code / website', 'Details', 'Result']);
  sh.appendRow([new Date(), Session.getActiveUser().getEmail(), action, target, details, result]);
}

function d_(ms) { return ms ? new Date(Number(ms)) : ''; }
