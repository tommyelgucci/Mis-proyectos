/* Erweiterung der fünf Dashboard-Spiele aus den neuen Sicher! B2/C1- und
   telc-Beruf-Lerneinheiten. Alle Beispiele und Dialoge sind neu verfasst. */
GAME_LEVELS.push({id:'c1',label:'C1'});

const GAME_SENTENCES_B2 = [
  ['La amistad se fortalece cuando escuchamos con atención','Friendship grows stronger when we listen carefully',['Eine','Freundschaft','wird','stärker,','wenn','wir','aufmerksam','zuhören']],
  ['Los documentos ya fueron enviados al departamento','The documents have already been sent to the department',['Die','Unterlagen','wurden','bereits','an','die','Abteilung','geschickt']],
  ['Aunque el viaje dure más, elegimos el tren','Although the journey takes longer, we choose the train',['Obwohl','die','Reise','länger','dauert,','wählen','wir','den','Zug']],
  ['La alimentación equilibrada depende también de las costumbres','A balanced diet also depends on habits',['Eine','ausgewogene','Ernährung','hängt','auch','von','Gewohnheiten','ab']],
  ['La universidad ofrece apoyo a los nuevos estudiantes','The university offers support to new students',['Die','Hochschule','bietet','neuen','Studierenden','Unterstützung','an']],
  ['El servicio no estuvo a la altura de nuestras expectativas','The service did not meet our expectations',['Die','Dienstleistung','hat','unsere','Erwartungen','nicht','erfüllt']],
  ['Cuanto más preciso sea el informe, más fácil será la decisión','The more precise the report, the easier the decision',['Je','genauer','der','Bericht','ist,','desto','leichter','fällt','die','Entscheidung']],
  ['El precio incluye el envío y la devolución','The price includes shipping and returns',['Im','Preis','sind','Versand','und','Rückgabe','inbegriffen']],
  ['El cliente presentó una reclamación por escrito','The customer submitted a written complaint',['Der','Kunde','hat','eine','schriftliche','Beschwerde','eingereicht']],
  ['La investigación revela diferencias entre los grupos','The research reveals differences between the groups',['Die','Untersuchung','zeigt','Unterschiede','zwischen','den','Gruppen']],
  ['Las personas afectadas deberían recibir información clara','Those affected should receive clear information',['Die','Betroffenen','sollten','klare','Informationen','erhalten']],
  ['La propuesta tiene ventajas, pero requiere más presupuesto','The proposal has advantages but requires a larger budget',['Der','Vorschlag','hat','Vorteile,','erfordert','aber','ein','höheres','Budget']]
];
SENTENCE_BANK.b2.push(...GAME_SENTENCES_B2.map(([es,en,words])=>({es,en,words})));

const GAME_SENTENCES_BERUF = [
  ['Antes de comprometerse, deben aclararse las responsabilidades con el equipo','Before making a commitment, responsibilities must be clarified with the team',['Vor','einer','verbindlichen','Zusage','sind','die','Zuständigkeiten','im','Team','zu','klären']],
  ['La reclamación se examinará antes de decidir sobre una compensación','The complaint will be examined before deciding on compensation',['Die','Beschwerde','wird','geprüft,','bevor','über','eine','mögliche','Entschädigung','entschieden','wird']],
  ['Debido al retraso de entrega, hay que informar de inmediato a los clientes afectados','Due to the delivery delay, affected customers must be informed immediately',['Angesichts','der','Lieferverzögerung','sind','die','betroffenen','Kunden','unverzüglich','zu','informieren']],
  ['La reunión puede aplazarse siempre que todas las partes estén de acuerdo','The meeting may be postponed provided all parties agree',['Die','Sitzung','kann','vertagt','werden,','sofern','sämtliche','Beteiligten','zustimmen']],
  ['El comprobante debe remitirse a contabilidad para su revisión','The receipt must be forwarded to accounting for review',['Der','Beleg','ist','zwecks','Prüfung','an','die','Buchhaltung','weiterzuleiten']],
  ['Si surgen gastos adicionales, la empresa los asumirá tras acordarlo previamente','Should additional costs arise, the company will cover them after prior agreement',['Sollten','Mehrkosten','entstehen,','übernimmt','das','Unternehmen','diese','nach','vorheriger','Abstimmung']],
  ['Tras consultar al departamento responsable, se adaptó el presupuesto','After consulting the responsible department, the budget was adjusted',['Nach','Rücksprache','mit','der','zuständigen','Abteilung','wurde','das','Budget','entsprechend','angepasst']],
  ['Si surgieran consultas, seguimos a su disposición en todo momento','Should any questions arise, we remain at your disposal at all times',['Sollten','Rückfragen','auftauchen,','stehen','wir','Ihnen','jederzeit','zur','Verfügung']],
  ['A pesar de las objeciones, el equipo alcanzó un acuerdo viable','Despite the objections, the team reached a workable agreement',['Ungeachtet','der','Einwände','erzielte','das','Team','eine','tragfähige','Einigung']],
  ['La prolongación del plazo solo es posible previa solicitud por escrito','A deadline extension is only possible upon prior written request',['Eine','Fristverlängerung','ist','nur','auf','vorherigen','schriftlichen','Antrag','hin','möglich']]
];
SENTENCE_BANK.b2c1.push(...GAME_SENTENCES_BERUF.map(([es,en,words])=>({es,en,words})));

