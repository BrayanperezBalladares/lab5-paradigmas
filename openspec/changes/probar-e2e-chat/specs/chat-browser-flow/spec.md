## Purpose

Esta capacidad verifica desde Chromium que una persona puede enviar contenido
al chat y observar la respuesta segura del frontend conectado al backend real.

## ADDED Requirements

### Requirement: Render media through the browser flow

El sistema SHALL mostrar en el chat una imagen para una URL de imagen válida y
un reproductor para una URL de YouTube válida cuando se envían desde el
navegador.

#### Scenario: Image sent from browser

- **WHEN** el usuario escribe una URL de imagen y envía el formulario
- **THEN** aparece un elemento `img` en el chat con esa URL

#### Scenario: Video sent from browser

- **WHEN** el usuario escribe una URL de YouTube y envía el formulario
- **THEN** aparece un `iframe` de YouTube en el chat

### Requirement: Block script execution in browser flow

El sistema SHALL impedir que un script enviado como mensaje abra un diálogo o
se ejecute en Chromium.

#### Scenario: Script sent from browser

- **WHEN** el usuario envía `<script>alert('xss')</script>`
- **THEN** no se abre ningún diálogo
- **AND** el contenido se muestra como texto literal en el chat
