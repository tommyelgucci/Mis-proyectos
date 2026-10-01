 items:[
  {q:'«Das kommt mir spanisch vor.»',o:['Me parece sospechoso.','No sé nada de eso.','Hablo español.'],a:0,e:'Se dice cuando algo parece raro.'},
  {q:'«Mein Name ist Hase.»',o:['No sé nada de eso.','Todo está bien.','Tengo miedo.'],a:0,e:'Equivale a «Ich weiss davon nichts».'},
  {q:'«In den sauren Apfel beissen.»',o:['Hacer algo desagradable pero necesario.','Comer más fruta.','Confiar ciegamente.'],a:0,e:'Se acepta una tarea que no apetece.'},
  {q:'«Hand aufs Herz!»',o:['¡Sé sincera!','¡Cuidado con la mano!','¡Todo está bien!'],a:0,e:'Pide una respuesta honesta.'},
  {q:'«Kalte Füsse bekommen.»',o:['Asustarse y echarse atrás.','Tener frío literalmente.','Estar muy contenta.'],a:0,e:'Se usa cuando alguien pierde el valor de hacer algo.'},
  {q:'«Alles in Butter!»',o:['Todo está bien.','Algo está sospechoso.','No sé nada.'],a:0,e:'Equivale a «Alles in Ordnung».'},
  {q:'«Vertrauen ist gut, Kontrolle ist besser.»',o:['Conviene comprobar incluso si se confía.','Nunca se debe confiar en nadie.','Hay que confiar sin comprobar.'],a:0,e:'La frase valora comprobar por uno mismo.'},
  {q:'«Jemandem blind vertrauen.»',o:['Confiar plenamente en alguien.','Controlar a alguien.','No conocer a alguien.'],a:0,e:'Blind no se refiere aquí a la vista.'},
  {q:'Warum hält der Polizist den Fahrer an?',o:['Weil er ohne Freisprechanlage telefoniert.','Weil er zu schnell gefahren ist.','Weil er falsch geparkt hat.'],a:0,e:'El conductor pregunta si iba demasiado rápido; esa no es la causa de la parada.'},
  {q:'Was bedeutet «Das kommt überhaupt nicht infrage»?',o:['Una negativa rotunda.','Una disculpa.','Una promesa.'],a:0,e:'El policía rechaza dejar pasar la multa.'},
  {q:'Eine Frau aus der Deutschschweiz fühlt sich in Freiburg fremd. Warum?',o:['Sie versteht am Anfang die französischsprachigen Menschen kaum.','Sie hat ihre Heimat verlassen müssen.','Sie hat dort nie studiert.'],a:0,e:'Se puede sentir extrañeza incluso dentro del propio país.'},
  {q:'Was hilft laut den Interviews gegen das Gefühl von Fremdheit?',o:['Offen auf Menschen zugehen und die Sprache lernen.','Mit niemandem sprechen.','Alle neuen Erfahrungen vermeiden.'],a:0,e:'Los entrevistados mencionan conocer gente, aprender la lengua y abrirse a lo nuevo.'}
 ],
 render(){return this.items.map((x,i)=>`<div class="fast-review-item" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:12px;margin:12px 0"><strong>${i+1}. ${x.q}</strong>${x.o.map((o,j)=>`<label class="opt" style="display:block"><input type="radio" name="fast11_${i}" value="${j}"> ${o}</label>`).join('')}<button type="button" onclick="L11FastReview.check(${i})">Comprobar</button><div id="fast11_fb${i}" aria-live="polite"></div></div>`).join('')},
 check(i){const choice=document.querySelector(`input[name="fast11_${i}"]:checked`),out=document.getElementById('fast11_fb'+i),x=this.items[i];if(!choice){out.textContent='Elige una opción.';return}out.textContent=(Number(choice.value)===x.a?'✓ Correcto. ':'✗ Respuesta: '+x.o[x.a]+' ')+x.e}
};


