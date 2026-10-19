/* ALOdeutsch UI hotfixes: isolate the Lernreise route and clean translation labels. */
(function () {
  'use strict';
  function cleanTranslationButtons(root) {
    (root || document).querySelectorAll('.call-translate-btn, .translate-btn').forEach(function (btn) {
      if (btn.dataset.aloTranslationCleaned === '1') return;
      var text = (btn.textContent || '').replace(/[\u200B-\u200F\uFEFF\uFFFD\uFFFC\uFFFD]/g, '').replace(/[\uFE00-\uFE0F]/g, '').replace(/\s+/g, ' ').trim();
      // The call translation button draws its globe through CSS ::before. Rebuild
      // only the known German label to remove any corrupted glyphs around it.
      if (btn.classList.contains('call-translate-btn') || /Übersetzung\s*anzeigen/i.test(text)) {
        // Keep one clean label; the globe is drawn once by the existing CSS ::before.
        btn.textContent = 'Übersetzung anzeigen';
      } else {
        btn.textContent = text.replace(/^(?:🌐|🌍|🌎|🌏)\s*/u, '').trim();
      }
      btn.dataset.aloTranslationCleaned = '1';
      btn.setAttribute('aria-label', /Übersetzung\s*anzeigen/i.test(btn.textContent) ? 'Übersetzung anzeigen' : btn.textContent);
    });
  }
  function init() {
    cleanTranslationButtons(document);
    // Observe only newly inserted translation buttons; avoid rescanning the full app.
    var observer = new MutationObserver(function (records) {
      records.forEach(function (record) {
        record.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.matches && node.matches('.call-translate-btn, .translate-btn')) cleanTranslationButtons(node.parentNode || document);
          else if (node.querySelectorAll) cleanTranslationButtons(node);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
