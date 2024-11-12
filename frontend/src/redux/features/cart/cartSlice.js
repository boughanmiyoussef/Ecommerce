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
        isExist.quantity += 1;
      } else {
        // Otherwise, add the product with quantity 1
        state.products.push({ ...action.payload, quantity: 1 });
      }

      // Update the selectedItems count (total quantity of products in the cart)
      state.selectedItems = state.products.reduce(
        (total, product) => total + product.quantity,
        0
      );

      // Recalculate total price, tax, and grandTotal
      state.totalPrice = state.products.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      );
      state.tax = state.totalPrice * state.taxRate;
      state.grandTotal = state.totalPrice + state.tax;

      console.log("Add to Cart:", {
        totalPrice: state.totalPrice,
        tax: state.tax,
        grandTotal: state.grandTotal,
        selectedItems: state.selectedItems,
      });
    },
    updateQuantity: (state, action) => {
      // Update the quantity of a product in the cart
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          if (action.payload.type === 'increment') {
            product.quantity += 1;
          } else if (action.payload.type === 'decrement') {
            if (product.quantity > 1) {
              product.quantity -= 1;
            }
          }
        }
        return product;
      });

      // Update the selectedItems count (total quantity of products in the cart)
      state.selectedItems = state.products.reduce(
        (total, product) => total + product.quantity,
        0
      );

      // Recalculate total price, tax, and grandTotal
      state.totalPrice = state.products.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      );
      state.tax = state.totalPrice * state.taxRate;
      state.grandTotal = state.totalPrice + state.tax;

      console.log("Update Quantity:", {
        totalPrice: state.totalPrice,
        tax: state.tax,
        grandTotal: state.grandTotal,
        selectedItems: state.selectedItems,
      });
    },
    removeFromCart: (state, action) => {
      // Remove the product from the cart
      state.products = state.products.filter((product) => product.id !== action.payload.id);

      // Update the selectedItems count (total quantity of products in the cart)
      state.selectedItems = state.products.reduce(
        (total, product) => total + product.quantity,
        0
      );

      // Recalculate total price, tax, and grandTotal
      state.totalPrice = state.products.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      );
      state.tax = state.totalPrice * state.taxRate;
      state.grandTotal = state.totalPrice + state.tax;
    },
  },
});
export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
