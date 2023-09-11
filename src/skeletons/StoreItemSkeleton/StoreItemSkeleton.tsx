import React from "react";
import ContentLoader from "react-content-loader";

const StoreItemSkeleton = () => (
  <ContentLoader
    speed={2}
    width={450}
    height={525}
    viewBox="0 0 450 525"
    backgroundColor="#f5f5f5"
    foregroundColor="#ecebeb"
    className="product__item"
  >
    <rect x="0" y="0" rx="6" ry="6" width="450" height="450" />
    <rect x="0" y="460" rx="6" ry="6" width="450" height="19" />
    <rect x="0" y="485" rx="6" ry="6" width="450" height="19" />
  </ContentLoader>
);

export default StoreItemSkeleton;
