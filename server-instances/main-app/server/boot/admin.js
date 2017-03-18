'use strict';

/**
 * This file will be used to initialize an Admin role and create a default admin user in order
 * to make sure that there is admin access.
 *
 * @param {loopback} app Our loopback application
 */
module.exports = app => {
  // TODO uncomment and fix
  const Role = app.models.Role;
  const AppUser = app.models.AppUser;
  const RoleMapping = app.models.RoleMapping;
  let adminRole;
  const defaultAdmin = {
    username: 'admin',
    email: 'admin@iot-hub.com',
    password: '1234'
  };
  Role.findOrCreate({ name: 'admin' })
    .then(([role]) => {
      adminRole = role;
      logger.info('Default "admin" role successfully initialized');
      // make sure the default admin user exists
      return AppUser.findOrCreate({ where: { username: defaultAdmin.username } }, defaultAdmin);
    })
    .then(([admin]) => {
      // check if there is already a role mapping for admin user
      defaultAdmin.id = admin.id;
      return adminRole.principals({
        where: {
          principalType: RoleMapping.USER,
          principalId: admin.id.toString()
        }
      });
    })
    .then(principals => {
      if (principals.length === 0) { // RoleMapping must be created
        return adminRole.principals.create({
          principalType: RoleMapping.USER,
          principalId: defaultAdmin.id
        });
      }
      return principals[0]; // Return the found principal
    })
    .catch(err => {
      logger.error({ err }, 'Error while trying to initialize default "admin" role');
      setTimeout(process.exit, 1000, 1); // Stop the process allowing it some time to log properly
    });
};
