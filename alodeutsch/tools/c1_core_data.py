# Camino principal de Lernreise C1: 40 misiones x 5 ejercicios (Wortschatz, Grammatik, 2x Hören, Sprechen).
# Entrada: (titulo, vocab, gram, listen1, listen2, speak)
#   vocab  = (de, es, [distractor, distractor])
#   gram   = (pregunta, [correcta, mala, mala], explicacion)
#   listen = (texto_de, pregunta_es, [correcta, mala, mala], explicacion_es)
#   speak  = (frase_de, significado_es)
C = []
def M(*a): C.append(a)

M("Vertrauen · Konditional ohne wenn",
 ("jemandem Vertrauen schenken","confiar en alguien",["pedir un favor a alguien","desconfiar de alguien"]),
 ("Welche Variante ist korrekt?",["Hätte ich mehr Zeit, würde ich dir helfen.","Ich hätte mehr Zeit, würde ich dir helfen.","Hätte ich mehr Zeit, ich würde dir helfen."],"Sin «wenn», el verbo conjugado va al principio de la condición y la principal sigue con orden normal."),
 ("Vertrauen entsteht nicht von heute auf morgen. Wer schon als Kind erlebt hat, dass man sich auf andere verlassen kann, vertraut später leichter. Wer dagegen oft enttäuscht wurde, bleibt eher misstrauisch.","¿Quién confía con más facilidad?",["Quien de niño pudo contar con los demás","Quien ha sido decepcionado muchas veces","Quien nunca conoció a nadie"],"Se dice que quien vivió fiabilidad de niño confía más tarde con más facilidad."),
 ("Hätte mein Nachbar nicht so freundlich gegrüsst, hätte ich ihm nie meinen Schlüssel anvertraut. Inzwischen giesst er meine Pflanzen, wenn ich verreist bin.","¿Por qué le confió la llave al vecino?",["Porque saludaba de forma amable","Porque era su amigo de la infancia","Porque se la exigió la administración"],"El saludo amable creó la confianza inicial (irreal del pasado sin «wenn»)."),
 ("Hätten wir mehr Vertrauen, gäbe es weniger Konflikte.","Si tuviéramos más confianza, habría menos conflictos."))
M("Streng genommen · Partizipialgruppen",
 ("streng genommen","hablando estrictamente",["con mucho esfuerzo","a menudo"]),
 ("Ergänze: «Grob ___ kostet die Reparatur 200 Euro.»",["geschätzt","schätzen","geschätzte"],"«Grob geschätzt» es una Partizipialgruppe fija: más o menos, aproximadamente."),
 ("Grob geschätzt zwei Drittel der Befragten vertrauen ihren Nachbarn. Verglichen mit früheren Jahren ist das ein leichter Anstieg. Einfach ausgedrückt: Die Menschen kennen einander wieder besser.","¿Qué tendencia describe el texto?",["Un ligero aumento de la confianza","Un fuerte descenso de la confianza","Ningún cambio"],"«Ein leichter Anstieg» = un ligero aumento."),
 ("Streng genommen darf man hier nicht parken. Ehrlich gesagt tut es aber fast jeder, weil sonst kein Platz frei ist.","¿Qué admite el hablante?",["Que casi todos aparcan aunque está prohibido","Que nadie aparca allí","Que hay muchas plazas libres"],"Está prohibido, pero casi todos lo hacen por falta de sitio."),
 ("Ehrlich gesagt, habe ich das nicht erwartet.","Sinceramente, no me lo esperaba."))
M("Hilfe in der Not",
 ("wohnungslos","sin hogar",["sin trabajo","desordenado"]),
 ("Ergänze: «Das ist ein Projekt, ___ viele Freiwillige mitarbeiten.»",["bei dem","bei der","das"],"Projekt es neutro; «mitarbeiten bei» pide dativo: bei dem."),
 ("Im Winter fährt ein Bus durch die Stadt und bringt heissen Tee, warme Kleidung und Schlafsäcke zu Menschen, die draussen übernachten. Die Helfer bieten auch ein Gespräch an. Nicht alle wollen jedoch in eine Notunterkunft mitkommen.","¿Qué hacen los ayudantes del autobús?",["Reparten té, ropa y sacos de dormir y ofrecen conversación","Reparten comida solo en verano","Cobran un precio por el transporte"],"Hay ayuda material y conversación; no todos aceptan ir al albergue."),
 ("An einem Zaun in Hamburg hängen Tüten mit haltbaren Lebensmitteln und Hygieneartikeln. Wer etwas braucht, nimmt sich eine Tüte. Allerdings landen dort manchmal auch Dinge, die nicht dorthin gehören, zum Beispiel Medikamente.","¿Qué problema se menciona?",["A veces se cuelgan cosas inadecuadas, como medicamentos","Nadie utiliza las bolsas","Las bolsas son demasiado caras"],"«Dinge, die nicht dorthin gehören» = cosas que no deberían estar allí."),
 ("Viele Freiwillige engagieren sich ehrenamtlich.","Muchos voluntarios se comprometen de forma honorífica."))
M("Wohnen und Mieten",
 ("die Eigenbedarfskündigung","la rescisión por necesidad propia del propietario",["la subida del alquiler","la fianza"]),
 ("Ergänze: «Die Miete darf alle drei Jahre ___ 20 Prozent erhöht werden.»",["um","auf","von"],"«erhöhen um» indica la cantidad de la subida; «auf» indicaría el valor final."),
 ("In Deutschland wohnen mehr als die Hälfte der Menschen zur Miete. Nach dem Krieg baute der Staat viele Mietwohnungen, weil Privatleuten das Geld fehlte. Das prägt den Wohnungsmarkt bis heute.","¿Por qué hay tantos inquilinos?",["Porque tras la guerra el Estado construyó muchas viviendas de alquiler","Porque comprar vivienda está prohibido","Porque no existen los bancos"],"El Estado construyó vivienda de alquiler porque los particulares no tenían dinero."),
 ("Meine Genossenschaft verkauft keine Wohnungen. Dafür darf ich bis ans Lebensende bleiben, und die Miete bleibt vergleichsweise niedrig. Ausserdem darf ich mitentscheiden, weil ich Anteile besitze.","¿Qué ventajas tiene vivir en la cooperativa?",["Derecho vitalicio, alquiler bajo y participación","Puede vender el piso libremente","Paga más, pero sin normas"],"Derecho vitalicio, alquiler comparativamente bajo y voz en las decisiones."),
 ("Wohnen darf nicht zum Luxus werden.","Vivir no debe convertirse en un lujo."))