const GAME_SENTENCES_C1 = [
  ['Aunque la propuesta parezca convincente, faltan datos fiables','However convincing the proposal may seem, reliable data are missing',['So','überzeugend','der','Vorschlag','auch','sein','mag,','es','fehlen','belastbare','Daten']],
  ['Solo tras comparar las fuentes se puede evaluar su fiabilidad','Only after comparing the sources can their reliability be assessed',['Erst','nach','dem','Vergleich','der','Quellen','lässt','sich','deren','Zuverlässigkeit','beurteilen']],
  ['En vista de los resultados contradictorios, se aplazó la decisión','In view of the contradictory findings, the decision was postponed',['Angesichts','der','widersprüchlichen','Befunde','wurde','die','Entscheidung','vorerst','ausgesetzt']],
  ['La exposición plantea hasta qué punto el espacio público es accesible','The exhibition raises the question of how accessible public space is',['Die','Ausstellung','wirft','die','Frage','auf,','inwiefern','der','öffentliche','Raum','zugänglich','ist']],
  ['Aunque la beca cubra parte de los gastos, falta financiación','Although the scholarship covers some expenses, funding is still lacking',['Wenngleich','das','Stipendium','einen','Teil','der','Kosten','deckt,','fehlt','weitere','Finanzierung']],
  ['A falta de un acuerdo, se negoció un pago a plazos','In the absence of an agreement, payment in instalments was negotiated',['Mangels','einer','Einigung','wurde','eine','Ratenzahlung','ausgehandelt']],
  ['De un único resultado no se pueden extraer conclusiones generales','No general conclusions can be drawn from a single result',['Aus','einem','einzigen','Ergebnis','lassen','sich','keine','allgemeinen','Rückschlüsse','ziehen']],
  ['La ampliación de las zonas verdes podría aliviar el calor, siempre que se mantengan','Expanding green spaces could reduce heat, provided they are maintained',['Der','Ausbau','von','Grünflächen','könnte','die','Hitze','mindern,','sofern','sie','gepflegt','werden']],
  ['La interpretación del final depende de la perspectiva narrativa','The interpretation of the ending depends on the narrative perspective',['Wie','das','Ende','auszulegen','ist,','hängt','von','der','Erzählperspektive','ab']],
  ['Antes de aceptar conviene aclarar las responsabilidades con el equipo','Before accepting, it is advisable to clarify responsibilities with the team',['Vor','einer','Zusage','empfiehlt','sich','eine','Klärung','der','Zuständigkeiten','im','Team']],
  ['Pese a los avances, la tecnología sigue siendo controvertida en varios aspectos','Despite progress, the technology remains controversial in several respects',['Ungeachtet','der','Fortschritte','bleibt','die','Technologie','in','mehrfacher','Hinsicht','umstritten']],
  ['Se debe evitar responder prematuramente mientras no se conozcan los hechos','A premature response should be avoided while the facts remain unclear',['Von','einer','vorschnellen','Antwort','ist','abzusehen,','solange','die','Sachlage','ungeklärt','ist']],
  ['Si bien se crean empleos, también aumenta la presión sobre los alquileres','While jobs are being created, pressure on rents is also increasing',['Während','einerseits','Arbeitsplätze','entstehen,','nimmt','andererseits','der','Druck','auf','die','Mieten','zu']],
  ['La muestra es demasiado pequeña como para justificar generalizaciones','The sample is too small to justify generalisations',['Die','Stichprobe','ist','zu','klein,','als','dass','sich','Verallgemeinerungen','rechtfertigen','liessen']],
  ['Una documentación completa facilitaría reconstruir las decisiones después','Complete documentation would make it easier to reconstruct decisions later',['Eine','lückenlose','Dokumentation','würde','es','erleichtern,','Entscheidungen','später','nachzuvollziehen']],
  ['Al situar la obra en un lugar público, la artista cuestiona las normas de acceso','By placing the work in a public place, the artist questions access rules',['Indem','die','Künstlerin','das','Werk','im','öffentlichen','Raum','platziert,','hinterfragt','sie','die','Zugangsregeln']],
  ['La investigación se basa en fuentes cuya fiabilidad aún debe examinarse','The research draws on sources whose reliability still needs to be examined',['Die','Recherche','stützt','sich','auf','Quellen,','deren','Zuverlässigkeit','noch','zu','prüfen','ist']],
  ['La previsión solo sería válida si las cifras actuales se mantuvieran estables','The forecast would only be valid if current figures remained stable',['Die','Prognose','wäre','nur','haltbar,','sofern','die','aktuellen','Zahlen','stabil','blieben']],
  ['Un único resultado no debería determinar la evaluación de una persona','A single result should not determine the assessment of a person',['Ein','einzelnes','Ergebnis','sollte','für','die','Beurteilung','einer','Person','nicht','ausschlaggebend','sein']],
  ['Debe distinguirse entre una planificación convincente y su aplicación real','A distinction must be made between convincing planning and its actual implementation',['Zwischen','einer','überzeugenden','Planung','und','deren','tatsächlicher','Umsetzung','ist','zu','unterscheiden']],
  ['Solo el segundo hilo narrativo revela por qué el relato cambia de perspectiva','Only the second plotline reveals why the story changes perspective',['Erst','der','zweite','Handlungsstrang','lässt','erkennen,','weshalb','die','Erzählung','die','Perspektive','wechselt']],
  ['El malentendido se debió a que las expectativas no se explicaron','The misunderstanding arose because expectations had not been explained',['Das','Missverständnis','war','darauf','zurückzuführen,','dass','die','Erwartungen','nicht','erläutert','worden','waren']],
  ['Las conclusiones no se publicarán hasta que haya finalizado la revisión independiente','The conclusions will not be published until the independent review is complete',['Die','Schlussfolgerungen','werden','erst','veröffentlicht,','nachdem','die','unabhängige','Prüfung','abgeschlossen','ist']],
  ['A la vista de estos indicios, el informe ya podría haber sido revisado','In view of these indications, the report may already have been reviewed',['Angesichts','dieser','Hinweise','dürfte','der','Bericht','bereits','überprüft','worden','sein']]
];
SENTENCE_BANK.c1=GAME_SENTENCES_C1.map(([es,en,words])=>({es,en,words}));

