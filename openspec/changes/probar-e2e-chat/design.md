## Context

El frontend obtiene Socket.IO desde CDN y se sirve por Express. Las pruebas
unitarias y de integración ya cubren la lógica previa; esta suite debe usar el
servidor real y Chromium.

## Goals / Non-Goals

**Goals:**

- Automatizar el formulario real con locators, `fill`, `click` y `expect`.
- Detectar diálogos antes de enviar el script.
- Aislar cada prueba y cerrar el servidor al finalizar.

**Non-Goals:**

- No sustituir Socket.IO por mocks.
- No validar disponibilidad de proveedores externos más allá de comprobar el
  elemento multimedia y su URL.

## Decisions

- Usar `@playwright/test` con un `webServer` que ejecute `node server.js`.
- Ejecutar en Chromium y reutilizar el `baseURL` configurado.
- Usar URLs públicas conocidas para imagen y YouTube; comprobar la imagen por
  su elemento y URL, y el video por su iframe embebido.

## Risks / Trade-offs

- **[CDN o proveedores externos pueden estar no disponibles]** -> Las
  aserciones se enfocan en el renderizado generado por el chat y no bloquean
  toda la suite por la disponibilidad de un tercero.
