# BANCO DE PREGUNTAS AI-103 — PARTE 16 (Q1400-Q1419)
## Domain 2: Tools — Orquestación multiagente con Microsoft Agent Framework
### Generado: 2026-08-18 | Fuente: módulo "Orquestación de una solución multiagente mediante Microsoft Agent Framework"

---

### Q1400
**¿Cuáles son los cinco patrones de orquestación multiagente que el SDK de Microsoft Agent Framework proporciona directamente?**

A) Simultáneo (concurrent), secuencial, de entrega (handoff), de chat en grupo y magentic ✅
B) Síncrono, asíncrono, por lotes, en tiempo real y programado
C) Cliente-servidor, peer-to-peer, publicador-suscriptor, broadcast y unicast
D) Lineal, en árbol, en malla, en anillo y en estrella

**Explicación:** Los cinco patrones cubiertos son: simultáneo (varios agentes trabajan la misma tarea en paralelo), secuencial (canalización fija, la salida de uno alimenta al siguiente), entrega/handoff (transferencia dinámica de control), chat en grupo (conversación compartida coordinada por un administrador) y magentic (un administrador dedicado planea y delega dinámicamente entre agentes especializados).

---

### Q1401
**¿Cuándo es más apropiado usar la orquestación secuencial en vez de la simultánea?**

A) Cuando las fases pueden ejecutarse de forma totalmente independiente y en paralelo sin afectar la calidad
B) Cuando el flujo de trabajo tiene pasos que deben realizarse en un orden específico y cada paso se basa en la salida del anterior (p. ej. redactar → revisar → pulir contenido) ✅
C) Cuando se necesita explorar simultáneamente varios enfoques distintos para el mismo problema (lluvia de ideas)
D) Cuando el mejor agente para la tarea no se conoce de antemano

**Explicación:** La orquestación secuencial organiza a los agentes en una canalización fija y predecible donde el orden de ejecución se decide de antemano — ideal para refinamiento progresivo paso a paso. Si las fases pudieran ejecutarse en paralelo sin dependencias, la orquestación simultánea sería más eficiente.

---

### Q1402
**TRAMPA: Alguien asume que en la orquestación simultánea (concurrent) siempre es obligatorio combinar las salidas de todos los agentes en una única respuesta final fusionada. ¿Por qué esto es incorrecto?**

A) Porque la orquestación simultánea nunca puede combinar salidas, solo las descarta
B) Porque, aunque normalmente los resultados se combinan para crear una respuesta final, esto no siempre es necesario: cada agente también puede generar su propio resultado independiente, como llamar herramientas para completar tareas o actualizar distintos almacenes de datos por separado ✅
C) Porque combinar salidas requiere obligatoriamente el patrón de chat en grupo, no el simultáneo
D) Porque la orquestación simultánea solo admite exactamente dos agentes

**Explicación:** El módulo aclara explícitamente que combinar los resultados es el caso común (por ejemplo, en lluvia de ideas o votación), pero no un requisito del patrón: los agentes en orquestación simultánea "no comparten resultados entre sí" por diseño y pueden producir efectos secundarios independientes sin que se fusionen sus salidas.

---

### Q1403
**¿En qué escenario del módulo el patrón de orquestación de "entrega" (handoff) es más apropiado que el secuencial?**

A) Cuando el número y el orden de los agentes necesarios se conocen y son fijos de antemano
B) Cuando los requisitos de experiencia surgen dinámicamente durante el procesamiento y el mejor agente para continuar no se conoce por adelantado, como en soporte técnico donde la especialidad necesaria se aclara sobre la marcha ✅
C) Cuando varias operaciones deben ejecutarse exactamente al mismo tiempo
D) Cuando se necesita evitar por completo cualquier forma de enrutamiento condicional

**Explicación:** A diferencia del secuencial (orden fijo, conocido de antemano), la orquestación de entrega transfiere el control dinámicamente según el contexto: es ideal cuando "el mejor agente no se conoce por adelantado o los requisitos de la tarea se vuelven más claros durante el procesamiento".

---

### Q1404
**En la implementación del patrón de entrega (handoff) descrita en el módulo, ¿qué mecanismo se usa para enrutar la tarea al agente adecuado según el resultado de clasificación?**

A) Un único nodo `If/Else` con dos ramas fijas
B) Un grupo perimetral (edge group) `switch-case` que enruta la tarea a distintos agentes según los resultados de clasificación de un agente anterior, siempre incluyendo un caso predeterminado (default) como reserva ✅
C) Una tabla de enrutamiento almacenada manualmente en una base de datos SQL
D) Un segundo modelo de lenguaje que reescribe el código del flujo de trabajo en tiempo real

