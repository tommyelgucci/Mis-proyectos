/* Sicher! C1.2 (Lektionen 7–12): original companion data.
   The uploaded Kursbuch/Arbeitsbuch informs the syllabus, not the wording. */
const C12_LESSONS = [
  {
    id:7,icon:'💶',title:'Finanzen',es:'Dinero, deuda y economía',en:'Money, debt and the economy',
    points:[
      ['Verbalstil und Nominalstil','El estilo verbal presenta una acción en una oración: weil die Preise steigen. El nominal condensa la causa en un sintagma: wegen des Preisanstiegs. Al transformar, conserva el agente, el tiempo y la relación lógica; un nombre aislado no expresa por sí solo quién actuó.','Verbal style uses a clause, such as weil die Preise steigen. Nominal style condenses the cause into a noun phrase, such as wegen des Preisanstiegs. Preserve agent, time and logical relation when rewriting.',['Weil die Zinsen stiegen, wurde der Kredit teurer.','Wegen des Zinsanstiegs wurde der Kredit teurer.','Da die Stadt die Gebühren senkte, sanken die Kosten.']],
      ['Kausalität präzise ausdrücken','weil/da + verbo final justifican una afirmación; denn une principales y mantiene verbo en segunda posición; wegen/aufgrund + genitivo va con un nombre. deshalb expresa consecuencia, no introduce la causa. Distingue causa de correlación en textos económicos.','weil/da take a subordinate clause with final verb; denn joins main clauses; wegen/aufgrund + genitive take a noun. deshalb signals a consequence rather than introducing a cause. Distinguish cause from correlation.',['Die Ausgaben stiegen, weil die Miete erhöht wurde.','Die Ausgaben stiegen, denn die Miete wurde erhöht.','Aufgrund der Mieterhöhung stiegen die Ausgaben.']],
      ['Adjektive für Bewertungen','-bar puede indicar posibilidad, -los ausencia y -würdig valor evaluado; comprueba siempre la palabra real y el contexto. bezahlbar no promete que todo el mundo pueda pagar; schuldenfrei describe una situación sin deudas.','-bar can express possibility, -los absence, and -würdig a judgment. Check the actual word and its context. bezahlbar does not mean affordable for everyone; schuldenfrei means free of debt.',['Der Betrag ist für viele Haushalte kaum bezahlbar.','Nach fünf Jahren war sie schuldenfrei.','Der Vorschlag ist diskussionswürdig.']]
    ],
    words:[['die Tilgung','la amortización de una deuda','debt repayment','Die Tilgung des Kredits dauert mehrere Jahre.'],['die Verschuldung','el endeudamiento','indebtedness','Die Verschuldung des Haushalts nahm zu.'],['der Zinssatz','el tipo de interés','interest rate','Der Zinssatz wurde angehoben.'],['die Kaufkraft','el poder adquisitivo','purchasing power','Steigende Preise schwächen die Kaufkraft.'],['eine Rücklage bilden','crear una reserva','to build up savings','Für unerwartete Ausgaben bilden wir eine Rücklage.']],
    reading:['Ein Budget mit Spielraum','Ein Verein wollte seine Mitgliedsbeiträge erhöhen, weil die Miete für seine Räume gestiegen war. Zunächst schlug der Vorstand einen einheitlichen höheren Beitrag vor. Mehrere Mitglieder wandten ein, dass dieser Betrag für Menschen mit geringem Einkommen schwer zu tragen sei. Daraufhin beschloss die Gruppe zwei Beitragssätze und eine freiwillige Spendenmöglichkeit. Die Einnahmen werden nach einem halben Jahr überprüft. Erst dann soll entschieden werden, ob das Modell die laufenden Kosten deckt.',[
      ['Warum plante der Verein zunächst höhere Beiträge?',['Die Raummiete war gestiegen.','Alle Mitglieder verlangten mehr Leistungen.','Er wollte eine neue Bank gründen.'],0],
      ['Was bleibt noch zu prüfen?',['Ob die neuen Einnahmen die Kosten decken','Ob die Miete früher niedriger war','Ob es zwei Beitragssätze gibt'],0]]],
    quiz:[['___ der höheren Miete wurden die Beiträge angepasst.',['Aufgrund','Weil','Deshalb'],0,'aufgrund + genitivo nombra la causa.','aufgrund + genitive names the cause.'],['Die Beiträge stiegen, ___ die Raummiete erhöht worden war.',['weil','denn','wegen'],0,'weil + subordinada con verbo final.','weil introduces a clause with final verb.'],['Welche nominale Form entspricht «weil die Zinsen stiegen»?',['wegen des Zinsanstiegs','wegen die Zinsen stiegen','deshalb die Zinsen stiegen'],0,'El estilo nominal necesita un grupo nominal.','Nominal style requires a noun phrase.'],['Was bedeutet «schuldenfrei»?',['ohne Schulden','ohne Einkommen','ohne Zahlungsfrist'],0,'-frei indica ausencia de deuda en esta palabra.','Here -frei means free of debt.']],
    tasks:[['Reformula de verbal a nominal: «Weil die Miete erhöht wurde, stiegen die Ausgaben.»','Change a causal clause into a noun phrase: “Weil die Miete erhöht wurde, stiegen die Ausgaben.”','Aufgrund der Mieterhöhung stiegen die Ausgaben.','aufgrund + genitivo; conserva la relación causal.','Use aufgrund + genitive and preserve causality.'],['Reformula «Wegen des Zinsanstiegs wurde der Kredit teurer» con weil.','Rewrite “Wegen des Zinsanstiegs wurde der Kredit teurer” using weil.','Der Kredit wurde teurer, weil die Zinsen stiegen.','En la subordinada, verbo al final.','Put the finite verb at the end of the subordinate clause.'],['Valora un aumento de precios con un dato y una reserva.','Assess a price increase using a fact and a reservation.','Die Kosten stiegen um zehn Prozent; für einige Haushalte dürfte das schwer bezahlbar sein.','Separa dato de conjetura.','Separate a fact from an inference.']],
    writing:['Escribe 160–190 palabras para comparar dos presupuestos domésticos ficticios. Explica una causa, una consecuencia y una propuesta realista.','Write 160–190 words comparing two fictional household budgets. Explain a cause, a consequence and a realistic proposal.'],
    speaking:['Debate dos medidas contra el endeudamiento y responde a una objeción.','Discuss two ways to reduce indebtedness and address an objection.']
  },
  {
    id:8,icon:'🧩',title:'Psychologie',es:'Inteligencia emocional y comportamiento',en:'Emotional intelligence and behaviour',
    points:[
      ['Gerundiv als Passiversatz','zu + participio presente delante de un nombre describe algo que debe o puede hacerse: die zu prüfenden Angaben. El contexto decide si expresa obligación o posibilidad. El participio se declina como adjetivo y el grupo entero va delante del sustantivo.','An attributive zu + present participle describes something that must or can be done: die zu prüfenden Angaben. Context determines necessity or possibility. The participle takes an adjective ending and precedes the noun.',['Die zu klärenden Fragen stehen auf der Liste.','Die noch zu prüfende Annahme betrifft nur Erwachsene.','Die Angaben, die überprüft werden müssen, sind die zu überprüfenden Angaben.']],
      ['Modalität in Aktiv und Passiv','En el pasivo modal, el modal rige werden + participio II: Die Reaktion kann beobachtet werden. Una reformulación activa con man puede cambiar el foco, pero debe conservar el mismo grado de certeza u obligación. No confundas kann con muss.','In a modal passive, the modal governs werden + past participle: Die Reaktion kann beobachtet werden. An active man-clause changes focus but should preserve the degree of possibility or obligation.',['Die Reaktion kann beobachtet werden.','Man kann die Reaktion beobachten.','Das Ergebnis muss sorgfältig interpretiert werden.']],
      ['bekommen-Passiv und Suffixe','bekommen/erhalten + participio II pone al receptor en posición de sujeto: Sie bekam die Methode erklärt. Es habitual con verbos que admiten destinatario en dativo. Los sufijos -sam, -haft y -lich crean adjetivos diferentes; prüfe el significado de cada uno.','bekommen/erhalten + past participle makes the recipient the subject: Sie bekam die Methode erklärt. It works with verbs that allow a dative recipient. The suffixes -sam, -haft and -lich create different adjectives; learn their meanings.',['Die Fachperson erklärte ihr die Methode.','Sie bekam die Methode erklärt.','ein einfühlsames Gespräch · eine fehlerhafte Einschätzung']]
    ],
    words:[['die Wahrnehmung','la percepción','perception','Die Wahrnehmung kann sich unter Stress verändern.'],['die Einschätzung','la valoración','assessment','Ihre Einschätzung stützt sich auf mehrere Gespräche.'],['einfühlsam','empático','empathetic','Die Beraterin reagierte einfühlsam.'],['die Belastung','la carga o presión','strain','Eine hohe Belastung erschwert Entscheidungen.'],['die Rückmeldung','la retroalimentación','feedback','Sie erhielt eine sachliche Rückmeldung.']],
    reading:['Ein Test mit Grenzen','Eine Firma bietet freiwillig einen kurzen Fragebogen zu Arbeitsgewohnheiten an. Die Ergebnisse sollen den Teams Anregungen für Gespräche liefern. Sie werden nicht für Personalentscheidungen verwendet. Eine Psychologin erklärt, dass Antworten von der aktuellen Belastung abhängen können. Deshalb sei es problematisch, aus einem einzelnen Wert auf eine dauerhafte Eigenschaft zu schliessen. Die Mitarbeitenden bekommen ihre Ergebnisse persönlich erklärt und können entscheiden, ob sie diese im Team besprechen möchten.',[
      ['Wofür sollen die Ergebnisse dienen?',['Als Anlass für Gespräche','Als einziges Kriterium für Einstellungen','Als medizinische Diagnose'],0],
      ['Welche Grenze nennt die Psychologin?',['Ein Wert belegt keine dauerhafte Eigenschaft.','Alle Antworten bleiben immer gleich.','Belastung spielt keine Rolle.'],0]]],
    quiz:[['Die Angaben müssen geprüft werden. Welche attributive Form passt?',['die zu prüfenden Angaben','die zu geprüften Angaben','die prüfenden zu Angaben'],0,'Gerundiv: zu + Partizip I con terminación.','Gerundive: zu + present participle with adjective ending.'],['Welche Form bewahrt posibilidad pasiva?',['Die Reaktion kann beobachtet werden.','Die Reaktion muss beobachtet werden.','Die Reaktion hat beobachten können.'],0,'kann + participio II + werden.','Use kann + past participle + werden.'],['Die Fachperson erklärt ihr die Methode. → Sie ___ die Methode erklärt.',['bekommt','wird','hat'],0,'El receptor pasa a sujeto con bekommen + participio.','The recipient becomes the subject with bekommen + participle.'],['Welches Adjektiv beschreibt empatía?',['einfühlsam','fehlerhaft','bezahlbar'],0,'einfühlsam = empático.','einfühlsam means empathetic.']],
    tasks:[['Condensa «Die Fragen müssen noch geklärt werden» delante de Fragen.','Condense “Die Fragen müssen noch geklärt werden” before Fragen.','Die noch zu klärenden Fragen stehen auf der Liste.','zu + participio I declinado.','Use zu + inflected present participle.'],['Reformula pasiva con man: «Die Reaktion kann beobachtet werden.»','Rewrite the passive with man: “Die Reaktion kann beobachtet werden.”','Man kann die Reaktion beobachten.','Conserva la posibilidad expresada por kann.','Preserve the possibility signalled by kann.'],['Convierte al receptor en sujeto: «Die Fachperson erklärte ihr die Ergebnisse.»','Make the recipient the subject: “Die Fachperson erklärte ihr die Ergebnisse.”','Sie bekam die Ergebnisse erklärt.','bekommen + participio II.','Use bekommen + past participle.']],
    writing:['Escribe 160–190 palabras sobre un gráfico ficticio de hábitos de estudio. Describe tendencia, límite de los datos y una interpretación prudente.','Write 160–190 words about a fictional chart of study habits. Describe a trend, a data limitation and a cautious interpretation.'],
    speaking:['Explica por qué una prueba de personalidad no debería decidir por sí sola sobre una persona.','Explain why a personality test should not by itself determine how someone is judged.']
  },
  {
    id:9,icon:'🏘️',title:'Stadt und Dorf',es:'Vida urbana, rural y proyectos sostenibles',en:'Urban and rural life and sustainable projects',
    points:[
      ['Bedingung verbal oder nominal','wenn/falls + verbo final introducen condición; bei + dativo puede condensarla en un nombre: Bei ausreichender Nachfrage … Una condición no realizada usa Konjunktiv II. No confundas una condición con una causa ya comprobada.','wenn/falls with final verb express a condition; bei + dative can condense it into a noun phrase. An unreal condition takes subjunctive II. Do not confuse a condition with an established cause.',['Falls die Nachfrage steigt, fahren mehr Busse.','Bei steigender Nachfrage fahren mehr Busse.','Wenn der Platz grösser wäre, könnten mehr Menschen teilnehmen.']],
      ['Einräumung und Gegensatz','obwohl + subordinada y trotz + genitivo reconocen un obstáculo que no impide el resultado. selbst wenn presenta un obstáculo hipotético. dennoch/gleichwohl unen una principal y exigen verbo en segunda posición.','obwohl + clause and trotz + genitive acknowledge an obstacle that does not prevent the outcome. selbst wenn presents a hypothetical obstacle. dennoch/gleichwohl begin a main clause with the verb second.',['Obwohl der Weg weit ist, fährt sie mit dem Velo.','Trotz des langen Wegs fährt sie mit dem Velo.','Der Weg ist lang. Dennoch fährt sie mit dem Velo.']],
      ['Präpositionen und Präzisierung','zufrieden mit + dativo, angewiesen auf + acusativo y beteiligt an + dativo se aprenden como combinaciones. genauer gesagt corrige o precisa una afirmación; vielmehr sustituye una caracterización anterior.','Learn adjective/participle-preposition combinations such as zufrieden mit + dative, angewiesen auf + accusative and beteiligt an + dative. genauer gesagt specifies a claim; vielmehr corrects a previous characterization.',['Der Ort ist auf gute Verbindungen angewiesen.','Viele Anwohnende sind an dem Projekt beteiligt.','Das Gelände ist kein Parkplatz mehr, vielmehr ein Gemeinschaftsgarten.']]
    ],
    words:[['die Nahversorgung','los servicios de proximidad','local amenities','Die Nahversorgung ist im Dorf nicht überall gesichert.'],['die Verdichtung','la densificación','densification','Eine Verdichtung braucht gute Planung.'],['die Pendlerin','la persona que se desplaza al trabajo','commuter','Die Pendlerin nutzt den Zug.'],['das Brachgelände','el terreno baldío','vacant lot','Auf dem Brachgelände entsteht ein Garten.'],['die Beteiligung','la participación','participation','Die Beteiligung der Nachbarschaft ist wichtig.']],
    reading:['Ein Platz für alle?','Eine Gemeinde möchte einen leerstehenden Parkplatz in einen kleinen Park umwandeln. Eine Gruppe begrüsst die Idee, weil Kinder im Quartier kaum Spielflächen haben. Andere sorgen sich um die Anlieferung der Geschäfte. Die Gemeinde schlägt deshalb vor, morgens eine kurze Ladezone freizuhalten und den übrigen Platz zu begrünen. Ob diese Lösung funktioniert, soll nach einem Jahr gemeinsam mit den Anwohnenden und Geschäftsleuten geprüft werden.',[
      ['Welche Sorge äussern einige Geschäftsleute?',['Lieferungen könnten schwieriger werden.','Kinder hätten zu viele Spielplätze.','Der Park wäre zu weit entfernt.'],0],
      ['Wie soll die Lösung bewertet werden?',['Nach einem Jahr mit Beteiligten','Nur vor dem Umbau','Allein anhand der Baukosten'],0]]],
    quiz:[['___ ausreichender Nachfrage könnte der Bus öfter fahren.',['Bei','Falls','Obwohl'],0,'bei + dativo nombra una condición nominal.','bei + dative names a nominal condition.'],['___ der langen Strecke fährt sie mit dem Velo.',['Trotz','Obwohl','Selbst wenn'],0,'trotz + genitivo.','trotz takes a genitive noun phrase.'],['Der Ort ist ___ eine gute Bahnverbindung angewiesen.',['auf','mit','an'],0,'angewiesen auf + acusativo.','angewiesen auf + accusative.'],['Der Platz ist kein Parkplatz mehr, ___ ein Garten.',['vielmehr','deshalb','aufgrund'],0,'vielmehr corrige la primera caracterización.','vielmehr corrects the first characterization.']],
    tasks:[['Condensa la condición: «Falls die Nachfrage steigt, fahren mehr Busse.»','Condense the condition: “Falls die Nachfrage steigt, fahren mehr Busse.”','Bei steigender Nachfrage fahren mehr Busse.','bei + dativo.','Use bei + dative.'],['Cambia obwohl por trotz: «Obwohl der Weg lang ist, fährt sie Velo.»','Replace obwohl with trotz: “Obwohl der Weg lang ist, fährt sie Velo.”','Trotz des langen Wegs fährt sie Velo.','trotz + genitivo nominal.','Use trotz + genitive noun phrase.'],['Expresa una condición hipotética para un nuevo parque.','State a hypothetical condition for a new park.','Wenn mehr Menschen mitplanen könnten, wäre der Park für alle nützlicher.','Konjunktiv II en condición y resultado.','Use subjunctive II in the condition and result.']],
    writing:['Escribe un foro de 160–190 palabras sobre una mejora para tu barrio: necesidad, objeción, respuesta y criterio de evaluación.','Write a 160–190 word forum post about a neighbourhood improvement: need, objection, response and evaluation criterion.'],
    speaking:['Debate la vida en ciudad y pueblo con dos condiciones y una concesión.','Debate city and village life using two conditions and one concession.']
  },
  {
    id:10,icon:'📚',title:'Literatur',es:'Lectura, estilo y escritura creativa',en:'Reading, style and creative writing',
    points:[
      ['Satzstellung als Stilmittel','Un complemento puede ocupar el Vorfeld para enlazar ideas o crear foco: Dieses Buch empfehle ich allen. El verbo conjugado sigue en segunda posición. También hay inversión tras un adverbio inicial: Danach las ich weiter, no Danach ich las.','A constituent can occupy the first position for cohesion or emphasis: Dieses Buch empfehle ich allen. The finite verb stays in second position. After an initial adverb: Danach las ich weiter.',['Den Schluss habe ich nicht erwartet.','Besonders eindrücklich fand ich die Figuren.','Am nächsten Morgen begann sie ein neues Kapitel.']],
      ['Zeitliche Beziehungen','während marca simultaneidad; nachdem y nach sitúan algo después; bevor y vor, antes. Cuando una acción pasada precede a otra, el pluscuamperfecto puede mostrar esa anterioridad. Una preposición requiere un nombre; una conjunción introduce una oración.','während marks overlap; nachdem/nach follow an event; bevor/vor precede it. Past perfect can mark an earlier past action. A preposition takes a noun phrase; a conjunction introduces a clause.',['Nachdem sie das Kapitel gelesen hatte, schrieb sie eine Notiz.','Nach der Lektüre schrieb sie eine Notiz.','Bevor die Lesung begann, stellte sie eine Frage.']],
      ['Ziel y sustantivos derivados','damit + subordinada admite sujetos distintos; um … zu exige normalmente el mismo sujeto. Sufijos como -ung, -heit/-keit y -schaft crean nombres con artículos y significados propios; no formes palabras sin comprobar uso.','damit + subordinate clause allows different subjects; um … zu normally requires the same subject. Endings such as -ung, -heit/-keit and -schaft form nouns with particular meanings and articles.',['Ich lese laut, damit die Kinder die Geschichte hören.','Ich lese den Text erneut, um den Aufbau zu verstehen.','die Erzählung · die Unsicherheit · die Leserschaft']]
    ],
    words:[['die Erzählperspektive','la perspectiva narrativa','narrative perspective','Die Erzählperspektive wechselt im letzten Kapitel.'],['die Handlung','la trama','plot','Die Handlung spielt in einer kleinen Stadt.'],['die Wendung','el giro','turn of events','Eine unerwartete Wendung verändert alles.'],['die Leserschaft','el público lector','readership','Die Leserschaft diskutiert das Ende.'],['andeuten','insinuar','to hint at','Der Titel deutet den Konflikt an.']],
    reading:['Eine offene Geschichte','Bei einem Leseabend stellte eine Autorin eine kurze Geschichte vor. Darin kehrt eine Figur nach Jahren in ihr Heimatdorf zurück und findet einen ungeöffneten Brief. Ob sie ihn liest, verrät die letzte Seite nicht. Einige Zuhörende waren darüber enttäuscht. Andere meinten, gerade die offene Frage lasse Raum für eigene Deutungen. In der anschliessenden Diskussion erklärte die Autorin, dass sie keine einzige richtige Fortsetzung vorgeben wolle. Entscheidend sei für sie, welche Hinweise die Lesenden im Text entdecken.',[
      ['Was bleibt am Ende offen?',['Ob die Figur den Brief liest','Ob die Figur zurückkehrt','Ob ein Brief existiert'],0],
      ['Was ist der Autorin wichtig?',['Die Lesenden begründen ihre Deutungen mit Hinweisen.','Alle erfinden dieselbe Fortsetzung.','Das Ende wird nachträglich geschlossen.'],0]]],
    quiz:[['___ habe ich den Schluss nicht erwartet.',['Trotzdem','Obwohl','Wegen'],0,'trotzdem ocupa el Vorfeld, seguido del verbo.','trotzdem takes first position, followed by the finite verb.'],['Nachdem sie das Buch gelesen ___, schrieb sie eine Rezension.',['hatte','hat','hätte'],0,'Pluscuamperfecto para anterioridad pasada.','Past perfect marks an earlier past event.'],['Sie liest laut, ___ die Kinder zuhören können.',['damit','um','trotz'],0,'damit admite sujetos distintos.','damit allows different subjects.'],['Ich lese nochmals, ___ den Aufbau besser zu verstehen.',['um','damit','während'],0,'um … zu con el mismo sujeto.','um … zu with the same subject.']],
    tasks:[['Pon el objeto al principio: «Ich habe den Schluss nicht erwartet.»','Move the object to the start: “Ich habe den Schluss nicht erwartet.”','Den Schluss habe ich nicht erwartet.','El verbo conjugado queda segundo.','The finite verb stays second.'],['Convierte nachdem en una preposición: «Nachdem sie das Kapitel gelesen hatte, schrieb sie eine Notiz.»','Replace the nachdem clause with a prepositional phrase.','Nach der Lektüre des Kapitels schrieb sie eine Notiz.','nach + dativo nominal.','Use nach + dative noun phrase.'],['Distingue damit de um … zu con un ejemplo de cada uno.','Show the difference between damit and um … zu with one example each.','Ich lese laut, damit die Kinder zuhören. Ich lese erneut, um mehr zu verstehen.','El sujeto puede cambiar con damit.','damit can have a different subject.']],
    writing:['Escribe 160–190 palabras de una reseña: breve contexto, opinión sustentada, un detalle de estilo y recomendación matizada.','Write a 160–190 word review: brief context, supported opinion, one stylistic detail and a qualified recommendation.'],
    speaking:['Presenta un libro sin revelar el final y responde a una interpretación alternativa.','Present a book without revealing the ending and respond to another interpretation.']
  },
  {
    id:11,icon:'🤝',title:'Internationale Geschäftskontakte',es:'Comunicación y negociación internacional',en:'International business communication and negotiation',
    points:[
      ['Folge statt Grund','sodass + subordinada expresa consecuencia; deshalb/folglich introducen una principal con verbo inmediatamente después; infolge + genitivo condensa la causa que condujo al resultado. No inviertas causa y efecto.','sodass + clause expresses consequence; deshalb/folglich begin a main clause with the finite verb immediately after; infolge + genitive names the cause behind an outcome. Keep cause and effect distinct.',['Die Unterlagen kamen spät, sodass der Termin verschoben wurde.','Die Unterlagen kamen spät. Deshalb wurde der Termin verschoben.','Infolge der Verspätung musste das Treffen verlegt werden.']],
      ['Mittel und Vergleich','indem/dadurch, dass + verbo final explican cómo se logra algo; durch + acusativo usa un nombre. als ob + Konjunktiv II presenta una impresión, no un hecho demostrado. Para comparar datos, usa als o wie según la igualdad.','indem/dadurch, dass with final verb explain how something is done; durch + accusative takes a noun. als ob + subjunctive II describes an impression rather than a proven fact. Use als or wie according to the comparison.',['Wir klären Fragen, indem wir sie schriftlich festhalten.','Durch schriftliche Protokolle vermeiden wir Missverständnisse.','Es wirkte, als ob die Entscheidung bereits gefallen wäre.']],
      ['er- und re- im Kontext','er- puede marcar resultado, pero sus verbos no tienen una regla única; re- en préstamos suele indicar repetición o retorno. Aprende el verbo con su régimen y uso: eine Einigung erzielen, einen Vertrag revidieren.','er- may suggest a result, but its verbs follow no single semantic rule; re- in borrowed words often suggests repetition or revision. Learn each verb with its complements and context.',['Wir erzielten eine Einigung.','Die Parteien revidierten den Entwurf.','Die Delegation erreichte ihr Ziel.']]
    ],
    words:[['die Verhandlung','la negociación','negotiation','Die Verhandlung dauerte zwei Stunden.'],['die Vereinbarung','el acuerdo','agreement','Die Vereinbarung wird schriftlich bestätigt.'],['die Fristverlängerung','la ampliación del plazo','deadline extension','Wir beantragen eine Fristverlängerung.'],['die Rückfrage','la consulta posterior','follow-up question','Bei Rückfragen erreichen Sie uns per E-Mail.'],['einen Kompromiss erzielen','lograr un compromiso','to reach a compromise','Beide Seiten erzielten einen Kompromiss.']],
    reading:['Ein Termin mit zwei Erwartungen','Zwei Teams aus verschiedenen Ländern bereiteten eine gemeinsame Ausschreibung vor. Das eine Team wollte bereits beim ersten Treffen einen verbindlichen Zeitplan festlegen. Das andere hatte zunächst Fragen zum Umfang des Projekts. In der Videokonferenz wirkte die Zurückhaltung für die erste Gruppe wie Ablehnung. Nach einem kurzen Gespräch klärten beide Seiten ihre Erwartungen und hielten offene Fragen schriftlich fest. Erst bei einem zweiten Termin beschlossen sie gemeinsam einen realistischen Plan.',[
      ['Wodurch entstand das Missverständnis?',['Die Teams hatten unterschiedliche Erwartungen an das erste Treffen.','Eine Seite hatte den Termin vergessen.','Die Videokonferenz fiel aus.'],0],
      ['Was half bei der Klärung?',['Erwartungen besprechen und Fragen dokumentieren','Sofort einen Vertrag unterschreiben','Den Umfang ignorieren'],0]]],
    quiz:[['Die Unterlagen fehlten, ___ wir den Termin verschieben mussten.',['sodass','deshalb','infolge'],0,'sodass + verbo final expresa consecuencia.','sodass introduces a result clause with final verb.'],['Die Unterlagen fehlten. ___ mussten wir den Termin verschieben.',['Deshalb','Sodass','Durch'],0,'deshalb va en principal con verbo segundo.','deshalb starts a main clause with the finite verb second.'],['Wir vermeiden Fehler, ___ wir die Fragen schriftlich festhalten.',['indem','durch','trotz'],0,'indem + subordinada explica el medio.','indem + subordinate clause expresses the means.'],['Welche Verbindung passt?',['einen Kompromiss erzielen','einen Kompromiss bauen','einen Kompromiss stellen'],0,'Colocación fija: einen Kompromiss erzielen.','Fixed combination: einen Kompromiss erzielen.']],
    tasks:[['Une con sodass: «Die Unterlagen fehlten. Wir mussten den Termin verschieben.»','Combine with sodass: “Die Unterlagen fehlten. Wir mussten den Termin verschieben.”','Die Unterlagen fehlten, sodass wir den Termin verschieben mussten.','La consecuencia va en subordinada con verbo final.','The consequence is a subordinate clause with final verb.'],['Transforma a medio nominal: «Wir klären Fragen, indem wir sie schriftlich festhalten.»','Express the means with a noun phrase instead.','Durch schriftliche Protokolle klären wir Fragen.','durch + acusativo nominal.','Use durch + accusative noun phrase.'],['Presenta una impresión sin afirmar un hecho: «Die Entscheidung war schon gefallen.»','Describe an impression rather than asserting the decision had been made.','Es wirkte, als ob die Entscheidung bereits gefallen wäre.','als ob + Konjunktiv II marca distancia.','als ob + subjunctive II marks it as an impression.']],
    writing:['Escribe 160–190 palabras a un socio comercial: resume un malentendido, explica cómo lo aclararon y propone un siguiente paso.','Write 160–190 words to a business partner: summarize a misunderstanding, explain how it was clarified and propose a next step.'],
    speaking:['Simula una negociación: pregunta, aclara, concede un punto y cierra con un acuerdo provisional.','Role-play a negotiation: ask, clarify, concede a point and close with a provisional agreement.']
  },
  {
    id:12,icon:'🔬',title:'Forschung und Technik',es:'Investigación, innovación y ética',en:'Research, technology and ethics',
    points:[
      ['Präpositionen mit Genitiv','angesichts, aufgrund, infolge y trotz se combinan con genitivo en estilo formal. Distingue su relación: angesichts presenta circunstancias, aufgrund una causa, infolge una consecuencia de una causa y trotz una concesión.','In formal style, angesichts, aufgrund, infolge and trotz take genitive. They signal different relations: circumstances, cause, consequence arising from a cause, and concession.',['Angesichts der Risiken fordern wir weitere Tests.','Aufgrund des Fehlers wurde die Messung wiederholt.','Trotz der Kritik wurde das Verfahren weiter untersucht.']],
      ['Partizipialsätze und Bezug','Una construcción participial puede condensar información compartiendo referente con la principal: Von den Daten überzeugt, veröffentlichte das Team den Bericht. Si el referente cambia, la frase resulta ambigua; conserva entonces una subordinada explícita. No elimines información causal o temporal esencial.','A participial phrase can condense information when it shares the main clause’s subject. If the referent changes, the phrase becomes ambiguous; use an explicit clause. Preserve important causal or temporal information.',['Von den Ergebnissen überrascht, wiederholte das Team den Versuch.','Nachdem das Team die Ergebnisse gesehen hatte, wiederholte es den Versuch.','Die im Labor getesteten Geräte wurden später verkauft.']],
      ['Trennbare und untrennbare Vorsilben','durch-, über-, um- y unter- pueden ser separables o inseparables según verbo y significado: umfahren (rodear) frente a umfahren (atropellar). La acentuación y el participio ayudan a distinguirlos; aprende cada par en contexto, no como una regla mecánica para todos.','durch-, über-, um- and unter- can be separable or inseparable depending on verb and meaning. umfahren can mean drive around or knock over, with different stress and participle formation. Learn each verb in context.',['Der Fahrer umfuhr die Baustelle.','Der Fahrer fuhr das Schild um.','Das Team überprüfte die Daten noch einmal.']]
    ],
    words:[['die Versuchsanordnung','el diseño experimental','experimental setup','Die Versuchsanordnung wurde genau dokumentiert.'],['die Messabweichung','la desviación de medición','measurement deviation','Eine Messabweichung veränderte das Ergebnis.'],['die Nachvollziehbarkeit','la posibilidad de comprobar los pasos','traceability','Nachvollziehbarkeit setzt eine gute Dokumentation voraus.'],['die Zulassung','la autorización','approval','Die Zulassung erfordert weitere Prüfungen.'],['die Abwägung','la ponderación','weighing of options','Eine Abwägung von Nutzen und Risiken ist nötig.']],
    reading:['Ein Prototyp im Test','Ein Forschungsteam entwickelte einen Sensor, der die Luftqualität in Klassenräumen anzeigen soll. Bei den ersten Tests reagierte das Gerät schnell, zeigte aber unter hoher Luftfeuchtigkeit ungenaue Werte. Statt den Prototyp sofort zu bewerben, wiederholte das Team die Messungen unter verschiedenen Bedingungen und veröffentlichte die Abweichungen. Schulen können damit einschätzen, wofür die Messwerte bereits brauchbar sind. Ob der Sensor für eine allgemeine Empfehlung geeignet ist, bleibt bis zur unabhängigen Prüfung offen.',[
      ['Warum wiederholte das Team die Tests?',['Hohe Luftfeuchtigkeit führte zu ungenauen Werten.','Alle Messungen waren bereits perfekt.','Die Schulen wollten kein Gerät.'],0],
      ['Was ist noch nicht entschieden?',['Ob sich der Sensor für eine allgemeine Empfehlung eignet','Ob Abweichungen veröffentlicht wurden','Ob das Gerät Luftqualität misst'],0]]],
    quiz:[['___ der Messabweichung wurde der Test wiederholt.',['Aufgrund','Obwohl','Indem'],0,'aufgrund + genitivo introduce causa.','aufgrund + genitive introduces cause.'],['___ der Risiken untersuchen wir den Nutzen weiter.',['Trotz','Obwohl','Indem'],0,'trotz + genitivo señala concesión.','trotz + genitive signals concession.'],['Von den Daten überrascht, ___ das Team die Messung.',['wiederholte','wurden','wiederholen'],0,'El participio se refiere al mismo sujeto: das Team.','The participial phrase shares the subject das Team.'],['Der Fahrer fuhr das Schild ___.',['um','über','durch'],0,'umfahren separable: ein Schild umfahren = atropellar.','Separable umfahren: knock over a sign.']],
    tasks:[['Pasa a sintagma nominal: «Weil der Sensor falsch mass, wurde der Test wiederholt.»','Use a causal noun phrase: “Weil der Sensor falsch mass, wurde der Test wiederholt.”','Aufgrund der fehlerhaften Messung wurde der Test wiederholt.','aufgrund + genitivo.','Use aufgrund + genitive.'],['Condensa con participio: «Das Team war von den Ergebnissen überrascht und wiederholte den Versuch.»','Use a participial phrase with the same subject.','Von den Ergebnissen überrascht, wiederholte das Team den Versuch.','El sujeto del participio es das Team.','The subject of the participle is das Team.'],['Distingue los dos usos de umfahren con frases propias.','Show the two meanings of umfahren in sentences.','Sie umfuhren die Baustelle. Das Auto fuhr das Schild um.','El significado determina separabilidad.','Meaning determines separability.']],
    writing:['Redacta 160–190 palabras sobre un invento: utilidad, datos de prueba, limitación, riesgo ético y siguiente comprobación.','Write 160–190 words about an invention: use, test data, limitation, ethical risk and next check.'],
    speaking:['Defiende una evaluación prudente de una tecnología, distinguiendo beneficios demostrados y promesas.','Argue for a cautious assessment of a technology, distinguishing demonstrated benefits from promises.']
  }
];


