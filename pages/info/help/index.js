import { Divider, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const HelpPage = () => {
  return (
    <div className="min-h-[70vh] w-full">
      <Head>
        <title>Fork SNIPV projekt</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full">
        <div>
          <Text fontSize={18} fontWeight="semibold" textTransform="uppercase">
            Hjælp
          </Text>
        </div>
        <Divider my={2} />
        <div>
          <Link href="/help/tags">
            <Text className="cursor-pointer underline">
              Hvordan man skriver søgbare tags
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
