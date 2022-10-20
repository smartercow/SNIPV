import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateSetup from "../../../components/CreateSnippet/CreateSetup";
import NoUser from "../../../components/NoPage/NoUser";
import { auth } from "../../../firebase/clientApp";

const UpsertSetup = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <Head>
        <title>Opret fejl Setup - SNIPV</title>
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
            <CreateSetup />
          </Box>
        </div>
      ) : (
        <NoUser />
      )}
    </div>
  );
};

export default UpsertSetup;
