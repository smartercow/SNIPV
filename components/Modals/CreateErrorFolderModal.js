import React from "react";
import { createErrorFolderModalState } from "../../atoms/createErrorFolderModalAtom";
import { useRecoilState } from "recoil";
import { Modal, Text } from "@nextui-org/react";
import CreateFolder from "../CreateSnippet/CreateErrorSnippet/Folders/CreateFolder";

const CreateFolderModal = () => {
  const [open, setOpen] = useRecoilState(createErrorFolderModalState);

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
            Opret en mappe
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

export default CreateFolderModal;
