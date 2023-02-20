import { auth } from "./auth";
import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { shoesReducer } from "./shoesReducer";
import { wishlistReducer } from "./wishlistReducer";

export const rootReducer = combineReducers({
  auth: auth,
  cart: cartReducer,
  shoes: shoesReducer,
  wishlist: wishlistReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
