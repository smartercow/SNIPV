import Head from "next/head";
import React from "react";
import About from "../../components/Info/About";

const InfoPage = () => {
  return (
    <div className="min-h-[70vh] w-full">
      <Head>
        <title>Om SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full">
        <About />
      </div>
    </div>
  );
};

export default InfoPage;
