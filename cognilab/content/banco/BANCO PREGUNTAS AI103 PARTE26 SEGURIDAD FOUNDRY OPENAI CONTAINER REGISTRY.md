# BANCO DE PREGUNTAS AI-103 — PARTE 26 (Q1994-Q2030)
## Domain 1 (real): Plan and Manage an Azure AI Solution — gobernanza de seguridad de Microsoft Foundry Hub, protección de Azure OpenAI/Cognitive Services, Azure Container Registry, aislamiento de red y claves administradas por el cliente
### Generado: 2026-08-22 | Fuente: módulo MS Learn "Implementación de una infraestructura segura preparada para IA con servicios de Azure"

---

### Q1994
**Un equipo de seguridad administra cinco proyectos de inteligencia artificial usando grupos de recursos de Azure tradicionales, cada uno con sus propias redes virtuales e identidades administradas independientes. ¿Qué problema central resuelve un Microsoft Foundry Hub frente a este enfoque?**

A) El Hub actúa como capa de cumplimiento de directivas configurada una sola vez (aislamiento de red, identidad, protección de datos); cada proyecto conectado hereda automáticamente esos controles, eliminando la configuración repetida y las "islas de seguridad" donde un equipo aplica reglas distintas a otro ✅
B) El Hub elimina por completo la necesidad de cualquier control de identidad o red, ya que todos los proyectos quedan públicamente accesibles por diseño
C) El Hub solo sirve para centralizar la facturación de los cinco proyectos; la configuración de seguridad sigue siendo responsabilidad individual de cada proyecto
D) El Hub reemplaza a Microsoft Entra ID como sistema de identidad, gestionando sus propias credenciales independientes por proyecto

**Explicación:** El módulo describe explícitamente este desafío: sin un Hub, el equipo de seguridad configura puntos de conexión privados, identidades administradas y registro de auditoría por separado en cada proyecto, multiplicando la sobrecarga y el riesgo de desfase de configuración. El Hub resuelve esto centralizando la línea base de seguridad y propagándola automáticamente por herencia a todos los proyectos conectados.

---

### Q1995
**Cuando el equipo de seguridad necesita responder a un nuevo requisito de cumplimiento normativo en una organización con cinco proyectos de Foundry conectados al mismo Hub, ¿qué cambia respecto a un enfoque sin Hub?**

A) Debe seguir actualizando cada uno de los cinco entornos por separado; el Hub no afecta el proceso de actualización de directivas
B) Modifica la directiva del Hub una sola vez y todos los proyectos conectados heredan el cambio inmediatamente, reduciendo la ventana de cumplimiento de semanas a horas ✅
C) Debe eliminar y volver a crear los cinco proyectos desde cero para que adopten la nueva directiva
D) Solo el proyecto marcado como "predeterminado" recibe la actualización automáticamente; los demás requieren configuración manual

**Explicación:** Esta es la ventaja operativa central de la herencia de directivas: un cambio en el Hub se propaga de inmediato a todos los proyectos conectados, sin tocarlos individualmente, lo que el módulo cuantifica como una reducción de la ventana de cumplimiento de semanas a horas.

---

### Q1996
**Los proyectos de detección de fraudes y de servicio al cliente están conectados al mismo Microsoft Foundry Hub. ¿Pueden los científicos de datos del proyecto de detección de fraudes acceder a los conjuntos de datos del proyecto de servicio al cliente?**

A) Sí, automáticamente, ya que compartir el mismo Hub implica compartir todos los datos de todos los proyectos conectados
B) Solo si ambos proyectos usan el mismo modelo de IA implementado
C) No — cada proyecto funciona como un área de trabajo aislada con sus propios recursos de proceso, almacenamiento y conexiones; los datos están aislados entre proyectos aunque compartan el mismo Hub ✅
D) Solo el administrador del Hub puede decidir esto manualmente proyecto por proyecto, sin ninguna configuración por defecto

**Explicación:** El módulo distingue claramente entre la herencia de controles de seguridad (que sí es automática y compartida vía el Hub) y el aislamiento de datos entre proyectos (que se mantiene por defecto). Ambos proyectos heredan las mismas reglas de línea base, pero sus datos, modelos y conjuntos de entrenamiento permanecen aislados entre sí.

---

### Q1997
**¿Qué tipo de configuraciones aplica el Hub como "no negociables" que los proyectos individuales NO pueden deshabilitar, según el módulo?**

A) El nombre del proyecto y su descripción
B) La elección del modelo de lenguaje que cada equipo puede usar
C) El presupuesto de facturación asignado a cada proyecto
D) Puntos de conexión privados, identidades administradas obligatorias y cifrado en reposo — la línea base de seguridad del Hub ✅

**Explicación:** El módulo describe la herencia de directivas como un "firewall de seguridad con reglas de línea base obligatorias": puntos de conexión privados, identidades administradas y cifrado en reposo se aplican a nivel de Hub y los proyectos no pueden desactivarlos, aunque sí pueden personalizar permisos y recursos específicos dentro de esos límites.

---

### Q1998
**¿Cuáles son los tres servicios de seguridad fundamentales que integra un Microsoft Foundry Hub, según el módulo?**

