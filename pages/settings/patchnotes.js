import Head from "next/head";
import React from "react";
import PatchNotes from "../../components/Settings/PatchNotes";

const PatchnotesSettings = () => {
  return (
    <div className="min-h-[80vh]">
      <Head>
        <title>Opdateringer - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <PatchNotes />
    </div>
  );
};

export default PatchnotesSettings;
