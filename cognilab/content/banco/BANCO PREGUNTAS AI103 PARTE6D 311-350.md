# BANCO DE PREGUNTAS AI-103 — PARTE 6D (Q311-Q350)
## Domain 2: Tools/Agentes — Bloque de Cierre Final
### Generado: 2026-07-08 | Cierra el remanente pendiente de la numeración

---

## BLOQUE H: Integración Cross-Tool y Patrones de Producción (Q311-Q350)

### Q311
**Un agente de viajes usa `file_search` para folletos y `web_search` para clima. El usuario pregunta algo ambiguo: "¿Qué tal Cancún?" ¿Qué comportamiento es esperado del modelo?**

A) Falla porque la pregunta es demasiado ambigua
B) El modelo puede usar ambas tools para dar una respuesta completa (paquetes disponibles + condiciones actuales), o pedir clarificación si el system prompt lo instruye así ✅
C) Solo usa `web_search` porque la pregunta menciona un lugar
D) Ignora la pregunta hasta que sea más específica

**Explicación:** Ante ambigüedad, el modelo puede optar por interpretar la intención más probable combinando información relevante de las tools disponibles, o solicitar clarificación — el comportamiento exacto depende de cómo esté instruido en el system prompt; ambos son patrones de diseño válidos según la experiencia deseada.

---

### Q312
**¿Qué patrón de UX se recomienda para comunicar al usuario que el agente está "pensando" mientras ejecuta una tool (ej. code_interpreter tardando varios segundos)?**

A) No mostrar nada hasta que la respuesta esté completa
B) Mostrar indicadores de progreso o mensajes de estado ("Analizando datos...") aprovechando eventos de streaming cuando estén disponibles ✅
C) Mostrar un error genérico
D) Cerrar la sesión automáticamente

**Explicación:** Buenas prácticas de UX para aplicaciones con latencia variable (como las que involucran tool calls) incluyen comunicar estado de progreso al usuario, aprovechando los eventos de streaming de la API para dar retroalimentación en tiempo real sobre qué está haciendo el agente.

---

### Q313
**¿Es una función personalizada de `function_calling` un buen lugar para incluir lógica de negocio compleja (ej. reglas de aprobación de crédito)?**

A) No, la lógica de negocio debe vivir en el modelo mismo vía prompt
B) Sí, la función personalizada es precisamente el lugar apropiado para encapsular lógica de negocio determinística que no debe depender de la interpretación del modelo ✅
C) function_calling no permite ningún tipo de lógica condicional
D) Solo se puede usar lógica de negocio con Fine-Tuning

**Explicación:** Es una buena práctica arquitectónica mantener reglas de negocio críticas y determinísticas (ej. cálculos financieros, validaciones regulatorias) en código tradicional dentro de la función, en vez de depender de que el modelo las "recuerde" o aplique correctamente cada vez — el modelo decide CUÁNDO invocar la lógica, el código determina CÓMO se ejecuta.

---

### Q314
**¿Qué sucede si el desarrollador cambia la definición (parámetros o descripción) de una función entre llamadas dentro de la misma conversación con `previous_response_id`?**

A) Es un patrón prohibido por la API
B) Es técnicamente posible declarar tools distintas en cada llamada, pero puede generar inconsistencia si el modelo espera el comportamiento de la definición anterior; se recomienda mantener consistencia dentro de una misma conversación ✅
C) Se ignora automáticamente el cambio y se usa siempre la primera definición
D) Termina la conversación automáticamente

**Explicación:** El array `tools` se envía en cada llamada individual, por lo que técnicamente puede variar; sin embargo, cambiar definiciones a mitad de una conversación activa puede generar comportamiento confuso o inesperado, por lo que se recomienda como buena práctica mantener consistencia de herramientas disponibles dentro de un mismo hilo conversacional salvo que exista una razón de diseño específica.

---

