import { createSlice } from "@reduxjs/toolkit";
import { WishlistState } from "../../store/types/wishlist";
import { RootState } from "../store";

const wishlist = "wishlist";

const initialState: WishlistState = {
  wishlist: JSON.parse(localStorage.getItem(wishlist) ?? "[]"),
  error: null,
  loading: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlistItem(state, { payload }) {
      const duplicates = state.wishlist.filter(
        (listItem: { id: number }) => listItem.id === payload.id
      );
      if (!duplicates.length) {
        state.wishlist.push(payload);
        localStorage.setItem(wishlist, JSON.stringify(state.wishlist));
      }
    },

    deleteWishlistItem(state, { payload }) {
      const currentIndex = state.wishlist.findIndex((i) => (i.id = payload));

      if (currentIndex === -1) {
        return state;
      }

      state.wishlist.splice(currentIndex, 1);
      localStorage.setItem(wishlist, JSON.stringify(state.wishlist));
    },
  },
});

export const wishlistSelector = (state: RootState) => state.wishlist;
export const wishlistActions = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
