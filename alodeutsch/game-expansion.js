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
  ['La propuesta tiene ventajas, pero requiere más presupuesto','The proposal has advantages but requires a larger budget',['Der','Vorschlag','hat','Vorteile,','benötigt','aber','mehr','Geld']]
];
SENTENCE_BANK.b2.push(...GAME_SENTENCES_B2.map(([es,en,words])=>({es,en,words})));

const GAME_SENTENCES_BERUF = [
  ['Antes de decidir, consultamos al equipo','Before deciding, we consult the team',['Bevor','wir','entscheiden,','halten','wir','Rücksprache','mit','dem','Team']],
  ['La queja será examinada y respondida por escrito','The complaint will be examined and answered in writing',['Die','Beschwerde','wird','geprüft','und','schriftlich','beantwortet']],
  ['Debido a un retraso, debemos informar a la clientela','Due to a delay, we must inform the customers',['Wegen','einer','Verzögerung','müssen','wir','die','Kundschaft','informieren']],
  ['La reunión se pospone siempre que todas las personas estén de acuerdo','The meeting will be postponed provided everyone agrees',['Die','Sitzung','wird','verschoben,','sofern','alle','einverstanden','sind']],
  ['El comprobante se envía directamente a contabilidad','The receipt is sent directly to accounting',['Der','Beleg','wird','direkt','an','die','Buchhaltung','geschickt']],
  ['Nos hacemos cargo de los gastos adicionales','We will cover the additional costs',['Wir','übernehmen','die','zusätzlichen','Kosten']],
  ['El presupuesto se ajustó tras consultar con el departamento','The budget was adjusted after consulting the department',['Das','Budget','wurde','nach','Rücksprache','mit','der','Abteilung','angepasst']],
  ['Si surge alguna duda, estamos a su disposición','Should any questions arise, we are at your disposal',['Falls','Fragen','auftauchen,','stehen','wir','Ihnen','zur','Verfügung']]
];
SENTENCE_BANK.b2c1.push(...GAME_SENTENCES_BERUF.map(([es,en,words])=>({es,en,words})));

const GAME_SENTENCES_C1 = [
  ['Los indicios sugieren que el resultado ya se ha revisado','The evidence suggests that the result has already been reviewed',['Das','Ergebnis','dürfte','bereits','überprüft','worden','sein']],
  ['La propuesta tiene ventajas; sin embargo, los costes aumentan','The proposal has advantages; however, costs are rising',['Der','Vorschlag','hat','Vorteile,','allerdings','steigen','die','Kosten']],
  ['Los resultados se pueden comprobar de forma independiente','The results can be checked independently',['Die','Ergebnisse','lassen','sich','unabhängig','überprüfen']],
  ['Hoy se debate sobre las nuevas condiciones de trabajo','The new working conditions are being discussed today',['Heute','wird','über','die','neuen','Arbeitsbedingungen','diskutiert']],
  ['La exposición anima a mirar el espacio público de otra manera','The exhibition encourages a new view of public space',['Die','Ausstellung','regt','dazu','an,','den','öffentlichen','Raum','neu','zu','betrachten']],
  ['La beca cubre solo una parte de los gastos','The scholarship covers only part of the expenses',['Das','Stipendium','deckt','nur','einen','Teil','der','Kosten']],
  ['Debido a las deudas, acordó un pago a plazos','Because of the debts, she agreed on payment in instalments',['Wegen','der','Schulden','vereinbarte','sie','eine','Ratenzahlung']],
  ['La conclusión no se puede sacar de un solo test','The conclusion cannot be drawn from a single test',['Der','Rückschluss','lässt','sich','nicht','aus','einem','einzigen','Test','ziehen']],
  ['Si la ciudad amplía las zonas verdes, disminuirá el calor','If the city expands green spaces, the heat will decrease',['Wenn','die','Stadt','Grünflächen','ausbaut,','nimmt','die','Hitze','ab']],
  ['La protagonista interpreta el final de otra manera','The protagonist interprets the ending differently',['Die','Protagonistin','legt','das','Ende','anders','aus']],
  ['Antes de aceptar, debería consultar con el equipo','Before accepting, she should consult the team',['Bevor','sie','zusagt,','sollte','sie','Rücksprache','mit','dem','Team','halten']],
  ['La tecnología sigue siendo controvertida a pesar de los avances','The technology remains controversial despite the progress',['Die','Technologie','bleibt','trotz','der','Fortschritte','umstritten']],
  ['No tienes que responder de inmediato','You do not have to reply immediately',['Du','musst','nicht','sofort','antworten']],
  ['Por un lado crea empleos, por otro suben los alquileres','On the one hand it creates jobs, on the other rents rise',['Einerseits','entstehen','Arbeitsplätze,','andererseits','steigen','die','Mieten']],
  ['La muestra es demasiado pequeña para generalizar','The sample is too small for generalisation',['Die','Stichprobe','ist','zu','klein,','als','dass','man','verallgemeinern','könnte']],
  ['Es sensato documentar las tareas por escrito','It makes sense to document the tasks in writing',['Ich','finde','es','sinnvoll,','die','Aufgaben','schriftlich','festzuhalten']],
  ['La obra se expone en un espacio público','The work is displayed in a public space',['Das','Werk','wird','im','öffentlichen','Raum','ausgestellt']],
  ['La investigación se apoya en varias fuentes','The research draws on several sources',['Die','Recherche','stützt','sich','auf','mehrere','Quellen']],
  ['La previsión depende de las cifras actuales','The forecast depends on current figures',['Die','Prognose','hängt','von','den','aktuellen','Zahlen','ab']],
  ['No se debe reducir a una persona a un resultado','A person should not be reduced to one result',['Man','sollte','eine','Person','nicht','auf','ein','Ergebnis','reduzieren']],
  ['Hay que distinguir la planificación de la ejecución','Planning and implementation must be distinguished',['Man','muss','zwischen','Planung','und','Umsetzung','unterscheiden']],
  ['El segundo hilo narrativo empieza años después','The second plotline begins years later',['Der','zweite','Handlungsstrang','beginnt','Jahre','später']],
  ['El malentendido surgió por expectativas distintas','The misunderstanding arose from different expectations',['Das','Missverständnis','entstand','durch','unterschiedliche','Erwartungen']],
  ['Las conclusiones solo se publicarán tras la revisión','The conclusions will be published only after review',['Die','Ergebnisse','werden','erst','nach','der','Prüfung','veröffentlicht']]
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
