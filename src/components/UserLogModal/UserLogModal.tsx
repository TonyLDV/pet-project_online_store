import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import "./UserLogModal.scss";
import { useTheme } from "../../hooks";
import {
  useActions,
  useAppSelector,
} from "../../hooks/StoreHooksToolkit/toolkit";
import { userSelector } from "../../storeToolkit/slices/usersSlice";

type ISettings = {
  link: string;
  title: string;
  id: number;
  disabled?: boolean;
  to: string;
};

const UserLogModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const { auth } = useAppSelector(userSelector);
  const { resetActiveUser } = useActions();

  const location = useLocation();

  const { t, i18n } = useTranslation();

  const handleLogClick = () => {
    if (!auth) {
      setOpen(!open);
    } else {
      resetActiveUser();
      /*navigate(-1);*/
    }
  };

  const arr: Record<any, ISettings> = t("userLogModal.settings", {
    returnObjects: true,
  });

  const themeSwitcher = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="user-log">
      {auth ? (
        <div className="user-log__navigation">
          {Object.keys(arr).map((i) =>
            arr[i].disabled ? (
              <NavLink
                to={arr[i].to}
                key={arr[i].id}
                className="user-log__button"
              >
                {arr[i].title}
              </NavLink>
            ) : (
              <NavLink
                to={arr[i].to}
                className="user-log__button"
                key={arr[i].id}
              >
                {arr[i].title}
              </NavLink>
            )
          )}
        </div>
      ) : (
        <div>Для отримання додаткових функцій потрібно авторизуватися</div>
      )}
      <span className="user-log__arrow" />

      <div className="user-log__options">
        <div className="language-switcher">
          <button
            className={"header__language-switcher__item"}
            type="submit"
            onClick={() => i18n.changeLanguage("uk")}
            disabled={i18n.resolvedLanguage === "uk"}
          >
            UK
          </button>
          /
          <button
            className={"header__language-switcher__item"}
            type="submit"
            onClick={() => i18n.changeLanguage("en")}
            disabled={i18n.resolvedLanguage === "en"}
          >
            EN
          </button>
        </div>

        <div className="user-log__theme">
          Theme
          <div className="theme-switcher" onClick={themeSwitcher} />
        </div>
      </div>

      <button className="user-log__enter" onClick={handleLogClick}>
        {auth ? (
          <p>{t("logOut")}</p>
        ) : (
          <NavLink
            className="user-log__enter__button"
            to="login"
            state={{ backgroundLocation: location }}
          >
            <p>{t("signIn")}</p>
          </NavLink>
        )}
      </button>
    </div>
  );
};

export default UserLogModal;
