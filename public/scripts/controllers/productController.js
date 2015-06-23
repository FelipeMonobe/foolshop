(function () {
	angular
		.module('app')
		.controller('ProductController', productController);

	productController.$inject = ['productService', '$location', '$rootScope', '$modal', '$scope'];

	function productController(productService, $location, $rootScope, $modal, $scope) {
		var vm = this,
			shell = $rootScope;

		shell.title = 'Products';

		vm.btn_AddProduct = addProduct;
		vm.btn_OpenModal = openModal;
		vm.btn_RemoveProduct = removeProduct;
		vm.fetchProduct = fetchProduct;
		vm.products = [];
		vm.saveProduct = saveProduct;

		(function init() {
			vm.fetchProduct();
		})();

		function openModal() {
			$modal({ scope: $scope, template: 'views/modal.html' });
		}

		function addProduct() {
			function generateRandomMock() {
				var _id = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

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

			return productService.addProduct(generateRandomMock())
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
			var product = {
				name: vm.productName,
				stock: vm.productStock,
				description: vm.productDescription,
				brand: vm.productBrand,
				price: vm.productPrice
			};

			return productService.addProduct(product)
				.then(function (response) {
				vm.products.push(product);
				shell.alert(response.data.message, response.data.success);
			});
		}
	}
})();