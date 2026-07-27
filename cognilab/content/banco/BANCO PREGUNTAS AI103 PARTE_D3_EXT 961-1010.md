# BANCO DE PREGUNTAS AI-103 — DOMAIN 3 EXTENDIDO (Q961-Q1010)
## Domain 3: Optimización — chunking, reranking, evaluación, hiperparámetros
### Generado: 2026-07-27 | Suplemento: Domain 3 era el más flaco del banco (50 preguntas para un 22% de peso)

---

**INSTRUCCIONES DE USO:** Mismo formato que el resto del banco. Cubre temas de Domain 3 que la Parte 7 no toca: estrategias de chunking, reranking semántico, índices vectoriales, evaluadores de Azure AI Foundry, hiperparámetros y diagnóstico de Fine-Tuning, structured outputs, parámetros de muestreo menos conocidos, y RAG multiturno.

---

### Q961
**¿Qué problema causa un tamaño de chunk demasiado grande en un pipeline de RAG?**

A) El índice ocupa menos espacio pero pierde precisión
B) Se recupera mucho texto irrelevante junto al relevante, diluyendo el contexto y gastando tokens ✅
C) El modelo no puede procesarlo nunca
D) Los embeddings dejan de funcionar

**Explicación:** Un chunk grande mezcla varios temas, así que su embedding representa un "promedio" difuso y la recuperación pierde precisión; además se inyecta al prompt texto que no aporta, encareciendo la llamada. Chunks demasiado pequeños tienen el problema opuesto: pierden el contexto necesario para que el fragmento se entienda solo.

---

### Q962
**¿Cuál es el propósito del "overlap" (superposición) entre chunks consecutivos?**

A) Duplicar el contenido para tener respaldo
B) Evitar que una idea quede cortada justo en el límite entre dos chunks ✅
C) Reducir el tamaño total del índice
D) Acelerar la generación de embeddings

**Explicación:** Sin overlap, una frase o concepto que cae en el corte queda partido entre dos fragmentos y ninguno lo contiene completo. Un solapamiento típico del 10-15% preserva la continuidad semántica a costa de algo de redundancia en el índice.

---

### Q963
**¿Qué es el "semantic chunking" frente al chunking de tamaño fijo?**

A) Cortar siempre cada 500 caracteres exactos
B) Cortar respetando los límites naturales del contenido (párrafos, secciones, encabezados) ✅
C) Cortar por número de páginas del PDF
D) No cortar el documento en absoluto

**Explicación:** El chunking de tamaño fijo puede partir una tabla o una idea a la mitad; el semántico usa la estructura del documento (títulos, párrafos, secciones) para que cada fragmento sea una unidad coherente de significado, lo que suele mejorar la calidad de recuperación.

---

### Q964
**En Azure AI Search, ¿qué hace el "semantic ranker" (reranking semántico)?**

A) Genera los embeddings de los documentos
B) Reordena los resultados ya recuperados usando un modelo de lenguaje para priorizar los más relevantes a la intención de la consulta ✅
C) Elimina documentos duplicados del índice
D) Traduce las consultas a otro idioma

**Explicación:** El reranking es una segunda pasada sobre un conjunto ya recuperado: un modelo evalúa la relevancia real de cada candidato respecto a la consulta y los reordena. Mejora notablemente la precisión del top-N sin tener que reindexar nada.

---

### Q965
**¿Por qué el reranking se aplica sobre un subconjunto y no sobre todo el índice?**

A) Porque el índice no permite leerse completo
B) Porque es computacionalmente costoso: se usa como refinamiento sobre los mejores candidatos de una primera búsqueda rápida ✅
C) Porque solo funciona con menos de 10 documentos
D) Porque Azure lo cobra por documento indexado

**Explicación:** El patrón estándar es "retrieve then rerank": una búsqueda barata (vectorial o híbrida) recupera decenas de candidatos, y el reranker —mucho más caro por documento— solo evalúa esos. Aplicarlo a millones de documentos sería inviable en costo y latencia.

---

### Q966
**¿Qué es HNSW en el contexto de búsqueda vectorial?**

A) Un formato de archivo para embeddings
B) Un algoritmo de búsqueda aproximada de vecinos más cercanos, que sacrifica algo de exactitud por muchísima velocidad ✅
C) Un modelo de embeddings de Microsoft
D) Un protocolo de red para consultar índices

