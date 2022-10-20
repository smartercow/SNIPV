import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateCodeSnippet from "../../../components/CreateSnippet/CreateCodeSnippet";
import { auth } from "../../../firebase/clientApp";
import NoUser from "../../../components/NoPage/NoUser";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

const UpsertCode = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <Head>
        <title>Opret kode SNIP - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user ? (
        <div className="mt-5">
          <Box
            boxShadow="lg"
            borderRadius="lg"
            padding={2}
            backgroundColor="#fff"
          >
            <CreateCodeSnippet />
          </Box>
        </div>
      ) : (
        <NoUser />
      )}
    </div>
  );
};

export default UpsertCode;
