(function () {
	angular
	.module('app')
	.controller('ProductController', productController);

	productController.$inject = ['productService', '$location', '$rootScope', '$modal', '$scope'];

	function productController(productService, $location, $rootScope, $modal, $scope) {
		var vm = this,
		shell = $rootScope,
		modal = $modal({ scope: $scope, template: 'views/modal.html', show: false });

		shell.title = 'Products';

		vm.btn_AddProduct = addProduct;
		vm.btn_OpenModal = openModal;
		vm.btn_RemoveProduct = removeProduct;
		vm.form_SaveProduct = saveProduct;
		vm.load_FetchProduct = fetchProduct;
		vm.load_products = [];

		(function init() {
			vm.load_FetchProduct();
		})();

		function openModal() {
			if(shell.username != 'guest')
				modal.show();
		}

		function addProduct() {
			function generateRandomMock() {
				var _id = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

				return {
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

		function clearFields() {
			vm.productName = undefined;
			vm.productStock = undefined;
			vm.productDescription = undefined;
			vm.productBrand = undefined;
			vm.productPrice = undefined;
		}

		function fetchProduct() {
			return productService.getProduct()
			.then(function (data) {
				vm.products = data;
				return vm.products;
			});
		}

		function removeProduct(id) {
			vm.products.forEach(function (currentValue, index) {
				if (currentValue._id === id)
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
				if (response.data.success) {
					modal.hide();
					vm.products.push(product);
					clearFields();
				}
				shell.alert(response.data.message, response.data.success);
			});
		}
	}
})();
