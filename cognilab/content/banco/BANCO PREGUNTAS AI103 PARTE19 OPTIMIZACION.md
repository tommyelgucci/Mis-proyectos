# BANCO DE PREGUNTAS AI-103 — PARTE 19 (Q1600-Q1619)
## Domain 3: Optimización — Prompt Engineering, RAG y Fine-Tuning
### Generado: 2026-08-19 | Fuente: guía "Domain 3 y Domain 4 en profundidad"

---

### Q1600
**¿Cuál es el orden recomendado para probar estrategias de optimización de un modelo, según la "regla de oro" del examen?**

A) Fine-Tuning primero, porque produce el comportamiento más consistente
B) Prompt Engineering primero; solo si no basta, se añade RAG (para datos) o Fine-Tuning (para comportamiento consistente) ✅
C) RAG siempre primero, porque es la única estrategia que reduce alucinaciones
D) Las tres estrategias deben implementarse simultáneamente desde el inicio

**Explicación:** Prompt Engineering cambia CÓMO responde el modelo (bajo costo, rápido); RAG cambia QUÉ sabe (costo medio, requiere infraestructura); Fine-Tuning cambia QUIÉN es (costo alto, lento). Por eso se empieza siempre por la opción más barata y rápida, escalando solo si es necesario.

---

### Q1601
**¿Cuáles son los cuatro componentes de un prompt, según el modelo de mensajes?**

A) Prompt, Completion, Tokens y Embeddings
B) System message (rol/tono/restricciones), Examples (few-shot), Assistant message (historial) y User message (la tarea actual) ✅
C) Header, Body, Footer y Metadata
D) Input, Output, Error y Log

**Explicación:** El system message define el rol y las reglas; los examples (few-shot) dan pares entrada-salida de referencia; el historial de assistant message aporta contexto de turnos previos; y el user message es la pregunta o tarea actual que debe resolverse.

---

### Q1602
**Este es un system prompt del ejercicio:
```python
system_prompt = """
Eres un asistente de atención al cliente de una aerolínea.

ROL: Ayudas a los pasajeros con dudas sobre vuelos, equipaje y check-in.

RESTRICCIONES:
- Nunca prometas compensaciones económicas específicas.
- No discutas tarifas de otras aerolíneas.
- Si no sabes algo, dilo claramente en vez de inventar.

TONO: Cálido, profesional, paciente. Evita jerga técnica de aviación.

ESTRUCTURA: Respuestas de máximo 4 líneas. Termina siempre
preguntando si hay algo más en qué ayudar.
"""

response = client.responses.create(
    model="gpt-4o",
    instructions=system_prompt,
    input="¿Puedo llevar dos maletas de mano?"
)
```
¿Qué cuatro pilares de un system prompt eficaz ilustra la estructura de este texto?**

A) Modelo, Temperatura, Tokens y Latencia
B) Rol, Restricciones, Tono y Estructura ✅
C) Seguridad, Privacidad, Costo y Rendimiento
D) Input, Proceso, Output y Validación

**Explicación:** El texto está organizado explícitamente en cuatro secciones que responden preguntas distintas: ROL (¿quién eres?), RESTRICCIONES (¿qué NO debes hacer?), TONO (¿cómo te comunicas?) y ESTRUCTURA (¿en qué formato respondes?) — los cuatro pilares de un system prompt bien construido.

---

### Q1603
**¿Qué frase exacta se usa para activar de forma confiable el razonamiento Chain-of-Thought en un prompt?**

A) "Explica tu respuesta con detalle"
B) "Take a step-by-step approach" ✅
C) "Piensa antes de responder"
D) "Usa lógica avanzada"

**Explicación:** Chain-of-Thought le pide al modelo "pensar en voz alta" antes de dar la respuesta final, descomponiendo el problema en pasos — mejorando la precisión en problemas de varios pasos (p. ej. cálculos). La frase estándar que el examen asocia con este comportamiento es "Take a step-by-step approach".

---