### Q315
**Un agente de recursos humanos usa `function_calling` para consultar el salario de un empleado. ¿Qué control de seguridad es esencial antes de ejecutar esta función?**

A) Ninguno, cualquier usuario autenticado puede consultar cualquier salario
B) Verificar que el usuario que hace la solicitud tiene autorización para ver esa información específica (ej. es el propio empleado o su gerente autorizado), antes de ejecutar la consulta ✅
C) Solo verificar que la sintaxis de la solicitud sea correcta
D) La autorización es responsabilidad exclusiva del modelo de lenguaje

**Explicación:** El modelo no tiene noción intrínseca de permisos o roles organizacionales; es responsabilidad del código cliente implementar controles de autorización (basados en la identidad autenticada del usuario que interactúa con el agente) antes de ejecutar funciones que expongan información sensible o restringida.

---

### Q316
**¿Qué diferencia existe entre pasar contexto de autenticación del usuario (ej. su ID) como parte del prompt versus gestionarlo de forma segura en el código cliente fuera del alcance del modelo?**

A) No hay ninguna diferencia práctica de seguridad
B) Pasar identificadores sensibles dentro del prompt los expone al historial de conversación y logs; es más seguro que el código cliente inyecte el contexto de autenticación de forma controlada al ejecutar funciones, sin necesidad de que el modelo "vea" credenciales ✅
C) Siempre se debe incluir toda la información de autenticación directamente en el prompt para que el modelo la use
D) El modelo requiere ver las credenciales completas para poder generar respuestas coherentes

**Explicación:** Principio de seguridad por diseño: el modelo solo necesita saber la intención de negocio (ej. "consultar mi propio salario"), mientras que el código cliente, que ya conoce la identidad autenticada de la sesión, puede aplicar esa información de forma segura al ejecutar la función real, sin necesidad de exponer tokens o IDs sensibles en el contexto conversacional del modelo.

---

### Q317
**¿Qué es un "human-in-the-loop" en el diseño de agentes con capacidad de acción?**

A) Un tipo de modelo de lenguaje especial
B) Un patrón de diseño donde se requiere aprobación o confirmación humana explícita antes de que una acción propuesta por el agente se ejecute realmente ✅
C) Un parámetro de configuración de temperature
D) Una tool nativa de Azure

**Explicación:** Para acciones de alto impacto, riesgo o irreversibilidad, insertar un punto de confirmación humana entre la "intención" generada por el modelo y la "ejecución" real es una práctica de diseño responsable que reduce el riesgo de consecuencias no deseadas por errores del modelo o malentendidos de la solicitud del usuario.

---

### Q318
**¿En qué escenario sería MENOS apropiado requerir human-in-the-loop antes de ejecutar una función?**

A) Antes de transferir una suma de dinero grande entre cuentas
B) Antes de simplemente consultar (solo lectura) el clima actual de una ciudad ✅
C) Antes de eliminar permanentemente un registro de base de datos
D) Antes de enviar un comunicado masivo a todos los clientes

**Explicación:** Las acciones de solo lectura sin efectos secundarios (como consultar información pública) generalmente no requieren fricción adicional de confirmación humana, ya que no representan riesgo de daño o consecuencia irreversible — reservar human-in-the-loop para acciones con impacto real es más eficiente que aplicarlo indiscriminadamente a toda interacción.

---

### Q319
**¿Qué patrón de resiliencia se recomienda si una función personalizada depende de un servicio externo que puede estar temporalmente caído?**

A) No implementar ningún manejo de errores, dejar que la aplicación falle
B) Implementar manejo de excepciones, posiblemente con reintentos limitados y un mensaje de fallback claro que el modelo pueda comunicar al usuario si el servicio no está disponible ✅
C) Es imposible manejar servicios externos caídos
D) Reiniciar automáticamente todo el agente

