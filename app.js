var exchange = require('blockchain.info/exchange');
var Socket = require('blockchain.info/Socket');
var btcMath = require('./utils/btcMath');

var socket = new Socket();

// listens for new mined blocks
socket.onBlock(function(newBlock) {
	console.log('New block mined by ' + newBlock.foundBy.description + '.' +
		' Halvening is now '+ btcMath.getHalveningProgress(newBlock.height) + '% complete!');
});

// gets current BTC price
var getBtcPrice = function() {
	exchange.getTicker({currency: 'USD'})
		.then(function(price) {
			console.log('BTC Price: $%d', price.last);
		});
};

getBtcPrice();

// logs price every 30 seconds
setInterval(getBtcPrice, 30000);