**Explicación:** La implementación usa `WorkflowBuilder` con un ejecutor de clasificación (con salida estructurada validada por un modelo Pydantic), funciones de fábrica que generan condiciones de comprobación por cada valor de clasificación, y un grupo `switch-case` que sigue el primer caso coincidente — con un caso predeterminado obligatorio para escenarios inesperados.

---

### Q1405
**¿Cuál es el límite práctico de agentes que el módulo recomienda para la orquestación de chat en grupo, y por qué?**

A) No hay límite; se recomienda usar tantos agentes como sea posible
B) Se recomienda limitarse a tres o menos agentes, ya que la administración del flujo de conversación se vuelve demasiado compleja de controlar con más participantes ✅
C) Exactamente un agente, porque el chat en grupo no admite múltiples participantes
D) Diez agentes como mínimo para que el consenso sea estadísticamente válido

**Explicación:** El módulo lista explícitamente, entre los motivos para evitar la orquestación de chat en grupo, que "la administración del flujo de conversación se vuelve demasiado compleja, especialmente con muchos agentes (límite a tres o menos para un control más sencillo)".

---

### Q1406
**Un `GroupChatManager` personalizado sobrescribe estos cuatro métodos:
```python
class MyChatManager(GroupChatManager):
    def should_request_user_input(self, conversation) -> bool: ...
    def should_terminate(self, conversation) -> bool: ...
    def filter_results(self, conversation) -> str: ...
    def select_next_agent(self, conversation) -> str: ...
```
Durante cada ronda de conversación, ¿en qué orden los invoca el administrador de chat en grupo?**

A) `select_next_agent` → `filter_results` → `should_terminate` → `should_request_user_input`
B) `should_request_user_input` → `should_terminate` → `filter_results` → `select_next_agent` ✅
C) `filter_results` → `should_request_user_input` → `select_next_agent` → `should_terminate`
D) Los cuatro métodos se ejecutan simultáneamente sin un orden definido

**Explicación:** El orden exacto es: primero comprobar si se necesita entrada humana (`should_request_user_input`), luego si la conversación debe terminar (`should_terminate`), y si termina se filtran/resumen los resultados (`filter_results`); si continúa, se elige el siguiente agente (`select_next_agent`). Este orden garantiza que las condiciones de entrada del usuario y finalización se evalúen antes de avanzar la conversación.

---

### Q1407
**¿Qué es un bucle "maker-checker" dentro de una orquestación de chat en grupo?**

A) Un mecanismo que ejecuta dos copias idénticas del mismo agente en paralelo para redundancia
B) Un patrón donde un agente (el creador/"maker") propone contenido o soluciones y otro agente (el comprobador/"checker") las revisa y critica, repitiendo el ciclo hasta que el resultado sea satisfactorio ✅
C) Un tipo de borde (edge) exclusivo del patrón secuencial
D) Un mecanismo de autenticación de dos factores para agentes

**Explicación:** El bucle maker-checker es un caso especial de chat en grupo con secuencia basada en turnos administrada por el chat manager: un agente crea, otro revisa y da retroalimentación, y el ciclo continúa hasta lograr un resultado aceptable — útil para flujos de creación y revisión de contenido.

---

### Q1408
**¿Qué caracteriza específicamente a la orquestación magnética (magentic) frente a los demás patrones?**

A) Es el único patrón que no puede usar herramientas de función
B) Usa un administrador magnético dedicado que planea, delega y se adapta dinámicamente entre agentes especializados, manteniendo un "libro de contabilidad de tareas" (task ledger) que registra objetivos, subobjetivos y planes de ejecución a medida que el problema evoluciona ✅
C) Solo puede ejecutarse con exactamente dos agentes participantes
D) Elimina por completo la necesidad de definir instrucciones para cada agente

**Explicación:** A diferencia de patrones con estructura fija (secuencial) o reglas de enrutamiento predefinidas (handoff), magentic está diseñado para problemas complejos y abiertos sin un camino de solución predeterminado: el administrador construye y refina dinámicamente un plan (ledger) mientras coordina qué agente actúa a continuación según el progreso real.

---

### Q1409
**¿Cuándo debería evitarse el patrón de orquestación magnética, según el módulo?**

A) Cuando el problema es complejo e indeterminado, sin un camino de solución predefinido
B) Cuando la ruta de la solución es fija/determinista, la velocidad es prioritaria (magentic prioriza planificación sobre ejecución rápida), o la tarea es lo bastante simple para un patrón más ligero ✅
C) Cuando se necesita generar un plan de enfoque documentado para revisión humana
D) Cuando los agentes tienen herramientas que interactúan con sistemas externos

**Explicación:** Magentic es costoso en tiempo/planificación por diseño — tiene sentido para problemas abiertos y complejos, pero es contraproducente para tareas simples, deterministas o donde la velocidad de ejecución importa más que un plan bien documentado.

---

