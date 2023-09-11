import React, { FC } from "react";

import styles from "./ButtonCount.module.scss";

type PropsT = {
  count: number;
};

const ButtonCount: FC<PropsT> = ({ count }) => {
  return <div className={styles.btnCount}>{count}</div>;
};

export default ButtonCount;