A) Microsoft Entra ID (identidad/RBAC), Azure Virtual Network (aislamiento de red vía puntos de conexión privados) y Azure Key Vault (protección de secretos/claves) ✅
B) Azure DevOps, GitHub Actions y Azure Pipelines
C) Azure Monitor, Application Insights y Log Analytics exclusivamente
D) Azure Front Door, Azure CDN y Traffic Manager

**Explicación:** El módulo enumera explícitamente estos tres componentes como el núcleo de la arquitectura de seguridad del Hub: Entra ID centraliza identidad y RBAC, Virtual Network provee conectividad privada mediante puntos de conexión privados, y Key Vault protege secretos, certificados y claves de cifrado con registro de acceso y rotación automática.

---

### Q1999
**TRAMPA: Un desarrollador afirma que, tras habilitar identidades administradas, ya nunca es necesario usar claves de API en ningún escenario dentro de una arquitectura de Foundry Hub. ¿Es correcta esta afirmación según el módulo?**

A) Sí, las identidades administradas eliminan por completo cualquier uso de claves de API en cualquier circunstancia
B) No es del todo correcta: aunque las identidades administradas son el método preferido, algunas aplicaciones heredadas o integraciones de terceros aún requieren claves de API — en ese caso, el módulo recomienda almacenarlas en Azure Key Vault y que las aplicaciones las recuperen en tiempo de ejecución mediante referencias de Key Vault, nunca insertadas en código ✅
C) No, porque las identidades administradas solo funcionan con Azure OpenAI y nunca con Cognitive Services
D) Sí, porque Azure Key Vault ha quedado obsoleto desde la introducción de las identidades administradas

**Explicación:** El módulo es explícito sobre este enfoque híbrido: las identidades administradas son la opción preferida y eliminan el problema de raíz, pero para escenarios legados o de terceros que aún necesitan claves, la recomendación no es "prohibir las claves" sino centralizarlas en Key Vault con referencias por URI, evitando que aparezcan hardcodeadas en configuración o código fuente.

---

### Q2000
**Por defecto, ¿cómo aceptan conexiones Azure OpenAI Service y Cognitive Services, y qué riesgo crea esto según el módulo?**

A) Por defecto solo aceptan conexiones desde dentro de la misma red virtual; no existe riesgo de exposición pública
B) Por defecto requieren un certificado de cliente y rechazan cualquier tráfico sin ese certificado
C) Por defecto aceptan conexiones desde la red pública de Internet, creando posible exposición a ataques por fuerza bruta, intentos de filtración de datos y sondeos de acceso no autorizado ✅
D) Por defecto están completamente deshabilitados hasta que se configura manualmente un punto de conexión público

**Explicación:** El módulo señala este comportamiento por defecto como el punto de partida del problema de aislamiento de red: sin configuración adicional, el tráfico puede fluir por Internet pública, lo que expone el servicio a los vectores de ataque mencionados — de ahí la necesidad de implementar puntos de conexión privados.

---

### Q2001
**¿Cómo funciona un punto de conexión privado para Azure OpenAI Service, y qué ruta sigue el tráfico de API una vez configurado?**

A) Cifra el tráfico público de Internet sin cambiar la ruta de red que sigue
B) Redirige el tráfico a través de un proxy de terceros fuera de Azure para anonimizar el origen de las solicitudes
C) Solo bloquea direcciones IP específicas de una lista negra, pero el tráfico sigue pasando por Internet pública
D) Crea una interfaz de red dentro de la Virtual Network con una IP privada asignada al servicio; todo el tráfico permanece dentro de la red troncal de Azure, sin enrutamiento por Internet pública ✅

**Explicación:** El punto de conexión privado asigna una IP privada de la subred de la red virtual al servicio; las aplicaciones dentro de esa red (incluidos los proyectos de Foundry conectados) acceden mediante esa IP privada, y el tráfico nunca sale del backbone privado de Azure — a diferencia de simplemente "cifrar" tráfico que sigue viajando por rutas públicas.

---

### Q2002
**Un equipo necesita que estaciones de trabajo de desarrolladores remotos y centros de datos locales accedan a servicios de IA protegidos por puntos de conexión privados. ¿Qué debe configurar el equipo según el módulo?**

A) Azure VPN Gateway o ExpressRoute, para extender la conectividad de red privada a esas ubicaciones externas manteniendo el límite de seguridad ✅
B) Deshabilitar el punto de conexión privado temporalmente cada vez que un desarrollador remoto necesite acceso
C) Compartir una clave de API pública generada específicamente para accesos remotos
D) No existe ninguna forma de dar acceso remoto sin exponer el servicio a Internet pública

**Explicación:** El módulo cubre exactamente este escenario: cuando se necesita conectividad desde fuera de la red virtual (sedes locales o trabajadores remotos), la solución es extender la red privada mediante VPN Gateway o ExpressRoute, no abrir el servicio a Internet pública ni deshabilitar el aislamiento.

---

