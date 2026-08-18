# BANCO DE PREGUNTAS AI-103 — PARTE 14 (Q1300-Q1319)
## Domain 2: Tools — Flujos de trabajo de agentes (Agent Workflows) en Microsoft Foundry
### Generado: 2026-08-18 | Fuente: módulo "Compilar flujos de trabajo de agentes en Microsoft Foundry"

---

### Q1300
**¿Cuáles son los tres patrones de flujo de trabajo predefinidos que describe el módulo?**

A) Secuencial, human-in-the-loop y chat de grupo ✅
B) Síncrono, asíncrono y por lotes
C) Cliente-servidor, publicador-suscriptor y peer-to-peer
D) Lineal, circular y en árbol

**Explicación:** Secuencial (ruta fija paso a paso), human-in-the-loop (pausa para pedir aprobación/entrada humana antes de continuar) y chat de grupo (el control se desplaza dinámicamente entre varios agentes especializados según el contexto) son los tres patrones de orquestación cubiertos.

---

### Q1301
**¿Qué caracteriza a un flujo de trabajo "secuencial" frente a uno de "chat de grupo"?**

A) El secuencial nunca puede invocar agentes; el chat de grupo sí
B) El secuencial sigue un camino fijo donde cada nodo pasa su salida al siguiente en orden; el chat de grupo permite que el control se desplace dinámicamente entre agentes según el contexto y los resultados intermedios, sin una ruta fija ✅
C) Ambos son idénticos; solo cambia el nombre en el portal
D) El chat de grupo solo puede usarse sin herramientas de IA

**Explicación:** El flujo secuencial es predecible y fácil de razonar (bueno para pipelines de varias fases). El de chat de grupo es más dinámico: varios agentes especializados colaboran y el control pasa de uno a otro según el contexto, útil para solicitudes complejas de varios dominios.

---

### Q1302
**En el ejercicio de ContosoPay, ¿qué tipo de nodo se usa para procesar cada ticket del array `Local.SupportTickets` de forma independiente sin duplicar la lógica del flujo de trabajo?**

A) Un nodo If/Else anidado por cada ticket
B) Un nodo `For each`, iterando sobre `Local.SupportTickets` con una variable de valor de bucle (p. ej. `CurrentTicket`) ✅
C) Un nodo `Set variable` que concatena todos los tickets en una sola cadena
D) Múltiples nodos `Invoke Agent`, uno por cada ticket posible

**Explicación:** El nodo `For each` aplica el mismo conjunto de acciones a cada elemento de una colección (aquí, cada ticket de soporte), evitando duplicar nodos para manejar listas de tamaño variable — este es precisamente el propósito de los bucles en un flujo de trabajo.

---

### Q1303
**¿Cuáles son las cuatro categorías principales de nodos en el generador de flujos de trabajo de Foundry?**

A) Invoke, Flujo, Transformación de datos y Chat básico (más el nodo End) ✅
B) Entrada, Procesamiento, Salida y Error
C) Modelo, Herramienta, Memoria y Guardrail
D) Frontend, Backend, Base de datos y API

**Explicación:** Invoke (invocar un agente), Flujo (If/Else, Go to, For Each — controla la ejecución), Transformación de datos (Set variable, Reset variable, Parse value) y Chat básico (enviar mensajes/preguntas al usuario), además del nodo End que marca la conclusión del flujo de trabajo.

---

### Q1304
**Este fragmento aparece en un nodo `If/Else` del ejercicio: `Local.TriageOutputJson.confidence > 0.6`. ¿Qué es cierto sobre `TriageOutputJson`?**

A) Es una variable del sistema que existe automáticamente en todo flujo de trabajo
B) Es una variable local que guarda la salida JSON estructurada de un nodo `Invoke Agent` anterior (configurada en "Save the output json_object as"), y sus propiedades pueden usarse directamente en expresiones de Power Fx ✅
C) Solo puede contener texto libre, nunca JSON estructurado
D) Se genera automáticamente sin necesidad de definir un JSON Schema en el agente

**Explicación:** Cuando el agente Triage se configura con un `response_format` de JSON Schema (`category_response` con `customer_issue`, `category`, `confidence`), su salida estructurada se guarda en la variable local `TriageOutputJson`. Después, expresiones como `Local.TriageOutputJson.confidence > 0.6` o `Local.TriageOutputJson.category = "Billing"` acceden a esas propiedades para tomar decisiones de enrutamiento.

---

