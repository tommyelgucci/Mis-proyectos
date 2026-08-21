# BANCO DE PREGUNTAS AI-103 — PARTE 29 (Q2101-Q2135)
## Domain 1 (real): Plan and Manage an Azure AI Solution — RBAC de Azure, autenticación sin claves con identidades administradas, Azure Cosmos DB como almacén de conversaciones y configuración del entorno de agentes de Microsoft Foundry
### Generado: 2026-08-22 | Fuente: módulo MS Learn "Gestionar infraestructura segura lista para IA"

---

### Q2101
**¿Qué riesgos de seguridad concretos describe el módulo del enfoque tradicional de almacenar una cadena de conexión o clave de acceso en la configuración de la aplicación para que un agente de IA se autentique?**

A) Los desarrolladores confirman accidentalmente secretos en repositorios de control de código fuente, las cadenas de conexión proliferan entre archivos de configuración en varios entornos, y los equipos de operaciones pasan horas rotando credenciales trimestralmente para satisfacer auditorías de cumplimiento ✅
B) Ningún riesgo real; el módulo presenta este enfoque como completamente seguro y recomendado para producción
C) Solo existe el riesgo de que la aplicación se ejecute más lentamente, sin ninguna implicación de seguridad
D) El único riesgo es el costo adicional de almacenamiento de la cadena de conexión, sin relación con exposición de credenciales

**Explicación:** El módulo enumera estos tres riesgos concretos del enfoque tradicional antes de presentar la alternativa de identidades administradas: exposición accidental de secretos en control de código fuente, proliferación de cadenas de conexión entre entornos, y la carga operativa recurrente de rotación trimestral de credenciales.

---

### Q2102
**Según la investigación de seguridad de Microsoft citada en el módulo, ¿qué porcentaje de incidentes de seguridad en la nube implican credenciales en peligro, y cuál es el tiempo medio de detección de esas infracciones?**

A) 5% de los incidentes, con detección instantánea en menos de una hora en todos los casos
B) 60% de los incidentes de seguridad en la nube implican credenciales comprometidas, con un tiempo medio de detección de infracciones de 280 días ✅
C) 100% de los incidentes están relacionados exclusivamente con vulnerabilidades de red, nunca con credenciales
D) 60% de los incidentes, pero con detección inmediata garantizada en menos de 24 horas siempre

**Explicación:** El módulo cita estas cifras exactas para justificar la urgencia de eliminar el almacenamiento de credenciales: 60% de los incidentes de seguridad en la nube involucran credenciales comprometidas, y el tiempo medio hasta que se detecta la infracción es de 280 días — una ventana de exposición considerable.

---

### Q2103
**Al habilitar una identidad administrada asignada por el sistema en un recurso de Azure, ¿cada cuánto rota Azure automáticamente el certificado subyacente, sin ninguna acción del equipo de operaciones?**

A) Cada 7 días, requiriendo supervisión manual constante del equipo de seguridad
B) Nunca; el certificado permanece fijo de por vida una vez generado, sin ningún mecanismo de rotación
C) Cada 46 días, de forma completamente automática y transparente ✅
D) Solo cuando el equipo de operaciones solicita manualmente una rotación a través del portal de Azure

**Explicación:** El módulo especifica esta cifra exacta: al habilitar una identidad administrada asignada por el sistema, Azure aprovisiona la identidad en el inquilino de Entra ID y rota el certificado subyacente automáticamente cada 46 días, sin que el equipo de operaciones tenga que intervenir en absoluto.

---

### Q2104
**Describe el flujo técnico exacto que sigue una aplicación de agente de IA para obtener un token de acceso sin claves mediante Azure Instance Metadata Service (IMDS), según el módulo.**

A) La aplicación envía un correo electrónico automático al administrador de Azure solicitando aprobación manual antes de cada llamada API
B) La aplicación descarga un archivo de certificado permanente desde un servidor FTP interno de la organización
C) IMDS genera una contraseña de un solo uso (OTP) que el usuario debe introducir manualmente en cada solicitud
D) La aplicación realiza una solicitud HTTP GET a `http://169.254.169.254/metadata/identity/oauth2/token` especificando el recurso de destino; IMDS valida que el recurso que llama tiene una identidad administrada habilitada; Entra ID emite un JWT de corta duración (expira en 24 horas); el agente incluye ese token en el encabezado Authorization de las llamadas API subsiguientes ✅

**Explicación:** El módulo detalla este flujo técnico paso a paso: IMDS (un punto de conexión interno disponible para todos los recursos de proceso de Azure, en la dirección `169.254.169.254`) valida la identidad administrada del recurso solicitante, y Entra ID emite un JWT de corta duración (24 horas) que se incluye en las llamadas API posteriores — sin ninguna credencial estática almacenada en ningún lugar.

---

### Q2105
**¿Qué distingue el ciclo de vida de una identidad administrada asignada por el sistema frente a una asignada por el usuario, y cuál es la opción predeterminada según la telemetría de Microsoft citada en el módulo?**

A) La asignada por el sistema tiene su ciclo de vida vinculado a un único recurso (se elimina automáticamente al eliminar ese recurso) y es la opción predeterminada para 85% de las implementaciones de Azure; la asignada por el usuario existe como recurso independiente reutilizable en varios servicios ✅
B) Ambos tipos tienen exactamente el mismo ciclo de vida, sin ninguna diferencia práctica entre ellos
C) La asignada por el usuario siempre se elimina automáticamente al eliminar el recurso que la usa, igual que la del sistema
D) La opción predeterminada según la telemetría de Microsoft es la identidad asignada por el usuario, usada en 85% de las implementaciones

