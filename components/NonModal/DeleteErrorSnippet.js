import React from "react";
import { Text, Button, Grid, Row } from "@nextui-org/react";

export const DeleteErrorSnippet = ({ snip, handleDelete, setAllOpenStates, index }) => {
  return (
    <Grid.Container
      css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}
    >
      <Row justify="center" align="center">
        <Text b>Bekræft</Text>
      </Row>
      <Row css={{ py: ".5rem" }}>
        <Text>
          Er du sikker på, at du vil slette denne fejl snippet? Ved at gøre dette,
          vil du ikke være i stand til at gendanne indhold.
        </Text>
      </Row>
      <Grid.Container justify="space-between" alignContent="center">
        <Grid>
          <Button size="sm" light onClick={() => setAllOpenStates(oldState => ({...oldState, [index]: false}))}>
            Annullere
          </Button>
        </Grid>
        <Grid>
          <Button
            size="sm"
            shadow
            color="error"
            onClick={() => {
              handleDelete(snip.id);
              setAllOpenStates(oldState => ({...oldState, [index]: false}))
            }}
          >
            Slet
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};
