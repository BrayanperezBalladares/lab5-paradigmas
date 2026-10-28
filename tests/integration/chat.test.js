var assert = require('assert');
var http = require('http');
var io = require('socket.io-client');
var createServer = require('../../server').createServer;

describe('integracion del chat con una-lib', function(){
  var server;
  var client;
  var url;

  beforeEach(function(done){
    this.timeout(10000);
    server = createServer();
    server.http.listen(0, function(){
      var address = server.http.address();
      url = 'http://localhost:' + address.port;
      client = io(url, { transports: ['websocket'] });
      client.once('connect', done);
    });
  });

  afterEach(function(done){
    client.close();
    server.io.close();
    if (server.http.listening) {
      server.http.close(done);
    } else {
      done();
    }
  });

  function sendAndReceive(message, done){
    client.once('Evento-Mensaje-Server', function(response){
      done(JSON.parse(response));
    });
    client.emit('Evento-Mensaje-Server', JSON.stringify(message));
  }

  it('acepta una imagen valida y la transforma', function(done){
    sendAndReceive({
      nombre: 'Ana',
      mensaje: 'https://image.com/photo.jpg',
      color: '#123456'
    }, function(response){
      assert.equal(response.tipo, 'image');
      assert.match(response.mensaje, /^<img src="https:\/\/image\.com\/photo\.jpg"/);
      done();
    });
  });

  it('acepta un video valido y lo transforma', function(done){
    sendAndReceive({
      nombre: 'Ana',
      mensaje: 'https://youtu.be/qYwlqx-JLok',
      color: '#123456'
    }, function(response){
      assert.equal(response.tipo, 'video');
      assert.match(response.mensaje, /youtube\.com\/embed\/qYwlqx-JLok/);
      done();
    });
  });

  it('mantiene un script como texto', function(done){
    var script = "<script>alert('xss')</script>";
    sendAndReceive({
      nombre: 'Ana',
      mensaje: script,
      color: '#123456'
    }, function(response){
      assert.equal(response.tipo, 'text');
      assert.equal(response.mensaje, script);
      done();
    });
  });
});
