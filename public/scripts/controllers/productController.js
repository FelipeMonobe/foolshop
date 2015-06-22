(function () {
	angular
		.module('app')
		.controller('ProductController', productController);

	productController.$inject = ['productService', '$location', '$rootScope', '$modal', '$scope'];

	function productController(productService, $location, $rootScope, $modal, $scope) {
		var vm = this,
			shell = $rootScope;

		shell.title = 'Products';

		vm.teste = teste;
		vm.teste2 = teste2;
		vm.btn_AddProduct = addProduct;
		vm.btn_RemoveProduct = removeProduct;
		vm.saveProduct = saveProduct;
		vm.products = [];
		vm.fetchProduct = fetchProduct;

		(function init() {
			vm.fetchProduct();
		})();

		function teste() {
			$modal({scope: $scope, template: 'views/modal.html'});
		}
		
		function teste2() {
			shell.alert('foi', true);
		}

		function addProduct() {
			function generateRandomMock() {
				var input = prompt('Product ID: '),
					_id = (isNaN(input) || input <= 0) ?
						Math.floor(Math.random() * (100 - 1 + 1)) + 1 :
						parseInt(input);

				return {
					id: _id,
					name: 'Product#' + _id,
					stock: _id * 3,
					description: undefined,
					brand: undefined,
					price: (123 / _id).toFixed(2),
					creationDate: undefined,
					isActive: true
				};
			};

			var mock = generateRandomMock();

			if (mock.id === 666)
				return removeAllProducts();

			return productService.addProduct(mock)
				.then(function (response) {
				if (response.data.success)
					vm.products.push(response.data.product);
				shell.alert(response.data.message, response.data.success);
				return vm.products;
			});
		}

		function fetchProduct() {
			return productService.getProduct()
				.then(function (data) {
				vm.products = data;
				return vm.products;
			});
		}

		function removeAllProducts() {
			return productService.removeAllProducts()
				.then(function (response) {
				if (response.data.success)
					vm.products = [];
				shell.alert(response.data.message, response.data.success);
			});
		}

		function removeProduct(id) {
			vm.products.forEach(function (currentValue, index) {
				if (currentValue.id === id)
					vm.products.splice(index, 1);
			});
			return productService.removeProduct(id)
				.then(function (response) {
				shell.alert(response.data.message, response.data.success);
			});
		}
		
		function saveProduct() {
			debugger;			
			return productService;
		}
	}
})();