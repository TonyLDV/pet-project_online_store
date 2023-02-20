import { defaultShoes } from "../../constants";
import { ShoesAction, ShoesActionTypes, ShoesState } from "../types/shoes";

const initialState: ShoesState = {
  shoes: [],
  selectedShoes: null,
  error: null,
  loading: false,
};

export const shoesReducer = (
  state = initialState,
  { type, payload }: ShoesAction
): ShoesState => {
  switch (type) {
    case ShoesActionTypes.FETCH_SHOES:
      return {
        ...state,
        shoes: defaultShoes,
        loading: true,
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

      selectedShoe = shoes.find(({ id }) => id === payload);

      if (typeof selectedShoe === "undefined") {
        selectedShoe = null;
      }
      return {
        ...state,
        selectedShoes: selectedShoe,
        shoes,
      };

    case ShoesActionTypes.FETCH_SHOES_SUCCESS:
      return { ...state, loading: false, shoes: payload };

    case ShoesActionTypes.FETCH_SHOES_ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
