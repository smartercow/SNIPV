import React from "react";
import { createFolderModalState } from "../../atoms/createFolderModalAtom";
import { useRecoilState } from "recoil";
import { Button, Dropdown, Input, Modal, Text } from "@nextui-org/react";
import CreateFolder from "../CreateSnippet/CreateFolder";

const CreateFolderModal = () => {
  const [open, setOpen] = useRecoilState(createFolderModalState);

  const [selected, setSelected] = React.useState(new Set(["react"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

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
{/*         <Modal.Footer>
          <Button auto flat color="error" onClick={() => setOpen(false)}>
            Luk
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default CreateFolderModal;
