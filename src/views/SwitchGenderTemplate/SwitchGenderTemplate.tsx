import React, { FC } from "react";

import { ShoesType } from "../../constants";
import ShoesList from "../../components/ShoesList";

type PropsT = {
  type?: ShoesType;
};

const SwitchGenderTemplate: FC<PropsT> = ({ type }) => {
  if (!type) {
    return null;
  }

  switch (type) {
    case ShoesType.MEN: {
      return <ShoesList wallHeaderTitle="Чоловічі" itemType={type} />;
    }
    case ShoesType.WOMEN: {
      return <ShoesList wallHeaderTitle="Жіночі" itemType={type} />;
    }
  }
};

export default SwitchGenderTemplate;
