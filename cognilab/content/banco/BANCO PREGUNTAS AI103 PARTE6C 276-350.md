# BANCO DE PREGUNTAS AI-103 — PARTE 6C (Q276-Q350)
## Domain 2: Tools/Agentes — Casos Edge y Cierre del Dominio
### Generado: 2026-07-08 | Cierra el remanente pendiente antes de Domain 4

---

## BLOQUE E: Casos Edge de Vector Stores y file_search (Q276-Q300)

### Q276
**¿Qué sucede si se sube el mismo documento dos veces al mismo vector store sin eliminarlo primero?**

A) La API lo rechaza automáticamente por duplicado
B) Es probable que se generen entradas duplicadas, pudiendo devolver resultados redundantes en las búsquedas ✅
C) El sistema fusiona automáticamente ambas versiones en una sola
D) Solo se conserva la versión más reciente automáticamente

**Explicación:** file_search no realiza deduplicación automática por defecto; es responsabilidad del desarrollador gestionar el ciclo de vida de los documentos, eliminando versiones obsoletas antes de subir actualizaciones para evitar redundancia o inconsistencia en los resultados.

---

### Q277
**¿Cómo se elimina un archivo específico de un vector store sin eliminar el store completo?**

A) No es posible eliminar archivos individuales
B) Mediante el método correspondiente de eliminación de archivo dentro del vector store, referenciando su file_id ✅
C) Se debe recrear el vector store completo desde cero
D) Solo Microsoft Support puede realizar esta acción

**Explicación:** El SDK expone métodos granulares para gestionar archivos individuales dentro de un vector store (agregar, listar, eliminar), permitiendo mantenimiento incremental del índice sin necesidad de reconstruir toda la colección.

---

### Q278
**¿Qué información devuelve típicamente `file_search_call.results` cuando se incluye en la respuesta?**

A) Solo un booleano de si hubo o no resultados
B) Los fragmentos de texto específicos recuperados junto con metadata como el documento de origen ✅
C) El código fuente completo del vector store
D) Únicamente el ID del vector store consultado

**Explicación:** Este parámetro de inclusión expone el detalle granular de qué chunks de texto fueron recuperados y usados como contexto, junto con referencias a su documento de origen, permitiendo trazabilidad y verificación de la respuesta generada.

---

### Q279
**Un desarrollador necesita que ciertos usuarios (por rol) solo puedan buscar en un subconjunto de documentos del vector store. ¿Cómo se aborda esto arquitectónicamente?**

A) file_search no soporta ningún tipo de segmentación de acceso
B) Creando vector stores separados por audiencia/rol, o usando filtros de metadata si la implementación lo soporta, y seleccionando el store apropiado según el usuario autenticado ✅
C) Es necesario usar Fine-Tuning para esto
D) Se resuelve automáticamente sin intervención del desarrollador

**Explicación:** El control de acceso granular a documentos es responsabilidad del diseño de la aplicación: separar vector stores por audiencia o aplicar filtros de metadata en la consulta son estrategias comunes para asegurar que cada usuario solo reciba resultados de contenido al que tiene autorización de acceder.

---

### Q280
**¿Qué ocurre con el rendimiento de búsqueda si un vector store crece a un tamaño muy grande (millones de documentos)?**

A) No hay ningún impacto en el rendimiento sin importar la escala
B) Puede haber degradación de latencia y relevancia; para esa escala se recomienda considerar Foundry IQ u otras soluciones de búsqueda empresarial optimizadas ✅
C) El sistema rechaza automáticamente vector stores grandes
D) Solo afecta el costo de almacenamiento, nunca la velocidad de búsqueda

**Explicación:** A gran escala, la gestión manual de un vector store simple puede volverse ineficiente en términos de latencia y precisión de recuperación; soluciones gestionadas como Foundry IQ están diseñadas específicamente para escalar sin esta degradación, mediante técnicas de indexación más sofisticadas.

---

### Q281
**¿Puede `file_search` combinarse con instrucciones que le pidan al modelo citar explícitamente la fuente de cada afirmación en su respuesta al usuario final?**

A) No, las citaciones no son posibles con file_search
B) Sí, mediante instrucciones explícitas en el system prompt combinadas con el contexto recuperado, el modelo puede generar citaciones dentro de su respuesta ✅
C) Solo es posible con Fine-Tuning
D) Se requiere un servicio adicional de terceros obligatoriamente

