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
    };
    closeOnLogin();
  }, [user]);

  return (
    <div>
      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={open}
        onClose={closeHandler}
        width="360px"
      >
        <Modal.Header>
          <div className="flex">
            <Text id="modal-title" size={18}>
              Log ind til&nbsp;
            </Text>
            <Text weight="extrabold" size={18}>
              SNIPV
            </Text>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Auth />
        </Modal.Body>
      </Modal>
    </div>
  );
}