### Q1604
**Este es un prompt de few-shot learning del ejercicio:
```python
few_shot_prompt = """
Clasifica el sentimiento de reseñas de clientes como Positivo, Negativo o Neutral.

Ejemplo 1:
Reseña: "El producto llegó roto y nadie me responde"
Sentimiento: Negativo

Ejemplo 2:
Reseña: "Todo perfecto, llegó antes de lo esperado"
Sentimiento: Positivo

Ahora clasifica esta:
Reseña: "La entrega tardó pero el producto está bien"
Sentimiento:
"""
```
¿Por qué esta técnica permite generalizar el patrón sin necesidad de Fine-Tuning?**

A) Porque el modelo memoriza permanentemente los ejemplos para futuras conversaciones
B) Porque unos pocos ejemplos bien elegidos (2-10) dentro del propio prompt bastan para que el modelo infiera el patrón de clasificación en esa llamada, sin modificar sus pesos ✅
C) Porque el modelo entrena automáticamente una nueva versión de sí mismo con cada ejemplo
D) Porque los ejemplos se guardan en una base de datos vectorial permanente

**Explicación:** Few-shot learning aprovecha la capacidad del modelo de generalizar patrones a partir del contexto de la propia llamada (in-context learning), sin persistir ningún cambio en los pesos del modelo — a diferencia de Fine-Tuning, que sí modifica el modelo de forma permanente.

---

### Q1605
**TRAMPA: Este código tiene un error conceptual:
```python
response = client.responses.create(
    model="gpt-4o",
    input="Escribe una historia creativa sobre un dragón",
    temperature=0.9,
    top_p=0.7
)
```
¿Cuál es el error, y cómo se corrige?**

A) No hay ningún error; ambos parámetros deben ajustarse juntos para mejor control
B) Se están configurando `temperature` y `top_p` simultáneamente; la regla de oro es ajustar solo uno de los dos, nunca ambos a la vez ✅
C) El error es usar `temperature=0.9`; para creatividad siempre debe ser `top_p=0.9`
D) El error es que falta especificar `max_tokens` junto con `temperature`

**Explicación:** `temperature` controla qué tan "arriesgado" es el modelo al elegir la siguiente palabra; `top_p` controla el tamaño del grupo de palabras candidatas (nucleus sampling). Configurar ambos a la vez hace que sus efectos se combinen de forma impredecible, por lo que la práctica recomendada es ajustar uno solo.

---

### Q1606
**Según la tabla de comparación del módulo, ¿qué representa un valor de `temperature` cercano a 0.0 frente a uno cercano a 1.0 o más?**

A) Cercano a 0.0 = respuestas más largas; cercano a 1.0 = respuestas más cortas
B) Cercano a 0.0 = comportamiento determinístico (casi siempre la misma respuesta); cercano a 1.0+ = más creativo y variado, con más riesgo de incoherencia ✅
C) Cercano a 0.0 = el modelo ignora el prompt; cercano a 1.0 = el modelo sigue el prompt al pie de la letra
D) La temperatura no tiene ningún efecto medible en la salida del modelo

**Explicación:** La temperatura es un control de aleatoriedad en el muestreo de la siguiente palabra: valores bajos hacen al modelo predecible y consistente; valores altos aumentan la variedad y creatividad a costa de mayor riesgo de respuestas incoherentes.

---

### Q1607
**¿Cuáles son los tres pasos del flujo RAG, en el orden correcto?**

A) Indexar → Entrenar → Desplegar
B) Retrieve (buscar contenido relevante) → Augment (combinar con la pregunta del usuario) → Generate (el modelo produce la respuesta anclada en esos datos) ✅
C) Preguntar → Filtrar → Cachear
D) Fragmentar → Incrustar → Comprimir

**Explicación:** RAG conecta la búsqueda de información externa (Retrieve) con la generación del modelo: primero se recuperan los fragmentos relevantes, luego se combinan con el prompt del usuario (Augment), y finalmente el modelo genera una respuesta fundamentada en esos datos (Generate) en vez de depender solo de su conocimiento de entrenamiento.

