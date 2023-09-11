import React, { FC, useState } from "react";

import "./SortPopUp.scss";
import { OutsideClick } from "../../hooks";
import {
  useActions,
  useAppSelector,
} from "../../hooks/StoreHooksToolkit/toolkit";
import { shoesSelector } from "../../storeToolkit/slices/shoesSlice";
import { ShoesType } from "../../constants";

const sortOptions = [
  { id: 0, option: "Ціною +", props: "price", order: "asc" },
  { id: 1, option: "Ціною -", props: "price", order: "desc" },
  { id: 2, option: "Назвою (A-Z) ", props: "title", order: "asc" },
  { id: 3, option: "Назвою (Z-A) ", props: "title", order: "desc" },
];

type PropsT = {
  title: string;
  itemsType: ShoesType;
};

const SortPopUp: FC<PropsT> = ({ title, itemsType }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { setShoesPage, fetchShoesToolkitByQuery } = useActions();
  const { sortProps, page } = useAppSelector(shoesSelector);

  const onCloseClick = () => {
    setOpen(false);
  };

  const onOptionClick = (props: string, order: string, option: string) => {
    if (!sortProps) {
      setShoesPage(1);
    }

    fetchShoesToolkitByQuery({
      type: itemsType,
      title,
      page,
      sortingProps: { props, order, title: option },
      update: false,
    });
  };

  return (
    <OutsideClick onOutsideClick={() => setOpen(false)}>
      <div className="sort-container">
        <div onClick={() => setOpen(!open)}>
          Сортувати за :{" "}
          <span className="sort__active">
            {sortProps ? `${sortProps.title}` : null}
          </span>
        </div>

        {open && (
          <div className="sort__popup">
            {sortOptions.map(({ id, option, props, order }) => (
              <ul key={id} className="sort__options" onClick={onCloseClick}>
                <li
                  key={id}
                  className="sort__options__item"
                  onClick={() => onOptionClick(props, order, option)}
                >
                  {option}
                </li>
              </ul>
            ))}
          </div>
        )}
      </div>
    </OutsideClick>
  );
};

export default SortPopUp;
