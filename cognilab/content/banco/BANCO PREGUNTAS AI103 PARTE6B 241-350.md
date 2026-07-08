# BANCO DE PREGUNTAS AI-103 — PARTE 6B (Q241-Q350)
## Domain 2: Tools/Agentes — Escenarios de Industria (Completo)
### Generado: 2026-07-08 | Completa el bloque pendiente de la Parte 6

---

## BLOQUE C (cont.): Escenarios de Integración Empresarial (Q241-Q280)

### Q241
**Un retailer necesita que su agente consulte inventario en tiempo real de 200 tiendas físicas conectadas a un ERP propietario. ¿Qué tool usar?**

A) `web_search`, porque el inventario es información pública
B) `function_calling` apuntando al API del ERP ✅
C) `file_search` con un snapshot diario del inventario
D) `code_interpreter` para simular el inventario

**Explicación:** El inventario en tiempo real vive en un sistema propietario interno (ERP), no es información pública indexable por buscadores ni un documento estático — requiere integración directa vía function_calling para reflejar el estado actual real.

---

### Q242
**Una fábrica quiere que el agente analice datos de sensores IoT (temperatura, vibración) subidos como CSV para detectar anomalías. ¿Qué tool es más apropiada?**

A) `file_search`
B) `code_interpreter`, usando pandas/numpy para análisis estadístico de series de tiempo ✅
C) `web_search`
D) No es posible con las tools actuales del examen

**Explicación:** El análisis de datos numéricos estructurados (detección de anomalías, umbrales estadísticos) es un caso de uso central de code_interpreter, que puede ejecutar cálculos reales sobre los datos proporcionados en vez de que el modelo "estime" resultados sin precisión matemática real.

---

### Q243
**Una universidad quiere un tutor virtual que responda dudas basándose en el sílabo y materiales del curso (PDFs subidos por el profesor). ¿Qué tool es la base de esta solución?**

A) `function_calling`
B) `file_search` con un vector store del material del curso ✅
C) `web_search` exclusivamente
D) `code_interpreter`

**Explicación:** El material del curso es documentación estática y privada (no pública, no requiere cálculo), el caso de uso textbook para file_search: se indexan los PDFs y el modelo responde ancladas en ese contenido específico.

---

### Q244
**Una dependencia de gobierno quiere que los ciudadanos consulten el estado de un trámite usando su número de folio. ¿Qué tool es apropiada?**

A) `web_search`
B) `function_calling` consultando el sistema de gestión de trámites por folio ✅
C) `file_search` con un PDF de trámites genéricos
D) `code_interpreter`

**Explicación:** Consultar el estado específico de un trámite individual (dato dinámico y personal, no genérico) requiere integración con el sistema propietario de gestión vía function_calling, pasando el folio como parámetro.

---

### Q245
**Una aseguradora quiere que el agente explique coberturas generales de pólizas Y calcule una prima estimada según variables que el usuario proporciona (edad, tipo de vehículo). ¿Qué combinación de tools resuelve ambas necesidades?**

A) Solo `file_search`
B) `file_search` (coberturas generales documentadas) + `code_interpreter` (cálculo de prima con fórmula) ✅
C) Solo `function_calling`
D) Solo `web_search`

**Explicación:** Las coberturas generales son contenido documental estático (file_search), mientras que el cálculo de una prima con una fórmula matemática basada en variables del usuario es una tarea de cómputo (code_interpreter) — ambas tools se complementan.

---

### Q246
**Una inmobiliaria quiere que el agente muestre propiedades disponibles actualmente en su sistema de listados, que cambia constantemente. ¿Qué tool es más apropiada?**

A) `file_search` con un PDF de propiedades actualizado semestralmente
B) `function_calling` apuntando al API del sistema de listados en tiempo real ✅
C) `web_search`
D) `code_interpreter`

**Explicación:** Un sistema de listados que cambia constantemente (propiedades que se venden/agregan a diario) requiere datos en tiempo real desde el sistema propietario — un documento estático quedaría desactualizado rápidamente, haciendo function_calling la opción correcta.

---

### Q247
**Una empresa agrícola quiere que el agente consulte pronósticos climáticos actuales para planificar siembra. ¿Qué tool usar?**

A) `file_search`
B) `web_search` ✅
C) `code_interpreter` únicamente
D) `function_calling` con una función que simule el clima

