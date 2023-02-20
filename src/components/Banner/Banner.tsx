import React from "react";

import "./Banner.scss";
import Slider from "../Slider";
import SlideSwiper from "../SlideSwiper";

const dataSlider = [
  {
    id: 1,
    slide: "Hello world 1 ",
  },
  {
    id: 2,
    slide: "Hello world 2 ",
  },

  {
    id: 3,
    slide: "Hello",
  },
];

const Banner = () => {
  return (
    <div className="banner-container">
      <SlideSwiper slides={dataSlider} delay={5000} sliderType="text" />
    </div>
  );
};

export default Banner;