M("Mittelfeld · Position der Angaben",
 ("das Mittelfeld","el campo medio (zona entre el verbo conjugado y el verbo final)",["el prefijo verbal","el sujeto de la oración"]),
 ("Welcher Satz hat die übliche Reihenfolge (temporal – kausal – modal – lokal)?",["Ich fahre morgen wegen des Termins gern nach Köln.","Ich fahre nach Köln gern wegen des Termins morgen.","Ich fahre gern morgen nach Köln wegen des Termins."],"TeKaMoLo: primero tiempo, luego causa, modo y lugar."),
 ("Die Mieter haben sich gestern wegen des Lärms beim Vermieter beschwert. Dieser hat ihnen sofort geantwortet.","¿Cuándo se quejaron los inquilinos?",["Ayer","Mañana","Hace una semana"],"«gestern» = ayer."),
 ("Frau Kling hat dem Notar den Vertrag gegeben. Er hat ihn ihr am nächsten Tag zurückgeschickt.","¿Quién devolvió el contrato?",["El notario","La señora Kling","El casero"],"«Er» se refiere al notario, que se lo devolvió a ella."),
 ("Wir haben uns letzte Woche ausführlich über das Projekt unterhalten.","La semana pasada hablamos largo y tendido sobre el proyecto."))
M("Konfliktgespräch",
 ("einen Kompromiss finden","llegar a un compromiso",["guardar silencio","abandonar la sala"]),
 ("Welche Formulierung vermittelt höflich?",["Wenn ich es richtig verstanden habe, wünschen Sie sich …","Sie liegen komplett falsch.","Das interessiert niemanden."],"Resumir con «Wenn ich es richtig verstanden habe» es una técnica de mediación."),
 ("Die Mediatorin fasst zusammen: Der Vermieter möchte, dass nur eine Person in der Wohnung lebt. Der Mieter möchte mit seiner Partnerin zusammenwohnen. Sie fragt, ob beide mit einer befristeten Lösung leben könnten.","¿Qué propone la mediadora?",["Una solución temporal","Que el inquilino se mude mañana","Que el casero pague las obras"],"«befristete Lösung» = solución limitada en el tiempo."),
 ("Ich verstehe, dass Sie verärgert sind. Trotzdem würde ich vorschlagen, dass wir zuerst die Fakten sammeln und danach über Lösungen sprechen.","¿Qué propone el hablante?",["Primero reunir hechos y después buscar soluciones","Hablar solo de soluciones","Terminar la conversación"],"Propone un orden: hechos primero, soluciones después."),
 ("Lassen Sie uns zunächst die Fakten sammeln.","Reunamos primero los hechos."))
M("Kritik äussern und annehmen",
 ("berechtigte Kritik","crítica justificada",["elogio exagerado","pregunta técnica"]),
 ("Welche Antwort nimmt Kritik sachlich an?",["Ich verstehe, dass das nicht in Ordnung war, und werde es ändern.","Das war schon immer so.","Sie verstehen das nicht."],"Reconocer el problema y ofrecer una solución es la respuesta constructiva."),
 ("Kollege A: Sie haben die Bestellungen nicht bearbeitet. Kollege B: Ich verstehe, dass Sie das ansprechen. Ich hatte gedacht, ich schaffe alles, aber die Zeit ist mir davongelaufen.","¿Cómo reacciona B?",["Admite el problema y se explica","Niega todo","Acusa a A"],"B reconoce el fallo y explica la causa."),
 ("Ich habe Ihre Mails nicht bekommen. Vielleicht bin ich nicht im Verteiler. Könnten Sie das bitte prüfen?","¿Cuál es la posible causa?",["No está en la lista de distribución","Está de vacaciones","El correo es demasiado largo"],"«im Verteiler sein» = estar en la lista de distribución."),
 ("Ich nehme Ihre Kritik ernst.","Me tomo en serio su crítica."))
M("Erneuerbare Energien · Nominalstil",
 ("erneuerbare Energien","energías renovables",["energías fósiles","residuos tóxicos"]),
 ("Welche Nominalisierung ist korrekt? «Man nutzt die Wärme der Erde.»",["die Nutzung der Erdwärme","das Nutzen die Erdwärme","der Nutz der Erdwärme"],"Verbo + -ung: «nutzen → die Nutzung» y el objeto pasa a genitivo."),
 ("Windkraft, Wasserkraft und Solarenergie sind die bekanntesten erneuerbaren Energien. Weniger bekannt sind Geothermie und Biogas. Alle tragen dazu bei, den Ausstoss von Treibhausgasen zu verringern.","¿Para qué sirven las renovables según el texto?",["Para reducir las emisiones de gases de efecto invernadero","Para subir el precio de la electricidad","Para sustituir toda la agricultura"],"«den Ausstoss verringern» = reducir las emisiones."),
 ("Eine Wärmepumpe funktioniert wie ein Kühlschrank, nur umgekehrt. Sie braucht Strom, kann aber aus wenig Erdwärme viel Heizwärme machen.","¿Qué necesita una bomba de calor?",["Electricidad","Gas natural","Agua del mar"],"La bomba de calor necesita electricidad, pero multiplica el calor obtenido."),
 ("Die Nutzung erneuerbarer Energien muss ausgebaut werden.","Hay que ampliar el uso de energías renovables."))
M("Nachhaltigkeit im Wohnheim",
 ("den Verbrauch senken","reducir el consumo",["ampliar el contrato","pagar el alquiler"]),
 ("Welcher Satz ist korrekt?",["Es wäre sinnvoll, Bewegungsmelder einzubauen.","Es wäre sinnvoll, Bewegungsmelder einbauen.","Es wäre sinnvoll, dass Bewegungsmelder einzubauen."],"Con verbos separables, «zu» va entre prefijo y raíz: ein-zu-bauen."),
 ("Die Studierenden sammeln Ideen: Licht ausschalten, Geräte nicht im Standby lassen, Thermostate um ein bis zwei Grad herunterdrehen. Die Hausverwaltung soll Ökostrom und Sparduschköpfe prüfen.","¿Qué debe revisar la administración?",["Electricidad ecológica y cabezales de ducha ahorradores","Cambiar a todos los inquilinos","Subir el alquiler"],"Las medidas de contrato e instalación corresponden a la administración."),
 ("Wer die Heizung um zwei Grad senkt, spart spürbar Energie. Wer länger weg ist, sollte sie ganz abdrehen. Manchen ist das allerdings zu kalt.","¿Qué se recomienda a quien está fuera mucho tiempo?",["Apagar la calefacción","Subirla al máximo","Abrir las ventanas"],"«ganz abdrehen» = cerrarla por completo."),
 ("Wir sollten gemeinsam Energie sparen.","Deberíamos ahorrar energía juntos."))
