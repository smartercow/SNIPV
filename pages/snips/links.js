import React from "react";
import MyLinksSnippets from "../../components/MySnippets/MyLinksSnippets";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import Head from "next/head";

const Links = () => {
  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>Mine links snippetss - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <SnippetsTypeLinks />
      </div>
      <div>
        <MyLinksSnippets />
      </div>
    </div>
  );
};

export default Links;
