var sanitize = require('mongo-sanitize');

module.exports = function (app) {
	var Product = app.models.product,
		controller = {};

	controller.getProduct = function (req, res) {
		Product
			.find({ isActive: true })
			.exec()
			.then(function (products) {
			res.json(products);
		}, function (error) {
				console.log(error);
				res.status(500).json(error);
			});
	};

	controller.addProduct = function (req, res) {
		Product
			.create(req.body)
			.then(function (product) {
			res.status(201).json({ success: true, message: 'Product successfully added.', product: product });
		},
			function (error) {
				console.log(error);
				if (error.code === 11000)
					res.json({ success: false, message: 'This product already exists.' });
				res.json({ success: false, message: 'Product could not be added.' });
			});
	};

	controller.removeProduct = function (req, res) {
		var _id = sanitize(req.params.id);

		Product
			.remove({ 'id': _id })
			.exec()
			.then(function () {
			res.json({ success: true, message: 'Product#' + _id + ' was successfully deleted.' });
			res.end();
		},
			function (error) {
				return console.error(error);
			});
	};

	controller.removeAllProducts = function (req, res) {
		Product
			.remove()
			.exec()
			.then(function () {
			res.json({ success: true, message: 'All products were successfully deleted.' });
		},
			function (error) {
				return console.error(error);
			});
	};

	return controller;
};