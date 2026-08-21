# BANCO DE PREGUNTAS AI-103 — PARTE 28 (Q2063-Q2100)
## Domain 1 (real): Plan and Manage an Azure AI Solution — entidades de seguridad de Microsoft Entra ID, ámbitos de gobernanza de Azure y Azure Policy para infraestructura de IA
### Generado: 2026-08-22 | Fuente: módulo MS Learn "Implementar controles de seguridad para la infraestructura de Azure lista para IA"

---

### Q2063
**¿Cuáles son los cuatro tipos principales de entidades de seguridad de Microsoft Entra ID descritos en el módulo, y a qué patrón de acceso responde cada uno?**

A) Usuarios (personas individuales), grupos (permisos por equipo), entidades de servicio (aplicaciones/scripts) e identidades administradas (recursos de Azure sin credenciales almacenadas) ✅
B) Solo dos tipos: usuarios y aplicaciones, sin ninguna otra categoría intermedia
C) Roles, permisos, ámbitos y directivas — estos son conceptos de RBAC, no tipos de entidad de seguridad
D) Suscripciones, grupos de recursos, recursos individuales y grupos de administración — esto describe la jerarquía de ámbitos, no las entidades de seguridad

**Explicación:** El módulo detalla estos cuatro tipos: usuarios (científicos de datos con acceso interactivo), grupos (simplifican la administración de permisos por equipo, heredados automáticamente al añadir miembros), entidades de servicio (autentican aplicaciones y canalizaciones de CI/CD) e identidades administradas (eliminan la gestión de credenciales para recursos de Azure que se comunican entre sí).

---

### Q2064
**Un modelo de análisis de sentimiento necesita leer datos de una cuenta de Azure Storage durante la inferencia, ejecutándose sin intervención humana. ¿Qué tipo de entidad recomienda el módulo priorizar para este escenario de autenticación Azure-a-Azure, y qué reducción de riesgo cita frente al enfoque de entidad de servicio manual?**

A) Una entidad de servicio con secreto de cliente rotado manualmente cada 24 horas, sin ninguna cifra de reducción de riesgo asociada
B) Una identidad administrada asignada por el sistema en el recurso, con una reducción de riesgo de seguridad de 40 a 60% frente a credenciales administradas manualmente ✅
C) Una cuenta de usuario compartida entre todo el equipo de ciencia de datos, ya que simplifica la auditoría
D) Ninguna entidad de seguridad es necesaria si el recurso está dentro de la misma red virtual

**Explicación:** El módulo cita esta cifra exacta al comparar el enfoque de entidad de servicio (secreto de cliente almacenado en código, riesgo de exposición accidental, rotación manual propensa a fallos) frente a la identidad administrada (Azure controla adquisición y renovación de tokens en segundo plano): una reducción de riesgo de seguridad de 40 a 60% en cargas de trabajo de IA de producción, según telemetría interna de Microsoft.

---

### Q2065
**¿Cuándo es preferible usar una identidad administrada asignada por el usuario en lugar de una asignada por el sistema, según el ejemplo del módulo con cinco espacios de trabajo de aprendizaje automático?**

A) Nunca; las identidades asignadas por el usuario están obsoletas y Microsoft recomienda evitarlas en cualquier escenario
B) Únicamente cuando el recurso se elimina y se vuelve a crear con frecuencia, ya que solo estas identidades sobreviven a la eliminación del recurso
C) Cuando varios recursos necesitan la misma identidad y los mismos permisos: se crea una única identidad administrada asignada por el usuario, se le conceden los permisos necesarios una vez, y luego se asigna a los cinco espacios de trabajo, simplificando la administración y habilitando la reutilización ✅
D) Solo es válida para entidades de servicio, no para identidades administradas

**Explicación:** El módulo contrasta ambos tipos: la identidad asignada por el sistema tiene su ciclo de vida vinculado a un único recurso (útil para acceso exclusivo de ese recurso), mientras que la asignada por el usuario existe como recurso independiente reutilizable en varios servicios de proceso — ideal cuando múltiples espacios de trabajo necesitan permisos idénticos, evitando duplicar la configuración de acceso cinco veces.

---

### Q2066
**¿Qué tres elementos combina una asignación de roles de Azure RBAC, según el módulo?**

A) Usuario, contraseña y token de sesión
B) Suscripción, región y grupo de recursos únicamente
C) Solo dos elementos: permiso y recurso, sin ningún concepto de ámbito jerárquico
D) Una entidad de seguridad (quién), una definición de roles (qué acciones) y un ámbito (dónde) ✅

**Explicación:** El módulo define explícitamente esta tríada como el mecanismo central de RBAC: la entidad de seguridad determina quién solicita acceso, la definición de roles determina qué acciones puede realizar (lectura, escritura, eliminación), y el ámbito determina dónde se aplica ese permiso dentro de la jerarquía de Azure.

---

### Q2067
**¿Qué distingue al rol integrado "Científico de datos de Azure Machine Learning" frente a roles genéricos como Colaborador, según el módulo?**

A) Concede permisos para crear experimentos y registrar modelos, pero impide específicamente la eliminación de áreas de trabajo o la modificación de recursos de proceso — un control más preciso adecuado a la fase de experimentación ✅
B) Es exactamente idéntico al rol Colaborador, solo con un nombre distinto
C) Otorga acceso total de administrador a nivel de suscripción completa
D) Solo permite operaciones de solo lectura, sin poder crear ningún experimento

**Explicación:** El módulo presenta este rol como ejemplo de por qué las cargas de trabajo de IA suelen requerir control más específico que los roles integrados genéricos (Colaborador, Lector, Propietario): concede exactamente lo necesario para experimentación (crear experimentos, registrar modelos) sin exponer capacidades destructivas o de infraestructura que ese rol no necesita.