**Explicación:** Hierarchical Navigable Small World construye un grafo navegable que permite encontrar vectores cercanos sin comparar contra todos los del índice. Es el algoritmo por defecto de búsqueda vectorial en Azure AI Search, y la alternativa "exhaustive KNN" da exactitud perfecta a costa de recorrer todo el índice.

---

### Q967
**¿Cuándo conviene usar "exhaustive KNN" en vez de HNSW?**

A) Siempre, es superior en todo
B) Con índices pequeños o cuando se necesita exactitud perfecta y la latencia no es crítica ✅
C) Solo con más de un millón de documentos
D) Nunca, está obsoleto

**Explicación:** La búsqueda exhaustiva compara la consulta contra todos los vectores, garantizando el resultado óptimo. En índices pequeños el costo es despreciable, y también sirve como referencia para medir cuánta exactitud pierde la aproximación de HNSW.

---

### Q968
**¿Qué implica que dos modelos de embeddings tengan distinta dimensionalidad (por ejemplo 1536 vs 3072)?**

A) Nada, son intercambiables
B) Los vectores no son comparables entre sí: cambiar de modelo obliga a regenerar todo el índice ✅
C) El de más dimensiones siempre es más rápido
D) Solo cambia el precio, no el resultado

**Explicación:** Un embedding solo tiene sentido dentro del espacio vectorial del modelo que lo generó. Mezclar vectores de modelos distintos produce similitudes sin significado, así que migrar de modelo de embeddings implica reindexar el corpus completo — un costo a considerar antes de elegirlo.

---

### Q969
**¿Qué es el "metadata filtering" en una búsqueda vectorial?**

A) Filtrar el texto antes de generar el embedding
B) Restringir la búsqueda a documentos que cumplen condiciones sobre sus campos (fecha, departamento, permisos) además de la similitud vectorial ✅
C) Eliminar metadatos para ahorrar espacio
D) Ordenar los resultados alfabéticamente

**Explicación:** Combinar filtros estructurados con similitud semántica es clave en producción: permite acotar por permisos del usuario, antigüedad del documento o unidad de negocio, evitando que el modelo reciba contexto que no debería ver.

---

### Q970
**Una empresa necesita que cada usuario solo pueda recuperar documentos de su propio departamento vía RAG. ¿Cuál es el enfoque correcto?**

A) Instruir al modelo en el system prompt que ignore documentos de otros departamentos
B) Aplicar filtros de seguridad en la consulta al índice, antes de que el contenido llegue al modelo ✅
C) Crear un modelo fine-tuned por departamento
D) Confiar en que la búsqueda vectorial no los encuentre

**Explicación:** La seguridad nunca puede depender de que el modelo "obedezca" una instrucción: si el chunk llega al contexto, ya se filtró. El control de acceso se aplica en la capa de recuperación, filtrando por metadatos de permisos antes de construir el prompt.

---

### Q971
**¿Qué es la "integrated vectorization" en Azure AI Search?**

A) Un modelo de embeddings propio de Search
B) La capacidad del propio servicio de trocear documentos y generar sus embeddings durante la indexación, sin pipeline externo ✅
C) Una forma de comprimir vectores
D) Un método de búsqueda híbrida

**Explicación:** Evita tener que construir un pipeline propio que lea documentos, los trocee, llame al modelo de embeddings e inserte los vectores: el indexer lo hace de punta a punta, reduciendo bastante el código de infraestructura de un RAG.

---

### Q972
**En Azure AI Search, ¿qué papel cumple un "indexer"?**

A) Ejecutar las consultas de los usuarios
B) Extraer datos de una fuente (Blob Storage, SQL…), procesarlos y cargarlos al índice de forma automatizada y repetible ✅
C) Generar el system prompt del modelo
D) Almacenar el historial de conversación

**Explicación:** El indexer es el componente de ingesta: se conecta a un data source, opcionalmente aplica un skillset (OCR, extracción de entidades, vectorización) y escribe en el índice. Puede programarse para mantener el índice al día conforme cambian los documentos.

---

### Q973
**Los documentos de una empresa se actualizan a diario. ¿Qué hay que resolver en la arquitectura RAG?**

A) Nada, RAG siempre está al día automáticamente
B) Programar la reindexación para que el índice refleje los cambios; RAG solo es tan actual como su índice ✅
C) Hacer fine-tuning diario del modelo
D) Aumentar la temperatura del modelo

