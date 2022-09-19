import Head from "next/head";
import React from "react";
import ForkProject from "../../components/Info/ForkProject";

const about = () => {
  return (
    <div className="min-h-[70vh] w-full">
      <Head>
        <title>Fork SNIPV projekt - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full">
        <ForkProject />
      </div>
    </div>
  );
};

export default about;
