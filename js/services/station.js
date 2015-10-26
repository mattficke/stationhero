(function(){
  var stationServices = angular.module('stationServices', ['ngResource']);

  stationServices.factory('Station', ['$resource', function($resource) {
    return $resource('http://stationhero.com/stations/:id');
  }]);

  stationServices.factory('Status', ['$resource', function($resource) {
    return $resource('http://stationhero.com/stations/status');
  }]);

})();
