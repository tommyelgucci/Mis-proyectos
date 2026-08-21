# BANCO DE PREGUNTAS AI-103 — PARTE 21 (Q1700-Q1719)
## Domain 1 (real): Plan and Manage an Azure AI Solution — recursos, RBAC, autenticación
### Generado: 2026-08-21 | Fuente: guía "Domain 1 y Domain 5 en profundidad"

---

### Q1700
**¿Cuál es la jerarquía de recursos de Azure AI Foundry, de mayor a menor, y qué concepto clave sobre "compartir recursos" ilustra?**

A) Suscripción → Grupo de Recursos → Foundry Resource (cuenta) → Proyectos; un Foundry Resource puede alojar múltiples proyectos, que comparten infraestructura (red, identidad administrada) pero pueden tener deployments y conexiones independientes ✅
B) Suscripción → Proyecto → Foundry Resource → Grupo de Recursos; cada proyecto requiere su propio Foundry Resource exclusivo
C) Foundry Resource → Suscripción → Grupo de Recursos → Proyectos; los proyectos no pueden compartir infraestructura entre sí
D) Grupo de Recursos → Suscripción → Proyectos → Foundry Resource; un proyecto puede alojar múltiples Foundry Resources

**Explicación:** La jerarquía real es Suscripción → Resource Group → Foundry Resource (cuenta, `kind: "AIServices"`) → Proyectos. El concepto clave del examen es que un mismo Foundry Resource puede alojar varios proyectos: en vez de crear un recurso nuevo por cada equipo, distintos equipos usan proyectos separados sobre el mismo recurso, compartiendo identidad administrada y red pero con deployments/conexiones propios.

---

### Q1701
**Este es el comando para crear un Foundry Resource:
```bash
az cognitiveservices account create \
  --name mi-foundry-resource \
  --resource-group rg-foundry-produccion \
  --location eastus \
  --kind AIServices \
  --sku S0 \
  --custom-domain mi-foundry-resource \
  --assign-identity \
  --allow-project-management \
  --yes
```
¿Qué logra específicamente el flag `--allow-project-management`, a diferencia de `--assign-identity`?**

A) Ambos flags hacen exactamente lo mismo: crear una identidad administrada
B) `--allow-project-management` permite que el recurso aloje múltiples proyectos; `--assign-identity` crea una identidad administrada asociada al recurso para autenticación sin claves — son capacidades independientes ✅
C) `--allow-project-management` elimina la necesidad de `--custom-domain`
D) `--allow-project-management` solo tiene efecto si se omite `--sku S0`

**Explicación:** `--kind AIServices` define que es un recurso Foundry multi-servicio; `--assign-identity` crea la identidad administrada del recurso; `--allow-project-management` es específicamente el flag que habilita que ese recurso pueda alojar múltiples proyectos. Son tres configuraciones independientes que suelen combinarse pero cada una controla algo distinto.

---

### Q1702
**¿Por qué es obligatorio el flag `--custom-domain` al crear un Foundry Resource si se planea usar autenticación de producción?**

A) `--custom-domain` es puramente decorativo y no tiene efecto funcional
B) `--custom-domain` es requerido para habilitar autenticación con Microsoft Entra ID sobre el recurso ✅
C) `--custom-domain` determina el precio del SKU del recurso
D) `--custom-domain` reemplaza la necesidad de especificar `--location`

**Explicación:** Según la tabla de flags del módulo, `--custom-domain` es específicamente el requisito para habilitar autenticación vía Microsoft Entra ID — sin él, el recurso queda limitado a otros métodos de autenticación menos recomendados para producción.

---

### Q1703
**TRAMPA: Este comando crea un recurso, pero un desarrollador se queja de que no puede crear un segundo proyecto de otro equipo dentro de él:
```bash
az cognitiveservices account create \
  --name mi-recurso \
  --resource-group rg-demo \
  --kind AIServices \
  --sku S0 \
  --yes
```
¿Qué falta exactamente en este comando?**

A) Falta `--location`, sin el cual el comando ni siquiera se ejecutaría
B) Falta el flag `--allow-project-management`, que es el que habilita que el recurso soporte múltiples proyectos; sin él, el recurso queda limitado a uno solo ✅
C) Falta `--sku S1`, ya que `S0` no admite múltiples proyectos
D) No falta nada; el problema es que se debe crear un Foundry Resource separado por cada proyecto

**Explicación:** Sin `--allow-project-management`, el Foundry Resource no admite alojar varios proyectos. Este es el flag específico que resuelve el caso de uso "necesito que este recurso pueda alojar varios proyectos de distintos equipos" — no basta con `--kind AIServices` ni con `--assign-identity` por sí solos.

