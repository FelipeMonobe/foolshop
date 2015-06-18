var sanitize = require('mongo-sanitize');

module.exports = function(app) {
	var Product = app.models.product,
		controller = {};
	
	controller.getProduct = function(req, res) {
		Product
		.find({ isActive: true })
		.exec()
		.then(function (products) {
			res.json(products);
		}, function(error) {
			console.log(error);
			res.status(500).json(error);
		});
	};
	
	controller.addProduct = function(req, res) {
		Product
		.create(req.body)
		.then(function (product) {
			res.status(201).json(product);
		},
		function (error) {
			console.log(error);
			res.status(500).json(error);
		});
	};
	
	controller.removeProduct = function(req, res) {
		var _id = sanitize(req.params.id);
		
		Product
		.remove({'id': _id})
		.exec()
		.then(function() {
			res.end();
		},
		function(error) {
			return console.error(error);
		});
	};
	
	return controller;
};