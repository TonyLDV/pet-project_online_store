import React, { FC, useState } from "react";

import "./ItemModel.scss";
import Wish from "../../icons/Wish";
import { useNavigate } from "react-router-dom";
import {
  useActions,
  useAppSelector,
} from "../../hooks/StoreHooksToolkit/toolkit";
import { IShoes } from "../../store/types/shoes";
import { IWish } from "../../store/types/wishlist";
import { wishlistSelector } from "../../storeToolkit/slices/wishlistSlice";

type PropsT = {
  item: IShoes | IWish;
  imgSize?: boolean;
  onWishClick?: () => void;
};

const ItemModel: FC<PropsT> = ({ imgSize, item }) => {
  const { wishlist } = useAppSelector(wishlistSelector);

  const { fetchSingleShoes, getReviews } = useActions();

  const [wish] = useState(
    wishlist.find((element) => {
      return element.id === item.id;
    })
  );

  const { id, title, price, url } = item;

  const { addWishlistItem, deleteWishlistItem } = useActions();
  const navigate = useNavigate();

  const navigation = async () => {
    fetchSingleShoes(id);
    getReviews({ id });
    navigate("" + id);
  };

  const onWishClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    {
      wish ? deleteWishlistItem(item.id) : addWishlistItem({ ...item });
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
