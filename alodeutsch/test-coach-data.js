/* Alodeutsch · Test Coach — contenido de entrenamiento (original, no oficial).
   Textos, audios, tareas y rúbricas escritos para práctica; no reproducen exámenes Test ni libros de texto.
   Los tiempos y pesos son orientativos: comprueba siempre la guía oficial de tu convocatoria. */
window.TEST_COACH_DATA = {

/* ── Estructura del simulacro (versión reducida de entrenamiento) ── */
SPEC: {
  note: "Referencia: Test suele exigir un 60 % en la parte escrita y un 60 % en la oral. Los pesos y tiempos de aquí son orientativos y la versión es reducida; verifica los criterios de tu convocatoria.",
  parts: [
    { id: "lesen",     name: "Leseverstehen",          pts: 75, min: 20, auto: true,  oral: false },
    { id: "sprach",    name: "Sprachbausteine",        pts: 30, min: 12, auto: true,  oral: false },
    { id: "hoeren",    name: "Hörverstehen",           pts: 75, min: 15, auto: true,  oral: false },
    { id: "schreiben", name: "Schriftlicher Ausdruck", pts: 45, min: 30, auto: false, oral: false },
    { id: "sprechen",  name: "Mündliche Prüfung",      pts: 75, min: 15, auto: false, oral: true }
  ]
},

/* ── Rúbricas de autoevaluación (0–3) ── */
RUBRIC: {
  writing: [
    { k: "aufgabe",   t: "Aufgabenerfüllung · cumples la tarea", d: ["Faltan casi todos los puntos o el texto no responde a la tarea.", "Cubres la mitad de los puntos o el tono no encaja con el destinatario.", "Cubres todos los puntos, aunque con poco desarrollo.", "Todos los puntos desarrollados y el tono es adecuado al destinatario."] },
    { k: "kohaerenz", t: "Textaufbau · estructura y conectores", d: ["Frases sueltas, sin orden.", "Hay orden, pero casi sin conectores.", "Estructura clara (inicio, desarrollo, cierre) con conectores sencillos.", "Texto fluido, párrafos bien enlazados y conectores variados."] },
    { k: "wortschatz", t: "Wortschatz · léxico y registro", d: ["Vocabulario muy limitado.", "Limitado y repetitivo.", "Suficiente y casi siempre adecuado al registro.", "Variado, preciso y con expresiones fijas."] },
    { k: "grammatik", t: "Grammatik · corrección", d: ["Los errores impiden entender.", "Muchos errores básicos (orden, casos, verbos).", "Algunos errores que no impiden entender.", "Pocos errores y estructuras variadas (Nebensätze, Konjunktiv…)."] }
  ],
  speaking: [
    { k: "aufgabe",    t: "Aufgabenbewältigung · contenido y tarea", d: ["No abordas la tarea.", "Abordas la tarea a medias.", "Abordas la tarea con ideas claras.", "Tarea resuelta con ideas desarrolladas y ejemplos."] },
    { k: "fluss",      t: "Flüssigkeit · fluidez e interacción", d: ["Pausas muy largas, no hay interacción.", "Muchas pausas; reaccionas poco a tu compañero/a.", "Fluido en general; reaccionas y haces avanzar la conversación.", "Natural, con reacciones espontáneas y turnos equilibrados."] },
    { k: "wortschatz", t: "Wortschatz · léxico", d: ["Muy limitado.", "Limitado; repites mucho.", "Suficiente, con algunas expresiones fijas.", "Variado y preciso."] },
    { k: "grammatik",  t: "Grammatik · corrección", d: ["Errores que impiden entender.", "Muchos errores básicos.", "Errores que no impiden entender.", "Pocos errores; estructuras variadas."] },
    { k: "aussprache", t: "Aussprache · pronunciación y entonación", d: ["Difícil de entender.", "Se entiende con esfuerzo.", "Clara, con acento reconocible.", "Clara y natural; buena entonación."] }
  ]
},

/* ── Redemittel por nivel ── */
REDE: {
  writing: {
    b1: [
      { t: "Anrede y Schluss", i: ["Liebe Anna, / Lieber Jonas,", "Sehr geehrte Damen und Herren,", "Sehr geehrte Frau Weber,", "Mit freundlichen Grüßen", "Viele Grüße", "Ich freue mich auf deine Antwort."] },
      { t: "Gründe nennen", i: ["Leider kann ich nicht kommen, weil …", "Der Grund dafür ist, dass …", "Ich muss …, deshalb …", "Außerdem habe ich schon …"] },
      { t: "Bitten und fordern", i: ["Könnten Sie mir bitte … schicken?", "Ich möchte Sie bitten, … zu …", "Bitte antworten Sie mir bis zum …", "Ich erwarte, dass …"] },
      { t: "Vorschlagen", i: ["Wie wäre es, wenn wir …?", "Ich schlage vor, dass wir …", "Hast du Lust, …?", "Vielleicht können wir uns am … treffen."] },
      { t: "Sich entschuldigen", i: ["Es tut mir wirklich leid, dass …", "Bitte entschuldige, dass …", "Ich hoffe, du bist nicht böse."] }
    ],
    b2: [
      { t: "Beschwerde", i: ["Hiermit möchte ich mich über … beschweren.", "Leider musste ich feststellen, dass …", "Das entsprach nicht der Beschreibung auf Ihrer Website.", "Ich erwarte, dass Sie …", "Andernfalls sehe ich mich gezwungen, …"] },
      { t: "Meinung und Argument", i: ["Meiner Meinung nach …", "Ich bin der Ansicht, dass …", "Ein wichtiges Argument dafür ist …", "Zwar …, aber …", "Einerseits …, andererseits …"] },
      { t: "Gegenargument", i: ["Dem steht gegenüber, dass …", "Man darf jedoch nicht vergessen, dass …", "Trotzdem finde ich, dass …", "Das mag stimmen, dennoch …"] },
      { t: "Beispiele und Folgen", i: ["Ein Beispiel dafür ist …", "Das hat zur Folge, dass …", "Dadurch entsteht …", "Das liegt daran, dass …"] },
      { t: "Fazit", i: ["Zusammenfassend lässt sich sagen, dass …", "Abschließend möchte ich betonen, dass …", "Aus diesen Gründen plädiere ich dafür, …"] }
    ],
    c1: [
      { t: "Position beziehen", i: ["Meines Erachtens …", "Ich vertrete die Auffassung, dass …", "Es lässt sich nicht von der Hand weisen, dass …", "Angesichts der Tatsache, dass …"] },
      { t: "Abwägen und einschränken", i: ["Dem steht gegenüber, dass …", "Gleichwohl …", "Ungeachtet dessen …", "Das gilt allerdings nur, sofern …", "So überzeugend das Argument klingt, so …"] },
      { t: "Ursache und Folge", i: ["Daraus ergibt sich, dass …", "Dies ist darauf zurückzuführen, dass …", "Folglich / Demzufolge …", "Das zieht nach sich, dass …"] },
      { t: "Formelle Anliegen", i: ["Ich wende mich an Sie, weil …", "Ich bitte um eine schriftliche Stellungnahme bis zum …", "Ich sehe mich veranlasst, …", "Für Rückfragen stehe ich Ihnen gerne zur Verfügung."] },
      { t: "Schluss", i: ["Abschließend bleibt festzuhalten, dass …", "Insgesamt überwiegen meines Erachtens die …", "Es wäre wünschenswert, wenn …"] }
    ]
  },
  speaking: {
    b1: [
      { t: "Zeit gewinnen", i: ["Das ist eine gute Frage …", "Moment, lassen Sie mich kurz überlegen.", "Also, ich würde sagen …"] },
      { t: "Meinung", i: ["Ich finde, dass …", "Meiner Meinung nach …", "Für mich ist wichtig, dass …"] },
      { t: "Vorschlagen und reagieren", i: ["Wie wäre es, wenn wir …?", "Das ist eine gute Idee.", "Das finde ich nicht so gut, weil …", "Einverstanden, dann machen wir …"] },
      { t: "Nachfragen", i: ["Wie meinst du das?", "Kannst du das bitte wiederholen?", "Habe ich dich richtig verstanden?"] }
    ],
    b2: [
      { t: "Präsentation gliedern", i: ["Ich möchte Ihnen heute … vorstellen.", "Zunächst gehe ich auf … ein.", "Als Nächstes möchte ich …", "Abschließend fasse ich zusammen …"] },
      { t: "Meinung und Begründung", i: ["Ich bin davon überzeugt, dass …", "Das hängt davon ab, ob …", "Ein überzeugendes Argument ist …"] },
      { t: "Widersprechen höflich", i: ["Da muss ich Ihnen teilweise widersprechen.", "Das mag sein, aber bedenken Sie, dass …", "Ich sehe das etwas anders, weil …"] },
      { t: "Aushandeln", i: ["Wären Sie damit einverstanden, wenn …?", "Wir könnten uns darauf einigen, dass …", "Wie wäre es mit einem Kompromiss?", "Dann halten wir fest: …"] }
    ],
    c1: [
      { t: "Differenziert argumentieren", i: ["Das lässt sich nicht pauschal beantworten.", "Zum einen …, zum anderen …", "Das gilt nur eingeschränkt, denn …", "Entscheidend ist letztlich, ob …"] },
      { t: "Auf Gegenargumente eingehen", i: ["Der Einwand ist berechtigt, dennoch …", "Dem könnte man entgegenhalten, dass …", "Ich räume ein, dass …, gleichwohl …"] },
      { t: "Vermitteln", i: ["Wenn ich beide Seiten richtig verstehe, …", "Vielleicht lässt sich beides verbinden, indem …", "Ich würde vorschlagen, dass wir zunächst …"] },
      { t: "Zusammenfassen", i: ["Zusammenfassend kann man festhalten, …", "Wir sind uns also einig, dass …", "Offen bleibt allerdings, ob …"] }
    ]
  }
},

/* ── Leseverstehen: textos originales con 5 preguntas ── */
READ: [
{ id: "r-b1-1", lvl: "b1", title: "Ein Tag ohne Auto", kind: "Zeitungsartikel",
  text: [
    "Jeden ersten Sonntag im Monat bleiben in der Innenstadt von Freiburg die Autos draußen. Die Stadt hat diese Aktion vor zwei Jahren gestartet, weil viele Anwohner über Lärm und schlechte Luft geklagt hatten. Anfangs waren die Geschäftsleute skeptisch. Sie befürchteten, dass weniger Kunden kommen würden, wenn niemand mit dem Auto in die Stadt fahren darf.",
    "Die Zahlen zeigen jedoch etwas anderes: An den autofreien Sonntagen besuchen im Durchschnitt 20 Prozent mehr Menschen die Innenstadt als an normalen Sonntagen. Viele kommen mit dem Fahrrad oder zu Fuß, einige benutzen die kostenlosen Busse, die die Stadt an diesen Tagen anbietet. Auf den leeren Straßen gibt es Musik, Spielstationen für Kinder und kleine Märkte.",
    "Nicht alle sind begeistert. Ein Bäcker erzählt, dass seine Lieferanten an diesen Tagen große Probleme haben, ihn zu erreichen. Die Stadt will deshalb im nächsten Jahr Ausnahmegenehmigungen für Lieferwagen einführen. Außerdem wird überlegt, die Aktion auf zwei Sonntage pro Monat auszuweiten."
  ],
  qs: [
    { q: "Warum hat die Stadt die Aktion gestartet?", o: ["Geschäftsleute wollten mehr Platz für Märkte.", "Anwohner hatten sich über Lärm und schlechte Luft beschwert.", "Die Busse waren zu wenig ausgelastet."], a: 1, e: "Im 1. Absatz: „weil viele Anwohner über Lärm und schlechte Luft geklagt hatten“." },
    { q: "Wie haben die Geschäftsleute am Anfang reagiert?", o: ["Sie waren skeptisch und fürchteten weniger Kunden.", "Sie unterstützten die Aktion sofort.", "Sie verlangten kostenlose Parkplätze."], a: 0, e: "„Anfangs waren die Geschäftsleute skeptisch … Sie befürchteten, dass weniger Kunden kommen würden.“" },
    { q: "Was zeigen die Zahlen?", o: ["Es kommen weniger Besucher als sonst.", "Es kommen mehr Besucher als an normalen Sonntagen.", "Die Besucher bleiben kürzer in der Stadt."], a: 1, e: "„20 Prozent mehr Menschen“ als an normalen Sonntagen." },
    { q: "Welches Problem nennt der Bäcker?", o: ["Seine Kunden finden keinen Parkplatz.", "Die Lieferanten kommen nur schwer zu ihm.", "Die Musik auf der Straße ist zu laut."], a: 1, e: "„seine Lieferanten … große Probleme haben, ihn zu erreichen“." },
    { q: "Was plant die Stadt?", o: ["Sie will die Aktion beenden.", "Sie will Ausnahmen für Lieferwagen erlauben und prüft mehr autofreie Sonntage.", "Sie will die Busse an diesen Tagen kostenpflichtig machen."], a: 1, e: "„Ausnahmegenehmigungen für Lieferwagen“ und „zwei Sonntage pro Monat“ werden überlegt." }
  ] },
{ id: "r-b1-2", lvl: "b1", title: "Das Jobticket", kind: "Rundschreiben",
  text: [
    "Liebe Mitarbeiterinnen und Mitarbeiter,",
    "ab dem 1. Oktober bieten wir allen Beschäftigten ein Jobticket für Bus und Bahn an. Das Ticket gilt im gesamten Verkehrsverbund und kostet monatlich 39 Euro. Davon übernimmt die Firma 25 Euro, Sie zahlen also nur 14 Euro direkt von Ihrem Gehalt. Wer bereits eine Monatskarte besitzt, kann diese bis Ende des Quartals weiterbenutzen und dann zum Jobticket wechseln.",
    "Bitte beachten Sie: Das Jobticket ist nicht übertragbar und gilt nur für die Person, auf deren Namen es ausgestellt ist. Wer einen Firmenparkplatz nutzt, muss sich zwischen Parkplatz und Jobticket entscheiden, weil beides zusammen nicht möglich ist.",
    "Wenn Sie Interesse haben, füllen Sie bitte bis zum 15. September das Formular im Intranet aus. Bei Fragen wenden Sie sich an Frau Weber von der Personalabteilung, Telefon 214."
  ],
  qs: [
    { q: "Wie viel zahlen die Mitarbeiter selbst pro Monat?", o: ["25 Euro", "14 Euro", "39 Euro"], a: 1, e: "39 € − 25 € Zuschuss der Firma = 14 €." },
    { q: "Was gilt für Mitarbeiter mit einer Monatskarte?", o: ["Sie müssen sofort wechseln.", "Sie dürfen die Karte bis Quartalsende weiterbenutzen.", "Sie bekommen das Geld zurück."], a: 1, e: "„kann diese bis Ende des Quartals weiterbenutzen“." },
    { q: "Was ist beim Jobticket nicht erlaubt?", o: ["Es einer anderen Person zu geben.", "Es im ganzen Verkehrsverbund zu benutzen.", "Es per Gehalt zu bezahlen."], a: 0, e: "„nicht übertragbar“: gilt nur für die Person mit dem Namen auf dem Ticket." },
    { q: "Was müssen Mitarbeiter mit Firmenparkplatz tun?", o: ["Sie bezahlen beides zusammen.", "Sie wählen entweder Parkplatz oder Jobticket.", "Sie bekommen das Ticket kostenlos."], a: 1, e: "„Zwischen Parkplatz und Jobticket entscheiden“." },
    { q: "Bis wann muss das Formular ausgefüllt sein?", o: ["Bis zum 1. Oktober.", "Bis zum 15. September.", "Bis Ende des Quartals."], a: 1, e: "„bis zum 15. September“. Der 1. Oktober ist der Start des Angebots." }
  ] },
{ id: "r-b2-1", lvl: "b2", title: "Homeoffice: Segen oder Fluch?", kind: "Zeitungsartikel",
  text: [
    "Seit die Pandemie viele Unternehmen zum Umdenken gezwungen hat, gehört das Arbeiten von zu Hause für Millionen Beschäftigte zum Alltag. Während einige Firmen ihre Büroflächen inzwischen drastisch verkleinert haben, rufen andere ihre Teams wieder an den Schreibtisch zurück. Die Argumente beider Seiten sind nicht von der Hand zu weisen.",
    "Befürworter betonen, dass der Wegfall des Pendelns Zeit und Nerven spare und dass viele Aufgaben konzentrierter erledigt würden, wenn niemand ständig vorbeikomme. Eine aktuelle Befragung ergab, dass knapp zwei Drittel der Beschäftigten zu Hause produktiver sind – gemessen an ihrer eigenen Einschätzung wohlgemerkt, nicht an objektiven Kennzahlen.",
    "Kritiker verweisen dagegen auf die schwindende Zusammengehörigkeit im Team. Spontane Gespräche an der Kaffeemaschine, aus denen oft die besten Ideen entstünden, fänden online kaum statt. Zudem falle es vielen schwer, Arbeit und Privatleben voneinander zu trennen; Überstunden würden schlicht nicht mehr sichtbar. Besonders Berufsanfänger litten darunter, dass sie von erfahrenen Kollegen weniger nebenbei lernen könnten.",
    "Arbeitsforscher plädieren deshalb für hybride Modelle. Entscheidend sei weniger die Zahl der Bürotage als die Frage, wofür sie genutzt würden: Wer die Präsenz für Workshops und Abstimmungen reserviere und konzentrierte Einzelarbeit zu Hause erledige, profitiere in der Regel von beiden Welten."
  ],
  qs: [
    { q: "Was sagt der Text über das Verhalten der Unternehmen?", o: ["Alle Firmen haben ihre Büros verkleinert.", "Manche verkleinern ihre Büros, andere holen ihre Teams zurück.", "Die meisten Firmen verbieten Homeoffice inzwischen."], a: 1, e: "„einige Firmen … verkleinert … andere … wieder an den Schreibtisch zurück“." },
    { q: "Wie ist die Zahl zur Produktivität einzuordnen?", o: ["Sie beruht auf der Selbsteinschätzung der Beschäftigten.", "Sie wurde mit objektiven Kennzahlen gemessen.", "Sie gilt nur für Berufsanfänger."], a: 0, e: "„gemessen an ihrer eigenen Einschätzung wohlgemerkt, nicht an objektiven Kennzahlen“." },
    { q: "Wovon gehen die Kritiker des Homeoffice aus?", o: ["Online-Tools ersetzen jedes persönliche Gespräch.", "Spontaner Austausch geht verloren und damit manche Ideen.", "Überstunden sind im Homeoffice besser sichtbar."], a: 1, e: "„Spontane Gespräche … fänden online kaum statt“; Überstunden würden „nicht mehr sichtbar“." },
    { q: "Wer ist laut Text besonders betroffen?", o: ["Erfahrene Führungskräfte", "Berufsanfänger, die weniger nebenbei lernen", "Menschen mit langem Arbeitsweg"], a: 1, e: "„Besonders Berufsanfänger litten darunter, dass sie … weniger nebenbei lernen könnten.“" },
    { q: "Was empfehlen die Arbeitsforscher?", o: ["Alle sollen wieder täglich ins Büro kommen.", "Entscheidend ist, die Bürotage sinnvoll zu nutzen, z. B. für Workshops.", "Die Zahl der Homeoffice-Tage soll gesetzlich festgelegt werden."], a: 1, e: "„Entscheidend sei weniger die Zahl der Bürotage als die Frage, wofür sie genutzt würden.“" }
  ] },
{ id: "r-b2-2", lvl: "b2", title: "Handyverbot an Schulen?", kind: "Leserbrief",
  text: [
    "Zum Artikel „Handyverbot an Schulen: Ein Gewinn für alle?“",
    "Als Lehrer mit 25 Jahren Berufserfahrung kann ich die Begeisterung für ein generelles Handyverbot nur bedingt teilen. Natürlich lässt sich nicht bestreiten, dass Smartphones den Unterricht stören können, wenn sie unkontrolliert benutzt werden. Dennoch greift ein pauschales Verbot meines Erachtens zu kurz.",
    "Erstens verlagert ein Verbot das Problem lediglich auf den Schulhof und in die Freizeit, statt den Schülerinnen und Schülern beizubringen, verantwortungsvoll mit digitalen Medien umzugehen. Zweitens nutzen wir in meinem Unterricht Handys durchaus sinnvoll: zum Recherchieren, zum Übersetzen oder zum Aufnehmen von Referaten. Würden wir das verbieten, ginge ein Stück Lebenswirklichkeit verloren.",
    "Statt auf Verbote zu setzen, sollten Schulen gemeinsam mit Eltern und Jugendlichen klare Regeln aufstellen: handyfreie Zonen und Zeiten, aber auch Phasen, in denen das Gerät bewusst eingesetzt wird. Wer Regeln selbst mitgestaltet, hält sich erfahrungsgemäß eher daran.",
    "Ich würde mir wünschen, dass die Debatte weniger ideologisch geführt wird und stärker danach fragt, was Kinder tatsächlich brauchen, um in einer digitalen Welt selbstbestimmt zu leben.",
    "Thomas Berger, Hannover"
  ],
  qs: [
    { q: "Wie steht der Verfasser zu einem generellen Handyverbot?", o: ["Er lehnt es grundsätzlich ab, sieht aber ein Problem.", "Er teilt die Begeisterung nur eingeschränkt und hält ein pauschales Verbot für zu kurz gedacht.", "Er fordert ein sofortiges Verbot."], a: 1, e: "„nur bedingt teilen“ und „greift … zu kurz“: kritisch, aber ohne alles abzulehnen." },
    { q: "Was ist sein erstes Argument?", o: ["Verbote kosten zu viel Geld.", "Ein Verbot lehrt keinen verantwortungsvollen Umgang und verlagert das Problem.", "Lehrer können Verbote nicht kontrollieren."], a: 1, e: "„verlagert … das Problem … statt … beizubringen, verantwortungsvoll mit digitalen Medien umzugehen“." },
    { q: "Wie nutzt er Handys im Unterricht?", o: ["Zum Spielen in den Pausen", "Zum Recherchieren, Übersetzen und Aufnehmen von Referaten", "Zum Schreiben von Klassenarbeiten"], a: 1, e: "Genannt werden Recherchieren, Übersetzen, Aufnehmen von Referaten." },
    { q: "Was schlägt er vor?", o: ["Schulen sollen gemeinsam mit Eltern und Jugendlichen Regeln festlegen.", "Die Eltern sollen allein entscheiden.", "Handys sollen nur im Unterricht erlaubt sein."], a: 0, e: "„gemeinsam mit Eltern und Jugendlichen klare Regeln aufstellen“." },
    { q: "Was wünscht er sich für die Debatte?", o: ["Mehr Emotionen", "Weniger ideologische und mehr bedarfsorientierte Argumente", "Eine Abstimmung im Parlament"], a: 1, e: "„weniger ideologisch … stärker danach fragt, was Kinder tatsächlich brauchen“." }
  ] },
{ id: "r-c1-1", lvl: "c1", title: "Stadtgrün gegen die Hitze", kind: "Sachtext",
  text: [
    "Wenn Städte im Sommer zu Hitzeinseln werden, rückt eine Frage in den Mittelpunkt der Stadtplanung, die lange als Nebensache galt: Wie viel Grün braucht ein Quartier? Messungen zeigen, dass an heißen Tagen die Temperatur in dicht bebauten Straßenzügen bis zu zehn Grad über der in Parks liegen kann. Bäume spenden nicht nur Schatten, sondern kühlen die Umgebung auch durch Verdunstung. Entsprechend zählen Begrünungsprogramme mittlerweile zu den gefragtesten Maßnahmen der Klimaanpassung.",
    "Doch so überzeugend die Idee klingt, so ungleich verteilt ist ihr Nutzen. Eine Auswertung von Stadtdaten legt nahe, dass Viertel mit niedrigem Einkommen im Schnitt deutlich weniger Bäume aufweisen als wohlhabende Gegenden – ausgerechnet dort, wo viele Menschen in schlecht gedämmten Wohnungen leben und sich keine Klimaanlage leisten können. Stadtforscher sprechen von „ökologischer Ungerechtigkeit“.",
    "Hinzu kommt ein Zielkonflikt: Jeder Baum braucht Platz, den Parkplätze, Radwege oder Neubauten ebenfalls beanspruchen. Wo die Fläche knapp ist, geraten Verwaltungen unter Rechtfertigungsdruck, zumal Pflanzungen erst nach Jahren ihre volle Wirkung entfalten, während die Kosten sofort anfallen. Einige Kommunen setzen deshalb auf Dach- und Fassadenbegrünung, die zwar weniger Schatten spendet, aber keine zusätzliche Bodenfläche verbraucht.",
    "Fachleute warnen allerdings davor, Begrünung als Allheilmittel zu betrachten. Ohne eine Verringerung der Versiegelung und eine kluge Regenwasserbewirtschaftung, so ihr Einwand, verpuffe ein Teil der Investitionen."
  ],
  qs: [
    { q: "Warum gewinnt Stadtgrün an Bedeutung?", o: ["Parks sind günstiger als andere Bauprojekte.", "Dicht bebaute Straßen werden deutlich heißer als Parks, Bäume kühlen die Umgebung.", "Bäume verbessern vor allem die Wohnungsdämmung."], a: 1, e: "Temperaturunterschied von bis zu zehn Grad; Schatten und Verdunstung kühlen." },
    { q: "Was legt die Auswertung der Stadtdaten nahe?", o: ["Wohlhabende Viertel haben weniger Bäume.", "Viertel mit niedrigem Einkommen haben im Schnitt weniger Bäume.", "Die Baumdichte ist in allen Vierteln gleich."], a: 1, e: "„Viertel mit niedrigem Einkommen … deutlich weniger Bäume“: ungleiche Verteilung des Nutzens." },
    { q: "Worin besteht der genannte Zielkonflikt?", o: ["Bäume konkurrieren mit anderen Flächennutzungen, wirken aber erst spät, während die Kosten sofort anfallen.", "Bäume sind teurer als Dachbegrünung und deshalb verboten.", "Anwohner lehnen jede Pflanzung ab."], a: 0, e: "Platzkonkurrenz mit Parkplätzen, Radwegen, Neubauten; Wirkung nach Jahren, Kosten sofort." },
    { q: "Was gilt für Dach- und Fassadenbegrünung?", o: ["Sie spendet mehr Schatten als Bäume.", "Sie spendet weniger Schatten, braucht aber keine zusätzliche Bodenfläche.", "Sie ist nur in Parks erlaubt."], a: 1, e: "„zwar weniger Schatten … aber keine zusätzliche Bodenfläche“." },
    { q: "Welchen Einwand nennen die Fachleute?", o: ["Begrünung reicht allein nicht; auch Entsiegelung und Regenwassermanagement sind nötig.", "Begrünung ist grundsätzlich wirkungslos.", "Begrünung sollte nur private Gärten betreffen."], a: 0, e: "„Ohne eine Verringerung der Versiegelung und eine kluge Regenwasserbewirtschaftung … verpuffe ein Teil der Investitionen.“" }
  ] },
{ id: "r-c1-2", lvl: "c1", title: "Wer entscheidet, wenn Algorithmen urteilen?", kind: "Kommentar",
  text: [
    "Immer häufiger entscheiden Algorithmen darüber, wer zu einem Vorstellungsgespräch eingeladen wird, welchen Kredit eine Bank vergibt oder welche Nachrichten wir lesen. Befürworter verweisen darauf, dass Software im Gegensatz zu Menschen weder müde noch launisch werde und daher konsistenter urteile. Diese Annahme greift jedoch zu kurz. Ein System, das mit historischen Daten trainiert wird, reproduziert zwangsläufig die Muster, die in diesen Daten stecken – einschließlich bestehender Benachteiligungen.",
    "Dass ein Algorithmus kein persönliches Vorurteil hegt, bedeutet also nicht, dass er neutral ist. Hinzu kommt ein Problem der Nachvollziehbarkeit: Viele lernende Verfahren sind so komplex, dass selbst ihre Entwickler im Einzelfall kaum erklären können, warum ein Bewerber abgelehnt wurde. Wer aber eine Entscheidung nicht begründen kann, kann sie auch schwer anfechten.",
    "Juristen fordern deshalb ein Recht auf Erklärung, wenn automatisierte Entscheidungen erhebliche Folgen für Einzelne haben. Unternehmen halten dagegen, dass eine vollständige Offenlegung ihre Geschäftsgeheimnisse gefährde. Zwischen diesen Positionen deutet sich ein Kompromiss an: unabhängige Prüfstellen, die Systeme auf Verzerrungen untersuchen, ohne den Quellcode zu veröffentlichen.",
    "Skeptiker bezweifeln, ob solche Kontrollen mit dem Tempo der technischen Entwicklung Schritt halten können. Gleichwohl herrscht weitgehend Einigkeit, dass man die Verantwortung nicht an eine Maschine delegieren darf; die Frage ist nur, wie sich menschliche Aufsicht organisieren lässt, ohne die Effizienz zu verlieren, die man sich von der Automatisierung verspricht."
  ],
  qs: [
    { q: "Welches Argument führen die Befürworter automatisierter Entscheidungen an?", o: ["Software urteilt konsistenter, weil sie weder müde noch launisch wird.", "Software kennt keine historischen Daten.", "Software ist günstiger als jede Prüfstelle."], a: 0, e: "„weder müde noch launisch … daher konsistenter urteile“." },
    { q: "Warum „greift diese Annahme zu kurz“?", o: ["Weil Algorithmen zu langsam sind.", "Weil Systeme aus historischen Daten bestehende Benachteiligungen übernehmen.", "Weil Menschen immer objektiver urteilen."], a: 1, e: "Trainingsdaten enthalten Muster, „einschließlich bestehender Benachteiligungen“." },
    { q: "Worin besteht das Problem der Nachvollziehbarkeit?", o: ["Entscheidungen lassen sich schwer begründen und deshalb schwer anfechten.", "Entwickler veröffentlichen alle Daten.", "Bewerber lehnen Algorithmen grundsätzlich ab."], a: 0, e: "„Wer aber eine Entscheidung nicht begründen kann, kann sie auch schwer anfechten.“" },
    { q: "Welcher Kompromiss deutet sich an?", o: ["Der Quellcode wird vollständig veröffentlicht.", "Unabhängige Prüfstellen untersuchen Systeme auf Verzerrungen, ohne den Quellcode offenzulegen.", "Automatisierte Entscheidungen werden verboten."], a: 1, e: "„unabhängige Prüfstellen … ohne den Quellcode zu veröffentlichen“." },
    { q: "Worüber herrscht laut Text weitgehend Einigkeit?", o: ["Maschinen dürfen die Verantwortung übernehmen.", "Die Verantwortung darf nicht an eine Maschine delegiert werden.", "Kontrollen sind überflüssig."], a: 1, e: "„die Verantwortung nicht an eine Maschine delegieren darf“. Offen bleibt nur das Wie." }
  ] }
],

/* ── Hörverstehen: guiones para voz del navegador ── */
LISTEN: [
{ id: "h-b1-1", lvl: "b1", title: "Nachricht vom Reisebüro", kind: "Anrufbeantworter", plays: 2,
  tip: "Antes de escuchar: predice qué datos faltan (hora, lugar, documentos, plazo). Anota cifras mientras escuchas.",
  script: [{ s: "", t: "Guten Tag, hier spricht Katrin Hoffmann vom Reisebüro Sonnenblick. Sie hatten sich für die Busreise nach Prag am achten Juni angemeldet. Leider muss ich Ihnen mitteilen, dass der Bus nicht um sieben, sondern erst um acht Uhr abfährt, weil der Fahrer erst später aus dem Urlaub zurückkommt. Treffpunkt ist wie geplant der Busbahnhof, Bahnsteig vier. Bitte bringen Sie Ihren Personalausweis mit, ein Reisepass ist nicht nötig. Falls Sie nicht mitfahren können, rufen Sie mich bitte bis Freitag an. Vielen Dank und auf Wiederhören." }],
  qs: [
    { q: "Was hat sich geändert?", o: ["Der Treffpunkt", "Die Abfahrtszeit", "Das Reiseziel"], a: 1, e: "Nicht um sieben, sondern um acht Uhr." },
    { q: "Warum gibt es die Änderung?", o: ["Der Bus ist kaputt.", "Der Fahrer kommt später aus dem Urlaub zurück.", "Es gibt zu wenige Anmeldungen."], a: 1, e: "„weil der Fahrer erst später aus dem Urlaub zurückkommt“." },
    { q: "Was muss man mitbringen?", o: ["Den Reisepass", "Den Personalausweis", "Eine Kopie der Anmeldung"], a: 1, e: "„Personalausweis … ein Reisepass ist nicht nötig“." },
    { q: "Bis wann soll man anrufen, wenn man nicht mitfahren kann?", o: ["Bis Freitag", "Bis zum achten Juni", "Bis sieben Uhr"], a: 0, e: "„bis Freitag“." }
  ] },
{ id: "h-b1-2", lvl: "b1", title: "Wohnungsbesichtigung", kind: "Dialog", plays: 2,
  tip: "En diálogos, atiende a los cambios de opinión: lo primero que se dice no siempre es la respuesta final.",
  script: [
    { s: "A", t: "Das ist das Wohnzimmer. Es ist mit 24 Quadratmetern ziemlich groß, und der Balkon geht nach Süden." },
    { s: "B", t: "Schön. Und wie hoch ist die Miete?" },
    { s: "A", t: "Kalt 780 Euro, dazu kommen etwa 150 Euro Nebenkosten. Die Heizung ist dabei." },
    { s: "B", t: "Das ist ein bisschen mehr, als ich geplant hatte. Ist die Küche im Preis enthalten?" },
    { s: "A", t: "Nein, die Küche müssten Sie vom Vormieter übernehmen. Er verlangt dafür 600 Euro." },
    { s: "B", t: "Hm, darüber muss ich nachdenken. Und wie ist die Verkehrsanbindung?" },
    { s: "A", t: "Sehr gut. Die U-Bahn-Station ist nur fünf Minuten zu Fuß entfernt. Ein Parkplatz im Hof kostet allerdings zusätzlich 50 Euro im Monat." },
    { s: "B", t: "Ich habe kein Auto, das ist also kein Problem. Kann ich mich bis morgen Mittag entscheiden?" },
    { s: "A", t: "Ja, aber es gibt noch zwei weitere Interessenten. Rufen Sie mich einfach an." }
  ],
  qs: [
    { q: "Wie hoch ist die Kaltmiete?", o: ["600 Euro", "780 Euro", "930 Euro"], a: 1, e: "Kalt 780 €; 150 € Nebenkosten kommen dazu (930 € warm)." },
    { q: "Was kostet extra, falls man es möchte?", o: ["Die Heizung", "Die Küche vom Vormieter", "Der Balkon"], a: 1, e: "Küche: 600 € beim Vormieter. Die Heizung ist dabei." },
    { q: "Wie weit ist die U-Bahn?", o: ["Fünf Minuten zu Fuß", "Fünfzig Meter", "Zehn Minuten mit dem Bus"], a: 0, e: "„nur fünf Minuten zu Fuß“." },
    { q: "Was sagt die Interessentin zum Schluss?", o: ["Sie nimmt die Wohnung sofort.", "Sie möchte bis morgen Mittag entscheiden.", "Sie braucht einen Parkplatz."], a: 1, e: "Sie fragt, ob sie sich bis morgen Mittag entscheiden kann; sie hat kein Auto." }
  ] },
{ id: "h-b1-3", lvl: "b1", title: "Wetter und Wochenendtipps", kind: "Radiosendung", plays: 2,
  tip: "En radio, los datos clave suelen venir con cifras y días de la semana. Haz una pequeña tabla (sábado / domingo).",
  script: [{ s: "", t: "Liebe Hörerinnen und Hörer, nun zum Wetter am Wochenende. Am Samstag bleibt es im Norden meist trocken, im Süden zieht ab dem Mittag Regen auf, bei Temperaturen um vierzehn Grad. Am Sonntag scheint dann fast überall die Sonne, es wird bis zu zwanzig Grad warm. Wer am Wochenende etwas unternehmen möchte: Der Flohmarkt am Stadtpark findet bei jedem Wetter statt, beginnt aber schon um sieben Uhr morgens. Das Open-Air-Konzert am Sonntagabend wird wegen der guten Aussichten wie geplant stattfinden; Karten gibt es noch an der Abendkasse für zwölf Euro." }],
  qs: [
    { q: "Wie wird das Wetter am Samstag im Süden?", o: ["Sonnig und warm", "Ab Mittag Regen", "Trocken und windig"], a: 1, e: "„im Süden zieht ab dem Mittag Regen auf“." },
    { q: "Wie wird es am Sonntag?", o: ["Fast überall sonnig, bis zu zwanzig Grad", "Regnerisch bei vierzehn Grad", "Nur im Norden sonnig"], a: 0, e: "„scheint dann fast überall die Sonne … bis zu zwanzig Grad“." },
    { q: "Was gilt für den Flohmarkt?", o: ["Er findet nur bei gutem Wetter statt.", "Er findet bei jedem Wetter statt und beginnt um sieben Uhr.", "Er beginnt erst mittags."], a: 1, e: "„bei jedem Wetter … schon um sieben Uhr morgens“." },
    { q: "Wo bekommt man noch Karten für das Konzert?", o: ["Im Internet", "An der Abendkasse", "Im Stadtpark"], a: 1, e: "„an der Abendkasse für zwölf Euro“." }
  ] },
{ id: "h-b2-1", lvl: "b2", title: "Schlafprobleme", kind: "Radiointerview", plays: 2,
  tip: "En entrevistas, la segunda mención de un dato suele ser la definitiva. Distingue causa (qué provoca el problema) de consejo (qué hacer).",
  script: [
    { s: "M", t: "Frau Dr. Kramm, viele Menschen klagen über Schlafprobleme. Woran liegt das?" },
    { s: "K", t: "Ein wesentlicher Faktor ist das Licht am Abend. Bildschirme unterdrücken das Schlafhormon Melatonin, sodass wir später müde werden. Hinzu kommt, dass viele auch nach Feierabend noch E-Mails beantworten." },
    { s: "M", t: "Hilft es denn, das Handy einfach früher wegzulegen?" },
    { s: "K", t: "Das allein genügt häufig nicht. Entscheidend ist ein fester Rhythmus: möglichst jeden Tag zur gleichen Zeit ins Bett gehen und aufstehen, auch am Wochenende. Wer am Samstag bis mittags schläft, verschiebt seine innere Uhr und beginnt die Woche mit einer Art Mini-Jetlag." },
    { s: "M", t: "Und der berühmte Mittagsschlaf?" },
    { s: "K", t: "Der ist durchaus sinnvoll, sofern er nicht länger als zwanzig Minuten dauert. Wer länger schläft, fällt in Tiefschlafphasen und fühlt sich danach oft benommen." },
    { s: "M", t: "Was raten Sie jemandem, der nachts wach liegt?" },
    { s: "K", t: "Nicht auf die Uhr schauen. Das erhöht den Druck. Besser aufstehen, etwas Ruhiges tun und erst wieder ins Bett gehen, wenn man müde ist." }
  ],
  qs: [
    { q: "Warum stört Bildschirmlicht am Abend den Schlaf?", o: ["Es macht die Augen müde.", "Es unterdrückt das Schlafhormon Melatonin.", "Es erhöht die Körpertemperatur."], a: 1, e: "„Bildschirme unterdrücken das Schlafhormon Melatonin“." },
    { q: "Was ist laut Frau Dr. Kramm entscheidend?", o: ["Das Handy früh wegzulegen", "Ein fester Schlafrhythmus, auch am Wochenende", "Möglichst lange am Wochenende zu schlafen"], a: 1, e: "Das Handy allein genügt nicht; entscheidend ist der feste Rhythmus." },
    { q: "Wie lange sollte ein Mittagsschlaf höchstens dauern?", o: ["Zehn Minuten", "Zwanzig Minuten", "Eine Stunde"], a: 1, e: "„nicht länger als zwanzig Minuten“, sonst Tiefschlaf und Benommenheit." },
    { q: "Was empfiehlt sie bei nächtlichem Wachliegen?", o: ["Auf die Uhr schauen, um die Zeit zu kontrollieren", "Aufstehen, etwas Ruhiges tun und später zurück ins Bett", "Sofort ein Glas Milch trinken und liegen bleiben"], a: 1, e: "Nicht auf die Uhr schauen; aufstehen und erst bei Müdigkeit wieder ins Bett." }
  ] },
{ id: "h-b2-2", lvl: "b2", title: "Elektroschrott", kind: "Vortrag", plays: 2,
  tip: "En un Vortrag, la estructura se anuncia (problema → causas → medidas). Anota cifras y quién está obligado a qué.",
  script: [{ s: "", t: "Meine Damen und Herren, herzlich willkommen zu unserem Vortrag über Elektroschrott. Jährlich fallen in Europa mehr als zehn Millionen Tonnen alter Elektrogeräte an, doch nur etwa die Hälfte wird ordnungsgemäß gesammelt. Der Rest landet im Hausmüll oder verstaubt in Schubladen. Dabei stecken in einem einzigen Handy rund fünfzig verschiedene Rohstoffe, darunter Gold, Kupfer und seltene Erden. Das Recycling lohnt sich also nicht nur für die Umwelt. Das Problem: Viele Verbraucher wissen nicht, wo sie ihre Geräte abgeben können. Dabei sind Händler mit größerer Verkaufsfläche verpflichtet, kleine Geräte kostenlos zurückzunehmen, auch wenn man dort nichts Neues kauft. Außerdem plant die EU, Hersteller stärker in die Pflicht zu nehmen: Geräte sollen künftig leichter reparierbar sein, damit sie länger genutzt werden. Denn die beste Lösung ist immer noch, ein Gerät gar nicht erst wegzuwerfen." }],
  qs: [
    { q: "Welcher Anteil der Altgeräte wird ordnungsgemäß gesammelt?", o: ["Etwa die Hälfte", "Fast alle", "Etwa ein Zehntel"], a: 0, e: "„nur etwa die Hälfte“." },
    { q: "Warum lohnt sich das Recycling laut Vortrag?", o: ["Nur wegen der Umwelt", "Wegen der Umwelt und wegen wertvoller Rohstoffe", "Weil Händler dafür bezahlen"], a: 1, e: "„nicht nur für die Umwelt“: Handys enthalten Gold, Kupfer, seltene Erden." },
    { q: "Was gilt für Händler mit größerer Verkaufsfläche?", o: ["Sie müssen kleine Geräte kostenlos zurücknehmen, auch ohne Neukauf.", "Sie müssen alte Geräte nur beim Neukauf annehmen.", "Sie dürfen eine Gebühr verlangen."], a: 0, e: "„kleine Geräte kostenlos zurückzunehmen, auch wenn man dort nichts Neues kauft“." },
    { q: "Was plant die EU?", o: ["Ein Verbot von Handys", "Leichter reparierbare Geräte, damit sie länger genutzt werden", "Höhere Preise für Elektrogeräte"], a: 1, e: "„Geräte sollen künftig leichter reparierbar sein“." }
  ] },
{ id: "h-b2-3", lvl: "b2", title: "Die Präsentation wird vorgezogen", kind: "Dialog", plays: 2,
  tip: "Los problemas y las soluciones suelen aparecer en orden: problema → propuesta → objeción → acuerdo. Anota quién se encarga de qué.",
  script: [
    { s: "A", t: "Markus, hast du kurz Zeit? Es geht um die Präsentation für Donnerstag." },
    { s: "B", t: "Klar. Gibt es ein Problem?" },
    { s: "A", t: "Leider ja. Der Kunde hat angerufen und möchte die Präsentation auf Mittwoch vorziehen, weil sein Chef am Donnerstag verreist." },
    { s: "B", t: "Mittwoch? Das wird knapp. Die Zahlen aus dem Controlling bekommen wir doch erst morgen Nachmittag." },
    { s: "A", t: "Genau das ist meine Sorge. Ich hatte vorgeschlagen, die Kalkulation nachzureichen, aber er will unbedingt alles auf einmal sehen." },
    { s: "B", t: "Dann sollten wir die Aufgaben neu verteilen. Ich übernehme die Folien, du kümmerst dich um die Kalkulation, sobald die Zahlen da sind." },
    { s: "A", t: "Einverstanden. Und wenn es am Ende nicht reicht, rufe ich ihn an und bitte um Donnerstagvormittag, bevor er fliegt." },
    { s: "B", t: "Gute Idee. Aber versuchen wir es erst einmal ohne Verschiebung." }
  ],
  qs: [
    { q: "Warum soll die Präsentation früher stattfinden?", o: ["Der Chef des Kunden verreist am Donnerstag.", "Die Zahlen sind schon fertig.", "Markus hat am Donnerstag keine Zeit."], a: 0, e: "„weil sein Chef am Donnerstag verreist“." },
    { q: "Was ist das Hauptproblem?", o: ["Es fehlen Folien.", "Die Zahlen aus dem Controlling kommen erst morgen Nachmittag.", "Der Kunde hat abgesagt."], a: 1, e: "„Die Zahlen aus dem Controlling bekommen wir doch erst morgen Nachmittag.“" },
    { q: "Wie teilen sie die Aufgaben auf?", o: ["Markus macht die Folien, seine Kollegin die Kalkulation.", "Markus macht die Kalkulation, seine Kollegin die Folien.", "Beide machen alles gemeinsam."], a: 0, e: "Markus: „Ich übernehme die Folien, du kümmerst dich um die Kalkulation“." },
    { q: "Was ist Plan B?", o: ["Den Termin ganz absagen", "Den Kunden um Donnerstagvormittag bitten, bevor er fliegt", "Die Kalkulation weglassen"], a: 1, e: "„rufe ich ihn an und bitte um Donnerstagvormittag, bevor er fliegt“." }
  ] },
{ id: "h-c1-1", lvl: "c1", title: "Ein Versuch in zwei Quartieren", kind: "Radiomeldung", plays: 2,
  tip: "C1: fíjate en lo que NO está decidido (Vorbehalte). Las noticias distinguen decisión, condiciones y evaluación.",
  script: [{ s: "", t: "Die Verwaltung startet im Frühjahr einen sechsmonatigen Versuch in zwei Quartieren. Damit ist eine stadtweite Einführung ausdrücklich noch nicht beschlossen. Neben den Nutzungszahlen sollen Kosten, Rückmeldungen der Anwohnenden und mögliche Folgen für den lokalen Verkehr ausgewertet werden. Die Projektleitung betont, dass ein Vergleich nur sinnvoll ist, wenn die unterschiedlichen Ausgangsbedingungen der Quartiere berücksichtigt werden. Der Bericht soll öffentlich zugänglich sein und eine Empfehlung für das weitere Vorgehen enthalten." }],
  qs: [
    { q: "Was ist bereits beschlossen?", o: ["Die stadtweite Einführung", "Ein sechsmonatiger Versuch in zwei Quartieren", "Ein dauerhaftes Verbot"], a: 1, e: "Nur der Versuch; die stadtweite Einführung ist „ausdrücklich noch nicht beschlossen“." },
    { q: "Was wird zusätzlich zu den Nutzungszahlen ausgewertet?", o: ["Nur die Kosten", "Kosten, Rückmeldungen der Anwohnenden und Folgen für den Verkehr", "Nur die Zufriedenheit der Verwaltung"], a: 1, e: "Es werden mehrere Faktoren betrachtet, nicht nur die Nutzung." },
    { q: "Unter welcher Bedingung ist der Vergleich der Quartiere sinnvoll?", o: ["Wenn die Quartiere gleich groß sind.", "Wenn die unterschiedlichen Ausgangsbedingungen berücksichtigt werden.", "Wenn der Versuch länger als ein Jahr dauert."], a: 1, e: "Aussage der Projektleitung." },
    { q: "Was soll der Bericht enthalten?", o: ["Nur Zahlen, ohne Empfehlung", "Eine öffentlich zugängliche Auswertung mit Empfehlung", "Eine vertrauliche Bewertung"], a: 1, e: "„öffentlich zugänglich … eine Empfehlung für das weitere Vorgehen“." }
  ] },
{ id: "h-c1-2", lvl: "c1", title: "Wie wir Wissen behalten", kind: "Vortrag", plays: 2,
  tip: "En C1 los matices importan: palabras como „zwar … allerdings“ o „je nach“ anuncian excepciones. Anota tesis + restricción.",
  script: [{ s: "", t: "Lange Zeit galt das Auswendiglernen kurz vor der Prüfung als bewährte Strategie. Die Gedächtnisforschung zeichnet inzwischen ein differenzierteres Bild. Entscheidend ist nämlich weniger, wie lange man lernt, als wie die Lernzeit verteilt wird. Wer denselben Stoff in mehreren kurzen Einheiten über Wochen wiederholt, behält ihn deutlich länger als jemand, der ihn in einer einzigen Nachtschicht paukt – ein Phänomen, das als Verteilungseffekt bekannt ist. Noch wirksamer ist es, sich selbst abzufragen, statt Texte lediglich erneut zu lesen. Zwar fühlt sich das wiederholte Lesen vertrauter an, doch genau diese Vertrautheit täuscht: Man erkennt den Stoff wieder, ohne ihn aktiv abrufen zu können. Allerdings räumen die Forschenden ein, dass die Effekte je nach Fach und Vorwissen schwanken. Für komplexe Zusammenhänge etwa genüge reines Abfragen nicht; hier müssten Lernende Verbindungen zu bereits Bekanntem herstellen. Als praktische Konsequenz empfehlen sie, Lernpläne frühzeitig zu beginnen und feste, kurze Wiederholungsphasen einzuplanen." }],
  qs: [
    { q: "Was ist laut Vortrag für den Lernerfolg entscheidend?", o: ["Die Gesamtdauer des Lernens", "Die Verteilung der Lernzeit", "Das Lernen unmittelbar vor der Prüfung"], a: 1, e: "„weniger, wie lange man lernt, als wie die Lernzeit verteilt wird“." },
    { q: "Warum ist wiederholtes Lesen trügerisch?", o: ["Es dauert zu lange.", "Vertrautheit täuscht darüber hinweg, dass man den Stoff nicht aktiv abrufen kann.", "Es senkt die Konzentration."], a: 1, e: "„Man erkennt den Stoff wieder, ohne ihn aktiv abrufen zu können.“" },
    { q: "Welche Einschränkung machen die Forschenden?", o: ["Die Effekte schwanken je nach Fach und Vorwissen; bei komplexen Zusammenhängen reicht Abfragen nicht.", "Der Effekt gilt nur für Kinder.", "Der Effekt ist nie belegt worden."], a: 0, e: "„je nach Fach und Vorwissen schwanken“; Verbindungen zu Bekanntem nötig." },
    { q: "Was empfehlen sie praktisch?", o: ["Kurz vor der Prüfung intensiv lernen", "Früh beginnen und feste, kurze Wiederholungsphasen einplanen", "Nur Texte erneut lesen"], a: 1, e: "Letzter Satz des Vortrags." }
  ] },
{ id: "h-c1-3", lvl: "c1", title: "Viertagewoche: Modell der Zukunft?", kind: "Radiodiskussion", plays: 2,
  tip: "Con 3 voces: identifica quién defiende qué (Moderatorin / Arbeitgeber / Gewerkschaft) y qué objeciones plantea cada uno.",
  script: [
    { s: "M", t: "Herr Vogt, die Viertagewoche gilt als Modell der Zukunft. Sie sehen das skeptisch?" },
    { s: "V", t: "Ich sehe sie nicht grundsätzlich kritisch, aber ich halte ein Pauschalmodell für unrealistisch. In einer Klinik oder in einem Handwerksbetrieb lässt sich der Arbeitstag nicht beliebig verdichten." },
    { s: "O", t: "Das bestreitet ja auch niemand. Die Pilotprojekte in Großbritannien zeigen aber, dass bei vielen Büroberufen die Produktivität nicht gesunken, die Fehlzeiten dagegen deutlich zurückgegangen sind." },
    { s: "V", t: "Wobei man bedenken muss, dass es sich um freiwillig teilnehmende Unternehmen handelte, also um solche, die ohnehin aufgeschlossen waren." },
    { s: "O", t: "Mag sein. Aber gerade deshalb brauchen wir mehr Experimente, nicht weniger. Wer von vornherein abwinkt, erfährt nie, wo es funktioniert." },
    { s: "M", t: "Wo sehen Sie die Kompromisslinie?" },
    { s: "V", t: "In flexiblen Arbeitszeitkonten, die Beschäftigten mehr Spielraum geben, ohne dass der Betrieb stillsteht." },
    { s: "O", t: "Flexibilität ist gut, darf aber nicht bedeuten, dass am Ende dieselbe Arbeit in weniger Tagen mit mehr Druck erledigt wird." }
  ],
  qs: [
    { q: "Wie begründet Herr Vogt seine Skepsis?", o: ["Ein Pauschalmodell passt nicht zu allen Branchen, etwa Klinik oder Handwerk.", "Er lehnt kürzere Arbeitszeiten grundsätzlich ab.", "Er hält Pilotprojekte für zu teuer."], a: 0, e: "„ein Pauschalmodell für unrealistisch“; Beispiele Klinik und Handwerk." },
    { q: "Was zeigen die Pilotprojekte laut Frau Ostermann?", o: ["Die Produktivität ist gesunken.", "Produktivität blieb stabil, Fehlzeiten gingen zurück.", "Die Fehlzeiten sind gestiegen."], a: 1, e: "„Produktivität nicht gesunken, die Fehlzeiten … deutlich zurückgegangen“." },
    { q: "Welchen Einwand erhebt Herr Vogt gegen diese Ergebnisse?", o: ["Die Teilnehmer waren freiwillig und ohnehin aufgeschlossen.", "Die Daten sind veraltet.", "Die Projekte waren zu kurz."], a: 0, e: "„freiwillig teilnehmende Unternehmen … ohnehin aufgeschlossen“." },
    { q: "Welchen Vorbehalt hat Frau Ostermann gegenüber flexiblen Arbeitszeitkonten?", o: ["Sie sind zu kompliziert.", "Sie dürfen nicht dazu führen, dass dieselbe Arbeit in weniger Tagen mit mehr Druck erledigt wird.", "Sie kosten den Betrieb zu viel."], a: 1, e: "Letzte Aussage der Diskussion." }
  ] }
],

/* ── Schriftlicher Ausdruck: tareas de entrenamiento ── */
WRITE: [
{ id: "w-b1-1", lvl: "b1", title: "Absage zur Geburtstagsfeier", kind: "Persönlicher Brief", formal: false, minutes: 25, min: 80, max: 130,
  es: "Rechazas una invitación a un cumpleaños: motivo, alternativa y disculpa.",
  prompt: "Ihr Freund Jonas hat Sie zu seiner Geburtstagsfeier am Samstag eingeladen. Sie können leider nicht kommen. Schreiben Sie ihm eine E-Mail (ca. 100 Wörter).",
  points: ["Sagen Sie ab und bedanken Sie sich für die Einladung.", "Nennen Sie den Grund.", "Schlagen Sie einen anderen Termin für ein Treffen vor.", "Entschuldigen Sie sich und gratulieren Sie."],
  tip: "Brief informal: „du“, Anrede + Schlussformel, cuatro puntos con una frase cada uno como mínimo." },
{ id: "w-b1-2", lvl: "b1", title: "Beschwerde: beschädigtes Fahrrad", kind: "Beschwerde (formell)", formal: true, minutes: 25, min: 90, max: 140,
  es: "Reclamas un producto dañado: qué compraste, qué pasa, qué exiges y en qué plazo.",
  prompt: "Sie haben online ein Fahrrad gekauft. Es ist beschädigt angekommen. Schreiben Sie eine E-Mail an den Online-Shop (ca. 100 Wörter).",
  points: ["Beschreiben Sie, was Sie wann bestellt haben.", "Erklären Sie das Problem.", "Sagen Sie, was Sie möchten (Ersatz oder Geld zurück).", "Nennen Sie eine Frist."],
  tip: "Registro formal: „Sehr geehrte Damen und Herren“, „Sie“, „Mit freundlichen Grüßen“. Incluye número de pedido o fecha." },
{ id: "w-b1-3", lvl: "b1", title: "Anfrage: Deutschkurs", kind: "Formelle E-Mail", formal: true, minutes: 25, min: 80, max: 130,
  es: "Pides información sobre un curso de alemán (horarios, precio, inscripción, nivel).",
  prompt: "Sie möchten einen Deutschkurs an einer Sprachschule besuchen. Schreiben Sie der Schule eine E-Mail und fragen Sie nach Informationen (ca. 100 Wörter).",
  points: ["Sagen Sie, wer Sie sind und welches Niveau Sie haben.", "Fragen Sie nach Kurszeiten und Kursdauer.", "Fragen Sie nach dem Preis.", "Fragen Sie, wie die Anmeldung funktioniert."],
  tip: "Usa preguntas indirectas educadas: „Könnten Sie mir mitteilen, …?“, „Ich würde gern wissen, ob …“." },
{ id: "w-b2-1", lvl: "b2", title: "Beschwerde an die Hoteldirektion", kind: "Beschwerde (formell)", formal: true, minutes: 30, min: 150, max: 210,
  es: "Carta de reclamación a un hotel con descripción de problemas y exigencia concreta.",
  prompt: "Sie haben eine Woche im Hotel „Alpenblick“ verbracht. Das Zimmer entsprach nicht der Beschreibung im Prospekt, die Bauarbeiten nebenan waren sehr laut und das Frühstück war eingeschränkt. Schreiben Sie an die Hoteldirektion (ca. 150 Wörter).",
  points: ["Beschreiben Sie kurz Ihren Aufenthalt.", "Nennen Sie die drei Probleme und was Sie erwartet hatten.", "Fordern Sie eine konkrete Entschädigung.", "Setzen Sie eine Frist und nennen Sie die Folgen."],
  tip: "Estructura en 4 párrafos: Bezug → Probleme → Forderung → Frist/Folgen. Evita frases emocionales; usa hechos." },
{ id: "w-b2-2", lvl: "b2", title: "Leserbrief: Handys an Schulen", kind: "Leserbrief", formal: true, minutes: 30, min: 150, max: 220,
  es: "Escribes una carta al director tomando postura sobre un tema de actualidad.",
  prompt: "In einer Zeitung lesen Sie einen Artikel über ein geplantes Handyverbot an Schulen. Schreiben Sie einen Leserbrief (ca. 150 Wörter) und nehmen Sie Stellung.",
  points: ["Beziehen Sie sich auf den Artikel.", "Nennen Sie Ihre Meinung mit mindestens zwei Argumenten.", "Gehen Sie auf ein Gegenargument ein.", "Formulieren Sie einen Vorschlag oder ein Fazit."],
  tip: "Usa: einerseits/andererseits, zwar…aber, deshalb, dagegen. Cierra con un Fazit, no con una pregunta." },
{ id: "w-b2-3", lvl: "b2", title: "E-Mail an das Team: Projekt verschoben", kind: "Berufliche E-Mail", formal: false, minutes: 30, min: 140, max: 200,
  es: "Informas a tu equipo de un retraso, explicas causas y propones solución.",
  prompt: "Ein wichtiges Projekt kann nicht wie geplant am 15. Mai abgeschlossen werden, weil ein Lieferant sich verspätet. Schreiben Sie eine E-Mail an Ihr Team (ca. 150 Wörter).",
  points: ["Informieren Sie über die Verzögerung und den Grund.", "Nennen Sie die Auswirkungen auf das Team.", "Schlagen Sie eine Lösung und einen neuen Termin vor.", "Bitten Sie um Rückmeldung bis zu einem bestimmten Datum."],
  tip: "Tono profesional pero cercano: „Liebe Kolleginnen und Kollegen“, frases claras, lista de próximos pasos." },
{ id: "w-b2-4", lvl: "b2", title: "Forumsbeitrag: Auslandsjahr", kind: "Forumsbeitrag", formal: false, minutes: 30, min: 140, max: 200,
  es: "Opinión en un foro sobre pasar un año en el extranjero tras el colegio.",
  prompt: "In einem Online-Forum wird diskutiert: „Sollten junge Menschen nach der Schule ein Jahr im Ausland verbringen?“ Schreiben Sie einen Beitrag (ca. 150 Wörter).",
  points: ["Sagen Sie klar, wie Sie dazu stehen.", "Nennen Sie zwei Vorteile oder Nachteile mit Beispiel.", "Reagieren Sie auf eine mögliche Gegenposition.", "Schließen Sie mit einer Empfehlung."],
  tip: "Foro = registro semi-informal pero con argumentos. Evita copiar la pregunta; da un ejemplo concreto propio." },
{ id: "w-c1-1", lvl: "c1", title: "Stellungnahme: Weiterbildung in der Arbeitszeit", kind: "Stellungnahme", formal: true, minutes: 40, min: 220, max: 300,
  es: "Texto argumentativo formal con tesis, dos argumentos, objeción y conclusión.",
  prompt: "Sollten Arbeitgeberinnen und Arbeitgeber regelmäßige Weiterbildung während der Arbeitszeit ermöglichen? Verfassen Sie eine Stellungnahme (ca. 250 Wörter) für das Magazin Ihrer Berufsvereinigung.",
  points: ["Formulieren Sie eine klare These.", "Entwickeln Sie zwei Argumente mit Beispielen.", "Gehen Sie auf eine Gegenposition ein und relativieren Sie diese.", "Ziehen Sie ein Fazit mit Handlungsempfehlung."],
  tip: "Planea antes: tesis → 2 argumentos → objeción → matiz → conclusión. Evita repetir conectores; varía (zudem, gleichwohl, folglich)." },
{ id: "w-c1-2", lvl: "c1", title: "Eingabe an die Stadtverwaltung", kind: "Formelle Eingabe", formal: true, minutes: 40, min: 200, max: 280,
  es: "Escrito formal a la administración sobre un problema local, con petición concreta.",
  prompt: "Seit Monaten stört nächtlicher Baulärm in Ihrer Straße. Verfassen Sie eine Eingabe an die Stadtverwaltung (ca. 220 Wörter) und fordern Sie konkrete Maßnahmen.",
  points: ["Schildern Sie die Situation sachlich mit Daten.", "Beschreiben Sie die Folgen für die Anwohnenden.", "Fordern Sie konkrete Maßnahmen und nennen Sie eine Frist.", "Bitten Sie um eine schriftliche Stellungnahme."],
  tip: "Registro gehoben pero claro: Nominalstil moderado („infolge“, „aufgrund“), Passiv, Konjunktiv II para peticiones corteses." },
{ id: "w-c1-3", lvl: "c1", title: "Kommentar: Soziale Medien", kind: "Kommentar", formal: true, minutes: 40, min: 220, max: 300,
  es: "Comentario periodístico con postura matizada y cierre contundente.",
  prompt: "Verfassen Sie einen Kommentar (ca. 250 Wörter) zur Frage: „Verändern soziale Medien die Art, wie wir politische Meinungen bilden?“",
  points: ["Führen Sie mit einer pointierten These ein.", "Stützen Sie sie mit mindestens zwei differenzierten Argumenten.", "Berücksichtigen Sie eine Einschränkung oder Gegenposition.", "Schließen Sie mit einer klaren Schlussfolgerung."],
  tip: "Un Kommentar puede tener voz propia, pero evita generalizaciones: usa „tendenziell“, „zum Teil“, „nicht zuletzt“." },
{ id: "w-c1-4", lvl: "c1", title: "Bericht: Pilotprojekt autofreie Innenstadt", kind: "Bericht", formal: true, minutes: 40, min: 200, max: 280,
  es: "Resumen objetivo de un proyecto piloto con evaluación y recomendación.",
  prompt: "Ihre Stadt hat ein Pilotprojekt „autofreie Innenstadt“ durchgeführt. Fassen Sie die Ergebnisse (siehe Stichpunkte) in einem Bericht zusammen (ca. 220 Wörter): +20 % Besucher, −35 % Lärm, Beschwerden von Lieferanten, Kosten 180 000 €.",
  points: ["Fassen Sie Ziel und Ablauf des Projekts kurz zusammen.", "Stellen Sie positive Ergebnisse dar.", "Nennen Sie Probleme und Kosten.", "Geben Sie eine begründete Empfehlung."],
  tip: "Bericht = neutral, sin primera persona; usa Präteritum/Passiv („wurde durchgeführt“) y conectores de contraste („hingegen“, „allerdings“)." }
],

/* ── Mündliche Prüfung: tareas por parte ── */
SPEAK: [
/* B1 */
{ id: "s-b1-1a", lvl: "b1", part: 1, kind: "Kontaktaufnahme", title: "Sich vorstellen", secs: 90,
  prompt: "Stellen Sie sich Ihrem Gesprächspartner vor: Name, Herkunft, Wohnort, Beruf oder Ausbildung, Familie, Hobbys, warum Sie Deutsch lernen.",
  points: ["Name und Herkunft", "Wohnort und Beruf/Ausbildung", "Familie und Hobbys", "Warum Sie Deutsch lernen / Pläne"],
  tip: "No recites: da un dato + una frase de apoyo por punto. Termina devolviendo la pregunta a tu compañero/a." },
{ id: "s-b1-2a", lvl: "b1", part: 2, kind: "Gespräch über ein Thema", title: "Thema: Mein Wohnort", secs: 150,
  prompt: "Berichten Sie über Ihren Wohnort. Erzählen Sie: Wo wohnen Sie? Was gefällt Ihnen? Was gefällt Ihnen nicht? Wie möchten Sie in Zukunft wohnen?",
  points: ["Wo und wie Sie wohnen", "Was Ihnen gefällt", "Was Ihnen nicht gefällt", "Wunsch für die Zukunft"],
  tip: "Estructura: Einleitung (Thema nennen) → 2 Aspekte con ejemplo → Schluss. Usa weil/deshalb/obwohl." },
{ id: "s-b1-2b", lvl: "b1", part: 2, kind: "Gespräch über ein Thema", title: "Thema: Freizeit und Sport", secs: 150,
  prompt: "Berichten Sie über Ihre Freizeit. Was machen Sie gern? Mit wem? Wie oft? Was möchten Sie einmal ausprobieren?",
  points: ["Hobby und Häufigkeit", "Mit wem", "Warum es Ihnen gefällt", "Was Sie ausprobieren möchten"],
  tip: "Incluye una anécdota breve en Perfekt („Letztes Wochenende habe ich …“)." },
{ id: "s-b1-2c", lvl: "b1", part: 2, kind: "Gespräch über ein Thema", title: "Thema: Handy und Internet", secs: 150,
  prompt: "Berichten Sie über Ihre Erfahrungen mit Handy und Internet. Wofür nutzen Sie sie? Welche Vorteile und Nachteile sehen Sie? Was raten Sie anderen?",
  points: ["Wofür Sie Handy/Internet nutzen", "Vorteile", "Nachteile", "Ihr Rat"],
  tip: "Da tu opinión y justifícala: „Ich finde …, weil …“." },
{ id: "s-b1-3a", lvl: "b1", part: 3, kind: "Gemeinsam etwas planen", title: "Geburtstagsfeier für eine Kollegin", secs: 240,
  prompt: "Sie und Ihr Partner planen eine Überraschungsparty für eine Kollegin. Besprechen Sie: Wann und wo? Wer wird eingeladen? Essen und Getränke? Geschenk? Einigen Sie sich.",
  points: ["Termin und Ort", "Gäste", "Essen und Getränke", "Geschenk"],
  partner: ["Das ist eine tolle Idee! Wann hat sie denn Geburtstag?", "Ich finde, wir sollten sie im Büro feiern. Was meinst du?", "Gut, dann laden wir alle Kollegen ein. Wer kümmert sich um das Essen?", "Ich könnte einen Kuchen backen. Was schenken wir ihr?", "Das ist eine schöne Idee. Dann machen wir es so!"],
  tip: "Reacciona a lo que dice tu compañero/a antes de proponer; usa „Wie wäre es, wenn …?“. Cierra con un resumen." },
{ id: "s-b1-3b", lvl: "b1", part: 3, kind: "Gemeinsam etwas planen", title: "Ausflug am Wochenende", secs: 240,
  prompt: "Sie wollen am Wochenende mit Freunden einen Ausflug machen. Planen Sie gemeinsam: Wohin? Wie kommen Sie dorthin? Was nehmen Sie mit? Wie lange bleiben Sie?",
  points: ["Ziel", "Verkehrsmittel", "Mitnehmen", "Dauer und Zeitplan"],
  partner: ["Hast du schon eine Idee, wohin wir fahren könnten?", "Der See ist schön, aber ist er nicht zu weit weg?", "Wir können mit dem Zug fahren. Wann treffen wir uns?", "Was sollen wir zum Essen mitnehmen?", "Gut, dann haben wir alles besprochen."],
  tip: "No aceptes todo: una objeción amable muestra más lengua („Das ist gut, aber …“)." },
/* B2 */
{ id: "s-b2-1a", lvl: "b2", part: 1, kind: "Präsentation", title: "Homeoffice: Vor- und Nachteile", secs: 180,
  prompt: "Halten Sie eine kurze Präsentation zum Thema „Homeoffice“. Gehen Sie auf diese Punkte ein: Ihre eigene Erfahrung, Vorteile, Nachteile, Ihre Meinung.",
  points: ["Einleitung und Thema nennen", "Eigene Erfahrung / Beispiel", "Vorteile und Nachteile", "Fazit und Meinung"],
  tip: "Anuncia la estructura al inicio („Ich möchte zuerst …, dann …“). Mantén contacto visual y ritmo; practica el cierre." },
{ id: "s-b2-1b", lvl: "b2", part: 1, kind: "Präsentation", title: "Auslandsjahr nach der Schule", secs: 180,
  prompt: "Halten Sie eine Präsentation zum Thema „Ein Jahr im Ausland nach der Schule“. Sprechen Sie über Gründe, Chancen, Risiken und Ihre Empfehlung.",
  points: ["Einführung ins Thema", "Gründe und Chancen", "Risiken und Kosten", "Persönliche Empfehlung"],
  tip: "Una cifra o ejemplo concreto vale más que una generalidad. Da una recomendación clara al final." },
{ id: "s-b2-1c", lvl: "b2", part: 1, kind: "Präsentation", title: "Ehrenamtliches Engagement", secs: 180,
  prompt: "Halten Sie eine Präsentation zum Thema „Ehrenamt“. Gehen Sie ein auf: Gründe für Engagement, Nutzen für die Gesellschaft, Probleme, Ihre Meinung.",
  points: ["Thema einführen", "Motive für Engagement", "Nutzen und Probleme", "Meinung und Fazit"],
  tip: "Usa conectores de contraste (jedoch, dagegen, trotzdem) para que el discurso no suene a lista." },
{ id: "s-b2-2a", lvl: "b2", part: 2, kind: "Diskussion", title: "Smartphones für Kinder", secs: 240,
  prompt: "Diskutieren Sie die Aussage: „Kinder sollten erst ab 14 Jahren ein eigenes Smartphone haben.“ Nehmen Sie Stellung und reagieren Sie auf die Argumente Ihres Partners.",
  points: ["Position klar nennen", "Argument mit Beispiel", "Auf Gegenargument eingehen", "Kompromiss oder Fazit"],
  partner: ["Ich sehe das ganz anders. Viele Eltern wollen ihre Kinder erreichen können.", "Das stimmt, aber sind Kinder nicht auch früher selbstständig?", "Und was ist mit dem Gruppendruck in der Klasse?", "Dann könnte man vielleicht ein einfaches Handy ohne Internet erlauben."],
  tip: "Diskussion = interacción. Resume lo que dijo la otra persona antes de rebatir („Sie sagen, dass …, aber …“)." },
{ id: "s-b2-2b", lvl: "b2", part: 2, kind: "Diskussion", title: "Fleischkonsum reduzieren", secs: 240,
  prompt: "Diskutieren Sie die Aussage: „Der Staat sollte den Fleischkonsum durch höhere Steuern senken.“",
  points: ["Position klar nennen", "Argument mit Beispiel", "Auf Gegenargument eingehen", "Alternative oder Fazit"],
  partner: ["Höhere Steuern treffen vor allem Familien mit wenig Geld.", "Aber der Klimaschutz ist doch wichtiger als der Preis.", "Wäre Aufklärung nicht der bessere Weg?", "Vielleicht gibt es eine Mischung aus beidem."],
  tip: "Aporta un contraargumento propio y una alternativa; así demuestras flexibilidad de lengua." },
{ id: "s-b2-3a", lvl: "b2", part: 3, kind: "Gemeinsam eine Aufgabe lösen", title: "Betriebsausflug planen", secs: 300,
  prompt: "Ihre Firma plant einen Betriebsausflug für 40 Personen. Einigen Sie sich mit Ihrem Partner auf: Ziel, Programm, Budget und Organisation.",
  points: ["Ziel und Termin", "Programm", "Budget", "Organisation und Aufgabenverteilung"],
  partner: ["Ich würde eine Wanderung vorschlagen. Was hältst du davon?", "Das ist für einige Kollegen vielleicht zu anstrengend. Haben wir eine Alternative?", "Das Budget liegt bei 50 Euro pro Person. Reicht das?", "Gut, dann teilen wir die Aufgaben so auf. Wer bucht den Bus?"],
  tip: "Aushandeln: „Wären Sie damit einverstanden, wenn …?“. Al final resume los acuerdos („Dann halten wir fest: …“)." },
{ id: "s-b2-3b", lvl: "b2", part: 3, kind: "Gemeinsam eine Aufgabe lösen", title: "Neues Büro einrichten", secs: 300,
  prompt: "Ihr Team zieht in ein neues Büro. Besprechen Sie: Raumaufteilung, Ausstattung, Kosten und Zeitplan, und treffen Sie eine gemeinsame Entscheidung.",
  points: ["Raumaufteilung", "Ausstattung", "Kosten", "Zeitplan"],
  partner: ["Ich schlage vor, Großraumbüros zu vermeiden. Was meinst du?", "Einzelbüros sind aber teurer. Wie viel dürfen wir ausgeben?", "Ein Ruheraum wäre eine gute Ergänzung.", "Wann soll der Umzug stattfinden?"],
  tip: "Alterna proponer y reaccionar. No acapares: deja turnos equilibrados." },
/* C1 */
{ id: "s-c1-1a", lvl: "c1", part: 1, kind: "Präsentation", title: "Künstliche Intelligenz in der Arbeitswelt", secs: 240,
  prompt: "Halten Sie eine strukturierte Präsentation zum Thema „Künstliche Intelligenz in der Arbeitswelt“: aktuelle Entwicklung, Chancen, Risiken, Ihre Einschätzung für die kommenden Jahre.",
  points: ["Einstieg mit Kontext oder Beispiel", "Chancen", "Risiken und offene Fragen", "Differenzierte Einschätzung"],
  tip: "Nivel C1: evita la lista de pros/contras; argumenta con matices („je nach Branche“, „vorausgesetzt, dass …“)." },
{ id: "s-c1-1b", lvl: "c1", part: 1, kind: "Präsentation", title: "Mehrsprachigkeit in der Gesellschaft", secs: 240,
  prompt: "Halten Sie eine Präsentation zum Thema „Mehrsprachigkeit“: Bedeutung für Individuen und Gesellschaft, Herausforderungen, politische Konsequenzen.",
  points: ["Einführung", "Nutzen für Individuum und Gesellschaft", "Herausforderungen", "Konsequenzen und Fazit"],
  tip: "Incluye un dato o experiencia propia; une las ideas con puentes („Daraus ergibt sich …“)." },
{ id: "s-c1-2a", lvl: "c1", part: 2, kind: "Diskussion", title: "Soziale Medien und Meinungsbildung", secs: 300,
  prompt: "Diskutieren Sie die These: „Soziale Medien gefährden die demokratische Meinungsbildung.“ Begründen Sie Ihre Position differenziert.",
  points: ["Position und Begründung", "Argumente mit Beleg", "Gegenposition würdigen", "Zwischenfazit"],
  partner: ["Das halte ich für übertrieben. Soziale Medien geben auch Minderheiten eine Stimme.", "Aber Algorithmen verstärken doch Extrempositionen, oder?", "Wie könnte man dem entgegenwirken, ohne die Meinungsfreiheit einzuschränken?", "Das klingt plausibel, trotzdem bleibt die Frage der Verantwortung offen."],
  tip: "Reconoce la parte válida del otro antes de objetar („Der Einwand ist berechtigt, dennoch …“)." },
{ id: "s-c1-3a", lvl: "c1", part: 3, kind: "Vermitteln / Aufgabe lösen", title: "Konflikt im Team vermitteln", secs: 300,
  prompt: "Zwei Kollegen streiten über die Verteilung der Aufgaben im Projekt. Sie und Ihr Partner sollen vermitteln. Finden Sie gemeinsam eine tragfähige Lösung.",
  points: ["Standpunkte zusammenfassen", "Interessen herausarbeiten", "Lösungsvorschlag entwickeln", "Vereinbarung festhalten"],
  partner: ["Der eine fühlt sich überlastet, der andere übergangen. Wo würdest du ansetzen?", "Eine klare Rollenverteilung könnte helfen, aber wer legt sie fest?", "Und wie stellen wir sicher, dass sich beide ernst genommen fühlen?", "Dann halten wir fest: ein gemeinsames Gespräch und eine schriftliche Aufgabenliste."],
  tip: "Mediación = escuchar, resumir, proponer: „Wenn ich beide Seiten richtig verstehe, …“." }
]

};
