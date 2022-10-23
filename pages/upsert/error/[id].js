import { Button, Card, Loading, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateCodeSnippet from "../../../components/CreateSnippet/CreateCodeSnippet";
import CreateErrorSnippet from "../../../components/CreateSnippet/CreateErrorSnippet";
import { auth } from "../../../firebase/clientApp";
import NoUser from "../../../components/NoPage/NoUser";
import Head from "next/head";
import { useRouter } from "next/router";

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
        <div>
          <div className="mt-3">
            <Card>
              <Card.Header>
                <Text>Opdatere en fejl SNIP</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body>
                <CreateErrorSnippet
                  id={id}
                  setLoading={setLoading}
                  setDataError={setDataError}
                />
              </Card.Body>
            </Card>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-[20vh]">
          <Loading size="lg" />
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
