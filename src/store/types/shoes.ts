import { ShoesType } from "../../constants";

export type ShoesState = {
  shoes: IShoes[];
  selectedShoes: null | IShoes;
  loading: boolean;
  error: null | string;
};

type IShoes = {
  id: number;
  price: number;
  title: string;
  url: string;
  type?: ShoesType;
  wish?: boolean;
};

export enum ShoesActionTypes {
  FETCH_SHOES = "FETCH_SHOES",
  FETCH_SHOES_WISH = "FETCH_SHOES_WISH",
  FETCH_SELECTED_SHOES = "FETCH_SELECTED_SHOES",
  FETCH_SHOES_SELECTED = "FETCH_SHOES_SELECTED",
  FETCH_SHOES_SUCCESS = "FETCH_SHOES_SUCCESS",
  FETCH_SHOES_ERROR = "FETCH_SHOES_ERROR",
}

export type BaseAction<T extends ShoesActionTypes, K extends any = null> = {
  type: T;
  payload: K;
};

type FetchShoesAction = BaseAction<ShoesActionTypes.FETCH_SHOES, any[]>;

/*type FetchSelectedShoesAction = BaseAction<
  ShoesActionTypes.FETCH_SELECTED_SHOES,
  number
>;*/

type FetchShoesSelectedAction = BaseAction<
  ShoesActionTypes.FETCH_SHOES_SELECTED,
  number
>;

type FetchShoesWishAction = BaseAction<
  ShoesActionTypes.FETCH_SHOES_WISH,
  number
>;

type FetchShoesSuccessAction = BaseAction<
  ShoesActionTypes.FETCH_SHOES_SUCCESS,
  any[]
>;

type FetchShoesErrorAction = BaseAction<
  ShoesActionTypes.FETCH_SHOES_ERROR,
  string
>;

export type ShoesAction =
  | FetchShoesWishAction
  | FetchShoesAction
  /*  | FetchSelectedShoesAction*/
  | FetchShoesSelectedAction
  | FetchShoesSuccessAction
  | FetchShoesErrorAction;
