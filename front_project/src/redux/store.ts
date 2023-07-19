import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {userAPI} from "./services/userApi";
import {cartAPI} from "./services/cartApi";
import {productAPI} from "./services/productApi";

export const store = configureStore({
    reducer: combineReducers({
        [userAPI.reducerPath]: userAPI.reducer,
        [cartAPI.reducerPath]: cartAPI.reducer,
        [productAPI.reducerPath]: productAPI.reducer
    }),
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(userAPI.middleware, cartAPI.middleware, productAPI.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;