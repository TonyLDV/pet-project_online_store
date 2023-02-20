import React, { FC } from "react";

import "./CartItem.scss";
import CloseIcon from "../../icons/CloseIcon";
import { useTranslation } from "react-i18next";

type PropsT = {
  array: any[];
  onCloseClick: (id: string) => void;
};

const CartItem: FC<PropsT> = ({ array, onCloseClick }) => {
  const { t } = useTranslation();
  return (
    <>
      {array.map(({ url, title, price, id, size, bucketId }) => (
        <div className="cart__item" key={bucketId}>
          <img className="cart__item__img" src={url} alt="" />

          <div className="cart__item__details">
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
