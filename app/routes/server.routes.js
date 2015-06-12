module.exports = function(app) {
	var index = require('../controllers/index.controller'),
		api = require('../controllers/api.controller');
	
	//api
	app.get('/api/getOne', function(req, res) {
		res.json({ valor: api.getOne() });
	});
	app.get('/api/getTwo', function(req, res) {
		res.json({ valor: api.getTwo() });
	});
	
	//app
	app.get('*', index.render);
};