### Q2003
**¿Cuáles son las cuatro categorías de daño que analiza el filtrado de contenido integrado de Azure OpenAI Service, tanto en las solicitudes de entrada como en las respuestas generadas?**

A) Spam, malware, phishing y desinformación
B) Odio, sexual, violencia y autolesión — cada una con umbrales de gravedad configurables (bajo, medio, alto) ✅
C) Gramática, ortografía, coherencia y fluidez
D) Latencia, costo, throughput y disponibilidad

**Explicación:** El módulo describe estas cuatro categorías estándar del filtrado de contenido de Azure OpenAI, cada una configurable con umbrales de gravedad según la tolerancia al riesgo de la organización — por ejemplo, bloquear TODO el contenido de violencia en una app de servicio al cliente, mientras un sistema de detección de fraudes permite mayor tolerancia en ciertos contextos.

---

### Q2004
**Una empresa de servicios financieros necesita bloquear respuestas que contengan frases como "Recomiendo comprar" o "Debería invertir" por regulación, algo que las cuatro categorías estándar de filtrado de contenido no cubren directamente. ¿Qué solución describe el módulo?**

A) Cambiar el modelo de lenguaje a uno más pequeño que genere respuestas más cortas
B) Desactivar completamente el filtrado de contenido, ya que las categorías estándar son obligatorias y no se pueden extender
C) Crear filtros de contenido personalizados que detecten frases específicas y bloqueen la respuesta o inserten las declinaciones de responsabilidad necesarias ✅
D) Solicitar a Microsoft que agregue una quinta categoría estándar antes de poder cumplir con la regulación

**Explicación:** El módulo presenta exactamente este caso como ejemplo de gobernanza de contenido en capas: cuando las categorías estándar (odio, sexual, violencia, autolesión) no cubren un requisito normativo específico, se combinan con filtros de contenido personalizados adaptados al caso de uso, sin necesidad de deshabilitar el filtrado base.

---

### Q2005
**Una organización necesita garantizar que los datos de clientes de la UE permanezcan dentro del Espacio Económico Europeo al usar Azure OpenAI Service. ¿Qué dos configuraciones combinadas garantizan el cumplimiento completo de residencia de datos, según el módulo?**

A) Habilitar únicamente el filtrado de contenido con reglas de barrera geográfica que bloqueen IPs fuera de la UE
B) Desplegar réplicas del servicio en todas las regiones globales simultáneamente para promediar la latencia
C) Cambiar el idioma de la interfaz del modelo a un idioma europeo
D) Implementar el recurso de OpenAI en una región europea (p. ej. Oeste de Europa) Y configurar el área de trabajo de Log Analytics para el registro de diagnóstico en esa misma región ✅

**Explicación:** Esta es una de las preguntas de la evaluación oficial del módulo. Elegir una región europea para el recurso de OpenAI asegura que el entrenamiento, la inferencia y el almacenamiento ocurran ahí — pero si los registros de diagnóstico se envían a un área de trabajo de Log Analytics en otra región, la residencia de datos queda incompleta. Ambas configuraciones deben alinearse geográficamente.

---

### Q2006
**¿Qué beneficios de cumplimiento aporta habilitar el registro de diagnóstico completo (solicitudes de API, decisiones de filtro de contenido, eventos de acceso) hacia un área de trabajo de Log Analytics, según las cifras citadas en el módulo?**

A) Reduce el tiempo de preparación de auditoría en 60% y proporciona visibilidad de patrones de uso de IA que informan el planeamiento de capacidad ✅
B) Ningún beneficio medible; es solo un requisito burocrático sin impacto real
C) Aumenta la latencia de las llamadas API en aproximadamente 500 ms por solicitud registrada
D) Solo sirve para facturación, no tiene relación con auditorías de cumplimiento

**Explicación:** El módulo cita esta cifra específica: las organizaciones que implementan un registro de diagnóstico completo reducen el tiempo de preparación de auditoría en 60%, además de obtener visibilidad operativa sobre los patrones de uso que ayuda al planeamiento de capacidad — más allá del mero cumplimiento normativo.

---

### Q2007
**En una implementación de producción con AKS, la aplicación de detección de fraudes usa una identidad administrada asignada a su pod para autenticarse en Azure OpenAI. ¿Dónde se almacenan las credenciales en este flujo?**

A) En un secreto de Kubernetes cifrado dentro del clúster de AKS
B) En ningún lugar: no hay credenciales almacenadas en las imágenes de contenedor ni en secretos de Kubernetes; la identidad administrada obtiene tokens dinámicamente ✅
C) En una variable de entorno del pod, cifrada con una clave gestionada por el propio clúster
D) En un archivo de configuración montado como volumen persistente en el pod

**Explicación:** Esta es la ventaja central de las identidades administradas frente a cualquier forma de credencial almacenada (incluidos los secretos de Kubernetes): el pod obtiene tokens de Entra ID dinámicamente en tiempo de ejecución, sin que ninguna credencial persista en la imagen del contenedor, en secretos de Kubernetes ni en archivos de configuración.

---

