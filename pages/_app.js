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
function MyApp({ Component, pageProps }) {
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