**Explicación:** El módulo presenta esta distinción y cifra exactas: la identidad asignada por el sistema está acoplada al ciclo de vida de un único recurso (simplificando la administración cuando una app necesita acceso a recursos específicos) y es la opción predeterminada en 85% de las implementaciones de Azure, mientras que la asignada por el usuario es un recurso independiente reutilizable en múltiples servicios de proceso.

---

### Q2106
**En el ejemplo del módulo, una plataforma de IA tiene cinco espacios de trabajo de aprendizaje automático (o una plataforma de microservicios con diez API distintas) que necesitan acceso idéntico a una cuenta central de Cosmos DB. ¿Qué tipo de identidad administrada se ajusta mejor a este escenario?**

A) Es necesario crear una identidad administrada asignada por el sistema distinta para cada uno de los servicios, sin ninguna forma de compartir permisos
B) Una identidad administrada asignada por el usuario, creada una vez, con los permisos necesarios concedidos una sola vez, y luego asignada a los múltiples servicios que la comparten — adaptándose a arquitecturas complejas donde varios servicios comparten el mismo conjunto de permisos ✅
C) Ninguna identidad administrada puede compartirse entre múltiples recursos bajo ninguna circunstancia
D) Se debe usar una única cuenta de usuario humana compartida entre todos los servicios automatizados

**Explicación:** El módulo presenta exactamente este escenario como el caso de uso ideal para identidades asignadas por el usuario: en vez de duplicar la configuración de acceso en cada uno de los servicios, se crea y configura la identidad una sola vez y se reutiliza, simplificando drásticamente la administración de permisos en arquitecturas de microservicios o plataformas con múltiples cargas de trabajo idénticas.

---

### Q2107
**¿Cuánto tiempo tarda típicamente la rotación tradicional de una cadena de conexión por entorno (coordinando actualizaciones entre archivos de configuración, reiniciando servicios y comprobando conectividad), y qué reducción de sobrecarga administrativa reportan los equipos de operaciones al usar identidades administradas en su lugar?**

A) La rotación tradicional tarda solo unos segundos, sin ninguna diferencia práctica frente a las identidades administradas
B) La rotación tradicional nunca introduce ningún riesgo de interrupción del servicio, según el módulo
C) La rotación tradicional tarda entre 3 y 4 horas por entorno; las identidades administradas reducen la sobrecarga de administración de credenciales en 90% ✅
D) Las identidades administradas aumentan la sobrecarga administrativa en 90% frente a la rotación manual tradicional

**Explicación:** El módulo cita estas cifras exactas: la rotación tradicional de cadenas de conexión tarda entre 3 y 4 horas por entorno e introduce riesgo de interrupción del servicio, mientras que con identidades administradas Azure controla la rotación de forma transparente, reduciendo la sobrecarga de administración de credenciales en un 90% y eliminando el vector de ataque más común para las infracciones de datos en la nube.

---

### Q2108
**¿Por qué son inadecuadas las bases de datos relacionales tradicionales para el almacén de historial de conversaciones de un agente de IA, según los desafíos que describe el módulo?**

A) Las bases de datos relacionales son siempre más rápidas y baratas que Cosmos DB para cualquier caso de uso, sin ninguna desventaja real
B) Las bases de datos relacionales no admiten ningún tipo de autenticación mediante identidades administradas
C) No existe ninguna diferencia funcional relevante entre bases de datos relacionales y Cosmos DB para este caso de uso
D) Tienen problemas con los patrones de consulta imprevisibles y los requisitos de distribución global de las cargas de trabajo de IA: sesiones que aumentan en distintas zonas horarias, expectativa de acceso instantáneo desde cualquier dispositivo, y requisitos de expiración automática de datos tras 90 días ✅

**Explicación:** El módulo enumera estos desafíos específicos de las cargas de trabajo de IA que las bases de datos relacionales tradicionales manejan mal: patrones de consulta impredecibles, picos de sesiones distribuidos globalmente por zona horaria, expectativas de acceso instantáneo, y requisitos normativos de expiración automática — todos ellos abordados de forma nativa por Cosmos DB.

---

### Q2109
**Según la investigación de usuarios de Contoso citada en el módulo, ¿qué impacto tiene un retraso de consulta de base de datos de 500 ms en la interfaz de chat del agente de IA?**

A) Se traduce directamente en un retraso notable en la interfaz de chat, degradando la experiencia del usuario y reduciendo las tasas de finalización de tareas en 25% ✅
B) Ningún impacto medible; los usuarios no perciben ninguna diferencia con retrasos de hasta varios segundos
C) Mejora la experiencia del usuario, ya que perciben el retraso como una señal de que el agente está "pensando" cuidadosamente
D) Solo afecta a usuarios con conexiones de red inferiores a 1 Mbps, sin impacto en el resto

**Explicación:** El módulo cita esta cifra exacta de la investigación de Contoso: un retraso de consulta de 500 ms se traduce en un retraso notable y perceptible en la interfaz de chat, lo que degrada la experiencia del usuario y reduce las tasas de finalización de tareas en un 25% — de ahí la importancia crítica del rendimiento de baja latencia de Cosmos DB para este caso de uso.

---

### Q2110
**¿Qué estructura de documento recomienda el módulo para el almacén de conversaciones en Cosmos DB, y qué campos contiene cada documento?**