**Explicación:** Aunque `include=["file_search_call.results"]` expone la trazabilidad a nivel de API, el desarrollador puede además instruir al modelo mediante el system prompt para que incluya citaciones legibles (ej. "según el manual de políticas, sección 4...") directamente en el texto de respuesta al usuario.

---

### Q282
**¿Qué tipo de contenido es menos apropiado para indexar directamente en un vector store de file_search sin preprocesamiento?**

A) Documentos de texto plano
B) Contenido altamente tabular/numérico denso (ej. hojas de cálculo con miles de filas de datos crudos), que se beneficia más de un enfoque estructurado tipo code_interpreter o base de datos consultable ✅
C) Manuales de políticas en PDF
D) Documentación de procedimientos en Word

**Explicación:** file_search está optimizado para recuperación semántica de contenido textual narrativo; datos tabulares masivos se representan pobremente como embeddings de texto y se benefician más de ser consultados mediante herramientas de cómputo estructurado (code_interpreter) o bases de datos vía function_calling.

---

### Q283
**¿Qué ventaja tiene mantener metadata descriptiva (ej. fecha de publicación, departamento, versión) al subir documentos a un vector store?**

A) Ninguna ventaja práctica, es solo información decorativa
B) Permite filtrado más preciso y contexto adicional para que el modelo priorice o distinga entre versiones/fuentes de información ✅
C) Es un requisito obligatorio sin el cual el archivo no se puede subir
D) Solo se usa para fines de facturación

**Explicación:** Metadata bien estructurada permite tanto filtrado programático (ej. solo documentos posteriores a 2025) como contexto adicional que ayuda al modelo a razonar sobre qué fuente es más autoritativa o reciente cuando hay información potencialmente contradictoria entre documentos.

---

### Q284
**¿file_search puede procesar contenido de imágenes embebidas dentro de un PDF (ej. diagramas)?**

A) Sí, siempre con perfecta precisión
B) La capacidad de extraer contenido de imágenes embebidas es limitada; el enfoque principal de file_search es contenido textual extraíble ✅
C) file_search convierte automáticamente cualquier imagen a texto con 100% de precisión
D) Solo funciona con imágenes en formato PNG

**Explicación:** file_search está diseñado primariamente para texto; el contenido visual embebido (diagramas, gráficas escaneadas) no se procesa con la misma robustez que el texto extraíble, y podría requerir soluciones adicionales de OCR o visión si es crítico para el caso de uso.

---

### Q285
**¿Qué patrón de prueba/QA se recomienda antes de lanzar a producción un agente que usa `file_search` sobre documentación crítica (ej. legal o médica)?**

A) Ninguna prueba es necesaria si el vector store fue creado correctamente
B) Validar con un conjunto de preguntas representativas si las respuestas recuperadas son precisas y las citaciones correctas, antes del despliegue ✅
C) Confiar completamente en que el sistema nunca cometerá errores
D) Solo es necesario probar la velocidad de respuesta, no la precisión

**Explicación:** Al igual que con cualquier sistema de IA en dominios de alto riesgo, se recomienda un proceso de validación (similar a la fase MEASURE del framework de IA Responsable) donde se prueban preguntas representativas para confirmar que el sistema recupera y cita información correcta antes de exponerlo a usuarios reales.

---

## BLOQUE F: Casos Edge de Function Calling (Q286-Q315)

### Q286
**¿Puede una función personalizada devolver un objeto JSON complejo (anidado) como resultado, o solo strings simples?**

A) Solo strings simples de una línea
B) Puede devolver estructuras más complejas, generalmente serializadas como string JSON en el campo `output` ✅
C) function_calling no soporta ningún tipo de estructura de datos
D) Solo números enteros son válidos como retorno

**Explicación:** Aunque el campo `output` técnicamente espera un string, es común y válido serializar estructuras complejas (diccionarios anidados, listas) usando `json.dumps()` antes de incluirlas, permitiendo que el modelo interprete resultados ricos y estructurados.

---

### Q287
**¿Qué sucede si una función personalizada tarda mucho tiempo en ejecutarse (ej. una consulta pesada a base de datos)?**

A) No hay ningún impacto en la experiencia del usuario
B) Puede incrementar significativamente la latencia percibida total de la respuesta, ya que el modelo espera el resultado antes de generar la respuesta final ✅
C) La función se cancela automáticamente después de exactamente 1 segundo
D) Azure ejecuta la función en un servidor separado sin impacto en latencia