// Speed Mode now draws on the 12 actual lesson word lists, not only its old bank.
function addGameWords(level, rows){
  const pool=SPEEDMODE_VOCAB[level]||(SPEEDMODE_VOCAB[level]=[]);
  const seenDe=new Set(pool.map(x=>x.de.toLowerCase()));
  const seenEs=new Set(pool.map(x=>x.es.toLowerCase()));
  const seenEn=new Set(pool.map(x=>x.en.toLowerCase()));
  for(const [de,es,en] of rows){
    if(!de||!es||!en||seenDe.has(de.toLowerCase())||seenEs.has(es.toLowerCase())||seenEn.has(en.toLowerCase()))continue;
    pool.push({de,es,en});seenDe.add(de.toLowerCase());seenEs.add(es.toLowerCase());seenEn.add(en.toLowerCase());
  }
}
addGameWords('b2',B2_SICHER_LESSONS.flatMap(l=>l.vocab));
addGameWords('b2',B22_SICHER_LESSONS.flatMap(l=>l.words.map(([de,es],i)=>[de,es,B22_EN[l.id].words[i]])));
addGameWords('b2',[
  ['die Fernbeziehung','la relación a distancia','long-distance relationship'],
  ['die Verschwendung','el desperdicio','waste'],
  ['die Vorlesung','la clase magistral','university lecture'],
  ['die Dienstleistung','la prestación de servicio','service provision'],
  ['die Nebenwirkung','el efecto secundario','side effect'],
  ['die Versorgung','el suministro','supply'],
  ['der Nährstoffmangel','la carencia de nutrientes','nutrient deficiency'],
  ['die Lebenshaltungskosten','el coste de vida','cost of living']
]);
addGameWords('b2c1',[
  ['die Rücksprache','la consulta previa','consultation'],
  ['die Zuständigkeit','la competencia asignada','responsibility'],
  ['die Fristverlängerung','la prórroga del plazo','deadline extension'],
  ['der Zahlungsbeleg','el comprobante de pago','proof of payment'],
  ['die Reklamationsbearbeitung','la gestión de reclamaciones','complaint handling'],
  ['die Vertragsänderung','la modificación contractual','contract amendment'],
  ['die Lieferverzögerung','el retraso de entrega','delivery delay'],
  ['die Kostenerstattung','el reembolso de gastos','expense reimbursement']
]);
addGameWords('c1',C11_LESSONS.flatMap(l=>l.words.map(([de,es,en])=>[de,es,en])));
addGameWords('c1',C12_LESSONS.flatMap(l=>l.words.map(([de,es,en])=>[de,es,en])));

