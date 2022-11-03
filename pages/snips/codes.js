import Head from "next/head";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import MySNIPS from "../../components/MySNIPS";
import Tags from "../../components/MySNIPS/Tags";
import { auth } from "../../firebase/clientApp";
const Codes = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="w-full">
      <Head>
        <title>Mine kode SNIPS - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <SnippetsTypeLinks />
      </>

      <div className="flex gap-6">
        <MySNIPS />
        <Tags headTitle={`Kode tags`} />
      </div>
    </div>
  );
};

export default Codes;
