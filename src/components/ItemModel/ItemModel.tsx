import React, { FC } from "react";

import "./ItemModel.scss";
import Wish from "../../icons/Wish";
import { useAction } from "../../hooks/StoreHooks/useAction";
import { useNavigate } from "react-router-dom";

type PropsT = {
  title: string;
  url: string;
  price: number;
  id: number;
  wish: boolean;
  imgSize?: boolean;
  onWishClick?: () => void;
};

const ItemModel: FC<PropsT> = ({ id, title, url, price, wish, imgSize }) => {
  const { createWish, deleteWish, setWish } = useAction();
  const navigate = useNavigate();

  const navigation = () => {
    navigate("" + id);
  };

  const onWishClick = (event: any) => {
    setWish(id);
    event.stopPropagation();

    {
      !wish ? createWish({ url, price, title, id, wish }) : deleteWish(id);
    }
  };
  return (
    <>
      <div className="product" key={id} onClick={navigation}>
        <div className="product__item">
          <img
            className={
              imgSize ? "product__item__image__bigger" : "product__item__image"
            }
            src={url}
            alt=""
          />

          <div className="product__wish" onClick={onWishClick}>
            <Wish color={wish ? "red" : "black"} />
          </div>
        </div>

        <p className="product__title">{title}</p>

        <p className="product__price">€ {price} </p>
      </div>
    </>
  );
};

export default ItemModel;
