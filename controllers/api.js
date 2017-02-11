// dependencies
var btc = require('blockchain.info/exchange');
var stats = require('blockchain.info/statistics');
var apiCode = require('./apiCode');

// fetches current BTC price in USD
// example request ==> https://api.blockchain.info/ticker
exports.getCurrentPrice = (req, res) => {
  btc.getTicker({ currency: 'USD', apiCode: apiCode ? apiCode : null })
    .then((resp) => {
      res.send(resp);
    });
};

// fetches historical BTC with given timespan
// example timespan's ==> '14d' (14 days), '90d' (90 days), '1y' (1 year), 'all' (all time)
// example request ==> https://api.blockchain.info/charts/market-price?timespan=1y
exports.getHistoricalPriceChart = (req, res) => {
  stats.getChartData('market-price', { timespan: req.query.timespan, apiCode: apiCode ? apiCode : null })
    .then((resp) => {
      res.send(resp);
  })
};