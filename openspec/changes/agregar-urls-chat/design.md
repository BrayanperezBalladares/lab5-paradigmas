## Context

El backend recibe mensajes serializados por Socket.IO y delega su
transformación a `libs/unalib.js`. El frontend actual construye una cadena HTML
para cada mensaje, por lo que la representación multimedia debe distinguir
claramente entre contenido generado por la aplicación y texto del usuario.

## Goals / Non-Goals

**Goals:**

- Centralizar la clasificación de URLs en `unalib`.
- Corregir las validaciones para evaluar el argumento recibido.
- Reutilizar la transformación existente a etiqueta de imagen o reproductor
  de YouTube.
- Mantener compatibilidad con el formato actual de mensajes Socket.IO.
- Probar directamente los casos de imagen, video y texto.

**Non-Goals:**

- No implementar todavía la sanitización completa contra inyección de scripts;
  esa actividad corresponde al punto 5.
- No agregar soporte para proveedores de video distintos de YouTube.
- No cambiar el transporte Socket.IO ni introducir una API HTTP nueva.

## Decisions

1. **Validar con `URL` y reglas explícitas de proveedor/extensión.**
   Las expresiones regulares se usarán únicamente para las partes específicas
   del formato, después de comprobar el esquema y la estructura de la URL.
   Esto evita aceptar cadenas parciales o esquemas peligrosos. La alternativa
   descartada es aplicar solamente las expresiones regulares heredadas, porque
   pueden aceptar contenido fuera de la URL esperada.

2. **Conservar el mensaje serializado y transformar solo `mensaje`.**
   El backend seguirá emitiendo el mismo objeto con sus campos actuales; solo
   el campo `mensaje` cambia cuando se identifica una imagen o un video. Así se
   preservan el nombre y el color sin modificar el protocolo del chat.

3. **Representar multimedia con HTML generado por la aplicación.**
   Las imágenes usarán una etiqueta `img` y YouTube un `iframe` con el
   identificador extraído. El texto ordinario seguirá el flujo actual. La
   separación entre HTML generado y texto recibido deberá quedar preparada
   para la sanitización del punto 5.

4. **Agregar pruebas unitarias antes de aplicar el cambio.**
   Se cubrirán URLs válidas, URLs no soportadas y mensajes ordinarios. La
   alternativa de probar solo desde el navegador se descarta porque no
   aislaría los defectos de las funciones de validación.

## Risks / Trade-offs

- **[URLs remotas pueden no cargar]** -> Las pruebas unitarias validarán la
  clasificación y generación del recurso, no la disponibilidad de servidores
  externos.
- **[HTML generado puede interactuar con la inyección existente]** -> El
  alcance de este cambio se limitará a URLs soportadas y el punto 5 deberá
  reemplazar cualquier inserción insegura por una salida sanitizada.
- **[Formatos de YouTube fuera de los especificados pueden quedar como texto]**
  -> Se documentan explícitamente los formatos aceptados y se agregan casos de
  rechazo.
