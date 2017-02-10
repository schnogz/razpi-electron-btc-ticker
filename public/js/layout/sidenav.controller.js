angular
  .module('app')
  .controller('sidenavCtrl', function ($scope, $http, $interval) {
    $scope.menu = [{
      state: 'markets',
      title: 'Markets',
      icon: 'timeline'
    }, {
      state: 'network',
      title: 'Network',
      icon: 'language'
    }, {
      state: 'blocks',
      title: 'Blocks',
      icon: 'view_module'
    }];

    var getBtcPrice = function() {
      $http.get('/currentPrice')
        .then(function(response) {
          $scope.btcPrice = response.data.last;
        });
    };

    getBtcPrice();

    // update price every minute
    $interval(function() {
      getBtcPrice();
    }, 60000)
});