**Explicación:** Pronósticos climáticos son información pública, dinámica y externa a la empresa — el caso de uso central de web_search, que accede a fuentes actualizadas sin necesidad de integración propietaria.

---

### Q248
**Una empresa agrícola además quiere calcular la cantidad óptima de fertilizante según datos de suelo que el agrónomo sube en CSV. ¿Qué tool complementa a `web_search` en este escenario?**

A) `file_search`
B) `code_interpreter`, para procesar el CSV y aplicar fórmulas de optimización ✅
C) Otra instancia de `web_search`
D) No se requiere ninguna tool adicional

**Explicación:** El cálculo de fertilizante óptimo a partir de datos estructurados subidos (CSV de análisis de suelo) es una tarea de procesamiento de datos y cómputo, apropiada para code_interpreter, complementando la información climática pública obtenida vía web_search.

---

### Q249
**Un banco de inversión quiere que el agente consulte cotizaciones bursátiles actuales y también analice el portafolio histórico de un cliente en Excel. ¿Qué combinación de tools resuelve esto?**

A) Solo `code_interpreter`
B) `web_search` (cotizaciones actuales) + `code_interpreter` (análisis del Excel histórico) ✅
C) Solo `function_calling`
D) Solo `file_search`

**Explicación:** Las cotizaciones actuales son datos públicos en tiempo real (web_search), mientras que analizar un archivo Excel con el historial del portafolio del cliente requiere procesamiento de datos estructurados (code_interpreter) — un escenario multi-tool clásico.

---

### Q250
**Una cadena hotelera quiere que el agente consulte disponibilidad de habitaciones en tiempo real Y responda preguntas sobre las amenidades generales del hotel (documentadas en un manual). ¿Qué combinación resuelve ambas necesidades?**

A) Solo `function_calling`
B) `function_calling` (disponibilidad en tiempo real desde el PMS) + `file_search` (amenidades documentadas) ✅
C) Solo `web_search`
D) Solo `code_interpreter`

**Explicación:** La disponibilidad de habitaciones cambia constantemente y vive en el Property Management System propietario (function_calling), mientras que las amenidades son información relativamente estática documentada (file_search) — cada necesidad requiere su tool correspondiente.

---

### Q251
**Un proveedor de servicios de salud quiere que el agente consulte protocolos de triage (documentados) para orientar al paciente, pero SIN dar diagnósticos médicos directos. ¿Qué combinación de diseño resuelve esto de forma responsable?**

A) `file_search` sobre protocolos + system prompt que restrinja explícitamente dar diagnósticos ✅
B) `function_calling` que diagnostique automáticamente
C) `code_interpreter` para calcular el diagnóstico
D) `web_search` sin restricciones adicionales

**Explicación:** file_search ancla las respuestas en protocolos reales aprobados por la institución, mientras que el system prompt (Capa 3 de mitigación) impone restricciones explícitas de alcance — una combinación de tool apropiada y diseño responsable, relevante también para Domain 4.

---

### Q252
**Una empresa de manufactura quiere mantenimiento predictivo: el agente debe consultar el historial de fallas de una máquina (documentado) Y ejecutar un modelo estadístico simple sobre datos de sensores recientes. ¿Qué tools se combinan?**

A) Solo `web_search`
B) `file_search` (historial documentado) + `code_interpreter` (modelo estadístico sobre datos de sensores) ✅
C) Solo `function_calling`
D) Ninguna tool es apropiada para este caso

**Explicación:** El historial de fallas documentado es contenido de referencia recuperable vía file_search, mientras que ejecutar un modelo estadístico sobre datos numéricos recientes requiere cómputo real vía code_interpreter — combinación natural para mantenimiento predictivo.

---

### Q253
**Un bufete legal quiere que el agente redacte borradores de contratos usando cláusulas estándar de su plantilla interna. ¿Qué tool es la base apropiada?**

A) `web_search`
B) `file_search` sobre la biblioteca de cláusulas y plantillas del despacho ✅
C) `function_calling`
D) `code_interpreter`

**Explicación:** Las cláusulas estándar y plantillas son contenido documental privado de la firma; file_search permite que el modelo recupere y componga basándose en ese material aprobado internamente, en vez de generar cláusulas desde cero sin respaldo legal validado.

---

