import React from "react";

import styles from "./Pagination.module.scss";

type PropsT = {
  array: number[];
  currentPage: number;
  maxPage: number;
  setActivePage: (number: number) => void;
};

const Pagination: React.FC<PropsT> = ({
  array,
  currentPage,
  setActivePage,
  maxPage,
}) => {
  const addPage = (page: number) => {
    if (page > 1) {
      setActivePage(currentPage - 1);
    }
  };
  const minusPage = (page: number) => {
    if (page < maxPage) {
      setActivePage(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={
          currentPage === 1
            ? styles.pagination__item__disabled
            : styles.pagination__item
        }
        onClick={() => addPage(currentPage)}
      >
        {"<<"}
      </button>

      {array.map((number) => (
        <button
          key={number + 1}
          onClick={() => setActivePage(number)}
          className={
            number === currentPage
              ? styles.pagination__item__active
              : styles.pagination__item
          }
        >
          {number}
        </button>
      ))}

      <button
        className={
          currentPage === maxPage
            ? styles.pagination__item__disabled
            : styles.pagination__item
        }
        onClick={() => minusPage(currentPage)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
