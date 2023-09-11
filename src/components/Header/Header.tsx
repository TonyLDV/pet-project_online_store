import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Loup from "../../icons/Loup";
import Wish from "../../icons/Wish";
import Logo from "../../icons/Logo";
import User from "../../icons/User";
import ButtonCount from "../ButtonCount";
import UserLogModal from "../UserLogModal";
import { useTranslation } from "react-i18next";
import ShoppingBag from "../../icons/ShoppingBag";
import { OutsideClick, useTheme } from "../../hooks";

import "./Header.scss";
import SignPage from "../../views/SignPage";
import {
  useActions,
  useAppSelector,
} from "../../hooks/StoreHooksToolkit/toolkit";
import { cartSelector } from "../../storeToolkit/slices/cartSlice";
import { wishlistSelector } from "../../storeToolkit/slices/wishlistSlice";
import { ShoesType } from "../../constants";

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

  const [show, setShow] = useState<boolean>(true);
  const [testOpen, setTestOpen] = useState<boolean>(false);
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);
  const [isWishlistModal, setIsWishlistModal] = useState<boolean>(false);
  const [isShowUserLogModal, setIsShowUserLogModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { cart } = useAppSelector(cartSelector);
  const { wishlist } = useAppSelector(wishlistSelector);

  const { setShoesType, fetchShoesToolkitByQuery } = useActions();

  const showSidebar = () => {
    setTestOpen(!testOpen);
  };

  useEffect(() => {
    let lastVal = 0;
    if (typeof window !== "undefined") {
      window.onscroll = function () {
        if (window.scrollY > lastVal && window.scrollY > 65) {
          setShow(false);
        }
        if (window.scrollY < lastVal) {
          setShow(true);
        }
        if (window.scrollY == lastVal) {
          return;
        }
        lastVal = window.scrollY;
      };
    }
  }, []);

  const themeSwitcher = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };

  const navbar: Record<any, INavbar> = t("header.navbar", {
    returnObjects: true,
  });

  useEffect(() => {
    document.body.style.overflow = !testOpen ? "visible" : "hidden";
  }, [testOpen]);

  const onNavClick = async (itemType: ShoesType) => {
    setShoesType(itemType);
    fetchShoesToolkitByQuery({
      type: itemType,
      reset: true,
    });
    navigate(itemType);
    setTestOpen(false);
  };

  return (
    <header className={show ? "header-container" : "header-container--hidden"}>
      <div className="header">
        <div className="header__logo">
          <NavLink to={"/"}>
            <Logo />
          </NavLink>
        </div>

        <div
          onClick={() => setTestOpen(false)}
          className={testOpen ? "header__navbar__blur" : ""}
        />

        <div
          className={
            testOpen
              ? "header__navbar-container__active"
              : "header__navbar-container"
          }
        >
          <div className="header__navbar">
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

            <div className="header__navbar__footer">
              <button
                className="header__navbar__footer__enter-btn"
                onClick={() => setOpenSignUp(!openSignUp)}
              >
                Увійти
              </button>
              {openSignUp && <SignPage />}

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

        <div className="header__btn-action acc">
          <button
            className="header__btn-action__icon"
            onClick={() => setIsShowUserLogModal(!isShowUserLogModal)}
          >
            <User />
          </button>

          <OutsideClick onOutsideClick={() => setIsShowUserLogModal(false)}>
            <div className="userlog-drop">
              {isShowUserLogModal && <UserLogModal />}
            </div>
          </OutsideClick>
        </div>

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
      </div>
    </header>
  );
};

export default Header;
