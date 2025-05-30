import { Navigate, Route, Routes } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserLs } from "../entities/user/user";
import { AuthPage } from "./auth";
import { HomePage } from "./home";
import { setUser, useIsAuthenticated, useUser } from "../entities/user/model";

const Routing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();

  //later add here socket connection
  useEffect(() => {
    const user = getUserLs();
    if (user) dispatch(setUser(user));

    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  if (isLoading) return <></>;

  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:chatId" element={<HomePage />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default Routing;
