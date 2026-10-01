/* B1 class practice: original listening scenes and vocabulary from Lektion 11/14. */
const B1ClassListening = {
  scenes:[
    'Ralf: Hallo, Katrin. Schön, dass du da bist. Ich habe nur kurz gewartet. Möchtest du ein Glas Rotwein? Katrin: Ja, gern. Meine Tram kam leider zu spät. Wir kennen uns doch von Werners Geburtstag.',
    'Katrin: Was machst du beruflich? Ralf: Ich bin selbstständig und übersetze Bücher für verschiedene Verlage. Gerade übersetze ich ein Jugendbuch aus dem Englischen. Ich kann auch Französisch, Italienisch und Spanisch. Katrin: Ich arbeite als Physiotherapeutin. Mein Lieblingssport ist Reiten, aber ich schwimme und jogge auch gern.',
    'Katrin: Hast du flexible Arbeitszeiten? Ralf: Ich muss meine Aufträge pünktlich abgeben. Zu Hause wohne ich mit meiner jüngeren Schwester. Sie ist von unseren Eltern ausgezogen und wollte in der fremden Stadt nicht allein wohnen. Besuche uns doch übernächsten Samstag. Ich koche etwas.'
  ],
  statements:[
    ['Katrin kommt etwas zu spät.',true,'Die Tram kam zu spät.'],
    ['Ralf bietet Katrin ein Bier an.',false,'Er bietet Rotwein an.'],
    ['Sie haben sich auf einem Geburtstag kennengelernt.',true,'Es war Werners Geburtstag.'],
    ['Ralf arbeitet als Angestellter in einem Verlag.',false,'Er ist selbstständig.'],
    ['Katrin spricht vier Fremdsprachen.',false,'Ralf nennt die Sprachen.'],
    ['Katrin ist Physiotherapeutin.',true,'Sie sagt es selbst.'],
    ['Ralf kann alle Abgabetermine ignorieren.',false,'Er muss Aufträge pünktlich abgeben.'],
    ['Ralfs Schwester wohnt mit ihm zusammen.',true,'Sie wohnt bei Ralf.']
  ],
  gaps:[
    ['Ralf ist ___ und übersetzt Bücher.','selbstständig'],
    ['Er übersetzt gerade ein ___.','Jugendbuch'],
    ['Katrin arbeitet als ___.','Physiotherapeutin'],
    ['Ihr Lieblingssport ist ___.','Reiten'],
    ['Ralf wohnt mit seiner jüngeren ___ zusammen.','Schwester'],
    ['Die Schwester wollte in einer ___ Stadt nicht allein wohnen.','fremden']
  ],
  render(){return `<div class="intro-box" style="margin-top:22px"><h3>🎧 Escucha B1: primera cita</h3><p>Práctica nueva inspirada en el tema del ejercicio de Hueber. No es su grabación original ni una prueba oficial telc. Lee las afirmaciones, escucha los tres fragmentos y vuelve a escuchar para completar los huecos. La voz depende de tu dispositivo.</p><p><a href="https://shop.hueber.de/media/hueber_dateien/Internet_Muster/Red7/9783198174937_Muster.pdf" target="_blank" rel="noopener">Transcripción y soluciones del ejercicio original (Hueber)</a></p>${this.scenes.map((s,i)=>`<div class="rule-box"><b>Fragmento ${i+1}</b><br><button type="button" class="pill-btn" onclick="B1ClassListening.play(${i},.75)">▶ 0,75×</button> <button type="button" class="results-btn-s" onclick="B1ClassListening.play(${i},1)">▶ 1×</button></div>`).join('')}<button type="button" class="results-btn-s" onclick="B1ClassListening.stop()">■ Detener</button><div id="b1-class-audio-status" aria-live="polite"></div><h4>Primera escucha: richtig oder falsch?</h4>${this.statements.map((q,i)=>`<div class="rule-box"><label>${i+1}. ${q[0]} <select id="b1-class-tf-${i}" aria-label="Afirmación ${i+1}"><option value="">–</option><option value="1">richtig</option><option value="0">falsch</option></select></label><span id="b1-class-tf-feedback-${i}"></span></div>`).join('')}<h4>Segunda escucha: palabras clave</h4>${this.gaps.map((q,i)=>`<div class="rule-box"><label>${i+1}. ${q[0]} <input id="b1-class-gap-${i}" type="text" autocomplete="off" aria-label="Palabra ${i+1}"></label><span id="b1-class-gap-feedback-${i}"></span></div>`).join('')}<button type="button" class="pill-btn" onclick="B1ClassListening.check()">Corregir</button><div id="b1-class-result" role="status"></div><details id="b1-class-text"><summary>Leer los fragmentos de esta práctica</summary>${this.scenes.map(s=>`<p>${s}</p>`).join('')}</details></div>`},
  stop(){if('speechSynthesis' in window)speechSynthesis.cancel()},
  play(i,rate){const status=document.getElementById('b1-class-audio-status');if(!('speechSynthesis' in window)){status.textContent='Este navegador no ofrece voz de lectura.';return}this.stop();const u=new SpeechSynthesisUtterance(this.scenes[i]);u.lang='de-DE';u.rate=rate;const voices=speechSynthesis.getVoices();u.voice=voices.find(v=>v.lang==='de-CH')||voices.find(v=>v.lang.startsWith('de'))||null;u.onstart=()=>status.textContent='Escuchando el fragmento '+(i+1);u.onend=()=>status.textContent='Fragmento terminado.';speechSynthesis.speak(u)},
  check(){let right=0,attempted=0;this.statements.forEach((q,i)=>{const value=document.getElementById('b1-class-tf-'+i).value,fb=document.getElementById('b1-class-tf-feedback-'+i);if(!value){fb.textContent='';return}attempted++;const ok=(value==='1')===q[1];right+=Number(ok);fb.textContent=(ok?' ✓ ':' ✗ ')+q[2]});this.gaps.forEach((q,i)=>{const value=document.getElementById('b1-class-gap-'+i).value.trim().toLocaleLowerCase('de').replace(/\u00df/g,'ss'),fb=document.getElementById('b1-class-gap-feedback-'+i);if(!value){fb.textContent='';return}attempted++;const ok=value===q[1].toLocaleLowerCase('de');right+=Number(ok);fb.textContent=(ok?' ✓ ':' ✗ '+q[1]+'. ')});document.getElementById('b1-class-result').textContent=right+'/'+attempted+' respuestas correctas. Revisa las pistas y vuelve a escuchar.';document.getElementById('b1-class-text').open=true}
};
const B1NewVocabulary = {
  11:[
    ['betrügen significa...',['engañar','pedir permiso','vender'],'engañar','betrügen = engañar; der Betrug = fraude.'],
    ['illegal significa...',['prohibido por ley','permitido por ley','prohibido por tus padres'],'prohibido por ley','illegal: contra la ley.'],
    ['Eine Tat anzeigen: ¿qué haces?',['denunciarla','ocultarla','dibujarla'],'denunciarla','anzeigen = denunciar ante la policía en este contexto.'],
    ['sich etwas vornehmen significa...',['proponerse algo','llevar algo encima','robar algo'],'proponerse algo','Ich nehme mir vor, täglich zu üben.'],
    ['sich bemühen significa...',['esforzarse','rendirse','dormirse'],'esforzarse','Esforzarse incluso si es difícil.'],
    ['unerträglich significa...',['insoportable','muy ligero','triste'],'insoportable','No se puede soportar.'],
    ['die Strasse überqueren significa...',['cruzar la calle','cerrar la calle','anotar la calle'],'cruzar la calle','überqueren = ir al otro lado.'],
    ['Das kommt manchmal vor: vorkommen significa...',['ocurrir','adelantar','terminar'],'ocurrir','vorkommen = suceder.'],
    ['behindern significa...',['obstaculizar','recordar','perdonar'],'obstaculizar','Algo impide o dificulta el paso.'],
    ['einen Namen eintragen significa...',['inscribirlo en una lista','olvidarlo','traducirlo'],'inscribirlo en una lista','eintragen = anotar.'],
    ['einen Termin festlegen significa...',['fijar una fecha','cancelar una fecha','olvidar una fecha'],'fijar una fecha','festlegen = determinar o acordar.'],
    ['gewöhnlich significa...',['normalmente','nunca','raramente'],'normalmente','Gewöhnlich fahre ich mit dem Zug.'],
    ['La escritura correcta es...',['realistisch','raelistik','reelistisch'],'realistisch','realistisch = realista.'],
    ['La escritura correcta es...',['fantastisch','fantasiatisch','fanatisch'],'fantastisch','fantastisch = fantástico.'],
    ['die Ausnahme significa...',['la excepción','el anuncio','la salida'],'la excepción','Algo que no sigue la regla.'],
    ['zerstören significa...',['destruir','distribuir','molestar'],'destruir','kaputt machen = destruir.'],
    ['stehlen significa...',['robar','estar de pie','colocar'],'robar','Diebe stehlen.'],
    ['¿Cómo se escribe el instrumento musical?',['die Flöte','der Flöte','das Flöte'],'die Flöte','Es femenino y lleva ö.'],
    ['El bus no llega: «Llego tarde» se dice...',['Ich verspäte mich.','Ich verspäte mir.','Ich komme verspäten.'],'Ich verspäte mich.','sich verspäten es reflexivo.'],
    ['un malentendido es...',['ein Missverständnis','eine Missverständnis','ein Betrug'],'ein Missverständnis','El sustantivo es neutro: das Missverständnis.'],
    ['el país de origen es...',['das Herkunftsland','der Wohnort','die Ortschaft'],'das Herkunftsland','Herkunft = procedencia.'],
    ['el vagón del tren para comer es...',['der Speisewagen','der Essenswagen','der Foodtruck'],'der Speisewagen','Speise = comida; Wagen = vagón.']
  ],
  14:[
    ['Keine Lust ___ lernen.',['darauf','darum','darüber'],'darauf','Lust haben auf → darauf.'],
    ['___ ärgerst du dich? Über das Wetter.',['Worüber','Womit','Woran'],'Worüber','sich ärgern über una cosa → worüber.'],
    ['___ hast du telefoniert? Mit meinem Bruder.',['Mit wem','Womit','Mit wen'],'Mit wem','Persona: mit wem.'],
    ['Kannst du dich ___ die Getränke kümmern?',['um','über','an'],'um','sich kümmern um + acusativo.'],
    ['Preguntas por el bus:',['Worauf wartest du?','Auf wen wartest du?','Woran wartest du?'],'Worauf wartest du?','Cosa: worauf. Persona: auf wen.'],
    ['Anna ist klein. Pass ___ auf.',['auf sie','darauf','auf ihn'],'auf sie','Anna es una persona femenina.'],
    ['Wir träumen ___, umzuziehen.',['davon','darauf','darum'],'davon','träumen von → davon.'],
    ['Geborgenheit significa...',['sentirse protegida y segura','tener ciudadanía','hacer deporte'],'sentirse protegida y segura','Seguridad afectiva y pertenencia.'],
    ['Meine ___ sind in Bolivien.',['Wurzeln','Wurzel','Würzeln'],'Wurzeln','Wurzeln = raíces.'],
    ['La ciudadanía es...',['die Staatsangehörigkeit','die Gegend','die Mobilität'],'die Staatsangehörigkeit','Nacionalidad jurídica.'],
    ['El olor es...',['der Geruch','der Geschmack','das Geräusch'],'der Geruch','Geschmack = sabor; Geräusch = ruido.'],
    ['El movimiento de personas entre países es...',['die Migration','die Integration','die Tradition'],'die Migration','Migration = migración.'],
    ['Patatas ralladas y fritas:',['die Rösti','das Fondue','das Raclette'],'die Rösti','Rösti es un plato de patatas.'],
    ['Queso fundido en una olla común:',['das Fondue','die Rösti','die Bratwurst'],'das Fondue','Fondue se come de una olla común.']
  ],
  install(){for(const [id,items] of Object.entries({11:this[11],14:this[14]})){const lesson=B1_INTENSIVE_LESSONS.find(l=>l.id===Number(id));const ready=B1_ENGLISH_READY[id];for(const [question,options,answer,explain] of items){const index=lesson.q.length;lesson.q.push({t:'mc',q:question,qEn:question,o:options,oEn:options,a:options.indexOf(answer),x:explain,xen:explain});ready.add(index)}}}
};
B1NewVocabulary.install();

/* Add the listening task to Lektion 11 without replacing the app's quiz UI. */
const B1ClassOriginalRender = B1Lessons.renderLesson.bind(B1Lessons);
B1Lessons.renderLesson = function(){
  B1ClassOriginalRender();
  if(this.currentId!==11)return;
  const body=document.getElementById('b1-lesson-body');
  if(!body)return;
  const section=document.createElement('section');
  section.innerHTML=B1ClassListening.render();
  body.insertBefore(section,body.lastElementChild);
};
