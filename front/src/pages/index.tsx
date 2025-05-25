import { Navigate, Route, Routes } from "react-router";
import { setUser, useIsAuthenticated, useUser } from "../entities/user/model";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserLs } from "../entities/user/user";
import { AuthPage } from "./auth";

const Routing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();

  useEffect(() => {
    const user = getUserLs();
    if (user) dispatch(setUser(user));

    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  if (isLoading) {
    return <></>;
  }

  if (isAuthenticated) {
    return <></>;
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default Routing;
