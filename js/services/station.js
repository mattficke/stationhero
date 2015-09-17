(function(){
  var stationServices = angular.module('stationServices', ['ngResource']);

  stationServices.factory('Station', ['$resource', function($resource) {
    return $resource('http://localhost:3000/stations/:id');
  }]);
})();
