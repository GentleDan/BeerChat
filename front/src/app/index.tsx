import { withProviders } from "./providers";
import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { initApi } from "../shared/lib/axios.ts";
import Routing from "../pages";
import "./index.scss";

let isInitApi = false;

const Providers = () => {
  useEffect(() => {
    if (isInitApi) return;
    isInitApi = true;

    initApi();
  }, []);

  return (
    <>
      <CssBaseline />
      <Routing />
    </>
  );
};

export const App = withProviders(Providers);
