(function () {
  'use strict';
  if (window.__ALO_LILA_RUNTIME_V2__) return;
  window.__ALO_LILA_RUNTIME_V2__ = true;

  var owlSvg = '<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M29 51 23 17 55 35Q80 21 105 35L137 17 131 54Q145 72 137 105Q126 143 80 148Q34 143 23 105Q15 72 29 51Z" fill="#9a76e8" stroke="#6543a5" stroke-width="4" stroke-linejoin="round"/>' +
    '<ellipse cx="56" cy="69" rx="23" ry="27" fill="#fffaf2"/><ellipse cx="104" cy="69" rx="23" ry="27" fill="#fffaf2"/>' +
    '<g fill="#322849"><circle cx="59" cy="72" r="9"/><circle cx="101" cy="72" r="9"/></g>' +
    '<g fill="#fff"><circle cx="62" cy="68" r="3.5"/><circle cx="104" cy="68" r="3.5"/></g>' +
    '<path d="M70 89 80 101 90 89Z" fill="#ffb45e" stroke="#6543a5" stroke-width="2"/>' +
    '<path class="lila-blink" d="M33 68Q56 39 79 68L79 72Q56 48 33 72Z M81 68Q104 39 127 68L127 72Q104 48 81 72Z" fill="#9a76e8"/>' +
    '<path d="M43 119Q80 139 117 119Q106 143 80 143Q54 143 43 119Z" fill="#f8e8ff" stroke="#6543a5" stroke-width="2"/>' +
    '<path d="M50 126Q80 135 110 126" fill="none" stroke="#d5b5f4" stroke-width="3" stroke-linecap="round"/>' +
    '</svg>';

  var css = document.createElement('style');
  css.id = 'alo-lila-runtime-v2-style';
  css.textContent =
    '.alo-lila-inline{display:inline-flex!important;width:1.35em;height:1.35em;vertical-align:middle;align-items:center;justify-content:center;flex-shrink:0}' +
    '.alo-lila-inline svg,.alo-lila-brand-icon svg,.alo-lila-home-hero svg{display:block;width:100%;height:100%;overflow:visible}' +
    '.alo-lila-inline .lila-blink,.alo-lila-brand-icon .lila-blink,.alo-lila-home-hero .lila-blink{transform-box:fill-box;transform-origin:center;animation:alo-lila-blink 4.2s infinite}' +
    '@keyframes alo-lila-blink{0%,43%,47%,100%{transform:scaleY(0)}45%{transform:scaleY(1)}}' +
    '.alo-lila-home-hero{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;margin:8px auto 18px;position:relative;isolation:isolate;animation:alo-lila-float 3.2s ease-in-out infinite}' +
    '.alo-lila-home-hero svg{width:clamp(170px,38vw,300px);height:auto;filter:drop-shadow(0 12px 10px #6543a526)}' +
    '.alo-lila-home-hero::after{content:"";position:absolute;z-index:-1;width:clamp(150px,33vw,260px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#e7d9ff 0%,#f6efff 65%,transparent 70%);top:12%;left:50%;transform:translateX(-50%)}' +
    '.alo-lila-home-hero .alo-lila-speech{font-weight:800;color:#6543a5;font-size:clamp(16px,3vw,21px);text-align:center}' +
    '.alo-lernreise-home{display:flex;align-items:center;gap:16px;margin:18px auto;padding:18px;max-width:900px;border:2px solid #d8c5ff;border-radius:22px;background:linear-gradient(120deg,#f1eaff,#fff 70%,#eaf8e4);color:#322849;position:relative;z-index:2}' +
    '.alo-lernreise-home .alo-lila-inline{width:72px;height:72px;flex-shrink:0}' +
    '.alo-lernreise-home h2{margin:0 0 6px;color:#57399c}.alo-lernreise-home p{margin:0 0 12px}' +
    '.alo-lernreise-home button{border:0;border-radius:12px;padding:12px 16px;background:#8057cf;color:#fff;font-weight:800;cursor:pointer}' +
    '.alo-lernreise-home button:focus-visible{outline:3px solid #322849;outline-offset:3px}' +
    '@keyframes alo-lila-float{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-8px) rotate(1deg)}}' +
    '@media(max-width:520px){.alo-lernreise-home{padding:12px;gap:10px}.alo-lernreise-home .alo-lila-inline{width:54px;height:54px}.alo-lila-home-hero svg{width:clamp(155px,48vw,230px)}}' +
    '@media(prefers-reduced-motion:reduce){.alo-lila-home-hero,.alo-lila-inline .lila-blink,.alo-lila-brand-icon .lila-blink,.alo-lila-home-hero .lila-blink{animation:none!important}}';
  if (!document.getElementById(css.id)) document.head.appendChild(css);

  function makeOwl(className) {
    var el = document.createElement('span');
    el.className = className || 'alo-lila-inline';
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', 'Lila, búho morado de ALOdeutsch');
    el.innerHTML = owlSvg;
    return el;
  }

  function getScreen(el) {
    for (var p = el; p && p !== document.body; p = p.parentElement) {
      if (p.classList && p.classList.contains('scr')) return p;
    }
    return document.getElementById('scr-dashboard') || null;
  }

  function isHome(screen) {
    if (!screen) return false;
    var id = String(screen.id || '').toLowerCase();
    var txt = String(screen.innerText || screen.textContent || '').toLowerCase();
    return /dashboard|home|welcome|start/.test(id) ||
      txt.includes('elegir mi ruta') || txt.includes('elegir ruta manualmente') ||
      txt.includes('choose your route') || txt.includes('choose route manually');
  }

  function replaceStars() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) {
      var node = walker.currentNode;
      if (/[⭐🌟★]/.test(node.nodeValue || '')) nodes.push(node);
    }
    nodes.forEach(function (node) {
      if (!node.parentNode || node.parentElement.closest('.alo-lernreise-home')) return;
      var parent = node.parentElement;
      var screen = getScreen(parent);
      var text = String(node.nodeValue || '');
      var brand = false;
      for (var p = parent, depth = 0; p && depth < 10; p = p.parentElement, depth++) {
        var classes = String(p.className || '') + ' ' + String(p.id || '');
        var label = String(p.innerText || p.textContent || '').replace(/\s+/g, ' ').trim();
        if (/logo|brand|header|nav|sidebar|menu|app-title/i.test(classes) ||
            (/^(H1|H2|HEADER|NAV)$/i.test(p.tagName) && label.length < 160) ||
            (label.length < 100 && /hola.{0,50}ola|alodeutsch/i.test(label))) {
          brand = true;
          break;
        }
      }
      var onlyStar = text.replace(/[⭐🌟★\s]/g, '') === '';
      var large = false;
      try { large = parseFloat(window.getComputedStyle(parent).fontSize) >= 34; } catch (e) {}
      var homeHero = isHome(screen) && (large || onlyStar);
      if (!brand && !homeHero) return;

      var replacement;
      if (homeHero) {
        replacement = makeOwl('alo-lila-home-hero');
        var speech = document.createElement('span');
        speech.className = 'alo-lila-speech';
        speech.textContent = '¡Vamos! Lernen macht Spass!';
        replacement.appendChild(speech);
        parent.classList.add('alo-lila-star-replaced');
      } else {
        replacement = makeOwl('alo-lila-inline');
      }
      if (onlyStar) {
        node.parentNode.replaceChild(replacement, node);
      } else {
        var frag = document.createDocumentFragment();
        var parts = text.split(/[⭐🌟★]/);
        parts.forEach(function (part, i) {
          if (part) frag.appendChild(document.createTextNode(part));
          if (i < parts.length - 1) frag.appendChild(homeHero ? makeOwl('alo-lila-home-hero') : makeOwl('alo-lila-inline'));
        });
        node.parentNode.replaceChild(frag, node);
      }
    });
  }

  function findHomeScreen() {
    var screens = Array.prototype.slice.call(document.querySelectorAll('.scr'));
    var candidate = document.getElementById('scr-dashboard');
    if (candidate) return candidate;
    var textMatch = screens.find(function (s) {
      var t = String(s.innerText || s.textContent || '').toLowerCase();
      return t.includes('elegir mi ruta') || t.includes('elegir ruta manualmente') ||
        t.includes('choose your route') || t.includes('choose route manually');
    });
    if (textMatch) return textMatch;
    return screens.find(function (s) {
      var id = String(s.id || '').toLowerCase();
      return /home|dashboard|welcome|start/.test(id) && s.getClientRects().length;
    }) || null;
  }

  function addEntry() {
    var dash = findHomeScreen();
    if (!dash || dash.querySelector('.alo-lernreise-home')) return;
    var elements = Array.prototype.slice.call(dash.querySelectorAll('button,a,[role="button"],h1,h2,h3,h4,p,div,span,strong,label'));
    var hits = elements.filter(function (el) {
      var t = String(el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      return t.length > 0 && t.length < 180 &&
        (t.includes('elegir mi ruta manualmente') || t.includes('elegir ruta manualmente') ||
         (t.includes('elegir mi ruta') && t.includes('manual')) ||
         t.includes('choose route manually') || t.includes('choose your route manually') ||
         t.includes('manually choose a route'));
    });
    hits.sort(function (a, b) {
      return String(a.innerText || a.textContent || '').trim().length -
        String(b.innerText || b.textContent || '').trim().length;
    });
    var card = document.createElement('section');
    card.className = 'alo-lernreise-home';
    card.innerHTML = '<span class="alo-lila-inline" role="img" aria-label="Lila">' + owlSvg + '</span>' +
      '<div><h2>Aprende jugando con Lernreise</h2>' +
      '<p>Misiones, historias, escucha y retos para avanzar paso a paso desde A1 hasta C1.</p>' +
      '<button type="button">Entrar a Lernreise →</button></div>';
    card.querySelector('button').addEventListener('click', function () {
      window.location.href = '/ruta-aprendizaje.html';
    });
    if (hits.length) {
      var target = hits[0];
      var section = target;
      if (/^(BUTTON|A)$/i.test(section.tagName) && section.parentElement) section = section.parentElement;
      if (section.parentElement && section.parentElement !== dash) {
        var parentText = String(section.parentElement.innerText || section.parentElement.textContent || '').trim();
        if (parentText.length < 450) section = section.parentElement;
      }
      if (section.parentNode) section.parentNode.insertBefore(card, section.nextSibling);
      else dash.insertBefore(card, dash.firstChild);
    } else {
      // Visible fallback guarantees an entry even if the copy of the manual-route
      // button changes in a later app version.
      dash.insertBefore(card, dash.firstChild);
    }
  }

  function dedupeBrandOwls() {
    var icons = Array.prototype.slice.call(document.querySelectorAll('.alo-lila-inline, .alo-lila-brand-icon'));
    var kept = 0;
    icons.forEach(function (icon) {
      if (icon.closest('.alo-lernreise-home, .alo-lila-home-hero')) return;
      kept++;
      if (kept > 1) icon.remove();
    });
  }

  function run() {
    replaceStars();
    addEntry();
    dedupeBrandOwls();
  }

  function start() {
    run();
    var queued = false;
    new MutationObserver(function () {
      if (queued) return;
      queued = true;
      Promise.resolve().then(function () {
        queued = false;
        run();
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();