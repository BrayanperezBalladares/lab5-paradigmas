## Why

El chat actualmente trata todos los mensajes como texto y no ofrece una forma
controlada de visualizar recursos multimedia. El punto 4 del laboratorio
requiere permitir URLs de imágenes y videos sin perder el flujo existente de
mensajes por Socket.IO.

## What Changes

- Detectar URLs de imágenes con extensiones soportadas y mostrarlas como
  imágenes dentro del chat.
- Detectar URLs de videos de YouTube soportadas y mostrarlas mediante un
  reproductor embebido.
- Mantener los mensajes que no sean URLs multimedia como texto normal.
- Corregir las validaciones existentes para que reciban y evalúen el parámetro
  `url` correcto.
- Cubrir la detección y transformación de imágenes y videos con pruebas
  unitarias.

## Capabilities

### New Capabilities

- `chat-media-urls`: Detectar URLs multimedia permitidas y representarlas en el
  chat.

### Modified Capabilities

<!-- No existing OpenSpec capabilities exist in this project. -->

## Impact

- [libs/unalib.js](../../libs/unalib.js): validación y transformación del
  contenido de mensajes.
- [index.html](../../index.html): representación de mensajes multimedia en el
  frontend.
- [test/test.js](../../test/test.js): pruebas unitarias para las nuevas
  reglas.
- No se agregan dependencias nuevas para el punto 4.
