(function() {
  angular
    .module('app')
    .controller('SignUpController', signUpController);

  signUpController.$inject = ['$scope', '$rootScope', 'userService', '$location'];

  function signUpController($scope, $rootScope, userService, $location) {
    var vm = this,
      shell = $rootScope;

    shell.title = 'Sign Up';

    vm.form_InvalidEmail = false;
    vm.form_SaveUser = saveUser;
    vm.form_CheckEmail = checkEmail;
    vm.form_CheckUsername = checkUsername;

    function checkEmail(form) {
      if(!form.email.$error.pattern) {
      return userService.getUserByEmail(vm.email)
        .then(getUserByEmailSuccess);

      function getUserByEmailSuccess(response) {
        if(response.data.user)
        return vm.form_InvalidEmail = true;
        return vm.form_InvalidEmail = false;          
      }
      }
      return vm.form_InvalidEmail = false;
    }

    function checkUsername() {

    }

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
