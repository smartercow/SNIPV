import { async } from "@firebase/util";
import {
  Button,
  Input,
  Loading,
  Modal,
  Text,
  Tooltip,
} from "@nextui-org/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { setUsernameModal } from "../../atoms/setUsernameModal";
import { auth, db } from "../../Firebase/clientApp";
import { BsQuestionCircleFill, BsExclamationCircleFill } from "react-icons/bs";
import { DebounceInput } from "react-debounce-input";
//DEBOUNCEINPUT VIST SO  IKKE BRUGT MEN BRUGES!!!

import { useAuthState } from "react-firebase-hooks/auth";

const SetUsernameModal = () => {
  const [user] = useAuthState(auth)
  const [open, setOpen] = useRecoilState(setUsernameModal);

  const [usernameInputValue, setUsernameInputValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [usernameStatus, setUsernameStatus] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(20);

  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [statusColor, setStatusColor] = useState("");
  const [inputStatus, setInputStatus] = useState(false);

  const handleChange = (e) => {
    if (e.target.value.length > 20) return;
    setCharsRemaining(20 - e.target.value.length);
    setUsernameValue(e.target.value.toLowerCase());
    setUsernameInputValue(e.target.value);
    setLoading(true);
    setCheck(false);
  };

  const CheckUsername = async () => {
    const usernameFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (
      usernameFormat.test(usernameInputValue) ||
      usernameInputValue.length > 2
    ) {
      setUsernameStatus("");
      setInputStatus(true);
      const UserRef = collection(db, "UsersData1");
      const UsernameQuery = query(
        UserRef,
        where("usernameValue", "==", usernameValue)
      );

      const Username = await getDocs(UsernameQuery);

      if (Username.docs.length > 0) {
        console.log("username exists");
        setUsernameStatus(`${usernameInputValue} er allerede taget`);
        setStatusColor("error");
        setLoading(false);
        setCheck(false);
        setInputStatus(false);
      } else {
        console.log("username NOT exists");
        setUsernameStatus(`${usernameInputValue} er tilgængelig`);
        setStatusColor("success");
        setLoading(false);
        setCheck(false);
        setInputStatus(true);
      }
    } else {
      setInputStatus(false);
    }
  };

  const SetUsername = async () => {
    try {
      await updateDoc(doc(db, "UsersData1", user.uid), {
        username: usernameInputValue,
        usernameValue: usernameValue,
        usernameSet: true,
      })
      
      setStatusColor("")
      setInputStatus(false)
      setLoading(false)
      setOpen(false)
      setCheck(false)
    } catch (error) {
      return null
    }
  }

  

  useEffect(() => {
    if (usernameInputValue) {
      CheckUsername();
    }
    if (!usernameInputValue.length > 0) {
      setUsernameStatus("");
      setLoading(false);
      setInputStatus(true);
    }
  }, [usernameInputValue]);

  console.log(user);
  console.log(open);
  return (
    <div>
      <Modal
        preventClose
        aria-labelledby="modal-title"
        open={open}
        onClose={() => setOpen(false)}
        width="360px"
      >
        <Modal.Header>
          <div className="flex">
            <Text b id="modal-title" size={18}>
              Færdiggør registreringen
            </Text>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-2">
            <Text>Brugernavn</Text>
            <div className="flex gap-2 items-center">
              <div className="w-full">
                <DebounceInput
                  minLength={3}
                  debounceTimeout={700}
                  aria-label="Username"
                  placeholder="brugernavn"
                  width="100%"
                  contentRight={loading && <Loading size="xs" />}
                  onChange={handleChange}
                  element={Input}
                />
              </div>
              {inputStatus ? (
                <div>
                  <Tooltip
                    content={
                      "Brugernavn skal være mellem 3-20 tegn og må kun indeholde bogstaver, tal eller understregninger."
                    }
                    color="primary"
                    keepMounted="true"
                    css={{ zIndex: 999999 }}
                  >
                    <Text h5 color="primary">
                      <BsQuestionCircleFill />
                    </Text>
                  </Tooltip>
                </div>
              ) : (
                <div>
                  <Tooltip
                    content={
                      "Brugernavn skal være mellem 3-20 tegn og må kun indeholde bogstaver, tal eller understregninger."
                    }
                    color="error"
                    keepMounted="true"
                    css={{ zIndex: 999999 }}
                  >
                    <Text h5 color="error">
                      <BsExclamationCircleFill />
                    </Text>
                  </Tooltip>
                </div>
              )}
            </div>
            {/*             <Text color={charsRemaining === 0 ? "error" : "success"}>
              {charsRemaining} tegn tilbage
            </Text> */}
            <div className="h-4">
              <Text color={statusColor}>{usernameStatus}</Text>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="primary" onClick={SetUsername}>
            Færdiggør
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SetUsernameModal;
