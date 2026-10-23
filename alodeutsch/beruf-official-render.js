/* Motor de los tests oficiales Test Deutsch B1·B2 Beruf para Kontext B2.
   Dibuja las partes de window.BERUF_OFFICIAL[id].parts según su tipo (listen, choice, match, gaps, write),
   corrige con el Lösungsschlüssel oficial y lee los Hörtexte con la voz del navegador. */
(function () {
  var D = window.BERUF_OFFICIAL || {};
  var root = document.getElementById('berufOfficialRoot');
  if (!root) return;
  var KEY = 'alodeutschBerufOfficial', mem = {};
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return mem; } }
  function save(s) { mem = s; try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  var state = load(), cur = null, sec = null;
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

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

  /* ---------- helpers ---------- */
  function st(t, k, v) { var s = state[t] = state[t] || {}; if (v === undefined) return s[k]; s[k] = v; save(state); }
  function sel(t, k, opts) { var v = st(t, k) || ''; return '<select class="b2o-sel" data-k="' + k + '"><option value="">—</option>' + opts.map(function (o) { return '<option value="' + esc(o[0]) + '"' + (v === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select>'; }
  function radios(t, k, vals, chk, right) { var v = st(t, k); return '<span class="b2o-rad">' + vals.map(function (x) { return '<label><input type="radio" name="bo' + t + k + '" data-k="' + k + '" value="' + esc(x[0]) + '"' + (v === x[0] ? ' checked' : '') + '> ' + esc(x[1]) + '</label>'; }).join('') + '</span>' + res(v, right, chk); }
  function res(v, right, chk) { if (!chk) return ''; return (v === right ? '<b class="b2o-ok"> ✔</b>' : '<b class="b2o-bad"> ✘</b><i class="b2o-sol"> → ' + esc(pm(right)) + '</i>'); }
  function pm(v) { return v === '+' ? 'richtig' : v === '-' ? 'falsch' : v; }
  function score(t, p) { var n = 0; Object.keys(p.key).forEach(function (q) { if (st(t, p.id + '_' + q) === p.key[q]) n++; }); return n; }
  function bar(g, m) { return '<p class="b2o-score"><b>' + g + '/' + m + '</b> Punkte · ' + Math.round(100 * g / m) + ' %</p>'; }
  function btns(p) { return '<div class="b2o-act"><button data-act="chk" data-s="' + p.id + '" class="primary">Antworten prüfen</button><button data-act="clr" data-s="' + p.id + '">Zurücksetzen</button></div>'; }
  function paras(list) { return list.map(function (x) { return '<p>' + esc(x) + '</p>'; }).join(''); }
  function audioList(g) { return g.lines.map(function (r) { return r[1]; }); }
  function players(p) { return p.audio ? '<div class="b2o-act">' + p.audio.map(function (g, i) { return '<button type="button" class="b2o-play" data-a="' + i + '" data-l="🔊 ' + esc(g.label) + '">🔊 ' + esc(g.label) + '</button>'; }).join(' ') + '</div>' : ''; }
  function transcript(p, open) { return p.audio ? '<details' + (open ? ' open' : '') + '><summary>Transkript (Hörtexte)</summary>' + p.audio.map(function (g) { return '<h5>' + esc(g.label) + '</h5>' + g.lines.map(function (r) { return '<p>' + (r[0] ? '<b>' + esc(r[0]) + ':</b> ' : '') + esc(r[1]) + '</p>'; }).join(''); }).join('') + '</details>' : ''; }

  /* ---------- tipos de parte ---------- */
  function choiceItem(t, p, n, chk) {
    var it = p.items[n], k = p.id + '_' + n;
    var vals = it.rf ? [['+', 'richtig'], ['-', 'falsch']] : Object.keys(it.opts).map(function (o) { return [o, o + ' ' + it.opts[o]]; });
    return '<div class="b2o-q"><b>' + n + '</b> ' + esc(it.stem) + '<br>' + radios(t, k, vals, chk, p.key[n]) + '</div>';
  }
  function Choice(t, p, chk) {
    var done = {}, out = '';
    (p.texts || []).forEach(function (x) { out += '<h5>' + esc(x.title) + '</h5><div class="b2o-text">' + paras(x.paras) + '</div>' + x.items.map(function (n) { done[n] = 1; return choiceItem(t, p, n, chk); }).join(''); });
    return out + Object.keys(p.items).filter(function (n) { return !done[n]; }).map(function (n) { return choiceItem(t, p, n, chk); }).join('');
  }
  function Match(t, p, chk) {
    var ks = Object.keys(p.options).filter(function (k) { return k !== p.example; });
    var opts = ks.map(function (k) { var s = p.options[k]; return [k, k + ' – ' + (s.length > 70 ? s.slice(0, 67) + '…' : s)]; });
    if (p.allowX) opts.push(['x', 'x – kein passender Tipp']);
    var list = '<div class="b2o-infos">' + Object.keys(p.options).map(function (k) { return '<div class="b2o-info"><b>' + k + '</b> ' + esc(p.options[k]) + (k === p.example ? ' <i class="muted">(Beispiel)</i>' : '') + '</div>'; }).join('') + '</div>';
    var items = Object.keys(p.items).map(function (n) { var k = p.id + '_' + n, v = st(t, k); return '<div class="b2o-q"><b>' + n + '</b> ' + esc(p.items[n]) + '<br>' + sel(t, k, opts) + res(v, p.key[n], chk) + '</div>'; }).join('');
    return list + items;
  }
  function Gaps(t, p, chk) {
    function gap(m, n) {
      var k = p.id + '_' + n, v = st(t, k);
      var o = p.box ? Object.keys(p.box).map(function (x) { return [x, x + ' · ' + p.box[x]]; }) : Object.keys(p.options[n]).map(function (x) { return [x, x + ' · ' + p.options[n][x]]; });
      return '<span class="b2o-gap"><b>' + n + '</b> ' + sel(t, k, o) + res(v, p.key[n], chk) + '</span>';
    }
    var box = p.box ? '<div class="b2o-box">' + Object.keys(p.box).map(function (x) { return '<span><b>' + x + '</b> ' + esc(p.box[x]) + '</span>'; }).join('') + '</div>' : '';
    return box + '<div class="b2o-text">' + p.text.map(function (x) { return '<p>' + esc(x).replace(/\[\[(\d+)\]\]/g, gap) + '</p>'; }).join('') + '</div>';
  }
  function Write(t, p) {
    return p.tasks.map(function (w, i) {
      var k = p.id + '_' + i, v = st(t, k) || '', wc = (v.trim().match(/\S+/g) || []).length;
      return '<h5>' + esc(w.title) + '</h5><div class="b2o-text"><p><b>Situation:</b> ' + esc(w.situation) + '</p><p><b>Aufgabe:</b> ' + esc(w.task) + '</p>' + (w.mail ? '<p class="b2o-info">' + esc(w.mail) + '</p>' : '') + '<ul>' + w.points.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' +
        '<textarea class="b2o-sel" data-k="' + k + '" rows="10" style="width:100%" placeholder="Schreiben Sie hier …">' + esc(v) + '</textarea><p class="muted" data-wc="' + k + '">' + wc + ' Wörter</p>';
    }).join('') + '<div class="notice">Der Text wird nicht automatisch bewertet. Er bleibt in diesem Browser gespeichert.</div>';
  }
  function Part(t, p) {
    var chk = st(t.id, 'chk_' + p.id), body;
    if (p.kind === 'listen') return '<h4>' + esc(p.title) + '</h4><div class="notice">' + esc(p.intro) + '</div>' + players(p) + transcript(p, false);
    if (p.kind === 'write') return '<h4>' + esc(p.title) + '</h4>' + Write(t.id, p);
    body = p.kind === 'choice' ? Choice(t.id, p, chk) : p.kind === 'match' ? Match(t.id, p, chk) : Gaps(t.id, p, chk);
    var max = Object.keys(p.key).length;
    var hint = p.audio ? ' Lies zuerst die Aufgaben, dann höre einmal.' : '';
    return '<h4>' + esc(p.title) + '</h4><p class="muted">' + esc(p.intro) + hint + '</p>' + players(p) + body + btns(p) + (chk ? bar(score(t.id, p), max) + transcript(p, true) : '');
  }
  function Sum(t) {
    var r = t.parts.filter(function (p) { return p.key; }), g = 0, m = 0;
    var rows = r.map(function (p) { var d = st(t.id, 'chk_' + p.id), s = score(t.id, p), x = Object.keys(p.key).length; if (d) { g += s; m += x; } return '<tr><td>' + esc(p.label) + '</td><td>' + (d ? s + ' / ' + x : '— / ' + x) + '</td><td>' + (d ? Math.round(100 * s / x) + ' %' : '–') + '</td></tr>'; }).join('');
    return '<h4>Auswertung · ' + esc(t.title) + '</h4><p class="muted">Rohpunkte (1 Punkt je Aufgabe) der Teile, die du schon geprüft hast. Die offizielle Umrechnung in Punkte (Testheft S. 47) wird hier nicht angewandt.</p><table class="b2o-tab"><tr><th>Teil</th><th>Punkte</th><th>%</th></tr>' + rows + '</table>' + (m ? '<p class="b2o-score"><b>' + g + ' / ' + m + '</b> (' + Math.round(100 * g / m) + ' %) in den geprüften Teilen</p>' : '<p class="muted">Prüfe zuerst mindestens einen Teil.</p>') + '<div class="notice">Schreiben und Sprechen werden nicht automatisch bewertet: Kriterien im Testheft (S. 43–46).</div><p class="muted">Quelle: ' + esc(t.source) + '</p>';
  }

  function part(t) { return t.parts.filter(function (p) { return p.id === sec; })[0]; }
  function render() {
    stop();
    var ids = Object.keys(D).filter(function (k) { return D[k] && D[k].parts; });
    if (!ids.length) { root.innerHTML = '<p>Keine Tests geladen.</p>'; return; }
    if (!cur || !D[cur]) cur = ids[0];
    var t = D[cur];
    if (sec !== 'sum' && !part(t)) sec = t.parts[0].id;
    var tests = ids.length > 1 ? '<div class="b2o-tabs">' + ids.map(function (k) { return '<button class="' + (k === cur ? 'primary' : '') + '" data-test="' + k + '">' + esc(D[k].title) + '</button>'; }).join('') + '</div>' : '';
    var tabs = '<div class="b2o-tabs">' + t.parts.map(function (p) { return '<button class="' + (p.id === sec ? 'primary' : '') + '" data-sec="' + p.id + '">' + esc(p.label) + '</button>'; }).join('') + '<button class="' + (sec === 'sum' ? 'primary' : '') + '" data-sec="sum">Auswertung</button></div>';
    root.innerHTML = '<div class="notice">Prüfung für den Beruf (B1·B2), nicht die allgemeine B2-Prüfung. Texte, Aufgaben und Lösungsschlüssel stammen aus dem Testheft, das du bereitgestellt hast (privater Studiengebrauch). Die Originalaudios fehlen: Die Hörtexte werden mit der Stimme deines Browsers gelesen; das Transkript erscheint nach dem Prüfen.</div>' + tests + tabs + '<div>' + (sec === 'sum' ? Sum(t) : Part(t, part(t))) + '</div>';
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.classList.contains('b2o-play')) { speak(b, audioList(part(D[cur]).audio[+b.dataset.a])); return; }
    if (b.dataset.test) { cur = b.dataset.test; render(); return; }
    if (b.dataset.sec) { sec = b.dataset.sec; render(); return; }
    if (b.dataset.act === 'chk') { st(cur, 'chk_' + b.dataset.s, true); render(); return; }
    if (b.dataset.act === 'clr') { var s = state[cur] = state[cur] || {}, pre = b.dataset.s + '_'; Object.keys(s).forEach(function (k) { if (k === 'chk_' + b.dataset.s || k.indexOf(pre) === 0) delete s[k]; }); save(state); render(); }
  });
  function onField(e) {
    var k = e.target.getAttribute('data-k'); if (!k) return;
    st(cur, k, e.target.value);
    var wc = root.querySelector('[data-wc="' + k + '"]'); if (wc) wc.textContent = (e.target.value.trim().match(/\S+/g) || []).length + ' Wörter';
  }
  root.addEventListener('change', onField);
  root.addEventListener('input', function (e) { if (e.target.tagName === 'TEXTAREA') onField(e); });
  window.addEventListener('pagehide', stop);
  window.renderOfficialBeruf = render;
  render();
})();
