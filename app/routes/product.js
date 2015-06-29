module.exports = function (app) {
	var controller = app.controllers.product;

	app.route('/api/getProduct')
		.get(controller.getProduct);

	app.route('/api/addProduct')
		.post(controller.addProduct);

	app.route('/api/removeProduct/:id')
		.delete(controller.removeProduct);
};
