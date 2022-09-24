import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import MyCodeSnippets from "../../components/MySnippets/MyCodeSnippets";
import { auth } from "../../firebase/clientApp";
const Codes = () => {

  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>Mine kode SNIPS - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <SnippetsTypeLinks />
      </>

      <div>
        <MyCodeSnippets />
      </div>
    </div>
  );
};

export default Codes;
