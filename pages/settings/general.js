import Head from "next/head";
import React from "react";
import General from "../../components/Settings/General";

const GeneralSettings = () => {
  return (
    <div>
      <Head>
        <title>Generelle indstillinger - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <General />
    </div>
  );
};

export default GeneralSettings;
