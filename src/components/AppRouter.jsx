import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../context";
import { privateRoutes, publicRoutes } from "../router/routes";
import Loader from './UI/loader/Loader';

/** Сделать загрузку роутов из файла */
const AppRouter = () => {
  const { isAuth, setIsAuth, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <Loader/>
  }
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          path={route.path}
          element={<route.element />}
          exact={route.exact}
          key={route.path}
        />
      ))}
      <Route path="/*" element={<Navigate to="/posts" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          path={route.path}
          element={<route.element />}
          exact={route.exact}
          key={route.path}
        />
      ))}
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
