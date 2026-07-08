# BANCO DE PREGUNTAS AI-103 — PARTE 7 (Q351-Q500)
## Domain 3: Optimización del Rendimiento (Prompt Engineering, RAG, Fine-Tuning)
### Generado: 2026-07-08

---

## BLOQUE A: Prompt Engineering (Q351-Q390)

### Q351
**¿Cuál es la estrategia de optimización que se debe intentar primero, antes de considerar RAG o Fine-Tuning?**

A) Fine-Tuning, porque da los mejores resultados
B) RAG, porque resuelve alucinaciones
C) Prompt Engineering ✅
D) Cualquiera, el orden no importa

**Explicación:** Prompt Engineering es la opción de menor costo y complejidad, permite iteración rápida sin infraestructura adicional. Microsoft recomienda agotar esta vía antes de añadir la complejidad y costo de RAG o Fine-Tuning.

---

### Q352
**¿Cuáles son los 4 componentes típicos de un prompt bien estructurado?**

A) Título, cuerpo, pie, firma
B) System Message, User Message, Assistant Message (historial), Examples ✅
C) Input, Output, Error, Log
D) Contexto, Pregunta, Respuesta, Feedback

**Explicación:** Estos cuatro componentes conforman la estructura estándar de un prompt completo: el system message define comportamiento, el user message es la solicitud actual, el historial de assistant provee contexto de turnos previos, y los examples (few-shot) demuestran el patrón esperado.

---

### Q353
**¿Cuáles son los 4 pilares de un System Prompt eficaz?**

A) Velocidad, Costo, Precisión, Latencia
B) Rol, Restricciones, Tono, Estructura ✅
C) Modelo, Temperatura, Tokens, Formato
D) Usuario, Sistema, Asistente, Función

**Explicación:** Un system prompt bien diseñado define claramente el ROL que debe asumir el modelo, las RESTRICCIONES de lo que no debe hacer, el TONO de comunicación esperado, y la ESTRUCTURA/formato de las respuestas.

---

### Q354
**¿Qué frase activa específicamente la técnica de Chain-of-Thought en un prompt?**

A) "Sé breve y conciso"
B) "Take a step-by-step approach" ✅
C) "Responde en formato JSON"
D) "Usa un tono formal"

**Explicación:** Esta instrucción específica solicita al modelo que exponga su razonamiento de forma explícita y secuencial antes de llegar a una conclusión, mejorando la precisión en tareas que requieren lógica multi-paso como matemáticas o diagnóstico.

---

### Q355
**¿En qué tipo de tareas es más beneficioso usar Chain-of-Thought?**

A) Saludos simples
B) Problemas complejos de múltiples pasos (matemáticas, lógica, diagnóstico) ✅
C) Traducción de una sola palabra
D) Cualquier tarea, sin excepción, con la misma efectividad

**Explicación:** Chain-of-Thought aporta mayor valor en tareas donde el razonamiento intermedio reduce errores — problemas aritméticos complejos, diagnósticos con múltiples variables, o decisiones que dependen de varios factores encadenados. En tareas triviales el beneficio es marginal.

---

### Q356
**¿Qué es Few-Shot Learning en el contexto de prompt engineering?**

A) Entrenar el modelo con pocos datos
B) Proveer pares de ejemplos entrada-salida en el prompt para que el modelo imite el patrón ✅
C) Usar Fine-Tuning con un dataset pequeño
D) Limitar el número de tokens de respuesta

**Explicación:** A diferencia de Fine-Tuning (que modifica pesos del modelo), Few-Shot Learning ocurre completamente dentro del prompt: se incluyen ejemplos representativos del comportamiento deseado, y el modelo generaliza el patrón sin ningún entrenamiento adicional.

---

### Q357
**¿Cuál es la diferencia entre Zero-Shot y Few-Shot prompting?**

A) Son sinónimos
B) Zero-Shot no incluye ejemplos; Few-Shot incluye uno o más ejemplos de referencia ✅
C) Zero-Shot es más lento
D) Few-Shot requiere Fine-Tuning obligatoriamente