### Q2008
**Según la evaluación oficial del módulo: el equipo de detección de fraudes reporta errores de autenticación al llamar a Azure OpenAI Service después de configurar una identidad administrada en un pod de AKS que antes usaba claves de API en secretos de Kubernetes. ¿Cuál es la causa más probable?**

A) Las identidades administradas no pueden autenticarse en Azure OpenAI Service desde pods de AKS y siempre requieren claves de API en Key Vault
B) La configuración del punto de conexión privado está bloqueando la validación de tokens y requiere una regla de excepción
C) La identidad del pod de AKS necesita tener asignado el rol "Cognitive Services OpenAI User" en el ámbito de Azure OpenAI Service mediante Azure RBAC — sin esa asignación de rol, el token es válido pero no autorizado ✅
D) Es necesario reiniciar el clúster completo de AKS después de habilitar cualquier identidad administrada

**Explicación:** Esta es la respuesta oficial de la evaluación del módulo. El error más común al migrar de claves de API a identidad administrada no es que la identidad "no funcione", sino que falta la asignación de rol RBAC correspondiente: la identidad se autentica correctamente (obtiene un token válido de Entra ID) pero Azure OpenAI la rechaza por falta de autorización si no tiene el rol adecuado asignado en su ámbito.

---

### Q2009
**¿Qué mecanismo usa Azure Container Registry (ACR) para detectar vulnerabilidades en imágenes de contenedores de IA antes de su implementación en producción?**

A) Un análisis manual realizado por el equipo de seguridad antes de cada despliegue, revisando el código fuente línea por línea
B) Un firewall de aplicaciones web (WAF) que inspecciona el tráfico de red del contenedor en tiempo de ejecución
C) La firma digital de Docker Content Trust, que por sí sola detecta vulnerabilidades de software en las dependencias
D) Microsoft Defender para Contenedores, que examina automáticamente cada capa de la imagen al insertarse en ACR, generando un informe con CVE detectadas, clasificación de gravedad y pasos de corrección ✅

**Explicación:** El módulo distingue claramente el análisis de vulnerabilidades (Microsoft Defender para Contenedores, que examina capas de imagen contra bases de datos de CVE) de la confianza de contenido (firmas digitales que verifican integridad y origen, pero no analizan vulnerabilidades de software) — son mecanismos complementarios pero distintos.

---

### Q2010
**Un CVE crítico se publica en la biblioteca OpenSSL una mañana de martes, afectando una imagen de contenedor creada tres meses atrás y ya almacenada en ACR. Con Microsoft Defender para Contenedores habilitado, ¿qué ocurre?**

A) El examen de vulnerabilidades se actualiza automáticamente contra la base de datos de CVE actualizada, y Defender vuelve a examinar todas las imágenes del registro, identificando la nueva vulnerabilidad crítica y alertando al equipo de seguridad vía Azure Monitor ✅
B) Defender solo detecta vulnerabilidades presentes en el momento de la inserción original de la imagen; nunca vuelve a examinarla después
C) Es necesario volver a subir manualmente la imagen a ACR para que Defender la vuelva a examinar
D) Defender elimina automáticamente la imagen del registro sin posibilidad de recuperación ni corrección

**Explicación:** El módulo describe exactamente este escenario para ilustrar el valor del examen continuo: Defender re-examina automáticamente todas las imágenes existentes cuando se publican nuevos CVE, sin requerir una nueva inserción manual — reduciendo la ventana de exposición de semanas (con revisiones programadas tradicionales) a horas.

---

### Q2011
**Según cifras citadas en el módulo, ¿qué mejora reportan las organizaciones que implementan análisis automatizado de vulnerabilidades de contenedores frente a revisiones de seguridad manuales?**

A) Ninguna mejora medible; el análisis automatizado y el manual tienen resultados equivalentes
B) Una reducción del 85% en el tiempo de corrección de vulnerabilidades y identificación de problemas críticos 95% más rápido ✅
C) Una reducción del 10% en costos de almacenamiento del registro, sin impacto en tiempos de detección
D) Un aumento del 50% en el tiempo de implementación debido a la sobrecarga del análisis

**Explicación:** El módulo cita estas cifras específicas al describir el valor de escalar el análisis automatizado en organizaciones con muchos contenedores de modelos: 85% de reducción en tiempo de corrección y 95% más de velocidad en identificar problemas críticos, frente al seguimiento manual.

---

### Q2012
**¿Cuál es la diferencia entre los roles RBAC de todo el registro (AcrPush, AcrPull, AcrDelete) y los tokens con ámbito de repositorio en Azure Container Registry?**

A) Son exactamente lo mismo; solo cambia el nombre de la funcionalidad
B) Los tokens con ámbito de repositorio solo pueden usarse para operaciones de lectura, nunca de escritura
C) Los roles RBAC conceden permisos sobre todo el registro (adecuados para administradores/CI-CD que gestionan varios repositorios), mientras que los tokens con ámbito de repositorio permiten limitar el acceso a repositorios específicos, evitando que un equipo acceda a los contenedores de otro ✅
D) Los roles RBAC solo aplican a usuarios humanos; nunca pueden asignarse a identidades administradas o entidades de servicio

