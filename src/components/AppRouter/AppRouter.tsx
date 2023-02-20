import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { privateRoutes, publicRoutes } from "../../store/routes";
import { useTypesSelector } from "../../hooks/StoreHooks";
import { useAction } from "../../hooks/StoreHooks/useAction";
import EnterModal from "../EnterModal";

const AppRouter = () => {
  const { auth } = useTypesSelector((state) => state.auth);

  /*  if (!auth) {
    return (
      <Routes>
        <Route path="/" element={<EnterModal setOpener={!auth} />} />
        {privateRoutes.map(({ path, Component, ...params }) => (
          <Route key={path} path={path} element={<Component {...params} />} />
        ))}
      </Routes>
    );
  }*/

  return (
    <Routes>
      {publicRoutes.map(({ path, Component, ...params }) => (
        <Route key={path} path={path} element={<Component {...params} />} />
      ))}
    </Routes>
  );
};

export default AppRouter;
