import React from "react";
import { createCodeFolderModalState } from "../../atoms/createCodeFolderModalAtom";
import { useRecoilState } from "recoil";
import { Button, Input, Modal, Text } from "@nextui-org/react";
import CreateFolder from "../CreateSnippet/CreateCodeSnippet/Folders/CreateFolder";

const CreateCodeFolderModal = () => {
  const [open, setOpen] = useRecoilState(createCodeFolderModalState);

  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Modal.Header>
          <Text b size={18}>
            Opret en KODE mappe
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div>
            <CreateFolder />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateCodeFolderModal;
