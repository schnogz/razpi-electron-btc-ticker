angular
  .module('app.blocks', [])
  .controller('blocksCtrl', function ($scope, $http) {

    $scope.blocks = [];

    // create websocket connection
    var socket = window.io.connect('http://localhost:3001');

    // fetch historical blocks
    $http.get('/latestBlocks')
      .then(function(response) {
        // get last 10 blocks and format timestamps
        $scope.blocks = _.each(_.slice(response.data.blocks, 0, 10), function(block) {
          var timestamp = new Date(0);
          timestamp.setUTCSeconds(block.time);
          block.time = moment(timestamp).format('h:mm:ss A');
        });
      });

    socket.on('newBlock', function(data) {
      console.info(data)
    });

    // close socket connection on page leave
    $scope.$on('$destroy', function() {
      console.log('socket disconnected');
      socket.disconnect();
    });
});