(function() {
	angular
	.module('app')
	.controller('AsideController', asideController);
	
	asideController.$inject = ['$scope'];
	
	function asideController($scope) {
		$scope.aside = { title: 'Hello, [user]!', content: 'Login/Logoff, opções de conta' };
	}
})();