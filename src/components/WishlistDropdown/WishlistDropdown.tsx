import React from "react";

import "./WishlistDropdown.scss";
import { useTypesSelector } from "../../hooks/StoreHooks";

const WishlistDropdown = () => {
  const { wishlist } = useTypesSelector((state) => state.wishlist);
  return (
    <div className="wishlistModal">
      {wishlist.map(({ title }) => (
        <div>{title}</div>
      ))}
    </div>
  );
};

export default WishlistDropdown;
