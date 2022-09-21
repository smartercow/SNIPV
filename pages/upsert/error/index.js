import { Button, Card, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateCodeSnippet from "../../../components/CreateSnippet/CreateCodeSnippet";
import CreateErrorSnippet from "../../../components/CreateSnippet/CreateErrorSnippet";
import { auth } from "../../../firebase/clientApp";
import NoUser from "../../../components/NoPage/NoUser";
import Head from "next/head";

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

const Upsert = () => {
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
    <div className="min-h-[70vh]">
      <Head>
        <title>Opret fejl SNIP - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user ? (
        <div>
          <div className="mt-3">
            <Card>
              <Card.Header>
                <Text b transform="uppercase">
                  Opret en fejl SNIP
                </Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body>
                <CreateErrorSnippet />
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : (
        <NoUser />
      )}
    </div>
  );
};

export default Upsert;
