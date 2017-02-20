angular
  .module('app.network', [])
  .controller('networkCtrl', function ($scope) {

    // create websocket connection
    var socket = window.io.connect('http://localhost:3001');

    $scope.transactions = [];

    //
    // Socket events
    //
    socket.on('newTransaction', function(data) {
      $scope.transactions.push(data);
      $scope.transactions = _.reverse(_.takeRight($scope.transactions, 10));
      $scope.$apply();
    });

    // close socket connection on page leave
    $scope.$on('$destroy', function() {
      console.log('socket disconnected');
      socket.disconnect();
    });
});