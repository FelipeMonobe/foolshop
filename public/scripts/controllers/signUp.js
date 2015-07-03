(function() {
  angular
    .module('app')
    .controller('SignUpController', signUpController);

  signUpController.$inject = ['$scope', '$rootScope', 'userService', '$location'];

  function signUpController($scope, $rootScope, userService, $location) {
    var vm = this,
      shell = $rootScope;

    shell.title = 'Sign Up';

    vm.form_SaveUser = saveUser;

    function saveUser() {
      var user = {
        username: vm.username,
        email: vm.email,
        password: vm.password
      };

      return userService.addUser(user)
        .then(function(response) {
          if (response.data.success) {
            $location.path('/');
            shell.username = user.username;
          }
          shell.alert(response.data.message, response.data.success);
        });
    }
  }
})();