**Explicación:** El módulo presenta este contraste explícitamente: los roles RBAC de Azure dan acceso a todo el registro, mientras que un token con ámbito de repositorio (como "fraud-detection-ci" con permiso de inserción solo en el repositorio "fraud-detection") ofrece control granular, evitando que un equipo modifique o extraiga imágenes de repositorios ajenos.

---

### Q2013
**¿Cómo extrae Azure Machine Learning o un clúster de AKS las imágenes de contenedor desde ACR sin usar tokens con ámbito de repositorio, según el módulo?**

A) Mediante una contraseña compartida entre todos los miembros del equipo, almacenada en un archivo de texto plano
B) Descargando manualmente cada imagen y subiéndola después a un almacenamiento local antes del despliegue
C) A través de una API pública sin autenticación, disponible solo para direcciones IP internas de Azure
D) Usando su propia identidad administrada, a la que se le asigna el rol AcrPull en el ámbito del repositorio correspondiente — eliminando la necesidad de rotar, proteger o exponer tokens ✅

**Explicación:** El módulo describe este patrón como la eliminación completa de la administración de tokens: la identidad administrada del área de trabajo (o del clúster) se autentica directamente con el rol AcrPull asignado en el ámbito del repositorio, proporcionando registros de auditoría vía Entra ID sin credenciales que gestionar.

---

### Q2014
**TRAMPA: Un ingeniero de seguridad afirma que habilitar la confianza de contenido (Content Trust) en Azure Container Registry es suficiente por sí solo para detectar vulnerabilidades de software (CVE) en las imágenes de contenedor. ¿Es correcta esta afirmación?**

A) No — la confianza de contenido verifica la identidad del publicador y la integridad de la imagen mediante firmas digitales (evita imágenes no firmadas o alteradas), pero NO analiza vulnerabilidades de software; esa es la función de Microsoft Defender para Contenedores ✅
B) Sí, la confianza de contenido analiza el código de cada capa en busca de CVE conocidas antes de permitir la inserción
C) Sí, ya que Content Trust y Microsoft Defender para Contenedores son en realidad el mismo servicio con dos nombres distintos
D) No, porque Content Trust ha sido descontinuado y reemplazado completamente por Defender

**Explicación:** El módulo distingue con claridad estos dos mecanismos como capas de seguridad complementarias pero independientes: la confianza de contenido protege contra manipulación e imágenes no autorizadas (firma digital, hash criptográfico), mientras que el examen de vulnerabilidades de Defender identifica CVE en las dependencias del software. Confundirlos lleva a una falsa sensación de cobertura completa.

---

### Q2015
**Un atacante obtiene acceso temporal a una instancia de ACR con confianza de contenido habilitada e intenta insertar un contenedor de detección de fraudes modificado con código de puerta trasera. ¿Qué ocurre?**

A) La imagen se inserta sin problema, ya que la confianza de contenido solo se aplica a las operaciones de extracción (pull), no de inserción (push)
B) El atacante no puede completar la inserción de forma válida porque no posee la clave de firma; y aunque lograra insertarla, la imagen carecería de firma digital válida y los sistemas de implementación la rechazarían al extraerla ✅
C) La imagen se inserta y se implementa automáticamente sin ninguna verificación adicional
D) ACR bloquea automáticamente la cuenta del atacante de forma permanente, sin posibilidad de que continúe operando en la organización

**Explicación:** El módulo describe este escenario como ejemplo de defensa en profundidad: sin la clave de firma privada, el atacante no puede producir una firma digital válida para la imagen maliciosa, y los sistemas de implementación (que verifican la firma en el almacén de confianza) la rechazarían durante las operaciones de extracción — protegiendo contra amenazas tanto externas como internas.

---

### Q2016
**Una infraestructura de IA abarca tres regiones de Azure (Este de EE. UU., Oeste de Europa, Sudeste Asiático) y todas dependen de una única instancia de ACR en Este de EE. UU. ¿Qué dos problemas resuelve la replicación geográfica de ACR en este escenario?**

A) Solo resuelve el problema de costos de almacenamiento, sin ningún efecto sobre latencia o disponibilidad
B) Convierte automáticamente las imágenes a un formato específico para cada región, optimizando su tamaño
C) Reduce los tiempos de extracción de imágenes (al servir desde una réplica local por región) y elimina el punto único de error si la región primaria sufre una interrupción ✅
D) Elimina por completo la necesidad de Microsoft Defender para Contenedores en regiones secundarias

**Explicación:** El módulo cuantifica ambos beneficios: la replicación geográfica reduce los tiempos de extracción en 70% al servir desde réplicas locales por región, y además proporciona recuperación ante desastres — si la región primaria falla, las aplicaciones continúan extrayendo imágenes de réplicas sanas en otras regiones, sin intervención manual tras la configuración inicial.

---

### Q2017
**Según la evaluación oficial del módulo: Microsoft Defender detectó un CVE crítico en TensorFlow dentro de un contenedor de detección de fraudes, pero el pipeline de implementación todavía permite que la imagen vulnerable llegue a producción. ¿Qué cambio de configuración impide específicamente ese despliegue?**