A) Toda la conversación completa de un usuario, sin importar su duración, debe almacenarse como un único documento monolítico
B) Cada turno de conversación (mensaje de usuario más respuesta del agente) existe como un documento independiente que contiene `userId`, `sessionId`, `timestamp`, `userMessage`, `agentResponse`, y metadatos opcionales como puntuaciones de opinión o clasificaciones ✅
C) Cada palabra individual del mensaje del usuario se almacena como un documento separado en Cosmos DB
D) Los documentos no deben contener ningún campo relacionado con el usuario, por motivos de anonimización obligatoria

**Explicación:** El módulo describe este patrón de documento basado en el análisis del patrón de acceso del agente (la mayoría de solicitudes capturan todos los mensajes de una sesión activa de un usuario específico): un documento por turno de conversación, con los campos exactos userId, sessionId, timestamp, userMessage, agentResponse y metadatos opcionales.

---

### Q2111
**¿Por qué recomienda el módulo usar `userId` como clave de partición en el almacén de conversaciones de Cosmos DB, y en qué escenario funciona especialmente bien este enfoque?**

A) No existe ninguna ventaja de rendimiento al usar userId como clave de partición frente a cualquier otro campo
B) El módulo recomienda usar timestamp como única clave de partición válida, nunca userId
C) Garantiza que todas las conversaciones de un solo usuario residan en la misma partición física, permitiendo la recuperación eficaz del historial sin consultas entre particiones; funciona bien con millones de usuarios con actividad relativamente equilibrada, evitando que una única partición se convierta en un punto de acceso frecuente ✅
D) userId como clave de partición solo funciona correctamente si la aplicación tiene menos de 100 usuarios en total

**Explicación:** El módulo justifica esta elección de diseño explícitamente: al usar userId, todas las conversaciones de un usuario quedan en la misma partición física, eliminando la necesidad de consultas entre particiones para recuperar el historial — y este patrón se beneficia especialmente de una base de millones de usuarios con actividad equilibrada, evitando puntos de acceso ("hot partitions") que degradarían el rendimiento para todos.

---

### Q2112
**¿Qué beneficio de rendimiento y costo proporciona crear índices compuestos en `userId` y `timestamp` para el almacén de conversaciones, frente a la indexación predeterminada de Cosmos DB?**

A) No proporciona ninguna ventaja medible frente a la indexación predeterminada de todas las propiedades
B) Aumenta tanto la latencia de las consultas como los costos de almacenamiento frente a la indexación predeterminada
C) Solo reduce costos de almacenamiento, sin ningún impacto en la latencia de las consultas
D) Reduce la latencia de las consultas en 60% y reduce los costos de almacenamiento en 30%, permitiendo consultas de rango eficaces como "recuperar todos los mensajes del usuario Alice desde las últimas 24 horas" ✅

**Explicación:** El módulo cita ambas cifras exactas: la indexación dirigida mediante índices compuestos en combinaciones de campos consultadas con frecuencia (userId + timestamp) reduce la latencia de consultas en 60% y los costos de almacenamiento en 30% frente a indexar automáticamente todas las propiedades del documento (el comportamiento predeterminado, que garantiza rapidez de consulta pero a costa de mayor latencia de escritura y almacenamiento).

---

### Q2113
**De los cinco niveles de coherencia que ofrece Cosmos DB (de Fuerte a Eventual), ¿cuál recomienda el módulo específicamente para el almacén de conversaciones de un agente de IA, y qué reducción de latencia proporciona frente a la consistencia Fuerte?**

A) La coherencia de sesión, que garantiza que un usuario siempre vea inmediatamente sus propias escrituras sin requerir sincronización global para las conversaciones de otros usuarios; reduce la latencia de lectura en 40% frente a la consistencia Fuerte ✅
B) La coherencia Eventual es la única recomendada, ya que no importa si el usuario ve sus propios mensajes de inmediato o no
C) La consistencia Fuerte es siempre la única opción válida para cualquier almacén de conversaciones de IA
D) El módulo no recomienda ningún nivel de coherencia específico; todos son intercambiables sin ninguna diferencia práctica

**Explicación:** El módulo justifica esta elección explícitamente: la coherencia de sesión proporciona "el equilibrio óptimo" al garantizar coherencia de lectura de las propias escrituras (el usuario ve su mensaje de inmediato en su historial) sin el costo de sincronización global que exige la consistencia Fuerte, reduciendo la latencia de lectura en un 40% mientras mantiene el comportamiento intuitivo que esperan los usuarios.

---

### Q2114
**¿Cómo funciona la característica de período de vida (TTL) de Cosmos DB para cumplir el requisito normativo de expirar conversaciones tras 90 días, y qué evita necesitar?**

A) Requiere que un desarrollador ejecute manualmente un script de eliminación cada 90 días exactos
B) Expira y elimina automáticamente los documentos después de la duración especificada, en función de la propiedad de marca de tiempo `_ts`, durante los ciclos de mantenimiento en segundo plano — evitando la necesidad de trabajos de eliminación por lotes o procedimientos almacenados personalizados ✅
C) TTL solo funciona si se combina obligatoriamente con un procedimiento almacenado personalizado escrito por el equipo de desarrollo
D) Cosmos DB no ofrece ninguna funcionalidad nativa de expiración automática de datos; siempre requiere trabajos por lotes externos

**Explicación:** El módulo describe TTL como una característica nativa que automatiza completamente la expiración de datos: configurando un TTL de 90 días a nivel de contenedor, Cosmos DB marca y elimina los documentos expirados según su propiedad `_ts` durante el mantenimiento en segundo plano, sin necesidad de trabajos de eliminación por lotes ni procedimientos almacenados que el equipo tendría que mantener manualmente.

---