M("Plastik und Alternativen",
 ("der Kunststoff","el plástico (material sintético)",["el cartón","el vidrio"]),
 ("Ergänze: «Plastik ist kaum abbaubar, ___ bleibt es jahrelang im Meer.»",["deshalb","weil","obwohl"],"«deshalb» es un adverbio conectivo: ocupa la posición 1 y el verbo la 2."),
 ("Plastik steckt in Verpackungen, Kleidung und Kosmetik. Weil es kaum abbaubar ist, bleibt es jahrelang in der Umwelt. Forscher entwickeln deshalb Materialien aus Naturstoffen, die sich vollständig zersetzen.","¿Qué desarrollan los investigadores?",["Materiales de sustancias naturales que se descomponen del todo","Plásticos más resistentes","Envases más grandes"],"Buscan materiales naturales totalmente biodegradables."),
 ("Mikroplastik gelangt über Kleidung, Reifen und Kosmetik in die Gewässer. Man findet es inzwischen sogar im Trinkwasser.","¿Dónde se ha encontrado ya microplástico?",["Incluso en el agua potable","Solo en los océanos","Solo en las ciudades"],"«sogar im Trinkwasser» = incluso en el agua potable."),
 ("Wir müssen weniger Plastik verwenden.","Tenemos que usar menos plástico."))
M("Final und konzessiv",
 ("trotzdem","a pesar de eso, sin embargo",["por lo tanto","porque"]),
 ("Welche Variante ist korrekt? (final, nominal)",["Zur Stärkung des Immunsystems sollte man genug schlafen.","Um Stärkung des Immunsystems sollte man genug schlafen.","Für stärken das Immunsystem sollte man genug schlafen."],"«Zur + sustantivo» expresa finalidad en estilo nominal: Zur Stärkung = para fortalecer."),
 ("Wer regelmässig trainiert, bleibt länger fit. Trotz des Wissens um diese Vorteile treiben viele wenig Sport, weil der Erfolg nicht sofort sichtbar ist.","¿Por qué mucha gente hace poco deporte?",["Porque el éxito no se ve de inmediato","Porque el deporte está prohibido","Porque falta información"],"El problema es la recompensa tardía, no la falta de información."),
 ("Obwohl wir müde waren, haben wir noch einen Spaziergang gemacht. Um den Kopf frei zu bekommen, braucht man manchmal frische Luft.","¿Para qué salieron a pasear?",["Para despejar la cabeza","Para comprar pan","Para hacer una entrevista"],"«Um … zu» expresa el fin: despejar la cabeza."),
 ("Trotz der schlechten Prognose hat die Firma investiert.","A pesar del mal pronóstico, la empresa invirtió."))
M("Zukunftsgeschichte · Vermutungen",
 ("untergegangen","hundido, desaparecido",["recién construido","muy conocido"]),
 ("Welcher Satz drückt eine Vermutung aus?",["Das dürfte der Ursprungsplanet sein.","Das ist der Ursprungsplanet gewesen sein.","Das war dürfen der Ursprungsplanet."],"«dürfte» + infinitivo = probablemente, es de suponer."),
 ("Die Forscher fanden Spuren einer hochentwickelten Zivilisation. Wäre der Mond nicht verschwunden, würde der Planet sich noch drehen.","¿Qué habría pasado sin la desaparición de la luna?",["El planeta seguiría girando","El planeta sería más frío","La luna sería más grande"],"Condicional irreal: «Wäre … nicht verschwunden, würde … sich noch drehen»."),
 ("Hätten sie rechtzeitig reagiert, hätten die Bewohner den Planeten vielleicht gerettet. Stattdessen sind sie auf den Mond umgesiedelt.","¿Qué hicieron los habitantes?",["Se trasladaron a la luna","Se quedaron en el planeta","Destruyeron la luna"],"«umsiedeln auf den Mond» = trasladarse a la luna."),
 ("Das dürfte unser Ursprungsplanet sein.","Este probablemente sea nuestro planeta de origen."))
M("Beruf und Persönlichkeit",
 ("prägen","marcar, dar forma",["borrar","repartir"]),
 ("Welcher Satz ist richtig? Er behauptet, dass er sehr erfolgreich war.",["Er will sehr erfolgreich gewesen sein.","Er soll sehr erfolgreich sein gewesen.","Er will sehr erfolgreich ist."],"«wollen» + Infinitiv Perfekt: afirmación del propio sujeto (él dice que…)."),
 ("Die Datenanalystin sagt, sie arbeite heute sorgfältiger als im Studium. Fehler hätten jetzt Folgen für das ganze Unternehmen.","¿Por qué trabaja con más cuidado?",["Porque los errores afectan a toda la empresa","Porque la supervisan más","Porque cobra más"],"Los errores son más costosos ahora."),
 ("Juristen sollen oft übergenau sein, heisst es. Ob das stimmt, ist schwer zu belegen, denn man bemerkt nur die auffälligsten Vertreter einer Berufsgruppe.","¿Por qué es difícil probar los tópicos profesionales?",["Porque solo notamos a los casos más llamativos","Porque no existen juristas","Porque nadie habla de ello"],"«sollen» = se dice que (afirmación de terceros)."),
 ("Er will den Vertrag nie gesehen haben.","Afirma que nunca vio el contrato."))
M("Bewerbungsvideo",
 ("sich unter Beweis stellen","demostrar uno mismo su valía",["perder el tiempo","pedir vacaciones"]),
 ("Welche Aussage passt zu einem Bewerbungsvideo?",["Ich möchte mich Ihnen kurz vorstellen.","Hör mal zu, was ich kann.","Es gibt nichts über mich zu sagen."],"Un registro formal y claro es adecuado en un vídeo de candidatura."),
 ("Ein Bewerbungsvideo sollte kurz sein, eine klare Botschaft haben und authentisch wirken. Technisch schlechte Aufnahmen schaden dem Eindruck.","¿Qué perjudica a un vídeo de candidatura?",["Una mala calidad técnica","Una presentación breve","Una imagen neutral"],"Calidad técnica deficiente = mala impresión."),
 ("Sprechen Sie frei, lächeln Sie freundlich und nennen Sie Ihre wichtigsten Stärken. Hobbys, Alter und Wohnort gehören nicht in das Video.","¿Qué no debe aparecer en el vídeo?",["Aficiones, edad y lugar de residencia","Las fortalezas","Una presentación"],"El texto indica que esos datos no se mencionan."),
 ("Ich bin motiviert und teamfähig.","Estoy motivado y sé trabajar en equipo."))