---

### Q1704
**¿Qué comando elimina un Foundry Resource y TODO lo que contiene (proyectos, deployments), y por qué se recomienda `--no-wait`?**

A) `az cognitiveservices account delete`, sin ninguna ventaja de usar `--no-wait`
B) `az group delete --name rg-foundry-produccion --yes --no-wait`; elimina el grupo de recursos completo (y por tanto todo lo que contiene), y `--no-wait` evita que la CLI bloquee la terminal esperando a que termine la eliminación completa ✅
C) `az cognitiveservices account stop`, que solo pausa el recurso sin eliminarlo
D) No existe un comando de eliminación en cascada; cada proyecto debe eliminarse manualmente primero

**Explicación:** Eliminar el resource group completo (`az group delete`) borra en cascada todo lo que contiene: el Foundry Resource, sus proyectos y deployments. `--yes` omite la confirmación interactiva y `--no-wait` hace que el comando regrese el control inmediatamente sin esperar a que la operación de borrado (que puede tardar) termine.

---

### Q1705
**¿Cuáles son los dos niveles de acceso RBAC en Azure AI Foundry, y qué controla cada uno?**

A) Nivel Lectura y Nivel Escritura; ambos aplican exclusivamente a nivel de suscripción
B) Nivel Cuenta (Account): infraestructura — red, identidad, políticas, llaves de cifrado; Nivel Proyecto (Project): trabajo diario — deployments, agentes, conexiones, evaluaciones ✅
C) Nivel Global y Nivel Regional; determinan en qué región de Azure se despliega el recurso
D) Nivel Desarrollo y Nivel Producción; se seleccionan al crear el recurso y no pueden cambiar después

**Explicación:** El nivel Cuenta cubre la infraestructura compartida (red, identidad administrada, políticas, llaves de cifrado) con roles como Foundry Account Owner. El nivel Proyecto cubre el trabajo diario dentro de un proyecto específico (deployments, agentes, conexiones, evaluaciones) con roles como Foundry User y Foundry Project Manager.

---

### Q1706
**TRAMPA: Los roles de Foundry fueron renombrados recientemente (`Azure AI User` → `Foundry User`, `Azure AI Project Manager` → `Foundry Project Manager`, `Azure AI Owner` → `Foundry Owner`). ¿Qué implica esto para responder preguntas del examen sobre estos roles?**

A) Los nombres antiguos ya no son válidos en absoluto y cualquier pregunta que los use está desactualizada y debe ignorarse
B) El examen puede usar cualquiera de los dos nombres (antiguo o nuevo) para referirse al mismo rol, ya que los permisos subyacentes no cambiaron con el renombrado — hay que reconocer ambos como equivalentes ✅
C) Los roles antiguos y nuevos otorgan permisos completamente distintos entre sí
D) Solo los roles con el nombre nuevo ("Foundry...") existen; los roles con el nombre antiguo nunca existieron

**Explicación:** Es un caso de nomenclatura en transición: mismo permiso subyacente, dos nombres posibles según cuándo se documentó o se vio en el portal. El examen puede usar cualquiera de los dos, así que memorizar solo un nombre exacto es arriesgado — lo importante es reconocer el ROL (uso diario, gestión de proyecto, gestión de cuenta) detrás del nombre.

---

### Q1707
**Este código asigna un rol vía CLI:
```bash
OBJECT_ID=$(az ad signed-in-user show --query id --output tsv)

az role assignment create \
  --role "Foundry User" \
  --assignee "$OBJECT_ID" \
  --scope "/subscriptions/<sub-id>/resourceGroups/rg-foundry-produccion/providers/Microsoft.CognitiveServices/accounts/mi-foundry-resource/projects/proyecto-a"
```
¿Qué principio de seguridad ilustra el hecho de que `--scope` apunte específicamente a `.../projects/proyecto-a` en vez de detenerse en el nivel del Foundry Resource (`.../accounts/mi-foundry-resource`)?**

A) Ninguno en particular; el alcance no tiene ningún efecto de seguridad real
B) El principio de mínimo privilegio: siempre asignar el rol más restrictivo posible, en el alcance más estrecho posible (aquí, un proyecto específico, no la cuenta completa) que permita al usuario hacer su trabajo ✅
C) Es simplemente un requisito de sintaxis de `az role assignment create`, sin relación con seguridad
D) Apuntar a un proyecto específico en vez de la cuenta completa es un error común que debe evitarse