### Q254
**Una empresa de e-commerce quiere recomendar productos complementarios basándose en el historial de compra del cliente (en su base de datos propietaria) Y en tendencias actuales de moda. ¿Qué combinación resuelve esto?**

A) Solo `file_search`
B) `function_calling` (historial de compra desde BD propietaria) + `web_search` (tendencias actuales) ✅
C) Solo `code_interpreter`
D) Ninguna combinación es necesaria

**Explicación:** El historial de compra vive en un sistema propietario específico del cliente (function_calling), mientras que las tendencias de moda son información pública externa y cambiante (web_search) — ambas fuentes se combinan para una recomendación personalizada y actual.

---

### Q255
**Una aerolínea de bajo costo quiere que el agente calcule el costo total de un viaje incluyendo equipaje extra, según reglas de precios que cambian por temporada (documentadas internamente). ¿Qué combinación resuelve esto?**

A) Solo `web_search`
B) `file_search` (reglas de precios documentadas) + `code_interpreter` (cálculo del total según esas reglas) ✅
C) Solo `function_calling`
D) `code_interpreter` únicamente sin contexto de reglas

**Explicación:** Las reglas de precios por temporada son información documental que puede cambiar (file_search las recupera actualizadas), y el cálculo aritmético del costo total con esas reglas aplicadas requiere cómputo preciso (code_interpreter) — evitando que el modelo "calcule mentalmente" con riesgo de error en aritmética compleja.

---

## BLOQUE D: Escenarios Adicionales de Arquitectura (Q256-Q300)

### Q256
**¿Qué ventaja ofrece declarar explícitamente en el system prompt qué tool usar para cada tipo de pregunta, en vez de dejar la decisión completamente libre al modelo?**

A) Ninguna, siempre es mejor dejar la decisión completamente libre
B) Puede mejorar la precisión y previsibilidad en dominios donde la ambigüedad de elección de tool es costosa de resolver incorrectamente ✅
C) Es obligatorio hacerlo siempre según la documentación oficial
D) Reduce el número de tools que se pueden declarar

**Explicación:** Aunque el modelo tiene autonomía por diseño, guiar su decisión con instrucciones explícitas en el system prompt (ej. "usa file_search solo para preguntas sobre políticas internas") puede mejorar la consistencia en dominios donde una elección incorrecta de herramienta tendría alto costo (ej. dar información desactualizada en vez de tiempo real).

---

### Q257
**¿Qué es un "agente" en el contexto de Azure AI Foundry, más allá de una simple llamada con tools?**

A) Es exactamente lo mismo que una llamada simple a `responses.create()`
B) Una entidad persistente con instrucciones, tools y configuración definidas que puede reutilizarse across múltiples conversaciones/sesiones ✅
C) Un tipo de modelo de lenguaje distinto a GPT-4o
D) Un servicio exclusivo de autenticación

**Explicación:** Un "agente" en Foundry encapsula configuración reutilizable (instrucciones, tools habilitadas, modelo) como un recurso gestionado, en vez de reconfigurar todo en cada llamada individual — facilita mantenimiento y consistencia across una aplicación.

---

### Q258
**¿Qué framework de orquestación multi-agente es nativo de Microsoft, además del SDK básico de Agents?**

A) LangChain es la única opción de Microsoft
B) Semantic Kernel ✅
C) TensorFlow Agents
D) PyTorch Orchestrator

**Explicación:** Semantic Kernel es el framework de orquestación de Microsoft diseñado para coordinar múltiples "skills"/agentes, gestionar memoria y planificación compleja, siendo una capa adicional sobre el SDK básico de Azure OpenAI para escenarios más sofisticados.

---

### Q259
**¿Qué frameworks de terceros son compatibles con Azure OpenAI para construir agentes, además de las herramientas nativas de Microsoft?**

A) Ninguno, solo se puede usar el SDK nativo de Microsoft
B) LangChain y AutoGen son ejemplos compatibles con endpoints de Azure OpenAI ✅
C) Solo frameworks escritos específicamente en C#
D) Requiere licencia adicional de Microsoft obligatoriamente

**Explicación:** Al exponer una API compatible con el estándar de OpenAI, Azure OpenAI puede integrarse con frameworks populares de terceros diseñados originalmente para OpenAI directo, como LangChain (orquestación general) o AutoGen (multi-agente de investigación), ampliando las opciones de arquitectura disponibles.