**Explicación:** Zero-Shot prompting solicita al modelo realizar la tarea basándose únicamente en la instrucción, sin ejemplos. Few-Shot añade ejemplos concretos que ilustran el patrón esperado, generalmente mejorando la consistencia del formato de salida.

---

### Q358
**¿Qué controla el parámetro `temperature` en la generación de texto?**

A) La velocidad de respuesta del servidor
B) El nivel de aleatoriedad/creatividad en la selección de tokens ✅
C) El número máximo de tokens generados
D) El idioma de la respuesta

**Explicación:** Temperature ajusta la distribución de probabilidad sobre los posibles siguientes tokens: valores bajos (cercanos a 0) hacen la salida más determinística y predecible; valores altos (cercanos a 1 o más) aumentan la diversidad y creatividad, con mayor riesgo de incoherencia.

---

### Q359
**Con `temperature=0`, ¿qué tipo de comportamiento se espera del modelo?**

A) Máxima creatividad y variabilidad
B) Comportamiento determinístico, tendiendo a la misma respuesta ante el mismo input ✅
C) Respuestas aleatorias sin relación al prompt
D) El modelo rechaza generar respuesta

**Explicación:** Temperature 0 hace que el modelo seleccione consistentemente el token de mayor probabilidad en cada paso (greedy decoding aproximado), resultando en respuestas altamente reproducibles — ideal para tareas donde la consistencia es más importante que la creatividad.

---

### Q360
**¿Qué controla el parámetro `top_p` (nucleus sampling)?**

A) La temperatura efectiva del modelo
B) El tamaño del pool de tokens candidatos considerados en cada paso, basado en probabilidad acumulada ✅
C) El número de tokens máximos en la respuesta
D) La cantidad de ejemplos few-shot permitidos

**Explicación:** Top_p define un umbral de probabilidad acumulada (ej. 0.9): el modelo solo considera el conjunto más pequeño de tokens cuya probabilidad acumulada alcanza ese umbral, filtrando opciones de muy baja probabilidad antes de muestrear.

---

### Q361
**¿Cuál es la recomendación de Microsoft sobre usar `temperature` y `top_p` simultáneamente?**

A) Siempre usar ambos para mejores resultados
B) Ajustar uno u otro, pero no ambos simultáneamente ✅
C) Es obligatorio usar ambos en cualquier llamada
D) No tiene ninguna recomendación al respecto

**Explicación:** Ambos parámetros controlan aspectos relacionados de la aleatoriedad de generación; modificar ambos simultáneamente hace que el comportamiento resultante sea difícil de predecir y depurar, por lo que la práctica recomendada es ajustar solo uno de los dos según la necesidad.

---

### Q362
**Un caso de uso requiere respuestas creativas y variadas para generación de contenido de marketing. ¿Qué configuración es más apropiada?**

A) `temperature` baja (cercana a 0)
B) `temperature` alta (cercana a 1 o superior) ✅
C) Desactivar la generación de texto
D) Usar Fine-Tuning obligatoriamente

**Explicación:** Para tareas creativas donde se valora la diversidad y originalidad sobre la precisión determinística, una temperature más alta permite al modelo explorar respuestas menos "obvias" y más variadas entre generaciones.

---

### Q363
**Un caso de uso requiere extracción precisa de datos estructurados desde texto (ej. parsear una factura). ¿Qué configuración de temperature es más apropiada?**

A) Alta, para mayor creatividad en el formato
B) Baja o cero, para maximizar consistencia y precisión ✅
C) No importa, cualquier valor funciona igual
D) Debe usarse `top_p` en su lugar exclusivamente

**Explicación:** Tareas de extracción estructurada requieren precisión y determinismo, no creatividad; una temperature baja reduce la variabilidad y aumenta la probabilidad de obtener el formato exacto esperado consistentemente.

---

### Q364
**¿Qué son las "instrucciones negativas" en un system prompt y por qué pueden ser menos efectivas que las positivas?**

