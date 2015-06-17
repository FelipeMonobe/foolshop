(function() {
	angular
	.module('app')
	.controller('ProductController', productController);
	
	productController.$inject = ['productService'];
		
	function productController(productService) {
		var vm = this;
		vm.products = [];
		vm.fetchProduct = fetchProduct;
		
		function fetchProduct() {
			return productService.getProduct()
			.then(function(data) {
				vm.products = data;
				return vm.products;
			});
		}
		
		// vm.products = [
		// 	{
		// 		name: 'Product #1',
		// 		stock: 23,
		// 		description: 'Blabla',
		// 		brand: 'Tora',
		// 		price: 53.22
		// 	},
		// 	{
		// 		name: 'Product #2',
		// 		stock: 5,
		// 		description: 'Blabla',
		// 		brand: 'Xong',
		// 		price: 33.28
		// 	}
		// ];
	}	
})();