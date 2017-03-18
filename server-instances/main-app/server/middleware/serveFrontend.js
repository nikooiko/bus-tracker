'use strict';

const path = require('path');
/**
 * This function will serve the front end application.
 *
 * See: [Loopback Middleware](https://loopback.io/doc/en/lb3/Defining-middleware.html)
 */
module.exports = () => (req, res) => {
  if (process.env.UNDER_DEVELOPMENT) {
    res.sendFile(path.join(__dirname + '/../../client/dev-index.html'));
  } else {
    res.sendFile(path.join(__dirname + '/../../client/index.html'));
  }
};
