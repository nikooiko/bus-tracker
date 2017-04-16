'use strict';

const { getModelCollection, httpError, capitalize } = require('../../server/lib/customUtils');

module.exports = (AppUser) => {
  AppUser.dbCollection = null; // Placeholder for getting direct access to the db collection
  AppUser.once('dataSourceAttached', (attachedModel) => {
    getModelCollection(attachedModel);
    attachedModel.ObjectId = attachedModel.dataSource.ObjectID; // get ObjectId constructor
  });

  /**
   * Remote hook that checks if user wants to login after checking if he has a specific role. This
   * is useful to avoid round-trip requests for admin dashboard or driver's app that in order
   * to operate without errors logged in user must contain specific rights.
   *
   */
  AppUser.beforeRemote('login', (ctx, unused, next) => {
    const body = ctx.req.body;

    // If requested login with specific role then request roles to check if applies
    const requestedRole = body.loginAsRole;
    if (requestedRole) {
      // get the user id based on username or email
      const where = {};
      if (body.username) {
        where.username = body.username;
      } else {
        where.email = body.email;
      }
      AppUser.findOne({ fields: 'id', where })
        .then((user) => {
          if (!user) return next(); // if no user then just forward to next hook
          return AppUser.getUserRoles(user.id)
            .then((roles) => {
              if (!roles) return next();
              // check if applies to the requestedRoles
              let i = -1;
              const len = roles.length - 1;
              let applies = false;
              while (i++ < len) {
                if (roles[i] === requestedRole) {
                  applies = true;
                  break;
                }
              }
              if (!applies) {
                return next(httpError(`not${capitalize(requestedRole)}Error`, 401));
              }
              ctx.result.roles = roles; // also append roles to result for later use if needed.
              return next();
            });
        })
        .catch(() => next()); // if error occurs simple forward to next hook.
      return;
    }
    next();
  });

  /**
   * Remote hook that appends user roles on the result.
   */
  AppUser.afterRemote('login', (ctx, result) => {
    const roles = result.roles; // maybe already calculated on beforeHook.
    // if roles not already requested, send a new request
    let promise = Promise.resolve(roles);
    if (!roles) promise = AppUser.getUserRoles(result.userId);
    return promise.then((foundRoles) => {
      result.roles = foundRoles;
    });
  });

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
