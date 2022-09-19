import { Text } from "@nextui-org/react";
import Head from "next/head";
import React from "react";
import About from "../../components/Info/About";

const AboutPage = () => {
  return (
    <div className="min-h-[70vh] w-full">
      <Head>
        <title>Om SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full">
        <div>
          <Text h4>Om SNIPV</Text>
        </div>
        <hr className="w-full my-3" />

        <div>
          <About />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
