var bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  express = require('express'),
  helmet = require('helmet'),
  load = require('express-load'),
  session = require('express-session');

module.exports = function() {
  var app = express();

  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(helmet.hidePoweredBy({
    setTo: 'PHP 5.5.14'
  }));
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
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
