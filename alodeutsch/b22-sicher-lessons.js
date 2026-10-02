/* Sicher! B2.2: original practice arranged by the six coursebook lessons.
   The source books inform the syllabus; the explanations and questions below are new. */
const B22_SICHER_LESSONS = [
  {
    id:7, icon:'🤝', de:'Beziehungen', es:'Relaciones', en:'Relationships',
    focus:['Familienformen und Fernbeziehungen','Nomen mit Präposition','indirekte Rede','generalisierende Relativsätze','Vergleichssätze'],
    notes:[
      ['Nomen mit Präposition','die Beziehung zu + Dativ; das Vertrauen zu + Dativ; der Respekt vor + Dativ; die Wut auf + Akkusativ. La preposición y el caso se aprenden juntos.','Ich habe grosses Vertrauen zu meiner Freundin.'],
      ['Indirekte Rede','Para reproducir palabras ajenas se usa Konjunktiv I. En pasado: habe/sein en Konjunktiv I + Partizip II. Cuando la forma coincide con el indicativo, se recurre al Konjunktiv II o a würde + infinitivo.','Sie sagt, ihre Schwester habe gestern angerufen.'],
      ['Relativsätze und Vergleich','Wer, wen o wem dependen del caso dentro de la subordinada; der, den o dem dependen de la principal. Je + Komparativ ..., desto/umso + Komparativ ... expresa una relación gradual.','Je länger wir sprechen, desto besser verstehen wir uns.']
    ],
    words:[['die Patchwork-Familie','la familia ensamblada'],['die Fernbeziehung','la relación a distancia'],['die Konstellation','la configuración'],['die Stieftochter','la hijastra'],['das Verhältnis','la relación o proporción'],['die Wut','la ira'],['die Sehnsucht','la añoranza'],['die Chancengleichheit','la igualdad de oportunidades'],['sich entfremden','distanciarse emocionalmente'],['sich einigen auf','ponerse de acuerdo en'],['bikulturell','bicultural'],['schwungvoll','lleno de ímpetu']],
    writing:'Schreiben Sie einen Leserbrief über Vor- und Nachteile von Fernbeziehungen. Nennen Sie ein Argument, ein Gegenargument und Ihre eigene Position.',
    speaking:'Diskutieren Sie: Können verschiedene Lebensformen gleich gut funktionieren? Begründen Sie Ihre Meinung.',
    q:[
      ['Sie hat grosses Vertrauen ___ ihre Partnerin.',['zu','auf','über'],0,'das Vertrauen zu + Dativ'],
      ['Er empfindet Wut ___ seinen ehemaligen Mitbewohner.',['auf','vor','mit'],0,'die Wut auf + Akkusativ'],
      ['Wir haben Respekt ___ den Entscheidungen anderer.',['vor','über','an'],0,'der Respekt vor + Dativ'],
      ['Sie sagt: «Meine Schwester wohnt in Basel.» → Sie sagt, ihre Schwester ___ in Basel.',['wohne','wohnt','wohnen'],0,'Konjunktiv I, 3. Person Singular: sie wohne.'],
      ['«Ich bin zufrieden.» → Sie sagt, sie ___ zufrieden.',['sei','ist','wäre'],0,'Konjunktiv I von sein: sie sei.'],
      ['___ sich Zeit füreinander nimmt, kann Konflikte besser lösen.',['Wer','Was','Wo'],0,'Wer ... generalisiert über Personen.'],
      ['___ die beiden sich häufiger treffen, ___ vertrauter werden sie.',['Je / desto','Als / desto','Je / obwohl'],0,'Je + Komparativ, desto + Komparativ.'],
      ['Welche Verbindung ist richtig?',['die Beziehung zu jemandem','die Beziehung für jemandem','die Beziehung an jemandem'],0,'die Beziehung zu + Dativ'],
      ['Eine Fernbeziehung bedeutet, dass Partner ...',['an verschiedenen Orten leben','immer im gleichen Haus leben','keine Beziehung haben'],0,'Fern- verweist auf räumliche Entfernung.'],
      ['Wir haben eine Verabredung ___ unseren Freunden.',['mit','auf','für'],0,'die Verabredung mit + Dativ'],
      ['Er sagt: «Ich habe gestern telefoniert.» → Er sagt, er ___ gestern telefoniert.',['habe','hat','hätte'],0,'Konjunktiv I Vergangenheit: er habe + Partizip II.'],
      ['___ man vertraut, ___ erzählt man auch schwierige Dinge.',['Wem / dem','Wer / den','Wen / der'],0,'vertrauen verlangt Dativ: wem; im Hauptsatz ebenfalls dem.'],
      ['Welche Einleitung beschreibt eine Statistik sachlich?',['Die Grafik gibt Auskunft über die Entwicklung.','Die Grafik ist bestimmt falsch.','Mir gefällt das Bild nicht.'],0,'Zuerst Gegenstand und Entwicklung benennen, dann interpretieren.'],
      ["In einer neuen Familie müssen sich Kinder und Stiefeltern erst aneinander ___.", ["gewöhnen", "abnehmen", "bestellen"], 0, "sich an jemanden gewöhnen + Akkusativ."],
      ["Nach der Scheidung zieht der kleine Sohn zur Mutter und zu deren neuem Ehemann. Dieser ist sein ___.", ["Stiefvater", "Schwiegervater", "Schwiegersohn"], 0, "Der neue Partner der Mutter kann der Stiefvater sein."],
      ["Das Paar möchte die Ausgaben gerecht ___.", ["aufteilen", "ausstellen", "absagen"], 0, "aufteilen bedeutet unter mehreren Personen verteilen."],
      ["Sie müssen sich erst ___ die neue Rolle einstellen.", ["auf", "für", "mit"], 0, "sich auf etwas einstellen + Akkusativ."]
    ]
  },
  {
    id:8, icon:'🥗', de:'Ernährung', es:'Alimentación', en:'Nutrition',
    focus:['Ernährungsformen und Lebensmittel','subjektives sollen','Nominalisierung von Verben','konditionale und konzessive Zusammenhänge','Beschwerdebrief'],
    notes:[
      ['Subjektives sollen','sollen puede transmitir información no comprobada de otra fuente. Para pasado: soll + Partizip II + haben/sein. Mantén la distancia entre rumor y hecho.','Das neue Restaurant soll regionale Produkte verwenden.'],
      ['Nominalisierung','Un verbo convertido en sustantivo se escribe con mayúscula y suele ir con artículo: kochen → das Kochen, einkaufen → beim Einkaufen.','Beim Kochen achte ich auf frische Zutaten.'],
      ['Bedingung und Gegensatz','falls / sofern + verbo al final indican condición; obwohl + verbo al final expresa concesión. trotz + Genitiv introduce un grupo nominal.','Falls die Ware beschädigt ist, bitte ich um Ersatz.']
    ],
    words:[['die Zutat','el ingrediente'],['die Verpackung','el envase'],['die Mindesthaltbarkeit','la conservación mínima'],['die Verschwendung','el desperdicio'],['der Nährstoffmangel','la carencia de nutrientes'],['die Massentierhaltung','la ganadería intensiva'],['der Verzicht','la renuncia'],['das Fertiggericht','el plato preparado'],['die Täuschung','el engaño'],['die Entschädigung','la compensación'],['verderblich','perecedero'],['geniessbar','comestible']],
    writing:'Sie haben verdorbene Lebensmittel erhalten. Schreiben Sie dem Händler eine sachliche Beschwerde mit Bestelldatum, Problem und gewünschter Lösung.',
    speaking:'Stellen Sie ein Projekt vor, mit dem Ihre Gemeinde Lebensmittelverschwendung verringern könnte.',
    q:[
      ['«Der Markt soll bald schliessen.» Was drückt soll hier aus?',['Eine fremde, nicht bestätigte Information','Einen eigenen Befehl','Eine sichere Beobachtung'],0,'Subjektives sollen markiert eine fremde Behauptung.'],
      ['___ Einkaufen prüfe ich die Zutatenliste.',['Beim','Beim dem','Zum dem'],0,'bei dem → beim; nominalisiertes Einkaufen.'],
      ['Welche Schreibweise ist richtig?',['das Kochen','das kochen','der Kochen'],0,'Nominalisierte Verben werden grossgeschrieben.'],
      ['___ die Lieferung zu spät ankommt, melden wir uns bei Ihnen.',['Falls','Trotz','Deshalb'],0,'Falls leitet einen konditionalen Nebensatz ein.'],
      ['___ der hohen Preise kaufen viele Leute regionale Produkte.',['Trotz','Obwohl','Falls'],0,'trotz + Genitiv: trotz der hohen Preise.'],
      ['___ die Preise hoch sind, kaufen sie regionale Produkte.',['Obwohl','Trotz','Falls'],0,'obwohl + Nebensatz; Verb am Ende.'],
      ['Ein Produkt ist beschädigt. Welche Bitte passt in eine Beschwerde?',['Ich bitte um Ersatz oder Erstattung.','Sie müssen endlich kochen!','Alles ist fantastisch.'],0,'Eine Beschwerde nennt eine konkrete Lösung.'],
      ['Was bedeutet Lebensmittelverschwendung?',['Essbare Lebensmittel werden weggeworfen.','Lebensmittel werden hergestellt.','Man kauft regional ein.'],0,'Verschwendung = unnötiger Verbrauch oder Verlust.'],
      ['Welches Wort bezeichnet die Bestandteile eines Gerichts?',['die Zutaten','die Verabredungen','die Vorlesungen'],0,'Zutaten sind die verwendeten Lebensmittel.'],
      ['Welche Formulierung wahrt Distanz zu einer Behauptung?',['Die Studie soll dies zeigen.','Die Studie zeigt dies zweifellos.','Die Studie wird gerade gelesen.'],0,'soll markiert die Wiedergabe einer Aussage.'],
      ['«Angeblich hat sie früher vegan gelebt.» → Sie ___ früher vegan gelebt haben.',['soll','muss','darf'],0,'Subjektives sollen in der Vergangenheit: soll + Partizip II + haben.'],
      ['___ das Produkt teuer ist, kaufen viele es weiterhin.',['Obwohl','Trotz','Wegen'],0,'obwohl leitet einen konzessiven Nebensatz ein.'],
      ['Welche Form ist eine Nominalisierung?',['die Ernte','ernten','erntet'],0,'die Ernte bezeichnet das Ergebnis oder den Vorgang als Nomen.'],
      ["Sie ist ___ regionalen Produkten überzeugt.", ["von", "an", "für"], 0, "überzeugt von + Dativ."],
      ["Er ist ___ die Wirkung des Produkts überrascht.", ["über", "auf", "mit"], 0, "überrascht über + Akkusativ."],
      ["___ die Verpackung beschädigt ist, bleibt der Inhalt geniessbar.", ["Obwohl", "Trotz", "Wegen"], 0, "obwohl leitet einen konzessiven Nebensatz ein."]
    ]
  },
  {
    id:9, icon:'🎓', de:'An der Uni', es:'En la universidad', en:'At university',
    focus:['Studienwahl und Finanzierung','konsekutive Zusammenhänge','Nomen-Verb-Verbindungen','Negation durch Vor- und Nachsilben','Motivationsschreiben'],
    notes:[
      ['Folge ausdrücken','sodass/so dass + Nebensatz; deshalb, folglich e infolgedessen + Hauptsatz; infolge + Genitiv-Nomen expresan una consecuencia. Vigila la posición verbal.','Die Miete war hoch, sodass ich ein Zimmer suchte.'],
      ['Nomen-Verb-Verbindungen','Eine Entscheidung treffen, einen Antrag stellen y Erfahrung sammeln se aprenden como unidades. En textos formales pueden sonar más precisas que verbos generales.','Ich möchte einen Antrag auf ein Stipendium stellen.'],
      ['Wortbildung','Los prefijos un-, in- y las terminaciones -los/-frei pueden negar o indicar ausencia; comprueba el significado real de cada palabra.','praktisch → unpraktisch; möglich → unmöglich.']
    ],
    words:[['die Vorlesung','la clase magistral'],['der Hörsaal','el aula magna'],['der Studiengang','el programa de estudios'],['der Kommilitone','el compañero de universidad'],['die Klausur','el examen escrito'],['die Hausarbeit','el trabajo académico'],['die Lehrveranstaltung','la asignatura o actividad docente'],['die Fachliteratur','la bibliografía especializada'],['die Lebenshaltungskosten','el coste de vida'],['der Verdienst','los ingresos'],['sich einschreiben','matricularse'],['Kenntnisse vertiefen','profundizar conocimientos']],
    writing:'Verfassen Sie ein kurzes Motivationsschreiben für ein Studium oder eine Ausbildung. Beschreiben Sie Interesse, Fähigkeiten und Ziel.',
    speaking:'Vergleichen Sie zwei Studienorte: Kosten, Angebot und Berufsperspektiven.',
    q:[
      ['Die Wohnung war teuer, ___ ich ein günstigeres Zimmer suchte.',['sodass','trotz','ob'],0,'sodass leitet einen Nebensatz mit Folge ein.'],
      ['Die Wohnung war teuer. ___ suchte ich ein Zimmer.',['Deshalb','Obwohl','Sodass'],0,'deshalb steht im Hauptsatz; das Verb folgt direkt.'],
      ['Welche Verbindung ist üblich?',['eine Entscheidung treffen','eine Entscheidung laufen','eine Entscheidung essen'],0,'Feste Verbindung: eine Entscheidung treffen.'],
      ['Für ein Stipendium muss ich einen Antrag ___.',['stellen','treffen','sammeln'],0,'einen Antrag stellen.'],
      ['Während des Praktikums konnte sie Erfahrung ___.',['sammeln','stellen','treffen'],0,'Erfahrung sammeln.'],
      ['Das Gegenteil von praktisch ist ...',['unpraktisch','praktiklos','nichtprakt'],0,'un- bildet hier das Gegenteil.'],
      ['Welche Form steht im Nebensatz?',['..., sodass er die Prüfung bestand.','..., sodass bestand er die Prüfung.','..., sodass er bestand die Prüfung.'],0,'Nach sodass steht das finite Verb am Ende.'],
      ['Eine Vorlesung ist ...',['eine Lehrveranstaltung an der Hochschule','eine Mietzahlung','ein Studienabschluss'],0,'Vorlesung bezeichnet eine akademische Lehrveranstaltung.'],
      ['Was gehört in ein Motivationsschreiben?',['Begründung der Studienwahl und passende Erfahrung','nur eine Begrüssung','nur der gewünschte Lohn'],0,'Motivation und Eignung sollen konkret werden.'],
      ['Sie hat die Zulassung erhalten. Sie darf ...',['das Studium beginnen','die Miete erhöhen','einen Arzt behandeln'],0,'Zulassung bedeutet Aufnahme oder Erlaubnis.'],
      ['Die Nachfrage war so hoch, ___ alle Plätze sofort vergeben waren.',['dass','obwohl','falls'],0,'so + Adjektiv + dass drückt eine Folge aus.'],
      ['Die Kosten stiegen. ___ suchte sie eine Nebentätigkeit.',['Folglich','Obwohl','Infolge'],0,'folglich steht im Hauptsatz; danach folgt direkt das Verb.'],
      ['___ der hohen Nachfrage wurden weitere Kurse eingerichtet.',['Infolge','Sodass','Deshalb'],0,'infolge steht mit einem Nomen im Genitiv.'],
      ["Der Studiengang war sehr beliebt. ___ gab es kaum freie Plätze.", ["Infolgedessen", "Infolge", "Sodass"], 0, "infolgedessen steht in einem Hauptsatz."],
      ["Sie liest ___ für ihre Hausarbeit.", ["Fachliteratur", "Lebenshaltungskosten", "Vorlesungen"], 0, "Fachliteratur liefert wissenschaftliche Informationen."],
      ["Die Zeit ohne Lehrveranstaltungen heisst ___.", ["vorlesungsfreie Zeit", "Klausurzeit", "Sprechstunde"], 0, "vorlesungsfreie Zeit bezeichnet die Zeit ohne reguläre Vorlesungen."],
      ["Alle Seminare und Übungen sind ___.", ["Lehrveranstaltungen", "Studiengänge", "Abschlüsse"], 0, "Lehrveranstaltungen umfasst verschiedene Lehrformate."],
      ["Auf der Berufsmesse kann man Kontakte ___.",["knüpfen","ablegen","einschlagen"],0,"Kontakte knüpfen ist eine feste Verbindung."],
      ["Im Seminar konnte sie ihre Kenntnisse ___.",["vertiefen","übernehmen","knüpfen"],0,"Kenntnisse vertiefen bedeutet Wissen erweitern."],
      ["Wer die Teamleitung übernimmt, muss Verantwortung ___.",["übernehmen","spielen","sammeln"],0,"Verantwortung übernehmen ist eine feste Verbindung."],
      ["Der Abschluss kann eine wichtige Rolle ___.",["spielen","knüpfen","treffen"],0,"eine Rolle spielen bedeutet wichtig sein."],
      ["Zu Beginn der Vorlesung möchte sie eine Frage ___.",["stellen","knüpfen","übernehmen"],0,"eine Frage stellen ist die passende Verbindung."]
    ]
  },
  {
    id:10, icon:'🛎️', de:'Service', es:'Servicios', en:'Services',
    focus:['Dienstleistungen und Verbraucher','Alternativen zum Passiv','subjektlose Passivsätze','Textzusammenfassung','Angebote beurteilen'],
    notes:[
      ['Passiv-Alternativen','sich lassen + Infinitiv, sein + zu + Infinitiv y sein + Adjektiv auf -bar/-lich pueden sustituir formas pasivas. Según el contexto expresan posibilidad o necesidad.','Das Formular lässt sich online ausfüllen.'],
      ['Subjektloses Passiv','Bei Tätigkeiten ohne wichtiges Subjekt: Es wird getanzt. Steht ein anderes Element zuerst, entfällt das Platzhalter-es: Heute wird getanzt.','In diesem Geschäft wird freundlich beraten.'],
      ['Zusammenfassen','En un resumen indica tema y mensaje central con palabras propias. Separa la afirmación del autor de tu valoración.','Der Artikel beschreibt, welche Dienstleistungen Jugendliche nutzen.']
    ],
    words:[['die Dienstleistung','el servicio'],['die Serviceleistung','la prestación de servicio'],['der Rabatt','el descuento'],['das Schnäppchen','la ganga'],['die Mogelpackung','el envase engañoso'],['der Gutschein','el vale'],['die Anmeldegebühr','la cuota de inscripción'],['die Selbstbedienung','el autoservicio'],['der Hinweis','la indicación'],['inbegriffen sein','estar incluido'],['beantragen','solicitar formalmente'],['sich ausweisen','identificarse']],
    writing:'Fassen Sie einen kurzen Artikel über eine Dienstleistung in eigenen Worten zusammen: Thema, zwei Kernaussagen und Schluss.',
    speaking:'Bieten Sie einer Kundin einen Service an. Erklären Sie Preis, Ablauf und Bedingungen verständlich.',
    q:[
      ['Der Vertrag kann online gekündigt werden. → Der Vertrag ___ online kündigen.',['lässt sich','lässt','ist sich'],0,'sich lassen + Infinitiv drückt hier Möglichkeit aus.'],
      ['Die Rechnung muss bezahlt werden. → Die Rechnung ist ___.',['zu bezahlen','bezahlen zu','sich bezahlen'],0,'sein + zu + Infinitiv kann Notwendigkeit ausdrücken.'],
      ['Welche Form ist ein subjektloses Passiv?',['Hier wird gearbeitet.','Hier arbeitet die Firma.','Hier ist die Arbeit.'],0,'Das unpersönliche Passiv nennt keinen Handelnden.'],
      ['___ wird heute viel diskutiert.',['Es','Man','Das'],0,'Es kann am Satzanfang als Platzhalter stehen.'],
      ['Heute wird viel diskutiert. Warum fehlt «es»?',['Ein anderes Satzglied steht am Anfang.','Passiv braucht nie es.','Heute ist das Subjekt.'],0,'Bei Voranstellung von heute entfällt das Platzhalter-es.'],
      ['Was sollte eine Zusammenfassung vermeiden?',['lange wörtliche Übernahmen','die Kernaussage','eine sachliche Darstellung'],0,'Formulieren Sie den Inhalt mit eigenen Worten.'],
      ['Eine Garantie betrifft ...',['zugesicherte Rechte für ein Produkt','eine Vorlesung','eine Reiseapotheke'],0,'Garantie ist eine freiwillige Zusicherung mit bestimmten Bedingungen.'],
      ['Ein Rabatt ist ...',['ein Preisnachlass','eine Rechnung','ein Vertrag'],0,'Rabatt vermindert den Preis.'],
      ['Welche Frage klärt eine Dienstleistung transparent?',['Was ist im Preis enthalten?','Wie heisst dein Haustier?','Welche Uni ist älter?'],0,'Preis und Leistungsumfang gehören zu den Bedingungen.'],
      ['Das Gerät ist einfach zu bedienen. Das bedeutet hier:',['Man kann das Gerät einfach bedienen.','Man hat es schon bedient.','Es darf nie bedient werden.'],0,'sein + zu + Infinitiv beschreibt hier eine Möglichkeit.'],
      ['Die Anleitung kann gut gelesen werden. → Sie ist gut ___.',['lesbar','leslich','lesen'],0,'-bar bildet eine Möglichkeit: lesbar.'],
      ['Bei der Veranstaltung wird viel ___.',['gelacht','lachen','gelachen'],0,'Subjektloses Passiv: wird + Partizip II.'],
      ['Die Gebühr ist bereits im Preis ___.',['inbegriffen','begriffen','inbegriffen zu'],0,'inbegriffen sein = im Preis enthalten sein.'],
      ["Die Rechnung lässt sich online ___.", ["bezahlen", "zu bezahlen", "bezahlt"], 0, "sich lassen + Infinitiv ohne zu."],
      ["Die Rechnung ist online ___.", ["zu bezahlen", "bezahlen", "bezahlt zu"], 0, "sein + zu + Infinitiv."],
      ["Die Ware ist sofort ___.", ["lieferbar", "liefern", "geliefert zu"], 0, "-bar beschreibt die Möglichkeit der Lieferung."],
      ["Diese Leistung ist im Paket enthalten. Sie ist ___.", ["inbegriffen", "ausgeschlossen", "verpflichtet"], 0, "inbegriffen bedeutet im Preis enthalten."]
    ]
  },
  {
    id:11, icon:'🩺', de:'Gesundheit', es:'Salud', en:'Health',
    focus:['Arztgespräche und Reiseapotheke','Indefinitpronomen','modale Zusammenhänge','dadurch, dass / indem / durch','ohne ... zu / ohne ... dass'],
    notes:[
      ['Indefinitpronomen','man generaliza sobre personas; jemand, niemand, einer e irgendeiner requieren atención al caso y al contexto. A menudo puede sustituirse man por un pasivo.','Im Wartezimmer sollte man Rücksicht nehmen.'],
      ['Art und Mittel','indem/dadurch, dass + Nebensatz explican cómo ocurre algo; durch + Akkusativ va con un sustantivo.','Sie schützt sich, indem sie die Hände wäscht.'],
      ['Ohne / anstatt','ohne ... zu exige el mismo sujeto en ambas acciones; si cambian los sujetos, usa ohne dass. anstatt ... zu expresa una alternativa no realizada.','Er ging hinaus, ohne sich zu verabschieden.']
    ],
    words:[['die Beschwerde','la molestia o síntoma'],['der Ausschlag','la erupción cutánea'],['die Übelkeit','las náuseas'],['die Entzündung','la inflamación'],['die Wunde','la herida'],['der Stich','la picadura'],['die Nebenwirkung','el efecto secundario'],['die Behandlung','el tratamiento'],['die Vorbeugung','la prevención'],['die Anerkennung','el reconocimiento'],['die Hospitation','la observación profesional'],['stechend','punzante']],
    writing:'Schreiben Sie einen sachlichen Forumsbeitrag über Gesundheitsinformationen im Internet. Erklären Sie Nutzen, Grenzen und Ihre Meinung.',
    speaking:'Spielen Sie ein Arztgespräch: Beschreiben Sie Beschwerden, seit wann sie bestehen und welche Fragen Sie haben.',
    q:[
      ['Sie verbessert ihre Ausdauer, ___ sie regelmässig trainiert.',['indem','durch','ohne'],0,'indem leitet einen modalen Nebensatz ein.'],
      ['Sie verbessert ihre Ausdauer ___ regelmässiges Training.',['durch','indem','dadurch, dass'],0,'durch + Akkusativ-Nomen.'],
      ['Er ging weg, ohne sich ___.',['zu verabschieden','verabschiedet','dass verabschieden'],0,'Gleiches Subjekt: ohne ... zu + Infinitiv.'],
      ['Sie ging, ohne dass ihr Arzt es ___.',['bemerkte','bemerken','zu bemerken'],0,'Unterschiedliche Subjekte: ohne dass + Nebensatz.'],
      ['___ einer Behandlung sollte man Fragen stellen können.',['Während','Indem','Dadurch, dass'],0,'während + Genitiv/Dativ-Nomen als Zeitangabe.'],
      ['Ich habe ___ im Wartezimmer getroffen. (eine unbekannte Person)',['jemanden','jemandem','niemanden'],0,'treffen + Akkusativ: jemanden.'],
      ['Welche Aussage beschreibt eine mögliche Nebenwirkung?',['Eine unerwünschte Wirkung eines Mittels','Der Preis eines Mittels','Eine Arztadresse'],0,'Nebenwirkung ist eine zusätzliche, meist unerwünschte Wirkung.'],
      ['Man sollte die Packungsbeilage ...',['vor der Einnahme lesen','wegwerfen, ohne zu schauen','durch einen Kassenbon ersetzen'],0,'Darin stehen wichtige Anwendungshinweise.'],
      ['Er nimmt den Bus, ___ ein Taxi zu bestellen.',['anstatt','durch','indem'],0,'anstatt ... zu nennt eine nicht gewählte Alternative.'],
      ['Dadurch, ___ sie früher anruft, bekommt sie einen Termin.',['dass','indem','durch'],0,'dadurch, dass leitet einen Nebensatz ein.'],
      ['Ich habe ___ Teilnehmer eine Nachricht geschickt. (einer beliebigen Person)',['irgendeinem','irgendeiner','irgendeinen'],0,'schicken + Dativ für die Person: irgendeinem Teilnehmer.'],
      ['___ sollte Medikamente ohne genaue Information einnehmen.',['Niemand','Nichts','Keinen'],0,'niemand bezeichnet keine Person und ist hier Subjekt.'],
      ['Sie verbessert ihre Kondition durch tägliches Üben. Welche Umformung passt?',['Sie verbessert ihre Kondition, indem sie täglich übt.','Sie verbessert ihre Kondition, obwohl sie täglich übt.','Sie verbessert ihre Kondition, ohne täglich zu üben.'],0,'durch + Nomen kann mit indem + Nebensatz umformuliert werden.'],
      ["Die Ärztin besucht die Patientinnen auf der Station. Das ist die ___.", ["Visite", "Hospitation", "Aufnahme"], 0, "Eine Visite ist der Besuch der Ärztin auf der Station."],
      ["Viele rote Flecken auf der Haut können ein ___ sein.", ["Ausschlag", "Verband", "Stich"], 0, "Ausschlag bezeichnet einen Hautausschlag."],
      ["Im Wartezimmer hat sie ___ zum Reden gefunden.", ["jemanden", "jemandem", "jemand"], 0, "finden verlangt hier den Akkusativ: jemanden."],
      ["___ von den Patienten darf ohne Einwilligung untersucht werden.", ["Niemand", "Keinen", "Niemandem"], 0, "niemand steht hier im Nominativ."]
    ]
  },
  {
    id:12, icon:'🗣️', de:'Sprache und Regionen', es:'Idioma y regiones', en:'Language and regions',
    focus:['regionale Varianten des Deutschen','erweitertes Partizip','Adversativsätze','Partizipien als Nomen','Fugenelement -s-'],
    notes:[
      ['Erweitertes Partizip','Una construcción participial puede condensar una oración relativa. Todo el grupo va delante del sustantivo y el participio recibe terminación de adjetivo.','Die in der Schweiz gesprochenen Sprachen sind vielfältig.'],
      ['Gegensatz','während + Nebensatz puede contrastar dos hechos; dagegen y hingegen introducen una oposición en la oración principal.','Während einige Dialekt sprechen, bevorzugen andere Hochdeutsch.'],
      ['Partizip als Nomen / Fugenelement','die Reisenden es un participio sustantivado con mayúscula y declinación. En compuestos como Diskussionsthema o Prüfungsfrage aparece una -s- de unión; en Hörtext no.','Die Reisenden hören verschiedene Dialekte.']
    ],
    words:[['der Dialekt','el dialecto'],['die Amtssprache','la lengua oficial'],['die Mundart','la variedad dialectal'],['die Mehrsprachigkeit','el multilingüismo'],['die Verständlichkeit','la comprensibilidad'],['die Traktanden (CH)','los puntos del orden del día'],['das Velo (CH)','la bicicleta'],['die Marille (A)','el albaricoque'],['parkieren (CH)','aparcar'],['zügeln (CH)','mudarse'],['grillieren (CH)','hacer una parrillada'],['die Quelle','la fuente o manantial']],
    writing:'Verfassen Sie eine Stellungnahme: Sollen regionale Dialekte im Unterricht stärker berücksichtigt werden? Geben Sie Gründe und ein Beispiel.',
    speaking:'Präsentieren Sie eine Region und erklären Sie, welche sprachlichen Besonderheiten Sie dort erwarten.',
    q:[
      ['Die ___ Sprachen sind vielfältig. (in der Schweiz sprechen)',['in der Schweiz gesprochenen','in der Schweiz sprechenden','gesprochene in der Schweiz'],0,'Partizip II vor dem Nomen: die in der Schweiz gesprochenen Sprachen.'],
      ['Die ___ Gäste warten am Eingang. (aus Berlin anreisen)',['aus Berlin angereisten','aus Berlin anreisenden','angereiste aus Berlin'],0,'Abgeschlossene Anreise: die aus Berlin angereisten Gäste.'],
      ['___ in manchen Regionen Dialekt dominiert, ist anderswo Hochdeutsch häufiger.',['Während','Trotz','Dadurch'],0,'während + Nebensatz kann einen Gegensatz markieren.'],
      ['Die einen sprechen Dialekt. Die anderen ___ bevorzugen Standardsprache.',['hingegen','obwohl','während'],0,'hingegen verbindet gegensätzliche Hauptsatzaussagen.'],
      ['Welche Schreibweise ist richtig?',['die Reisenden','die reisenden','die ReisendeN'],0,'Substantiviertes Partizip wird grossgeschrieben.'],
      ['Welches Wort enthält ein Fugenelement -s-?',['Arbeitszeit','Buchseite','Haustür'],0,'Arbeit + s + Zeit.'],
      ['Eine Amtssprache ist ...',['eine offiziell verwendete Sprache','eine private Geheimsprache','immer ein Dialekt'],0,'Sie wird in offiziellen Zusammenhängen verwendet.'],
      ['Ein Dialekt ist ...',['eine regionale Sprachvariante','ein Schreibfehler','ein medizinischer Begriff'],0,'Dialekte sind regionale Formen einer Sprache.'],
      ['Welche Stellungnahme ist gut begründet?',['Dialekte sind wichtig, weil sie regionale Identität zeigen.','Dialekte sind wichtig. Punkt.','Alle müssen meiner Meinung sein.'],0,'Eine Stellungnahme begründet die Position.'],
      ['«Die in Bern wohnenden Studierenden» beschreibt ...',['Studierende, die in Bern wohnen','Studierende, die Bern verlassen haben','eine Universität in Bern'],0,'Partizip I drückt die andauernde Tätigkeit aus.'],
      ['Der Fluss, der in den Alpen entspringt → der in den Alpen ___ Fluss.',['entspringende','entsprungene','entsprungen'],0,'Gleichzeitige Handlung: erweitertes Partizip I.'],
      ['Welches Kompositum braucht ein Fugenelement -s-?',['Diskussionsthema','Hörstext','Muttersprache'],0,'Diskussion + s + Thema; Hörtext und Muttersprache ohne zusätzliches -s-.'],
      ['Welche Form bezeichnet anwesende Personen?',['die Anwesenden','die anwesenden','die Anwesen'],0,'Substantiviertes Partizip: die Anwesenden.'],
      ["Die ___ Kundschaft achtet auf die Verpackung. (auf die Umwelt achten)",["auf die Umwelt achtende","auf die Umwelt geachtete","achtende auf die Umwelt"],0,"Erweitertes Partizip I mit Adjektivendung."],
      ["Das ___ Produkt liegt im Regal. (biologisch anbauen)",["biologisch angebaute","biologisch anbauende","angebaute biologisch"],0,"Partizip II beschreibt das Produkt."],
      ["Eine Frau, die mit ihren Kindern spricht → eine mit ihren Kindern ___ Frau.",["sprechende","gesprochene","spricht"],0,"Aktive gleichzeitige Handlung: Partizip I."],
      ["Das von einem Künstler ___ Pflaster ist bunt.",["bemalte","bemalende","bemalt"],0,"Passivische Bedeutung: Partizip II mit Endung."],
      ["Die ___ Chemikalien gefährden den Fluss. (ins Wasser fliessen)",["ins Wasser fliessenden","ins Wasser geflossenen","fliessend ins Wasser"],0,"Partizip I im Plural nach die mit -en."],
      ["Ein ___ Schüler sitzt hier. (von der Lehrerin unterrichten)",["von der Lehrerin unterrichteter","von der Lehrerin unterrichtender","unterrichtete von der Lehrerin"],0,"Passivischer Relativsatz wird mit Partizip II verdichtet."]
    ]
  }
];

