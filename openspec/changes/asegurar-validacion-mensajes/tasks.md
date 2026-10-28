## 1. Pruebas de seguridad primero

- [x] 1.1 Agregar pruebas para bloquear etiquetas `script` y HTML arbitrario.
- [x] 1.2 Agregar pruebas para bloquear atributos de eventos y esquemas
  `javascript:`, `data:` y `vbscript:`.
- [x] 1.3 Agregar pruebas para entradas JSON malformadas y tipos inesperados.
- [x] 1.4 Confirmar que las URLs multimedia válidas del punto 4 siguen siendo
  aceptadas.

## 2. Validación segura

- [x] 2.1 Cambiar `validateMessage` para que contenido no multimedia quede como
  texto literal seguro.
- [x] 2.2 Evitar que entradas malformadas o tipos inesperados provoquen
  excepciones o respuestas ejecutables.
- [x] 2.3 Mantener la generación controlada de imágenes y videos válidos.

## 3. Renderizado seguro

- [x] 3.1 Renderizar nombre y texto con APIs que no interpreten HTML.
- [x] 3.2 Permitir solo los elementos multimedia producidos por la aplicación.
- [x] 3.3 Verificar que el script del paso 2 no abre diálogos ni ejecuta código.

## 4. Verificación

- [x] 4.1 Ejecutar `npm test` y confirmar todas las pruebas.
- [x] 4.2 Validar el cambio con `openspec validate --strict`.
- [x] 4.3 Probar manualmente un mensaje de texto, una imagen, un video y un
  intento de script.