/* Selected vocabulary from the supplied C1 Lernwortschatz; examples and translations are original. */
const C1_VOCAB_EXTRA = {
  "1": [
    [
      "die Rastlosigkeit",
      "la inquietud constante",
      "restlessness",
      "Nach dem hektischen Tag bemerkte sie ihre eigene Rastlosigkeit."
    ],
    [
      "die Beschleunigung",
      "la aceleración",
      "acceleration",
      "Die Beschleunigung des Alltags erschöpft viele Menschen."
    ],
    [
      "beeinträchtigen",
      "perjudicar",
      "to impair",
      "Schlafmangel kann die Konzentration beeinträchtigen."
    ],
    [
      "reflektieren",
      "reflexionar sobre",
      "to reflect on",
      "Im Tagebuch reflektiert er seinen Medienkonsum."
    ],
    [
      "sich widersetzen",
      "oponerse",
      "to resist",
      "Sie widersetzt sich dem Druck, immer erreichbar zu sein."
    ],
    [
      "die Einsicht",
      "la comprensión adquirida",
      "insight",
      "Aus der Erfahrung gewann er eine wichtige Einsicht."
    ],
    [
      "entmutigen",
      "desanimar",
      "to discourage",
      "Ein Rückschlag sollte dich nicht entmutigen."
    ],
    [
      "inwiefern",
      "en qué medida",
      "to what extent",
      "Inwiefern hilft eine Pause beim Lernen?"
    ]
  ],
  "2": [
    [
      "die Ausstattung",
      "el equipamiento",
      "facilities",
      "Die Ausstattung des kleinen Hotels ist überraschend modern."
    ],
    [
      "die Verzögerung",
      "el retraso",
      "delay",
      "Wegen einer Verzögerung erreichten wir den Anschluss nicht."
    ],
    [
      "das Flair",
      "el ambiente especial",
      "atmosphere",
      "Das Café verleiht dem Viertel ein besonderes Flair."
    ],
    [
      "in Kauf nehmen",
      "aceptar un inconveniente",
      "to accept a drawback",
      "Für die Zugreise nehmen wir eine längere Fahrzeit in Kauf."
    ],
    [
      "auf eigene Faust",
      "por cuenta propia",
      "independently",
      "Sie erkundete die Altstadt auf eigene Faust."
    ],
    [
      "naturbelassen",
      "en estado natural",
      "unspoilt",
      "Der naturbelassene Strand zieht ruhesuchende Gäste an."
    ],
    [
      "nachvollziehen",
      "comprender el razonamiento",
      "to understand the reasoning",
      "Ich kann die Beschwerde der Anwohnenden nachvollziehen."
    ],
    [
      "Verantwortung übernehmen",
      "asumir responsabilidad",
      "to take responsibility",
      "Der Veranstalter übernimmt Verantwortung für die Schäden."
    ]
  ],
  "3": [
    [
      "die Fähigkeit",
      "la capacidad",
      "ability",
      "Diese Fähigkeit lässt sich mit Übung verbessern."
    ],
    [
      "die Fertigkeit",
      "la destreza",
      "skill",
      "Eine Fertigkeit entwickelt sich nicht über Nacht."
    ],
    [
      "die Merkfähigkeit",
      "la capacidad de retención",
      "memory capacity",
      "Ausreichend Schlaf unterstützt die Merkfähigkeit."
    ],
    [
      "sich etwas einprägen",
      "memorizar algo",
      "to commit something to memory",
      "Sie prägt sich die neuen Begriffe mit Beispielen ein."
    ],
    [
      "die Empathie",
      "la empatía",
      "empathy",
      "Empathie allein ersetzt keine sorgfältige Analyse."
    ],
    [
      "die Eignung",
      "la aptitud",
      "suitability",
      "Ein einzelner Test sagt wenig über die Eignung aus."
    ],
    [
      "unterschätzen",
      "subestimar",
      "to underestimate",
      "Wir sollten den Einfluss des Umfelds nicht unterschätzen."
    ],
    [
      "einen Standpunkt vertreten",
      "defender un punto de vista",
      "to defend a position",
      "Im Seminar vertritt sie einen anderen Standpunkt."
    ]
  ],
  "4": [
    [
      "die Berufung",
      "la vocación",
      "vocation",
      "Sie sieht die Pflege als ihre Berufung."
    ],
    [
      "die Gehaltsabrechnung",
      "la nómina",
      "payslip",
      "Die Gehaltsabrechnung weist mehrere Abzüge aus."
    ],
    [
      "der Nettolohn",
      "el salario neto",
      "net pay",
      "Nach den Abzügen bleibt ein geringerer Nettolohn."
    ],
    [
      "das Mitspracherecht",
      "el derecho a participar en decisiones",
      "right to have a say",
      "Das Team fordert ein Mitspracherecht bei der Planung."
    ],
    [
      "das Betriebsklima",
      "el ambiente laboral",
      "workplace atmosphere",
      "Ein respektvoller Umgang verbessert das Betriebsklima."
    ],
    [
      "der Einwand",
      "la objeción",
      "objection",
      "Ihr Einwand gegen den Schichtplan war begründet."
    ],
    [
      "sich widmen",
      "dedicarse a",
      "to devote oneself to",
      "Er widmet sich der Ausbildung neuer Fachkräfte."
    ],
    [
      "es kommt darauf an",
      "depende de ello",
      "it depends",
      "Ob das Modell funktioniert, kommt auf die Umsetzung an."
    ]
  ],
  "5": [
    [
      "die Skulptur",
      "la escultura",
      "sculpture",
      "Die Skulptur steht vor dem Eingang des Museums."
    ],
    [
      "die Leinwand",
      "el lienzo",
      "canvas",
      "Auf der Leinwand sind mehrere Farbschichten zu erkennen."
    ],
    [
      "der Zeitgeist",
      "el espíritu de la época",
      "spirit of the times",
      "Das Werk spiegelt den Zeitgeist der Epoche wider."
    ],
    [
      "die Skizze",
      "el boceto",
      "sketch",
      "Vor der Installation fertigte sie eine Skizze an."
    ],
    [
      "das Urheberrecht",
      "el derecho de autor",
      "copyright",
      "Vor der Veröffentlichung muss das Urheberrecht geklärt werden."
    ],
    [
      "der öffentliche Raum",
      "el espacio público",
      "public space",
      "Kunst im öffentlichen Raum erreicht viele Menschen."
    ],
    [
      "verblüffen",
      "sorprender mucho",
      "to astonish",
      "Die ungewöhnliche Perspektive verblüfft das Publikum."
    ],
    [
      "etwas ausser Acht lassen",
      "pasar algo por alto",
      "to overlook something",
      "Die Kritik lässt die Absicht des Künstlers ausser Acht."
    ]
  ],
  "6": [
    [
      "die Studienordnung",
      "el reglamento de estudios",
      "study regulations",
      "Die Studienordnung legt die Prüfungsbedingungen fest."
    ],
    [
      "die Gleichstellung",
      "la igualdad de trato",
      "equal treatment",
      "Die Hochschule prüft Massnahmen zur Gleichstellung."
    ],
    [
      "die Sekundärliteratur",
      "la bibliografía secundaria",
      "secondary literature",
      "Für das Referat wertete er Sekundärliteratur aus."
    ],
    [
      "die Mitschrift",
      "los apuntes tomados en clase",
      "lecture notes",
      "Nach der Vorlesung verglich sie ihre Mitschrift mit der Folie."
    ],
    [
      "das Stipendium",
      "la beca",
      "scholarship",
      "Das Stipendium deckt einen Teil der Lebenshaltungskosten."
    ],
    [
      "die Recherche",
      "la investigación documental",
      "research",
      "Vor dem Vortrag ist eine gründliche Recherche nötig."
    ],
    [
      "ein Referat halten",
      "hacer una exposición oral",
      "to give a presentation",
      "Morgen hält sie ein Referat über Mehrsprachigkeit."
    ],
    [
      "fundiert",
      "bien fundamentado",
      "well-founded",
      "Seine Kritik ist sachlich und fundiert."
    ]
  ],
  "7": [
    [
      "die Ratenzahlung",
      "el pago a plazos",
      "payment in instalments",
      "Die Ratenzahlung verteilt die Kosten auf sechs Monate."
    ],
    [
      "die Schuldenfalle",
      "la trampa del endeudamiento",
      "debt trap",
      "Hohe Zinsen können in die Schuldenfalle führen."
    ],
    [
      "der Gläubiger",
      "el acreedor",
      "creditor",
      "Der Gläubiger stimmt einem neuen Zahlungsplan zu."
    ],
    [
      "der Schuldner",
      "el deudor",
      "debtor",
      "Der Schuldner legt seine Einnahmen offen."
    ],
    [
      "die Lastschrift",
      "el adeudo directo",
      "direct debit",
      "Die Miete wird per Lastschrift eingezogen."
    ],
    [
      "der Dauerauftrag",
      "la orden permanente",
      "standing order",
      "Für die monatliche Miete richtet sie einen Dauerauftrag ein."
    ],
    [
      "die Prognose",
      "el pronóstico",
      "forecast",
      "Die Prognose beruht auf den aktuellen Zahlen."
    ],
    [
      "die Grundsicherung",
      "la prestación básica de subsistencia",
      "basic income support",
      "Die Grundsicherung soll die wichtigsten Ausgaben decken."
    ]
  ],
  "8": [
    [
      "die Gewissenhaftigkeit",
      "la meticulosidad",
      "conscientiousness",
      "Gewissenhaftigkeit allein erklärt keinen Prüfungserfolg."
    ],
    [
      "das Selbstwertgefühl",
      "la autoestima",
      "self-esteem",
      "Ständige Vergleiche können das Selbstwertgefühl schwächen."
    ],
    [
      "das Verhaltensmuster",
      "el patrón de conducta",
      "behavioural pattern",
      "Das Verhaltensmuster ändert sich nur langsam."
    ],
    [
      "die Ausdauer",
      "la perseverancia",
      "perseverance",
      "Für langfristige Ziele braucht man Ausdauer."
    ],
    [
      "einfühlsam",
      "empático",
      "empathetic",
      "Die Beraterin reagierte einfühlsam auf die Unsicherheit."
    ],
    [
      "wahrnehmen",
      "percibir",
      "to perceive",
      "Zwei Personen können dieselbe Situation anders wahrnehmen."
    ],
    [
      "sich hineinversetzen in",
      "ponerse en el lugar de",
      "to put oneself in someone's place",
      "Er versucht, sich in seine Kollegin hineinzuversetzen."
    ],
    [
      "ausschlaggebend",
      "decisivo",
      "decisive",
      "Für das Ergebnis war die Gruppengrösse ausschlaggebend."
    ]
  ],
  "9": [
    [
      "der Feinstaub",
      "las partículas finas",
      "fine particulate matter",
      "An der Strasse ist die Belastung durch Feinstaub hoch."
    ],
    [
      "die Urbanisierung",
      "la urbanización",
      "urbanisation",
      "Die Urbanisierung verändert den Wohnungsmarkt."
    ],
    [
      "das Treibhausgas",
      "el gas de efecto invernadero",
      "greenhouse gas",
      "Verkehr verursacht einen Teil der Treibhausgase."
    ],
    [
      "die Kommune",
      "el municipio",
      "municipality",
      "Die Kommune plant neue Velowege."
    ],
    [
      "entgegenwirken",
      "contrarrestar",
      "to counteract",
      "Mehr Grünflächen wirken der Hitze entgegen."
    ],
    [
      "angewiesen auf",
      "depender de",
      "dependent on",
      "Viele Pendelnde sind auf den Bus angewiesen."
    ],
    [
      "stichhaltig",
      "convincente y sólido",
      "compelling",
      "Für diese Behauptung fehlen stichhaltige Belege."
    ],
    [
      "die Diskrepanz",
      "la discrepancia",
      "discrepancy",
      "Zwischen Planung und Umsetzung besteht eine Diskrepanz."
    ]
  ],
  "10": [
    [
      "der Handlungsstrang",
      "la línea argumental",
      "plotline",
      "Der zweite Handlungsstrang spielt Jahre später."
    ],
    [
      "der Protagonist",
      "el protagonista",
      "protagonist",
      "Der Protagonist zweifelt an seiner Erinnerung."
    ],
    [
      "der Schauplatz",
      "el escenario",
      "setting",
      "Der Schauplatz wechselt im letzten Kapitel."
    ],
    [
      "die Lesart",
      "la interpretación",
      "reading",
      "Diese Lesart berücksichtigt das offene Ende."
    ],
    [
      "die Dramaturgie",
      "la estructura dramática",
      "dramaturgy",
      "Die Dramaturgie baut langsam Spannung auf."
    ],
    [
      "die Adaption",
      "la adaptación",
      "adaptation",
      "Die Adaption verändert das Ende des Romans."
    ],
    [
      "etwas schildern",
      "describir algo",
      "to describe something",
      "Die Erzählerin schildert den Konflikt nüchtern."
    ],
    [
      "woraufhin",
      "tras lo cual",
      "whereupon",
      "Sie entdeckt den Brief, woraufhin sie die Stadt verlässt."
    ]
  ],
  "11": [
    [
      "die Tagesordnung",
      "el orden del día",
      "agenda",
      "Der Punkt steht heute nicht auf der Tagesordnung."
    ],
    [
      "die Entscheidungsfindung",
      "la toma de decisiones",
      "decision-making",
      "Klare Regeln erleichtern die Entscheidungsfindung."
    ],
    [
      "die Etikette",
      "las normas de etiqueta",
      "etiquette",
      "Die Etikette ist je nach Land verschieden."
    ],
    [
      "Rücksprache halten mit",
      "consultar con",
      "to consult",
      "Vor der Zusage hält sie Rücksprache mit dem Team."
    ],
    [
      "der Reibungspunkt",
      "el punto de fricción",
      "point of friction",
      "Die unklare Zuständigkeit bleibt ein Reibungspunkt."
    ],
    [
      "pragmatisch",
      "pragmático",
      "pragmatic",
      "Sie schlug eine pragmatische Lösung vor."
    ],
    [
      "die Hypothese",
      "la hipótesis",
      "hypothesis",
      "Die Hypothese muss mit Daten überprüft werden."
    ],
    [
      "im Nachhinein",
      "a posteriori",
      "in hindsight",
      "Im Nachhinein hätte er früher nachfragen sollen."
    ]
  ],
  "12": [
    [
      "das Reagenzglas",
      "el tubo de ensayo",
      "test tube",
      "Die Probe wird im Reagenzglas erhitzt."
    ],
    [
      "die Erbsubstanz",
      "el material genético",
      "genetic material",
      "Die Untersuchung betrifft die Erbsubstanz der Pflanze."
    ],
    [
      "der Proband",
      "el participante en un estudio",
      "study participant",
      "Jeder Proband erhielt die gleiche Information."
    ],
    [
      "die Trefferquote",
      "la tasa de acierto",
      "accuracy rate",
      "Die Trefferquote des Systems liegt unter der Erwartung."
    ],
    [
      "der Sensor",
      "el sensor",
      "sensor",
      "Ein Sensor misst die Temperatur im Raum."
    ],
    [
      "das Experimentierstadium",
      "la fase experimental",
      "experimental stage",
      "Das Verfahren befindet sich noch im Experimentierstadium."
    ],
    [
      "umstritten",
      "controvertido",
      "controversial",
      "Der Einsatz der Technik bleibt umstritten."
    ],
    [
      "hinsichtlich",
      "en cuanto a",
      "regarding",
      "Hinsichtlich der Kosten fehlen noch Angaben."
    ]
  ]
};

