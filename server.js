module.exports = () => {
  // dependencies
  const bodyParser = require('body-parser');
  const chalk = require('chalk');
  const errorHandler = require('errorhandler');
  const express = require('express');
  const expressStatusMonitor = require('express-status-monitor');
  const logger = require('morgan');
  const path = require('path');
  const homeController = require('./controllers/home');
  const apiController = require('./controllers/api');
  const app = express();

  // configure express
  app.set('port', 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(expressStatusMonitor());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));


  // endpoint definitions
  app.get('/', homeController.index);
  app.get('/stats', apiController.getStats);

  // error handler
  app.use(errorHandler());

  // start express
  app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });
};