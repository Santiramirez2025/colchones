const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'descanso-premium',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const addNewProductRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewProduct', inputVars);
}
addNewProductRef.operationName = 'AddNewProduct';
exports.addNewProductRef = addNewProductRef;

exports.addNewProduct = function addNewProduct(dcOrVars, vars) {
  return executeMutation(addNewProductRef(dcOrVars, vars));
};

const listProductsByCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProductsByCategory', inputVars);
}
listProductsByCategoryRef.operationName = 'ListProductsByCategory';
exports.listProductsByCategoryRef = listProductsByCategoryRef;

exports.listProductsByCategory = function listProductsByCategory(dcOrVars, vars) {
  return executeQuery(listProductsByCategoryRef(dcOrVars, vars));
};

const addReviewToProductRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReviewToProduct', inputVars);
}
addReviewToProductRef.operationName = 'AddReviewToProduct';
exports.addReviewToProductRef = addReviewToProductRef;

exports.addReviewToProduct = function addReviewToProduct(dcOrVars, vars) {
  return executeMutation(addReviewToProductRef(dcOrVars, vars));
};

const listReviewsForProductRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListReviewsForProduct', inputVars);
}
listReviewsForProductRef.operationName = 'ListReviewsForProduct';
exports.listReviewsForProductRef = listReviewsForProductRef;

exports.listReviewsForProduct = function listReviewsForProduct(dcOrVars, vars) {
  return executeQuery(listReviewsForProductRef(dcOrVars, vars));
};
