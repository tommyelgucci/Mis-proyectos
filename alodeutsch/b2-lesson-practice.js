/* Additional original retrieval practice for the 12 Sicher! B2 lessons.
   Uses the existing FlashUI/SRS and Quiz so progress is stored consistently. */
const B2LessonPractice = {
  escape(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));},
  vocabulary(part,lesson){
    if(part==='b21') return lesson.vocab.map(([de,es,en])=>({de,es,en}));
    return lesson.words.map(([de,es],i)=>({de,es,en:B22_EN[lesson.id].words[i]}));
  },
  newQuiz(part,lesson){
    const words=this.vocabulary(part,lesson);
    let indexes;
    if(part==='b21'){
      const previous=lesson.questions.map(q=>q[0]).concat(B2_SICHER_AB[lesson.id].map(q=>q[0])).join(' ');
      indexes=words.map((w,i)=>i).filter(i=>!previous.includes(words[i].de)).slice(0,6);
    }else indexes=[6,7,8,9,10,11]; // The original B2.2 quiz already uses words 0–5.
    return indexes.map(i=>{
      const picks=[i,(i+3)%words.length,(i+6)%words.length];
      const options=picks.map(j=>words[j]);
      return {t:'mc',q:`Was bedeutet «${this.escape(words[i].de)}»?`,
        o:options.map(w=>this.escape(w.es)),oEn:options.map(w=>this.escape(w.en)),a:0,
        x:`${this.escape(words[i].de)} = ${this.escape(words[i].es)}.`,
        xen:`${this.escape(words[i].de)} = ${this.escape(words[i].en)}.`};
    });
  },
  cards(part,lesson){
    const vocab=this.vocabulary(part,lesson).map(w=>({
      f:this.escape(w.de),fen:this.escape(w.de),b:this.escape(w.es),bEn:this.escape(w.en)
    }));
    const grammar=part==='b21'
      ? lesson.grammar.map(([title,es,en,example])=>({title,es,en,example}))
      : lesson.notes.map(([title,es,example],i)=>({title,es,en:B22_EN[lesson.id].notes[i],example}));
    return vocab.concat(grammar.map(g=>({
      f:`¿Cómo funciona ${this.escape(g.title)}?`,fen:`How does ${this.escape(g.title)} work?`,
      b:this.escape(g.es),bEn:this.escape(g.en),ex:this.escape(g.example),exEn:this.escape(g.example)
    })));
  },
  deckId(id){return 100+id;},
  openFlash(id){Current.levelId='b2';App.openDeck(this.deckId(id));},
  install(){
    const decks=LEVELS.b2.DECKS;
    const lessons=[...B2_SICHER_LESSONS.map(l=>['b21',l]),...B22_SICHER_LESSONS.map(l=>['b22',l])];
    for(const [part,lesson] of lessons){
      const id=this.deckId(lesson.id);
      if(decks.some(d=>d.id===id)) continue;
      decks.push({id,e:lesson.icon,title:`Lektion ${lesson.id} · ${lesson.title||lesson.de}`,
        sub:part==='b21'?'Sicher! B2.1':'Sicher! B2.2',color:lesson.id%2?'#e5f2ff':'#efeafa',
        cards:this.cards(part,lesson)});
    }
  }
};
B2LessonPractice.install();
