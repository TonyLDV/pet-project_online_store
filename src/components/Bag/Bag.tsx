import React from "react";

import CartItem from "../CartItem";
import { NavLink } from "react-router-dom";

import "./Bag.scss";
import { useTranslation } from "react-i18next";
import {
  useActions,
  useAppSelector,
} from "../../hooks/StoreHooksToolkit/toolkit";
import { cartSelector } from "../../storeToolkit/slices/cartSlice";

const Bag = () => {
  const { cart, totalPrice, itemsCount } = useAppSelector(cartSelector);
  const { deleteCartItem, resetCart } = useActions();

  const { t } = useTranslation();

  if (!cart.length) {
    return (
      <div className="bag__content">
        <div className="bag__empty">
          <div className="bag__title">{t("bag.emptyBag")}</div>

          <div>{t("bag.emptyBagText")}</div>

          <div className="bag__order__checkout">
            <NavLink className="bag__order__checkout__content" to={"/men"}>
              {t("bag.getStarted")}
            </NavLink>
          </div>
          <br />
        </div>
      </div>
    );
  }

  return (
    <div className="bag__content">
      <div className="bag__content">
        <div className="bag__item">
          <div className="bag__title">{t("bag.main")}</div>

          <div>
            <p>
              {t("bag.key1_interval", {
                postProcess: "interval",
                count: itemsCount,
              })}
            </p>
          </div>

          <div> € {totalPrice}</div>

          <CartItem array={cart} onCloseClick={deleteCartItem} />
        </div>

        <div className="bag__order">
          <div className="bag__order__summary">
            <div className="bag__order__summary__title">{t("bag.summary")}</div>

            <div className="bag__order__summary__info">
              <div className="bag__order__summary__info__list">
                <div className="bag__order__summary__info__list__item">
                  {t("key1_interval", {
                    postProcess: "interval",
                    count: itemsCount,
                  })}
                </div>

                <div className="bag__order__summary__info__list__item">
                  {t("bag.delivery")}
                </div>

                <div className="bag__order__summary__info__list__item">
                  {t("bag.total")}
                </div>
              </div>

              <div className="bag__order__summary__info__list">
                <div className="bag__order__summary__info__list__item right">
                  € {totalPrice}
                </div>

                <div className="bag__order__summary__info__list__item right">
                  {t("bag.shippingPrice")}
                </div>

                <div className="bag__order__summary__info__list__item right">
                  € {totalPrice}
                </div>
              </div>
            </div>
          </div>

          <br />

          <br />

          <div onClick={() => resetCart()}>{t("bag.clear")}</div>

          <div className="bag__order__checkout">
            <div className="bag__order__checkout__content">
              {t("bag.checkout")}
            </div>
          </div>
        </div>
      </div>

      <br />
    </div>
  );
};

export default Bag;
