import React, { FC } from "react";

import "./ButtonCount.scss";

type PropsT = {
  count: number;
};

const ButtonCount: FC<PropsT> = ({ count }) => {
  return <div className="btn-count">{count}</div>;
};

export default ButtonCount;
