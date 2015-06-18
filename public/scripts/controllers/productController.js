(function() {
	angular
	.module('app')
	.controller('ProductController', productController);
	
	productController.$inject = ['productService', '$location', '$alert'];
		
	function productController(productService, $location, $alert) {
		var vm = this;
		
		vm.btn_AddProduct = addProduct;
		vm.btn_RemoveProduct = removeProduct;
		vm.products = [];
		vm.fetchProduct = fetchProduct;
		
		(function init() {
			vm.fetchProduct();
			})();
		
		function addProduct() {
			var mock = {
				id: 22,
				name: 'Mock2',
				stock: 9001,
				description: undefined,
				brand: undefined,
				price: 13.37,
				creationDate: undefined,
				isActive: true
			};
			
			return productService.addProduct(mock)
			.then(function(data) {
				vm.products = data;
				return vm.products;
			});
		}
		
		function fetchProduct() {
			return productService.getProduct()
			.then(function(data) {
				vm.products = data;
				return vm.products;
			});
		}
		
		function removeProduct(id) {
			return productService.removeProduct(id);
		}
	}	
})();