A) Habilitar la confianza de contenido en ACR para requerir firmas digitales, que bloquean automáticamente imágenes con vulnerabilidades de seguridad
B) Configurar Microsoft Defender para poner en cuarentena automáticamente las imágenes vulnerables moviéndolas a un repositorio con permisos restringidos
C) Aumentar la frecuencia del examen de Defender de diario a cada hora
D) Implementar Azure Policy con una definición de directiva personalizada que deniegue despliegues de pods de AKS cuando la imagen de contenedor de origen tenga CVE de gravedad crítica o alta sin resolver ✅

**Explicación:** Esta es la respuesta oficial de la evaluación del módulo, y expone un matiz importante: Microsoft Defender DETECTA la vulnerabilidad, pero detectar no es lo mismo que BLOQUEAR el despliegue. La confianza de contenido verifica firmas, no CVE (ver Q2014). La solución real es una directiva de Azure Policy que impida explícitamente el despliegue de imágenes con vulnerabilidades críticas/altas sin resolver — cerrando la brecha entre detección y aplicación.

---

### Q2018
**¿Qué son los "hosts de capacidad" (capability hosts) en el contexto del entorno estándar de agentes de Microsoft Foundry, y qué característica clave tienen una vez creados?**

A) Son construcciones de configuración que describen cómo funcionan los agentes y dónde se almacena su estado (almacenamiento multiinquilino vs. recursos propiedad del cliente); son inmutables una vez creados — cambiarlos requiere eliminar y volver a aprovisionar ✅
B) Son servidores físicos dedicados que la organización debe comprar por separado para cada agente
C) Son un tipo de máquina virtual optimizada exclusivamente para entrenamiento de modelos
D) Son plantillas de facturación que determinan el costo mensual del proyecto de Foundry

**Explicación:** El módulo describe los hosts de capacidad como el mecanismo que vincula un proyecto de Foundry con sus recursos de almacenamiento de estado (a nivel de cuenta, habilitan la funcionalidad de Agentes; a nivel de proyecto, definen si se usa almacenamiento administrado por la plataforma o recursos propiedad del cliente). Su inmutabilidad es una característica de diseño explícita: no se pueden modificar tras el aprovisionamiento.

---

### Q2019
**¿Cuáles son los tres modos de configuración de entorno que admite Foundry Agent Service, en orden de menor a mayor control/seguridad?**

A) Development, Staging, Production
B) Configuración básica (almacenamiento administrado por la plataforma) → Configuración estándar (recursos de Azure propiedad del cliente) → Configuración estándar con aislamiento de red (red virtual administrada por el cliente) ✅
C) Free, Standard, Enterprise
D) Manual, Semiautomático, Totalmente automatizado

**Explicación:** El módulo describe estos tres modos como un espectro que equilibra velocidad, control y seguridad: Basic prioriza la incorporación rápida con almacenamiento gestionado por la plataforma (compatible con OpenAI Assistants); Standard usa recursos propios del cliente (Storage, AI Search, Cosmos DB) para propiedad y control total de los datos; Standard con aislamiento de red añade que todo el entorno opere dentro de una red virtual administrada por el cliente.

---

### Q2020
**En el entorno de agente Estándar con aislamiento de red, ¿qué recurso Azure se usa específicamente para el historial de conversaciones, mensajes del sistema y metadatos del agente?**

A) Azure Blob Storage exclusivamente
B) Azure SQL Database
C) Azure Cosmos DB para NoSQL ✅
D) Azure Table Storage

**Explicación:** El módulo especifica que, en el entorno Estándar, el estado del agente se distribuye entre tres servicios propiedad del cliente con roles distintos: Azure Storage para carga de archivos y datos intermedios, Azure AI Search para índices vectoriales de búsqueda, y Azure Cosmos DB para NoSQL específicamente para el historial de conversaciones, mensajes del sistema y metadatos del agente.

---

### Q2021
**Al aprovisionar una red virtual para un entorno de agente estándar de Foundry con aislamiento de red (BYO VNet), ¿a qué servicio se delega la subred del agente, y qué aloja la subred del punto de conexión privado?**

A) La subred del agente se delega a Microsoft.Storage/accounts; la subred del punto de conexión privado aloja únicamente el tráfico DNS
B) Ambas subredes cumplen exactamente la misma función y son intercambiables
C) La subred del agente no requiere delegación a ningún servicio de Azure
D) La subred del agente se delega a Microsoft.App/environments (aloja el cliente del agente); la subred del punto de conexión privado aloja los puntos de conexión privados de los recursos BYO asociados (Cosmos DB, AI Search, Storage) ✅

**Explicación:** El módulo detalla esta configuración de red específica: la subred del agente (recomendada en tamaño /24) se delega a Microsoft.App/environments para alojar el entorno de ejecución del agente, mientras que la subred separada de puntos de conexión privados aloja la conectividad privada hacia los recursos "traídos por el cliente" (Cosmos DB, AI Search, Storage) asociados a Microsoft Foundry.

---

### Q2022
**Antes de eliminar un recurso de cuenta de Microsoft Foundry que tiene un host de capacidad configurado, ¿qué paso es esencial según el módulo, y qué error puede ocurrir si se omite?**