---

### Q260
**En una arquitectura de orquestación multi-agente, ¿qué rol cumple típicamente el "agente orquestador"?**

A) Ejecuta directamente todas las tareas sin delegar
B) Descompone la tarea compleja, delega a agentes especializados, y sintetiza sus resultados en una respuesta coherente ✅
C) Solo gestiona la autenticación del sistema
D) Reemplaza la necesidad de tools especializadas

**Explicación:** El patrón de orquestador-especialistas permite dividir problemas complejos en subtareas manejables, cada una resuelta por un agente optimizado para esa función específica (búsqueda, análisis, generación), con el orquestador coordinando el flujo y consolidando resultados finales.

---

### Q261
**¿Cuándo se justifica una arquitectura multi-agente sobre un solo agente con múltiples tools?**

A) Siempre es mejor multi-agente, sin excepción
B) Cuando la complejidad de la tarea, el volumen de tools necesarias, o la necesidad de especialización profunda excede lo manejable eficientemente por un solo agente ✅
C) Nunca se justifica, un solo agente siempre es suficiente
D) Solo cuando el presupuesto de la empresa es ilimitado

**Explicación:** Para casos simples, un solo agente con varias tools bien definidas es más simple de mantener y depurar. La complejidad adicional de multi-agente se justifica cuando hay necesidad de especialización profunda por dominio, paralelización real de subtareas, o cuando un solo contexto se volvería inmanejablemente grande.

---

### Q262
**¿Qué consideración de costo es relevante al diseñar una arquitectura multi-agente versus un solo agente?**

A) Multi-agente siempre es más económico
B) Múltiples agentes pueden implicar múltiples llamadas al modelo por tarea, incrementando el costo total en tokens comparado con un solo agente eficiente ✅
C) El costo es idéntico en ambos casos siempre
D) Solo el agente orquestador genera costo, los especialistas son gratuitos

**Explicación:** Cada agente que participa en resolver una tarea típicamente implica su propia(s) llamada(s) al modelo, cada una consumiendo tokens; el desarrollador debe evaluar si la mejora en calidad/especialización justifica el costo incremental de una arquitectura más compleja.

---

### Q263
**Una empresa de manufactura tiene documentos técnicos en 5 idiomas distintos. ¿Afecta esto la configuración de `file_search`?**

A) file_search no funciona con contenido multiidioma
B) file_search generalmente puede indexar y buscar contenido multiidioma, ya que los embeddings capturan significado semántico más allá del idioma específico en muchos casos ✅
C) Se requiere un vector store separado obligatoriamente por cada idioma
D) Solo funciona con documentos en inglés

**Explicación:** Los modelos de embeddings modernos suelen tener capacidades multilingües razonables, permitiendo cierta capacidad de búsqueda cross-language, aunque la precisión óptima generalmente se logra cuando el idioma de la query coincide con el idioma predominante de los documentos relevantes.

---

### Q264
**¿Qué estrategia se recomienda si un documento fuente para file_search es extremadamente extenso (ej. 500 páginas)?**

A) No es posible indexar documentos largos
B) El sistema de chunking automáticamente lo divide en fragmentos manejables durante la indexación ✅
C) Se debe convertir manualmente a 500 archivos separados de una página
D) Solo se indexa la primera página

**Explicación:** El proceso de indexación de file_search incluye automáticamente el chunking del documento en fragmentos de tamaño apropiado para embeddings y recuperación granular, sin requerir que el desarrollador divida manualmente el archivo fuente.

---

### Q265
**Un desarrollador nota que las respuestas de `file_search` a veces incluyen información parcialmente desactualizada. ¿Cuál es la causa más probable?**

A) file_search siempre usa la versión más reciente de internet automáticamente
B) El vector store no ha sido re-indexado con la versión actualizada del documento fuente ✅
C) Es un bug permanente sin solución de Azure
D) Se requiere Fine-Tuning para resolver esto

**Explicación:** file_search solo puede recuperar información de lo que efectivamente está indexado en el vector store; si el documento fuente cambió pero no se volvió a subir/re-indexar, el sistema seguirá devolviendo la versión anterior — el desarrollador debe implementar un proceso de actualización periódica del índice.

---

### Q266
**¿Qué papel juega el "chunking overlap" (superposición entre fragmentos) en la calidad de recuperación de RAG?**

