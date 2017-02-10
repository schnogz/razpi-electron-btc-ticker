var btc = require('blockchain.info/exchange');
var stats = require('blockchain.info/statistics');

exports.getCurrentPrice = (req, res) => {
  btc.getTicker({ currency: 'USD' })
    .then((resp) => {
      res.send(resp);
    });
};

exports.getHistoricalPriceChart = (req, res) => {
  stats.getChartData('market-price', { timespan: req.query.timespan })
    .then((resp) => {
      res.send(resp);
  })
};