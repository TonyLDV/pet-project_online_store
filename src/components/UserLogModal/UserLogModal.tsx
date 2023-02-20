import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { NavLink } from "react-router-dom";
import SignPage from "../../views/SignPage";

import "./UserLogModal.scss";
import { useTheme } from "../../hooks";

type ISettings = {
  link: string;
  title: string;
  id: number;
  disabled?: boolean;
};

const UserLogModal = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const { t, i18n } = useTranslation();

  const arr: Record<any, ISettings> = t("userLogModal.settings", {
    returnObjects: true,
  });

  const themeSwitcher = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className="user-log">
      {Object.keys(arr).map((i) =>
        arr[i].disabled ? (
          <div key={arr[i].id} className="user-log__button  ">
            {arr[i].title}
          </div>
        ) : (
          <div className="user-log__button" key={arr[i].id}>
            {arr[i].title}
          </div>
        )
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

      <button className="user-log__enter" onClick={() => setOpen(!open)}>
        {t("signIn")}
      </button>
      {open && <SignPage />}
    </div>
  );
};

export default UserLogModal;
function changeLanguage(arg0: string): void {
  throw new Error("Function not implemented.");
}
