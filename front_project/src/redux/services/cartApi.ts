import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ICart} from "../../types/ICart";

export const cartAPI = createApi({
    reducerPath: 'cartAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_CART_SERVICE_API_URL
    }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getCarts: builder.query<ICart[], void>({
            query: () => `/`,
            providesTags: ['Cart']
        }),
        getCartById: builder.query<ICart, number>({
            query: (id) => `/${id}`,
        }),
        createCart: builder.mutation<ICart, ICart>({
            query: (cart) => ({
                url: '/',
                method: 'POST',
                body: cart
            }),
            invalidatesTags: ['Cart']
        }),
        updateCart: builder.mutation<ICart, ICart>({
            query: (cart) => ({
                url: `/${cart.id}`,
                method: 'PUT',
                body: cart
            }),
            invalidatesTags: ['Cart']
        }),
        deleteCart: builder.mutation<ICart, ICart>({
            query: (cart) => ({
                url: `/${cart.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart']
        }),
    })
});