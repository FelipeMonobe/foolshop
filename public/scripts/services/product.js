(function() {
  angular
    .module('app')
    .factory('productService', productService);

  productService.$inject = ['$http'];

  function productService($http) {
    return {
      getProduct: getProduct,
      addProduct: addProduct,
      removeProduct: removeProduct
    };

    function addProduct(model) {
      return $http.post('/api/product/add', model)
        .catch(addProductError);

      function addProductError(error) {
        console.log('XHR failed for addProduct. ' + error.data.message);
      }
    }

    function getProduct() {
      return $http.get('/api/product/get')
        .then(getProductSuccess)
        .catch(getProductError);

      function getProductSuccess(response) {
        return response.data;
      }

      function getProductError(error) {
        console.log('XHR failed for getProduct. ' + error.data.message);
      }
    }

    function removeProduct(id) {
      return $http.delete('/api/product/remove/' + id)
        .catch(removeProductError);

      function removeProductError(error) {
        console.log('XHR failed for removeProduct. ' + error.data.message);
      }
    }
  }
})();
