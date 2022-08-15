import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import ClientLayout from "../layout/ClientLayout";
import { RecoilRoot } from "recoil"
function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <NextUIProvider>
        <ClientLayout>
          <Component {...pageProps} />
        </ClientLayout>
      </NextUIProvider>
    </RecoilRoot>
  );
}

export default MyApp;
