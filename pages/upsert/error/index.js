import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateCodeSnippet from "../../../components/CreateSnippet/CreateCodeSnippet";
import CreateErrorSnippet from "../../../components/CreateSnippet/CreateErrorSnippet";
import { auth } from "../../../firebase/clientApp";
import NoUser from "../../../components/NoPage/NoUser";
import Head from "next/head";
import { Box, Text } from "@chakra-ui/react";

const SnippetType = [
  {
    type: "code",
    title: "KODE",
    component: CreateCodeSnippet,
  },
  {
    type: "error",
    title: "FEJL",
    component: CreateErrorSnippet,
  },
];

const UpsertError = () => {
  const [user] = useAuthState(auth);

  const [selectedType, setSelectedType] = useState("code");
  const [selectedTypeTranslate, setSelectedTypeTranslate] = useState("kode");

  const renderType = (type) => {
    switch (type) {
      case "code":
        return <CreateCodeSnippet />;
      case "error":
        return <CreateErrorSnippet />;
      default:
        return <CreateCodeSnippet />;
    }
  };

  return (
    <div>
      <Head>
        <title>Opret fejl SNIP - SNIPV</title>
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
            <CreateErrorSnippet />
          </Box>
        </div>
      ) : (
        <NoUser />
      )}
    </div>
  );
};

export default UpsertError;