**Explicación:** Este es el principio de mínimo privilegio aplicado al alcance (scope) de RBAC: otorgar acceso al proyecto específico donde el usuario realmente trabaja, en vez de a todo el Foundry Resource (que incluiría todos los demás proyectos), limita el impacto si esa identidad se ve comprometida o mal utilizada.

---

### Q1708
**¿Cuáles son los tres métodos de autenticación para llamar a un recurso de Azure AI, y cuál se recomienda para producción?**

A) API Key, Entra ID + Managed Identity, y SAS Token; se recomienda Entra ID + Managed Identity para producción, porque no requiere gestionar ni rotar secretos ✅
B) Usuario y contraseña, OAuth2, y JWT; se recomienda usuario y contraseña para producción
C) Solo existe un método válido: API Key, para cualquier entorno
D) Certificados X.509, Kerberos y NTLM; se recomienda NTLM para producción

**Explicación:** API Key es válida para prototipos rápidos y scripts locales, pero no para producción (requiere gestionar y rotar el secreto manualmente). SAS Token da acceso temporal y delegado a un recurso específico (típicamente Storage). Microsoft Entra ID + Managed Identity es el método recomendado en producción precisamente porque elimina la necesidad de secretos gestionados manualmente.

---

### Q1709
**Este código muestra los tres métodos de autenticación:
```python
# MÉTODO 1: API Key
client = AzureOpenAI(
    azure_endpoint="https://mi-foundry-resource.openai.azure.com/",
    api_key=os.environ["AZURE_OPENAI_API_KEY"],
    api_version="2024-05-01-preview"
)

# MÉTODO 2: Microsoft Entra ID
token_provider = get_bearer_token_provider(
    DefaultAzureCredential(),
    "https://cognitiveservices.azure.com/.default"
)
client = AzureOpenAI(
    azure_endpoint="https://mi-foundry-resource.openai.azure.com/",
    azure_ad_token_provider=token_provider,
    api_version="2024-05-01-preview"
)
```
¿Cuál es la diferencia estructural clave entre `api_key=...` y `azure_ad_token_provider=token_provider`, más allá de cuál es más recomendado?**

A) Ambos parámetros hacen exactamente lo mismo internamente; solo cambia el nombre del argumento
B) `api_key` pasa un secreto estático leído de una variable de entorno; `azure_ad_token_provider` pasa una función (`token_provider`) que `DefaultAzureCredential` usa para obtener y renovar tokens de acceso automáticamente, sin un secreto fijo que gestionar ✅
C) `azure_ad_token_provider` solo funciona con modelos de embeddings, nunca con modelos de chat
D) `api_key` requiere `DefaultAzureCredential`; `azure_ad_token_provider` no la requiere

**Explicación:** El método de API Key usa un valor fijo (que debe protegerse, rotarse y puede filtrarse). El método de Entra ID pasa una función proveedora de tokens (`get_bearer_token_provider`) que obtiene tokens de corta duración dinámicamente a través de `DefaultAzureCredential`, renovándolos automáticamente sin que el desarrollador gestione ningún secreto estático.

---

### Q1710
**TRAMPA: Un desarrollador usa un SAS Token para autenticar llamadas directas a un modelo de Azure OpenAI, pensando que es intercambiable con Entra ID o API Key. ¿Por qué esto es un error conceptual?**

A) No es un error; los tres métodos son completamente intercambiables para cualquier recurso
B) Un SAS Token da acceso temporal y delegado a un recurso ESPECÍFICO (típicamente Storage), no es un método general de autenticación para llamar modelos de Azure OpenAI — confundirlo con Entra ID o API Key es un error de examen común ✅
C) SAS Token es el único método válido para llamar modelos de Azure OpenAI en producción
D) SAS Token requiere primero autenticarse con API Key, por lo que nunca se usa solo

**Explicación:** El módulo señala explícitamente esta trampa: un SAS Token (Shared Access Signature) es para dar acceso delegado, temporal y con expiración definida a un recurso concreto como un blob de Storage — no es un mecanismo de autenticación general para invocar modelos de IA como sí lo son API Key o Entra ID.

---

### Q1711
**Este código genera un SAS Token:
```python
sas_token = generate_blob_sas(
    account_name="milmacenamiento",
    container_name="documentos",
    blob_name="contrato.pdf",
    account_key=STORAGE_ACCOUNT_KEY,
    permission=BlobSasPermissions(read=True),
    expiry=datetime.utcnow() + timedelta(hours=1)
)
```
¿Qué caracteriza específicamente a este tipo de acceso, según los parámetros usados?**

