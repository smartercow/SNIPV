import React, { useEffect, useState } from "react";
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
export default function DeleteSNIPModal() {
  const [col, setCol] = useState("");
  const [typey, setTypey] = useState("");

  const [delState, setDelState] = useRecoilState(DeleteSNIPModalState);
  const [update, setUpdate] = useRecoilState(updateStateAtom);

  useEffect(() => {
    if (delState?.snip?.snippetType === "code") {
      setCol("CodeSnippetsData1");
      setTypey("kode SNIP");
    }
    if (delState?.snip?.snippetType === "error") {
      setCol("ErrorSnippetsData1");
      setTypey("fejl SNIP");
    }
    if (delState?.snip?.snippetType === "setup") {
      setCol("SetupsData");
      setTypey("Setup");
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
      <Modal isOpen={delState} onClose={() => setDelState(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text textAlign="center" fontSize={18}>
              Bekræft
            </Text>
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Text
              textAlign="center"
              fontSize={15}
              fontWeight={400}
              variant="snipNameDeleteModal"
              bg="iGray"
              mb={1}
              px={2}
            >
              {delState?.snip?.title}
            </Text>
            <Text>
              Er du sikker på, at du vil slette denne {typey}? Ved at gøre
              dette, vil du ikke være i stand til at gendanne indhold.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              variant="ghost"
              mr={3}
              onClick={() => setDelState(false)}
            >
              Annullere
            </Button>
            <Button
              bg="Red"
              color="white"
              _hover={{ bg: "Red", opacity: 0.8 }}
              onClick={handleDelete}
            >
              Slet
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
