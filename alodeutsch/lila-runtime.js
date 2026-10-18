(function () {
  'use strict';
  if (window.__ALO_LILA_RUNTIME_V2__) return;
  window.__ALO_LILA_RUNTIME_V2__ = true;

  var owlSvg = '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 39 17 14 42 27Q60 17 78 27L103 14 99 42Q108 56 103 78Q96 103 60 108Q24 103 17 78Q12 56 21 39Z" fill="#9a76e8" stroke="#6543a5" stroke-width="3" stroke-linejoin="round"/><path d="M24 47Q39 28 54 48Q39 64 24 47ZM66 48Q81 28 96 47Q81 64 66 48Z" fill="#c9b5ff"/><ellipse cx="42" cy="52" rx="17" ry="19" fill="#fffaf2"/><ellipse cx="78" cy="52" rx="17" ry="19" fill="#fffaf2"/><circle cx="45" cy="53" r="7" fill="#38265c"/><circle cx="75" cy="53" r="7" fill="#38265c"/><circle cx="47" cy="50" r="2.5" fill="#fff"/><circle cx="77" cy="50" r="2.5" fill="#fff"/><path d="M54 65 60 72 66 65Z" fill="#ffc95d" stroke="#8e5d2b" stroke-width="1.5"/><path d="M33 82Q60 99 87 82Q79 104 60 104Q41 104 33 82Z" fill="#f8e8ff"/><path d="M25 82 15 88 30 93M95 82 105 88 90 93" fill="none" stroke="#6543a5" stroke-width="3" stroke-linecap="round"/><path d="M44 104 41 112M76 104 79 112" stroke="#ffc95d" stroke-width="4" stroke-linecap="round"/><path d="M37 30 29 22M83 30 91 22" stroke="#b89dff" stroke-width="4" stroke-linecap="round"/></svg>'

  var miniOwlSvg = '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 39 17 14 42 27Q60 17 78 27L103 14 99 42Q108 56 103 78Q96 103 60 108Q24 103 17 78Q12 56 21 39Z" fill="#9a76e8" stroke="#6543a5" stroke-width="3" stroke-linejoin="round"/><ellipse cx="42" cy="52" rx="17" ry="19" fill="#fffaf2"/><ellipse cx="78" cy="52" rx="17" ry="19" fill="#fffaf2"/><circle cx="45" cy="53" r="7" fill="#38265c"/><circle cx="75" cy="53" r="7" fill="#38265c"/><circle cx="47" cy="50" r="2.5" fill="#fff"/><circle cx="77" cy="50" r="2.5" fill="#fff"/><path d="M54 65 60 72 66 65Z" fill="#ffc95d" stroke="#8e5d2b" stroke-width="1.5"/><path d="M25 78Q8 65 13 48Q29 53 34 75Z" fill="#c9b5ff" stroke="#6543a5" stroke-width="2"/><path d="M95 78Q112 65 107 48Q91 53 86 75Z" fill="#c9b5ff" stroke="#6543a5" stroke-width="2"/><path d="M37 84Q60 97 83 84Q76 102 60 102Q44 102 37 84Z" fill="#f8e8ff"/></svg>';
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
    '.alo-lernreise-home{display:flex;align-items:center;gap:16px;margin:18px auto;padding:18px;max-width:900px;border:2px solid #f0a23a;border-radius:22px;background:linear-gradient(120deg,#fff0d8 0%,#fffaf1 58%,#ffe0b0 100%);color:#56351b;position:relative;z-index:2}' +
    '.alo-lernreise-home .alo-lila-card-icon{display:inline-flex!important;width:48px!important;height:48px!important;max-width:48px!important;max-height:48px!important;flex:0 0 48px!important;animation:alo-lila-bob 3.2s ease-in-out infinite}' +
    ' .alo-lernreise-home h2{margin:0 0 6px;color:#a9510b}.alo-lernreise-home p{margin:0 0 12px}' +
    '.alo-lernreise-home button{border:0;border-radius:12px;padding:12px 16px;background:#e88718;color:#fff;font-weight:800;cursor:pointer;box-shadow:0 4px 0 #b85e0a}' +
    ' .alo-lernreise-home button:hover{background:#d97706}.alo-lernreise-home button:focus-visible{outline:3px solid #8a4308;outline-offset:3px}' +
    '.alo-lernreise-levels-card{border:2px solid #70b98a!important;border-radius:20px!important;background:linear-gradient(125deg,#e0f8e9 0%,#f5fff7 55%,#c8f0d4 100%)!important;color:#214c32!important;box-shadow:0 8px 22px #24784716!important;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease}' +
    '.alo-lernreise-levels-card,.alo-lernreise-levels-card p,.alo-lernreise-levels-card span,.alo-lernreise-levels-card div,.alo-lernreise-levels-card label,.alo-lernreise-levels-card li,.alo-lernreise-levels-card small{color:#183b29!important}' +
    '.alo-lernreise-levels-card h1,.alo-lernreise-levels-card h2,.alo-lernreise-levels-card h3,.alo-lernreise-levels-card h4,.alo-lernreise-levels-card strong{color:#174d2c!important;opacity:1!important}' +
    '.alo-lernreise-levels-card .alo-lila-levels-icon{display:inline-flex!important;width:1.35em!important;height:1.35em!important;vertical-align:middle!important;margin-right:.25em!important;align-items:center!important;justify-content:center!important}' +
    '.alo-lernreise-levels-card .alo-lila-levels-icon svg{display:block!important;width:100%!important;height:100%!important}' +
    '.alo-lernreise-levels-card a{color:#4b2c91!important;text-decoration:underline!important;text-underline-offset:3px;font-weight:800!important;opacity:1!important}' +
    '.alo-lernreise-levels-card button,.alo-lernreise-levels-card a[role=button]{background:#5b3ca6!important;color:#fff!important;border:2px solid #432780!important;border-radius:12px!important;padding:11px 16px!important;font-weight:800!important;opacity:1!important;text-shadow:none!important;box-shadow:0 3px 0 #38216e!important}' +
    '.alo-lernreise-levels-card button *, .alo-lernreise-levels-card a[role=button] *{color:#fff!important;opacity:1!important}' +
    '.alo-lernreise-levels-card a:hover{color:#35206d!important}.alo-lernreise-levels-card button:hover,.alo-lernreise-levels-card a[role=button]:hover{background:#432780!important;color:#fff!important}' +
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
      if (!node.parentNode || !node.parentElement) return;
      // Preserve the plates emoji on the Service Suiza Beruf card instead of
      // converting its icon into Lila's owl SVG.
      var serviceCard = false;
      for (var sp = node.parentElement, sd = 0; sp && sp !== document.body && sd < 8; sp = sp.parentElement, sd++) {
        var serviceText = String(sp.innerText || sp.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
        if (serviceText.indexOf('service suiza') !== -1 &&
            serviceText.indexOf('atendé clientes en un café suizo') !== -1 &&
            serviceText.length < 500) {
          serviceCard = true;
          break;
        }
      }
      if (serviceCard) {
        node.nodeValue = String(node.nodeValue || '').replace(/[⭐🌟★]/g, '🍽️');
        return;
      }
      if (node.parentElement.closest('.alo-lernreise-home')) return;
      var parent = node.parentElement;
      var screen = getScreen(parent);
      var text = String(node.nodeValue || '');
      var brand = false;
      var olaCall = false;
      for (var p = parent, depth = 0; p && depth < 10; p = p.parentElement, depth++) {
        var classes = String(p.className || '') + ' ' + String(p.id || '');
        var label = String(p.innerText || p.textContent || '').replace(/\s+/g, ' ').trim();
        if (/logo|brand|header|nav|sidebar|menu|app-title/i.test(classes) ||
            (/^(H1|H2|HEADER|NAV)$/i.test(p.tagName) && label.length < 160) ||
            (label.length < 100 && /hola.{0,50}ola|alodeutsch/i.test(label))) {
          brand = true;
        }
        if (/ola|call|voice|conversation|sprech|gespräch|anruf|audio/i.test(classes + ' ' + label) && label.length < 220) {
          olaCall = true;
        }
        if (brand && olaCall) break;
      }
      var onlyStar = text.replace(/[⭐🌟★\s]/g, '') === '';
      var large = false;
      for (var q = parent, qd = 0; q && qd < 6; q = q.parentElement, qd++) { try { if (parseFloat(window.getComputedStyle(q).fontSize) >= 34) large = true; } catch (e) {} }
      var homeHero = isHome(screen) && large;
      if (!brand && !homeHero && !olaCall) return;

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
      window.location.href = './ruta-aprendizaje.html';
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

  function styleLevelsCard() {
    // Never apply the green card style to either Lernreise banner or the white welcome card.
    // Clear stale classes from earlier versions first; a previous selector may have
    // accidentally painted the shared wrapper around all three dashboard choices.
    document.querySelectorAll('.alo-lernreise-levels-card')
      .forEach(function (el) { el.classList.remove('alo-lernreise-levels-card'); });

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) {
      if ((walker.currentNode.nodeValue || '').indexOf('🗺️') !== -1) nodes.push(walker.currentNode);
    }
    nodes.forEach(function (node) {
      if (!node.parentNode || !node.parentElement) return;
      var parent = node.parentElement;
      if (parent.closest('.alo-lernreise-home, .alo-lernreise-hero, .alo-lernreise-manual-hero, .alo-lila-home-hero')) return;

      // Find the nearest card-like element around the map icon. Prefer semantic/card classes,
      // and only fall back to a compact element containing the unique card copy.
      var ancestors = [];
      for (var p = parent, depth = 0; p && p !== document.body && depth < 9; p = p.parentElement, depth++) {
        if (p.closest && p.closest('.alo-lernreise-home, .alo-lernreise-hero, .alo-lernreise-manual-hero, .alo-lila-home-hero')) return;
        var txt = String(p.innerText || p.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
        // Never style a shared wrapper containing the location test or manual-route card.
        var hasOtherChoice = txt.indexOf('test de ubicación inicial') !== -1 ||
          txt.indexOf('einstufungstest') !== -1 ||
          txt.indexOf('elegir mi ruta manualmente') !== -1 ||
          txt.indexOf('elegir mi ruta') !== -1 && txt.indexOf('manual') !== -1 ||
          txt.indexOf('choose your route manually') !== -1 ||
          txt.indexOf('choose route manually') !== -1;
        if (!hasOtherChoice &&
            txt.indexOf('aprende jugando con lernreise') !== -1 &&
            txt.indexOf('misiones, historias, escucha y retos') !== -1 &&
            txt.length < 400) {
          ancestors.push({el:p, text:txt, cls:String(p.className || '')});
        }
      }
      if (!ancestors.length) return;
      // Use the nearest/smallest ancestor containing this card's own title and description.
      // Do not prefer a broad "levels" wrapper: that can paint all three dashboard cards green.
      var card = ancestors[0].el;
      if (!card || card.closest('.alo-lernreise-home, .alo-lernreise-hero, .alo-lernreise-manual-hero, .alo-lila-home-hero')) return;
      card.classList.add('alo-lernreise-levels-card');

      if (!node.parentElement || !node.parentElement.classList.contains('alo-lila-levels-icon')) {
        var parts = String(node.nodeValue || '').split('🗺️');
        var frag = document.createDocumentFragment();
        parts.forEach(function (part, i) {
          if (part) frag.appendChild(document.createTextNode(part));
          if (i < parts.length - 1) {
            var icon = document.createElement('span');
            icon.className = 'alo-lila-levels-icon';
            icon.setAttribute('role', 'img');
            icon.setAttribute('aria-label', 'Lila, búho morado de ALOdeutsch');
            icon.innerHTML = cardOwlSvg;
            frag.appendChild(icon);
          }
        });
        node.parentNode.replaceChild(frag, node);
      }
    });
  }

  function fixServiceSuizaIcon() {
    var all = Array.prototype.slice.call(document.querySelectorAll('body *'));
    var card = all.find(function (el) {
      if (!el || el.children.length > 8) return false;
      var t = String(el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      return t.length < 240 && t.indexOf('service suiza') !== -1 &&
        t.indexOf('atendé clientes en un café suizo') !== -1;
    });
    if (!card) return;
    var walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) if (/[⭐🌟★🍽]/.test(walker.currentNode.nodeValue || '')) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      if (!node.parentNode || node.parentElement.closest('.alo-service-suiza-icon')) return;
      var text = String(node.nodeValue || '');
      if (!/[⭐🌟★🍽]/.test(text)) return;
      var icon = document.createElement('span');
      icon.className = 'alo-service-suiza-icon';
      icon.setAttribute('role', 'img');
      icon.setAttribute('aria-label', 'Service und Gastronomie');
      icon.textContent = '🍽️';
      node.parentNode.replaceChild(icon, node);
    });
    var style = document.getElementById('alo-service-suiza-icon-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'alo-service-suiza-icon-style';
      style.textContent = '.alo-service-suiza-icon{display:inline!important;flex:0 0 auto!important;width:auto!important;min-width:0!important;max-width:none!important;height:auto!important;max-height:none!important;line-height:1.25!important;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif!important;font-size:1.45em!important;white-space:nowrap!important;overflow:visible!important;vertical-align:middle!important;margin:0 .3em 0 0!important;padding:0!important;clip:auto!important;clip-path:none!important;}';
      document.head.appendChild(style);
    }
  }


  function fixEmojiRendering() {
    var style = document.getElementById('alo-emoji-rendering-fix');
    if (!style) {
      style = document.createElement('style');
      style.id = 'alo-emoji-rendering-fix';
      style.textContent = [
        /* Prefer the platform emoji font over the app's Inter/system text font. */
        '.call-ctrl-btn, .call-translate-btn, .service-action-btn, .call-cta-emoji, .service-suiza-emoji, .alo-service-suiza-icon { font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif !important; font-variant-emoji: emoji !important; -webkit-text-size-adjust: 100% !important; text-indent: 0 !important; -webkit-text-fill-color: currentColor !important; }',
        '.call-ctrl-btn { display: inline-flex !important; align-items: center !important; justify-content: center !important; flex: 0 0 auto !important; line-height: 1.25 !important; padding: 0 !important; overflow: visible !important; color: var(--ink, #222) !important; -webkit-appearance: none !important; appearance: none !important; }',
        '.call-ctrl-btn.hangup { color: #fff !important; }',
        '.call-translate-btn { min-height: 44px !important; line-height: 1.4 !important; white-space: normal !important; overflow: visible !important; }',
        '.service-action-btn { min-height: 44px !important; line-height: 1.4 !important; white-space: normal !important; overflow: visible !important; }',
        '#service-suiza-cta .service-suiza-emoji { width: auto !important; min-width: 34px !important; height: auto !important; min-height: 34px !important; flex: 0 0 auto !important; line-height: 1.25 !important; overflow: visible !important; white-space: nowrap !important; clip: auto !important; clip-path: none !important; }',
        '#service-suiza-cta { overflow: visible !important; }'
      ].join('');
      document.head.appendChild(style);
    }
  }

  function run() {
    fixEmojiRendering();
    replaceStars();
    fixServiceSuizaIcon();
    addEntry();
    styleLevelsCard();
    dedupeBrandOwls();
  }

  function start() {
    // Run once at startup. A body-wide observer repeatedly scans/re-writes text
    // throughout the SPA and can freeze route/test navigation on mobile.
    run();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();