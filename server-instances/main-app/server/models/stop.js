'use strict';

const getModelCollection = require('../../server/lib/customUtils').getModelCollection;

module.exports = (Stop) => {
  Stop.dbCollection = null; // Placeholder for getting direct access to the db collection
  Stop.once('dataSourceAttached', (attachedModel) => {
    getModelCollection(attachedModel);
    attachedModel.ObjectId = attachedModel.dataSource.ObjectID; // get ObjectId constructor
  });

  // Static methods

  // Validations
  Stop.validatesUniquenessOf('label', {
    message: 'already exists'
  });
};
