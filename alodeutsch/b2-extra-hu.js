/* «TELC – Mittelstufe Deutsch B2» (libro de preparación de una editorial, no es material oficial de telc) · Hörverstehen.
   Preguntas, Lösungen y Transkriptionen transcritos del PDF escaneado que aportó el usuario (uso privado de estudio): libro a doble página
   con imagen de baja resolución, así que la clave se comprobó contra el contenido de cada transcripción. Cuando la clave impresa del libro
   no coincide con lo que dice el texto, la pregunta lleva una nota visible y se puntúa según la clave impresa.
   Faltan en el escaneo las páginas 260–261 del libro: por eso no están el Hören 1 del Test 5, ningún Hören del Test 6, ni el Hören 1 y 3 del Test 7.
   En el Test 5 las consignas impresas de las tres partes están intercambiadas respecto al formato; aquí se ordenan según las transcripciones.
   Lesen y Sprachbausteine de estos tests no están transcritos todavía. */
(function () {
  window.B2_OFFICIAL = window.B2_OFFICIAL || {};
  var NOTE = 'Material de editorial (libro «TELC – Mittelstufe Deutsch B2»), no un test oficial. Solo trae Hören, con la clave impresa del libro.';
  function iv(I, G, lines) { return lines.map(function (t, i) { return [i % 2 ? G : I, t]; }); }
  function mk(id, n, extra, hoeren) {
    var t = { id: id, title: 'Libro · Test ' + n, source: 'TELC – Mittelstufe Deutsch B2 (libro de preparación) · Test ' + n + ' · Hörverstehen; Lösungen y Transkriptionen del propio libro.', note: NOTE + (extra ? ' ' + extra : ''), hoeren: hoeren };
    window.B2_OFFICIAL[id] = t;
  }

  /* ---------------- Test 1 ---------------- */
  mk('k1', 1, '', {
    teil1: {
      title: 'Nachrichten im Rundfunk',
      intro: 'Sie hören nun eine Nachrichtensendung. Dazu sollen Sie fünf Aufgaben lösen. Sie hören die Nachrichtensendung nur einmal. Entscheiden Sie beim Hören, ob die Aussagen 41–45 richtig (+) oder falsch (−) sind.',
      items: {
        41: 'Ab nächstem Jahr werden Ukranen, Vietnamesen, Weissrussen und Moldauer in Tschechien eine Arbeitsgenehmigung erhalten.',
        42: 'In einem Hohlraum in Deutschneudorf wurde von Schatzsuchern Edelmetall gefunden.',
        43: 'Anfangs, als das Lexikon Wikipedia startete, herrschte nur Chaos und Anarchie, weil ein jeder mitschreiben durfte.',
        44: 'Ein Jugendlicher wollte einen Lebensmittelladen verlassen, ohne die Waren zu bezahlen.',
        45: 'Werden-Bremen steht in der Tabelle der Bundesliga vor dem FC Bayern München.'
      },
      key: { 41: '-', 42: '+', 43: '-', 44: '-', 45: '-' },
      transcript: [
        ['41', 'Tschechien. Tschechien könnte ab nächstem Jahr seinen Arbeitsmarkt für Bürger einiger Nicht-EU-Staaten öffnen. Derzeit würden mehr als 100 000 Arbeitskräfte fehlen, heißt es. Diskutiert wird in Prag über die Öffnung für die Länder Ukraine, Weißrussland, Moldau und Vietnam.'],
        ['42', 'Deutschneudorf. Auf der Suche nach dem Bernsteinzimmer wollen Schatzsucher im deutsch-tschechischen Grenzort Deutschneudorf (Sachsen) rund zwei Tonnen Gold in einem Hohlraum im Felsgestein geortet haben. Am Samstag war das Gelände mit Spezialmessgeräten untersucht worden. Die Analyse habe ergeben, dass es sich um einen künstlich angelegten Schacht handele, an dessen Ende in rund 20 Metern Tiefe ein Hohlraum mit einem erheblichen Aufkommen von Edelmetall liege, sagte der Bürgermeister des Ortes, Heinz-Peter Haustein (FDP), der Deutschen Presse-Agentur dpa. „Am Montag soll die Bergung vorbereitet werden.“ Die Fundstelle wird nach Angaben des Kommunalpolitikers rund um die Uhr bewacht, um „Trittbrettfahrer“ fernzuhalten. Für die Bergung des vermuteten Schatzes hofft Haustein auf staatliche Hilfe.'],
        ['43', 'Mr. Wikipedia. Er ist der Mann, der die Zweifler zum Schweigen brachte. Vor mehreren Jahren startete der Amerikaner Jimmy Wales das Projekt Wikipedia, dem Online-Lexikon wurde ein baldiges Ende vorausgesagt. Ein Lexikon, bei dem jeder über jedes Thema schreiben darf und alle Einträge von jedem verändert werden können – Chaos und Anarchie schienen vorprogrammiert. Heute hat die deutsche Version von Wikipedia mehr als eine halbe Million Einträge und damit fast doppelt so viele wie der Brockhaus. Doch Jimmy Wales’ Mission, die ganze Welt mit kostenlosen Informationen zu versorgen, ist noch nicht erfüllt. Christine Elsaeßer hat ihn getroffen.'],
        ['44', 'Stuttgart. In einem Lebensmittelmarkt in der Kirchheimer Straße ist einem Detektiv am Freitagabend um 19.50 Uhr eine fünfköpfige Jugendgruppe aufgefallen, die Gegenstände in einen Rucksack packte. Als die Jugendlichen das Geschäft ohne zu bezahlen verlassen wollten, sprach der Detektiv sie an. Er wurde zur Seite gestoßen, die Diebe flüchteten. Den Rucksack mussten sie zurücklassen. Der Haupttäter ist etwa 18 Jahre alt, 1,85 Meter groß und hat dunkle Haare. Er trug eine weiße Mütze und ein hellblaues T-Shirt. Hinweise an die Polizei unter der Telefonnummer 89-90-63-33.'],
        ['', 'Salzburg. Eine 42-Jährige ist am Dienstag in Salzburg beim Canyoning schwer verletzt worden. Die Deutsche sprang aus der Wiestal-Schlucht bei Adnet aus acht Metern Höhe in ein Wasserbecken. Dabei geriet die Frau in Rückenlage und schlug auf die Wasseroberfläche wie auf einem Bett auf. Die Urlauberin erlitt schwere Rückenverletzungen. Die Rettungsmaßnahmen waren schwierig. Die 42-Jährige musste von einem Hubschrauber mit einem Seil aus der gut 50 Meter tiefen Schlucht geborgen werden.'],
        ['45', 'Düsseldorf – Der FC Bayern München hat seinen Drei-Punkte-Vorsprung an der Tabellenspitze der Fußball-Bundesliga dank eines Hattricks von Luca Toni erfolgreich verteidigt. Der Rekordmeister setzte sich bei Hannover 96 mit 3:0 durch und rangiert mit 43 Zählern unangefochten auf Platz eins vor Werder Bremen (40). Die Treffer für die Bayern erzielte der italienische Torjäger in der 58., 64. und 82. Minute. Auf Rang drei hat sich der Hamburger SV mit 37 Punkten vorgeschoben. Die Norddeutschen bezwangen im zweiten Sonntagsspiel den VfL Bochum mit 3:0 durch Treffer von Ivica Olic und David Jarolim.']
      ]
    },
    teil2: {
      title: 'Rundfunk-Interview: Meine Reise auf dem Jakobsweg',
      intro: 'Sie hören ein Rundfunk-Interview. Dazu sollen Sie zehn Aufgaben lösen. Sie hören dieses Interview nur einmal. Entscheiden Sie beim Hören, ob die Aussagen 46–55 richtig (+) oder falsch (−) sind.',
      items: {
        46: 'Der Mann hat die Reise auf dem Jakobsweg vor 5 Jahren gemacht.',
        47: 'Er konnte nicht den ganzen Weg zu Fuß zurücklegen.',
        48: 'Das Drittel des Weges hat er nicht zu Fuß zurückgelegt.',
        49: 'Bei dieser Pilgerfahrt hat er sich überfordert, die ersten Warnsignale des Körpers waren bald da.',
        50: 'Ein Kameramann hat die ganze Pilgerreise gefilmt.',
        51: 'Diese Reise war für ihn eine echte Herausforderung.',
        52: 'Einen Teil des Weges kann man mit dem Fahrrad oder zu Fuß zurücklegen.',
        53: 'Auf dem Pilgerweg gab es mehr Frauen als Männer.',
        54: 'Den portugiesischen Weg konnte er wegen der großen Waldbrände nicht fortsetzen.',
        55: 'Er hat sich darüber geärgert, was die Zeitungen nach dieser Reise über ihn geschrieben haben.'
      },
      key: { 46: '-', 47: '+', 48: '-', 49: '-', 50: '-', 51: '+', 52: '-', 53: '+', 54: '+', 55: '-' },
      notes: { 52: 'Ojo: la clave impresa del libro marca «falsch», pero el texto sugiere «richtig» (los últimos 100 km a pie y «200 km mit dem Fahrrad … oder zu Pferd»). Aquí se puntúa según la clave impresa.' },
      transcript: iv('Moderator', 'Autor', [
        'Herzlich willkommen in unserem Studio! Neben mir ist ein Mann, dessen Buch ich seit einer Woche lese, bevor ich einschlafe. Also, Sie haben das Buch „Meine Reise auf dem Jakobsweg“ geschrieben und schon nach kurzer Zeit kann man Sie einen Bestseller-Autor nennen. Sind Sie schon an solche Art von Titeln gewöhnt oder ist es ’was Neues für Sie?',
        'Das ist immerhin ’was Neues. Wenn jemand das Gegenteil sagt, dann hat er gelogen.',
        '„Meine Reise auf dem Jakobsweg“. Ich hab’ nicht gewusst, dass es einen solchen Weg gibt, bevor ich zu diesem Buch gekommen bin. Wussten Sie vor der Reise länger Bescheid oder war das Zufall?',
        'Als ich vor 5 Jahren in Compostela war, hab’ ich gehört, dass man diese Reise – auch Pilgerreise genannt – machen kann, dass man dort wandern kann, über 800 km. Zuerst ein kleines Stück durch Frankreich und dann 630 km zu Fuß durch Spanien.',
        'Das ist ein komplettes Gegenprogramm. Zuerst haben Sie extrem viel wie ein Tier gearbeitet, und dann eine extreme Wanderung. Also dann alles hinter sich lassen und nur für sich sein.',
        'Ja, das war eine echte Herausforderung. Es sind aber am Ende nicht 800 km geworden, sondern nur so 630–650 km. Ich hab’ durchaus mal den Bus genommen – getrampt.',
        'Na ja, Sie haben auch ein bisschen geschummelt, aber das darf man auch … Sie haben hinter den Kulissen gesagt, dass Sie nie barfuß gelaufen sind.',
        'Das muss man sich aber nicht so vorstellen, dass es immer romantisch und schön ist – durch die Natur und durch die Berge und so, sondern man geht da knallhart auch durch Industriegebiete, an Autobahnen entlang … das ist nicht die längste Strecke, aber ein Drittel, und das ist besonders hart, wenn man auf dem Asphalt gehen muss. Also barfuß laufen kann man dann an keiner Stelle. Überall gibt es Steine, das geht leider nicht.',
        'Na ja, ich bin dann mal weg – das haben Sie im Vorwort des Buches geschrieben. Im Sommer 2001 haben Sie sich auf den Weg gemacht – fast 700 km in 6 Wochen mit 11 kg schwerem Rucksack … Warum denn dieses ganze Gegenteil, was Sie im Leben machen?',
        'Na ja, ich hab’ mich überfordert, überdreht. Die ersten Warnsignale meines Körpers waren da, dass ich zu viel gearbeitet habe. Dann hab’ ich mir gesagt: Ruhe! Stopp! Da wollte ich ’was völlig anderes machen. Da ist der Kameramann, viele Leute, also man ist die ganze Zeit von vielen Leuten umgeben … und dann ist es halt ganz angenehm, wenn man für ein paar Wochen mal für sich ist. Da war man auf der Suche nach sich und um einen neuen Sinn zu finden. Das war eine echte Herausforderung, ob ich diese extreme Wanderung schaffe. Und ich hab’s geschafft.',
        'Mit welchen Erwartungen sind Sie dann losgezogen und haben sich diese erfüllt?',
        'Nein, mit gar keinen Erwartungen. Ich bin mit der Befürchtung losgezogen, dass ich das nicht schaffen werde. Und dann hab’ ich es geschafft, indem ich mich jeden Tag neu motiviert habe.',
        'Ja, die ersten Kilometer mitnehmen lassen …',
        'Und die letzten 100 Kilometer bin ich gelaufen.',
        'Oder man kann 200 km mit dem Fahrrad.',
        'Oder zu Pferd, das geht auch.',
        'Man hat eine romantische Vorstellung von diesem Weg. Wie kann man es sich vorstellen? Gibt es großen Verkehr auf diesem Weg?',
        'Eigentlich zu der Zeit, wo ich gelaufen bin, war nicht so großer Verkehr. Ich bin ab und zu Einzelpilgern und Einzelpilgerinnen begegnet. Es gibt sehr viele Frauen alleine auf dem Weg, und erst das Ende des Weges, die letzten 100 km trifft man auch Gruppen.',
        'Was halten Sie davon: ganz viele Frauen sind allein unterwegs.',
        'Ja. Ich glaube, Frauen sind eher bereit, im Leben sich die Frage zu stellen, wo ich bin, wo ich herkomme, wo ich hin will. Ich glaube, Frauen tun sich mit dieser Frage leichter, sich Fragen zu stellen. Männer sagen: es ist richtig so, was ich mache und so.',
        'Es ist für mich unvorstellbar, hunderte Kilometer zu laufen. Denkt man nicht daran, unterwegs abzubrechen?',
        'Na ja, nach 400 km hab’ ich mir gedacht: Oh Gott, noch mal 200 km. Aber man kann sich jeden Tag neu motivieren, richtig Spaß haben. Entdecken der Landschaft, die Begegnung mit den Menschen, und diese Stille, das hat mir schon große Freude bereitet.',
        'Haben Sie mal größere Auszeiten genommen?',
        'Ich nehme mir oft Auszeiten, wenn ich sie brauche: um zu regenerieren und einfach neu zu schreiben zum Beispiel. Ich wollte diesen Sommer den portugiesischen Jakobsweg gehen. Dieser Weg ist nicht besonders. Es ist verkehrsreich, dieser Weg. Und da läuft man dann wieder alleine … und dann bin ich in die Feuer ’reingelaufen.',
        'In die was?',
        'In die Feuer. Es gab diese schrecklichen Brände, wissen Sie, und ich bin 4–5 Tage gelaufen – da sind es 50–60 km geworden. Es hat also ein zweites Mal nicht geklappt.',
        'Es sind auch ganz viele persönliche Dinge in dem Buch geschrieben. Ich denke dabei an das Tagebuch. Und wenn man das Buch ’rausgibt, ist es denn nicht komisch, dass man es die ganze Welt lesen kann, die eigenen Gedanken und so …',
        'Erstmal nicht. Da hab’ ich auch nicht gedacht, dass es so viele Leute kaufen werden. Ich hab’ so viel ’rausgelassen, wie ich glaube, ich ’rauslassen konnte.',
        'Und dann sind Sie in den Schlagzeilen der Zeitungen … Hat es Sie geärgert oder haben Sie damit gerechnet?',
        'Ich habe das gar nicht befürchtet, dass es jeden Tag in den Schlagzeilen steht. Und 5 Tage lang jeden Tag in der Bildzeitung, das hab’ ich auch nicht erwartet. Und man kann nicht ein Buch ’rausgeben und denken: oh Gott, was könnte daraus die Bildzeitung machen? In diesem Sinne ist es mir egal.',
        'Wir freuen uns jedenfalls sehr, dass Sie das Buch geschrieben haben.',
        'Ich danke für Ihr Interesse.'
      ])
    },
    teil3: {
      title: 'Fünf kurze Texte',
      intro: 'Sie hören jetzt fünf kurze Texte. Dazu sollen Sie fünf Aufgaben lösen. Sie hören diese Ansagen nur einmal. Entscheiden Sie beim Hören, ob die Aussagen 56–60 richtig (+) oder falsch (−) sind.',
      items: {
        56: 'Auf dem Ostermarkt können junge und alte Besucher traditionelle Eier färben.',
        57: 'Eine Rettungsaktion für die Bahn wird im Herbst gestartet.',
        58: 'Die Faxnummer der Redaktion ist: 05 11 599 46 76.',
        59: 'Wer die Bahn-Card-Rabatt oder Bahn-Card 100 kauft, kann öffentliche Verkehrsmittel bis zum Reiseziel kostenfrei nutzen.',
        60: 'Auf der A3 Richtung Passau ist die Fahrbahn gesperrt.'
      },
      key: { 56: '-', 57: '-', 58: '-', 59: '+', 60: '-' },
      transcript: [
        ['56', 'Alle Jahre wieder, für die Bewohner von Speicher und Liebhaber von Ostermärkten, findet in Speicher der Ostermarkt statt. Die Vielfältigkeit des gesamten Neuwarenangebotes für Familie (u. a. Glückwunschkarten), Leib (u. a. heiße Bockwurst mit Brot) und Seele (u. a. Mosel-Rieslingwein- und Sekt) lohnt einen Besuch bei jedem Wetter. Desweiteren wird ein umfangreiches Rahmenprogramm u. a. mit dem schon (fast) traditionellem Eierlauf für Superspaß bei den kleinen und großen Besuchern sorgen. Hier wird jeder schnell ins Geschehen mit einbezogen – ob Zuschauer oder Akteure, ob jung oder alt. Die Veranstaltung startet am 2. März um 14 Uhr und endet um 18 Uhr. Nähere Informationen erhalten Sie unter www.marktkaufleute.de.'],
        ['57', 'Herzlich willkommen bei „Mobil-Ohne-Auto“, den größten bundesweiten Aktionstagen für umweltgerechte, öffentliche und sozialverträgliche Mobilität … „Mobil-Ohne-Auto“ findet dieses Jahr an folgenden Tagen statt: MOA – Aktionssonntag: 15.6., MOA – Autofreier Hochschultag: 17.6. Retten Sie Ihre Bahn vor dem Hammer im Herbst! Neue DeineBahn-Kampagnenseite: Unterschriften- und Briefaktion finden Sie unter www.deinebahn.de'],
        ['58', 'Sie sind mit der elektronischen Ansage der ZiSH-Jugendzeitung verbunden. Hören Sie die Meldung! Einmal wöchentlich treffen sich junge Leute zur ZiSH-Konferenz, um mit Redakteuren die ZiSH-Seiten zu planen. Wenn Sie Ideen haben oder Lust mitzumachen, melden Sie sich unter zish@haz.de, unter der Telefonnummer 05 11 599 467 oder per Fax an 05 11 529 46 76, Stichwort ZiSH, oder schreiben Sie an: HAZ, Redaktion ZiSH, Karsten Röhrbein, 30148, Hannover. Das HAZ-Projekt „Zeitung in der Schule“ ist unter Telefon 05 11 529 64 67 zu erreichen.'],
        ['59', 'Sehr geehrte Dame, sehr geehrter Herr! Sie sind mit der automatischen Ansage der Deutschen Bahn verbunden. Fahren Sie im Anschluss an Ihre Bahnreise kostenlos mit öffentlichen Verkehrsmitteln weiter – mit Ihrer Fernverkehrsfahrkarte mit BahnCard-Rabatt oder auch mit Ihrer BahnCard 100. Mit dem City-Ticket können Sie in vielen deutschen Städten kostenlos per Bus, S-Bahn und Straßenbahn oder U-Bahn vom Zielbahnhof zu Ihrem Reiseziel im Stadtgebiet weiterfahren. Und das bei Ihrer Hin- und Rückfahrt. Voraussetzung: Sie kaufen ein Ticket mit BahnCard-Rabatt und der Zielbahnhof Ihrer Zugreise ist über 100 Kilometer entfernt und Ihr Zielort liegt im Geltungsbereich von City-Tickets. City-Ticket kostet Sie keinen Cent mehr und wird automatisch bei Reisen in die teilnehmenden Städte auf Ihrer DB-Fahrkarte eingetragen.'],
        ['60', 'Guten Morgen liebe Zuhörerinnen und Zuhörer! Sie hören jetzt den Verkehrsfunk. A3 Nürnberg Richtung Passau zwischen Ausfahrt Sinzing und Kreuz Regensburg Gefahr durch Gegenstände auf der Fahrbahn. Ein Baumstamm liegt auf der Straße. Fahren Sie bitte langsam! A8 München Richtung Salzburg zwischen Ausfahrt Weyarn und Ausfahrt Irschenberg Gefahr durch defekten LKW, rechter Fahrstreifen blockiert. Vorsicht! Hier befinden sich Personen auf der Fahrbahn. Fahren Sie bitte langsam! A9 Nürnberg Richtung München zwischen Ausfahrt München-Freimann und Ausfahrt München Frankfurter Ring vier Kilometer Stau. Nach einem Unfall ist der linke Fahrstreifen gesperrt.']
      ]
    }
  });

  /* ---------------- Test 2 ---------------- */
  mk('k2', 2, '', {
    teil1: {
      title: 'Nachrichten im Rundfunk',
      intro: 'Sie hören nun eine Nachrichtensendung. Dazu sollen Sie fünf Aufgaben lösen. Sie hören die Nachrichtensendung nur einmal. Entscheiden Sie beim Hören, ob die Aussagen 41–45 richtig (+) oder falsch (−) sind.',
      items: {
        41: 'Der Bau des höchsten Gebäudes der Welt in Dubai hat eine Milliarde Dollar gekostet.',
        42: 'Nach der Aussage der Bundesbank wirkt sich die abkühlende US-Konjunktur auffallend auf die deutsche Industrie aus.',
        43: 'Die niedersächsischen Grünen haben vor, viel Geld in die Bereiche Klimaschutz und Bildung zu stecken.',
        44: 'Die Freiburger FC hat das Finale verloren.',
        45: 'Am Nachmittag herrscht Windstille und die Temperaturen steigen im Norden und Nordosten auf 2 bis 7 Grad, im Westen und Südwesten auf 6 bis 11 Grad.'
      },
      key: { 41: '+', 42: '-', 43: '+', 44: '+', 45: '-' },
      transcript: [
        ['41', 'Dubai. Ein Wolkenkratzer in dem Emirat ist seit Samstag mit 512 Metern das höchste Gebäude der Welt. Der Burdsch Dubai („Turm von Dubai“) löst nach Angaben des Bauträgers Emaar den Rekordhalter, das 508 Meter hohe Gebäude Taipei 101 in Taiwan ab. Bis Ende des Jahres soll das eine Milliarde Dollar teure Gebäude in dem Wüstenstaat weiter wachsen. Die endgültige Höhe geben die Bauherren wegen möglicher Konkurrenten noch nicht bekannt, sie soll aber bei weit mehr als 700 Metern liegen.'],
        ['42', 'Frankfurt/Main. Die Bundesbank befürchtet keine gravierenden Auswirkungen der abkühlenden US-Konjunktur auf das Wachstum in Deutschland. Dies schreibt die Bundesbank in ihrem am Montag veröffentlichten Monatsbericht für Februar. Die Bundesbank erwartet für dieses Jahr in Deutschland ein Wachstum von 1,9 Prozent. 2007 war das Bruttoinlandsprodukt noch um 2,5 Prozent gestiegen. Das deutsche Banksystem hat die Turbulenzen an den Finanzmärkten dem Monatsbericht zufolge insgesamt „gut gemeistert und seine Stabilität und Funktionsfähigkeit behauptet“. Bei den deutschen Unternehmen seien keine größeren Planrevisionen und bei den privaten Haushalten keine erheblichen Vertrauensverstörungen zu erkennen.'],
        ['', 'Bei der Berlinale zeichnete die Jury als beste Schauspielerin unter Vorsitz des französisch-griechischen Regisseurs Constantin Costa-Gavras die Britin Sally Hawkins mit einem Silbernen Bären aus. Sie bezauberte das Festivalpublikum als ewig gut gelaunte, sich dem Erwachsenwerden verweigernde 30-jährige Poppy in Mike Leighs Komödie „Happy-Go-Lucky“. Bester Darsteller wurde der Iraner Reza Naji als arbeitsloser Familienvater in „Der Gesang der Spatzen“ von Majid Majidi.'],
        ['43', 'Hannover. Klimaschutz und Bildung sind die zentralen Themen im Landtagswahlkampf der niedersächsischen Grünen. Rund 100 Millionen Euro zusätzlich wollen die Grünen in diese Bereiche investieren, wenn sie bei den Wahlen im Januar erfolgreich abschneiden. „Unsere Vision ist, dass Niedersachsen seinen Restbedarf an Energie künftig regenerativ deckt und dass es gerechte Chancen für jedes Kind gibt“, sagte Spitzenkandidatin Ursula Helmhold am Donnerstag in Hannover. Mit einer Reform der Erbschaftsteuer, genaueren Steuerprüfungen sowie einer effizienteren Organisation der Landesverwaltung solle das „Sofortprogramm“ finanziert werden, erklärte Fraktionschef Stefan Wenzel. Ziel der Grünen ist es, die schwarz-gelbe Koalition im Landtag abzulösen und drittstärkste Fraktion zu werden.'],
        ['44', 'Der Fußball-Zweitligist SC Freiburg hat ein Blitzturnier im Freiburger Möslestadion gewonnen. Die Mannschaft von Trainer Robin Dutt besiegte im Finale den Verbandsligisten und Lokalrivalen Freiburger FC mit 2:0. Dabei wirkte auch Oliver Barth (früher Stuttgarter Kickers) als Gastspieler mit.'],
        ['45', 'Und nun zum Wetterbericht. Am Nachmittag scheint von Niederrhein und Ruhr über den Thüringer Wald bis ins Vogtland und weiter südlich neben wenigen dünnen Wolken die Sonne. Weiter im Norden und Nordosten bleibt es meist trüb durch Nebel oder Hochnebel. Stellenweise fällt etwas Nieselregen, dabei kann es zu Glatteis kommen. Der Wind weht schwach aus unterschiedlichen Richtungen, im Norden und Nordosten mäßig bis frisch mit einzelnen Sturmböen an der Ostsee und auf den Bergen. Die Temperaturen klettern auf 2 bis 7, im Westen und Südwesten auf 6 bis 11 Grad.']
      ]
    },
    teil2: {
      title: 'Rundfunk-Interview: Windsurfer Björn Dunderbeck',
      intro: 'Sie hören ein Rundfunk-Interview. Dazu sollen Sie zehn Aufgaben lösen. Sie hören dieses Interview nur einmal. Entscheiden Sie beim Hören, ob die Aussagen 46–55 richtig (+) oder falsch (−) sind.',
      items: {
        46: 'Beim Wettkampf auf Sylt gibt es mehr Zuschauer als bei anderen Surf-Wettkämpfen.',
        47: 'Die Wind-Bedingungen sind auf Sylt sehr unberechenbar.',
        48: 'Herr Dunderbeck ist noch immer so fit wie früher.',
        49: 'Im Freestyle hat er schon starke Gegner, die viel jünger sind als er.',
        50: 'Beim Slalom muss er auch mit starken Gegnern rechnen.',
        51: 'Sein Hobby ist, solche Strände zu suchen, wo sich im Windsurfen noch niemand ausprobiert hat.',
        52: 'Er hat ständig Angst vor den Haien.',
        53: 'Seine Kinder haben noch ein bisschen Angst vor dem Wasser, obwohl er sie schon aufs Brett gesetzt hatte.',
        54: 'Falls er auf Sylt siegen würde, würde er dies zuerst gerne mit seinen Freunden feiern.',
        55: 'Er hat zwei Kinder und sie gehen mit ihm auf Reisen.'
      },
      key: { 46: '+', 47: '+', 48: '-', 49: '+', 50: '-', 51: '+', 52: '-', 53: '-', 54: '-', 55: '-' },
      transcript: iv('Moderator', 'Björn Dunderbeck', [
        'Herzlich willkommen, Björn Dunderbeck! Vielen Dank, dass du dir Zeit genommen hast, neben deinen vielen Terminen zu uns zu kommen. Man sieht Surfer in Filmen mit blonden Haaren, muskulös, ist stundenlang müßiggängig am Meer und wartet … Was ist eigentlich die wichtigste Eigenschaft eines Surfers?',
        'Viel Spaß dabei zu haben. Warten tut man wenig. Man fährt dorthin, wo die Passatwinde wehen, z. B. auf die Kanarischen Inseln.',
        'Björn, du bist mit 35 Weltmeistertiteln der erfolgreichste aktive Profi-Sportler der Welt. Ist das für dich nur eine Statistik oder macht dich das auch stolz?',
        'Das zeigt auf jeden Fall, dass ich seit Jahren sehr erfolgreich bin. Aber am allerwichtigsten ist immer noch, dass ich unglaublichen Spaß dabei habe. Und den werde ich auch noch einige Jahre sicher haben.',
        'Die Welle ist auf einer Seite der Partner. Spürt man, ob sie Freund oder Feind ist?',
        'Sie ist ein Freund.',
        'Immer? Jede Welle ist ein Freund?',
        'Na, nicht jede Welle, aber ich bin damit aufgewachsen.',
        'Kann man also das Wasser lesen, also wissen, wo die Gefahr lauert?',
        'Das ist jahrelange Erfahrung. Ich hab’ das Glück gehabt, damit aufgewachsen zu sein, auf den Kanarischen Inseln. Man liebt die Welle, die Herkunft, wo sie herkommt, auch die Wellen sind von der Sonne beeinflusst. Das ist jahrelange Erfahrung. Das geht nicht von heute auf morgen. Ich spüre es schon, seit langem.',
        'Hat man auch Angst?',
        'Respekt soll man haben, Angst nicht, da ich am Meer groß geworden bin. Man muss aber wissen, wo die Grenzen sind, auf jeden Fall.',
        'Was denkt man, wenn über einen ein 10 m Brecher einbricht?',
        'Über 10 m ist alles kaputt. Das ist eine riesengroße Waschmaschine. Man weiß nicht, was oben oder unten ist.',
        'Du warst 1985 das erste Mal auf Sylt dabei. Was ist das Besondere?',
        'Es ist ein großer, guter Event mit viel Publikum. Im Unterschied zu anderen Veranstaltungen, bei denen hundert Leute am Strand stehen, schauen auf Sylt über Hunderttausende zu. Wenn ich dort auf dem Wasser bin, bekomme ich die Begeisterung voll mit. Die Wind-Bedingungen auf Sylt empfinde ich als sehr herausfordernd. An einem Tag kann der Wind zwischen null und acht Windstärken variieren.',
        'Du bist nicht mehr der Jüngste. Meldet sich dein Körper zu Wort?',
        'Ja. Ab und zu fühle ich mich schon etwas lätschig. Wenn man zwei, drei Tage in Folge fünf Stunden surft, braucht man seine Zeit, um zu regenerieren. Dementsprechend denke ich jetzt mehr mit, wenn ich einen Contest fahre, gebe nicht immer nur Vollgas. Der Colgate World Cup Sylt dauert zum Beispiel zehn Tage, da muss man natürlich aufpassen, das macht man auch nicht die ganze Zeit, dass man auch fit bleiben kann. Da hilft mir meine Erfahrung wieder sehr weiter.',
        'Dann hast du an den Rücktritt noch nicht gedacht …',
        'Nein, darüber hab’ ich noch nicht nachgedacht. Seit 2002 mache ich viel mehr Slalom.',
        'In diesem Punkt hast du allen Konkurrenten viel voraus.',
        'Ja, aber im Freestyle-Bereich zum Beispiel hab’ ich eigentlich gar keine Chance mehr. Da sind die meisten guten Fahrer um die zwanzig Jahre alt. Beim Slalom hingegen braucht man mehr Körpergewicht und Wassererfahrung. Deshalb sehen die Jungen da eigentlich überhaupt kein Land.',
        'Wie hat sich Windsurfen in den vergangenen zwanzig Jahren gewandelt?',
        'Früher gab es sechs große Events im Jahr und jeder Fahrer hat alle Disziplinen mitgemacht, heute spezialisiert sich jeder. Windsurfen bleibt die Mutter aller Funsportarten. Jetzt gehen die Leute Mountainbiken, Snowboarden oder Kiten. Diese Einstellung zu Funsportarten wurde vom Windsurfen stark beeinflusst.',
        'Für ein Projekt mit befreundeten Surfern reist du weit und suchst einzigartige Strände. Wo ist der beste Surfer-Strand der Welt?',
        'Dieses Projekt ist ein Glücksfall für mich. Denn es ist einfach eine große Herausforderung, dahin zu fahren, wo noch keiner war, ins Niemandsland. Aber es ist schwierig vom schönsten Spot zu sprechen. Zu den konstantesten gehören für mich die Kanarischen Inseln. Das hat aber auch ganz pragmatische Gründe. Um in besondere Reviere, wie das an der nordaustralischen Küste zu kommen, brauche ich zwei, drei Tage. Das ist natürlich super, wenn man da dann auch länger ist, aber das geht eben nicht immer.',
        'Du bist also ständig unterwegs. Ein Inselhüpfer sozusagen.',
        'Ja, seit 22 Jahren fahre ich … Einmal nach Norddeutschland, dann fahre ich nach Costa Brava in Spanien, dann nach Australien und auf die Kanaren …',
        'Und warst du mal verletzt? Die Korallenriffe sind in der Nähe und Korallen sind nicht ungefährlich.',
        'Man muss Korallen entfernen, mit Limonade oder so, weil sie Blutvergiftung verursachen können.',
        'Welche Tierbegegnungen waren dabei besonders beeindruckend?',
        'Ich hab’ schon sehr viele Haie gesehen. Wenn ich viele sage, dann meine ich mehr als hundert. So lange man nicht drauf fällt, passiert aber eigentlich gar nichts. Besonders schön waren die Erlebnisse mit Walen vor Hawaii. Allerdings ist das Problem, dass die einen oft gar nicht richtig sehen. Wenn sie aus dem Wasser und auf dich springen, dann bist du platt. Bisher hatte ich immer Glück, aber da steigt der Adrenalinspiegel schon ganz schön. Und so ein Wal riecht übrigens verdammt fischig.',
        'Du hast zwei Kinder, Familie …',
        'Drei mittlerweile.',
        'Drei? Das hab’ ich nicht mitgekriegt. Wie jung ist das dritte?',
        'Fünf Monate.',
        'Fünf Monate? Okay. Was sagt deine Familie dazu, dass du immer noch nicht vom Wettkampfsport lassen kannst?',
        'Zu vielen Spots kommen auch meine Kinder mit. Nach Hawaii zum Beispiel oder zum Colgate World Cup Sylt. Das ist schön für sie, denn so sehen sie etwas von der Welt.',
        'Werden die vielleicht auch Windsurfer?',
        'Fürs Windsurfen sind sie ja noch zu jung. Alba ist drei und Liam zwei Jahre alt. Aber natürlich hab’ ich die schon mal aufs Brett gesetzt. Und dann sind sie nur sehr schwierig wieder aus dem Wasser rauszukriegen. Ich denke, dass sie es bald mal probieren werden.',
        'Welche Ziele hast du für den Colgate World Cup auf Sylt?',
        'Im Slalom auf jeden Fall den ersten Platz. Und im Wellenreiten ist das auch möglich, dafür bräuchte ich aber viel Wind.',
        'Von den Windsurfern sagt man, sie feiern häufig. Wie würdest du einen Sieg auf Sylt denn feiern?',
        'Naja, natürlich ist eine lustige Feier mit den Freunden immer schön. Aber ich werd’ ja auch älter und damit etwas ruhiger. Was ich bei einem Sieg auf Sylt machen würde? Da lassen wir uns mal überraschen …',
        'Gut, Björn. Dann vielen Dank für das Interview. Und ich wünsche dir auf jeden Fall viel Erfolg für den Colgate Worldcup auf Sylt.',
        'Danke schön.'
      ])
    },
    teil3: {
      title: 'Fünf kurze Texte',
      intro: 'Sie hören jetzt fünf kurze Texte. Dazu sollen Sie fünf Aufgaben lösen. Sie hören diese Ansagen nur einmal. Entscheiden Sie beim Hören, ob die Aussagen 56–60 richtig (+) oder falsch (−) sind.',
      items: {
        56: 'Trainingsausfahrten mit dem Rennvelo samstags empfehlen sich nur für besonders geübte Radfahrer.',
        57: 'Auf dem Blumenmarkt in Groningen kann man auch Gartenzubehör kaufen.',
        58: 'In der Zooschule wird Unterricht nicht nur für Schüler, sondern auch für Rentner erteilt.',
        59: 'Ein Markt wird Ende Juli für Kinder bis 16 Jahre in Stuttgart veranstaltet, wo sie ihre alten Bücher und Spielzeuge verkaufen können.',
        60: 'Auf der A94 zwischen München und Burghausen muss man langsam fahren, weil sich auf der Straße Gegenstände befinden.'
      },
      key: { 56: '-', 57: '+', 58: '-', 59: '+', 60: '-' },
      transcript: [
        ['56', 'Saisonbeginn für Rennfahrer! Ab Samstag, dem 1. März, unternimmt der Veloclub Riehen jeden Samstag Trainingsausfahrten mit dem Rennvelo. Auch Nicht-Mitglieder herzlich willkommen. Treffpunkt ist um 13.30 Uhr beim Gemeindehausbrunnen in Riehen. Die Distanzen werden den Begebenheiten (Wetter, Teilnehmer, bzw. Trainingsstand) angepasst. Für junge oder angehende Rennfahrer finden jeweils am Dienstag-/Donnerstagabend Trainings statt in Zusammenarbeit mit dem regionalen Radsportzentrum. Im Frühling führt der Verein zudem eine Velo-Ferienwoche (Rennvelo) vom 26. April bis 3. Mai in Uzès/Südfrankreich durch. Informationen und Hinweise zu diesen Aktivferien finden Sie auf der Webseite www.velo.ch.'],
        ['57', 'Und hier ein Tipp nicht nur für Hobbygärtner! Am Karfreitag, dem 21. März, wird die Stadt Groningen zu einem wahren Treffpunkt für Blumen- und Pflanzenliebhaber. An diesem Tag findet der größte Blumen- und Pflanzenmarkt der nördlichen Niederlande statt. Der Blumenmarkt in der Innenstadt zieht mit seinen über hundert Ständen alljährlich rund 150.000 Besucher an. Die Marktstände sind auf dem „Grote Markt“, dem Fischmarkt, dem „A-Kerkhof“ und in der „Oude Ebbingestraat“ zu finden. Im Angebot ist so gut wie alles, was grünt und blüht. Hier werden die verschiedensten Schnittblumen, Blumenzwiebeln, Zimmerpflanzen, Saatgut, Gartenpflanzen und natürlich diverse Gartenartikel angeboten. Verpassen Sie doch diese Angelegenheit auf gar keinen Fall!'],
        ['58', 'Liebe Schüler und Lehrer! Herzlich willkommen in der Zooschule Dresden! Ziele der Zooschule sind vor allem, Schüler an lebende Tiere heranzuführen, Probleme des Umweltschutzes zu erörtern und Fragen der Ökologie und Ethologie zu erklären. Die Zooschule Dresden hat für die unterschiedlichen Schulformen auch eigene Unterrichtsprogramme erarbeitet. Die Zooschule führt außerdem Fortbildungen für Lehrer und Studenten durch und leitet Führungen für andere Gruppen (Senioren, Vereine, usw.). Telefonisch sind wir erreichbar unter (0351) 47 80 638. Unsere Faxnummer ist: (0351) 47 80 639.'],
        ['59', 'Alle Jahre wieder … Auf dem Karlsplatz von Stuttgart findet am Samstag, dem 28. Juli, von 10 bis 16 Uhr ein Kinderflohmarkt statt. Kinder verkaufen an Kinder: vom Buch über Comics bis zum Puppenkleid. Kinder zwischen sieben und sechzehn Jahren, die etwas verkaufen möchten, können sich beim Jugendamt unter der Telefonnummer 2 16 31 95 anmelden. Kommen Sie und machen Sie mit!'],
        ['60', 'Die Verkehrsmeldungen. A70 Bamberg Richtung Bayreuth zwischen Ausfahrt Kulmbach/Neudrossenfeld und Dreieck Bayreuth/Kulmbach Stau durch defekten LKW, rechter Fahrstreifen blockiert. Vorsicht! Der Stau befindet sich hinter einer Kurve. A93 Holledau Richtung Regensburg zwischen Kreuz Regensburg und Ausfahrt Regensburg-Königswiesen linker Fahrstreifen wegen eines Unfalls blockiert. Anhänger umgefallen. 5 km Stau. A94 Passau Richtung München zwischen Ausfahrt Burghausen und Ausfahrt Neuötting Gefahr durch Gegenstände auf der Fahrbahn. Stockender Verkehr!']
      ]
    }
  });

  /* ---------------- Test 3 ---------------- */
  mk('k3', 3, '', {
    teil1: {
      title: 'Nachrichten im Rundfunk',
      intro: 'Sie hören nun eine Nachrichtensendung. Dazu sollen Sie fünf Aufgaben lösen. Sie hören die Nachrichtensendung nur einmal. Entscheiden Sie beim Hören, ob die Aussagen 41–45 richtig (+) oder falsch (−) sind.',
      items: {
        41: 'Nach Japan und den USA ist China derzeit die drittgrößte Wirtschaftsmacht.',
        42: 'Sowohl Air Berlin als auch Lufthansa haben vor, die Fluggesellschaft Condor aufzukaufen.',
        43: 'Vattenfall hat am Donnerstag Störfall gemeldet.',
        44: 'Schauspieler Götz George erhält dieses Jahr von dem Fernsehkanal RTL einen Ehrenpreis.',
        45: 'Im Westen des Landes muss man wegen möglichen Glatteises aufpassen.'
      },
      key: { 41: '+', 42: '-', 43: '+', 44: '+', 45: '-' },
      transcript: [
        ['41', 'China. China hat Deutschland als drittgrößte Wirtschaftsnation der Erde überholt. Seit dem Jahr 1999 ist China mit Wachstumsraten von rund 10 % bereits an Italien, Frankreich und Großbritannien vorbeigezogen. Heute sind nur noch die Volkswirtschaften der USA und Japans größer. Dass Deutschland auch seinen Titel als Exportweltmeister an China abgeben muss, scheint nur noch eine Frage von Monaten.'],
        ['42', 'Berlin. Die Fluggesellschaft Air Berlin will den Konkurrenten Condor übernehmen. Mit dessen Großaktionär Arcandor sind sich die Berliner bereits einig, noch könnten allerdings die Lufthansa und das Kartellamt das Geschäft blockieren. In den vergangenen Monaten hatte Air Berlin bereits die Konkurrenten dba und LTU gekauft. Jetzt könnte das Unternehmen im Langstreckengeschäft an die Lufthansa heranrücken und die TUIfly weit hinter sich lassen. Die Lufthansa will zügig über die Frage entscheiden, ob sie von ihrem Vorkaufsrecht bei Condor Gebrauch macht. „Wir entscheiden immer sorgfältig, aber zügig“, sagte Lufthansa-Chef Wolfgang Mayrhuber. Lufthansa besitzt knapp 25 % an Condor und hat zudem ein Vorkaufsrecht.'],
        ['', 'Frankfurt. Der Kurs des Euro hat sich am Montag mangels neuer Impulse unter der Marke von 1,47 US-Dollar eingependelt. Die europäische Gemeinschaftswährung kostete am späten Nachmittag 1,46 Dollar. Die Europäische Zentralbank hatte den Referenzkurs am Mittag auf 1,46 Dollar festgesetzt. Der Dollar kostete damit 0,68 Euro.'],
        ['43', 'Kiel. Ein Zwischenfall im Atomkraftwerk Krümmel im März war nach offiziellen Angaben schwerwiegender als bisher bekannt. Das teilte das Sozialministerium von Schleswig-Holstein am Donnerstag in Kiel mit. Nach dem Wechsel eines defekten Brennelements im März habe die Inspektion ergeben, dass das Hüllrohr eines Brennstabes beschädigt gewesen sei und daher Brennstoff ausgewaschen wurde. Der Betreiber Vattenfall habe dies am Donnerstag gemeldet.'],
        ['44', 'Köln. Schauspieler Götz George wird in diesem Jahr mit dem Ehrenpreis der Stifter des Deutschen Fernsehpreises ausgezeichnet. „Götz George hat seine außergewöhnliche Bandbreite in unzähligen Kino- und Fernsehproduktionen unter Beweis gestellt“, erklärte die Vorsitzende der Stifter und RTL-Geschäftsführerin Anke Schäferkordt gestern in Köln. George zeigte sich sehr erfreut. Zu sehen ist die Gala am 29. September um 20.15 Uhr auf RTL.'],
        ['45', 'In der Nacht zum Dienstag breiten sich Nebel und Hochnebel langsam weiter südwestwärts aus. In den östlichen Landesteilen fällt zeitweise leichter Regen oder Nieselregen. Dabei muss mit Glatteis oder Raureif gerechnet werden. Trocken und meist sternenklar bleibt es von Eifel, Saar und Schwarzwald bis an die Alpen. Morgens kann es an Flüssen und Seen stellenweise Nebel geben. In der Mitte und im Süden kühlt es ab auf 0 bis −5, in Tal- und Muldenlagen auf −3 bis −8 Grad. Unter der dichten Bewölkung im Norden bleibt es mit 4 bis 1 Grad etwas milder.']
      ]
    },
    teil2: {
      title: 'Rundfunk-Interview: Leben in Hongkong',
      intro: 'Sie hören ein Rundfunk-Interview. Dazu sollen Sie zehn Aufgaben lösen. Sie hören dieses Interview nur einmal. Entscheiden Sie beim Hören, ob die Aussagen 46–55 richtig (+) oder falsch (−) sind.',
      items: {
        46: 'Die junge Frau sucht gerade ein Stipendium.',
        47: 'Zuerst wurde ihre Bewerbung zurückgewiesen.',
        48: 'In China hat sie die Möglichkeit, ein internationales Abitur abzulegen.',
        49: 'Hong Kong hat wesentliche wirtschaftliche Beziehungen mit New York.',
        50: 'Die junge Frau mag Hong Kong besonders wegen seiner Vielfalt.',
        51: 'Hong Kong hält sie für eine relativ billige Stadt.',
        52: 'In Hong Kong sind Läden und Gasthöfe bis spät in die Nacht geöffnet.',
        53: 'Die weltberühmte Licht- und Tonshow ist an 10 Gebäuden zu sehen.',
        54: 'Früher war die Wirtschaft von Hong Kong nicht so stabil wie heute.',
        55: 'Heutzutage werden in Hongkong außer der englischen Sprache drei chinesische Mundarten gebraucht.'
      },
      key: { 46: '-', 47: '-', 48: '+', 49: '-', 50: '+', 51: '-', 52: '+', 53: '-', 54: '+', 55: '-' },
      transcript: iv('Moderator', 'Schülerin', [
        'In unser Studio haben wir ein Mädchen eingeladen, das schon eine Weile in Hongkong lebt, aber sie ist jetzt in Deutschland zu einem kurzen Besuch. Herzlich willkommen in unserem Studio! Wir freuen uns, dass du dir Zeit genommen hast, auch zu uns zu kommen. Wie und woher bist du denn dorthin gekommen, wo lebst du jetzt und was machst du da?',
        'Ich hab’ gerade nach Stipendien gesucht, als ich auf einen Verein gestoßen bin, das war der Deutsche Verein der Vereinigten Kollegien der Welt. Das war noch vor 2 Jahren, wo ich mich dann für eine Bewerbung gemeldet habe, die mir damals unerreichbar schien. Aber zu meinem höchsten Glück hab’ ich doch ein Stipendium erhalten. Dadurch kam ich nach Hong Kong und ich habe zwei Jahre lang am United World College – das ist eine internationale Schule – gelernt. Dort hab’ ich Deutschland vertreten und nach zwei Jahren kann ich das internationale Abitur machen. Ich lerne vor allem, aber wenn ich Freizeit habe, dann gehen wir oft nachts mit meinen Freunden in das Getümmel der Märkte oder auf eine naheliegende Insel … zum Baden oder einfach zum Nichtstun.',
        'Wie würdest du kurz das Land, wo du momentan lebst, beschreiben?',
        'Ja. Da sind die chinesische und die westliche Kultur miteinander vermischt, deshalb findet dort ein jeder für sich einen Ort, wo er sich wohl fühlt. Sei es ein buddhistisches Kloster oder ein kleines chinesisches Dorf, mit Mauern umgeben, oder eine Anzahl von modernen Wolkenkratzern. Das Leben pulsiert da Tag und Nacht und man glaubt, es gibt da keine Minute lang Einhalt. Und zudem noch das angenehme Klima! Mit 100 % Luftfeuchtigkeit und ständigem Sonnenschein.',
        'Und Hong Kong?',
        'Hong Kong ist eine wunderschöne Stadt im Südosten von China. Die wird für eine der schönsten Städte der Welt gehalten, viele erwähnen sie sogar als das New York von Asien. Auf den Straßen von Hong Kong wimmelt eine multinationale Welt, mit Hunderten von Möglichkeiten: mit Filmfestivals, heiligen Orten, bunten Märkten und zahlreichen Museen. Und wenn das noch nicht genug sein sollte, dann ist die Stadt ein idealer Ausgangspunkt zum Reisen. In jede Himmelsrichtung kann man in märchenhafte Länder reisen und zudem kann man das relativ billig tun.',
        'Inwiefern ist denn das, wo du lebst, besser als Deutschland?',
        'Hmh. Also, vorher hab’ ich in Deutschland in einer Kleinstadt gelebt, – achtzehn Jahre lang. So dass das Gewimmel in Hong Kong für mich gut ist. Man muss sich keine Sorge darum machen, dass jedes Gasthaus oder Klub schließen wird, weil es zu spät ist. Was mich noch in Hong Kong fasziniert, dass diese Stadt eine sehr vielfältige Stadt ist, und so kann ich vielen Menschen anderer Nationalität begegnen. Und das ist sehr interessant für mich.',
        'Und wie ist der Verkehr dort?',
        'Tja, also mit den öffentlichen Verkehrsmitteln bin ich völlig zufrieden. Die sind sehr bequem, schnell und man kann in relativ kurzer Zeit überall hinkommen.',
        'Wie verträgst du das Klima?',
        'Fantastisch! Das sonnige, schwüle, warme Wetter ist besser für mich, als das kühle Wetter mit viel Wind in Deutschland. Na ja, aber es ist vom Menschen abhängig, wer was gerne hat. Ich persönlich fühle mich fröhlicher und besser, wenn es das ganze Jahr hindurch Sommer ist.',
        'Und gibt es auch Nachteile?',
        'Ja, die Stadt ist teurer und die Luft ist sehr verschmutzt.',
        'Und was vermisst du dort?',
        'Na ja, vor allem meine Familie und die Freunde in Deutschland … die Bratwurst, und andere deutsche Speisen.',
        'Was glaubst du, was würdest du vermissen, wenn du einmal Hong Kong verlassen würdest?',
        'Sehr vieles … vor allem die wunderschöne Stadt und die vielen Inseln, das angenehme Klima und die Mentalität der Menschen, die Lebensart dort und die chinesische Kultur … und nicht zuletzt meine Freunde natürlich.',
        'Und was ist jetzt das wichtigste Gesprächsthema in Hongkong?',
        'Hmh. Der Sommer, wer was für Reiseziele hat und was er dann tut.',
        'Hong Kong gehört seit mehr als zehn Jahren zu China. Letzte Woche wurde das Jubiläum gefeiert. Wie hat sich China auf dieses Fest vorbereitet?',
        'Es gab eine große Vorbereitung und sie begann schon vor Monaten. Sogar die Metros wurden feierlich dekoriert … die weltberühmte Show mit Licht- und Toneffekten durfte auch nicht fehlen. Und dies wurde mit weiteren zehn Gebäuden ergänzt. Über dieses Spektakel muss man wissen, dass es jeden Abend um 8 Uhr beginnt und ca. 15–20 Minuten lang dauert. An den Wolkenkratzern werden die Lichter hin- und hergeschaltet – mit Musik abgestimmt – und es scheint so, als ob die Lichter zur Musik tanzen würden. Diese Show ist einzigartig in der Welt, und sie wurde zum 1. Juli noch faszinierender gemacht. Es gab sogar eine große Parade, wo die chinesische Kultur dargestellt wurde. Es gab Drachen- und Löwentänze, Fallschirmspringer, ein großes Feuerwerk und auf den Straßen marschierte die chinesische Armee.',
        'Und was sagt man: inwiefern veränderte sich Hong Kong in den letzten 10 Jahren?',
        'Von den Leuten hab’ ich gehört, dass keine große Veränderung spürbar war. Es ist kaum zu spüren, dass Hong Kong zu China angeschlossen ist. Na ja, von den Banknoten verschwand das Bild von Königin Elisabeth, und überall sieht man jetzt das Symbol von Hong Kong: die Blume Bankinia. Die chinesischen Flaggen sind neben der Hong Konger erschienen und neue Nationalfeiertage wurden eingeführt, wie zum Beispiel der Geburtstag von Buddha. Die Wirtschaft hat sich auch gewissermaßen verändert, sie wurde etwas stärker und stabiler. Und was ich noch interessant finde, die Bedeutung der englischen Sprache hat sich verändert. Die steht nicht mehr an der 2. Stelle wie früher, sondern nur noch an der 3. An der 2. Stelle steht schon eine Mundart, die der Mandarinen. Zum Beispiel in den Metros, wenn es durchgesagt wird, welche Station kommt, sagt man es zuerst auf Chinesisch, die die offizielle Mundart von Hong Kong ist. Dann kommt es auf Mandarin, und erst dann auf Englisch.',
        'Was machen die Menschen am liebsten in ihrer Freizeit?',
        'Unter den Jugendlichen ist das Karaoke-Singen am beliebtesten oder die Spielkasinos. Und nicht zuletzt für Jung und Alt das Shopping.',
        'Ja. Möchtest du dann überhaupt nach Deutschland zurückkehren?',
        'In der nahen Zukunft bestimmt nicht. Nach meinem internationalen Abitur möchte ich meine Studien irgendwo im Ausland fortsetzen, wahrscheinlich in Amerika. Und danach würde ich vielleicht gerne einen Job schon in Deutschland suchen …',
        'Vielen Dank für das Gespräch! Ich wünsche dir viel Erfolg mit deinem Abitur!',
        'Danke.'
      ])
    },
    teil3: {
      title: 'Fünf kurze Texte',
      intro: 'Sie hören jetzt fünf kurze Texte. Dazu sollen Sie fünf Aufgaben lösen. Sie hören diese Ansagen nur einmal. Entscheiden Sie beim Hören, ob die Aussagen 56–60 richtig (+) oder falsch (−) sind.',
      items: {
        56: 'Die Gartenausstellung ist ein ganzes Wochenende geöffnet.',
        57: 'Während der Woche ist die Ausstellung „Abenteuer Regenwald“ länger geöffnet als am Wochenende.',
        58: 'Es ist empfehlenswert, etwas zum Essen und Trinken mitzubringen.',
        59: 'Momentan ist das Kundentelefon der Deutschen Post besetzt.',
        60: 'Auf der A2 Richtung Dortmund ist die linke Fahrbahn gesperrt, es gibt 1 km Stau.'
      },
      key: { 56: '+', 57: '-', 58: '+', 59: '+', 60: '-' },
      transcript: [
        ['56', 'Liebe Garten- und Blumenfreunde! „Wohnen im Grünen“ ist das Hauptmotto der Gartenausstellung „Gartenträume“ in Ulm Messe von 8. bis 10. Februar. Da können Sie viele Tipps und Anregungen für die Gestaltung Ihres Gartens erhalten. Die Gartenausstellung „Gartenträume“ zeigt und bietet die Gestaltungsideen und passende Produkte. Es werden mehrere Vorführungen, wie zum Beispiel Kochen im Freien, stattfinden. Die Öffnungszeiten sind am Freitag von 10 bis 20 Uhr, am Samstag von 10 bis 19 Uhr und am Sonntag von 10 bis 18 Uhr. Eintrittspreise sind für Erwachsene 7 Euro, für Rentner 6 Euro, für Kinder bis 12 Jahre 1 Euro und für Kinder bis 4 Jahre ist der Eintritt sogar frei. Die Adresse ist: Ulm Messe, Böfingerstraße 50. Parkplätze am Messegelände sind ausreichend vorhanden. Sie können also problemlos mit dem PKW fahren. Oder nehmen Sie die S-Bahn Nr. 51.'],
        ['57', 'Was Sie auf keinen Fall versäumen sollten! Eine neue Ausstellung unter dem Titel „Abenteuer Regenwald“ präsentiert der Zoo Krefeld ab kommendem Samstag einen Monat lang in der Zooscheune. Hofer, die mit ihrem Mann, dem Naturfotografen Günter Ziesler, jahrelang die Regenwälder bereiste, bietet neben den dabei entstandenen atemberaubenden Fotos in der Ausstellung auch Zeichnungen von Harro Maas. Lebensgroße Aras, quakende Frösche und Zimmerpflanzen vollenden die Eindrücke des Betrachters in der neuen Ausstellung im Zoo, die mit ihrem Standort in der Scheune direkt neben dem Regenwaldhaus angesiedelt ist, so dass sich der Besucher vorher oder nachher im „Dschungel unter Glas“ gleich auch noch mit den „echten“ Regenwaldbewohnern auseinandersetzen kann. Der Eintritt für Kinder bis zum 16. Lebensjahr ist frei, Erwachsene müssen 7 Euro bezahlen. Die Öffnungszeiten sind: während der Woche von 9 bis 17 Uhr, und am Wochenende von 9 bis 19 Uhr.'],
        ['58', 'Ja, das Wandern ist des Müllers Lust … Am kommenden Sonnabend lädt der Bischofswerder Wanderverein e. V. seine Mitglieder und interessierte Wanderfreunde zu einer Sportwanderung auf Großens Berg und ins Polenztal ein. Treffpunkt ist um 8.30 Uhr auf dem Parkplatz „Am Alten Gasthof“ in Rückersdorf. Die Teilnehmer erwartet eine aussichts- und abwechslungsreiche Wanderung über ca. 22 km mit exotischer Fauna und heimatlicher Flora. Die Verpflegung erfolgt aus dem Rucksack. Tel. Rückfragen an Familie Jäger unter 035951 37504. Na, Lust bekommen? Dann machen Sie doch mit! Aber bitte festes Schuhwerk mitbringen!'],
        ['59', 'Guten Tag und herzlich willkommen beim Kundentelefon der Deutschen Post. Wenn Sie etwas warten müssen, kostet es im Festnetz nur 6 Cent. Bitte haben Sie noch ein wenig Geduld! Der nächste freie Serviceplatz ist für Sie reserviert.'],
        ['60', 'Und nun der Verkehrsfunk! A1 Köln Richtung Euskirchen zwischen Kreuz Köln-Nord und Köln-Lövenich ist der linke Fahrstreifen wegen eines LKW-Unfalls gesperrt. 6 km Stau. Es gibt eine Umleitung ab Köln-Nord über die A 555 bis Köln-Süd. Und im weiteren Verlauf. A1 Richtung Dortmund zwischen Kreuz Leverkusen-West und Kreuz Leverkusen 1 km Stau. Stockender Verkehr. Auf der A2 Hannover Richtung Dortmund ist die Ausfahrt Kamener Kreuz zur A1 in Richtung Bremen wegen Bauarbeiten voraussichtlich bis Ende April gesperrt. Eine Umleitung ist eingerichtet. A2 Dortmund Richtung Oberhausen zwischen Kreuz Recklinghausen und Herten 2 km Stau. Der linke Fahrstreifen ist wegen eines LKW-Brandes gesperrt.']
      ]
    }
  });

  /* ---------------- Test 4 ---------------- */
  mk('k4', 4, '', {
    teil1: {
      title: 'Nachrichten im Rundfunk',
      intro: 'Sie hören nun eine Nachrichtensendung. Dazu sollen Sie fünf Aufgaben lösen. Sie hören die Nachrichtensendung nur einmal. Entscheiden Sie beim Hören, ob die Aussagen 41–45 richtig (+) oder falsch (−) sind.',
      items: {
        41: 'Dar Dalai Lama hat von der Universität Münster für seine wissenschaftlichen Erfolge im Bereich Chemie und Pharmazie eine Ehrendoktorwürde erhalten.',
        42: 'Nach heftigem Erdbeben in Japan gelangte aus dem Atomkraftwerk in Kashiwasaki gefährliches Atommüll in die Luft.',
        43: 'In Finnland und Norwegen surfen die meisten Internetnutzer mit Firefox.',
        44: 'In einem China-Restaurant in Sittenheim wurden im Februar sieben Vietnamesen getötet. Im zugehörigen Prozess schweigen die fünf Angeklagten noch.',
        45: 'Nokia wird 35 Millionen Handys mit Navigations-Dienst verkaufen.'
      },
      key: { 41: '+', 42: '-', 43: '-', 44: '-', 45: '-' },
      notes: { 45: 'Ojo: la clave impresa del libro marca «falsch», pero el texto dice que Nokia «will in diesem Jahr … 35 Millionen GPS-Handys verkaufen», lo que apunta a «richtig». Aquí se puntúa según la clave impresa.' },
      transcript: [
        ['41', 'Das Exiloberhaupt der Tibeter, der Dalai-Lama, hat am Donnerstag die Ehrendoktorwürde des Fachbereiches für Chemie und Pharmazie der Universität Münster erhalten. Es ist das erste Mal, dass eine deutsche Hochschule dem Religionsführer und Friedensnobelträger eine Ehrendoktorwürde verliehen hat. Die Universität begründete die Ehrung mit der Bereitschaft des 72-Jährigen, wissenschaftliche Erkenntnisse auch in der Religion anzuerkennen und von der dogmatischen Lehre abzuweichen.'],
        ['', 'Iran. Der Iran hat am Donnerstag seine Kriegsbereitschaft demonstriert und zwei neue Kampfflugzeuge getestet. Die Testflüge der im Iran hergestellten Maschinen des Typs „Saegheh“ seien erfolgreich gewesen. „Sie haben die Feinde des Irans abgeschreckt“, erklärte der iranische Verteidigungsminister Mostafa Mohammed Nedschar im staatlichen Fernsehen. Armeechef Ataollah Salehi sagte, sein Land sei auf jeden Angriff vorbereitet.'],
        ['42', 'Japan. Nach dem jüngsten schweren Beben sorgt das Problem der Atomsicherheit in Japan erneut für Schlagzeilen. Wie gestern, Dienstag, bekannt wurde, hat es im Atomkraftwerk Kashiwasaki insgesamt 50 Störfälle gegeben. Bei dem heftigen Erdstoß der Stärke 6,8 nach Richter stürzten etwa hundert Atommüllfässer um, von denen einige mit offenen Deckeln vorgefunden wurden. In den Fässern wird schwach radioaktives Wasser und Atommüll aufbewahrt. Zudem trat Öl aus, und Ausrüstung in dem Atommeiler wurde zerstört. Am Tag zuvor war in Kashiwasaki, dem weltgrößten AKW, ein Leck entdeckt worden, durch das schwach radioaktives Wasser ins Meer gelangte.'],
        ['43', 'EU: Der Marktanteil von Firefox wächst kontinuierlich: Im Schnitt surfen etwa 28 % der europäischen Internetnutzer mit dem kostenlosen Web-Browser. Die Software ist in Finnland und Slowenien bereits Marktführer, in Österreich wird sie derzeit von etwa 30 % der Web-Surfer genutzt.'],
        ['44', 'Stade. Im Prozess um den siebenfachen Mord in einem China-Restaurant Anfang Februar in Sittensein schweigen die fünf angeklagten Vietnamesen bislang. Bei der Verhandlung vor dem Landgericht Stade äußerten sich am Donnerstag nicht zu den Vorwürfen der Staatsanwaltschaft. Ihre Verteidiger begründeten dies mit einer unvollständigen Akteneinsicht. Vor Verhandlungsbeginn waren die Sicherheitsvorkehrungen verschärft worden. Das Gericht befürchtete eine gewaltsame Befreiung der Angeklagten.'],
        ['45', 'Die Nummer eins der Branche, Nokia, setzt auf Navigations-Dienste auf dem Handy. Nokia will in diesem Jahr nach eigenen Angaben 35 Millionen GPS-Handys verkaufen. Auf der Messe sind auch erste Prototypen mit dem von Google angestoßenen Betriebssystem Android zu sehen. Wann die ersten Android-Handys auf den Markt kommen könnten, ist noch unklar. Google will seine Dominanz bei Internet-Werbung auf mobile Dienste ausweiten.']
      ]
    },
    teil2: {
      title: 'Rundfunk-Interview: Helge Schneider',
      intro: 'Sie hören ein Rundfunk-Interview. Dazu sollen Sie zehn Aufgaben lösen. Sie hören dieses Interview nur einmal. Entscheiden Sie beim Hören, ob die Aussagen 46–55 richtig (+) oder falsch (−) sind.',
      items: {
        46: 'Vorher wollte Herr Schneider auf dem Segelschiff „Mir“ als Kapitän arbeiten.',
        47: 'Er hat eine Reise mit dem Schiff nach Barcelona gemacht.',
        48: 'In Spanien gab es eine große Hitze, so dass er sogar einen Sonnenstich bekam.',
        49: 'Er war noch nicht 15, als er die Reise nach Barcelona gemacht hat.',
        50: 'Vor der Reise nach Barcelona waren seine Freunde bei seinen Eltern zu Besuch.',
        51: 'In Spanien konnten sie bei der Familie von Jörge übernachten.',
        52: 'Ein Polizist hat sie einmal in Barcelona gefasst.',
        53: 'An der Küste hat er wie auch die Freundin des Schlagzeugers einen Sonnenbrand bekommen.',
        54: 'Er hat besonders Reisen zu beruflichen Zwecken sehr gern, weil sie gut organisiert sind.',
        55: 'Er wurde damals in Portugal als Star gefeiert, aber als er nach einem Jahr zurückgekehrt ist, war alles anders.'
      },
      key: { 46: '-', 47: '-', 48: '+', 49: '-', 50: '+', 51: '-', 52: '-', 53: '+', 54: '-', 55: '+' },
      transcript: iv('Reporter', 'Helge Schneider', [
        'Helge Schneider. Herzlich willkommen in unserem Studio! Herr Schneider, vorhin haben Sie im Hamburger Hafen das Segelschiff „Mir“ sehr interessiert fotografiert.',
        'Das mache ich so ab und zu mal, Hobbyfotos eben.',
        'Schwingt da Sehnsucht mit?',
        'Hmh. Könnte sein, doch – find’ ich gut. Ist schon faszinierend, dass Leute sich da so aufopfern. Es gibt ja sogar russische Viermaster. Davon gibt es nur noch ganz wenige auf der Welt.',
        'Sie haben gerade ein Buch über eine Weltreise geschrieben. Haben Sie früher schon die Sehnsucht nach Reisen gehabt?',
        'Ja, Kapitän zu sein oder sowas. Das sind so Träume gewesen. Als ich dann von zu Hause wegging, hab’ ich dran gedacht, aufs Schiff zu gehen. Aber dann hat man mir doch von abgeraten.',
        'Ihre erste Auslandsreise hat Sie stattdessen nach Barcelona geführt.',
        'Damals, richtig, jaja. Wo ich gedacht habe, da wären Palmen am Strand und ganz Barcelona wäre ein Sandstrand.',
        'Haben Sie noch Erinnerungen daran?',
        'Zum Beispiel: Nachdem man die französische Grenze passiert hatte und dann in der Morgensonne in Spanien auf einmal den Berg hochfuhr und da ein kleines Café war, und links und rechts so Terracotta-Blumentöpfe verkauft wurden, wie es halt so üblich ist, und diese Osborntiere überall, die einen dann immer so angeguckt haben. Und als ich dann aus dem Bus ausgestiegen bin, ja, da hab’ ich einen Schlag gekriegt, so heiß war das.',
        'Mit dem Fernreisebus?',
        'Das war der Europa-Bus. Ich weiß nicht, ob Sie das kennen?',
        'Schon mal davon gehört.',
        'Da konnte man für 90 Mark von Duisburg nach Barcelona fahren.',
        'Mit Freund oder Freundin?',
        'Wir waren, glaub’ ich, mehrere Leute, warte mal, eins, zwei, Jorge, also’n Freund aus Chile, drei, vier, fünf, ich glaube fünf Leute waren wir. Das war der Hammer. Ich war erst 15 oder sowas.',
        'Sehr jung. Erstaunlich, dass Ihre Eltern damit einverstanden waren, das war eine richtig große Reise.',
        'Die anderen waren ja älter, die haben dafür gebürgt, dass sie auf mich aufpassen und die mussten dann auch vorher bei mir zu Hause antreten.',
        'Schulfreunde?',
        'Ja, ne, der Schlagzeuger, mit dem ich damals in der Band gespielt habe, der Mike, der war sieben oder acht Jahre älter, und der war mit seiner Freundin. Und die haben uns vorher besucht und dann durfte ich mitfahren.',
        'Und dann richtig über die Stränge geschlagen? 15 Jahre, Sonne, Strand und Alkohol?',
        'Nein, wir waren mit dem Chilenen Jorge, also geschrieben: J-o-r-g-e …',
        '… danke, danke …',
        '… der Jorge war 1969 von Chile nach Spanien gekommen und 1970 dann nach Deutschland, und der kannte dort so eine Art Arbeiterfamilie, und dann haben wir unterhalb von Barcelona in einem Arbeiterdörfchen bei der Familie wohnen können. Die haben extra für uns ihr Wohnzimmer ausgeräumt. Das waren alles so kleine Häuschen, die hatten alle drei Etagen, Neubauten mit dünnen Wänden.',
        'Also das spanische Leben kennen gelernt. Nichts mit Touristenurlaub.',
        'Ne, gar nicht Tourismus. Sofort Spanien. Alle Rollläden zugemacht. Keine Teppiche auf’m Boden. Alle Häuser an einer Durchgangsstraße.',
        'Und ein paar Bars an der Straße.',
        'Nur eine Bar an der Straße, sonst Kfz-Werkstätten. Und eine Straßenkreuzung mit einem Polizisten auf einem Fass! Langer Plastikmantel, mitten im Sommer, so ein Südwester, mit so’m Helm, hat ein Polizeihelm, mit vorne und hinten was dran, und mit weißen Plastikhandschuhen der dann den Verkehr da geregelt. Und wenn man weiterging, ein Stück nach links, dann kam man auch zum Strand. Da waren dann ausschließlich Arbeiter.',
        'Alles sehr einfach gehalten?',
        'Ganz einfach. Und da war dann eine Bar, und da gab’s Sangria. Ich wusste aber nicht, dass da Alkohol drin ist.',
        'Das dürften Sie schnell gemerkt haben.',
        'Jahaa! Da hab’ ich mal so ungefähr anderthalb Liter davon getrunken. Und dann bin ich mit der Freundin des Schlagzeugers am Strand entlanggelaufen, bis Barcelona-Hafen. So ungefähr 15 Kilometer, und da die Sonne immer auf die rechte Seite schien, es war so um zwölf Uhr rum, mittags, hatten wir beide hinterher auf der rechten Schulter eine Brandblase. Das werd’ ich nie vergessen. Ich war gestern mal wieder an der Ostsee. Da hab ich dann schnell ein Hemd angezogen.',
        'Man lernt ’was dabei.',
        'Man lernt ’was.',
        'Ist das eine Form von Reisen, die Sie immer noch mögen?',
        'Also, meine Reisen führen mich eigentlich immer beruflich überall hin. Das ist eine Form von Reisen, die ich gerne mag. Da hab’ ich einen Auftrag und ich weiß, was ich zu tun habe.',
        'Auf Tournee zu sein ist eine Art zu reisen, die Sie immer an dieselben Orte führt. Zumindest in Deutschland.',
        'Ich war auch schon mal in Portugal mit meiner Band, das ist allerdings schon über 20 Jahre her.',
        'Haben Sie da Jazz gemacht?',
        'Jazz mit Quatsch.',
        'Und damit konnten ausgerechnet die Portugiesen etwas anfangen?',
        'Wir haben die Texte auf portugiesisch übersetzt und das kam wirklich an. Da war ich auch auf den Titelseiten. Ich war ein Star. Ich bin dann aber abgehauen, keinen Bock mehr.',
        'Warum?',
        'Ich war zweimal da. Wir sind in diesen Studentenklubs aufgetreten. Komische Studenten waren das in Portugal. Die waren alle reich und hatten eigene Putzfrauen. Die Studenten wollten immer tanzen, tanzen … Beim ersten Mal waren wir in einem angesagten Club, der hieß El Carina, und als wir ein Jahr später zurückkamen, da war das schon total verändert, oben war ein Friseur drin und unten konntest du nur noch mit Sichtkontakt rein, so wie man das aus München kannte, mit Security. In München gibt’s ja auch ganz viele Läden, wo man nicht reinkann, wo dann ein oder zwei Typen vorne stehen, weißt du, und die lassen nicht jeden rein, nur nach Bedarf, je nachdem. Und das war da auch, und da hatt’ ich dann keine Lust mehr.',
        'Also wenn man reist, sucht man ’was anderes, ’was Fremdes.',
        'Nicht unbedingt ’was Fremdes, man sucht ’was Echtes. Das Original. Ich will nicht in ein Land reisen und dann nur mit Leuten zu tun haben, die mich auf Grund meines Berufes hofieren und nur mit meinem Metier zu tun haben. Ich möchte doch immer auf eigene Faust gucken, was da ist, und in Portugal war das ja wie im Sozialismus. Du kamst an, dann wurdest du von dem Manager den ganzen Tag betreut, den wurdest du nicht mehr los, den Kerl. Da hab’ ich auch keine Lust mehr drauf gehabt. Wir sind einfach nach Hause gefahren und haben den Manager da sitzen lassen.',
        'Herr Schneider, danke, dass Sie uns nicht haben sitzen lassen.',
        'Aber natürlich nicht. Vielen Dank für das Gespräch.'
      ])
    },
    teil3: {
      title: 'Fünf kurze Texte',
      intro: 'Sie hören jetzt fünf kurze Texte. Dazu sollen Sie fünf Aufgaben lösen. Sie hören diese Ansagen nur einmal. Entscheiden Sie beim Hören, ob die Aussagen 56–60 richtig (+) oder falsch (−) sind.',
      items: {
        56: 'An allen drei Tagen des Kölner Straßenkarnevals tragen die Teilnehmer Kostüme.',
        57: 'In Heidelberg finden gleichzeitig zwei verschiedene Briefmarkenausstellungen statt.',
        58: 'Dauer-Spezialkarten sind nur im Vorverkauf erhältlich.',
        59: 'Wenn man sich nach einer Expresssendung ins Ausland erkundigen möchte, muss man zuerst die Nummer 3, dann die Nummer 1 wählen.',
        60: 'Auf der A 40 hat sich ein Unfall ereignet.'
      },
      key: { 56: '+', 57: '-', 58: '-', 59: '+', 60: '+' },
      transcript: [
        ['56', 'Alle Jahre wieder für Kölner und Menschen, die viel Spaß haben möchten, findet in Köln der Straßenkarneval statt. Der Karneval wird traditionell am 11.11. um 11 Uhr 11 auf dem Heumarkt in der Kölner Altstadt eröffnet. Gefeiert wird an diesem Tag aber nicht nur vor einer großen Bühne inmitten tausender Jecken auf dem Heumarkt selbst, sondern in der gesamten Altstadt. Am Samstag, den 21. Februar, findet voraussichtlich der Geisterzug statt. Am Sonntag finden die Schull- und Veedelszöch (Schul- und Stadtteilzüge) statt, die ab 11 Uhr durch die Stadt ziehen. Die phantasievollen Kostüme der vielen Kölner Schulgruppen locken die Menschenmengen an den Zugweg. Am Montag geht der berühmte Kölner Rosenmontagszug um 11 vor 11 am Chlodwigplatz los und braucht für den 6,5 Kilometer langen Weg quer durch die Innenstadt etwa vier Stunden. Na, Lust bekommen? Dann kommen Sie bitte nach Köln und machen Sie mit!'],
        ['57', 'Vom 13.–15. Juli findet in Heidelberg die „Südwest“ Rang-2 Briefmarken-Ausstellung mit internationaler Beteiligung statt. Der Briefmarken-Sammlerverein Heidelberg und Rohrbach 1891 e. V. (www.briefmarken-heidelberg.de) lädt Sammler und Interessenten bei freiem Eintritt ein, die bislang größte Briefmarken-Schau Heidelbergs zu besuchen! Kommen Sie in die Carl-Diem-Halle nach Heidelberg-Kirchheim. Versäumen Sie diese Gelegenheit auf keinen Fall!'],
        ['58', 'Sehr geehrte Dame, sehr geehrter Herr! Sie sind mit der automatischen Ansage der Deutschen Bahn verbunden. Reisen Sie doch mal im Nachtzug, z. B. im Ruhesessel mit CityNightLine für nur 10,– Euro mehr. Dauer-Spezial ist auch für die beiden Nachtreisezüge DB Nachtzug und CityNightLine gegen Zahlung eines zusätzlichen Aufpreises erhältlich. Die Höhe des Aufpreises richtet sich nach der gewünschten Komfortklasse. Tickets für Nachtreisezüge können Sie bei www.bahn.de unter dem Link Nachtzug oder www.citynightline.ch sowie in allen DB Reisezentren und DB Agenturen buchen. Weitere Informationen zu Dauer-Spezial in unseren Nachtreisezügen erhalten Sie unter der Rufnummer 11861.'],
        ['59', 'Herzlich willkommen beim Kundenservice der DHL. Für Sendungen in Deutschland drücken Sie bitte die Zahl 1, für internationale Sendungen die Zahl 3. Nachfolgend haben Sie die Möglichkeit, zwischen zwei Versandoptionen zu wählen. Für Expresssendungen wählen Sie bitte die Nummer 1, für alle weiteren Sendungen die Nummer 3. Wir verbinden Sie jetzt mit einem unserer Mitarbeiter.'],
        ['60', 'Guten Morgen liebe Zuhörerinnen und Zuhörer! Sie hören jetzt unsere Verkehrsmeldungen. A3 Oberhausen Richtung Köln zwischen Opladen und Köln-Dellbrück Baustelle. 6 km Stau. A4 Olpe Richtung Köln zwischen Köln-Poll und Kreuz Köln-Süd 3 km Stau. Die Autobahn ist in beiden Richtungen gesperrt. Auf der A31 Bottrop-Gronau in beiden Richtungen ist die Anschlussstelle Kirchhellen-Nord wegen Bauarbeiten voraussichtlich bis zum 28. Februar gesperrt. Auf der A40 Duisburg Richtung Essen ist die Auffahrt Mülheim-Heissen nach einem Unfall gesperrt.']
      ]
    }
  });

  /* ---------------- Test 5 (sin Hören 1: falta su transcripción en el escaneo) ---------------- */
  mk('k5', 5, 'Falta el Hören 1 (41–45): su transcripción está en las páginas 260–261 del libro, que el escaneo no incluye.', {
    teil2: {
      title: 'Rundfunk-Interview: Abendgymnasium',
      intro: 'Sie hören ein Rundfunk-Interview. Dazu sollen Sie zehn Aufgaben lösen. Sie hören dieses Interview nur einmal. Entscheiden Sie beim Hören, ob die Aussagen 46–55 richtig (+) oder falsch (−) sind. (En el libro la consigna impresa de esta parte dice por error «Nachrichtensendung».)',
      items: {
        46: 'Sophie arbeitet in Vollbeschäftigung und daneben besucht sie das Abendgymnasium.',
        47: 'Ihr Kind wurde oft dort betreut, wo auch das Gymnasium zu finden ist.',
        48: 'Sophie hat mehr von sich erwartet, als sie leisten konnte.',
        49: 'Sie hatte keine große Krise während der Schulzeit im Abendgymnasium.',
        50: 'Sie findet es wichtig, dass man ständig zum Unterricht geht.',
        51: 'Bei Schwierigkeiten hat sie von den Lehrern und Mitschülern sehr viel Unterstützung bekommen.',
        52: 'Es tut ihr Leid, dass sie kein Latein gelernt hat.',
        53: 'Ihrer Meinung nach ist es von Jahr zu Jahr leichter zu lernen, wenn man sich gut einübt.',
        54: 'Sie hatte als Griechin in Deutsch Schwierigkeiten, aber sie konnte alles nachholen, wozu auch die Lernmaterialien der Bibliothek beigetragen haben.',
        55: 'Ihre griechischen Sprachkenntnisse waren für sie vorteilhaft beim Lernen, besonders in Mathematik.'
      },
      key: { 46: '-', 47: '+', 48: '-', 49: '+', 50: '+', 51: '+', 52: '-', 53: '-', 54: '-', 55: '+' },
      notes: {
        52: 'Ojo: la clave impresa del libro marca «falsch», pero ella dice que elegiría Latín como segunda lengua («Ich würde als 2. Fremdsprache Latein wählen»), lo que apunta a «richtig». Aquí se puntúa según la clave impresa.',
        54: 'Ojo: la clave impresa del libro marca «falsch», pero el texto menciona los ejercicios de alemán y las ayudas de la biblioteca, lo que apunta a «richtig». Aquí se puntúa según la clave impresa.'
      },
      transcript: iv('Moderator', 'Sophie', [
        'Herzlich willkommen in unserem Studio! Also was war Ihre Motivation (neben der Kindererziehung) für das Abendgymnasium?',
        'Ich bin Griechin. Ich hatte nur einen Schulabschluss in Griechenland. Ich habe den Qualischulabschluss in Deutschland nachgeholt und war durch das gute Ergebnis so ermutigt, dass ich direkt mit dem nächsten Schritt weitermachen wollte. Da bin ich auch ganz zufällig einer Anzeige des AG im Stadtteilblatt begegnet.',
        'Hat sich Ihre Motivation im Laufe der Jahre verändert?',
        'Ja, mit zunehmender Zeit hab’ ich immer höher Ziele gesteckt.',
        'Hmh. Sie haben ein dreijähriges Kind. Wie haben Sie das gemanagt?',
        'An vielen Abenden ist Giulio mit mir in die Schule gekommen. Im Haus besteht die Möglichkeit sein Kind betreuen zu lassen, was ich gerne in Anspruch genommen habe. Meistens hat es auch sehr gut geklappt.',
        'Haben Sie ein Talent entdeckt, das Sie früher nicht wahrgenommen hatten?',
        'Ja, durch die vertiefte Auseinandersetzung mit den verschiedenen Fächern wurden ganz neue Interessen bei mir geweckt, z. B. in Geschichte, aber auch in den anderen Fächern. Ich denke, dieses Wissen sollte eigentlich jeder Mensch auf seinen Weg mitbekommen, auch wenn er nicht studieren will.',
        'Und haben sich Ihre Erwartungen erfüllt – würden Sie den Weg noch einmal gehen?',
        'Ja, in jedem Fall, meine Erwartungen wurden weit übertroffen und ich bin voller Dankbarkeit über diese Einrichtung.',
        'Na ehrlich. Gab es Krisen?',
        'Nun. Der Übergang von der 2. zur 3. Jahrgangsstufe war etwas heftig. Die Anforderungen wurden plötzlich sehr viel höher. Aber als Krise würde ich das nicht bezeichnen. Ich hatte mich fest entschlossen, den Weg mit allem, was an mir liegt, zu Ende zu gehen, bin immer dran geblieben und habe oft auch etwas vorgearbeitet, dadurch kam es zu keinen großen Krisen.',
        'Was hat Ihnen in diesen Zeiten noch geholfen?',
        'Vor allem die Unterstützung durch die Familie. Außerdem das super Verhältnis, das wir in den ersten Jahren in der Klasse hatten. Wenn ich in die Klasse kam und meine Mitschüler sah, dann war der Tag einfach schön. Natürlich ist so etwas ein ganz großes Glück und nicht selbstverständlich. Es gab auch wirklich große Hilfe durch die Lehrer. Eine besonders große Hilfe war Frau Kühnle für mich, die mich durch ihr Verständnis und ihre Hilfe sehr ermutigt hat.',
        'Hatten Sie Probleme als Ausländerin?',
        'Lehrer und Mitschüler waren stets sehr hilfsbereit. Außerdem habe ich für mich alleine viele Deutschübungen gemacht. In der Bibliothek habe ich gute Lernhilfen gefunden. Ich kann jedem nur empfehlen sie auch zu benutzen. In Mathematik und auch an manch anderer Stelle hatte ich sogar auch gewisse Vorteile, weil viele Begriffe aus der griechischen Sprache stammen.',
        'Was würden Sie heute anders machen, wenn Sie noch einmal beginnen würden?',
        'Ich würde als 2. Fremdsprache Latein wählen. Es ist hilfreich auch für Deutsch und Englisch, außerdem ist es für verschiedene Studiengänge Voraussetzung. Wenn man noch nicht genau weiß, was man studieren will, sollte man sich das gut überlegen.',
        'Welche Tipps würden Sie Schulanfängern mit auf den Weg geben?',
        'Man sollte die eigenen Kräfte gut einschätzen und nicht zu viel nebenbei machen. Ergänzungsunterricht sollte den persönlichen Interessen und der Entspannung dienen. Ich habe z. B. Politische Bildung und Yoga gemacht, und das war sehr gut. Schade, dass es erst jetzt das kreative Schreiben gibt, ich hätte da gerne mitgemacht. Man sollte sich nie auf seinen Lorbeeren ausruhen und immer dran bleiben, denn der Schwierigkeitsgrad steigt von Jahr zu Jahr. Außerdem macht es viel mehr Freude, wenn man mithalten kann. In jedem Fall sollte man immer sein Bestes geben. Ich meine, es ist auch sehr wichtig, immer am Unterricht teilzunehmen, Leute zu suchen, die einen motivieren. Und nicht zuletzt Hilfe bei Lehrern suchen.',
        'Ich glaube, mit Ihnen hab’ ich jemanden gefunden, der uns alle sehr motiviert. Vielen Dank.',
        'Danke auch.'
      ])
    },
    teil3: {
      title: 'Fünf kurze Texte',
      intro: 'Sie hören jetzt fünf kurze Texte. Dazu sollen Sie fünf Aufgaben lösen. Sie hören diese Ansagen nur einmal. Entscheiden Sie beim Hören, ob die Aussagen 56–60 richtig (+) oder falsch (−) sind. (En el libro la consigna impresa de esta parte dice por error «Rundfunk-Interview».)',
      items: {
        56: 'Seit der Eröffnung der 1. UN-Umweltkonferenz 1972 wird der Umwelttag in Deutschland jedes Jahr begangen.',
        57: 'Der große Bauernmarkt macht ein tolles Vergnügen, wo die Besucher auch die Köstlichkeiten der Landwirte probieren können.',
        58: 'Der Berliner „Jurassic Park“ erwartet seine Besucher nach zwei Jahren Pause in einem neuen Glanz.',
        59: 'Über die Modellbauausstellung kann man sich auf einer Webseite informieren.',
        60: 'Auf der A43 Wuppertal Richtung Recklinghausen gab es einen Unfall, deshalb muss man dort langsam fahren.'
      },
      key: { 56: '+', 57: '+', 58: '+', 59: '+', 60: '+' },
      transcript: [
        ['56', 'Es ist wieder mal so weit! Alle Jahre wieder wird am 5. Juni in Deutschland der Internationale Tag der Umwelt begangen. Mit diesem Termin soll an die Eröffnung der 1. UN-Umweltkonferenz vom 05.06.1972 in Stockholm erinnert werden, die den Grundstein für international abgestimmte Maßnahmen, wie z. B. das Kyoto-Protokoll, zur Verbesserung der globalen Umweltsituation gelegt hat.'],
        ['57', 'Es ist wieder so weit. Am 23. September laden die Geschäfte in Hannovers Innenstadt wieder zum Einkaufsbummel der entspannten Art ein. Von 13 bis 18 Uhr erwarten Sie ein hervorragendes Warenangebot und gastronomische Erlebnisse. Rund 20 Landwirte und Direktvermarkter bieten ihre selbstgefertigten Produkte sowie Köstlichkeiten aus der ländlichen Küche an. Für Unterhaltung sorgt das Showprogramm auf der Aktionsbühne am Georgsplatz in der Zeit von 10.00 bis 16.00 Uhr. Na, haben Sie Lust bekommen? Dann kommen Sie!'],
        ['58', 'Es ist wieder so weit! Für den 150 Millionen Jahre alten und 13,27 m großen Brachiosaurus waren die zwei Jahre Restaurierungszeit nur ein Wimpernschlag. Vielen Dino-Fans wurde die Zeit lang. Seit dem 13. Juli ist der Riese wieder im Berliner Naturkundemuseum. Der Besucheransturm auf die renovierten Saurier-Säle ist enorm. Nähere Informationen erhalten Sie unter www.museum.hu-berlin.de'],
        ['59', 'Erleben Sie Modellbau in Sulzbach Rosenberg! Da werden nicht nur Modelle ausgestellt, sondern auch gezeigt, wie diese entstehen. (RC-Flugzeuge, RC-Automodelle, Plastikmodelle) Diesen Ort finden Sie 50 km östlich von Nürnberg. Die Veranstaltung beginnt am 18. März um 14 Uhr und wird am darauffolgenden Tag um 17 Uhr beendet. Nähere Informationen erhalten Sie unter www.ostermann61.de.'],
        ['60', 'Und nun die Verkehrsmeldung! A40 Essen Richtung Dortmund zwischen Essen-Kray und Gelsenkirchen-Süd 1 km Stau. Der linke Fahrstreifen ist gesperrt. Auf der A42 Kamp-Lintfort Richtung Dortmund ist die Anfahrt Herne-Baukau wegen Bauarbeiten voraussichtlich bis zum 18. April gesperrt. A43 Wuppertal Richtung Recklinghausen zwischen Bochum-Gerthe und Bochum-Riemke wegen eines Unfalls 2 km Stau. Achtung! Gegenstände auf der Fahrbahn! Fahren Sie bitte langsam! A45 Giessen Richtung Dortmund zwischen Kreuz Hagen und Schwerte-Ergste 2 km Stau. Einspurige Verkehrsführung wegen Bauarbeiten.']
      ]
    }
  });

  /* ---------------- Test 7 (solo Hören 2: faltan las páginas 260–261 y 264 del libro) ---------------- */
  mk('k7', 7, 'Solo trae el Hören 2 (46–55): los Hörtexte de las partes 1 y 3 están en páginas que el escaneo no incluye.', {
    teil2: {
      title: 'Rundfunk-Interview: Astronaut Hans Schlegel',
      intro: 'Sie hören ein Rundfunk-Interview. Dazu sollen Sie zehn Aufgaben lösen. Sie hören dieses Interview nur einmal. Entscheiden Sie beim Hören, ob die Aussagen 46–55 richtig (+) oder falsch (−) sind.',
      items: {
        46: 'Die Aufgabe des deutschen Astronauten besteht nur darin, an Bord Geräte zu installieren.',
        47: 'Wenn man in einen Raum der Raumstation eintritt, kann man alle Dienstleistungen gleich in Anspruch nehmen.',
        48: 'Der Astronaut hat den Wunsch, für kurze Zeit die Erde zu erblicken.',
        49: 'Bei der jetzigen Vorbereitung waren die Aufgaben anders, als bei der früheren.',
        50: 'Die europäischen Geräte können im All zuverlässiger funktionieren, als die alten.',
        51: 'Seit seiner letzten Raumfahrt ist Hans Schlegel auch in Europa sehr populär und anerkannt.',
        52: 'Im All zu experimentieren hat zahlreiche Vorteile für die Menschheit.',
        53: 'Der Astronaut schwärmt für klassische Musik.',
        54: 'Er freut sich vor allem darauf, wenn im All alles klappen würde.',
        55: 'Er zweifelt daran, dass er während der Raumfahrt fürs Lesen Zeit hätte.'
      },
      key: { 46: '-', 47: '-', 48: '+', 49: '+', 50: '-', 51: '-', 52: '+', 53: '-', 54: '-', 55: '-' },
      notes: {
        53: 'Ojo: la clave impresa del libro marca «falsch», pero él dice «Ich liebe Klassik» (Tschaikovski, Mozart, Beethoven), lo que apunta a «richtig». Aquí se puntúa según la clave impresa.',
        54: 'Ojo: la clave impresa del libro marca «falsch», pero al final él dice que se alegraría de volver a oír que «alles läuft gut», lo que apunta a «richtig». Aquí se puntúa según la clave impresa.'
      },
      transcript: iv('Moderator', 'Hans Schlegel', [
        'Heute können Sie sich ein Interview mit unserem Astronauten Hans Schlegel anhören. Sie gehören der Shuttle-Besatzung an, die in wenigen Wochen das erste europäische Forschungslabor Columbus ins All bringt. Was genau haben Sie da zu tun?',
        'Während der elftägigen Mission bin ich an drei Außenbordeinsätzen beteiligt, bei denen die Columbus an die Raumstation ISS gekoppelt wird. Dann hab’ ich drei Tage Zeit, die Columbus einzurichten.',
        'Gelangt das Labor nicht fertig ins All?',
        'Nicht ganz. Für den Start muss die Masse gleichmäßig verteilt sein. Dementsprechend werden die Racks, d. h. Geräteständer positioniert. Erst wenn die Columbus angedockt ist, verteilen wir sie an die endgültige Position. Der nächste Schritt ist die Stromversorgung, dann werden Kühlwasser, Datenleitungen, Videoleitungen, Steuerleitungen angebracht. Es ist also nicht so, als träte man in einen Raum, würde einen Schalter umlegen und die Experimente würden starten.',
        'Haben Sie während des Ausstiegs Zeit, zur Erde zu sehen?',
        'Wir haben eine regelrechte Choreographie da oben. Der Blick auf die Erde ist ein Bei-Produkt, für das ich vielleicht mal ein paar Sekunden Zeit habe. Ich hoffe, es wird etwas mehr …',
        'Sie sind 1993 die D2-Mission geflogen – inwiefern unterscheidet sich Ihre jetzige Mission in der Vorbereitung?',
        'Von Seiten der Technik könnten sie unterschiedlicher nicht sein. Für D2 waren wir Wissenschaftsastronauten, haben mehr vom theoretischen Hintergrund der Experimente gehört, von der Entwicklung im Labor bis hin zum Training der Durchführung. Die Kommunikation mit den Wissenschaftlern haben wir geübt, um zusammen als Team zu funktionieren. Jetzt wie derum ist es eine Ausbildung zum Missions-Spezialisten. Wir lernen, das Shuttle-Programm zu bedienen, Außeneinsätze zu absolvieren, einen Roboterarm zu bedienen, im Raumanzug Aufgaben durchzuführen, Lösungswege vor Ort selber zu erkunden.',
        'Wie lange haben Sie sich auf die Mission vorbereitet?',
        'Ja. Ich bin seit einem reichlich halben Jahr intensiv dabei. Seit einem Jahr bin ich für diesen Flug ausgewählt, da ging zunächst aber das normale Training weiter. Die intensive Missionsvorbereitung fing im November, Dezember an. Aber die Jahre vorher bei der Nasa, die gehören natürlich dazu. Seit 1998 trainiere ich als Missions-Spezialist konsequent für einen Flug an Bord des Shuttles.',
        'Ist Columbus ein Meilenstein in der Geschichte der Raumfahrt?',
        'Definitiv. Das ist ein Meilenstein.',
        'Was ist das Besondere daran – für Europa?',
        'Ja. Wir haben bisher nur russische und amerikanische Lebensmodule da oben. Mit Columbus wird die Gemeinde der Raumstation wirklich international. Wir haben dann ein europäisches Labor und damit auch ein Anrecht auf die Nutzung der experimentellen Geräte an Bord. Das ist für Europa wichtig, weil wir damit Miteigentümer der Raumstation werden. Es ist für die Wissenschaft in Europa von großer Bedeutung.',
        'Was sagen Sie Kritikern auf den Vorhalt, für bemannte Raumfahrt würde zu viel Geld ausgegeben, das könnte auf der Erde besser investiert werden?',
        'Die Entscheidung, Forschung in der Schwerelosigkeit zu betreiben und sich an der Internationalen Raumstation zu beteiligen, unterstütze ich von ganzem Herzen. Das täte ich übrigens auch, wenn ich nicht Astronaut wäre. Und zwar aus einem einfachen Grund: In der Schwerelosigkeit im erdnahen Orbit besteht die einmalige Gelegenheit, Experimente zu machen, wie sie auf der Erde nicht durchgeführt werden können. Darüber hinaus entwickelt sich die Schwerelosigkeitsforschung selber weiter.',
        'Was sagen Sie Leuten, die nach dem Nutzen fragen?',
        'Der Nutzen liegt in der Weiterentwicklung der Grundlagenforschung und in der Entwicklung von Technologien, die Erde zu verlassen, uns einen neuen Raum zugänglich zu machen, neue Erkenntnisse über unser nächstes Lebensumfeld, unser Sonnensystem, zu gewinnen und später vielleicht tatsächlich auch irgendwo eine Siedlung auf einem anderen Planeten bauen zu können.',
        'Der Normalverbraucher denkt eher an Teflon, auch wenn das gar keine Entwicklung aus der Raumfahrt war …',
        'Aber diese Materialentwicklung ist durch die Weltraumtechnik zu einer breiten Nutzanwendung gekommen. Erfunden war Teflon vorher, aber die Raumfahrt brauchte es und damit bekam es eine neue Aufmerksamkeit. Man erkannte: Meine Güte, die Vorteile des Materials können wir ja auch zur Beschichtung von anderen Sachen, beispielsweise für Pfannen, nutzen. Doch zurück zu dem, was wir heute nutzen: Denken Sie an die Wettervorhersage. Die ist erst gut geworden, als Satelliten zur meteorologischen Beobachtung genutzt werden konnten.',
        'Vermissen Sie gerade in Deutschland Begeisterung für Raumfahrt?',
        'Ich leb’ nun neun Jahre in den USA. In Deutschland ist man generell kritischer auch was den negativen Effekt hat, dass man, bevor man handelt, ewig die Bedenken diskutiert. Die amerikanische Mentalität ist anders. Dort heißt es: Wir machen erst einmal. Beide Sichtweisen haben Vor- und Nachteile. Manchmal ist mir die amerikanische lieber, manchmal die nachdenkliche, zögernde, drei Mal hinterfragende europäisch-deutsche. Die richtige Mischung macht’s. Ich wünschte mir, dass wir ein bisschen mehr „machen“ würden.',
        'Worauf freuen Sie sich jetzt am meisten?',
        'Dass wir die Columbus hochbringen, dass ich die Ehre habe, dabei zu sein. Dass ich mit einer guten fähigen Mannschaft zusammen bin. Und auf die erneute Erfahrung der Schwerelosigkeit. Darauf, das Leben im Weltraum wieder und noch einmal erfahren zu dürfen. Und natürlich auf die Weltraumspaziergänge.',
        'Was braucht man fern der Heimat auf einer Weltraum-Station wie der ISS?',
        'Ein Stück Intimsphäre, wo ich meine Abendlektüre habe, meinen Kopfhörer mit meiner Musik, meine Bilder …',
        'Welche Musik ist das beispielsweise?',
        'Das ist verschieden. Ich liebe Klassik, mir gefällt vor allem Tschaikovski sehr gut, aber auch Mozart und Beethoven. Ich mag auch moderne Musik. Eher höre ich sehr gern, bei den männlichen Sängern ist es Frank Sinatra – ein bisschen altmodisch vielleicht …',
        'Herr Schlegel, wir danken für dieses Gespräch.',
        'Gern geschehen. Noch eines: Zu Ihrer Frage, worauf ich mich freue. Ich erinnere mich, bei der D2-Mission nach ein paar Tagen mal bei einem Kontakt mit der Bodenstation im Hintergrund leises Lachen gehört zu haben. Da wusste ich: Alles läuft gut. Darüber würde ich mich jetzt auch wieder freuen.'
      ])
    }
  });
})();
