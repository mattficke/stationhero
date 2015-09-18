(function(){
  var stationControllers = angular.module('stationControllers', ['ngRoute', 'leaflet-directive'])

  stationControllers.controller("stationsController", ['$scope', 'Station', function($scope, Station){
    var self = this;
    this.stations = Station.query()
    this.stations.$promise.then(function(result){
      $scope.stations = result;
      for(var i=0; i<$scope.stations.length; i++){
        var stationLocation = $scope.stations[i].station_name
        $scope.markers["" + stationLocation + "" ] = {
          group: 'center',
          lat: parseFloat($scope.stations[i].latitude),
          lng: parseFloat($scope.stations[i].longitude),
          message: '<a ng-href="#/stations/' + $scope.stations[i].id + '">' + $scope.stations[i].station_name + '</a>',
          getMessageScope: function(){
            return $scope
          }
        }
      }
    })

    angular.extend($scope, {
      center: {
        lat: 38.90,
        lng: -77.01,
        zoom: 12
      },
      defaults: {
        tileLayer: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImJkN2FkOTFjNDM4OGQzNWUyYzY3NjU4ODM4ZDYwNDJmIn0.FLniij4ORShXSqRe6pcw-A'
      },
      markers: {
        // dynamically added
      },
      events: {
        map: {
          enable: ['popupopen'],
          logic: 'emit'
        }
      }
    });

  }]);

  stationControllers.controller("stationController", ['$routeParams', '$location', 'Station', function($routeParams, $location, Station){
    this.station = Station.get({id: $routeParams.id});
  }])

})();
