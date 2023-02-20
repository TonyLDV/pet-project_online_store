import React, { FC, useEffect, useState } from "react";

import "./Reviews.scss";
import { Rating } from "@mui/material";
import { useTranslation } from "react-i18next";

const reviews = [
  {
    userName: "User1",
    title: "Good",
    review:
      "the Stan Smith is perfect. It's a comfortable shoe but is also the best match with any outfit.",
    rating: 4,
    id: 0,
  },
  {
    userName: "User2",
    title: "Bad",
    review:
      "the Stan Smith is perfect. It's a comfortable shoe but is also the best match with any outfit.",
    rating: 2,
    id: 1,
  },
  {
    userName: "User3",
    title: "Normal",
    review:
      "the Stan Smith is perfect. It's a comfortable shoe but is also the best match with any outfit.",
    rating: 3,
    id: 2,
  },
  {
    userName: "User4",
    title: "Amazing",
    review:
      "the Stan Smith is perfect. It's a comfortable shoe but is also the best match with any outfit.",
    rating: 5,
    id: 3,
  },
  {
    userName: "User5",
    title: "Awful",
    review:
      "the Stan Smith is perfect. It's a comfortable shoe but is also the best match with any outfit.",
    rating: 1,
    id: 4,
  },
];

const Reviews = () => {
  const [openDetails, setOpenDetails] = useState(true);
  const [overallRating, setOverallRating] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const amount = reviews.reduce((total, review) => {
      return total + review.rating;
    }, 0);
    setOverallRating(amount / reviews.length);
  }, []);

  const onReviewsClick = () => {
    setOpenDetails(!openDetails);
  };

  return (
    <div className="reviews">
      <div className="reviews__title" onClick={onReviewsClick}>
        {t("reviews")} ({reviews.length}){" "}
        <Rating
          className="reviews__star-rating"
          name="read-only"
          value={overallRating}
          precision={0.1}
          readOnly
          /*          sx={{
            "& .MuiRating-iconEmpty": {
              color: "white",
            },
          }}*/
        />
      </div>

      <div className={openDetails ? "reviews__list" : "reviews__list__closed"}>
        {reviews.map(({ id, rating, review, userName, title }) => (
          <div key={id} className="reviews__list__item">
            <p className="reviews__list__item__title"> {title}</p>

            <div className="reviews__list__item__group">
              <Rating
                className="reviews__star-rating"
                name="read-only"
                defaultValue={rating}
                readOnly
                size="small"
              />
              <p className="reviews__list__item__username">{userName}</p>
            </div>

            <p className="reviews__list__item__review">{review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
