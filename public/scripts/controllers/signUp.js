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
    vm.form_InvalidUsername = false;
    vm.form_SaveUser = saveUser;
    vm.form_CheckEmail = checkEmail;
    vm.form_CheckUsername = checkUsername;

    function checkEmail(form) {
      var email = form.email.$viewValue;
      if (!form.email.$error.pattern) {
        userService.getUserByEmail(email)
          .then(function(response) {
            if (response.data.user) {
              vm.form_InvalidEmail = true;
              return;
            }
          });
      }
      vm.form_InvalidEmail = false;
    }

    function checkUsername(form) {
      var username = form.username.$viewValue;
      if (username.length > 5) {
        userService.getUserByUsername(username)
          .then(function(response) {
            if (response.data.user) {
              vm.form_InvalidUsername = true;
              return;
            }
          });
      }
      vm.form_InvalidUsername = false;
    }
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
})();