---

### Q2068
**Según el patrón de seguridad recomendado por Azure Security Benchmark citado en el módulo, ¿cómo deben separarse las identidades humanas de las identidades usadas para operaciones automatizadas entre servicios back-end?**

A) Todos los usuarios y todos los servicios deben compartir exactamente la misma identidad administrada única para simplificar la auditoría
B) Los científicos de datos deben usar sus identidades de usuario para el acceso interactivo, mientras que el área de trabajo usa su propia identidad administrada para operaciones de back-end (extraer imágenes de ACR, escribir en Monitor, acceder a Storage) — en vez de conceder a los usuarios permisos directos sobre todos esos servicios dependientes ✅
C) Los servicios back-end nunca deben tener ningún tipo de identidad; solo los usuarios humanos pueden autenticarse
D) Las identidades de usuario deben usarse tanto para el acceso interactivo como para las operaciones automatizadas de back-end, sin ninguna distinción

**Explicación:** El módulo presenta esta separación de preocupaciones como el patrón recomendado: en vez de dar a los científicos de datos permisos directos sobre cada servicio dependiente (ACR, Monitor, Storage), se conceden roles específicos a la identidad administrada del área de trabajo para esas operaciones internas, mientras los usuarios conservan sus propias identidades para el trabajo interactivo.

---

### Q2069
**Una canalización de entrenamiento necesita extraer datos de una instancia local (on-premises) de SQL Server e insertar notificaciones en un canal de Slack. ¿Qué tipo de entidad de seguridad es necesaria aquí, a pesar de que el módulo prioriza generalmente las identidades administradas, y por qué?**

A) Una identidad administrada sigue siendo la única opción válida, ya que funciona con cualquier sistema, interno o externo a Azure
B) No es posible integrar ningún sistema externo a Azure desde una canalización de Azure Machine Learning
C) Se necesita una entidad de servicio, porque estos sistemas externos (SQL Server local, Slack) no se pueden autenticar con identidades administradas — los secretos de la entidad de servicio se almacenan en Azure Key Vault, y la identidad administrada del área de trabajo obtiene permiso para recuperarlos ✅
D) Se necesita una cuenta de usuario compartida configurada específicamente para integraciones externas

**Explicación:** El módulo aclara este límite importante: las identidades administradas funcionan para autenticación Azure-a-Azure, pero los sistemas externos (locales o de terceros fuera de Azure) requieren entidades de servicio. El patrón recomendado combina ambos: secretos de la entidad de servicio centralizados en Key Vault, con la identidad administrada del área de trabajo autorizada a recuperarlos — evitando secretos dispersos en código o configuración.

---

### Q2070
**¿Qué función cumple la característica de "revisiones de acceso" de Microsoft Entra ID, y por qué se vuelve especialmente importante a medida que la plataforma de IA escala?**

A) Elimina automáticamente todas las cuentas de usuario después de 90 días sin excepción
B) Solo audita el uso de ancho de banda de red, sin relación con permisos de identidad
C) Sustituye por completo la necesidad de asignar roles RBAC a cualquier entidad
D) Requiere que los propietarios de grupo certifiquen periódicamente que cada miembro todavía necesita el acceso que tiene, automatizando la gobernanza de permisos — esencial cuando docenas de áreas de trabajo admiten cientos de usuarios, ya que las auditorías manuales se vuelven inviables ✅

**Explicación:** El módulo presenta las revisiones de acceso como el mecanismo que evita permisos huérfanos (cuando un científico de datos cambia de equipo o un proyecto finaliza): en plataformas grandes, las auditorías de permisos manuales se vuelven inviables sin este tipo de flujo de trabajo automatizado de recertificación periódica.

---

### Q2071
**¿Cómo describe el módulo la jerarquía de ámbitos de Azure (grupos de administración, suscripciones, grupos de recursos, recursos) usando la analogía del sistema de archivos?**

A) Grupos de administración = letras de unidad (organización/divisiones), suscripciones = carpetas de nivel superior (entornos o unidades de negocio), grupos de recursos = carpetas de proyecto, recursos individuales = los propios archivos ✅
B) No existe ninguna analogía útil entre la jerarquía de Azure y un sistema de archivos, según el módulo
C) Todos los niveles de la jerarquía son intercambiables y no tienen un orden de anidamiento definido
D) Los grupos de recursos contienen suscripciones, que a su vez contienen grupos de administración

**Explicación:** El módulo usa exactamente esta analogía para ilustrar la jerarquía: grupos de administración en la parte superior (como letras de unidad, representando la organización o divisiones principales), suscripciones anidadas dentro de ellos (carpetas de nivel superior, típicamente separando entornos o unidades de negocio), grupos de recursos como carpetas de proyecto, y recursos individuales como archivos.

---

### Q2072
**Al asignar una directiva en el nivel de grupo de administración, ¿qué ocurre con esa directiva respecto a las suscripciones, grupos de recursos y recursos anidados debajo?**

A) La directiva solo se aplica al propio grupo de administración; no tiene ningún efecto sobre los niveles inferiores
B) Se propaga automáticamente a través de suscripciones, grupos de recursos y, en última instancia, se aplica a cada recurso individual — herencia de directivas ✅
C) Es necesario volver a asignar manualmente la misma directiva en cada suscripción individual para que tenga efecto
D) Solo se aplica si cada suscripción confirma explícitamente que acepta heredarla

**Explicación:** El módulo describe la herencia como la característica central que hace poderosa a la jerarquía de ámbitos: asignar una directiva una vez en un nivel superior evita administrar permisos individualmente en cientos de recursos, ya que se propaga automáticamente hacia abajo en toda la estructura anidada.