M("Kausal und modal",
 ("aufgrund","debido a (+ genitivo)",["gracias a (+ dativo)","a pesar de (+ genitivo)"]),
 ("Welche Variante passt zu «weil die Auswahl riesig ist»?",["Aufgrund der riesigen Auswahl","Wegen die riesige Auswahl","Auf der riesigen Auswahl"],"«aufgrund» + genitivo: aufgrund der riesigen Auswahl."),
 ("Durch das Ausprobieren verschiedener Tätigkeiten findet man heraus, was einem liegt. Indem man sich mit den eigenen Motiven beschäftigt, trifft man bessere Entscheidungen.","¿Cómo se toman mejores decisiones?",["Ocupándose de los propios motivos","Evitando probar cosas","Copiando a los demás"],"«Indem …» = al/mediante + gerundio: modal."),
 ("Wegen des Personalmangels bleiben viele Stellen unbesetzt. Dank flexibler Arbeitszeiten gewinnen Firmen jedoch neue Beschäftigte.","¿Qué ayuda a ganar nuevo personal?",["Horarios flexibles","Menos sueldos","Más vacaciones obligatorias"],"«Dank flexibler Arbeitszeiten» = gracias a los horarios flexibles."),
 ("Wegen der Verspätung beginnt die Sitzung später.","Debido al retraso, la reunión empieza más tarde."))
M("Gender Pay Gap",
 ("die Lohnlücke","la brecha salarial",["la jornada completa","el contrato temporal"]),
 ("Welche Aussage ist korrekt?",["Der bereinigte Wert berücksichtigt Branche und Position.","Der bereinigte Wert berücksichtigt nichts.","Der bereinigte Wert zählt nur Männer."],"El valor ajustado incluye sector, cualificación y puesto."),
 ("Frauen verdienen im Durchschnitt weniger als Männer. Die Lücke wird kleiner, wenn man Branche, Qualifikation und Position berücksichtigt, verschwindet aber nicht ganz.","¿Qué ocurre al considerar sector y puesto?",["La brecha se reduce, pero no desaparece","La brecha desaparece del todo","La brecha crece"],"«verschwindet nicht ganz» = no desaparece del todo."),
 ("Das Entgelttransparenzgesetz gibt Beschäftigten das Recht zu erfahren, was Kollegen mit vergleichbaren Aufgaben verdienen. Es gilt allerdings nur für Unternehmen mit mehr als fünfzig Mitarbeitenden.","¿Para quién rige la ley?",["Para empresas con más de 50 empleados","Para todas las empresas","Solo para funcionarios"],"Las empresas pequeñas están exentas."),
 ("Gleiche Arbeit sollte gleich bezahlt werden.","El mismo trabajo debería pagarse igual."))
M("Besprechungen leiten",
 ("jemanden ausreden lassen","dejar terminar de hablar a alguien",["interrumpir a alguien","olvidar a alguien"]),
 ("Welche Bitte ist angemessen?",["Könnten Sie mich bitte ausreden lassen?","Halten Sie den Mund.","Das ist egal."],"Una petición cortés y clara sin ser agresivo."),
 ("Die Leiterin sagt: Wir sollten nicht zu weit vom Thema abschweifen. Die Frage war, wie wir die Arbeitsabläufe verbessern können.","¿Qué quiere la dirigente?",["Volver al tema central","Terminar la reunión","Cambiar de tema"],"«vom Thema abschweifen» = desviarse del tema."),
 ("Angesichts der knappen Zeit sollten wir uns auf Tagesordnungspunkt vier konzentrieren. Dazu habe ich etwas vorbereitet.","¿Por qué se pasa al punto cuatro?",["Porque queda poco tiempo","Porque el tema es aburrido","Porque falta gente"],"«Angesichts der knappen Zeit» = dado que queda poco tiempo."),
 ("Lassen Sie uns bitte beim Thema bleiben.","Sigamos con el tema, por favor."))
M("Geschmack · Redewiedergabe",
 ("das Urteil","el juicio, la valoración",["la subida","el acento"]),
 ("Welche Wendung leitet eine Quellenangabe ein?",["Laut Professor Osanna …","Weil Professor Osanna …","Obwohl Professor Osanna …"],"«laut» + nombre introduce la fuente de una información; «weil» y «obwohl» introducen subordinadas."),
 ("Seit einiger Zeit ist Umami als fünfte Geschmacksrichtung anerkannt. Es ist ein herzhafter Geschmack, den man von Fleisch, Käse oder Pilzen kennt.","¿Qué es el umami?",["Un sabor sabroso, como el de carne, queso o setas","Un sabor dulce","Un sabor amargo"],"Se describe como sabroso y «herzhaft»."),
 ("Erfolgreiche Hits mischen Erwartbares mit einer Überraschung. Wie wir Musik bewerten, hängt von Erinnerungen, Wissen und Kultur ab.","¿De qué depende nuestra valoración de la música?",["De recuerdos, conocimientos y cultura","Solo del volumen","Solo de la edad"],"El texto enumera recuerdos, conocimientos y cultura."),
 ("Dem Experten zufolge sei das Urteil subjektiv.","Según el experto, el juicio es subjetivo."))
M("Kunst am Bau",
 ("das Kunstwerk","la obra de arte",["el edificio","el presupuesto"]),
 ("Welche Aussage drückt Zustimmung mit Einschränkung aus?",["Da haben Sie schon recht, trotzdem finde ich es abstrakt.","Das ist mir völlig gleichgültig.","Ich verstehe kein Wort."],"«Da haben Sie schon recht, trotzdem …» concede y matiza."),
 ("Bei öffentlichen Bundesgebäuden muss ein Teil der Baukosten für Kunst ausgegeben werden. Das soll Kunst für alle sichtbar machen.","¿Para qué sirve «Kunst am Bau»?",["Para hacer visible el arte a todos","Para decorar solo museos","Para ahorrar dinero"],"Una parte del coste se dedica a obras visibles en edificios públicos."),
 ("Manche halten das Geld für besser investiert, etwa in bezahlbaren Wohnraum. Andere sagen, Kunst regt zum Nachdenken und zum Gespräch an.","¿Qué argumento a favor se menciona?",["Invita a reflexionar y a conversar","Es barata","No necesita mantenimiento"],"Argumento positivo: genera conversación y reflexión."),
 ("Kunst am Bau wertet einen Ort auf.","El arte en edificios revaloriza un lugar."))
