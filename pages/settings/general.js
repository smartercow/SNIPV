import { Text } from "@nextui-org/react";
import Head from "next/head";
import React from "react";
import General from "../../components/Settings/General";

const GeneralSettings = () => {
  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>Generelle indstillinger - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div>
          <Text h4>Generel</Text>
        </div>
        <hr />

        <div>
          <General />
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
