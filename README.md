# UNA Chat

## Ejecutar localmente

```powershell
npm install
Copy-Item .env.example .env
npm start
```

Antes de ejecutar, configura en `.env` los valores reales de tu aplicación
Auth0. El archivo `.env` está excluido de Git.

## Configurar Auth0

1. Crea una aplicación **Regular Web Application** en Auth0.
2. Habilita al menos un proveedor social, por ejemplo Google, en la pestaña
   **Connections** de la aplicación.
3. En la aplicación Auth0 configura, usando el mismo origen local y el
   dominio de Vercel:
   - Allowed Callback URLs: `http://localhost:3000/callback` y
     `https://TU-DOMINIO.vercel.app/callback`
   - Allowed Logout URLs: `http://localhost:3000` y
     `https://TU-DOMINIO.vercel.app`
   - Allowed Web Origins: `http://localhost:3000` y
     `https://TU-DOMINIO.vercel.app`
4. Copia el dominio Auth0, el Client ID y un secreto aleatorio al entorno
   local o a las variables de entorno de Vercel:
   `AUTH0_ISSUER_BASE_URL`, `AUTH0_CLIENT_ID`, `AUTH0_SECRET` y
   `AUTH0_BASE_URL`.

La aplicación protege el chat con autenticación en el proceso real. La
identidad se muestra en la cabecera y el enlace de cierre de sesión usa el
flujo de logout de Auth0. Si Auth0 no está configurado, el servidor no inicia
y muestra las variables faltantes.

## Despliegue realizado

- Repositorio: https://github.com/BrayanperezBalladares/lab5-paradigmas
- Aplicación: https://lab5-paradigmas.vercel.app
- Callback de producción:
  `https://lab5-paradigmas.vercel.app/callback`
- Logout y web origin de producción:
  `https://lab5-paradigmas.vercel.app`

Configura las variables de entorno en Vercel para Production, Preview y
Development. En producción, `AUTH0_BASE_URL` debe ser
`https://lab5-paradigmas.vercel.app`.

## Verificación

```powershell
npm test
npm run test:e2e
npm run verify:delivery
```

La suite propia validada contiene 25 pruebas Mocha y 3 pruebas E2E. El
verificador legado `verify:delivery` requiere ejecutar antes
`node harness/run.js prepare`; ese flujo pertenece al harness del Laboratorio 5
y no forma parte del alcance de este laboratorio. No incluyas secretos en
capturas, `.env.example` ni en el repositorio.
