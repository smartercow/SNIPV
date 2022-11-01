import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateErrorSnippet from "../../../components/CreateSnippet/CreateErrorSnippet";
import { auth } from "../../../firebase/clientApp";
import NoUser from "../../../components/NoPage/NoUser";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Text } from "@chakra-ui/react";
import LoadingSNIPS from "../../../components/LoadingState/LoadingSNIPS";

const UpsertId = () => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState(false);

  const {
    query: { id },
  } = useRouter();

  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>Opdatere fejl SNIP - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && (
        <div className="mt-5">
          <Box
            boxShadow="lg"
            borderRadius="lg"
            padding={2}
            backgroundColor="#fff"
          >
            <CreateErrorSnippet
              id={id}
              setLoading={setLoading}
              setDataError={setDataError}
            />
          </Box>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-[20vh]">
          <LoadingSNIPS size={10} />
        </div>
      )}

      {dataError && (
        <div className="flex justify-center items-center h-[20vh]">
          <Text>Ingen SNIP med angivet id!</Text>
        </div>
      )}

      {!user && <NoUser />}
    </div>
  );
};

export default UpsertId;
