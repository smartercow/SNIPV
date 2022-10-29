import { Divider, Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import General from "../../components/Settings/General";

const GeneralSettings = () => {
  return (
    <div className="">
      <Head>
        <title>Generelle indstillinger - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div>
          <Text fontSize={18} textTransform="uppercase">
            Generel
          </Text>
        </div>
        <Divider />

        <General />
      </div>
    </div>
  );
};

export default GeneralSettings;
