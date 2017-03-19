'use strict';

const { getModelCollection, httpError } = require('../../server/lib/customUtils');

module.exports = (AppUser) => {
  AppUser.dbCollection = null; // Placeholder for getting direct access to the db collection
  AppUser.once('dataSourceAttached', (attachedModel) => {
    getModelCollection(attachedModel);
    attachedModel.ObjectId = attachedModel.dataSource.ObjectID; // get ObjectId constructor
  });

  /**
   * Remote hook that appends user roles on the result.
   */
  AppUser.afterRemote('login', (ctx, result) =>
    AppUser.getUserRoles(result.userId)
      .then((roles) => {
        result.roles = roles;
      })
  );

  AppUser.setRole = function setRole(userId, roleName, shouldRemove) {
    const appModels = AppUser.app.models;
    const Role = appModels.Role;

    const RoleMapping = appModels.RoleMapping;

    let user;
    let role;

    return Promise.all([
      AppUser.findById(userId),
      Role.findOne({ where: { name: roleName } })
    ])
      .then(([foundUser, foundRole]) => {
        if (!foundUser) return Promise.reject(httpError('No user with this id', 400));
        if (!foundRole) return Promise.reject(httpError('No role with this name', 400));
        user = foundUser;
        role = foundRole;
        // check if there is already a role mapping for this user
        return role.principals({
          where: {
            principalType: RoleMapping.USER,
            principalId: user.id.toString()
          }
        });
      })
      .then((principals) => {
        if (principals.length === 0 && !shouldRemove) { // No match and requested add
          // Add role.
          return role.principals.create({
            principalType: RoleMapping.USER,
            principalId: user.id
          });
        }
        if (shouldRemove && principals[0]) { // There is a match at principals[0] and requested
          // Remove role;
          return principals[0].remove();
        }
        return null;
      })
      .then(() => {
        const include = {
          relation: 'roles',
          scope: {
            fields: ['name']
          }
        };
        return AppUser.findOne({ where: { _id: userId }, include });
      })
      .then((finalUser) => finalUser.roles())
      .catch((err) => {
        logger.error({ err }, 'Set role request failed');
        return Promise.reject(err);
      });
  };

  /**
   * Remote method for setting a role to a user.
   */
  AppUser.remoteMethod('setRole', {
    description: 'The login functionality for devices to receive token for server communication',
    http: {
      verb: 'post',
      status: 200,
      errorStatus: 400
    },
    isStatic: true,
    accepts: [{
      arg: 'userId',
      description: 'The user we want to add/remove this role to.',
      required: true,
      type: 'string'
    }, {
      arg: 'roleName',
      description: 'The name of the role.',
      required: true,
      type: 'string'
    }, {
      arg: 'shouldRemove',
      description: 'Indicates whether the role will be removed or added',
      type: 'boolean'
    }],
    returns: [{
      arg: 'roles',
      description: 'The final user roles',
      type: 'object',
      root: true
    }]
  });

  // Static methods
  /**
   * @method getUserRoles
   * @param {ObjectID} userId The userId to get Roles for
   * @return {Promise} A promise that will resolve with an array of Roles for the user.
   * @static
   */
  AppUser.getUserRoles = (userId) => {
    const appModels = AppUser.app.models;
    const Role = appModels.Role;
    const RoleMapping = appModels.RoleMapping;
    return new Promise((resolve, reject) => {
      Role.getRoles({ principalType: RoleMapping.USER, principalId: userId }, (err, roles) => {
        if (err) {
          return reject(err);
        }
        const rolesToResolve = [];
        roles.forEach((role, index) => {
          if (role.hasOwnProperty('id')) {
            const roleFn = Role.findById(role)
              .then(foundRole => {
                roles[index] = foundRole.name;
              });
            rolesToResolve.push(roleFn);
          }
        });
        if (rolesToResolve.length === 0) {
          return resolve(roles);
        }
        return Promise.all(rolesToResolve)
          .then(() => resolve(roles));
      });
    });
  };

  // Validations
};
