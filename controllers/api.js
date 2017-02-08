var btc = require('blockchain.info/exchange');
var stats = require('blockchain.info/statistics');

exports.getCurrentPrice = (req, res) => {
  btc.getTicker({ currency: 'USD' })
    .then((resp) => {
      res.send(resp);
    });
};

exports.getHistoricalPriceChart = (req, res) => {
    // https://blockchain.info/charts/market-price?format=json&timespan=90d
    stats.getChartData('market-price', { timespan: '90d' })
      .then((resp) => {
        res.send(resp);
    })
};