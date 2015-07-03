(function() {
  angular
    .module('app')
    .controller('AboutController', aboutController);

  aboutController.$inject = ['$rootScope'];

  function aboutController($rootScope) {
    var vm = this,
      shell = $rootScope;

    shell.title = 'About';
  }
})();
