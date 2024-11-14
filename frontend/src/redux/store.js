import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice'; 
import authApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice'
import productApi from './features/products/productsApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productApi.reducerPath] : productApi
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware), // Add authApi middleware
});
