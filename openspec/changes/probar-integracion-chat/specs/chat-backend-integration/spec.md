## Purpose

Esta capacidad comprueba que el backend recibe mensajes por el evento real del
chat, los valida mediante `una-lib` y emite respuestas seguras a los clientes.

## ADDED Requirements

### Requirement: Process messages through the real Socket.IO event

El backend SHALL procesar `Evento-Mensaje-Server` mediante `validateMessage` y
emitir el mensaje validado a los clientes conectados.

#### Scenario: Valid image message

- **WHEN** un cliente envía un objeto con una URL de imagen válida
- **THEN** recibe un mensaje con tipo `image` y una etiqueta de imagen

#### Scenario: Valid YouTube message

- **WHEN** un cliente envía una URL de YouTube válida
- **THEN** recibe un mensaje con tipo `video` y un reproductor embebido

#### Scenario: Script message

- **WHEN** un cliente envía un script como mensaje
- **THEN** recibe tipo `text` y el contenido no se ejecuta