A) Acceso permanente e ilimitado a toda la cuenta de almacenamiento
B) Acceso de solo lectura (`read=True`), delegado a un único blob específico (`contrato.pdf`), con expiración definida de 1 hora — no un acceso general ni permanente ✅
C) Acceso de lectura y escritura a todos los contenedores de la cuenta, sin expiración
D) Un token que sustituye permanentemente la necesidad de cualquier otro método de autenticación en el proyecto

**Explicación:** Los parámetros del código delimitan exactamente el alcance del acceso: `blob_name="contrato.pdf"` restringe a un único archivo, `BlobSasPermissions(read=True)` limita a solo lectura, y `expiry=... + timedelta(hours=1)` fija una caducidad de una hora — el ejemplo perfecto de acceso temporal y delegado a un recurso específico.

---

### Q1712
**¿Cuál es el patrón recomendado para compartir un recurso (como una conexión a Azure AI Search) entre varios proyectos del mismo Foundry Resource?**

A) Cada proyecto debe configurar su propia conexión duplicada de forma independiente, sin excepción
B) Crear conexiones a nivel de cuenta, para que todos los proyectos del mismo Foundry Resource puedan reutilizarla, en vez de que cada proyecto configure la suya duplicada ✅
C) Crear un Foundry Resource distinto por cada proyecto que necesite la misma conexión
D) Las conexiones nunca pueden compartirse entre proyectos, sin importar el nivel donde se creen

**Explicación:** El patrón recomendado aprovecha que varios proyectos viven dentro del mismo Foundry Resource: una conexión creada a nivel de cuenta (no de proyecto) puede reutilizarse por todos los proyectos que la necesiten, evitando la duplicación de configuración de la misma conexión en cada proyecto.

---

### Q1713
**Este código crea una conexión compartida:
```bash
az cognitiveservices account project connection create \
  --resource-group rg-foundry-produccion \
  --name mi-foundry-resource \
  --project-name proyecto-marketing \
  --connection-name conexion-search-compartida \
  --file connection.json
```
```json
{
  "connectionType": "AzureAISearch",
  "target": "https://mi-search.search.windows.net",
  "authType": "AAD",
  "isSharedToAll": true
}
```
¿Qué logra específicamente el campo `"isSharedToAll": true` dentro de `connection.json`?**

A) Otorga acceso público sin autenticación a cualquier persona en internet
B) Hace que la conexión, aunque se creó desde un proyecto específico (`proyecto-marketing`), quede disponible para ser reutilizada por todos los demás proyectos del mismo Foundry Resource ✅
C) Elimina la necesidad de especificar `"authType": "AAD"`
D) Convierte automáticamente la conexión en de solo lectura para todos los proyectos

**Explicación:** `isSharedToAll: true` es precisamente el mecanismo que habilita el patrón de compartir recursos entre proyectos: aunque el comando se ejecuta apuntando a `proyecto-marketing`, marcar la conexión como compartida la hace visible y reutilizable desde cualquier otro proyecto del mismo Foundry Resource, sin necesidad de recrearla.

---

### Q1714
**Este código consulta métricas de uso de un recurso:
```python
from azure.monitor.query import MetricsQueryClient
from azure.identity import DefaultAzureCredential

client = MetricsQueryClient(DefaultAzureCredential())

response = client.query_resource(
    resource_uri="/subscriptions/<sub-id>/resourceGroups/rg-foundry-produccion/providers/Microsoft.CognitiveServices/accounts/mi-foundry-resource",
    metric_names=["TotalCalls", "TokenTransaction"],
    timespan=timedelta(hours=24)
)
```
¿Para qué tipo de tarea operativa es más relevante este código, según el módulo?**

A) Para desplegar un nuevo modelo dentro del Foundry Resource
B) Para gestión de cuotas y monitoreo del uso del recurso (llamadas totales, transacciones de tokens) en una ventana de tiempo determinada ✅
C) Para asignar roles RBAC a un usuario nuevo
D) Para crear una conexión compartida entre proyectos

**Explicación:** `MetricsQueryClient` consulta métricas operativas como `TotalCalls` y `TokenTransaction` sobre un recurso en una ventana de tiempo (`timespan`), exactamente el tipo de dato necesario para gestión de cuotas y monitoreo de uso — no está relacionado con despliegue de modelos, RBAC ni conexiones.

---

### Q1715
**¿Cuáles son las tres prácticas recomendadas por el módulo para minimizar la sobrecarga administrativa de un recurso Foundry en producción?**

A) Rotar API keys manualmente cada semana, revisar el portal a diario, y configurar todo por interfaz gráfica
B) Usar Managed Identity en vez de rotar API keys manualmente; configurar alertas de cuota en vez de monitoreo manual constante; usar Infraestructura como Código (Bicep/Terraform) para despliegues repetibles ✅
C) Deshabilitar RBAC por completo para simplificar el acceso
D) Crear un Foundry Resource nuevo cada vez que se necesite un despliegue