---

### Q1608
**Este es el pipeline RAG completo del ejercicio:
```python
def rag_query(pregunta_usuario: str) -> str:
    resultados = search_client.search(
        search_text=pregunta_usuario,
        query_type="semantic",
        top=5
    )

    contexto = "\n\n".join([
        f"[Fuente: {r['titulo']}]\n{r['contenido']}"
        for r in resultados
    ])

    system_prompt = f"""
    Responde ÚNICAMENTE basándote en el siguiente contexto.
    Si la respuesta no está en el contexto, dilo honestamente,
    no inventes información.

    CONTEXTO:
    {contexto}
    """

    response = client.responses.create(
        model="gpt-4o",
        instructions=system_prompt,
        input=pregunta_usuario
    )
    return response.output_text
```
¿Por qué el `system_prompt` incluye explícitamente la instrucción de decir "honestamente" cuando la respuesta no está en el contexto, en vez de solo pasar el contexto recuperado?**

A) Es una instrucción decorativa sin efecto real en el comportamiento del modelo
B) Sin esa instrucción explícita, el modelo puede rellenar huecos de información faltante con su conocimiento de entrenamiento (alucinar) en vez de admitir que no tiene el dato en el contexto recuperado ✅
C) Porque `query_type="semantic"` requiere obligatoriamente esa frase exacta para funcionar
D) Porque de lo contrario `search_client.search()` lanzaría una excepción

**Explicación:** Tener contexto recuperado no garantiza por sí solo respuestas fundamentadas: el modelo puede seguir "completando" con su conocimiento general si el prompt no restringe explícitamente esa opción. Instruir "responde ÚNICAMENTE basándote en el contexto" y pedir honestidad ante información faltante es lo que realmente reduce el riesgo de alucinación en un pipeline RAG.

---

### Q1609
**¿Qué mide la Similitud Coseno entre dos embeddings, y qué significa un valor cercano a 1?**

A) Mide la longitud de los textos comparados; cercano a 1 significa textos de la misma longitud
B) Mide qué tan cercanos están dos vectores de significado; cercano a 1 indica textos con significado muy similar, cercano a 0 indica textos sin relación ✅
C) Mide la velocidad de generación de la respuesta; cercano a 1 significa respuesta instantánea
D) Mide el costo en tokens de cada texto; cercano a 1 significa costo idéntico

**Explicación:** Un embedding convierte texto en un vector numérico que representa su significado. La Similitud Coseno compara la dirección de dos vectores: valores cercanos a 1 indican que los textos son semánticamente parecidos (p. ej. "cancelar mi suscripción" y "dar de baja mi membresía"), mientras que valores cercanos a 0 indican textos sin relación.

---

### Q1610
**¿Cuál de las cuatro técnicas de búsqueda de Azure AI Search se recomienda para aplicaciones de Gen AI, y por qué?**

A) Solo Keywords, porque es la más rápida en todos los casos
B) Híbrida (Keywords + Vectorial combinados), porque cubre tanto coincidencias exactas (códigos, nombres) como similitud semántica de conceptos ✅
C) Solo Vectorial, porque Keywords y Semántica están obsoletas
D) Solo Semántica, porque nunca se combina con otras técnicas

**Explicación:** Keywords es ideal para coincidencia exacta (códigos, nombres propios); Semántica comprende la intención de preguntas naturales; Vectorial encuentra similitud conceptual vía embeddings. La búsqueda Híbrida combina Keywords y Vectorial, y es la recomendada para escenarios de Gen AI porque cubre ambos tipos de consulta a la vez.

---

### Q1611
**¿Qué representa la técnica LoRA (Low-Rank Adaptation) frente al Fine-Tuning tradicional?**

