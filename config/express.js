var express = require('express'),
  bodyParser = require('body-parser'),
  load = require('express-load'),
  cookieParser = require('cookie-parser'),
  session = require('express-session');

module.exports = function() {
  var app = express();

  //environment configs
  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  //middleware configs
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(express.static('./public'));
  app.use(cookieParser());
  app.use(session({
    secret: 'hRlsmN62D7aB3'
  }));

  load('models', {
      cwd: 'app'
    })
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};
