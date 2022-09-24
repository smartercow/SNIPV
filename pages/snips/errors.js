import Head from "next/head";
import React from "react";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import MyErrorSnippets from "../../components/MySnippets/MyErrorSnippets";

const Errors = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-[70vh]">
      {user && (
        <>
          <Head>
            <title>Mine fejl SNIPS - SNIPV</title>
            <meta name="description" content="Created by Peter G" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <>
            <>
              <SnippetsTypeLinks />
            </>

            <div>
              <MyErrorSnippets />
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default Errors;
