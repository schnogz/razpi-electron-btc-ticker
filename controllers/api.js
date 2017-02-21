// dependencies
const request = require('request');
const stats = require('blockchain.info/statistics');
const blockexplorer = require('blockchain.info/blockexplorer');
const apiCode = require('./apiCode');

module.exports = {
  // fetches current BTC price across multiple exchanges
  // using X-testing header allows for 100 requests per 24 hours
  getExchangePrices: (req, res) => {
    request({
      url: 'https://apiv2.bitcoinaverage.com/exchanges/all',
      headers: { 'X-testing': 'testing' }
    }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(JSON.parse(body));
      } else {
        res.send(response);
      }
    });
  },
  // fetches historical BTC with given timespan
  // example timespan's ==> '14d' (14 days), '90d' (90 days), '1y' (1 year), 'all' (all time)
  // example request ==> https://api.blockchain.info/charts/market-price?timespan=1y
  getHistoricalPriceChart: (req, res) => {
    stats.getChartData('market-price', { timespan: req.query.timespan, apiCode: apiCode ? apiCode : null })
      .then((resp) => {
        res.send(resp);
      })
  },
  // fetches full details of latest blocks
  getLatestBlock: (req, res) => {
    blockexplorer.getLatestBlock({ apiCode: apiCode ? apiCode : null })
      .then((resp) => {
        blockexplorer.getBlock(resp.block_index, { apiCode: apiCode ? apiCode : null })
          .then((resp) => {
            res.send(resp);
          })
      })
  },
  getUnconfirmedTransactions: (reg, res) => {
    request({ url: 'https://chain.so/api/v2/get_info/BTC' }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(JSON.parse(body).data);
      } else {
        res.send(response);
      }
    });
  }
};