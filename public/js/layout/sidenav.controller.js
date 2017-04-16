angular
  .module('app')
  .controller('sidenavCtrl', function ($scope, $http, $interval) {
    $scope.menu = [{
      state: 'markets',
      title: 'Price Chart',
      icon: 'timeline'
    }, {
      state: 'network',
      title: 'Network Stats',
      icon: 'language'
    }, {
      state: 'blocks',
      title: 'Blocks',
      icon: 'view_module'
    }];

    $scope.getExchangePrices = function() {
      $http.get('/exchangePrices')
        .then(function(response) {
          // pull only the exchanges we care about and sort by name
          $scope.exchanges = _.sortBy(_.filter(response.data, function(e) {
            return e.name === 'bitstamp' || e.name === 'bitfinex' || e.name === 'kraken' || e.name === 'gemini';
          }), function(exchanges) {
            return exchanges.name
          });

          // format last updated timestamp
          $scope.lastUpdated = window.moment().format('h:mm A');
        });
    };

    // update prices every 20 minutes
    $interval(function() {
      $scope.getExchangePrices();
    }, 200000);

    // immediately fetch exchange prices
    $scope.getExchangePrices();
});