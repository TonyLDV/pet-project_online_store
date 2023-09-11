import React, { FC, useRef } from "react";
import { Swiper as SwiperType, Autoplay, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "./SlideSwiper.scss";
import "swiper/scss/autoplay";
import "swiper/scss/navigation";
import LeftArrow from "../../icons/LeftArrow";
import RightArrow from "../../icons/RightArrow";

type PropsT = {
  slides: any[];
  delay?: number;
  sliderType: string;
};

const SlideSwiper: FC<PropsT> = ({ slides, delay, sliderType }) => {
  const swiperRef = useRef<SwiperType>();

  return (
    <Swiper
      loop={true}
      modules={[Navigation, Thumbs, Autoplay]}
      autoplay={
        !delay
          ? false
          : {
              delay,
              disableOnInteraction: false,
            }
      }
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="swiper__content"
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
    >
      <div
        className="swiper__button__left"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <LeftArrow />
      </div>

      {sliderType === "text" && (
        <div>
          {slides.map(({ slide, id }) => (
            <SwiperSlide key={id} virtualIndex={id}>
              {slide}
            </SwiperSlide>
          ))}
        </div>
      )}

      {sliderType === "img" && (
        <div>
          {slides.map(({ ...restProps }) => (
            <SwiperSlide
              key={restProps.id}
              virtualIndex={restProps.id}
              className="swiper-img__container"
            >
              <img
                className="swiper-img-background"
                src={restProps.img}
                alt={restProps.text}
              />

              <img src={restProps.src} alt={restProps.text} />

              <div className="swiper-img__text"> {restProps.text}</div>
            </SwiperSlide>
          ))}
        </div>
      )}

      <div
        className="swiper__button__right"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <RightArrow />
      </div>
    </Swiper>
  );
};

export default SlideSwiper;
