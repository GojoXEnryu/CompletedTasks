import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProduct} from "../../types/IProduct";

export const productAPI = createApi({
    reducerPath: 'productAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:5557/api/products'
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => `/`,
            providesTags: ['Product']
        }),
        getProductById: builder.query<IProduct, number>({
            query: (id) => `/${id}`,
        }),
        createProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: '/',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/${product.id}`,
                method: 'PUT',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/${product.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        }),
    })
});