// Ola's highest stage gains questions about the newly added B2 and C1 themes.
OlaCall.QUESTIONS.push(...[
  ['b2-tourismus','Welche Vor- und Nachteile hat der Tourismus ausserhalb der Hauptsaison?','¿Qué ventajas y desventajas tiene el turismo fuera de temporada?','What are the pros and cons of off-season tourism?'],
  ['b2-beruf','Wie würden Sie eine sachliche Beschwerde am Arbeitsplatz formulieren?','¿Cómo formularías una reclamación objetiva en el trabajo?','How would you formulate a factual complaint at work?'],
  ['b2-gesundheit','Wie kann man über Gesundheitsdaten sprechen, ohne zu viel aus ihnen abzuleiten?','¿Cómo hablar de datos de salud sin sacar conclusiones excesivas?','How can one discuss health data without overinterpreting them?'],
  ['c1-finanz','Welche Folgen kann eine Ratenzahlung für ein knappes Budget haben?','¿Qué consecuencias puede tener pagar a plazos con un presupuesto ajustado?','What can paying in instalments mean for a tight budget?'],
  ['c1-psychologie','Inwiefern können Persönlichkeitstests bei einer Bewerbung hilfreich oder problematisch sein?','¿En qué medida pueden ayudar o perjudicar los tests de personalidad en una candidatura?','How can personality tests help or hinder a job application?'],
  ['c1-stadt','Unter welchen Bedingungen würden mehr Grünflächen die Lebensqualität verbessern?','¿En qué condiciones mejorarían la calidad de vida más espacios verdes?','Under what conditions would more green space improve quality of life?'],
  ['c1-literatur','Wie kann eine andere Lesart das Ende eines Romans verändern?','¿Cómo puede otra interpretación cambiar el final de una novela?','How can a different interpretation change a novel’s ending?'],
  ['c1-geschaeft','Wie gehen Sie mit Missverständnissen in internationalen Geschäftskontakten um?','¿Cómo gestionas malentendidos en contactos empresariales internacionales?','How do you deal with misunderstandings in international business?'],
  ['c1-forschung','Welche Grenze einer Studie sollte vor einer Empfehlung genannt werden?','¿Qué límite de un estudio se debe mencionar antes de hacer una recomendación?','Which limitation of a study should be named before making a recommendation?'],
  ['c1-digital','Sollte eine KI über Bildungswege entscheiden dürfen? Begründen Sie Ihre Position.','¿Debería una IA poder decidir trayectorias educativas? Justifica tu postura.','Should AI be allowed to decide educational paths? Justify your position.'],
  ['c1-service','Wie reagieren Sie professionell, wenn eine Kundin eine Rückerstattung verlangt?','¿Cómo responderías profesionalmente si una clienta exige un reembolso?','How would you respond professionally if a customer requests a refund?'],
  ['c1-argument','Nennen Sie ein Gegenargument zu Ihrer eigenen Position und entkräften Sie es.','Da un contraargumento a tu posición y respóndelo.','State a counterargument to your own position and address it.']
].map(([id,de,es,en])=>({id,level:3,de,es,en,reactions:[]})));

SERVICE_VOCAB.push(...[
  {de:'die Rückerstattung',es:'el reembolso',en:'refund'},
  {de:'die Quittung',es:'el recibo',en:'receipt'},
  {de:'die Kreuzkontamination',es:'la contaminación cruzada',en:'cross-contact'},
  {de:'die Reservierung bestätigen',es:'confirmar la reserva',en:'to confirm the reservation'},
  {de:'eine Beschwerde aufnehmen',es:'registrar una reclamación',en:'to take a complaint'},
  {de:'getrennt bezahlen',es:'pagar por separado',en:'to pay separately'}
]);

