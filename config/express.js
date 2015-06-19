var express = require('express'),
	bodyParser = require('body-parser'),
	load = require('express-load');

module.exports = function () {
	var app = express();
	
	//ambient configs
	app.set('views', './app/views');
	app.set('view engine', 'ejs');
	
	//middleware configs
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(express.static('./public'));

    load('models', { cwd: 'app' })
		.then('controllers')
		.then('routes')
		.into(app);

	return app;
};