(function () {
  'use strict';
  if (window.__ALO_LILA_RUNTIME_V2__) return;
  window.__ALO_LILA_RUNTIME_V2__ = true;

  var owlSvg = '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 39 17 14 42 27Q60 17 78 27L103 14 99 42Q108 56 103 78Q96 103 60 108Q24 103 17 78Q12 56 21 39Z" fill="#9a76e8" stroke="#6543a5" stroke-width="3" stroke-linejoin="round"/><path d="M24 47Q39 28 54 48Q39 64 24 47ZM66 48Q81 28 96 47Q81 64 66 48Z" fill="#c9b5ff"/><ellipse cx="42" cy="52" rx="17" ry="19" fill="#fffaf2"/><ellipse cx="78" cy="52" rx="17" ry="19" fill="#fffaf2"/><circle cx="45" cy="53" r="7" fill="#38265c"/><circle cx="75" cy="53" r="7" fill="#38265c"/><circle cx="47" cy="50" r="2.5" fill="#fff"/><circle cx="77" cy="50" r="2.5" fill="#fff"/><path d="M54 65 60 72 66 65Z" fill="#ffc95d" stroke="#8e5d2b" stroke-width="1.5"/><path d="M33 82Q60 99 87 82Q79 104 60 104Q41 104 33 82Z" fill="#f8e8ff"/><path d="M25 82 15 88 30 93M95 82 105 88 90 93" fill="none" stroke="#6543a5" stroke-width="3" stroke-linecap="round"/><path d="M44 104 41 112M76 104 79 112" stroke="#ffc95d" stroke-width="4" stroke-linecap="round"/><path d="M37 30 29 22M83 30 91 22" stroke="#b89dff" stroke-width="4" stroke-linecap="round"/></svg>'

  var miniOwlSvg = '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 39 17 14 42 27Q60 17 78 27L103 14 99 42Q108 56 103 78Q96 103 60 108Q24 103 17 78Q12 56 21 39Z" fill="#9a76e8" stroke="#6543a5" stroke-width="3" stroke-linejoin="round"/><ellipse cx="42" cy="52" rx="17" ry="19" fill="#fffaf2"/><path d="M66 52Q78 40 90 52" fill="none" stroke="#fffaf2" stroke-width="7" stroke-linecap="round"/><circle cx="45" cy="53" r="7" fill="#38265c"/><circle cx="47" cy="50" r="2.5" fill="#fff"/><path d="M54 65 60 72 66 65Z" fill="#ffc95d" stroke="#8e5d2b" stroke-width="1.5"/><path d="M36 83Q60 95 84 82Q77 101 60 101Q43 101 36 83Z" fill="#f8e8ff"/><path d="M24 82 15 88 30 93M96 82 105 88 90 93" fill="none" stroke="#6543a5" stroke-width="3" stroke-linecap="round"/></svg>';
  var cardOwlSvg = '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 39 17 14 42 27Q60 17 78 27L103 14 99 42Q108 56 103 78Q96 103 60 108Q24 103 17 78Q12 56 21 39Z" fill="#9a76e8" stroke="#6543a5" stroke-width="3" stroke-linejoin="round"/><ellipse cx="42" cy="52" rx="17" ry="19" fill="#fffaf2"/><ellipse cx="78" cy="52" rx="17" ry="19" fill="#fffaf2"/><circle cx="45" cy="53" r="7" fill="#38265c"/><circle cx="75" cy="53" r="7" fill="#38265c"/><circle cx="47" cy="50" r="2.5" fill="#fff"/><circle cx="77" cy="50" r="2.5" fill="#fff"/><path d="M54 65 60 72 66 65Z" fill="#ffc95d" stroke="#8e5d2b" stroke-width="1.5"/><path d="M25 78Q8 65 13 48Q29 53 34 75Z" fill="#c9b5ff" stroke="#6543a5" stroke-width="2"/><path d="M95 78Q112 65 107 48Q91 53 86 75Z" fill="#c9b5ff" stroke="#6543a5" stroke-width="2"/><path d="M37 84Q60 97 83 84Q76 102 60 102Q44 102 37 84Z" fill="#f8e8ff"/></svg>';

  var css = document.createElement('style');
  css.id = 'alo-lila-runtime-v2-style';
  css.textContent =
    '.alo-lila-inline,.alo-lila-brand-icon,.alo-lila-ola-icon{display:inline-flex!important;width:1em!important;height:1em!important;max-width:1em!important;max-height:1em!important;vertical-align:middle;align-items:center;justify-content:center;flex:0 0 1em!important;margin:0 .12em!important;overflow:visible}' +
    '.alo-lila-ola-icon{width:1em!important;height:1em!important;flex-basis:1em!important;max-width:1em!important;max-height:1em!important}' +
    '.alo-lila-inline svg,.alo-lila-brand-icon svg,.alo-lila-ola-icon svg{display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;overflow:visible}' +
    '.alo-lila-home-hero svg{display:block!important;width:clamp(180px,42vw,280px)!important;height:auto!important;max-width:280px!important;filter:drop-shadow(0 12px 10px #6543a526)}' +
    '.alo-lila-inline{animation:alo-lila-bob 3.8s ease-in-out infinite}.alo-lila-brand-icon,.alo-lila-ola-icon{animation:alo-lila-wiggle 4.8s ease-in-out infinite}' +
    '@keyframes alo-lila-blink{0%,43%,47%,100%{transform:scaleY(0)}45%{transform:scaleY(1)}}' +
    '.alo-lila-home-hero{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;margin:8px auto 18px;position:relative;isolation:isolate;animation:alo-lila-float 3.2s ease-in-out infinite}' +
    '.alo-lila-home-hero::after{content:"";position:absolute;z-index:-1;width:clamp(150px,33vw,260px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#e7d9ff 0%,#f6efff 65%,transparent 70%);top:12%;left:50%;transform:translateX(-50%)}' +
    '.alo-lernreise-home{display:flex;align-items:center;gap:16px;margin:18px auto;padding:18px;max-width:900px;border:2px solid #d8c5ff;border-radius:22px;background:linear-gradient(120deg,#f1eaff,#fff 70%,#eaf8e4);color:#322849;position:relative;z-index:2}' +
    '.alo-lernreise-home .alo-lila-card-icon{display:inline-flex!important;width:48px!important;height:48px!important;max-width:48px!important;max-height:48px!important;flex:0 0 48px!important;animation:alo-lila-bob 3.2s ease-in-out infinite}' +
    '.alo-lernreise-home h2{margin:0 0 6px;color:#57399c}.alo-lernreise-home p{margin:0 0 12px}' +
    '.alo-lernreise-home button{border:0;border-radius:12px;padding:12px 16px;background:#8057cf;color:#fff;font-weight:800;cursor:pointer}' +
    '.alo-lernreise-home button:focus-visible{outline:3px solid #322849;outline-offset:3px}' +
    '@keyframes alo-lila-float{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-8px) rotate(1deg)}}' +
    ' @keyframes alo-lila-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}} @keyframes alo-lila-wiggle{0%,90%,100%{transform:rotate(0)}93%{transform:rotate(-10deg)}96%{transform:rotate(8deg)}}' +
    '@media(max-width:520px){.alo-lernreise-home{padding:12px;gap:10px}.alo-lernreise-home .alo-lila-inline{width:54px;height:54px}.alo-lila-home-hero svg{width:clamp(155px,48vw,230px)}}' +
    '@media(prefers-reduced-motion:reduce){.alo-lila-home-hero,.alo-lila-inline .lila-blink,.alo-lila-brand-icon .lila-blink,.alo-lila-home-hero .lila-blink{animation:none!important}}';
  css.textContent += '\n' +
    'span.alo-lila-brand-icon.alo-lila-ola-icon, .alo-lila-ola-icon{display:inline-flex!important;position:relative!important;box-sizing:border-box!important;inline-size:1em!important;block-size:1em!important;width:1em!important;height:1em!important;min-width:1em!important;min-height:1em!important;max-width:1em!important;max-height:1em!important;flex:0 0 1em!important;align-self:center!important;overflow:hidden!important;vertical-align:middle!important;padding:0!important;margin:0 .12em!important;line-height:1!important;}' +
    'span.alo-lila-brand-icon.alo-lila-ola-icon svg, .alo-lila-ola-icon svg{display:block!important;position:absolute!important;inset:0!important;width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;max-width:100%!important;max-height:100%!important;}' + '\n';
  css.textContent += '\n' +
    'span.alo-lila-brand-icon.alo-lila-ola-icon, .alo-lila-ola-icon{display:inline-flex!important;position:relative!important;box-sizing:border-box!important;inline-size:1em!important;block-size:1em!important;width:1em!important;height:1em!important;min-width:1em!important;min-height:1em!important;max-width:1em!important;max-height:1em!important;flex:0 0 1em!important;align-self:center!important;overflow:hidden!important;vertical-align:middle!important;padding:0!important;margin:0 .12em!important;line-height:1!important;}' +
    'span.alo-lila-brand-icon.alo-lila-ola-icon svg, .alo-lila-ola-icon svg{display:block!important;position:absolute!important;inset:0!important;width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;max-width:100%!important;max-height:100%!important;}' + '\n';
  if (!document.getElementById(css.id)) document.head.appendChild(css);

  function makeOwl(className) {
    var el = document.createElement('span');
    el.className = className || 'alo-lila-inline';
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', 'Lila, búho morado de ALOdeutsch');
    el.innerHTML = className === 'alo-lila-home-hero' ? owlSvg : (className === 'alo-lila-card-icon' ? cardOwlSvg : miniOwlSvg);
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
      for (var q = parent, qd = 0; q && qd < 6; q = q.parentElement, qd++) { try { if (parseFloat(window.getComputedStyle(q).fontSize) >= 34) large = true; } catch (e) {} }
      var homeHero = isHome(screen) && large;
      if (!brand && !homeHero) return;

      var replacement;
      if (homeHero) {
        replacement = makeOwl('alo-lila-home-hero');
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
    card.innerHTML = '<span class="alo-lila-card-icon" role="img" aria-label="Lila, pequeña mascota de Lernreise">' + cardOwlSvg + '</span>' +
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
    var icons = Array.prototype.slice.call(document.querySelectorAll('.alo-lila-inline, .alo-lila-brand-icon, .alo-lila-ola-icon'));
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