module.exports = function(app) {
	var controller = app.controllers.product;
	
	app.route('/api/getProducts')
	.get(controller.getProducts);
};