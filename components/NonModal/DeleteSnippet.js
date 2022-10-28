import React, { useEffect, useState } from "react";
import { Text, Button, Grid, Row } from "@nextui-org/react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

export const DeleteSnippet = ({
  id,
  snippet,
  update,
  setUpdate,
  setAllOpenStates,
}) => {
  const [delCol, setDelCol] = useState("");
  useEffect(() => {
    if (snippet.snippetType === "code") {
      setDelCol("CodeSnippetsData1");
    }
    if (snippet.snippetType === "error") {
      setDelCol("ErrorSnippetsData1");
    }
    if (snippet.snippetType === "setup") {
      setDelCol("SetupsData");
    }
  }, [snippet]);

  const handleDelete = async () => {
    if (delCol) {
      try {
        await deleteDoc(doc(db, delCol, snippet.id));
        setUpdate(!update);
      } catch (error) {
        console.log("Fejl i sletning!", error.message);
      }
    }
  };

  console.log("delCol", delCol);
  console.log("snippet.snippetType", snippet.snippetType);
  return (
    <Grid.Container
      css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}
    >
      <Row justify="center" align="center">
        <Text>Bekræft</Text>
      </Row>
      <Row css={{ py: ".5rem" }}>
        <Text>
          Er du sikker på, at du vil slette denne SNIP? Ved at gøre dette, vil
          du ikke være i stand til at gendanne indhold.
        </Text>
      </Row>
      <Grid.Container justify="space-between" alignContent="center">
        <Grid>
          <Button
            size="sm"
            light
            onClick={() =>
              setAllOpenStates((oldState) => ({ ...oldState, [id]: false }))
            }
          >
            Annullere
          </Button>
        </Grid>
        <Grid>
          <Button size="sm" shadow color="error" onClick={handleDelete}>
            Slet
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};
