/* Browser speech for theory lessons. Voice and progress are local to this page. */
const LessonNarrator = {
  roots:{module:'panel-study','b1-lesson':'b1-lesson-body','b2-lesson':'b2-lesson-body',
    'b22-lesson':'b22-lesson-body','c11-lesson':'c11-lesson-body'},
  activeId:null,segments:[],position:0,token:0,paused:false,playing:false,
  supported(){return 'speechSynthesis' in window&&'SpeechSynthesisUtterance' in window;},
  words(root){
    const raw=[];
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
      const node=walker.currentNode,el=node.parentElement;
      if(!el||!el.getClientRects().length||el.closest('.lesson-narrator,button,select,textarea,input,script,style,details:not([open]),.word-counter,[hidden],[aria-hidden="true"]'))continue;
      const value=node.textContent.replace(/\s+/g,' ').trim();
      if(!value||/^[\d\s/✓✗←→]+$/.test(value))continue;
      const explicit=el.closest('[lang]');
      let lang=explicit&&/^de\b/i.test(explicit.getAttribute('lang'))?'de-CH':
        Lang.current==='en'?'en-GB':'es-ES';
      if(el.closest('.ex-box,em,i'))lang='de-CH';
      raw.push({text:value,lang});
    }
    const chunks=[];
    for(const item of raw){
      const pieces=item.text.match(/.{1,165}(?:\s|$)|\S+/g)||[];
      for(const piece of pieces){
        const text=piece.trim();if(!text)continue;
        const last=chunks[chunks.length-1];
        if(last&&last.lang===item.lang&&last.text.length+text.length<165)last.text+=' '+text;
        else chunks.push({text,lang:item.lang});
      }
    }
    return chunks;
  },
  mount(id){
    const root=document.getElementById(this.roots[id]);if(!root)return;
    if(this.activeId===id)this.stop();
    const previous=root.querySelector('.lesson-narrator');if(previous)previous.remove();
    const en=Lang.current==='en',toolbar=document.createElement('div');
    toolbar.className='lesson-narrator intro-box';
    toolbar.style.cssText='margin:12px 0 18px;padding:14px;display:flex;flex-wrap:wrap;align-items:center;gap:8px';
    toolbar.innerHTML=`<strong style="width:100%">🔊 ${en?'Listen to this lesson':'Escuchar esta lección'}</strong>
      <button type="button" class="pill-btn" data-narrator="play">▶ ${en?'Listen':'Escuchar'}</button>
      <button type="button" class="results-btn-s" data-narrator="pause" disabled>⏸ ${en?'Pause':'Pausar'}</button>
      <button type="button" class="results-btn-s" data-narrator="stop" disabled>■ ${en?'Stop':'Detener'}</button>
      <small data-narrator="status" role="status" aria-live="polite" style="width:100%">${this.supported()?(en?'Uses your device voice.':'Usa la voz de tu dispositivo.'):(en?'Voice reading is unavailable in this browser.':'La lectura por voz no está disponible en este navegador.')}</small>`;
    root.prepend(toolbar);
    toolbar.querySelector('[data-narrator="play"]').disabled=!this.supported();
    toolbar.querySelector('[data-narrator="play"]').onclick=()=>this.play(id);
    toolbar.querySelector('[data-narrator="pause"]').onclick=()=>this.togglePause();
    toolbar.querySelector('[data-narrator="stop"]').onclick=()=>this.stop();
  },
  voice(lang){
    const voices=window.speechSynthesis.getVoices();
    return voices.find(v=>v.lang.toLowerCase()===lang.toLowerCase())||
      voices.find(v=>v.lang.toLowerCase().startsWith(lang.slice(0,2).toLowerCase()))||null;
  },
  status(message){
    const root=this.activeId&&document.getElementById(this.roots[this.activeId]);
    const toolbar=root&&root.querySelector('.lesson-narrator');if(!toolbar)return;
    const en=Lang.current==='en';
    toolbar.querySelector('[data-narrator="status"]').textContent=message;
    toolbar.querySelector('[data-narrator="play"]').textContent=this.playing?'↺ '+(en?'Restart':'Reiniciar'):'▶ '+(en?'Listen':'Escuchar');
    toolbar.querySelector('[data-narrator="pause"]').disabled=!this.playing;
    toolbar.querySelector('[data-narrator="pause"]').textContent=this.paused?'▶ '+(en?'Resume':'Reanudar'):'⏸ '+(en?'Pause':'Pausar');
    toolbar.querySelector('[data-narrator="stop"]').disabled=!this.playing;
  },
  play(id){
    if(!this.supported())return;
    this.stop();
    const root=document.getElementById(this.roots[id]);if(!root)return;
    this.segments=this.words(root);if(!this.segments.length)return;
    this.activeId=id;this.position=0;this.playing=true;this.paused=false;
    Speech.stop();
    this.next(this.token);
  },
  next(token){
    if(token!==this.token||!this.playing)return;
    if(this.position>=this.segments.length){
      const en=Lang.current==='en';
      this.finish(en?'Lesson finished.':'Lección terminada.');return;
    }
    const part=this.segments[this.position++],utterance=new SpeechSynthesisUtterance(part.text);
    utterance.lang=part.lang;utterance.rate=0.92;
    const voice=this.voice(part.lang);if(voice)utterance.voice=voice;
    utterance.onend=()=>this.next(token);
    utterance.onerror=()=>this.next(token);
    this.status(`${Lang.current==='en'?'Reading':'Leyendo'} ${this.position}/${this.segments.length}`);
    window.speechSynthesis.speak(utterance);
  },
  togglePause(){
    if(!this.playing)return;
    if(this.paused){window.speechSynthesis.resume();this.paused=false;}
    else{window.speechSynthesis.pause();this.paused=true;}
    this.status(this.paused?(Lang.current==='en'?'Paused':'Pausado'):
      `${Lang.current==='en'?'Reading':'Leyendo'} ${this.position}/${this.segments.length}`);
  },
  finish(message){
    const id=this.activeId;
    this.playing=false;this.paused=false;this.segments=[];this.activeId=id;
    this.status(message);this.activeId=null;
  },
  stop(){
    const id=this.activeId;
    this.token++;this.playing=false;this.paused=false;this.segments=[];
    if(id&&this.supported())window.speechSynthesis.cancel();
    if(id){this.status(Lang.current==='en'?'Stopped.':'Detenido.');this.activeId=null;}
  }
};

(()=>{
  const screens=[
    [ModuleView,'open','module'],[ModuleView,'renderSprechen','module'],
    [B1Lessons,'renderLesson','b1-lesson'],[B2Lessons,'renderLesson','b2-lesson'],
    [B22Lessons,'renderLesson','b22-lesson'],[C11Lessons,'renderLesson','c11-lesson']
  ];
  for(const [controller,method,id] of screens){
    const original=controller[method];
    controller[method]=function(...args){
      LessonNarrator.stop();
      const result=original.apply(this,args);
      LessonNarrator.mount(id);
      return result;
    };
  }
  const show=App.show;
  App.show=function(id,...args){
    if(LessonNarrator.activeId&&id!==LessonNarrator.activeId)LessonNarrator.stop();
    return show.call(this,id,...args);
  };
})();