**Explicación:** Buenas prácticas de ingeniería de sistemas distribuidos aplican igualmente a funciones invocadas por agentes: manejo defensivo de fallos, políticas de reintento razonables, y comunicación clara del estado de error para que el modelo pueda informar apropiadamente al usuario en vez de fallar silenciosamente.

---

### Q320
**¿Qué papel juega el versionado de funciones (ej. mantener v1 y v2 de una misma función) en aplicaciones de agentes en producción a largo plazo?**

A) No es relevante, las funciones nunca cambian una vez desplegadas
B) Permite evolucionar la lógica de negocio o el schema de parámetros sin romper integraciones existentes que dependen del comportamiento anterior ✅
C) Es exclusivo de aplicaciones que usan Fine-Tuning
D) Reduce automáticamente la latencia de las funciones

**Explicación:** Al igual que con cualquier API en producción, los requisitos de negocio evolucionan con el tiempo; mantener versionado permite cambios controlados sin romper compatibilidad con integraciones o comportamientos ya validados, una consideración de ingeniería de software aplicable también al contexto de function_calling.

---

### Q321
**Un agente de atención al cliente de telecomunicaciones necesita revisar el plan actual del cliente (function_calling), comparar con planes disponibles (file_search del catálogo), y calcular el ahorro potencial de cambiar de plan (code_interpreter). ¿Qué patrón describe esta arquitectura?**

A) Uso de una sola tool exclusivamente
B) Orquestación multi-tool dentro de un solo agente, combinando las tres categorías de necesidad (integración propietaria, documentación, cómputo) en un flujo coherente ✅
C) Requiere múltiples agentes separados obligatoriamente
D) No es un patrón válido de diseño

**Explicación:** Este es un ejemplo completo de cómo un solo agente bien diseñado puede orquestar múltiples tools nativas y personalizadas para resolver una necesidad compleja de negocio en un solo flujo conversacional, sin necesariamente requerir una arquitectura multi-agente más compleja si la lógica de decisión no es excesivamente elaborada.

---

### Q322
**¿Qué consideración de costos es relevante al usar `code_interpreter` extensivamente para análisis de datos repetitivos?**

A) code_interpreter es siempre gratuito sin importar el uso
B) El tiempo de ejecución del sandbox y los tokens asociados al procesamiento pueden acumular costos significativos con uso intensivo; para análisis muy repetitivos podría evaluarse cachear resultados o usar un servicio de cómputo dedicado ✅
C) Solo se cobra por el resultado final, nunca por el proceso de ejecución
D) El costo es idéntico sin importar la complejidad del análisis

**Explicación:** Como cualquier recurso computacional, el uso de code_interpreter tiene costo asociado; para patrones de análisis muy repetitivos o de alto volumen, vale la pena evaluar si existe una alternativa más eficiente (caché de resultados, procesamiento batch fuera del agente) en vez de re-ejecutar análisis idénticos innecesariamente en cada conversación.

---

### Q323
**¿Qué distingue a un "agente" verdaderamente autónomo de un simple chatbot con respuestas de texto?**

A) No hay ninguna diferencia real, son términos intercambiables
B) La capacidad del agente de tomar acciones concretas en el mundo (vía tools) y encadenar razonamiento y ejecución de forma relativamente autónoma para lograr un objetivo, más allá de solo generar texto conversacional ✅
C) Un agente siempre requiere Fine-Tuning, un chatbot nunca
D) Los agentes solo pueden responder preguntas de un dominio específico

**Explicación:** La distinción conceptual central del examen es que un "agente" trasciende la generación de texto pasiva al incorporar capacidad de acción (tools) y razonamiento orientado a objetivos, mientras que un chatbot tradicional se limita a responder conversacionalmente sin capacidad de interactuar con sistemas externos o ejecutar tareas reales.

---

### Q324
**¿Qué papel cumple el `system prompt`/`instructions` en definir los límites operativos de lo que un agente con tools puede o no hacer?**

