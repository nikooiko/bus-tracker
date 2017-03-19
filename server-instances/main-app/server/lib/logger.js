'use strict';

const bunyan = require('bunyan');

function reqSerializer(req) {
  return {
    method: req.method,
    url: req.url,
    remoteAddress: req.connection.remoteAddress,
    userId: req.accessToken && req.accessToken.userId
  };
}

const logConfig = {
  name: require('../../package.json').name,
  level: 20,
  serializers: {
    err: bunyan.stdSerializers.err,
    req: reqSerializer
  }
};

// Check for testing environment
if (process.env.NODE_ENV === 'testing') { // Mute logger output in testing
  logConfig.streams = [];
}

const logger = bunyan.createLogger(logConfig);

function overrideConsoleMethods() {
  // Save Old Methods for reference
  console.default = {
    log: console.log.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console)
  };

  // Override default console logs
  console.log = logger.info.bind(logger);
  console.warn = logger.warn.bind(logger);
  console.error = logger.error.bind(logger);
}

module.exports = (overrideConsole = false) => {
  if (overrideConsole) overrideConsoleMethods();
  return logger;
};
