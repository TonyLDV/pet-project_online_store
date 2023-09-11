import { cartReducer } from "./slices/cartSlice";
import { shoesReducer } from "./slices/shoesSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { wishlistReducer } from "./slices/wishlistSlice";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/usersSlice";
import { reviewsReducer } from "./slices/reviewsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    shoes: shoesReducer,
    reviews: reviewsReducer,
    wishlist: wishlistReducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
