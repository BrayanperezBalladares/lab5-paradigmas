
// npm install para descargar los paquetes...

// libreriuas
var validation = require('./libs/unalib');
function createServer() {
  var app = require('express')();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', function(socket){
    socket.on('Evento-Mensaje-Server', function(msg){
      msg = validation.validateMessage(msg);
      io.emit('Evento-Mensaje-Server', msg);
    });
  });

  return { app: app, http: http, io: io };
}

if (require.main === module) {
  var server = createServer();
  var port = process.env.PORT || 3000;
  server.http.listen(port, function(){
    console.log('listening on *:' + port);
  });
}

module.exports = { createServer: createServer };
