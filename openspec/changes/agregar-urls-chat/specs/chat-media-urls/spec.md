## Purpose

Esta capacidad permite que los mensajes del chat representen de forma
predecible URLs públicas de imágenes y videos de YouTube como contenido
multimedia visible para los participantes.

## ADDED Requirements

### Requirement: Detect supported image URLs

El sistema SHALL reconocer como imagen únicamente una URL absoluta `http` o
`https` cuyo recurso termine en una extensión soportada: `.jpg`, `.jpeg`,
`.png`, `.gif` o `.bmp`, sin distinguir mayúsculas de minúsculas.

#### Scenario: Valid image URL

- **WHEN** se envía `https://example.com/photo.jpg`
- **THEN** el mensaje se clasifica como imagen y el chat muestra un elemento de
  imagen usando esa URL

#### Scenario: Unsupported image URL

- **WHEN** se envía una URL sin extensión multimedia soportada o con un esquema
  distinto de `http`/`https`
- **THEN** el mensaje permanece como texto normal

### Requirement: Detect supported YouTube video URLs

El sistema SHALL reconocer URLs de YouTube compatibles con los formatos
`youtube.com/watch?v=ID`, `youtube.com/embed/ID`, `youtube.com/v/ID` y
`youtu.be/ID`, usando URLs `http` o `https` y un identificador de video válido.

#### Scenario: YouTube watch URL

- **WHEN** se envía `https://www.youtube.com/watch?v=qYwlqx-JLok`
- **THEN** el mensaje se clasifica como video y el chat muestra un reproductor
  embebido para ese video

#### Scenario: Non-YouTube video URL

- **WHEN** se envía una URL de video que no pertenece a un formato de YouTube
  soportado
- **THEN** el mensaje permanece como texto normal

### Requirement: Preserve regular chat messages

El sistema SHALL conservar el nombre, color y contenido de cualquier mensaje
que no sea una URL multimedia soportada, sin convertirlo en un elemento
multimedia.

#### Scenario: Plain text message

- **WHEN** se envía `Hola grupo`
- **THEN** todos los participantes reciben el mensaje como texto normal

### Requirement: Render media in the chat

El sistema SHALL renderizar las imágenes como imágenes y los videos de YouTube
como reproductores embebidos cuando un mensaje multimedia válido se recibe por
Socket.IO.

#### Scenario: Media message received

- **WHEN** el cliente recibe un mensaje clasificado como imagen o video
- **THEN** agrega una entrada visible al chat con el recurso multimedia
- **AND** mantiene el nombre del remitente y su color
