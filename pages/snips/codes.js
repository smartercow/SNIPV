import Head from "next/head";
import React from "react";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import MyCodeSnippets from "../../components/MySnippets/MyCodeSnippets";
const Codes = () => {
  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>Mine kode snippets - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <SnippetsTypeLinks />
      </div>
      <div>
        <MyCodeSnippets />
      </div>
    </div>
  );
};

export default Codes;
