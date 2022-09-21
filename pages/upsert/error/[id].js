import { Button, Card, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateCodeSnippet from "../../../components/CreateSnippet/CreateCodeSnippet";
import CreateErrorSnippet from "../../../components/CreateSnippet/CreateErrorSnippet";
import { auth } from "../../../firebase/clientApp";
import NoUser from "../../../components/NoPage/NoUser";
import Head from "next/head";
import { useRouter } from "next/router";

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

const UpsertId = () => {
  const [user] = useAuthState(auth);

  const {
    query: { id },
  } = useRouter();

  const [selectedType, setSelectedType] = useState("code");
  const [selectedTypeTranslate, setSelectedTypeTranslate] = useState("kode");

  const renderType = (type) => {
    switch (type) {
      case "code":
        return <CreateCodeSnippet id={id} />;
      case "error":
        return <CreateErrorSnippet id={id} />;
      default:
        return <CreateCodeSnippet id={id} />;
    }
  };

  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>Opdatere fejl SNIP - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user ? (
        <div>
          <div>
            <Button.Group color="primary" size="sm">
              {SnippetType.map(({ type, title }) => (
                <Button
                  css={{ textTransform: "capitalize" }}
                  key={type}
                  onClick={() =>
                    setSelectedType(type) | setSelectedTypeTranslate(title)
                  }
                >
                  {title}
                </Button>
              ))}
            </Button.Group>
          </div>
          <div className="mt-3">
            <Card>
              <Card.Header>
                <Text b transform="uppercase">
                  Opdatere en fejl SNIP
                </Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body>
                <CreateErrorSnippet id={id} />
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

export default UpsertId;
