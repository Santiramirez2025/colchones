# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useAddNewProduct, useListProductsByCategory, useAddReviewToProduct, useListReviewsForProduct } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useAddNewProduct(addNewProductVars);

const { data, isPending, isSuccess, isError, error } = useListProductsByCategory(listProductsByCategoryVars);

const { data, isPending, isSuccess, isError, error } = useAddReviewToProduct(addReviewToProductVars);

const { data, isPending, isSuccess, isError, error } = useListReviewsForProduct(listReviewsForProductVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { addNewProduct, listProductsByCategory, addReviewToProduct, listReviewsForProduct } from '@dataconnect/generated';


// Operation AddNewProduct:  For variables, look at type AddNewProductVars in ../index.d.ts
const { data } = await AddNewProduct(dataConnect, addNewProductVars);

// Operation ListProductsByCategory:  For variables, look at type ListProductsByCategoryVars in ../index.d.ts
const { data } = await ListProductsByCategory(dataConnect, listProductsByCategoryVars);

// Operation AddReviewToProduct:  For variables, look at type AddReviewToProductVars in ../index.d.ts
const { data } = await AddReviewToProduct(dataConnect, addReviewToProductVars);

// Operation ListReviewsForProduct:  For variables, look at type ListReviewsForProductVars in ../index.d.ts
const { data } = await ListReviewsForProduct(dataConnect, listReviewsForProductVars);


```