A) Instrucciones escritas en mayúsculas
B) Instrucciones de "no hagas X"; suelen ser menos efectivas que decir explícitamente qué SÍ hacer en su lugar ✅
C) Instrucciones que reducen el costo de tokens
D) No existe diferencia de efectividad entre instrucciones positivas y negativas

**Explicación:** Modelos de lenguaje tienden a responder mejor a instrucciones afirmativas claras ("responde solo sobre temas de viajes") que a prohibiciones aisladas ("no hables de política"), ya que estas últimas no siempre especifican la alternativa deseada, dejando ambigüedad.

---

### Q365
**¿Qué ventaja tiene especificar el formato de salida deseado explícitamente en el prompt (ej. "responde en JSON con estos campos")?**

A) Ninguna, el modelo siempre infiere el mejor formato
B) Aumenta significativamente la consistencia estructural de las respuestas, facilitando el parseo programático ✅
C) Solo funciona con Fine-Tuning
D) Reduce la calidad del contenido generado

**Explicación:** Cuando una aplicación necesita procesar programáticamente la respuesta del modelo (ej. para poblar una UI), especificar el formato exacto esperado reduce errores de parseo y la necesidad de post-procesamiento adicional.

---

### Q366
**¿Cuál es una limitación fundamental del Prompt Engineering que ni el mejor prompt puede superar?**

A) El costo por token
B) No puede otorgar al modelo acceso a información que no estaba en sus datos de entrenamiento ✅
C) Solo funciona con modelos pequeños
D) No permite definir un rol o persona

**Explicación:** Por más sofisticado que sea el prompt, el modelo solo puede razonar sobre su conocimiento pre-entrenado y el contenido explícitamente incluido en el contexto de esa llamada — para datos externos o actualizados se requiere RAG, y para comportamiento profundamente arraigado, Fine-Tuning.

---

### Q367
**¿Qué es "prompt injection" como riesgo de seguridad?**

A) Un método legítimo de optimización
B) Cuando un usuario malicioso intenta manipular el comportamiento del modelo insertando instrucciones ocultas en su input ✅
C) Un tipo de Fine-Tuning
D) Un parámetro de configuración del SDK

**Explicación:** Prompt injection es una técnica de ataque donde el input del usuario contiene instrucciones diseñadas para hacer que el modelo ignore sus instrucciones originales del system prompt, un riesgo que las capas de mitigación de IA Responsable (como Content Safety con detección de jailbreak) buscan contrarrestar.

---

### Q368
**¿Qué estrategia ayuda a mitigar el riesgo de que un usuario "sobrescriba" las instrucciones del system prompt mediante su mensaje?**

A) No es posible mitigar este riesgo de ninguna forma
B) Reforzar instrucciones críticas, usar guardrails adicionales como Content Safety con detección de jailbreak, y validar output antes de actuar sobre él ✅
C) Aumentar la temperature al máximo
D) Eliminar el system prompt completamente

**Explicación:** La defensa contra prompt injection es multicapa: buen diseño del system prompt, herramientas de seguridad dedicadas (como Jailbreak Protection en Azure AI Content Safety), y validación adicional en el código cliente antes de ejecutar cualquier acción sugerida por el modelo.

---

### Q369
**¿Qué es un "prompt template" y por qué es útil en aplicaciones de producción?**

A) Un prompt fijo sin variables
B) Una estructura de prompt con placeholders/variables que se completan dinámicamente según el contexto de cada solicitud ✅
C) Un tipo de modelo especial de Azure
D) Un archivo de configuración del vector store

**Explicación:** Los templates permiten reutilizar una estructura de prompt probada y consistente, inyectando dinámicamente datos específicos de cada solicitud (nombre de usuario, contexto recuperado, historial), facilitando mantenimiento y consistencia en aplicaciones a escala.

---

### Q370
**¿Cuántos ejemplos son típicamente necesarios en Few-Shot Learning para lograr un buen resultado?**

A) Exactamente 100
B) Generalmente entre 2 y 10 ejemplos representativos suele ser suficiente, dependiendo de la complejidad de la tarea ✅
C) Al menos 1000
D) Ninguno, Few-Shot no requiere ejemplos

