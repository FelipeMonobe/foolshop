module.exports = function(app) {
  var controller = app.controllers.product;

  app.route('/api/product/add')
    .post(controller.addProduct);

  app.route('/api/product/get')
    .get(controller.getProduct);

  app.route('/api/product/remove/:id')
    .delete(controller.removeProduct);
};