### Q2115
**En el modelo de facturación de Cosmos DB por unidades de solicitud por segundo (RU/s), ¿cuántas RU consume aproximadamente cada operación de lectura, y cuántas consume una operación de escritura según su tamaño?**

A) Tanto lecturas como escrituras consumen exactamente el mismo número de RU (una RU) sin ninguna variación por tipo de operación
B) Las lecturas siempre consumen más RU que las escrituras, en una proporción de 10 a 1
C) Cada lectura consume aproximadamente una RU, y cada escritura consume entre 5 y 10 RU en función del tamaño del documento ✅
D) El modelo de RU/s de Cosmos DB no distingue entre operaciones de lectura y escritura; todo se factura por almacenamiento total en GB

**Explicación:** El módulo especifica este costo relativo exacto: una operación de lectura consume aproximadamente 1 RU, mientras que una escritura consume entre 5 y 10 RU dependiendo del tamaño del documento — una asimetría importante a tener en cuenta al dimensionar el rendimiento aprovisionado del contenedor.

---

### Q2116
**Con el rendimiento de escalado automático configurado en un rango de 400 a 4000 RU/s, ¿qué ocurre durante las horas de la noche cuando el volumen de conversación cae en un 80%, y qué reducción de costos reporta el módulo frente al aprovisionamiento estático?**

A) El escalado automático no tiene ningún efecto durante las horas de menor volumen; el rendimiento permanece fijo en el máximo del rango en todo momento
B) Cosmos DB detiene por completo el servicio durante la noche cuando el volumen cae, reanudándolo automáticamente por la mañana
C) El aprovisionamiento estático siempre resulta más económico que el escalado automático, según cifras del módulo
D) El escalado automático reduce el rendimiento aprovisionado al mínimo del rango configurado, reduciendo los costos en 70% frente al aprovisionamiento estático, mientras mantiene el rendimiento necesario durante las horas punta ✅

**Explicación:** El módulo cita esta cifra exacta: durante las horas de menor demanda (caída del 80% en volumen de conversación), el escalado automático reduce dinámicamente el rendimiento aprovisionado hacia el mínimo del rango configurado, generando una reducción de costos del 70% frente a mantener un aprovisionamiento estático fijo, sin sacrificar rendimiento durante los picos de uso diurnos.

---

### Q2117
**¿Qué diferencia hay entre una implementación de Microsoft Foundry "basada en centros" (hub-based) y una "basada en recursos" (resource-based), según el ejercicio del módulo?**

A) Un centro (hub) es una construcción de nivel superior que organiza y administra varios recursos de Foundry, típica de configuraciones empresariales con gobernanza compartida entre entornos; una configuración basada en recursos se centra en administrar proyectos dentro de un único recurso de Foundry, donde gobernanza, redes e identidad se comparten entre esos proyectos ✅
B) Son términos exactamente sinónimos que describen la misma arquitectura sin ninguna diferencia técnica
C) Una implementación basada en recursos nunca puede alojar más de un proyecto simultáneamente
D) Una implementación basada en centros no admite ningún tipo de autenticación mediante Microsoft Entra ID

**Explicación:** El ejercicio del módulo distingue estos dos modelos de implementación de Foundry: el patrón basado en centros se usa típicamente a escala empresarial (múltiples regiones, gobernanza compartida entre entornos diversos), mientras que el basado en recursos administra proyectos como hijos de un único recurso de Foundry que comparten configuración de gobernanza, red e identidad por defecto.

---

### Q2118
**¿Qué diferencia hay entre una conexión de "nivel de recurso" y una conexión de "nivel de proyecto" dentro de Microsoft Foundry, según el ejercicio del módulo?**

A) Ambos tipos de conexión son exactamente idénticos en alcance y comportamiento
B) Una conexión de nivel de recurso creada en el recurso de Foundry se comparte automáticamente con todos sus proyectos; una conexión de nivel de proyecto se limita a un único proyecto específico, preservando datos y aislamiento operativo cuando sea necesario ✅
C) Una conexión de nivel de proyecto siempre se comparte automáticamente con todos los demás proyectos del mismo recurso
D) Las conexiones de nivel de recurso solo pueden usarse para conectarse a Azure Key Vault, nunca a Azure Storage

**Explicación:** El ejercicio del módulo describe este contraste directamente: las conexiones a nivel de recurso están disponibles para todos los proyectos alojados en ese recurso de Foundry (útil para artefactos comunes compartidos), mientras que las conexiones a nivel de proyecto quedan aisladas a un único proyecto, apropiadas para conjuntos de datos o salidas privados que no deben ser visibles a otros equipos.

---

### Q2119
**¿Qué tres métodos de autenticación con Microsoft Entra ID se pueden usar para conceder acceso a través de una conexión de Foundry, según el ejercicio del módulo, y qué elimina este enfoque frente a las claves almacenadas?**

A) Solo se admite un único método de autenticación (contraseña de administrador) sin ninguna alternativa posible
B) Los tres métodos requieren obligatoriamente almacenar una clave de API adicional como respaldo, incluso al usar identidades administradas
C) Identidades de usuario, identidades administradas o entidades de servicio, con permisos aplicados mediante RBAC de Azure — eliminando por completo la necesidad de claves almacenadas o credenciales estáticas ✅
D) Las conexiones de Foundry no admiten en absoluto la autenticación mediante Microsoft Entra ID

**Explicación:** El ejercicio del módulo especifica estos tres métodos equivalentes bajo el paraguas de autenticación de Microsoft Entra ID (identidades de usuario para desarrollo interactivo, identidades administradas para automatización, entidades de servicio para casos específicos), todos con permisos aplicados vía RBAC de Azure, eliminando la necesidad de claves almacenadas o credenciales estáticas en cualquiera de los tres casos.

