(function() {
  angular
    .module('app')
    .controller('userbarController', userbarController);

  userbarController.$inject = ['$scope', '$rootScope'];

  function userbarController($scope, $rootScope) {
    var vm = this,
      shell = $rootScope;

    vm.btn_SignIn = signIn;
    vm.btn_SignOut = signOut;
    vm.btn_resetPassword = resetPassword;

    function signIn() {
      if (vm.username == 'xinube' && vm.password == '123')
        return shell.username = vm.username;
      return shell.alert('Invalid Login credentials.', false);
    };

    function signOut() {
      shell.username = 'guest';
    };

    function resetPassword() {
      alert('work in progress');
    }
  }
})();
