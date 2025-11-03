import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddNewProductData {
  product_insert: Product_Key;
}

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

export interface AddReviewToProductData {
  review_insert: Review_Key;
}

export interface AddReviewToProductVariables {
  productId: UUIDString;
  userId: UUIDString;
  comment: string;
  createdAt: TimestampString;
  rating: number;
  title?: string | null;
}

export interface ListProductsByCategoryData {
  products: ({
    id: UUIDString;
    name: string;
    description: string;
    price: number;
    imageUrl?: string | null;
  } & Product_Key)[];
}

export interface ListProductsByCategoryVariables {
  category: string;
}

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

export interface ListReviewsForProductVariables {
  productId: UUIDString;
}

export interface OrderItem_Key {
  orderId: UUIDString;
  productId: UUIDString;
  __typename?: 'OrderItem_Key';
}

export interface Order_Key {
  id: UUIDString;
  __typename?: 'Order_Key';
}

export interface Product_Key {
  id: UUIDString;
  __typename?: 'Product_Key';
}

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface AddNewProductRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewProductVariables): MutationRef<AddNewProductData, AddNewProductVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddNewProductVariables): MutationRef<AddNewProductData, AddNewProductVariables>;
  operationName: string;
}
export const addNewProductRef: AddNewProductRef;

export function addNewProduct(vars: AddNewProductVariables): MutationPromise<AddNewProductData, AddNewProductVariables>;
export function addNewProduct(dc: DataConnect, vars: AddNewProductVariables): MutationPromise<AddNewProductData, AddNewProductVariables>;

interface ListProductsByCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProductsByCategoryVariables): QueryRef<ListProductsByCategoryData, ListProductsByCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProductsByCategoryVariables): QueryRef<ListProductsByCategoryData, ListProductsByCategoryVariables>;
  operationName: string;
}
export const listProductsByCategoryRef: ListProductsByCategoryRef;

export function listProductsByCategory(vars: ListProductsByCategoryVariables): QueryPromise<ListProductsByCategoryData, ListProductsByCategoryVariables>;
export function listProductsByCategory(dc: DataConnect, vars: ListProductsByCategoryVariables): QueryPromise<ListProductsByCategoryData, ListProductsByCategoryVariables>;

interface AddReviewToProductRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddReviewToProductVariables): MutationRef<AddReviewToProductData, AddReviewToProductVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddReviewToProductVariables): MutationRef<AddReviewToProductData, AddReviewToProductVariables>;
  operationName: string;
}
export const addReviewToProductRef: AddReviewToProductRef;

export function addReviewToProduct(vars: AddReviewToProductVariables): MutationPromise<AddReviewToProductData, AddReviewToProductVariables>;
export function addReviewToProduct(dc: DataConnect, vars: AddReviewToProductVariables): MutationPromise<AddReviewToProductData, AddReviewToProductVariables>;

interface ListReviewsForProductRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListReviewsForProductVariables): QueryRef<ListReviewsForProductData, ListReviewsForProductVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListReviewsForProductVariables): QueryRef<ListReviewsForProductData, ListReviewsForProductVariables>;
  operationName: string;
}
export const listReviewsForProductRef: ListReviewsForProductRef;

export function listReviewsForProduct(vars: ListReviewsForProductVariables): QueryPromise<ListReviewsForProductData, ListReviewsForProductVariables>;
export function listReviewsForProduct(dc: DataConnect, vars: ListReviewsForProductVariables): QueryPromise<ListReviewsForProductData, ListReviewsForProductVariables>;

