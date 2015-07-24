(function() {
  angular
    .module('app')
    .controller('ContactController', contactController);

  contactController.$inject = ['$rootScope'];

  function contactController($rootScope) {
    var vm = this,
      shell = $rootScope;

    shell.title = 'Contact';
    vm.googleMaps_Load = googleMaps_Load;

    (function init() {
      vm.googleMaps_Load();
    })();

    function googleMaps_Load() {
      var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: {
          lat: -23.596924,
          lng: -46.728920
        }
      });

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(-23.596924,-46.728920),
        map: map
      });
    }
  }
})();
