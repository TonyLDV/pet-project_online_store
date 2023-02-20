import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Loup from "../../icons/Loup";
import Wish from "../../icons/Wish";
import Logo from "../../icons/Logo";
import User from "../../icons/User";
import ButtonCount from "../ButtonCount";
import UserLogModal from "../UserLogModal";
import { Trans, useTranslation } from "react-i18next";
import ShoppingBag from "../../icons/ShoppingBag";
import { OutsideClick, useTheme } from "../../hooks";
import { useTypesSelector } from "../../hooks/StoreHooks";

import "./Header.scss";

type ILangs = {
  language: string;
};

type INavbar = {
  _id: number;
  title: string;
  path: string;
  type: string;
};

const lngs: Record<string, ILangs> = {
  uk: { language: "UK" },
  en: { language: "EN" },
};

const Header = () => {
  const { theme, setTheme } = useTheme();

  const { t, i18n } = useTranslation();

  const [isWishlistModal, setIsWishlistModal] = useState(false);
  const [isShowUserLogModal, setIsShowUserLogModal] = useState(false);

  const { cart } = useTypesSelector((state) => state.cart);
  const { wishlist } = useTypesSelector((state) => state.wishlist);

  const [scrollValue, setScrollValue] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  const [testOpen, setTestOpen] = useState(false);

  const showSidebar = () => {
    setTestOpen(!testOpen);
  };

  const themeSwitcher = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };

  const navbar: Record<any, INavbar> = t("header.navbar", {
    returnObjects: true,
  });

  /*useEffect(() => {
    const onScroll = () => {
      setScrollValue(window.scrollY);

      window.scrollY > 20 &&   scrollValue < window.scrollY
        ? setShowHeader(false)
        : setShowHeader(true);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollValue]);*/

  useEffect(() => {
    document.body.style.overflow = !testOpen ? "visible" : "hidden";
  }, [testOpen]);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="header__logo">
          <NavLink to={"/"}>
            <Logo />
          </NavLink>
        </div>

        <div className="header__navbar-container">
          <div
            onClick={() => setTestOpen(false)}
            className={testOpen ? "header__navbar__blur" : ""}
          />

          <div
            className={testOpen ? "header__navbar__active" : "header__navbar"}
          >
            <div className="header__navbar__item-list">
              {Object.keys(navbar).map((nav) => (
                <NavLink
                  key={navbar[nav]._id}
                  to={navbar[nav].path}
                  className={
                    navbar[nav].type === "desktop"
                      ? "header__navbar__item"
                      : "header__navbar__item__mob"
                  }
                  onClick={() => setTestOpen(false)}
                >
                  {navbar[nav].title}
                </NavLink>
              ))}
            </div>

            <div className="header__navbar__options">
              <div className="language-switcher__mob">
                {Object.keys(lngs).map((lng) => (
                  <button
                    className={"header__language-switcher__item"}
                    key={lng}
                    type="submit"
                    onClick={() => i18n.changeLanguage(lng)}
                    disabled={i18n.resolvedLanguage === lng}
                  >
                    {lngs[lng].language}
                  </button>
                ))}
              </div>

              <div className="theme-switcher__mob" onClick={themeSwitcher} />
            </div>
          </div>
        </div>

        <div className="header__search-group">
          <label htmlFor="search">
            <div className="header__loup">
              <Loup />
            </div>
          </label>

          <input
            type="text"
            className="header__search"
            placeholder={`${t("search")}`}
            maxLength={22}
            id="search"
          />
        </div>

        <div className=" header__btn-action header__loup-mb">
          <Loup />
        </div>

        {/*<OutsideClick onOutsideClick={() => setIsShowUserLogModal(false)}>*/}
        <div className="header__btn-action acc">
          <div onClick={() => setIsShowUserLogModal(!isShowUserLogModal)}>
            <User />
          </div>

          <div className="userlog-drop">
            {isShowUserLogModal && <UserLogModal />}
          </div>
        </div>
        {/*</OutsideClick>*/}

        <OutsideClick onOutsideClick={() => setIsWishlistModal(false)}>
          <div
            className="header__btn-action wish"
            onClick={() => setIsWishlistModal(!isWishlistModal)}
          >
            <NavLink className="header__btn-action" to={"wishlist"}>
              <Wish />
            </NavLink>

            <div className="header__btn-count">
              {wishlist.length >= 1 && <ButtonCount count={wishlist.length} />}
            </div>
          </div>
        </OutsideClick>

        <NavLink className="header__btn-action" to={"cart"}>
          <ShoppingBag />

          <div className="header__btn-count">
            {cart.length >= 1 && <ButtonCount count={cart.length} />}
          </div>
        </NavLink>

        <div className="header__icon" onClick={showSidebar}>
          <span />
        </div>

        <div className="theme-switcher" onClick={themeSwitcher} />

        <div className="language-switcher">
          {Object.keys(lngs).map((lng) => (
            <button
              className={"header__language-switcher__item"}
              key={lng}
              type="submit"
              onClick={() => i18n.changeLanguage(lng)}
              disabled={i18n.resolvedLanguage === lng}
            >
              {lngs[lng].language}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
