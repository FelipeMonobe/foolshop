var express = require('express'),
	bodyParser = require('body-parser');

module.exports = function() {
	var app = express();
	
	app.use(bodyParser.urlencoded({
        extended: true
    }));
	
	app.set('views', './app/views');
	app.set('view engine', 'ejs');
	app.use(express.static('./public'));
	require('../app/routes/server.routes.js')(app);
	return app;
};