**Explicación:** Es una confusión frecuente: RAG evita reentrenar el modelo, pero no se actualiza solo. Si el indexer no vuelve a correr, el sistema sigue respondiendo con la versión vieja de los documentos con total seguridad aparente.

---

### Q974
**¿Qué es "query rewriting" en un RAG conversacional?**

A) Corregir la ortografía del usuario
B) Reformular la pregunta actual incorporando el contexto de los turnos previos, para que la búsqueda sea autocontenida ✅
C) Traducir la consulta al inglés siempre
D) Acortar la consulta para ahorrar tokens

**Explicación:** Si el usuario pregunta "¿y cuánto cuesta?", ese texto suelto no recupera nada útil. Reescribirla como "¿cuánto cuesta el plan Premium?" usando el historial es lo que permite que la búsqueda encuentre los documentos correctos en una conversación multiturno.

---

### Q975
**¿Qué es HyDE (Hypothetical Document Embeddings)?**

A) Un modelo de embeddings de Azure
B) Generar con el modelo una respuesta hipotética a la pregunta y buscar con el embedding de esa respuesta, en vez del de la pregunta ✅
C) Un formato de índice vectorial
D) Una técnica de compresión de prompts

**Explicación:** Parte de que una pregunta corta y un documento extenso viven "lejos" en el espacio vectorial. Al generar un párrafo hipotético que respondería la pregunta, su embedding se parece más a los documentos reales buscados, mejorando la recuperación aunque el texto generado sea parcialmente inventado.

---

### Q976
**En un sistema RAG, ¿qué significa que una respuesta esté "grounded" (fundamentada)?**

A) Que suena convincente
B) Que su contenido se apoya efectivamente en los documentos recuperados, y no en conocimiento inventado por el modelo ✅
C) Que fue generada con temperature=0
D) Que el usuario la marcó como correcta

**Explicación:** La fundamentación es la métrica central de un RAG: mide si lo afirmado se puede rastrear al contexto provisto. Una respuesta puede ser fluida, coherente y aun así no estar fundamentada, que es exactamente el modo de fallo peligroso.

---

### Q977
**¿Qué evalúa la métrica "groundedness" en Azure AI Foundry?**

A) La velocidad de respuesta
B) En qué medida la respuesta generada se sustenta en el contexto recuperado ✅
C) La corrección gramatical
D) El costo en tokens

**Explicación:** Es uno de los evaluadores integrados de la plataforma, pensado específicamente para aplicaciones RAG: detecta cuando el modelo agrega afirmaciones que el contexto no respalda, es decir alucinaciones sobre datos propios.

---

### Q978
**¿Qué mide la métrica "relevance" en la evaluación de una respuesta?**

A) Si la respuesta está bien escrita
B) Si la respuesta efectivamente atiende lo que el usuario preguntó ✅
C) Si el documento recuperado existe
D) Cuántos tokens consumió

**Explicación:** Una respuesta puede estar perfectamente fundamentada en los documentos y aun así no responder la pregunta. Relevance y groundedness son ejes distintos y por eso se miden por separado.

---

### Q979
**¿Qué diferencia hay entre "coherence" y "fluency" como métricas de evaluación?**

A) Son sinónimos
B) Coherence mide si el texto tiene sentido lógico y estructura; fluency mide la calidad lingüística y naturalidad ✅
C) Coherence mide velocidad, fluency mide costo
D) Solo aplican a modelos de imagen

**Explicación:** Un texto puede ser gramaticalmente impecable (alta fluency) pero saltar entre ideas sin hilo lógico (baja coherence). Separarlas ayuda a diagnosticar si el problema está en el prompt, en el modelo o en el contexto recuperado.

---

### Q980
**¿Qué es un "golden dataset" en la evaluación de una aplicación de IA?**

A) El dataset de entrenamiento del modelo base
B) Un conjunto curado de preguntas con sus respuestas esperadas, usado como referencia estable para medir cambios ✅
C) Los documentos más consultados del índice
D) El historial completo de conversaciones de usuarios

**Explicación:** Sin una referencia fija no se puede saber si un cambio de prompt mejoró o empeoró el sistema. El golden dataset permite comparar versiones de forma reproducible, igual que una suite de tests en software tradicional.

---

### Q981
**¿Por qué conviene evaluar el componente de recuperación por separado del de generación en un RAG?**

