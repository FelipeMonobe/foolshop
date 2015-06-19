(function () {
	angular
		.module('app')
		.controller('ContactController', contactController);

	contactController.$inject = ['$rootScope'];

	function contactController($rootScope) {
		var vm = this,
			shell = $rootScope;

		shell.title = 'Contact';
	}
})();