---

### Q2120
**Dentro de un mismo proyecto de Foundry, ¿comparten los agentes acceso al almacenamiento de archivos, historial de conversaciones e índices de búsqueda? ¿Y pueden acceder a recursos de otros proyectos?**

A) No, cada agente dentro de un proyecto tiene su propio almacenamiento completamente aislado de los demás agentes del mismo proyecto
B) Sí, y además los agentes pueden acceder libremente a los recursos de cualquier otro proyecto del mismo recurso de Foundry sin ninguna restricción
C) Los agentes nunca comparten ningún tipo de recurso entre sí, ni siquiera dentro del mismo proyecto
D) Sí, los agentes del mismo proyecto comparten acceso al almacenamiento de archivos, historial de conversaciones e índices de búsqueda; los datos están aislados entre proyectos y los agentes NO pueden acceder a recursos fuera de su propio proyecto — los proyectos son la unidad de compartición y aislamiento dentro de Foundry ✅

**Explicación:** El módulo establece esta regla de aislamiento con precisión: dentro de un proyecto, los agentes SÍ comparten recursos (almacenamiento, historial, índices), pero los datos están completamente aislados ENTRE proyectos distintos, y ningún agente puede acceder a recursos fuera de su propio proyecto — el proyecto es la unidad fundamental de compartición y aislamiento.

---

### Q2121
**¿Cuáles son los tres modos de configuración de entorno de agente que admite Foundry Agent Service, y qué usa específicamente la configuración Básica para el estado del agente?**

A) Básica (almacenamiento administrado por la plataforma, compatible con Asistentes de OpenAI y con soporte agregado para modelos no OpenAI como Azure AI Search y Bing), Estándar (recursos de Azure propiedad del cliente) y Estándar con aislamiento de red (red virtual administrada por el cliente) ✅
B) Solo existe un único modo de configuración disponible; no hay ninguna variación posible en Foundry Agent Service
C) Desarrollo, Ensayo y Producción — estos son entornos de despliegue genéricos, no modos de configuración de agentes descritos en el módulo
D) La configuración Básica usa exclusivamente recursos de Azure propiedad del cliente, igual que la configuración Estándar

**Explicación:** El módulo detalla estos tres modos con sus características distintivas: Básica prioriza la incorporación rápida con almacenamiento gestionado por la plataforma (compatible con Asistentes de OpenAI, más soporte agregado para Azure AI Search/Bing), Estándar usa recursos propios del cliente para propiedad y control total, y Estándar con aislamiento de red añade que todo el entorno opere dentro de una VNet administrada por el cliente.

---

### Q2122
**En la configuración Estándar del entorno de agente, ¿qué recurso específico de Azure almacena el historial de conversaciones, los mensajes del sistema y los metadatos del agente, y qué rendimiento mínimo debe admitir?**

A) Azure Blob Storage, sin ningún requisito mínimo de rendimiento especificado
B) Azure Cosmos DB para NoSQL, que debe admitir un rendimiento total mínimo de 3000 RU/s (en modo aprovisionado o sin servidor) ✅
C) Azure SQL Database, con un requisito mínimo de 10 000 RU/s
D) El módulo no especifica ningún recurso concreto para el historial de conversaciones en la configuración Estándar

**Explicación:** El módulo especifica este requisito técnico exacto: en la configuración Estándar, Azure Cosmos DB para NoSQL almacena el historial de conversaciones, mensajes del sistema y metadatos del agente, y debe admitir un rendimiento total mínimo de 3000 RU/s, ya sea en modo de rendimiento aprovisionado o en modo sin servidor.

---

### Q2123
**¿Qué son los "hosts de capacidad" (capability hosts) en Microsoft Foundry, qué definen a nivel de cuenta frente a nivel de proyecto, y qué característica clave tienen una vez creados?**

A) Son servidores físicos dedicados con capacidad de proceso fija, que deben adquirirse por separado para cada proyecto
B) Son totalmente mutables y pueden reconfigurarse en cualquier momento sin ninguna restricción ni necesidad de reaprovisionamiento
C) Son construcciones de configuración que describen cómo operan los agentes y dónde se almacena su estado; a nivel de cuenta, designan que la cuenta usa la funcionalidad Agentes; a nivel de proyecto, definen si se usa almacenamiento multiinquilino de la plataforma o recursos propiedad del cliente; son INMUTABLES una vez creados — cambiarlos requiere eliminar y volver a aprovisionar el host ✅
D) Solo existen a nivel de proyecto; no hay ningún concepto de host de capacidad a nivel de cuenta

**Explicación:** El módulo define los hosts de capacidad exactamente así: a nivel de cuenta habilitan la funcionalidad de Agentes, y a nivel de proyecto vinculan el proyecto con su modelo de almacenamiento de estado (plataforma vs. propiedad del cliente). Su inmutabilidad tras la creación es una característica de diseño explícita — cualquier cambio en el modelo de almacenamiento o asociaciones de recursos exige eliminar y volver a aprovisionar el host desde cero.

---

### Q2124
**¿Está disponible el aprovisionamiento de entornos de agente Estándar directamente desde el portal de Microsoft Foundry? ¿Cómo se implementan en su lugar, según el ejercicio del módulo?**

