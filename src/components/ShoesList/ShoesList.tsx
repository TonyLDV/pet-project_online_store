import React, { FC, useEffect, useState } from "react";

import ItemModel from "../ItemModel";
import ShoesFilter from "../ShoesFilter";
import FilterIcon from "../../icons/FilterIcon";

import "./ShoesList.scss";
import SortPopUp from "../SortPopUp";
import Pagination from "../Pagination";
import { createPages } from "../../helpers/pagesCreator";
import StoreItemSkeleton from "../../skeletons/StoreItemSkeleton";

import {
  useActions,
  useAppSelector,
} from "../../hooks/StoreHooksToolkit/toolkit";
import { ShoesType } from "../../constants";
import { useDebounce } from "../../hooks/Debounce";
import { shoesSelector } from "../../storeToolkit/slices/shoesSlice";

type PropsT = {
  wallHeaderTitle?: string;
  itemType: ShoesType;
};

const ShoesList: FC<PropsT> = React.memo(({ wallHeaderTitle, itemType }) => {
  const [search, setSearch] = useState<string>("");
  const debounce = useDebounce(search);
  const [filterShow, setFilterShow] = useState<boolean>(false);

  const { shoes, loading, maxItems, page, paginationCount, sortProps, type } =
    useAppSelector(shoesSelector);
  const { setShoesPage, fetchShoesToolkitByQuery, setShoesType } = useActions();

  useEffect(() => {
    if (!sortProps && type === itemType) {
      fetchShoesToolkitByQuery({
        type: itemType,
        title: debounce,
        update: true,
      });
    }

    if (itemType !== type) {
      setSearch("");
      setShoesType(itemType);
      fetchShoesToolkitByQuery({
        type: itemType,
        reset: true,
      });
    }

    if (sortProps?.title) {
      fetchShoesToolkitByQuery({
        type: itemType,
        page,
        title: debounce,
        update: false,
        sortingProps: {
          props: sortProps.props,
          order: sortProps.order,
          title: sortProps.title,
        },
      });
    }
  }, [debounce, itemType]);

  const totalPages: number[] = [];

  createPages(totalPages, paginationCount, page);

  const onPageChange = (page: number) => {
    window.scrollTo(0, 0);
    setShoesPage(page);
    if (!sortProps) {
      fetchShoesToolkitByQuery({
        type: itemType,
        title: debounce,
        update: false,
        page,
      });
    }

    if (sortProps?.title) {
      fetchShoesToolkitByQuery({
        type: itemType,
        page,
        title: debounce,
        update: false,
        sortingProps: {
          props: sortProps.props,
          order: sortProps.order,
          title: sortProps.title,
        },
      });
    }
  };
  const onCloseClick = () => {
    fetchShoesToolkitByQuery({ type: itemType, reset: true });
  };

  return (
    <div className="shoes-list-container">
      <div className="wall-header">
        <div className="wall-header__title">
          {wallHeaderTitle} ({!loading ? maxItems : "*"})
          <div>
            <input
              className="wall-header__title__input"
              type="text"
              placeholder="Пошук"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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
            <SortPopUp title={debounce} itemsType={itemType} />
          </div>

          {sortProps && (
            <div className="wall-header__icon__item" onClick={onCloseClick}>
              x
            </div>
          )}
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
            {loading
              ? [...new Array(8)].map((_, index) => (
                  <StoreItemSkeleton key={index} />
                ))
              : shoes.map((item) => (
                  <div key={item.id}>
                    <ItemModel item={item} imgSize={!filterShow} />
                  </div>
                ))}
          </div>
        </div>
      </div>
      {maxItems > 8 && (
        <Pagination
          array={totalPages}
          setActivePage={onPageChange}
          currentPage={page}
          maxPage={paginationCount}
        />
      )}
    </div>
  );
});

export default ShoesList;