SERVICE_SCRIPTS.push(...[
  {mood:'complaining',chips:['🧾 Beleg','💳 Rückerstattung'],turns:[
    {de:'Guten Tag. Auf meiner Quittung stehen zwei Cappuccini, ich hatte aber nur einen.',es:'Buenos días. En mi recibo hay dos cappuccinos, pero solo tomé uno.',en:'Hello. My receipt shows two cappuccinos, but I only had one.',kw:['entschuldigung','prüfen','beleg','quittung'],hints:[
      {de:'Entschuldigung. Ich prüfe die Quittung und den Kassenbeleg.',es:'Disculpe. Revisaré el recibo y el comprobante de caja.',en:'I apologise. I will check the receipt and register record.'}]},
    {de:'Danke. Wie wird die zu viel berechnete Summe erstattet?',es:'Gracias. ¿Cómo se devuelve el importe cobrado de más?',en:'Thanks. How will the overcharged amount be refunded?',kw:['rückerstattung','zurück','karte','bar'],hints:[
      {de:'Nach der Prüfung veranlassen wir die Rückerstattung über die ursprüngliche Zahlungsart.',es:'Tras comprobarlo, tramitaremos el reembolso por el método de pago original.',en:'After checking, we will refund via the original payment method.'}]},
    {de:'Gut. Ich hätte gern eine korrigierte Quittung.',es:'Bien. Quisiera un recibo corregido.',en:'Good. I would like a corrected receipt.',kw:['quittung','beleg','gerne'],hints:[
      {de:'Gerne. Ich stelle Ihnen nach der Korrektur eine neue Quittung aus.',es:'Con gusto. Tras corregirlo le emitiré un nuevo recibo.',en:'Certainly. I will issue a new receipt after the correction.'}],end:true}
  ]},
  {mood:'indecisive',chips:['⚠️ Zutaten','🍰 Kuchen'],turns:[
    {de:'Ich habe eine starke Nussallergie. Können Sie bestätigen, ob dieses Gebäck für mich geeignet ist?',es:'Tengo una alergia fuerte a los frutos secos. ¿Puede confirmar si este producto es adecuado para mí?',en:'I have a severe nut allergy. Can you confirm whether this pastry is suitable for me?',kw:['prüfen','zutaten','küche','kreuz'],hints:[
      {de:'Ich prüfe die Zutaten und frage wegen möglicher Kreuzkontakte in der Küche nach.',es:'Comprobaré los ingredientes y consultaré en cocina los posibles contactos cruzados.',en:'I will check the ingredients and ask the kitchen about possible cross-contact.'}]},
    {de:'Danke. Bitte versprechen Sie nichts, bevor Sie das überprüft haben.',es:'Gracias. No me prometa nada antes de comprobarlo.',en:'Thank you. Please do not promise anything before checking.',kw:['verständlich','sicher','prüfen','recht'],hints:[
      {de:'Selbstverständlich. Ohne verlässliche Auskunft empfehle ich Ihnen das Gebäck nicht.',es:'Por supuesto. Sin información fiable no se lo recomendaré.',en:'Of course. Without reliable information, I will not recommend the pastry.'}],end:true}
  ]},
  {mood:'rushed',chips:['🪑 Reservierung','♿ Zugang'],turns:[
    {de:'Guten Abend. Ich habe für vier Personen reserviert. Ist der Zugang stufenlos?',es:'Buenas tardes. Reservé para cuatro personas. ¿El acceso es sin escalones?',en:'Good evening. I booked for four. Is there step-free access?',kw:['prüfen','zugang','reservierung'],hints:[
      {de:'Ich prüfe Ihre Reservierung und kläre den stufenlosen Zugang sofort ab.',es:'Comprobaré su reserva y confirmaré enseguida el acceso sin escalones.',en:'I will check your booking and confirm step-free access immediately.'}]},
    {de:'Danke. Wir möchten ausserdem getrennt bezahlen.',es:'Gracias. También queremos pagar por separado.',en:'Thank you. We would also like to pay separately.',kw:['getrennt','möglich','gerne'],hints:[
      {de:'Gerne, ich vermerke die getrennte Zahlung bei Ihrer Reservierung.',es:'Con gusto, anotaré el pago por separado en su reserva.',en:'Certainly, I will note the separate payment on your booking.'}],end:true}
  ]}
]);