A) Sí, es la única forma de aprovisionarlos; el portal ofrece un asistente visual completo exclusivamente para configuraciones Estándar
B) Solo puede aprovisionarse manualmente escribiendo cada recurso individual sin ninguna plantilla o automatización disponible
C) El aprovisionamiento Estándar fue descontinuado por Microsoft y ya no existe ningún método para implementarlo
D) No — no está disponible directamente desde el portal; se implementan mediante programación o a través de plantillas de implementación (Azure Resource Manager y Bicep del repositorio foundry-samples de GitHub), que crean automáticamente la cuenta, el proyecto, implementan un modelo y configuran la autenticación mediante identidad administrada ✅

**Explicación:** El ejercicio del módulo aclara esta limitación explícitamente: a diferencia de la configuración Básica, la Estándar no se puede aprovisionar directamente desde el portal — requiere programación o plantillas de implementación (ARM/Bicep) que automatizan la creación de cuenta, proyecto, implementación del modelo y configuración de autenticación mediante identidad administrada, con opción de aprovisionar recursos automáticamente o referenciar recursos preexistentes.

---

### Q2125
**TRAMPA: Un ingeniero de plataforma asume que, dado que los recursos preaprovisionados (Storage, AI Search, Cosmos DB) pueden referenciarse mediante parámetros de plantilla al implementar un entorno de agente Estándar, se puede cambiar libremente esa asociación de recursos después del aprovisionamiento inicial sin ningún impacto. ¿Es correcta esta suposición según el módulo?**

A) No es correcta: aunque se puede elegir referenciar recursos preaprovisionados o aprovisionarlos automáticamente durante el despliegue inicial, el host de capacidad que vincula el proyecto a esos recursos es INMUTABLE una vez creado — cambiar la asociación requiere eliminar y volver a aprovisionar el host de capacidad, no simplemente "reconfigurarlo" ✅
B) Sí, las asociaciones de recursos son completamente mutables en cualquier momento sin ninguna restricción, incluso después de crear el host de capacidad
C) No, porque los recursos preaprovisionados nunca pueden referenciarse mediante parámetros de plantilla bajo ninguna circunstancia
D) Es parcialmente correcta solo para Azure Cosmos DB, pero no para Azure Storage ni Azure AI Search

**Explicación:** Esta pregunta distingue dos momentos distintos del ciclo de vida: la flexibilidad de elegir QUÉ recursos referenciar existe únicamente durante el despliegue inicial (vía parámetros de plantilla); una vez creado el host de capacidad que fija esa asociación, el módulo es explícito en que es inmutable — cualquier cambio posterior en el modelo de almacenamiento requiere eliminación y reaprovisionamiento completo, no una simple actualización de configuración.

---

### Q2126
**Según la evaluación oficial del módulo: un agente de IA hospedado en Azure App Service debe escribir registros de conversación en Cosmos DB y recuperar claves de API de Azure Key Vault para integración con servicios que no son de Microsoft; el equipo de seguridad requiere acceso con privilegios mínimos y prohíbe almacenar credenciales en la configuración de la aplicación. ¿Qué asignaciones de roles se deben configurar para la identidad administrada asignada por el sistema de App Service?**

A) Asignar el rol de Colaborador en el nivel del grupo de recursos para conceder acceso a todos los servicios, incluidos Cosmos DB y Key Vault, con plenos permisos de administración
B) Asignar el rol de Colaborador de Datos de Cosmos DB en la cuenta de Cosmos DB y el rol de Usuario de Secretos de Key Vault en el Key Vault, para conceder acceso a datos específicos sin permisos de administración ✅
C) Asignar el rol Lector en el nivel de suscripción para permitir que el agente vea las configuraciones de recursos y, a continuación, proporcionar manualmente cadenas de conexión para las operaciones de escritura
D) No es necesaria ninguna asignación de rol si la identidad administrada ya está habilitada; el acceso se concede automáticamente a todos los recursos de la suscripción

**Explicación:** Esta es la respuesta oficial de la evaluación del módulo. El rol Colaborador a nivel de grupo de recursos viola el privilegio mínimo (acceso administrativo excesivo); el rol Lector a nivel de suscripción combinado con cadenas de conexión manuales contradice directamente el requisito de "sin credenciales almacenadas". La combinación correcta concede exactamente los permisos de datos específicos necesarios (Colaborador de Datos de Cosmos DB + Usuario de Secretos de Key Vault) sin ningún permiso de administración adicional.

---

### Q2127
**Según la evaluación oficial del módulo: Contoso implementa una arquitectura de microservicios con cinco funciones distintas de Azure Functions que requieren permisos de acceso idénticos a una cuenta compartida de Cosmos DB para leer perfiles de usuario y escribir eventos de análisis; el equipo de operaciones quiere minimizar la sobrecarga administrativa de identidades y roles en desarrollo, ensayo y producción. ¿Qué enfoque de identidad administrada se debe implementar?**

A) Habilitar identidades administradas asignadas por el sistema en las cinco instancias de Azure Functions y asignar el rol Colaborador de datos de Cosmos DB a cada identidad por separado en la cuenta de Cosmos DB
B) Usar identidades administradas asignadas por el sistema, pero crear un grupo de identificadores de Microsoft Entra personalizado que contenga las cinco identidades y, a continuación, asignar el rol Colaborador de datos de Cosmos DB al grupo para simplificar la administración
C) Crear una sola identidad administrada asignada por el usuario, asignarla a las cinco instancias de Azure Functions, y conceder un rol Colaborador de datos de Cosmos DB una única vez a esta identidad compartida ✅
D) Crear cinco identidades administradas asignadas por el usuario independientes, una por cada función, cada una con su propia asignación de rol individual

