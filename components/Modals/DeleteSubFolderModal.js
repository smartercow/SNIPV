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
import { deleteSubFolderModalState } from "../../atoms/deleteSubFolderModalState";
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
import { subFolderDeleteUpdateState } from "../../atoms/subFolderDeleteUpdateState";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
export default function DeleteSubFolderModal() {
  const [user] = useAuthState(auth);
  const { asPath } = useRouter();

  const [subF, setSubF] = useState("");

  const [subOpen, setSubOpen] = useRecoilState(deleteSubFolderModalState);
  const [deleted, setDeleted] = useRecoilState(subFolderDeleteUpdateState);

  const [thisFolderSnippets, setThisFolderSnippets] = useState();
  const [folderExcluded, setFolderExcluded] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "UsersData1", user?.uid, subF, subOpen.id));
      setDeleted(true);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  const getThisFolderSnippets = async () => {
    try {
      const snippetsColRef = collection(db, "CodeSnippetsData1");
      const snippetsQuery = query(
        snippetsColRef,
        where(new FieldPath("folder", "subFolderId"), "==", subOpen.id)
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
    if (subOpen.id) {
      getThisFolderSnippets();
    }
  }, [subOpen.id]);

  useEffect(() => {
    if (thisFolderSnippets?.length > 0) {
      setFolderExcluded(true);
    } else {
      setFolderExcluded(false);
    }
  }, [thisFolderSnippets]);

  useEffect(() => {
    if (asPath === "/upsert/code") {
      setSubF("CodeSubFolders");
    }

    if (asPath === "/upsert/error") {
      setSubF("ErrorSubFolders");
    }

    if (asPath === "/upsert/setup") {
      setSubF("SetupSubFolders");
    }
  }, [asPath]);

  return (
    <div>
      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={subOpen}
        onClose={() => setSubOpen(false)}
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
              {folderExcluded ? (
                <Text>
                  Denne mappe har en eller flere SNIPS, for at slette skal du
                  fjerne alle SNIPS i den!
                </Text>
              ) : (
                <Text>Er du sikker på, at du vil slette denne mappe?</Text>
              )}
            </Row>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container justify="space-between" alignContent="center">
            <Grid>
              <Button size="sm" light onClick={() => setSubOpen(false)}>
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
                  handleDelete(subOpen.id);
                  setSubOpen(false);
                }}
              >
                Slet
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