### Q1410
**En el flujo de trabajo unificado de orquestación descrito por el módulo, ¿cuál es el primer paso, independientemente del patrón elegido?**

A) Iniciar un entorno de ejecución para administrar la ejecución
B) Definir los agentes y describir sus funcionalidades ✅
C) Seleccionar y crear un patrón de orquestación
D) Recuperar resultados de forma asincrónica

**Explicación:** Esta es exactamente una pregunta de la evaluación oficial del módulo: el primer paso del flujo unificado es definir los agentes y sus capacidades; después se selecciona/crea el patrón de orquestación (opcionalmente con un agente administrador), se configuran callbacks, se inicia el entorno de ejecución, se invoca la tarea y finalmente se recuperan los resultados de forma asíncrona.

---

### Q1411
**¿Qué son los "ejecutores" (executors) dentro de un flujo de trabajo de Microsoft Agent Framework?**

A) Solo pueden representar agentes de IA; nunca lógica personalizada
B) Son los trabajadores principales del flujo de trabajo: reciben mensajes de entrada, realizan una acción específica y generan salidas que avanzan el flujo hacia su objetivo — pueden representar tanto agentes de IA como componentes lógicos personalizados ✅
C) Son exclusivamente contenedores de Docker que ejecutan el modelo de lenguaje
D) Solo existen en la orquestación magnética

**Explicación:** Los ejecutores son el bloque de construcción fundamental de cualquier flujo de trabajo del framework, ya sea un agente de IA (p. ej. analizar una solicitud) o un componente de lógica tradicional (p. ej. reservar un vuelo según un resultado previo).

---

### Q1412
**¿Qué tipo de borde (edge) enviaría un único mensaje a varios ejecutores simultáneamente, como verificar vuelos y hoteles al mismo tiempo para una solicitud de viaje?**

A) Conexión directa (direct)
B) Fan-Out ✅
C) Fan-In
D) Switch-Case

**Explicación:** Un borde Fan-Out distribuye un mensaje a múltiples ejecutores en paralelo. El opuesto, Fan-In, combina varios mensajes de distintos ejecutores en uno solo (por ejemplo, compilar los resultados de vuelo y hotel en un itinerario final). Las conexiones directas conectan un ejecutor a otro en secuencia, y switch-case enruta según condiciones predefinidas.

---

### Q1413
**¿Qué evento de Microsoft Agent Framework se dispara cuando el flujo de trabajo produce una salida, y cuál se dispara si ocurre un error durante la ejecución?**

A) `ExecutorInvokeEvent` para salidas; `RequestInfoEvent` para errores
B) `WorkflowOutputEvent` cuando el flujo de trabajo genera una salida; `WorkflowErrorEvent` cuando se encuentra un error ✅
C) `WorkflowStartedEvent` para ambos casos
D) `ExecutorCompleteEvent` para salidas; `WorkflowStartedEvent` para errores

**Explicación:** El framework distingue eventos por tipo: `WorkflowStartedEvent` (inicio), `WorkflowOutputEvent` (salida generada), `WorkflowErrorEvent` (error encontrado), `ExecutorInvokeEvent`/`ExecutorCompleteEvent` (inicio/fin de un ejecutor individual) y `RequestInfoEvent` (se emite una solicitud externa) — todos pensados para observabilidad y depuración del flujo.

---

### Q1414
**Este es el código real del ejercicio de orquestación secuencial:
```python
summarizer_agent = chat_client.as_agent(name="summarizer", instructions=summarizer_instructions)
classifier_agent = chat_client.as_agent(name="classifier", instructions=classifier_instructions)
action_agent = chat_client.as_agent(name="action", instructions=action_instructions)

workflow = SequentialBuilder(
    participants=[summarizer_agent, classifier_agent, action_agent],
    output_from="all",
).build()

result = await workflow.run(f"Customer feedback: {feedback}")
outputs = result.get_outputs()
```
¿Qué garantiza el parámetro `output_from="all"`?**

A) Que solo se ejecute el primer agente de la lista
B) Que se recopilen y devuelvan las salidas de TODOS los agentes participantes, no solo la del último agente de la canalización ✅
C) Que los tres agentes se ejecuten en paralelo en vez de secuencialmente
D) Que el flujo de trabajo se repita automáticamente hasta que el usuario lo detenga

**Explicación:** Sin `output_from="all"`, un flujo secuencial normalmente solo expondría el resultado final. Con este parámetro, `result.get_outputs()` devuelve las contribuciones de cada agente (`summarizer`, `classifier`, `action`) en la canalización, permitiendo mostrar cómo cada uno transformó la entrada paso a paso.

---

### Q1415
**En ese mismo ejercicio, los agentes se crean con `summarizer_agent = chat_client.as_agent(name="summarizer", instructions=summarizer_instructions)`. ¿Qué tienen en común los tres agentes de la canalización (`summarizer`, `classifier`, `action`) en cuanto a cómo se conectan al proveedor de IA?**

