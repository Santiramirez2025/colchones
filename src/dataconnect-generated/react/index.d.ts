import { AddNewProductData, AddNewProductVariables, ListProductsByCategoryData, ListProductsByCategoryVariables, AddReviewToProductData, AddReviewToProductVariables, ListReviewsForProductData, ListReviewsForProductVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddNewProduct(options?: useDataConnectMutationOptions<AddNewProductData, FirebaseError, AddNewProductVariables>): UseDataConnectMutationResult<AddNewProductData, AddNewProductVariables>;
export function useAddNewProduct(dc: DataConnect, options?: useDataConnectMutationOptions<AddNewProductData, FirebaseError, AddNewProductVariables>): UseDataConnectMutationResult<AddNewProductData, AddNewProductVariables>;

export function useListProductsByCategory(vars: ListProductsByCategoryVariables, options?: useDataConnectQueryOptions<ListProductsByCategoryData>): UseDataConnectQueryResult<ListProductsByCategoryData, ListProductsByCategoryVariables>;
export function useListProductsByCategory(dc: DataConnect, vars: ListProductsByCategoryVariables, options?: useDataConnectQueryOptions<ListProductsByCategoryData>): UseDataConnectQueryResult<ListProductsByCategoryData, ListProductsByCategoryVariables>;

export function useAddReviewToProduct(options?: useDataConnectMutationOptions<AddReviewToProductData, FirebaseError, AddReviewToProductVariables>): UseDataConnectMutationResult<AddReviewToProductData, AddReviewToProductVariables>;
export function useAddReviewToProduct(dc: DataConnect, options?: useDataConnectMutationOptions<AddReviewToProductData, FirebaseError, AddReviewToProductVariables>): UseDataConnectMutationResult<AddReviewToProductData, AddReviewToProductVariables>;

export function useListReviewsForProduct(vars: ListReviewsForProductVariables, options?: useDataConnectQueryOptions<ListReviewsForProductData>): UseDataConnectQueryResult<ListReviewsForProductData, ListReviewsForProductVariables>;
export function useListReviewsForProduct(dc: DataConnect, vars: ListReviewsForProductVariables, options?: useDataConnectQueryOptions<ListReviewsForProductData>): UseDataConnectQueryResult<ListReviewsForProductData, ListReviewsForProductVariables>;