// English support mirrors every lesson's rule, vocabulary item and quiz feedback.
const B22_EN = {
  7:{
    notes:[
      'Learn the preposition and case as one unit: Beziehung zu + dative, Vertrauen zu + dative, Respekt vor + dative, Wut auf + accusative.',
      'Reported speech uses Konjunktiv I. For the past use habe/sei + past participle. If a form matches the indicative, use Konjunktiv II or würde + infinitive.',
      'Wer, wen or wem depends on the role within the relative clause; der, den or dem depends on the main clause. Je ... desto/umso expresses a gradual relation.'
    ],
    words:['a blended family','a long-distance relationship','a constellation / arrangement','a stepdaughter','a relationship / proportion','anger','longing','equal opportunity','to grow apart emotionally','to agree on','bicultural','energetic / spirited'],
    writing:'Write a letter to the editor about the advantages and disadvantages of long-distance relationships. Give an argument, a counterargument and your own position.',
    speaking:'Discuss whether different family arrangements can work equally well. Give reasons for your view.',
    explanations:['Vertrauen zu takes the dative.','Wut auf takes the accusative.','Respekt vor takes the dative.','Konjunktiv I, third-person singular: sie wohne.','Konjunktiv I of sein: sie sei.','Wer makes a general statement about people.','Je + comparative, desto + comparative.','Beziehung zu takes the dative.','Fern- refers to physical distance.','Verabredung mit takes the dative.','Past reported speech: er habe + past participle.','Vertrauen takes the dative: wem; the main clause uses dem.','Name the topic and trend before interpreting a chart.',
      "sich an jemanden gewöhnen takes the accusative.",
      "A mother’s new partner may be the child’s stepfather.",
      "aufteilen means to divide among people.",
      "sich auf etwas einstellen takes the accusative."]
  },
  8:{
    notes:[
      'Subjective sollen reports an unverified claim from another source. For the past use soll + past participle + haben/sein; keep a distinction between rumour and fact.',
      'A nominalised verb is capitalised and often takes an article: kochen → das Kochen; einkaufen → beim Einkaufen.',
      'falls and sofern introduce conditions with the verb at the end; obwohl introduces a concession. trotz + genitive introduces a noun phrase.'
    ],
    words:['an ingredient','packaging','minimum shelf life','waste','a nutrient deficiency','intensive livestock farming','renunciation / doing without','a ready meal','deception','compensation','perishable','edible'],
    writing:'You received spoiled food. Write a factual complaint to the seller stating the order date, the problem and the solution you want.',
    speaking:'Present a project that could reduce food waste in your community.',
    explanations:['Subjective sollen reports another person’s unverified claim.','bei dem contracts to beim; Einkaufen is nominalised.','Nominalised verbs are capitalised.','Falls introduces a conditional subordinate clause.','trotz takes the genitive: trotz der hohen Preise.','obwohl introduces a subordinate clause with the verb at the end.','A complaint should request a concrete solution.','Verschwendung means unnecessary consumption or loss.','Zutaten are the ingredients used in a dish.','soll signals that an assertion is being reported.','Past subjective sollen: soll + past participle + haben.','obwohl introduces a concessive subordinate clause.','die Ernte is a noun for the harvest or harvesting.',
      "überzeugt von + dative.",
      "überrascht über + accusative.",
      "obwohl introduces a concessive subordinate clause."]
  },
  9:{
    notes:[
      'sodass/so dass introduces a result clause; deshalb, folglich and infolgedessen introduce a main clause; infolge + genitive noun expresses a consequence. Check verb position.',
      'Learn fixed noun–verb combinations as units: eine Entscheidung treffen, einen Antrag stellen, Erfahrung sammeln. They are useful in formal writing.',
      'Prefixes un- and in-, and suffixes -los and -frei, can express negation or absence. Check each word’s actual meaning.'
    ],
    words:['a lecture','a lecture hall','a degree programme','a fellow student','a written university exam','an academic paper','a university class / teaching event','specialist literature','living costs','earnings','to enrol','to deepen knowledge'],
    writing:'Write a short motivation letter for a degree or training course. Describe your interest, abilities and goal.',
    speaking:'Compare two places to study by cost, course offerings and career prospects.',
    explanations:['sodass introduces a subordinate clause of result.','deshalb introduces a main clause and is followed by the finite verb.','The fixed expression is eine Entscheidung treffen.','The fixed expression is einen Antrag stellen.','The fixed expression is Erfahrung sammeln.','un- forms the opposite here.','The finite verb goes at the end after sodass.','A Vorlesung is a university lecture.','A motivation letter gives concrete reasons and relevant experience.','Zulassung means admission or permission.','so + adjective + dass expresses a result.','folglich introduces a main clause, followed by the finite verb.','infolge takes a genitive noun phrase.',
      "infolgedessen introduces a main clause.",
      "Fachliteratur provides specialist academic information.",
      "vorlesungsfreie Zeit means the period without regular lectures.",
      "Lehrveranstaltungen includes different kinds of classes.","The fixed expression is Kontakte knüpfen.","Kenntnisse vertiefen means to deepen knowledge.","The fixed expression is Verantwortung übernehmen.","eine Rolle spielen means to matter.","The fixed expression is eine Frage stellen."]
  },
  10:{
    notes:[
      'sich lassen + infinitive, sein + zu + infinitive and sein + an adjective ending in -bar/-lich can replace passive forms. Context determines possibility or necessity.',
      'An impersonal passive does not name the actor: Es wird getanzt. When another element comes first, the placeholder es disappears: Heute wird getanzt.',
      'A summary identifies the topic and central message in your own words. Keep the author’s claim separate from your own assessment.'
    ],
    words:['a service','a service provided','a discount','a bargain','deceptive packaging','a voucher','a registration fee','self-service','a notice / indication','to be included','to apply for','to show identification'],
    writing:'Summarise a short article about a service in your own words: topic, two main points and conclusion.',
    speaking:'Offer a service to a customer. Explain the price, process and conditions clearly.',
    explanations:['sich lassen + infinitive expresses possibility here.','sein + zu + infinitive can express necessity.','An impersonal passive does not name the actor.','Es can be a placeholder at the beginning of the sentence.','When heute is first, the placeholder es is omitted.','Use your own words rather than long copied passages.','A Garantie promises specific rights subject to conditions.','A Rabatt reduces the price.','Clarify the price and what the service includes.','sein + zu + infinitive expresses possibility here.','-bar expresses possibility: lesbar means readable.','Impersonal passive: wird + past participle.','inbegriffen means included in the price.',
      "sich lassen takes an infinitive without zu.",
      "sein + zu + infinitive.",
      "-bar signals that delivery is possible.",
      "inbegriffen means included in the price."]
  },
  11:{
    notes:[
      'man makes general statements about people; jemand, niemand, einer and irgendeiner change with case and context. A passive can often replace man.',
      'indem and dadurch, dass introduce clauses explaining how; durch + accusative takes a noun phrase.',
      'ohne ... zu requires the same subject in both actions. Use ohne dass if subjects differ. anstatt ... zu names an alternative that was not chosen.'
    ],
    words:['a symptom / complaint','a skin rash','nausea','an inflammation','a wound','a sting / bite','a side effect','treatment','prevention','recognition','professional observation / shadowing','stabbing / sharp (pain)'],
    writing:'Write a factual forum post about health information online. Explain its benefits, limits and your opinion.',
    speaking:'Role-play a medical appointment: describe the symptoms, when they began and your questions.',
    explanations:['indem introduces a clause describing the means.','durch takes an accusative noun phrase.','Same subject: ohne ... zu + infinitive.','Different subjects: ohne dass + subordinate clause.','während + a noun phrase expresses time here.','treffen takes the accusative: jemanden.','A Nebenwirkung is an additional, usually unwanted effect.','The leaflet contains important instructions for use.','anstatt ... zu names an alternative not chosen.','dadurch, dass introduces a subordinate clause.','The recipient of schicken takes the dative: irgendeinem Teilnehmer.','Niemand means no person and is the subject here.','durch + noun can be rephrased with indem + clause.',
      "A Visite is a doctor’s ward round.",
      "Ausschlag means a skin rash.",
      "finden takes the accusative here: jemanden.",
      "niemand is nominative here."]
  },
  12:{
    notes:[
      'An extended participle can condense a relative clause. The whole phrase stands before the noun and the participle takes an adjective ending.',
      'während + subordinate clause can contrast two facts; dagegen and hingegen introduce a contrast in a main clause.',
      'die Reisenden is a capitalised and inflected nominalised participle. Compounds such as Diskussionsthema and Prüfungsfrage include a linking -s-, while Hörtext does not.'
    ],
    words:['a dialect','an official language','a regional dialect','multilingualism','intelligibility','agenda items (Swiss usage)','a bicycle (Swiss usage)','an apricot (Austrian usage)','to park (Swiss usage)','to move house (Swiss usage)','to grill / barbecue (Swiss usage)','a source / spring'],
    writing:'Write an opinion piece: should regional dialects play a greater role in class? Give reasons and an example.',
    speaking:'Present a region and explain which linguistic features you expect there.',
    explanations:['Past participle before the noun: die in der Schweiz gesprochenen Sprachen.','The arrival is complete: die aus Berlin angereisten Gäste.','während + subordinate clause can mark contrast.','hingegen contrasts statements in main clauses.','A nominalised participle is capitalised.','Arbeitszeit contains the linking -s-.','An Amtssprache is used officially.','Dialects are regional varieties of a language.','A reason supports a well-founded opinion.','Present participle describes the ongoing action.','Simultaneous action: extended present participle.','Diskussion + s + Thema; Hörtext and Muttersprache do not add -s-.','Nominalised participle: die Anwesenden.',"Extended present participle takes an adjective ending.","Past participle describes the product.","Ongoing active action: present participle.","Passive meaning: past participle with an adjective ending.","Present participle in the plural after die takes -en.","A passive relative clause becomes a past participle phrase."]
  }
};

