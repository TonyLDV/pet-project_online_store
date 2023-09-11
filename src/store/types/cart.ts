export interface CartState {
  cart: ICart[];
  loading: boolean;
  error: null | string;
  totalPrice: number;
  itemsCount: number;
}
export interface ICart {
  id: number;
  price: number;
  title: string;
  url: string;
  size: number;
  bucketId: string;
  quantity?: number;
  region?: string;
}

export enum CartActionTypes {
  CREATE_CART = "CREATE_CART",
  DELETE_CART = "DELETE_CART",
  FETCH_CART = "FETCH_CART",
  RESET_CART = "RESET_CART",
  FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS",
  FETCH_CART_ERROR = "FETCH_CART_ERROR",
}

export type BaseAction<T extends CartActionTypes, K extends any = null> = {
  type: T;
  payload: K;
};

type CreateCartAction = BaseAction<CartActionTypes.CREATE_CART, ICart>;

type DeleteCartAction = BaseAction<CartActionTypes.DELETE_CART, any>;

type RestCartAction = BaseAction<CartActionTypes.RESET_CART, null>;

type FetchCartAction = BaseAction<CartActionTypes.FETCH_CART, null>;

type FetchCartSuccessAction = BaseAction<
  CartActionTypes.FETCH_CART_SUCCESS,
  any[]
>;

type FetchCartErrorAction = BaseAction<
  CartActionTypes.FETCH_CART_ERROR,
  string
>;

export type CartAction =
  | CreateCartAction
  | DeleteCartAction
  | RestCartAction
  | FetchCartAction
  | FetchCartSuccessAction
  | FetchCartErrorAction;
