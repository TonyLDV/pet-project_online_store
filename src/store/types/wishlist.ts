export interface WishlistState {
  wishlist: IWish[];
  loading: boolean;
  error: null | string;
}
export interface IWish {
  id: number;
  price: number;
  title: string;
  url: string;
  size?: number;
  _id?: number;
}

export enum WishlistActionTypes {
  CREATE_WISH = "CREATE_WISH",
  DELETE_WISH = "DELETE_WISH",
  FETCH_WISHLIST = "FETCH_WISHLIST",
  FETCH_WISHLIST_SUCCESS = "FETCH_WISHLIST_SUCCESS",
  FETCH_WISHLIST_ERROR = "FETCH_WISHLIST_ERROR",
}

export type BaseAction<T extends WishlistActionTypes, K extends any = null> = {
  type: T;
  payload: K;
};

type CreateWishAction = BaseAction<WishlistActionTypes.CREATE_WISH, IWish>;

type DeleteWishAction = BaseAction<WishlistActionTypes.DELETE_WISH, number>;

type FetchWishlistAction = BaseAction<WishlistActionTypes.FETCH_WISHLIST, null>;

type FetchWishlistSuccessAction = BaseAction<
  WishlistActionTypes.FETCH_WISHLIST_SUCCESS,
  any[]
>;

type FetchWishlistErrorAction = BaseAction<
  WishlistActionTypes.FETCH_WISHLIST_ERROR,
  string
>;

export type WishlistAction =
  | CreateWishAction
  | DeleteWishAction
  | FetchWishlistAction
  | FetchWishlistSuccessAction
  | FetchWishlistErrorAction;
