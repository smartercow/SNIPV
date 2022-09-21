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

  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>Opdatere fejl SNIP - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user ? (
        <div>
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
