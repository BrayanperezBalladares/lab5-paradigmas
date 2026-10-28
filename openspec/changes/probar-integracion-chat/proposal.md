## Why

Las pruebas unitarias confirman `una-lib` de forma aislada, pero no demuestran
que el backend use esa validación al recibir mensajes reales por Socket.IO.
El punto 9 necesita verificar el flujo completo del evento de chat.

## What Changes

- Exponer una fábrica de servidor para iniciar y cerrar el backend durante las
  pruebas sin abrir siempre el puerto 3000 al importar el módulo.
- Agregar pruebas de integración sobre `Evento-Mensaje-Server`.
- Comprobar imágenes, videos y scripts a través del backend real.
- Agregar `socket.io-client` como dependencia de desarrollo.

## Capabilities

### New Capabilities

- `chat-backend-integration`: Verificar el flujo real de mensajes entre
  Socket.IO y la validación de `una-lib`.

### Modified Capabilities

<!-- No existing main capability specs have been archived. -->

## Impact

- [server.js](../../server.js): ciclo de vida reutilizable del servidor.
- [tests/integration/chat.test.js](../../tests/integration/chat.test.js): nueva
  suite de integración.
- [package.json](../../package.json) y [package-lock.json](../../package-lock.json):
  dependencia de cliente Socket.IO para pruebas.
