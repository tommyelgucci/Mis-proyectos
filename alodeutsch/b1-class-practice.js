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
    ['Ich habe keine Lust ___.',['zu lernen','darauf lernen','auf lernen'],'zu lernen','Con un infinitivo: Lust haben, etwas zu tun. Con un sustantivo: Lust auf etwas haben.'],
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
  install(){for(const [id,items] of Object.entries({11:this[11],14:this[14]})){const lesson=B1_INTENSIVE_LESSONS.find(l=>l.id===Number(id));for(const [question,options,answer,explain] of items){lesson.q.push({t:'mc',q:question,o:options,a:options.indexOf(answer),x:explain})}}}
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

/* Transcription of the class Kahoot sheets supplied by the learner. */
const B1ClassKahoot = {
  items: {
    11: [
      ['Welche Anrede passt bei einem Beschwerdebrief?', ['Liebe Dame / Lieber Herr', 'Hallo …', 'Sehr geehrte Damen und Herren', 'Howdy!'], 2, 'Formal: Sehr geehrte Damen und Herren.'],
      ['Was könnte man im Betreff schreiben?', ['Ich bin wirklich enttäuscht, weil …', 'Freundliche Grüsse', 'Sehr geehrte Damen und Herren', 'Beschwerde wegen Zugverspätung'], 3, 'Der Betreff nennt den Grund des Briefs.'],
      ['Was ist eine «Forderung»?', ['eine Schweizer Spezialität mit Käse', 'ein Synonym für «Verspätung»', 'das, was die Firma machen soll', 'ein seltener Vogel'], 2, 'Eine Forderung sagt, was du von der Firma verlangst.'],
      ['Was ist ein möglicher Schlusssatz?', ['Ich werde Sie verklagen, Sie blöde SBB!!!', 'Ich bedanke mich für Ihr Verständnis und für eine schnelle Erledigung.', 'Bitte schreib mir bald!', 'Beschwerde wegen Zugverspätung'], 1, 'Ein höflicher Schlusssatz passt zum formellen Brief.'],
      ['Wie lautet die korrekte Grussformel?', ['Thomas', 'Freundliche Grüsse', 'Liebe Grüsse', 'Tschö mit ö!'], 1, 'In der Schweiz: Freundliche Grüsse.'],
      ['… und wie schreiben wir unseren Namen am Ende des Beschwerdebriefs?', ['Thomas', 'Mr. T.', 'Thomas Mäder'], 2, 'Bei einem formellen Brief Vor- und Nachnamen schreiben.']
    ],
    12: [
      ['_____ der Zug kommt, haben wir noch zwei Stunden.', ['seit', 'bevor', 'bis', 'indem'], 2, 'bis bezeichnet die Grenze in der Zukunft.'],
      ['Heute üben wir Grammatik, _____ wir ein Grammatikspiel machen.', ['bevor', 'danach', 'weil', 'indem'], 3, 'indem erklärt, wie wir üben.'],
      ['_____ Hannah bei Jan wohnt, hat er immer genug im Kühlschrank.', ['bevor', 'seit', 'während', 'nachdem'], 1, 'seit bezeichnet den Beginn eines andauernden Zustands.'],
      ['Könnt ihr nicht warten, ____ wir ausgestiegen sind?', ['nachdem', 'bevor', 'seit', 'bis'], 3, 'bis wir ausgestiegen sind = hasta que hayamos bajado.'],
      ['Frau Bircher arbeitet im Verein, ____ Geld dafür zu bekommen.', ['ohne dass', 'bis', 'seit', 'ohne'], 3, 'ohne + zu + Infinitiv cuando el sujeto es el mismo.'],
      ['Wie kann ich mein Kind beim Lernen ______________?', ['versorgen', 'engagieren', 'unterstützen', 'verpflichten'], 2, 'unterstützen = apoyar.'],
      ['Warten Sie bitte einen ___________! Ich bin gleich da.', ['Tag', 'Augenblick', 'Punkt', 'Gruss'], 1, 'einen Augenblick = un momento.'],
      ['Sascha ist für das Kinderferienprogramm _________________.', ['schuldig', 'tolerant', 'verantwortlich', 'heimlich'], 2, 'verantwortlich für + Akkusativ.'],
      ['Während die Eltern im Einsatz sind, ____________ der Verein deren Kinder.', ['aufführen', 'eintreten', 'betreuen', 'einsetzen'], 2, 'betreuen = cuidar o atender.'],
      ['Während die Eltern arbeiten sind, ____________ der Verein deren Kinder.', ['bewacht', 'behandelt', 'betreut', 'beachtet'], 2, 'Variante del Kahoot duplicado: betreut.'],
      ['Wer arbeitet, ohne Geld dafür zu verlangen, der arbeitet _____________.', ['wöchentlich', 'freiwillig', 'zukünftig', 'zuverlässig'], 1, 'freiwillig = voluntariamente.'],
      ['Die Organisation will sich für den Umweltschutz ___________.', ['entlassen', 'einsetzen', 'aufführen', 'versorgen'], 1, 'sich für etwas einsetzen = comprometerse por algo.'],
      ['Jeder kann in einen Verein _____________.', ['arbeiten', 'engagieren', 'anmelden', 'eintreten'], 3, 'in einen Verein eintreten = ingresar en una asociación.']
    ],
    13: [
      ['der Bericht =', ['die Anzeige', 'die Reparatur', 'die Reportage', 'der Brief'], 2, 'Bericht = reportaje o informe.'],
      ['fördern - Partizip II', ['hat geführt', 'hat gefördert', 'ist gefährdet', 'hat gefordert'], 1, 'fördern → hat gefördert.'],
      ['das Geschehen =', ['das Ereigniss', 'das Ergebnis', 'das Ereignis', 'die Begegnung'], 2, 'das Ereignis = el acontecimiento.'],
      ['der lokale Betrieb =', ['ein kleiner Betrieb', 'ein grosser Betrieb', 'ein guter Betrieb', 'ein Betrieb in der Nähe'], 3, 'lokal = de la zona o de las cercanías.'],
      ['die Meinung =', ['die Ansicht', 'der Verzicht', 'die Vorsicht', 'die Ehrlichkeit'], 0, 'Ansicht = opinión.'],
      ['die Einrichtung', ['die Verbesserung', 'etwas richtig machen', 'das Urteil', 'die Organisation'], 3, 'Einrichtung puede designar una institución.'],
      ['die Demonstration =', ['das Podest', 'das Portal', 'der Protest', 'das Projekt'], 2, 'Demonstration = manifestación/protesta.'],
      ['der Streik =', ['die Verweigerung', 'der Konflikt', 'der Schlag', 'die Kraft'], 0, 'Streik = paro o huelga; aquí, negativa colectiva a trabajar.'],
      ['die Republik =', ['die Regierung wählt die Regierung', 'der Stärkste regiert', 'der Sohn regiert als Nächster (Führung wird vererbt)', 'das Volk wählt die Regierung'], 3, 'En el Kahoot, la respuesta es: das Volk wählt die Regierung.'],
      ['sich beteiligen an … =', ['etwas mitnehmen', 'etwas aufteilen', 'bei etwas mitmachen', 'Geld bekommen'], 2, 'sich an etwas beteiligen = participar en algo.'],
      ['das Gift =', ['das Gesetz', 'das schädliche Mittel', 'das Geschenk', 'die Gabe'], 1, 'das Gift = veneno.']
    ]
  },
  extra12: [
    {q:'Wenn man in einem Verein mitmacht, dann ist man ...',o:['Mitmensch.', 'Mitglied.', 'Teilnehmer.', 'Besitzer.'],a:[1],x:'Mitglied = miembro.'},
    {q:'Man kann Mitglied im Verein werden, ohne mitzuhelfen.',o:['richtig', 'falsch'],a:[1],x:'La clave de este Kahoot marca falsch; en la realidad depende de las reglas de cada Verein.'},
    {q:'Nikolin ist in einen Kletterverein eingetreten, ...',o:['damit sie klettern lernt.', 'ohne klettern zu lernen.', 'um neue Leute kennenzulernen.', 'ohne neue Leute kennenzulernen.'],a:[0,2],x:'damit + oración; um … zu + infinitivo. Ambas opciones expresan finalidad.'},
    {q:'Bei der Freiwilligen Feuerwehr kann man mitmachen, ...',o:['ohne mitzumachen.', 'indem man Kinder von Kollegen betreut.', 'indem man mitsingt.', 'indem man Brände löscht.'],a:[1,3],x:'indem + oración explica de qué manera se participa.'},
    {q:'Ich kann in einem Verein mitmachen, indem ich mich ehrenamtlich engagiere.',o:['richtig', 'falsch'],a:[0],x:'indem introduce la manera de participar.'},
    {q:'Sascha ist für das Kinderferienprogramm ____________ . (2 Lösungen möglich)',o:['schuldig', 'zuständig', 'verantwortlich', 'heimlich'],a:[1,2],x:'zuständig für y verantwortlich für son posibles.'},
    {q:'Wer arbeitet, ohne Geld dafür zu verlangen, der arbeitet ________. (2 Lösungen möglich)',o:['wöchentlich', 'freiwillig', 'ehrenamtlich', 'zuverlässig'],a:[1,2],x:'freiwillig y ehrenamtlich son posibles.'}
  ],
  install(){
    for(const [id,rows] of Object.entries(this.items)){
      const lesson=B1_INTENSIVE_LESSONS.find(l=>l.id===Number(id));
      if(!lesson) continue;
      for(const [q,o,a,x] of rows) lesson.q.push({t:'mc',q,o,a,x});
    }
  },
  render12(){
    return `<div class="intro-box" style="margin-top:22px"><h3>🎮 Lektion 12 · Kahoot: ohne dass und indem</h3><p>Marca todas las respuestas correctas. Algunas preguntas tienen dos.</p>${this.extra12.map((item,i)=>`<div class="rule-box"><b>${i+1}. ${item.q}</b>${item.o.map((option,j)=>`<label style="display:block;margin:7px 0"><input type="checkbox" data-b1-kahoot="${i}" value="${j}"> ${option}</label>`).join('')}<button class="pill-btn" type="button" onclick="B1ClassKahoot.check12(${i})">Corregir</button><div id="b1-kahoot-12-${i}" role="status"></div></div>`).join('')}</div>`;
  },
  check12(i){
    const item=this.extra12[i],selected=[...document.querySelectorAll(`input[data-b1-kahoot="${i}"]:checked`)].map(el=>Number(el.value)).sort();
    const expected=[...item.a].sort();
    const correct=selected.length===expected.length&&selected.every((value,index)=>value===expected[index]);
    document.getElementById(`b1-kahoot-12-${i}`).textContent=(correct?'✓ Correcto. ':'✗ '+expected.map(index=>item.o[index]).join(' / ')+'. ')+item.x;
  }
};
B1ClassKahoot.install();
const B1ClassKahootPreviousRender=B1Lessons.renderLesson.bind(B1Lessons);
B1Lessons.renderLesson=function(){
  B1ClassKahootPreviousRender();
  if(this.currentId!==12||Lang.current==='en')return;
  const body=document.getElementById('b1-lesson-body');
  if(!body)return;
  const section=document.createElement('section');
  section.innerHTML=B1ClassKahoot.render12();
  body.insertBefore(section,body.lastElementChild);
};
