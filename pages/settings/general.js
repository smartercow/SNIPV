import Head from "next/head";
import React from "react";
import General from "../../components/Settings/General";

const GeneralSettings = () => {
  return (
    <div className="min-h-[80vh]">
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
