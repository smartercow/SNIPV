import { Divider, Text } from "@chakra-ui/react";
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
          <Text fontSize={18} textTransform="uppercase">
            Generel
          </Text>
        </div>
        <Divider />

        <Settings />
      </div>
    </div>
  );
};

export default SettingsPage;
