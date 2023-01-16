import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    cartItems: [],
    shippingAddress: { name: "borhan" },
    paymentMethod: "",
  },
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
    SAVE_SHIPPING_ADDRESS: (state, action) => {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    },
  },
});

export const { addToCart, removeFromCart, decrement, SAVE_SHIPPING_ADDRESS } =
  cartSlice.actions;

export default cartSlice.reducer;
