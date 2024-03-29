import React, { FC, useEffect } from "react";

import * as yup from "yup";
import { Formik } from "formik";
import GoogleIcon from "../../icons/GoogleIcon";
import FaceBookIcon from "../../icons/FaceBookIcon";

import "./LogIn.scss";
import { useTranslation } from "react-i18next";
import {
  useActions,
  useAppSelector,
} from "../../hooks/StoreHooksToolkit/toolkit";
import { userSelector } from "../../storeToolkit/slices/usersSlice";

const signInOptions = [
  { title: "Google", id: 0, logo: <GoogleIcon /> },
  { title: "FaceBook", id: 1, logo: <FaceBookIcon /> },
];

type PropsT = {
  onLogInClick: () => void;
};

const LogIn: FC<PropsT> = ({ onLogInClick }) => {
  const { t } = useTranslation();
  const { getUser } = useActions();
  const { error, auth } = useAppSelector(userSelector);

  const { resetError } = useActions();

  useEffect(() => {
    if (auth) {
      alert("Ви успішно авторизувалися  !");
      onLogInClick();
    }
    if (error) {
      alert("Somethings went wrong");
      resetError();
    }
  }, [auth, error]);

  const userAuthorization = (values: { email: string; password: string }) => {
    const user = { ...values };
    getUser({ user });
  };

  const validationsSchema = yup.object().shape({
    email: yup
      .string()
      .email(`${t("logInPage.email")}`)
      .required(`${t("logInPage.required")}`),
    password: yup
      .string()
      .min(8, `${t("logInPage.requiredMin")}`)
      .required(`${t("logInPage.required_plus")}`)
      .matches(/[a-zA-Z]/, `${t("logInPage.required_eng")}`),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(false);

        userAuthorization(values);

        resetForm();
      }}
      validationSchema={validationsSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div className="logIn">
          <div className="signup__register-form">
            <div className="signup__register-form__item">
              <label htmlFor="email">{t("logInPage.enterEmail")}</label>

              <input
                className="signup__register-form__item__input"
                type="email"
                id="email"
                placeholder={`${t("logInPage.enterPassword")}`}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && <p>{errors.email}</p>}
            </div>

            <div className="signup__register-form__item">
              <label htmlFor="password">{t("logInPage.enterPassword")}</label>

              <input
                className="signup__register-form__item__input"
                type="password"
                id="password"
                placeholder={`${t("logInPage.enterPassword")}`}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && <p>{errors.password}</p>}
            </div>
          </div>

          <button
            className="signup__join-btn"
            type="submit"
            disabled={isSubmitting}
            onClick={() => handleSubmit()}
          >
            {t("logInPage.logIn")}
          </button>

          <p className="logIn__forgot-password">
            {t("logInPage.forgotPassword")}
          </p>

          <p>{t("logInPage.logIn_plus")}</p>
          <div className="signup__options">
            {signInOptions.map(({ title, id, logo }) => (
              <div className="signup__options__item" key={id}>
                <div>{logo}</div>
                <span>{title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LogIn;