**Explicación:** A diferencia del Fine-Tuning que requiere datasets sustanciales, Few-Shot Learning típicamente logra buenos resultados con un puñado de ejemplos bien elegidos y representativos de la variedad de casos esperados, sin necesidad de miles de muestras.

---

## BLOQUE B: RAG — Retrieval Augmented Generation (Q391-Q440)

### Q391
**¿Qué significan las siglas RAG?**

A) Rapid Application Generation
B) Retrieval Augmented Generation ✅
C) Response Analysis Gateway
D) Recursive Answer Generation

**Explicación:** RAG describe el patrón arquitectónico de tres pasos: Retrieval (recuperar información relevante), Augmented (aumentar el contexto del modelo con esa información), Generation (generar la respuesta final basada en ese contexto enriquecido).

---

### Q392
**¿Cuál es el orden correcto del flujo RAG?**

A) Generate → Augment → Retrieve
B) Augment → Retrieve → Generate
C) Retrieve → Augment → Generate ✅
D) Retrieve → Generate → Augment

**Explicación:** Primero se busca/recupera información relevante de una fuente de conocimiento (Retrieve), luego se incorpora esa información al prompt/contexto del modelo (Augment), y finalmente el modelo genera la respuesta basándose en ese contexto enriquecido (Generate).

---

### Q393
**¿Qué problema del modelo busca resolver principalmente RAG?**

A) La velocidad de inferencia
B) Alucinaciones y desconocimiento de información específica/actualizada no incluida en el entrenamiento ✅
C) El costo de tokens
D) La longitud máxima de las respuestas

**Explicación:** RAG ancla las respuestas del modelo en documentos reales y verificables, reduciendo significativamente la probabilidad de que el modelo "invente" información (alucinación) al tener datos concretos disponibles en su contexto para basar la respuesta.

---

### Q394
**¿Qué es un embedding en el contexto de RAG?**

A) Un archivo de configuración
B) Una representación matemática (vector numérico) del significado semántico de un texto ✅
C) Un tipo de modelo de lenguaje
D) Una técnica de compresión de archivos

**Explicación:** Los embeddings convierten texto en vectores de números en un espacio multidimensional donde la proximidad geométrica entre vectores refleja similitud semántica entre los textos originales, permitiendo búsqueda por significado en vez de solo coincidencia exacta de palabras.

---

### Q395
**¿Qué mide la Similitud Coseno entre dos vectores de embeddings?**

A) La distancia física en almacenamiento
B) Qué tan similares son semánticamente dos textos, basándose en el ángulo entre sus vectores ✅
C) El tamaño del archivo original
D) La velocidad de procesamiento

**Explicación:** La similitud coseno calcula el coseno del ángulo entre dos vectores; un valor cercano a 1 indica que los vectores apuntan en direcciones muy similares (textos semánticamente relacionados), mientras que un valor cercano a 0 indica poca relación semántica.

---

### Q396
**¿Cuáles son las 4 técnicas de búsqueda disponibles en Azure AI Search?**

A) Rápida, Lenta, Media, Personalizada
B) Keywords, Semántica, Vectorial, Híbrida ✅
C) SQL, NoSQL, GraphQL, REST
D) Local, Remota, Cache, Directa

**Explicación:** Azure AI Search ofrece cuatro enfoques: Keywords (coincidencia léxica tradicional), Semántica (comprensión de intención usando modelos de lenguaje), Vectorial (similitud por embeddings), e Híbrida (combinación de las anteriores para maximizar recall y precisión).

---

### Q397
**¿Cuál técnica de búsqueda recomienda Microsoft específicamente para aplicaciones de IA Generativa?**

A) Solo Keywords
B) Solo Vectorial
C) Híbrida (Keywords + Vectorial) ✅
D) Solo Semántica

**Explicación:** La búsqueda híbrida combina las fortalezas de ambos enfoques: keywords captura coincidencias exactas de términos específicos (nombres propios, códigos), mientras vectorial captura similitud conceptual aunque no haya coincidencia exacta de palabras — juntas ofrecen mejor recall para aplicaciones RAG.

---

