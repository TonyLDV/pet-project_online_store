import React, { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import Reviews from "../Reviews";
import Wish from "../../icons/Wish";
import { sizes } from "../../constants";
import { useParams } from "react-router-dom";
import ShoesSizeFilter from "../ShoesSizeFilter";
import SuccessfulAddModal from "../SuccessfulAddModal";

import "./ItemInfo.scss";
import SlideSwiper from "../SlideSwiper";
import { useTranslation } from "react-i18next";
import {
  useActions,
  useAppSelector,
} from "../../hooks/StoreHooksToolkit/toolkit";
import { Modal } from "@mui/material";
import { shoesSelector } from "../../storeToolkit/slices/shoesSlice";
import { reviewsSelector } from "../../storeToolkit/slices/reviewsSlice";

const ItemInfo = () => {
  const [size, setSize] = useState<number>(0);
  const [modalItem, setModalItem] = useState<string>("");
  const [regionSize, setRegionSize] = useState<string>("eu");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { fetchSingleShoes, addCartItem } = useActions();

  const { selectedShoes, loading } = useAppSelector(shoesSelector);
  const { reviews } = useAppSelector(reviewsSelector);

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
    if (!selectedShoes.title) {
      fetchSingleShoes(paramsId);
    }

    window.scrollTo(0, 0);
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
  };

  const onAddCartClick = () => {
    const bucketId = uuidv4();
    if (size > 0) {
      addCartItem({ ...selectedShoes, size, bucketId });
      setIsSuccess(true);
    } else {
      return alert("Для початку , потрібно обрати розмір!");
    }
  };

  const onImageClick = (img: string) => {
    setIsModalOpen(!isModalOpen);
    setModalItem(img);
  };

  const handleClose = (state: boolean) => {
    setIsSuccess(state);
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  if (!loading && selectedShoes) {
    return (
      <div className="item-info__container">
        <div className="item-info__container__content">
          <div className="item-info__container__left">
            <div className="item-info__grid">
              {itemImages.map(({ id, img }) => (
                <div key={id} onClick={() => onImageClick(img)}>
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

            <Reviews reviews={reviews} />
          </div>
        </div>

        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="item-info__modal">
            <img className="item-info__modal__item" src={modalItem} alt="" />
          </div>
        </Modal>
      </div>
    );
  } else {
    return <div>{paramsId}</div>;
  }
};

export default ItemInfo;
