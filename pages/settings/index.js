import { Text } from "@nextui-org/react";
import Head from "next/head";
import React from "react";
import Settings from "../../components/Settings";

const SettingsPage = () => {
  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>Indstillinger - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div>
          <Text h4>Generel</Text>
        </div>
        <hr />

        <div>
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
