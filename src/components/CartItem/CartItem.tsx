import React, { FC } from "react";

import "./CartItem.scss";
import CloseIcon from "../../icons/CloseIcon";
import { useTranslation } from "react-i18next";
import { useActions } from "../../hooks/StoreHooksToolkit/toolkit";

type PropsT = {
  array: any[];
  onCloseClick: (id: string) => void;
};

const CartItem: FC<PropsT> = ({ array, onCloseClick }) => {
  const { t } = useTranslation();
  const { changeQuantity } = useActions();

  const onQuantityIncrement = (id: string | number, size: number) => {
    changeQuantity({ id, size, inc: true });
  };
  const onQuantityDecrement = (id: string | number, size: number) => {
    changeQuantity({ id, size, dec: true });
  };

  return (
    <>
      {array.map(({ url, title, price, id, size, bucketId, quantity }) => (
        <div className="cart__item" key={bucketId}>
          <img className="cart__item__img" src={url} alt="" />

          <div className="cart__item__details">
            <div>
              <div className="cart__item__info">
                <div className="cart__item__title">
                  {title}
                  <div className="cart__item__size">
                    {t("size")}: {size}
                  </div>
                </div>

                <div className="cart__item__price"> € {price}</div>
              </div>
            </div>

            <div className="cart__item__quantity">
              Quantity :
              <button
                className="cart__item__quantity__button"
                onClick={() => onQuantityDecrement(id, size)}
                disabled={quantity === 1}
              >
                -
              </button>
              {quantity}
              <button
                className="cart__item__quantity__button"
                onClick={() => onQuantityIncrement(id, size)}
              >
                +
              </button>
            </div>
          </div>

          <div
            className="cart__item__close"
            onClick={() => onCloseClick(bucketId)}
          >
            <CloseIcon />
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItem;
