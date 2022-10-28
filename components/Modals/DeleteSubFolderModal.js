import React, { useEffect, useState } from "react";
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
    if (
      asPath.startsWith("/upsert/code") ||
      asPath.startsWith("/snips/codes")
    ) {
      setSubF("CodeSubFolders");
    }

    if (
      asPath.startsWith("/upsert/error") ||
      asPath.startsWith("/snips/errors")
    ) {
      setSubF("ErrorSubFolders");
    }

    if (asPath.startsWith("/upsert/setup") || asPath.startsWith("/setups")) {
      setSubF("SetupSubFolders");
    }
  }, [asPath]);

  return (
    <div>
      <Modal isOpen={subOpen} onClose={() => setSubOpen(false)} isCentered>
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
                Denne mappe har en eller flere SNIPS, for at slette skal du
                fjerne alle SNIPS i den!
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
              onClick={() => setSubOpen(false)}
            >
              Annullere
            </Button>
            <Button
              bg="Red"
              color="white"
              _hover={{ bg: "Red", opacity: 0.8 }}
              disabled={folderExcluded}
              onClick={() => {
                handleDelete(subOpen.id);
                setSubOpen(false);
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
