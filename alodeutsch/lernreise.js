(function(){
'use strict';
const STORE_KEY='alodeutsch_lernreise_app_v1';
const worlds=[
{ id:'a1',level:'A1',name:'Der Wortwald',icon:'🌳',desc:'Primeras palabras y frases',color:'#e0f3d9',missions:[
{title:'Hallo! Wie geht’s?',qs:[
['Wie begrüsst du jemanden am Morgen?',['Guten Morgen!','Gute Nacht!','Auf Wiedersehen!'],0,'Guten Morgen! significa «¡Buenos días!».'],
['Welche Zahl ist «sieben»?',['17','7','70'],1,'Sieben = siete; siebzehn = 17.'],
['Ich ___ Sharon.',['bist','ist','bin'],2,'Con ich usamos bin: Ich bin Sharon.']]},
{title:'Erste Sätze',qs:[
['___ Tisch ist neu.',['Die','Der','Das'],1,'Der Tisch: Tisch es masculino.'],
['Ich ___ in Zürich.',['wohne','wohnst','wohnt'],0,'Con ich: ich wohne.'],
['Jemand hilft dir. Was sagst du?',['Gute Nacht!','Danke schön!','Bis morgen!'],1,'Danke schön! significa muchas gracias.']]},
{title:'Satz-Baumeister',qs:[
['¿Cuál frase es correcta?',['Heute ich arbeite.','Heute arbeite ich.','Heute arbeiten ich.'],1,'El verbo conjugado va en posición 2: Heute arbeite ich.'],
['Ich habe ___ Katze.',['einen','ein','eine'],2,'Die Katze → eine Katze.'],
['Am Wochenende ___ ich gern Musik.',['höre','hörst','hört'],0,'Ich höre gern Musik.']] }
]},
{ id:'a2',level:'A2',name:'Alltag in der Schweiz',icon:'🚋',desc:'Vida cotidiana, citas y experiencias',color:'#e2efff',missions:[
{title:'Im Café',qs:[
['Du möchtest einen Kaffee. Was sagst du höflich?',['Ich will Kaffee jetzt.','Ich hätte gern einen Kaffee, bitte.','Gib Kaffee!'],1,'Ich hätte gern … es una petición educada.'],
['Wir treffen uns ___ Montag.',['im','am','um'],1,'Am Montag; um neun Uhr.'],
['¿Qué pregunta suena más educada?',['Wo Bahnhof?','Könnten Sie mir bitte helfen?','Hilf mir jetzt.'],1,'Könnten Sie mir bitte helfen? es cortés.']]},
{title:'Gestern und heute',qs:[
['Gestern ___ ich meine Freundin besucht.',['bin','habe','werde'],1,'Besuchen forma el Perfekt con haben.'],
['Sie ___ nach Hause gefahren.',['hat','ist','wird'],1,'Fahren en este contexto forma el Perfekt con sein.'],
['Ich lerne Deutsch, ___ ich in der Schweiz lebe.',['weil','deshalb','trotzdem'],0,'Weil introduce una subordinada: el verbo va al final.']]},
{title:'Pläne und Gründe',qs:[
['___ ich Zeit habe, besuche ich meine Familie.',['Obwohl','Wenn','Deshalb'],1,'Wenn expresa una condición: si tengo tiempo…'],
['Ich interessiere mich ___ Musik.',['an','für','mit'],1,'La estructura fija es sich interessieren für.'],
['Am Wochenende ___ wir einen Ausflug gemacht.',['sind','haben','werden'],1,'Wir haben einen Ausflug gemacht.']] }
]},
{ id:'b1',level:'B1',name:'Die Brücke der Ideen',icon:'🌉',desc:'Conectores, opiniones y telc B1',color:'#fce5ee',missions:[
{title:'Weil oder deshalb?',qs:[
['Ich bin müde, ___ gehe ich früh ins Bett.',['weil','deshalb','obwohl'],1,'Deshalb introduce la consecuencia y causa inversión: deshalb gehe ich.'],
['___ ich wenig Zeit hatte, beendete ich die Aufgabe.',['Obwohl','Deshalb','Trotzdem dass'],0,'Obwohl introduce contraste y lleva el verbo al final.'],
['Welche Form ist richtig?',['weil es ist praktisch','weil es praktisch ist','weil praktisch es ist'],1,'Con weil, el verbo conjugado va al final.']]},
{title:'Argumente verbinden',qs:[
['¿Qué conector presenta dos perspectivas?',['Einerseits … andererseits','Weil … deshalb','Sobald … oder'],0,'Einerseits … andererseits presenta dos lados.'],
['Es regnet. ___ gehen wir spazieren.',['Weil','Deshalb','Trotzdem'],2,'Trotzdem = a pesar de eso.'],
['¿Cuál frase expresa una opinión con razón?',['Ich finde es gut, weil es praktisch ist.','Ich finde es gut, weil es ist praktisch.','Weil praktisch, finde ich es gut.'],0,'Con weil, el verbo va al final: weil es praktisch ist.']]},
{title:'Besser ausdrücken',qs:[
['¿Qué suena más profesional?',['Ich war so am Machen.','Dort war ich als Barista tätig.','Ich habe da Sachen gemacht.'],1,'Als Barista tätig sein es preciso y profesional.'],
['Welche Präposition passt? Ich warte ___ den Bus.',['auf','an','mit'],0,'Warten auf + Akkusativ.'],
['Ich habe den Termin vergessen. ___ entschuldige ich mich.',['Obwohl','Deshalb','Weil'],1,'Deshalb introduce una consecuencia con inversión.']] }
]},
{ id:'b2',level:'B2',name:'Der Gipfel der Debatte',icon:'🏔️',desc:'Argumentación y registro profesional',color:'#e4e5ff',missions:[
{title:'Argumente abwägen',qs:[
['Welche Formulierung klingt formell?',['Ich find das halt blöd.','Dies lässt sich kritisch beurteilen, da …','Das ist voll schlecht.'],1,'Dies lässt sich kritisch beurteilen es formal.'],
['___ die Kosten gestiegen sind, bleibt das Angebot attraktiv.',['Obwohl','Deshalb','Trotzdem dass'],0,'Obwohl lleva el verbo al final.'],
['Welche Wendung schränkt eine Aussage ein?',['Das gilt immer.','Dies trifft nur bedingt zu.','Das ist total klar.'],1,'Nur bedingt zutreffen significa ser válido solo hasta cierto punto.']]},
{title:'Präziser formulieren',qs:[
['Welche Formulierung klingt sachlich?',['Weil die Preise steigen …','Aufgrund des Preisanstiegs …','Die Preise gehen halt hoch.'],1,'Aufgrund des Preisanstiegs es un registro nominal formal.'],
['Die Nachfrage stieg; ___ müssen wir mehr produzieren.',['hingegen','folglich','obwohl'],1,'Folglich = por consiguiente.'],
['Was bedeutet «in Betracht ziehen»?',['Etwas berücksichtigen','Etwas wegwerfen','Etwas verbieten'],0,'In Betracht ziehen significa considerar una opción.']]},
{title:'Nuancen ausdrücken',qs:[
['Welche Verbindung ist korrekt?',['zwar … aber','zwar … oder','zwar … weil'],0,'Zwar … aber expresa concesión y contraste.'],
['Was bedeutet «Dies ist nicht von der Hand zu weisen»?',['Das lässt sich nicht einfach bestreiten.','Das ist unwichtig.','Das ist unmöglich zu verstehen.'],0,'Significa que no se puede negar fácilmente.'],
['Welche Wendung führt eine Folge ein?',['Infolgedessen','Nichtsdestotrotz','Hingegen'],0,'Infolgedessen introduce una consecuencia.']] }
]},
{ id:'c1',level:'C1',name:'Das Reich der Nuancen',icon:'🏰',desc:'Precisión, estilo y argumentación avanzada',color:'#ffe8d6',missions:[
{title:'Nuanciert argumentieren',qs:[
['Welche Wendung räumt einen Punkt ein?',['Zugegebenermassen …, dennoch …','Auf jeden Fall und fertig','Weil … deshalb'],0,'Zugegebenermassen reconoce un argumento antes de matizarlo.'],
['Die Sprecherin erklärt, die Lage ___ ernst.',['ist','sei','wäre gewesen'],1,'Sei es Konjunktiv I de sein para el estilo indirecto.'],
['Was bedeutet «etwas in Frage stellen»?',['Etwas kritisch anzweifeln','Etwas bestätigen','Etwas auswendig lernen'],0,'Significa cuestionar algo o ponerlo en duda.']]},
{title:'Gedanken verdichten',qs:[
['Welche Formulierung ist präzise?',['Das hat viele Sachen verändert.','Dies hatte weitreichende Auswirkungen.','Das war irgendwie wichtig.'],1,'Weitreichende Auswirkungen significa consecuencias amplias.'],
['Welche Wendung bedeutet «sin embargo»?',['Nichtsdestotrotz','Infolgedessen','Dementsprechend'],0,'Nichtsdestotrotz = no obstante.'],
['Welche Form ist Konjunktiv I?',['Er sagt, er sei krank.','Er sagt, er ist krank gewesen gestern immer.','Er sagt, er sein krank.'],0,'Er sei krank es estilo indirecto formal.']] }
]},
{ id:'c2',level:'C2',name:'Der Meistergipfel',icon:'👑',desc:'Matices, expresiones idiomáticas y precisión',color:'#f8e1fa',missions:[
{title:'Feine Bedeutungen',qs:[
['«Dem Anschein nach» bedeutet …',['aparentemente','por esa razón','sin dificultad'],0,'Dem Anschein nach significa aparentemente.'],
['«Das greift zu kurz» bedeutet …',['Es ist unvollständig oder zu vereinfacht.','Es dauert lange.','Es ist sehr ausführlich.'],0,'Una valoración greift zu kurz si resulta demasiado limitada.'],
['Welche Wendung signalisiert eine vorsichtige Schlussfolgerung?',['Es liegt nahe, daraus zu schliessen, dass …','Das ist immer hundertprozentig so.','Das ist halt klar.'],0,'Es liegt nahe expresa una inferencia prudente.']]},
{title:'Stil und Register',qs:[
['Welche Formulierung passt zu einer differenzierten Erörterung?',['Das ist immer so und fertig.','Eine pauschale Bewertung greift hier zu kurz.','Alle liegen total falsch.'],1,'La segunda frase expresa una crítica matizada.'],
['Was bedeutet «ungeachtet dessen»?',['A pesar de ello','Solo por esa razón','Por ejemplo'],0,'Ungeachtet dessen significa a pesar de ello.'],
['Welche Wendung bedeutet «en última instancia»?',['Letztlich','Hingegen','Zunächst'],0,'Letztlich significa en última instancia o finalmente.']] }
]}
];
let state={};try{state=JSON.parse(localStorage.getItem(STORE_KEY)||'{}')}catch(e){}state.done=state.done||{};state.excellent=state.excellent||{};state.xp=state.xp||0;
let run=null;
const $=id=>document.getElementById(id);
function save(){try{localStorage.setItem(STORE_KEY,JSON.stringify(state))}catch(e){}}
function sentenceQuestion(sentence,prompt,explain,index){
 const words=String(sentence||'').trim().split(/\s+/).filter(Boolean);
 if(words.length<4)return null;
 const d1=words.slice(1).concat(words[0]).join(' ');
 const d2=words.slice(0,2).reverse().concat(words.slice(2)).join(' ');
 const candidates=[sentence,d1,d2].filter((v,i,a)=>v&&a.indexOf(v)===i);
 while(candidates.length<3)candidates.push(words.slice().reverse().join(' '));
 const options=candidates.slice(0,3),correct=options.indexOf(sentence);
 const rotate=index%3;
 const shuffled=options.slice(rotate).concat(options.slice(0,rotate));
 return [prompt,shuffled,shuffled.indexOf(sentence),explain||('Frase modelo: '+sentence)];
}
function sentenceRows(level){
 const rows=[];
 try{
  if(typeof SENTENCE_BANK!=='undefined'&&SENTENCE_BANK){
   const bank=SENTENCE_BANK[level.toLowerCase()];
   if(Array.isArray(bank))bank.forEach(row=>{
    if(Array.isArray(row)){
     const tokens=Array.isArray(row[2])?row[2]:(Array.isArray(row[0])?row[0]:(row.every(x=>typeof x==='string')?row:null));
     if(tokens&&tokens.length>3)rows.push({sentence:tokens.join(' '),prompt:Array.isArray(row[2])?('¿Qué frase alemana expresa esta idea? '+(row[0]||'')):'¿Qué orden de palabras es correcto?',explain:'Practica la estructura y la posición del verbo.'});
    }else if(row&&typeof row==='object'){
     const tokens=row.tokens||row.words;
     const sentence=row.de||row.german||row.sentence||row.answer||(Array.isArray(tokens)?tokens.join(' '):'');
     if(sentence)rows.push({sentence,prompt:'¿Qué frase alemana está bien construida?',explain:row.explanation||row.hint||'Observa la posición del verbo y los complementos.'});
    }
   });
  }
 }catch(e){}
 try{
  let bank=[];
  if(level==='B2'){
   if(typeof GAME_SENTENCES_B2!=='undefined')bank=bank.concat(GAME_SENTENCES_B2);
   if(typeof GAME_SENTENCES_BERUF!=='undefined')bank=bank.concat(GAME_SENTENCES_BERUF);
  }
  if(level==='C1'&&typeof GAME_SENTENCES_C1!=='undefined')bank=bank.concat(GAME_SENTENCES_C1);
  bank.forEach(row=>{if(Array.isArray(row)&&Array.isArray(row[2]))rows.push({sentence:row[2].join(' '),prompt:'¿Qué frase alemana expresa esta idea? '+row[0],explain:'Traducción orientativa: '+row[1]});});
 }catch(e){}
 try{
  const lessons=level==='C1'?(typeof C11_LESSONS!=='undefined'?C11_LESSONS:[]):level==='C2'?(typeof C12_LESSONS!=='undefined'?C12_LESSONS:[]):[];
  lessons.forEach(lesson=>(lesson.points||[]).forEach(point=>{
   const examples=point[3];
   if(Array.isArray(examples))examples.forEach(sentence=>rows.push({sentence,prompt:'Tema: '+lesson.title+' · '+point[0]+'. Elige la frase alemana con el orden correcto.',explain:point[1]}));
  }));
 }catch(e){}
 const extra={
 A1:[
  ['Me llamo Anna.','Ich heisse Anna.','Mit ich verwendet man heisse.'],
  ['Vivimos en Frauenfeld.','Wir wohnen in Frauenfeld.','Wir + wohnen: Das Verb steht auf Position 2.'],
  ['El gato es pequeño.','Die Katze ist klein.','Die Katze ist feminin; das Adjektiv steht nach sein ohne Endung.'],
  ['Tengo dos hermanos.','Ich habe zwei Geschwister.','Haben bildet das Perfekt mit haben.'],
  ['Hoy trabajo en casa.','Heute arbeite ich zu Hause.','Heute steht am Anfang; das Verb bleibt auf Position 2.'],
  ['¿Dónde está la estación?','Wo ist der Bahnhof?','Wo fragt nach einem Ort.']
 ],
 A2:[
  ['Ayer fui al médico.','Gestern bin ich zum Arzt gegangen.','Gehen bildet das Perfekt mit sein.'],
  ['Tengo que levantarme temprano.','Ich muss früh aufstehen.','Nach dem Modalverb steht der Infinitiv am Satzende.'],
  ['No puedo venir porque trabajo.','Ich kann nicht kommen, weil ich arbeite.','In einem weil-Satz steht das Verb am Ende.'],
  ['¿Podría ayudarme, por favor?','Könnten Sie mir bitte helfen?','Könnten Sie ist eine höfliche petición.'],
  ['Si llueve, nos quedamos en casa.','Wenn es regnet, bleiben wir zu Hause.','Wenn-Satz: el verbo va al final; después, inversión.'],
  ['Me alegro de tus noticias.','Ich freue mich über deine Nachricht.','Sich freuen über + Akkusativ.']
 ],
 B1:[
  ['Aunque estoy cansada, voy al curso.','Obwohl ich müde bin, gehe ich zum Kurs.','Obwohl introduce contraste y lleva el verbo al final.'],
  ['No tengo coche; por eso voy en tren.','Ich habe kein Auto, deshalb fahre ich mit dem Zug.','Deshalb ocupa posición 1 y el verbo va después.'],
  ['En mi opinión, los niños necesitan jugar al aire libre.','Meiner Meinung nach brauchen Kinder Bewegung an der frischen Luft.','Meiner Meinung nach es una expresión para argumentar.'],
  ['Por un lado ahorramos dinero, por otro lado tenemos menos tiempo.','Einerseits sparen wir Geld, andererseits haben wir weniger Zeit.','Einerseits … andererseits presenta dos perspectivas.'],
  ['Es importante que los niños hagan manualidades.','Es ist wichtig, dass Kinder basteln.','En una oración con dass, el verbo va al final.'],
  ['No solo es práctico, sino también económico.','Es ist nicht nur praktisch, sondern auch günstig.','Nicht nur … sondern auch conecta elementos paralelos.']
 ]
 };
 (extra[level]||[]).forEach(item=>rows.push({sentence:item[1],prompt:'¿Qué frase alemana expresa esta idea? '+item[0],explain:item[2]}));
 const unique=[];const seen=new Set();
 rows.forEach(row=>{const key=row.sentence;if(key&&!seen.has(key)){seen.add(key);unique.push(row)}});
 return unique;
}
function enrichMissions(){
 worlds.forEach(w=>{
  const pool=sentenceRows(w.level);
  w.missions.forEach((mission,mi)=>{
   const added=[];
   for(let n=0;n<2&&pool.length;n++){
    const row=pool[(mi*2+n)%pool.length];
    const q=sentenceQuestion(row.sentence,row.prompt,row.explain,mi*2+n);
    if(q&&!mission.qs.some(existing=>existing[0]===q[0]&&existing[3]===q[3]))added.push(q);
   }
   mission.qs.push(...added);
  });
 });
}
enrichMissions();
function unlocked(w,m){if(m===0)return true;return !!state.excellent[worlds[w].id+'-'+(m-1)]}
function addUI(){
 if(typeof App!=='undefined'&&App.subMap)App.subMap.lernreise='🗺️ Lernreise A1–C2';
 if(!$('scr-lernreise')){
  const screen=document.createElement('div');screen.id='scr-lernreise';screen.className='scr';
  screen.innerHTML='<div class="lr-wrap"><button class="lr-back" onclick="Lernreise.back()">← Volver a tus niveles</button><div class="lr-hero"><div class="lr-hero-top"><div><small>ALOdeutsch · DEIN SPRACHABENTEUER</small><h1>¡Sigue el camino hasta C2!</h1><p>Aprende, juega y consigue estrellas. Cada paso te acerca a hablar alemán con confianza.</p></div><div class="lr-owl" aria-label="Búho guía"><svg viewBox="0 0 120 120" role="img" aria-hidden="true"><path d="M24 43 18 12 43 27Q60 18 77 27L102 12 96 44Q109 61 99 83 87 108 60 108 33 108 21 83 11 61 24 43Z" fill="#7b63d9"/><ellipse cx="60" cy="68" rx="34" ry="31" fill="#fff0ca"/><circle cx="46" cy="57" r="13" fill="#fff"/><circle cx="74" cy="57" r="13" fill="#fff"/><circle cx="48" cy="59" r="6" fill="#26344d"/><circle cx="72" cy="59" r="6" fill="#26344d"/><path d="m54 72 6 8 6-8Z" fill="#ff9f43"/><path d="M37 91Q60 101 83 91" fill="none" stroke="#e7a64a" stroke-width="4" stroke-linecap="round"/><path d="M16 73 4 84 22 89M104 73l12 11-18 5" fill="#7b63d9"/></svg></div></div><div class="lr-progress-label"><span>Tu aventura</span><span id="lr-total"></span></div><div class="lr-bar"><span id="lr-overall"></span></div><div class="lr-hero-tip">🦉 Consejo del búho: ¡la excelencia abre nuevos caminos!</div></div><div class="lr-map-intro"><span>🧭</span><div><b>Elige tu mundo</b><small>La primera misión de cada nivel está abierta. Para avanzar dentro de un mundo, consigue una estrella de excelencia ⭐</small></div></div><div id="lr-map"></div><div id="lr-play" style="display:none"></div></div>';
  const dashScreen=document.getElementById('scr-dashboard');if(dashScreen)dashScreen.insertAdjacentElement('afterend',screen);
 }
 if(!document.getElementById('lernreise-cta')){
  const card=document.createElement('div');card.id='lernreise-cta';card.className='call-cta-card';card.setAttribute('role','button');card.tabIndex=0;card.onclick=()=>Lernreise.open();card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();Lernreise.open()}};
  card.innerHTML='<div class="call-cta-emoji">🗺️</div><div><div class="call-cta-title">Lernreise · A1–C2</div><div class="call-cta-sub">Avanza por niveles, supera misiones y gana XP</div></div>';
  const dash=document.querySelector('#scr-dashboard .route-wrap');const first=dash&&dash.querySelector('.call-cta-card');if(first)first.insertAdjacentElement('afterend',card);
 }
 const style=document.createElement('style');style.textContent=`
.lr-wrap{max-width:850px;margin:auto;padding:10px 14px 42px;color:var(--ink)}
.lr-back{border:0;background:transparent;color:var(--ink);font-weight:900;padding:8px 0 14px;cursor:pointer}
.lr-hero{position:relative;overflow:hidden;padding:22px;border-radius:26px;background:linear-gradient(135deg,#d9f7e7 0%,#eff9c8 50%,#ffe5b7 100%);margin-bottom:18px;box-shadow:0 8px 0 #b9d9b7}
.lr-hero:after{content:'✦  ·  ✧  ·  ✦';position:absolute;right:14px;top:12px;color:#e3a344;letter-spacing:8px;font-size:20px;opacity:.85}
.lr-hero-top{display:flex;align-items:center;justify-content:space-between;gap:12px}
.lr-hero small{font-weight:950;letter-spacing:.09em;color:#397b5a;font-size:10px}
.lr-hero h1{font-size:clamp(27px,6vw,39px);margin:8px 0;line-height:1.05;max-width:540px;color:#234b3b}
.lr-hero p{font-size:13px;color:#466653;margin:0;max-width:500px;line-height:1.5}
.lr-owl{width:112px;min-width:82px;filter:drop-shadow(0 5px 0 #c5d6a5);animation:lr-bob 3s ease-in-out infinite}
.lr-owl svg{display:block;width:100%;height:auto}
@keyframes lr-bob{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-5px) rotate(2deg)}}
.lr-progress-label{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:16px;font-size:12px;font-weight:900;color:#3b684f}
.lr-bar{height:11px;background:#ffffffbd;border:1px solid #ffffffa6;border-radius:20px;overflow:hidden;margin-top:7px}
.lr-bar span{display:block;height:100%;width:0;background:linear-gradient(90deg,#4fbf82,#19885c);border-radius:20px;transition:width .45s}
.lr-hero-tip{font-size:12px;font-weight:800;color:#4a664f;margin-top:11px}
.lr-map-intro{display:flex;gap:12px;align-items:center;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:13px 15px;margin:0 0 20px}
.lr-map-intro>span{font-size:28px}.lr-map-intro b{display:block;font-size:14px}.lr-map-intro small{display:block;color:var(--ink-soft);font-size:12px;line-height:1.4;margin-top:3px}
.lr-world{--world-color:#d9f7e7;position:relative;overflow:hidden;background:var(--card);border:1px solid var(--border);border-radius:25px;padding:16px 14px 20px;margin:20px 0;box-shadow:0 5px 0 color-mix(in srgb,var(--world-color) 72%,transparent)}
.lr-world:before{content:'';position:absolute;right:-30px;top:-35px;width:130px;height:130px;border-radius:50%;background:var(--world-color);opacity:.52}
.lr-world-head{position:relative;display:flex;gap:12px;align-items:center;z-index:1}
.lr-icon{width:58px;height:58px;min-width:58px;border-radius:20px;display:grid;place-items:center;font-size:32px;background:var(--world-color);box-shadow:inset 0 -4px 0 #0000000d}
.lr-world-head small{font-weight:950;color:#4a8b65;font-size:11px;letter-spacing:.12em}
.lr-world h3{font-size:19px;margin:3px 0;color:var(--ink)}
.lr-world p{font-size:12px;color:var(--ink-soft);margin:0;line-height:1.4}
.lr-world-progress{position:relative;margin:13px 3px 0;display:flex;align-items:center;gap:8px;font-size:11px;font-weight:850;color:var(--ink-soft)}
.lr-world-progress .track{height:7px;background:var(--border);border-radius:9px;overflow:hidden;flex:1}
.lr-world-progress .track span{display:block;height:100%;background:linear-gradient(90deg,#68cb92,#239360);border-radius:9px}
.lr-path{position:relative;display:flex;flex-direction:column;gap:0;margin-top:8px;padding:0 0 2px;min-height:260px}
.lr-road{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:.95}
.lr-road path{fill:none;stroke:#c5d8c6;stroke-width:7;stroke-linecap:round;stroke-dasharray:3 12}
.lr-node-wrap{position:relative;z-index:1;min-height:83px;width:56%;display:flex;align-items:center;gap:10px}
.lr-node-wrap:nth-of-type(1){margin-left:2%}.lr-node-wrap:nth-of-type(2){margin-left:43%}.lr-node-wrap:nth-of-type(3){margin-left:16%}
.lr-node{border:0;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;background:transparent;color:var(--ink);padding:0;min-width:76px;max-width:90px}
.lr-node:disabled{cursor:not-allowed}
.lr-node-orb{width:59px;height:59px;border-radius:50%;display:grid;place-items:center;font-size:26px;color:#fff;background:linear-gradient(150deg,#7bce98,#31976d);border:4px solid #f5fff6;box-shadow:0 5px 0 #268058,0 7px 13px #264d3026;transition:transform .16s}
.lr-node:not(:disabled):hover .lr-node-orb{transform:translateY(-3px) scale(1.04)}
.lr-node.done .lr-node-orb{background:linear-gradient(145deg,#7bd6a0,#24935f)}
.lr-node.excellent .lr-node-orb{background:linear-gradient(145deg,#ffe27a,#f2a51c);box-shadow:0 5px 0 #bd7b12,0 7px 13px #264d3026}
.lr-node.locked .lr-node-orb{background:linear-gradient(145deg,#d8dfe0,#9daab0);box-shadow:0 5px 0 #849197}
.lr-node.active .lr-node-orb{animation:lr-pulse 1.8s ease-in-out infinite}
@keyframes lr-pulse{0%,100%{box-shadow:0 5px 0 #268058,0 0 0 0 #6ac58c4d}50%{box-shadow:0 5px 0 #268058,0 0 0 8px #6ac58c00}}
.lr-node-label{font-size:11px;font-weight:950;text-align:center;line-height:1.15;max-width:100px}
.lr-node-info{font-size:11px;line-height:1.3;color:var(--ink-soft);max-width:180px}
.lr-node-info b{display:block;color:var(--ink);font-size:12px;margin-bottom:3px}
.lr-node-info span{display:block}
.lr-world-foot{position:relative;background:var(--world-color);border-radius:14px;padding:10px 12px;font-size:12px;font-weight:800;color:#425f4b;line-height:1.4}
.lr-game{background:var(--card);border:1px solid var(--border);border-radius:25px;padding:18px;margin-top:14px;box-shadow:0 6px 0 #00000008}
.lr-game-top{display:flex;justify-content:space-between;gap:8px;align-items:center}
.lr-qprogress{color:var(--ink-soft);font-size:11px;font-weight:950;letter-spacing:.05em}
.lr-game-buddy{font-size:31px;background:#f4f8db;border-radius:14px;width:50px;height:50px;display:grid;place-items:center}
.lr-game h2{font-size:23px;line-height:1.15;margin:14px 0 8px}
.lr-question{font-size:16px;line-height:1.5;font-weight:750;margin:10px 0 16px}
.lr-options{display:grid;gap:10px}
.lr-option{border:2px solid var(--border);border-radius:16px;padding:13px;text-align:left;background:var(--card);color:var(--ink);font-weight:750;line-height:1.4;cursor:pointer;transition:transform .12s,border-color .12s}
.lr-option:not(:disabled):hover{transform:translateY(-1px);border-color:#79c99a}
.lr-option.good{background:#e4f7e9;border-color:#31925a;color:#205d34}
.lr-option.bad{background:#fff0ef;border-color:#d66b69;color:#813e3d}
.lr-feedback{display:none;border-radius:15px;padding:13px;margin-top:13px;font-size:13px;line-height:1.5}
.lr-feedback.show{display:block}.lr-feedback.good{background:#e4f7e9;color:#205d34}.lr-feedback.bad{background:#fff0df;color:#815020}
.lr-hint-btn{border:0;background:transparent;color:#447b5d;font-weight:900;padding:10px 0;cursor:pointer}
.lr-hint{display:none;background:#fff6d9;border-radius:12px;padding:10px 12px;color:#77591c;font-size:12px;line-height:1.5}
.lr-hint.show{display:block}
.lr-next{width:100%;border:0;border-radius:16px;padding:14px;margin-top:14px;background:linear-gradient(135deg,#31a56f,#1c8059);color:#fff;font-weight:950;font-size:15px;box-shadow:0 4px 0 #176847;cursor:pointer}
.lr-next:disabled{opacity:.45;cursor:not-allowed}
.lr-result{text-align:center;padding:22px 10px}
.lr-result .emoji{font-size:64px;animation:lr-bob 2s ease-in-out infinite}
.lr-result h2{font-size:27px;margin:8px 0}.lr-result p{color:var(--ink-soft);font-size:14px;line-height:1.5}
.lr-sticker{display:inline-block;background:#fff1b8;border:2px solid #f1bd42;border-radius:999px;padding:8px 13px;color:#82590e;font-weight:950;font-size:12px;margin:4px}
.lr-secondary{border:2px solid var(--border);background:var(--card);color:var(--ink);border-radius:14px;padding:12px 15px;font-weight:900;margin:5px;cursor:pointer}
@media(max-width:480px){.lr-hero{padding:17px;border-radius:22px}.lr-owl{width:82px;min-width:72px}.lr-world{padding:13px 10px 16px}.lr-node-wrap{width:68%}.lr-node-wrap:nth-of-type(2){margin-left:31%}.lr-node-wrap:nth-of-type(3){margin-left:10%}.lr-node-info{font-size:10px}.lr-node-orb{width:54px;height:54px}.lr-game{padding:14px}}
`;

 if(!document.getElementById('lr-styles')){style.id='lr-styles';document.head.appendChild(style)}
}
function renderMap(){
 const total=worlds.reduce((n,w)=>n+w.missions.length,0);
 const done=Object.keys(state.done).filter(k=>state.done[k]).length;
 const excellent=Object.keys(state.excellent).filter(k=>state.excellent[k]).length;
 $('lr-overall').style.width=(excellent/total*100)+'%';
 $('lr-total').textContent=excellent+' / '+total+' estrellas · ⭐ '+state.xp+' XP';
 $('lr-map').style.display='block';$('lr-play').style.display='none';
 $('lr-map').innerHTML=worlds.map((w,wi)=>{
  const count=w.missions.filter((m,mi)=>state.done[w.id+'-'+mi]).length;
  const gold=w.missions.filter((m,mi)=>state.excellent[w.id+'-'+mi]).length;
  const nodes=w.missions.map((m,mi)=>{
   const key=w.id+'-'+mi,d=!!state.done[key],e=!!state.excellent[key],u=unlocked(wi,mi);
   const symbol=e?'★':d?'✓':u?(mi===0?'🚩':'⭐'):'🔒';
   const status=e?'¡Excelente!':d?'Completada · repite para excelencia':u?'¡Te toca!':'Se abre con una estrella';
   return '<div class="lr-node-wrap"><button class="lr-node '+(e?'excellent':d?'done':u?'active':'locked')+'" '+(!u?'disabled':'')+' aria-label="'+w.level+' '+m.title+'" onclick="Lernreise.start('+wi+','+mi+')"><span class="lr-node-orb">'+symbol+'</span><span class="lr-node-label">'+(mi+1)+'. '+m.title+'</span></button><div class="lr-node-info"><b>'+status+'</b><span>'+(e?'¡Ganaste tu estrella dorada!':d?'Vuelve a intentarlo para desbloquear el siguiente paso.':u?'Responde al menos el 70% para completar y el 90% para avanzar.':'Necesitas una misión excelente antes de seguir.')+'</span></div></div>';
  }).join('');
  return '<section class="lr-world" style="--world-color:'+w.color+'"><div class="lr-world-head"><div class="lr-icon">'+w.icon+'</div><div><small>'+w.level+' · MUNDO '+(wi+1)+'</small><h3>'+w.name+'</h3><p>'+w.desc+'</p></div></div><div class="lr-world-progress"><span>'+count+'/'+w.missions.length+' misiones</span><div class="track"><span style="width:'+(gold/w.missions.length*100)+'%"></span></div><span>⭐ '+gold+'</span></div><div class="lr-path"><svg class="lr-road" viewBox="0 0 320 280" preserveAspectRatio="none" aria-hidden="true"><path d="M155 3 C155 35 55 35 55 77 S260 115 260 154 S85 194 85 236"></path></svg>'+nodes+'</div><div class="lr-world-foot">'+(gold===w.missions.length?'🏆 Welt gemeistert! ¡Has dominado este mundo!':gold===0?'🦉 Consejo: la primera misión está abierta. ¡Consigue excelencia para abrir el siguiente nodo!':'✨ Vas avanzando: '+gold+' estrella(s) de excelencia conseguidas.')+'</div></section>';
 }).join('');
}
function showPlay(html){$('lr-map').style.display='none';$('lr-play').style.display='block';$('lr-play').innerHTML=html}
function open(){addUI();renderMap();if(typeof App!=='undefined'&&App.show)App.go('lernreise')}
function back(){if(typeof App!=='undefined'&&App.show)App.show('dashboard');else renderMap()}
function start(w,m){if(!unlocked(w,m))return;run={w,m,q:0,correct:0,answered:false};showQuestion()}
function showQuestion(){const w=worlds[run.w],m=w.missions[run.m],q=m.qs[run.q];run.answered=false;run.hinted=false;showPlay('<div class="lr-game"><div class="lr-game-top"><div><div class="lr-qprogress">'+w.level+' · '+(run.m+1)+'. MISSION · '+(run.q+1)+'/'+m.qs.length+'</div><div class="lr-bar"><span style="width:'+(run.q/m.qs.length*100)+'%"></span></div></div><div class="lr-game-buddy">'+w.icon+'</div></div><h2>'+m.title+'</h2><p class="lr-question">'+q[0]+'</p><div class="lr-options">'+q[1].map((v,i)=>'<button class="lr-option" id="lr-o'+i+'" onclick="Lernreise.answer('+i+')">'+String.fromCharCode(65+i)+'. '+v+'</button>').join('')+'</div><button class="lr-hint-btn" onclick="Lernreise.hint()">💡 Dame una pista</button><div id="lr-hint" class="lr-hint"></div><div id="lr-feedback" class="lr-feedback"></div><button id="lr-next" class="lr-next" disabled onclick="Lernreise.next()">Comprobar respuesta →</button></div>')}
function hint(){if(!run||run.answered)return;run.hinted=true;const q=worlds[run.w].missions[run.m].qs[run.q];const hintText=q[4]||'Lee la frase con atención. En alemán, el verbo conjugado suele ocupar la segunda posición en la oración principal y va al final en muchas subordinadas.';const el=$('lr-hint');if(el){el.textContent=hintText;el.classList.add('show')}}
function answer(i){if(!run||run.answered)return;run.answered=true;const q=worlds[run.w].missions[run.m].qs[run.q],ok=i===q[2];if(ok)run.correct++;q[1].forEach((_,j)=>{const b=$('lr-o'+j);b.disabled=true;if(j===q[2])b.classList.add('good');else if(i===j)b.classList.add('bad')});const f=$('lr-feedback');f.className='lr-feedback show '+(ok?'good':'bad');f.textContent=(ok?'✨ ¡Correcto! ':'💡 Revisa esto. ')+q[3];$('lr-next').disabled=false;$('lr-next').textContent=run.q===worlds[run.w].missions[run.m].qs.length-1?'Ver resultado →':'Siguiente →'}
function next(){if(!run||!run.answered)return;if(run.q<worlds[run.w].missions[run.m].qs.length-1){run.q++;showQuestion();return}finish()}
function finish(){
 const w=worlds[run.w],mission=w.missions[run.m],key=w.id+'-'+run.m,total=mission.qs.length;
 const pct=Math.round(run.correct/total*100),needed=Math.ceil(total*.7),excellentNeeded=Math.ceil(total*.9);
 const passed=run.correct>=needed,excellent=run.correct>=excellentNeeded;
 const firstPass=passed&&!state.done[key],firstExcellent=excellent&&!state.excellent[key];
 if(passed)state.done[key]=true;
 if(excellent)state.excellent[key]=true;
 if(firstPass)state.xp+=run.correct*10;
 if(firstExcellent)state.xp+=25;
 if(firstPass||firstExcellent)save();
 const widx=run.w,midx=run.m;
 const headline=excellent?'¡EXCELENTE!':passed?'¡Misión completada!':'¡Cada intento te enseña!';
 const sub=excellent?'Has ganado una estrella dorada y abierto el siguiente nodo.':passed?'Has completado la misión, pero necesitas un resultado excelente (90% o más) para abrir el siguiente paso.':'Necesitas al menos '+needed+' respuestas correctas para completar la misión. ¡Repasa y vuelve a probar!';
 showPlay('<div class="lr-result"><div class="emoji">'+(excellent?'🏆':passed?'🌱':'🦉')+'</div><h2>'+headline+'</h2><p>Resultado: <b>'+run.correct+'/'+total+' ('+pct+'%)</b></p><p>'+sub+'</p>'+(excellent?'<div class="lr-sticker">⭐ ESTRELLA DE EXCELENCIA +25 XP</div>':'')+'<p>⭐ XP de esta partida: '+((firstPass?run.correct*10:0)+(firstExcellent?25:0))+'</p><button class="lr-next" onclick="Lernreise.map()">Volver al camino 🗺️</button></div>');
 renderMap();$('lr-map').style.display='none';$('lr-play').style.display='block';
 if(excellent){let nw=widx,nm=midx+1;if(nm>=w.missions.length){nw++;nm=0}if(nw<worlds.length&&unlocked(nw,nm))$('lr-play').querySelector('.lr-result').insertAdjacentHTML('beforeend','<button class="lr-secondary" onclick="Lernreise.start('+nw+','+nm+')">¡Seguir el camino! →</button>')}
}
function map(){renderMap()}
window.Lernreise={open,back,start,answer,next,map,hint};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addUI);else addUI();
})();