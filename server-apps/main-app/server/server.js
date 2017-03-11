'use strict';

// Setup global logger for app
global.logger = require('./lib/logger.js')();
global.Promise = require('bluebird');

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

// start the web server
app.start = () => {
  app.server = app.listen(() => {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    logger.info('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      logger.info('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
    if (process.env.NODE_ENV !== 'testing') {
      process.on('uncaughtException', (err) => {
        // Operational error, log and exit...
        logger.error({ err }, err.description || 'Operational error... will exit');
        setTimeout(process.exit, 1000, 1); // exit after 1 second
      });
    }
  });
  return app.server;
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});
