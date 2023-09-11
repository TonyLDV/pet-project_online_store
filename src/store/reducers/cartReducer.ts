import { CartAction, CartActionTypes, CartState } from "../types/cart";

const initialState: CartState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(<string>localStorage.getItem("cart"))
    : [],
  error: null,
  loading: false,
  totalPrice: localStorage.getItem("totalPrice")
    ? JSON.parse(<string>localStorage.getItem("totalPrice"))
    : 0,
  itemsCount: 0,
};

export const cartReducer = (
  state = initialState,
  { type, payload }: CartAction
): CartState => {
  switch (type) {
    case CartActionTypes.CREATE_CART:
      const duplicates = state.cart.filter(
        (cartItem: { id: number; size: number }) =>
          cartItem.id === payload.id && cartItem.size === payload.size
      );

      const tPrice = payload.price + state.totalPrice;

      if (duplicates.length === 0) {
        return {
          ...state,
          totalPrice: tPrice,
          cart: state.cart.concat({
            ...payload,
          }),
        };
      }
      return state;

    case CartActionTypes.DELETE_CART:
      const indexWish = state.cart.findIndex(
        (wish) => wish.bucketId === payload
      );

      if (indexWish === -1) {
        return state;
      }

      const newTotalPrice = state.totalPrice - state.cart[indexWish].price;

      const updatedWish = [...state.cart];
      updatedWish.splice(indexWish, 1);
      return { ...state, cart: updatedWish, totalPrice: newTotalPrice };

    case CartActionTypes.RESET_CART:
      return { ...state, cart: [], totalPrice: 0 };

    case CartActionTypes.FETCH_CART:
      return { ...state, loading: true };

    case CartActionTypes.FETCH_CART_SUCCESS:
      return { ...state, loading: false, cart: payload };

    case CartActionTypes.FETCH_CART_ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
