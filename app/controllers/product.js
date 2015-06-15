module.exports = function(app) {
	var Product = app.models.product,
		controller = {};
	
	controller.getProduct = function(req, res) {
		Product
		.find({ isActive: true })
		.exec()
		.then(function (products) {
			res.json(products);
		}, function(err) {
			console.log(err);
			res.status(500).json(err);
		});
	};	
	return controller;
};