---

### Q2073
**En el ejemplo del módulo, una organización separa sus cargas de trabajo de IA en suscripciones de producción y desarrollo. ¿Qué diferencia de gobernanza aplica cada una?**

A) Ambas suscripciones tienen exactamente las mismas directivas y el mismo nivel de control de cambios, sin ninguna diferencia
B) Solo la suscripción de desarrollo tiene alguna directiva de seguridad; producción no tiene ninguna restricción
C) La suscripción de producción aplica control de cambios estricto con aprobación obligatoria para implementaciones, mientras que la de desarrollo da a los científicos de datos flexibilidad para experimentar con nuevos servicios — ambas heredan la misma línea base de seguridad del grupo de administración ✅
D) La separación de entornos solo puede lograrse mediante grupos de recursos, nunca mediante suscripciones distintas

**Explicación:** El módulo presenta este ejemplo concreto: separar producción y desarrollo en suscripciones distintas evita que el trabajo experimental afecte la estabilidad de producción, mientras ambas suscripciones heredan las directivas de línea base del grupo de administración padre (como cifrado obligatorio y regiones aprobadas), manteniendo coherencia de seguridad pese a tener reglas operativas distintas.

---

### Q2074
**¿Qué recursos comparten un ciclo de vida común dentro del grupo de recursos "customer-sentiment-production" del ejemplo del módulo, y qué ventaja de administración proporciona esta agrupación?**

A) Únicamente contiene una máquina virtual sin relación con ningún otro recurso del proyecto
B) Contiene todos los recursos de todos los proyectos de la organización, sin ninguna separación por proyecto
C) Solo agrupa recursos de facturación, sin ninguna relación con permisos de acceso
D) El área de trabajo de ML, los clústeres de proceso, la cuenta de almacenamiento de datos de entrenamiento y la instancia de Azure AI Services de análisis de texto; agrupar estos recursos permite conceder acceso al grupo de recursos completo en vez de configurar permisos individuales en cada componente ✅

**Explicación:** El módulo describe este grupo de recursos como ejemplo del patrón de "carpeta de proyecto": los componentes que se crearon juntos, escalan juntos y eventualmente se retiran juntos para el proyecto de análisis de opiniones — agruparlos simplifica la administración de permisos, ya que conceder acceso al grupo de recursos completo evita configurar permisos individuales en cada componente.

---

### Q2075
**¿Qué ventaja de seguimiento de costos proporciona la organización por grupos de recursos, según el módulo, y qué mejora citan las organizaciones que usan convenciones de nomenclatura coherentes?**

A) Azure etiqueta cada recurso con su grupo de recursos primario, permitiendo filtrar costos por grupo en vez de correlacionar manualmente cargos individuales; convenciones coherentes (p. ej. "rg-[proyecto]-[entorno]") reportan 60-80% más rápida conciliación presupuestaria ✅
B) Ninguna; los grupos de recursos no tienen ninguna relación con el seguimiento de costos en Azure
C) Solo permite ver costos agregados de toda la suscripción, sin ningún desglose por proyecto
D) Los costos solo pueden rastrearse a nivel de recurso individual, nunca a nivel de grupo de recursos

**Explicación:** El módulo cita esta cifra concreta: cuando el equipo financiero pregunta cuánto se gastó en un proyecto específico, filtrar por etiquetas de grupo de recursos evita correlación manual de docenas de cargos individuales — y una convención de nomenclatura clara y coherente acelera la conciliación presupuestaria entre 60 y 80% frente a nomenclatura ad hoc.

---

### Q2076
**¿Qué es el patrón "hub-and-spoke" descrito en el módulo para infraestructura de IA compartida (Azure Container Registry común, Key Vault compartido, componentes de red empresariales)?**

A) Requiere duplicar toda la infraestructura compartida dentro de cada grupo de recursos de proyecto individual
B) Coloca la infraestructura compartida en su propio grupo de recursos ("shared-services") con directivas de acceso delegado, mientras las cargas de trabajo de cada proyecto residen en grupos de recursos vinculados con directivas de experimentación más permisivas ✅
C) Es un patrón exclusivo para redes virtuales, sin ninguna aplicación a Key Vault o Container Registry
D) Elimina por completo la necesidad de cualquier grupo de recursos separado para servicios compartidos

**Explicación:** El módulo presenta este patrón como solución cuando varios proyectos dependen de la misma infraestructura: en vez de duplicarla en cada grupo de recursos de proyecto, se centraliza en un grupo de recursos "hub" con sus propias directivas de acceso, mientras los proyectos ("spokes") mantienen sus propios grupos de recursos con reglas más flexibles para experimentación — simplificando tanto seguridad como imputación de costos.

---

### Q2077
**¿Qué tres desafíos críticos resuelve la estructura de cuenta de Microsoft Foundry (una suscripción de Hub con infraestructura de IA compartida + varias suscripciones "spoke" para proyectos individuales), según el módulo?**

A) Solo resuelve el problema de costos de licencias de software, sin ningún beneficio de seguridad o aislamiento
B) Elimina por completo la necesidad de cualquier identidad administrada o entidad de servicio
C) Centraliza la gobernanza y administración de costos, aísla los recursos del proyecto para seguridad y cumplimiento, y permite experimentación flexible sin poner en peligro la estabilidad de producción ✅
D) Solo aplica a organizaciones con un único equipo de ciencia de datos, sin ningún beneficio en escenarios multiequipo

