(function() {
  angular
    .module('app')
    .controller('ProductController', productController);

  productController.$inject = ['productService', '$location', '$rootScope', '$modal', '$scope', 'Upload', '$timeout'];

  function productController(productService, $location, $rootScope, $modal, $scope, Upload, $timeout) {
    var vm = this,
      shell = $rootScope,
      modal = $modal({
        scope: $scope,
        template: 'views/modal.html',
        show: false
      });

    shell.title = 'Products';

    vm.form_AddProduct = addProduct;
    vm.btn_OpenModal = openModal;
    vm.btn_RemoveProduct = removeProduct;
    vm.load_FetchProduct = fetchProduct;
    vm.load_products = [];
    vm.form_UploadImage = uploadImage;

    vm.progress = 0;
    vm.showProgress = false;

    function addProduct() {
      var product = {
        name: vm.productName,
        stock: vm.productStock,
        description: vm.productDescription,
        brand: vm.productBrand,
        price: vm.productPrice,
        image: vm.productImage
      };

      return productService.addProduct(product)
        .then(function(response) {
          if (response.data.success) {
            modal.hide();
            vm.products.push(product);
            clearFields();
          }
          shell.alert(response.data.message, response.data.success);
        });
    }

    (function init() {
      vm.load_FetchProduct();
    })();

    function openModal() {
      if (shell.username != 'guest')
        modal.show();
    }

    function clearFields() {
      vm.productName = undefined;
      vm.productStock = undefined;
      vm.productDescription = undefined;
      vm.productBrand = undefined;
      vm.productPrice = undefined;
      vm.productImage = undefined;
    }

    function fetchProduct() {
      return productService.getProduct()
        .then(function(data) {
          vm.products = data;
          return vm.products;
        });
    }

    function removeProduct(id) {
      vm.products.forEach(function(currentValue, index) {
        if (currentValue._id === id)
          vm.products.splice(index, 1);
      });
      return productService.removeProduct(id)
        .then(function(response) {
          shell.alert(response.data.message, response.data.success);
        });
    }

    function uploadImage(file) {
      if (file.length) {
        Upload.upload({
            url: '/api/product/uploadImage',
            fields: {
              'name': vm.productName,
              'stock': vm.productStock,
              'description': vm.productDescription,
              'brand': vm.productBrand,
              'price': vm.productPrice
            },
            file: file[0],
            fileName: 'productImage.jpeg'
          })
          .progress(function(evt) {
            vm.showProgress = true;
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            vm.progress = progressPercentage;
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          })
          .success(function(data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
          })
          .error(function(data, status, headers, config) {
            console.log('error status: ' + status);
          });
      }
    }
  }
})();
