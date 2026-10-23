/* Motor de los tests oficiales Test C1 (Übungstest) del entrenador «ALOdeutsch C1 · Kontext & Test».
   Dibuja Lesen 1–3, Sprachbausteine y Hören 1–3 a partir de window.C1_OFFICIAL[id], corrige con el
   Lösungsschlüssel oficial y reproduce los Hörtexte con la voz del navegador. */
(function () {
  var D = window.C1_OFFICIAL || {};
  var root = document.getElementById('officialView');
  if (!root) return;
  var KEY = 'alodeutschC1Official';
  var mem = {};
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return mem; } }
  function save(s) { mem = s; try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  var state = load();
  var cur = null, esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var SEC = [['l1', 'Lesen 1'], ['l2', 'Lesen 2'], ['l3', 'Lesen 3'], ['sb', 'Sprachbausteine'], ['h1', 'Hören 1'], ['h2', 'Hören 2'], ['h3', 'Hören 3'], ['sum', 'Auswertung']];
  var sec = 'l1';

  /* ---------- voz ---------- */
  var tok = 0, playing = null;
  function chunks(t) { var out = [], cur = ''; String(t).replace(/\s+/g, ' ').split(/(?<=[.!?:;])\s+/).forEach(function (s) { if ((cur + ' ' + s).length > 220 && cur) { out.push(cur); cur = s; } else cur = cur ? cur + ' ' + s : s; }); if (cur) out.push(cur); return out; }
  function stop() { tok++; playing = null; try { speechSynthesis.cancel(); } catch (e) {} root.querySelectorAll('.off-play').forEach(function (b) { b.textContent = b.getAttribute('data-l'); }); }
  function speak(btn, list) {
    if (!('speechSynthesis' in window)) { alert('Tu navegador no tiene voz alemana integrada. Lee la transcripción abajo.'); return; }
    if (playing === btn) { stop(); return; }
    stop(); var my = tok; playing = btn; btn.textContent = '⏹ Stop';
    var q = []; list.forEach(function (t) { q = q.concat(chunks(t)); });
    var vs = []; try { vs = speechSynthesis.getVoices(); } catch (e) {}
    var v = vs.filter(function (x) { return /^de/i.test(x.lang); })[0];
    (function next(i) {
      if (my !== tok) return;
      if (i >= q.length) { stop(); return; }
      var u = new SpeechSynthesisUtterance(q[i]); u.lang = 'de-DE'; u.rate = 0.92; if (v) u.voice = v;
      u.onend = function () { next(i + 1); }; u.onerror = function () { stop(); };
      try { speechSynthesis.speak(u); } catch (e) { stop(); }
    })(0);
  }
  function playBtn(label) { return '<button type="button" class="off-play" data-l="' + esc(label) + '">' + esc(label) + '</button>'; }

  /* ---------- helpers de estado ---------- */
  function st(t, k, v) { var s = state[t] = state[t] || {}; if (v === undefined) return s[k]; s[k] = v; save(state); }
  function sel(t, k, opts, cls) { var v = st(t, k) || ''; return '<select class="off-sel ' + (cls || '') + '" data-k="' + k + '"><option value="">—</option>' + opts.map(function (o) { return '<option value="' + esc(o[0]) + '"' + (v === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select>'; }
  function mark(ok) { return ok ? '<span class="off-ok">✔</span>' : '<span class="off-bad">✘</span>'; }
  function scoreOf(t, keys, prefix) { var n = 0; Object.keys(keys).forEach(function (q) { if (st(t.id, prefix + q) === keys[q]) n++; }); return n; }
  function bar(done, total) { return '<p class="off-score"><b>' + done + '/' + total + '</b> puntos · ' + Math.round(100 * done / total) + ' %</p>'; }

  /* ---------- secciones ---------- */
  function secL1(t) {
    var L = t.lesen1, ks = Object.keys(L.sentences), opts = ks.map(function (k) { return [k, k + ' – ' + L.sentences[k].slice(0, 70) + '…']; });
    var chk = st(t.id, 'chk_l1');
    var txt = L.text.map(function (p) { return '<p>' + esc(p).replace(/\[\[(\d)\]\]/g, function (m, n) { n = +n; if (n === 0) return '<span class="off-gap"><b>0</b> ' + esc(L.example.letter) + '</span>'; var v = st(t.id, 'l1_' + n); return '<span class="off-gap"><b>' + n + '</b> ' + sel(t.id, 'l1_' + n, opts) + (chk ? mark(v === L.key[n]) + (v === L.key[n] ? '' : ' <i>→ ' + L.key[n] + '</i>') : '') + '</span>'; }) + '</p>'; }).join('');
    var sents = '<h4>Sätze a–h</h4><div class="off-list">' + ks.map(function (k) { return '<p><b>' + k + '</b> ' + esc(L.sentences[k]) + '</p>'; }).join('') + '</div><p class="off-ex"><b>Beispiel (0):</b> z – ' + esc(L.example.text) + '</p>';
    return '<h3>Leseverstehen, Teil 1 · ' + esc(L.title) + '</h3><p class="muted">' + esc(L.intro) + '</p><p><i>' + esc(L.lead) + '</i></p><div class="off-text">' + txt + '</div>' + sents + '<div class="actions"><button data-act="chk" data-s="l1">Antworten prüfen</button><button class="secondary" data-act="clr" data-s="l1">Zurücksetzen</button></div>' + (chk ? bar(scoreOf(t, L.key, 'l1_'), 6) : '');
  }
  function secL2(t) {
    var L = t.lesen2, chk = st(t.id, 'chk_l2'), letters = Object.keys(L.paras);
    var paras = letters.map(function (k) { return '<div class="off-para"><b>' + k + '</b><p>' + esc(L.paras[k]) + '</p></div>'; }).join('');
    var qs = Object.keys(L.questions).map(function (n) { var v = st(t.id, 'l2_' + n); return '<div class="off-q"><b>' + n + '</b> ' + esc(L.questions[n]) + ' ' + sel(t.id, 'l2_' + n, letters.map(function (x) { return [x, x]; })) + (chk ? mark(v === L.key[n]) + (v === L.key[n] ? '' : ' <i>→ ' + L.key[n] + '</i>') : '') + '</div>'; }).join('');
    return '<h3>Leseverstehen, Teil 2 · ' + esc(L.title) + '</h3><p class="muted">' + esc(L.intro) + '</p><p class="off-ex"><b>Beispiel (0):</b> In welchem Abschnitt … ' + esc(L.example.q) + ' → <b>' + L.example.a + '</b></p><h4>In welchem Abschnitt …</h4>' + qs + '<div class="off-text">' + paras + '</div><div class="actions"><button data-act="chk" data-s="l2">Antworten prüfen</button><button class="secondary" data-act="clr" data-s="l2">Zurücksetzen</button></div>' + (chk ? bar(scoreOf(t, L.key, 'l2_'), 6) : '');
  }
  function radios(t, k, vals, chkd, right) { var v = st(t.id, k); return '<span class="off-rad">' + vals.map(function (x) { return '<label><input type="radio" name="' + t.id + k + '" data-k="' + k + '" value="' + esc(x[0]) + '"' + (v === x[0] ? ' checked' : '') + '> ' + esc(x[1]) + '</label>'; }).join('') + '</span>' + (chkd ? mark(v === right) + (v === right ? '' : ' <i>→ ' + right + '</i>') : ''); }
  function secL3(t) {
    var L = t.lesen3, chk = st(t.id, 'chk_l3');
    var items = Object.keys(L.statements).map(function (n) { return '<div class="off-q"><b>' + n + '</b> ' + esc(L.statements[n]) + '<br>' + radios(t, 'l3_' + n, [['+', '+ richtig'], ['-', '− falsch'], ['x', 'x nicht im Text']], chk, L.key[n]) + '</div>'; }).join('');
    var q24 = '<div class="off-q"><b>24</b> Welche Überschrift passt am besten zum Text?<br>' + radios(t, 'l3_24', Object.keys(L.titleQ.options).map(function (k) { return [k, k + ' ' + L.titleQ.options[k]]; }), chk, L.titleQ.key) + '</div>';
    var k = {}; Object.keys(L.key).forEach(function (n) { k[n] = L.key[n]; }); k[24] = L.titleQ.key;
    return '<h3>Leseverstehen, Teil 3</h3><p class="muted">' + esc(L.intro) + '</p><p class="note">' + esc(L.note) + '</p><div class="off-text">' + L.text.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '<p class="muted">' + esc(L.quelle) + '</p></div>' + items + q24 + '<div class="actions"><button data-act="chk" data-s="l3">Antworten prüfen</button><button class="secondary" data-act="clr" data-s="l3">Zurücksetzen</button></div>' + (chk ? bar(scoreOf(t, k, 'l3_'), 12) : '');
  }
  function secSB(t) {
    var L = t.sprach, chk = st(t.id, 'chk_sb');
    function gap(n) { if (n === 0) return '<span class="off-gap"><b>0</b> ' + L.example.options[L.example.key] + '</span>'; var o = Object.keys(L.options[n]).map(function (k) { return [k, k + ' · ' + L.options[n][k]]; }); var v = st(t.id, 'sb_' + n); return '<span class="off-gap"><b>' + n + '</b> ' + sel(t.id, 'sb_' + n, o) + (chk ? mark(v === L.key[n]) + (v === L.key[n] ? '' : ' <i>→ ' + L.key[n] + ' ' + esc(L.options[n][L.key[n]]) + '</i>') : '') + '</span>'; }
    var title = '<h4>' + esc(L.title).replace(/\[\[(\d+)\]\]/g, function (m, n) { return gap(+n); }) + '</h4>';
    return '<h3>Sprachbausteine</h3><p class="muted">' + esc(L.intro) + '</p><div class="off-text">' + title + L.text.map(function (p) { return '<p>' + esc(p).replace(/\[\[(\d+)\]\]/g, function (m, n) { return gap(+n); }) + '</p>'; }).join('') + '</div><div class="actions"><button data-act="chk" data-s="sb">Antworten prüfen</button><button class="secondary" data-act="clr" data-s="sb">Zurücksetzen</button></div>' + (chk ? bar(scoreOf(t, L.key, 'sb_'), 22) : '');
  }
  function secH1(t) {
    var H = t.hoeren.teil1, chk = st(t.id, 'chk_h1'), ks = Object.keys(H.statements);
    var opts = ks.map(function (k) { return [k, k + ' – ' + H.statements[k].slice(0, 60) + '…']; });
    var sts = '<div class="off-list">' + ks.map(function (k) { return '<p><b>' + k + '</b> ' + esc(H.statements[k]) + '</p>'; }).join('') + '</div>';
    var sp = H.speakers.map(function (s) { var v = st(t.id, 'h1_' + s.n); return '<div class="off-q"><b>' + s.n + '</b> ' + esc(s.label) + ' ' + playBtn('🔊 Hören') + ' ' + sel(t.id, 'h1_' + s.n, opts) + (chk ? mark(v === H.key[s.n]) + (v === H.key[s.n] ? '' : ' <i>→ ' + H.key[s.n] + '</i>') : '') + (chk ? '<details><summary>Transkript</summary><p>' + esc(s.text) + '</p></details>' : '') + '</div>'; }).join('');
    return '<h3>Hörverstehen, Teil 1 · Thema „' + esc(H.topic) + '“</h3><p class="muted">' + esc(H.intro) + ' Lies zuerst die Aussagen a–j (1 Minute), dann höre jede Person einmal.</p>' + sts + '<h4>Aufgaben 47–54</h4>' + sp + '<div class="actions"><button data-act="chk" data-s="h1">Antworten prüfen</button><button class="secondary" data-act="clr" data-s="h1">Zurücksetzen</button></div>' + (chk ? bar(scoreOf(t, H.key, 'h1_'), 8) : '');
  }
  function secH2(t) {
    var H = t.hoeren.teil2, chk = st(t.id, 'chk_h2');
    var all = []; H.transcript.forEach(function (r) { for (var i = 1; i < r.length; i++) all.push(r[i]); });
    var qs = Object.keys(H.questions).map(function (n) { var q = H.questions[n]; return '<div class="off-q"><b>' + n + '</b> ' + esc(q.stem) + '<br>' + radios(t, 'h2_' + n, [['a', 'a ' + q.a], ['b', 'b ' + q.b], ['c', 'c ' + q.c]], chk, H.key[n]) + '</div>'; }).join('');
    var tr = chk ? '<details open><summary>Transkript der Radiosendung (' + esc(H.pages || '') + ')</summary>' + H.transcript.map(function (r) { return r.slice(1).map(function (p, i) { return '<p>' + (i === 0 ? '<b>' + esc(r[0]) + ':</b> ' : '') + esc(p) + '</p>'; }).join(''); }).join('') + '</details>' : '';
    return '<h3>Hörverstehen, Teil 2 · ' + esc(H.title || 'Radiosendung') + '</h3><p class="muted">' + esc(H.intro) + ' Lies zuerst die Aufgaben 55–64 (3 Minuten).</p><div class="actions">' + playBtn('🔊 Sendung hören') + '</div>' + qs + '<div class="actions"><button data-act="chk" data-s="h2">Antworten prüfen</button><button class="secondary" data-act="clr" data-s="h2">Zurücksetzen</button></div>' + (chk ? bar(scoreOf(t, H.key, 'h2_'), 10) : '') + tr;
  }
  function secH3(t) {
    var H = t.hoeren.teil3, chk = st(t.id, 'chk_h3'), tot = 0, got = 0;
    var slides = H.slides.map(function (s) { return '<div class="off-slide">' + (s.title ? '<h4>' + esc(s.title) + '</h4>' : '') + s.gaps.map(function (g) { tot += 2; var v = st(t.id, 'h3_' + g.n) || '', r = st(t.id, 'h3r_' + g.n); if (chk && r !== undefined) got += +r; return '<div class="off-q"><b>' + g.n + '</b> ' + esc(g.pre) + ' <input class="off-in" data-k="h3_' + g.n + '" value="' + esc(v) + '" placeholder="Stichworte …"> ' + esc(g.post) + (chk ? '<div class="off-sol"><b>Lösung:</b> ' + esc(g.answer) + ' <span class="off-self">Selbstbewertung: ' + [2, 1, 0].map(function (p) { return '<label><input type="radio" name="h3r' + g.n + '" data-k="h3r_' + g.n + '" value="' + p + '"' + (String(r) === String(p) ? ' checked' : '') + '> ' + p + '</label>'; }).join(' ') + '</span></div>' : '') + '</div>'; }).join('') + '</div>'; }).join('');
    var tr = chk ? '<details><summary>Transkript des Vortrags (' + esc(H.pages || '') + ')</summary>' + H.transcript.map(function (r) { return r.slice(1).map(function (p, i) { return '<p>' + (i === 0 ? '<b>' + esc(r[0]) + ':</b> ' : '') + esc(p) + '</p>'; }).join(''); }).join('') + '</details>' : '';
    return '<h3>Hörverstehen, Teil 3 · ' + esc(H.title || 'Vortrag') + '</h3><p class="muted">' + esc(H.intro) + '</p><p class="note">' + esc(H.note) + '</p><p class="off-ex"><b>Beispiel (0):</b> ' + esc(H.example.before + H.example.answer + H.example.after) + '</p><div class="actions">' + playBtn('🔊 Vortrag hören') + '</div>' + slides + '<div class="actions"><button data-act="chk" data-s="h3">Lösungen zeigen</button><button class="secondary" data-act="clr" data-s="h3">Zurücksetzen</button></div>' + (chk ? bar(got, tot) + '<p class="muted">Bewerte dich selbst: 2 = richtig, 1 = Sinn verstanden aber zu knapp/fehlerhaft, 0 = falsch.</p>' : '') + tr;
  }
  function h3got(t) { var g = 0; t.hoeren.teil3.slides.forEach(function (s) { s.gaps.forEach(function (x) { var r = st(t.id, 'h3r_' + x.n); if (r !== undefined) g += +r; }); }); return g; }
  function secSum(t) {
    var L3 = {}; Object.keys(t.lesen3.key).forEach(function (n) { L3[n] = t.lesen3.key[n]; }); L3[24] = t.lesen3.titleQ.key;
    var rows = [['Lesen 1', scoreOf(t, t.lesen1.key, 'l1_'), 6, 'chk_l1'], ['Lesen 2', scoreOf(t, t.lesen2.key, 'l2_'), 6, 'chk_l2'], ['Lesen 3', scoreOf(t, L3, 'l3_'), 12, 'chk_l3'], ['Sprachbausteine', scoreOf(t, t.sprach.key, 'sb_'), 22, 'chk_sb'], ['Hören 1', scoreOf(t, t.hoeren.teil1.key, 'h1_'), 8, 'chk_h1'], ['Hören 2', scoreOf(t, t.hoeren.teil2.key, 'h2_'), 10, 'chk_h2'], ['Hören 3 (2 P. je Lücke)', h3got(t), 20, 'chk_h3']];
    var g = 0, m = 0; rows.forEach(function (r) { if (st(t.id, r[3])) { g += r[1]; m += r[2]; } });
    return '<h3>Auswertung · ' + esc(t.title) + '</h3><p class="muted">Rohpunkte aus den Teilen, die du bereits geprüft hast. Die offizielle Gewichtung und die Notenskala findest du im Abschnitt «Punkte und Gewichtung» des Testhefts (S. 46); hier werden nur Rohpunkte gezählt.</p><table class="off-tab"><tr><th>Teil</th><th>Punkte</th><th>%</th></tr>' + rows.map(function (r) { var done = st(t.id, r[3]); return '<tr><td>' + r[0] + '</td><td>' + (done ? r[1] + ' / ' + r[2] : '— / ' + r[2]) + '</td><td>' + (done ? Math.round(100 * r[1] / r[2]) + ' %' : '–') + '</td></tr>'; }).join('') + '</table>' + (m ? '<p class="off-score"><b>' + g + ' / ' + m + '</b> Rohpunkte (' + Math.round(100 * g / m) + ' %) in den geprüften Teilen</p>' : '<p class="muted">Prüfe zuerst mindestens einen Teil.</p>') + '<div class="note">Schriftlicher Ausdruck und mündliche Prüfung werden hier nicht automatisch bewertet: nutze den Schreibbereich und die Kriterien im Testheft (S. 38–45).</div><p class="muted">Quelle: ' + esc(t.source) + '</p>';
  }
  var R = { l1: secL1, l2: secL2, l3: secL3, sb: secSB, h1: secH1, h2: secH2, h3: secH3, sum: secSum };
  var PFX = { l1: 'l1_', l2: 'l2_', l3: 'l3_', sb: 'sb_', h1: 'h1_', h2: 'h2_', h3: 'h3' };

  function render() {
    stop();
    var ids = Object.keys(D).filter(function (k) { return D[k] && D[k].lesen1; });
    if (!ids.length) { root.innerHTML = '<div class="panel"><p>Keine offiziellen Tests geladen.</p></div>'; return; }
    if (!cur || !D[cur]) cur = ids[0];
    var t = D[cur];
    var head = '<div class="hero"><div class="eyebrow">Offizielle Übungstests · Test Deutsch C1</div><h2>Übungstests mit offiziellem Lösungsschlüssel</h2><p>Texte, Aufgaben und Lösungen stammen aus den Testheften, die du bereitgestellt hast (privater Studiengebrauch). Hörtexte werden mit der Stimme deines Browsers vorgelesen, weil die Original-Audios fehlen. Die Transkripte erscheinen erst nach dem Prüfen.</p></div>';
    var tests = '<div class="off-tabs">' + ids.map(function (k) { return '<button class="' + (k === cur ? '' : 'secondary') + '" data-test="' + k + '">' + esc(D[k].title) + '</button>'; }).join('') + '</div>';
    var tabs = '<div class="off-tabs">' + SEC.map(function (s) { return '<button class="' + (s[0] === sec ? '' : 'secondary') + '" data-sec="' + s[0] + '">' + s[1] + '</button>'; }).join('') + '</div>';
    root.innerHTML = head + '<div class="panel">' + tests + tabs + '<div id="offBody">' + R[sec](t) + '</div></div>';
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.classList.contains('off-play')) {
      var t = D[cur], list = [];
      if (sec === 'h1') { var row = b.closest('.off-q'); var i = Array.prototype.indexOf.call(root.querySelectorAll('#offBody .off-q'), row); list = [t.hoeren.teil1.speakers[i].text]; }
      else if (sec === 'h2') t.hoeren.teil2.transcript.forEach(function (r) { for (var i = 1; i < r.length; i++) list.push(r[i]); });
      else t.hoeren.teil3.transcript.forEach(function (r) { for (var i = 1; i < r.length; i++) list.push(r[i]); });
      speak(b, list); return;
    }
    if (b.dataset.test) { cur = b.dataset.test; render(); return; }
    if (b.dataset.sec) { sec = b.dataset.sec; render(); window.scrollTo({ top: root.offsetTop, behavior: 'smooth' }); return; }
    if (b.dataset.act === 'chk') { st(cur, 'chk_' + b.dataset.s, true); render(); return; }
    if (b.dataset.act === 'clr') { var s = state[cur] = state[cur] || {}; Object.keys(s).forEach(function (k) { if (k.indexOf('chk_' + b.dataset.s) === 0 || k.indexOf(PFX[b.dataset.s]) === 0 || (b.dataset.s === 'h3' && k.indexOf('h3r_') === 0)) delete s[k]; }); save(state); render(); }
  });
  root.addEventListener('change', function (e) { var k = e.target.getAttribute('data-k'); if (!k) return; st(cur, k, e.target.value); });
  root.addEventListener('input', function (e) { if (e.target.classList.contains('off-in')) st(cur, e.target.getAttribute('data-k'), e.target.value); });
  window.addEventListener('pagehide', stop);
  window.renderOfficialC1 = render;
})();
