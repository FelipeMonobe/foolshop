(function() {
  angular
    .module('app')
    .config(configuracoes);

  configuracoes.$inject = ['$routeProvider'];

  function configuracoes($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controllerAs: 'vm',
        controller: 'HomeController'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controllerAs: 'vm',
        controller: 'AboutController'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controllerAs: 'vm',
        controller: 'ContactController'
      })
      .when('/partners', {
        templateUrl: 'views/partners.html',
        controllerAs: 'vm',
        controller: 'PartnerController'
      })
      .when('/products', {
        templateUrl: 'views/products.html',
        controllerAs: 'vm',
        controller: 'ProductController'
      })
      .when('/user/signup', {
        templateUrl: 'views/signUp.html',
        controllerAs: 'vm',
        controller: 'SignUpController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();