A) No tiene ningún efecto en la calidad
B) Un pequeño overlap entre chunks consecutivos ayuda a preservar contexto que de otra forma se perdería en los límites exactos de corte ✅
C) Siempre debe ser cero para máxima eficiencia
D) Solo aplica a documentos en formato PDF

**Explicación:** Sin overlap, una idea que cruza el límite exacto entre dos chunks podría fragmentarse de forma que ninguno de los dos chunks por sí solo contenga el contexto completo; un overlap moderado mitiga este problema de pérdida de contexto en los bordes.

---

### Q267
**Una empresa farmacéutica necesita trazabilidad completa de qué documento respaldó cada respuesta del agente, por razones regulatorias (FDA/COFEPRIS). ¿Qué configuración es esencial?**

A) No es posible cumplir este requisito con file_search
B) Usar `include=["file_search_call.results"]` para capturar y almacenar qué chunks/documentos específicos respaldaron cada respuesta ✅
C) Usar únicamente `web_search` en su lugar
D) Desactivar el logging completamente

**Explicación:** Para cumplimiento regulatorio en industrias altamente reguladas, es esencial poder auditar exactamente qué fuente documental generó cada afirmación del modelo — el parámetro `include` con `file_search_call.results` es la herramienta específica del SDK para esta trazabilidad.

---

### Q268
**¿Qué patrón se recomienda cuando una función personalizada requiere credenciales sensibles (ej. API key de un sistema de terceros)?**

A) Incluir la API key directamente en la descripción de la función que ve el modelo
B) Gestionar las credenciales en el código del lado del cliente (ej. desde variables de entorno o Key Vault), nunca exponerlas al modelo ✅
C) Pedirle al usuario que escriba la API key en el chat
D) No es posible usar funciones que requieran credenciales

**Explicación:** El modelo solo necesita saber QUÉ función invocar y CON QUÉ argumentos de negocio (no técnicos de autenticación); las credenciales sensibles deben permanecer completamente en el código del cliente que ejecuta la función, nunca expuestas en el prompt, la definición de la tool, o el historial de conversación.

---

### Q269
**Un chatbot de una tienda departamental usa `function_calling` para procesar devoluciones. ¿Qué consideración de diseño es crítica antes de ejecutar la devolución automáticamente?**

A) Ninguna, se debe ejecutar automáticamente siempre que el modelo lo solicite
B) Validar reglas de negocio (plazos, condiciones del producto) y potencialmente requerir confirmación antes de ejecutar una acción con impacto financiero ✅
C) Solo verificar que el usuario esté autenticado
D) La validación de reglas de negocio no es responsabilidad del desarrollador

**Explicación:** Acciones con impacto financiero o irreversible (procesar una devolución/reembolso) requieren validación de reglas de negocio en el código cliente antes de ejecutarse, y frecuentemente un paso de confirmación, en línea con buenas prácticas de diseño responsable de agentes con capacidad de acción.

---

### Q270
**¿Qué ventaja ofrece separar la lógica de "decidir qué hacer" (el modelo) de "ejecutar la acción" (el código cliente) en function_calling?**

A) Ninguna ventaja práctica
B) Permite insertar validaciones, límites de seguridad, logging y control humano entre la intención del modelo y la ejecución real ✅
C) Solo sirve para reducir la latencia
D) Es un requisito puramente estético del SDK

**Explicación:** Esta separación de responsabilidades es una decisión de diseño de seguridad fundamental: el desarrollador mantiene control total sobre qué se ejecuta realmente, pudiendo interceptar, validar, loguear o incluso rechazar la ejecución de una función solicitada por el modelo antes de que tenga efecto real en sistemas de producción.

---

### Q271
**Una empresa de telecomunicaciones quiere que el agente diagnostique problemas de conectividad consultando el estado de la red (API propia) y sugiera soluciones basadas en una base de conocimiento de troubleshooting documentada. ¿Qué combinación de tools resuelve esto?**

A) Solo `web_search`
B) `function_calling` (estado de red en tiempo real) + `file_search` (base de conocimiento de troubleshooting) ✅
C) Solo `code_interpreter`
D) No es posible combinar diagnóstico en tiempo real con documentación

**Explicación:** El estado actual de la red es un dato dinámico propietario (function_calling), mientras que los procedimientos de troubleshooting son contenido documentado relativamente estable (file_search) — juntas permiten un diagnóstico informado y accionable.

