## Why

Las pruebas unitarias y de integración verifican la lógica y Socket.IO, pero no
comprueban el recorrido real desde el navegador. El punto 10 requiere validar
que el frontend se conecta al backend, renderiza multimedia y no ejecuta un
script enviado como mensaje.

## What Changes

- Configurar Playwright para ejecutar pruebas en Chromium.
- Crear pruebas end-to-end para imágenes, videos y scripts.
- Levantar el backend real durante la suite y cerrarlo al finalizar.
- Agregar un script npm para ejecutar las pruebas E2E.

## Capabilities

### New Capabilities

- `chat-browser-flow`: Verificar el flujo completo del chat desde Chromium.

### Modified Capabilities

<!-- No existing main capability specs have been archived. -->

## Impact

- [playwright.config.js](../../playwright.config.js)
- [tests/e2e/chat.spec.js](../../tests/e2e/chat.spec.js)
- [package.json](../../package.json) y [package-lock.json](../../package-lock.json)
