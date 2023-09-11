import React, { FC, useEffect, useState } from "react";

import { Rating } from "@mui/material";
import Pagination from "../Pagination";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createPages } from "../../helpers/pagesCreator";
import CreateCommentSection from "../CreateCommentSection";
import {
  useActions,
  useAppSelector,
} from "../../hooks/StoreHooksToolkit/toolkit";
import "./Reviews.scss";
import { reviewsSelector } from "../../storeToolkit/slices/reviewsSlice";
import { shoesSelector } from "../../storeToolkit/slices/shoesSlice";
import { ReviewsArr } from "../../storeToolkit/models/ReviewsModel";
import { userSelector } from "../../storeToolkit/slices/usersSlice";

type PropsT = {
  reviews: ReviewsArr[];
};

const Reviews: FC<PropsT> = ({ reviews }) => {
  const [openDetails, setOpenDetails] = useState<boolean>(true);
  const [openCreateComment, setOpenCreateComment] = useState<boolean>(false);

  const { getReviews } = useActions();

  const params = useParams();
  const paramsId = parseInt(params.id as string);

  const { auth } = useAppSelector(userSelector);

  const { selectedShoes } = useAppSelector(shoesSelector);
  const { setReviewsPage } = useActions();
  const { loading, maxReviews, paginationQuantity, reviewsPage, rating } =
    useAppSelector(reviewsSelector);

  const { t } = useTranslation();

  useEffect(() => {
    if (!selectedShoes.title) {
      getReviews({ id: paramsId });
    }
  }, [loading, reviews, reviewsPage]);

  const onReviewsClick = () => {
    setOpenDetails(!openDetails);
  };

  const onCreateClick = () => {
    if (auth) {
      setOpenCreateComment(!openCreateComment);
    } else {
      alert("Спочатку потрібно авторизуватися!");
    }
  };

  const totalPages: number[] = [];

  createPages(totalPages, paginationQuantity, reviewsPage);

  const onPaginationClick = (page: number) => {
    if (page !== reviewsPage) {
      setReviewsPage(page);
      getReviews({ id: paramsId, page });
    }
  };

  return (
    <div className="reviews">
      <div className="reviews__title" onClick={onReviewsClick}>
        {t("reviews")} ({maxReviews}){" "}
        <Rating
          className="reviews__star-rating"
          name="read-only"
          value={rating}
          precision={0.1}
          readOnly
        />
      </div>

      {!maxReviews && (
        <div className="reviews__title">
          Станьте першим , хто добавив коментар!
        </div>
      )}
      {loading ? (
        <div className={maxReviews > 3 ? "reviews__list" : ""}>Loading...</div>
      ) : (
        <div
          className={openDetails ? "reviews__list" : "reviews__list__closed"}
        >
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
      )}
      {maxReviews > 3 && (
        <Pagination
          currentPage={reviewsPage}
          maxPage={paginationQuantity}
          array={totalPages}
          setActivePage={onPaginationClick}
        />
      )}

      <button className="item-info__add" onClick={onCreateClick}>
        Додати коментар
      </button>

      {openCreateComment && (
        <CreateCommentSection onSubmitClickClose={setOpenCreateComment} />
      )}
    </div>
  );
};

export default Reviews;
