var Hapi = require('hapi');
var CV = require('opencv');
var FS = require('fs');

var server = new Hapi.Server();
var recognizer = new CV.FaceRecognizer();

server.connection({port: 3000});

server.route([
  {
    method: 'POST',
    path: '/api/face',
    handler: function(request, reply) {
      var photo = request.payload.photo;
      var prediction = recognizer.predictSync(photo.path);

      FS.unlink(photo.path, function(err) {
        return reply(prediction);
      });
    }
  },
  {
    method: 'POST',
    path: '/api/profile/{id}/face',
    handler: function(request, reply) {
      var photo = request.payload.photo;
      var id = request.params.id;

      recognizer.updateSync([[id, photo]]);
      FS.unlink(photo.path, function(err) {
        return reply({updated: id});
      });
    }
  }
]);

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'public'
    }
  }
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
