import { createSlice } from "@reduxjs/toolkit";
import { IShoes, ShoesState } from "../../store/types/shoes";
import {
  fetchShoesToolkit,
  fetchShoesToolkitByQuery,
  fetchSingleShoes,
} from "../actions/shoes";
import { RootState } from "../store";

const initialState: ShoesState = {
  shoes: [],
  error: null,
  selectedShoes: {} as IShoes,
  loading: false,
  page: 1,
  limit: 8,
  maxItems: 1,
  paginationCount: 1,
  type: "",
  sortProps: null,
};

export const shoesSlice = createSlice({
  name: "shoes",
  initialState,
  reducers: {
    getMaxItems(state, { payload }) {
      state.maxItems = payload;
    },
    setShoesPage(state, { payload }) {
      state.page = payload;
    },
    getPagesCount(state, { payload }) {
      state.paginationCount = payload;
    },
    setShoesType(state, action) {
      state.type = action.payload;
    },
    getSortProps(state, { payload }) {
      state.sortProps = payload;
    },
    resetSortProps(state) {
      state.sortProps = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchShoesToolkit.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchShoesToolkit.fulfilled, (state, { payload }) => {
      state.shoes = payload as IShoes[];
    });

    builder.addCase(fetchShoesToolkit.rejected, () => {});

    builder.addCase(fetchShoesToolkitByQuery.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchShoesToolkitByQuery.fulfilled, (state, action) => {
      state.loading = false;
      state.shoes = action.payload as IShoes[];
    });
    builder.addCase(fetchShoesToolkitByQuery.rejected, () => {});

    builder.addCase(fetchSingleShoes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleShoes.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.selectedShoes = payload as IShoes;
    });
    builder.addCase(fetchSingleShoes.rejected, () => {});
  },
});

export const shoesSelector = (state: RootState) => state.shoes;
export const shoesActions = shoesSlice.actions;
export const shoesReducer = shoesSlice.reducer;
