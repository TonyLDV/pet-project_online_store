import { createSlice } from "@reduxjs/toolkit";
import { getReviews, postReview } from "../actions/reviews";
import { ReviewsArr, ReviewsState } from "../models/ReviewsModel";
import { RootState } from "../store";

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: "",
  maxReviews: 1,
  reviewsPage: 1,
  paginationQuantity: 0,
  rating: 0,
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    getMaxReviews(state, { payload }) {
      state.maxReviews = payload;
    },
    setReviewsPage(state, { payload }) {
      state.reviewsPage = payload;
    },
    getReviewQ(state, { payload }) {
      state.paginationQuantity = payload;
    },
    getRating(state, { payload }) {
      state.rating = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReviews.fulfilled, (state, { payload }) => {
      state.reviews = payload as ReviewsArr[];
      state.loading = false;
    });
    builder.addCase(getReviews.rejected, () => {});

    builder.addCase(postReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postReview.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(postReview.rejected, () => {});
  },
});

export const reviewsSelector = (state: RootState) => state.reviews;

export const reviewsActions = reviewsSlice.actions;
export const reviewsReducer = reviewsSlice.reducer;
