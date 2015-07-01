(function() {
  angular
    .module('app')
    .controller('HomeController', homeController);

  homeController.$inject = ['$rootScope'];

  function homeController($rootScope) {
    var vm = this,
      shell = $rootScope;

    shell.title = 'Home';
  }
})();
