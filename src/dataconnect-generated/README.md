# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListProductsByCategory*](#listproductsbycategory)
  - [*ListReviewsForProduct*](#listreviewsforproduct)
- [**Mutations**](#mutations)
  - [*AddNewProduct*](#addnewproduct)
  - [*AddReviewToProduct*](#addreviewtoproduct)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListProductsByCategory
You can execute the `ListProductsByCategory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listProductsByCategory(vars: ListProductsByCategoryVariables): QueryPromise<ListProductsByCategoryData, ListProductsByCategoryVariables>;

interface ListProductsByCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProductsByCategoryVariables): QueryRef<ListProductsByCategoryData, ListProductsByCategoryVariables>;
}
export const listProductsByCategoryRef: ListProductsByCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProductsByCategory(dc: DataConnect, vars: ListProductsByCategoryVariables): QueryPromise<ListProductsByCategoryData, ListProductsByCategoryVariables>;

interface ListProductsByCategoryRef {
  ...
  (dc: DataConnect, vars: ListProductsByCategoryVariables): QueryRef<ListProductsByCategoryData, ListProductsByCategoryVariables>;
}
export const listProductsByCategoryRef: ListProductsByCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProductsByCategoryRef:
```typescript
const name = listProductsByCategoryRef.operationName;
console.log(name);
```

### Variables
The `ListProductsByCategory` query requires an argument of type `ListProductsByCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProductsByCategoryVariables {
  category: string;
}
```
### Return Type
Recall that executing the `ListProductsByCategory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProductsByCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListProductsByCategoryData {
  products: ({
    id: UUIDString;
    name: string;
    description: string;
    price: number;
    imageUrl?: string | null;
  } & Product_Key)[];
}
```
### Using `ListProductsByCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProductsByCategory, ListProductsByCategoryVariables } from '@dataconnect/generated';

// The `ListProductsByCategory` query requires an argument of type `ListProductsByCategoryVariables`:
const listProductsByCategoryVars: ListProductsByCategoryVariables = {
  category: ..., 
};

// Call the `listProductsByCategory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProductsByCategory(listProductsByCategoryVars);
// Variables can be defined inline as well.
const { data } = await listProductsByCategory({ category: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProductsByCategory(dataConnect, listProductsByCategoryVars);

console.log(data.products);

// Or, you can use the `Promise` API.
listProductsByCategory(listProductsByCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

### Using `ListProductsByCategory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProductsByCategoryRef, ListProductsByCategoryVariables } from '@dataconnect/generated';

// The `ListProductsByCategory` query requires an argument of type `ListProductsByCategoryVariables`:
const listProductsByCategoryVars: ListProductsByCategoryVariables = {
  category: ..., 
};

// Call the `listProductsByCategoryRef()` function to get a reference to the query.
const ref = listProductsByCategoryRef(listProductsByCategoryVars);
// Variables can be defined inline as well.
const ref = listProductsByCategoryRef({ category: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProductsByCategoryRef(dataConnect, listProductsByCategoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.products);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

## ListReviewsForProduct
You can execute the `ListReviewsForProduct` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listReviewsForProduct(vars: ListReviewsForProductVariables): QueryPromise<ListReviewsForProductData, ListReviewsForProductVariables>;

interface ListReviewsForProductRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListReviewsForProductVariables): QueryRef<ListReviewsForProductData, ListReviewsForProductVariables>;
}
export const listReviewsForProductRef: ListReviewsForProductRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listReviewsForProduct(dc: DataConnect, vars: ListReviewsForProductVariables): QueryPromise<ListReviewsForProductData, ListReviewsForProductVariables>;

interface ListReviewsForProductRef {
  ...
  (dc: DataConnect, vars: ListReviewsForProductVariables): QueryRef<ListReviewsForProductData, ListReviewsForProductVariables>;
}
export const listReviewsForProductRef: ListReviewsForProductRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listReviewsForProductRef:
```typescript
const name = listReviewsForProductRef.operationName;
console.log(name);
```

### Variables
The `ListReviewsForProduct` query requires an argument of type `ListReviewsForProductVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListReviewsForProductVariables {
  productId: UUIDString;
}
```
### Return Type
Recall that executing the `ListReviewsForProduct` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListReviewsForProductData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListReviewsForProductData {
  reviews: ({
    id: UUIDString;
    userId: UUIDString;
    comment: string;
    createdAt: TimestampString;
    rating: number;
    title?: string | null;
  } & Review_Key)[];
}
```
### Using `ListReviewsForProduct`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listReviewsForProduct, ListReviewsForProductVariables } from '@dataconnect/generated';

// The `ListReviewsForProduct` query requires an argument of type `ListReviewsForProductVariables`:
const listReviewsForProductVars: ListReviewsForProductVariables = {
  productId: ..., 
};

// Call the `listReviewsForProduct()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listReviewsForProduct(listReviewsForProductVars);
// Variables can be defined inline as well.
const { data } = await listReviewsForProduct({ productId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listReviewsForProduct(dataConnect, listReviewsForProductVars);

console.log(data.reviews);

// Or, you can use the `Promise` API.
listReviewsForProduct(listReviewsForProductVars).then((response) => {
  const data = response.data;
  console.log(data.reviews);
});
```

### Using `ListReviewsForProduct`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listReviewsForProductRef, ListReviewsForProductVariables } from '@dataconnect/generated';

// The `ListReviewsForProduct` query requires an argument of type `ListReviewsForProductVariables`:
const listReviewsForProductVars: ListReviewsForProductVariables = {
  productId: ..., 
};

// Call the `listReviewsForProductRef()` function to get a reference to the query.
const ref = listReviewsForProductRef(listReviewsForProductVars);
// Variables can be defined inline as well.
const ref = listReviewsForProductRef({ productId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listReviewsForProductRef(dataConnect, listReviewsForProductVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reviews);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reviews);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddNewProduct
You can execute the `AddNewProduct` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addNewProduct(vars: AddNewProductVariables): MutationPromise<AddNewProductData, AddNewProductVariables>;

interface AddNewProductRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewProductVariables): MutationRef<AddNewProductData, AddNewProductVariables>;
}
export const addNewProductRef: AddNewProductRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addNewProduct(dc: DataConnect, vars: AddNewProductVariables): MutationPromise<AddNewProductData, AddNewProductVariables>;

interface AddNewProductRef {
  ...
  (dc: DataConnect, vars: AddNewProductVariables): MutationRef<AddNewProductData, AddNewProductVariables>;
}
export const addNewProductRef: AddNewProductRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addNewProductRef:
```typescript
const name = addNewProductRef.operationName;
console.log(name);
```

### Variables
The `AddNewProduct` mutation requires an argument of type `AddNewProductVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddNewProductVariables {
  brand?: string | null;
  category: string;
  createdAt: TimestampString;
  description: string;
  firmness?: string | null;
  imageUrl?: string | null;
  name: string;
  price: number;
  size?: string | null;
}
```
### Return Type
Recall that executing the `AddNewProduct` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddNewProductData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddNewProductData {
  product_insert: Product_Key;
}
```
### Using `AddNewProduct`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addNewProduct, AddNewProductVariables } from '@dataconnect/generated';

// The `AddNewProduct` mutation requires an argument of type `AddNewProductVariables`:
const addNewProductVars: AddNewProductVariables = {
  brand: ..., // optional
  category: ..., 
  createdAt: ..., 
  description: ..., 
  firmness: ..., // optional
  imageUrl: ..., // optional
  name: ..., 
  price: ..., 
  size: ..., // optional
};

// Call the `addNewProduct()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addNewProduct(addNewProductVars);
// Variables can be defined inline as well.
const { data } = await addNewProduct({ brand: ..., category: ..., createdAt: ..., description: ..., firmness: ..., imageUrl: ..., name: ..., price: ..., size: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addNewProduct(dataConnect, addNewProductVars);

console.log(data.product_insert);

// Or, you can use the `Promise` API.
addNewProduct(addNewProductVars).then((response) => {
  const data = response.data;
  console.log(data.product_insert);
});
```

### Using `AddNewProduct`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addNewProductRef, AddNewProductVariables } from '@dataconnect/generated';

// The `AddNewProduct` mutation requires an argument of type `AddNewProductVariables`:
const addNewProductVars: AddNewProductVariables = {
  brand: ..., // optional
  category: ..., 
  createdAt: ..., 
  description: ..., 
  firmness: ..., // optional
  imageUrl: ..., // optional
  name: ..., 
  price: ..., 
  size: ..., // optional
};

// Call the `addNewProductRef()` function to get a reference to the mutation.
const ref = addNewProductRef(addNewProductVars);
// Variables can be defined inline as well.
const ref = addNewProductRef({ brand: ..., category: ..., createdAt: ..., description: ..., firmness: ..., imageUrl: ..., name: ..., price: ..., size: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addNewProductRef(dataConnect, addNewProductVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.product_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.product_insert);
});
```

## AddReviewToProduct
You can execute the `AddReviewToProduct` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addReviewToProduct(vars: AddReviewToProductVariables): MutationPromise<AddReviewToProductData, AddReviewToProductVariables>;

interface AddReviewToProductRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddReviewToProductVariables): MutationRef<AddReviewToProductData, AddReviewToProductVariables>;
}
export const addReviewToProductRef: AddReviewToProductRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addReviewToProduct(dc: DataConnect, vars: AddReviewToProductVariables): MutationPromise<AddReviewToProductData, AddReviewToProductVariables>;

interface AddReviewToProductRef {
  ...
  (dc: DataConnect, vars: AddReviewToProductVariables): MutationRef<AddReviewToProductData, AddReviewToProductVariables>;
}
export const addReviewToProductRef: AddReviewToProductRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addReviewToProductRef:
```typescript
const name = addReviewToProductRef.operationName;
console.log(name);
```

### Variables
The `AddReviewToProduct` mutation requires an argument of type `AddReviewToProductVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddReviewToProductVariables {
  productId: UUIDString;
  userId: UUIDString;
  comment: string;
  createdAt: TimestampString;
  rating: number;
  title?: string | null;
}
```
### Return Type
Recall that executing the `AddReviewToProduct` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddReviewToProductData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddReviewToProductData {
  review_insert: Review_Key;
}
```
### Using `AddReviewToProduct`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addReviewToProduct, AddReviewToProductVariables } from '@dataconnect/generated';

// The `AddReviewToProduct` mutation requires an argument of type `AddReviewToProductVariables`:
const addReviewToProductVars: AddReviewToProductVariables = {
  productId: ..., 
  userId: ..., 
  comment: ..., 
  createdAt: ..., 
  rating: ..., 
  title: ..., // optional
};

// Call the `addReviewToProduct()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addReviewToProduct(addReviewToProductVars);
// Variables can be defined inline as well.
const { data } = await addReviewToProduct({ productId: ..., userId: ..., comment: ..., createdAt: ..., rating: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addReviewToProduct(dataConnect, addReviewToProductVars);

console.log(data.review_insert);

// Or, you can use the `Promise` API.
addReviewToProduct(addReviewToProductVars).then((response) => {
  const data = response.data;
  console.log(data.review_insert);
});
```

### Using `AddReviewToProduct`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addReviewToProductRef, AddReviewToProductVariables } from '@dataconnect/generated';

// The `AddReviewToProduct` mutation requires an argument of type `AddReviewToProductVariables`:
const addReviewToProductVars: AddReviewToProductVariables = {
  productId: ..., 
  userId: ..., 
  comment: ..., 
  createdAt: ..., 
  rating: ..., 
  title: ..., // optional
};

// Call the `addReviewToProductRef()` function to get a reference to the mutation.
const ref = addReviewToProductRef(addReviewToProductVars);
// Variables can be defined inline as well.
const ref = addReviewToProductRef({ productId: ..., userId: ..., comment: ..., createdAt: ..., rating: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addReviewToProductRef(dataConnect, addReviewToProductVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.review_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.review_insert);
});
```

