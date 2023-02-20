import React from "react";

import "./ColorSelector.scss";

type PropsT = {
  submenu: any[];
};

const ColorSelector: React.FC<PropsT> = ({ submenu }) => {
  return (
    <div className="wrapper-grid-selector">
      {submenu.map(({ id, hex, value }) => (
        <div className="colour-selector" key={id}>
          <div
            className="colour-selector__colour"
            style={{ background: hex }}
          />
          <div className="colour-selector__title">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default ColorSelector;