A) No conviene, siempre se evalúan juntos
B) Porque si la recuperación trae los documentos equivocados, ningún prompt puede salvar la respuesta: aísla dónde está el fallo ✅
C) Porque la generación no se puede medir
D) Porque son servicios facturados por separado

**Explicación:** Son dos fallos con soluciones opuestas: si el chunk correcto nunca se recuperó, hay que trabajar chunking, embeddings o reranking; si sí se recuperó y aun así la respuesta falla, el problema está en el prompt o el modelo.

---

### Q982
**¿Qué hiperparámetro de Fine-Tuning controla cuántas veces el modelo recorre el dataset completo?**

A) `batch_size`
B) `n_epochs` ✅
C) `learning_rate_multiplier`
D) `temperature`

**Explicación:** Una epoch es una pasada completa sobre los datos de entrenamiento. Pocas epochs dejan al modelo sin aprender el patrón; demasiadas lo llevan a memorizar los ejemplos y perder capacidad de generalizar.

---

### Q983
**¿Qué señal indica overfitting durante un trabajo de Fine-Tuning?**

A) La pérdida de entrenamiento sube
B) La pérdida de entrenamiento baja mientras la de validación se estanca o empieza a subir ✅
C) El trabajo termina más rápido de lo previsto
D) El dataset tiene menos de 100 ejemplos

**Explicación:** Es la firma clásica: el modelo memoriza el set de entrenamiento (su pérdida sigue bajando) pero deja de mejorar en datos que no vio (la validación se despega). La respuesta suele ser menos epochs o más datos, y por eso se separa un set de validación desde el inicio.

---

### Q984
**¿Para qué sirve reservar un conjunto de validación al hacer Fine-Tuning?**

A) Para aumentar el tamaño del entrenamiento
B) Para medir el desempeño sobre ejemplos que el modelo no vio entrenar y detectar overfitting ✅
C) Para acelerar el entrenamiento
D) Es opcional y no aporta información

**Explicación:** Evaluar sobre los mismos datos con los que se entrenó siempre da resultados optimistas. El set de validación es la única forma de estimar si el modelo generalizará a entradas reales.

---

### Q985
**¿Qué controla `learning_rate_multiplier` en Fine-Tuning?**

A) Cuántos ejemplos se procesan por lote
B) La magnitud del ajuste de los pesos en cada paso de entrenamiento ✅
C) La cantidad de epochs
D) El tamaño del modelo resultante

**Explicación:** Un valor alto hace que el modelo cambie rápido pero puede pasarse del óptimo y volverse inestable; uno bajo aprende de forma más estable pero puede necesitar muchas más epochs para converger.

---

### Q986
**¿Cuál es el costo que más suele sorprender tras desplegar un modelo fine-tuned en Azure?**

A) El costo del dataset de entrenamiento
B) El costo por hora de mantener el endpoint desplegado, que corre aunque no se hagan inferencias ✅
C) El costo de descargar el modelo
D) No hay costos posteriores al entrenamiento

**Explicación:** A diferencia de los modelos base facturados por token consumido, un despliegue fine-tuned reserva capacidad y se cobra por tiempo de hosting. Por eso los laboratorios oficiales insisten en eliminar el recurso al terminar.

---

### Q987
**¿Cuántos ejemplos se recomiendan como mínimo razonable para un dataset de Fine-Tuning?**

A) 5 a 10
B) Del orden de decenas como mínimo absoluto, pero cientos o miles para resultados sólidos ✅
C) Exactamente 100, ni más ni menos
D) Al menos un millón

**Explicación:** Con muy pocos ejemplos el modelo no infiere un patrón general, solo memoriza. La cifra exacta depende de la tarea, pero la regla práctica es que la calidad y consistencia del dataset importan más que alcanzar un número mágico.

---

### Q988
**Un beneficio indirecto del Fine-Tuning es que permite acortar los prompts. ¿Por qué?**

A) Porque el modelo procesa más rápido
B) Porque el comportamiento aprendido reemplaza los ejemplos few-shot que antes había que incluir en cada llamada ✅
C) Porque comprime el texto automáticamente
D) Porque elimina la necesidad de system message

**Explicación:** Si el modelo ya internalizó el formato y el tono, dejan de hacer falta los ejemplos que se repetían en cada request. En volúmenes altos ese ahorro de tokens por llamada puede compensar el costo del entrenamiento y del hosting.

---

### Q989
**¿Qué es la "destilación" (distillation) de modelos?**