A) LoRA modifica absolutamente todos los pesos del modelo base, igual que el Fine-Tuning tradicional
B) LoRA congela los pesos del modelo base y entrena solo una matriz adicional pequeña, logrando el mismo objetivo de ajuste a un costo mucho menor que modificar todos los pesos ✅
C) LoRA elimina por completo la necesidad de un dataset de entrenamiento
D) LoRA solo puede aplicarse a modelos de menos de mil millones de parámetros

**Explicación:** El Fine-Tuning tradicional modifica todos los pesos del modelo base (caro, lento, con riesgo de overfitting). LoRA congela el modelo base y añade una matriz pequeña y entrenable adicional, logrando resultados equivalentes con mucho menor costo computacional.

---

### Q1612
**¿En qué formato se estructura un dataset de entrenamiento para Fine-Tuning, según el ejercicio?**

A) CSV con columnas "pregunta" y "respuesta"
B) JSONL, donde cada línea es un objeto `{"messages": [...]}` con la conversación completa (system, user, assistant) de ese ejemplo ✅
C) XML con etiquetas `<input>` y `<output>`
D) Un único archivo de texto plano sin estructura, separado por saltos de línea dobles

**Explicación:** Cada línea del archivo JSONL representa un ejemplo completo de conversación en el mismo formato de `messages` usado en tiempo de inferencia (roles `system`, `user`, `assistant`), permitiendo que el modelo aprenda el patrón de respuesta deseado ejemplo por ejemplo.

---

### Q1613
**¿Qué SÍ aprende bien el Fine-Tuning, y qué NO debería usarse para lograr, según el módulo?**

A) Aprende bien hechos nuevos y datos que cambian seguido; no debería usarse para tono o personalidad
B) Aprende bien tono/personalidad consistente, formato repetitivo y rechazo consistente de ciertos temas; NO es la herramienta correcta para hechos nuevos o datos que cambian con frecuencia (para eso se usa RAG) ✅
C) Aprende bien exclusivamente sintaxis de código; no puede afectar el tono de las respuestas
D) Fine-Tuning y RAG son intercambiables para cualquier caso de uso

**Explicación:** Fine-Tuning ajusta el comportamiento general del modelo (cómo responde, con qué tono, qué rechaza) de forma consistente y permanente. Para información fáctica que cambia o que es posterior al entrenamiento, la herramienta correcta es RAG, no Fine-Tuning — confundir ambos es un error conceptual común en el examen.

---

### Q1614
**Después de terminar pruebas con un modelo fine-tuned desplegado, ¿por qué es obligatorio hacer cleanup del recurso, según el módulo?**

A) Porque los datos de entrenamiento se pierden automáticamente después de 24 horas
B) Porque un modelo fine-tuned desplegado suele tener costo fijo por hora incluso sin uso activo, así que dejarlo desplegado sin necesidad genera cargos innecesarios ✅
C) Porque Azure elimina automáticamente cualquier recurso sin uso en 1 hora
D) Porque el modelo deja de funcionar correctamente después de la primera semana

**Explicación:** A diferencia de llamadas de inferencia por token a un modelo base, un endpoint de modelo fine-tuned desplegado normalmente factura por tiempo activo, no solo por uso — de ahí la recomendación explícita de eliminar el resource group (`az group delete`) al terminar pruebas o ejercicios.

---

### Q1615
**Un bot debe: (a) tener siempre un tono empático estricto, (b) consultar horarios de citas que cambian a diario, y (c) aplicar instrucciones específicas de cada doctor en la sesión. ¿Qué combinación de estrategias corresponde a cada requisito?**

A) Las tres estrategias son intercambiables entre sí para cualquiera de los tres requisitos
B) (a) Fine-Tuning para el tono empático consistente; (b) RAG para los horarios dinámicos; (c) Prompt Engineering para las instrucciones específicas de sesión ✅
C) Solo Fine-Tuning puede resolver los tres requisitos simultáneamente
D) Solo RAG puede resolver los tres requisitos simultáneamente