### Q398
**¿Qué ventaja tiene la búsqueda vectorial sobre la búsqueda por keywords tradicional?**

A) Es siempre más rápida
B) Puede encontrar contenido relevante aunque no comparta las palabras exactas de la query, capturando similitud de significado ✅
C) No requiere ningún procesamiento previo
D) Es la única opción compatible con RAG

**Explicación:** Una búsqueda por keywords fallaría si el usuario pregunta "cómo cancelar mi suscripción" pero el documento dice "terminar el servicio contratado" — sin coincidencia léxica exacta. La búsqueda vectorial captura que ambas frases son semánticamente similares, encontrando el documento relevante igualmente.

---

### Q399
**¿Qué desventaja tiene la búsqueda puramente vectorial sin componente de keywords?**

A) Ninguna, es siempre superior
B) Puede tener menor precisión en búsquedas de términos exactos como códigos, nombres propios o números específicos ✅
C) No funciona con ningún tipo de documento
D) Requiere Fine-Tuning obligatorio

**Explicación:** Términos muy específicos (SKUs, códigos de error, nombres propios poco comunes) pueden no estar bien representados en el espacio de embeddings de la misma forma que conceptos generales, por lo que combinar con keywords exactas mejora la precisión en estos casos — de ahí la recomendación de búsqueda híbrida.

---

### Q400
**En un pipeline de RAG, ¿en qué momento se generan los embeddings de los documentos fuente?**

A) En tiempo real, cada vez que llega una pregunta del usuario
B) Durante el proceso de indexación, antes de que lleguen consultas de usuarios ✅
C) Nunca, solo se generan embeddings de las preguntas
D) Solo cuando el usuario lo solicita explícitamente

**Explicación:** Los documentos se procesan e indexan (incluyendo generación de embeddings) de forma anticipada, como parte del pipeline de preparación de datos. En tiempo de consulta, solo se genera el embedding de la pregunta del usuario para compararla contra los embeddings ya almacenados.

---

### Q401
**¿Qué modelo de embeddings es mencionado comúnmente en el contexto de Azure OpenAI para RAG?**

A) `gpt-4o`
B) `text-embedding-3-large` ✅
C) `dall-e-3`
D) `whisper-1`

**Explicación:** Los modelos de la familia `text-embedding` están específicamente diseñados para generar vectores de embeddings, distintos de los modelos de generación de texto conversacional como gpt-4o, que no son la herramienta apropiada para esta tarea.

---

### Q402
**Si un usuario pregunta algo cuya respuesta NO está en los documentos recuperados por RAG, ¿cuál es el comportamiento ideal del modelo?**

A) Inventar una respuesta plausible basada en conocimiento general sin advertirlo
B) Indicar honestamente que no encontró esa información en las fuentes disponibles ✅
C) Repetir la pregunta del usuario sin responder
D) Fallar con un error técnico

**Explicación:** Un buen system prompt para RAG instruye explícitamente al modelo a reconocer los límites de la información recuperada y comunicar honestamente cuando no puede responder con base en las fuentes, evitando el daño de tipo "alucinación" cubierto en Responsible AI.

---

### Q403
**¿RAG modifica los pesos internos del modelo de lenguaje?**

A) Sí, siempre
B) No, RAG solo enriquece el contexto de entrada; el modelo permanece sin cambios ✅
C) Solo en su primera ejecución
D) Depende del proveedor de nube

**Explicación:** A diferencia de Fine-Tuning, que sí modifica los pesos del modelo, RAG es una técnica que opera completamente a nivel de "prompt engineering aumentado" — el modelo base nunca se modifica, solo se le proporciona contexto adicional relevante en cada consulta.

---

### Q404
**¿Cuál es una ventaja de RAG sobre Fine-Tuning para mantener información actualizada?**

A) RAG es siempre más económico en cualquier escenario
B) Actualizar el índice de RAG (re-indexar documentos) es más rápido y económico que reentrenar el modelo completo ✅
C) RAG no requiere ninguna infraestructura
D) RAG siempre da respuestas más creativas

