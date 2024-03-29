import React, { FC, useEffect } from "react";

import "./SignUp.scss";

import * as yup from "yup";
import { Formik } from "formik";
import GoogleIcon from "../../icons/GoogleIcon";
import FaceBookIcon from "../../icons/FaceBookIcon";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import {
  useActions,
  useAppSelector,
} from "../../hooks/StoreHooksToolkit/toolkit";
import { userSelector } from "../../storeToolkit/slices/usersSlice";

const signUpOptions = [
  { title: "Google", id: 0, logo: <GoogleIcon /> },
  { title: "FaceBook", id: 1, logo: <FaceBookIcon /> },
];

type PropsT = {
  onSignUpClick: () => void;
};

const SignUp: FC<PropsT> = ({ onSignUpClick }) => {
  const { t } = useTranslation();
  const { postUser, resetError } = useActions();

  const { auth, error } = useAppSelector(userSelector);

  useEffect(() => {
    if (error) {
      alert(error);
      resetError();
    }
    if (auth) {
      alert("Ви успішно зареєструвалися!");
      onSignUpClick();
    }
  }, [error, auth]);

  const userCreate = (values: object) => {
    const userId = uuidv4();

    const user = { ...values, userId };
    postUser({ user });
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
    name: yup.string().required(`${t("logInPage.required")}`),
    surname: yup.string().required(`${t("logInPage.required")}`),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        name: "",
        surname: "",
      }}
      validationSchema={validationsSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        userCreate(values);
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
        <div className="signup">
          <div>Зареєструватися за допомогою...</div>
          <div className="signup__options">
            {signUpOptions.map(({ title, id, logo }) => (
              <div className="signup__options__item" key={id}>
                <div>{logo}</div>
                <span>{title}</span>
              </div>
            ))}
          </div>

          <div>Або зареєструватися за допомгою Емейлу</div>

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

            <div className="signup__register-form__item">
              <label htmlFor="name">{t("logInPage.enterName")}</label>

              <input
                className="signup__register-form__item__input"
                type="text"
                id="name"
                placeholder={`${t("logInPage.enterName")}`}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name && <p>{errors.name}</p>}
            </div>

            <div className="signup__register-form__item">
              <label htmlFor="surname">{t("logInPage.enterSurname")}</label>

              <input
                className="signup__register-form__item__input"
                type="text"
                id="surname"
                placeholder={`${t("logInPage.enterSurname")}`}
                value={values.surname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.surname && errors.surname && <p>{errors.surname}</p>}
            </div>
          </div>

          <button
            className="signup__join-btn"
            type="submit"
            disabled={isSubmitting}
            onClick={() => handleSubmit()}
          >
            {t("logInPage.signUp")}
          </button>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
