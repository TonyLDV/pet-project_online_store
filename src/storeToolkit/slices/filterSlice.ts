import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortP: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortingProps(state, action) {
      state.sortP = action.payload;
    },
  },
});
