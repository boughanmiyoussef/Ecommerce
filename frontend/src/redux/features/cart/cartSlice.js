import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart
const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0, 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Find the existing product in the cart by matching its `id`
      const isExist = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (isExist) {
        // If the product exists, increase its quantity
        console.log("Item Already Exist");
      } else {
        // Otherwise, add the product with quantity 1
        state.products.push({ ...action.payload, quantity: 1 });
      }

      // Update the selectedItems count (total quantity of products in the cart)
      state.selectedItems = state.products.reduce(
        (total, product) => total + product.quantity,
        0
      );

      // Update total price, tax, and grandTotal
      state.totalPrice = state.products.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      );
      state.tax = state.totalPrice * state.taxRate;
      state.grandTotal = state.totalPrice + state.tax;
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
