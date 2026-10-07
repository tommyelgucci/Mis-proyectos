/* ═══════════════════════════════════════════════════════════
   B1 · KURS PRAXIS — Schreiben + Grammatik aus dem Unterricht
   Based on the class pages/tasks supplied by the learner.
   No ß: Swiss spelling throughout.
   ═══════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const B1ClassPractice = {
    started:false,
    en(){ return typeof Lang!=='undefined' && Lang.current==='en'; },
    t(es,en){ return this.en()?en:es; },

    init(){
      if(this.started) return;
      this.started=true;
      this.addStyles();
      this.addScreen();
      this.patchB1Home();
    },

    addStyles(){
      if(document.getElementById('b1-class-practice-css')) return;
      const s=document.createElement('style');
      s.id='b1-class-practice-css';
      s.textContent=`
        .b1cp-wrap{padding:14px 16px 40px}
        .b1cp-hero{background:linear-gradient(135deg,var(--sky),var(--lav));border:1.5px solid var(--border);border-radius:var(--r-xl);padding:20px;margin-bottom:16px}
        .b1cp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
        .b1cp-card{background:var(--card);border:1.5px solid var(--border);border-radius:18px;padding:16px;box-shadow:0 4px 14px rgba(38,64,53,.06)}
        .b1cp-card h3{margin:0 0 6px;font-family:'Baloo 2';color:var(--ink);font-size:17px}
        .b1cp-card p{margin:0 0 12px;color:var(--ink-soft);font-size:13px;line-height:1.5}
        .b1cp-section{background:var(--card);border:1.5px solid var(--border);border-radius:18px;padding:17px;margin:12px 0}
        .b1cp-section h2{font-family:'Baloo 2';font-size:20px;margin:0 0 6px;color:var(--ink)}
        .b1cp-q{border-top:1px solid var(--border);padding:13px 0}
        .b1cp-q:first-child{border-top:0}
        .b1cp-opt{display:block;width:100%;text-align:left;border:1px solid var(--border);background:var(--bg,#fff);border-radius:12px;padding:10px 12px;margin:7px 0;font:inherit;color:var(--ink);cursor:pointer}
        .b1cp-opt:hover{border-color:var(--purple)}
        .b1cp-opt.correct{border-color:#2f8f5b;background:#eef9f2}
        .b1cp-opt.wrong{border-color:#d6485b;background:#fff1f3}
        .b1cp-feedback{font-size:13px;line-height:1.5;margin-top:8px;color:var(--ink-soft)}
        .b1cp-model{background:#f8f6ff;border:1px solid var(--border);border-radius:14px;padding:14px;white-space:pre-line;line-height:1.65;font-size:14px}
        .b1cp-note{background:#fff9ed;border-left:4px solid #de9b1f;padding:10px 12px;border-radius:8px;font-size:13px;line-height:1.5;margin:10px 0}
        .b1cp-rule{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0}
        .b1cp-rule>div{border:1px solid var(--border);border-radius:12px;padding:11px}
        .b1cp-textarea{width:100%;min-height:180px;box-sizing:border-box;border:1.5px solid var(--border);border-radius:14px;padding:12px;font:inherit;line-height:1.55;resize:vertical}
        .b1cp-small{font-size:12px;color:var(--ink-faint);line-height:1.5}
        .b1cp-back{margin-bottom:12px}
        @media(max-width:600px){.b1cp-rule{grid-template-columns:1fr}}
      `;
      document.head.appendChild(s);
    },

    addScreen(){
      if(document.getElementById('scr-b1-class-practice')) return;
      const scr=document.createElement('div');
      scr.id='scr-b1-class-practice';
      scr.className='scr';
      scr.innerHTML='<div class="study-body" style="padding-top:10px"><div id="b1-class-practice-body"></div></div>';
      const anchor=document.querySelector('.scr');
      (anchor&&anchor.parentNode?anchor.parentNode:document.body).appendChild(scr);
      if(typeof App!=='undefined'){
        App.subMap['b1-class-practice']='📝 B1 · Praxis aus dem Unterricht';
      }
    },

    patchB1Home(){
      if(typeof B1Lessons==='undefined' || B1Lessons._classPracticePatched) return;
      B1Lessons._classPracticePatched=true;
      const original=B1Lessons.renderHome.bind(B1Lessons);
      const self=this;
      B1Lessons.renderHome=function(){
        original();
        const host=document.getElementById('b1-lessons-body');
        if(!host || host.querySelector('[data-b1-class-practice-card]')) return;
        const card=document.createElement('div');
        card.setAttribute('data-b1-class-practice-card','1');
        card.className='intro-box';
        card.style.cssText='margin:18px 16px;border:2px solid var(--purple);background:linear-gradient(135deg,var(--card),var(--lav))';
        card.innerHTML='<div style="font-size:30px">✍️</div><b style="font-size:17px">'+self.t('Praxis aus dem Unterricht','Class practice')+'</b><p style="font-size:13px;line-height:1.55;color:var(--ink-soft);margin:6px 0 12px">'+self.t(
          'Carta B1, Verein, ohne ... zu / ohne dass, Steckbrief und Akkusativ/Dativ. Incluye corrección de errores reales de tu carta.',
          'B1 letter, clubs, ohne ... zu / ohne dass, profile writing and accusative/dative. Includes practice based on your real letter errors.'
        )+'</p><button class="pill-btn" onclick="B1ClassPractice.open()">'+self.t('Abrir práctica →','Open practice →')+'</button>';
        host.appendChild(card);
      };
    },

    open(){
      if(typeof App!=='undefined') App.go('b1-class-practice');
      this.renderHome();
    },

    renderHome(){
      const body=document.getElementById('b1-class-practice-body');
      if(!body) return;
      body.innerHTML=`
        <div class="b1cp-wrap">
          <div class="b1cp-back"><button class="pill-btn" onclick="App.goBack()">← ${this.t('Volver','Back')}</button></div>
          <div class="b1cp-hero">
            <div style="font-size:34px">✍️</div>
            <h1 style="font-family:'Baloo 2';margin:3px 0;font-size:24px;color:var(--ink)">B1 · ${this.t('Praxis del curso','Class practice')}</h1>
            <p style="margin:6px 0 0;color:var(--ink-soft);font-size:13px;line-height:1.6">${this.t(
              'Material basado en las páginas y tareas que estás trabajando en clase. No es un examen: sirve para entender los errores y volver a practicar.',
              'Material based on the pages and tasks you are working on in class. It is not an exam: use it to understand mistakes and practise again.'
            )}</p>
          </div>
          <div class="b1cp-grid">
            <div class="b1cp-card"><h3>✉️ Schreiben · Brief</h3><p>${this.t('Tu carta sobre la visita de Marianne: errores + modelo B1.','Your letter about Marianne visiting: mistakes + B1 model.')}</p><button class="pill-btn" onclick="B1ClassPractice.letter()">Abrir →</button></div>
            <div class="b1cp-card"><h3>🏠 Verein · Übung 10</h3><p>${this.t('Qué combinación no encaja y por qué.','Which combination does not fit and why.')}</p><button class="pill-btn" onclick="B1ClassPractice.verein()">Abrir →</button></div>
            <div class="b1cp-card"><h3>🔗 ohne ... zu / ohne dass</h3><p>${this.t('Decide primero si el sujeto es el mismo o diferente.','First decide whether the subject is the same or different.')}</p><button class="pill-btn" onclick="B1ClassPractice.ohne()">Abrir →</button></div>
            <div class="b1cp-card"><h3>👤 Steckbrief · 20b</h3><p>${this.t('Ficha o breve biografía de una persona que sea un Vorbild.','Profile or short biography of a person who is a role model.')}</p><button class="pill-btn" onclick="B1ClassPractice.bio()">Abrir →</button></div>
            <div class="b1cp-card"><h3>⚖️ Akkusativ / Dativ</h3><p>${this.t('Práctica opcional para reforzar los casos.','Optional practice to reinforce cases.')}</p><button class="pill-btn" onclick="B1ClassPractice.cases()">Abrir →</button></div>
          </div>
          <div class="b1cp-note" style="margin-top:16px"><b>${this.t('Material de apoyo opcional','Optional support')}</b><br>${this.t('Las otras páginas que te dieron pueden usarse como ayuda o tarea extra. Este módulo no las convierte en obligatorias.','The other pages can be used as support or optional homework. This module does not make them mandatory.')}</div>
        </div>`;
    },

    shell(title,subtitle,html){
      const body=document.getElementById('b1-class-practice-body');
      if(!body)return;
      body.innerHTML='<div class="b1cp-wrap"><div class="b1cp-back"><button class="pill-btn" onclick="B1ClassPractice.renderHome()">← '+this.t('Índice','Contents')+'</button></div><div class="b1cp-section"><h2>'+title+'</h2><p class="b1cp-small">'+subtitle+'</p>'+html+'</div></div>';
      window.scrollTo(0,0);
    },

    letter(){
      const errors=[
        ['Antwortung','Antwort','Wortschatz','„Antwort“ es el sustantivo correcto.'],
        ['in einem Schiff reisen','mit dem Schiff fahren','Ausdruck','Para viajar en barco, esta combinación es mucho más natural.'],
        ['in einem berühmter Restaurant','in einem berühmten Restaurant','Dativ + Adjektiv','Nach „in einem“ braucht das Adjektiv hier die Endung -en.'],
        ['dann du solltest','dann solltest du','Wortstellung','Nach „dann“ steht das Verb vor dem Subjekt.'],
        ['und könnten wir ins Schwimmbad gehen','und wir ins Schwimmbad gehen könnten','Nebensatz','Die ganze Ergänzung hängt weiter von „weil“ ab; das Verb bleibt am Ende.'],
        ['sommerkleidung / winterkleidung','Sommerkleidung / Winterkleidung','Grossschreibung','Substantive werden grossgeschrieben.'],
        ['Sommerkleidung bringen','Sommerkleidung mitbringen','Verbwahl','Für etwas, das man zu einem Ort mitnimmt, ist „mitbringen“ passend.'],
        ['Skifahren auf eine Berge','in den Bergen Ski fahren','Präposition + Plural','„Berge“ ist Plural; für den Ort passt „in den Bergen“.'],
        ['meine Ferien','meine Ferien','Kontrolle','Das ist in deiner ursprünglichen Version korrekt. „Ferien“ steht hier im Plural.'],
        ['Gibst mir Bescheid!','Gib mir Bescheid!','Imperativ','Der Imperativ von „geben“ lautet hier „Gib!“.']
      ];
      const q=errors.map((x,i)=>`<div class="b1cp-q"><b>${i+1}. ${this.t('¿Qué debes cambiar?','What should you change?')}</b><div style="margin:7px 0"><code>${x[0]}</code> → <code>${x[1]}</code></div><button class="pill-btn" onclick="this.nextElementSibling.hidden=!this.nextElementSibling.hidden">${this.t('Ver explicación','Show explanation')}</button><div class="b1cp-feedback" hidden><b>${x[2]}:</b> ${x[3]}</div></div>`).join('');
      this.shell('✉️ Schreiben · Tu carta','Revisión de errores reales de tu carta de clase.',`
        <div class="b1cp-note"><b>${this.t('Importante','Important')}:</b> ${this.t('No todo lo que no fue marcado por la profesora era incorrecto. Aquí distinguimos errores claros de cosas que simplemente pueden sonar más naturales.','Not everything the teacher did not mark was wrong. Here we distinguish clear errors from wording that can simply sound more natural.')}</div>
        ${q}
        <div class="b1cp-section" style="margin-top:16px;background:#fbfbff"><h2>${this.t('Versión modelo B1','B1 model version')}</h2>
          <div class="b1cp-model">Liebe Marianne,

Danke für deine Antwort! Ich freue mich auf deinen Besuch. Ich habe eine Idee: Am ersten Tag könnten wir nach Zürich fahren und eine Schifffahrt auf dem Zürichsee machen, Fondue in einem berühmten Schweizer Restaurant essen oder in der Altstadt spazieren gehen.

Wenn du die Hitze nicht so gerne magst, solltest du zwischen Mai und Juli kommen. Es ist eine gute Jahreszeit, weil es nicht so warm ist und wir ins Schwimmbad gehen könnten.

Du solltest unbedingt Sommerkleidung mitbringen, aber eine leichte Jacke und feste Schuhe sind auch wichtig, weil es noch nicht sehr warm ist.

Ich könnte verschiedene Aktivitäten für uns organisieren, wenn du willst. Wenn du in den Bergen Ski fahren möchtest, solltest du auch Winterkleidung mitbringen. Ich kann meine Ferien zwischen Mai und Juli planen.

Was passt für dich? Gib mir Bescheid!

Liebe Grüsse,
Tommy</div>
        </div>`);
    },

    verein(){
      const items=[
        {p:'in einem Verein',opts:['sein','wohnen','mitarbeiten'],a:1,e:'„in einem Verein sein“ und „in einem Verein mitarbeiten“ sind feste, natürliche Verbindungen.'},
        {p:'Mitglied',opts:['bekommen','werden','sein'],a:0,e:'Richtig sind „Mitglied werden“ und „Mitglied sein“. „Mitglied bekommen“ passt hier nicht.'},
        {p:'Geld an einen Verein',opts:['spenden','beitragen','überweisen'],a:1,e:'„beitragen“ steht normalerweise mit „zu“: „zu etwas beitragen“. „Geld an einen Verein spenden/überweisen“ funktioniert.'},
        {p:'als Mitglied',opts:['sein','aufgenommen werden','mitarbeiten'],a:null,e:'Alle drei Kombinationen sind möglich: „als Mitglied sein“, „als Mitglied aufgenommen werden“, „als Mitglied mitarbeiten“. Markiere deshalb „alle drei passen“.'},
        {p:'sich in einem Verein',opts:['anmelden','engagieren','Mitglied werden'],a:2,e:'„sich anmelden“ und „sich engagieren“ passen mit „sich“. „Mitglied werden“ steht ohne „sich“.'}
      ];
      let html='<div class="b1cp-note"><b>Was passt nicht?</b> '+this.t('Elige la combinación que no encaja. En d) todas encajan.','Choose the combination that does not fit. In d), all three fit.')+'</div>';
      html+=items.map((it,i)=>`<div class="b1cp-q" id="verein-q-${i}"><b>${String.fromCharCode(97+i)}) ${it.p}</b>${it.opts.map((o,j)=>`<button class="b1cp-opt" onclick="B1ClassPractice.pickVerein(${i},${j})">${o}</button>`).join('')}<div class="b1cp-feedback" id="verein-f-${i}"></div></div>`).join('');
      this.shell('🏠 Verein · Übung 10','Was passt nicht? Wortverbindungen aus dem Unterricht.',html);
    },

    pickVerein(i,j){
      const items=[
        {a:1,e:'„in einem Verein sein“ und „in einem Verein mitarbeiten“ passen.'},
        {a:0,e:'„Mitglied werden“ und „Mitglied sein“ passen; „Mitglied bekommen“ nicht.'},
        {a:1,e:'„beitragen“ braucht hier „zu“; „Geld spenden/überweisen“ passt.'},
        {a:null,e:'Alle drei passen.'},
        {a:2,e:'„sich anmelden“ und „sich engagieren“ passen; „Mitglied werden“ braucht kein „sich“.'}
      ];
      const x=items[i], f=document.getElementById('verein-f-'+i);
      f.textContent=(x.a===j?'✓ ':'✗ ')+(x.a===j?this.t('Correcto. ','Correct. '):this.t('Revisa. ','Check again. '))+x.e;
    },

    ohne(){
      const items=[
        {a:0, prompt:'Ich möchte an einem Training teilnehmen. Ich möchte nicht gleich in den Verein eintreten.',sol:'Ich möchte an einem Training teilnehmen, ohne gleich in den Verein einzutreten.',why:'Mismo sujeto: ich → ohne ... zu.'},
        {a:0, prompt:'Ich gehe nicht regelmässig laufen. Ich habe keinen festen Termin mit anderen Läufern.',sol:'Ich gehe nicht regelmässig laufen, ohne einen festen Termin mit anderen Läufern zu haben.',why:'Mismo sujeto: ich → ohne ... zu.'},
        {a:1, prompt:'Sie können zweimal am Training teilnehmen. Der Verein fordert keinen Mitgliederbeitrag.',sol:'Sie können zweimal am Training teilnehmen, ohne dass der Verein einen Mitgliederbeitrag fordert.',why:'Sujetos diferentes: Sie / der Verein → ohne dass.'},
        {a:1, prompt:'Wir wollen uns anmelden. Der Spass kommt im Training nicht zu kurz.',sol:'Wir wollen uns anmelden, ohne dass der Spass im Training zu kurz kommt.',why:'Sujetos diferentes: wir / der Spass → ohne dass.'}
      ];
      let html='<div class="b1cp-rule"><div><b>👤 '+this.t('Mismo sujeto','Same subject')+'</b><br><code>ohne ... zu + Infinitiv</code><br><span class="b1cp-small">Ich gehe, ohne eine Jacke mitzunehmen.</span></div><div><b>👥 '+this.t('Sujeto diferente','Different subject')+'</b><br><code>ohne dass + Nebensatz</code><br><span class="b1cp-small">Ich gehe, ohne dass meine Freundin mitkommt.</span></div></div>';
      html+='<div class="b1cp-note"><b>'+this.t('Primero decide','Decide first')+':</b> '+this.t('¿Quién hace las dos acciones?','Who performs both actions?')+'</div>';
      html+=items.map((it,i)=>`<div class="b1cp-q"><b>${i+1}. ${it.prompt}</b><div style="margin-top:9px"><button class="b1cp-opt" onclick="B1ClassPractice.pickOhne(${i},0)">ohne ... zu</button><button class="b1cp-opt" onclick="B1ClassPractice.pickOhne(${i},1)">ohne dass</button></div><div class="b1cp-feedback" id="ohne-f-${i}"></div></div>`).join('');
      this.shell('🔗 ohne ... zu / ohne dass','Übung 15 · Erst die Struktur wählen, dann die Lösung verstehen.',html);
    },

    pickOhne(i,j){
      const a=[0,0,1,1][i], f=document.getElementById('ohne-f-'+i);
      const sols=[
        'Ich möchte an einem Training teilnehmen, ohne gleich in den Verein einzutreten.',
        'Ich gehe nicht regelmässig laufen, ohne einen festen Termin mit anderen Läufern zu haben.',
        'Sie können zweimal am Training teilnehmen, ohne dass der Verein einen Mitgliederbeitrag fordert.',
        'Wir wollen uns anmelden, ohne dass der Spass im Training zu kurz kommt.'
      ];
      f.innerHTML=(j===a?'✓ ':'✗ ')+this.t(j===a?'Richtig. ':'Noch einmal überlegen. ','')+'<br><b>'+sols[i]+'</b><br><span class="b1cp-small">'+(a===0?'Mismo sujeto → ohne ... zu.':'Sujeto diferente → ohne dass.')+'</span>';
    },

    bio(){
      this.shell('👤 Steckbrief · Aufgabe 20b','Eine grosse Persönlichkeit Ihres Landes, die für viele Menschen ein Vorbild ist.',`
        <div class="b1cp-note"><b>${this.t('Tarea','Task')}:</b> ${this.t('Escribe un Steckbrief o una breve biografía y presenta el texto en clase. Puedes investigar también en Internet.','Write a profile or short biography and present it in class. You may also research online.')}</div>
        <h3 style="font-family:'Baloo 2';color:var(--ink)">Beispiel · Roger Federer</h3>
        <div class="b1cp-model"><b>Roger Federer</b>

Geboren: 8. August 1981 in Basel, Schweiz
Beruf: ehemaliger Tennisspieler
Nationalität: Schweizer
Sport: Tennis

Roger Federer war viele Jahre einer der erfolgreichsten Tennisspieler der Welt. Er gewann 20 Grand-Slam-Titel und achtmal Wimbledon.

Für viele Menschen ist er ein Vorbild, weil er erfolgreich, diszipliniert und sportlich fair ist.</div>
        <h3 style="font-family:'Baloo 2';color:var(--ink);margin-top:18px">${this.t('Tu versión','Your version')}</h3>
        <textarea class="b1cp-textarea" placeholder="${this.t('Schreiben Sie hier Ihren Steckbrief / Ihre Kurzbiografie ...','Write your profile / short biography here ...')}"></textarea>
        <p class="b1cp-small">${this.t('Consejo B1: incluye quién es la persona, cuándo/dónde nació, profesión o actividad, 2–3 logros y por qué es un Vorbild.','B1 tip: include who the person is, when/where they were born, profession/activity, 2–3 achievements and why they are a role model.')}</p>
      `);
    },

    cases(){
      const items=[
        ['Ich fahre ___ Schweiz.', ['in die','in der'], 0, 'Wohin? → Akkusativ.'],
        ['Ich bin ___ Schweiz.', ['in die','in der'], 1, 'Wo? → Dativ.'],
        ['Wir essen ___ einem Restaurant.', ['in','mit'], 0, 'Ort → „in einem Restaurant“.'],
        ['Wir fahren ___ dem Schiff.', ['mit','in'], 0, 'Verkehrsmittel → mit dem Schiff.'],
        ['Ich freue mich ___ deinen Besuch.', ['auf','mit'], 0, 'sich freuen auf + Akkusativ.'],
        ['Ich gebe ___ Freund Bescheid.', ['meinem','meinen'], 0, 'geben + Dativ bei der Person: meinem Freund.'],
        ['Ich gehe ___ die Altstadt.', ['in','in der'], 0, 'Wohin? → in die Altstadt.'],
        ['Ich spazieren ___ der Altstadt.', ['in','in die'], 0, 'Wo? → in der Altstadt.']
      ];
      let html='<div class="b1cp-note"><b>'+this.t('Mini-Regel','Mini rule')+':</b> '+this.t('Wohin? → oft Akkusativ. Wo? → oft Dativ. Aber die Präposition und das Verb müssen zusammenpassen.','Wohin? → often accusative. Wo? → often dative. But the preposition and verb combination still matters.')+'</div>';
      html+=items.map((it,i)=>`<div class="b1cp-q"><b>${i+1}. ${it[0]}</b>${it[1].map((o,j)=>`<button class="b1cp-opt" onclick="B1ClassPractice.pickCase(${i},${j})">${o}</button>`).join('')}<div class="b1cp-feedback" id="case-f-${i}"></div></div>`).join('');
      this.shell('⚖️ Akkusativ / Dativ','Opcional · práctica de apoyo relacionada con los errores de la carta.',html);
    },

    pickCase(i,j){
      const ans=[0,1,0,0,0,0,0,0][i];
      const why=[
        'Wohin? → in die Schweiz.',
        'Wo? → in der Schweiz.',
        'Ort: in einem Restaurant.',
        'Verkehrsmittel: mit dem Schiff.',
        'sich freuen auf + Akkusativ.',
        'jemandem Bescheid geben → Dativ.',
        'Wohin? → in die Altstadt.',
        'Wo? → in der Altstadt.'
      ][i];
      const f=document.getElementById('case-f-'+i);
      f.textContent=(j===ans?'✓ ':'✗ ')+(j===ans?this.t('Correcto. ','Correct. '):this.t('Revisa. ','Check again. '))+why;
    }
  };

  function boot(){
    B1ClassPractice.init();
    if(typeof B1Lessons!=='undefined' && B1Lessons.currentId) B1Lessons.renderHome();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
  window.B1ClassPractice=B1ClassPractice;
})();