if(typeof C11Lessons!=='undefined'){
  C11_LESSONS.push(...C12_LESSONS);
  for(const lesson of C11_LESSONS) lesson.words.push(...C1_VOCAB_EXTRA[lesson.id]);
  C11Lessons.installDecks();
  // The first six decks were registered before this file loaded; refresh their cards.
  for(const lesson of C11_LESSONS){
    const deck=LEVELS.b2c1.DECKS.find(d=>d.id===200+lesson.id);
    if(deck) deck.cards=C11Lessons.cards(lesson);
  }
}

/* Original telc Deutsch C1 format practice. The uploaded 2016 Übungstest
   informs section types and timings; none of its tasks or audio is reproduced.
   For details of the official recording, use the user's timestamped transcript
   as the reference if it differs from the printed Hörtexte. */
const C1Exam = {
  section:'overview',
  active:false,
  reading: {
    title:'Lesen',
    intro:'Tres formatos: reconstrucción textual, búsqueda selectiva y lectura detallada. La prueba telc completa contiene 24 respuestas (48 puntos) y comparte 90 minutos con Sprachbausteine. Esta práctica breve tiene 12 respuestas.',
    introEn:'Three formats: text reconstruction, selective reading and detailed comprehension. The full telc reading paper has 24 answers (48 points) and shares 90 minutes with language elements. This shorter practice has 12 answers.',
    blocks:[
      {title:'Teil 1 · Textrekonstruktion',text:'Ein Stadtteil will eine ehemalige Werkhalle als öffentlichen Lernort nutzen. Der Plan klingt überzeugend, doch das Gebäude müsste zunächst saniert werden. [1] Deshalb soll die Eröffnung in zwei Etappen erfolgen. Zunächst werden kleine Räume für Vereine eingerichtet. [2] Die Stadt verspricht, die Kosten nach einem Jahr offenzulegen. [3] Ob das Projekt langfristig trägt, hängt auch davon ab, wie oft die Räume tatsächlich genutzt werden. [4]',items:[
        ['Was passt in Lücke [1]?',['Die Sicherheitsprüfung ergab jedoch zusätzliche Arbeiten.','Seit Jahren fährt dort kein Bus mehr.','Einige Vereine treffen sich bereits täglich.'],0,'Die Verzögerung erklärt die Eröffnung in Etappen.'],
        ['Was passt in Lücke [2]?',['Für grössere Veranstaltungen ist vorerst kein Platz vorgesehen.','Darum wurde das Gebäude gestern abgerissen.','Die Halle hat keine Türen.'],0,'Der Gegensatz zu kleinen Räumen erklärt die Einschränkung.'],
        ['Was passt in Lücke [3]?',['Damit können Interessierte den tatsächlichen Aufwand beurteilen.','Eine Kostenrechnung wäre grundsätzlich verboten.','Die Vereine dürfen danach nicht mehr mitreden.'],0,'Damit nimmt auf das Offenlegen der Kosten Bezug.'],
        ['Was passt in Lücke [4]?',['Eine regelmässige Auswertung ist daher sinnvoll.','Gebäude bestehen immer aus Stein.','Der Bus fährt um sieben Uhr ab.'],0,'Eine Auswertung prüft die erwähnte Nutzung.'] ]},
      {title:'Teil 2 · Selektives Verstehen',text:'A. Das Lernlabor bietet am Montag kurze Workshops zum Umgang mit Daten an. Keine Anmeldung nötig. B. Die Stadtbibliothek öffnet am Dienstag einen ruhigen Arbeitsraum. Wer einen Platz reservieren will, muss sich online anmelden. C. Das Museum zeigt am Mittwoch, wie historische Geräte repariert werden. Der Eintritt ist kostenlos, die Plätze sind jedoch begrenzt. D. Die Hochschule veranstaltet am Donnerstag ein Podiumsgespräch über künstliche Intelligenz. Fragen aus dem Publikum sind ausdrücklich willkommen.',items:[
        ['Wo kann man ohne Anmeldung Datenkompetenz üben?',['A','B','C','D'],0,'Im Lernlabor am Montag.'],
        ['Wo braucht man für einen Arbeitsplatz eine Reservierung?',['A','B','C','D'],1,'Die Bibliothek nennt eine Onlineanmeldung.'],
        ['Wo wird die Reparatur älterer Technik vorgeführt?',['A','B','C','D'],2,'Das Museum zeigt historische Geräte.'],
        ['Wo kann das Publikum Fragen zu KI stellen?',['A','B','C','D'],3,'Die Hochschule lädt zu Fragen ein.'] ]},
      {title:'Teil 3 · Detailverstehen',text:'Eine Gemeinde testete sechs Monate lang einen kostenlosen Abendbus. Die Zahl der Fahrgäste stieg besonders an Freitagen. Unter der Woche blieb sie hinter den Erwartungen zurück. Laut Befragung nutzten viele Personen den Bus, die zuvor von Angehörigen abgeholt worden waren. Ob weniger Autos unterwegs waren, wurde nicht gemessen. Der Gemeinderat möchte den Versuch verlängern und künftig auch die Kosten pro Fahrt erfassen.',items:[
        ['Freitags wurde der Abendbus besonders häufig genutzt.',['richtig','falsch','nicht im Text'],0,'Der Anstieg war freitags besonders deutlich.'],
        ['Unter der Woche erfüllte die Nutzung die Erwartungen.',['richtig','falsch','nicht im Text'],1,'Sie blieb hinter den Erwartungen zurück.'],
        ['Durch das Angebot fuhren genau 20 Prozent weniger Autos.',['richtig','falsch','nicht im Text'],2,'Der Autoverkehr wurde nicht gemessen.'],
        ['Die Kosten pro Fahrt wurden bereits erfasst.',['richtig','falsch','nicht im Text'],1,'Das soll erst künftig geschehen.'] ]}
    ]
  },
  language: {
    title:'Sprachbausteine',
    intro:'Gramática, conectores, casos y colocaciones en 12 huecos originales. En telc Deutsch C1 son 22 preguntas de cuatro opciones (22 puntos) dentro del bloque de 90 minutos con Lesen.',
    introEn:'Twelve original gaps on grammar, connectors, cases and collocations. The full telc Deutsch C1 section has 22 four-option questions (22 points) within the 90-minute reading and language block.',
    text:'Die Stadtbibliothek wird neu gestaltet. [1] der steigenden Nachfrage entstehen weitere Arbeitsplätze. Die Planung berücksichtigt sowohl Studierende [2] Berufstätige. In einer Befragung sprach sich eine Mehrheit [3] längere Öffnungszeiten aus. Die Verwaltung teilte mit, der Vorschlag [4] noch geprüft. Einige Räume könnten bereits im Herbst genutzt [5]. Voraussetzung ist, [6] die Brandschutzprüfung abgeschlossen wird. Während der Bauarbeiten steht nur ein Teil der Sammlung [7] Verfügung. Die Verantwortlichen bitten die Gäste, Rücksicht [8] andere Nutzende zu nehmen. Ein Raum soll so eingerichtet werden, [9] dort auch Gruppen arbeiten können. Es bleibt abzuwarten, [10] die zusätzlichen Plätze genügen. Die Erfahrungen aus der Pilotphase werden sorgfältig [11]. Anschliessend will die Gemeinde eine Entscheidung [12].',
    items:[
      ['Lücke 1',['Angesichts','Trotzdem','Obgleich','Durch'],0,'Angesichts + Genitiv: der Nachfrage.'],
      ['Lücke 2',['als auch','sowie dass','noch dass','sondern auch'],0,'sowohl … als auch.'],
      ['Lücke 3',['für','um','nach','bei'],0,'sich für etwas aussprechen.'],
      ['Lücke 4',['werde','würde','wäre','wird'],0,'Indirekte Rede: der Vorschlag werde geprüft.'],
      ['Lücke 5',['werden','geworden','worden','wird'],0,'Passiv mit Modalverb: genutzt werden.'],
      ['Lücke 6',['dass','obwohl','denn','weshalb'],0,'Voraussetzung ist, dass …'],
      ['Lücke 7',['zur','für','an','bei'],0,'zur Verfügung stehen.'],
      ['Lücke 8',['auf','über','für','gegen'],0,'Rücksicht auf + Akkusativ nehmen.'],
      ['Lücke 9',['als ob','damit','denn','ob'],1,'damit beschreibt den Zweck.'],
      ['Lücke 10',['ob','dass','weil','um'],0,'Es bleibt abzuwarten, ob …'],
      ['Lücke 11',['ausgewertet','abgewertet','gewertet','verwerten'],0,'Erfahrungen werden ausgewertet.'],
      ['Lücke 12',['treffen','nehmen','setzen','stellen'],0,'eine Entscheidung treffen.']
    ]
  },
  listening: {
    title:'Hören',
    intro:'Tres textos originales y 12 preguntas: asociar opiniones, elegir una respuesta y completar apuntes. Escucha antes de abrir la transcripción. La voz del dispositivo es sintética; no reproduce el audio telc. El examen completo contiene 28 respuestas (8 + 10 + 10), dura unos 40 minutos y vale 48 puntos.',
    introEn:'Three original texts and 12 questions: match opinions, choose an answer and complete notes. Listen before opening the transcript. Device speech is synthetic, not telc audio. The full test has 28 answers (8 + 10 + 10), lasts about 40 minutes and is worth 48 points.',
    blocks:[
      {title:'Teil 1 · Vier Meinungen zu Stadtgärten',text:'Person eins: Seit die Beete von Schulen betreut werden, kommen Kinder öfter in den Garten. Sie lernen dort, woher Lebensmittel kommen. Genau diesen Bildungswert halte ich für entscheidend. Person zwei: Grundsätzlich gefällt mir die Idee. Allerdings werden die Flächen bisher fast nur von Menschen genutzt, die tagsüber Zeit haben. Ohne längere Öffnungszeiten bleiben Berufstätige ausgeschlossen. Person drei: Mich überzeugt vor allem, dass Nachbarn einander begegnen, die sonst kaum miteinander sprechen. Man braucht dafür nicht einmal ein eigenes Beet. Person vier: Ein Garten funktioniert nicht von allein. Wenn die Stadt keine feste Stelle für Pflege und Koordination finanziert, verwildern die Flächen nach wenigen Jahren.',items:[
        ['Welche Aussage passt zu Person eins?',['A · Bildung für Kinder','B · Zugang für Berufstätige','C · Begegnung im Quartier','D · Verlässliche Finanzierung','E · Weniger Autoverkehr','F · Günstigere Wohnungen'],0,'Die Person nennt ausdrücklich den Bildungswert.'],
        ['Welche Aussage passt zu Person zwei?',['A · Bildung für Kinder','B · Zugang für Berufstätige','C · Begegnung im Quartier','D · Verlässliche Finanzierung','E · Weniger Autoverkehr','F · Günstigere Wohnungen'],1,'Die Öffnungszeiten schliessen Berufstätige aus.'],
        ['Welche Aussage passt zu Person drei?',['A · Bildung für Kinder','B · Zugang für Berufstätige','C · Begegnung im Quartier','D · Verlässliche Finanzierung','E · Weniger Autoverkehr','F · Günstigere Wohnungen'],2,'Die Begegnung mit Nachbarn ist zentral.'],
        ['Welche Aussage passt zu Person vier?',['A · Bildung für Kinder','B · Zugang für Berufstätige','C · Begegnung im Quartier','D · Verlässliche Finanzierung','E · Weniger Autoverkehr','F · Günstigere Wohnungen'],3,'Die Stadt soll Koordination und Pflege dauerhaft finanzieren.'] ]},
      {title:'Teil 2 · Interview im Lokalradio',text:'Moderatorin: Unser Gast untersucht die Nutzung öffentlicher Gärten. Was haben Sie gemessen? Forscherin: An drei Standorten haben wir Besucherzahlen erfasst und anschliessend 120 Personen befragt. Besonders häufig wünschten sich die Befragten schattige Sitzplätze. Moderatorin: Können Sie die Standorte vergleichen? Forscherin: Noch nicht zuverlässig. Bei einem Garten wurde nur am Wochenende gezählt, bei den anderen auch werktags. Diese Unterschiede könnten das Ergebnis verzerren. Moderatorin: Was folgt aus der Studie? Forscherin: Zunächst wiederholen wir die Zählung überall in denselben Zeitfenstern. Erst dann formulieren wir konkrete Vorschläge für die Stadtverwaltung.',items:[
        ['Wie viele Personen wurden befragt?',['120','30','300'],0,'Es waren 120 Befragte.'],
        ['Was wurde besonders oft gewünscht?',['schattige Sitzplätze','zusätzliche Parkplätze','längere Öffnungszeiten'],0,'Die Sitzplätze im Schatten.'],
        ['Warum sind die Standorte noch nicht vergleichbar?',['Die Beobachtungszeiten unterschieden sich.','Ein Standort hatte keinen Garten.','Die Daten stammen aus einem anderen Jahrzehnt.'],0,'Ein Standort wurde nur am Wochenende gezählt.'],
        ['Was geschieht vor den Vorschlägen an die Stadt?',['Eine neue Zählung mit gleichen Zeitfenstern','Die sofortige Schliessung eines Gartens','Die Veröffentlichung ohne weitere Prüfung'],0,'Zuerst wird die Erhebung vereinheitlicht.'] ]},
      {title:'Teil 3 · Stichworte zu einem Vortrag',text:'Guten Abend. Unser Projekt untersucht, wie sich Bibliotheken im Sommer vor Überhitzung schützen können. Wir vergleichen vier Gebäude. Die Messungen laufen sechs Wochen lang, jeweils von Juni bis Mitte Juli. An den Fenstern der Südseite werden bewegliche Aussenstoren geprüft; sie halten die direkte Sonne besser ab als Vorhänge im Raum. Zusätzlich messen wir die Temperatur auf begrünten Dächern. In den Lesesälen befragen wir 80 Besucherinnen und Besucher. Eine Einschränkung ist wichtig: Im ältesten Gebäude funktioniert die Lüftung derzeit nur teilweise. Deshalb vergleichen wir nicht einfach Durchschnittswerte, sondern auch die Tageszeiten und die Ausrichtung der Räume. Die Ergebnisse gehen im September an die Stadt. Erst danach wird entschieden, welche Massnahme dauerhaft finanziert wird.',items:[
        ['Wie viele Gebäude werden verglichen?',[],['vier','4'],'Vier Gebäude werden verglichen.'],
        ['Wie lange dauern die Messungen?',[],['sechs wochen','6 wochen'],'Die Messungen laufen sechs Wochen.'],
        ['Wie viele Personen werden in Lesesälen befragt?',[],['80','achtzig'],'Es sind 80 Personen.'],
        ['In welchem Monat erhält die Stadt die Ergebnisse?',[],['september'],'Die Ergebnisse gehen im September an die Stadt.'] ]}
    ]
  },
  writing:[
    {title:'Thema A · Öffentliche Räume',prompt:'Eine Lokalzeitung fragt, ob Bibliotheken auch abends kostenlos als Lernorte geöffnet sein sollten. Schreiben Sie eine argumentierende Stellungnahme. Gehen Sie auf Zugang, Kosten, mögliche Einwände und Ihre begründete Position ein.'},
    {title:'Thema B · Digitale Entscheidungen',prompt:'Ein Hochschulmagazin diskutiert, ob automatisierte Empfehlungen bei der Studienwahl hilfreich sind. Erörtern Sie Chancen und Grenzen, nennen Sie ein konkretes Beispiel und begründen Sie Ihre Schlussfolgerung.'}
  ],
  speaking:[
    {title:'Teil 1A · Präsentation',prompt:'Wählen Sie eines: Welche öffentliche Einrichtung ist in Ihrer Region besonders wichtig? Oder: Welche technische Entwicklung hat Ihre Lernweise verändert? Sprechen Sie etwa drei Minuten, mit Einleitung, Beispiel und Fazit.'},
    {title:'Teil 1B · Zusammenfassung und Anschlussfragen',prompt:'Hören Sie einer anderen Person zu. Fassen Sie deren wichtigste Aussage zusammen und stellen Sie zwei offene Anschlussfragen. Allein: Notieren Sie mögliche Fragen zu Ihrer eigenen Präsentation.'},
    {title:'Teil 2 · Diskussion',prompt:'Soll eine Stadt kostenlose Arbeitsräume in öffentlichen Gebäuden anbieten? Diskutieren Sie Nutzen, Finanzierung und Zugang. Gehen Sie auf die Argumente Ihres Gegenübers ein.'}
  ],
  esc(s){return C11Lessons.esc(s);},
  tr(es,en){return Lang.current==='en'?en:es;},
  open(section='overview'){
    Current.levelId='b2c1';
    if(App.current!=='c11-lessons')C11Lessons.open();
    this.active=true;
    this.render(section);
  },
  close(){
    if(this.section==='listening')Speech.stop();
    this.active=false;
    this.section='overview';
    C11Lessons.renderHome();
  },
  render(section='overview'){
    if(this.section==='listening'&&section!=='listening')Speech.stop();
    this.section=section;
    const e=x=>this.esc(x),body=document.getElementById('c11-lessons-body');
    document.getElementById('banner-sub').textContent='🎯 telc Deutsch C1 · Training';
    const tabs=[['overview',this.tr('Inicio','Overview')],['reading','Lesen'],['language','Sprachbausteine'],['listening','Hören'],['writing','Schreiben'],['speaking','Sprechen']];
    const nav=`<div class="lesson-actions" style="flex-wrap:wrap">${tabs.map(([id,label])=>`<button class="results-btn-s" type="button" aria-current="${section===id?'page':'false'}" onclick="C1Exam.render('${id}')">${e(label)}</button>`).join('')}</div>`;
    let inner='';
    if(section==='overview'){
      inner=`<div class="intro-box"><b>telc Deutsch C1 · ${this.tr('entrenamiento de formato','format practice')}</b><p>${this.tr('El modelo de 2016 guía la estructura. Los textos, preguntas y temas de esta práctica son nuevos. No es una reproducción del Übungstest ni un simulacro completo.','The 2016 model informs the structure. The texts, questions and prompts here are new. This is neither a reproduction of the Übungstest nor a full mock exam.')}</p></div><div class="rule-box"><b>${this.tr('Formato del modelo','Model format')}</b><p>Lesen + Sprachbausteine: 90 min · 48 + 22 Punkte<br>Pause: 20 min · Hören: ca. 40 min / 48 Punkte<br>Schreiben: 70 min / 48 Punkte · Sprechen: 20 min Vorbereitung + ca. 16 min / 48 Punkte</p><p>${this.tr('Esta práctica: 12 preguntas de lectura, 12 de lenguaje, 12 de escucha sintética en tres formatos, una redacción guiada y tres tareas orales. Las puntuaciones de las prácticas son orientativas; escritura y oral requieren revisión humana.','This practice: 12 reading questions, 12 language gaps, 12 synthetic-listening questions in three formats, guided writing and three oral tasks. Practice scores are indicative; writing and speaking need human assessment.')}</p></div>`;
    }else if(['reading','language','listening'].includes(section)){
      const unit=this[section],blocks=unit.blocks||[{title:'Text',text:unit.text,items:unit.items}],total=blocks.reduce((n,b)=>n+b.items.length,0);
      inner=`<div class="intro-box"><b>${unit.title} · ${total} ${this.tr('preguntas originales','original questions')}</b><p>${e(this.tr(unit.intro,unit.introEn))}</p></div>${blocks.map((b,bi)=>`<div class="rule-box" style="margin:14px 0"><h3>${e(b.title)}</h3>${section==='listening'?`<button type="button" class="pill-btn" onclick="C1Exam.play(${bi})">🔊 ${this.tr('Escuchar','Listen')}</button><button type="button" class="results-btn-s" onclick="Speech.stop()">■ Stop</button><details><summary>${this.tr('Mostrar transcripción después de escuchar','Show transcript after listening')}</summary><p lang="de">${e(b.text)}</p></details>`:`<p lang="de" style="line-height:1.8;white-space:pre-wrap">${e(b.text)}</p>`}${b.items.map(([q,options],qi)=>{const idx=blocks.slice(0,bi).reduce((n,x)=>n+x.items.length,0)+qi;return `<fieldset style="margin:15px 0;padding:10px;border:1px solid var(--border);border-radius:12px"><legend lang="de">${idx+1}. ${e(q)}</legend>${options.length?options.map((o,j)=>`<label style="display:block;margin:8px 0"><input type="radio" name="c1exam-${section}-${idx}" value="${j}"> ${e(o)}</label>`).join(''):`<input type="text" id="c1exam-${section}-${idx}" aria-label="${e(q)}" autocomplete="off" style="width:100%;padding:9px;border:1px solid var(--border);border-radius:8px">`}<div id="c1exam-feedback-${idx}" aria-live="polite"></div></fieldset>`}).join('')}</div>`).join('')}<button type="button" class="pill-btn" onclick="C1Exam.check('${section}')">${this.tr('Corregir respuestas','Check answers')}</button><div id="c1exam-result" aria-live="polite" style="margin:12px 0"></div>`;
    }else if(section==='writing'){
      inner=`<div class="intro-box"><b>Schriftlicher Ausdruck · 70 Minuten</b><p>${this.tr('Elige un tema y escribe unas 350 palabras. El borrador se guarda en este dispositivo. Revisa contenido y línea argumental, corrección, repertorio y organización; cada criterio se valora de 0 a 12 en el modelo. La app no asigna una nota oficial.','Choose one topic and write about 350 words. Your draft stays on this device. Review task fulfilment and reasoning, accuracy, range and organisation; each criterion is worth 0–12 in the model. The app does not award an official grade.')}</p></div>${this.writing.map((x,i)=>`<div class="rule-box"><b>${e(x.title)}</b><p lang="de">${e(x.prompt)}</p></div>`).join('')}<label for="c1exam-essay"><b>${this.tr('Tu redacción en alemán','Your German essay')}</b></label><textarea id="c1exam-essay" class="schreib-textarea" style="min-height:260px" oninput="C1Exam.saveDraft()"></textarea><div id="c1exam-count" class="word-counter">0 Wörter</div><details><summary>${this.tr('Lista de revisión','Review checklist')}</summary><ul><li>${this.tr('¿Presentas una tesis, argumentos, un contraargumento y una conclusión?','Do you present a thesis, arguments, a counterargument and a conclusion?')}</li><li>${this.tr('¿Cada párrafo desarrolla una idea y se enlaza con el siguiente?','Does each paragraph develop one idea and connect to the next?')}</li><li>${this.tr('¿Has revisado casos, posición verbal y vocabulario preciso?','Have you checked cases, verb placement and precise vocabulary?')}</li></ul></details>`;
    }else if(section==='speaking'){
      inner=`<div class="intro-box"><b>Mündlicher Ausdruck</b><p>${this.tr('Modelo: 20 minutos de preparación y unos 16 minutos de prueba en pareja. Practica con otra persona si puedes; la app no evalúa pronunciación ni interacción.','Model: 20 minutes to prepare and about 16 minutes in a pair. Practise with another person if possible; the app does not assess pronunciation or interaction.')}</p></div>${this.speaking.map(x=>`<div class="rule-box" style="margin:12px 0"><b>${e(x.title)}</b><p lang="de">${e(x.prompt)}</p></div>`).join('')}<label for="c1exam-notes"><b>${this.tr('Notas breves','Brief notes')}</b></label><textarea id="c1exam-notes" class="schreib-textarea" style="min-height:130px" oninput="C1Exam.saveDraft()"></textarea>`;
    }
    body.innerHTML=`<div class="intro-box"><b style="font-size:20px">🎯 telc Deutsch C1 · ${this.tr('entrenamiento','practice')}</b><p>${this.tr('Ejercicios originales inspirados en el formato del Übungstest 1 (2016).','Original tasks informed by the Übungstest 1 (2016) format.')}</p></div>${nav}${inner}<button type="button" class="results-btn-s" style="margin:24px 0" onclick="C1Exam.close()">← ${this.tr('Volver a las 12 lecciones','Back to 12 lessons')}</button>`;
    if(section==='writing'||section==='speaking')this.restoreDraft();
    window.scrollTo(0,0);
  },
  play(i){const block=this.listening.blocks[i];if(block)Speech.speak(block.text);},
  check(section){
    const blocks=this[section].blocks||[{items:this[section].items}];let score=0,answered=0,idx=0;
    for(const block of blocks)for(const [q,options,correct,reason] of block.items){
      const selected=options.length?document.querySelector(`input[name="c1exam-${section}-${idx}"]:checked`):document.getElementById(`c1exam-${section}-${idx}`),el=document.getElementById(`c1exam-feedback-${idx}`);
      const value=selected?.value?.trim()||'',valid=options.length?selected&&Number(value)===correct:correct.some(x=>this.normalise(value)===this.normalise(x));
      if(value){answered++;if(valid)score++;}
      el.textContent=`${valid?'✓':'✗'} ${this.tr('Solución','Answer')}: ${options.length?options[correct]:correct[0]}. ${reason}`;
      el.style.color=valid?'#207051':'#a33b3b';idx++;
    }
    const total=idx;document.getElementById('c1exam-result').textContent=`${score}/${total} ✓ · ${answered}/${total} ${this.tr('respondidas','answered')}. ${this.tr('Puntuación de práctica, no nota telc.','Practice score, not a telc grade.')}`;
    try{localStorage.setItem(`alodeutsch-c1-exam-${section}`,JSON.stringify({score,total,answered,date:new Date().toISOString()}));}catch(_){}
  },
  normalise(value){return String(value).trim().toLocaleLowerCase('de').replace(/\u00df/g,'ss').replace(/[.,!?]/g,'').replace(/\s+/g,' ');},
  saveDraft(){const id=this.section==='writing'?'c1exam-essay':'c1exam-notes',el=document.getElementById(id);if(!el)return;try{localStorage.setItem('alodeutsch-'+id,el.value);}catch(_){}if(id==='c1exam-essay')document.getElementById('c1exam-count').textContent=el.value.trim().split(/\s+/).filter(Boolean).length+' Wörter';},
  restoreDraft(){const id=this.section==='writing'?'c1exam-essay':'c1exam-notes',el=document.getElementById(id);try{el.value=localStorage.getItem('alodeutsch-'+id)||'';}catch(_){el.value='';}if(id==='c1exam-essay')this.saveDraft();}
};

// The practice shares the lesson-list screen, so Back must restore its list first.
const C1ExamGoBack = App.goBack;
App.goBack = function(...args){
  if(C1Exam.active&&this.current==='c11-lessons')return C1Exam.close();
  return C1ExamGoBack.apply(this,args);
};