M("Humor und Ironie",
 ("die Pointe","el remate, el chiste final",["la rima","el principio"]),
 ("Welche Aussage ist ironisch?",["Na toll, noch ein Termin um sieben Uhr morgens!","Der Termin ist um sieben Uhr morgens.","Ich komme pünktlich."],"La ironía dice lo contrario de lo que se piensa, con tono enfático."),
 ("Sie erzählt, sie habe als Kind siebzehn Stunden am Tag fernsehen dürfen. Dadurch sei sie, sagt sie lachend, sehr weltgewandt gewesen.","¿Qué efecto tiene su tono?",["Ironía sobre su infancia","Un reproche serio","Una instrucción"],"Exagera para criticar con humor."),
 ("Manche mögen Memes und kurze Sketche in sozialen Netzwerken, weil jeder selbst Inhalte produzieren kann. Anderen gefällt politisches Kabarett besser.","¿Qué diferencia se señala?",["Gustos distintos: memes frente a cabaré político","Todos prefieren lo mismo","Nadie ve vídeos"],"Dos grupos con preferencias diferentes."),
 ("Das ist wirklich eine tolle Idee – nicht!","¡Qué gran idea… no!"))
M("Indefinita · manche, einige, etliche",
 ("einzelne","algunos (pocos), individuales",["todos","ninguno"]),
 ("Welche Form ist korrekt?",["In manchen kleinen Dörfern gibt es noch Läden.","In manchen kleine Dörfern gibt es noch Läden.","In manche kleinen Dörfern gibt es noch Läden."],"Después de «manchen» (dativo plural) el adjetivo lleva -en."),
 ("Kartoffeln gibt es in etlichen Ländern in vielen Varianten. Einige Rezepte stammen aus Irland, manche aus Peru. Die Herkunft jedes einzelnen Gerichts lässt sich kaum nachverfolgen.","¿Qué se dice del origen de los platos?",["Es difícil rastrear el origen de cada plato","Todos proceden de Alemania","Se conoce perfectamente"],"«lässt sich kaum nachverfolgen» = apenas puede rastrearse."),
 ("Wir haben alle möglichen Zutaten ausprobiert, aber nur wenige mutige Gäste wollten den süssen Kartoffelsalat kosten. Einige fanden ihn überraschend gut.","¿Qué pasó con la ensalada dulce?",["Pocos la probaron y a algunos les gustó","Nadie la probó","Todos la rechazaron"],"«nur wenige» = solo unos pocos; «einige» = algunos."),
 ("Etliche Kleinigkeiten haben sich verändert.","Bastantes detalles han cambiado."))
M("Grundgesetz",
 ("die Würde des Menschen","la dignidad humana",["el derecho de voto","la libertad de prensa"]),
 ("Welcher Satz steht im Vorgangspassiv?",["Das Grundgesetz wurde 1949 verkündet.","Das Grundgesetz ist 1949 verkündet.","Das Grundgesetz hat 1949 verkündet."],"Vorgangspassiv = werden + participio; «ist verkündet» sería Zustandspassiv."),
 ("Nach dem Krieg war Deutschland in vier Besatzungszonen geteilt. 1949 wurde das Grundgesetz unterzeichnet und am nächsten Tag verkündet. 1990 wurde es zur Verfassung des vereinten Deutschlands.","¿Cuándo pasó a ser constitución de toda Alemania?",["En 1990","En 1949","En 1945"],"«1990 wurde es zur Verfassung des vereinten Deutschlands»."),
 ("Das Recht auf freie Meinungsäusserung, die Pressefreiheit und die Versammlungsfreiheit gehören zu den Grundrechten. Niemand darf wegen seines Geschlechts oder seines Glaubens benachteiligt werden.","¿Qué está prohibido?",["Discriminar por sexo o creencias","Reunirse en público","Publicar periódicos"],"El texto prohíbe la discriminación por sexo o religión."),
 ("Alle Menschen sind vor dem Gesetz gleich.","Todas las personas son iguales ante la ley."))
M("Arbeitsrecht im Alltag",
 ("die Fürsorgepflicht","el deber de cuidado y protección del empleador",["el derecho a vacaciones","la prima salarial"]),
 ("Welcher Satz ist eine Passiversatzform für «Man muss die Vorschriften beachten»?",["Die Vorschriften sind zu beachten.","Die Vorschriften beachten sind.","Die Vorschriften sind beachtet zu."],"«sein + zu + infinitivo» equivale a «müssen» en pasiva."),
 ("Wer sich schikaniert fühlt, sollte zuerst das Gespräch suchen. In grösseren Firmen kann man sich an den Betriebsrat wenden, sonst an die Gewerkschaft.","¿Qué se recomienda primero?",["Hablar con las personas implicadas","Presentar una demanda","Dimitir"],"«zuerst das Gespräch suchen» = primero buscar el diálogo."),
 ("Private E-Mails vom Dienstrechner zu schreiben ist riskant. Wenn der Arbeitgeber Kontrollen vorher ankündigt und eine nicht erlaubte private Nutzung nachweist, kann das Folgen haben.","¿Qué es arriesgado?",["Usar el ordenador de la empresa para asuntos privados","Escribir correos de trabajo","Trabajar desde casa"],"El uso privado no permitido puede tener consecuencias."),
 ("Der Arbeitgeber hat eine Fürsorgepflicht.","El empleador tiene un deber de cuidado."))
M("Tempolimit",
 ("die Geschwindigkeitsbegrenzung","el límite de velocidad",["el atasco","el peaje"]),
 ("Ergänze: «Ich fahre nicht schneller als 130, ___ ich bin spät dran.»",["es sei denn","weil","damit"],"«es sei denn» introduce una excepción: salvo que."),
 ("Viele fordern Tempo 130 auf der Autobahn, um Unfälle, Lärm und Emissionen zu reduzieren. Andere halten das für Bevormundung und verweisen auf die Eigenverantwortung der Fahrer.","¿Qué argumento usan los críticos?",["Que es una tutela y debe primar la responsabilidad individual","Que las autopistas son seguras","Que los coches son lentos"],"«Bevormundung» = paternalismo/tutela."),
 ("Studien zeigen, dass man bei Tempo 120 oft am schnellsten vorankommt, weil es weniger Staus gibt. Ein entspannteres Fahren ist ein weiterer Vorteil.","¿Por qué se avanza más rápido a 120?",["Porque hay menos atascos","Porque los coches son más eficientes","Porque hay más carriles"],"Menos atascos = más fluidez."),
 ("Ein Tempolimit würde die Sicherheit erhöhen.","Un límite de velocidad aumentaría la seguridad."))