const B22Lessons = {
  currentId:7,
  key(id){return 'b22-sicher-'+id;},
  questions(l){
    const en=B22_EN[l.id];
    const grammar=l.q.map(([q,o,a,x],i)=>({t:'mc',q,o,a,x,xen:en.explanations[i]}));
    const vocab=l.words.slice(0,6).map(([de,es],i)=>{
      const choices=[es,l.words[(i+6)%l.words.length][1],l.words[(i+9)%l.words.length][1]];
      const english=[en.words[i],en.words[(i+6)%l.words.length],en.words[(i+9)%l.words.length]];
      return {t:'mc',q:`Was bedeutet «${de}»?`,o:choices,oEn:english,a:0,x:`${de} = ${es}.`,xen:`${de} = ${en.words[i]}.`};
    });
    return grammar.concat(vocab,B2LessonPractice.newQuiz('b22',l));
  },
  lesson(id){return B22_SICHER_LESSONS.find(l=>l.id===Number(id));},
  stats(){let attempted=0,correct=0,total=0; for(const l of B22_SICHER_LESSONS){const s=Store.data.grammar[this.key(l.id)]||{c:0,t:0}; if(s.t)attempted++;correct+=s.c;total+=s.t;}return {attempted,correct,total};},
  banner(){const s=this.stats();return `<div class="center-cta" style="margin:12px 16px 18px;padding:24px 18px;background:linear-gradient(135deg,var(--sky),var(--lav));border:1.5px solid var(--border);border-radius:var(--r-xl)"><div style="font-size:42px">📚</div><h2 style="font-family:'Baloo 2';font-size:21px;color:var(--ink)">Sicher! · B2.2</h2><p style="font-size:13px;color:var(--ink-soft)">${Lang.current==='en'?'Lessons 7–12: grammar, vocabulary and original practice based on the coursebook and workbook.':'Lecciones 7–12: gramática, vocabulario y práctica original basada en Kursbuch y Arbeitsbuch.'}</p><p style="font-size:12px;color:var(--ink-faint)">${s.attempted}/6 ${Lang.current==='en'?'lessons practised':'lecciones practicadas'} · ${s.correct}/${s.total} ✓</p><button class="pill-btn" onclick="B22Lessons.open()">${Lang.current==='en'?'Open lessons →':'Abrir lecciones →'}</button></div>`;},
  open(){Current.levelId='b2';App.go('b22-lessons');this.renderHome();},
  renderHome(){const s=this.stats();document.getElementById('banner-sub').textContent='📚 B2.2 · Lektionen 7–12';document.getElementById('b22-lessons-body').innerHTML=`<div class="intro-box" style="margin:16px"><b>Sicher! B2.2</b><p>${Lang.current==='en'?'Choose a lesson to study and practise. Audio tasks need the book’s recordings; these exercises do not pretend to include them.':'Elige una lección para estudiar y practicar. Las tareas de audio requieren las grabaciones del libro; estos ejercicios no simulan tenerlas.'}</p><small>${s.attempted}/6 · ${s.correct}/${s.total} ✓</small></div><div class="mod-grid" style="margin:16px">${B22_SICHER_LESSONS.map(l=>{const x=Store.data.grammar[this.key(l.id)]||{c:0,t:0};return `<div class="mod-card" onclick="B22Lessons.openLesson(${l.id})"><div class="mod-card-top"><span class="mod-emoji">${l.icon}</span><span class="mod-score">${x.t?x.c+'/'+x.t:this.questions(l).length+' Fragen'}</span></div><div class="mod-title">Lektion ${l.id}</div><div class="mod-sub">${l.de} · ${Lang.current==='en'?l.en:l.es}</div><div class="mod-dot${x.t?' done':''}"></div></div>`;}).join('')}</div>`;},
  openLesson(id){const l=this.lesson(id);if(!l)return;this.currentId=l.id;App.go('b22-lesson');this.renderLesson();},
  renderLesson(){const l=this.lesson(this.currentId),EN=Lang.current==='en',en=B22_EN[l.id];document.getElementById('banner-sub').textContent=`${l.icon} B2.2 · Lektion ${l.id}`;const key='alodeutsch-b22-sicher-write-'+l.id;document.getElementById('b22-lesson-body').innerHTML=`<div class="intro-box"><b style="font-size:20px">${l.icon} Lektion ${l.id} · ${l.de}</b><p>${l.focus.join(' · ')}</p></div><div class="sec-title">📖 Grammatik im Kontext</div>${l.notes.map(([title,rule,example],i)=>`<div class="rule-box"><b>${title}</b><p>${EN?en.notes[i]:rule}</p><em>${example}</em></div>`).join('')}<div class="sec-title">🗂️ Lernwortschatz</div><div class="rule-box">${l.words.map(([de,es],i)=>`<div style="padding:5px 0"><b>${de}</b> · ${EN?en.words[i]:es}</div>`).join('')}</div><div class="lesson-actions"><button class="pill-btn" onclick="B22Lessons.startQuiz(${l.id})">${EN?'Practise':'Practicar'} · ${this.questions(l).length} Fragen</button><button class="results-btn-s" onclick="B2LessonPractice.openFlash(${l.id})">🗂️ Flashcards · ${B2LessonPractice.cards('b22',l).length}</button></div><div class="sec-title">✍️ Schreiben</div><div class="intro-box">${EN?en.writing:l.writing}</div><textarea id="b22-sicher-writing" class="schreib-textarea" placeholder="${EN?'Write in German…':'Escribe en alemán…'}" oninput="B22Lessons.saveWriting()"></textarea><div id="b22-sicher-wordcount" class="word-counter">0 Wörter</div><div class="sec-title">🗣️ Sprechen</div><div class="intro-box">${EN?en.speaking:l.speaking}</div><button class="results-btn-s" style="width:100%;margin-top:20px" onclick="B22Lessons.open()">← ${EN?'All lessons':'Todas las lecciones'}</button>`;document.getElementById('b22-sicher-writing').value=localStorage.getItem(key)||'';this.updateCount();},
  updateCount(){const el=document.getElementById('b22-sicher-writing');if(el)document.getElementById('b22-sicher-wordcount').textContent=el.value.trim().split(/\s+/).filter(Boolean).length+' Wörter';},
  saveWriting(){const el=document.getElementById('b22-sicher-writing');localStorage.setItem('alodeutsch-b22-sicher-write-'+this.currentId,el.value);this.updateCount();},
  startQuiz(id){const l=this.lesson(id);if(!l)return;App.go('quiz-run');document.getElementById('banner-sub').textContent=`${l.icon} B2.2 · Lektion ${id}`;Quiz.start('quiz-run-body',this.questions(l),{scoreKey:this.key(id),keepOrder:false});}
};
