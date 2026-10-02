/* Repaso mixto de clase: selección de los tres Kahoot compartidos por la usuaria. */
const B1_KAHOOT_REVIEW = {
  groups: {
    2: [
      ['Das ist der Lehrer, ...... uns immer so viel Arbeit gibt.',['der','dem','den','die'],'der','Lehrer es masculino y realiza la acción de geben: nominativo.'],
      ['Der Hund, ...... ich gestern gekauft habe, ist krank.',['den','der','dem','das'],'den','Ich habe den Hund gekauft: acusativo masculino.'],
      ['Du bist die Frau, ..... ich mein Herz schenken will!',['der','den','die','deren'],'der','schenken exige un destinatario en dativo: der Frau.'],
      ['Wo sind die Kinder, ..... du gestern geholfen hast?',['denen','deren','die','dem'],'denen','helfen + dativo; en plural, el relativo es denen.'],
      ['Kennst du das Mädchen, ..... Bruder mich gestern geküsst hat?',['dessen','deren','denen','der'],'dessen','El hermano de la chica: das Mädchen es neutro, genitivo dessen.']
    ],
    7: [
      ['Ich bin müde! Ich ...',['lege mich ins Bett','lege mich im Bett','lege mich in der Bett','lege mich in die Bett'],'lege mich ins Bett','Movimiento hacia el interior: in + acusativo; das Bett → ins Bett.'],
      ['Ich setze mich ...',['neben dich','neben dir','bei dir','auf dich'],'neben dich','sich setzen indica movimiento hacia una posición: neben + acusativo.'],
      ['Die Schule liegt ...',['zwischen dem Supermarkt und der Bäckerei','zwischen dem Supermarkt und die Bäckerei','zwischen der Supermarkt und der Bäckerei'],'zwischen dem Supermarkt und der Bäckerei','Ubicación fija: zwischen + dativo; dem Supermarkt, der Bäckerei.'],
      ['Julia hat Angst ...',['vor dem Mathelehrer','von dem Mathelehrer','für den Mathelehrer','aus dem Mathelehrer'],'vor dem Mathelehrer','Angst haben vor + dativo.'],
      ['Warum bleibst du zu Hause?',['Wegen des Regens','Wegen dem Regen','Während des Regens'],'Wegen des Regens','En la norma escrita: wegen + genitivo, des Regens.'],
      ['Mit wem kommst du?',['Mit meinen Freunden','Mit meine Freunde','Mit meine Freunden'],'Mit meinen Freunden','mit + dativo plural: meinen Freunden.']
    ],
    8: [
      ['Sandra ist das Mädchen, mit ..... ich gestern ins Kino gegangen bin.',['dem','das','die','der'],'dem','mit + dativo; Mädchen es neutro: mit dem.'],
      ['Das ist die Übung, ohne ..... ich meine Prüfung nicht geschafft hätte.',['die','das','der','dem'],'die','ohne + acusativo; Übung es femenino: ohne die.'],
      ['Der Louvre ist ein Museum, in ..... man die Mona Lisa sehen kann.',['dem','das','denen','den'],'dem','Ubicación dentro del museo: in + dativo; Museum es neutro.'],
      ['Zeig mir mal den Stuhl, auf ..... du den ganzen Abend gesessen hast.',['dem','der','den','das'],'dem','sentarse en un lugar fijo: auf + dativo; Stuhl es masculino.'],
      ['Helena ist die einzige Frau, in ..... er sich je verliebt hat.',['die','der','deren','das'],'die','sich verlieben in + acusativo; Frau es femenino.'],
      ['Es sind diese Bäume, zwischen ..... mein Elternhaus immer gestanden hat.',['denen','die','dem','deren'],'denen','Ubicación fija: zwischen + dativo plural = denen.'],
      ['Ist das die Kollegin, von ..... du erzählt hast?',['der','die','dem','den'],'der','Pregunta extra para tu dificultad: erzählen von + dativo; Kollegin es femenino: von der.']
    ],
    13: [
      ['Ich habe einen ________ Job. (neu)',['neuen','neuer','neuem','neues'],'neuen','einen marca acusativo masculino; el adjetivo termina en -en.'],
      ['Das ist die Brille einer _________ Frau. (intelligent)',['intelligenten','intelligente','intelligenter'],'intelligenten','einer Frau está en genitivo femenino; declinación mixta: -en.'],
      ['Dieser Ball gehört einem _________ Fussballspieler. (bekannt)',['bekannten','bekanntem','bekannter'],'bekannten','einem marca dativo masculino; el adjetivo termina en -en.'],
      ['Auf dem Tisch steht ein ________ Laptop. (schwarz)',['schwarzer','schwarze','schwarzes','schwarzen'],'schwarzer','Laptop es masculino, sujeto en nominativo; ein no marca género: -er.'],
      ['Ich liebe das Ende dieses ________ Filmes. (spannend)',['spannenden','spannendes','spannendem'],'spannenden','dieses Filmes: genitivo masculino; tras dieses, -en.'],
      ['Ich hätte gern ein ____________ Smartphone. (weiss)',['weisses','weissem','weissen','weisse'],'weisses','Smartphone es neutro en acusativo; ein + adjetivo en -es.']
    ]
  },
  all: [],
  start(){
    if(Lang.current==='en')return;
    App.go('quiz-run');
    document.getElementById('banner-sub').textContent='🎯 Repaso mixto B1 · Kahoot de clase';
    Quiz.start('quiz-run-body',this.all,{scoreKey:'b1-kahoot-mixed-review',keepOrder:false});
  }
};
for(const [id,items] of Object.entries(B1_KAHOOT_REVIEW.groups)){
  const lesson=B1_INTENSIVE_LESSONS.find(l=>l.id===Number(id));
  if(!lesson)continue;
  for(const [q,o,answer,x] of items){
    const item={t:'mc',q,o,a:o.indexOf(answer),x};
    if(!lesson.q.some(existing=>existing.q===q))lesson.q.push(item);
    B1_KAHOOT_REVIEW.all.push(item);
  }
}
const B1KahootPreviousRender=B1Lessons.renderLesson.bind(B1Lessons);
B1Lessons.renderLesson=function(){
  B1KahootPreviousRender();
  if(this.currentId!==8||Lang.current==='en')return;
  const body=document.getElementById('b1-lesson-body');
  if(!body)return;
  const card=document.createElement('section');
  card.className='intro-box';
  card.style.marginTop='20px';
  card.innerHTML='<h3>🎯 Repaso mixto del Kahoot de clase</h3><p>Relativos, adjetivos y preposiciones: '+B1_KAHOOT_REVIEW.all.length+' preguntas con corrección y explicación. La última pregunta sobre «von der» practica la forma que recordabas.</p><button class="pill-btn" type="button" onclick="B1_KAHOOT_REVIEW.start()">Empezar repaso mixto</button>';
  body.insertBefore(card,body.lastElementChild);
};
