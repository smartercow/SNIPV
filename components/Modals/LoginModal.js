import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import Auth from "../Auth";
import { useRecoilState } from "recoil";
import { loginModalState } from "../../atoms/loginModalStateAtom";

export default function App() {
  const [open, setOpen] = useRecoilState(loginModalState);

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={open}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Velkommen til
            <Text b size={18}>
              SNIPV
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Auth />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Luk
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
