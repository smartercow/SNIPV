import "../styles/globals.css";
import "../styles/font-styles.css";
import "../styles/styles.css";
import "../styles/LangStyles/lang-styles.css";
import "../styles/LangStyles/framework-styles.css";
import "../styles/LangStyles/processor-styles.css";
import { NextUIProvider } from "@nextui-org/react";
import ClientLayout from "../layout/ClientLayout";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import SettingsLayout from "../layout/SettingsLayout";
import InfoLayout from "../layout/InfoLayout";
import UpsertLayout from "../layout/UpsertLayout";
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname.startsWith("/settings")) {
    return (
      <RecoilRoot>
        <NextUIProvider>
          <ToastContainer position="top-center" className="z-[999999]" />
          <ClientLayout>
            <SettingsLayout>
              <Component {...pageProps} />
            </SettingsLayout>
          </ClientLayout>
        </NextUIProvider>
      </RecoilRoot>
    );
  }

  if (router.pathname.startsWith("/info")) {
    return (
      <RecoilRoot>
        <NextUIProvider>
          <ToastContainer position="top-center" className="z-[999999]" />
          <ClientLayout>
            <InfoLayout>
              <Component {...pageProps} />
            </InfoLayout>
          </ClientLayout>
        </NextUIProvider>
      </RecoilRoot>
    );
  }

  if (router.pathname.startsWith("/upsert")) {
    return (
      <RecoilRoot>
        <NextUIProvider>
          <ToastContainer position="top-center" className="z-[999999]" />
          <ClientLayout>
            <UpsertLayout>
              <Component {...pageProps} />
            </UpsertLayout>
          </ClientLayout>
        </NextUIProvider>
      </RecoilRoot>
    );
  }
  return (
    <RecoilRoot>
      <NextUIProvider>
        <ToastContainer position="top-center" className="z-[999999]" />
        <ClientLayout>
          <Component {...pageProps} />
        </ClientLayout>
      </NextUIProvider>
    </RecoilRoot>
  );
}

export default MyApp;
