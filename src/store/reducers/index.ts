import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { usersReducer } from "./usersReducer";
import { wishlistReducer } from "./wishlistReducer";

export const rootReducer = combineReducers({
  users: usersReducer,
  cart: cartReducer,
  /*shoes: shoesReducer,*/
  wishlist: wishlistReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
