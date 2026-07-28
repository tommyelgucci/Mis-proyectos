# BANCO DE PREGUNTAS AI-103 — DOMAIN 4 EXTENDIDO (Q1011-Q1055)
## Domain 4: Responsible AI — Prompt Shields, privacidad, equidad medible, monitorización
### Generado: 2026-07-27 | Suplemento: D4 quedó el más flaco tras ampliar D1 y D3

---

**INSTRUCCIONES DE USO:** Mismo formato que el resto del banco. Cubre temas de IA responsable que la Parte 8 no toca: niveles de severidad y modos del filtro, Prompt Shields e inyección indirecta, blocklists y categorías propias, detección de material protegido y de fundamentación, privacidad y retención de datos, compromiso de copyright, equidad medible, y monitorización de deriva.

---

### Q1011
**¿Qué niveles de severidad asigna Azure AI Content Safety al analizar texto?**

A) Solo "seguro" o "inseguro"
B) Una escala discreta de cuatro niveles: 0, 2, 4 y 6, de menor a mayor gravedad ✅
C) Un porcentaje del 0 al 100
D) Las letras A, B, C y D

**Explicación:** El servicio devuelve una severidad por categoría en esa escala discreta, y el umbral configurado decide a partir de qué nivel se bloquea. Entender que es una escala graduada, y no un binario, es lo que permite ajustar la sensibilidad por aplicación.

---

### Q1012
**¿Qué diferencia hay entre el modo "bloquear" y el modo "anotar" de un filtro de contenido?**

A) No existe el modo anotar
B) Bloquear impide que el contenido llegue al usuario; anotar lo deja pasar pero registra la clasificación para análisis ✅
C) Anotar es más restrictivo que bloquear
D) Ambos hacen exactamente lo mismo

**Explicación:** El modo de anotación permite medir la incidencia real de contenido problemático sin cortar la experiencia, útil durante la fase de MEDIR o al calibrar umbrales antes de activar el bloqueo en producción.

---

### Q1013
**¿Qué son los Prompt Shields de Azure AI Content Safety?**

A) Un cortafuegos de red delante del modelo
B) Una protección específica contra ataques que intentan manipular las instrucciones del modelo, tanto directos como incrustados en documentos ✅
C) Un limitador de longitud del prompt
D) Un cifrado de los prompts en tránsito

**Explicación:** Van más allá de las cuatro categorías de daño: detectan intentos de subvertir el comportamiento del sistema. Cubren tanto el ataque directo del usuario como el que viene escondido en contenido que el sistema procesa.

---

### Q1014
**¿Qué es un ataque de inyección de prompt INDIRECTA?**

A) Un usuario escribiendo "ignora tus instrucciones" en el chat
B) Instrucciones maliciosas escondidas dentro de un documento o página web que el sistema recupera y procesa como contexto ✅
C) Un ataque de denegación de servicio contra la API
D) Robar la clave de API del recurso

**Explicación:** Es el vector más peligroso en sistemas con RAG o navegación: el atacante no habla con el modelo, deja el texto malicioso en un documento que el modelo va a leer. El usuario legítimo dispara el ataque sin saberlo.

---

### Q1015
**Un agente con file_search indexa documentos que suben usuarios externos. ¿Qué riesgo específico aparece?**

A) Ninguno, los documentos son datos pasivos
B) Un documento puede contener instrucciones incrustadas que el modelo interprete como órdenes al recuperarlo ✅
C) Solo el riesgo de que ocupen espacio
D) Que el vector store se corrompa

**Explicación:** Es el caso de libro de inyección indirecta: para el modelo, el contenido recuperado y las instrucciones legítimas llegan como texto. Por eso hace falta Prompt Shields sobre el contenido recuperado y no solo sobre lo que escribe el usuario.

---

### Q1016
**¿Qué es una "blocklist" personalizada en Content Safety?**

A) Una lista de usuarios bloqueados
B) Una lista de términos propios de la organización que se bloquean además de las categorías estándar ✅
C) Una lista de modelos no permitidos
D) Una lista de direcciones IP prohibidas

