import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { publicRoutes } from "../../store/routes";
import SignPage from "../../views/SignPage";
import { useAppSelector } from "../../hooks/StoreHooksToolkit/toolkit";
import { userSelector } from "../../storeToolkit/slices/usersSlice";

const AppRouter = () => {
  const { auth } = useAppSelector(userSelector);
  let location = useLocation();

  let state = location.state as { backgroundLocation?: Location };

  return (
    <div>
      <Routes location={state?.backgroundLocation || location}>
        {publicRoutes.map(({ path, Component, ...params }) => (
          <Route key={path} path={path} element={<Component {...params} />} />
        ))}
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="login" element={<SignPage />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRouter;