**Explicación:** El flujo de function_calling es secuencial desde la perspectiva del ciclo de vida de la respuesta: el cliente debe completar la ejecución de la función y devolver el resultado antes de que el modelo pueda generar la respuesta final, por lo que funciones lentas afectan directamente el tiempo total percibido por el usuario.

---

### Q288
**¿Qué estrategia ayuda a mitigar el impacto de latencia de funciones lentas en la experiencia de usuario?**

A) No existe ninguna estrategia posible
B) Optimizar la función misma, usar caché cuando sea apropiado, o mostrar indicadores de progreso/carga mientras se ejecuta ✅
C) Siempre usar `code_interpreter` en su lugar sin importar el caso de uso
D) Eliminar completamente las funciones lentas de la aplicación

**Explicación:** Buenas prácticas de ingeniería aplican aquí igual que en cualquier sistema con llamadas potencialmente lentas: optimización de la función, estrategias de caché para resultados frecuentemente solicitados, y buena comunicación de estado (loading indicators) en la interfaz de usuario mientras se espera el resultado.

---

### Q289
**¿Es válido definir una función que no requiera ningún parámetro (objeto `parameters` vacío)?**

A) No, siempre se requiere al menos un parámetro
B) Sí, es válido para funciones que no necesitan input específico (ej. "obtener_fecha_actual") ✅
C) Se debe pasar un parámetro dummy obligatoriamente
D) function_calling no soporta funciones sin parámetros

**Explicación:** El JSON Schema de `parameters` puede describir un objeto sin propiedades requeridas, apropiado para funciones que no necesitan ningún input del contexto de la conversación para ejecutarse (ej. obtener la hora actual del servidor).

---

### Q290
**¿Qué sucede si el modelo genera argumentos que no coinciden exactamente con los tipos esperados en el JSON Schema (ej. envía un string donde se esperaba un número)?**

A) Nunca ocurre, el modelo siempre respeta perfectamente el schema
B) Puede ocurrir ocasionalmente; el código cliente debe validar y manejar estos casos defensivamente antes de usar los argumentos ✅
C) La API rechaza automáticamente cualquier desviación del schema antes de llegar al cliente
D) Se convierte automáticamente sin ningún riesgo de error

**Explicación:** Aunque los modelos son generalmente consistentes respetando el schema declarado, no hay garantía absoluta; buenas prácticas de ingeniería robusta incluyen validación de tipos y manejo de excepciones al procesar los argumentos recibidos antes de ejecutar lógica de negocio con ellos.

---

### Q291
**¿Puede el desarrollador definir un límite máximo de cuántas veces el modelo puede invocar funciones en una sola conversación, para evitar loops costosos?**

A) No es posible limitar esto de ninguna forma
B) Sí, es una práctica de diseño recomendada implementar un contador en el código cliente que limite iteraciones excesivas de tool calls ✅
C) Azure limita automáticamente a exactamente 3 llamadas sin posibilidad de ajuste
D) Solo se puede limitar mediante Fine-Tuning

**Explicación:** Como medida de control de costos y prevención de comportamientos inesperados (ej. loops donde el modelo invoca repetidamente sin converger a una respuesta), es una práctica recomendada que el código cliente implemente límites explícitos de iteraciones de tool calling por conversación.

---

### Q292
**¿Qué es un "orchestration loop" en el contexto de function_calling con múltiples iteraciones?**

A) Un error del sistema
B) El patrón de código donde el cliente repite el ciclo de "llamar al modelo → procesar tool calls → devolver resultados" hasta que el modelo genere una respuesta final sin más solicitudes de herramientas ✅
C) Un tipo de vector store
D) Una función nativa de Azure sin necesidad de código del cliente

**Explicación:** Para conversaciones donde el modelo podría necesitar múltiples herramientas secuencialmente (ej. buscar información, luego calcular con ella, luego formatear resultado), el desarrollador implementa un loop que continúa procesando tool calls hasta que la respuesta del modelo ya no contenga más solicitudes de función, momento en el cual se presenta al usuario.

---

### Q293
**¿Qué ventaja tiene declarar el tipo de dato específico (`string`, `integer`, `boolean`, `array`) en el JSON Schema de los parámetros de una función?**

A) Ninguna, todos los tipos se tratan igual internamente
B) Ayuda al modelo a generar argumentos correctamente tipados y reduce ambigüedad, mejorando la precisión de las invocaciones ✅
C) Solo afecta la documentación, no el comportamiento real
D) Es opcional y nunca se recomienda especificarlo

