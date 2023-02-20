import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { NavLink } from "react-router-dom";
import SignPage from "../../views/SignPage";

import "./UserLogModal.scss";

type PropsT = {};

type ISettings = {
  link: string;
  title: string;
  id: number;
  disabled?: boolean;
};

const UserLogModal = () => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const arr: Record<any, ISettings> = t("userLogModal.settings", {
    returnObjects: true,
  });

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

      <button className="user-log__enter" onClick={() => setOpen(!open)}>
        {t("signIn")}
      </button>
      {open && <SignPage />}
    </div>
  );
};

export default UserLogModal;
