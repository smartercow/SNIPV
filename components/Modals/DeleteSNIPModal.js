import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Grid,
} from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { DeleteMainFolderModalState } from "../../atoms/DeleteMainFolderModalState";
import {
  collection,
  deleteDoc,
  doc,
  FieldPath,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/clientApp";
import { updateStateAtom } from "../../atoms/updateStateAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { DeleteSNIPModalState } from "../../atoms/DeleteSNIPModalState";
export default function DeleteSNIPModal() {
  const [col, setCol] = useState("");

  const [delState, setDelState] = useRecoilState(DeleteSNIPModalState);
  const [update, setUpdate] = useRecoilState(updateStateAtom);

  useEffect(() => {
    if (delState?.snip?.snippetType === "code") {
      setCol("CodeSnippetsData1");
    }
    if (delState?.snip?.snippetType === "error") {
      setCol("ErrorSnippetsData1");
    }
    if (delState?.snip?.snippetType === "setup") {
      setCol("SetupsData");
    }
  }, [delState]);

  const handleDelete = async (id) => {
    if (col) {
      try {
        await deleteDoc(doc(db, col, delState.snip.id));
        setDelState(false);
        setUpdate(!update);
      } catch (error) {
        console.log("Fejl i sletning!", error.message);
      }
    }
  };

  return (
    <div>
      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={delState}
        onClose={() => setDelState(false)}
      >
        <Modal.Header>
          <Text>Bekræft</Text>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container
            css={{
              borderRadius: "14px",
              padding: "0.75rem",
              maxWidth: "330px",
            }}
          >
            <Row css={{ py: ".5rem" }}>
              <Text>
                Er du sikker på, at du vil slette denne SNIP? Ved at gøre dette,
                vil du ikke være i stand til at gendanne indhold.
              </Text>
            </Row>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container justify="space-between" alignContent="center">
            <Grid>
              <Button size="sm" light onClick={() => setDelState(false)}>
                Annullere
              </Button>
            </Grid>
            <Grid>
              <Button size="sm" shadow color="error" onClick={handleDelete}>
                Slet
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
