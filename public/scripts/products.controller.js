(function() {
	angular
	.module('app')
	.controller('ProductsController', productsController);
		
	function productsController() {
		var vm = this;
		vm.products = [];
		
		vm.products = [
			{
				name: 'Product #1',
				stock: 23,
				description: 'Blabla',
				brand: 'Tora',
				price: 53.22
			},
			{
				name: 'Product #2',
				stock: 5,
				description: 'Blabla',
				brand: 'Xong',
				price: 33.28
			}
		];
	}	
})();