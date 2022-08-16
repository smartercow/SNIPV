import { Button, Card, Text } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateSnippet from "../components/CreateSnippet";
import { auth } from "../Firebase/clientApp";
import { useRouter } from "next/router";

const Upsert = () => {

  const [user] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    if(!user) {
      router.push("/")
    }
  })
  

  return (
    <div>
      <div>
        <Button.Group color="secondary" size="sm">
          <Button>Kode</Button>
          <Button disabled>Fejl</Button>
        </Button.Group>
      </div>
      <div className="mt-3">
        <Card>
          <Card.Header>
            <Text b>Opret en kode snippet</Text>
          </Card.Header>
          <Card.Body>
            <CreateSnippet />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Upsert;
