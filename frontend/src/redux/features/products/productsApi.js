import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from "../../../utils/baseURL"; // Import the utility function

const productApi = createApi({
  reducerPath: 'productApi', // Corrected the name of the reducer path
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`, // Corrected the template string
    credentials: 'include', // Correct placement of credentials
  }),
  tagTypes: ["Products"], // Corrected tagTypes without unnecessary space
  endpoints: (builder) => ({
    // Endpoint for fetching all products
    fetchAllProducts: builder.query({
      query: ({ category, color, minPrice, maxPrice, page = 1, limit = 10 }) => {
        // Construct query parameters using URLSearchParams
        const queryParams = new URLSearchParams({
          category: category || '',
          color: color || '',
          minPrice: minPrice || 0,
          maxPrice: maxPrice,
          page: page.toString(),
          limit: limit.toString(),
        }).toString();

        // Return the full endpoint with query parameters
        return `/?${queryParams}`;
      },
      providesTags: (result) =>
        result
          ? [
              // Tag to enable caching and re-fetching for products
              { type: 'Products', id: 'LIST' },
            ]
          : [],
    }),

    // Endpoint for fetching a single product by ID
    fetchProductById: builder.query({
      query: (id) => `/${id}`, // Define the endpoint for fetching product by ID
      providesTags: (result , error, id) => [{type: "Products", id}]
      }),
      AddProduct : builder.mutation({
        query : (newProduct) => ({
            url: "/create-product",
            method: "POST",
            body: newProduct,
            credentials: "include"
        }),
        invalidatesTags:["Products"]
      }),
      fetchRelatedProducts: builder.query({
        query: (id) => `/related/${id}`,
      }),
      updateProduct : builder.query ({
        query: ({id, ...rest}) => ({
            url: `/update-product/${id}`,
            method: "PATCH",
            body: rest,
            credentials: "include",
        }),
        invalidatesTags : ["Products"],
      }),

      deleteProduct: builder.mutation({
        query: (id) => ({
            url: `/${id}`,
            method: "DELETE",
            credentials: "include",
        }),
        invalidatesTags : (result , error, id) => [{
            type: "Products",
            id }]
      })

  }),
});

// Export hooks to be used in components
export const { useFetchAllProductsQuery, useFetchProductByIdQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation, useFetchRelatedProductsQuery } = productApi;

export default productApi;
