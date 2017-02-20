const BlockchainSocket = require('blockchain.info/Socket');

module.exports = function(server) {
  const io = require('socket.io').listen(server);

  io.sockets.on('connection', function(client) {
    let btcSocket = new BlockchainSocket();

    btcSocket.onOpen(function() {
      console.log('btcSocket connection established!');
    });

    btcSocket.onTransaction(function(data) {
      client.emit('newTransaction', data);
    });

    btcSocket.onBlock(function(data) {
      client.emit('newBlock', data);
    });

    client.on('disconnect', function (){
      console.log('btcSocket connection closed!')
    });
  });
};

