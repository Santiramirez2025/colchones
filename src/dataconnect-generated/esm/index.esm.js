import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'descanso-premium',
  location: 'us-east4'
};

export const addNewProductRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewProduct', inputVars);
}
addNewProductRef.operationName = 'AddNewProduct';

export function addNewProduct(dcOrVars, vars) {
  return executeMutation(addNewProductRef(dcOrVars, vars));
}

export const listProductsByCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProductsByCategory', inputVars);
}
listProductsByCategoryRef.operationName = 'ListProductsByCategory';

export function listProductsByCategory(dcOrVars, vars) {
  return executeQuery(listProductsByCategoryRef(dcOrVars, vars));
}

export const addReviewToProductRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReviewToProduct', inputVars);
}
addReviewToProductRef.operationName = 'AddReviewToProduct';

export function addReviewToProduct(dcOrVars, vars) {
  return executeMutation(addReviewToProductRef(dcOrVars, vars));
}

export const listReviewsForProductRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListReviewsForProduct', inputVars);
}
listReviewsForProductRef.operationName = 'ListReviewsForProduct';

export function listReviewsForProduct(dcOrVars, vars) {
  return executeQuery(listReviewsForProductRef(dcOrVars, vars));
}

