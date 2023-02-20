import React, { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import Slider from "../Slider";
import Reviews from "../Reviews";
import Wish from "../../icons/Wish";
import { sizes } from "../../constants";
import { useParams } from "react-router-dom";
import ShoesSizeFilter from "../ShoesSizeFilter";
import SuccessfulAddModal from "../SuccessfulAddModal";
import { useTypesSelector } from "../../hooks/StoreHooks";
import { useAction } from "../../hooks/StoreHooks/useAction";

import "./ItemInfo.scss";
import SlideSwiper from "../SlideSwiper";
import { useTranslation } from "react-i18next";

const ItemInfo = () => {
  const [size, setSize] = useState(0);
  const [regionSize, setRegionSize] = useState("eu");
  const [isSuccess, setIsSuccess] = useState(false);

  const { setSelected, createCart, createWish, deleteWish, setWish } =
    useAction();

  const { selectedShoes } = useTypesSelector((state) => state.shoes);

  const params = useParams();
  const paramsId = parseInt(params.id as string);
  let itemImages: any[] = [];

  const { t } = useTranslation();

  if (selectedShoes) {
    itemImages = [
      { id: 0, img: selectedShoes.url },
      { id: 1, img: selectedShoes.url },
      { id: 2, img: selectedShoes.url },
      { id: 3, img: selectedShoes.url },
    ];
  }

  useEffect(() => {
    setSelected(paramsId);
  }, []);

  const onSizeClick = (size: number) => {
    setSize(size);
  };

  const onWishClick = () => {
    /*    if (selectedShoes) {
      setWish(selectedShoes.id);
      createWish(selectedShoes);
    }*/
    /* setIsSuccess(false);*/
    console.log(isSuccess);
  };

  const onAddCartClick = () => {
    const bucketId = uuidv4();
    if (size > 0) {
      createCart({ ...selectedShoes, size, bucketId });
      setIsSuccess(true);
    } else {
      return alert("Для початку , потрібно обрати розмір!");
    }
  };

  const handleClose = (state: boolean) => {
    console.log(state, state);
    setIsSuccess(state);
  };

  if (selectedShoes) {
    return (
      <div className="item-info__container">
        <div className="item-info__container__content">
          <div className="item-info__container__left">
            <div className="item-info__grid">
              {itemImages.map(({ id, img }) => (
                <div key={id}>
                  <img className="item-info__img" src={img} alt="" />
                </div>
              ))}
            </div>
          </div>

          <div className="item-info--slider">
            <SlideSwiper slides={itemImages} sliderType="img" delay={0} />
          </div>

          <div className="item-info__container__right">
            <div className="item-info__title">{selectedShoes.title}</div>

            <div className="item-info__type">{selectedShoes.type}'s shoes</div>

            <div className="item-info__price">€ {selectedShoes.price}</div>

            <div>{t("size")}</div>

            <>
              <div>
                <div className="filter__region">
                  <div
                    className={
                      regionSize === "eu"
                        ? "filter__region__item__active"
                        : "filter__region__item"
                    }
                    onClick={() => setRegionSize(sizes.eu.region)}
                  >
                    {sizes.eu.region}
                  </div>

                  <div
                    className={
                      regionSize === "us"
                        ? "filter__region__item__active"
                        : "filter__region__item"
                    }
                    onClick={() => setRegionSize(sizes.us.region)}
                  >
                    {sizes.us.region}
                  </div>
                </div>

                <div className="filter__region">
                  <div>
                    <ShoesSizeFilter
                      submenu={
                        regionSize === "eu" ? sizes.eu.size : sizes.us.size
                      }
                      onSizeClick={onSizeClick}
                    />
                  </div>
                </div>
              </div>
            </>

            <div className="item-info__group">
              <div className="item-info__add" onClick={onAddCartClick}>
                {t("addToCart")}
              </div>

              {isSuccess && (
                <SuccessfulAddModal
                  openState={isSuccess}
                  array={{ ...selectedShoes, size }}
                  onCloseClick={handleClose}
                />
              )}

              <div className="item-info__box" onClick={onWishClick}>
                <Wish color={selectedShoes.wish ? "red" : "black"} />
              </div>
            </div>

            <Reviews />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>{paramsId}</div>;
  }
};

export default ItemInfo;
