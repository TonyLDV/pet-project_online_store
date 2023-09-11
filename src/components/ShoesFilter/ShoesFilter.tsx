import React, { useState } from "react";

import FilterItem from "../FilterItem";
import ColorSelector from "../ColorSelector";
import ShoesSizeFilter from "../ShoesSizeFilter";

import "./ShoesFilter.scss";
import { sizes } from "../../constants";

const filter = [
  {
    id: 0,
    title: "Бренд",
    submenu: [
      { id: 1, value: "Nike" },
      { id: 2, value: "Adidas" },
      { id: 3, value: "Converse" },
    ],
    open: true,
  },
  {
    id: 1,
    title: "Розмір",
    submenu: [
      {
        id: 1,
        eu: {
          region: "eu",
          size: [
            { id: 0, size: 38 },
            { id: 1, size: 39 },
            { id: 2, size: 40 },
            { id: 3, size: 41 },
            { id: 4, size: 42 },
            { id: 5, size: 43 },
            { id: 6, size: 44 },
            { id: 7, size: 45 },
            { id: 8, size: 46 },
          ],
        },

        us: {
          region: "us",
          size: [
            { id: 9, size: 8 },
            { id: 10, size: 8.5 },
            { id: 11, size: 9 },
            { id: 12, size: 9.5 },
            { id: 13, size: 10 },
            { id: 14, size: 10.5 },
            { id: 15, size: 11 },
            { id: 16, size: 11.5 },
            { id: 17, size: 12 },
          ],
        },
      },
    ],
    open: true,
  },
  {
    id: 2,
    title: "Ціна",
    submenu: [
      { id: 1, value: "$0 - 25$" },
      { id: 2, value: "$25 - 50$" },
      { id: 3, value: "$50 - 150$" },
      { id: 4, value: "150$ + " },
    ],
    open: true,
  },
  {
    id: 3,
    title: "Стать",
    submenu: [
      { id: 1, value: "Чоловічі" },
      { id: 2, value: "Жіночі" },
      { id: 3, value: "Унісекс" },
    ],
    open: true,
  },
  {
    id: 4,
    title: "Колір",
    submenu: [
      { id: 1, value: "Red", hex: "#DC343B" },
      { id: 2, value: "Green", hex: "#7BBA3C" },
      { id: 3, value: "Blue", hex: "#1790C8" },
      { id: 4, value: "Yellow", hex: "#FFD400" },
      { id: 5, value: "Orange", hex: "#F48037" },
      { id: 6, value: "Grey", hex: "#BEBEBE" },
      { id: 7, value: "Pink", hex: "#ED7A9E" },
      { id: 8, value: "White", hex: "#fff" },
      { id: 9, value: "Black", hex: "#000" },
      { id: 10, value: "Purple", hex: "#764C82" },
      { id: 11, value: "Brown", hex: "#9A7352" },
      { id: 12, value: "Mix", hex: " #000 " },
    ],
    open: true,
  },
  {
    id: 5,
    title: "Розпродаж",
    submenu: [
      { id: 1, value: "Так" },
      { id: 2, value: "Ні" },
    ],
    open: true,
  },
  {
    id: 6,
    title: "Категорії",
    submenu: [
      { id: 1, value: 34 },
      { id: 2, value: 35 },
      { id: 3, value: 36 },
    ],
    open: true,
  },
  {
    id: 7,
    title: "Висота взуття",
    submenu: [
      { id: 1, value: "Low Top" },
      { id: 2, value: "Mid Top" },
      { id: 3, value: "High Top" },
    ],
    open: true,
  },
  {
    id: 8,
    title: "Матеріал",
    submenu: [
      { id: 0, value: "Текстиль" },
      { id: 1, value: "Шкіра" },
      { id: 2, value: "Синетична" },
    ],
    open: true,
  },
];

export enum Selectors {
  color = "Колір",
  size = "Розмір",
}

const ShoesFilter = () => {
  const [shoesFilter, setShoesFilter] = useState(filter);
  const [regionSize, setRegionSize] = useState<string>("eu");

  const onDetailsClick = (posts: any, postId: number, open: boolean) => {
    setShoesFilter((prevState: any) =>
      prevState.map((item: any) =>
        item.id === postId ? { ...item, open: !open } : item
      )
    );
  };

  const switcher = (params: string, submenu: any) => {
    switch (params) {
      case Selectors.color: {
        return <ColorSelector submenu={submenu} />;
      }
      case Selectors.size: {
        return (
          <React.Fragment key={params}>
            {submenu.map((i: any) => (
              <div key={i.id}>
                <div className="filter__region">
                  <div
                    className="filter__region__item"
                    onClick={() => setRegionSize(i.eu.region)}
                  >
                    {i.eu.region}
                  </div>
                  <div
                    className="filter__region__item"
                    onClick={() => setRegionSize(i.us.region)}
                  >
                    {i.us.region}
                  </div>
                </div>

                <div className="filter__region">
                  <ShoesSizeFilter
                    submenu={
                      regionSize === "eu" ? sizes.eu.size : sizes.us.size
                    }
                  />
                </div>
              </div>
            ))}
          </React.Fragment>
        );
      }
      default: {
        return <FilterItem submenu={submenu} />;
      }
    }
  };

  return (
    <div className="filter">
      {shoesFilter.map(({ title, submenu, open, id }) => (
        <div key={id} className="filter__item">
          <div>
            <div className="filter__item__title">{title}</div>

            <div
              className={
                open
                  ? "filter__item__sub-list__active"
                  : "filter__item__sub-list"
              }
            >
              {switcher(title, submenu)}
            </div>
            <div
              onClick={() => onDetailsClick(filter, id, open)}
              className={open ? "filter__icon__active" : "filter__icon"}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoesFilter;