### Q1305
**¿Qué formula de Power Fx comprueba si una variable o entrada está vacía?**

A) `Empty(Local.Input)`
B) `IsBlank(Local.Input)` ✅
C) `Null(Local.Input)`
D) `Check.Empty(Local.Input)`

**Explicación:** `IsBlank()` devuelve `true` si la variable/entrada está vacía. Para tablas/colecciones vacías se usa `IsEmpty()` en su lugar (por ejemplo, `IsEmpty(Local.ItemList)`).

---

### Q1306
**¿Qué diferencia hay entre `Sum([10, 20, 30])` y `Sum(Local.ItemList, Amount)` en Power Fx?**

A) Son sintaxis equivalentes; ambas suman una lista simple de números
B) La primera suma directamente una lista simple de números; la segunda suma los valores de la propiedad/columna `Amount` de cada registro dentro de una tabla (`Local.ItemList`) ✅
C) `Sum(Local.ItemList, Amount)` es inválido porque `Sum` no acepta dos argumentos
D) La segunda forma solo funciona dentro de nodos `For each`

**Explicación:** `Sum` admite ambas formas: sumar una lista simple de valores, o sumar una columna/propiedad específica a través de los registros de una tabla — como sumar el campo `Amount` en una lista de tickets o transacciones.

---

### Q1307
**¿Qué hace la fórmula `If(Local.Confidence > 0.8, "Proceed", "Escalate")`?**

A) Siempre devuelve `"Proceed"` sin evaluar la condición
B) Evalúa la condición `Local.Confidence > 0.8`: si es verdadera devuelve `"Proceed"`, si es falsa devuelve `"Escalate"` ✅
C) Lanza un error porque `If` en Power Fx no admite condiciones numéricas
D) Modifica directamente el valor de `Local.Confidence`

**Explicación:** `If(condición, valorSiVerdadero, valorSiFalso)` es la lógica condicional estándar de Power Fx, equivalente a un `if/else` de un lenguaje de programación tradicional, pero expresado como fórmula que se evalúa a un valor.

---

### Q1308
**¿Qué función de Power Fx aplicarías para transformar cada elemento de una lista, por ejemplo poniendo en mayúsculas el nombre de cada registro?**

A) `Upper(Local.ItemList)` directamente sobre toda la lista
B) `ForAll(Local.ItemList, Upper(Name))`, que aplica la fórmula a cada elemento de la lista o tabla ✅
C) `Concatenate(Local.ItemList, "upper")`
D) `Count(Local.ItemList, Upper)`

**Explicación:** `ForAll(tabla, fórmula)` recorre en bucle cada elemento de una lista/tabla aplicando la fórmula indicada — en este caso, `Upper(Name)` sobre cada registro para poner el campo `Name` en mayúsculas.

---

### Q1309
**Al agregar un agente a un flujo de trabajo mediante un nodo `Invoke Agent`, ¿qué opciones son configurables directamente en ese nodo, según el módulo?**

A) Solo el nombre del agente; todo lo demás se hereda del proyecto
B) Herramientas, bases de conocimiento, memoria, límites de protección (guardrails), el formato de salida estructurada (JSON Schema), y en qué variables se guardan el texto y/o el JSON de la respuesta ✅
C) Únicamente el modelo de lenguaje subyacente
D) El editor de nodos no permite ninguna configuración; todo se hace por código

**Explicación:** El editor del nodo `Invoke Agent` permite adaptar el comportamiento del agente al contexto del flujo de trabajo: qué herramientas y bases de conocimiento usa, memoria, guardrails, el esquema de salida estructurada, y dónde se almacenan sus resultados (texto libre y/o JSON) para usarlos en pasos posteriores.

---

### Q1310
**¿Por qué el módulo recomienda diseñar agentes reutilizables (como un único agente de clasificación) en lugar de duplicar la misma lógica de agente en cada flujo de trabajo?**

A) Porque Foundry solo permite crear un agente por proyecto
B) Porque los agentes se pueden reutilizar en varios flujos de trabajo, fomentando un diseño modular donde, por ejemplo, un agente de categorización sirve a muchos flujos mientras distintos agentes de resolución manejan las acciones de seguimiento — esto facilita el mantenimiento y la evolución con el tiempo ✅
C) Porque un agente solo puede invocarse una vez en toda su vida útil
D) Porque los agentes duplicados generan errores de compilación

