import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { DeleteMainFolderModalState } from "../../atoms/DeleteMainFolderModalState";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
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
    if (subF && mainOpen.id) {
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
    }
  };

  useEffect(() => {
    if (subF && mainOpen.id) {
      getThisFolderFolders();
    }
  }, [subF, mainOpen.id]);

  useEffect(() => {
    if (thisFolderFolders?.length > 0) {
      setFolderExcluded(true);
    } else {
      setFolderExcluded(false);
    }
  }, [thisFolderFolders]);

  useEffect(() => {
    if (
      asPath.startsWith("/upsert/code") ||
      asPath.startsWith("/snips/codes")
    ) {
      setMainF("CodeMainFolders");
      setSubF("CodeSubFolders");
    }

    if (
      asPath.startsWith("/upsert/error") ||
      asPath.startsWith("/snips/errors")
    ) {
      setMainF("ErrorMainFolders");
      setSubF("ErrorSubFolders");
    }

    if (asPath.startsWith("/upsert/setup") || asPath.startsWith("/setups")) {
      setMainF("SetupMainFolders");
      setSubF("SetupSubFolders");
    }
  }, [asPath]);

  return (
    <div>
      <Modal isOpen={mainOpen} onClose={() => setMainOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text textAlign="center" fontSize={18}>
              Bekræft
            </Text>
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            {folderExcluded ? (
              <Text>
                Denne mappe har en eller flere undermapper, for at slette skal
                du fjerne alle mapper i den!
              </Text>
            ) : (
              <Text>Er du sikker på, at du vil slette denne mappe?</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              variant="ghost"
              mr={3}
              onClick={() => setMainOpen(false)}
            >
              Annullere
            </Button>
            <Button
              bg="Red"
              color="white"
              _hover={{ bg: "Red", opacity: 0.8 }}
              disabled={folderExcluded}
              onClick={() => {
                handleDelete(mainOpen.id);
                setMainOpen(false);
              }}
            >
              Slet
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