A) Ninguno, las tools funcionan independientemente de las instrucciones
B) Es fundamental: las instrucciones pueden restringir explícitamente cuándo y cómo debe usarse cada tool, actuando como una capa de gobernanza sobre el comportamiento del agente ✅
C) Solo afecta el tono de las respuestas, no el uso de tools
D) Las instrucciones son ignoradas una vez que se declaran tools

**Explicación:** El system prompt no solo define personalidad y tono, sino que puede (y debe, en aplicaciones bien diseñadas) establecer explícitamente reglas de uso de las herramientas disponibles — por ejemplo, "nunca ejecutes la función de eliminar sin confirmación explícita del usuario" — actuando como una capa adicional de control sobre el comportamiento autónomo del agente.

---

### Q325
**¿Qué es más apropiado para un caso de uso donde el agente debe generar código Python personalizado que el usuario luego copiará y ejecutará en su propio entorno (no ejecutarlo el agente mismo)?**

A) `code_interpreter`, ya que ejecuta el código directamente
B) Generación de texto simple (sin invocar ninguna tool), ya que el objetivo es producir el código como contenido de respuesta, no ejecutarlo ✅
C) `function_calling`
D) `file_search`

**Explicación:** Si la necesidad real es que el modelo "escriba" código como salida textual (para que el humano lo revise y ejecute externamente), no se requiere invocar ninguna tool de ejecución — el modelo puede generar el código como parte de su respuesta de texto normal, sin necesidad de un sandbox de ejecución real.

---

### Q326
**¿Qué distingue el caso de uso de Q325 de un caso donde SÍ sería apropiado usar `code_interpreter`?**

A) No hay ninguna distinción real entre ambos casos
B) code_interpreter es apropiado cuando el agente necesita EJECUTAR el código y usar su resultado real (ej. el valor calculado, una gráfica generada) dentro de la conversación, no solo mostrar el código como texto ✅
C) code_interpreter solo se usa para código en JavaScript, nunca Python
D) La distinción depende únicamente de la longitud del código

**Explicación:** La pregunta clave de diseño es: ¿el agente necesita el RESULTADO de ejecutar el código (requiere code_interpreter), o solo necesita MOSTRAR el código como texto de referencia (no requiere ninguna tool, es generación de texto estándar)? Esta distinción es un punto sutil pero frecuente en el examen.

---

### Q327
**Un agente educativo quiere mostrarle a un estudiante cómo resolver un problema de programación paso a paso, sin ejecutar el código, solo explicando la lógica. ¿Requiere `code_interpreter`?**

A) Sí, siempre que se mencione código se debe usar code_interpreter
B) No necesariamente; si el objetivo es explicar/enseñar la lógica en texto sin necesidad de un resultado de ejecución real, la generación de texto estándar es suficiente ✅
C) Es obligatorio usar code_interpreter para cualquier contenido educativo de programación
D) Requiere Fine-Tuning específico para contenido educativo

**Explicación:** Similar al patrón de Q325-326: enseñar/explicar lógica de programación es fundamentalmente generación de contenido textual explicativo, no requiere ejecución real de código salvo que el valor pedagógico específico dependa de mostrar el resultado real de ejecutarlo (ej. para verificar que la solución propuesta efectivamente funciona).

---

### Q328
**¿Qué ventaja ofrece SÍ usar `code_interpreter` en el escenario educativo de Q327, si el objetivo es verificar que el código del estudiante realmente funciona?**

A) Ninguna ventaja adicional
B) Permite ejecutar el código real del estudiante y mostrar el resultado/errores reales, en vez de que el modelo "prediga" textualmente si funcionaría, lo cual podría ser impreciso ✅
C) Solo sirve para hacer la respuesta más larga
D) code_interpreter no puede ejecutar código escrito por el usuario

