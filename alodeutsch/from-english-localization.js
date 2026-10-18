/* ALOdeutsch — language lock for the English-first learning path.
   This module is loaded by index.html after the app scripts. It keeps the
   Spanish-first route untouched and translates visible fixed UI copy only
   when the learner explicitly chooses “From English”. */
(function () {
  'use strict';
  var KEY = 'alodeutsch_learning_base_language';
  var ENGLISH_LABELS = /^(from english|learn german from english|i speak english|english speaker|english)$/i;
  var SPANISH_LABELS = /^(desde español|desde espanol|aprendo alemán desde español|hablo español|español)$/i;
  var translations = {
    'Aprende jugando con Lernreise':'Learn German with Lernreise',
    'Misiones, historias, escucha y retos para avanzar paso a paso desde A1 hasta C1.':'Missions, stories, listening activities and challenges to progress step by step from A1 to C1.',
    'Entrar a Lernreise →':'Open Lernreise →',
    '¡Aprende alemán como una aventura! Sigue el camino, supera misiones y gana confianza paso a paso.':'Learn German through an adventure! Follow the path, complete missions and build confidence step by step.',
    '¡Empezar mi aventura! →':'Start my adventure! →',
    'Ir a Lernreise →':'Go to Lernreise →',
    'Lila te espera en Lernreise: misiones, historias, escucha y retos para avanzar paso a paso desde A1 hasta C2.':'Lila is waiting for you in Lernreise: missions, stories, listening activities and challenges to progress step by step from A1 to C2.',
    'Lila está preparando tus misiones…':'Lila is preparing your missions…',
    'No se ha podido cargar la ruta. Comprueba que lernreise.js está publicado junto a este archivo.':'The learning path could not be loaded. Make sure lernreise.js is published alongside this file.',
    '← Volver a ALOdeutsch':'← Back to ALOdeutsch',
    '🌱 A1–A2 · Empieza':'🌱 A1–A2 · Beginner',
    '🌲 B1–B2 · Avanza':'🌲 B1–B2 · Intermediate',
    '🏔️ C1–C2 · Domina':'🏔️ C1–C2 · Advanced',
    '🎧 Escuchar':'🎧 Listening',
    '🧩 Ordenar frases':'🧩 Sentence builder',
    '⚡ Contrarreloj':'⚡ Time challenge',
    'Primeras palabras y frases':'First words and sentences',
    'Vida cotidiana, citas y experiencias':'Everyday life, appointments and experiences',
    'Conectores, opiniones y telc B1':'Connectors, opinions and telc B1',
    'Argumentación y registro profesional':'Argumentation and professional language',
    'Precisión, estilo y argumentación avanzada':'Precision, style and advanced argumentation',
    'Matices, expresiones idiomáticas y precisión':'Nuance, idioms and precision',
    '¡Seguir el camino! →':'Continue your journey! →',
    'Completa una misión hoy para ganar +15 XP extra.':'Complete a mission today to earn +15 bonus XP.',
    '¡Reto de hoy completado! Has ganado +15 XP. Vuelve mañana para otra aventura.':'Today’s challenge is complete! You earned +15 XP. Come back tomorrow for another adventure.',
    'Busca primero el verbo conjugado. En una oración principal suele ir en segunda posición; en una subordinada va al final.':'Find the conjugated verb first. In a main clause it usually comes second; in a subordinate clause it goes at the end.',
    'para reconstruir la frase alemana.':'to rebuild the German sentence.',
    'Frase correcta: ':'Correct sentence: ',
    'Busca primero el verbo conjugado.':'Find the conjugated verb first.',
    'Con ich usamos bin: Ich bin Sharon.':'With ich, use bin: Ich bin Sharon.',
    'Der Tisch: Tisch es masculino.':'Der Tisch: Tisch is masculine.',
    'Danke schön! significa muchas gracias.':'Danke schön! means thank you very much.',
    'Con ich: ich wohne.':'With ich: ich wohne.',
    'Guten Morgen! significa «¡Buenos días!».':'Guten Morgen! means “Good morning!”',
    'Sieben = siete; siebzehn = 17.':'Sieben = seven; siebzehn = 17.',
    'Con ich usamos bin: Ich bin Sharon.':'With ich, use bin: Ich bin Sharon.',
    'Con weil, el verbo conjugado va al final.':'With weil, the conjugated verb goes at the end.',
    'Weil introduce una subordinada: el verbo va al final.':'Weil introduces a subordinate clause: the verb goes at the end.',
    'Deshalb introduce la consecuencia y causa inversión: deshalb gehe ich.':'Deshalb introduces a result and causes inversion: deshalb gehe ich.',
    'Obwohl introduce contraste y lleva el verbo al final.':'Obwohl introduces contrast and puts the verb at the end.',
    'Trotzdem = a pesar de eso.':'Trotzdem = nevertheless.',
    'Warten auf + Akkusativ.':'Warten auf + accusative.',
    'Folglich = por consiguiente.':'Folglich = consequently.',
    'Infolgedessen introduce una consecuencia.':'Infolgedessen introduces a consequence.',
    'Letztlich significa en última instancia o finalmente.':'Letztlich means ultimately or finally.',
    'No obstante':'Nevertheless',
    '¡Hola! Soy Lila, tu búho de aprendizaje.':'Hello! I’m Lila, your learning owl.',
    '¡Vamos a aprender algo nuevo hoy!':'Let’s learn something new today!',
    '¡Paso a paso, tú puedes!':'One step at a time. You can do it!',
    '¿Lista para tu próxima misión?':'Ready for your next mission?',
    '¡Tócame! Te doy ánimo en español y alemán.':'Tap me for encouragement in English and German.'
  };
  function routeFromLabel(text) {
    var clean = String(text || '').replace(/\s+/g, ' ').trim();
    if (ENGLISH_LABELS.test(clean)) return 'en';
    if (SPANISH_LABELS.test(clean)) return 'es';
    return '';
  }
  function isEnglish() {
    try {
      if (localStorage.getItem(KEY) === 'en') return true;
      if (window.Lang && /^en/i.test(String(window.Lang.current || window.Lang.lang || ''))) return true;
      if (document.documentElement.lang === 'en') return true;
    } catch (e) {}
    return false;
  }
  function rememberRoute(event) {
    var node = event.target && event.target.closest ? event.target.closest('button,a,[role="button"],label,[tabindex]') : null;
    if (!node) return;
    var text = (node.innerText || node.textContent || '') + ' ' + (node.getAttribute('aria-label') || '');
    var lang = routeFromLabel(text);
    if (!lang) return;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    if (lang === 'en') setTimeout(run, 0);
  }
  function translateTextNode(node) {
    if (!node || !node.nodeValue || !node.parentElement) return;
    var parent = node.parentElement;
    if (parent.closest('script,style,textarea,input,select,option,code,pre,[data-no-translate]')) return;
    var original = node.nodeValue;
    var clean = original.replace(/\s+/g, ' ').trim();
    if (!clean || !translations[clean]) return;
    var translated = translations[clean];
    var leading = (original.match(/^\s*/) || [''])[0];
    var trailing = (original.match(/\s*$/) || [''])[0];
    node.nodeValue = leading + translated + trailing;
  }
  function run() {
    if (!isEnglish()) return;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(translateTextNode);
    document.querySelectorAll('[placeholder],[aria-label],[title]').forEach(function (el) {
      ['placeholder','aria-label','title'].forEach(function (attr) {
        var val = el.getAttribute(attr);
        if (val && translations[val.trim()]) el.setAttribute(attr, translations[val.trim()]);
      });
    });
  }
  document.addEventListener('click', rememberRoute, true);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true }); else run();
  var queued = false;
  new MutationObserver(function () {
    if (!isEnglish() || queued) return;
    queued = true;
    Promise.resolve().then(function () { queued = false; run(); });
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  window.ALOEnglishRouteLocalization = { run: run, languageKey: KEY };
})();