A) Eliminar datos duplicados del dataset
B) Usar un modelo grande para generar ejemplos con los que se ajusta uno más pequeño y barato ✅
C) Comprimir los pesos del modelo sin entrenarlo
D) Combinar dos modelos en uno solo

**Explicación:** El modelo "maestro" produce respuestas de alta calidad que sirven de dataset para el "alumno". El resultado busca acercarse al desempeño del grande en una tarea concreta con una fracción del costo de inferencia.

---

### Q990
**¿Qué formato exacto debe tener cada línea de un JSONL de Fine-Tuning para modelos de chat?**

A) Un string plano con la pregunta y la respuesta separadas por coma
B) Un objeto JSON con la clave `messages`, conteniendo los roles system, user y assistant ✅
C) Un array de dos elementos `[input, output]`
D) Un objeto con las claves `prompt` y `completion` únicamente

**Explicación:** El formato de chat espera `{"messages": [{"role": "system", ...}, {"role": "user", ...}, {"role": "assistant", ...}]}` por línea. El formato viejo `prompt`/`completion` corresponde a modelos de completado legacy, y confundirlos es un error típico de examen.

---

### Q991
**¿Qué parámetro se usa para pedir al modelo una salida en JSON válido de forma fiable?**

A) `output_format="json"`
B) `response_format={"type": "json_object"}` ✅
C) `json=True`
D) `structured=True`

**Explicación:** Este parámetro fuerza al modelo a producir JSON sintácticamente válido, en vez de depender de que una instrucción en el prompt se respete. Es mucho más robusto que pedirlo en lenguaje natural y parsear con los dedos cruzados.

---

### Q992
**Al usar el modo JSON, ¿qué sigue siendo responsabilidad del desarrollador?**

A) Nada, el JSON siempre cumple el esquema esperado
B) Validar que el JSON, además de ser sintácticamente válido, tenga los campos y tipos que la aplicación espera ✅
C) Convertir el JSON a XML
D) Volver a llamar al modelo siempre una segunda vez

**Explicación:** Garantizar sintaxis válida no garantiza semántica correcta: el modelo puede omitir un campo o inventar uno. Validar contra un esquema del lado del cliente sigue siendo necesario en producción.

---

### Q993
**¿Para qué sirve el parámetro `seed` en una llamada al modelo?**

A) Para elegir el modelo a usar
B) Para hacer la generación reproducible: con la misma entrada y el mismo seed se busca obtener la misma salida ✅
C) Para inicializar el vector store
D) Para definir la longitud máxima

**Explicación:** Es especialmente útil en testing y depuración, donde se necesita que un mismo caso produzca siempre el mismo resultado. La reproducibilidad es de mejor esfuerzo, no una garantía absoluta entre versiones del modelo.

---

### Q994
**¿Qué efecto tiene `frequency_penalty` sobre la generación?**

A) Reduce la velocidad de respuesta
B) Penaliza tokens en proporción a las veces que ya aparecieron, desalentando la repetición literal ✅
C) Limita el número total de tokens
D) Aumenta la creatividad de forma general

**Explicación:** Escala la penalización con la frecuencia acumulada de cada token, útil cuando el modelo se traba repitiendo la misma palabra o frase. `presence_penalty`, en cambio, penaliza igual a cualquier token ya usado, empujando a introducir temas nuevos.

---

### Q995
**¿Qué es una "stop sequence"?**

A) Un mensaje de error del modelo
B) Una cadena que, al ser generada, hace que el modelo detenga la salida en ese punto ✅
C) El token final obligatorio de todo prompt
D) Una forma de cancelar la request desde el cliente

**Explicación:** Permite cortar la generación en un delimitador conocido, por ejemplo para que el modelo no siga inventando turnos de conversación después de responder. El texto de la stop sequence no se incluye en la salida.

---

### Q996
**Si una respuesta se corta a mitad de una frase, ¿cuál es la causa más probable?**

A) Un error de red
B) Se alcanzó el límite de `max_tokens` de la respuesta ✅
C) La temperatura era demasiado alta
D) El prompt tenía errores de sintaxis

**Explicación:** Al agotar el presupuesto de tokens de salida el modelo se detiene donde esté, sin cerrar la idea. El motivo de finalización de la respuesta lo indica explícitamente, y la solución es subir el límite o pedir respuestas más breves.

---

### Q997
**¿Qué ventaja principal ofrece el "prompt caching" en aplicaciones con prompts largos y repetidos?**

