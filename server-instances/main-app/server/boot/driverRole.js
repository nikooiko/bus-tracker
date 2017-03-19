'use strict';

/**
 * This file will be used to initialize the `driver` role.
 *
 * @param {loopback} app Our loopback application
 */
module.exports = app => {
  const Role = app.models.Role;
  Role.findOrCreate({ name: 'driver' })
    .then(([role]) => {
      logger.info('Created \'driver\' role successfully.');
    })
    .catch(err => {
      logger.error({ err }, 'Error while trying to create \'driver\' role.');
      setTimeout(process.exit, 1000, 1); // Stop the process allowing it some time to log properly
    });
};
