import Head from "next/head";
import React from "react";
import About from "../components/SnipvInfo/About";

const about = () => {
  return (
    <div className="min-h-[80vh]">
      <Head>
        <title>Om SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <About />
    </div>
  );
};

export default about;