KASSE_CUSTOMERS.push(...[
  {name:'Frau Wyss',avatar:'👩‍💼',tag:'Recibo para la empresa',needsReceipt:true,steps:[
    {t:'say',de:'Grüezi. Zwei Flat White und einen Espresso für unser Team, bitte.',es:'Buenos días. Dos flat white y un espresso para el equipo, por favor.'},
    {t:'ring',items:['Flat White','Flat White','Espresso']},
    {t:'choice',ask:'La clienta necesita justificar el gasto. ¿Qué preguntas?',opts:[
      {de:'Benötigen Sie einen Beleg für die Buchhaltung?',es:'¿Necesita un comprobante para contabilidad?',ok:1},
      {de:'Warum trinken Sie so viel Kaffee?',es:'¿Por qué toma tanto café?'},
      {de:'Geben Sie mir Ihre privaten Kontodaten.',es:'Deme los datos privados de su cuenta.'}]},
    {t:'say',de:'Ja, bitte. Ich zahle mit Karte.',es:'Sí, por favor. Pagaré con tarjeta.'},
    {t:'pay',method:'karte'}
  ]},
  {name:'Herr Bühler',avatar:'🧑‍💼',tag:'Pedido para una reunión',steps:[
    {t:'say',de:'Für unsere Sitzung hätte ich gern drei Kaffee Crème und zwei Wasser ohne Kohlensäure.',es:'Para nuestra reunión quisiera tres cafés crème y dos aguas sin gas.'},
    {t:'ring',items:['Kaffee Crème','Kaffee Crème','Kaffee Crème','Wasser ohne Kohlensäure','Wasser ohne Kohlensäure']},
    {t:'choice',ask:'Confirma el pedido de manera profesional.',opts:[
      {de:'Drei Kaffee Crème und zwei Wasser ohne Kohlensäure, ist das richtig?',es:'Tres cafés crème y dos aguas sin gas, ¿correcto?',ok:1},
      {de:'Das merken Sie sich selber.',es:'Eso recuérdelo usted.'},
      {de:'So viele Getränke sind zu viel.',es:'Son demasiadas bebidas.'}]},
    {t:'say',de:'Genau. Ich bezahle mit Twint.',es:'Exactamente. Pago con Twint.'},
    {t:'pay',method:'twint'}
  ]},
  {name:'Frau Imhof',avatar:'👩‍🦳',tag:'Corrige el pedido antes de pagar',steps:[
    {t:'say',de:'Ein Cappuccino und eine Apfelwähe, bitte.',es:'Un cappuccino y una tarta de manzana, por favor.'},
    {t:'say',de:'Entschuldigung, statt der Apfelwähe doch lieber ein Buttergipfeli.',es:'Disculpe, en vez de la tarta prefiero un cruasán de mantequilla.'},
    {t:'choice',ask:'Todavía no marcaste nada. ¿Cómo confirmas el pedido final?',opts:[
      {de:'Ein Cappuccino und ein Buttergipfeli, richtig?',es:'Un cappuccino y un cruasán, ¿correcto?',ok:1},
      {de:'Ich berechne einfach beide Gebäcke.',es:'Cobro los dos productos de panadería.'},
      {de:'Eine Änderung ist nicht möglich.',es:'No se puede cambiar nada.'}]},
    {t:'ring',items:['Cappuccino','Buttergipfeli']},
    {t:'pay',method:'bar',given:2000}
  ]},
  {name:'Herr Gerber',avatar:'🧔',tag:'Comprobante de gastos',needsReceipt:true,steps:[
    {t:'say',de:'Zwei Espresso und zwei Buttergipfeli, bitte. Ich brauche einen Beleg für die Spesenabrechnung.',es:'Dos espressos y dos cruasáns, por favor. Necesito un comprobante para declarar gastos.'},
    {t:'ring',items:['Espresso','Espresso','Buttergipfeli','Buttergipfeli']},
    {t:'choice',ask:'¿Qué respondes a la solicitud del comprobante?',opts:[
      {de:'Selbstverständlich. Ich stelle Ihnen nach der Zahlung einen Beleg aus.',es:'Por supuesto. Le emitiré el comprobante tras el pago.',ok:1},
      {de:'Das ist mir zu kompliziert.',es:'Eso es demasiado complicado para mí.'},
      {de:'Belege gibt es bei uns nicht.',es:'Aquí no damos comprobantes.'}]},
    {t:'say',de:'Danke. Ich zahle mit Karte.',es:'Gracias. Pago con tarjeta.'},
    {t:'pay',method:'karte'}
  ]}
]);
