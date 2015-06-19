(function () {
	angular
		.module('app')
		.controller('PartnerController', partnerController);

	partnerController.$inject = ['$rootScope'];

	function partnerController($rootScope) {
		var vm = this,
			shell = $rootScope;

		shell.title = 'Partners';
	}
})();