(function(){
  var router = angular.module('stationRouter', []);
  router.config([
    '$routeProvider',
    function($routeProvider){
      $routeProvider.
      when('/stations', {
        templateUrl: 'views/stations/index.html',
        controller: 'stationsController',
        controllerAs: 'stationsCtrl'
      }).
      when('/stations/:id', {
        templateUrl: 'views/stations/show.html',
        controller: 'stationController',
        controllerAs: 'stationCtrl'
      });
    }
  ]);
})();