**Explicación:** Las cuatro categorías estándar no conocen el contexto de cada negocio: nombres de competidores, terminología interna sensible o expresiones específicas del dominio requieren listas propias que complementen la clasificación general.

---

### Q1017
**¿Para qué sirven las "categorías personalizadas" de Content Safety?**

A) Para renombrar las cuatro categorías existentes
B) Para entrenar la detección de un tipo de contenido dañino propio del negocio que las categorías estándar no cubren ✅
C) Para desactivar la moderación
D) Para traducir las categorías a otros idiomas

**Explicación:** Permiten definir y detectar riesgos específicos del dominio, por ejemplo contenido sobre una actividad regulada concreta, que no encaja en odio, sexual, violencia ni autolesiones.

---

### Q1018
**¿Qué detecta la funcionalidad "Protected Material Detection"?**

A) Datos personales de los usuarios
B) Salidas del modelo que reproducen textualmente contenido con derechos de autor conocido, incluido código ✅
C) Documentos clasificados de la empresa
D) Contraseñas incluidas en el prompt

**Explicación:** Reduce el riesgo legal de que el modelo reproduzca literalmente letras de canciones, artículos o fragmentos de código bajo licencia. Existe en variante para texto y variante para código.

---

### Q1019
**¿Qué hace la detección de fundamentación (groundedness detection) de Content Safety?**

A) Verifica que el usuario esté autenticado
B) Señala afirmaciones de la respuesta que no se sostienen en el material de origen provisto ✅
C) Comprueba la ortografía de la respuesta
D) Mide la latencia de la generación

**Explicación:** Es una defensa contra alucinaciones aplicada como servicio de seguridad: compara la salida con las fuentes y marca lo que no está respaldado, permitiendo bloquear o advertir antes de mostrarlo al usuario.

---

### Q1020
**En un chatbot con streaming, ¿qué problema plantea la moderación de contenido?**

A) El streaming no es compatible con la moderación
B) El texto se va mostrando por fragmentos, así que hay que decidir entre filtrar por bloques con algo de latencia o mostrar y retirar ✅
C) La moderación duplica el costo en streaming
D) El streaming desactiva el filtro automáticamente

**Explicación:** Azure ofrece un filtro asíncrono precisamente por esta tensión: la moderación necesita ver suficiente contexto para clasificar bien, mientras que el streaming busca mostrar cuanto antes. Es una decisión de diseño entre seguridad y fluidez.

---

### Q1021
**¿Se usan los prompts y respuestas de Azure OpenAI para entrenar los modelos base de Microsoft o de OpenAI?**

A) Sí, todos por defecto
B) No: los datos del cliente no se usan para entrenar los modelos base ✅
C) Solo si el cliente está en el plan gratuito
D) Solo los prompts, no las respuestas

**Explicación:** Es una garantía contractual central del servicio y una diferencia clave frente a usar APIs de consumo. Aparece en preguntas sobre cumplimiento y privacidad empresarial.

---

### Q1022
**¿Con qué propósito puede Azure retener temporalmente prompts y respuestas?**

A) Para entrenar modelos futuros
B) Para monitorización de abuso, con retención limitada y acceso restringido a revisión autorizada ✅
C) Para venderlos a terceros
D) No se retiene absolutamente nada en ningún caso

**Explicación:** La monitorización de abuso busca detectar usos que violen las políticas. Es distinto de entrenar: los datos no alimentan los modelos, y existe un proceso para solicitar exención cuando el caso de uso lo justifica.

---

### Q1023
**Una empresa de salud no puede permitir que ningún dato salga a revisión humana por regulación. ¿Qué opción existe?**

A) Ninguna, es obligatorio siempre
B) Solicitar la exención de monitorización de abuso, sujeta a aprobación y a requisitos de elegibilidad ✅
C) Cambiar de región de Azure
D) Usar la API pública de OpenAI en su lugar

