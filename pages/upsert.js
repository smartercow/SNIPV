import { Button, Card, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateCodeSnippet from "../components/CreateSnippet/CreateCodeSnippet";
import CreateErrorSnippet from "../components/CreateSnippet/CreateErrorSnippet";
import { auth } from "../Firebase/clientApp";
import NoUser from "../components/NoPage/NoUser";

const SnippetType = [
  {
    type: "code",
    title: "kode",
    component: CreateCodeSnippet,
  },
  {
    type: "error",
    title: "fejl",
    component: CreateErrorSnippet,
  },
  /*   {
    name: "link",
    title: "link",
    component: CreateLinkSnippet
  },
  {
    name: "scooters",
    title: "Scooters",
    component: CreateNoteSnippet
  } */
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
    <div>
      {user ? (
        <div>
          <div>
            <Button.Group color="secondary" size="sm">
              {SnippetType.map(({ type, title }) => (
                <Button
                  css={{ textTransform: "capitalize" }}
                  key={type}
                  onClick={() => setSelectedType(type) | setSelectedTypeTranslate(title)}
                >
                  {title}
                </Button>
              ))}
              <Button disabled>Link</Button>
              <Button disabled>Noter</Button>
            </Button.Group>
          </div>
          <div className="mt-3">
            <Card>
              <Card.Header>
                <Text b>Opret en {selectedTypeTranslate} snippet</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body>{renderType(selectedType)}</Card.Body>
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
