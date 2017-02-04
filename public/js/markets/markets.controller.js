angular
  .module('app.markets', [])
  .controller('marketsCtrl', function ($scope, $http, $interval) {

    var getBtcPrice = function() {
      $http.get('/stats').then(function(response) {
        $scope.price = response.data.last;
        $scope.lastUpdated = new Date();
      });
    };

    getBtcPrice();

    // update price every minute
    $interval(function() {
      getBtcPrice();
    }, 60000)

  });