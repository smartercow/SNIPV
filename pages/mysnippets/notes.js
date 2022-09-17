import React from "react";
import MyNotesSnippets from "../../components/MySnippets/MyNotesSnippets";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import Head from "next/head";

const Notes = () => {
  return (
    <div className="min-h-[80vh]">
      <Head>
        <title>Mine noter snippets - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <SnippetsTypeLinks />
      </div>
      <div>
        <MyNotesSnippets />
      </div>
    </div>
  );
};

export default Notes;