M("Folge und Ausnahme",
 ("andernfalls","de lo contrario",["además","por ejemplo"]),
 ("Ergänze: «Du musst sofort anrufen, ___ verlierst du den Termin.»",["sonst","damit","obwohl"],"«sonst» + verbo en 2ª posición: de lo contrario."),
 ("Der Vertrag gilt nur, wenn beide unterschreiben. Andernfalls ist er ungültig. Ausnahmen gibt es nicht, es sei denn, die Parteien einigen sich schriftlich anders.","¿Cuándo es válido el contrato?",["Si firman ambas partes","Si firma solo una parte","Siempre"],"«nur, wenn beide unterschreiben» = solo si ambas firman."),
 ("Ich komme morgen mit, ausser es regnet stark. Dann bleiben wir lieber zu Hause.","¿Qué ocurre si llueve mucho?",["Se quedan en casa","Van igualmente","Cambian de ciudad"],"«ausser …» marca una excepción."),
 ("Du musst unterschreiben, sonst gilt der Vertrag nicht.","Tienes que firmar; si no, el contrato no es válido."))
M("True Crime und Kriminalität",
 ("die Straftat","el delito",["la sentencia","el testigo"]),
 ("Welche Formulierung passt zu einer positiven Buchkritik?",["Das Buch besticht durch seine genaue Recherche.","Das Buch langweilt mit Längen.","Das Buch bietet nichts Neues."],"«besticht durch» expresa valoración muy positiva."),
 ("Das Interesse an True Crime wächst. Über sechzig Prozent der Hörer sind Frauen, das Durchschnittsalter liegt bei Ende zwanzig. Als Gründe nennen sie Realitätsbezug, Nervenkitzel und die Lust, mitzurätseln.","¿Qué perfil tiene el público?",["Mayoría de mujeres, edad media cerca de treinta","Mayoría de hombres mayores","Solo estudiantes"],"Más del 60 % son mujeres; edad media hacia los 30."),
 ("Die Kriminalitätsrate in Deutschland ist vergleichsweise niedrig, die häufigsten Delikte sind Diebstahl und Betrug. Schwere Gewaltverbrechen sind selten.","¿Cuáles son los delitos más frecuentes?",["Robo y estafa","Asesinato","Secuestro"],"«Diebstahl und Betrug» = robo y fraude."),
 ("Man kann beim Zuhören miträtseln.","Se puede intentar adivinar mientras se escucha."))
M("Beschwerden formulieren",
 ("die Beschwerde","la queja, la reclamación",["el pedido","la factura"]),
 ("Welche Formulierung ist höflich-förmlich?",["Ich wende mich heute schriftlich an Sie, weil …","Ey, was soll das?","Ihr habt alles vermasselt."],"Registro formal y neutro para una reclamación."),
 ("Guten Tag, hier ist Milan Schultz. Ihre Lieferung kam erst heute, obwohl der dritte März garantiert war. Wir brauchen die Mappen nicht mehr.","¿Cuál es el problema?",["La entrega llegó tarde y ya no la necesitan","La entrega llegó antes de tiempo","Faltan facturas"],"Entrega fuera de plazo; ya no sirve."),
 ("Es tut mir leid, dass die Lieferung zu spät ankam. Ich storniere die Rechnung und kläre, was mit der Ware passiert.","¿Qué hace el empleado?",["Anula la factura y aclara qué pasa con la mercancía","Cobra un recargo","Rechaza la queja"],"«stornieren» = anular."),
 ("Ich möchte mich über die verspätete Lieferung beschweren.","Quisiera quejarme por la entrega con retraso."))
M("Körpersprache · Redewendungen",
 ("kalte Füsse bekommen","echarse atrás por miedo, dudar",["tener frío","ganar dinero"]),
 ("Welches Verb ergänzt die Redewendung? «Er hat kurz vor der Prüfung kalte Füsse ___.»",["bekommen","gemacht","gewaschen"],"La locución fija es «kalte Füsse bekommen»."),
 ("Wir kommunizieren ständig, auch ohne Worte. Ein genervter Blick oder ein Augenrollen verraten unsere Gefühle in wenigen Sekunden. In emotionalen Situationen ist es fast unmöglich, die Körpersprache zu unterdrücken.","¿Cuándo es casi imposible controlar el lenguaje corporal?",["En situaciones emocionales","Al hablar por teléfono","Al leer"],"«emotionalen Situationen» = situaciones emocionales."),
 ("Ein Lächeln wird fast überall als Zeichen von Freundlichkeit verstanden. Manche Gesten bedeuten in anderen Kulturen jedoch etwas ganz anderes.","¿Qué advierte el texto?",["Algunos gestos significan otra cosa en otras culturas","Todos los gestos son universales","La sonrisa es ofensiva"],"Los gestos aprendidos dependen de la cultura."),
 ("Er hat kalte Füsse bekommen.","Se le enfriaron los pies (se echó atrás)."))
M("Sport und Gehirn",
 ("die Trägheit","la pereza, la inercia",["la fuerza","la velocidad"]),
 ("Welche Präposition passt? «___ der Anstrengung macht Sport Spass.»",["Trotz","Wegen","Aufgrund"],"«trotz» + genitivo expresa concesión: a pesar de."),
 ("Bewegung beschleunigt die Herzleistung, lässt die Körpertemperatur steigen und fördert die Heilung. Schon dreissig Minuten täglich können die Gedächtnisleistung verbessern.","¿Qué mejora con 30 minutos al día?",["La memoria","La visión","La altura"],"«Gedächtnisleistung» = rendimiento de la memoria."),
 ("Das Gehirn bevorzugt schnelle Belohnung. Der Nutzen von Sport zeigt sich aber erst später, deshalb vermeiden viele Menschen Bewegung.","¿Por qué muchos evitan el ejercicio?",["Porque el beneficio llega más tarde","Porque es peligroso","Porque es caro"],"La recompensa del deporte es diferida."),
 ("Trotz des Regens gehe ich joggen.","A pesar de la lluvia, salgo a correr."))
M("Telemedizin",
 ("die Videosprechstunde","la consulta por videollamada",["la receta","la baja laboral"]),
 ("Ergänze: «Die Ärztin hat Bedenken, ___ die Diagnose online sicher ist.»",["ob","dass","wenn"],"«Bedenken, ob …» expresa duda sobre si algo es posible."),
 ("Für kranke und wenig mobile Menschen sind Videosprechstunden ein grosser Gewinn. Ältere Menschen kommen mit digitalen Plattformen aber oft nicht gut zurecht.","¿Qué dificultad se menciona?",["Los mayores a veces no manejan bien las plataformas","Los médicos no tienen tiempo","Faltan pacientes"],"Brecha digital entre los mayores."),
 ("Auf dem Land fehlen Hausärzte. Digitale Gemeinschaftspraxen könnten eine grosse Region versorgen. Bei Zweifeln müssen Patienten trotzdem in die Praxis kommen.","¿Qué pasa si hay dudas?",["El paciente debe ir a la consulta presencial","Se repite la videollamada","Se cancela el tratamiento"],"Las dudas obligan a una visita presencial."),
 ("Digitale Angebote ersetzen den Praxisbesuch nicht vollständig.","Las ofertas digitales no sustituyen del todo la visita a la consulta."))
