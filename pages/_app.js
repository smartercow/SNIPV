import "../styles/globals.css";
import "../styles/font-styles.css";
import "../styles/styles.css";
import "../styles/prismjs.scss";
import "../styles/parse.scss";
import "../styles/language/index.scss";
import "react-quill/dist/quill.snow.css";
import "@fontsource/inter/variable.css";
import "@fontsource/anek-malayalam/100.css";
import "@fontsource/anek-malayalam/200.css";
import "@fontsource/anek-malayalam/300.css";
import "@fontsource/anek-malayalam/400.css";
import "@fontsource/anek-malayalam/500.css";
import "@fontsource/anek-malayalam/600.css";
import "@fontsource/anek-malayalam/700.css";
import "@fontsource/anek-malayalam/800.css";
import "@fontsource/source-code-pro/200.css";
import "@fontsource/source-code-pro/300.css";
import "@fontsource/source-code-pro/400.css";
import "@fontsource/source-code-pro/500.css";
import "@fontsource/source-code-pro/600.css";
import "@fontsource/source-code-pro/700.css";
import "@fontsource/source-code-pro/800.css";
import "@fontsource/source-code-pro/900.css";
import "@fontsource/inter/100.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
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
          <ToastContainer position="top-center" className="z-[999999]" />
          <ClientLayout user={user}>
            <SettingsLayout>
              <Component {...pageProps} />
            </SettingsLayout>
          </ClientLayout>
        </ChakraProvider>
      </RecoilRoot>
    );
  }

  if (router.pathname.startsWith("/info")) {
    return (
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <ToastContainer position="top-center" className="z-[999999]" />
          <ClientLayout user={user}>
            <InfoLayout>
              <Component {...pageProps} />
            </InfoLayout>
          </ClientLayout>
        </ChakraProvider>
      </RecoilRoot>
    );
  }

  if (router.pathname.startsWith("/upsert")) {
    return (
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <ToastContainer position="top-center" className="z-[999999]" />
          <ClientLayout user={user}>
            <UpsertLayout>
              <Component {...pageProps} />
            </UpsertLayout>
          </ClientLayout>
        </ChakraProvider>
      </RecoilRoot>
    );
  }
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <ToastContainer position="top-center" className="z-[999999]" />
        <ClientLayout user={user}>
          <Component {...pageProps} />
        </ClientLayout>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