**Explicación:** Cada requisito mapea a la estrategia que mejor lo resuelve: comportamiento consistente y permanente (tono) → Fine-Tuning; datos que cambian frecuentemente (horarios) → RAG; instrucciones puntuales de una sesión concreta → Prompt Engineering. Escenarios reales suelen combinar las tres.

---

### Q1616
**Un banco quiere que su asistente responda sobre tasas de interés que cambian semanalmente. ¿Qué `query_type` de Azure AI Search es más apropiado, y qué debe evitar el system prompt?**

A) `query_type="keyword"` únicamente; el system prompt no necesita ninguna instrucción especial
B) `query_type="semantic"` (búsqueda híbrida recomendada para Gen AI); el system prompt debe indicar explícitamente no inventar una tasa si no aparece en el contexto recuperado, para evitar alucinaciones sobre datos financieros ✅
C) No se necesita ningún tipo de búsqueda; basta con el conocimiento de entrenamiento del modelo
D) `query_type="vector"` únicamente, sin ninguna instrucción adicional en el prompt

**Explicación:** Para datos que cambian con frecuencia y requieren precisión fáctica (como tasas de interés), la búsqueda semántica/híbrida encuentra los fragmentos más relevantes, y el system prompt debe forzar explícitamente que el modelo no invente un número si la tasa consultada no aparece en el contexto — crítico en un dominio donde una alucinación tiene consecuencias reales.

---

### Q1617
**¿Cuántos ejemplos se recomienda típicamente incluir en un prompt de few-shot learning para que el modelo generalice bien el patrón?**

A) Exactamente 1, nunca más
B) Entre 2 y 10 ejemplos bien elegidos ✅
C) Al menos 100, de lo contrario el modelo no puede aprender el patrón
D) No importa la cantidad; un solo ejemplo repetido varias veces basta

**Explicación:** El módulo indica que con 2-10 ejemplos bien elegidos y representativos, el modelo generaliza el patrón de la tarea (p. ej. clasificación de sentimiento) directamente desde el contexto del prompt, sin necesidad de Fine-Tuning.

---

### Q1618
**¿Qué diferencia hay entre RAG y Fine-Tuning respecto a la capacidad de responder sobre "información posterior al entrenamiento del modelo"?**

A) Ambas estrategias son igual de efectivas para este caso
B) RAG puede incorporar información nueva o actualizada en tiempo de consulta (recuperándola de una fuente externa); Fine-Tuning no "enseña" hechos nuevos de forma confiable — solo ajusta comportamiento y estilo ✅
C) Solo Fine-Tuning puede incorporar información posterior al entrenamiento
D) Ninguna de las dos estrategias puede manejar información posterior al entrenamiento

**Explicación:** El conocimiento del modelo base queda "congelado" en la fecha de corte de su entrenamiento. RAG resuelve esto en tiempo de consulta, recuperando datos actuales de una fuente externa. Fine-Tuning, en cambio, no es la herramienta adecuada para enseñar hechos nuevos — su fortaleza está en el comportamiento (tono, formato, consistencia), no en la actualidad de los datos.

---

### Q1619
**¿Por qué se dice que Prompt Engineering es la estrategia de "menor costo y más rápida" entre las tres?**

A) Porque no requiere ningún tipo de llamada a la API del modelo
B) Porque solo implica cambiar el texto de las instrucciones enviadas en cada llamada, sin necesidad de infraestructura adicional (como RAG) ni de un proceso de entrenamiento (como Fine-Tuning) ✅
C) Porque Azure la ofrece completamente gratis, a diferencia de RAG y Fine-Tuning
D) Porque Prompt Engineering no puede usarse en producción, solo en pruebas

**Explicación:** Ajustar un prompt es un cambio inmediato y de bajo costo: se prueba y se itera con solo modificar el texto enviado en `instructions`/`input`. RAG requiere mantener una infraestructura de búsqueda (índice, embeddings); Fine-Tuning requiere un dataset, un proceso de entrenamiento y, típicamente, un endpoint desplegado con costo fijo — de ahí que sea la primera opción a probar.

---