M("Medizinserien · Infinitiv Perfekt",
 ("etwas bedauern","lamentar algo",["celebrar algo","exigir algo"]),
 ("Welcher Satz ist korrekt?",["Er bedauert, zu lange gewartet zu haben.","Er bedauert, zu lange warten zu haben.","Er bedauert, zu lange gewartet haben."],"Infinitivo perfecto con «zu»: Partizip II + zu + haben/sein."),
 ("In vielen Krankenhausserien steht der Arzt als Autorität im Mittelpunkt. Die Zuschauer haben das Gefühl, in eine besondere medizinische Welt einzutauchen und nebenbei etwas gelernt zu haben.","¿Qué sensación tiene el público?",["La de haber aprendido algo de la medicina","La de que todo es falso","La de aburrirse siempre"],"«etwas gelernt zu haben» = haber aprendido algo."),
 ("Sie meint, die Ärzte in Serien hätten nie Zeit zum Plaudern. Er glaubt, die Realität sei weniger dramatisch. Beide geben zu, die Serie jede Woche gesehen zu haben.","¿Qué admiten ambos?",["Que han visto la serie cada semana","Que nunca la vieron","Que son médicos"],"Infinitivo perfecto: «gesehen zu haben»."),
 ("Ich bedauere, nicht früher gekommen zu sein.","Lamento no haber venido antes."))
M("Durchhalten und Aufgeben",
 ("durchhalten","aguantar, perseverar",["empezar","descansar"]),
 ("Welcher Nebensatz ist korrekt?",["Wer sein Ziel nicht erreicht, sollte es anpassen.","Wer sein Ziel nicht erreicht, es sollte anpassen.","Wer nicht sein Ziel erreicht sollte, es anpassen."],"En el relativo con «wer» el verbo conjugado va al final; la principal empieza por el verbo."),
 ("Wer sich zu hohe Ziele setzt, fällt schnell in alte Routinen zurück. Besser ist es, Störungen wie schlechtes Wetter von Anfang an einzuplanen.","¿Qué se aconseja?",["Contar desde el principio con posibles obstáculos","Fijar metas muy altas","Rendirse pronto"],"Planificar interferencias aumenta las posibilidades."),
 ("Wenn ein Ziel auf Dauer nicht erreichbar ist, kann Aufgeben die bessere Option sein. Dann passt man das Ziel an und hat wieder ein Erfolgserlebnis.","¿Qué ocurre al adaptar la meta?",["Se logra de nuevo una sensación de éxito","Se pierde la motivación","Se pierde dinero"],"Adaptar la meta devuelve experiencias de éxito."),
 ("Ich passe mein Ziel an die Realität an.","Adapto mi meta a la realidad."))
M("Irgendwas ist immer · Hausstaub",
 ("der Staub","el polvo",["el humo","la ceniza fina"]),
 ("Welcher Satz ist korrekt?",["Sofern Sie eine Allergie haben, sollten Sie täglich lüften.","Sofern Sie haben eine Allergie, sollten Sie täglich lüften.","Sofern Sie eine Allergie, sollten Sie täglich lüften haben."],"«sofern» introduce una subordinada: verbo conjugado al final."),
 ("Hausstaub besteht aus Hautschuppen, Fasern, Haaren und Pollen. Er sammelt sich besonders an Wänden und auf Geräten, weil diese den Staub anziehen.","¿Por qué se acumula el polvo en los aparatos electrónicos?",["Porque los atraen","Porque se calientan","Porque se limpian mal"],"La radiación electromagnética atrae el polvo."),
 ("Falls Staub nicht regelmässig beseitigt wird, vermehren sich Hausstaubmilben. Für Allergiker ist das ein Problem, vorausgesetzt, sie reagieren empfindlich.","¿Quién tiene un problema con los ácaros?",["Las personas alérgicas sensibles","Todos por igual","Solo los niños"],"Los alérgicos sensibles reaccionan."),
 ("Irgendwas ist immer.","Siempre pasa algo."))
M("Peinlichkeit und Fremdscham",
 ("das Missgeschick","el contratiempo, el percance",["el regalo","el trayecto"]),
 ("Ergänze: «Ich schäme mich, ___ ich den Anhang vergessen habe.»",["weil","obwohl","damit"],"«weil» explica la causa de la vergüenza."),
 ("Peinlichkeit braucht Publikum. Allein zu Hause zucken wir bei einem Missgeschick nur mit den Schultern. Erst wenn wir uns bewertet fühlen, werden wir rot.","¿Cuándo sentimos vergüenza?",["Cuando nos sentimos observados y valorados","Cuando estamos solos","Cuando cantamos"],"Hace falta un público real o imaginado."),
 ("Fremdschämen bedeutet, sich stellvertretend für andere zu schämen. Was als peinlich gilt, ist zum Teil kulturell verschieden.","¿Qué es «Fremdschämen»?",["Avergonzarse por otra persona","Avergonzarse de lo extranjero","Reírse de alguien"],"«stellvertretend» = en nombre de otro."),
 ("Mir ist das Missgeschick wirklich peinlich.","Este percance me da mucha vergüenza."))
M("Rebound-Effekt · Partizipialattribut",
 ("der Verbrauch","el consumo",["la producción","el reciclaje"]),
 ("Welche Form ist korrekt? «der durch Rebound-Effekte ___ Verbrauch» (steigen)",["steigende","steigenden","steigendes"],"Partizip I atributivo: «der steigende Verbrauch» (proceso en curso)."),
 ("Energiesparende Geräte senken den Verbrauch. Der eingesparte Strom wird aber oft für andere Zwecke genutzt, sodass der Gesamtverbrauch trotzdem steigt.","¿Qué pasa con la electricidad ahorrada?",["Se usa para otros fines y el consumo total puede subir","Se pierde","Se vende al extranjero"],"Esa es la esencia del efecto rebote."),
 ("Wer ein Umweltbewusstsein besitzt, verschiebt den Verbrauch seltener. Eine rein materielle Motivation löst dagegen eher Kompensationseffekte aus.","¿Qué provoca más efectos de compensación?",["La motivación puramente material","La conciencia ecológica","La educación"],"La motivación puramente económica es más propensa."),
 ("Der steigende Verbrauch ist ein Problem.","El consumo creciente es un problema."))
