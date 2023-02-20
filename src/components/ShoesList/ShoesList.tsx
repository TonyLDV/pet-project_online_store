import React, { FC, useState } from "react";

import ItemModel from "../ItemModel";
import ShoesFilter from "../ShoesFilter";
import FilterIcon from "../../icons/FilterIcon";

import "./ShoesList.scss";

type PropsT = {
  wallHeaderTitle?: string;
  items: any[];
};

const ShoesList: FC<PropsT> = ({ wallHeaderTitle, items }) => {
  const [filterShow, setFilterShow] = useState(false);

  return (
    <div>
      <div className="wall-header">
        <div className="wall-header__title">
          {wallHeaderTitle} ({items.length})
        </div>

        <div className="wall-header__icon">
          <div
            className="wall-header__icon__item"
            onClick={() => setFilterShow(!filterShow)}
          >
            <div className="wall-header__icon__item__option">
              {filterShow ? "Приховати" : "Показати"} фільтр
            </div>

            <FilterIcon />
          </div>

          <div className="wall-header__icon__item">
            <div className="wall-header__icon__sort">Сортувати за</div>
          </div>
        </div>
      </div>

      <div className="shoes-container">
        <div
          className={
            filterShow ? "content-col-left" : "content-col-left__disable"
          }
        >
          <ShoesFilter />
        </div>

        <div
          className={
            filterShow ? "content-col-right" : "content-col-right__plus"
          }
        >
          <div className={filterShow ? "shoes" : "shoes__plus"}>
            {items.map(({ id, wish, url, price, title }) => (
              <div key={id}>
                <ItemModel
                  url={url}
                  price={price}
                  title={title}
                  id={id}
                  wish={wish}
                  imgSize={!filterShow}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoesList;
