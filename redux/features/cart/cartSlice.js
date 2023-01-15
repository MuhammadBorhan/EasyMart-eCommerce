import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

const initialState = {
  cart: { cartItems: [] },
  // cart: Cookies.get("cart")
  //   ? JSON.parse(Cookies.get("cart"))
  //   : { cartItems: [], shippingAddress: {}, paymentMethod: "" },
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
        if (selectProduct.quantity <= selectProduct.countInStock - 1) {
          selectProduct.quantity += 1;
          state.cart.cartItems
            .filter((item) => item.name !== selectProduct.name)
            .push(selectProduct);
        }
      }
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      state.cart.cartItems = state.cart.cartItems.filter(
        (item) => item.name !== product.name
      );
    },
    decrement: (state, action) => {
      const select = state.cart.cartItems.find(
        (item) => item.name === action.payload.name
      );
      if (select) {
        if (select.quantity > 1) {
          select.quantity -= 1;
          state.cart.cartItems
            .filter((item) => item.name !== select.name)
            .push(select);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, decrement } = cartSlice.actions;

export default cartSlice.reducer;