M("Studieren in Deutschland",
 ("das duale Studium","el estudio dual (teoría y práctica en empresa)",["el curso por correspondencia","el año sabático"]),
 ("Welcher Satz ist korrekt?",["Während des Studiums gibt es eine längere Praxisphase.","Während das Studium gibt es eine längere Praxisphase.","Während des Studium gibt es eine längere Praxisphase."],"«während» + genitivo: während des Studiums."),
 ("An Universitäten ist das Studium stärker wissenschaftlich orientiert. Hochschulen für angewandte Wissenschaften legen grossen Wert auf Praxisphasen und kleinere Gruppen.","¿En qué se diferencian las universidades?",["Son más teóricas y científicas","Son siempre privadas","Solo ofrecen cursos online"],"Universidad = orientación científica; HAW = práctica."),
 ("Beim dualen Studium wechseln sich Praxis und Theorie ab, meist in Blöcken von drei Monaten. Man erhält ein festes Gehalt und hat gute Chancen auf Übernahme.","¿Qué ventaja tiene el estudio dual?",["Sueldo fijo y buenas posibilidades de contratación","Vacaciones largas","Ningún examen"],"Sueldo desde el principio y probabilidad de ser contratado."),
 ("Ich möchte ein duales Studium beginnen.","Quiero empezar un estudio dual."))
M("Dialekte und Varietäten",
 ("die Mundart","el dialecto",["el acento extranjero","la jerga juvenil"]),
 ("Welcher Satz ist korrekt?",["Dialekte tragen zur regionalen Identität bei.","Dialekte tragen regionalen Identität bei zu.","Dialekte zu tragen regionale Identität bei."],"«beitragen zu + Dativ»: tragen … bei zu der regionalen Identität."),
 ("In Deutschland gibt es etwa zwanzig grosse Dialektgruppen. Im Beruf sprechen die meisten Hochdeutsch, einige mischen beides. Dialekt galt früher als hinderlich für die Karriere.","¿Qué se decía antes del dialecto?",["Que podía perjudicar la carrera","Que era obligatorio","Que solo lo hablaban políticos"],"«hinderlich für die Karriere» = obstáculo profesional."),
 ("Das Wort für Pferd klingt je nach Region verschieden: Ross, Gaul oder Pferd. Der Sinn bleibt gleich, nur die Wörter unterscheiden sich.","¿Qué diferencia hay entre «Ross» y «Gaul»?",["Solo la región; significan lo mismo","Significan animales distintos","Uno es antiguo y otro técnico"],"Son sinónimos regionales."),
 ("Ich spreche zu Hause Dialekt.","En casa hablo dialecto."))
M("Sprache ist Macht",
 ("beschönigen","embellecer, edulcorar",["proteger","traducir"]),
 ("Welcher Satz ist korrekt? (untrennbar)",["Er hat die Aussage übersehen.","Er hat die Aussage gesehen über.","Er hat die Aussage übergesehen."],"«übersehen» (no ver) es inseparable: participio sin ge-."),
 ("Wörter wie «Erderwärmung» klingen fast beruhigend, obwohl sie eine ernste Entwicklung beschreiben. Solche Beschönigungen kleinreden gesellschaftliche Probleme.","¿Qué efecto tienen los eufemismos?",["Minimizan los problemas","Los resuelven","Los traducen"],"«kleinreden» = quitar importancia."),
 ("Positive Formulierungen werden besser verstanden als Verneinungen. Statt «Nicht kratzen!» sagt man besser «Bitte nicht berühren» oder gleich positiv formuliert.","¿Qué es mejor?",["Formular en positivo","Usar siempre negaciones","Evitar las frases"],"El cerebro procesa mejor lo positivo."),
 ("Sprache beeinflusst unser Denken.","El lenguaje influye en nuestro pensamiento."))
M("Besser konsumieren",
 ("der Verbraucher","el consumidor",["el productor","el vendedor"]),
 ("Ergänze: «Das Produkt ist zu teuer, ___ ich es mir leisten könnte.»",["als dass","um","damit"],"«zu … als dass» + Konjunktiv II: demasiado … como para que."),
 ("Im Supermarkt steht Obst und Gemüse oft am Eingang, weil es Appetit macht. Milch und Fleisch finden sich meist hinten, damit man den ganzen Laden durchqueren muss.","¿Por qué está la leche al fondo?",["Para que el cliente recorra toda la tienda","Por falta de espacio","Por razones de higiene"],"Los productos de compra frecuente se colocan al fondo."),
 ("Viele junge Menschen geben mehr Geld aus, als sie haben. Auf Plattformen sehen sie Influencer mit einem Lebensstil, den sie sich nicht leisten können. So entstehen Schulden.","¿Cómo se generan deudas según el texto?",["Por el gasto influido por un estilo de vida inalcanzable","Por falta de ingresos","Por impuestos"],"Se mencionan influencers y gastos excesivos."),
 ("Ich kaufe nur, was ich wirklich brauche.","Solo compro lo que realmente necesito."))
M("Wie wir ticken · Emotionen",
 ("sich auf etwas einlassen","aventurarse en algo, implicarse",["rechazar algo","olvidar algo"]),
 ("Welche Form ist korrekt? (Futur II)",["Nächsten Sommer werde ich meinen Abschluss gemacht haben.","Nächsten Sommer werde ich meinen Abschluss machen gehabt.","Nächsten Sommer habe ich meinen Abschluss machen werden."],"Futur II: werden + Partizip II + haben/sein."),
 ("Emotionen sind kurzlebige Reaktionen auf einen Anlass, Stimmungen halten länger an und haben oft keinen erkennbaren Auslöser. Beide beeinflussen unser Handeln.","¿En qué se diferencia una emoción de un estado de ánimo?",["La emoción es breve; el ánimo dura más","Son lo mismo","La emoción es siempre negativa"],"«kurzlebig» frente a «länger anhaltend»."),
 ("Angst lässt das Herz schneller schlagen und steigert den Blutdruck. Die Energie der Muskeln wird optimiert, damit man kämpfen oder fliehen kann.","¿Para qué sirven esas reacciones corporales?",["Para luchar o huir","Para dormir mejor","Para digerir"],"Respuesta de lucha o huida."),
 ("Emotionen bringen Farbe in unser Leben.","Las emociones aportan color a nuestra vida."))
