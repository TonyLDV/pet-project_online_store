import React, { useState } from "react";

import "./ShoesSizeFilter.scss";

type PropsT = {
  submenu: any[];
  onSizeClick?: (size: number) => void;
};

const ShoesSizeFilter: React.FC<PropsT> = ({ submenu, onSizeClick }) => {
  const [activeSize, setActiveSize] = useState(0);

  const handleSizeClick = (size: number) => {
    setActiveSize(size);
    if (onSizeClick) {
      onSizeClick(size);
    }
  };
  return (
    <div className="wrapper-grid-selector">
      {submenu.map(({ id, size }) => (
        <div
          className={
            activeSize === size
              ? "shoes-size__item__active"
              : "shoes-size__item"
          }
          key={id}
          onClick={() => handleSizeClick(size)}
        >
          {size}
        </div>
      ))}
    </div>
  );
};

export default ShoesSizeFilter;
