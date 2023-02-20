import React from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import "./FilterItem.scss";

type PropsT = {
  submenu: any[];
};

const FilterItem: React.FC<PropsT> = ({ submenu }) => {
  return (
    <div>
      {submenu.map((i: any) => (
        <div key={i.id}>
          <FormControlLabel
            control={<Checkbox className="" />}
            label={i.value}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterItem;