**Explicación:** Microsoft contempla un proceso de solicitud para escenarios con requisitos regulatorios estrictos. No es automático: hay que justificar el caso de uso y cumplir condiciones, lo cual es en sí parte de la gobernanza responsable.

---

### Q1024
**¿Qué es el Customer Copyright Commitment?**

A) Una licencia que el cliente cede a Microsoft sobre sus datos
B) El compromiso de Microsoft de asumir la defensa ante ciertas reclamaciones de copyright por las salidas del servicio, si el cliente aplicó las mitigaciones exigidas ✅
C) Un impuesto adicional por uso comercial
D) La obligación de citar a Microsoft en todo contenido generado

**Explicación:** El matiz que importa es la condicionalidad: la cobertura exige haber mantenido activas las mitigaciones requeridas, como la detección de material protegido. Desactivar las protecciones puede dejar al cliente fuera del compromiso.

---

### Q1025
**¿Qué es una "Nota de Transparencia" de Microsoft?**

A) Un aviso legal sobre precios
B) Un documento que describe capacidades, limitaciones y usos previstos y desaconsejados de un sistema de IA ✅
C) El registro de auditoría de las llamadas a la API
D) Un informe de facturación mensual

**Explicación:** Sirve para que quien construye sobre el servicio entienda dónde funciona bien y dónde no. Es materia prima de la fase de identificar daños, y también contenido para la capa 4 de cara al usuario final.

---

### Q1026
**¿Qué significa "supervisión humana significativa" (meaningful human oversight)?**

A) Que una persona lea todas las respuestas antes de enviarlas, siempre
B) Que exista una persona con la información, la autoridad y el tiempo real para revisar y revertir decisiones consecuentes ✅
C) Que haya un humano disponible por teléfono
D) Que el sistema pida confirmación con un botón

**Explicación:** La clave es que la supervisión sea efectiva y no ceremonial: aprobar automáticamente cientos de decisiones por minuto sin contexto suficiente no es supervisión, es un sello de goma. En decisiones de alto impacto el diseño debe darle a la persona capacidad real de intervenir.

---

### Q1027
**Un sistema decide automáticamente la aprobación de préstamos. ¿Qué exige el pilar de Responsabilidad?**

A) Que el modelo tenga la mayor precisión posible
B) Que haya rendición de cuentas humana sobre las decisiones y una vía para revisarlas o impugnarlas ✅
C) Que el modelo sea de código abierto
D) Que se use la temperatura más baja

**Explicación:** La precisión técnica no sustituye la responsabilidad: alguien debe responder por el sistema y las personas afectadas necesitan un camino para cuestionar una decisión que les perjudica.

---

### Q1028
**¿Qué mide la "paridad demográfica" como métrica de equidad?**

A) Que el modelo tenga el mismo error total en todos los datos
B) Que la proporción de resultados favorables sea similar entre grupos demográficos ✅
C) Que el dataset tenga el mismo número de filas por grupo
D) Que el modelo sea igual de rápido para todos

**Explicación:** Es una de las definiciones formales de equidad. Que sea la adecuada depende del contexto: distintas métricas de equidad pueden ser matemáticamente incompatibles entre sí, y elegir cuál aplicar es una decisión con juicio de valor, no puramente técnica.

---

### Q1029
**¿Qué mide la métrica de equidad "igualdad de oportunidades" (equalized odds)?**

A) Que todos reciban el mismo resultado
B) Que las tasas de acierto y de error del modelo sean comparables entre grupos ✅
C) Que el modelo se entrene el mismo tiempo por grupo
D) Que el coste de inferencia sea igual

**Explicación:** A diferencia de la paridad demográfica, que mira solo la proporción de resultados positivos, esta métrica exige que el modelo se equivoque de forma pareja entre grupos: un sistema puede repartir aprobaciones proporcionalmente y aun así fallar mucho más con un grupo concreto.

---

### Q1030
**Un modelo tiene 94% de acierto global pero 71% en un subgrupo minoritario. ¿Qué pilar está comprometido?**

