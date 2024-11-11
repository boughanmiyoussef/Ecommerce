import { createSlice } from '@reduxjs/toolkit'

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
      // Check if the product already exists in the cart
      const isExist = state.products.find(
        (product) => product._id === action.payload._id
      );
      
      if (!isExist) {
        // If it doesn't exist, add it to the cart with quantity 1
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        // If it exists, log a message (could be changed to increasing quantity, etc.)
        console.log('Item is already added');
      }

      // Recalculate the cart values after adding an item
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
  },
});

// Utility functions
export const setSelectedItems = (state) => 
  state.products.reduce((total, product) => total + product.quantity, 0);

export const setTotalPrice = (state) => 
  state.products.reduce((total, product) => total + product.quantity * product.price, 0);

export const setTax = (state) => setTotalPrice(state) * state.taxRate;

export const setGrandTotal = (state) => 
  setTotalPrice(state) + setTax(state);

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
