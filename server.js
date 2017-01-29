module.exports = () => {
  /**
   * Module dependencies.
   */
  const bodyParser = require('body-parser');
  const chalk = require('chalk');
  const errorHandler = require('errorhandler');
  const express = require('express');
  const expressStatusMonitor = require('express-status-monitor');
  const logger = require('morgan');
  const path = require('path');


  /**
   * Controllers (route handlers).
   */
  const homeController = require('./controllers/home');
  const apiController = require('./controllers/api');

  /**
   * Create Express server.
   */
  const app = express();

  /**
   * Express configuration.
   */
  app.set('port', 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(expressStatusMonitor());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));

  /**
   * Primary app routes.
   */
  app.get('/', homeController.index);

  /**
   * API examples routes.
   */
//app.get('/api', apiController.getApi);

  /**
   * Error Handler.
   */
  app.use(errorHandler());

  /**
   * Start Express server.
   */
  app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });
};