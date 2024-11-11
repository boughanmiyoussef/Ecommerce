import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice'; // Ensure the correct path to the cart slice

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Assign the cart reducer to the cart key in the state
  },
});
