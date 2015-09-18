(function(){
  var stationServices = angular.module('stationServices', ['ngResource']);

  stationServices.factory('Station', ['$resource', function($resource) {
    return $resource('https://stationhero.herokuapp.com/stations/:id');
  }]);
})();
