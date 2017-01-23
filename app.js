var exchange = require('blockchain.info/exchange');


// gets current BTC price
var getBtcPrice = function() {
	exchange.getTicker({currency: 'USD'})
		.then(function(price) {
			console.log('$%d', price.last);
		});
};

// logs price every 30 seconds
setInterval(getBtcPrice, 30000);
