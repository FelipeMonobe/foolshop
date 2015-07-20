(function() {
  angular
    .module('app')
    .run(init);

  init.$inject = ['$rootScope', '$alert', 'userService'];

  function init($rootScope, $alert, userService) {
    var shell = $rootScope;

    shell.username = 'guest';

    var session = userService.checkSession()
      .then(function(response) {
        if (response.sessionData)
          shell.username = response.sessionData.username;
      });

    shell.alert = function(text, isSuccess) {
      if (isSuccess)
        return $alert({
          content: text,
          title: 'Success!',
          placement: 'bottom-right',
          type: 'success',
          show: true,
          dismissable: false,
          duration: 2
        });
      return $alert({
        content: text,
        title: 'Failure!',
        placement: 'bottom-right',
        type: 'danger',
        show: true,
        dismissable: false,
        duration: 2
      });
    };
  }
})();