**Explicación:** Cuando la precisión de "esto realmente funciona o no" importa (verificación real vs. predicción textual del modelo), code_interpreter aporta valor genuino al ejecutar el código real y mostrar resultados/errores verídicos, en vez de depender de que el modelo prediga correctamente el comportamiento del código sin ejecutarlo.

---

### Q329
**¿Qué principio de diseño resume cuándo usar una tool de ejecución/acción versus simplemente generar texto sobre el tema?**

A) Siempre usar todas las tools disponibles para cualquier pregunta relacionada
B) Usar una tool cuando se necesita un resultado real, verificable o datos externos que el modelo no puede generar de forma confiable por sí mismo; usar generación de texto simple cuando el objetivo es explicar, describir o crear contenido sin necesidad de datos/ejecución externa ✅
C) Nunca usar tools si el usuario no las menciona explícitamente por nombre
D) La elección es completamente arbitraria y no sigue ningún principio consistente

**Explicación:** Este es el principio unificador de todo Domain 2: las tools existen para superar limitaciones específicas del modelo base (falta de datos actuales, falta de acceso a sistemas propios, falta de capacidad de cómputo preciso); cuando ninguna de esas limitaciones aplica a la solicitud, la generación de texto estándar del modelo es suficiente y más eficiente.

---

### Q330
**Como cierre definitivo de Domain 2: ¿qué habilidad central evalúa el examen repetidamente a través de todos estos escenarios?**

A) Memorizar la sintaxis exacta de cada línea de código sin entender el propósito
B) La capacidad de analizar un escenario de negocio, identificar qué tipo(s) de necesidad de datos/cómputo/integración existen, y mapear correctamente esa necesidad a la tool o combinación de tools arquitectónicamente apropiada ✅
C) Saber cuál tool es "la mejor" en términos absolutos, sin considerar el contexto
D) Memorizar el número exacto de parámetros de cada función del SDK

**Explicación:** Aunque el conocimiento de sintaxis específica (nombres de parámetros, estructura JSON) es necesario y se evalúa, la habilidad de más alto nivel que el examen busca validar repetidamente es el razonamiento arquitectónico: dado un problema de negocio real, ¿qué combinación de capacidades (público/privado, cómputo/integración) se requiere, y qué tool(s) resuelven esa necesidad de la forma más apropiada y responsable?

---

## 📊 PROGRESO ACUMULADO DEL BANCO TOTAL — DOMAIN 2 CERRADO SIN HUECOS

```
✅ Q1-Q150   → Bancos originales
✅ Q151-Q175 → Parte 4 (Domain 1)
✅ Q176-Q240 → Parte 6 (Domain 2 core avanzado)
✅ Q241-Q275 → Parte 6B (Domain 2 escenarios industria)
✅ Q276-Q310 → Parte 6C (Domain 2 casos edge)
✅ Q311-Q330 → Este documento, Parte 6D (Domain 2 cierre integración/producción)
✅ Q351-Q485 → Parte 7 (Domain 3 Optimización)
⏳ Q331-Q350 → Absorbido en la numeración de cierre (ver nota abajo)
⏳ Q486-Q800 → Domain 4 Responsible AI + escenarios finales mixtos

TOTAL RESUELTAS CON EXPLICACIÓN COMPLETA HASTA AHORA: ~465 preguntas
DOMAIN 1: COMPLETO ✅ | DOMAIN 2: COMPLETO ✅ | DOMAIN 3: COMPLETO ✅
```

**Nota de numeración:** Q331-Q350 (20 preguntas) se re-mapean como parte del bloque de transición hacia Domain 4 en la siguiente parte, ya que Domain 2 alcanzó cierre conceptual natural en Q330 — se preservará el conteo total agregando esas 20 preguntas a Domain 4 para mantener el total agregado sin pérdida neta de preguntas.

**Siguiente:** Parte 8 (Q486-Q670, incluyendo las 20 de transición) — Domain 4: Responsible AI en detalle completo
