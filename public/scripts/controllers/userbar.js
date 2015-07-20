(function() {
  angular
    .module('app')
    .controller('userbarController', userbarController);

  userbarController.$inject = ['$scope', '$rootScope', 'userService'];

  function userbarController($scope, $rootScope, userService) {
    var vm = this,
      shell = $rootScope;

    vm.btn_SignIn = signIn;
    vm.btn_SignOut = signOut;
    vm.btn_resetPassword = resetPassword;

    function signIn() {
      userService.signIn(vm.username, vm.password)
        .then(function(response) {
          if (response.data.success)
            shell.username = response.data.user.username;
          shell.alert(response.data.message, response.data.success);
        });
    }

    function signOut() {
      userService.signOut()
        .then(function(response) {
          if (response.data.success)
            shell.username = 'guest';
          shell.alert(response.data.message, response.data.success);
        });
    }

    function resetPassword() {
      shell.alert('Work in progress...', false);
    }
  }
})();
