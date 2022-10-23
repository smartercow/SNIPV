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
import { mainFolderDeleteUpdateState } from "../../atoms/mainFolderDeleteUpdateState";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
export default function DeleteMainFolderModal() {
  const [user] = useAuthState(auth);
  const { asPath } = useRouter();

  const [mainF, setMainF] = useState("");
  const [subF, setSubF] = useState("");

  const [mainOpen, setMainOpen] = useRecoilState(DeleteMainFolderModalState);
  const [mainDeleted, setMainDeleted] = useRecoilState(
    mainFolderDeleteUpdateState
  );

  const [thisFolderFolders, setThisFolderFolders] = useState();
  const [folderExcluded, setFolderExcluded] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "UsersData1", user?.uid, mainF, mainOpen.id));
      setMainDeleted(true);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  const getThisFolderFolders = async () => {
    try {
      const foldersColRef = collection(db, "UsersData1", user?.uid, subF);
      const foldersQuery = query(
        foldersColRef,
        where(new FieldPath("mainFolder", "mainFolderId"), "==", mainOpen.id)
      );

      onSnapshot(foldersQuery, (snapshot) => {
        let folders = [];
        snapshot.docs.forEach((doc) => {
          folders.push({ ...doc.data(), id: doc.id });
        });
        setThisFolderFolders(folders);
      });
    } catch (error) {
      console.log("getThisFolderFolders error!", error.message);
    }
  };

  useEffect(() => {
    if (mainOpen.id) {
      getThisFolderFolders();
    }
  }, [mainOpen.id]);

  useEffect(() => {
    if (thisFolderFolders?.length > 0) {
      setFolderExcluded(true);
    } else {
      setFolderExcluded(false);
    }
  }, [thisFolderFolders]);

  useEffect(() => {
    if (asPath === "/upsert/code") {
      setMainF("CodeMainFolders");
      setSubF("CodeSubFolders");
    }

    if (asPath === "/upsert/error") {
      setMainF("ErrorMainFolders");
      setSubF("ErrorSubFolders");
    }

    if (asPath === "/upsert/setup") {
      setMainF("SetupMainFolders");
      setSubF("SetupSubFolders");
    }
  }, [asPath]);

  return (
    <div>
      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={mainOpen}
        onClose={() => setMainOpen(false)}
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
                  Denne mappe har en eller flere undermapper, for at slette skal
                  du fjerne alle mapper i den!
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
              <Button size="sm" light onClick={() => setMainOpen(false)}>
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
                  handleDelete(mainOpen.id);
                  setMainOpen(false);
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