A) Confiabilidad y Seguridad únicamente
B) Equidad: el desempeño agregado esconde un daño concentrado en un grupo ✅
C) Transparencia
D) Ninguno, 94% es un buen resultado

**Explicación:** Es la razón por la que se desagregan las métricas: una media alta puede convivir con un desempeño muy inferior para una minoría, y ese es exactamente el tipo de sesgo que el pilar de equidad busca detectar.

---

### Q1031
**¿Por qué se recomienda evaluar las métricas desagregadas por grupo y no solo la métrica global?**

A) Porque es más rápido de calcular
B) Porque la métrica global promedia y puede ocultar un desempeño muy malo en un subgrupo pequeño ✅
C) Porque Azure lo exige técnicamente
D) Porque reduce el costo de inferencia

**Explicación:** Un subgrupo que representa el 3% de los datos casi no mueve la media, así que un fallo sistemático contra ese grupo es invisible en el número agregado. Desagregar es la única forma de verlo.

---

### Q1032
**¿Qué es Fairlearn?**

A) Un modelo de lenguaje de Microsoft
B) Una biblioteca de código abierto para evaluar y mitigar problemas de equidad en modelos ✅
C) Un servicio de facturación
D) Un formato de dataset

**Explicación:** Ofrece métricas de equidad desagregadas y algoritmos de mitigación, integrándose con el panel de IA responsable. Es la herramienta que se nombra cuando la pregunta pide evaluar sesgo de forma sistemática.

---

### Q1033
**¿Qué aporta el "Responsible AI dashboard" de Azure Machine Learning?**

A) Métricas de facturación del recurso
B) Una vista unificada con análisis de errores, interpretabilidad, equidad y contrafactuales sobre un modelo ✅
C) El estado de salud de los servidores
D) El historial de conversaciones de los usuarios

**Explicación:** Agrupa en un solo lugar las herramientas de diagnóstico responsable, evitando tener que integrarlas por separado. Sirve para responder no solo "¿cuánto acierta?" sino "¿dónde falla y a quién perjudica?".

---

### Q1034
**¿Qué es un análisis "contrafactual" en la evaluación de un modelo?**

A) Contar cuántas veces se equivocó el modelo
B) Examinar qué cambio mínimo en la entrada habría cambiado la decisión del modelo ✅
C) Comparar dos modelos entre sí
D) Medir la latencia bajo carga

**Explicación:** Responde a la pregunta práctica de la persona afectada: "¿qué habría tenido que ser distinto para que me aprobaran?". También destapa dependencias indebidas, por ejemplo si cambiar solo el código postal invierte la decisión.

---

### Q1035
**¿Qué es la interpretabilidad de un modelo y por qué importa en IA responsable?**

A) Que el modelo hable varios idiomas
B) Poder explicar qué factores influyeron en una decisión, lo que permite auditarla y detectar sesgos ✅
C) Que el código fuente sea legible
D) Que la documentación esté bien escrita

**Explicación:** Sin interpretabilidad no se puede justificar una decisión ante quien la sufre ni detectar que el modelo se apoya en una variable inadmisible. Conecta directamente con los pilares de transparencia y responsabilidad.

---

### Q1036
**¿Qué diferencia hay entre "data drift" y "model drift"?**

A) Son sinónimos
B) Data drift es que cambia la distribución de los datos de entrada; model drift es que se degrada el desempeño del modelo ✅
C) Data drift solo ocurre en entrenamiento
D) Model drift solo afecta a modelos de imagen

**Explicación:** Suelen ir juntos porque lo primero causa lo segundo: si el mundo cambia y las entradas dejan de parecerse a los datos de entrenamiento, el modelo empieza a fallar. Vigilar la deriva de datos permite anticipar la caída de desempeño antes de que la sufran los usuarios.

---

### Q1037
**¿Por qué la monitorización continua es parte de la fase MANAGE y no algo opcional?**