**Explicación:** El módulo detalla estos tres beneficios exactos del patrón de cuenta Foundry: en vez de crear cinco suscripciones de Hub independientes (que duplicarían infraestructura y complicarían gobernanza), un único Hub centraliza servicios compartidos (Azure AI Services, almacenamiento, redes empresariales, supervisión), mientras cada equipo obtiene su propia suscripción spoke para experimentar de forma independiente.

---

### Q2078
**En el ejemplo del módulo, el equipo de detección de fraudes debe cumplir requisitos PCI-DSS mientras el equipo de servicio al cliente trabaja bajo directivas corporativas estándar. ¿Cómo aplica el patrón Hub-spoke esta diferenciación sin duplicar la línea base de seguridad?**

A) Es necesario crear un Hub completamente separado para cada nivel de cumplimiento normativo distinto
B) Todas las suscripciones deben aplicar exactamente las mismas directivas PCI-DSS, sin importar el tipo de datos que procesen
C) El cumplimiento normativo no puede aplicarse de forma diferenciada dentro del mismo patrón Hub-spoke
D) La suscripción del Hub mantiene la línea base de seguridad común (cifrado, restricciones regionales, requisitos de identidad); cada suscripción spoke agrega controles incrementales según su nivel de confidencialidad de datos — aplicando PCI solo donde es necesario, sin restricciones innecesarias en otros proyectos ✅

**Explicación:** El módulo cuantifica el beneficio de este enfoque: reduce la complejidad de directivas entre 40 y 50% frente a intentar acomodar todos los escenarios de cumplimiento en una única suscripción — la línea base común vive en el Hub, y las suscripciones spoke añaden solo los controles adicionales que su contexto normativo específico requiere.

---

### Q2079
**¿Cuáles son los tres factores que, según el módulo, impulsan las decisiones sobre en qué nivel de la jerarquía de ámbitos aplicar la separación (suscripción vs. grupo de recursos)?**

A) Requisitos de aislamiento de cargas de trabajo, granularidad de administración de costos y límites de cumplimiento ✅
B) Únicamente el número total de recursos que posee la organización, sin ningún otro criterio
C) Solo el presupuesto disponible para licencias de Azure, sin relación con seguridad o cumplimiento
D) El idioma de programación usado en los modelos de IA de cada proyecto

**Explicación:** El módulo detalla estos tres factores: el aislamiento de carga de trabajo (producción/desarrollo casi siempre requieren separación a nivel de suscripción), la granularidad de costos (contracargo a nivel de proyecto basta con grupos de recursos; a nivel de departamento con facturación independiente requiere separación de suscripciones), y los límites de cumplimiento (cuando las regulaciones de residencia de datos varían, se necesitan límites de suscripción).

---

### Q2080
**¿Cuántos niveles de jerarquía recomienda el módulo como suficientes para la mayoría de las organizaciones, y por qué desaconseja estructuras más profundas?**

A) Diez niveles o más, ya que cuanto más profunda es la jerarquía, más preciso es el control de acceso
B) Entre tres y cuatro niveles (grupo de administración, suscripción, grupo de recursos, recurso); el modelo de herencia de Azure Policy funciona mejor con jerarquías superficiales y anchas, ya que las estructuras anidadas complejas dificultan resolver conflictos de directivas ✅
C) Un único nivel plano, sin ninguna jerarquía de ámbitos
D) Exactamente dos niveles fijos, sin posibilidad de variación según la organización

**Explicación:** El módulo advierte explícitamente contra la sobreingeniería de la jerarquía: tres a cuatro niveles bastan para la mayoría de organizaciones, y las estructuras anidadas profundas complican la resolución de problemas cuando las directivas heredadas entran en conflicto o se aplican de forma inesperada — "superficial y ancha" supera a "profunda y estrecha".

---

### Q2081
**¿A través de qué flujo de trabajo de tres fases funciona Azure Policy, según el módulo?**

A) Solo dos fases: crear la directiva y eliminarla cuando ya no se necesita
B) Instalar un agente en cada máquina virtual, configurar reglas de firewall y reiniciar el recurso
C) Definir/seleccionar la directiva → asignarla a un ámbito (dónde se aplica) → evaluación continua de recursos dentro de ese ámbito (marcado como conforme/no conforme y acción según el efecto configurado) ✅
D) Redactar un informe manual, enviarlo por correo al equipo de seguridad y esperar aprobación escrita

**Explicación:** El módulo estructura Azure Policy en exactamente estas tres fases: definición del requisito, asignación a un ámbito específico (grupo de administración, suscripción o grupo de recursos), y evaluación continua y automática (al crear/modificar recursos, o mediante análisis programados cada 24 horas) — sin necesidad de auditoría manual.

---

### Q2082
**Según cifras citadas en el módulo, ¿cómo cambia el tiempo de revisión de implementación y la coherencia de cumplimiento al pasar de revisión manual a Azure Policy automatizado?**

A) No hay ninguna diferencia medible entre revisión manual y automatizada según el módulo
B) El tiempo de revisión aumenta de minutos a días al automatizar, debido a la sobrecarga de evaluación continua
C) La coherencia de cumplimiento empeora con la automatización, de 98% manual a 75% automatizado
D) El tiempo de revisión se reduce de días a minutos, y la coherencia de cumplimiento mejora de 75-85% (revisión manual) a 98-100% (cumplimiento automatizado) ✅

**Explicación:** El módulo cita estas cifras exactas al contrastar los procesos tradicionales de aprobación de cambios (arquitectos revisando manualmente cada solicitud, creando cuellos de botella) con Azure Policy (bloqueo o corrección automática e inmediata): el tiempo baja de días a minutos, y la coherencia sube de 75-85% a 98-100%.

---

