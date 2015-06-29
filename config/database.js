var mongoose = require('mongoose'),
		autoIncrement = require('mongoose-auto-increment');

module.exports = function (uri) {
	mongoose.set('debug', true);

	autoIncrement.initialize(mongoose.connect(uri, { server: { poolSize: 15 } }));

	mongoose.connection.on('connected', function () {
		console.log('Mongoose connected at ' + uri);
	});

	mongoose.connection.on('disconnected', function () {
		console.log('Mongoose disconnected from ' + uri);
	});

	mongoose.connection.on('error', function (erro) {
		console.log('Mongoose erro at conection: ' + erro);
	});

	process.on('SIGINT', function () {
		mongoose.connection.close(function () {
			console.log('Mongoose disconnected by application shutdown');
			process.exit(0);
		});
	});
}
