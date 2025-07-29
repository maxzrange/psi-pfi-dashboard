import "@aws-amplify/ui-react/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "ldrs/react/Reuleaux.css";
import "@tanstack/react-query";

import { Flex, IconsProvider, ThemeProvider } from "@aws-amplify/ui-react";
import theme from "./theme";
import { BsThreeDots } from "react-icons/bs";
import AppRoute from "@routes/AppRoute";
import AuthRoute from "@routes/AuthRoute";
import { Slide, ToastContainer } from "react-toastify";
import usePrepare from "@hooks/usePrepare";
import { Reuleaux } from "ldrs/react";
import { ResType } from "types/resType";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ResType;
  }
}

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

export default function App() {
  const { isPreparing, isLoggedIn } = usePrepare();

  return (
    <ThemeProvider theme={theme}>
      <IconsProvider
        icons={{
          menu: {
            menu: <BsThreeDots />,
          },
        }}
      >
        {isPreparing ? (
          <Flex
            width="100vw"
            height="100dvh"
            justifyContent="center"
            alignItems="center"
          >
            <Reuleaux
              size="37"
              stroke="5"
              strokeLength="0.15"
              bgOpacity="0.1"
              speed="1.2"
              color="#007EB9"
            />
          </Flex>
        ) : isLoggedIn ? (
          <AppRoute />
        ) : (
          <AuthRoute />
        )}

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          pauseOnHover={false}
          transition={Slide}
          theme="light"
        />
      </IconsProvider>
    </ThemeProvider>
  );
}
