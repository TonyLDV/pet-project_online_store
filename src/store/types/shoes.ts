import { ShoesType } from "../../constants";

export type ShoesState = {
  shoes: IShoes[];
  selectedShoes: IShoes;
  loading: boolean;
  error: null | string;
  page: number;
  maxItems: number;
  limit: number;
  paginationCount: number;
  type: string;
  sortProps: ISort | null;
};

type ISort = {
  props: string;
  order: string;
  title: string;
  option?: string;
};

export type IShoes = {
  id: number;
  price: number;
  title: string;
  url: string;
  type?: ShoesType;
  wish?: boolean;
  reviews: any[];
};

export enum ShoesActionTypes {
  FETCH_SHOES = "FETCH_SHOES",
  FETCH_SHOES_WISH = "FETCH_SHOES_WISH",
  FETCH_SELECTED_SHOES = "FETCH_SELECTED_SHOES",
  FETCH_SHOES_SELECTED = "FETCH_SHOES_SELECTED",
  FETCH_SHOES_SUCCESS = "FETCH_SHOES_SUCCESS",
  FETCH_SHOES_ERROR = "FETCH_SHOES_ERROR",
  FETCH_FILTER_SHOES = "FETCH_FILTER_SHOES",
  SET_SHOES_PAGE = "SET_SHOES_PAGE",
  GET_SHOES_PAGES = "GET_SHOES_PAGES",
  GET_SHOES_TYPE = "GET_SHOES_TYPE",
  GET_FILTER_PROPS = "GET_FILTER_PROPS",
  RESET_FILTER_PROPS = "RESET_FILTER_PROPS",
  SET_IS_LOADING = "SET_IS_LOADING",
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

type GetShoesPages = BaseAction<ShoesActionTypes.GET_SHOES_PAGES, number>;

type SetShoesPage = BaseAction<ShoesActionTypes.SET_SHOES_PAGE, number>;

type GetShoesType = BaseAction<ShoesActionTypes.GET_SHOES_TYPE, string>;

type FetchFilterShoes = BaseAction<ShoesActionTypes.FETCH_FILTER_SHOES, number>;

type GetFilterProps = BaseAction<ShoesActionTypes.GET_FILTER_PROPS, any>;

type ResetFilterProps = BaseAction<ShoesActionTypes.RESET_FILTER_PROPS>;

type SetIsLoading = BaseAction<ShoesActionTypes.SET_IS_LOADING, boolean>;

export type ShoesAction =
  | FetchShoesWishAction
  | FetchShoesAction
  | FetchShoesSelectedAction
  | FetchShoesSuccessAction
  | FetchShoesErrorAction
  | FetchFilterShoes
  | SetShoesPage
  | GetShoesPages
  | GetShoesType
  | GetFilterProps
  | ResetFilterProps
  | SetIsLoading;
