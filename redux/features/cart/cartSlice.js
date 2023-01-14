import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: { cartItems: [] },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const selectProduct = state.cart.cartItems.find(
        (item) => item.name === action.payload.name
      );
      if (!selectProduct) {
        const product = { ...action.payload, quantity: 1 };
        state.cart.cartItems.push(product);
      } else {
        selectProduct.quantity += 1;
        state.cart.cartItems
          .filter((item) => item.name !== selectProduct.name)
          .push(selectProduct);
      }
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      state.cart.cartItems = state.cart.cartItems.filter(
        (item) => item.name !== product.name
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
