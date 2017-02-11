var btc = require('blockchain.info/exchange');
var stats = require('blockchain.info/statistics');
var apiCode = require('./apiCode');

exports.getCurrentPrice = (req, res) => {
  btc.getTicker({ currency: 'USD', apiCode: apiCode ? apiCode : null })
    .then((resp) => {
      res.send(resp);
    });
};

exports.getHistoricalPriceChart = (req, res) => {
  stats.getChartData('market-price', { timespan: req.query.timespan, apiCode: apiCode ? apiCode : null })
    .then((resp) => {
      res.send(resp);
  })
};