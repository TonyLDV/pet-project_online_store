import React from "react";

import "./Loader.scss";
import { useTheme } from "../../hooks";

export const Loader = () => {
  const { theme, setTheme } = useTheme();
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
