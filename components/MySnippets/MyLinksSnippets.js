import { Card, Text } from "@nextui-org/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import NoUser from "../NoPage/NoUser";

const MyLinksSnippets = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <Card>
          <Card.Body>
            <Text b>Du har ingen links snippets endnu!</Text>
          </Card.Body>
        </Card>
      ) : (
        <NoUser />
      )}
    </div>
  );
};

export default MyLinksSnippets;
