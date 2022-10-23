import React from "react";
import { CreateFolderModalState } from "../../atoms/CreateFolderModalAtom";
import { useRecoilState } from "recoil";
import { Modal, Text } from "@nextui-org/react";
import CreateFolder from "../Folders/CreateFolder/CreateFolder";

const CreateFolderModal = () => {
  const [open, setOpen] = useRecoilState(CreateFolderModalState);

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
          {open.view == 0 && <Text>Opret en kode rodmappe</Text>}

          {open.view == 1 && <Text>Opret en kode undermappe</Text>}
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
