## Purpose

Esta capacidad protege el chat contra la ejecución de scripts y HTML activo,
manteniendo únicamente las representaciones multimedia explícitamente
permitidas por el laboratorio.

## ADDED Requirements

### Requirement: Reject executable message content

El sistema SHALL impedir que etiquetas HTML, atributos de eventos, esquemas
`javascript:` o contenido equivalente enviado como mensaje se ejecute en el
cliente.

#### Scenario: Script tag submitted

- **WHEN** se envía `<script>alert('xss')</script>`
- **THEN** el mensaje no ejecuta ningún script
- **AND** el contenido se muestra como texto literal o se rechaza

#### Scenario: Event handler submitted

- **WHEN** se envía `<img src=x onerror=alert(1)>`
- **THEN** el mensaje no ejecuta el atributo `onerror`
- **AND** no se interpreta como una imagen multimedia permitida

#### Scenario: Dangerous scheme submitted

- **WHEN** se envía una URL con esquema `javascript:`, `data:` o `vbscript:`
- **THEN** el mensaje no crea un recurso ejecutable
- **AND** se muestra como texto literal o se rechaza

### Requirement: Preserve safe media support

El sistema SHALL continuar aceptando únicamente las URLs de imágenes y videos
de YouTube que cumplen las reglas del punto 4, generando sus representaciones
multimedia controladas.

#### Scenario: Valid image remains supported

- **WHEN** se envía una URL `http` o `https` con extensión de imagen permitida
- **THEN** el chat muestra la imagen sin ejecutar HTML controlado por el usuario

#### Scenario: Valid YouTube video remains supported

- **WHEN** se envía una URL de YouTube con un identificador válido
- **THEN** el chat muestra el reproductor generado por la aplicación

### Requirement: Handle malformed messages safely

El sistema SHALL devolver una respuesta válida y no ejecutar contenido cuando
el mensaje recibido no es JSON válido, carece de `mensaje` o tiene un tipo
inesperado.

#### Scenario: Malformed serialized message

- **WHEN** el backend recibe una cadena que no es JSON válido
- **THEN** devuelve un mensaje seguro y el proceso continúa disponible

#### Scenario: Unexpected message field type

- **WHEN** `mensaje` no es una cadena
- **THEN** el valor no se procesa como HTML ni como URL multimedia
