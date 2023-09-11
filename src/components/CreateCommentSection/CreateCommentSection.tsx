import React, { FC } from "react";
import { Formik, Field } from "formik";
import * as yup from "yup";

import {
  useActions,
  useAppSelector,
} from "../../hooks/StoreHooksToolkit/toolkit";
import { useParams } from "react-router-dom";
import { userSelector } from "../../storeToolkit/slices/usersSlice";
import { reviewsSelector } from "../../storeToolkit/slices/reviewsSlice";
import { shoesSelector } from "../../storeToolkit/slices/shoesSlice";

type PropsT = {
  onSubmitClickClose: (state: boolean) => void;
};

const CreateCommentSection: FC<PropsT> = ({ onSubmitClickClose }) => {
  const { activeUser } = useAppSelector(userSelector);
  const { selectedShoes } = useAppSelector(shoesSelector);
  const { paginationQuantity } = useAppSelector(reviewsSelector);
  const { postReview, getReviews, setReviewsPage } = useActions();
  const params = useParams();
  const paramsId = parseInt(params.id as string);

  const validationsSchema = yup.object().shape({
    title: yup.string().required(),
    rating: yup.number().min(1).max(5, "1-5").required(),
    review: yup.string().required(),
  });

  const onSubmitClick = (values: any) => {
    const itemReview = {
      shoeId: selectedShoes.id,
      userName: activeUser.name,
      ...values,
    };
    postReview(itemReview);
    getReviews({ id: paramsId, page: paginationQuantity });
    setReviewsPage(paginationQuantity);
    onSubmitClickClose(false);
  };

  return (
    <Formik
      initialValues={{ title: "", rating: "", review: "" }}
      validationSchema={validationsSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmitClick(values);
        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        dirty,
        isSubmitting,
      }) => (
        <div className="reviews__create-container">
          <div className="reviews__create-container__header">
            <div className="reviews__create-container__header__title">
              <label htmlFor="title">Title</label>

              <input
                type="text"
                id="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="reviews__create-container__header__rating">
              <label htmlFor="rating">Rating</label>

              <input
                type="number"
                id="rating"
                min={1}
                max={5}
                maxLength={1}
                value={values.rating}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            {errors.rating && (
              <div className="reviews__create-container__header__rating__info">
                {touched.rating && errors.rating}
              </div>
            )}
          </div>

          <div className="reviews__create-container__comment">
            <label htmlFor="review">Create comment</label>

            <Field
              as="textarea"
              className="reviews__create-container__comment__area"
              name="review"
              id="review"
              placeholder="Comment text."
              value={values.review}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <button
            className="item-info__add"
            type={"submit"}
            onClick={() => handleSubmit()}
          >
            Опублікувати
          </button>
        </div>
      )}
    </Formik>
  );
};

export default CreateCommentSection;