### Q2083
**¿Cuáles son los cuatro efectos principales de Azure Policy descritos en el módulo, y qué distingue específicamente a "Modify" de "DeployIfNotExists"?**

A) Audit (supervisa sin bloquear), Deny (impide la creación de recursos no conformes), DeployIfNotExists (agrega automáticamente configuraciones que faltan) y Modify (cambia propiedades de recursos existentes/nuevos, en vez de agregar recursos secundarios como hace DeployIfNotExists) ✅
B) Solo existen dos efectos: Permitir y Denegar, sin ninguna otra opción intermedia
C) Create, Update, Delete y Read — estos son verbos de API REST, no efectos de Azure Policy
D) Todos los efectos de Azure Policy bloquean automáticamente la implementación, sin ninguna opción de solo auditoría

**Explicación:** El módulo detalla estos cuatro efectos con un ejemplo concreto (deshabilitar acceso público en cuentas de Storage): Audit registra sin bloquear (útil en el período inicial de gobernanza), Deny bloquea la creación pero no corrige recursos existentes, DeployIfNotExists agrega recursos/configuraciones faltantes automáticamente, y Modify específicamente cambia propiedades existentes (como establecer "publicNetworkAccess: Disabled") tanto en creación como mediante corrección posterior.

---

### Q2084
**En el ejemplo del módulo sobre deshabilitar el acceso público de red en cuentas de Storage, ¿qué limitación tiene específicamente el efecto "Deny" frente al efecto "Modify"?**

A) Deny y Modify son funcionalmente idénticos en todos los aspectos, sin ninguna diferencia práctica
B) Deny bloquea la creación de nuevas cuentas no conformes, pero requiere corrección manual de las cuentas no compatibles ya existentes; Modify puede corregir automáticamente tanto las cuentas nuevas como las existentes mediante una tarea de corrección de selección única ✅
C) Deny puede corregir recursos existentes automáticamente, pero Modify no puede hacerlo bajo ninguna circunstancia
D) Ninguno de los dos efectos puede aplicarse jamás a cuentas de Azure Storage

**Explicación:** El módulo señala esta distinción exacta: una directiva Deny es adecuada para "aplicar el requisito en el futuro" (previene infracciones nuevas) pero deja intactos los recursos preexistentes no conformes, mientras que Modify es "el enfoque más automatizado que controla tanto la prevención como la corrección" — estableciendo la propiedad automáticamente y corrigiendo cuentas existentes vía tarea de corrección.

---

### Q2085
**¿Qué porcentaje de los requisitos de gobernanza comunes cubren las directivas integradas de Azure para cargas de trabajo de IA, según el módulo, y cuál es la proporción típica de directivas integradas frente a personalizadas en organizaciones con gobernanza madura?**

A) Las directivas integradas cubren el 100% de cualquier requisito posible; nunca es necesario crear una directiva personalizada
B) Las directivas integradas no cubren ningún escenario de IA; siempre se requieren directivas personalizadas
C) Las directivas integradas cubren 70-80% de los requisitos comunes; las organizaciones maduras suelen usar 60-70% directivas integradas y 30-40% directivas personalizadas para requisitos específicos del sector ✅
D) La proporción recomendada es 100% directivas personalizadas, evitando por completo las integradas

**Explicación:** El módulo cita ambas cifras: las directivas integradas (como "Las áreas de trabajo de ML deben usar private link" o "Requerir una etiqueta") cubren el 70-80% de los requisitos comunes, mientras que las organizaciones con plataformas de gobernanza maduras combinan típicamente 60-70% directivas integradas con 30-40% directivas personalizadas para necesidades específicas del sector o normativas únicas.

---

### Q2086
**Cuando se asigna una nueva directiva DeployIfNotExists a recursos ya existentes que resultan no conformes, ¿los modifica Azure automáticamente de inmediato? ¿Por qué?**

A) Sí, Azure Policy siempre modifica automáticamente y de inmediato cualquier recurso no conforme sin ninguna intervención
B) Solo se modifican automáticamente los recursos creados hace menos de 24 horas
C) Azure elimina automáticamente cualquier recurso no conforme detectado, sin posibilidad de corrección
D) No — los recursos no conformes aparecen en la lista de "no conforme", pero Azure no los modifica automáticamente porque la aplicación retroactiva podría interrumpir la ejecución de cargas de trabajo; se deben iniciar tareas de corrección explícitas, idealmente durante ventanas de mantenimiento planificadas ✅

**Explicación:** El módulo explica esta salvaguarda deliberada: la corrección automática inmediata podría causar interrupciones inesperadas en cargas de trabajo en ejecución, así que Azure Policy separa la detección (inmediata) de la corrección (requiere iniciar explícitamente una tarea de corrección), dando control al equipo de operaciones sobre cuándo aplicar los cambios.

---

### Q2087
**En el ejemplo del módulo, una directiva DeployIfNotExists sobre registro de diagnóstico detecta 12 de 15 áreas de trabajo de ML no conformes. ¿Qué cifra de reducción de tiempo cita el módulo al usar tareas de corrección automatizadas frente a la configuración manual individual de cada área de trabajo?**

A) Una reducción del 85-95% del tiempo de corrección en comparación con los enfoques manuales, con la ventaja añadida de coherencia perfecta en todos los recursos corregidos ✅
B) No hay ninguna diferencia de tiempo entre corrección manual y automatizada según el módulo
C) La corrección automatizada tarda más tiempo que la configuración manual individual, aunque es más consistente
D) Una reducción de solo el 5%, un ahorro marginal que no justifica el uso de tareas de corrección

