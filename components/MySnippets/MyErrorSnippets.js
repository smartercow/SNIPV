import React from "react";
import { Card, Text } from "@nextui-org/react";
import NoUser from "../NoPage/NoUser";
import { auth } from "../../Firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const MyErrorSnippets = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <Card>
          <Card.Body>
            <Text b>Du har ingen fejl snippets endnu!</Text>
          </Card.Body>
        </Card>
      ) : (
        <NoUser />
      )}
    </div>
  );
};

export default MyErrorSnippets;
