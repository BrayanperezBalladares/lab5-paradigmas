var val = require('../libs/unalib');
var assert = require('assert');


describe('unalib', function(){


  describe('funcion is_valid_phone', function(){

    it('deberia devolver true para 8297-8547', function(){

      assert.equal(val.is_valid_phone('8297-8547'), true);

    });

    it('deberia devolver false para 8297p-8547', function(){

      assert.equal(val.is_valid_phone('8297p-8547'), false);

    });

  });


  describe('funcion is_valid_url_image', function(){

    it('deberia devolver true para http://image.com/image.jpg', function(){

      assert.equal(val.is_valid_url_image('http://image.com/image.jpg'), true);

    });

    it('deberia devolver true para http://image.com/image.gif', function(){

      assert.equal(val.is_valid_url_image('http://image.com/image.gif'), true);

    });

    it('deberia devolver false para una URL sin extension de imagen', function(){

      assert.equal(val.is_valid_url_image('https://image.com/image'), false);

    });

    it('deberia devolver false para un esquema no permitido', function(){

      assert.equal(val.is_valid_url_image('javascript:alert(1).jpg'), false);

    });

    it('deberia aceptar extensiones de imagen en mayusculas y con query string', function(){

      assert.equal(val.is_valid_url_image('https://image.com/photo.PNG?size=large'), true);

    });

    it('deberia devolver false para un valor que no sea texto', function(){

      assert.equal(val.is_valid_url_image(null), false);
      assert.equal(val.is_valid_url_image({}), false);

    });
  });

  describe('funcion is_valid_yt_video', function(){

    it('deberia devolver true para una URL de YouTube', function(){

      assert.equal(val.is_valid_yt_video('https://www.youtube.com/watch?v=qYwlqx-JLok'), true);

    });

    it('deberia devolver false para una URL que no es de YouTube', function(){

      assert.equal(val.is_valid_yt_video('https://videos.example.com/watch?v=qYwlqx-JLok'), false);

    });

    [
      'https://youtu.be/qYwlqx-JLok',
      'https://www.youtube.com/embed/qYwlqx-JLok',
      'https://youtube.com/v/qYwlqx-JLok'
    ].forEach(function(url){
      it('deberia aceptar el formato de YouTube ' + url, function(){

        assert.equal(val.is_valid_yt_video(url), true);

      });
    });

    it('deberia devolver false para un identificador de video invalido', function(){

      assert.equal(val.is_valid_yt_video('https://youtu.be/corto'), false);
      assert.equal(val.is_valid_yt_video(123), false);

    });

  });

  describe('funcion validateMessage', function(){

    it('deberia convertir una imagen valida en una etiqueta img', function(){

      var result = JSON.parse(val.validateMessage(JSON.stringify({
        nombre: 'Ana',
        mensaje: 'https://image.com/image.jpg',
        color: '#123456'
      })));

      assert.match(result.mensaje, /^<img src="https:\/\/image\.com\/image\.jpg"/);
      assert.equal(result.tipo, 'image');
      assert.equal(result.nombre, 'Ana');
      assert.equal(result.color, '#123456');

    });

    it('deberia convertir un video valido en un iframe', function(){

      var result = JSON.parse(val.validateMessage(JSON.stringify({
        nombre: 'Ana',
        mensaje: 'https://www.youtube.com/watch?v=qYwlqx-JLok',
        color: '#123456'
      })));

      assert.match(result.mensaje, /youtube\.com\/embed\/qYwlqx-JLok/);
      assert.equal(result.tipo, 'video');

    });

    it('deberia conservar los metadatos al convertir multimedia', function(){

      var result = JSON.parse(val.validateMessage(JSON.stringify({
        nombre: 'Usuario <principal>',
        mensaje: 'https://youtu.be/qYwlqx-JLok',
        color: '#ABCDEF',
        sala: 'laboratorio'
      })));

      assert.equal(result.nombre, 'Usuario <principal>');
      assert.equal(result.color, '#ABCDEF');
      assert.equal(result.sala, 'laboratorio');
      assert.equal(result.tipo, 'video');

    });

    it('deberia conservar un mensaje de texto', function(){

      var result = JSON.parse(val.validateMessage(JSON.stringify({
        nombre: 'Ana',
        mensaje: 'Hola grupo',
        color: '#123456'
      })));

      assert.equal(result.mensaje, 'Hola grupo');
      assert.equal(result.tipo, 'text');

    });

    it('deberia conservar un script como texto sin generar HTML', function(){

      var maliciousMessage = "<script>alert('Inyeccion')</script>";
      var result = JSON.parse(val.validateMessage(JSON.stringify({
        nombre: 'Ana',
        mensaje: maliciousMessage,
        color: '#123456'
      })));

      assert.equal(result.mensaje, maliciousMessage);
      assert.equal(result.tipo, 'text');
      assert.equal(val.is_valid_url_image(result.mensaje), false);
      assert.equal(val.is_valid_yt_video(result.mensaje), false);

    });

    it('deberia conservar HTML con eventos como texto', function(){

      var maliciousMessage = '<img src=x onerror=alert(1)>';
      var result = JSON.parse(val.validateMessage(JSON.stringify({
        nombre: 'Ana',
        mensaje: maliciousMessage,
        color: '#123456'
      })));

      assert.equal(result.mensaje, maliciousMessage);
      assert.equal(result.tipo, 'text');

    });

    it('deberia conservar esquemas peligrosos como texto', function(){

      var maliciousMessage = 'javascript:alert(1)';
      var result = JSON.parse(val.validateMessage(JSON.stringify({
        nombre: 'Ana',
        mensaje: maliciousMessage,
        color: '#123456'
      })));

      assert.equal(result.mensaje, maliciousMessage);
      assert.equal(result.tipo, 'text');
      assert.equal(val.is_valid_url_image(result.mensaje), false);
      assert.equal(val.is_valid_yt_video(result.mensaje), false);

    });

    ['data:text/html,<script>alert(1)</script>', 'vbscript:alert(1)']
      .forEach(function(dangerousScheme){
        it('deberia rechazar el esquema ' + dangerousScheme.split(':')[0], function(){

          var result = JSON.parse(val.validateMessage(JSON.stringify({
            nombre: 'Ana',
            mensaje: dangerousScheme,
            color: '#123456'
          })));

          assert.equal(result.mensaje, dangerousScheme);
          assert.equal(result.tipo, 'text');

        });
      });

    it('deberia devolver una estructura segura para JSON malformado', function(){

      var result = JSON.parse(val.validateMessage('<script>alert(1)</script>'));

      assert.equal(result.mensaje, '');

    });

    it('deberia normalizar un campo mensaje que no sea texto', function(){

      var result = JSON.parse(val.validateMessage(JSON.stringify({
        nombre: 'Ana',
        mensaje: { html: '<script>alert(1)</script>' },
        color: '#123456'
      })));

      assert.equal(result.mensaje, '');

    });
  });

});


