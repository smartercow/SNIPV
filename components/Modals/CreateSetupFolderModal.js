import React from "react";
import { createSetupFolderModalState } from "../../atoms/createSetupFolderModalAtom";
import { useRecoilState } from "recoil";
import { Modal, Text } from "@nextui-org/react";
import CreateFolder from "../CreateSnippet/CreateSetup/Folders/CreateFolder";

const CreateSetupFolderModal = () => {
  const [open, setOpen] = useRecoilState(createSetupFolderModalState);

  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={open}
        onClose={() => setOpen(false)}
        width="500px"
      >
        <Modal.Header>
          {open.view == 0 && (
            <Text b size={16} transform="uppercase">
              Opret en kode rodmappe
            </Text>
          )}

          {open.view == 1 && (
            <Text b size={16} transform="uppercase">
              Opret en kode undermappe
            </Text>
          )}
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

export default CreateSetupFolderModal;
