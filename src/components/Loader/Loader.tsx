import React from "react";

import "./Loader.scss";

export const Loader = () => {
  return (
    <div className="loader-container_full">
      <div className="loader-container">
        <div className="multi-spinner-container">
          <div className="multi-spinner">
            <div className="multi-spinner">
              <div className="multi-spinner">
                <div className="multi-spinner">
                  <div className="multi-spinner">
                    <div className="multi-spinner" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