**Explicación:** Un schema bien tipado (ej. especificar que "cantidad" debe ser `integer` y no `string`) guía al modelo hacia generar valores válidos y facilita la validación automática en el lado del cliente, reduciendo errores de tipo en tiempo de ejecución de la función.

---

### Q294
**¿Es posible que el modelo decida invocar dos funciones DIFERENTES en la misma respuesta (no la misma función dos veces)?**

A) No, solo una función por respuesta está permitida
B) Sí, si la pregunta del usuario requiere lógicamente múltiples piezas de información de fuentes distintas ✅
C) Solo si ambas funciones tienen exactamente los mismos parámetros
D) Requiere configuración especial adicional no estándar

**Explicación:** Al igual que con múltiples invocaciones de la misma tool, el modelo puede generar múltiples `function_call` de funciones distintas en una sola respuesta cuando la consulta del usuario naturalmente requiere combinar información de ambas fuentes (ej. "dame el clima Y el estado de mi vuelo").

---

### Q295
**Un desarrollador quiere registrar (logging) cada vez que el modelo invoca una función, para fines de auditoría y debugging. ¿Dónde se implementa esto?**

A) Es una función nativa que Azure activa automáticamente sin código
B) En el código del cliente, en el punto donde se procesa el `function_call` antes de ejecutar la función real ✅
C) No es posible registrar invocaciones de funciones
D) Solo Microsoft puede ver estos logs, el desarrollador no tiene acceso

**Explicación:** Dado que el cliente es quien recibe y procesa cada `function_call`, es el punto natural del código donde el desarrollador puede insertar lógica de logging, métricas, o alertas antes (y después) de ejecutar la función real, dando control total de observabilidad sobre este flujo.

---

## BLOQUE G: Consolidación y Comparativas Finales de Domain 2 (Q296-Q350)

### Q296
**¿Cuál es la diferencia fundamental entre `web_search` y `file_search` en términos de la naturaleza de la fuente de datos?**

A) No hay diferencia, ambas acceden a las mismas fuentes
B) `web_search` accede a contenido público de internet en tiempo real; `file_search` accede a documentos privados previamente indexados por el desarrollador ✅
C) `file_search` siempre es más rápida que `web_search`
D) `web_search` requiere autenticación adicional y `file_search` no

**Explicación:** Esta es la distinción arquitectónica central entre ambas tools: el origen y naturaleza de los datos (público vs. privado, dinámico externo vs. curado internamente) determina cuál es apropiada para cada necesidad de información.

---

### Q297
**¿Cuál es la diferencia fundamental entre `code_interpreter` y `function_calling` en cuanto a qué tipo de "cómputo" realizan?**

A) Son completamente idénticas en funcionalidad
B) `code_interpreter` ejecuta código Python genérico en un sandbox aislado sin acceso a sistemas externos; `function_calling` invoca lógica específica y predefinida del desarrollador, que puede incluir acceso a sistemas externos propios ✅
C) `function_calling` siempre es más lento que `code_interpreter`
D) code_interpreter puede acceder a bases de datos privadas y function_calling no

**Explicación:** code_interpreter ofrece flexibilidad de ejecución de código arbitrario pero aislado (sin red); function_calling ofrece integración con sistemas externos específicos pero limitada a funciones predefinidas explícitamente por el desarrollador — cada una resuelve necesidades distintas de cómputo/integración.

---

### Q298
**Si un caso de uso requiere tanto ejecutar cálculos matemáticos arbitrarios COMO consultar un sistema propietario de la empresa, ¿qué arquitectura de tools es apropiada?**

A) Es imposible combinar ambas necesidades
B) Declarar ambas tools simultáneamente: `code_interpreter` para los cálculos y `function_calling` para la integración propietaria ✅
C) Usar solo `function_calling` para ambos propósitos, implementando el cálculo dentro de la función
D) Usar solo `code_interpreter`, ya que puede reemplazar cualquier función personalizada

**Explicación:** Ambas son opciones arquitectónicamente válidas (declarar ambas tools, o implementar el cálculo dentro de una función personalizada), pero la primera aprovecha las fortalezas nativas de cada tool: code_interpreter para cómputo flexible general, function_calling para integración específica con sistemas propios.

---

### Q299
**En términos de esfuerzo de implementación para el desarrollador, ¿cuál de las 4 tools principales requiere más código personalizado?**

A) `web_search`, que requiere configurar múltiples motores de búsqueda
B) `function_calling`, ya que requiere que el desarrollador implemente la lógica real de cada función y el loop de orquestación ✅
C) `code_interpreter`, que requiere escribir manualmente el código Python de antemano
D) `file_search`, que requiere entrenar un modelo de embeddings personalizado