**Explicación:** La separación de responsabilidades (un agente por tarea especializada, reutilizado donde haga falta) es una práctica de diseño modular explícitamente recomendada, análoga a evitar código duplicado en ingeniería de software tradicional.

---

### Q1311
**TRAMPA: Alguien afirma que como Foundry ofrece un diseñador visual sin código para flujos de trabajo, es imposible invocarlos programáticamente desde una aplicación. ¿Por qué esto es falso?**

A) Es cierto: los flujos de trabajo creados visualmente nunca pueden invocarse desde código
B) Es falso: cualquier flujo de trabajo guardado en el proyecto puede invocarse mediante el SDK de Azure AI Projects, haciendo referencia a su nombre con el mismo patrón `agent_reference` usado para agentes individuales (`extra_body={"agent_reference": {"name": workflow_name, "type": "agent_reference"}}`) ✅
C) Solo se puede invocar desde código si se reescribe el flujo de trabajo completo en Python
D) Requiere una API completamente distinta a la de invocar agentes

**Explicación:** El diseñador visual genera una definición YAML subyacente, pero el flujo de trabajo se invoca desde código exactamente igual que un agente: creando una conversación y llamando a `responses.create(conversation=..., extra_body={"agent_reference": {"name": workflow_name, "type": "agent_reference"}}, input=...)`. La diferencia es solo qué nombre se referencia (el del flujo de trabajo en vez del de un agente individual).

---

### Q1312
**En el patrón de código para invocar un flujo de trabajo con streaming, ¿qué tipo de evento indica que el flujo de trabajo terminó su ejecución y devolvió una respuesta final?**

A) `response.output_item.done`
B) `response.completed` ✅
C) `workflow.finished`
D) `conversation.closed`

**Explicación:** `response.completed` señala que el flujo de trabajo finalizó y produjo una respuesta final (se puede recuperar con `openai_client.responses.retrieve(event.response.id)`). `response.output_item.done` con `event.item.type == ItemType.WORKFLOW_ACTION` señala, en cambio, que un elemento individual de salida (una acción específica del flujo) se completó — útil para mostrar progreso en tiempo real.

---

### Q1313
**TRAMPA: Un desarrollador piensa que las salidas estructuradas (JSON Schema) de un agente dentro de un flujo de trabajo son "opcionales y solo cosméticas" — que igual podría usar únicamente texto libre sin perder funcionalidad. ¿Por qué esto es un error?**

A) Porque Foundry rechaza cualquier agente que no use salida estructurada
B) Porque las salidas estructuradas proporcionan datos predecibles que pueden almacenarse en variables, evaluarse con condiciones (`If/Else`) y usarse para desencadenar pasos posteriores del flujo — sin ellas, la lógica de enrutamiento basada en categoría/confianza no sería fiable de parsear ✅
C) Porque el texto libre siempre es más rápido de procesar que el JSON
D) Porque las salidas estructuradas eliminan la necesidad de nodos If/Else

**Explicación:** Esto corresponde directamente a una pregunta de la evaluación oficial del módulo: las salidas de agente estructuradas "proporcionan datos predecibles que se pueden almacenar en variables, evaluar con condiciones y desencadenar pasos de flujo de trabajo" — no se omiten ni reemplazan la lógica condicional, la habilitan de forma confiable.

---

### Q1314
**¿Qué sucede automáticamente cada vez que se guarda un flujo de trabajo en el portal de Foundry?**

A) Se sobrescribe la versión anterior sin dejar rastro
B) Se crea automáticamente una nueva versión inmutable, permitiendo revisar versiones anteriores, comparar cambios o revertir si una modificación introduce errores ✅
C) El flujo de trabajo se publica automáticamente en producción
D) Todos los agentes referenciados se recrean desde cero

**Explicación:** Foundry aplica control de versiones automático e inmutable a los flujos de trabajo en cada guardado, dando una red de seguridad para revertir cambios problemáticos y facilitando la colaboración (seguimiento de quién cambió qué y por qué).

---

### Q1315
**¿Qué relación existe entre la representación visual (lienzo) y la representación YAML de un flujo de trabajo en Foundry?**

A) Son completamente independientes; cambiar una no afecta a la otra
B) Están sincronizadas: los cambios realizados en el lienzo visual o directamente en el YAML se reflejan en la otra representación, dando flexibilidad para edición avanzada, control de versiones o integración con control de código fuente ✅
C) El YAML es solo de solo lectura y no puede editarse directamente
D) El lienzo visual se genera solo una vez y luego queda obsoleto

