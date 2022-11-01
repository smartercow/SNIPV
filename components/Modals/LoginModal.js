import React, { useEffect } from "react";
import Auth from "../Auth";
import { useRecoilState } from "recoil";
import { Login } from "../../atoms/loginModalStateAtom";
import { auth } from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import CreateFolder from "../Folders/CreateFolder/CreateFolder";
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
            <Text fontWeight="extrabold" size={18}>
              SNIPV
            </Text>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Auth />
        </Modal.Body>
      </Modal>

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
    </div>
  );
}