---

### Q272
**¿Qué es Semantic Kernel en relación con las tools nativas de Responses API?**

A) Reemplaza completamente la necesidad de usar tools de Azure OpenAI
B) Es una capa de orquestación adicional que puede coordinar el uso de tools nativas junto con lógica personalizada más compleja ✅
C) Es un tipo de modelo de embeddings
D) Solo funciona con Python, no con otros lenguajes

**Explicación:** Semantic Kernel no reemplaza las tools de Azure OpenAI, sino que puede orquestar su uso junto con "plugins"/skills personalizados adicionales, memoria de largo plazo, y planificación multi-paso más sofisticada que lo que ofrece una sola llamada a Responses API.

---

### Q273
**¿Qué patrón de diseño ayuda a un agente a "recordar" preferencias del usuario across múltiples sesiones distintas (no solo dentro de una conversación activa)?**

A) `previous_response_id` es suficiente para esto
B) Se requiere una capa de memoria persistente externa (ej. base de datos) que el agente consulte vía function_calling, ya que `previous_response_id` solo cubre una sesión activa ✅
C) No es posible persistir memoria entre sesiones
D) Fine-Tuning es la única forma de lograr esto

**Explicación:** `previous_response_id` gestiona contexto dentro de una conversación activa/sesión, pero no persiste automáticamente entre sesiones completamente nuevas del usuario; para memoria de largo plazo (ej. "recuerda que prefiero vuelos matutinos" en visitas futuras), se necesita almacenamiento externo consultado explícitamente.

---

### Q274
**Un marketplace B2B quiere que el agente compare precios de un producto entre proveedores registrados en su plataforma (base de datos propia) y precios de mercado externos. ¿Qué combinación de tools aplica?**

A) Solo `file_search`
B) `function_calling` (precios de proveedores en la plataforma) + `web_search` (precios de mercado externos) ✅
C) Solo `code_interpreter`
D) Ninguna combinación resuelve esto adecuadamente

**Explicación:** Los precios de proveedores registrados viven en la base de datos propietaria del marketplace (function_calling), mientras que los precios de mercado externos requieren búsqueda pública actual (web_search) — un escenario clásico de comparación que combina fuente interna y externa.

---

### Q275
**¿Qué diferencia arquitectónica clave existe entre usar `code_interpreter` para generar una gráfica versus pedirle al modelo que "describa" una gráfica en texto sin ejecutar código?**

A) No hay diferencia, ambos métodos son equivalentes en precisión
B) code_interpreter ejecuta cálculos y renderizado reales sobre los datos proporcionados, garantizando precisión matemática; describir en texto sin ejecución es propenso a errores o invención ✅
C) Describir en texto siempre es más rápido y igual de preciso
D) code_interpreter no puede generar gráficas, solo texto

**Explicación:** Sin ejecución real de código, el modelo estaría "imaginando" o aproximando cómo se vería una gráfica basándose en patrones de su entrenamiento, sin garantía de que los valores sean matemáticamente correctos — code_interpreter elimina ese riesgo al ejecutar cómputo real y determinístico sobre los datos reales proporcionados.

---

## 📊 PROGRESO ACUMULADO DEL BANCO TOTAL (ACTUALIZADO)

```
✅ Q1-Q150   → Bancos originales
✅ Q151-Q175 → Parte 4 (Domain 1)
✅ Q176-Q240 → Parte 6 (Domain 2 avanzado)
✅ Q241-Q275 → Este documento, Parte 6B (Domain 2 escenarios industria — bloque completo)
✅ Q351-Q485 → Parte 7 (Domain 3 Optimización)
⏳ Q276-Q350 → Domain 2 remanente (casos edge adicionales)
⏳ Q486-Q800 → Domain 4 y escenarios finales

TOTAL RESUELTAS CON EXPLICACIÓN COMPLETA HASTA AHORA: ~410 preguntas
```

**Nota de transparencia:** Aún queda un pequeño remanente Q276-Q350 (75 preguntas) de Domain 2 que completaré junto con el inicio de la Parte 8, para no dejar huecos. Gracias por la atención al detalle — es justo lo que necesitas para que este banco sea confiable.

**Siguiente:** Cierre de Q276-Q350 + inicio Parte 8 (Domain 4: Responsible AI)
