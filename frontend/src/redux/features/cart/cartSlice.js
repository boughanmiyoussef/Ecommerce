import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  selectedItems: 0,  // This will hold the total count of items in the cart
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
      const product = action.payload;
      // Check if the product already exists in the cart
      const existingProduct = state.products.find((item) => item._id === product._id);
      
      if (existingProduct) {
        // If product exists, increase its quantity
        existingProduct.quantity += 1;
      } else {
        // If product doesn't exist, add it to the cart with quantity 1
        state.products.push({ ...product, quantity: 1 });
      }

      // Recalculate cart values
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    // Optionally, create a remove item action if needed
    removeFromCart: (state, action) => {
      state.products = state.products.filter(item => item._id !== action.payload._id);
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
  },
});

// Utility functions to calculate total items, price, etc.
export const setSelectedItems = (state) => 
  state.products.reduce((total, product) => total + product.quantity, 0);

export const setTotalPrice = (state) => 
  state.products.reduce((total, product) => total + product.quantity * product.price, 0);

export const setTax = (state) => setTotalPrice(state) * state.taxRate;

export const setGrandTotal = (state) => 
  setTotalPrice(state) + setTax(state);

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
