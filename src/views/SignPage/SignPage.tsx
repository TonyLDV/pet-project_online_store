import React, { FC, useState } from "react";

import { useNavigate } from "react-router-dom";
import LogIn from "../../components/LogIn";
import SignUp from "../../components/SignUp";

import "./SignPage.scss";
import { Modal } from "@mui/material";
import CloseIcon from "../../icons/CloseIcon";
import {
  useActions,
  useAppSelector,
} from "../../hooks/StoreHooksToolkit/toolkit";
import { userSelector } from "../../storeToolkit/slices/usersSlice";

type PropsT = {
  type?: string;
};

const SignPage: FC<PropsT> = ({ type }) => {
  const [exactPage, setExactPage] = useState(type || "login");
  const [open, setOpen] = useState(true);
  const { error } = useAppSelector(userSelector);
  const { resetError } = useActions();

  const navigate = useNavigate();

  const navigation = () => {
    setOpen(false);
    if (error) {
      resetError();
    }
    navigate(-1);
  };

  return (
    <Modal open={open} onClose={navigation}>
      <div className="sign-container">
        <div className="sign__options">
          <div
            className={
              exactPage === "signup"
                ? "sign__options__item__active"
                : "sign__options__item"
            }
            onClick={() => setExactPage("signup")}
          >
            <p> Sign Up</p>
          </div>

          <div
            className={
              exactPage === "login"
                ? "sign__options__item__active"
                : "sign__options__item"
            }
            onClick={() => setExactPage("login")}
          >
            Log In
          </div>
        </div>

        <div
          onClick={() =>
            setExactPage(exactPage === "login" ? "login" : "signup")
          }
        >
          {exactPage === "login" ? (
            <LogIn onLogInClick={navigation} />
          ) : (
            <SignUp onSignUpClick={navigation} />
          )}
        </div>

        <div className="sign__close-button" onClick={navigation}>
          <CloseIcon />
        </div>
      </div>
    </Modal>
  );
};

export default SignPage;
