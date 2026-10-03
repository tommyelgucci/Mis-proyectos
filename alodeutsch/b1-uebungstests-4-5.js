/* Zusätzliche Übungstests 4 und 5. Die Lesetexte sind für kleine Bildschirme
   gekürzt und sprachlich geprüft; die Aufgaben bleiben nach Prüfungsteilen geordnet. */
const B1ExtraTests = {
  tests: {
    4: {
      headings: ['Kunst für die Gesundheit','Wohnungsnot in Deutschland','Mal- und Tanzkurse in Wien','Mehr Sportunterricht für Schweizer Schüler','Zukunftspläne: Billigere Wohnungen in Salzburg','Ein Viertel der Salzburger besitzt eine Wohnung','Wettschwimmen für Schüler!','Wohnungssituation in Deutschland','Gesunde Schüler durch mehr Sport','Projekt: Turnen statt Schwimmen'],
      snippets: [
        ['Laut einer Untersuchung besitzen 39,5 Prozent der Deutschen eine Eigentumswohnung. Im europäischen Vergleich ist der Anteil weiterhin gering.','h'],
        ['In Rüti beginnt am Samstag ein Schwimmwettkampf für Schüler bis 15 Jahre. Mitmachen ist wichtiger als Siegen.','g'],
        ['Ein österreichisches Schulprojekt zeigt: Zwei zusätzliche Sportstunden pro Woche verbessern die Gesundheit der Kinder und beugen Übergewicht vor.','i'],
        ['Ein Kongress beschäftigt sich damit, wie Kunst die Gesundheit beeinflussen kann. Mal-, Tanz- und Musikkurse kommen in der Therapie zum Einsatz.','a'],
        ['Wohnungen in Salzburg sind besonders teuer. Ein grösseres Angebot soll die Kosten in den kommenden fünf Jahren senken.','e']
      ],
      article: 'Raphael geht gern zur Schule. Er wünscht sich allerdings einen etwas strengeren Lehrer und mehr Hausaufgaben als die bisherigen zehn Minuten am Tag. Zu Beginn des Schuljahres sprach die Klasse viel über Regeln und Strafen. Raphael fand diese Gespräche nötig, wollte aber auch mehr lernen. Er möchte gute Noten bekommen, die Sekundarschule besuchen und später vielleicht eine Lehre als Mechaniker machen. Sibylle geht ebenfalls gern zur Schule. Nach sechs gemeinsamen Jahren wird sie ihre Klasse sehr vermissen. Sie hatte gute Lehrkräfte, hat aber die Aufnahmeprüfung für die Sekundarschule nicht geschafft. Rückblickend meint sie, dass sie in der fünften und sechsten Klasse mehr hätte arbeiten müssen. Nach der Schule möchte sie Verkäuferin werden und später nach Amerika reisen.',
      reading: [
        ['Raphaels Lehrer …','gibt nur wenig Hausaufgaben.','hat den Schülern die Strafen angekündigt.','ist sehr streng.','a'],
        ['Raphael findet die Gespräche über Regeln …','unwichtig.','notwendig, möchte aber auch mehr lernen.','wichtiger als den Unterricht.','b'],
        ['Raphael …','besucht bereits die Sekundarschule.','hat Pläne für die Zukunft.','möchte bald ins Ausland gehen.','b'],
        ['Sibylle wird nach der Schule …','sofort nach Amerika fahren.','ihre Mitschüler vermissen.','eine Lehrstelle als Mechaniker suchen.','b'],
        ['Sibylle hätte bessere Ergebnisse gehabt, wenn sie …','andere Lehrkräfte gehabt hätte.','früher mehr gelernt hätte.','weniger Freundinnen gehabt hätte.','b']
      ],
      ads:{a:'Schwimmschule: einwöchiger Kurs im Hotel für Anfänger und Fortgeschrittene.',b:'Stelle am Empfang und an der Telefonzentrale; Kontakt mit Kunden.',c:'Schule für Altenpflege: berufsbegleitende und dreijährige Vollzeitausbildung.',d:'Pädagogisches Team: Nachhilfe bei schulischen Problemen.',e:'Modeschmuck: Verkäuferinnen im Flughafenhotel gesucht.',f:'Telemarketing: Verkauf am Telefon, flexible Arbeitszeit von zu Hause.',g:'Büromöbel: günstige neue und gebrauchte Schreibtische, Schränke und Stühle.',h:'Maschinenverkauf: gebrauchte Bohr-, Dreh- und Fräsmaschinen.',i:'Möbel-Sonderposten: reduzierte Wohn- und Schlafzimmermöbel.',j:'Alten- und Pflegeheim: freie Pflegeplätze.',k:'Konstruktionsbüro: technische Zeichner und Techniker gesucht.',l:'Restaurant sucht Kellnerin oder Kellner.'},
      situations:[
        ['Nach dem Umzug suchen Sie günstige Möbel fürs Wohnzimmer.','i'],['Sie suchen eine Arbeit mit direktem Kontakt und Telefongesprächen.','b'],['Sie möchten täglich schwimmen, ohne an einem Kurs teilzunehmen.','x'],['Eine Bekannte möchte beruflich von zu Hause telefonieren.','f'],['Ältere Nachbarn brauchen dauerhaft Betreuung in einem Heim.','j'],['Freunde interessieren sich für technische Geräte und Maschinen.','h'],['Eine Bekannte sucht eine Ausbildung in der Altenpflege.','c'],['Ihre Freundin sucht eine Stelle im Verkauf von Schmuck.','e'],['Die Kinder von Freunden brauchen Nachhilfe.','d'],['Ein Freund sucht einen günstigen Schreibtisch.','g']
      ],
      grammar1: {
        text:'Lieber Wolfgang, jetzt bin ich endlich in London angekommen. Ich werde ein [21] Jahr an der London School of Economics studieren. Der Anfang [22] ganz schön schwierig. Zwar hatte ich mich [23] von Deutschland aus für ein Studentenwohnheim beworben und dort ein Zimmer [24]. Aber das Haus lag an einer grossen Strasse. Bei [25] Lärm konnte ich nicht arbeiten. Mein Privatzimmer ist teuer, [26] hier kann ich in Ruhe lernen. Nachmittags gehe ich [27] die Bibliothek. Mit [28] ökonomischen Fachausdrücken habe ich Schwierigkeiten. Das wird nur besser, [29] ich viel übe. Ich werde [30] bald wieder schreiben. Viele Grüsse, Ludger',
        rows:[
          [21,['ganzen','ganzer','ganzes'],'c'],[22,['gab','machte','war'],'c'],[23,['denn','nur','schon'],'c'],[24,['gemietet','mietet','mietete'],'a'],[25,['diese','diesem','diesen'],'b'],[26,['aber','ob','sondern'],'a'],[27,['in','nach','zu'],'a'],[28,['den','denen','die'],'a'],[29,['wann','was','wenn'],'c'],[30,['dich','dir','du'],'b']]
      },
      grammar2: {
        text:'Sehr geehrter Herr Meier, ich habe Ihr Inserat gelesen und wäre sehr [31] interessiert, mit Ihnen nach München zu fahren. Die Benzinkosten teilen wir [32]. Wir könnten uns beim Fahren abwechseln, [33] Sie es wünschen. Ich habe [34] fünf Jahren den Führerschein und fahre sehr [35]. Als Gepäck [36] ich nur einen kleinen Koffer. Bitte teilen Sie mir so bald wie [37] mit, ob ein Platz frei ist. Sonst müsste ich mich [38] einer anderen Möglichkeit erkundigen. Ich bin [39] der Nummer 33 85 37 erreichbar. Ich [40] Sie dann zurückrufen. Mit freundlichen Grüssen, Peter Kaufmann',
        bank:{a:'AUCH',b:'DARAN',c:'DASS',d:'FALLS',e:'HABE',f:'MÖGLICH',g:'NACH',h:'SEIT',i:'SICHER',j:'UNS',k:'UNTER',l:'WEIL',m:'WEIT',n:'WERDE',o:'WOLLTE'},
        answers:['b','j','d','h','i','e','f','g','k','n']
      },
      writing:{from:'Michaela',message:'Michaela vive desde enero en Sídney, estudia allí y cuenta que tiene un nuevo novio llamado David. Quizá se casen el próximo año. Te invita a visitarla.',points:['Reacciona a la noticia sobre David.','Cuenta cómo van tus conocimientos de inglés.','Responde a la invitación a Sídney.','Pregunta por sus estudios.']},
      speaking:{topic:'Familie',prompt:'A: Nadja vive con su marido y dos hijos en un pueblo. Pasa mucho tiempo con sus padres y la familia de su hermana, y desea otro hijo. B: Anton vive solo y disfruta su libertad; dedica su energía al trabajo, pero quizá forme una familia más adelante.',plan:'Cuidar durante un fin de semana a dos niños de 6 y 10 años: sábado y domingo, plan para lluvia o sol, compras, comida y bebidas.'},
      listening:[
        '41. Der Sprecher findet es gut, wenn er öfters mehrere freie Tage hat.','42. Die Sprecherin hat nichts gegen Sonntagsarbeit.','43. Der Mann fürchtet, dass das Leben bald nur noch aus Arbeit besteht.','44. Die Frau meint, dass die Angestellten besser bezahlt werden müssten.','45. Der Sprecher meint, dass durch Wochenendarbeit mehr Leute beschäftigt werden können.',
        '46. Die Gruppe um Frau Baumeister will einsamen Menschen helfen.','47. Die Telefonnummer der Gruppe bekommt man auch beim Rundfunk.','48. Wenn man bei der Gruppe anruft, läuft immer der Anrufbeantworter.','49. Die Telefonkette ist eine Adressenliste von Leuten, die Kontakt suchen.','50. Man kann mit Hilfe der Liste Leute anrufen, die die gleichen Interessen haben.','51. Man bezahlt für die Liste der Namen einmal eine bestimmte Summe.','52. Bevor man die Liste bekommt, muss man an einem Treffen teilnehmen.','53. Die Treffen finden einmal wöchentlich statt.','54. Man kann auch eine Liste von Leuten ausserhalb Hamburgs bekommen.','55. Es gibt eine Liste mit Leuten aus ganz Europa.',
        '56. Eine Damenhandtasche wurde beim Kundenschalter gefunden.','57. Es folgen die Nachrichten mit Tim Neudecker.','58. Bei einer Bestellung muss man mitteilen, wie man bezahlen möchte.','59. Ein Münchner und ein Passauer Auto parken falsch.','60. Das Restaurant ist auf vegetarische Gerichte spezialisiert.'
      ]
    },
    5: {
      headings:['Viele Deutsche werden älter als 80 Jahre','Zu Fuss durch die herbstliche Natur','Tipps für die Planung von Reisen in ferne Länder','Gastfamilien für Sommerferien gesucht','Mit dem Boot durch die Schweiz','Wer anderen hilft, lebt länger','Nur wenige träumen vom ewigen Leben','Sommerferien für die ganze Familie','Winterurlaub in Deutschland','Ältere Menschen brauchen viel Hilfe'],
      snippets:[
        ['Psychologen untersuchten ältere Ehepaare und stellten fest: Wer anderen Menschen hilft, lebt im Durchschnitt länger.','f'],
        ['Ein neuer Reiseführer beschreibt 15 einfache Wanderungen entlang von Flüssen in der Schweiz.','b'],
        ['Eine Umfrage zeigt: Nur wenige Menschen möchten unbegrenzt leben. Viele finden 70 bis 90 Jahre ausreichend.','g'],
        ['Eine Internetseite erklärt, was man vor einer Fernreise beachten muss, und bietet ein Forum für Fragen.','c'],
        ['Eine Hilfsorganisation sucht Familien, die Kinder aus benachteiligten Verhältnissen im Sommer aufnehmen.','d']
      ],
      article:'Die Eltern eines Mädchens wollten es Jona nennen. Das Standesamt in Bernau lehnte den Namen zunächst ab, weil Jona in seinem Buch nur als Jungenname stand. Die Eltern gingen vor Gericht. Viele Eltern möchten einen einzigartigen Vornamen. Modenamen werden häufig durch bekannte Menschen aus Sport, Film und Fernsehen beeinflusst. Das Standesamt entscheidet zunächst, ob ein Name zulässig ist. Ein Vorname darf nicht lächerlich sein und das Geschlecht des Kindes muss erkennbar sein. Nach eineinhalb Jahren Rechtsstreit durfte das Mädchen Jona Chantale heissen: Durch den zweiten Vornamen war klar, dass es ein Mädchen ist.',
      reading:[
        ['Warum gingen Jonas Eltern vor Gericht?','Weil die englische Aussprache verboten war.','Weil das Standesamt den Vornamen zunächst ablehnte.','Weil die Beamtin sie beleidigte.','b'],
        ['Woher kommen Modenamen häufig?','Von berühmten Persönlichkeiten.','Immer aus der Geschichte.','Aus dem Zufall.','a'],
        ['Was wünschen sich viele Eltern heute?','Den Vornamen ihrer Eltern für ihr Kind.','Einen Namen ohne Bedeutung.','Einen besonderen Vornamen.','c'],
        ['Wer entscheidet zuerst über die Zulässigkeit eines Namens?','Die Schule.','Das Standesamt.','Der Bürgermeister.','b'],
        ['Wie lange dauerte der Rechtsstreit um Jona Chantale?','Ein paar Tage.','Mehr als ein Jahr.','Er dauert noch an.','b']
      ],
      ads:{a:'Restaurant Tokyo: japanische Spezialitäten am Abend.',b:'Messe für Hunde und Zubehör.',c:'Landhaus zum Löwen: Restaurant mit Gartenbetrieb am Wochenende.',d:'Vermisst: schwarze Katze entlaufen; Hinweise erbeten.',e:'Buch mit Bildern und Tonaufnahmen mitteleuropäischer Vogelarten.',f:'Veranstaltungsservice verleiht Geschirr, Gläser, Tische und Stühle.',g:'Orchester: Eintrittskarten für ein öffentliches Konzert.',h:'Italienisches Restaurant: geöffnet von Mittwoch bis Sonntag.',i:'Kurs über Vogelstimmen und die Bestimmung von Vögeln.',j:'Italienischer Zustelldienst: Pizza, Pasta und warme Gerichte nach Hause.',k:'Student betreut Hund oder Katze während des Urlaubs.',l:'Catering: belegte Brötchen und Salate mit Lieferung ab 50 Stück.'},
      situations:[
        ['Sie haben eine schwarze Katze gefunden und suchen ihren Besitzer.','d'],['Für Gäste brauchen Sie warmes Essen per Hauslieferung.','j'],['Sie möchten heute Abend in eine Diskothek gehen.','x'],['Während Ihres Urlaubs brauchen Sie jemanden für Ihren Hund.','k'],['Für eine grosse Party brauchen Sie Geschirr und Möbel.','f'],['Sie sollen belegte Brötchen für eine Firmenfeier bestellen.','l'],['Sie suchen ein Buch über verschiedene Vogelarten als Geschenk.','e'],['Sie möchten am Wochenende italienisch essen gehen.','h'],['Sie suchen Musik, die auf Ihrer Betriebsfeier spielt.','x'],['Sie möchten am Wochenende draussen essen gehen.','c']
      ],
      grammar1:{
        text:'Hallo Helga, ich habe die Stelle als Kiosk-Verkäuferin bekommen. Es hat sich [21], dass ich mich beworben habe. Danke für den [22] Tipp! Wichtig ist für [23], dass ich die Arbeitszeit flexibel wählen kann. Das geht bei [24] Arbeit gut. In den Ferien kann ich [25] zusätzliche Arbeitstage abmachen. Beim ersten Arbeitstag war ich froh, [26] ich nicht allein war. Eine Kollegin hat mir [27] erklärt. Mit vielen Menschen kommt man [28] dieser Arbeit in Kontakt: Manche Kunden, [29] kaum grüssen, gehen schnell wieder. Die meisten sind aber [30]. Herzliche Grüsse, Franziska',
        rows:[[21,['gelohnt','lohnt','lohnte'],'a'],[22,['gutem','guten','guter'],'b'],[23,['dich','mich','sich'],'b'],[24,['diese','dieser','dieses'],'b'],[25,['erst','noch','und'],'b'],[26,['damit','dass','trotzdem'],'b'],[27,['alle','allen','alles'],'c'],[28,['bei','durch','zu'],'a'],[29,['denen','derer','die'],'c'],[30,['freundlich','freundliche','freundlichst'],'a']]
      },
      grammar2:{
        text:'Sehr geehrte Familie Schmidt-Lopez, ich habe [31] Anzeige in der Zeitung [32] Interesse gelesen. Ich möchte vor Beginn meines Studiums noch [33] Monate in Spanien verbringen und eine [34] Fremdsprache lernen. Englisch und Französisch habe ich in [35] Schule gelernt. Es wäre [36] toll, noch Spanisch zu lernen! Ich kann Kinder gut betreuen, [37] ich selbst zwei jüngere Brüder habe. Ich [38] auch noch gern wissen: Wo würde ich wohnen, [39] der Sprachkurs vormittags oder abends und ab [40] könnte ich beginnen? Mit freundlichen Grüssen, Vera Meiser',
        bank:{a:'DEINE',b:'DER',c:'DIE',d:'EINIGE',e:'GANZ',f:'HÄTTE',g:'IHRE',h:'MIT',i:'MÖCHTE',j:'VIEL',k:'VON',l:'WANN',m:'WÄRE',n:'WEIL',o:'WEITERE'},
        answers:['g','h','d','o','b','e','n','i','m','l']
      },
      writing:{from:'Marc',message:'Marc ha celebrado su cumpleaños y sus amigos le regalaron billetes de lotería para un año. Si gana un millón de euros, quiere comprarse una motocicleta y visitarte. Te pregunta qué harías tú y cuándo cumples años.',points:['Felicita a Marc por su cumpleaños.','Opina sobre la idea de comprar una motocicleta.','Explica qué harías con un millón de euros.','Cuenta cómo celebras tu cumpleaños.']},
      speaking:{topic:'Reisen',prompt:'A: Klaus viaja mucho por trabajo y ya se ha cansado de pasar de un hotel a otro. B: Stefanie disfruta viajar, visita a sus amigos en el extranjero y aprovecha los descuentos de tren para estudiantes.',plan:'Debes entregar un trabajo escrito y tu ordenador se averió: ¿repararlo, pedir otro prestado, usar el de un amigo, escribir a mano o pedir más tiempo?'},
      listening:[
        '41. Der Sprecher liebt Eis und Schnee.','42. Die Sprecherin lebt gern in der Stadt.','43. Die Sprecherin findet die Menschen in ihrer Heimat freundlicher.','44. Der Sprecher hat ein grosses Haus gebaut.','45. Die Sprecherin ist mit ihrer Wohnsituation zufrieden.',
        '46. Heike Klinger arbeitet täglich acht Stunden.','47. Sie schreibt auch Theaterstücke und Bücher.','48. Frau Klinger hat ein technisches Studium abgeschlossen.','49. Als Studentin hat sie auch im Theater gearbeitet.','50. Am Anfang wollte keine Zeitung die Artikel von Heike Klinger.','51. Zukünftige Journalisten sollten zwei Fachgebiete gut kennen.','52. Die Schreibwerkstatt gibt es seit einem Jahr.','53. In der Schreibwerkstatt arbeiten viele Journalistinnen aus ganz Europa.','54. Die Teilnehmenden sprechen zuerst über verschiedene Zeitungsartikel.','55. Für Anfänger gibt es Kurse, die vier Monate dauern.',
        '56. Die Sendung „Naturparks in Deutschland“ wird heute nach den 8-Uhr-Nachrichten gesendet.','57. Rechtsanwalt Pausch ist am Freitag nicht zu erreichen.','58. Ein Liter Heidi-Milch kostet heute 29 Cent.','59. Sie sollen bei der Ausfahrt Solingen die Autobahn verlassen.','60. Ihr Zug nach Genf fährt von Gleis 15.'
      ]
    }
  },
  escape(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));},
  home(){
    const box=document.getElementById('b1-official-home-body'); if(!box)return;
    const card=document.createElement('section'); card.className='intro-box'; card.style.margin='14px 16px';
    card.innerHTML='<h3>📚 Más simulacros B1</h3><p>Übungstest 4 y 5: 40 preguntas de lectura y 40 Sprachbausteine con corrección, además de dos tareas de escritura y expresión oral. Hörverstehen queda como vista previa hasta contar con el audio original.</p><div style="display:flex;gap:9px;flex-wrap:wrap">'+[4,5].map(n=>{const a=Store.officialPartStats('b1-test-'+n);return '<button class="pill-btn" type="button" onclick="B1ExtraTests.open('+n+')">Übungstest '+n+(a.t?' · '+a.c+'/'+a.t:'')+'</button>';}).join('')+'</div>';
    box.appendChild(card);
  },
  open(n){
    this.current=n; const t=this.tests[n]; App.go('b1-official-part');
    document.getElementById('banner-sub').textContent='📝 telc B1 · Übungstest '+n;
    const body=document.getElementById('b1-official-part-body');body.innerHTML='';
    body.innerHTML='<div class="intro-box" style="margin:14px 16px"><b>Übungstest '+n+'</b> · Lecturas adaptadas para pantalla. El resultado de estas prácticas se registra aparte del Übungstest 1. Las respuestas de la parte oral y escrita requieren revisión humana.</div>';
    const add=(title,content)=>{const el=document.createElement('section');el.className='text-card';el.style.margin='14px 16px';el.innerHTML='<div class="text-card-title">'+title+'</div><div class="text-card-body">'+content+'</div>';body.appendChild(el);return el;};
    add('📖 Leseverstehen Teil 1 · Überschriften',t.headings.map((s,i)=>'<b>'+String.fromCharCode(97+i)+')</b> '+this.escape(s)).join('<br>'));
    t.snippets.forEach(([text,key],i)=>this.question(body,n,'lv'+(i+1),(i+1)+'. '+text,Object.keys(t.headings).map((_,j)=>[String.fromCharCode(97+j),String.fromCharCode(97+j)+') '+t.headings[j]]),key));
    add('📖 Leseverstehen Teil 2 · '+(n===4?'Was Schüler über die Schule denken':'Der Mensch braucht einen Vornamen'),this.escape(t.article));
    t.reading.forEach((row,i)=>this.question(body,n,'lv'+(i+6),(i+6)+'. '+row[0],['a','b','c'].map((letter,j)=>[letter,letter+') '+row[j+1]]),row[4]));
    add('📖 Leseverstehen Teil 3 · Anzeigen',Object.entries(t.ads).map(([k,v])=>'<b>'+k+')</b> '+this.escape(v)).join('<br>')+'<br><b>x)</b> Ningún anuncio corresponde.');
    t.situations.forEach(([s,answer],i)=>this.question(body,n,'lv'+(i+11),(i+11)+'. '+s,Object.entries(t.ads).map(([k,v])=>[k,k+') '+v]).concat([['x','x) Ninguno']]),answer));
    for(const [part,first] of [['grammar1',21],['grammar2',31]]){
      const g=t[part];add('🧩 Sprachbausteine Teil '+(part==='grammar1'?1:2),this.escape(g.text).replace(/\[(\d+)\]/g,'<b style="color:var(--sky-ink)">[$1]</b>'));
      if(g.rows)g.rows.forEach(([num,options,correct])=>this.question(body,n,'sb'+num,'Lücke '+num,['a','b','c'].map((letter,j)=>[letter,letter+') '+options[j]]),correct));
      else {add('Wortliste a–o',Object.entries(g.bank).map(([k,v])=>'<b>'+k+')</b> '+v).join(' · '));g.answers.forEach((answer,i)=>this.question(body,n,'sb'+(i+first),'Lücke '+(i+first),Object.entries(g.bank).map(([k,v])=>[k,k+') '+v]),answer));}
    }
    add('🎧 Hörverstehen · Aufgaben 41–60','Lee las 20 afirmaciones antes de escuchar. Aún falta el audio original; no se califican ni se muestra una respuesta inventada.<br><br>'+t.listening.map(this.escape).join('<br>'));
    add('✍️ Schriftlicher Ausdruck · 30 Minuten','<b>E-Mail de '+t.writing.from+':</b> '+this.escape(t.writing.message)+'<br><br><b>Responde a estos cuatro puntos:</b><br>'+t.writing.points.map((p,i)=>(i+1)+'. '+this.escape(p)).join('<br>')+'<br><br>Incluye Betreff, Anrede y despedida.');
    const input=document.createElement('textarea');input.className='schreib-textarea';input.style.margin='0 16px';input.style.width='calc(100% - 32px)';input.placeholder='Escribe aquí tu respuesta en alemán…';input.value=localStorage.getItem('alo-b1-test'+n+'-writing')||'';input.addEventListener('input',()=>localStorage.setItem('alo-b1-test'+n+'-writing',input.value));body.appendChild(input);
    add('🗣️ Mündlicher Ausdruck · 15 Minuten','Teil 1: presentación, vivienda, familia, estudios, idiomas y profesión.<br><b>Teil 2 · '+this.escape(t.speaking.topic)+':</b> '+this.escape(t.speaking.prompt)+'<br>Resume ambas posturas, da tu opinión y cuenta una experiencia.<br><b>Teil 3 · Gemeinsam etwas planen:</b> '+this.escape(t.speaking.plan)+'<br>Propón, responde y llegad a un acuerdo.');
    const back=document.createElement('button');back.className='results-btn-s';back.style.margin='18px 16px 30px';back.textContent='← Volver a telc B1';back.onclick=()=>OfficialExamB1.open();body.appendChild(back);
  },
  question(body,n,id,prompt,options,answer){
    const card=document.createElement('div');card.className='q-card';card.style.margin='10px 16px';
    const label=document.createElement('div');label.className='q-text';label.textContent=prompt;card.appendChild(label);
    const select=document.createElement('select');select.className='zuordnung-select';select.style.marginTop='9px';
    select.add(new Option('— Elige una respuesta —',''));
    for(const [value,title] of options)select.add(new Option(title,value));
    const feedback=document.createElement('div');feedback.style.marginTop='7px';
    select.onchange=()=>{if(!select.value)return;const ok=select.value===answer;select.className='zuordnung-select '+(ok?'correct':'wrong');feedback.textContent=ok?'✓ Richtig':'✗ La respuesta correcta es: '+options.find(([v])=>v===answer)[1];Store.gradeOfficial('b1-test-'+n,id,ok);if(ok){Sound.good();Gamification.add(10);}else Sound.wrong();};
    card.append(select,feedback);body.appendChild(card);
  }
};
const B1ExtraOriginalHome=OfficialExamB1.renderHome;
OfficialExamB1.renderHome=function(){B1ExtraOriginalHome.call(this);B1ExtraTests.home();};
