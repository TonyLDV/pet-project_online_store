import React from "react";

import SlideSwiper from "../SlideSwiper";
import styles from "./Banner.module.scss";

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
    <div className={styles.bannerContainer}>
      <SlideSwiper slides={dataSlider} delay={5000} sliderType="text" />
    </div>
  );
};

export default Banner;
