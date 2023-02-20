import React from "react";

import CartItem from "../CartItem";
import { NavLink } from "react-router-dom";
import { useTypesSelector } from "../../hooks/StoreHooks";
import { useAction } from "../../hooks/StoreHooks/useAction";

import "./Bag.scss";
import { useTranslation } from "react-i18next";

const Bag = () => {
  const { cart, totalPrice } = useTypesSelector((state) => state.cart);
  const { resetCart, deleteCart } = useAction();

  const { t } = useTranslation();

  return (
    <div className="bag__content">
      {cart.length ? (
        <div className="bag__content">
          <div className="bag__item">
            <div className="bag__title">{t("bag.main")}</div>

            <div>
              {/*              {cart.length === 1
                ? `ВСЬОГО ${cart.length} річ`
                : cart.length >= 2 && cart.length < 5
                ? `ВСЬОГО ${cart.length} речі`
                : `ВСЬОГО ${cart.length} речей`}*/}
              <p>
                {t("bag.key1_interval", {
                  postProcess: "interval",
                  count: cart.length,
                })}
              </p>
            </div>

            <div> € {totalPrice}</div>

            <CartItem array={cart} onCloseClick={deleteCart} />
          </div>

          <div className="bag__order">
            <div className="bag__order__summary">
              <div className="bag__order__summary__title">
                {t("bag.summary")}
              </div>

              <div className="bag__order__summary__info">
                <div className="bag__order__summary__info__list">
                  <div className="bag__order__summary__info__list__item">
                    {t("key1_interval", {
                      postProcess: "interval",
                      count: cart.length,
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

            <div onClick={resetCart}>{t("bag.clear")}</div>

            <div className="bag__order__checkout">
              <div className="bag__order__checkout__content">
                {t("bag.checkout")}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bag__empty">
          <div className="bag__title">{t("bag.emptyBag")}</div>

          <div>{t("bag.emptyBagText")}</div>

          <div className="bag__order__checkout">
            <NavLink className="bag__order__checkout__content" to={"/men"}>
              {t("bag.getStarted")}
            </NavLink>
          </div>
        </div>
      )}
      <br />

      {/*      <div>
        {t("description.language")}
        <hr />
        <p>{t("key1_interval", { postProcess: "interval", count: 1 })}</p>
        <p>{t("key1_interval", { postProcess: "interval", count: 4 })}</p>
        <p>{t("key1_interval", { postProcess: "interval", count: 100 })}</p>
        <hr />

        <hr />
      </div>*/}
    </div>
  );
};

export default Bag;
