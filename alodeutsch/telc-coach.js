/* Alodeutsch · Telc Coach
   Diario de errores con repaso espaciado (Leitner), simulacros por parte, corrector de Schreiben,
   práctica de Sprechen, Hören con voz del navegador, tarjetas Kontext y copia de seguridad.
   Todo funciona sin servidor; la IA (/api/coach) es opcional y nunca bloquea nada. */
(function () {
  'use strict';
  if (window.TelcCoach) return;

  const D = window.TELC_COACH_DATA || { SPEC: { parts: [] }, RUBRIC: { writing: [], speaking: [] }, REDE: { writing: {}, speaking: {} }, READ: [], LISTEN: [], WRITE: [], SPEAK: [] };
  const X = window.KONTEXT_EXTRA || { cards: {}, gaps: {} };
  const KEY = 'alodeutsch_coach_v1';
  const DAY = 864e5;
  const LV = ['b1', 'b2', 'c1'];
  const LABEL = { a1: 'A1', a2: 'A2', b1: 'telc B1', b2: 'telc B2', c1: 'telc C1', b2c1: 'B2-C1 Beruf', x: '—' };
  const SRC = { alo: 'alodeutsch', kb2: 'Kontext B2', kc1: 'Kontext C1', sim: 'Simulacro', mine: 'Mía', spk: 'Sprechen' };
  const lvOf = id => (id === 'b2c1' ? 'b2' : LV.includes(id) ? id : 'b2');

  /* ───────── utilidades ───────── */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const strip = s => String(s == null ? '' : s).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  const clip = (s, n) => strip(s).slice(0, n);
  const shuf = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const hash = s => { let x = 5381; for (let i = 0; i < s.length; i++) x = ((x * 33) ^ s.charCodeAt(i)) >>> 0; return x.toString(36); };
  const norm = s => String(s).normalize('NFC').toLowerCase().replace(/ß/g, 'ss').replace(/[.,;:!?«»"“”„]/g, '').replace(/\s+/g, ' ').trim();
  const pad = n => String(n).padStart(2, '0');
  const dayKey = (d = new Date()) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const fmtDate = t => { const d = new Date(t); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(); };
  const fmtTime = s => pad(Math.floor(s / 60)) + ':' + pad(Math.floor(s % 60));
  const words = s => (String(s).match(/[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß'-]*/g) || []);
  const toast = m => { try { if (typeof App !== 'undefined' && App.toast) return App.toast(m); } catch (e) { /* noop */ } try { alert(m); } catch (e) { /* noop */ } };
  const pct = (a, b) => (b ? Math.round(100 * a / b) : 0);

  /* ───────── almacenamiento ───────── */
  const DB = {
    d: null,
    load() {
      let d = {};
      try { d = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { d = {}; }
      d.items = d.items || {}; d.log = d.log || []; d.days = d.days || {}; d.sims = d.sims || [];
      d.writings = d.writings || []; d.speaking = d.speaking || []; d.listen = d.listen || {};
      d.kontext = d.kontext || {}; d.drafts = d.drafts || {}; d.v = 1;
      this.d = d;
    },
    save() {
      const d = this.d;
      if (d.log.length > 1500) d.log = d.log.slice(-1500);
      if (d.sims.length > 80) d.sims = d.sims.slice(-80);
      if (d.writings.length > 40) d.writings = d.writings.slice(-40);
      if (d.speaking.length > 60) d.speaking = d.speaking.slice(-60);
      const ids = Object.keys(d.items);
      if (ids.length > 2500) {
        ids.sort((a, b) => (d.items[a].box === 6) - (d.items[b].box === 6) || (d.items[a].last || d.items[a].t) - (d.items[b].last || d.items[b].t));
        ids.slice(0, ids.length - 2500).forEach(k => delete d.items[k]);
      }
      try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { toast('⚠️ No se pudo guardar: almacenamiento lleno. Haz una copia en la pestaña Copia.'); }
    }
  };
  DB.load();
  const touch = () => { const k = dayKey(); DB.d.days[k] = (DB.d.days[k] || 0) + 1; };

  /* ───────── Leitner ───────── */
  const IV = [0, 0, 1, 3, 7, 14, 60]; // días hasta el próximo repaso según la caja a la que se llega
  function itemFrom(src, lvl, q) {
    const key = src + ':' + hash(q.t + '|' + q.q + '|' + (q.o || []).join('|') + '|' + (q.ans || ''));
    let it = DB.d.items[key];
    if (!it) it = DB.d.items[key] = { id: key, src, lvl, q, box: 1, due: Date.now(), n: 0, ok: 0, bad: 0, t: Date.now() };
    return it;
  }
  function gradeItem(it, ok) {
    it.n++; it.last = Date.now();
    if (ok) { it.ok++; it.box = Math.min(6, it.box + 1); it.due = Date.now() + IV[it.box] * DAY; }
    else { it.bad++; it.box = 1; it.due = Date.now() + 10 * 60e3; }
  }
  function ingest(src, lvl, q, ok) {
    if (!q) return;
    touch();
    DB.d.log.push({ t: Date.now(), s: src, l: lvl, ok: ok ? 1 : 0 });
    const key = src + ':' + hash(q.t + '|' + q.q + '|' + (q.o || []).join('|') + '|' + (q.ans || ''));
    if (!ok) {
      const isNew = !DB.d.items[key], it = itemFrom(src, lvl, q);
      if (isNew) { it.n = 1; it.bad = 1; it.last = Date.now(); } // primer fallo: disponible ya para repasar
      else gradeItem(it, false);
    }
    else if (DB.d.items[key] && DB.d.items[key].due <= Date.now()) gradeItem(DB.d.items[key], true);
    DB.save();
  }
  const dueItems = () => Object.values(DB.d.items).filter(i => i.due <= Date.now());
  const dueCount = () => dueItems().length;

  /* ───────── captura desde alodeutsch (Quiz) ───────── */
  function qFromAlo(q) {
    const L = s => { try { return strip(typeof Lang !== 'undefined' && Lang.m ? Lang.m(s) : s); } catch (e) { return strip(s); } };
    if (!q || typeof q !== 'object') return null;
    if (q.t === 'mc' && Array.isArray(q.o) && Number.isInteger(q.a)) return { t: 'mc', q: clip(L(q.q), 400), o: q.o.slice(0, 6).map(o => clip(L(o), 200)), a: q.a, e: clip(L(q.x || ''), 500) };
    if (q.t === 'fill' && q.b) return { t: 'type', q: clip(L(q.q), 400), ans: clip(L(q.b), 300), e: clip(L(q.x || ''), 500) };
    return null;
  }
  function hookQuiz() {
    try {
      if (typeof Quiz === 'undefined' || Quiz.__tc) return;
      const start = Quiz.start;
      Quiz.start = function (cid, qs, opts) {
        opts = Object.assign({}, opts || {});
        const prev = opts.onAnswer;
        opts.onAnswer = function (q, ok) {
          try { const lv = (typeof Current !== 'undefined' && Current.levelId) || 'x'; ingest('alo', lv, qFromAlo(q), ok); refreshBadge(); } catch (e) { /* noop */ }
          if (prev) return prev.apply(this, arguments);
        };
        return start.call(this, cid, qs, opts);
      };
      Quiz.__tc = 1;
    } catch (e) { /* noop */ }
  }

  /* ───────── sincronización con los cursos Kontext ───────── */
  const seenMsg = new Set();
  const cleanArr = (a, n, m) => (Array.isArray(a) ? a.slice(0, n).map(x => clip(x, m)) : []);
  function cleanKontextQ(q) {
    if (!q || typeof q !== 'object' || q.s) return null;
    const t = q.t || 'mc', base = { q: clip(q.q, 500), e: clip(q.e, 500) };
    if (!base.q) return null;
    if (t === 'mc') {
      const o = cleanArr(q.o, 6, 250);
      if (o.length < 2 || !Number.isInteger(q.a) || q.a < 0 || q.a >= o.length) return null;
      return Object.assign(base, { t: 'mc', o, a: q.a });
    }
    if (t === 'fill') {
      const f = Array.isArray(q.f) ? q.f.slice(0, 8).map(x => cleanArr(x, 6, 80)) : [];
      if (!f.length || f.some(x => !x.length)) return null;
      return Object.assign(base, { t: 'fill', f });
    }
    if (t === 'order') {
      const w = cleanArr(q.w, 20, 60), ans = clip(q.ans, 300);
      if (w.length < 2 || !ans) return null;
      return Object.assign(base, { t: 'order', w, ans });
    }
    return null;
  }
  function cleanState(S) {
    if (!S || typeof S !== 'object') return null;
    const out = {};
    for (const k of ['xp', 'done', 'mis', 'wrong', 'box', 'hist', 'st']) if (S[k] !== undefined) out[k] = S[k];
    try { if (JSON.stringify(out).length > 250000) return null; } catch (e) { return null; }
    return out;
  }
  let channel = null;
  try { channel = new BroadcastChannel('alodeutsch-coach'); } catch (e) { /* noop */ }
  function onKontext(d, e) {
    if (!d || d.alo !== 'kontext' || typeof d.mid !== 'string' || seenMsg.has(d.mid)) return;
    if (d.lvl !== 'b2' && d.lvl !== 'c1') return;
    seenMsg.add(d.mid);
    if (seenMsg.size > 400) seenMsg.clear();
    if (d.type === 'answer') {
      const q = cleanKontextQ(d.q);
      if (q) { ingest('k' + d.lvl, d.lvl, q, !!d.ok); refreshBadge(); }
    } else if (d.type === 'state') {
      const S = cleanState(d.S);
      if (S) { DB.d.kontext[d.lvl] = { t: Date.now(), S }; DB.save(); }
    } else if (d.type === 'hello' && d.empty && DB.d.kontext[d.lvl]) {
      const msg = { alo: 'coach-restore', lvl: d.lvl, S: DB.d.kontext[d.lvl].S, mid: 'r' + Date.now().toString(36) };
      try { if (e && e.source && e.source.postMessage) e.source.postMessage(msg, '*'); } catch (err) { /* noop */ }
      try { channel && channel.postMessage(msg); } catch (err) { /* noop */ }
    }
  }
  window.addEventListener('message', e => onKontext(e.data, e));
  if (channel) channel.onmessage = e => onKontext(e.data, null);
  window.openKontext = window.openKontext || function (id) { window.open('./kontext-' + (id === 'c1' ? 'c1' : 'b2') + '.html', '_blank'); };

  /* ───────── IA opcional ───────── */
  const AI = { ok: false, checked: false };
  function aiCheck() {
    if (AI.checked || location.protocol === 'file:') return;
    AI.checked = true;
    fetch('/api/health').then(r => r.json()).then(j => { AI.ok = !!(j && j.ai); if (UI.root && !UI.root.hidden) { const b = $('#tc-ai'); if (b) b.hidden = !AI.ok; } }).catch(() => { /* sin IA */ });
  }
  function aiCall(payload) {
    const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), 35000);
    return fetch('/api/coach', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: ctrl.signal })
      .then(r => { clearTimeout(t); if (!r.ok) throw new Error('ai-' + r.status); return r.json(); });
  }

  /* ───────── voz del navegador ───────── */
  const TTS = { token: 0, voices: [] };
  function loadVoices() { try { TTS.voices = speechSynthesis.getVoices().filter(v => /^de/i.test(v.lang)); } catch (e) { TTS.voices = []; } }
  try { loadVoices(); speechSynthesis.addEventListener('voiceschanged', loadVoices); } catch (e) { /* sin TTS */ }
  const ttsOK = () => 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  function ttsStop() { TTS.token++; try { speechSynthesis.cancel(); } catch (e) { /* noop */ } }
  function ttsSay(lines, opts, done) {
    if (!ttsOK()) { if (done) done(false); return; }
    ttsStop();
    const tok = ++TTS.token, spk = [...new Set(lines.map(l => l.s || ''))];
    let i = 0;
    const next = () => {
      if (tok !== TTS.token) return;
      if (i >= lines.length) { if (done) done(true); return; }
      const l = lines[i++], u = new SpeechSynthesisUtterance(l.t), si = spk.indexOf(l.s || '');
      u.lang = 'de-DE'; u.rate = (opts && opts.rate) || 0.9;
      u.pitch = [1, 0.8, 1.2, 0.9][si % 4];
      if (TTS.voices.length) u.voice = TTS.voices[si % TTS.voices.length];
      u.onend = () => setTimeout(next, 350);
      u.onerror = () => { if (tok === TTS.token) setTimeout(next, 50); };
      try { speechSynthesis.speak(u); } catch (e) { if (done) done(false); }
    };
    next();
  }

  /* ───────── temporizadores ───────── */
  const timers = [];
  function clearTimers() { while (timers.length) clearInterval(timers.pop()); }
  function startTimer(secs, el, onEnd) {
    let left = secs;
    const draw = () => { const e = typeof el === 'string' ? $(el) : el; if (e) { e.textContent = '⏱ ' + fmtTime(left); e.classList.toggle('warn', left <= 60); } };
    draw();
    const id = setInterval(() => { left--; draw(); if (left <= 0) { clearInterval(id); if (onEnd) onEnd(); } }, 1000);
    timers.push(id);
    return { stop() { clearInterval(id); }, left: () => left };
  }

  /* ───────── estado de la interfaz ───────── */
  const UI = { root: null, tab: 'today', lvl: 'b2', rv: { src: 'all', lvl: 'all' } };
  const TABS = [['today', 'Hoy'], ['review', 'Repaso'], ['sim', 'Simulacro'], ['write', 'Schreiben'], ['speak', 'Sprechen'], ['listen', 'Hören'], ['backup', 'Copia']];
  const V = {}, ACT = {};

  function injectCss() {
    if ($('#tc-css')) return;
    const st = document.createElement('style');
    st.id = 'tc-css';
    st.textContent = `
#tc-root{position:fixed;inset:0;z-index:99995;background:var(--bg,#f4f9f4);color:var(--ink,#264035);overflow:auto;-webkit-overflow-scrolling:touch;font:15px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
#tc-root[hidden]{display:none}
#tc-root *{box-sizing:border-box}
.tc-wrap{max-width:780px;margin:0 auto;padding:0 14px 60px}
.tc-head{display:flex;align-items:center;gap:10px;padding:calc(12px + env(safe-area-inset-top)) 0 8px;position:sticky;top:0;background:var(--bg,#f4f9f4);z-index:3}
.tc-title{font:800 19px/1 system-ui;flex:1}
.tc-x{border:1.5px solid var(--border,#dceae1);background:var(--card,#fff);border-radius:12px;padding:8px 12px;font-weight:700;cursor:pointer;color:inherit}
.tc-lv,.tc-tabs{display:flex;gap:6px;overflow-x:auto;padding:4px 0 8px;scrollbar-width:none}
.tc-pill,.tc-tab{border:1.5px solid var(--border,#dceae1);background:var(--card,#fff);border-radius:999px;padding:7px 13px;font-weight:700;font-size:13px;white-space:nowrap;cursor:pointer;color:inherit}
.tc-pill.on,.tc-tab.on{background:var(--ola,#de9b1f);border-color:var(--ola,#de9b1f);color:#fff}
.tc-card{background:var(--card,#fff);border:1.5px solid var(--border,#dceae1);border-radius:18px;padding:14px 16px;margin:10px 0;box-shadow:0 1px 3px rgba(38,64,53,.06)}
.tc-card h3,.tc-card h4{margin:0 0 6px;font-size:16px}
.tc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px}
.tc-stat{background:var(--bg-alt,#eaf4f0);border-radius:14px;padding:10px 12px;text-align:center}
.tc-stat b{display:block;font-size:22px}
.tc-stat span{font-size:12px;color:var(--ink-soft,#5c7568)}
.tc-btn{border:0;border-radius:14px;padding:10px 16px;font-weight:800;background:var(--ola,#de9b1f);color:#fff;cursor:pointer;font-size:14px;text-decoration:none;display:inline-block}
.tc-btn.sec{background:var(--card,#fff);color:var(--ink,#264035);border:1.5px solid var(--border,#dceae1)}
.tc-btn.bad{background:var(--bad,#d6485b)}
.tc-btn[disabled]{opacity:.5;cursor:default}
.tc-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:8px 0}
.tc-k{color:var(--ink-soft,#5c7568);font-size:13px;margin:0 0 6px}
.tc-de{font-weight:600}
.tc-es{color:var(--ink-soft,#5c7568);font-size:13px}
.tc-chip{display:inline-block;background:var(--lav,#dcd3f2);color:var(--lav-ink,#4c3b85);border-radius:999px;padding:3px 10px;font-size:12px;font-weight:700;margin:2px 4px 2px 0}
.tc-chip.b{background:var(--sky,#bfdcf5);color:var(--sky-ink,#1a5487)}
.tc-chip.g{background:var(--sage,#bfe3cc);color:var(--sage-ink,#1f5e3c)}
.tc-chip.r{background:var(--blush,#fbd3d9);color:var(--blush-ink,#9c3a48)}
.tc-ta,.tc-in{width:100%;border:1.5px solid var(--border,#dceae1);border-radius:12px;padding:10px 12px;font:inherit;background:var(--card,#fff);color:inherit}
.tc-in.inl{display:inline-block;width:auto;min-width:90px;padding:4px 8px;margin:0 4px}
.tc-ta{min-height:240px;resize:vertical;line-height:1.6}
.tc-opt{display:block;width:100%;text-align:left;border:1.5px solid var(--border,#dceae1);background:var(--card,#fff);border-radius:12px;padding:10px 12px;margin:6px 0;cursor:pointer;font:inherit;color:inherit}
.tc-opt.ok,.tc-q label.ok{background:var(--ok-l,#e3f6ea);border-color:var(--ok,#2e9e63)}
.tc-opt.no,.tc-q label.no{background:var(--bad-l,#fcebed);border-color:var(--bad,#d6485b)}
.tc-q{border:0;padding:0;margin:14px 0}
.tc-q legend{font-weight:700;padding:0;margin-bottom:4px}
.tc-q label{display:block;border:1.5px solid var(--border,#dceae1);border-radius:12px;padding:8px 10px;margin:5px 0;cursor:pointer}
.tc-q label input{margin-right:8px}
.tc-fb{border-radius:12px;padding:10px 12px;margin:10px 0;font-size:14px}
.tc-fb.ok{background:var(--ok-l,#e3f6ea)}.tc-fb.no{background:var(--bad-l,#fcebed)}.tc-fb.info{background:var(--bg-alt,#eaf4f0)}
.tc-text p{margin:0 0 10px}
.tc-timer{font:800 17px/1 system-ui;font-variant-numeric:tabular-nums;background:var(--bg-alt,#eaf4f0);border-radius:10px;padding:6px 10px}
.tc-timer.warn{background:var(--bad-l,#fcebed);color:var(--bad,#d6485b)}
.tc-bar{height:10px;border-radius:6px;background:var(--bg-alt,#eaf4f0);overflow:hidden}
.tc-bar i{display:block;height:100%;background:var(--ola,#de9b1f)}
.tc-bar.ok i{background:var(--ok,#2e9e63)}.tc-bar.no i{background:var(--bad,#d6485b)}
.tc-list{list-style:none;padding:0;margin:0}
.tc-list li{padding:8px 0;border-bottom:1px solid var(--border,#dceae1)}
.tc-list li:last-child{border:0}
.tc-pool,.tc-built{display:flex;flex-wrap:wrap;gap:6px;min-height:42px;border:1.5px dashed var(--border,#dceae1);border-radius:12px;padding:8px;margin:8px 0}
.tc-ch{border:1.5px solid var(--border,#dceae1);background:var(--card,#fff);border-radius:10px;padding:6px 10px;font:inherit;cursor:pointer;color:inherit}
.tc-rub label{display:inline-flex;align-items:center;gap:4px;margin-right:12px;cursor:pointer}
.tc-small{font-size:12px;color:var(--ink-soft,#5c7568)}
.tc-w{display:flex;align-items:flex-end;gap:4px;height:90px;margin:8px 0}
.tc-w div{flex:1;background:var(--ola,#de9b1f);border-radius:6px 6px 0 0;min-height:3px;position:relative}
.tc-w div.ok{background:var(--ok,#2e9e63)}.tc-w div.no{background:var(--bad,#d6485b)}
.tc-w span{position:absolute;top:-16px;left:0;right:0;text-align:center;font-size:10px}
details.tc-d summary{cursor:pointer;font-weight:700;margin:6px 0}
@media (prefers-color-scheme:dark){#tc-root{--bg:#121b17;--card:#1a2620;--ink:#e6efe9;--ink-soft:#9fb3a7;--border:#2c3d34;--bg-alt:#22322a;--ok-l:#1d3a2a;--bad-l:#3a1e23;--lav:#352d58;--lav-ink:#d9d0ff;--sky:#1f3750;--sky-ink:#bcdcff;--sage:#25402f;--sage-ink:#bfe9cf;--blush:#4a2530;--blush-ink:#ffd0d8}}
`;
    document.head.appendChild(st);
  }

  /* ───────── cascarón ───────── */
  function ensureRoot() {
    if (UI.root) return;
    injectCss();
    const r = document.createElement('div');
    r.id = 'tc-root'; r.hidden = true; r.setAttribute('role', 'dialog'); r.setAttribute('aria-label', 'Telc Coach');
    document.body.appendChild(r);
    r.addEventListener('click', onClick);
    r.addEventListener('input', onInput);
    r.addEventListener('change', onChange);
    r.addEventListener('keydown', onKey);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && UI.root && !UI.root.hidden) close(); });
    UI.root = r;
  }
  function open(levelId, tab) {
    ensureRoot(); aiCheck();
    if (levelId) UI.lvl = lvOf(levelId);
    UI.root.hidden = false;
    document.body.style.overflow = 'hidden';
    renderShell();
    show(tab || UI.tab || 'today');
  }
  function close() {
    stopAll();
    if (UI.root) UI.root.hidden = true;
    document.body.style.overflow = '';
    refreshBadge();
  }
  function renderShell() {
    UI.root.innerHTML = `<div class="tc-wrap"><header class="tc-head"><button class="tc-x" data-a="close">← Volver</button><div class="tc-title">🧭 Telc Coach</div></header>
<div class="tc-lv">${LV.map(l => `<button class="tc-pill ${l === UI.lvl ? 'on' : ''}" data-a="lvl" data-v="${l}">${LABEL[l]}</button>`).join('')}</div>
<nav class="tc-tabs">${TABS.map(t => `<button class="tc-tab ${t[0] === UI.tab ? 'on' : ''}" data-a="tab" data-v="${t[0]}">${t[1]}</button>`).join('')}</nav><main id="tc-body"></main></div>`;
  }
  function show(tab) {
    stopAll();
    UI.tab = tab;
    $$('.tc-tab', UI.root).forEach(b => b.classList.toggle('on', b.dataset.v === tab));
    $$('.tc-pill', UI.root).forEach(b => b.classList.toggle('on', b.dataset.v === UI.lvl));
    body().innerHTML = (V[tab] || V.today)();
    UI.root.scrollTop = 0;
  }
  const body = () => $('#tc-body', UI.root);
  function setBody(html) { body().innerHTML = html; UI.root.scrollTop = 0; }
  function stopAll() {
    clearTimers(); ttsStop();
    try { SP.stop && SP.stop(); } catch (e) { /* noop */ }
  }

  /* ───────── eventos ───────── */
  function onClick(e) {
    const el = e.target.closest('[data-a]');
    if (!el || !UI.root.contains(el)) return;
    const fn = ACT[el.dataset.a];
    if (fn) fn(el, e);
  }
  function onInput(e) {
    const t = e.target;
    if (t.id === 'wr-text') { WR.text = t.value; updateCount(); saveDraft(); }
    if (t.id === 'sp-text') SP.text = t.value;
  }
  function onChange(e) {
    const t = e.target;
    if (t.matches && t.matches('[data-a="rv-f"]')) { UI.rv[t.dataset.k] = t.value; show('review'); }
    if (t.id === 'bk-file') bkPreview(t.files && t.files[0]);
  }
  function onKey(e) {
    if (e.key === 'Enter' && e.target.matches && e.target.matches('.tc-in[data-enter]')) { e.preventDefault(); const f = ACT[e.target.dataset.enter]; if (f) f(e.target, e); }
  }
  ACT.close = () => close();
  ACT.tab = el => show(el.dataset.v);
  ACT.lvl = el => { UI.lvl = el.dataset.v; show(UI.tab); };
  ACT.go = el => show(el.dataset.v);

  /* ───────── helpers de preguntas de opción múltiple ───────── */
  const LET = 'ABCD';
  function setHtml(sets, prefix) {
    return sets.map((s, si) => `${s.title ? `<div class="tc-card"><h3>${esc(s.title)}</h3>${s.kind ? `<p class="tc-k">${esc(s.kind)}</p>` : ''}${s.text ? `<div class="tc-text">${s.text.map(p => `<p>${esc(p)}</p>`).join('')}</div>` : ''}` : '<div class="tc-card">'}
${s.qs.map((q, qi) => `<fieldset class="tc-q" data-u="${prefix}${si}" data-i="${qi}"><legend>${qi + 1}. ${esc(q.q)}</legend>${q.o.map((o, oi) => `<label><input type="radio" name="${prefix}${si}_${qi}" value="${oi}"> ${LET[oi]}) ${esc(o)}</label>`).join('')}<div class="tc-fb info" hidden></div></fieldset>`).join('')}</div>`).join('');
  }
  function setScore(sets, prefix, reveal) {
    let ok = 0, total = 0;
    sets.forEach((s, si) => s.qs.forEach((q, qi) => {
      total++;
      const fs = $(`fieldset[data-u="${prefix}${si}"][data-i="${qi}"]`, UI.root);
      const sel = fs && fs.querySelector(`input[name="${prefix}${si}_${qi}"]:checked`);
      const good = !!sel && +sel.value === q.a;
      if (good) ok++;
      if (reveal && fs) {
        $$('label', fs).forEach((lab, oi) => { lab.classList.toggle('ok', oi === q.a); lab.classList.toggle('no', !!sel && +sel.value === oi && oi !== q.a); });
        $$('input', fs).forEach(i => { i.disabled = true; });
        const fb = $('.tc-fb', fs); fb.hidden = false; fb.className = 'tc-fb ' + (good ? 'ok' : 'no');
        fb.innerHTML = (good ? '✅ Correcto. ' : sel ? `❌ La respuesta es <b>${LET[q.a]}</b>. ` : `⚪ Sin responder. Respuesta: <b>${LET[q.a]}</b>. `) + esc(q.e || '');
      }
    }));
    return { ok, total, pct: pct(ok, total) };
  }

  /* ═════════════════════ HOY ═════════════════════ */
  function calcStreak() {
    let n = 0; const d = new Date();
    if (!DB.d.days[dayKey(d)]) d.setDate(d.getDate() - 1);
    while (DB.d.days[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function acc7() {
    const lim = Date.now() - 7 * DAY, l = DB.d.log.filter(x => x.t >= lim);
    return l.length ? pct(l.filter(x => x.ok).length, l.length) : null;
  }
  const lastOf = (arr, lvl) => [...arr].reverse().find(x => x.lvl === lvl);
  V.today = () => {
    const due = dueCount(), st = calcStreak(), ac = acc7(), sim = lastOf(DB.d.sims.filter(x => x.mode === 'full'), UI.lvl);
    const week = Date.now() - 7 * DAY;
    const did = (arr) => arr.some(x => x.lvl === UI.lvl && x.t >= week);
    const tips = [];
    if (due) tips.push(['review', `🔁 Repasa tus ${due} pendientes (5–10 min)`]);
    if (!did(DB.d.writings)) tips.push(['write', '✍️ Haz una tarea de Schreiben esta semana']);
    if (!did(DB.d.speaking)) tips.push(['speak', '🎤 Practica Sprechen: una intervención de 3 min']);
    if (!Object.values(DB.d.listen).some(x => x.lvl === UI.lvl && x.t >= week)) tips.push(['listen', '🎧 Escucha un audio y responde']);
    if (!did(DB.d.sims)) tips.push(['sim', '⏱ Un simulacro semanal te muestra tus puntos débiles']);
    const last = Number(DB.d.lastBackup || 0), hasData = Object.keys(DB.d.items).length || DB.d.sims.length || DB.d.writings.length;
    return `<div class="tc-card"><div class="tc-grid">
<div class="tc-stat"><b>${due}</b><span>pendientes de repaso</span></div>
<div class="tc-stat"><b>${st}${st ? ' 🔥' : ''}</b><span>días seguidos</span></div>
<div class="tc-stat"><b>${ac == null ? '—' : ac + '%'}</b><span>aciertos (7 días)</span></div>
<div class="tc-stat"><b>${sim ? Math.round(sim.total) + '%' : '—'}</b><span>último simulacro ${LABEL[UI.lvl]}</span></div></div></div>
<div class="tc-card"><h3>Plan sugerido para hoy · ${LABEL[UI.lvl]}</h3>${tips.length ? `<ul class="tc-list">${tips.map(t => `<li><button class="tc-btn sec" data-a="go" data-v="${t[0]}">${t[1]}</button></li>`).join('')}</ul>` : '<p>¡Todo al día! Repite un simulacro para comprobar tu progreso.</p>'}</div>
${UI.lvl !== 'b1' ? `<div class="tc-card"><h3>Curso Kontext ${UI.lvl.toUpperCase()} Intensiv</h3><p class="tc-small">Lecciones, tablas, trucos y misiones. Tus fallos llegan a este diario cuando lo abres desde aquí.</p><button class="tc-btn" data-a="kontext">Abrir curso →</button></div>` : ''}
${hasData && Date.now() - last > 7 * DAY ? `<div class="tc-fb info">💾 ${last ? 'Hace ' + Math.floor((Date.now() - last) / DAY) + ' días sin copia de seguridad.' : 'Aún no has hecho ninguna copia de seguridad.'} <button class="tc-btn sec" data-a="go" data-v="backup">Hacer copia</button></div>` : ''}
<p class="tc-small">Tu progreso se guarda en este navegador. ${AI.ok ? '🤖 IA disponible para Schreiben y Sprechen.' : 'Sin IA activa: el corrector usa la revisión local.'}</p>`;
  };
  ACT.kontext = () => window.openKontext(UI.lvl);

  /* ═════════════════════ REPASO ═════════════════════ */
  const RS = { queue: [], i: 0, ok: 0, ans: false, ord: [], built: [] };
  const BOXN = ['', 'Caja 1', 'Caja 2', 'Caja 3', 'Caja 4', 'Caja 5', 'Dominada'];
  V.review = () => {
    const all = Object.values(DB.d.items), due = dueItems();
    const f = UI.rv, list = all.filter(i => (f.src === 'all' || i.src === f.src) && (f.lvl === 'all' || i.lvl === f.lvl)).sort((a, b) => a.due - b.due);
    const byBox = [1, 2, 3, 4, 5, 6].map(b => all.filter(i => i.box === b).length);
    const srcs = [...new Set(all.map(i => i.src))], lvls = [...new Set(all.map(i => i.lvl))];
    return `<div class="tc-card"><h3>Diario de errores</h3><p class="tc-small">Cada fallo (en alodeutsch o en Kontext) entra aquí y vuelve a intervalos crecientes: 10 min → 1 → 3 → 7 → 14 días → dominada.</p>
<div class="tc-grid">${byBox.map((n, i) => `<div class="tc-stat"><b>${n}</b><span>${BOXN[i + 1]}</span></div>`).join('')}</div>
<div class="tc-row"><button class="tc-btn" data-a="rv-start" ${due.length ? '' : 'disabled'}>Repasar ${due.length} pendientes</button><button class="tc-btn sec" data-a="rv-start-all" ${all.length ? '' : 'disabled'}>Repasar 10 al azar</button></div></div>
<div class="tc-card"><h4>Añadir tarjeta propia</h4><input class="tc-in" id="rv-front" placeholder="Pregunta o frase en español / alemán"><div style="height:6px"></div><input class="tc-in" id="rv-back" placeholder="Respuesta o frase correcta"><div class="tc-row"><button class="tc-btn sec" data-a="rv-add">Añadir al repaso</button></div></div>
<div class="tc-card"><div class="tc-row"><label class="tc-small">Origen <select data-a="rv-f" data-k="src"><option value="all">todos</option>${srcs.map(s => `<option value="${esc(s)}" ${f.src === s ? 'selected' : ''}>${esc(SRC[s] || s)}</option>`).join('')}</select></label>
<label class="tc-small">Nivel <select data-a="rv-f" data-k="lvl"><option value="all">todos</option>${lvls.map(s => `<option value="${esc(s)}" ${f.lvl === s ? 'selected' : ''}>${esc(LABEL[s] || s)}</option>`).join('')}</select></label></div>
${list.length ? `<ul class="tc-list">${list.slice(0, 60).map(i => `<li><span class="tc-chip b">${esc(SRC[i.src] || i.src)}</span><span class="tc-chip">${esc(LABEL[i.lvl] || i.lvl)}</span><span class="tc-chip ${i.box >= 5 ? 'g' : i.box === 1 ? 'r' : ''}">${BOXN[i.box]}</span><div>${esc(i.q.q).slice(0, 180)}</div><div class="tc-small">${i.due <= Date.now() ? 'pendiente' : 'próximo: ' + fmtDate(i.due)} · ${i.ok}✓ ${i.bad}✗ <button class="tc-x" style="padding:2px 8px;font-size:12px" data-a="rv-del" data-id="${esc(i.id)}">quitar</button></div></li>`).join('')}</ul>${list.length > 60 ? `<p class="tc-small">Mostrando 60 de ${list.length}.</p>` : ''}` : '<p>Todavía no hay errores guardados. Haz un quiz o abre un curso Kontext desde aquí y los fallos aparecerán.</p>'}</div>`;
  };
  ACT['rv-del'] = el => { delete DB.d.items[el.dataset.id]; DB.save(); show('review'); refreshBadge(); };
  ACT['rv-add'] = () => {
    const f = clip($('#rv-front').value, 300), b = clip($('#rv-back').value, 300);
    if (!f || !b) return toast('Escribe pregunta y respuesta.');
    itemFrom('mine', UI.lvl, { t: 'self', q: f, ans: b, e: '' });
    DB.save(); show('review'); refreshBadge();
  };
  function rsStart(items) {
    RS.queue = items; RS.i = 0; RS.ok = 0;
    if (!items.length) return toast('No hay nada que repasar.');
    rsRender();
  }
  ACT['rv-start'] = () => rsStart(shuf(dueItems()).sort((a, b) => a.box - b.box).slice(0, 20));
  ACT['rv-start-all'] = () => rsStart(shuf(Object.values(DB.d.items)).slice(0, 10));
  function rsRender() {
    const it = RS.queue[RS.i];
    if (!it) return rsFinish();
    const q = it.q; RS.ans = false; RS.built = [];
    let h = `<div class="tc-card"><div class="tc-row"><span class="tc-chip b">${esc(SRC[it.src] || it.src)}</span><span class="tc-chip">${BOXN[it.box]}</span><span class="tc-small">${RS.i + 1}/${RS.queue.length}</span></div><div class="tc-bar"><i style="width:${pct(RS.i, RS.queue.length)}%"></i></div>`;
    if (q.t === 'mc') {
      RS.ord = shuf(q.o.map((o, i) => i));
      h += `<p class="tc-de">${esc(q.q)}</p>${RS.ord.map((oi, k) => `<button class="tc-opt" data-a="rs-pick" data-k="${k}">${esc(q.o[oi])}</button>`).join('')}`;
    } else if (q.t === 'fill') {
      let k = 0;
      h += `<p class="tc-de">${esc(q.q).replace(/___/g, () => `<input class="tc-in inl" data-bl="${k++}" data-enter="rs-check" autocomplete="off" autocapitalize="off" spellcheck="false">`)}</p><div class="tc-row"><button class="tc-btn" data-a="rs-check">Comprobar</button></div>`;
    } else if (q.t === 'type') {
      h += `<p class="tc-de">${esc(q.q)}</p><input class="tc-in" id="rs-type" data-enter="rs-check" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escribe la respuesta"><div class="tc-row"><button class="tc-btn" data-a="rs-check">Comprobar</button></div>`;
    } else if (q.t === 'order') {
      RS.ord = shuf(q.w.map((w, i) => i));
      h += `<p class="tc-de">${esc(q.q)}</p><div class="tc-built" id="rs-built"></div><div class="tc-pool" id="rs-pool">${RS.ord.map(i => `<button class="tc-ch" data-a="rs-chip" data-i="${i}">${esc(q.w[i])}</button>`).join('')}</div><div class="tc-row"><button class="tc-btn" data-a="rs-check">Comprobar</button><button class="tc-btn sec" data-a="rs-clear">Borrar</button></div>`;
    } else {
      h += `<p class="tc-de">${esc(q.q)}</p><div class="tc-row"><button class="tc-btn" data-a="rs-show">Mostrar respuesta</button></div>`;
    }
    setBody(h + '<div id="rs-fb"></div></div>');
    const first = $('.tc-in', UI.root); if (first) first.focus();
  }
  function rsGrade(ok, html) {
    if (RS.ans) return; RS.ans = true;
    const it = RS.queue[RS.i];
    gradeItem(it, ok); touch(); DB.d.log.push({ t: Date.now(), s: 'rv', l: it.lvl, ok: ok ? 1 : 0 }); DB.save();
    if (ok) { RS.ok++; try { if (typeof Gamification !== 'undefined') Gamification.add(5); } catch (e) { /* noop */ } }
    $('#rs-fb').innerHTML = `<div class="tc-fb ${ok ? 'ok' : 'no'}">${ok ? '✅ ¡Bien!' : '❌'} ${html}</div><div class="tc-row"><button class="tc-btn" data-a="rs-next">${RS.i + 1 < RS.queue.length ? 'Siguiente →' : 'Ver resultado'}</button></div>`;
    $$('.tc-opt,.tc-ch', UI.root).forEach(b => { b.disabled = true; });
  }
  ACT['rs-pick'] = el => {
    if (RS.ans) return;
    const it = RS.queue[RS.i], q = it.q, chosen = RS.ord[+el.dataset.k], ok = chosen === q.a;
    $$('.tc-opt', UI.root).forEach((b, k) => { b.classList.toggle('ok', RS.ord[k] === q.a); b.classList.toggle('no', k === +el.dataset.k && !ok); });
    rsGrade(ok, (ok ? '' : `La respuesta es <b>${esc(q.o[q.a])}</b>. `) + esc(q.e || ''));
  };
  ACT['rs-chip'] = el => {
    if (RS.ans) return;
    RS.built.push(+el.dataset.i); el.hidden = true;
    $('#rs-built').innerHTML = RS.built.map(i => `<span class="tc-chip">${esc(RS.queue[RS.i].q.w[i])}</span>`).join('');
  };
  ACT['rs-clear'] = () => { if (RS.ans) return; RS.built = []; $('#rs-built').innerHTML = ''; $$('#rs-pool .tc-ch').forEach(b => { b.hidden = false; }); };
  ACT['rs-show'] = () => {
    const it = RS.queue[RS.i];
    $('#rs-fb').innerHTML = `<div class="tc-fb info"><b>${esc(it.q.ans)}</b></div><div class="tc-row"><button class="tc-btn" data-a="rs-know" data-v="1">Lo sabía</button><button class="tc-btn sec" data-a="rs-know" data-v="0">No lo sabía</button></div>`;
  };
  ACT['rs-know'] = el => { RS.ans = false; rsGrade(el.dataset.v === '1', esc(RS.queue[RS.i].q.ans)); };
  ACT['rs-check'] = () => {
    if (RS.ans) return;
    const it = RS.queue[RS.i], q = it.q;
    if (q.t === 'fill') {
      const ins = $$('.tc-in[data-bl]', UI.root);
      if (ins.some(i => !i.value.trim())) return toast('Completa todos los huecos.');
      const ok = ins.every((inp, k) => (q.f[k] || []).some(a => norm(a) === norm(inp.value)));
      rsGrade(ok, (ok ? '' : 'Respuesta: <b>' + esc(q.f.map(a => a[0]).join(' · ')) + '</b>. ') + esc(q.e || ''));
    } else if (q.t === 'type') {
      const v = $('#rs-type').value;
      if (!v.trim()) return;
      const ok = norm(v) === norm(q.ans);
      rsGrade(ok, (ok ? '' : 'Respuesta: <b>' + esc(q.ans) + '</b>. ') + esc(q.e || ''));
    } else if (q.t === 'order') {
      const ok = norm(RS.built.map(i => q.w[i]).join(' ')) === norm(q.ans);
      rsGrade(ok, (ok ? '' : 'Respuesta: <b>' + esc(q.ans) + '</b>. ') + esc(q.e || ''));
    }
  };
  ACT['rs-next'] = () => { RS.i++; rsRender(); };
  function rsFinish() {
    const n = RS.queue.length;
    setBody(`<div class="tc-card" style="text-align:center"><div style="font-size:44px">${pct(RS.ok, n) >= 80 ? '🏆' : pct(RS.ok, n) >= 50 ? '👍' : '📚'}</div><h3>${RS.ok}/${n} correctas</h3><p>Lo que fallaste vuelve a salir en unos minutos; lo que acertaste, más adelante.</p><div class="tc-row" style="justify-content:center"><button class="tc-btn" data-a="go" data-v="review">Volver al diario</button></div></div>`);
    refreshBadge();
  }

  /* ═════════════════════ SIMULACRO ═════════════════════ */
  const SM = { lvl: 'b2', parts: [], idx: 0, res: {}, mode: 'part', sets: null, items: null };
  const partOf = id => D.SPEC.parts.find(p => p.id === id);
  V.sim = () => {
    const rows = D.SPEC.parts.map(p => `<li><div class="tc-row"><b>${p.name}</b><span class="tc-chip ${p.oral ? 'r' : 'b'}">${p.oral ? 'oral' : 'escrito'}</span><span class="tc-small">${p.min} min · ${p.pts} pts</span><button class="tc-btn sec" data-a="sim-part" data-p="${p.id}">Solo esta parte</button></div></li>`).join('');
    const hist = DB.d.sims.filter(s => s.lvl === UI.lvl && s.mode === 'full').slice(-8);
    return `<div class="tc-card"><h3>Simulacro ${LABEL[UI.lvl]}</h3><p class="tc-small">${esc(D.SPEC.note)}</p><ul class="tc-list">${rows}</ul>
<div class="tc-row"><button class="tc-btn" data-a="sim-full">Simulacro completo (~90 min)</button></div></div>
<div class="tc-card"><h4>Historial (últimos ${hist.length})</h4>${hist.length ? `<div class="tc-w">${hist.map(s => `<div class="${s.total >= 60 ? 'ok' : 'no'}" style="height:${Math.max(3, s.total)}%" title="${fmtDate(s.t)}"><span>${Math.round(s.total)}</span></div>`).join('')}</div><p class="tc-small">Simulacros completos; barras verdes ≥ 60 %. Último: ${fmtDate(hist[hist.length - 1].t)}</p>` : '<p class="tc-small">Aún no hay simulacros completos. Las partes sueltas quedan registradas pero no se grafican.</p>'}</div>`;
  };
  function simStart(parts, mode) { SM.lvl = UI.lvl; SM.parts = parts; SM.idx = 0; SM.res = {}; SM.mode = mode; simRun(); }
  ACT['sim-full'] = () => simStart(D.SPEC.parts.map(p => p.id), 'full');
  ACT['sim-part'] = el => simStart([el.dataset.p], 'part');
  function simRun() {
    const id = SM.parts[SM.idx];
    if (!id) return simFinish();
    const p = partOf(id), head = `<div class="tc-card"><div class="tc-row"><h3 style="margin:0">${p.name}</h3><span class="tc-small">Parte ${SM.idx + 1}/${SM.parts.length}</span><span class="tc-timer" id="tc-timer"></span></div></div>`;
    if (id === 'lesen') simLesen(head, p);
    else if (id === 'sprach') simSprach(head, p);
    else if (id === 'hoeren') simHoeren(head, p);
    else if (id === 'schreiben') simSchreiben(p);
    else simSprechen(p);
  }
  function simDone(id, score, extra) {
    SM.res[id] = Math.round(score);
    const last = SM.idx + 1 >= SM.parts.length;
    $('#sim-next') && ($('#sim-next').hidden = false);
    return last;
  }
  const nextBtn = (txt) => `<div class="tc-row" id="sim-next" hidden><button class="tc-btn" data-a="sim-next">${txt}</button></div>`;
  ACT['sim-next'] = () => { SM.idx++; simRun(); };

  function simLesen(head, p) {
    const pool = D.READ.filter(r => r.lvl === SM.lvl);
    if (!pool.length) return setBody(head + '<p>No hay textos para este nivel.</p>' + `<div class="tc-row"><button class="tc-btn" data-a="sim-next">Continuar</button></div>`);
    SM.sets = shuf(pool).slice(0, 2);
    setBody(head + setHtml(SM.sets, 'rd') + `<div class="tc-row"><button class="tc-btn" data-a="lesen-submit">Entregar</button></div><div id="sim-out"></div>` + nextBtn(SM.idx + 1 >= SM.parts.length ? 'Ver resultado' : 'Siguiente parte →'));
    SM.timer = startTimer(p.min * 60, '#tc-timer', () => ACT['lesen-submit']());
  }
  ACT['lesen-submit'] = () => {
    if (!SM.sets) return;
    SM.timer && SM.timer.stop();
    const r = setScore(SM.sets, 'rd', true);
    $('#sim-out').innerHTML = `<div class="tc-fb info"><b>${r.ok}/${r.total}</b> correctas (${r.pct} %)</div>`;
    simDone('lesen', r.pct);
    SM.sets = null;
  };
  function gapPool(lvl) {
    const out = [];
    try { (LEVELS[lvl].MODS || []).forEach(m => (m.q || m.qs || []).forEach(q => { const c = qFromAlo(q); if (c && c.t === 'mc' && /_{2,}/.test(c.q) && c.o.length >= 2) out.push(c); })); } catch (e) { /* noop */ }
    ((X.gaps || {})[lvl] || []).forEach(g => out.push({ t: 'mc', q: g.q, o: g.o, a: g.a, e: g.e }));
    return out;
  }
  function simSprach(head, p) {
    const pool = shuf(gapPool(SM.lvl)).slice(0, 15);
    if (!pool.length) return setBody(head + '<p>No hay preguntas para este nivel.</p><div class="tc-row"><button class="tc-btn" data-a="sim-next">Continuar</button></div>');
    SM.items = pool.map(q => { const c = q.o[q.a], o = shuf(q.o); return { q: q.q, o, a: o.indexOf(c), e: q.e, raw: q }; });
    SM.sets = [{ qs: SM.items }];
    setBody(head + setHtml(SM.sets, 'sb') + `<div class="tc-row"><button class="tc-btn" data-a="sprach-submit">Entregar</button></div><div id="sim-out"></div>` + nextBtn(SM.idx + 1 >= SM.parts.length ? 'Ver resultado' : 'Siguiente parte →'));
    SM.timer = startTimer(p.min * 60, '#tc-timer', () => ACT['sprach-submit']());
  }
  ACT['sprach-submit'] = () => {
    if (!SM.sets || !SM.items) return;
    SM.timer && SM.timer.stop();
    const r = setScore(SM.sets, 'sb', true);
    SM.items.forEach((it, qi) => {
      const sel = $(`input[name="sb0_${qi}"]:checked`, UI.root);
      if (!sel || +sel.value !== it.a) ingest('sim', SM.lvl, { t: 'mc', q: it.raw.q, o: it.raw.o, a: it.raw.a, e: it.raw.e }, false);
    });
    refreshBadge();
    $('#sim-out').innerHTML = `<div class="tc-fb info"><b>${r.ok}/${r.total}</b> correctas (${r.pct} %). Los fallos se han añadido a tu diario.</div>`;
    simDone('sprach', r.pct);
    SM.sets = null; SM.items = null;
  };
  function simHoeren(head, p) {
    const pool = D.LISTEN.filter(l => l.lvl === SM.lvl);
    if (!pool.length) return setBody(head + '<p>No hay audios para este nivel.</p><div class="tc-row"><button class="tc-btn" data-a="sim-next">Continuar</button></div>');
    const picks = shuf(pool).slice(0, 2);
    LS.exam = true; LS.items = picks; LS.plays = {};
    SM.sets = picks.map(it => ({ title: it.title, kind: it.kind, qs: it.qs }));
    const players = picks.map((it, i) => listenPlayer(it, i, true)).join('');
    setBody(head + `<p class="tc-small">Modo examen: cada audio se puede escuchar ${picks[0].plays} veces.</p>` + players + `<div class="tc-row"><button class="tc-btn" data-a="hoeren-submit">Entregar</button></div><div id="sim-out"></div>` + nextBtn(SM.idx + 1 >= SM.parts.length ? 'Ver resultado' : 'Siguiente parte →'));
    SM.timer = startTimer(p.min * 60, '#tc-timer', () => ACT['hoeren-submit']());
  }
  ACT['hoeren-submit'] = () => {
    if (!SM.sets || !LS.items) return;
    SM.timer && SM.timer.stop(); ttsStop();
    $$('details[data-locked]', UI.root).forEach(d => { d.hidden = false; d.open = true; });
    let ok = 0, total = 0;
    LS.items.forEach((it, i) => {
      const r = lsScore(it, 'ls' + i); ok += r.ok; total += r.total;
      DB.d.listen[it.id] = { lvl: it.lvl, best: Math.max(r.pct, (DB.d.listen[it.id] || {}).best || 0), last: r.pct, t: Date.now() };
    });
    DB.save();
    $('#sim-out').innerHTML = `<div class="tc-fb info"><b>${ok}/${total}</b> correctas (${pct(ok, total)} %)</div>`;
    simDone('hoeren', pct(ok, total));
    SM.sets = null; LS.items = null; LS.exam = false;
  };
  function simSchreiben(p) {
    const pool = D.WRITE.filter(w => w.lvl === SM.lvl);
    if (!pool.length) return setBody('<p>No hay tareas para este nivel.</p><div class="tc-row"><button class="tc-btn" data-a="sim-next">Continuar</button></div>');
    wrMount(shuf(pool)[0], { sim: true, onDone: score => { SM.res.schreiben = Math.round(score); SM.idx++; simRun(); } });
  }
  function simSprechen(p) {
    const tasks = [1, 2, 3].map(n => shuf(D.SPEAK.filter(s => s.lvl === SM.lvl && s.part === n))[0]).filter(Boolean);
    if (!tasks.length) return setBody('<p>No hay tareas para este nivel.</p><div class="tc-row"><button class="tc-btn" data-a="sim-next">Continuar</button></div>');
    const scores = [];
    const step = (i) => {
      if (i >= tasks.length) { SM.res.sprechen = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length); SM.idx++; return simRun(); }
      spMount(tasks[i], { sim: true, label: `Parte ${i + 1}/${tasks.length}`, onDone: sc => { scores.push(sc); step(i + 1); } });
    };
    step(0);
  }
  function simFinish() {
    const parts = D.SPEC.parts.filter(p => SM.res[p.id] != null);
    const wavg = (arr) => { const w = arr.reduce((a, p) => a + p.pts, 0); return w ? arr.reduce((a, p) => a + SM.res[p.id] * p.pts, 0) / w : null; };
    const wr = wavg(parts.filter(p => !p.oral)), or = wavg(parts.filter(p => p.oral)), tot = wavg(parts);
    const rec = { t: Date.now(), lvl: SM.lvl, mode: SM.mode, res: Object.assign({}, SM.res), written: wr, oral: or, total: tot == null ? 0 : tot };
    DB.d.sims.push(rec); touch(); DB.save();
    const weak = parts.slice().sort((a, b) => SM.res[a.id] - SM.res[b.id]).slice(0, 2).filter(p => SM.res[p.id] < 70);
    const bar = p => `<li><div class="tc-row"><b style="min-width:170px">${p.name}</b><div class="tc-bar ${SM.res[p.id] >= 60 ? 'ok' : 'no'}" style="flex:1;min-width:100px"><i style="width:${SM.res[p.id]}%"></i></div><b>${SM.res[p.id]} %</b></div></li>`;
    const sug = { lesen: ['write', 'Lee con lápiz: subraya conectores y contrastes'], sprach: ['review', 'Repasa tus errores de gramática en el diario'], hoeren: ['listen', 'Haz más práctica de Hören con 1–2 audios al día'], schreiben: ['write', 'Practica una tarea de Schreiben y usa el revisor'], sprechen: ['speak', 'Graba una intervención de 3 minutos'] };
    setBody(`<div class="tc-card"><h3>Resultado · ${LABEL[SM.lvl]}</h3><ul class="tc-list">${parts.map(bar).join('')}</ul>
${wr != null ? `<div class="tc-fb ${wr >= 60 ? 'ok' : 'no'}">Parte escrita (estimada): <b>${Math.round(wr)} %</b> ${wr >= 60 ? '· por encima de 60 %' : '· por debajo de 60 %'}</div>` : ''}
${or != null ? `<div class="tc-fb ${or >= 60 ? 'ok' : 'no'}">Parte oral (estimada): <b>${Math.round(or)} %</b> ${or >= 60 ? '· por encima de 60 %' : '· por debajo de 60 %'}</div>` : ''}
<p class="tc-small">Es una estimación de entrenamiento (versión reducida, y Schreiben/Sprechen se puntúan por autoevaluación o IA). ${esc(D.SPEC.note)}</p></div>
${weak.length ? `<div class="tc-card"><h4>Qué reforzar</h4><ul class="tc-list">${weak.map(p => `<li><button class="tc-btn sec" data-a="go" data-v="${sug[p.id][0]}">${esc(sug[p.id][1])}</button></li>`).join('')}</ul></div>` : ''}
<div class="tc-row"><button class="tc-btn" data-a="go" data-v="sim">Volver a simulacros</button></div>`);
  }

  /* ═════════════════════ SCHREIBEN ═════════════════════ */
  const WR = { task: null, text: '', pts: [], opts: {}, ai: null };
  V.write = () => {
    const tasks = D.WRITE.filter(w => w.lvl === UI.lvl), hist = DB.d.writings.filter(w => w.lvl === UI.lvl).slice(-5).reverse();
    return `<div class="tc-card"><h3>Schreiben · ${LABEL[UI.lvl]}</h3><p class="tc-small">Escribe con cronómetro opcional, revisa con el analizador local${AI.ok ? ' o pide una corrección a la IA' : ''} y puntúate con la rúbrica. Longitudes orientativas de entrenamiento.</p></div>
${tasks.map(t => { const best = Math.max(0, ...DB.d.writings.filter(w => w.id === t.id).map(w => w.score)); const dr = DB.d.drafts[t.id]; return `<div class="tc-card"><h4>${esc(t.title)}</h4><p class="tc-k">${esc(t.kind)} · ${t.min}–${t.max} palabras · ${t.minutes} min</p><p class="tc-es">${esc(t.es)}</p><div class="tc-row"><button class="tc-btn" data-a="wr-open" data-id="${t.id}">${dr ? 'Continuar borrador' : 'Empezar'}</button>${best ? `<span class="tc-chip g">mejor ${best} %</span>` : ''}</div></div>`; }).join('') || '<p>No hay tareas para este nivel.</p>'}
${hist.length ? `<div class="tc-card"><h4>Últimos intentos</h4><ul class="tc-list">${hist.map(w => `<li>${fmtDate(w.t)} · ${esc(w.title)} · ${w.words} palabras · <b>${w.score} %</b></li>`).join('')}</ul></div>` : ''}`;
  };
  ACT['wr-open'] = el => { const t = D.WRITE.find(x => x.id === el.dataset.id); if (t) wrMount(t, {}); };
  function wrMount(task, opts) {
    WR.task = task; WR.opts = opts || {}; WR.ai = null; WR.pts = [];
    WR.text = (DB.d.drafts[task.id] && DB.d.drafts[task.id].text) || '';
    const lv = task.lvl, groups = (D.REDE.writing[lv] || []);
    const timed = !!opts.sim;
    setBody(`<div class="tc-card"><div class="tc-row"><h3 style="margin:0">${esc(task.title)}</h3>${timed ? '<span class="tc-timer" id="tc-timer"></span>' : `<button class="tc-btn sec" data-a="wr-timer">⏱ Cronómetro ${task.minutes} min</button><span class="tc-timer" id="tc-timer" hidden></span>`}</div>
<p class="tc-k">${esc(task.kind)} · ${task.min}–${task.max} palabras · ${task.minutes} min</p><p class="tc-de">${esc(task.prompt)}</p><p class="tc-es">${esc(task.es)}</p>
<ul class="tc-list">${task.points.map((p, i) => `<li><label><input type="checkbox" data-a="wr-pt" data-i="${i}"> ${esc(p)}</label></li>`).join('')}</ul>
<div class="tc-fb info">💡 ${esc(task.tip)}</div>
<details class="tc-d"><summary>Redemittel</summary>${groups.map(g => `<div><b class="tc-small">${esc(g.t)}</b><br>${g.i.map(x => `<button class="tc-ch" style="margin:2px" data-a="wr-ins" data-t="${esc(x)}">${esc(x)}</button>`).join('')}</div>`).join('')}</details></div>
<textarea class="tc-ta" id="wr-text" placeholder="Schreiben Sie hier …" spellcheck="false" autocapitalize="sentences">${esc(WR.text)}</textarea>
<div class="tc-row"><span class="tc-small" id="wr-count"></span></div>
<div class="tc-row"><button class="tc-btn" data-a="wr-check">Revisar (local)</button><button class="tc-btn sec" id="tc-ai" data-a="wr-ai" ${AI.ok ? '' : 'hidden'}>🤖 Corregir con IA</button><button class="tc-btn sec" data-a="wr-eval">Autoevaluar y guardar</button>${opts.sim ? '' : '<button class="tc-btn sec" data-a="go" data-v="write">Salir</button>'}</div>
<div id="wr-out"></div>`);
    updateCount();
    if (timed) WR.timer = startTimer(task.minutes * 60, '#tc-timer', () => { toast('⏱ Tiempo terminado: puntúa tu texto.'); ACT['wr-eval'](); });
  }
  ACT['wr-timer'] = el => { el.hidden = true; const t = $('#tc-timer'); t.hidden = false; WR.timer = startTimer(WR.task.minutes * 60, t, () => toast('⏱ Tiempo terminado.')); };
  ACT['wr-pt'] = el => { WR.pts[+el.dataset.i] = el.checked; };
  ACT['wr-ins'] = el => {
    const ta = $('#wr-text'), s = ta.selectionStart || ta.value.length, e = ta.selectionEnd || s, t = el.dataset.t.replace(/ …$/, ' ').replace(/…/g, '');
    ta.value = ta.value.slice(0, s) + t + ta.value.slice(e); ta.focus(); ta.selectionStart = ta.selectionEnd = s + t.length;
    WR.text = ta.value; updateCount(); saveDraft();
  };
  function updateCount() {
    const n = words(WR.text).length, t = WR.task, c = $('#wr-count');
    if (!c || !t) return;
    c.textContent = `${n} palabras · objetivo ${t.min}–${t.max}`;
    c.style.color = n >= t.min && n <= t.max ? 'var(--ok,#2e9e63)' : 'var(--ink-soft,#5c7568)';
  }
  let draftT = 0;
  function saveDraft() {
    clearTimeout(draftT);
    draftT = setTimeout(() => { if (WR.task) { DB.d.drafts[WR.task.id] = { text: WR.text.slice(0, 6000), t: Date.now() }; DB.save(); } }, 800);
  }
  const CONN = ['weil', 'da', 'denn', 'obwohl', 'trotzdem', 'deshalb', 'deswegen', 'daher', 'außerdem', 'jedoch', 'dennoch', 'während', 'sodass', 'damit', 'falls', 'wenn', 'zwar', 'aber', 'sondern', 'einerseits', 'andererseits', 'allerdings', 'folglich', 'somit', 'zudem', 'dagegen', 'hingegen', 'gleichwohl', 'demnach', 'nämlich', 'also', 'dass', 'ob', 'bevor', 'nachdem', 'sobald', 'indem', 'sofern', 'anstatt', 'ohne dass', 'zunächst', 'schließlich', 'abschließend', 'zusammenfassend'];
  const STOP = new Set('der die das und ich sie ist ein eine nicht zu mit auf für von den dem des im in es wir auch aber sich wie wird bei oder als an so nach hat sind war'.split(' '));
  function analyze(text, task) {
    const lc = text.toLowerCase(), ws = words(text), n = ws.length, out = [];
    const sents = text.split(/[.!?]+\s|\n+/).map(s => s.trim()).filter(Boolean);
    const add = (ok, msg) => out.push({ ok, msg });
    add(n >= task.min && n <= task.max, `Longitud: ${n} palabras (objetivo ${task.min}–${task.max}).`);
    const greet = /^(sehr geehrte|liebe[rs]?|hallo|guten tag|hi)\b/i.test(text.trim()), close = /(mit freundlichen gr|viele gr|liebe gr|herzliche gr|beste gr|bis bald|hochachtungsvoll)/i.test(text);
    if (/brief|e-mail|beschwerde|eingabe/i.test(task.kind)) { add(greet, 'Anrede al inicio (Sehr geehrte… / Liebe…).'); add(close, 'Fórmula de cierre (Mit freundlichen Grüßen / Viele Grüße).'); }
    if (task.formal) { const bad = /\b(du|dich|dir|dein\w*)\b/i.test(text); add(!bad, 'Registro formal: sin „du/dein“.'); }

    const conns = CONN.filter(c => new RegExp('(^|[^a-zäöüß])' + c + '([^a-zäöüß]|$)', 'i').test(lc));
    const need = { b1: 3, b2: 5, c1: 7 }[task.lvl] || 4;
    add(conns.length >= need, `Conectores distintos: ${conns.length} (apunta a ≥ ${need}): ${conns.slice(0, 10).join(', ') || '—'}.`);
    const sub = (text.match(/,\s*(dass|weil|obwohl|wenn|ob|damit|während|bevor|nachdem|sodass|falls|sobald|indem|sofern|der|die|das|den|dem|dessen|deren|wo|womit|worüber)\s/gi) || []).length;
    add(sub >= (task.lvl === 'b1' ? 2 : 4), `Oraciones subordinadas detectadas: ${sub}.`);
    const k2 = (lc.match(/\b(würde|würden|hätte|hätten|wäre|wären|könnte|könnten|müsste|sollte|dürfte)\b/g) || []).length;
    if (task.lvl !== 'b1') add(k2 >= 1, `Konjunktiv II (würde/hätte/wäre/könnte…): ${k2}.`);
    const starts = sents.map(s => (s.match(/^[A-Za-zÄÖÜäöüß]+/) || [''])[0].toLowerCase()).filter(Boolean);
    const ich = starts.filter(s => s === 'ich').length;
    add(!starts.length || ich / starts.length <= 0.35, `Frases que empiezan por „Ich“: ${ich}/${starts.length}. Varía el comienzo.`);
    const freq = {}; ws.map(w => w.toLowerCase()).filter(w => w.length > 4 && !STOP.has(w)).forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const rep = Object.entries(freq).filter(([, c]) => c >= 4).sort((a, b) => b[1] - a[1]).slice(0, 3);
    add(!rep.length, rep.length ? 'Palabras repetidas: ' + rep.map(([w, c]) => `${w} ×${c}`).join(', ') + '. Busca sinónimos.' : 'Sin repeticiones excesivas.');
    const avg = sents.length ? n / sents.length : 0;
    add(avg >= 8 && avg <= 24, `Longitud media de frase: ${avg.toFixed(1)} palabras.`);
    const noComma = (text.match(/[A-Za-zäöüß]\s(dass|weil|obwohl|damit|sodass)\s/gi) || []).length;
    if (noComma) add(false, `Posible coma que falta antes de dass/weil/obwohl/damit: ${noComma} caso(s). Revisa.`);
    if (task.lvl !== 'b1') { const paras = text.split(/\n\s*\n/).filter(s => s.trim()).length; add(paras >= 3, `Párrafos: ${paras} (apunta a ≥ 3 con una idea por párrafo).`); }
    const miss = task.points.filter((p, i) => !WR.pts[i]).length;
    add(miss === 0, miss ? `Te faltan ${miss} punto(s) de contenido por marcar como cubiertos.` : 'Todos los puntos de contenido cubiertos.');
    return out;
  }
  ACT['wr-check'] = () => {
    if (words(WR.text).length < 10) return toast('Escribe al menos unas frases para revisar.');
    const res = analyze(WR.text, WR.task);
    $('#wr-out').innerHTML = `<div class="tc-card"><h4>Revisión local</h4><ul class="tc-list">${res.map(r => `<li>${r.ok ? '✅' : '⚠️'} ${esc(r.msg)}</li>`).join('')}</ul><p class="tc-small">Heurística automática: no sustituye a un corrector humano.</p></div>`;
  };
  function aiHtml(r) {
    const sc = r.scores || {};
    return `<div class="tc-card"><h4>🤖 Corrección de la IA</h4><p>${esc(r.summary || '')}</p>
<div class="tc-row">${['aufgabe', 'kohaerenz', 'wortschatz', 'grammatik'].map(k => `<span class="tc-chip b">${k}: ${+sc[k] || 0}/3</span>`).join('')}</div>
${(r.strengths || []).length ? `<p><b>Bien:</b> ${r.strengths.map(esc).join(' · ')}</p>` : ''}
${(r.corrections || []).length ? `<ul class="tc-list">${r.corrections.map(c => `<li>❌ <i>${esc(c.orig)}</i><br>✅ <b>${esc(c.fix)}</b><br><span class="tc-small">${esc(c.why || '')}</span></li>`).join('')}</ul>` : '<p>Sin errores claros detectados.</p>'}
${(r.better || []).length ? `<p><b>Podrías decir:</b></p><ul class="tc-list">${r.better.map(b => `<li>${esc(b)} <button class="tc-x" style="padding:2px 8px;font-size:12px" data-a="add-phrase" data-t="${esc(b)}">+ repaso</button></li>`).join('')}</ul>` : ''}
<p class="tc-small">La IA es un modelo pequeño y puede equivocarse; contrasta con tu criterio o con un profesor.</p></div>`;
  }
  ACT['wr-ai'] = el => {
    if (words(WR.text).length < 15) return toast('Escribe al menos 15 palabras.');
    el.disabled = true; $('#wr-out').innerHTML = '<div class="tc-fb info">🤖 Revisando…</div>';
    aiCall({ mode: 'writing', level: WR.task.lvl, task: WR.task.prompt, text: WR.text }).then(r => { WR.ai = r; $('#wr-out').innerHTML = aiHtml(r); })
      .catch(() => { $('#wr-out').innerHTML = '<div class="tc-fb no">La IA no está disponible ahora. Usa «Revisar (local)».</div>'; }).finally(() => { el.disabled = false; });
  };
  ACT['add-phrase'] = el => {
    itemFrom('spk', UI.lvl, { t: 'self', q: 'Practica en voz alta (repite sin mirar): ' + clip(el.dataset.t, 40) + '…', ans: clip(el.dataset.t, 300), e: '' });
    DB.save(); el.disabled = true; el.textContent = '✓'; refreshBadge();
  };
  function rubricHtml(kind, pre) {
    return `<div class="tc-card tc-rub"><h4>Autoevaluación</h4>${D.RUBRIC[kind].map(r => `<div style="margin:10px 0"><b>${esc(r.t)}</b><div>${[0, 1, 2, 3].map(v => `<label title="${esc(r.d[v])}"><input type="radio" name="rb-${r.k}" value="${v}" ${pre && pre[r.k] === v ? 'checked' : ''}> ${v}</label>`).join('')}</div><div class="tc-small">${esc(r.d[2])}</div></div>`).join('')}
<div class="tc-row"><button class="tc-btn" data-a="${kind === 'writing' ? 'wr-save' : 'sp-save'}">Guardar</button></div></div>`;
  }
  function rubricScore(kind) {
    let sum = 0, max = 0;
    for (const r of D.RUBRIC[kind]) { const s = $(`input[name="rb-${r.k}"]:checked`, UI.root); if (!s) return null; sum += +s.value; max += 3; }
    return pct(sum, max);
  }
  ACT['wr-eval'] = () => {
    if (WR.timer) WR.timer.stop();
    if (words(WR.text).length < 5) { if (WR.opts.onDone) return WR.opts.onDone(0); return toast('Escribe tu texto antes de puntuarlo.'); }
    $('#wr-out').innerHTML = rubricHtml('writing', WR.ai && WR.ai.scores);
    $('#wr-out').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  ACT['wr-save'] = () => {
    const s = rubricScore('writing');
    if (s == null) return toast('Puntúa los 4 criterios (0–3).');
    DB.d.writings.push({ t: Date.now(), id: WR.task.id, title: WR.task.title, lvl: WR.task.lvl, words: words(WR.text).length, score: s, ai: !!WR.ai, text: WR.text.slice(0, 4000) });
    delete DB.d.drafts[WR.task.id]; touch(); DB.save();
    if (WR.opts.onDone) return WR.opts.onDone(s);
    show('write'); toast('✅ Intento guardado (' + s + ' %)');
  };

  /* ═════════════════════ SPRECHEN ═════════════════════ */
  const SP = { task: null, opts: {}, phase: 'intro', text: '', rec: null, committed: '', live: '', audio: null, t0: 0, secs: 0, turns: [], active: false, stream: null, mr: null, chunks: [], timer: null };
  const srSupported = () => !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  V.speak = () => {
    const tasks = D.SPEAK.filter(s => s.lvl === UI.lvl), parts = [...new Set(tasks.map(t => t.part))].sort();
    const hist = DB.d.speaking.filter(s => s.lvl === UI.lvl).slice(-5).reverse();
    return `<div class="tc-card"><h3>Sprechen · ${LABEL[UI.lvl]}</h3><p class="tc-small">Estructura típica: ${UI.lvl === 'b1' ? 'presentarte → hablar de un tema → planear algo en pareja' : 'presentación → discusión → resolver una tarea juntos'} (confirma el formato en tu guía telc). ${srSupported() ? 'Se transcribe lo que dices (Chrome/Edge).' : 'Tu navegador no transcribe voz: podrás escribir lo que dijiste para analizarlo.'} ${AI.ok ? 'Con IA: compañero de diálogo y comentarios.' : 'Sin IA: el compañero usa frases preparadas.'}</p></div>
${parts.map(p => `<div class="tc-card"><h4>Parte ${p} · ${esc(tasks.find(t => t.part === p).kind)}</h4>${tasks.filter(t => t.part === p).map(t => `<div class="tc-row"><div style="flex:1"><b>${esc(t.title)}</b><div class="tc-small">${Math.round(t.secs / 60 * 10) / 10} min${t.partner ? ' · con compañero' : ''}</div></div><button class="tc-btn" data-a="sp-open" data-id="${t.id}">Practicar</button></div>`).join('')}</div>`).join('') || '<p>No hay tareas para este nivel.</p>'}
${hist.length ? `<div class="tc-card"><h4>Últimos intentos</h4><ul class="tc-list">${hist.map(w => `<li>${fmtDate(w.t)} · ${esc(w.title)} · ${w.words} palabras · <b>${w.score} %</b></li>`).join('')}</ul></div>` : ''}`;
  };
  ACT['sp-open'] = el => { const t = D.SPEAK.find(x => x.id === el.dataset.id); if (t) spMount(t, {}); };
  function spMount(task, opts) {
    SP.stop && SP.stop();
    Object.assign(SP, { task, opts: opts || {}, phase: 'intro', text: '', committed: '', live: '', audio: null, secs: 0, turns: [], active: false });
    spRender();
  }
  function spRedemittel() {
    const g = D.REDE.speaking[SP.task.lvl] || [];
    return `<details class="tc-d"><summary>Redemittel útiles</summary>${g.map(x => `<div><b class="tc-small">${esc(x.t)}</b><br>${x.i.map(i => `<span class="tc-chip">${esc(i)}</span>`).join('')}</div>`).join('')}</details>`;
  }
  function spRender() {
    const t = SP.task, dialog = !!t.partner;
    if (SP.phase === 'intro') {
      setBody(`<div class="tc-card"><div class="tc-row"><h3 style="margin:0">${esc(t.title)}</h3>${SP.opts.label ? `<span class="tc-small">${esc(SP.opts.label)}</span>` : ''}</div><p class="tc-k">${esc(t.kind)} · ${Math.round(t.secs / 60 * 10) / 10} min</p><p class="tc-de">${esc(t.prompt)}</p>
<ul class="tc-list">${t.points.map(p => `<li>• ${esc(p)}</li>`).join('')}</ul><div class="tc-fb info">💡 ${esc(t.tip)}</div>${spRedemittel()}
<div class="tc-row"><button class="tc-btn sec" data-a="sp-prep">⏱ 2 min de preparación</button><button class="tc-btn" data-a="sp-go">${dialog ? 'Empezar diálogo' : 'Empezar a hablar'}</button>${SP.opts.sim ? '' : '<button class="tc-btn sec" data-a="go" data-v="speak">Salir</button>'}</div><span class="tc-timer" id="tc-timer" hidden></span></div>`);
    } else if (SP.phase === 'talk') {
      setBody(`<div class="tc-card"><div class="tc-row"><h3 style="margin:0">${esc(t.title)}</h3><span class="tc-timer" id="tc-timer"></span></div>
<ul class="tc-list">${t.points.map(p => `<li>• ${esc(p)}</li>`).join('')}</ul>${spRedemittel()}
${dialog ? '<div id="sp-dlg"></div>' : ''}
<p class="tc-small" id="sp-state">${srSupported() ? '🎙️ Escuchando… habla con naturalidad.' : '⚠️ Sin transcripción en este navegador: habla y luego escribe lo que dijiste.'}</p>
<textarea class="tc-ta" id="sp-text" style="min-height:${dialog ? 90 : 130}px" placeholder="${dialog ? 'Tu turno: se rellena al hablar, o escríbelo aquí' : 'La transcripción aparece aquí; puedes corregirla'}">${esc(SP.text)}</textarea>
<div class="tc-row">${dialog ? '<button class="tc-btn" data-a="sp-turn">Enviar turno</button>' : ''}<button class="tc-btn ${dialog ? 'sec' : ''}" data-a="sp-end">Terminar</button></div></div>`);
      if (dialog) spDlg();
    } else {
      spReview();
    }
  }
  ACT['sp-prep'] = el => { el.hidden = true; const tm = $('#tc-timer'); tm.hidden = false; SP.timer = startTimer(120, tm, () => toast('Preparación terminada')); };
  ACT['sp-go'] = () => {
    clearTimers(); SP.phase = 'talk'; SP.text = ''; SP.committed = ''; SP.live = ''; SP.turns = []; SP.t0 = Date.now(); SP.chunks = [];
    spRender();
    SP.timer = startTimer(SP.task.secs, '#tc-timer', () => { toast('⏱ Tiempo cumplido'); });
    spListen(); spRecord();
    if (SP.task.partner) spPartnerSay(SP.task.partner[0], null, true);
  };
  function spListen() {
    const R = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!R) return;
    SP.active = true;
    const run = () => {
      if (!SP.active) return;
      let rec;
      try { rec = new R(); } catch (e) { return; }
      rec.lang = 'de-DE'; rec.continuous = true; rec.interimResults = true;
      let fin = '';
      rec.onresult = e => {
        let interim = '';
        for (let i = e.resultIndex; i < e.results.length; i++) { const tx = e.results[i][0].transcript; if (e.results[i].isFinal) fin += tx + ' '; else interim += tx; }
        const ta = $('#sp-text');
        SP.text = (SP.committed + fin + interim).trim();
        if (ta) ta.value = SP.text;
      };
      rec.onerror = () => { /* se reinicia en onend */ };
      rec.onend = () => { SP.committed += fin; if (SP.active) setTimeout(run, 150); };
      try { rec.start(); SP.rec = rec; } catch (e) { /* ya activo */ }
    };
    run();
  }
  function spRecord() {
    if (!navigator.mediaDevices || !window.MediaRecorder || SP.task.partner) return;
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      if (SP.phase !== 'talk') { stream.getTracks().forEach(t => t.stop()); return; }
      SP.stream = stream;
      const mr = new MediaRecorder(stream); SP.mr = mr; SP.chunks = [];
      mr.ondataavailable = e => { if (e.data && e.data.size) SP.chunks.push(e.data); };
      mr.onstop = () => { if (SP.chunks.length) { SP.audio = URL.createObjectURL(new Blob(SP.chunks, { type: mr.mimeType || 'audio/webm' })); const a = $('#sp-audio'); if (a) a.src = SP.audio; } };
      mr.start();
    }).catch(() => { /* sin micrófono: se sigue sin grabación */ });
  }
  SP.stop = function () {
    SP.active = false;
    try { SP.rec && SP.rec.stop(); } catch (e) { /* noop */ }
    try { SP.mr && SP.mr.state !== 'inactive' && SP.mr.stop(); } catch (e) { /* noop */ }
    try { SP.stream && SP.stream.getTracks().forEach(t => t.stop()); } catch (e) { /* noop */ }
    SP.rec = null; SP.mr = null; SP.stream = null;
    ttsStop();
  };
  function spDlg() {
    const el = $('#sp-dlg'); if (!el) return;
    el.innerHTML = SP.turns.map(t => `<div class="tc-fb ${t.who === 'partner' ? 'info' : 'ok'}"><b>${t.who === 'partner' ? '🧑 Compañero/a' : '🗣 Tú'}:</b> ${esc(t.text)}${t.es ? `<div class="tc-small">${esc(t.es)}</div>` : ''}</div>`).join('');
  }
  function spPartnerSay(de, es, first) {
    SP.turns.push({ who: 'partner', text: de, es: es || '' });
    spDlg(); ttsSay([{ s: 'P', t: de }], { rate: 0.95 });
  }
  ACT['sp-turn'] = el => {
    const txt = clip($('#sp-text').value, 400);
    if (txt.length < 3) return toast('Di o escribe tu turno primero.');
    SP.turns.push({ who: 'user', text: txt });
    SP.committed = ''; SP.text = ''; $('#sp-text').value = ''; spDlg();
    const nUser = SP.turns.filter(t => t.who === 'user').length;
    const canned = SP.task.partner[Math.min(nUser, SP.task.partner.length - 1)];
    const hist = SP.turns.slice(0, -1).map(t => ({ who: t.who, text: t.text }));
    el.disabled = true;
    const reply = AI.ok ? aiCall({ mode: 'partner', level: SP.task.lvl, task: SP.task.prompt, text: txt, history: hist }).then(r => spPartnerSay(r.de, r.es)).catch(() => spPartnerSay(canned)) : Promise.resolve(spPartnerSay(canned));
    reply.finally(() => { el.disabled = false; });
  };
  ACT['sp-end'] = () => {
    const secs = Math.round((Date.now() - SP.t0) / 1000);
    SP.secs = secs; SP.stop(); clearTimers();
    if (SP.task.partner) SP.text = SP.turns.filter(t => t.who === 'user').map(t => t.text).join(' ') + ' ' + ($('#sp-text') ? $('#sp-text').value : '');
    else SP.text = ($('#sp-text') ? $('#sp-text').value : SP.text);
    SP.text = SP.text.trim();
    SP.phase = 'review'; spRender();
  };
  function spReview() {
    const t = SP.task, txt = SP.text, ws = words(txt), n = ws.length, mins = Math.max(SP.secs, 1) / 60, wpm = Math.round(n / mins);
    const fill = (txt.toLowerCase().match(/\b(äh|ähm|ehm|öh|hmm)\b/g) || []).length;
    const rede = [].concat(...(D.REDE.speaking[t.lvl] || []).map(g => g.i)).map(r => r.replace(/[….]/g, '').replace(/\s+/g, ' ').trim()).filter(r => r.length > 5);
    const used = rede.filter(r => txt.toLowerCase().includes(r.toLowerCase().split(' ').slice(0, 3).join(' ')));
    const conns = CONN.filter(c => new RegExp('(^|[^a-zäöüß])' + c + '([^a-zäöüß]|$)', 'i').test(txt.toLowerCase()));
    const tips = [];
    const target = Math.round(t.secs / 60 * 90);
    tips.push([n >= target * 0.6, `Has dicho ${n} palabras (≈ ${wpm}/min). Para ${Math.round(t.secs / 60)} min conviene llegar a ≳ ${Math.round(target * 0.6)}.`]);
    tips.push([fill <= 3, `Muletillas (äh/ähm): ${fill}.`]);
    tips.push([used.length >= 2, `Redemittel de la lista usados: ${used.length}${used.length ? ' (' + used.slice(0, 3).join(' · ') + ')' : ''}. Intenta usar al menos 2–3.`]);
    tips.push([conns.length >= 3, `Conectores distintos: ${conns.length}.`]);
    const missing = t.points.length;
    tips.push([null, `Revisa si cubriste los ${missing} puntos de la tarea: ${t.points.map(esc).join(' / ')}.`]);
    setBody(`<div class="tc-card"><h3>Revisión · ${esc(t.title)}</h3>${SP.audio ? `<audio id="sp-audio" controls src="${SP.audio}" style="width:100%"></audio>` : '<audio id="sp-audio" controls style="width:100%" hidden></audio>'}
<p class="tc-small">Transcripción (edítala si el reconocimiento falló; solo se usa para analizar):</p><textarea class="tc-ta" id="sp-text" style="min-height:120px">${esc(txt)}</textarea>
<div class="tc-row"><button class="tc-btn sec" data-a="sp-recheck">Volver a analizar</button><button class="tc-btn sec" id="tc-ai" data-a="sp-ai" ${AI.ok ? '' : 'hidden'}>🤖 Feedback de la IA</button></div>
<ul class="tc-list">${tips.map(x => `<li>${x[0] === null ? 'ℹ️' : x[0] ? '✅' : '⚠️'} ${typeof x[1] === 'string' ? x[1] : ''}</li>`).join('')}</ul><div id="sp-out"></div></div>
${rubricHtml('speaking')}
<div class="tc-card"><h4>Frase para practicar</h4><p class="tc-small">Escribe una frase que quieras decir mejor la próxima vez; irá a tu diario.</p><input class="tc-in" id="sp-phrase" placeholder="p. ej. Meiner Meinung nach spricht vieles dafür, dass …"><div class="tc-row"><button class="tc-btn sec" data-a="sp-phrase">Añadir al repaso</button></div></div>`);
  }
  ACT['sp-recheck'] = () => { SP.text = $('#sp-text').value; spReview(); };
  ACT['sp-phrase'] = () => {
    const v = clip($('#sp-phrase').value, 300); if (v.length < 6) return;
    itemFrom('spk', SP.task.lvl, { t: 'self', q: 'Practica en voz alta (repite sin mirar): ' + v.slice(0, 40) + '…', ans: v, e: '' });
    DB.save(); $('#sp-phrase').value = ''; toast('Añadida al repaso'); refreshBadge();
  };
  ACT['sp-ai'] = el => {
    const txt = $('#sp-text').value;
    if (words(txt).length < 10) return toast('Necesito una transcripción más larga.');
    el.disabled = true; $('#sp-out').innerHTML = '<div class="tc-fb info">🤖 Analizando…</div>';
    aiCall({ mode: 'speaking', level: SP.task.lvl, task: SP.task.prompt, text: txt }).then(r => { $('#sp-out').innerHTML = aiHtml(r); })
      .catch(() => { $('#sp-out').innerHTML = '<div class="tc-fb no">La IA no está disponible ahora.</div>'; }).finally(() => { el.disabled = false; });
  };
  ACT['sp-save'] = () => {
    const s = rubricScore('speaking');
    if (s == null) return toast('Puntúa los 5 criterios (0–3).');
    const txt = ($('#sp-text') && $('#sp-text').value) || SP.text, n = words(txt).length;
    DB.d.speaking.push({ t: Date.now(), id: SP.task.id, title: SP.task.title, lvl: SP.task.lvl, part: SP.task.part, secs: SP.secs, words: n, wpm: Math.round(n / (Math.max(SP.secs, 1) / 60)), score: s, text: txt.slice(0, 3000) });
    touch(); DB.save();
    if (SP.audio) { try { URL.revokeObjectURL(SP.audio); } catch (e) { /* noop */ } SP.audio = null; }
    if (SP.opts.onDone) return SP.opts.onDone(s);
    show('speak'); toast('✅ Intento guardado (' + s + ' %)');
  };

  /* ═════════════════════ HÖREN ═════════════════════ */
  const LS = { exam: false, items: null, plays: {}, rate: 0.9 };
  V.listen = () => {
    const items = D.LISTEN.filter(l => l.lvl === UI.lvl);
    return `<div class="tc-card"><h3>Hören · ${LABEL[UI.lvl]}</h3><p class="tc-small">Los audios se leen con la voz alemana de tu navegador. ${ttsOK() ? (TTS.voices.length ? '' : '⚠️ No detecto una voz alemana instalada: se usará la voz por defecto y sonará peor.') : '⚠️ Tu navegador no tiene síntesis de voz.'} Escucha, responde y solo después lee el guion.</p></div>
${items.map(it => { const r = DB.d.listen[it.id]; return `<div class="tc-card"><div class="tc-row"><div style="flex:1"><b>${esc(it.title)}</b><div class="tc-small">${esc(it.kind)} · ${it.qs.length} preguntas</div></div>${r ? `<span class="tc-chip g">mejor ${r.best} %</span>` : ''}<button class="tc-btn" data-a="ls-open" data-id="${it.id}">Abrir</button></div></div>`; }).join('') || '<p>No hay audios para este nivel.</p>'}`;
  };
  function listenPlayer(it, idx, exam) {
    const pre = 'ls' + idx, max = exam ? it.plays : 99;
    return `<div class="tc-card" data-ls="${idx}"><h3>${esc(it.title)}</h3><p class="tc-k">${esc(it.kind)}</p><div class="tc-fb info">💡 ${esc(it.tip)}</div>
<div class="tc-row"><button class="tc-btn" data-a="ls-play" data-i="${idx}">▶ Escuchar</button><button class="tc-btn sec" data-a="ls-stop">⏹</button><label class="tc-small">Velocidad <input type="range" min="0.7" max="1.1" step="0.05" value="${LS.rate}" data-a="ls-rate" style="vertical-align:middle"></label><span class="tc-small" id="ls-c${idx}">${exam ? `0/${max} escuchas` : ''}</span></div>
${setHtml([{ qs: it.qs }], pre)}
<details class="tc-d" hidden id="ls-script${idx}" data-locked="1"><summary>Guion</summary>${it.script.map(l => `<p>${l.s ? `<b>${esc(l.s)}:</b> ` : ''}${esc(l.t)}</p>`).join('')}</details></div>`;
  }
  ACT['ls-rate'] = el => { LS.rate = +el.value; };
  document.addEventListener('input', e => { if (e.target && e.target.dataset && e.target.dataset.a === 'ls-rate') LS.rate = +e.target.value; });
  ACT['ls-stop'] = () => ttsStop();
  ACT['ls-play'] = el => {
    const i = +el.dataset.i, it = LS.items[i];
    const n = (LS.plays[it.id] || 0);
    if (LS.exam && n >= it.plays) return toast(`Ya has escuchado este audio ${it.plays} veces.`);
    LS.plays[it.id] = n + 1;
    const c = $('#ls-c' + i); if (c && LS.exam) c.textContent = `${n + 1}/${it.plays} escuchas`;
    if (!ttsOK()) return toast('Tu navegador no tiene síntesis de voz: lee el guion.');
    ttsSay(it.script, { rate: LS.rate });
  };
  ACT['ls-open'] = el => {
    const it = D.LISTEN.find(x => x.id === el.dataset.id); if (!it) return;
    LS.exam = false; LS.items = [it]; LS.plays = {};
    setBody(listenPlayer(it, 0, false) + `<div class="tc-row"><button class="tc-btn" data-a="ls-check">Comprobar</button><button class="tc-btn sec" data-a="go" data-v="listen">Salir</button></div><div id="ls-out"></div>`);
  };
  const lsScore = (it, pre) => setScore([{ qs: it.qs }], pre, true);
  ACT['ls-check'] = () => {
    const it = LS.items[0], r = lsScore(it, 'ls0');
    const sc = $('#ls-script0'); if (sc) { sc.hidden = false; sc.open = true; }
    DB.d.listen[it.id] = { lvl: it.lvl, best: Math.max(r.pct, (DB.d.listen[it.id] || {}).best || 0), last: r.pct, t: Date.now() };
    touch(); DB.save();
    $('#ls-out').innerHTML = `<div class="tc-fb info"><b>${r.ok}/${r.total}</b> correctas (${r.pct} %). Lee el guion y vuelve a escuchar con el texto delante.</div>`;
  };

  /* ═════════════════════ COPIA DE SEGURIDAD ═════════════════════ */
  const KEY_RE = /^(alodeutsch|alo[-_]|c1-schreiben|b2:|c1:)/;
  function bkKeys() {
    const out = [];
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (KEY_RE.test(k)) out.push(k); } } catch (e) { /* noop */ }
    return out;
  }
  function bkBuild() {
    const keys = {};
    bkKeys().forEach(k => { try { keys[k] = localStorage.getItem(k); } catch (e) { /* noop */ } });
    return { app: 'alodeutsch', version: 1, exportedAt: new Date().toISOString(), keys };
  }
  V.backup = () => {
    const keys = bkKeys(), size = keys.reduce((a, k) => { try { return a + (localStorage.getItem(k) || '').length; } catch (e) { return a; } }, 0);
    const last = DB.d.lastBackup;
    return `<div class="tc-card"><h3>Copia de seguridad</h3><p>Tu progreso (XP, errores, intentos de Schreiben y Sprechen, borradores y ajustes) vive solo en este navegador. Si borras los datos del sitio o cambias de dispositivo, se pierde. Descarga un archivo y restáuralo cuando lo necesites.</p>
<div class="tc-grid"><div class="tc-stat"><b>${keys.length}</b><span>claves guardadas</span></div><div class="tc-stat"><b>${Math.round(size / 1024)} KB</b><span>tamaño aprox.</span></div><div class="tc-stat"><b>${last ? fmtDate(last) : '—'}</b><span>última copia</span></div></div>
<div class="tc-row"><button class="tc-btn" data-a="bk-export">⬇ Descargar copia</button></div>
${DB.d.kontext.b2 || DB.d.kontext.c1 ? '<p class="tc-small">Incluye el progreso de los cursos Kontext que se haya sincronizado desde aquí.</p>' : ''}</div>
<div class="tc-card"><h3>Restaurar</h3><input type="file" id="bk-file" accept="application/json,.json"><div id="bk-prev" class="tc-small" style="margin-top:8px"></div>
<div class="tc-row"><button class="tc-btn sec" data-a="bk-merge" disabled id="bk-merge">Combinar con lo actual</button><button class="tc-btn bad" data-a="bk-replace" disabled id="bk-replace">Reemplazar todo</button></div>
<p class="tc-small">Combinar conserva lo que ya tienes y añade lo que falta (en conflicto gana lo más reciente del diario). Reemplazar borra el progreso actual y deja el de la copia.</p></div>`;
  };
  ACT['bk-export'] = () => {
    DB.d.lastBackup = Date.now(); DB.save();
    const data = JSON.stringify(bkBuild());
    const blob = new Blob([data], { type: 'application/json' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'alodeutsch-copia-' + dayKey() + '.json';
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    show('backup');
  };
  let BK = null;
  function bkPreview(file) {
    BK = null; const out = $('#bk-prev'); if (!out) return;
    $('#bk-merge').disabled = $('#bk-replace').disabled = true;
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) { out.textContent = '❌ Archivo demasiado grande.'; return; }
    const fr = new FileReader();
    fr.onload = () => {
      try {
        const j = JSON.parse(fr.result);
        if (!j || j.app !== 'alodeutsch' || typeof j.keys !== 'object' || !j.keys) throw new Error('formato');
        const ks = Object.keys(j.keys).filter(k => KEY_RE.test(k) && typeof j.keys[k] === 'string');
        if (!ks.length) throw new Error('vacío');
        BK = { keys: ks.reduce((o, k) => { o[k] = j.keys[k]; return o; }, {}), at: j.exportedAt };
        out.textContent = `✅ Copia válida del ${j.exportedAt ? fmtDate(j.exportedAt) : '—'} con ${ks.length} claves.`;
        $('#bk-merge').disabled = $('#bk-replace').disabled = false;
      } catch (e) { out.textContent = '❌ Este archivo no es una copia de Alodeutsch válida.'; }
    };
    fr.onerror = () => { out.textContent = '❌ No se pudo leer el archivo.'; };
    fr.readAsText(file);
  }
  function mergeCoach(cur, inc) {
    const out = Object.assign({}, cur);
    out.items = Object.assign({}, cur.items);
    for (const [k, v] of Object.entries(inc.items || {})) if (!out.items[k] || (v.last || v.t || 0) > (out.items[k].last || out.items[k].t || 0)) out.items[k] = v;
    const uniq = (a, b) => { const s = new Set(a.map(x => x.t)); return a.concat((b || []).filter(x => !s.has(x.t))).sort((x, y) => x.t - y.t); };
    out.log = uniq(cur.log || [], inc.log); out.sims = uniq(cur.sims || [], inc.sims);
    out.writings = uniq(cur.writings || [], inc.writings); out.speaking = uniq(cur.speaking || [], inc.speaking);
    out.days = Object.assign({}, inc.days || {}); for (const [k, v] of Object.entries(cur.days || {})) out.days[k] = Math.max(v, out.days[k] || 0);
    out.listen = Object.assign({}, inc.listen || {}, cur.listen || {});
    out.kontext = Object.assign({}, inc.kontext || {}, cur.kontext || {});
    out.drafts = Object.assign({}, inc.drafts || {}, cur.drafts || {});
    out.lastBackup = Math.max(cur.lastBackup || 0, inc.lastBackup || 0);
    return out;
  }
  function bkApply(replace) {
    if (!BK) return;
    if (replace && !confirm('Se borrará tu progreso actual y se sustituirá por el de la copia. ¿Continuar?')) return;
    try {
      if (replace) bkKeys().forEach(k => localStorage.removeItem(k));
      for (const [k, v] of Object.entries(BK.keys)) {
        if (!replace && localStorage.getItem(k) != null) {
          if (k === KEY) { try { localStorage.setItem(k, JSON.stringify(mergeCoach(JSON.parse(localStorage.getItem(k)), JSON.parse(v)))); } catch (e) { /* conserva lo actual */ } }
          continue;
        }
        localStorage.setItem(k, v);
      }
    } catch (e) { return toast('❌ No se pudo restaurar (almacenamiento lleno o bloqueado).'); }
    toast('✅ Copia restaurada. Recargando…');
    setTimeout(() => location.reload(), 900);
  }
  ACT['bk-merge'] = () => bkApply(false);
  ACT['bk-replace'] = () => bkApply(true);

  /* ═════════════════════ TARJETAS KONTEXT ═════════════════════ */
  function nCard(s) {
    return String(s).split('\n')[0].toLowerCase().replace(/\(.*?\)/g, '').replace(/[+.,;:!?«»"“”…/]/g, ' ')
      .replace(/\b(der|die|das|dem|den|des|ein|eine|einen|einem|einer|eines|sich|akk|dat|gen|etw|jdn|jdm|jmdm|jemanden|jemandem|jemand)\b/g, ' ')
      .normalize('NFC').replace(/ß/g, 'ss').replace(/\s+/g, ' ').trim();
  }
  function installCards() {
    try {
      if (typeof LEVELS === 'undefined') return;
      const seen = new Set();
      Object.values(LEVELS).forEach(lv => (lv.DECKS || []).forEach(d => (d.cards || []).forEach(c => seen.add(nCard(c.f)))));
      ['b2', 'c1'].forEach(lv => {
        const L = LEVELS[lv], src = (X.cards || {})[lv];
        if (!L || !Array.isArray(L.DECKS) || !src || L.__kx) return;
        L.__kx = 1;
        const fresh = src.filter(c => { const k = nCard(c.de); if (!k || seen.has(k)) return false; seen.add(k); return true; });
        for (let i = 0, n = 1; i < fresh.length; i += 25, n++) {
          L.DECKS.push({ id: 9000 + (lv === 'c1' ? 100 : 0) + n, e: '🧭', title: `Kontext ${lv.toUpperCase()} · Wortschatz ${n}`, sub: 'Vocabulario y colocaciones del curso Kontext', color: lv === 'c1' ? '#4b3b95' : '#0b6e8a',
            cards: fresh.slice(i, i + 25).map(c => ({ f: c.de, fen: c.de, b: c.es, bEn: c.es, rule: `Kontext ${lv.toUpperCase()} · vocabulario`, ruleEn: `Kontext ${lv.toUpperCase()} · vocabulary`, ex: c.ex || '' })) });
        }
      });
    } catch (e) { /* noop */ }
  }

  /* ═════════════════════ banner e insignia ═════════════════════ */
  function banner(levelId) {
    const lv = lvOf(levelId), due = dueCount();
    return `<div class="center-cta" style="margin:12px 16px 18px;padding:24px 18px;background:linear-gradient(135deg,var(--butter,#fce6a6),var(--sage,#bfe3cc));border:1.5px solid var(--border);border-radius:var(--r-xl,26px)"><div style="font-size:42px">🧭</div><h2 style="font-family:'Baloo 2',system-ui;font-size:21px;color:var(--ink)">Telc Coach · ${LABEL[lv]}</h2><p style="font-size:13px;color:var(--ink-soft)">Simulacros por parte, corrector de Schreiben, práctica de Sprechen, Hören con audio y diario de errores con repaso espaciado.</p><p style="font-size:12px;color:var(--ink-faint)">${due ? due + ' ejercicios pendientes de repaso' : 'Todo al día'}</p><button class="pill-btn" onclick="TelcCoach.open('${lv}')">Abrir Telc Coach →</button></div>`;
  }
  function refreshBadge() { /* reservado: el recuento se calcula al renderizar */ }

  window.TelcCoach = { open, close, banner, dueCount, version: 1, _db: DB };

  /* ───────── arranque ───────── */
  function boot() { hookQuiz(); installCards(); }
  boot();
})();
