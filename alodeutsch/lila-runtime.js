
(function () {
  'use strict';
  if (window.__ALO_LILA_RUNTIME_V3__) return;
  window.__ALO_LILA_RUNTIME_V3__ = true;

  var owlSvg = '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 39 17 14 42 27Q60 17 78 27L103 14 99 42Q108 56 103 78Q96 103 60 108Q24 103 17 78Q12 56 21 39Z" fill="#9a76e8" stroke="#6543a5" stroke-width="3" stroke-linejoin="round"/><path d="M24 47Q39 28 54 48Q39 64 24 47ZM66 48Q81 28 96 47Q81 64 66 48Z" fill="#c9b5ff"/><ellipse cx="42" cy="52" rx="17" ry="19" fill="#fffaf2"/><ellipse cx="78" cy="52" rx="17" ry="19" fill="#fffaf2"/><circle cx="45" cy="53" r="7" fill="#38265c"/><circle cx="75" cy="53" r="7" fill="#38265c"/><circle cx="47" cy="50" r="2.5" fill="#fff"/><circle cx="77" cy="50" r="2.5" fill="#fff"/><path d="M54 65 60 72 66 65Z" fill="#ffc95d" stroke="#8e5d2b" stroke-width="1.5"/><path d="M33 82Q60 99 87 82Q79 104 60 104Q41 104 33 82Z" fill="#f8e8ff"/><path d="M25 82 15 88 30 93M95 82 105 88 90 93" fill="none" stroke="#6543a5" stroke-width="3" stroke-linecap="round"/><path d="M44 104 41 112M76 104 79 112" stroke="#ffc95d" stroke-width="4" stroke-linecap="round"/><path d="M37 30 29 22M83 30 91 22" stroke="#b89dff" stroke-width="4" stroke-linecap="round"/></svg>'

  var miniOwlSvg = '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 39 17 14 42 27Q60 17 78 27L103 14 99 42Q108 56 103 78Q96 103 60 108Q24 103 17 78Q12 56 21 39Z" fill="#9a76e8" stroke="#6543a5" stroke-width="3" stroke-linejoin="round"/><ellipse cx="42" cy="52" rx="17" ry="19" fill="#fffaf2"/><ellipse cx="78" cy="52" rx="17" ry="19" fill="#fffaf2"/><circle cx="45" cy="53" r="7" fill="#38265c"/><circle cx="75" cy="53" r="7" fill="#38265c"/><circle cx="47" cy="50" r="2.5" fill="#fff"/><circle cx="77" cy="50" r="2.5" fill="#fff"/><path d="M54 65 60 72 66 65Z" fill="#ffc95d" stroke="#8e5d2b" stroke-width="1.5"/><path d="M25 78Q8 65 13 48Q29 53 34 75Z" fill="#c9b5ff" stroke="#6543a5" stroke-width="2"/><path d="M95 78Q112 65 107 48Q91 53 86 75Z" fill="#c9b5ff" stroke="#6543a5" stroke-width="2"/><path d="M37 84Q60 97 83 84Q76 102 60 102Q44 102 37 84Z" fill="#f8e8ff"/></svg>';
  var cardOwlSvg = owlSvg;
  // The green Lernreise levels card uses the full yellow-footed mascot; the orange entry card stays unchanged.
  var levelsOwlSvg = owlSvg;

  var css = document.createElement('style');
  css.id = 'alo-lila-runtime-v3-style';
  css.textContent =
    '.alo-lila-inline,.alo-lila-brand-icon,.alo-lila-ola-icon{display:inline-flex!important;width:1em!important;height:1em!important;max-width:1em!important;max-height:1em!important;vertical-align:middle;align-items:center;justify-content:center;flex:0 0 1em!important;margin:0 .12em!important;overflow:visible}' +
    '.alo-lila-ola-icon{width:1em!important;height:1em!important;flex-basis:1em!important;max-width:1em!important;max-height:1em!important}' +
    '.alo-lila-brand-large{width:2.8em!important;height:2.8em!important;max-width:2.8em!important;max-height:2.8em!important;flex:0 0 2.8em!important;margin:0 .22em!important}' +
    '.alo-lila-inline svg,.alo-lila-brand-icon svg,.alo-lila-ola-icon svg{display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;overflow:visible}' +
    '.alo-lila-home-hero svg{display:block!important;width:clamp(180px,42vw,280px)!important;height:auto!important;max-width:280px!important;filter:drop-shadow(0 12px 10px #6543a526)}' +
    '.alo-lila-inline{animation:alo-lila-bob 3.8s ease-in-out infinite}.alo-lila-brand-icon,.alo-lila-ola-icon{animation:alo-lila-wiggle 4.8s ease-in-out infinite}' +
    '@keyframes alo-lila-blink{0%,43%,47%,100%{transform:scaleY(0)}45%{transform:scaleY(1)}}' +
    '.alo-lila-home-hero{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;margin:8px auto 18px;position:relative;isolation:isolate;animation:alo-lila-float 3.2s ease-in-out infinite}' +
    '.alo-lila-home-hero::after{content:"";position:absolute;z-index:-1;width:clamp(150px,33vw,260px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#e7d9ff 0%,#f6efff 65%,transparent 70%);top:12%;left:50%;transform:translateX(-50%)}' +
    '@keyframes alo-lila-float{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-8px) rotate(1deg)}}' +
    ' @keyframes alo-lila-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}} @keyframes alo-lila-wiggle{0%,90%,100%{transform:rotate(0)}93%{transform:rotate(-10deg)}96%{transform:rotate(8deg)}}' +
    '@media(max-width:520px){.alo-lila-home-hero svg{width:clamp(155px,48vw,230px)}}' +
    '@media(prefers-reduced-motion:reduce){.alo-lila-home-hero,.alo-lila-inline .lila-blink,.alo-lila-brand-icon .lila-blink,.alo-lila-home-hero .lila-blink{animation:none!important}}';
  css.textContent += '\n' +
    'span.alo-lila-brand-icon.alo-lila-ola-icon, .alo-lila-ola-icon{display:inline-flex!important;position:relative!important;box-sizing:border-box!important;inline-size:1em!important;block-size:1em!important;width:1em!important;height:1em!important;min-width:1em!important;min-height:1em!important;max-width:1em!important;max-height:1em!important;flex:0 0 1em!important;align-self:center!important;overflow:hidden!important;vertical-align:middle!important;padding:0!important;margin:0 .12em!important;line-height:1!important;}' +
    'span.alo-lila-brand-icon.alo-lila-ola-icon svg, .alo-lila-ola-icon svg{display:block!important;position:absolute!important;inset:0!important;width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;max-width:100%!important;max-height:100%!important;}' + '\n';
  css.textContent += '\n' + '#ola-hero{display:inline-flex!important;box-sizing:content-box!important;width:clamp(180px,42vw,280px)!important;height:clamp(180px,42vw,280px)!important;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;flex:0 0 auto!important;overflow:visible!important;vertical-align:middle!important}#ola-hero svg{display:block!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:visible!important}@media(max-width:520px){#ola-hero{width:clamp(155px,48vw,230px)!important;height:clamp(155px,48vw,230px)!important}}';
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
      // The footer language toggle must never inherit Service Suiza's plates icon.
      if (node.parentElement.closest('#lang-toggle-footer')) return;
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

  function dedupeBrandOwls() {
    var icons = Array.prototype.slice.call(document.querySelectorAll('.alo-lila-inline, .alo-lila-brand-icon, .alo-lila-ola-icon'));
    var kept = 0;
    icons.forEach(function (icon) {
      if (icon.closest('.alo-lernreise-home, .alo-lila-home-hero')) return;
      kept++;
      if (kept > 1) icon.remove();
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

  function fixFooterLanguageEmoji() {
    var button = document.getElementById('lang-toggle-footer');
    if (!button) return;
    var label = String(button.textContent || '').replace(/[🌐🍽🍽️⭐🌟★]/g, '').trim();
    if (!label) label = (window.Lang && Lang.current === 'en') ? 'Español' : 'English';
    button.textContent = '🌐 ' + label;
    button.style.setProperty('font-family', '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif', 'important');
    button.style.setProperty('font-variant-emoji', 'emoji', 'important');
  }

  function run() {
    fixEmojiRendering();
    fixFooterLanguageEmoji();
    replaceStars();
    fixServiceSuizaIcon();
    dedupeBrandOwls();
  }

  function start() {
    run();
  }

  // Ejecutar inmediatamente cuando el runtime se inyecta al final del documento,
  // evitando el parpadeo de la estrella provisional antes de mostrar a Lila.
  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start, { once: true });
})();