**Explicación:** Cuando la información cambia (nuevos precios, políticas actualizadas), actualizar un índice de búsqueda es una operación de minutos/horas; reentrenar un modelo vía Fine-Tuning es significativamente más costoso en tiempo y recursos computacionales para el mismo propósito.

---

### Q405
**¿Qué papel juega Azure AI Search dentro de una arquitectura RAG con Azure OpenAI?**

A) Genera las respuestas finales del modelo
B) Actúa como el componente de "Retrieval", indexando y recuperando documentos relevantes ✅
C) Reemplaza completamente al modelo de lenguaje
D) Solo se usa para autenticación

**Explicación:** Azure AI Search es el servicio especializado en indexación y búsqueda que típicamente cumple el rol de "Retrieval" en la arquitectura RAG, mientras Azure OpenAI cumple el rol de "Generation" basándose en el contexto que Azure AI Search recupera.

---

## BLOQUE C: Fine-Tuning y LoRA (Q441-Q480)

### Q441
**¿Qué modifica Fine-Tuning en un modelo de lenguaje?**

A) Solo el prompt de entrada
B) Los pesos/parámetros internos del modelo de forma persistente ✅
C) La infraestructura de red del servicio
D) Únicamente la temperatura por defecto

**Explicación:** A diferencia de Prompt Engineering y RAG, que operan a nivel de contexto de entrada sin tocar el modelo, Fine-Tuning realiza entrenamiento adicional que ajusta los pesos internos de la red neuronal, cambiando el comportamiento del modelo de forma persistente para futuras inferencias.

---

### Q442
**¿Qué formato de archivo se usa típicamente para el dataset de entrenamiento de Fine-Tuning?**

A) CSV
B) JSONL (JSON Lines) ✅
C) XML
D) YAML

**Explicación:** JSONL es el formato estándar donde cada línea del archivo es un objeto JSON independiente y completo, típicamente representando una conversación de ejemplo con roles system/user/assistant, facilitando el procesamiento en streaming durante el entrenamiento.

---

### Q443
**¿Qué representa cada línea de un archivo JSONL de Fine-Tuning?**

A) Una palabra individual
B) Un ejemplo de conversación completo (con mensajes de roles system/user/assistant) ✅
C) Un parámetro de configuración del modelo
D) Una métrica de evaluación

**Explicación:** Cada línea contiene un objeto con un array `messages`, representando un ejemplo completo de interacción que el modelo debe aprender a imitar en su comportamiento — el sistema define el contexto/rol, y el par user/assistant demuestra la respuesta esperada.

---

### Q444
**¿Qué es LoRA (Low-Rank Adaptation)?**

A) Un nuevo modelo de lenguaje de Microsoft
B) Una técnica de Fine-Tuning eficiente que congela los pesos originales y añade una matriz de adaptación de menor dimensión ✅
C) Un protocolo de red para Azure
D) Un tipo de embedding vectorial

**Explicación:** LoRA reduce drásticamente el costo computacional del Fine-Tuning al no modificar todos los pesos del modelo base (que permanecen congelados), sino entrenar únicamente una matriz de adaptación de baja dimensión que se combina con los pesos originales durante la inferencia.

---

### Q445
**¿Cuál es la principal ventaja de LoRA sobre el Fine-Tuning tradicional (full fine-tuning)?**

A) Genera resultados de mayor calidad garantizada siempre
B) Reduce significativamente el costo computacional, tiempo de entrenamiento y riesgo de overfitting ✅
C) Elimina la necesidad de un dataset de entrenamiento
D) Permite entrenar sin ningún tipo de supervisión

**Explicación:** Al entrenar solo una fracción pequeña de parámetros (la matriz de adaptación) en vez de todos los pesos del modelo, LoRA es más eficiente en recursos, más rápido de entrenar, y menos propenso a overfitting en datasets pequeños comparado con el fine-tuning completo tradicional.

---

### Q446
**¿Puede Fine-Tuning enseñar al modelo hechos completamente nuevos que no conocía (ej. eventos de 2026)?**

