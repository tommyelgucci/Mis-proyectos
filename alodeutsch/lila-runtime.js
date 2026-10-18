(function(){
'use strict';
if(window.__ALO_LILA_RUNTIME__)return;window.__ALO_LILA_RUNTIME__=true;
var svg='<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 39 17 14 42 27Q60 17 78 27L103 14 99 42Q108 56 103 78Q96 103 60 108Q24 103 17 78Q12 56 21 39Z" fill="#9a76e8" stroke="#6543a5" stroke-width="3"/><ellipse cx="42" cy="52" rx="17" ry="19" fill="#fffaf2"/><ellipse cx="78" cy="52" rx="17" ry="19" fill="#fffaf2"/><circle cx="44" cy="54" r="6" fill="#322849"/><circle cx="76" cy="54" r="6" fill="#322849"/><circle cx="46" cy="52" r="2" fill="#fff"/><circle cx="78" cy="52" r="2" fill="#fff"/><path d="M53 68 60 76 67 68Z" fill="#ffb45e" stroke="#6543a5" stroke-width="2"/></svg>';
var star=/[⭐🌟★]/g;
var css=document.createElement('style');
css.textContent='.alo-lila-inline{display:inline-flex!important;width:1.35em;height:1.35em;vertical-align:middle;align-items:center;justify-content:center}.alo-lila-inline svg{width:100%;height:100%}.alo-lernreise-home{display:flex;align-items:center;gap:16px;margin:18px auto;padding:18px;max-width:900px;border:2px solid #d8c5ff;border-radius:22px;background:linear-gradient(120deg,#f1eaff,#fff 70%,#eaf8e4);color:#322849}.alo-lernreise-home .alo-lila-inline{width:72px;height:72px;flex-shrink:0}.alo-lernreise-home h2{margin:0 0 6px;color:#57399c}.alo-lernreise-home p{margin:0 0 12px}.alo-lernreise-home button{border:0;border-radius:12px;padding:12px 16px;background:#8057cf;color:#fff;font-weight:800}@media(max-width:520px){.alo-lernreise-home{padding:12px;gap:10px}.alo-lernreise-home .alo-lila-inline{width:54px;height:54px}}';
document.head.appendChild(css);
function owl(){var x=document.createElement('span');x.className='alo-lila-inline';x.setAttribute('role','img');x.setAttribute('aria-label','Lila, mascota de ALOdeutsch');x.innerHTML=svg;return x}
function replaceStars(){
 var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),list=[];
 while(w.nextNode()){var n=w.currentNode;if(star.test(n.nodeValue||''))list.push(n);star.lastIndex=0}
 list.forEach(function(n){var p=n.parentElement,brand=false;
  for(var d=0;p&&d<12;p=p.parentElement,d++){
   var c=String(p.className||'')+' '+String(p.id||'');
   var t=String(p.innerText||p.textContent||'').replace(/\s+/g,' ').trim();
   if(/logo|brand|header|nav|home-title|app-title|sidebar|menu|dashboard/i.test(c)||/^(HEADER|NAV|H1|H2)$/i.test(p.tagName)||(t.length<180&&/alodeutsch|hola.{0,50}ola/i.test(t))){brand=true;break}
   if(/^(BUTTON|A)$/i.test(p.tagName)&&t.length<120&&/ola/i.test(t)){brand=true;break}
  }
  if(!brand)return;
  var frag=document.createDocumentFragment(),parts=(n.nodeValue||'').split(star);
  parts.forEach(function(part,i){if(part)frag.appendChild(document.createTextNode(part));if(i<parts.length-1)frag.appendChild(owl())});
  if(n.parentNode)n.parentNode.replaceChild(frag,n);
 });
}
function addEntry(){
 var dash=document.getElementById('scr-dashboard');if(!dash||dash.querySelector('.alo-lernreise-home'))return;
 var els=Array.from(dash.querySelectorAll('button,a,[role="button"],h1,h2,h3,h4,p,div,span,strong,label'));
 var hits=els.filter(function(e){var t=String(e.innerText||e.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();return t.length>0&&t.length<140&&(t.includes('elegir mi ruta manualmente')||t.includes('elegir ruta manualmente')||(t.includes('elegir mi ruta')&&t.includes('manual'))||t.includes('choose route manually')||t.includes('choose your route manually')||t.includes('manually choose a route'))});
 hits.sort(function(a,b){return (a.innerText||a.textContent||'').trim().length-(b.innerText||b.textContent||'').trim().length});
 if(!hits.length)return;
 var target=hits[0],section=target;
 if(/^(BUTTON|A)$/i.test(section.tagName)&&section.parentElement)section=section.parentElement;
 if(section.parentElement&&section.parentElement!==dash){var pt=(section.parentElement.innerText||section.parentElement.textContent||'').trim();if(pt.length<400)section=section.parentElement}
 var card=document.createElement('section');card.className='alo-lernreise-home';
 card.innerHTML='<span class="alo-lila-inline" role="img" aria-label="Lila">'+svg+'</span><div><h2>Aprende jugando con Lernreise</h2><p>Misiones, historias, escucha y retos para avanzar paso a paso desde A1 hasta C1.</p><button type="button">Entrar a Lernreise →</button></div>';
 card.querySelector('button').addEventListener('click',function(){window.location.href='/ruta-aprendizaje.html'});
 section.parentNode.insertBefore(card,section.nextSibling);
}
function run(){replaceStars();addEntry()}
function start(){run();new MutationObserver(run).observe(document.body,{childList:true,subtree:true,characterData:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();