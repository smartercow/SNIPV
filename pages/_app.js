import "../styles/globals.css";
import "../styles/font-styles.css";
import "../styles/styles.css";
import "../styles/prismjs.scss";
import "../styles/language/index.scss";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import { NextUIProvider } from "@nextui-org/react";
import ClientLayout from "../layout/ClientLayout";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import SettingsLayout from "../layout/SettingsLayout";
import InfoLayout from "../layout/InfoLayout";
import UpsertLayout from "../layout/UpsertLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra/theme";

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);

  const router = useRouter();

  if (router.pathname.startsWith("/settings")) {
    return (
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <NextUIProvider>
            <ToastContainer position="top-center" className="z-[999999]" />
            <ClientLayout user={user}>
              <SettingsLayout>
                <Component {...pageProps} />
              </SettingsLayout>
            </ClientLayout>
          </NextUIProvider>
        </ChakraProvider>
      </RecoilRoot>
    );
  }

  if (router.pathname.startsWith("/info")) {
    return (
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <NextUIProvider>
            <ToastContainer position="top-center" className="z-[999999]" />
            <ClientLayout user={user}>
              <InfoLayout>
                <Component {...pageProps} />
              </InfoLayout>
            </ClientLayout>
          </NextUIProvider>
        </ChakraProvider>
      </RecoilRoot>
    );
  }

  if (router.pathname.startsWith("/upsert")) {
    return (
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <NextUIProvider>
            <ToastContainer position="top-center" className="z-[999999]" />
            <ClientLayout user={user}>
              <UpsertLayout>
                <Component {...pageProps} />
              </UpsertLayout>
            </ClientLayout>
          </NextUIProvider>
        </ChakraProvider>
      </RecoilRoot>
    );
  }
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <NextUIProvider>
          <ToastContainer position="top-center" className="z-[999999]" />
          <ClientLayout user={user}>
            <Component {...pageProps} />
          </ClientLayout>
        </NextUIProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
