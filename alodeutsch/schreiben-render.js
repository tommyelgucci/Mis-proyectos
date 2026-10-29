/* Schreiben (Test GmbH B2 Brief): elige una tarea, escribe con contador y temporizador de 30 min, autoevaluación y carta de ejemplo. */
(function () {
  var D = (window.B2_SCHREIBEN || {}).tasks || [];
  var root = document.getElementById('schreibenRoot');
  if (!root || !D.length) return;
  var KEY = 'alodeutschSchreiben', mem = {};
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return mem; } }
  function save(s) { mem = s; try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  var state = load(), kind = 'Alle', cur = D[0].id, timer = null, left = 1800;
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var kinds = ['Alle'].concat(D.map(function (t) { return t.kind; }).filter(function (k, i, a) { return a.indexOf(k) === i; }));
  var CHECK = ['Anrede und Schlusssatz passen (Sehr geehrte Damen und Herren … Mit freundlichen Grüßen)', 'Alle Punkte der Aufgabe sind behandelt', 'Einleitung nennt den Grund des Schreibens', 'Förmlicher Ton (Sie, Konjunktiv II: „könnten Sie …“)', 'Verbindungen und Nebensätze (weil, obwohl, deshalb, damit)', 'Etwa 150–200 Wörter', 'Rechtschreibung und Endungen kontrolliert'];
  function words(s) { var m = s.trim().match(/\S+/g); return m ? m.length : 0; }
  function tick() { var e = root.querySelector('.sch-t'); if (!e) return; var m = Math.floor(left / 60), s = left % 60; e.textContent = '⏱ ' + m + ':' + (s < 10 ? '0' : '') + s; }
  function stopT() { if (timer) { clearInterval(timer); timer = null; } }
  function render() {
    var list = D.filter(function (t) { return kind === 'Alle' || t.kind === kind; });
    if (!list.some(function (t) { return t.id === cur; })) cur = list[0].id;
    var t = D.filter(function (x) { return x.id === cur; })[0], st = state[cur] || {};
    var h = '<p class="muted">' + D.length + ' tareas de carta (Beschwerde, Anfrage, Bewerbung …) del material de Test GmbH B2. Escribe tu carta, cuenta palabras y compárala con el ejemplo.</p>';
    h += '<div class="b2o-tabs">' + kinds.map(function (k) { return '<button class="' + (k === kind ? 'on' : '') + '" data-k="' + esc(k) + '">' + esc(k) + '</button>'; }).join('') + '</div>';
    h += '<select class="b2o-sel sch-sel">' + list.map(function (x) { return '<option value="' + x.id + '"' + (x.id === cur ? ' selected' : '') + '>' + esc(x.title) + ' (' + esc(x.kind) + ')</option>'; }).join('') + '</select>';
    h += '<div class="b2o-text">' + t.prompt.map(function (l) { return l.indexOf('• ') === 0 ? '<p>• ' + esc(l.slice(2)) + '</p>' : '<p>' + esc(l) + '</p>'; }).join('') + '</div>';
    h += '<textarea class="sch-ta" rows="12" style="width:100%;box-sizing:border-box;font:inherit;border:1.5px solid var(--line);border-radius:10px;padding:8px;background:var(--paper);color:var(--ink)" placeholder="Sehr geehrte Damen und Herren, …">' + esc(st.text || '') + '</textarea>';
    h += '<p><b class="sch-n">' + words(st.text || '') + ' Wörter</b> · <span class="sch-t">⏱ 30:00</span> <button class="sch-start">Start 30 min</button> <button class="sch-clear">Borrar</button></p>';
    h += '<div class="b2o-box" style="display:block"><b>Autocontrol</b>' + CHECK.map(function (c, i) { return '<label style="display:block"><input type="checkbox" data-c="' + i + '"' + ((st.chk || {})[i] ? ' checked' : '') + '> ' + esc(c) + '</label>'; }).join('') + '</div>';
    if (t.sample && t.sample.length) {
      h += '<details class="sch-sample"><summary>Carta de ejemplo (texto de alumno)</summary><p class="b2o-bad"><b>Ojo:</b> es un texto de un alumno, con errores. Sirve para ver estructura y frases, no como solución modelo.</p><div class="b2o-text">' + t.sample.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div></details>';
    } else h += '<p class="muted">Esta tarea no tiene carta de ejemplo en el material.</p>';
    root.innerHTML = h; tick();
    root.querySelectorAll('.b2o-tabs button').forEach(function (b) { b.onclick = function () { kind = b.getAttribute('data-k'); render(); }; });
    root.querySelector('.sch-sel').onchange = function () { cur = this.value; stopT(); left = 1800; render(); };
    var ta = root.querySelector('.sch-ta');
    ta.oninput = function () { state[cur] = state[cur] || {}; state[cur].text = ta.value; save(state); root.querySelector('.sch-n').textContent = words(ta.value) + ' Wörter'; };
    root.querySelectorAll('input[data-c]').forEach(function (c) { c.onchange = function () { state[cur] = state[cur] || {}; state[cur].chk = state[cur].chk || {}; state[cur].chk[c.getAttribute('data-c')] = c.checked; save(state); }; });
    root.querySelector('.sch-clear').onclick = function () { if (!confirm('¿Borrar tu texto?')) return; delete state[cur]; save(state); render(); };
    root.querySelector('.sch-start').onclick = function () { stopT(); left = 1800; tick(); timer = setInterval(function () { left--; tick(); if (left <= 0) stopT(); }, 1000); };
  }
  render();
})();
