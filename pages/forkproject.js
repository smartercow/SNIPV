import Head from "next/head";
import React from "react";
import ForkProject from "../components/SnipvInfo/ForkProject";

const about = () => {
  return (
    <div>
      <Head>
        <title>Fork SNIPV projekt</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ForkProject />
    </div>
  );
};

export default about;
