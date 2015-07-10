var sanitize = require('mongo-sanitize');

module.exports = function(app) {
  var Product = app.models.product,
    controller = {};

    controller.addProduct = function(req, res) {
      Product
        .create(req.body)
        .then(addProductSuccess,
          addProductError);

      function addProductSuccess(product) {
        res.status(201).json({
          success: true,
          message: 'Product successfully added.',
          product: product
        });
      }

      function addProductError(error) {
        console.log(error);
        if (error.code === 11000)
          res.json({
            success: false,
            message: 'This product already exists.'
          });
        res.json({
          success: false,
          message: 'Product could not be added.'
        });
      }
    };

  controller.getProduct = function(req, res) {
    Product
      .find({
        isActive: true
      })
      .exec()
      .then(getProductSuccess,
        getProductError);

    function getProductSuccess(products) {
      res.json(products);
    }

    function getProductError(error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  controller.removeProduct = function(req, res) {
    var _id = sanitize(req.params.id);

    Product
      .findByIdAndUpdate(_id, {
        $set: {
          isActive: false
        }
      }, removeProductError);

    function removeProductError(error) {
      if (error)
        return console.error(error);
      res.json({
        success: true,
        message: 'Product#' + _id + ' was successfully deleted.'
      });
      res.end();
    }
  };

  return controller;
};
