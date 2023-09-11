import { bindActionCreators } from "redux";
import { cartActions } from "../../storeToolkit/slices/cartSlice";
import { AppDispatch, RootState } from "../../storeToolkit/store";
import { shoesActions } from "../../storeToolkit/slices/shoesSlice";
import { wishlistActions } from "../../storeToolkit/slices/wishlistSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  fetchShoesToolkit,
  fetchShoesToolkitByQuery,
  fetchSingleShoes,
} from "../../storeToolkit/actions/shoes";
import { usersActions } from "../../storeToolkit/slices/usersSlice";
import { getUser, postUser } from "../../storeToolkit/actions/users";
import { reviewsActions } from "../../storeToolkit/slices/reviewsSlice";
import { getReviews, postReview } from "../../storeToolkit/actions/reviews";

const actions = {
  ...cartActions,
  ...shoesActions,
  ...wishlistActions,
  ...usersActions,
  ...reviewsActions,
  fetchShoesToolkit,
  fetchShoesToolkitByQuery,
  fetchSingleShoes,
  getUser,
  postUser,
  getReviews,
  postReview,
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
