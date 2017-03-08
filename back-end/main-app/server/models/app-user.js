'use strict';

const getModelCollection = require('../../server/lib/customUtils').getModelCollection;

module.exports = (AppUser) => {
  AppUser.dbCollection = null; // Placeholder for getting direct access to the db collection
  AppUser.once('dataSourceAttached', (attachedModel) => {
    getModelCollection(attachedModel);
    attachedModel.ObjectId = attachedModel.dataSource.ObjectID; // get ObjectId constructor
  });

  // Static methods
  /**
   * @method getUserRoles
   * @param {ObjectID} userId The userId to get Roles for
   * @return {Promise} A promise that will resolve with an array of Roles for the user.
   * @static
   */
  AppUser.getUserRoles = (userId) => {
    const appModels = this.app.models;
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