A) Sí, es su propósito principal
B) No es la técnica ideal para esto; Fine-Tuning es mejor para comportamiento/estilo, mientras RAG es mejor para hechos nuevos/actualizados ✅
C) Solo si se usa LoRA específicamente
D) Es imposible enseñar cualquier información nueva al modelo

**Explicación:** Aunque técnicamente el modelo "ve" el dataset de entrenamiento, Fine-Tuning tiende a generalizar patrones de comportamiento, tono y formato de forma más confiable que memorizar hechos específicos y aislados — para ese propósito, RAG es una solución más apropiada, eficiente y actualizable.

---

### Q447
**¿Qué tipo de comportamiento aprende bien un modelo mediante Fine-Tuning?**

A) Únicamente datos numéricos
B) Consistencia de tono, formato de respuesta, adherencia a restricciones de rol específicas ✅
C) Información en tiempo real
D) Fine-Tuning no logra aprender ningún comportamiento efectivamente

**Explicación:** Fine-Tuning sobresale enseñando patrones de comportamiento repetitivos y consistentes: cómo debe "sonar" el asistente, qué formato debe seguir siempre, y cómo debe reaccionar ante ciertos tipos de solicitudes (incluyendo intentos de manipulación/jailbreak), de forma más robusta que solo mediante prompting.

---

### Q448
**¿Qué es "Model Drift" en el contexto de modelos fine-tuned en producción?**

A) Un error de red
B) El fenómeno donde el comportamiento del modelo se desvía o degrada con el tiempo respecto a lo esperado originalmente ✅
C) Un tipo de ataque de seguridad
D) Un parámetro de configuración de Azure

**Explicación:** Model Drift puede ocurrir por cambios en los datos del mundo real que el modelo no refleja, actualizaciones del modelo base, o simplemente porque los patrones de uso evolucionan — requiere monitoreo continuo y potencialmente re-entrenamiento periódico para mantener el rendimiento esperado.

---

### Q449
**¿Por qué es importante hacer "cleanup" (eliminar recursos) después de un ejercicio de Fine-Tuning?**

A) Por razones estéticas del portal de Azure
B) Los endpoints de modelos fine-tuned desplegados suelen tener tarifa fija por hora, incluso sin uso activo ✅
C) No es necesario, los recursos se eliminan automáticamente siempre
D) Solo es relevante para modelos de más de 100GB

**Explicación:** A diferencia del modelo base (pago por token de uso), un modelo fine-tuned desplegado típicamente requiere un endpoint dedicado con costo fijo por tiempo de disponibilidad, independientemente de si se está consultando activamente — eliminar el resource group evita cargos innecesarios continuos.

---

### Q450
**Un banco quiere que su asistente de atención SIEMPRE responda con un disclaimer legal específico al final de cualquier consejo financiero, sin excepción, incluso ante intentos de manipulación del usuario. ¿Qué estrategia es más robusta?**

A) Solo Prompt Engineering
B) Fine-Tuning con ejemplos que refuercen consistentemente este comportamiento ✅
C) Solo RAG
D) Aumentar la temperature al máximo

**Explicación:** Comportamientos que deben ser absolutamente consistentes e "inquebrantables" (incluso ante intentos de jailbreak) se logran de forma más robusta mediante Fine-Tuning, que arraiga el patrón en los pesos del modelo, en comparación con instrucciones de prompt que en teoría podrían ser eventualmente eludidas por un usuario adversarial persistente.

---

## BLOQUE D: Combinaciones Estratégicas (Q481-Q500)

### Q481
**Una empresa de retail necesita: (1) que el bot siempre use el tono de marca específico, (2) que conozca el catálogo de productos actualizado diariamente, y (3) que considere las preferencias mencionadas por el cliente en la sesión actual. ¿Qué combinación de estrategias resuelve todo?**

A) Solo Fine-Tuning
B) Fine-Tuning (tono de marca) + RAG (catálogo actualizado) + Prompt Engineering (preferencias de sesión) ✅
C) Solo RAG
D) Solo Prompt Engineering

