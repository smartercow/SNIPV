import React, { useEffect } from "react";
import Auth from "../Auth";
import { useRecoilState } from "recoil";
import { Login } from "../../atoms/loginModalStateAtom";
import { auth } from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

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
    <Modal isOpen={open} onClose={closeHandler} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <div className="flex justify-center">
            <Text size={18}>Log ind til&nbsp;</Text>
            <Text fontWeight="extrabold" size={18}>
              SNIPV
            </Text>
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Auth />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
