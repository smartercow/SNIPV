import Head from "next/head";
import React from "react";
import StatsSettings from "../../components/Settings/Stats";

const StatsPage = () => {
  return (
    <div>
      <Head>
        <title>Statistikker - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StatsSettings />
    </div>
  );
};

export default StatsPage;
