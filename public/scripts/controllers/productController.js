(function () {
	angular
		.module('app')
		.controller('ProductController', productController);

	productController.$inject = ['productService', '$location', '$alert', '$rootScope'];

	function productController(productService, $location, $alert, $rootScope) {
		var vm = this,
			shell = $rootScope;

		shell.title = 'Products';

		vm.btn_AddProduct = addProduct;
		vm.btn_RemoveProduct = removeProduct;
		vm.products = [];
		vm.fetchProduct = fetchProduct;

		(function init() {
			vm.fetchProduct();
		})();

		function addProduct() {
			function generateRandomMock() {
				var input = prompt('Product ID: '),
					_id = (isNaN(input) || input <= 0) ? Math.floor(Math.random() * (100 - 1 + 1)) + 1 : parseInt(input);

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
				if (response.data.success) {
					vm.products.push(response.data.product);
					$alert({ content: response.data.message, title: 'Success!', placement: 'bottom-right', type: 'success', show: true, dismissable: false, duration: 2 });
				}
				else
					$alert({ content: response.data.message, title: 'Failure!', placement: 'bottom-right', type: 'danger', show: true, dismissable: false, duration: 2 });
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
				if (response.data.success) {
					vm.products = [];
					$alert({ content: response.data.message, title: 'Success!', placement: 'bottom-right', type: 'success', show: true, dismissable: false, duration: 2 });
				}
				else
					$alert({ content: response.data.message, title: 'Failure!', placement: 'bottom-right', type: 'danger', show: true, dismissable: false, duration: 2 });
			});
		}

		function removeProduct(id) {
			vm.products.forEach(function (currentValue, index) {
				if (currentValue.id === id)
					vm.products.splice(index, 1);
			});
			return productService.removeProduct(id);
		}
	}
})();