import React from "react";
import { CreateFolderModalState } from "../../atoms/CreateFolderModalAtom";
import { useRecoilState } from "recoil";
import CreateFolder from "../Folders/CreateFolder";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const CreateFolderModal = () => {
  const [open, setOpen] = useRecoilState(CreateFolderModalState);

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          {open.view == 0 && (
            <Text variant="maxLabel">Opret en kode rodmappe</Text>
          )}
          {open.view == 1 && (
            <Text variant="maxLabel">Opret en kode undermappe</Text>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateFolder />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateFolderModal;