A) Es esencial eliminar primero el host de capacidad asociado (o purgar completamente la cuenta); omitir esto puede dejar dependencias residuales, como subredes vinculadas, causando errores como "Subnet already in use" al reutilizar la subred en otro despliegue ✅
B) No hay ningún paso previo necesario; se puede eliminar la cuenta directamente en cualquier momento
C) Es necesario primero degradar el modelo del agente a la configuración Básica antes de cualquier eliminación
D) Basta con cambiar el nombre del recurso; la eliminación real ocurre automáticamente después de 90 días

**Explicación:** El módulo advierte explícitamente sobre este orden de operaciones: eliminar solo la cuenta no es suficiente, hay que purgarla para que se dispare la eliminación del host de capacidad asociado; de lo contrario, recursos como subredes quedan vinculados residualmente y generan errores como "Subnet already in use" en despliegues posteriores que intenten reutilizar esa subred.

---

### Q2023
**¿Cuáles son los dos aspectos principales de aislamiento de red a abordar en un entorno de Microsoft Foundry Hub, según el módulo?**

A) Restricciones de horario (cuándo puede accederse) y restricciones de idioma (en qué idioma se procesan las solicitudes)
B) Restricciones de acceso de entrada (quién puede acceder al Hub, vía puntos de conexión privados) y restricciones de acceso de salida (cómo los recursos del Hub acceden a servicios externos, vía una red virtual administrada) ✅
C) Restricciones de tamaño de archivo y restricciones de formato de imagen únicamente
D) Solo existe un aspecto de aislamiento de red: el bloqueo total de cualquier tráfico de red

**Explicación:** El módulo estructura el aislamiento de red del Hub en estos dos ejes: entrada (deshabilitar el acceso público de Internet y habilitar acceso vía puntos de conexión privados desde la VNet designada u on-premises vía VPN/ExpressRoute) y salida (una red virtual administrada que Foundry crea y mantiene automáticamente, enrutando el tráfico saliente de cómputo solo a destinos explícitamente aprobados).

---

### Q2024
**¿Cuáles son los tres modos de acceso saliente que admite una red virtual administrada de Microsoft Foundry Hub, y cuál de ellos implica costos adicionales de Azure Firewall?**

A) Solo existe un modo de salida posible: bloqueo total sin excepciones
B) Fast, Standard y Slow, diferenciados únicamente por el ancho de banda disponible
C) Allow internet outbound (sin restricción), Allow only approved outbound (destinos definidos por service tags/puntos de conexión privados/FQDN) y Disabled (sin aislamiento); las reglas basadas en FQDN en el modo "approved" despliegan Azure Firewall, generando costos adicionales ✅
D) Ninguno de los tres modos tiene impacto en el costo de la suscripción de Azure

**Explicación:** El módulo describe estos tres modos: "Allow internet outbound" permite salida sin restricciones (útil para repositorios públicos de paquetes), "Allow only approved outbound" restringe el tráfico a destinos explícitos mediante service tags, puntos de conexión privados o FQDN — y específicamente las reglas basadas en FQDN requieren desplegar Azure Firewall, con el costo correspondiente — y "Disabled" deja el acceso de entrada y salida sin restricciones administradas.

---

### Q2025
**¿Qué recursos de Azure se conectan típicamente mediante puntos de conexión privados cuando el aislamiento de red está habilitado en un Foundry Hub, según el módulo?**

A) Únicamente Azure Storage; ningún otro servicio dependiente admite puntos de conexión privados
B) Solo los servicios de facturación y monitoreo de costos
C) Exclusivamente bases de datos SQL, sin relación con almacenamiento ni registro de contenedores
D) Azure Storage Account (datos/artefactos/modelos), Azure Key Vault (secretos/claves/credenciales), Azure Container Registry (imágenes Docker) y Azure AI Services como Azure OpenAI/Cognitive Services (APIs de modelo/inferencia) ✅

**Explicación:** El módulo enumera estos cuatro tipos de recursos dependientes como los que típicamente requieren conectividad privada cuando el aislamiento de red está habilitado: Storage para datos y artefactos, Key Vault para secretos y claves, ACR para imágenes de contenedor, y los servicios de IA de Azure para las APIs de modelo e inferencia — todos accesibles exclusivamente vía Private Link en un entorno completamente aislado.

---

### Q2026
**¿Qué son las claves administradas por el cliente (CMK) en Microsoft Foundry, y qué distinción existe frente al cifrado por defecto?**

A) Todos los recursos de Foundry se cifran en reposo por defecto con claves administradas por Microsoft; las CMK permiten que la organización controle el ciclo de vida completo (creación, rotación, eliminación) de la clave de cifrado, almacenada en Azure Key Vault ✅
B) Sin CMK, los recursos de Foundry no tienen ningún tipo de cifrado en reposo
C) Las CMK reemplazan por completo a Microsoft Entra ID como mecanismo de autenticación
D) Las CMK son obligatorias para todos los recursos de Foundry desde su creación, sin posibilidad de usar claves administradas por Microsoft

