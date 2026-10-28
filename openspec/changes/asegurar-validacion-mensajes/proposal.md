## Why

El chat inserta contenido recibido desde otros usuarios en el DOM y actualmente
un mensaje con HTML o JavaScript puede convertirse en una inyección de scripts.
La validación debe rechazar o neutralizar contenido activo, sin eliminar el
soporte controlado para imágenes y videos implementado en el punto 4.

## What Changes

- Rechazar mensajes con etiquetas, atributos o esquemas ejecutables.
- Tratar como texto literal cualquier contenido que no sea una URL multimedia
  permitida.
- Permitir únicamente las representaciones multimedia generadas por la
  aplicación para imágenes y videos de YouTube válidos.
- Evitar que mensajes inválidos o malformados hagan fallar la validación.
- Agregar pruebas unitarias de seguridad para scripts, HTML, esquemas
  peligrosos y URLs multimedia permitidas.

## Capabilities

### New Capabilities

- `secure-message-validation`: Validar y normalizar mensajes del chat para
  impedir ejecución de contenido activo.

### Modified Capabilities

<!-- No existing main capability specs have been archived yet. -->

## Impact

- [libs/unalib.js](../../libs/unalib.js): validación y normalización de
  mensajes.
- [index.html](../../index.html): renderizado seguro de mensajes recibidos.
- [test/test.js](../../test/test.js): pruebas unitarias de seguridad.
- No se requieren dependencias nuevas.
