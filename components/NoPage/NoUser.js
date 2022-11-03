import { Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

const NoUser = () => {
  return (
    <div>
      <Head>
        <title>SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center items-center min-h-[70vh]">
        <Text>Log ind for at gemme eller se indhold</Text>
      </div>
    </div>
  );
};

export default NoUser;
