import React, { FC, useState } from "react";

import Orders from "./components/Orders";
import { useAppSelector } from "../../hooks/StoreHooksToolkit/toolkit";
import "./SettingsPage.scss";
import { userSelector } from "../../storeToolkit/slices/usersSlice";

const options = [
  { id: 0, title: "My profile" },
  { id: 1, title: "My orders" },
  { id: 2, title: "My details" },
  { id: 3, title: "Payment methods" },
  { id: 4, title: "Social accounts" },
  { id: 5, title: "Gift cards & vouchers" },
  { id: 6, title: "Need help?" },
  { id: 7, title: "Sign Out" },
];

export enum Selectors {
  profile = "My profile",
  orders = "My orders",
  details = "My details",
  methods = "Payment methods",
  accounts = "Social accounts",
  giftCardsVouchers = "Gift cards & vouchers",
  help = "Need help?",
  signOut = "Sign Out",
}

const SwitchTemplateInformation = (activeId: string) => {
  switch (activeId) {
    case Selectors.profile: {
      return <div>hello</div>;
    }
    case Selectors.orders: {
      return <Orders />;
    }
    case Selectors.details: {
      return <div>hello 2</div>;
    }
    case Selectors.methods: {
      return <div>hello 3</div>;
    }
    case Selectors.accounts: {
      return <div>hello 4</div>;
    }
    case Selectors.giftCardsVouchers: {
      return <div>hello 5</div>;
    }
    case Selectors.help: {
      return <div>hello 6</div>;
    }
  }
};

const SettingsPage: FC = () => {
  const { activeUser } = useAppSelector(userSelector);

  const [activeInfo, setActiveInfo] = useState("");

  if (!activeUser) {
    return <div>Somethings went wrong = (</div>;
  }

  const { name, surname } = activeUser;
  return (
    <div className="settings-container">
      <p className="settings__title">My Account</p>
      <div className="settings__flex">
        <div className="settings__navigation">
          <div className="settings__profile">
            <div className="settings__profile__logo">
              {name[0]}
              {surname[0]}
            </div>
            <div className="settings__profile__initials">
              Hello , <br /> {name} {surname}
            </div>
          </div>

          <div className="settings__profile__options">
            {options.map(({ title, id }) => (
              <div
                className="settings__profile__options__item"
                key={id}
                onClick={() => setActiveInfo(title)}
              >
                {title}
              </div>
            ))}
          </div>
        </div>
        <div className="settings__information">
          {SwitchTemplateInformation(activeInfo)}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
