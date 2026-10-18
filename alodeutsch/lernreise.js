(function(){
'use strict';
const STORE_KEY='alodeutsch_lernreise_v1';
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
let state={};try{state=JSON.parse(localStorage.getItem(STORE_KEY)||'{}')}catch(e){}state.done=state.done||{};state.xp=state.xp||0;
let run=null;
const $=id=>document.getElementById(id);
function save(){try{localStorage.setItem(STORE_KEY,JSON.stringify(state))}catch(e){}}
function unlocked(w,m){return w===0&&m===0?true:m>0?!!state.done[worlds[w].id+'-'+(m-1)]:!!state.done[worlds[w-1].id+'-'+(worlds[w-1].missions.length-1)]}
function addUI(){
 if(typeof App!=='undefined'&&App.subMap)App.subMap.lernreise='🗺️ Lernreise A1–C2';
 if(!$('scr-lernreise')){
  const screen=document.createElement('div');screen.id='scr-lernreise';screen.className='scr';
  screen.innerHTML='<div class="lr-wrap"><button class="lr-back" onclick="Lernreise.back()">← Volver a tus niveles</button><div class="lr-hero"><small>ALOdeutsch · LERNREISE</small><h1>Tu camino hasta C2</h1><p>Misiones cortas, explicaciones y progreso paso a paso.</p><div class="lr-bar"><span id="lr-overall"></span></div><div id="lr-total" class="lr-total"></div></div><div id="lr-map"></div><div id="lr-play" style="display:none"></div></div>';
  const dashScreen=document.getElementById('scr-dashboard');if(dashScreen)dashScreen.insertAdjacentElement('afterend',screen);
 }
 if(!document.getElementById('lernreise-cta')){
  const card=document.createElement('div');card.id='lernreise-cta';card.className='call-cta-card';card.setAttribute('role','button');card.tabIndex=0;card.onclick=()=>Lernreise.open();card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();Lernreise.open()}};
  card.innerHTML='<div class="call-cta-emoji">🗺️</div><div><div class="call-cta-title">Lernreise · A1–C2</div><div class="call-cta-sub">Avanza por niveles, supera misiones y gana XP</div></div>';
  const dash=document.querySelector('#scr-dashboard .route-wrap');const first=dash&&dash.querySelector('.call-cta-card');if(first)first.insertAdjacentElement('afterend',card);
 }
 const style=document.createElement('style');style.textContent='.lr-wrap{max-width:760px;margin:auto;padding:10px 14px 35px}.lr-back{border:0;background:none;color:var(--ola-d,var(--ink));font-weight:800;padding:8px 0 14px}.lr-hero{padding:20px;border-radius:22px;background:linear-gradient(135deg,#e3f4d9,#f2f7df 65%,#fff0bf);margin-bottom:20px}.lr-hero small{font-weight:900;letter-spacing:.1em;color:#327a50}.lr-hero h1{font-size:clamp(27px,6vw,38px);margin:8px 0;line-height:1.1}.lr-hero p{font-size:13px;color:#506550;margin:0}.lr-bar{height:8px;background:#ffffffb8;border-radius:20px;overflow:hidden;margin-top:16px}.lr-bar span{display:block;height:100%;width:0;background:#327a50;transition:width .2s}.lr-total{font-size:12px;color:#506550;margin-top:6px}.lr-world{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:13px;margin:12px 0;display:grid;grid-template-columns:46px 1fr;gap:11px}.lr-world.locked{opacity:.55}.lr-icon{width:46px;height:46px;border-radius:15px;display:grid;place-items:center;font-size:25px}.lr-world h3{font-size:15px;margin:0 0 3px}.lr-world p{font-size:12px;color:var(--ink-soft);margin:0 0 8px}.lr-missions{grid-column:1/-1;display:flex;gap:7px;flex-wrap:wrap}.lr-mission{border:1px solid var(--border);background:var(--bg,var(--card));color:var(--ink);border-radius:12px;padding:9px 11px;font-size:12px;font-weight:800}.lr-mission:disabled{opacity:.4}.lr-mission.done{background:#e4f7e9;border-color:#8ac99b}.lr-game{background:var(--card);border:1px solid var(--border);border-radius:22px;padding:18px;margin-top:15px}.lr-game h2{font-size:22px;line-height:1.2}.lr-qprogress{color:var(--ink-soft);font-size:12px;font-weight:800}.lr-options{display:grid;gap:9px}.lr-option{border:2px solid var(--border);border-radius:13px;padding:13px;text-align:left;background:var(--card);color:var(--ink);font-weight:750}.lr-option.good{background:#e4f7e9;border-color:#31925a}.lr-option.bad{background:#fff0ef;border-color:#d66b69}.lr-feedback{display:none;border-radius:12px;padding:12px;margin-top:12px;font-size:13px}.lr-feedback.show{display:block}.lr-feedback.good{background:#e4f7e9;color:#205d34}.lr-feedback.bad{background:#fff0df;color:#815020}.lr-next{width:100%;border:0;border-radius:13px;padding:13px;margin-top:14px;background:var(--ola,var(--ink));color:#fff;font-weight:900}.lr-next:disabled{opacity:.4}.lr-result{text-align:center;padding:24px 10px}.lr-result .emoji{font-size:56px}.lr-result h2{font-size:25px}.lr-result p{color:var(--ink-soft);font-size:14px}.lr-secondary{border:1px solid var(--border);background:var(--card);border-radius:12px;padding:11px 14px;font-weight:800;margin:5px}';
 if(!document.getElementById('lr-styles')){style.id='lr-styles';document.head.appendChild(style)}
}
function renderMap(){
 const total=worlds.reduce((n,w)=>n+w.missions.length,0),done=Object.keys(state.done).filter(k=>state.done[k]).length;
 $('lr-overall').style.width=(done/total*100)+'%';$('lr-total').textContent=done+' / '+total+' misiones completadas · ⭐ '+state.xp+' XP';
 $('lr-map').style.display='block';$('lr-play').style.display='none';
 $('lr-map').innerHTML=worlds.map((w,wi)=>{const count=w.missions.filter((m,mi)=>state.done[w.id+'-'+mi]).length;const open=w.missions.some((m,mi)=>unlocked(wi,mi));return '<section class="lr-world '+(open?'':'locked')+'"><div class="lr-icon" style="background:'+w.color+'">'+w.icon+'</div><div><small style="font-weight:900;color:#327a50">'+w.level+'</small><h3>'+w.name+'</h3><p>'+w.desc+'</p><div style="height:5px;background:var(--border);border-radius:8px;overflow:hidden"><span style="display:block;width:'+(count/w.missions.length*100)+'%;height:100%;background:#327a50"></span></div></div><div class="lr-missions">'+w.missions.map((m,mi)=>{const key=w.id+'-'+mi,d=!!state.done[key],u=unlocked(wi,mi);return '<button class="lr-mission '+(d?'done':'')+'" '+(!u?'disabled':'')+' onclick="Lernreise.start('+wi+','+mi+')">'+(d?'✓ ':u?'▶ ':'🔒 ')+(mi+1)+'. '+m.title+'</button>'}).join('')+'</div></section>'}).join('');
}
function showPlay(html){$('lr-map').style.display='none';$('lr-play').style.display='block';$('lr-play').innerHTML=html}
function open(){addUI();renderMap();if(typeof App!=='undefined'&&App.show)App.show('lernreise')}
function back(){if(typeof App!=='undefined'&&App.show)App.show('dashboard');else renderMap()}
function start(w,m){if(!unlocked(w,m))return;run={w,m,q:0,correct:0,answered:false};showQuestion()}
function showQuestion(){const w=worlds[run.w],m=w.missions[run.m],q=m.qs[run.q];run.answered=false;showPlay('<div class="lr-game"><div class="lr-qprogress">'+w.level+' · MISIÓN '+(run.m+1)+' · PREGUNTA '+(run.q+1)+'/'+m.qs.length+'</div><div class="lr-bar"><span style="width:'+(run.q/m.qs.length*100)+'%"></span></div><h2>'+m.title+'</h2><p>'+q[0]+'</p><div class="lr-options">'+q[1].map((v,i)=>'<button class="lr-option" id="lr-o'+i+'" onclick="Lernreise.answer('+i+')">'+String.fromCharCode(65+i)+'. '+v+'</button>').join('')+'</div><div id="lr-feedback" class="lr-feedback"></div><button id="lr-next" class="lr-next" disabled onclick="Lernreise.next()">Siguiente →</button></div>')}
function answer(i){if(!run||run.answered)return;run.answered=true;const q=worlds[run.w].missions[run.m].qs[run.q],ok=i===q[2];if(ok)run.correct++;q[1].forEach((_,j)=>{const b=$('lr-o'+j);b.disabled=true;if(j===q[2])b.classList.add('good');else if(i===j)b.classList.add('bad')});const f=$('lr-feedback');f.className='lr-feedback show '+(ok?'good':'bad');f.textContent=(ok?'✨ ¡Correcto! ':'💡 Revisa esto. ')+q[3];$('lr-next').disabled=false;$('lr-next').textContent=run.q===worlds[run.w].missions[run.m].qs.length-1?'Ver resultado →':'Siguiente →'}
function next(){if(!run||!run.answered)return;if(run.q<worlds[run.w].missions[run.m].qs.length-1){run.q++;showQuestion();return}finish()}
function finish(){const w=worlds[run.w],key=w.id+'-'+run.m,earned=run.correct*10,needed=Math.ceil(w.missions[run.m].qs.length*2/3),passed=run.correct>=needed,firstPass=passed&&!state.done[key];if(firstPass){state.done[key]=true;state.xp+=earned;save()}const widx=run.w,midx=run.m;showPlay('<div class="lr-result"><div class="emoji">'+(passed?'🏆':'🌱')+'</div><h2>'+(passed?'¡Misión superada!':'¡Sigue practicando!')+'</h2><p>Resultado: '+run.correct+'/'+w.missions[midx].qs.length+' correctas.</p><p>'+(passed?'Has desbloqueado la siguiente misión.':'Necesitas '+needed+' respuestas correctas. Repasa y vuelve a intentarlo.')+'</p><p>⭐ '+(passed?earned:0)+' XP</p><button class="lr-next" onclick="Lernreise.map()">Volver al mapa</button></div>');renderMap();$('lr-map').style.display='none';$('lr-play').style.display='block';if(passed){let nw=widx,nm=midx+1;if(nm>=w.missions.length){nw++;nm=0}if(nw<worlds.length&&unlocked(nw,nm))$('lr-play').querySelector('.lr-result').insertAdjacentHTML('beforeend','<button class="lr-secondary" onclick="Lernreise.start('+nw+','+nm+')">Siguiente misión →</button>')}}
function map(){renderMap()}
window.Lernreise={open,back,start,answer,next,map};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addUI);else addUI();
})();