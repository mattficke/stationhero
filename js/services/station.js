(function(){
  var stationServices = angular.module('stationServices', ['ngResource']);

  stationServices.factory('Station', ['$resource', function($resource) {
    return $resource('http://104.236.23.213/stations/:id');
  }]);
})();
