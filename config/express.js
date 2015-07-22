var bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  express = require('express'),
  load = require('express-load'),
  multer = require('multer'),
  session = require('express-session');

module.exports = function() {
  var app = express();

  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.use(multer({ dest: './app/uploads/'}).single('productImage'));

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