**Explicación:** El módulo cita esta cifra concreta: seleccionar las 12 áreas de trabajo no conformes y ejecutar "Crear tarea de corrección" implementa automáticamente las configuraciones faltantes en los siguientes 30 minutos, reduciendo el tiempo de corrección entre un 85 y 95% frente a actualizar manualmente cada área de trabajo, con la garantía adicional de coherencia perfecta.

---

### Q2088
**¿Cómo describe el módulo la integración entre Azure Policy y Microsoft Defender for Cloud, y qué crea esta combinación?**

A) Son productos completamente independientes sin ninguna integración posible entre ellos
B) Defender evalúa recursos frente a pruebas comparativas de seguridad y vincula los hallazgos directamente a la asignación de directiva pertinente (con un botón "Corregir"); esto crea un sistema de gobernanza de bucle cerrado — Defender identifica brechas, Policy evita repeticiones y corrige infracciones existentes ✅
C) Microsoft Defender for Cloud reemplaza por completo la necesidad de usar Azure Policy
D) La integración solo funciona para recursos de red, sin relación con áreas de trabajo de Machine Learning

**Explicación:** El módulo presenta esta integración como un "sistema de gobernanza de bucle cerrado": cuando Defender detecta un problema (p. ej., "El área de trabajo de ML tiene habilitado el acceso a la red pública"), se vincula directamente a la directiva relevante, sin que el equipo de seguridad necesite registrar tickets o actualizar configuraciones manualmente — todo el ciclo detección-prevención-corrección queda automatizado.

---

### Q2089
**¿Qué son las "iniciativas" de Azure Policy (también llamadas conjuntos de directivas), y qué ejemplo integrado menciona el módulo con más de 200 directivas agrupadas?**

A) Son grupos de usuarios con permisos idénticos, sin ninguna relación con directivas de Azure Policy
B) Son plantillas de facturación que agrupan costos por proyecto, sin relación con cumplimiento
C) Agrupan directivas relacionadas en colecciones que se asignan como una sola unidad, simplificando la administración cuando la biblioteca de directivas crece a docenas o cientos; el ejemplo integrado citado es "Azure Security Benchmark", con más de 200 directivas de identidad, redes y protección de datos ✅
D) Solo pueden contener una única directiva cada una; agrupar varias directivas en una iniciativa no es posible

**Explicación:** El módulo describe las iniciativas como la solución a la administración impráctica de asignaciones individuales cuando hay muchas directivas: asignar "Azure Security Benchmark" una sola vez en el grupo de administración aplica automáticamente sus más de 200 directivas de miembro a todos los recursos del ámbito.

---

### Q2090
**¿Qué patrón de capas recomienda el módulo al combinar iniciativas amplias con directivas específicas por proyecto (ej., el proyecto de detección de fraudes con requisitos PCI)?**

A) Aplicar siempre todas las directivas posibles en el nivel de recurso individual, sin ninguna jerarquía de ámbitos
B) Las directivas específicas de proyecto deben ir siempre en el nivel más alto (grupo de administración), nunca en grupos de recursos
C) Es imposible combinar iniciativas amplias con directivas específicas de proyecto en la misma jerarquía
D) Empezar con iniciativas amplias en ámbitos altos (grupo de administración/suscripción) que establecen la línea base, y agregar asignaciones de directivas específicas en ámbitos inferiores (grupos de recursos) para requisitos particulares del proyecto — de lo general a lo específico bajando en la jerarquía ✅

**Explicación:** El módulo ilustra este enfoque en capas: el grupo de administración tiene asignada la iniciativa Azure Security Benchmark (controles fundamentales para todos), la suscripción de producción agrega una iniciativa personalizada de "Gobernanza de IA de producción", y los grupos de recursos individuales agregan directivas según su confidencialidad de datos (como PCI para el proyecto de detección de fraudes) — cobertura completa sin sobrecargar a todos los equipos con directivas irrelevantes.

---

### Q2091
**¿Qué son las exenciones de directiva de Azure Policy, y qué recomendación de frecuencia da el módulo sobre su uso para evitar la "desviación de la política" (policy drift)?**

A) Documentan excepciones legítimas a una regla de gobernanza (por qué se concedió, cuándo expira, quién la aprobó) para un recurso específico, en vez de debilitar la directiva para toda la organización; deben ser poco frecuentes (menos del 5% de los recursos) y limitadas en el tiempo, para evitar que las excepciones se conviertan gradualmente en la norma ✅
B) Eliminan permanentemente una directiva de toda la organización sin posibilidad de reactivarla
C) Se recomienda aplicarlas a más del 50% de los recursos para maximizar la flexibilidad operativa
D) Las exenciones de directiva no requieren ningún tipo de documentación ni fecha de expiración

**Explicación:** El módulo usa el ejemplo de una instancia de Azure AI Services aprobada para procesar datos en Japón Oriental pese a una directiva de residencia de datos estándar: en vez de modificar la directiva para toda la organización (debilitando controles), se crea una exención puntual, documentada y con expiración — el módulo advierte explícitamente que deben mantenerse por debajo del 5% de los recursos para no erosionar la gobernanza general.

---

### Q2092
**En el ejercicio práctico del módulo sobre RBAC de Microsoft Foundry, ¿qué distingue al rol "Azure AI User" del rol "Azure AI Project Manager"?**

A) Ambos roles son exactamente idénticos en permisos, solo cambia el nombre
B) Azure AI User concede acceso de solo lectura a recursos y proyectos de Foundry (ver activos, acciones de datos limitadas); Azure AI Project Manager permite administrar activos y recursos a nivel de proyecto, incluyendo compilar, desarrollar y asignar roles a otros usuarios dentro del ámbito del proyecto ✅
C) Azure AI User tiene más permisos que Azure AI Project Manager en todos los casos
D) Azure AI Project Manager solo puede leer datos, nunca puede crear ni modificar activos de un proyecto

