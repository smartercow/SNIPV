import Head from "next/head";
import React from "react";
import Settings from "../../components/Settings";

const SettingsPage = () => {
  return (
    <div>
      <Head>
        <title>Indstillinger - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Settings />
    </div>
  );
};

export default SettingsPage;
