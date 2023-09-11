import React, { FC, useState } from "react";
import styles from "./SearchInput.module.scss";

type PropsT = {
  search: () => void;
};

const SearchInput: FC<PropsT> = ({ search }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <div>
      <input
        className="wall-header__title__input"
        type="text"
        placeholder="Пошук"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