**Explicación:** Ambas vistas son representaciones sincronizadas del mismo flujo de trabajo: el lienzo es mejor para razonar conceptualmente y colaborar; el YAML es mejor para configuración avanzada, versionado textual e integración con Git u otros sistemas de control de código fuente.

---

### Q1316
**¿Cuál es la ventaja principal de coordinar varios agentes especializados dentro de un flujo de trabajo, frente a depender de un único agente para resolver toda la tarea?**

A) Un único agente siempre es más rápido y preciso que cualquier flujo de trabajo con varios agentes
B) Las soluciones de agente único suelen tener problemas con tareas complejas o ambiguas; los flujos de trabajo permiten combinar agentes con responsabilidades distintas (clasificación, decisión, resolución) en un proceso cohesivo, logrando automatización más sólida y escalable ✅
C) Los flujos de trabajo con varios agentes nunca pueden pausarse para intervención humana
D) Usar varios agentes elimina por completo la necesidad de nodos de lógica condicional

**Explicación:** El módulo señala explícitamente esta limitación de los agentes únicos como motivación central de los flujos de trabajo: dividir una tarea compleja entre agentes especializados (con orquestación de flujo, condiciones y, si hace falta, intervención humana) produce sistemas más confiables que un solo agente monolítico intentando hacerlo todo.

---

### Q1317
**¿Para qué sirve un patrón `human-in-the-loop` dentro de un flujo de trabajo, y qué debe manejar una aplicación cliente que invoca ese flujo desde código?**

A) Sirve únicamente para fines de registro (logging); el cliente no necesita hacer nada especial
B) Introduce pausas donde el flujo espera aprobación o entrada del usuario antes de continuar; una aplicación cliente debe manejar esas pausas enviando mensajes adicionales a la misma conversación para proporcionar la entrada solicitada y reanudar la ejecución ✅
C) Reemplaza por completo la necesidad de nodos `Invoke Agent`
D) Solo puede usarse en flujos de trabajo de tipo chat de grupo, nunca en secuenciales

**Explicación:** Cuando un flujo de trabajo con pasos human-in-the-loop pausa esperando entrada, el código cliente que lo invoca (usando streaming o no) tiene que detectar esa pausa y enviar un mensaje adicional a la conversación existente con la respuesta del usuario para que el flujo continúe — no basta con una sola llamada inicial a `responses.create`.

---

### Q1318
**Además de aplicaciones web, ¿qué otros escenarios menciona el módulo como beneficiados por invocar flujos de trabajo desde código en vez de solo desde el portal?**

A) Ninguno; los flujos de trabajo solo tienen sentido dentro del portal de Foundry
B) Exposición como API/microservicios REST, procesamiento por lotes, automatización de pruebas dentro de pipelines de CI/CD, e interfaces de usuario personalizadas adaptadas a casos de uso específicos ✅
C) Únicamente la generación de reportes de facturación de Azure
D) Solo se puede invocar desde Power Automate, nunca desde Python

**Explicación:** La tabla de "ventajas de la integración de código" del módulo lista: aplicaciones web, API/microservicios, procesamiento por lotes, pruebas/validación en CI/CD, e interfaces personalizadas — todos casos donde insertar la lógica del flujo de trabajo directamente en software existente aporta valor más allá del portal.

---

### Q1319
**¿Qué error de novato en el examen se comete al asumir que "flujo de trabajo" (workflow) y "agente" (agent) son términos intercambiables en Foundry?**

A) No hay ningún error; son sinónimos exactos en todos los contextos
B) Un agente es un componente de razonamiento individual (modelo + instrucciones + herramientas) que se invoca dentro de un flujo de trabajo mediante un nodo `Invoke Agent`; el flujo de trabajo es la capa de orquestación que coordina uno o varios agentes junto con lógica, variables y, opcionalmente, intervención humana — confundirlos lleva a preguntas de escenario mal interpretadas sobre cuál usar para qué ✅
C) Un flujo de trabajo solo puede contener un agente como máximo
D) Un agente siempre contiene varios flujos de trabajo dentro de sí

**Explicación:** El examen distingue con cuidado entre invocar un agente individual (para una tarea puntual de razonamiento/herramientas) y publicar/invocar un flujo de trabajo (para orquestar varios agentes, condiciones, bucles y posible intervención humana como un proceso completo). Tratar ambos conceptos como sinónimos es una fuente común de respuestas incorrectas en preguntas de escenario que piden elegir el enfoque correcto.

---
