var express = require('./config/express'),
	app = express(),
	port = 1337;

app.listen(port);
module.exports = app;

console.log('Server listening at http://localhost:' + port);