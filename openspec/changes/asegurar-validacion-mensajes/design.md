## Context

El punto 4 genera HTML para imágenes e iframes de YouTube, mientras que el
cliente recibe mensajes por Socket.IO. El límite de seguridad debe impedir que
el texto del usuario se convierta en HTML y debe conservar una ruta explícita
para el HTML multimedia que produce la aplicación.

## Goals / Non-Goals

**Goals:**

- Hacer que `validateMessage` clasifique URLs multimedia antes de generar
  etiquetas.
- Convertir todo contenido no multimedia en texto seguro.
- Hacer que el cliente inserte texto con APIs de texto y no con HTML arbitrario.
- Cubrir los vectores de inyección indicados en el laboratorio.

**Non-Goals:**

- No incorporar una biblioteca externa de sanitización para este alcance.
- No aceptar HTML proporcionado por el usuario.
- No ampliar los proveedores multimedia soportados.

## Decisions

1. **Usar una política de allowlist para multimedia.** Solo URLs que ya pasan
   `is_valid_url_image` o `is_valid_yt_video` reciben una representación
   multimedia. El texto restante se conserva como texto literal.

2. **Escapar la frontera de renderizado en el cliente.** El nombre, el texto
   ordinario y cualquier contenido no reconocido se insertarán con `.text()` o
   `textContent`; solo las etiquetas generadas internamente se crearán después
   de una clasificación segura.

3. **Normalizar entradas inesperadas a una estructura válida.** La validación
   no debe lanzar excepciones por JSON malformado o tipos inesperados. Se
   devuelve un mensaje seguro y se conserva la disponibilidad del servidor.

4. **Probar primero los ataques.** Las pruebas unitarias incluirán script tags,
   atributos de evento, esquemas peligrosos, HTML arbitrario y entradas
   malformadas, además de regresiones de imagen y video.

## Risks / Trade-offs

- **[Una política estricta puede mostrar como texto URLs multimedia no
  soportadas]** -> Se limita el comportamiento a los formatos definidos por la
  especificación.
- **[El HTML generado por la aplicación sigue siendo una frontera sensible]**
  -> El cliente solo reconocerá las formas multimedia que el backend genera y
  no aceptará HTML libre del usuario.