A) Cada uno usa un `FoundryChatClient` completamente distinto y separado
B) Los tres se crean a partir del mismo `chat_client` (una única instancia de `FoundryChatClient`) usando su método `as_agent()`, diferenciándose solo por su `name` e `instructions` ✅
C) Solo el primer agente usa el cliente de chat; los otros dos se conectan directamente al modelo sin pasar por él
D) Cada agente requiere su propia suscripción de Azure independiente

**Explicación:** Un único cliente de chat conectado al proyecto de Foundry puede producir múltiples agentes especializados mediante `as_agent()`, cada uno con su propio rol (resumir, clasificar, recomendar acción) — no hace falta una conexión separada por agente.

---

### Q1416
**¿Por qué el módulo argumenta que la orquestación multiagente supera las limitaciones de los sistemas de un solo agente?**

A) Porque un solo agente nunca puede usar herramientas de función
B) Porque los sistemas de agente único suelen estar limitados en alcance por un conjunto fijo de instrucciones/prompt; la orquestación permite asignar aptitudes distintas a cada agente, combinar sus salidas, coordinar pasos dependientes y enrutar dinámicamente el control según contexto o reglas ✅
C) Porque los agentes múltiples siempre son más baratos en tokens que uno solo
D) Porque un solo agente no puede mantener historial de conversación

**Explicación:** El argumento central del módulo es de alcance y especialización: un solo prompt/agente tiene un techo de complejidad manejable; dividir el problema entre agentes especializados (con la coordinación adecuada) permite abordar tareas que serían "demasiado complejas para un solo agente", como el ejemplo de DevOps con 4 agentes especializados (supervisión, análisis de causa raíz, implementación automatizada, informes).

---

### Q1417
**En el ejemplo de DevOps de la introducción del módulo (Agente de supervisión → Agente de análisis de causa raíz → Agente de implementación automatizada → Agente de informes), ¿qué patrón de orquestación describe mejor esa cadena de dependencias?**

A) Simultáneo (concurrent), porque los cuatro agentes trabajan exactamente al mismo tiempo sin depender entre sí
B) Secuencial, ya que cada agente depende explícitamente de la salida del anterior: detectar anomalía → correlacionar causa raíz → implementar corrección → generar informe ✅
C) Chat en grupo, porque los cuatro agentes deben debatir antes de actuar
D) Magentic, porque no hay ningún objetivo claro definido de antemano

**Explicación:** Aunque el módulo no etiqueta explícitamente este ejemplo introductorio con un patrón concreto, la estructura descrita —cada agente consume la salida del anterior en un orden fijo y conocido de antemano— es el caso de uso textbook de la orquestación secuencial, no de los otros cuatro patrones.

---

### Q1418
**¿Qué permite personalizar la extensión de la clase base `GroupChatManager` en una orquestación de chat en grupo?**

A) Solo el color de la interfaz de usuario del chat
B) Cómo se filtran o resumen los resultados de la conversación, cómo se selecciona el siguiente agente, cuándo solicitar entrada del usuario, y cuándo finalizar la conversación ✅
C) Únicamente el número máximo de tokens por respuesta
D) El proveedor de modelo subyacente utilizado por cada agente

**Explicación:** Un administrador de chat en grupo personalizado (heredando de `GroupChatManager`) permite sobrescribir la lógica de sus cuatro métodos clave (`should_request_user_input`, `should_terminate`, `filter_results`, `select_next_agent`), adaptando el comportamiento de la conversación a necesidades específicas del caso de uso.

---

### Q1419
**¿Qué ventaja práctica ofrece que los cinco patrones de orquestación compartan la misma interfaz principal del SDK?**

A) Ninguna en particular; cada patrón requiere reescribir la lógica del agente desde cero
B) Permite experimentar fácilmente con diferentes estrategias de orquestación sin volver a escribir la lógica de los agentes ni aprender nuevas API, ya que el SDK abstrae la complejidad de la comunicación, coordinación y agregación de resultados entre patrones ✅
C) Solo funciona si todos los agentes usan exactamente el mismo modelo de lenguaje
D) Elimina la necesidad de definir instrucciones para cada agente en cualquier patrón

**Explicación:** Esta es una de las conclusiones centrales del módulo: como los patrones (concurrent, sequential, handoff, group chat, magentic) comparten un modelo de desarrollo unificado, cambiar de estrategia de orquestación es principalmente una cuestión de intercambiar el "builder" usado (`SequentialBuilder`, `ConcurrentBuilder`, `GroupChatBuilder`, `MagenticBuilder`, flujo de control para handoff) sin reescribir cómo se definen o instruyen los agentes individuales.

---