A) Porque Azure cobra por ella
B) Porque el desempeño se degrada con el tiempo y aparecen riesgos nuevos que la evaluación previa al lanzamiento no podía prever ✅
C) Porque los modelos caducan a los 6 meses
D) Porque es un requisito de facturación

**Explicación:** Un sistema validado el día del lanzamiento no queda validado para siempre: cambian los datos, los usuarios encuentran usos imprevistos y los atacantes desarrollan técnicas nuevas. Por eso el ciclo de las cuatro fases es iterativo.

---

### Q1038
**¿Qué característica debe tener la telemetría de un sistema de IA para ser útil en un incidente?**

A) Guardar el texto íntegro de todas las conversaciones sin restricción
B) Ser suficiente para diagnosticar el problema respetando a la vez la privacidad de los usuarios ✅
C) Registrar solo el número total de peticiones
D) Almacenarse únicamente en el navegador del usuario

**Explicación:** Hay una tensión real entre observabilidad y privacidad: registrar todo facilita el diagnóstico pero crea un depósito de datos sensibles. El diseño responsable busca capturar lo necesario, con retención acotada y acceso controlado.

---

### Q1039
**Un usuario reporta que el bot le dio una respuesta ofensiva. ¿Qué debe permitir el sistema?**

A) Solo agradecer el reporte
B) Registrar el caso con contexto suficiente para reproducirlo, y alimentar con él la siguiente vuelta de medición y mitigación ✅
C) Bloquear automáticamente a ese usuario
D) Borrar la conversación de inmediato

**Explicación:** El feedback de usuarios es una fuente de detección que ninguna prueba interna sustituye: son casos reales que el equipo no anticipó. Cerrar el circuito hacia las fases de medir y mitigar es lo que convierte una queja en una mejora.

---

### Q1040
**¿Qué es un "uso sensible" (sensitive use) en el marco de IA responsable de Microsoft?**

A) Cualquier uso comercial del servicio
B) Un escenario que puede afectar significativamente oportunidades vitales, derechos o la seguridad de las personas ✅
C) Un uso que consume mucha cuota
D) Un uso en horario nocturno

**Explicación:** Contratación, crédito, vivienda, sanidad, justicia o seguridad física caen en esta categoría, que exige escrutinio adicional. Reconocer que un escenario es sensible cambia el nivel de revisión que corresponde.

---

### Q1041
**¿Por qué algunas capacidades de Azure AI requieren registro previo o acceso limitado?**

A) Para reducir la carga de los servidores
B) Porque su potencial de uso indebido exige verificar el caso de uso antes de habilitarlas ✅
C) Porque están en fase beta siempre
D) Porque solo funcionan en ciertas regiones

**Explicación:** El acceso limitado es en sí mismo una mitigación de gobernanza: para capacidades con riesgo elevado, como ciertos usos de reconocimiento facial, la puerta de entrada es un proceso de revisión y no un botón.

---

### Q1042
**¿Qué exige el pilar de Transparencia respecto a que el usuario sepa que habla con una IA?**

A) Nada, es opcional si la experiencia es buena
B) Que quede claro que se está interactuando con un sistema automatizado y no con una persona ✅
C) Que se publique el código fuente del modelo
D) Que se muestre el consumo de tokens

**Explicación:** Hacer pasar un sistema por humano vulnera directamente este pilar y, en varias jurisdicciones, también la ley. La divulgación debe ser evidente, no estar escondida en los términos de servicio.

---

### Q1043
**¿Qué relación tiene la accesibilidad con el pilar de Inclusión?**

A) Ninguna, son ámbitos separados
B) Un sistema que no es usable por personas con discapacidad excluye a parte de sus usuarios, incumpliendo el pilar ✅
C) La accesibilidad solo aplica a sitios web públicos
D) La inclusión se refiere únicamente al idioma

**Explicación:** Por eso la accesibilidad es una de las cuatro revisiones previas al lanzamiento. Un asistente solo por voz sin alternativa textual, por ejemplo, deja fuera a usuarios sordos.

