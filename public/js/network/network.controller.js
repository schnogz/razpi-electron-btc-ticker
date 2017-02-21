angular
  .module('app.network', [])
  .controller('networkCtrl', function ($scope, $http, $interval) {

    $scope.transactions = [];

    // create websocket connection
    var socket = window.io.connect('http://localhost:3001');

    var getUnconfirmedTransactions = function() {
      $http.get('/unconfirmedTransactions')
        .then(function(resp) {
          $scope.unconfirmedTransactions = resp.data.unconfirmed_txs;
        });
    };

    getUnconfirmedTransactions();

    //
    // Socket events
    //
    socket.on('newTransaction', function(data) {
      $scope.transactions.push(data);
      $scope.transactions = _.reverse(_.takeRight($scope.transactions, 10));
      $scope.$apply();
    });

    // update unconfirmed count every 15 seconds
    var tnxsInterval = $interval(function() {
      getUnconfirmedTransactions();
    }, 15000);

    // stop interval calls and close socket connection on page leave
    $scope.$on('$destroy', function() {
      socket.disconnect();
      $interval.cancel(tnxsInterval);
    });
});