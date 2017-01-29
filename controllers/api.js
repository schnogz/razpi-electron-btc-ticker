var btc = require('blockchain.info/exchange');

exports.getStats = (req, res) => {
  btc.getTicker({ currency: 'USD' }).then(function(resp) {
    res.send(resp);
  });
};