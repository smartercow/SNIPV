import Head from "next/head";
import React from "react";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import MyErrorSnippets from "../../components/MySnippets/MyErrorSnippets";

const Errors = () => {
  return (
    <div className="min-h-[80vh]">
      <Head>
        <title>Mine fejl snippets - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <SnippetsTypeLinks />
      </div>
      <div>
        <MyErrorSnippets />
      </div>
    </div>
  );
};

export default Errors;
