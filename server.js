module.exports = () => {
  // dependencies
  const bodyParser = require('body-parser');
  const chalk = require('chalk');
  const errorHandler = require('errorhandler');
  const express = require('express');
  const expressStatusMonitor = require('express-status-monitor');
  const http = require('http');
  const logger = require('morgan');
  const path = require('path');
  const apiController = require('./controllers/api');
  const socketController = require('./controllers/socket');

  // configure express
  const app = express();
  app.set('port', 3000);
  app.use(expressStatusMonitor());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(path.join(__dirname, 'public')));

  // endpoint definitions
  app.get('/exchangePrices', apiController.getExchangePrices);
  app.get('/priceChart', apiController.getHistoricalPriceChart);
  app.get('/latestBlocks', apiController.getLatestBlocks);

  // error handler
  app.use(errorHandler());

  // start express
  app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });

  // setup socket listener
  let socketListener = http.createServer(app).listen(3001);
  socketController(socketListener);
};