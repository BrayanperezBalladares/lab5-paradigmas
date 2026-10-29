
require('dotenv').config();

var auth0 = require('express-openid-connect');
var validation = require('./libs/unalib');
var path = require('path');

function authConfig() {
  var required = ['AUTH0_SECRET', 'AUTH0_BASE_URL', 'AUTH0_CLIENT_ID', 'AUTH0_ISSUER_BASE_URL'];
  var missing = required.filter(function(name) {
    return !process.env[name];
  });

  if (missing.length > 0) {
    throw new Error('Auth0 no está configurado. Faltan: ' + missing.join(', '));
  }

  return {
    authRequired: true,
    auth0Logout: true,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    secret: process.env.AUTH0_SECRET
  };
}

function createServer(options) {
  options = options || {};
  var app = createApp(options);
  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  io.on('connection', function(socket){
    socket.on('Evento-Mensaje-Server', function(msg){
      msg = validation.validateMessage(msg);
      io.emit('Evento-Mensaje-Server', msg);
    });
  });

  return { app: app, http: http, io: io };
}

function createApp(options) {
  options = options || {};
  var app = require('express')();
  var authenticationRequired = options.requireAuth === true;

  if (authenticationRequired) {
    app.use(auth0.auth(authConfig()));
  }

  app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.get('/api/me', function(req, res) {
    res.json({
      authenticated: authenticationRequired && req.oidc.isAuthenticated(),
      user: authenticationRequired ? req.oidc.user : null
    });
  });

  return app;
}

if (require.main === module) {
  var port = process.env.PORT || 3000;
  var server = createServer({ requireAuth: process.env.UNA_CHAT_TEST_AUTH !== '1' });
  server.http.listen(port, function(){
    console.log('listening on *:' + port);
  });
}

var exportedApp = createApp({ requireAuth: process.env.VERCEL === '1' });
exportedApp.createServer = createServer;
module.exports = exportedApp;
