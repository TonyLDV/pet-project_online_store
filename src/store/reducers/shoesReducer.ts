import { defaultShoes } from "../../constants";
import {
  IShoes,
  ShoesAction,
  ShoesActionTypes,
  ShoesState,
} from "../types/shoes";

const initialState: ShoesState = {
  shoes: [] as IShoes[],
  selectedShoes: {} as IShoes,
  error: null,
  loading: false,
  page: 1,
  limit: 8,
  maxItems: 1,
  paginationCount: 1,
  type: "",
  sortProps: null,
};

export const shoesReducer = (
  state = initialState,
  { type, payload }: ShoesAction
): ShoesState => {
  switch (type) {
    case ShoesActionTypes.FETCH_SHOES:
      return {
        ...state,
      };

    case ShoesActionTypes.FETCH_SHOES_WISH:
      return {
        ...state,
        shoes: state.shoes.map((shoe) =>
          shoe.id === payload
            ? {
                ...shoe,
                wish: !shoe.wish,
              }
            : shoe
        ),
      };

    case ShoesActionTypes.FETCH_SHOES_SELECTED:
      const shoes = state.shoes.length === 0 ? defaultShoes : state.shoes;

      let selectedShoe = null;

      /* selectedShoe = shoes.find(({ id }) => id === payload);*/
      selectedShoe = {};
      if (typeof selectedShoe === "undefined") {
        selectedShoe = null;
      }
      return {
        ...state,
        /*        selectedShoes: selectedShoe as IShoes,
        shoes,*/
      };

    case ShoesActionTypes.FETCH_SHOES_SUCCESS:
      return {
        ...state,
        shoes: payload,
        maxItems: payload.length,
      };

    case ShoesActionTypes.FETCH_SHOES_ERROR:
      return { ...state };

    case ShoesActionTypes.SET_SHOES_PAGE:
      return { ...state, page: payload };

    case ShoesActionTypes.GET_SHOES_PAGES:
      return { ...state, paginationCount: payload };

    case ShoesActionTypes.GET_SHOES_TYPE:
      return { ...state, type: payload };

    case ShoesActionTypes.GET_FILTER_PROPS:
      return { ...state, sortProps: payload };

    case ShoesActionTypes.RESET_FILTER_PROPS:
      return { ...state, sortProps: null };

    case ShoesActionTypes.SET_IS_LOADING:
      return { ...state, loading: payload };

    default:
      return state;
  }
};