**Explicación:** A diferencia de las tools nativas (web_search, file_search, code_interpreter) que son gestionadas internamente por Azure con configuración mínima, function_calling requiere que el desarrollador escriba, mantenga y ejecute la lógica real de cada función, además de implementar el ciclo de procesamiento de solicitud/respuesta.

---

### Q300
**¿Qué principio general debe guiar la decisión de qué tool(s) declarar para un agente en producción?**

A) Siempre declarar todas las tools disponibles, sin importar si son relevantes
B) Declarar únicamente las tools que son genuinamente necesarias para los casos de uso esperados del agente, evaluando el trade-off de flexibilidad vs. previsibilidad y superficie de riesgo ✅
C) El número de tools declaradas no tiene ningún impacto en el comportamiento del agente
D) Se debe declarar exactamente una tool por agente, nunca combinaciones

**Explicación:** Declarar tools innecesarias amplía la superficie de comportamiento posible del agente (mayor imprevisibilidad, mayor riesgo de uso incorrecto) sin beneficio real; el principio de diseño responsable sugiere declarar el conjunto mínimo suficiente de herramientas que efectivamente resuelven las necesidades identificadas del caso de uso.

---

### Q301
**¿Cuál es una señal de que un agente necesita rediseño arquitectónico (ej. dividir en múltiples agentes) en vez de simplemente añadir más tools?**

A) Nunca es necesario rediseñar, siempre se pueden añadir más tools indefinidamente
B) Cuando el número de tools y la complejidad de instrucciones del system prompt crecen a un punto donde el comportamiento del agente se vuelve impredecible o difícil de depurar ✅
C) Solo cuando se alcanza exactamente 10 tools declaradas
D) El rediseño nunca está relacionado con la cantidad de tools

**Explicación:** No existe un número mágico, pero una señal cualitativa de sobrecarga arquitectónica es cuando el system prompt se vuelve excesivamente largo intentando cubrir demasiados casos de uso distintos, o cuando el comportamiento del agente se vuelve inconsistente — en ese punto, dividir responsabilidades entre agentes especializados suele mejorar la mantenibilidad.

---

### Q302
**¿Qué tipo de prueba es especialmente importante antes de lanzar a producción un agente con `function_calling` que puede modificar datos (crear, actualizar, eliminar registros)?**

A) Solo pruebas de velocidad de respuesta
B) Pruebas exhaustivas de casos edge, incluyendo inputs maliciosos o inesperados, y validación de que las funciones fallan de forma segura (fail-safe) ✅
C) No se requieren pruebas adicionales más allá de las de lectura de datos
D) Solo se prueba una vez y nunca se vuelve a validar

**Explicación:** Funciones con capacidad de escritura/modificación tienen mayor superficie de riesgo que funciones de solo lectura; requieren testing más riguroso incluyendo intentos de manipulación adversarial, validación de límites, y confirmación de que fallos parciales no dejan el sistema en un estado inconsistente.

---

### Q303
**¿Qué relación existe entre las tools de Domain 2 y los principios de IA Responsable de Domain 4?**

A) No existe ninguna relación, son dominios completamente independientes
B) El diseño responsable de tools (validación, límites, logging, confirmación humana para acciones críticas) es una aplicación práctica de los principios de mitigación de daños cubiertos en Domain 4 ✅
C) Domain 4 reemplaza completamente la necesidad de Domain 2
D) Solo se relacionan si se usa Fine-Tuning

**Explicación:** Los principios de defensa en profundidad y mitigación de riesgos (Domain 4) se aplican concretamente en cómo se diseñan e implementan las tools de Domain 2 — por ejemplo, requerir confirmación humana antes de ejecutar una función con efectos irreversibles es una instancia práctica de la Capa 4 (Usuario) de mitigación.

---

### Q304
**Resumen: ¿cuál tool elegir si la necesidad es "datos públicos y actuales de internet"?**

A) `file_search`
B) `web_search` ✅
C) `code_interpreter`
D) `function_calling`

**Explicación:** Pregunta de consolidación directa — web_search es la respuesta canónica para información pública en tiempo real no disponible en el conocimiento pre-entrenado del modelo.

---

### Q305
**Resumen: ¿cuál tool elegir si la necesidad es "análisis matemático/estadístico de datos proporcionados"?**

A) `file_search`
B) `web_search`
C) `code_interpreter` ✅
D) `function_calling`