**Explicación:** El módulo aclara que el cifrado en reposo con claves de Microsoft es el comportamiento por defecto — las CMK son una opción adicional para organizaciones que necesitan controlar directivas propias de rotación, creación y eliminación de claves (por ejemplo, para cumplir marcos como ISO 27001 o SOC 2), usando una clave almacenada en Azure Key Vault en lugar de la gestión transparente de Microsoft.

---

### Q2027
**¿Qué rol RBAC integrado de Azure otorga exactamente los permisos mínimos (`get`, `wrapKey`, `unwrapKey`) que necesita la identidad administrada de un recurso de Microsoft Foundry para usar una clave administrada por el cliente en Key Vault?**

A) Key Vault Administrator, que otorga control total sobre el Key Vault incluida la gestión de políticas de acceso
B) Key Vault Crypto Service Encryption User — el rol integrado con menor privilegio que otorga exactamente esos tres permisos necesarios para operaciones de cifrado ✅
C) Key Vault Secrets User, diseñado para leer secretos en texto plano, no para operaciones criptográficas de clave
D) Owner, ya que las operaciones de cifrado requieren control total sobre la suscripción completa

**Explicación:** El módulo especifica este rol como la aplicación directa del principio de privilegio mínimo: la identidad administrada del recurso de Foundry solo necesita `get` (leer metadatos de la clave), `wrapKey` y `unwrapKey` (operaciones de cifrado/descifrado) — exactamente los permisos que otorga el rol integrado "Key Vault Crypto Service Encryption User", sin conceder administración completa del Key Vault.

---

### Q2028
**¿Cuáles son los tres requisitos de configuración de Key Vault que deben cumplirse para poder usar claves administradas por el cliente (CMK) con Microsoft Foundry, según el módulo?**

A) El Key Vault puede estar en cualquier región o inquilino sin restricción alguna, siempre que use claves de cualquier tipo o tamaño
B) Solo se admiten claves simétricas AES de 256 bits, nunca claves RSA
C) El Key Vault y el Hub de Foundry deben estar en la misma región y el mismo inquilino; la protección contra purga (purge protection) debe estar habilitada; solo se admiten claves RSA o RSA-HSM de 2048 bits ✅
D) La protección contra purga debe estar deshabilitada para permitir la rotación automática de claves

**Explicación:** El módulo lista estos tres requisitos técnicos explícitos: coincidencia de región y tenant entre Key Vault y el Hub de Foundry, protección contra purga obligatoria (de hecho, el soft-delete ya se aplica por defecto en todos los vaults nuevos), y soporte exclusivo para claves RSA o RSA-HSM de 2048 bits — ninguna otra combinación de tipo/tamaño de clave es compatible con CMK en Foundry.

---

### Q2029
**TRAMPA: Un administrador confunde el "tiempo de rotación" (rotation time) con el "tiempo de expiración" (expiry time) de una clave en Azure Key Vault, asumiendo que son el mismo concepto. ¿Cuál es la diferencia real entre ambos, según el módulo?**

A) Son sinónimos exactos; ambos términos describen el mismo momento en el ciclo de vida de la clave
B) El tiempo de expiración siempre debe ser menor que el tiempo de rotación, o la clave falla inmediatamente
C) Ninguno de los dos parámetros tiene efecto real sobre el comportamiento de Key Vault; son solo etiquetas informativas
D) El tiempo de rotación determina el intervalo o disparador para generar automáticamente una nueva versión de la clave (p. ej., cada 6 meses); el tiempo de expiración define cuánto tiempo permanece válida una versión específica antes de volverse inutilizable (p. ej., 210 días) — son controles independientes ✅

**Explicación:** El módulo aclara esta distinción explícitamente porque es una fuente común de confusión: la rotación controla CUÁNDO se genera una nueva versión de la clave automáticamente (el ciclo de renovación), mientras que la expiración controla CUÁNTO dura vigente cada versión individual antes de dejar de ser utilizable — son dos parámetros independientes que se configuran por separado en la política de rotación de la clave.

---

### Q2030
**¿Qué ocurre con los datos ya cifrados cuando se rota una clave administrada por el cliente (CMK) en Microsoft Foundry, y qué limitación adicional existe sobre el tipo de cifrado?**

A) La rotación NO re-cifra los datos ya existentes con la nueva versión de la clave; además, un recurso habilitado con CMK no puede revertirse a usar claves administradas por Microsoft ✅
B) La rotación re-cifra automáticamente y de inmediato todos los datos existentes con la nueva versión de la clave
C) La rotación elimina permanentemente todos los datos cifrados con la versión anterior de la clave
D) La rotación de CMK solo puede realizarse manualmente; Key Vault no admite ningún tipo de rotación basada en directivas

**Explicación:** El módulo señala estas dos limitaciones operativas importantes que deben planearse con antelación: la rotación de clave no re-cifra retroactivamente los datos existentes (siguen protegidos por la versión de clave con la que se cifraron originalmente), y una vez que un recurso de Foundry se configura con CMK, no existe camino de vuelta a claves administradas por Microsoft — es una decisión unidireccional.

---