---

### Q1044
**¿Qué implica el pilar de Confiabilidad y Seguridad respecto al comportamiento ante entradas inesperadas?**

A) Que el sistema debe responder algo siempre, sea lo que sea
B) Que debe degradar con elegancia y de forma predecible, en vez de fallar de manera errática o peligrosa ✅
C) Que debe reiniciarse automáticamente
D) Que debe tener el 100% de disponibilidad

**Explicación:** Un sistema fiable reconoce sus límites: decir "no tengo información suficiente" ante una entrada fuera de su alcance es más seguro que inventar una respuesta con seguridad aparente, sobre todo en dominios críticos.

---

### Q1045
**Un asistente médico no encuentra la respuesta en los documentos recuperados. ¿Cuál es el comportamiento responsable?**

A) Generar la respuesta más plausible con conocimiento general del modelo
B) Indicar que no dispone de información suficiente y derivar a un profesional ✅
C) Devolver la respuesta con menor confianza sin avisar
D) Repetir la pregunta al usuario indefinidamente

**Explicación:** En un dominio de alto riesgo, una alucinación segura de sí misma es más peligrosa que no responder. El sistema debe estar diseñado para reconocer el vacío de información en vez de rellenarlo.

---

### Q1046
**¿Qué es la "divulgación de contenido sintético" y por qué importa?**

A) Publicar el dataset de entrenamiento
B) Señalar que una imagen, audio o texto fue generado por IA, para no inducir a error sobre su origen ✅
C) Compartir los pesos del modelo
D) Documentar el consumo de tokens

**Explicación:** Con contenido generado cada vez más indistinguible del real, indicar la procedencia protege contra la desinformación. Conecta con transparencia y con iniciativas de credenciales de contenido y marcas de procedencia.

---

### Q1047
**¿Qué papel juega el system prompt como capa de mitigación frente a un ataque de jailbreak?**

A) Es la única defensa necesaria
B) Es una capa más: ayuda a resistir, pero no debe ser la única barrera porque puede sortearse ✅
C) No tiene ningún efecto
D) Reemplaza a Content Safety

**Explicación:** Un system prompt robusto eleva el listón, pero confiar solo en él es el error de diseño clásico. La defensa en profundidad existe precisamente porque cada capa puede fallar por separado.

---

### Q1048
**¿Por qué se dice que la mitigación es "defensa en profundidad"?**

A) Porque hay que aplicar la capa más profunda únicamente
B) Porque ninguna capa es infalible y su valor está en que un fallo en una lo compense otra ✅
C) Porque las capas se aplican en orden inverso
D) Porque solo la capa del modelo importa de verdad

**Explicación:** Es el mismo principio que en ciberseguridad: se asume que cada control fallará alguna vez, y la protección real surge de que un mismo daño tenga que atravesar varias barreras independientes.

---

### Q1049
**Una empresa desactiva el filtro de contenido para reducir latencia. ¿Qué consecuencias tiene más allá de lo técnico?**

A) Ninguna, es una decisión puramente de rendimiento
B) Elimina la capa 2 completa y puede además afectar a las condiciones del compromiso de copyright ✅
C) Solo aumenta ligeramente el costo
D) Mejora la calidad de las respuestas

**Explicación:** Las mitigaciones no son independientes de las garantías contractuales: apagar protecciones exigidas puede dejar a la organización fuera de coberturas como el Customer Copyright Commitment, además de quedarse sin una capa entera de defensa.

---

### Q1050
**¿Qué debe contener un plan de respuesta a incidentes de un sistema de IA?**

A) Solo el teléfono del proveedor de nube
B) Quién decide, cómo se contiene el daño, cómo se comunica a los afectados y cómo se revierte ✅
C) Únicamente el procedimiento de rollback técnico
D) El presupuesto anual del proyecto

**Explicación:** Un incidente de IA no es solo un fallo técnico: puede haber personas perjudicadas por decisiones erróneas. Por eso el plan cubre además la comunicación y la reparación, no únicamente restaurar el servicio.

