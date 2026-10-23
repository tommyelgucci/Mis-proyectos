/* Motor de los tests oficiales Test B2 (Übungstest / Modelltest) para Kontext B2.
   Dibuja Lesen 1–3, Sprachbausteine 1–2 y Hören 1–3 desde window.B2_OFFICIAL[id], corrige con el
   Lösungsschlüssel oficial y lee los Hörtexte con la voz del navegador. */
(function () {
  var D = window.B2_OFFICIAL || {};
  var root = document.getElementById('b2OfficialRoot');
  if (!root) return;
  var KEY = 'alodeutschB2Official', mem = {};
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return mem; } }
  function save(s) { mem = s; try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  var state = load(), cur = null, sec = 'l1';
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var SEC = [['l1', 'Lesen 1'], ['l2', 'Lesen 2'], ['l3', 'Lesen 3'], ['s1', 'Sprachb. 1'], ['s2', 'Sprachb. 2'], ['h1', 'Hören 1'], ['h2', 'Hören 2'], ['h3', 'Hören 3'], ['sum', 'Auswertung']];
  var PFX = { l1: 'l1_', l2: 'l2_', l3: 'l3_', s1: 's1_', s2: 's2_', h1: 'h1_', h2: 'h2_', h3: 'h3_' };

  /* ---------- voz ---------- */
  var tok = 0, playing = null;
  function chunks(t) { var out = [], c = ''; String(t).replace(/\s+/g, ' ').split(/(?<=[.!?:;])\s+/).forEach(function (s) { if ((c + ' ' + s).length > 220 && c) { out.push(c); c = s; } else c = c ? c + ' ' + s : s; }); if (c) out.push(c); return out; }
  function stop() { tok++; playing = null; try { speechSynthesis.cancel(); } catch (e) {} root.querySelectorAll('.b2o-play').forEach(function (b) { b.textContent = b.getAttribute('data-l'); }); }
  function speak(btn, list) {
    if (!('speechSynthesis' in window)) { alert('Tu navegador no tiene voz alemana integrada. Lee la transcripción.'); return; }
    if (playing === btn) { stop(); return; }
    stop(); var my = tok; playing = btn; btn.textContent = '⏹ Stop';
    var q = []; list.forEach(function (t) { q = q.concat(chunks(t)); });
    var vs = []; try { vs = speechSynthesis.getVoices(); } catch (e) {}
    var v = vs.filter(function (x) { return /^de/i.test(x.lang); })[0];
    (function next(i) {
      if (my !== tok) return; if (i >= q.length) { stop(); return; }
      var u = new SpeechSynthesisUtterance(q[i]); u.lang = 'de-DE'; u.rate = 0.92; if (v) u.voice = v;
      u.onend = function () { next(i + 1); }; u.onerror = function () { stop(); };
      try { speechSynthesis.speak(u); } catch (e) { stop(); }
    })(0);
  }
  function playBtn(l) { return '<button type="button" class="b2o-play" data-l="' + esc(l) + '">' + esc(l) + '</button>'; }

  /* ---------- helpers ---------- */
  function st(t, k, v) { var s = state[t] = state[t] || {}; if (v === undefined) return s[k]; s[k] = v; save(state); }
  function sel(t, k, opts) { var v = st(t, k) || ''; return '<select class="b2o-sel" data-k="' + k + '"><option value="">—</option>' + opts.map(function (o) { return '<option value="' + esc(o[0]) + '"' + (v === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select>'; }
  function radios(t, k, vals, chk, right) { var v = st(t.id, k); return '<span class="b2o-rad">' + vals.map(function (x) { return '<label><input type="radio" name="' + t.id + k + '" data-k="' + k + '" value="' + esc(x[0]) + '"' + (v === x[0] ? ' checked' : '') + '> ' + esc(x[1]) + '</label>'; }).join('') + '</span>' + res(v, right, chk); }
  function res(v, right, chk) { if (!chk) return ''; return (v === right ? '<b class="b2o-ok"> ✔</b>' : '<b class="b2o-bad"> ✘</b><i class="b2o-sol"> → ' + esc(right) + '</i>'); }
  function score(t, key, p) { var n = 0; Object.keys(key).forEach(function (q) { if (st(t.id, p + q) === key[q]) n++; }); return n; }
  function bar(g, m) { return '<p class="b2o-score"><b>' + g + '/' + m + '</b> Punkte · ' + Math.round(100 * g / m) + ' %</p>'; }
  function btns(s, chkLabel) { return '<div class="b2o-act"><button data-act="chk" data-s="' + s + '" class="primary">' + (chkLabel || 'Antworten prüfen') + '</button><button data-act="clr" data-s="' + s + '">Zurücksetzen</button></div>'; }
  function gapify(t, text, mk) { return esc(text).replace(/\[\[(\d+)\]\]/g, function (m, n) { return mk(+n); }); }
  function pm(v) { return v === '+' ? '+ richtig' : v === '-' ? '− falsch' : v; }

  /* ---------- secciones ---------- */
  function L1(t) {
    var L = t.lesen1, chk = st(t.id, 'chk_l1'), ks = Object.keys(L.headings), opts = ks.map(function (k) { return [k, k + ' – ' + L.headings[k]]; });
    var heads = '<div class="b2o-list">' + ks.map(function (k) { return '<p><b>' + k + '</b> ' + esc(L.headings[k]) + '</p>'; }).join('') + '</div>';
    var texts = Object.keys(L.texts).map(function (n) { var v = st(t.id, 'l1_' + n); return '<div class="b2o-text"><p><b>' + n + '</b> ' + esc(L.texts[n]) + '</p><p>Überschrift: ' + sel(t.id, 'l1_' + n, opts) + res(v, L.key[n], chk) + '</p></div>'; }).join('');
    return '<h4>Leseverstehen, Teil 1</h4><p class="muted">' + esc(L.intro) + '</p>' + heads + texts + btns('l1') + (chk ? bar(score(t, L.key, 'l1_'), 5) : '');
  }
  function L2(t) {
    var L = t.lesen2, chk = st(t.id, 'chk_l2');
    var qs = Object.keys(L.questions).map(function (n) { var q = L.questions[n]; return '<div class="b2o-q"><b>' + n + '</b> ' + esc(q.stem) + '<br>' + radios(t, 'l2_' + n, [['a', 'a ' + q.a], ['b', 'b ' + q.b], ['c', 'c ' + q.c]], chk, L.key[n]) + '</div>'; }).join('');
    return '<h4>Leseverstehen, Teil 2 · ' + esc(L.title) + '</h4><p class="muted">' + esc(L.intro) + '</p><div class="b2o-text">' + L.text.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' + qs + btns('l2') + (chk ? bar(score(t, L.key, 'l2_'), 5) : '');
  }
  function L3(t) {
    var L = t.lesen3, chk = st(t.id, 'chk_l3'), ks = Object.keys(L.infos), opts = ks.map(function (k) { return [k, k + ' – ' + L.infos[k].title]; }).concat([['x', 'x – keine Lösung']]);
    var infos = ks.map(function (k) { return '<div class="b2o-info"><b>' + k + '</b> <strong>' + esc(L.infos[k].title) + '</strong><br>' + esc(L.infos[k].text) + '</div>'; }).join('');
    var sits = Object.keys(L.situations).map(function (n) { var v = st(t.id, 'l3_' + n); return '<div class="b2o-q"><b>' + n + '</b> ' + esc(L.situations[n]) + ' ' + sel(t.id, 'l3_' + n, opts) + res(v, L.key[n], chk) + '</div>'; }).join('');
    return '<h4>Leseverstehen, Teil 3</h4><p class="muted">' + esc(L.intro) + '</p>' + sits + '<h5>Info-Texte a–l</h5><div class="b2o-infos">' + infos + '</div>' + btns('l3') + (chk ? bar(score(t, L.key, 'l3_'), 10) : '');
  }
  function S1(t) {
    var L = t.sb1, chk = st(t.id, 'chk_s1');
    function gap(n) { var o = Object.keys(L.options[n]).map(function (k) { return [k, k + ' · ' + L.options[n][k]]; }); var v = st(t.id, 's1_' + n); return '<span class="b2o-gap"><b>' + n + '</b> ' + sel(t.id, 's1_' + n, o) + res(v, L.key[n], chk) + '</span>'; }
    return '<h4>Sprachbausteine, Teil 1</h4><p class="muted">' + esc(L.intro) + '</p><div class="b2o-text">' + L.text.map(function (p) { return '<p>' + gapify(t, p, gap) + '</p>'; }).join('') + '</div>' + btns('s1') + (chk ? bar(score(t, L.key, 's1_'), 10) : '');
  }
  function S2(t) {
    var L = t.sb2, chk = st(t.id, 'chk_s2'), ks = Object.keys(L.box), opts = ks.map(function (k) { return [k, k + ' · ' + L.box[k]]; });
    function gap(n) { var v = st(t.id, 's2_' + n); return '<span class="b2o-gap"><b>' + n + '</b> ' + sel(t.id, 's2_' + n, opts) + res(v, L.key[n], chk) + '</span>'; }
    var box = '<div class="b2o-box">' + ks.map(function (k) { return '<span><b>' + k + '</b> ' + esc(L.box[k]) + '</span>'; }).join('') + '</div>';
    return '<h4>Sprachbausteine, Teil 2 · ' + esc(L.title) + '</h4><p class="muted">' + esc(L.intro) + '</p>' + box + '<div class="b2o-text">' + L.text.map(function (p) { return '<p>' + gapify(t, p, gap) + '</p>'; }).join('') + '</div>' + btns('s2') + (chk ? bar(score(t, L.key, 's2_'), 10) : '');
  }
  function H(t, part, s, p, max) {
    var Hh = t.hoeren[part], chk = st(t.id, 'chk_' + s), list = Hh.transcript.map(function (r) { return r[1]; });
    var items = Object.keys(Hh.items).map(function (n) { return '<div class="b2o-q"><b>' + n + '</b> ' + esc(Hh.items[n]) + '<br>' + radios(t, p + n, [['+', '+ richtig'], ['-', '− falsch']], chk, Hh.key[n]) + (chk && Hh.notes && Hh.notes[n] ? '<div class="notice">' + esc(Hh.notes[n]) + '</div>' : '') + '</div>'; }).join('');
    var tr = chk ? '<details open><summary>Transkript (Hörtexte)</summary>' + Hh.transcript.map(function (r) { return '<p>' + (r[0] ? '<b>' + esc(r[0]) + ':</b> ' : '') + esc(r[1]) + '</p>'; }).join('') + '</details>' : '';
    return '<h4>Hörverstehen, Teil ' + part.slice(-1) + ' · ' + esc(Hh.title) + '</h4><p class="muted">' + esc(Hh.intro) + ' Lies zuerst die Aufgaben, dann höre einmal.</p><div class="b2o-act">' + playBtn('🔊 Hören') + '</div>' + items + btns(s) + (chk ? bar(score(t, Hh.key, p), max) : '') + tr;
  }
  function Sum(t) {
    var r = [['Lesen 1', score(t, t.lesen1.key, 'l1_'), 5, 'chk_l1'], ['Lesen 2', score(t, t.lesen2.key, 'l2_'), 5, 'chk_l2'], ['Lesen 3', score(t, t.lesen3.key, 'l3_'), 10, 'chk_l3'], ['Sprachbausteine 1', score(t, t.sb1.key, 's1_'), 10, 'chk_s1'], ['Sprachbausteine 2', score(t, t.sb2.key, 's2_'), 10, 'chk_s2'], ['Hören 1', score(t, t.hoeren.teil1.key, 'h1_'), 5, 'chk_h1'], ['Hören 2', score(t, t.hoeren.teil2.key, 'h2_'), 10, 'chk_h2'], ['Hören 3', score(t, t.hoeren.teil3.key, 'h3_'), 5, 'chk_h3']];
    var ep = t.evalPages || { weighting: 'S. 45', criteria: 'S. 32–44' };
    var g = 0, m = 0; r.forEach(function (x) { if (st(t.id, x[3])) { g += x[1]; m += x[2]; } });
    return '<h4>Auswertung · ' + esc(t.title) + '</h4><p class="muted">Rohpunkte (1 Punkt je Aufgabe) der Teile, die du schon geprüft hast. Die offizielle Gewichtung (Punkte und Gewichtung, Testheft ' + esc(ep.weighting) + ') wird hier nicht angewandt.</p><table class="b2o-tab"><tr><th>Teil</th><th>Punkte</th><th>%</th></tr>' + r.map(function (x) { var d = st(t.id, x[3]); return '<tr><td>' + x[0] + '</td><td>' + (d ? x[1] + ' / ' + x[2] : '— / ' + x[2]) + '</td><td>' + (d ? Math.round(100 * x[1] / x[2]) + ' %' : '–') + '</td></tr>'; }).join('') + '</table>' + (m ? '<p class="b2o-score"><b>' + g + ' / ' + m + '</b> (' + Math.round(100 * g / m) + ' %) in den geprüften Teilen</p>' : '<p class="muted">Prüfe zuerst mindestens einen Teil.</p>') + '<div class="notice">Schriftlicher und mündlicher Ausdruck werden nicht automatisch bewertet: Kriterien im Testheft (' + esc(ep.criteria) + ').</div><p class="muted">Quelle: ' + esc(t.source) + '</p>';
  }
  var R = { l1: L1, l2: L2, l3: L3, s1: S1, s2: S2, h1: function (t) { return H(t, 'teil1', 'h1', 'h1_', 5); }, h2: function (t) { return H(t, 'teil2', 'h2', 'h2_', 10); }, h3: function (t) { return H(t, 'teil3', 'h3', 'h3_', 5); }, sum: Sum };

  function render() {
    stop();
    var ids = Object.keys(D).filter(function (k) { return D[k] && D[k].lesen1; });
    if (!ids.length) { root.innerHTML = '<p>Keine Tests geladen.</p>'; return; }
    if (!cur || !D[cur]) cur = ids[0];
    var t = D[cur];
    var tests = '<div class="b2o-tabs">' + ids.map(function (k) { return '<button class="' + (k === cur ? 'primary' : '') + '" data-test="' + k + '">' + esc(D[k].title) + '</button>'; }).join('') + '</div>';
    var tabs = '<div class="b2o-tabs">' + SEC.map(function (s) { return '<button class="' + (s[0] === sec ? 'primary' : '') + '" data-sec="' + s[0] + '">' + s[1] + '</button>'; }).join('') + '</div>';
    root.innerHTML = '<div class="notice">Texte, Aufgaben und Lösungsschlüssel stammen aus den Testheften, die du bereitgestellt hast (privater Studiengebrauch). Die Originalaudios fehlen: Die Hörtexte werden mit der Stimme deines Browsers gelesen; das Transkript erscheint nach dem Prüfen.</div>' + tests + tabs + '<div id="b2oBody">' + R[sec](t) + '</div>';
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.classList.contains('b2o-play')) { var h = D[cur].hoeren[{ h1: 'teil1', h2: 'teil2', h3: 'teil3' }[sec]]; speak(b, h.transcript.map(function (r) { return r[1]; })); return; }
    if (b.dataset.test) { cur = b.dataset.test; render(); return; }
    if (b.dataset.sec) { sec = b.dataset.sec; render(); return; }
    if (b.dataset.act === 'chk') { st(cur, 'chk_' + b.dataset.s, true); render(); return; }
    if (b.dataset.act === 'clr') { var s = state[cur] = state[cur] || {}; Object.keys(s).forEach(function (k) { if (k === 'chk_' + b.dataset.s || k.indexOf(PFX[b.dataset.s]) === 0) delete s[k]; }); save(state); render(); }
  });
  root.addEventListener('change', function (e) { var k = e.target.getAttribute('data-k'); if (k) st(cur, k, e.target.value); });
  window.addEventListener('pagehide', stop);
  window.renderOfficialB2 = render;
  render();
})();