**Explicación:** Esta es la respuesta oficial de la evaluación del módulo. Cinco identidades del sistema (o cinco identidades del usuario) por separado multiplican la sobrecarga administrativa que se quiere minimizar; los grupos de Entra ID no pueden usarse directamente como identidad administrada asignada a un recurso de proceso. La solución correcta aprovecha exactamente la ventaja de las identidades asignadas por el usuario: una única identidad reutilizable, con una única asignación de rol, compartida entre los cinco servicios.

---

### Q2128
**Según la evaluación oficial del módulo: un agente de IA almacena documentos de conversación en Cosmos DB con 200 000 usuarios activos que generan un promedio de 50 mensajes por usuario al mes; las consultas de análisis recuperan con frecuencia "todas las conversaciones de un usuario específico de los últimos 30 días"; actualmente la base de datos experimenta 30% de errores de limitación (throttling) durante horas punta y los costos de almacenamiento superan el presupuesto en 40%. ¿Qué cambios de configuración optimizarían tanto el rendimiento como el costo?**

A) Mantener la clave de partición actual, pero aumentar el rendimiento aprovisionado de 4000 RU/s a 15 000 RU/s permanentemente; implementar procedimientos almacenados para eliminar por lotes conversaciones anteriores a 60 días semanalmente
B) Implementar un índice compuesto en los campos userId y timestamp; cambiar el nivel de coherencia de Fuerte a Sesión; configurar el rendimiento de escalado automático de 1000 a 5000 RU/s
C) Migrar completamente de Cosmos DB a una base de datos relacional tradicional para resolver los problemas de limitación y costo
D) Cambiar la clave de partición de sessionId a userId e implementar el TTL a nivel de contenedor de 90 días para expirar automáticamente las conversaciones antiguas; configurar el escalado automático de rendimiento de 400 a 10 000 RU/s ✅

**Explicación:** Esta es la respuesta oficial de la evaluación del módulo. Aumentar el rendimiento estático sin corregir la clave de partición no resuelve el problema de fondo (los throttling errors probablemente vienen de una clave de partición mal elegida, como sessionId, que no agrupa eficientemente las consultas por usuario); el índice compuesto y el cambio de coherencia (opción B) son mejoras válidas pero no corrigen la causa raíz del throttling si la clave de partición sigue siendo incorrecta. La respuesta correcta ataca la causa raíz: cambiar la clave de partición a userId (que coincide con el patrón de consulta real "todas las conversaciones de un usuario"), añadir TTL para controlar el crecimiento de almacenamiento, y usar escalado automático para ajustar dinámicamente el costo según la demanda real.

---

### Q2129
**Según el resumen del módulo, ¿qué reducción en el impacto potencial de infracciones de seguridad reporta la configuración completa de RBAC de Azure en los ámbitos adecuados (Colaborador de datos de Cosmos DB para operaciones de datos del agente, Lector para visibilidad de auditoría), según referencias de seguridad de Microsoft?**

A) Una reducción del 80% en el impacto potencial de las infracciones ✅
B) No hay ninguna reducción medible; el ámbito de los roles RBAC no afecta el impacto de una infracción de seguridad
C) Una reducción de solo el 5%, un beneficio marginal que no justifica la configuración detallada de roles
D) Un aumento del 80% en el riesgo, ya que roles más específicos introducen mayor complejidad de gestión

**Explicación:** El resumen del módulo cita esta cifra exacta: aplicar acceso con privilegios mínimos mediante RBAC configurado correctamente en los ámbitos adecuados (roles de datos específicos en vez de permisos administrativos amplios) reduce el impacto potencial de infracciones en un 80%, según las referencias de seguridad de Microsoft.

---

### Q2130
**Según el resumen del módulo, ¿qué reducción de costos de almacenamiento reportan las implementaciones maduras al usar las directivas de TTL de nivel de contenedor en Cosmos DB para expirar automáticamente conversaciones tras 90 días, además de garantizar cumplimiento normativo?**

A) TTL no tiene ningún efecto sobre los costos de almacenamiento, solo afecta al cumplimiento normativo
B) 100% de cumplimiento con las regulaciones de retención de datos, y una reducción de costos de almacenamiento del 60% en implementaciones maduras ✅
C) Una reducción de costos del 60%, pero a costa de reducir el cumplimiento normativo al 60%
D) Un aumento de costos del 60%, ya que TTL requiere infraestructura adicional de monitoreo constante

**Explicación:** El resumen del módulo cita ambas cifras juntas como resultado de la misma configuración: el almacén de conversaciones que expira automáticamente documentos tras 90 días mediante TTL de nivel de contenedor garantiza 100% de cumplimiento con las regulaciones de retención de datos, mientras reduce los costos de almacenamiento en un 60% en implementaciones maduras — cumplimiento y ahorro de costos como resultado del mismo mecanismo.

---

### Q2131
**¿Cómo describe el resumen del módulo el beneficio de la "herencia basada en el ámbito" (scope-based inheritance) de Azure RBAC para la administración de permisos?**

A) La herencia basada en ámbito solo funciona en el nivel de recurso individual, nunca se propaga a niveles superiores ni inferiores
B) Cada recurso secundario requiere una asignación de rol completamente independiente y manual, sin ningún mecanismo de herencia real
C) Permite que los permisos asignados en el nivel de grupo de recursos fluyan automáticamente a los recursos secundarios, lo que reduce significativamente el esfuerzo administrativo ✅
D) La herencia basada en ámbito solo aplica a identidades de usuario humanas, nunca a identidades administradas

**Explicación:** Esta es una de las conclusiones clave del resumen del módulo: los permisos asignados en un ámbito superior (como el grupo de recursos) fluyen automáticamente hacia todos los recursos secundarios dentro de ese ámbito, evitando la necesidad de configurar asignaciones de rol individualmente en cada recurso — un principio de diseño que reduce drásticamente el esfuerzo administrativo a escala.