**Explicación:** Estas tres prácticas reducen trabajo manual repetitivo: Managed Identity elimina la rotación manual de claves, las alertas de cuota reemplazan la supervisión manual constante, y la Infraestructura como Código (Bicep/Terraform) permite reproducir despliegues sin repetir configuración manual en el portal cada vez.

---

### Q1716
**Una Azure Function en producción llama a Azure OpenAI todos los días. Un script personal de prueba rápida corre en una laptop sin intención de llegar a producción. Un proveedor externo necesita acceso de solo lectura a un único archivo en Blob Storage por 2 horas. ¿Qué método de autenticación corresponde a cada caso?**

A) Los tres casos deben usar exactamente el mismo método de autenticación, sin distinción
B) Azure Function en producción → Entra ID + Managed Identity; script de prueba rápida → API Key; acceso externo temporal a un archivo → SAS Token ✅
C) Los tres casos requieren obligatoriamente API Key, ya que es el único método soportado en Python
D) El script de prueba y la Azure Function deben usar SAS Token; el acceso externo debe usar API Key

**Explicación:** Cada escenario mapea al método diseñado para ese caso de uso: producción sin gestión de secretos → Entra ID + Managed Identity; prototipo rápido de bajo riesgo → API Key; acceso temporal, delegado y con expiración a un recurso específico → SAS Token.

---

### Q1717
**Una empresa tiene: (a) desarrolladores que solo necesitan llamar modelos y crear agentes en el Proyecto A, (b) un lead técnico que administra el Proyecto A completo incluyendo sus conexiones, y (c) un administrador de IT que debe poder crear nuevos proyectos cuando se necesiten. ¿Qué rol y alcance corresponde a cada persona?**

A) Los tres deben recibir el mismo rol (Foundry Owner) a nivel de cuenta, por simplicidad
B) Desarrolladores → Foundry User en el Proyecto A únicamente; lead técnico → Foundry Project Manager en el Proyecto A únicamente; administrador de IT → Foundry Account Owner a nivel de cuenta (el Foundry Resource completo) ✅
C) Los desarrolladores deben recibir Foundry Account Owner, ya que necesitan crear agentes
D) El administrador de IT no necesita ningún rol, ya que la creación de proyectos no requiere RBAC

**Explicación:** Aplicando mínimo privilegio en el alcance más estrecho posible: uso diario de un proyecto específico → Foundry User en ese proyecto; gestión completa de ese mismo proyecto (incluidas sus conexiones) → Foundry Project Manager en ese proyecto; capacidad de crear proyectos nuevos, que es una operación a nivel de cuenta → Foundry Account Owner a nivel de cuenta.

---

### Q1718
**¿Por qué se recomienda usar Infraestructura como Código (Bicep/Terraform) en vez de crear recursos repetidamente desde el portal de Azure?**

A) Porque el portal de Azure no permite crear recursos de tipo `AIServices`
B) Porque permite despliegues repetibles y consistentes (el mismo resultado cada vez), reduciendo la sobrecarga administrativa de configurar manualmente los mismos recursos una y otra vez ✅
C) Porque Bicep y Terraform son obligatorios por política de Microsoft para cualquier recurso de IA
D) Porque el portal de Azure solo permite crear un recurso por suscripción

**Explicación:** El valor de IaC no es una limitación del portal, sino la repetibilidad y consistencia: un archivo Bicep/Terraform describe el estado deseado del recurso de forma versionable y reproducible, evitando reconfiguración manual repetida (y propensa a errores) cada vez que se necesita un despliegue similar.

---

### Q1719
**¿Qué patrón describe mejor la relación entre un Foundry Resource y sus proyectos respecto a la identidad administrada (Managed Identity)?**

A) Cada proyecto tiene su propia identidad administrada completamente independiente de las demás
B) La identidad administrada se asocia al Foundry Resource (la cuenta) y es parte de la infraestructura que los proyectos alojados en ese recurso comparten, junto con la red ✅
C) La identidad administrada no tiene relación con los proyectos, solo con el grupo de recursos
D) Los proyectos deben desactivar la identidad administrada de la cuenta antes de poder crear sus propios deployments

**Explicación:** La identidad administrada se crea al nivel del Foundry Resource (`--assign-identity` en la creación de la cuenta) y es parte de la infraestructura compartida (junto con la red) entre todos los proyectos alojados en ese recurso — es exactamente lo que permite que varios proyectos reutilicen la misma infraestructura de autenticación sin claves.

---
