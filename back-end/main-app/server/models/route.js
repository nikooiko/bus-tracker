'use strict';

const getModelCollection = require('../../server/lib/customUtils').getModelCollection;

module.exports = (Route) => {
  Route.dbCollection = null; // Placeholder for getting direct access to the db collection
  Route.once('dataSourceAttached', (attachedModel) => {
    getModelCollection(attachedModel);
    attachedModel.ObjectId = attachedModel.dataSource.ObjectID; // get ObjectId constructor
  });

  // Static methods

  // Validations
};