---

### Q2132
**Según el resumen del módulo, ¿qué patrón general resume la transformación de operaciones que logró la configuración completa del módulo (identidades administradas + Cosmos DB + RBAC), frente al enfoque manual anterior?**

A) Ningún cambio real en el patrón operativo; la configuración simplemente añade una capa de complejidad adicional sin ningún beneficio práctico
B) El patrón consiste en eliminar por completo cualquier forma de automatización, volviendo a un modelo totalmente manual y auditado por humanos
C) El resumen no menciona ningún patrón general; solo enumera configuraciones técnicas aisladas sin ninguna conclusión transversal
D) Reemplazar trabajos manuales de rotación y limpieza de credenciales con automatización de identidades, directivas de TTL y auditoría de RBAC — simplificando las operaciones y reforzando la posición general de seguridad ✅

**Explicación:** Esta es la conclusión clave final del resumen del módulo: el hilo conductor de todo el módulo es sustituir procesos manuales recurrentes y propensos a errores (rotación de credenciales, limpieza de conversaciones antiguas) por mecanismos automatizados y autoaplicables (identidades administradas, TTL, auditoría RBAC) — un cambio que simultáneamente simplifica las operaciones diarias y fortalece la postura de seguridad general.

---

### Q2133
**¿Qué recurso adicional recomienda el módulo para profundizar específicamente en la optimización de rendimiento y costos de Azure Cosmos DB tras completar este módulo?**

A) Un módulo de Microsoft Learn dedicado que aborda el diseño de claves de partición, la selección de nivel de coherencia, las estrategias de aprovisionamiento de rendimiento y las técnicas de optimización de costos ✅
B) Únicamente la certificación AZ-500 de ingeniero de seguridad de Azure, sin ningún recurso específico de Cosmos DB
C) El módulo no recomienda ningún recurso adicional relacionado con Cosmos DB en su sección de próximos pasos
D) Un curso de terceros no afiliado a Microsoft, ya que Microsoft Learn no cubre este tema

**Explicación:** El resumen del módulo enlaza explícitamente a un módulo de Microsoft Learn específico sobre optimización de rendimiento y costos en Azure Cosmos DB (cubriendo diseño de claves de partición, selección de nivel de coherencia, estrategias de rendimiento y técnicas de optimización de costos) como paso natural de continuación tras dominar los fundamentos vistos aquí.

---

### Q2134
**TRAMPA: Un administrador asume que, dado que ambos módulos de la serie tratan sobre "infraestructura segura para IA", el rol "Azure AI User" de Microsoft Foundry (visto en el ejercicio de RBAC de este módulo) otorga los mismos permisos que el rol "Colaborador de Datos de Cosmos DB" usado para el almacén de conversaciones. ¿Es correcta esta equivalencia?**

A) Sí, ambos roles son funcionalmente idénticos y controlan exactamente los mismos permisos sobre los mismos recursos
B) No — son roles de ámbitos completamente distintos: "Azure AI User" es un rol de Microsoft Foundry que controla el acceso a proyectos y activos de Foundry (modelos, agentes, herramientas), mientras que "Colaborador de Datos de Cosmos DB" es un rol de Azure Cosmos DB que controla específicamente las operaciones de lectura/escritura de datos dentro de esa base de datos NoSQL — no son intercambiables ni se solapan automáticamente ✅
C) No, porque "Azure AI User" ya no existe como rol válido en Microsoft Foundry
D) Sí, pero solo cuando ambos recursos están en el mismo grupo de recursos

**Explicación:** Esta pregunta pone a prueba una confusión común: aunque ambos roles aparecen en el contexto de "infraestructura de IA segura", pertenecen a sistemas de permisos completamente distintos con ámbitos de recursos diferentes — un rol de Foundry no otorga automáticamente acceso a Cosmos DB, ni viceversa. Cada servicio dependiente (Cosmos DB, Key Vault, Storage) requiere su propia asignación de rol específica a la identidad administrada correspondiente, tal como se detalla en el flujo de autenticación sin claves del módulo.

---

### Q2135
**Repasando el flujo completo del módulo: ¿qué tres capas de configuración se combinan, en orden, para producir la infraestructura de agente de IA segura descrita en el resumen final?**

A) Solo una capa es necesaria: basta con habilitar una identidad administrada, sin ninguna configuración adicional de RBAC ni de Cosmos DB
B) Las tres capas son completamente independientes entre sí y ninguna depende de las otras para funcionar correctamente en producción
C) (1) RBAC de Azure con privilegios mínimos para los componentes de infraestructura, (2) identidades administradas asignadas por el sistema para autenticación sin claves entre servicios, y (3) Azure Cosmos DB configurado con clave de partición, coherencia de sesión y TTL como almacén de conversaciones — las tres capas trabajando en conjunto, no de forma aislada ✅
D) El orden de configuración no importa en absoluto; las tres capas pueden aplicarse en cualquier secuencia sin ningún efecto práctico

**Explicación:** El módulo estructura su propio flujo de aprendizaje exactamente en este orden progresivo, y el resumen lo confirma: primero se establecen las asignaciones de roles RBAC de privilegio mínimo, después se habilita la identidad administrada que usa esos roles para autenticarse sin claves, y finalmente se configura Cosmos DB (partición, coherencia, TTL) como el recurso de datos al que esa identidad autenticada accede — cada capa depende y se apoya en la anterior para formar la infraestructura de producción completa.

---
