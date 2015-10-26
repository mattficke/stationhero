(function(){
  var stationControllers = angular.module('stationControllers', ['leaflet-directive'])

  stationControllers.controller("stationsController", ['$scope', 'Station', 'Status', function($scope, Station, Status){
    var self = this;

    this.drawMarkers = function(){
      // reset map info
      this.station = undefined;
      $scope.markers = {}

      self.stations = Status.query();
      var stationIds = Station.query();
      self.stations.$promise.then(function(result){
        $scope.stations = result;
        for(var i=0; i<$scope.stations.length; i++){
          var station = $scope.stations[i]

          // match the cabi_id to the database id
          var stationId = stationIds.filter(function(station){
            return station.cabi_id == $scope.stations[i].id
          })

          $scope.markers["" + station.name + "" ] = {
            group: 'center',
            lat: parseFloat(station.lat),
            lng: parseFloat(station.long),
            message: '<h3>' + station.name + '</h3>' +
                      '<div>Available Bikes: ' + station.nbBikes + '</div>' +
                      '<div>Empty Bike Docks: ' + station.nbEmptyDocks + '</div>' +
                      '<button ng-click="stationsCtrl.showStation('+ stationId[0].id + ')">show prediction</button>',
            getMessageScope: function(){
              return $scope
            }
          }
        }
      })
    };

    this.showStation = function(id){
      this.station = Station.get({id: id})
    };

    angular.extend($scope, {
      center: {
        lat: 38.90,
        lng: -77.01,
        zoom: 12,
      },
      defaults: {
        tileLayer: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImJkN2FkOTFjNDM4OGQzNWUyYzY3NjU4ODM4ZDYwNDJmIn0.FLniij4ORShXSqRe6pcw-A'
      },
      markers: {
        // dynamically added
      },
      events: {
        map: {
          // enable: ['popupopen'],
          // logic: 'emit'
        }
      }
    });

    this.drawMarkers();

  }]);

  stationControllers.controller("stationController", ['$routeParams', '$location', 'Station', function($routeParams, $location, Station){
    this.station = Station.get({id: $routeParams.id});
  }])

})();