A) Mejora la calidad de las respuestas
B) Reduce costo y latencia al reutilizar el procesamiento de la parte del prompt que no cambia ✅
C) Permite usar modelos más grandes gratis
D) Elimina la necesidad de RAG

**Explicación:** Cuando un system prompt extenso o un contexto fijo se repite en muchas llamadas, cachearlo evita reprocesarlo entero cada vez. Por eso conviene poner al principio del prompt lo estable y al final lo que varía.

---

### Q998
**¿Por qué conviene colocar el contenido estático al inicio del prompt y el variable al final?**

A) Porque el modelo solo lee el principio
B) Porque maximiza la porción cacheable, que se calcula desde el inicio del prompt ✅
C) Porque reduce el número de tokens totales
D) Es indiferente, el orden no afecta

**Explicación:** El caché funciona sobre prefijos: solo se reutiliza el tramo inicial que coincide exactamente entre llamadas. Si lo que cambia va al principio, se invalida todo lo que viene después y el ahorro desaparece.

---

### Q999
**Un equipo quiere comparar dos versiones de un system prompt en producción. ¿Cuál es el enfoque correcto?**

A) Cambiar el prompt y confiar en la impresión subjetiva del equipo
B) Evaluar ambas versiones sobre el mismo golden dataset con métricas definidas, o hacer un A/B test con tráfico real ✅
C) Preguntarle al modelo cuál prompt es mejor
D) Elegir el prompt más corto siempre

**Explicación:** "Parece que responde mejor" no es evidencia. Medir sobre un conjunto fijo con métricas explícitas —o repartir tráfico real y comparar resultados— es lo que convierte el prompt engineering en ingeniería y no en superstición.

---

### Q1000
**¿Qué riesgo introduce usar un LLM como juez (LLM-as-a-judge) para evaluar otro LLM?**

A) Ninguno, es infalible
B) El juez tiene sus propios sesgos y errores, por lo que sus criterios deben validarse contra evaluación humana ✅
C) Solo funciona con modelos del mismo proveedor
D) Es más caro que la evaluación manual siempre

**Explicación:** Escala muchísimo mejor que revisar a mano, pero el juez puede favorecer respuestas largas o con cierto estilo. La práctica correcta es calibrar la rúbrica del juez contra un subconjunto etiquetado por humanos antes de confiar en sus números.

---

### Q1001
**¿Qué es el "context window" de un modelo?**

A) El tiempo máximo que dura una sesión
B) La cantidad total de tokens que caben entre entrada y salida en una misma llamada ✅
C) El número máximo de documentos indexables
D) La cantidad de usuarios concurrentes

**Explicación:** Es un presupuesto compartido: el prompt, el contexto recuperado y la respuesta generada compiten por el mismo espacio. Diseñar un RAG implica decidir cuántos chunks caben sin dejar sin sitio a la respuesta.

---

### Q1002
**En un RAG, si se recuperan 20 chunks y no caben en el context window, ¿cuál es la solución más adecuada?**

A) Truncar el prompt por la mitad sin criterio
B) Reducir el número de chunks priorizando los mejor rankeados, o resumirlos antes de inyectarlos ✅
C) Aumentar la temperatura
D) Dividir la pregunta del usuario en varias

**Explicación:** Recuperar más no es recuperar mejor: pasado cierto punto se agrega ruido y se gasta ventana. Un reranking que deje los 3-5 chunks más relevantes suele dar mejores respuestas que volcar 20 fragmentos mediocres.

---

### Q1003
**¿Qué es el problema de "lost in the middle" en contextos largos?**

A) Que el modelo pierde la conexión de red
B) Que la información situada en el medio de un contexto largo recibe menos atención que la del principio y el final ✅
C) Que los chunks del medio no se indexan
D) Que el modelo olvida el system prompt

**Explicación:** Es una razón concreta para no inyectar decenas de chunks: aunque el dato correcto esté ahí, si queda sepultado en el medio de un contexto enorme el modelo puede pasarlo por alto. Ordenar por relevancia y recortar mitiga el efecto.

---

### Q1004
**¿Qué estrategia de optimización corresponde a "el modelo desconoce la política interna aprobada la semana pasada"?**

A) Fine-Tuning
B) RAG ✅
C) Bajar la temperature
D) Aumentar max_tokens