---

### Q1051
**¿Por qué conviene tener un mecanismo para desactivar rápidamente una funcionalidad concreta del sistema?**

A) Para ahorrar costos en horas valle
B) Porque permite contener un daño detectado sin tumbar todo el servicio ✅
C) Porque lo exige el SDK
D) Para hacer pruebas A/B

**Explicación:** Poder apagar solo la parte problemática, en vez de elegir entre no hacer nada o caer entero, reduce muchísimo el tiempo de exposición al daño. Es la contención granular del plan de respuesta.

---

### Q1052
**Durante el Red Teaming de un bot de apoyo emocional aparece un fallo grave que no se había previsto. ¿Qué corresponde?**

A) Lanzar igual y arreglarlo después con feedback real
B) Volver a las fases de medir y mitigar antes de lanzar: el ciclo es iterativo, no lineal ✅
C) Reducir el alcance del Red Teaming
D) Documentarlo como riesgo aceptado sin más

**Explicación:** Encontrar un daño nuevo reabre el ciclo. Lanzar sabiendo de un fallo grave sin mitigarlo, en un dominio de salud mental, es exactamente lo que el marco busca impedir.

---

### Q1053
**¿Qué diferencia hay entre un daño causado por alucinación y uno causado por sesgo?**

A) Son el mismo problema con distinto nombre
B) La alucinación es información incorrecta; el sesgo es un trato sistemáticamente desigual entre grupos ✅
C) El sesgo solo ocurre en modelos de imagen
D) La alucinación solo ocurre con temperature alta

**Explicación:** Se mitigan de forma distinta: contra la alucinación funcionan RAG y verificación de fundamentación; contra el sesgo hacen falta datos representativos, métricas desagregadas y evaluación específica de equidad. Confundirlos lleva a aplicar la mitigación equivocada.

---

### Q1054
**¿Por qué la fase IDENTIFY debe involucrar perfiles diversos y no solo al equipo técnico?**

A) Para repartir la carga de trabajo
B) Porque quien no vive un riesgo difícilmente lo anticipa: la diversidad de perspectivas amplía los daños que se detectan ✅
C) Porque lo exige la documentación de Azure
D) Para acelerar el proceso

**Explicación:** Un equipo homogéneo tiene puntos ciegos homogéneos. Sumar perspectivas de negocio, legales, de accesibilidad y de las comunidades afectadas es lo que hace que aparezcan daños que el enfoque puramente técnico pasa por alto.

---

### Q1055
**En el examen, ante un escenario que menciona un grupo vulnerable y una decisión consecuente, ¿hacia dónde apunta casi siempre la respuesta?**

A) Hacia optimizar la latencia
B) Hacia la protección más estricta y la supervisión humana, aunque cueste algo de rendimiento o experiencia ✅
C) Hacia reducir el costo de inferencia
D) Hacia usar el modelo más grande disponible

**Explicación:** Es el patrón de respuesta de todo el dominio: cuando entran en juego personas vulnerables o decisiones de alto impacto, el marco de IA responsable prioriza la protección sobre la conveniencia. Ante la duda entre una opción más permisiva y una más protectora, la protectora.

---

## 📊 PROGRESO DE ESTE SUPLEMENTO

```
Q1011-Q1055 → 45 preguntas nuevas de Domain 4 (Responsible AI).
              Cobertura nueva respecto de la Parte 8: niveles de severidad y
              modos del filtro, Prompt Shields, inyección de prompt indirecta,
              blocklists y categorías personalizadas, material protegido,
              detección de fundamentación, moderación en streaming, privacidad
              y retención de datos, exención de monitorización, Customer
              Copyright Commitment, supervisión humana significativa, métricas
              de equidad (paridad demográfica, igualdad de oportunidades),
              Fairlearn y el panel de IA responsable, contrafactuales,
              interpretabilidad, data drift frente a model drift, usos
              sensibles, acceso limitado y divulgación de contenido sintético.
```
