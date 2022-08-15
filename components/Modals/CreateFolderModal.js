import React from "react";
import { createFolderModalState } from "../../atoms/createFolderModalAtom";
import { useRecoilState } from "recoil";
import { Button, Dropdown, Input, Modal, Text } from "@nextui-org/react";

const CreateFolderModal = () => {
  const [open, setOpen] = useRecoilState(createFolderModalState);

  const [selected, setSelected] = React.useState(new Set(["react"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  console.log(selected);
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
            Create a folder
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Input
              clearable
              underlined
              label="Name"
              initialValue="React.js"
              size="lg"
              width="100%" 
            />
          </div>
          <div>
            <Dropdown>
              <Dropdown.Button
                flat
                color="secondary"
                css={{ tt: "capitalize" }}
              >
                {selectedValue}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                color="secondary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setSelected}
              >
                <Dropdown.Item key="text">Text</Dropdown.Item>
                <Dropdown.Item key="number">Number</Dropdown.Item>
                <Dropdown.Item key="date">Date</Dropdown.Item>
                <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
                <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button auto onClick={() => setOpen(false)}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateFolderModal;
