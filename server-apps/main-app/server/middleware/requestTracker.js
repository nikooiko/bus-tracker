'use strict';

/**
 * This function will assign tracking properties to request in order to see time taken to serve.
 *
 * See: [Loopback Middleware](https://loopback.io/doc/en/lb3/Defining-middleware.html)
 */
module.exports = () => function tracker(req, res, next) {
  const startTime = new Date();
  logger.info('Request Received ');

  res.once('finish', () => {
    const endTime = new Date();
    const diff = endTime.getTime() - startTime.getTime();
    const logObj = {
      method: req.method,
      url: req.originalUrl,
      timeMs: diff
    };
    logger.info(logObj, 'Request serving completed');
  });

  next();
};
