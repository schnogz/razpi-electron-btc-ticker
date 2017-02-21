angular
  .module('app.blocks', [])
  .controller('blocksCtrl', function ($scope, $http) {

    $scope.blocks = [];

    // create websocket connection
    var socket = window.io.connect('http://localhost:3001');

    // fetch latest block
    $http.get('/latestBlock')
      .then(function(resp) {
        // get last 10 blocks and format timestamps
        $scope.latestBlock = resp.data;
      });

    socket.on('newBlock', function(data) {
      console.info('NEW BLOCK' + data);
    });

    // close socket connection on page leave
    $scope.$on('$destroy', function() {
      socket.disconnect();
    });
});