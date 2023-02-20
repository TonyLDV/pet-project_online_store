import React, { useState } from "react";
import { useTypesSelector } from "../../hooks/StoreHooks";

import ItemModel from "../ItemModel";

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAction } from "../../hooks/StoreHooks/useAction";

import "./Wishlist.scss";

const Wishlist = () => {
  const [selectSize, setSelectSize] = useState(false);
  const { wishlist } = useTypesSelector((state) => state.wishlist);
  const { createCart } = useAction();
  const { t } = useTranslation();

  return (
    <div className="wishlist__container">
      {wishlist.length ? (
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
              {wishlist.map(({ id, wish, url, price, title, size }) => (
                <div className="wishlist__list__item" key={id}>
                  <ItemModel
                    url={url}
                    price={price}
                    title={title}
                    id={id}
                    wish={wish}
                  />

                  <div
                    className="wishlist__list__item__button"
                    /*onClick={() => createCart({ url, price, title, id, wish })}*/
                    onClick={() => setSelectSize(!selectSize)}
                  >
                    {size ? "Добавити кошик" : "Оберіть розмір"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bag__empty">
          <div className="bag__title">{t("wishlist.emptyWishlist")}</div>

          <div>{t("wishlist.emptyWishlistText")}</div>

          <div className="bag__order__checkout">
            <NavLink className="bag__order__checkout__content" to={"/men"}>
              {t("wishlist.getStarted")}
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
