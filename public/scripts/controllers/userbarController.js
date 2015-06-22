(function () {
	angular
		.module('app')
		.controller('userbarController', userbarController);

	userbarController.$inject = ['$scope', '$rootScope'];

	function userbarController($scope, $rootScope) {
		var vm = this,
			shell = $rootScope;

		vm.btn_LogOff = logOff;
		vm.btn_LogIn = logIn;
		vm.btn_resetPassword = resetPassword;

		function logIn() {
			if (vm.username == 'xinube' && vm.password == '123')
				return shell.username = vm.username;
			return shell.alert('Invalid Login credentials.', false);
		};

		function logOff() {
			shell.username = 'guest';
		};

		function resetPassword() {
			alert('work in progress');
		}
	}
})();