**Explicación:** Es información factual, nueva y cambiante: el caso canónico de RAG. Fine-Tuning enseña comportamiento y estilo, no incorpora hechos nuevos de forma fiable, y reentrenar con cada cambio de política sería insostenible.

---

### Q1005
**¿Qué estrategia corresponde a "las respuestas son correctas pero el formato varía en cada llamada"?**

A) RAG con más documentos
B) Prompt Engineering especificando el formato, y Fine-Tuning si la inconsistencia persiste a escala ✅
C) Cambiar de región de Azure
D) Subir el learning rate

**Explicación:** Se sigue el orden de menor a mayor costo: primero especificar el formato explícitamente en el prompt (o usar structured outputs); solo si el problema persiste en volumen se justifica el costo de Fine-Tuning para consolidar el comportamiento.

---

### Q1006
**Un bot responde con datos correctos pero inventa las citas de los documentos. ¿Cómo se aborda?**

A) Subir la temperature para más variedad
B) Pedir explícitamente que cite solo los fragmentos recuperados y validar las citas contra el contexto antes de mostrarlas ✅
C) Quitar el RAG
D) Usar un modelo más pequeño

**Explicación:** Las citas inventadas son alucinaciones especialmente dañinas porque aparentan rigor. Además de instruirlo en el prompt, la aplicación debe verificar programáticamente que cada cita corresponda a un fragmento realmente recuperado.

---

### Q1007
**¿Qué diferencia hay entre "retrieval precision" y "retrieval recall" en un RAG?**

A) Son lo mismo medido en distinta escala
B) Precision: qué proporción de lo recuperado es relevante. Recall: qué proporción de lo relevante existente se logró recuperar ✅
C) Precision mide velocidad, recall mide costo
D) Ambas solo aplican a Fine-Tuning

**Explicación:** Se tensionan entre sí: recuperar más chunks sube el recall pero baja la precisión, metiendo ruido en el contexto. El reranking existe justamente para recuperar amplio (buen recall) y luego quedarse con lo mejor (buena precisión).

---

### Q1008
**¿Qué papel juega la "temperature" cuando el objetivo es extraer datos estructurados de un texto?**

A) Alta, para que el modelo sea creativo
B) Baja o cero, porque se busca una salida determinística y fiel al texto de origen ✅
C) Es irrelevante en extracción
D) Debe combinarse siempre con top_p alto

**Explicación:** La creatividad es exactamente lo que no se quiere al extraer: cualquier variación introduce error respecto al dato real del documento. En extracción, clasificación y parsing la temperature baja es la elección correcta.

---

### Q1009
**¿Por qué las "instrucciones positivas" suelen funcionar mejor que las negativas en un prompt?**

A) Porque son más cortas
B) Porque decir qué hacer da una dirección accionable, mientras que decir qué no hacer deja abierto el espacio de lo aceptable ✅
C) Porque el modelo no entiende la palabra "no"
D) Porque consumen menos tokens

**Explicación:** "Responde solo con el precio en euros" es más eficaz que "no des explicaciones largas ni uses otras monedas": la primera define el objetivo, la segunda solo descarta algunas alternativas y deja infinitas restantes.

---

### Q1010
**En el orden recomendado de optimización, ¿qué se hace tras agotar Prompt Engineering y antes de considerar Fine-Tuning?**

A) Cambiar de proveedor de nube
B) RAG, si el problema es de acceso a información ✅
C) Aumentar el context window
D) Reentrenar el modelo base desde cero

**Explicación:** El orden canónico es Prompt Engineering → RAG → Fine-Tuning, de menor a mayor costo y complejidad. Aun así el criterio manda sobre la secuencia: si el problema es de tono y no de información, RAG no aporta nada y se pasa directo a evaluar Fine-Tuning.

---

## 📊 PROGRESO DE ESTE SUPLEMENTO

```
Q961-Q1010 → 50 preguntas nuevas de Domain 3 (Optimización).
             Cobertura nueva respecto de la Parte 7: chunking (tamaño, overlap,
             semántico), reranking, HNSW vs KNN exhaustivo, dimensionalidad de
             embeddings, filtrado por metadatos y seguridad en recuperación,
             integrated vectorization e indexers, query rewriting, HyDE,
             evaluadores (groundedness, relevance, coherence, fluency),
             golden dataset, hiperparámetros y diagnóstico de Fine-Tuning,
             destilación, structured outputs, seed, penalties, stop sequences,
             prompt caching, context window y "lost in the middle".
```
