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

    $scope.getBtcPrice = function() {
      $http.get('/exchangePrices')
        .then(function(response) {
          // pull only the exchanges we care about and sort by name
          $scope.exchanges = _.sortBy(_.filter(response.data, function(e) {
            return e.name === 'bitstamp' || e.name === 'bitfinex' || e.name === 'gdax' || e.name === 'gemini';
          }), function(exchanges) {
            return exchanges.name
          });

          $scope.lastUpdated = window.moment().format('h:mm A');
        });
    };

    $scope.getBtcPrice();

    // update prices every 20 minutes
    $interval(function() {
      $scope.getBtcPrice();
    }, 200000)
});