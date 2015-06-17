(function() {
	angular
	.module('app')
	.factory('productService', productService);
	
	productService.$inject = ['$http'];
	
	function productService($http) {
		return {
			getProduct: getProduct
		};
		
		function getProduct() {
			return $http.get('/api/getProduct')
			.then(getProductSuccess)
			.catch(getProductError);
			
			function getProductSuccess(response) {
				return response.data.results;
			}
			
			function getProductError(error) {
				console.log('XHR failed for getProduct. ' + error.data);
			}
		}
	}
})();