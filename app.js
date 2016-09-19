var declaire = require('declaire');
var _ = declaire.utils;

app = declaire.Application({
  baseUrl: '/pages',
  mongoDevUrl: 'mongodb://127.0.0.1:27017/echolot',
  npmPublic: ['font-awesome']
});

app.use(require('./src/views/EchoView.js'));

app.init(function(start, express, db) {
  start();
});
