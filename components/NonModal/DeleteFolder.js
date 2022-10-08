import React, { useEffect, useState } from "react";
import { Text, Button, Grid, Row } from "@nextui-org/react";
import { collection, FieldPath, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

export const DeleteFolder = ({ id, handleDelete, setAllOpenStates }) => {
  const [thisFolderSnippets, setThisFolderSnippets] = useState();
  const [folderExcluded, setFolderExcluded] = useState(false);
  const getThisFolderSnippets = async () => {
    try {
      const snippetsColRef = collection(db, "CodeSnippetsData1");
      const snippetsQuery = query(
        snippetsColRef,
        where(new FieldPath("folder", "subFolderId"), "==", id)
      );

      onSnapshot(snippetsQuery, (snapshot) => {
        let snippets = [];
        snapshot.docs.forEach((doc) => {
          snippets.push({ ...doc.data(), id: doc.id });
        });
        setThisFolderSnippets(snippets);
      });
    } catch (error) {
      console.log("getsnippet error", error.message);
    }
  };

  useEffect(() => {
    if (id) {
      getThisFolderSnippets();
    }
  }, [id]);

  useEffect(() => {
    if(thisFolderSnippets?.length > 0) {
      setFolderExcluded(true)
    }
  }, [thisFolderSnippets]);

  return (
    <Grid.Container
      css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}
    >
      <Row justify="center" align="center">
        <Text b>Bekræft</Text>
      </Row>
      <Row css={{ py: ".5rem" }}>
        {folderExcluded ? (
          <Text>
            Denne mappe har en eller flere SNIPS. For at slette skal du fjerne
            alle SNIPS i den.
          </Text>
        ) : (
          <Text>Er du sikker på, at du vil slette denne mappe?</Text>
        )}
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
          <Button
            size="sm"
            shadow
            color="error"
            disabled={folderExcluded}
            onClick={() => {
              handleDelete(id);
              setAllOpenStates((oldState) => ({ ...oldState, [id]: false }));
            }}
          >
            Slet
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};
