export type ReviewsState = {
  reviews: ReviewsArr[];
  loading: boolean;
  error: string;
  maxReviews: number;
  reviewsPage: number;
  paginationQuantity: number;
  rating: number;
};

export type ReviewsArr = {
  shoeId: number;
  userName: string;
  title: string;
  review: string;
  rating: number;
  id: number;
};
