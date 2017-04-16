'use strict';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getLoggedInUser(Model) {
  return (ctx, user, next) => {
    // Check for normal user access
    const accessToken = ctx.req.accessToken;
    const methodStringName = ctx.method.stringName;
    const methodName = methodStringName.substr(methodStringName.lastIndexOf('.') + 1);
    if (!accessToken) {
      return next(new Error(
        `Request reached remote hook for ${methodName} in ${Model.modelName} without token`
      ));
    }
    ctx.args.loggedUser = {};
    ctx.args.loggedUser.userId = accessToken.userId;
    return next();
  };
}

function httpError(message, status = 500, code = null) {
  const err = new Error(message);
  if (code) {
    err.code = code;
  }
  err.status = err.statusCode = status;
  return err;
}

function getModelCollection(model) {
  const modelDataSource = model.dataSource;
  model.dataSource.once('connected', () => { // get the db collection to use for ops
    try {
      model.dbCollection = modelDataSource.connector.collection((model.modelName));
      return model.dbCollection; // return the name
    } catch (err) {
      err.description = `Error while trying to get db collection for ${model.modelName}`;
      throw err;
    }
  });
}

module.exports = {
  capitalize,
  getLoggedInUser,
  httpError,
  getModelCollection
};
