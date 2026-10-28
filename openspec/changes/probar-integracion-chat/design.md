## Context

El backend usa Socket.IO y actualmente inicia el servidor como efecto lateral al
cargar `server.js`, lo que dificulta iniciar un servidor aislado por prueba.

## Goals / Non-Goals

**Goals:**

- Crear y cerrar un servidor HTTP en un puerto efímero dentro de Mocha.
- Conectar un cliente Socket.IO real y probar el evento de producción.
- Mantener `npm start` funcionando sin cambios de uso.

**Non-Goals:**

- No crear una ruta HTTP ficticia para sustituir Socket.IO.
- No cambiar la lógica de validación de `una-lib`.

## Decisions

- Exportar `createServer` y ejecutar `listen` solo cuando `server.js` sea el
  proceso principal.
- Usar `socket.io-client` y Mocha, respetando el runner existente.
- Cerrar cliente, Socket.IO y HTTP después de cada prueba.

## Risks / Trade-offs

- **[La prueba depende del protocolo Socket.IO]** -> Esto es intencional porque
  valida la entrada real usada por la aplicación.
