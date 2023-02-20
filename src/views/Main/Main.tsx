import React from "react";

import "./Main.scss";
import SlideSwiper from "../../components/SlideSwiper";

const mainSlides = [
  {
    id: 0,
    src: "https://cdn.mos.cms.futurecdn.net/EvWhwzGgpxgHvADGvKQyEh.jpg",
    text: "Converse",
  },
  {
    id: 1,
    src: "https://picstatio.com/large/dwymsq/sneakers-shoes.jpg",
    text: "Jordan",
  },
  {
    id: 2,
    src: "https://images.wallpaperscraft.com/image/single/sneakers_shoes_style_173533_1920x1080.jpg",
    text: "Nike",
  },
];

const Main = () => {
  return (
    <div className="main">
      <SlideSwiper sliderType="img" delay={7000} slides={mainSlides} />
    </div>
  );
};

export default Main;
