import React from "react";
import { CreateFolderModalState } from "../../atoms/CreateFolderModalAtom";
import { useRecoilState } from "recoil";
import CreateFolder from "../Folders/CreateFolder/CreateFolder";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const CreateFolderModal = () => {
  const [open, setOpen] = useRecoilState(CreateFolderModalState);

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} isCentered>
      {/* width="500px" */}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {open.view == 0 && <Text>Opret en kode rodmappe</Text>}
          {open.view == 1 && <Text>Opret en kode undermappe</Text>}
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <CreateFolder />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateFolderModal;
