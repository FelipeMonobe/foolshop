module.exports = function(app) {
	var controller = app.controllers.product;
	
	app.route('/api/getProduct')
	.get(controller.getProduct);
};