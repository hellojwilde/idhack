var Hapi = require('hapi');
var OpenCV = require('opencv');

var server = new Hapi.Server();

server.connection({port: 3000});

// POST /api/face -> returns profile ID if it exists
// POST /api/profile -> create new profile with specified face

server.route([
  {
    method: 'POST',
    path: '/api/face',
    handler: {

    }
  },
  {
    method: 'POST',
    path: '/api/profile',
    handler: {

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
