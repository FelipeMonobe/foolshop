(function () {
	angular
		.module('app')
		.run(init);

	init.$inject = ['$rootScope', '$alert'];

	function init($rootScope, $alert) {
		var shell = $rootScope;

		shell.username = 'guest';
		shell.alert = function (text, isSuccess) {
			if (isSuccess)
				return $alert({ content: text, title: 'Success!', placement: 'bottom-right', type: 'success', show: true, dismissable: false, duration: 2 });
			return $alert({ content: text, title: 'Failure!', placement: 'bottom-right', type: 'danger', show: true, dismissable: false, duration: 2 });
		};
	}
})();