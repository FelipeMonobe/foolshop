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
			return $http.post('/api/addProduct', model)
			.catch(addProductError);
						
			function addProductError(error) {
				console.log('XHR failed for addProduct. ' + error.data);
			}
		}
		
		function getProduct() {
			return $http.get('/api/getProduct')
			.then(getProductSuccess)
			.catch(getProductError);
			
			function getProductSuccess(response) {
				return response.data;
			}
			
			function getProductError(error) {
				console.log('XHR failed for getProduct. ' + error.data);
			}
		}
		
		function removeProduct(id) {
			return $http.delete('/api/removeProduct/' + id)
			.catch(removeProductError);
			
			function removeProductError(error) {
				console.log('XHR failed for removeProduct. ' + error.data)
			}
		}
	}
})();