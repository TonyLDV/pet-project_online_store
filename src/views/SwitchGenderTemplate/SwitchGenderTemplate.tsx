import React, { useEffect, FC } from "react";

import ShoesList from "../../components/ShoesList";

import { useAction } from "../../hooks/StoreHooks/useAction";
import { useTypesSelector } from "../../hooks/StoreHooks";
import { ShoesType } from "../../constants";

type PropsT = {
  type?: ShoesType;
};

const SwitchGenderTemplate: FC<PropsT> = ({ type }) => {
  const { shoes } = useTypesSelector((state) => state.shoes);
  const { fetchShoes } = useAction();

  useEffect(() => {
    fetchShoes();
  }, []);

  const newShoes = shoes.filter(({ type: shoesType }) => type === shoesType);

  if (!type) {
    return null;
  }

  switch (type) {
    case ShoesType.MEN: {
      return <ShoesList wallHeaderTitle="Чоловічі" items={newShoes} />;
    }
    case ShoesType.WOMEN: {
      return <ShoesList wallHeaderTitle="Жіночі" items={newShoes} />;
    }
  }
};

export default SwitchGenderTemplate;
