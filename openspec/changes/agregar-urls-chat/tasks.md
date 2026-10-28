## 1. Validación y transformación

- [x] 1.1 Corregir `is_valid_url_image` para evaluar `url` y aceptar solo
  URLs `http`/`https` con extensiones de imagen soportadas.
- [x] 1.2 Corregir `is_valid_yt_video` para evaluar `url` y aceptar los
  formatos de YouTube definidos en la especificación.
- [x] 1.3 Verificar que `validateMessage` mantenga mensajes normales y
  transforme únicamente imágenes y videos reconocidos.

## 2. Renderizado del chat

- [x] 2.1 Ajustar el cliente para mostrar una imagen cuando reciba una imagen
  válida.
- [x] 2.2 Ajustar el cliente para mostrar un reproductor cuando reciba un video
  válido.
- [x] 2.3 Mantener nombre, color y mensajes de texto en el flujo existente.

## 3. Pruebas

- [x] 3.1 Agregar pruebas unitarias para URLs de imágenes válidas y no válidas.
- [x] 3.2 Agregar pruebas unitarias para URLs de YouTube válidas y no válidas.
- [x] 3.3 Agregar pruebas unitarias para conservar mensajes de texto.
- [x] 3.4 Ejecutar `npm test` y corregir fallos relacionados con este cambio.

## 4. Verificación

- [x] 4.1 Validar los artefactos OpenSpec.
- [x] 4.2 Ejecutar manualmente el chat y comprobar que el frontend responde en
  `http://localhost:3000/`; el servidor ya estaba activo en el puerto 3000.
