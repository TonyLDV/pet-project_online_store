import React, { useEffect, useState } from "react";

import LeftArrow from "../../icons/LeftArrow";
import RightArrow from "../../icons/RightArrow";

import "./Slider.scss";

type PropsT = {
  sliderContent: any[];
  timer?: number;
  /*children: JSX.Element;*/
  className?: string;
};

const Slider: React.FC<PropsT> = ({ sliderContent, className, timer }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex(slideIndex === sliderContent.length - 1 ? 0 : slideIndex + 1);
  };

  const prevSlide = () => {
    setSlideIndex(slideIndex === 0 ? sliderContent.length - 1 : slideIndex - 1);
  };

  const autoScroll = true;

  let slideInterval: string | number | NodeJS.Timeout | undefined;
  const intervalTime = timer;

  const auto = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  useEffect(() => {
    if (!timer) {
      return;
    }

    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [slideIndex]);

  return (
    <div className="slider-container">
      <button className="slider__button" onClick={prevSlide}>
        <LeftArrow />
      </button>

      <div className="slider">
        <div className="slider__line">
          {sliderContent.map((i, index) => (
            <div
              className={
                index === slideIndex ? "slider__item__active" : "slider__item"
              }
              key={i.id}
            >
              {index === slideIndex && (
                <div>
                  {i.subtitle}
                  <img className={`${className}`} src={i.img} alt="" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button className="slider__button" onClick={nextSlide}>
        <RightArrow />
      </button>
    </div>
  );
};

export default Slider;

Slider.defaultProps = {
  className: "",
};
