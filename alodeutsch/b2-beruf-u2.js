/* Test Deutsch B1·B2 Beruf · Übungstest 2 (Test gGmbH, 2017).
   Texto, Aufgaben y Lösungsschlüssel transcritos del Testheft escaneado que aportó el usuario (uso privado de estudio),
   cotejando la imagen de cada página. Páginas impresas: Hören pp. 7–9, Lesen/Sprachbausteine pp. 10–19,
   Schreiben pp. 20–21, Hörtexte pp. 55–57, Lösungsschlüssel p. 58.
   El escaneo empieza en la p. 7: falta la página de Hören, Teil 1 (Aufgaben 1–4), así que esa parte solo
   trae las transcripciones. Se omiten las direcciones de correo de los encabezados (An:/Von:) y de la consigna de Schreiben 1. */
window.BERUF_OFFICIAL = window.BERUF_OFFICIAL || {};
window.BERUF_OFFICIAL.u2 = {
  id: 'u2',
  title: 'B1·B2 Beruf · Übungstest 2',
  source: 'Test Deutsch B1·B2 Beruf · Übungstest 2 (Test gGmbH, 2017). Testheft pp. 7–21, Hörtexte pp. 55–57, Lösungsschlüssel p. 58.',
  parts: [
    {
      id: 'h1', label: 'Hören 1', title: 'Hören, Teil 1 · Telefonnachrichten', kind: 'listen',
      intro: 'In deinem Scan fehlt die Aufgabenseite (Testheft S. 6, Aufgaben 1–4). Hier kannst du die vier Nachrichten anhören und mitlesen. Offizielle Lösungen laut Schlüssel: 1 c, 2 b, 3 b, 4 c.',
      audio: [
        { label: 'Beispiel', lines: [['', 'Hallo Jan, hier ist Vera. Ich komme heute vielleicht etwas später ins Geschäft. Bei uns im Haus wird der Strom abgelesen. Die Hausverwaltung hat gesagt, dass der Mitarbeiter der BEWAG zwischen sieben und zehn Uhr kommt. Wenn er schon um sieben da ist, schaffe ich es pünktlich bis acht Uhr ins Geschäft, sonst muss ich bis zehn Uhr warten. Kannst du bitte der Chefin Bescheid sagen? Bitte sag ihr auch, dass ich gestern bereits einen Teil der neuen Waren ausgezeichnet habe. Sie liegen hinten im Lager auf dem blauen Container. Danke, bis später.']] },
        { label: 'Nummer 1', lines: [['', 'Guten Morgen, Frau Kussmann, hier Wartenberg. Hören Sie, ich muss heute Vormittag zum Lieferanten und komme erst in der Mittagszeit, so gegen zwei, ins Hotel. Ich möchte, dass Sie heute Morgen sofort mit der Überprüfung der vierten Etage anfangen. Dort checkt bereits heute Vormittag eine Reisegruppe aus China ein, die sofort auf ihre Zimmer wollen. Schauen Sie, dass die Minibar in jedem Zimmer gefüllt ist, überprüfen Sie die Heizung und ob Fernseher und Fön funktionieren. Ich will, dass alles tipptopp ist. Der chinesische Reiseveranstalter ist wichtig für uns. Danke.']] },
        { label: 'Nummer 2', lines: [['', 'Herr Ganem, hier Trester. Wo sind Sie denn? Wir warten seit sieben Uhr auf die Lieferung, jetzt ist es zwanzig vor zehn und von Ihnen keine Spur! Auch bei Ihnen im Büro war niemand zu erreichen! Wir hatten vier Kisten Tomaten, zwölf Kopf Salat, zehn Gurken, fünf Kilo Schafskäse und zwei Kisten Oliven bestellt. Wenn ich bis zehn nichts von Ihnen höre, muss ich mir die Ware vom Großmarkt selbst besorgen. Die heutige Bestellung müssten wir dann natürlich stornieren. Bitte melden Sie sich umgehend. Danke.']] },
        { label: 'Nummer 3', lines: [['', 'Guten Tag, Frau Wiedemann, Kuwalik hier von der Firma GeWoTEC. Die Rechnung, die wir von Ihnen erhalten haben, ist meines Erachtens nicht ganz korrekt. Sie berechnen 20 Kartons Kopierpapier, aber wir haben nur 15 bestellt. Ich weiß, normalerweise nehmen wir immer 20 Kartons, aber dieses Mal brauchten wir nicht so viele. Auch das Lieferdatum war falsch. Sie haben 23. Januar geschrieben, aber die Lieferung ist am 23. Februar erfolgt. Ich fürchte, dass Sie einfach die letzte Rechnung überschrieben haben, und so sind wahrscheinlich die Fehler passiert. Bitte korrigieren Sie das, ja? Danke.']] },
        { label: 'Nummer 4', lines: [['', 'Hallo Timm, Achim hier. Sag mal, wo hast du denn deinen Kopf? Du fährst zum Kunden und vergisst den Werkzeugkoffer! Wie willst du denn jetzt den Abfluss reparieren? Hör zu, ruf bei Familie Wiedemann an und frag, ob sie eine Wasserpumpenzange, einen Schraubenschlüssel und Schraubenzieher haben. Ich gebe dir noch einmal die Nummer: 06243 92 301. Wenn nicht, fahr in den nächsten Baumarkt und frag, ob du Werkzeug mieten kannst. Gib unseren Firmennamen an und hinterlass eine Kaution. Kauf es aber nur, wenn es unbedingt sein muss. Das geht dann auf deine Rechnung. Dafür kommt die Firma nicht auf.']] }
      ]
    },
    {
      id: 'h2', label: 'Hören 2', title: 'Hören, Teil 2 · Fünf Gespräche', kind: 'choice',
      intro: 'Sie hören fünf Gespräche. Zu jedem Gespräch gibt es zwei Aufgaben. Entscheiden Sie bei jedem Gespräch, ob die Aussage dazu richtig oder falsch ist und welche Lösung (a, b oder c) am besten passt. Sie hören jedes Gespräch einmal.',
      items: {
        5: { stem: 'Frau Putova wird zum ersten Mal am Treffen der Verkaufsleiter teilnehmen.', rf: true },
        6: { stem: 'Der ungarische Markt ist schwierig wegen', opts: { a: 'einer zu geringen Anzahl ungarischer Vertriebsmitarbeiter.', b: 'nicht aktualisierter Verkaufskataloge.', c: 'zu geringer Englischkenntnisse bei den Geschäftspartnern.' } },
        7: { stem: 'Die Kundin sucht ein Geschenk für ihre Schwester.', rf: true },
        8: { stem: 'Der Verkäufer meint, dass', opts: { a: 'der Preisunterschied zwischen den Modellen minimal ist.', b: 'die Kundin das Bluetooth-Gerät nehmen soll.', c: 'sich beide Modelle in der Soundqualität unterscheiden.' } },
        9: { stem: 'Frau Semlova stellt sich in einer Bäckerei vor.', rf: true },
        10: { stem: 'Die Bewerberin', opts: { a: 'findet die Arbeitszeiten besonders wichtig.', b: 'kennt sich mit Backwaren sehr gut aus.', c: 'wollte nicht länger im Zeitungskiosk arbeiten.' } },
        11: { stem: 'Die beiden Männer arbeiten in derselben Firma.', rf: true },
        12: { stem: 'Im Mitarbeitergespräch wurde deutlich, dass', opts: { a: 'das Tragen von Ohrenschützern kontrolliert werden muss.', b: 'ein Pausenraum nicht vorgeschrieben ist.', c: 'es vielen Mitarbeitern zu laut ist.' } },
        13: { stem: 'Die Familie kennt das Restaurant gut.', rf: true },
        14: { stem: 'Der Gast', opts: { a: 'beklagt sich über die Größe der Portionen.', b: 'beschwert sich über die Qualität der Gerichte.', c: 'verlangt eine finanzielle Entschädigung.' } }
      },
      key: { 5: '+', 6: 'b', 7: '-', 8: 'a', 9: '+', 10: 'a', 11: '+', 12: 'c', 13: '+', 14: 'b' },
      audio: [
        { label: 'Nummer 5 und 6', lines: [
          ['Chef', 'Frau Putova, ich möchte, dass Sie dieses Mal, also morgen, bei der Verkaufsleiter-Besprechung dabei sind.'],
          ['Mitarbeiterin', 'Okay, Herr Berger. Ich wusste nicht, dass dies auch die Sachbearbeiter betrifft.'],
          ['Chef', 'Bis jetzt haben sich auch nur die Verkaufsleiter zusammengesetzt. Da haben Sie recht. Aber morgen werden wir über den osteuropäischen Markt sprechen. Vor allem Ungarn macht uns Probleme. Sie haben ja in letzter Zeit viele Bestellungen von dort bearbeitet, deshalb sollten Sie auch Ihre Erfahrungen einbringen.'],
          ['Putova', 'Ja, besonders seitdem Frau Armani in Mutterschaft ist. Die Abteilung hat im Moment nicht genügend Personal. Soll ich etwas für die Besprechung vorbereiten?'],
          ['Chef', 'Sie könnten einige Bestellvorgänge mitbringen, bei denen nicht alles rund lief.'],
          ['Putova', 'Oh ja, davon gibt es einige. Es gibt immer wieder Verwechslungen bei den Artikelnummern. Vielleicht haben die Ungarn ja eine veraltete Liste unserer Produkte.'],
          ['Chef', 'Haben Sie das schon mal überprüft?'],
          ['Putova', 'Na klar, ich hab deshalb schon mehrere E-Mails geschrieben. Aber obwohl die Ungarn recht gut Englisch können, ist die Kommunikation nicht immer einfach. Ich weiß nie, wer wofür zuständig ist.'],
          ['Chef', 'Darüber sprechen wir morgen, um elf Uhr im großen Konferenzraum.']] },
        { label: 'Nummer 7 und 8', lines: [
          ['Verkäufer', 'So, meine Dame, Ihr Enkel wird sich bestimmt über das neue Smartphone freuen. Hat denn Ihr Enkel eigentlich auch schon passende Lautsprecherboxen dazu?'],
          ['Kundin', 'Nein, aber die könnte ihm vielleicht meine Schwester schenken. Was gibt es denn da für Modelle?'],
          ['Verkäufer', 'Das hier zum Beispiel hat eine eingebaute Docking-Station. Dagegen läuft dieses Modell über Bluetooth.'],
          ['Kundin', 'Das müssen Sie mir bitte erklären. Ich versteh davon nichts.'],
          ['Verkäufer', 'Gerne. Docking-Station bedeutet, dass Ihr Enkel das Handy direkt hier reinstellt. Es wird dann auch gleich geladen. Dafür kann er das Handy aber nicht in der Hand halten, während er Musik hört.'],
          ['Kundin', 'Und das andere Modell?'],
          ['Verkäufer', 'Hier läuft die Verbindung über Bluetooth, also kabellos. Ihr Enkel kann das Zimmer mit dem Handy in der Hand verlassen und die Musik läuft trotzdem weiter. Was den Sound betrifft, ist die Qualität gleich.'],
          ['Kundin', 'Ach, und was kosten diese Modelle so?'],
          ['Verkäufer', 'Preislich macht das kaum einen Unterschied, beide liegen zwischen 25 und 30 Euro. Ich selbst habe einen Bluetooth-Lautsprecher, aber ich kann Ihnen auch das andere Modell empfehlen.'],
          ['Kundin', 'Ich sage meiner Schwester Bescheid. Vielen Dank!']] },
        { label: 'Nummer 9 und 10', lines: [
          ['Mann', 'Frau Semlova, Sie möchten also in unserer Bäckerei arbeiten. Haben Sie schon Erfahrungen mit dem Verkauf von Backwaren?'],
          ['Frau', 'Nein, Backwaren habe ich zwar noch nicht verkauft, aber zumindest habe ich schon Verkaufserfahrungen gesammelt. Bis fünfzehnten September habe ich in einem Zeitungskiosk gearbeitet und dort die Kasse bedient. Für die Tagesabrechnungen war ich auch zuständig.'],
          ['Mann', 'Und warum haben Sie dort aufgehört?'],
          ['Frau', 'Der Kiosk musste schließen, weil der Besitzer verstorben ist, und die Erben das Geschäft nicht übernehmen wollten.'],
          ['Mann', 'Oh, das tut mir leid. Warum möchten Sie jetzt für uns arbeiten?'],
          ['Frau', 'Vor allem wegen der Zeiten. Ich habe eine kleine Tochter und mein Mann arbeitet in der Spätschicht. Wenn ich früh anfange, könnten wir unseren Tagesablauf und die Kita-Zeiten beibehalten. Das wäre eine große Hilfe für uns.'],
          ['Mann', 'Das kann ich gut verstehen. Sie müssten sich natürlich mit unserem Sortiment vertraut machen.'],
          ['Frau', 'Kein Problem. Ich kenne Ihre Kette und kaufe selbst oft bei Ihnen. Ich werde mir die Namen und Preise der Produkte schnell merken.'],
          ['Mann', 'Gut, ich spreche mit dem Bezirksleiter und gebe Ihnen dann Bescheid.']] },
        { label: 'Nummer 11 und 12', lines: [
          ['Kollege 1', 'Na? Wie war dein Mitarbeitergespräch mit unserem Chef gestern?'],
          ['Kollege 2', 'Ganz okay. Zuerst hat er mich gefragt, ob ich irgendwelche Probleme hätte. Ich habe gesagt, dass soweit alles in Ordnung ist, aber dass ich Schwierigkeiten mit dem Lärm in der Produktionshalle habe.'],
          ['Kollege 1', 'Trägst du denn keine Ohrenschützer? Die sind doch vorgeschrieben!'],
          ['Kollege 2', 'Doch, wenn ich am Band stehe schon. Aber oft kommt ja jemand und fragt irgendetwas. Dann muss ich sie abnehmen. Und selbst im Pausenraum hört man die Maschinen noch.'],
          ['Kollege 1', 'Ja, genau, und der Chef sitzt den ganzen Tag oben im Büro und kriegt davon nichts mit. Dort oben ist es leise.'],
          ['Kollege 2', 'Das schon, aber Beschwerden über den Lärm hat er bereits von mehreren Kollegen gehört. Deshalb wird er jetzt versuchen, den Pausenraum in die erste Etage zu verlegen, wo es ruhiger ist. Dann könnten wir wenigstens in der Pause mal richtig abschalten.'],
          ['Kollege 1', 'Also, dann hat das Mitarbeitergespräch ja richtig viel gebracht!'],
          ['Kollege 2', 'Na ja, wenn man sich richtig vorbereitet, kann man Dinge einmal vernünftig mit dem Chef bereden.'],
          ['Kollege 1', 'Dann bin ich gespannt, wie mein Gespräch morgen wird.']] },
        { label: 'Nummer 13 und 14', lines: [
          ['Kellnerin', 'So, das macht insgesamt 53 Euro und 70 Cent, bitte. War alles in Ordnung?'],
          ['Gast', 'Also, wir kommen ja öfter hierher, aber dieses Mal waren wir ehrlich gesagt nicht zufrieden.'],
          ['Kellnerin', 'Oh, warum nicht?'],
          ['Gast', 'Tja, nun, meine Tochter hatte das Huhn in Erdnusssoße bestellt, aber da war wirklich fast kein Fleisch drin. Das war selbst für ein Kind zu wenig. Und selbst die Ente, die meine Frau bestellt hatte, war nicht so knusprig wie sonst.'],
          ['Kellnerin', 'Oh, das tut mir wirklich leid. Ich werde in der Küche Bescheid geben.'],
          ['Gast', 'Und noch etwas, der Reis war bei uns allen nicht richtig warm. Wahrscheinlich war er schon zu lange auf dem Teller, bevor er aus der Küche ins Restaurant kam. Auch auf die Getränke mussten wir lange, sehr lange warten.'],
          ['Kellnerin', 'Das ist mir sehr unangenehm. Aber wir sind heute unterbesetzt. Zwei unserer Bedienungen sind krank. Deswegen hat’s heute länger gedauert. Darf ich Ihnen eine Entschädigung vorschlagen? Das Essen Ihrer Tochter und Ihrer Frau berechnen wir heute dann nicht, und Ihrer Frau und Ihnen biete ich noch einen Reisschnaps an. Und wie wär’s mit Litschis für die Tochter?'],
          ['Gast', 'Sehr gerne. Vielen Dank!']] }
      ]
    },
    {
      id: 'h3', label: 'Hören 3', title: 'Hören, Teil 3 · Eine Besprechung', kind: 'choice',
      intro: 'Sie hören gleich eine Besprechung. Dazu gibt es sechs Aufgaben. Welche Lösung (a, b oder c) passt jeweils am besten? Lesen Sie zuerst die Aufgaben (eine Minute). Sie hören das Gespräch einmal.',
      items: {
        15: { stem: 'Das Team arbeitet in einem', opts: { a: 'Fitness-Studio.', b: 'Hotel.', c: 'Restaurant.' } },
        16: { stem: 'Die Teamsitzung', opts: { a: 'dauert drei bis vier Stunden.', b: 'findet normalerweise immer am gleichen Wochentag statt.', c: 'überschneidet sich oft mit dem Sondertraining.' } },
        17: { stem: 'Ina möchte alle wichtigen Mitteilungen', opts: { a: 'auf ihrem Handy lesen.', b: 'in einem zentralen Postfach erhalten.', c: 'umgehend telefonisch übermittelt bekommen.' } },
        18: { stem: 'Dimitry', opts: { a: 'informiert alle über einen Feiertag am kommenden Dienstag.', b: 'ist im Büro zuständig für alle Kundenanfragen.', c: 'kündigt eine Terminänderung an.' } },
        19: { stem: 'Dimitry', opts: { a: 'meint, dass viele Kunden und Mitarbeiter zu schnell sprechen.', b: 'präsentiert gern bei Besprechungsterminen.', c: 'schlägt vor, im Studio gemeinsam Deutsch zu lernen.' } },
        20: { stem: 'Ina', opts: { a: 'bittet Dimitry die nächsten Schritte zu übernehmen.', b: 'möchte mit ihren Kollegen Deutsch lernen.', c: 'wird gemeinsam mit Dimitry die Planung übernehmen.' } }
      },
      key: { 15: 'a', 16: 'b', 17: 'b', 18: 'c', 19: 'c', 20: 'a' },
      audio: [
        { label: 'Besprechung', lines: [
          ['Chefin (Ina)', 'Hallo! Prima, dass ihr alle kommen konntet. Die heutige Teamsitzung ist besonders wichtig, da wir – wie ja alle wissen – ein weiteres Gebäude mit mehreren Fitnessräumen erhalten haben – und neue Kollegen zu uns gekommen sind: Georg, Ivanka und Dimitry. Dimitry ist zwar schon ein paar Wochen hier, aber dennoch: euch allen ein herzliches Willkommen hier bei Fit-for-Sport.'],
          ['Kollegen', 'Vielen Dank! Vielen Dank, Ina. Danke Ina.'],
          ['Chefin', 'Ganz kurz für die Neuen: Unsere Teamsitzung machen wir immer am Mittwochnachmittag, in der Regel von drei bis vier. Diese eine Stunde solltet ihr euch freihalten. Normalerweise ist das auch schon so im Planungsprogramm festgehalten, aber ich weiß ja, dass manche oft gern ein Sondertraining von Kunden annehmen. So etwas ist ja in einem Fitness-Studio ganz normal. Man sollte aber für den Mittwochnachmittag, wie gesagt, zwischen drei und vier, kein Sondertraining vereinbaren. Falls wirklich mal was dazwischen kommt und ihr nicht am Team-Meeting teilnehmen könnt, dann bitte einfach eine Mail an mich.'],
          ['Ivanka', 'Entschuldigung, Ina, kann ich die Nachricht auch auf dein Handy schicken?'],
          ['Chefin', 'Eigentlich ungern, Ivanka, da wir ja über 20 Trainer sind. Dazu kommen noch die Leute an der Rezeption. Am liebsten hätte ich alle wichtigen Mitteilungen im E-Mail-Fach unseres Büros, und nicht auf meinem Handy. Vielleicht, Ivanka, kannst du dir mal zeigen lassen, wie du mit dem Handy auch einfach eine E-Mail schicken kannst. Die Mail einfach an team@fit-for-sport.de.'],
          ['Dimitry', 'An diese E-Mail-Adresse leite ich übrigens auch alle E-Mails unserer Kunden weiter, auch einfache Anfragen und sonstige Mails. Dort auf dem Computer im Büro wird alles archiviert. Ach übrigens, nächste Woche findet unsere Teamsitzung ausnahmsweise schon am Dienstag statt, weil doch am Mittwoch ein Feiertag ist. Und an Feiertagen haben wir geschlossen. An normalen Sonntagen haben wir aber vormittags bis ein Uhr mittags geöffnet.'],
          ['Chefin', 'Danke, Dimitry, dass du das erwähnst. Den Feiertag habe ich glatt vergessen.'],
          ['Georg', 'Die Woche danach, also am Mittwoch, bin ich den ganzen Tag in der Berufsschule und komme danach nicht mehr ins Büro, aber Ivanka kann mir ja berichten, was besprochen wurde.'],
          ['Chefin', 'Das ist in Ordnung. Wir sollten nächste Woche unbedingt über die Einsatzpläne sprechen. Ivanka sprach mich an und wollte wissen, ob sie die Schicht am Freitag- und Samstagnachmittag tauschen kann.'],
          ['Dimitry', 'Ich hätte auch noch einen Vorschlag.'],
          ['Chefin', 'Ja, Dimitry, dann sag das doch jetzt gleich.'],
          ['Dimitry', 'Nun, wie ich selbst – ich komme ja aus Moldawien – sind viele aus anderen Ländern hier bei uns beschäftigt. Für uns ist es nicht immer einfach, alles zu verstehen. Das war bei mir auf jeden Fall so. Besonders, wenn ganz schnell Deutsch gesprochen wird, oder ihr mal wieder Witze macht. Manche der Witze versteht man dann eigentlich gar nicht. Noch schwerer ist es, selbst etwas zu sagen, in Besprechungen etwas vorzustellen oder so. Vielleicht sollten alle, die Interesse haben, zusammen ein bisschen Deutsch lernen. Das könnten wir doch hier im Studio bei Fit-for-Sport machen, oder?'],
          ['Chefin', 'Ein sehr guter Punkt, Dimitry! Wie sehen das die anderen?'],
          ['Ivanka', 'Naja, irgendwie schon. Oft möchte ich etwas sagen, aber dann fehlen mir die Worte. Und dann sind die anderen schon beim nächsten Thema.'],
          ['Dimitry', 'Deshalb fände ich es gut, wenn wir mal versuchen würden, einen Nachmittag oder einen Abend in der Woche zu finden, an dem alle, die ihr Deutsch verbessern wollen, ein oder zwei Stunden Zeit haben. Dann könnten wir gemeinsam Deutsch lernen, unsere Aussprache verbessern und so.'],
          ['Chefin', 'Gut, das werden wir mal ausprobieren. Dimitry, würdest du die Planung übernehmen? Schreib alle an, die Interesse haben könnten. Heute sind ja schon Ivanka, Anastasia, Georg, Jenny und du selbst dabei. Und ich verstehe das so, dass ihr alle sehr am Deutschlernen interessiert seid.'],
          ['Ivanka', 'Ja, das finde ich eine gute Idee.']] }
      ]
    },
    {
      id: 'h4', label: 'Hören 4', title: 'Hören, Teil 4 · Meinungen zu Compliance', kind: 'match',
      intro: 'Sie hören ein Gespräch zwischen Kolleginnen und Kollegen. Welcher der Sätze a–f passt am besten zu den Meinungen 21–23? Zwei der Sätze a–f passen nicht. Satz b gehört zum Beispiel.',
      options: {
        a: 'Die Weitergabe von vertraulichen Informationen rechtfertigt eine Kündigung.',
        b: 'Ein schriftliches Regelwerk ist ein erster Schritt, um soziale Benachteiligung zu verhindern.',
        c: 'Auch wenn viele Verhaltensregeln selbstverständlich sind, kann es nicht schaden, sie schriftlich festzuhalten.',
        d: 'Ohne Compliance-Regeln kommt es oft zu Fällen von Mobbing unter den Mitarbeitern.',
        e: 'Compliance bedeutet, dass man Kunden nicht mit Gefälligkeiten dazu bringen darf, die eigenen Produkte zu kaufen.',
        f: 'Wegen eines Verstoßes gegen die Compliance-Regeln eine Kündigung zu bekommen, ist übertrieben.'
      },
      example: 'b',
      items: { 21: 'Meinung 21', 22: 'Meinung 22', 23: 'Meinung 23' },
      key: { 21: 'c', 22: 'e', 23: 'a' },
      audio: [
        { label: 'Beispiel', lines: [['', 'Ich würde mir wünschen, dass unsere Geschäftsleitung endlich Compliance-Regeln formuliert, vor allem in Bezug auf den Umgang mit Frauen. Wir bekommen nie die interessanten Projekte. Immer heißt es, wir hätten ja keine Zeit, Überstunden zu machen. Bei Beförderungen werden wir gar nicht erst beachtet, denn wehe eine von uns muss mal zu Hause bleiben, weil das Kind krank ist. Unser Chef geht einfach davon aus, dass wir nicht die gleiche Leistung bringen können wie Männer. Ich wünsche mir einfach mehr Gleichberechtigung und ich glaube, dass das schriftliche Fixieren von Compliance-Regeln dazu anregen kann, über solche Missstände nachzudenken und die Situation Schritt für Schritt zu verbessern.']] },
        { label: 'Nummer 21', lines: [['', 'Das Thema „Compliance“ wird in unserer Firma ganz großgeschrieben. Im Grunde heißt es, dass man sich an die Regeln des Unternehmens halten muss, und das ist meines Erachtens auch sinnvoll. Ich finde es in Ordnung, dass die Firma Regeln, zum Beispiel zum Verhältnis der Mitarbeiter untereinander oder zum Auftreten gegenüber den Geschäftspartnern, schriftlich festhält und den Angestellten klar und deutlich erklärt. Natürlich könnte man auch argumentieren, dass einige Verbote doch völlig normal sind, zum Beispiel, dass man seine Kollegen nicht mobben darf. Aber ich finde es gut, wenn es auch ein schriftliches Regelwerk gibt. Dann kann keiner sagen, er hätte es nicht gewusst.']] },
        { label: 'Nummer 22', lines: [['', 'Compliance heißt doch, dass man sich gegenseitig keine Geschenke machen darf, oder? Wir hatten letztens einen Workshop darüber, aber ich habe ehrlich gesagt nicht richtig zugehört. Ist doch schade, wenn ich meinen langjährigen Kunden als Danke-Schön nicht mehr zum Essen einladen darf, beziehungsweise das Essen dann nicht mehr als 20 Euro kosten darf. Ja klar, ich verstehe schon, dass solche Einladungen schnell aus dem Ruder laufen können. Wenn man einem Geschäftspartner eine Reise nach Hawaii schenkt, nur damit er weiterhin die Produkte der Firma kauft, ist das natürlich zu viel. Aber welche Firma macht denn so etwas? Das wäre ja völlig übertrieben. Ich muss jedenfalls immer aufpassen, dass ich bei meinen Geschäftsessen nicht zu viel ausgebe.']] },
        { label: 'Nummer 23', lines: [['', 'Mein Kollege hat letztens richtig Ärger bekommen. Unsere Entwicklungsabteilung forscht gerade an einer neuen Technik, und Franz hat abends in der Kneipe davon erzählt. Prompt hat einer seiner Kumpels die Geschichte einem Bekannten erzählt, der bei der Konkurrenz arbeitet, und über verschiedene Kanäle hat unsere Geschäftsleitung davon erfahren. Franz hatte unglaublich Glück, dass er nicht gekündigt wurde, aber er musste ein Online-Seminar zu unseren Compliance-Regeln machen. Man darf firmeninterne Inhalte draußen nicht erzählen, denn schließlich weiß man nie, wer die Informationen eventuell hört und für das eigene Unternehmen nutzt. Wer es trotzdem tut, verstößt gegen die Regeln und kann entlassen werden. Das ist nur gerecht.']] }
      ]
    },
    {
      id: 'l1', label: 'Lesen 1', title: 'Lesen, Teil 1 · Betreffzeilen', kind: 'match',
      intro: 'Lesen Sie zuerst die Betreffzeilen a–f. Lesen Sie anschließend die E-Mails 24–27 und entscheiden Sie, welche Betreffzeile am besten zu jeder E-Mail passt.',
      options: { a: 'Buchhaltungsfehler', b: 'Einsatztermine', c: 'Materialfehler', d: 'Mitarbeiterschulung', e: 'Rechnungsfehler', f: 'Wiedersehenstreffen' },
      items: {
        24: 'Sehr geehrte Frau Sarkofski, die von Fa. Henssler gelieferten MDF-Platten, weiß grundiert, müssen hier im Werk weiterverarbeitet werden. Beim Vorbereiten für die Oberfläche wurde jetzt festgestellt, dass sich teilweise die Beschichtung löst. (Siehe beigefügte Fotos.) Dieser Mangel war vor der Weiterverarbeitung der Lagerplatten nicht sichtbar. Wir werden die Anzahl der Teile mit diesem Mangel sowie den entstandenen zeitlichen Aufwand dokumentieren und an Sie weiterleiten. Mit freundlichen Grüßen, gez. Nasser, Fa. Hoba',
        25: 'Liebe Prüferinnen und Prüfer, ab sofort wird sich meine neue Kollegin Amina Winkelhaus um die Planung der Lebensmittelkontrollen kümmern. Sie wird einige Tage vor dem jeweiligen Datum nach den Möglichkeiten fragen und dann die Damen und Herren einsetzen, die am jeweiligen Tag Zeit haben. Ich denke, wir werden jetzt in der Anfangsphase einen Plan für die kommenden Wochen machen, damit sich jede/r darauf einstellen kann. Viele Grüße, Ines Schackmann',
        26: 'Sehr geehrter Herr Al-Hami, für die am 23.03. erfolgte Lieferung von 200 Aktenordnern berechnen Sie uns 259 € statt 256 €. Das ist zwar nur eine marginale Abweichung, aber für unsere Buchhaltung ist es natürlich wichtig, dass die Beträge genau stimmen. Schauen Sie das bitte noch einmal an und korrigieren Sie ggf. die Rechnung. Beste Grüße aus Koblenz, Christian Leyendecker',
        27: 'Liebe Ex-Kolleginnen und Ex-Kollegen, vielleicht habt ihr nach langer Zeit mal wieder Lust auf ein Treffen im Kreis der ehemaligen Kolleginnen und Kollegen? Ich schlage Freitag, den 10. oder 17. 2. ab 18:30 Uhr vor, im „Davide“ (Italiener neben dem Totohaus). Nennt mir bis zum nächsten Mittwoch euren Wunschtermin und gebt mir Bescheid, wer kommen kann und will. Ich werde euch dann informieren, welcher Termin gewählt wurde, und einen Tisch im „Davide“ reservieren. Gruß, Dorothee'
      },
      key: { 24: 'c', 25: 'b', 26: 'e', 27: 'f' }
    },
    {
      id: 'l2', label: 'Lesen 2', title: 'Lesen, Teil 2 · Hilfe und Tipps bei Bewerbungsfragen', kind: 'match',
      intro: 'Lesen Sie die Sätze 28–32. Lesen Sie die Texte a–h. Welche Frage 28–32 passt zu welchem Tipp? Für eine Frage gibt es keinen passenden Tipp. Markieren Sie diesen Satz mit einem x.',
      allowX: true,
      options: {
        a: 'Hannah: Du könntest den Personaler vorher anrufen, dich vorstellen und ihm dein Vorhaben kurz erklären. Dann kannst du eventuell raushören, bei welcher der beiden Stellen du mehr Chancen hast, und dich erst mal nur dafür bewerben.',
        b: 'Martina: Im Anschreiben würde ich eher nicht über ungelegte Eier wie diese von dir geplante Weiterbildung schreiben. Und wenn, dann solltest du ganz konkret etwas dazu angeben, was beim Job hilfreich sein könnte. Aber da du die Inhalte noch nicht kennst, wird es wohl schwierig.',
        c: 'Cornelia: Wenn ich mich auf eine Stelle bewerben würde, wo Ingenieur oder Techniker drin steht, würde ich meine Forderung an meiner höheren Qualifikation ausrichten. Wenn man sich unnötig unter Wert verkauft, wird man langfristig unzufrieden und die Arbeit leidet.',
        d: 'Roberto: In den Portalen machst du das jeweils so, wie es gefordert wird. Allgemein empfehle ich zumindest Lebenslauf und Zeugnisse in eine Datei zu packen, damit der Empfänger sich nicht alles chronologisch zusammenpuzzeln muss.',
        e: 'Noah: Wenn du einen Ausbildungsplatz in der Musikbranche suchst, solltest du dich informieren, was für Berufe es dort gibt und welcher davon dich am meisten reizt. Dann wird es dir relativ leichtfallen, deine Wahl zu begründen, eine aussagefähige Bewerbung zu entwerfen und so auch die entsprechende Chance zu bekommen.',
        f: 'Inez: Wie hast du die Absagen bekommen, per Post? Manchmal steht in den Stellenanzeigen drin, dass keine Rücksendung der Unterlagen erfolgt. Ich würde an deiner Stelle einmal nett nachfragen und um Rücksendung deiner Unterlagen bitten (normalerweise wird nur das Anschreiben behalten).',
        g: 'Johann: Schriftliche Bewerbung heißt zwingend Anschreiben und Lebenslauf, idealerweise ergänzt um ein Deckblatt. In deinem Fall würde ich es beim klassischen deutschen Lebenslauf belassen. So sieht der Personalverantwortliche relativ früh, dass du noch zur Schule gehst.',
        h: 'Eva: Das sehe ich nicht so. Aber du könntest deine Taktik etwas ändern, indem du dich beim Anruf gleich erkundigst, ob die Bewerbung in Papierform oder online erwünscht ist und zu wessen Händen du sie schicken sollst. Dann hast du einen ersten Kontakt hergestellt und weißt, wen du in deiner Bewerbung persönlich anschreiben kannst.'
      },
      items: {
        28: 'Kasem: Wie mach ich das, wenn ich mich bei ein und demselben Unternehmen für unterschiedliche Aufgabenbereiche bewerben möchte? Konkret geht’s bei mir um zwei Stellen in verschiedenen Stationen in einem Krankenhaus, die mich beide interessieren.',
        29: 'Jennifer: Von einem Ausbilder für Fachinformatik hab ich gehört, dass er es bei Online-Bewerbungen besser findet, wenn sich die Bewerbungsunterlagen in einer einzigen PDF-Datei befinden. In Bewerbungsportalen wiederum lädt man ja gewöhnlich mehrere Dateien hoch. Daher bin ich nun unschlüssig, wie ich das machen soll mit Anschreiben, Lebenslauf und Zeugnissen.',
        30: 'Maurice: Vielleicht könnt ihr mir helfen. Ich habe mich schon in manchen Firmen mit teuren Mappen beworben und Absagen erhalten. Kann ich meine Mappen zurückfordern?',
        31: 'Dana: Ich weiß nicht, ob ich meine Bewerbung persönlich in einer Mappe mit Anschreiben, Lebenslauf und Zeugnis abgeben oder sie nur per E-Mail schicken soll. Da ich mich für eine Stelle als Verkäuferin bewerbe, hab ich mir gedacht, es könnte meine Chancen erhöhen, wenn ich persönlich komme und einen kontaktfreudigen und kommunikativen Eindruck mache.',
        32: 'Angela: Auf jeder Seite mit Bewerbungstipps liest man, man solle vorher den Personaler anrufen. Doch immer, wenn ich anrufe, wird mir nur gesagt, ich solle meine schriftlichen Unterlagen einreichen. Also ist der Anruf doch sinnlos, oder?'
      },
      key: { 28: 'a', 29: 'd', 30: 'f', 31: 'x', 32: 'h' }
    },
    {
      id: 'l3', label: 'Lesen 3', title: 'Lesen, Teil 3 · Drei Texte', kind: 'choice',
      intro: 'Lesen Sie die Texte 1–3 und die Aufgaben 33–38. Entscheiden Sie, welche Antwort (a, b oder c) am besten passt.',
      texts: [
        { title: 'Text 1', items: [33, 34], paras: [
          'Sehr geehrte Frau Iranj,',
          'gemäß Ihrem Arbeitsvertrag sind Sie verpflichtet, die Ihnen zugewiesenen Aufgaben ordnungsgemäß zu verrichten. Mit Bedauern müssen wir feststellen, dass Sie bereits mehrmals gegen diese Regelung verstoßen haben.',
          'Am 25. Februar forderte Sie Ihre Vorgesetzte, Frau Hensen, auf, die neu angelieferten Reinigungsprodukte mit Preisetiketten zu bekleben. Leider mussten wir feststellen, dass alle Produkte von Ihnen mit einem falschen Preis versehen worden waren. Aufgrund dessen kam es zu Missverständnissen und Verärgerung bei den Kunden.',
          'Ferner wurden Sie am 27. Februar aufgefordert, die Regale mit den neuen Kosmetikprodukten zu befüllen. Auch hier mussten wir feststellen, dass Sie die Produkte nicht an den entsprechenden Platz geräumt hatten. So kam es zu Störungen im Betriebsablauf. Die Produkte mussten alle wieder umgestellt werden und ein Durcheinander war die Folge.',
          'Wir bitten Sie, in Zukunft auf die richtige Ausführung der Anweisungen zu achten. Sollten Sie noch einmal eine verbindliche Arbeitsanweisung Ihrer Vorgesetzten missachten, müssen Sie mit entsprechenden Konsequenzen, bis hin zur Kündigung, rechnen.',
          'Mit freundlichen Grüßen — Stefan Wiskalnis (Abteilungsleiter)'] },
        { title: 'Text 2 · Betriebliche Gesundheitsförderung', items: [35, 36], paras: [
          'Die Arbeitsbedingungen haben sich in vielen Bereichen stark verändert. Einerseits gehen viele Arbeitsabläufe mit wenig Bewegung einher, andererseits ist die Ernährung zu fett- und zuckerhaltig. Über die Hälfte der Deutschen ist bereits übergewichtig. Hinzu kommt die permanente Stressbelastung durch wachsende berufliche und private Anforderungen.',
          'Deshalb wird es immer wichtiger, das Arbeitsumfeld so zu gestalten, dass Gesundheitsrisiken für die Mitarbeiterinnen und Mitarbeiter reduziert werden.',
          'Betriebe, in denen körperlich hart gearbeitet wird, können davon besonders profitieren. So machen Muskel- und Skeletterkrankungen dort rund 30 % aller Arbeitsunfähigkeitstage aus.',
          'Bei Programmen in diesem Handlungsfeld lernen die Teilnehmerinnen und Teilnehmer beispielsweise, wie sie eine bessere Körperhaltung einnehmen und schädliche Bewegungen vermeiden können. Je nach Aufgabenbereich der Mitarbeiterinnen und Mitarbeiter könnte auch das richtige Anheben und Tragen schwerer Gegenstände von Bedeutung sein. Das Ziel solcher Maßnahmen besteht darin, Rücken, Gelenke und Muskeln nicht stärker zu beanspruchen als unbedingt nötig.',
          'Bei körperlich anstrengenden Berufen ist das Risiko, den Rücken zu belasten, besonders hoch, aber auch die Mitarbeiterinnen und Mitarbeiter, die viel sitzen, müssen vorbeugen, beispielsweise durch häufige Wechsel zwischen Steh- und Sitzposition. Denn ständiges Sitzen schadet. Mit einem Steh-Sitz-Tisch lässt sich z. B. im Sitzen und im Stehen arbeiten, auch Zusatz-Stehtische sind hilfreich. Schnell lohnt sich die kleine Zusatzinvestition für den Tisch, weil weniger Ausfalltage zu verzeichnen sind.',
          'Alles in allem wird sich ein verstärkter Einsatz für gesundes Verhalten in jeder Firma bezahlt machen.'] },
        { title: 'Text 3 · E-Mail: Ihre Anfrage', items: [37, 38], paras: [
          'Sehr geehrter Herr Gallini,',
          'vielen Dank für Ihr Interesse an unseren Weiterbildungskursen. Wir könnten Ihnen eine Teilnahme an folgendem Kurs empfehlen: Abgasuntersuchung (AU) – Offizieller Prüfungsvorbereitungskurs für Kfz-Mechaniker (Meister und Gesellen).',
          'Hinweis zu den Kosten: Einzelkurs (nur Benzin) bei erster Teilnahme 165,00 €, bei Wiederholung 155,00 €. Kombi-Kurs (Benzin+Diesel) bei erster Teilnahme oder Wiederholung 295,00 €. Innungsmitglieder erhalten einen einmaligen Preisnachlass von 50,00 € auf alle Preise.',
          'Kursinhalte: Vorschriften und Richtlinien · AU-Durchführungs- und Verfahrensrichtlinie · Darstellung und Bedeutung der amtlichen Untersuchung · Dokumentation · Qualitätssicherung · Spezielle technische Merkmale und Sachverhalte · Zusammenhänge zwischen Technik und Emission.',
          'Anmeldung: Schriftlich/per Fax. Sie erhalten ca. 5 Wochen vor Lehrgangsbeginn die Schulungsunterlagen zur Vorbereitung auf die Inhalte des Kurses. Diese Unterlagen müssen vor dem Kurs im Selbststudium durchgearbeitet werden.',
          'Mit freundlichen Grüßen — Marion Decker, Handwerkskammer Freiburg',
          'A. Gallini schrieb: > Sehr geehrte Damen und Herren, der Leiter der Autowerkstatt, in der ich arbeite, hat mich auf Ihr neues Weiterbildungsprogramm für Kfz-Mechaniker hingewiesen. Ich interessiere mich für den Kurs zur Prüfungsvorbereitung zur Abgasuntersuchung für Benzin-Fahrzeuge in Freiburg. Können Sie mir dazu genaue Informationen geben? Ich bin seit September Kfz-Mechaniker-Geselle und Mitglied in der Kfz-Innung Freiburg. Ich mache den Kurs zum ersten Mal. Inhaltlich ist es mir besonders wichtig zu erfahren, was die amtlichen Untersuchungen genau bedeuten. Passt Ihr Kursangebot zu mir und wie hoch sind die Kosten? Danke im Voraus für Ihre Informationen. Mit freundlichen Grüßen, Angelo Gallini'] }
      ],
      items: {
        33: { stem: 'Die Mitarbeiterin sollte', opts: { a: 'Regale mit Kosmetikartikeln an ihren Platz stellen.', b: 'Reinigungsprodukte in Regale einräumen.', c: 'Reinigungsprodukte mit Preisen auszeichnen.' } },
        34: { stem: 'Die Firma', opts: { a: 'ermahnt die Mitarbeiterin, ihre Aufgaben richtig zu erfüllen.', b: 'erteilt der Mitarbeiterin neue Anweisungen.', c: 'kündigt der Mitarbeiterin.' } },
        35: { stem: 'In Bereichen mit harter körperlicher Arbeit', opts: { a: 'führt vor allem schweres Tragen zu Krankheitsfällen.', b: 'haben 30 % der Mitarbeiter Muskelerkrankungen.', c: 'muss man lernen, seine Bewegungen zu kontrollieren.' } },
        36: { stem: 'Wer im Büro arbeitet,', opts: { a: 'hat ein besonders hohes Risiko für Rückenbeschwerden.', b: 'sollte öfter stehen als sitzen.', c: 'sollte vor allem die Haltung am Schreibtisch variieren.' } },
        37: { stem: 'Herr Gallini', opts: { a: 'bereitet sich auf seine Prüfung zum Kfz-Mechaniker vor.', b: 'ist verpflichtet eine Fortbildung zu absolvieren.', c: 'möchte sich durch einen Lehrgang weiterqualifizieren.' } },
        38: { stem: 'Für den Kurs muss man', opts: { a: 'inhaltlich vorbereitet sein.', b: 'Innungsmitglied sein.', c: 'Kfz-Mechaniker-Meister sein.' } }
      },
      key: { 33: 'c', 34: 'a', 35: 'c', 36: 'c', 37: 'c', 38: 'a' }
    },
    {
      id: 'l4', label: 'Lesen 4', title: 'Lesen, Teil 4 · Umwelttipps für den Einzelhandel', kind: 'choice',
      intro: 'Lesen Sie den Text. Entscheiden Sie, ob die Aussagen 39–41 richtig oder falsch sind.',
      texts: [
        { title: 'Umwelttipps für den Einzelhandel · Thema Abfall', items: [39, 40, 41], paras: [
          '1. Vermeiden geht vor Verwerten',
          'Überall im Einzelhandel fallen verwertbare Verpackungsmaterialien an, insbesondere Papier und Kartonagen, Folien, Styropor und sonstige Füllmaterialien. Im Lebensmitteleinzelhandel kommen ablaufende oder bereits überlagerte, aber unverdorbene Lebensmittel hinzu. Mit einer Abgabe vor Ablauf des Mindesthaltbarkeitsdatums zu einem dann deutlich verringerten Preis oder einer kostenlosen Weitergabe an Organisationen für Bedürftige (Heime, Tafeln etc.) kann dieser Anteil reduziert werden. Für nicht vermeidbare Lebensmittelabfälle stehen Biogasanlagen zur Verfügung. Kleinmengen lassen sich über die Biotonne entsorgen, so dass sich die Beseitigung als Restabfall erübrigt.',
          '2. Verpackungsarme Produkte',
          'Ermöglichen Sie Ihren Kundinnen und Kunden abfallarm einzukaufen. Immer mehr Konsumentinnen und Konsumenten geben umweltfreundlichen und verpackungsarmen Produkten beim Kauf den Vorzug. Konzepte zur Abgabe von Lebensmitteln in mitgebrachte Behältnisse wie Korb, Flasche, Kunststoffbehälter sind zu prüfen.',
          'Überprüfen Sie ebenfalls, ob die von Ihnen angebotenen Produkte auch in Mehrwegverpackungen, in Nachfüllpackungen oder in Verpackungen aus Recyclingmaterial erhältlich sind. Die für das Verpacken von Brot, Obst oder Wurst zur Verfügung gestellten Tüten etc. sind Service- bzw. Verkaufsverpackungen nach Verpackungsverordnung. Für sie müssen Lizenzgelder bei einem der dualen Systeme bezahlt werden.',
          '3. Wiederverwendbare Verpackungen',
          'Setzen Sie möglichst wenige Produkte in Einwegverpackungen ein. Verwenden Sie Mehrweg-Transport-Verpackungen, die vom Transportunternehmen zurückgenommen und wiederverwendet werden. Ein Beispiel hierfür ist die POSTBOX der Deutschen Post AG, die es in verschiedenen Größen gibt. Bei Anlieferung kann man die Box sofort öffnen, Anzahl und Qualität der Ware prüfen und diese entnehmen. Dann geht die Box automatisch an die Deutsche Post AG zurück. Dieses Verfahren erspart unnötige Wege und die Entsorgung von Kartons und Füllmaterial.'] }
      ],
      items: {
        39: { stem: 'Abfälle von Lebensmitteln in kleinen Mengen sollten im Restmüll entsorgt werden.', rf: true },
        40: { stem: 'Kunden wünschen beim Einkauf Waren in möglichst wenig Verpackung.', rf: true },
        41: { stem: 'Bestimmte Mehrwegverpackungen kann man zur Wiederverwendung in Postfilialen abgeben.', rf: true }
      },
      key: { 39: '-', 40: '+', 41: '-' }
    },
    {
      id: 's1', label: 'Sprachb. 1', title: 'Sprachbausteine, Teil 1 · Einladung zum Sommerfest', kind: 'gaps',
      intro: 'Lesen Sie den folgenden Text und entscheiden Sie, welche Wörter a–j am besten in die Lücken 42–49 passen. Sie können jedes Wort im Kasten nur einmal verwenden. Nicht alle Wörter passen in den Text.',
      box: { a: 'ÄUSSERST', b: 'GENAU', c: 'INDEM', d: 'KEINESFALLS', e: 'OB', f: 'SONDERN', g: 'UNTER', h: 'ZUM', i: 'ZUSAMMEN', j: 'ZWAR' },
      text: [
        'Betreff: Einladung zum Sommerfest',
        'Liebe Mitarbeiterinnen und Mitarbeiter,',
        'gemeinsam haben wir in den vergangenen Wochen hart gearbeitet und so das Großprojekt für das Pharmazie-Unternehmen in Indien zu einem erfolgreichen Abschluss gebracht: Unser Kunde war mit dem Ergebnis [[42]] zufrieden. Das muss natürlich gebührend gefeiert werden, und [[43]] am 15. August, beim diesjährigen Sommerfest.',
        'Dazu laden wir nicht nur Sie alle, [[44]] auch Ihre Familien herzlich ein. Die Feier beginnt um 19:00 Uhr, das Ende lassen wir offen!',
        'Natürlich werden wir Ihnen einiges bieten: Für kulinarischen Genuss sorgt der Partyservice „Gourmet“, und zu Ihrer Unterhaltung hat sich meine Assistentin, Ingrid Seidel, einiges einfallen lassen. Ich musste ihr fest versprechen, [[45]] etwas zu verraten. Also, lassen Sie sich überraschen und freuen Sie sich auf einen wunderschönen Abend!',
        'Übrigens führen wir mit diesem Fest eine Tradition fort: [[46]] am 15. August vor zehn Jahren fand das erste Sommerfest unseres Unternehmens statt. Dieses Fest war schon damals ein voller Erfolg. Schauen Sie sich doch mal im Intranet die Bilder [[47]] der Rubrik „Events“ an und schwelgen Sie ein wenig in Erinnerungen!',
        'Noch eines [[48]] Schluss: Unser Sommerfest findet im Park hinter dem Bürogebäude statt. Nehmen Sie sich also für die Abendstunden eine Jacke mit und denken Sie an bequemes Schuhwerk. Es freut sich auf Sie — Claus Wilhelm',
        'PS: Bitte geben Sie uns bis zum 28. Juli Bescheid, [[49]] und mit wie vielen Personen Sie am Fest teilnehmen werden. Tragen Sie sich dazu in die Anmeldeliste ein, die an der Rezeption ausliegt.'
      ],
      key: { 42: 'a', 43: 'j', 44: 'f', 45: 'd', 46: 'b', 47: 'g', 48: 'h', 49: 'e' }
    },
    {
      id: 's2', label: 'Sprachb. 2', title: 'Sprachbausteine, Teil 2 · Lieferverzögerung', kind: 'gaps',
      intro: 'Lesen Sie den folgenden Text und entscheiden Sie, welcher Ausdruck (a, b oder c) am besten in die Lücken 50–59 passt.',
      options: {
        50: { a: 'Als Liefertermin', b: 'Bei Anlieferung', c: 'Zur Lieferung' },
        51: { a: 'Für den Fall', b: 'Im Laufe', c: 'In der Zwischenzeit' },
        52: { a: 'auf die pünktliche', b: 'in die passende', c: 'mit der rechtzeitigen' },
        53: { a: 'auf unsere Veranlassung', b: 'durch unsere Reklamation', c: 'zu unserem Bedauern' },
        54: { a: 'Das Verschulden liegt', b: 'Der Fehler kommt', c: 'Die Schuld trifft' },
        55: { a: 'im Folgenden', b: 'in Folge', c: 'zur Folge' },
        56: { a: 'Chance wahrzunehmen', b: 'Gelegenheit zu geben', c: 'Möglichkeit zu nehmen' },
        57: { a: 'bei Bedarf sofort', b: 'gleich auf Bestellung', c: 'umgehend nach Erhalt' },
        58: { a: 'betroffen', b: 'untrennbar', c: 'verbunden' },
        59: { a: 'bleiben Sie', b: 'erwarten Sie', c: 'zögern Sie' }
      },
      text: [
        'Sehr geehrter Herr Meyer-Schwerin,',
        'mit Auftragsnummer KS 1454 haben Sie bei uns einen PKW-Anhänger der Marke Bastau bestellt. [[50]] hatten wir den 31. März vereinbart. [[51]] unserer langjährigen Geschäftsbeziehungen konnten Sie sich bei uns immer [[52]] Ausführung Ihrer Bestellungen verlassen.',
        'Leider müssen wir Ihnen heute mitteilen, dass es bei dem aktuellen Auftrag [[53]] nicht möglich sein wird, den bestätigten Termin für die Auslieferung einzuhalten. [[54]] dabei nicht auf unserer Seite. Leider gibt es Probleme seitens unseres Herstellers, der uns gerade darüber informiert hat, dass es zu unerwarteten Engpässen in der Produktion gekommen ist. Die Ursache dafür war ein Kabelbrand im Werk, der einen vorübergehenden Maschinenstillstand [[55]] hatte.',
        'Für Sie bedeutet das, dass sich das Eintreffen Ihres Anhängers voraussichtlich um etwa zwei Wochen verzögern wird. Über diese unerfreuliche Situation wollten wir Sie umgehend informieren, um Ihnen die [[56]], falls erforderlich, alternative Vorkehrungen zu treffen.',
        'Wir erwarten die Ware spätestens in der KW 15 bei uns auf Lager und werden den von Ihnen bestellten Anhänger [[57]] ausliefern. Wir werden Ihnen eine Versandbestätigung per E-Mail zukommen lassen, sobald die Ware unser Lager verlässt.',
        'Wir bedauern diese Verzögerung sehr, weil wir wissen, dass sie für Ihre Firma sicherlich mit Unannehmlichkeiten [[58]] sein wird, und möchten uns dafür in aller Form entschuldigen. Sollten Sie weitere Fragen in dieser Angelegenheit haben, [[59]] bitte nicht uns zu kontaktieren.',
        'Mit freundlichen Grüßen — Angelika Soltra, Kundenservice König Nutzfahrzeuge GmbH'
      ],
      key: { 50: 'a', 51: 'b', 52: 'a', 53: 'c', 54: 'a', 55: 'c', 56: 'b', 57: 'c', 58: 'c', 59: 'c' }
    },
    {
      id: 'w', label: 'Schreiben', title: 'Schreiben (45 Minuten)', kind: 'write',
      tasks: [
        { title: 'Aufgabe 1', situation: 'Sie arbeiten bei dem Möbelgroßhändler FRANK und sollen ein Angebot für Möbeltransporte einholen. Ihre Firma hat einige Sonderwünsche.',
          task: 'Schreiben Sie an Herrn Richard Weiden von der Firma Egon Schneider Möbeltransporte GbR. Vergessen Sie nicht den Betreff, die Anrede, eine passende Einleitung und einen passenden Schluss. Wählen Sie eine sinnvolle Anordnung der Punkte. Bearbeiten Sie folgende Punkte angemessen und ausführlich.',
          points: ['Transporte: Umfang, Häufigkeit, Abholorte (Deutschland oder Ausland)', 'Sonderwünsche: Verpackung, Zustellung, Versicherung etc.', 'Was transportiert werden soll?'] },
        { title: 'Aufgabe 2', situation: 'Sie arbeiten im Einkauf eines Herstellers von Backwaren. Ihre Kollegin Tessy Yimalgi hat Ihnen eine E-Mail geschickt.',
          task: 'Antworten Sie Frau Yimalgi. Vergessen Sie nicht den Betreff, die Anrede, eine passende Einleitung und einen passenden Schluss. Bearbeiten Sie folgende Punkte angemessen ausführlich.',
          mail: 'Betreff: Terminänderung (Mittwoch, 17. Februar) — Liebe Kolleginnen und Kollegen, ab morgen bin ich eine Woche in Urlaub. Daher wende ich mich mit einer Bitte an euch: Wie ihr schon wisst, soll unsere gesamte Abteilung eine EDV-Schulung besuchen. Die Schulung findet leider genau in der Woche statt, in der wir das Sommerfest unserer Abteilung veranstalten wollten. Was meint ihr? Könnten wir die Geschäftsleitung bitten, die Schulung abzusagen, oder sollen wir das Sommerfest verschieben? Für das Fest fehlen auch noch Ideen und Helfer? Wer ist dabei und kann mich und Karin bei der Planung und Durchführung unterstützen? Liebe Grüße, Tessy',
          points: ['Ihre Meinung zu der Schulung', 'Ideen für das Sommerfest', 'wie Sie helfen wollen'] }
      ]
    }
  ]
};
