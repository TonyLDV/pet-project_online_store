import React, { FC, useState } from "react";
import { Modal } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/StoreHooksToolkit/toolkit";

import "./SuccessfulAddModal.scss";
import { cartSelector } from "../../storeToolkit/slices/cartSlice";

type PropsT = {
  array: any;
  openState: boolean;
  onCloseClick: (b: boolean) => void;
};

const SuccessfulAddModal: FC<PropsT> = ({ array, openState, onCloseClick }) => {
  const [open, setOpen] = useState<boolean>(openState);
  const { totalPrice, itemsCount } = useAppSelector(cartSelector);

  const handleClose = (state: boolean) => {
    setOpen(state);
    onCloseClick(state);
  };

  return (
    <Modal open={open} onClose={() => handleClose(false)}>
      <div className={open ? "successful-add" : "successful-add__hidden"}>
        <p className="successful-add__title">Успішно додано до вашого кошику</p>

        <div className="successful-add__content">
          <div className="successful-add__info-content">
            <img
              className="successful-add__info-content__img"
              src={array.url}
              alt={array.title}
            />

            <div>
              <p className="successful-add__info-content__title">
                {array.title}
              </p>

              <p>{array.price}</p>

              <p>Розмір: {array.size}</p>
            </div>
          </div>

          <span className="row" />

          <div className="successful-add__cart-info">
            <div className="successful-add__cart-info__details">
              <p>Ваш кошик:</p>

              <p>{itemsCount}</p>
            </div>

            <div className="successful-add__cart-info__details">
              <p>Загальна сума покупки:</p>

              <p>{totalPrice}</p>
            </div>
            <div className="successful-add__cart-info__details">
              <p>Загальна сума доставки: </p>

              <p>Безкоштовно</p>
            </div>
            <div className="line" />
            <div className="successful-add__cart-info__details">
              <p>Загалом:</p>

              <p>{totalPrice}</p>
            </div>
            <div className="successful-add__cart-nav">
              <NavLink className="cart-nav" to="../cart">
                Переглянути кошик
              </NavLink>
            </div>
            <div className="checkout">Оплатити</div>
          </div>
        </div>

        <div
          className="successful-add__close-btn"
          onClick={() => handleClose(false)}
        >
          X
        </div>
      </div>
    </Modal>
  );
};

export default SuccessfulAddModal;
