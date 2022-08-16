import React, { useEffect } from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import Auth from "../Auth";
import { useRecoilState } from "recoil";
import { Login } from "../../atoms/loginModalStateAtom";
import { auth } from "../../Firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

export default function LoginModal() {
  const [open, setOpen] = useRecoilState(Login);

  const [user] = useAuthState(auth);

  const closeHandler = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!user) return;
    const closeOnLogin = () => {
        setOpen(false);
    }
    closeOnLogin()
    console.log("WorkingLogin");
  }, [user]);
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
