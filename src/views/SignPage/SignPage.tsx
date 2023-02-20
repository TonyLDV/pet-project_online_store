import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import LogIn from "../../components/LogIn";
import SignUp from "../../components/SignUp";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../../utils/constRoutes";

import "./SignPage.scss";
import { Modal } from "@mui/material";

const SignPage = () => {
  const [exactPage, setExactPage] = useState("SignUp");
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="sign-container">
        <div className="sign__options">
          <div
            className={
              exactPage === "SignUp"
                ? "sign__options__item__active"
                : "sign__options__item"
            }
            onClick={() => setExactPage("SignUp")}
          >
            <p> Sign Up</p>
          </div>

          <div
            className={
              exactPage === "LogIn"
                ? "sign__options__item__active"
                : "sign__options__item"
            }
            onClick={() => setExactPage("LogIn")}
          >
            Log In
          </div>
        </div>

        {exactPage === "LogIn" ? (
          <div onClick={() => setExactPage("LogIn")}>
            <LogIn />
          </div>
        ) : (
          <div onClick={() => setExactPage("SignUp")}>
            <SignUp />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SignPage;