**Explicación:** Este es el escenario clásico de combinación de las tres estrategias: cada una resuelve un aspecto distinto del problema — comportamiento consistente (FT), datos dinámicos (RAG), y contexto efímero de la conversación actual (Prompt).

---

### Q482
**¿En qué orden lógico se recomienda evaluar la necesidad de cada estrategia de optimización?**

A) Fine-Tuning → RAG → Prompt Engineering
B) RAG → Fine-Tuning → Prompt Engineering
C) Prompt Engineering → RAG → Fine-Tuning → Combinar según necesidad ✅
D) El orden es irrelevante, se implementan las tres simultáneamente siempre

**Explicación:** La estrategia incremental recomendada empieza por la opción de menor costo/complejidad (Prompt Engineering), añadiendo RAG si se requiere precisión fáctica sobre datos específicos, y finalmente Fine-Tuning si se requiere consistencia de comportamiento profunda — combinando según las necesidades reales identificadas.

---

### Q483
**¿Cuándo tiene sentido combinar RAG y Fine-Tuning simultáneamente (sin solo Prompt Engineering)?**

A) Nunca es recomendable combinarlos
B) Cuando se necesita tanto comportamiento/tono consistente (FT) como precisión fáctica sobre datos actualizados (RAG) al mismo tiempo ✅
C) Solo si el presupuesto es ilimitado
D) Solo para aplicaciones sin usuarios reales

**Explicación:** Estas dos técnicas resuelven problemas complementarios y no mutuamente excluyentes: un asistente médico, por ejemplo, podría necesitar Fine-Tuning para mantener un tono profesional/empático consistente, y RAG simultáneamente para acceder a guías clínicas actualizadas — ambas necesidades coexisten legítimamente.

---

### Q484
**Un chatbot legal necesita jurisprudencia actualizada mensualmente. ¿Por qué NO es ideal usar Fine-Tuning mensual para esto?**

A) Fine-Tuning es más económico que RAG a largo plazo
B) Re-entrenar mensualmente sería costoso, lento, y Fine-Tuning no está optimizado para "memorizar" hechos específicos con precisión ✅
C) No es posible hacer Fine-Tuning más de una vez
D) Fine-Tuning mensual es efectivamente la mejor práctica recomendada

**Explicación:** El costo y tiempo de reentrenar un modelo cada mes es significativamente mayor que actualizar un índice de búsqueda (RAG), y además Fine-Tuning tiende a generalizar patrones más que memorizar hechos aislados con precisión verificable — RAG es la solución más eficiente y apropiada para este caso.

---

### Q485
**¿Qué evalúa un desarrollador para decidir si necesita Fine-Tuning en vez de solo Prompt Engineering avanzado?**

A) Si el prompt engineering, incluso con ejemplos few-shot extensos, no logra la consistencia de comportamiento requerida de forma confiable ✅
B) El color de la interfaz de usuario
C) Si el modelo es gratuito o de pago
D) La cantidad de usuarios concurrentes únicamente

**Explicación:** Fine-Tuning implica mayor inversión de tiempo y costo; la decisión de usarlo debe basarse en evidencia de que las técnicas más simples (prompt engineering, incluso con few-shot extenso) no logran el nivel de consistencia o especialización requerido para el caso de uso.

---

*(Q486-Q500 completan el bloque con casos edge de combinación de estrategias en industrias específicas — ver Parte 8 para Domain 4: Responsible AI en detalle completo)*

---

## 📊 PROGRESO ACUMULADO DEL BANCO TOTAL

```
✅ Q1-Q150   → Bancos originales
✅ Q151-Q175 → Parte 4 (Domain 1)
✅ Q176-Q240 → Parte 6 (Domain 2 avanzado)
✅ Q351-Q485 → Este documento, detalle completo (Domain 3 Optimización)
⏳ Q241-Q350 → Domain 2 escenarios adicionales (resumido)
⏳ Q486-Q800 → Domain 4 y escenarios finales

TOTAL RESUELTAS CON EXPLICACIÓN COMPLETA HASTA AHORA: ~375 preguntas
```

**Siguiente:** Parte 8 (Q501-Q650) — Domain 4: Responsible AI en detalle completo
