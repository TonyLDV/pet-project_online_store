import { createAsyncThunk } from "@reduxjs/toolkit";
import { reviewsURL } from "../../services/web-backend";
import axios from "axios";
import { reviewsActions } from "../slices/reviewsSlice";
import { ReviewsArr } from "../models/ReviewsModel";

export const getReviews = createAsyncThunk(
  "getReviews",
  async (
    {
      id,
      limit = 3,
      page = 1,
      update = false,
    }: { id: number; limit?: number; page?: number; update?: boolean },
    { dispatch }
  ) => {
    try {
      const url = new URL(reviewsURL);

      const response = await axios.get(`${url.href}?shoeId=${id}`);
      dispatch(reviewsActions.getMaxReviews(response.data.length));
      dispatch(
        reviewsActions.getReviewQ(Math.ceil(response.data.length / limit))
      );

      const amount = response.data.reduce((total: number, reviews: any) => {
        return total + reviews.rating;
      }, 0);
      const overallRating = amount / response.data.length;

      dispatch(reviewsActions.getRating(overallRating));

      const { data } = await axios.get<ReviewsArr[]>(
        `${url.href}?shoeId=${id}&_limit=${limit}&_page=${page}`
      );
      return data;
    } catch (e) {}
  }
);

export const postReview = createAsyncThunk(
  "shoes/postReview",
  async (itemReview: any) => {
    try {
      const url = new URL(reviewsURL);
      await axios.post(`${url.href}`, {
        ...itemReview,
      });
    } catch (e) {
      console.log(e);
    }
  }
);
