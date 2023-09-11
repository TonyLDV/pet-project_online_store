import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "../../store/types/cart";
import { RootState } from "../store";

const cartItems = "cartItems";
const totalPrice = "totalPrice";
const itemsCount = "itemsCount";

const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem(cartItems) ?? "[]"),
  error: null,
  loading: false,
  totalPrice: parseInt(JSON.parse(localStorage.getItem(totalPrice) ?? "0")),
  itemsCount: parseInt(JSON.parse(localStorage.getItem(itemsCount) ?? "0")),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, { payload }) {
      const duplicates = state.cart.filter(
        (listItem: { id: number; size: number }) =>
          listItem.id === payload.id && listItem.size === payload.size
      );

      if (!duplicates.length) {
        state.cart.push({ ...payload, quantity: 1 });
        state.totalPrice += payload.price;
        state.itemsCount += 1;
      }

      if (duplicates.length) {
        const cartItem: any = state.cart.find((item) => item.id === payload.id);
        if (cartItem) {
          cartItem.quantity += 1;
          state.totalPrice += cartItem.price;
          state.itemsCount += 1;
        }
      }
      localStorage.setItem(cartItems, JSON.stringify(state.cart));
      localStorage.setItem(itemsCount, JSON.stringify(state.itemsCount));
      localStorage.setItem(totalPrice, JSON.stringify(state.totalPrice));
    },
    deleteCartItem(state, { payload }) {
      const currentIndex = state.cart.findIndex((i) => (i.bucketId = payload));

      if (currentIndex === -1) {
        return state;
      }

      const objQuantity: any = state.cart[currentIndex].quantity;

      state.itemsCount -= 1 * objQuantity;
      state.totalPrice -= state.cart[currentIndex].price * objQuantity;
      state.cart.splice(currentIndex, 1);

      localStorage.setItem(cartItems, JSON.stringify(state.cart));
      localStorage.setItem(itemsCount, JSON.stringify(state.itemsCount));
      localStorage.setItem(totalPrice, JSON.stringify(state.totalPrice));
    },

    changeQuantity(state, { payload }) {
      const cartItem: any = state.cart.find(
        (item) => item.id === payload.id && item.size === payload.size
      );
      if (cartItem) {
        if (payload.inc) {
          cartItem.quantity += 1;
          state.totalPrice += cartItem.price;
          state.itemsCount += 1;
        }
        if (payload.dec) {
          cartItem.quantity -= 1;
          state.totalPrice -= cartItem.price;
          state.itemsCount -= 1;
        }
      }
      localStorage.setItem(cartItems, JSON.stringify(state.cart));
      localStorage.setItem(itemsCount, JSON.stringify(state.itemsCount));
      localStorage.setItem(totalPrice, JSON.stringify(state.totalPrice));
    },

    resetCart(state) {
      state.cart = [];
      state.totalPrice = 0;
      state.itemsCount = 0;
      localStorage.setItem(cartItems, JSON.stringify(state.cart));
      localStorage.setItem(itemsCount, JSON.stringify(state.itemsCount));
      localStorage.setItem(totalPrice, JSON.stringify(state.totalPrice));
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
