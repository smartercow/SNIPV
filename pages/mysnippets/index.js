import { Button } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import MyCodeSnippets from "../../components/MySnippets/MyCodeSnippets";
import MyErrorSnippets from "../../components/MySnippets/MyErrorSnippets";

const MySnippets = () => {
  return (
    <div>
      <Head>
        <title>Mine snippets - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SnippetsTypeLinks />
      <div>
        <MyCodeSnippets />
      </div>
    </div>
  );
};

export default MySnippets;