**Explicación:** El ejercicio del módulo distingue claramente estos roles integrados de Foundry: Azure AI User da visibilidad de solo lectura sobre activos y proyectos, mientras Azure AI Project Manager añade capacidades de gestión activa a nivel de proyecto (compilar, desarrollar, asignar roles a otros usuarios) — un escalón intermedio entre solo lectura y control total.

---

### Q2093
**En el escenario del ejercicio de RBAC del módulo, un miembro del equipo es Administrador de Proyectos (Project Manager) en el proyecto predeterminado, pero solo tiene el rol "Azure AI User" en los demás proyectos del mismo recurso de Foundry. ¿Qué objetivo de gobernanza cumple esta configuración?**

A) Es un error de configuración que debe corregirse para dar el mismo nivel de acceso en todos los proyectos
B) Esta configuración es técnicamente imposible en Microsoft Foundry; los roles siempre deben ser idénticos en todos los proyectos de un mismo recurso
C) Separación de tareas: garantiza responsabilidad clara y evita cambios no autorizados — la persona puede ver datos y configuraciones compartidas de otros proyectos sin poder modificarlos, mientras mantiene control administrativo completo solo sobre el proyecto que le corresponde gestionar ✅
D) Solo tiene sentido para reducir costos de licenciamiento, sin ninguna relación con seguridad

**Explicación:** El ejercicio del módulo presenta esto explícitamente como el objetivo del diseño: la separación de tareas (control total en el propio proyecto, visibilidad sin modificación en los demás) proporciona una base segura para el desarrollo colaborativo de IA entre equipos, evitando que cualquier persona tenga capacidad de modificar proyectos ajenos sin necesidad.

---

### Q2094
**Según el modelo de autorización de Azure RBAC descrito en el ejercicio del módulo (allow-only y acumulativo), si un usuario tiene múltiples asignaciones de roles, ¿cómo se determinan sus permisos efectivos?**

A) Solo se aplica el rol asignado más recientemente; los roles anteriores quedan anulados automáticamente
B) Azure RBAC nunca permite más de una asignación de rol por usuario en toda la plataforma
C) Los permisos son sustractivos: cada nuevo rol asignado reduce los permisos previamente concedidos
D) Los permisos son aditivos: los permisos efectivos son la unión de todos los roles asignados, y el acceso concedido en un ámbito superior (p. ej. suscripción) se aplica automáticamente a todos los ámbitos inferiores dentro de esa jerarquía ✅

**Explicación:** El ejercicio del módulo especifica este comportamiento clave del modelo RBAC de Azure: es "allow-only" (nunca deniega explícitamente, solo concede) y acumulativo (los permisos de múltiples asignaciones se suman), y el acceso heredado desde un ámbito superior sigue aplicándose junto con cualquier permiso adicional concedido en un ámbito inferior específico.

---

### Q2095
**Según el ejercicio práctico del módulo sobre mejora de seguridad de proceso mediante Azure Policy, ¿qué efectos admite la directiva "Los recursos de proceso de Azure Machine Learning deben implementarse dentro de una red virtual", y en qué se diferencia de las otras dos directivas del mismo ejercicio (actualización del SO y deshabilitar autenticación local)?**

A) Admite Audit y Disabled únicamente (sin efecto Deny disponible), a diferencia de las otras dos directivas del ejercicio que sí admiten Audit, Deny y Disabled ✅
B) Las tres directivas del ejercicio admiten exactamente los mismos efectos: Audit, Deny y Disabled
C) Solo admite el efecto Deny, sin ninguna otra opción de configuración posible
D) No admite ningún efecto configurable; se aplica siempre de forma automática e inmutable

**Explicación:** El ejercicio del módulo detalla explícitamente esta diferencia entre las tres directivas integradas usadas: tanto "recreate compute instances for latest OS" como "disable local authentication methods" admiten Audit, Deny y Disabled, mientras que la directiva de aislamiento de red del proceso en una VNet admite únicamente Audit y Disabled — sin la opción de bloquear (Deny) la creación de recursos no conformes.

---

### Q2096
**¿Qué es una "iniciativa" en el contexto del ejercicio práctico del módulo, y qué tres áreas de directiva se combinan en el ejemplo específico creado ("[Custom] Enhance security of Microsoft Foundry compute resources")?**

A) Facturación, licenciamiento y soporte técnico, sin ninguna relación con seguridad de proceso
B) Actualizaciones de proceso (última versión de SO), aislamiento de red (proceso dentro de una VNet) y controles de autenticación (deshabilitar autenticación local), agrupados en una sola unidad asignable ✅
C) Solo combina una única directiva; el concepto de "combinar varias directivas" no aplica a las iniciativas
D) Backup, replicación geográfica y recuperación ante desastres exclusivamente

**Explicación:** El ejercicio práctico del módulo crea exactamente esta iniciativa combinando las tres directivas integradas relevantes para seguridad de proceso de Microsoft Foundry/Azure Machine Learning: actualizaciones de sistema operativo, aislamiento de red del clúster de proceso, y deshabilitación de autenticación local en favor de Entra ID — asignándolas todas juntas como una única unidad de gobernanza.

---

### Q2097
**Según la evaluación oficial del módulo: un área de trabajo de Azure Machine Learning ejecuta canalizaciones de entrenamiento automatizadas sin intervención humana y debe acceder a datos de Azure Storage; el equipo de seguridad prohíbe cualquier credencial almacenada en código o configuración. ¿Qué entidad de Microsoft Entra ID se debe configurar?**

