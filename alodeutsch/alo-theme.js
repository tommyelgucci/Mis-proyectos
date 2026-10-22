/* Alodeutsch · gestor de tema (Auto / Claro / Oscuro)
   Guarda la preferencia en localStorage, la aplica con data-theme en <html> y la comparte con las
   pestañas del mismo origen (BroadcastChannel) y con los cursos Kontext abiertos desde la app (postMessage). */
(function () {
  'use strict';
  if (window.AloTheme) return;
  const KEY = 'alodeutsch_theme';
  const ORDER = ['auto', 'dark', 'light'];
  const NAME = { auto: 'Auto', dark: 'Oscuro', light: 'Claro' };
  const mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  const root = document.documentElement;
  let channel = null;
  try { channel = new BroadcastChannel('alodeutsch-theme'); } catch (e) { /* sin canal */ }
  const peers = []; // ventanas Kontext que han saludado

  function get() { try { const v = localStorage.getItem(KEY); return v === 'dark' || v === 'light' ? v : 'auto'; } catch (e) { return 'auto'; } }
  function resolved() { const m = get(); return m === 'auto' ? (mq && mq.matches ? 'dark' : 'light') : m; }
  function message() { return { alo: 'theme', mode: get(), resolved: resolved() }; }

  function paint() {
    const m = get();
    if (m === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', m);
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'theme-color'; document.head.appendChild(meta); }
    meta.content = resolved() === 'dark' ? '#0F1A15' : '#F4F9F4';
    root.setAttribute('data-resolved', resolved());
    autoDark();
    const bb = document.getElementById('banner-theme');
    if (bb) { bb.title = 'Tema: ' + NAME[m]; bb.textContent = m === 'auto' ? '🌓' : m === 'dark' ? '🌙' : '☀️'; }
    const btn = document.getElementById('theme-toggle-footer');
    if (btn) btn.textContent = '🌓 Tema: ' + NAME[m];
    document.querySelectorAll('[data-theme-label]').forEach(el => { el.textContent = NAME[m]; });
  }
  function broadcast() {
    const msg = message();
    try { channel && channel.postMessage(msg); } catch (e) { /* noop */ }
    for (let i = peers.length - 1; i >= 0; i--) {
      const w = peers[i];
      try { if (!w || w.closed) peers.splice(i, 1); else w.postMessage(msg, '*'); } catch (e) { peers.splice(i, 1); }
    }
  }
  function set(mode) {
    if (!ORDER.includes(mode)) mode = 'auto';
    try { if (mode === 'auto') localStorage.removeItem(KEY); else localStorage.setItem(KEY, mode); } catch (e) { /* noop */ }
    paint(); broadcast();
  }
  function cycle() { set(ORDER[(ORDER.indexOf(get()) + 1) % ORDER.length]); }

  // el tema "Auto" sigue al sistema en vivo
  if (mq) { const f = () => { if (get() === 'auto') { paint(); broadcast(); } }; mq.addEventListener ? mq.addEventListener('change', f) : mq.addListener(f); }
  // cambios hechos en otra pestaña de la app
  if (channel) channel.onmessage = e => { if (e.data && e.data.alo === 'theme') paint(); };
  window.addEventListener('storage', e => { if (e.key === KEY) paint(); });
  // los cursos Kontext piden el tema al abrirse (opener) y se les avisa de los cambios
  window.addEventListener('message', e => {
    const d = e.data;
    if (d && d.alo === 'kontext' && d.type === 'theme-set') { set(d.mode); return; }
    if (!d || d.alo !== 'kontext' || d.type !== 'hello' || !e.source || !e.source.postMessage) return;
    if (!peers.includes(e.source)) peers.push(e.source);
    try { e.source.postMessage(message(), '*'); } catch (err) { /* noop */ }
  });


  /* ── Oscuro automático para colores fijos ──
     Las variables cubren la mayor parte de la app, pero Lernreise, juegos y otros módulos traen colores
     escritos a mano. Mientras el tema resuelto sea oscuro se genera, a partir de las reglas CSS reales de
     la página, una hoja que invierte la luminosidad de esos colores y respeta los acentos (botones, mazos). */
  const AD = { id: 'alo-theme-auto-dark', timer: 0, obs: null };
  const COLOR_RE = /rgba?\([^()]*\)/g;
  const PROP_RE = /color|background|border|outline|shadow|fill|stroke|column-rule/;
  const TEXT_RE = /^(?:color|fill|stroke|caret-color|-webkit-text-fill-color|text-decoration-color)$/;
  function parseColor(str) {
    const m = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)/.exec(str);
    if (!m) return null;
    let a = m[4] == null ? 1 : parseFloat(m[4]); if (m[4] && /%$/.test(m[4])) a /= 100;
    return { r: +m[1], g: +m[2], b: +m[3], a };
  }
  function hexToRgb(v) {
    const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(v); if (!m) return /^rgba?\(/.test(v) ? v : null;
    let h = m[1]; if (h.length === 3) h = h.replace(/./g, c => c + c);
    return `rgb(${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)})`;
  }
  function toHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
    if (!d) return [0, 0, l];
    const s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
    let h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [h * 60, s, l];
  }
  function toRgb(h, s, l) {
    h /= 360;
    const f = (p, q, t) => { if (t < 0) t += 1; if (t > 1) t -= 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < .5 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
    if (!s) { const v = Math.round(l * 255); return [v, v, v]; }
    const q = l < .5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    return [f(p, q, h + 1 / 3), f(p, q, h), f(p, q, h - 1 / 3)].map(v => Math.round(v * 255));
  }
  const isAccent = c => { const [, s, l] = toHsl(c.r, c.g, c.b); return (s >= .4 && l >= .2 && l <= .78) || (l >= .28 && l <= .66); };
  function invert(m, prop) {
    const c = parseColor(m); if (!c) return m;
    const [h, s, l] = toHsl(c.r, c.g, c.b);
    if (/shadow/.test(prop) && l < .25) return m;      // sombras negras se quedan
    if (!TEXT_RE.test(prop) && isAccent(c)) return m;  // acentos de fondo/borde (botones, mazos) se quedan
    if (TEXT_RE.test(prop) && l > .92 && c.a >= .85) return m; // texto blanco va sobre fondos de color
    const [r, g, b] = toRgb(h, s * .85, Math.min(.94, Math.max(.07, .08 + .84 * (1 - l))));
    return c.a < 1 ? `rgba(${r}, ${g}, ${b}, ${c.a})` : `rgb(${r}, ${g}, ${b})`;
  }
  function convertStyle(st) {
    const bg = parseColor(st.getPropertyValue('background-color') || '');
    const onAccent = !!(bg && bg.a >= .8 && isAccent(bg));
    const out = [];
    for (let i = 0; i < st.length; i++) {
      const p = st[i];
      if (p.startsWith('--') || !PROP_RE.test(p)) continue;
      const v = st.getPropertyValue(p);
      if (!v || v.includes('var(') || !/rgba?\(/.test(v)) continue;
      if (onAccent && (p === 'color' || p === 'caret-color' || p === '-webkit-text-fill-color')) continue; // texto sobre acento
      const nv = v.replace(COLOR_RE, m => invert(m, p));
      if (nv !== v) out.push(p + ':' + nv + (st.getPropertyPriority(p) ? ' !important' : ''));
    }
    return out.join(';');
  }
  function splitSel(sel) {
    const out = []; let d = 0, cur = '';
    for (const ch of sel) {
      if (ch === '(' || ch === '[') d++; else if (ch === ')' || ch === ']') d--;
      if (ch === ',' && d === 0) { out.push(cur.trim()); cur = ''; } else cur += ch;
    }
    out.push(cur.trim()); return out.filter(Boolean);
  }
  const PRE = ':where(:root[data-resolved="dark"])';
  function prefixSel(sel) {
    if (/#tc-root|^@/.test(sel)) return null;
    const rest = sel.replace(/^(?::root|html)(?![-\w])/, '').trim();
    return rest ? PRE + ' ' + rest : null;
  }
  function walk(rules, out) {
    for (const r of rules) {
      if (r.type === 1) {
        const decl = convertStyle(r.style); if (!decl) continue;
        const sels = splitSel(r.selectorText).map(prefixSel).filter(Boolean);
        if (sels.length) out.push(sels.join(',') + '{' + decl + '}');
      } else if (r.type === 4 || r.type === 12) {
        const inner = []; walk(r.cssRules, inner);
        if (inner.length && !/print/.test(r.conditionText || r.media && r.media.mediaText || '')) out.push('@' + (r.type === 4 ? 'media ' + r.media.mediaText : 'supports ' + r.conditionText) + '{' + inner.join('') + '}');
      }
    }
  }
  function buildDark() {
    const out = [];
    for (const sheet of Array.from(document.styleSheets)) {
      if (sheet.ownerNode && sheet.ownerNode.id === AD.id) continue;
      let rules; try { rules = sheet.cssRules; } catch (e) { continue; }
      try { walk(rules, out); } catch (e) { /* hoja rara: se omite */ }
    }
    return out.join('\n');
  }

  // atributos style="..." con colores fijos (p. ej. fichas de mundos de Lernreise)
  function fixInline(root) {
    const list = root.nodeType === 1 ? [root, ...root.querySelectorAll('[style]')] : [...root.querySelectorAll('[style]')];
    for (const el of list) {
      if (!el.hasAttribute || !el.hasAttribute('style') || el.hasAttribute('data-alo-orig') || el.closest('#tc-root')) continue;
      const raw = el.getAttribute('style');
      if (!/#[0-9a-f]{3}|rgb/i.test(raw)) continue;
      let decl = convertStyle(el.style);
      for (let i = 0; i < el.style.length; i++) { // variables personalizadas en línea (--world-color:#e0f3d9)
        const pr = el.style[i];
        if (!pr.startsWith('--')) continue;
        const col = hexToRgb(el.style.getPropertyValue(pr).trim());
        const nv = col && invert(col, 'background-color');
        if (nv && nv !== col) decl += (decl ? ';' : '') + pr + ':' + nv;
      }
      if (!decl) continue;
      el.setAttribute('data-alo-orig', raw);
      el.style.cssText = raw + ';' + decl;
    }
  }
  function restoreInline() {
    document.querySelectorAll('[data-alo-orig]').forEach(el => { el.setAttribute('style', el.getAttribute('data-alo-orig')); el.removeAttribute('data-alo-orig'); });
  }
  function autoDark() {
    let el = document.getElementById(AD.id);
    if (resolved() !== 'dark') { if (el) el.remove(); restoreInline(); return; }
    clearTimeout(AD.timer);
    AD.timer = setTimeout(() => {
      if (resolved() !== 'dark') return;
      const css = buildDark();
      el = document.getElementById(AD.id);
      if (!el) { el = document.createElement('style'); el.id = AD.id; document.head.appendChild(el); }
      el.textContent = css;
      fixInline(document.body);
    }, 60);
  }
  // CSS inyectado después (módulos, pantallas bajo demanda): regenerar
  try {
    AD.obs = new MutationObserver(muts => {
      if (resolved() !== 'dark') return;
      let inl = false;
      for (const m of muts) for (const n of m.addedNodes) {
        if (n.nodeType !== 1) continue;
        if ((n.tagName === 'STYLE' || n.tagName === 'LINK') && n.id !== AD.id) { autoDark(); return; }
        if (n.id !== AD.id) inl = true;
      }
      if (inl) { clearTimeout(AD.inl); AD.inl = setTimeout(() => { if (resolved() === 'dark') fixInline(document.body); }, 120); }
    });
    AD.obs.observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) { /* sin observer */ }
  window.addEventListener('load', () => autoDark());

  window.AloTheme = { get, set, cycle, resolved, name: () => NAME[get()], _dark: buildDark };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', paint); else paint();
})();