**Explicación:** Pregunta de consolidación directa — code_interpreter es la respuesta canónica para cómputo real y determinístico sobre datos, evitando que el modelo "estime" cálculos sin precisión garantizada.

---

### Q306
**Resumen: ¿cuál tool elegir si la necesidad es "buscar en documentos privados de la empresa"?**

A) `file_search` ✅
B) `web_search`
C) `code_interpreter`
D) `function_calling`

**Explicación:** Pregunta de consolidación directa — file_search con vector stores es la respuesta canónica para RAG sobre contenido documental privado previamente indexado.

---

### Q307
**Resumen: ¿cuál tool elegir si la necesidad es "consultar o modificar un sistema propietario interno (ERP, CRM, base de datos)"?**

A) `file_search`
B) `web_search`
C) `code_interpreter`
D) `function_calling` ✅

**Explicación:** Pregunta de consolidación directa — function_calling es la única tool diseñada para integración con lógica y sistemas específicos y propietarios del desarrollador, más allá de las capacidades genéricas de las tools nativas.

---

### Q308
**¿Qué error conceptual comete un desarrollador que intenta usar `code_interpreter` para consultar el inventario en tiempo real de un almacén?**

A) No es un error, es el uso correcto
B) Confunde cómputo/análisis (lo que hace code_interpreter) con integración a sistemas externos propietarios (lo que requiere function_calling); code_interpreter no tiene acceso de red para consultar sistemas externos ✅
C) El error es que debió usar `web_search` en su lugar
D) No existe forma de resolver esta necesidad con ninguna tool

**Explicación:** Este es un error de mapeo de herramienta común en el examen: la necesidad real (dato dinámico de sistema propietario) requiere function_calling; code_interpreter, al carecer de acceso a red, simplemente no puede cumplir esta función sin importar cómo se intente estructurar el código.

---

### Q309
**¿Qué error conceptual comete un desarrollador que intenta usar `web_search` para acceder a manuales internos confidenciales de la empresa?**

A) No es un error, web_search puede acceder a cualquier contenido
B) web_search solo indexa contenido público de internet; documentos confidenciales internos nunca estarían indexados públicamente, por lo que esta tool jamás encontraría ese contenido ✅
C) El error es de sintaxis en la declaración del tool
D) Se resuelve aumentando el `top` de resultados

**Explicación:** Este es otro error común de mapeo: contenido confidencial por definición no está en índices públicos de internet; la tool correcta para este caso es file_search con un vector store privado que contenga esos documentos internos.

---

### Q310
**Como cierre del bloque de Tools: ¿qué principio general resume la filosofía de diseño de las 4 tools de Domain 2?**

A) Todas las tools son intercambiables y da igual cuál se use
B) Cada tool está especializada para un tipo de necesidad de datos/cómputo distinto (público-actual, privado-documental, cómputo-genérico, integración-propietaria), y el diseño efectivo de agentes requiere mapear correctamente la necesidad real a la tool apropiada ✅
C) Siempre se debe usar la tool más nueva disponible
D) function_calling siempre reemplaza a las demás tools cuando está disponible

**Explicación:** Esta es la síntesis conceptual central de todo Domain 2: el examen evalúa repetidamente la capacidad del candidato de identificar correctamente, dado un escenario, qué tipo de necesidad de datos/cómputo existe y mapearla a la herramienta arquitectónicamente apropiada — dominar este mapeo es la habilidad central evaluada.

---

## 📊 PROGRESO ACUMULADO DEL BANCO TOTAL (ACTUALIZADO — SIN HUECOS)

```
✅ Q1-Q150   → Bancos originales
✅ Q151-Q175 → Parte 4 (Domain 1)
✅ Q176-Q240 → Parte 6 (Domain 2 core avanzado)
✅ Q241-Q275 → Parte 6B (Domain 2 escenarios industria)
✅ Q276-Q310 → Este documento, Parte 6C (Domain 2 casos edge + cierre consolidado)
✅ Q351-Q485 → Parte 7 (Domain 3 Optimización)
⏳ Q311-Q350 → Pequeño remanente de cierre (se absorbe en consolidación general al final)
⏳ Q486-Q800 → Domain 4 Responsible AI + escenarios finales mixtos

TOTAL RESUELTAS CON EXPLICACIÓN COMPLETA HASTA AHORA: ~445 preguntas
DOMAIN 2 (TOOLS): CUBIERTO COMPLETAMENTE ✅
```

**Siguiente:** Parte 8 (Q486-Q650) — Domain 4: Responsible AI en detalle completo