A) Crear un principal de servicio con secreto de cliente, almacenar el secreto en Azure Key Vault, y configurar el área de trabajo para recuperarlo en cada ejecución de la canalización
B) Crear una identidad administrada asignada por el usuario, asignarla a varias áreas de trabajo de ML en distintos proyectos, y concederle el rol Colaborador a nivel de suscripción para máxima flexibilidad
C) Habilitar la identidad administrada asignada por el sistema en el área de trabajo de ML, y concederle el rol "Lector de datos de Storage Blob" en la cuenta de almacenamiento ✅
D) Configurar una cuenta de usuario dedicada exclusivamente a la ejecución de canalizaciones automatizadas

**Explicación:** Esta es la respuesta oficial de la evaluación del módulo. Un principal de servicio sigue requiriendo un secreto (aunque esté en Key Vault, introduce gestión de rotación); una identidad asignada por el usuario con rol Colaborador a nivel de suscripción es excesivamente amplia (viola privilegio mínimo). La identidad administrada asignada por el sistema, con el rol específico y mínimo necesario ("Lector de datos de Storage Blob"), elimina por completo las credenciales almacenadas mientras respeta el principio de privilegio mínimo.

---

### Q2098
**Según la evaluación oficial del módulo: tres unidades de negocio (Healthcare/HIPAA, Financial Services/PCI-DSS, Retail/estándar) necesitan controles de cumplimiento distintos, pero todas deben seguir una línea base de seguridad común (cifrado obligatorio, regiones aprobadas). ¿Cómo se deben estructurar los ámbitos de gobernanza de Azure?**

A) Una sola suscripción con tres grupos de recursos (uno por unidad de negocio), usando exenciones de Azure Policy para aplicar controles de cumplimiento diferentes a cada grupo
B) Crear tres grupos de administración independientes (uno por unidad de negocio) sin ningún elemento primario compartido, configurando manualmente directivas idénticas de línea base en cada uno
C) Aplicar todas las directivas de cumplimiento (HIPAA, PCI-DSS y estándar) simultáneamente a cada recurso, sin ninguna diferenciación por unidad de negocio
D) Crear un grupo de administración con directivas de toda la organización, y luego crear suscripciones independientes por unidad de negocio que aplican directivas de cumplimiento específicas, con todas las suscripciones heredando la línea base de seguridad del grupo de administración ✅

**Explicación:** Esta es la respuesta oficial de la evaluación del módulo. Usar exenciones para diferencias de cumplimiento estructurales (no excepciones puntuales) es un mal uso del mecanismo de exención; duplicar manualmente la línea base en grupos de administración sin jerarquía compartida elimina el beneficio de herencia automática. La estructura correcta usa la herencia jerárquica real: un grupo de administración padre aplica la línea base común una sola vez, y cada suscripción hija (por unidad de negocio) añade sus requisitos normativos específicos sin duplicar nada.

---

### Q2099
**Según la evaluación oficial del módulo: el equipo de seguridad quiere que las nuevas cuentas de Azure Storage tengan registro de diagnóstico habilitado automáticamente (sin configuración manual) Y que las cuentas existentes sin esa configuración se identifiquen para corrección. ¿Qué combinación de efectos de Azure Policy logra ambos objetivos de forma más eficaz?**

A) Asignar una única directiva con efecto DeployIfNotExists que implemente automáticamente la configuración de diagnóstico en cuentas de almacenamiento nuevas, y crear tareas de corrección para las cuentas existentes — logrando prevención y corrección automatizada en una sola directiva ✅
B) Asignar una directiva con efecto Deny que bloquee la creación de cuentas sin configuración de diagnóstico, y luego configurar manualmente el registro en las cuentas existentes no compatibles identificadas mediante revisión del portal
C) Asignar una directiva con efecto Audit que genere informes de cuentas no conformes, y luego crear una segunda asignación separada con efecto DeployIfNotExists que agregue configuraciones a cuentas nuevas y existentes
D) No asignar ninguna directiva y confiar exclusivamente en revisiones de seguridad manuales trimestrales

**Explicación:** Esta es la respuesta oficial de la evaluación del módulo. La opción Deny requiere corrección manual de lo existente (no logra el segundo objetivo de forma automatizada); usar dos asignaciones separadas (Audit + DeployIfNotExists) es innecesariamente complejo cuando una sola directiva DeployIfNotExists ya cubre ambos casos: previene la no conformidad en recursos nuevos automáticamente, y permite lanzar tareas de corrección sobre los recursos existentes no conformes desde la misma definición de directiva.

---

### Q2100
**Según el resumen del módulo, ¿cómo se combinan las tres capas de control (identidad, ámbitos, directiva) para crear "defensa en profundidad" en la infraestructura de IA?**

A) Son tres capas redundantes que hacen exactamente lo mismo; solo se necesita una de ellas para tener seguridad completa
B) La identidad restringe QUIÉN puede acceder a los recursos, los ámbitos determinan DÓNDE se aplican las directivas, y la directiva aplica QUÉ configuraciones se permiten — la combinación de las tres capas crea una posición de seguridad completa ✅
C) Solo la capa de identidad importa; los ámbitos y las directivas son opcionales y no aportan seguridad real
D) Las tres capas deben configurarse en un orden estrictamente secuencial y nunca pueden modificarse una vez establecidas

**Explicación:** Esta es una de las conclusiones clave del resumen del módulo: cada capa responde una pregunta distinta y complementaria — identidad (quién), ámbito (dónde) y directiva (qué) — y es precisamente la combinación en capas de estos tres controles, no cualquiera de ellos por separado, lo que produce una defensa en profundidad real para la infraestructura de IA de producción.

---
