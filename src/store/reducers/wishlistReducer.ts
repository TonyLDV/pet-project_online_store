import {
  WishlistAction,
  WishlistActionTypes,
  WishlistState,
} from "../types/wishlist";

const initialState: WishlistState = {
  wishlist: localStorage.getItem("wishlist")
    ? JSON.parse(<string>localStorage.getItem("wishlist"))
    : [],
  error: null,
  loading: false,
};

export const wishlistReducer = (
  state = initialState,
  { type, payload }: WishlistAction
): WishlistState => {
  switch (type) {
    case WishlistActionTypes.CREATE_WISH:
      const duplicates = state.wishlist.filter(
        (cartItem: { id: number }) => cartItem.id === payload.id
      );

      if (duplicates.length === 0) {
        return {
          ...state,
          wishlist: state.wishlist.concat({ ...payload, wish: true }),
        };
      }
      return state;

    case WishlistActionTypes.DELETE_WISH:
      const indexWish = state.wishlist.findIndex((wish) => wish.id === payload);

      if (indexWish === -1) {
        return state;
      }

      const updatedWish = [...state.wishlist];
      updatedWish.splice(indexWish, 1);
      return { ...state, wishlist: updatedWish };

    case WishlistActionTypes.FETCH_WISHLIST:
      return { ...state, loading: true };

    case WishlistActionTypes.FETCH_WISHLIST_SUCCESS:
      return { ...state, loading: false, wishlist: payload };

    case WishlistActionTypes.FETCH_WISHLIST_ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
