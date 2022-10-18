import { Card, Text } from "@nextui-org/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateCodeSnippet from "../../../components/CreateSnippet/CreateCodeSnippet";
import { auth } from "../../../firebase/clientApp";
import NoUser from "../../../components/NoPage/NoUser";
import Head from "next/head";

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
        <div>
          <div className="mt-3">
            <Card>
              <Card.Body>
                <div className="h-full">
                  <CreateCodeSnippet />
                </div>
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

export default UpsertCode;
