import React from "react";

import ItemModel from "../ItemModel";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/StoreHooksToolkit/toolkit";
import "./Wishlist.scss";
import { wishlistSelector } from "../../storeToolkit/slices/wishlistSlice";

const Wishlist = () => {
  const { t } = useTranslation();

  const { wishlist } = useAppSelector(wishlistSelector);

  if (!wishlist.length) {
    return (
      <div className="wishlist__container">
        <div className="bag__empty">
          <div className="bag__title">{t("wishlist.emptyWishlist")}</div>

          <div>{t("wishlist.emptyWishlistText")}</div>

          <div className="bag__order__checkout">
            <NavLink className="bag__order__checkout__content" to={"/men"}>
              {t("wishlist.getStarted")}
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="wishlist__container">
      <div className="wishlist__card">
        <div className="wishlist__card__wall-header">
          <div className="wishlist__card__wall-header__title">
            Мій список бажаннь
          </div>

          <div>
            {t("bag.key1_interval", {
              postProcess: "interval",
              count: wishlist.length,
            })}
          </div>
        </div>

        <div className="wishlist__list">
          {wishlist.map((item) => (
            <div className="wishlist__list__item" key={item.id}>
              <ItemModel item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
