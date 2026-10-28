// modulo de ejemplo.

module.exports = {


    // logica que valida si un telefono esta correcto...
    is_valid_phone: function (phone) {
      // inicializacion lazy
      var isValid = false;
      // expresion regular copiada de StackOverflow
      var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;
  
      // validacion Regex
      try {
        isValid = re.test(phone);
      } catch (e) {
        console.log(e);
      } finally {
          return isValid;
      }
      // fin del try-catch block
    },
  
    is_valid_url_image: function (url) {
      if (typeof url !== 'string') {
        return false;
      }

      try {
        var parsedUrl = new URL(url);
        return ['http:', 'https:'].includes(parsedUrl.protocol) &&
          /\.(jpg|gif|png|jpeg|bmp)$/i.test(parsedUrl.pathname);
      } catch (e) {
        return false;
      }
    },
  
    is_valid_yt_video: function (url) {
      if (typeof url !== 'string') {
        return false;
      }

      try {
        var parsedUrl = new URL(url);
        var hostname = parsedUrl.hostname.toLowerCase();
        var videoId = '';

        if (hostname === 'youtu.be') {
          videoId = parsedUrl.pathname.slice(1);
        } else if (hostname === 'youtube.com' || hostname === 'www.youtube.com') {
          if (parsedUrl.pathname === '/watch') {
            videoId = parsedUrl.searchParams.get('v') || '';
          } else if (/^\/(embed|v)\/[^/]+$/.test(parsedUrl.pathname)) {
            videoId = parsedUrl.pathname.split('/')[2];
          }
        }

        return ['http:', 'https:'].includes(parsedUrl.protocol) &&
          /^[A-Za-z0-9_-]{11}$/.test(videoId);
      } catch (e) {
        return false;
      }
    },
  
    getYTVideoId: function(url){
      var parsedUrl = new URL(url);
      var hostname = parsedUrl.hostname.toLowerCase();

      if (hostname === 'youtu.be') {
        return parsedUrl.pathname.slice(1);
      }

      if (parsedUrl.pathname === '/watch') {
        return parsedUrl.searchParams.get('v');
      }

      return parsedUrl.pathname.split('/')[2];
    },
  
    getEmbeddedCode: function (url){
      var id = this.getYTVideoId(url);
      var code = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+id+ '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      return code;
    },
  
    getImageTag: function(url){
      var tag = '<img src="'+url+'" style="max-height: 400px;max-width: 400px;">';
      return tag;
    },
  
    validateMessage: function(msg){
      // Handle invalid input
      if (!msg || typeof msg !== 'string') {
        return JSON.stringify({ mensaje: '' });
      }

      try {
        var obj = JSON.parse(msg);

        if (!obj || typeof obj !== 'object' || Array.isArray(obj) ||
          typeof obj.mensaje !== 'string') {
          return JSON.stringify({ mensaje: '', tipo: 'text' });
        }

        if (this.is_valid_url_image(obj.mensaje)) {
          obj.tipo = 'image';
          obj.mensaje = this.getImageTag(obj.mensaje);
        } else if (this.is_valid_yt_video(obj.mensaje)) {
          obj.tipo = 'video';
          obj.mensaje = this.getEmbeddedCode(obj.mensaje);
        } else {
          obj.tipo = 'text';
        }

        return JSON.stringify(obj);
      } catch (e) {
        console.log('Error processing message:', e.message);
        return JSON.stringify({ mensaje: '', tipo: 'text' });
      }
    }
  
  
  
    
    
  
  // fin del modulo
  };
  