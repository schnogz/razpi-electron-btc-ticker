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
      $http.get('/exchangePrices')
        .then(function(response) {
          // pull only the exchanges we care about and sort by name
          $scope.exchanges = _.sortBy(_.filter(response.data, function(e) {
            return e.name === 'bitstamp' || e.name === 'bitfinex' || e.name === 'gdax' || e.name === 'gemini';
          }), function(exchanges) {
            return exchanges.name
          });

          $scope.lastUpdated = 'now';
        });
    };

    getBtcPrice();

    // update prices every minute
    $interval(function() {
      $scope.previous = angular.copy($scope.exchanges);
      getBtcPrice();
    }, 60000)
});