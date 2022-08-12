import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import ClientLayout from "../layout/ClientLayout";
function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <ClientLayout>
        <Component {...pageProps} />
      </ClientLayout>
    </NextUIProvider>

  );
}

export default MyApp;
