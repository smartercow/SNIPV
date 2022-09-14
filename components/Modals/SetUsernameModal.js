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
  const [user] = useAuthState(auth);
  const [open, setOpen] = useRecoilState(setUsernameModal);

  const [usernameInputValue, setUsernameInputValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [usernameStatus, setUsernameStatus] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(16);

  //true = button disabled = false button abled
  const [confirm, setConfirm] = useState(true);

  const [loading, setLoading] = useState(false);
  //true vaild or nothing - false = error
  const [check, setCheck] = useState(true);
  const [statusColor, setStatusColor] = useState("");

  const handleChange = (e) => {
    if (e.target.value.length > 17) return;
    setCharsRemaining(16 - e.target.value.length);
    setUsernameValue(e.target.value.toLowerCase());
    setUsernameInputValue(e.target.value);
    setLoading(true);
    setCheck(true);
  };

  const usernameFormat = /^[A-Za-z0-9]*$/;

  const CheckUsername = async () => {
    if (
      usernameFormat.test(usernameInputValue) &&
      usernameInputValue.length > 2
    ) {
      setUsernameStatus("");
      setCheck(true);
      setConfirm(true);
      const UserRef = collection(db, "UsersData1");
      const UsernameQuery = query(
        UserRef,
        where("usernameValue", "==", usernameValue)
      );

      const Username = await getDocs(UsernameQuery);

      if (Username.docs.length > 0) {
        setUsernameStatus("er allerede taget!");
        setStatusColor("error");
        setLoading(false);
        setConfirm(true);
      } else {
        setUsernameStatus("er tilgængelig!");
        setStatusColor("success");
        setLoading(false);
        setConfirm(false);
      }
    } else {
      setCheck(false);
      setConfirm(true);
      setLoading(false);
      setUsernameStatus("");
      setStatusColor("error");

    }
  };

  const SetUsername = async () => {
    if (
      usernameFormat.test(usernameInputValue) &&
      usernameInputValue.length > 2
    ) {
      try {
        await updateDoc(doc(db, "UsersData1", user.uid), {
          username: usernameInputValue,
          usernameValue: usernameValue,
          usernameSet: true,
        });

        setOpen(false);
      } catch (error) {
        return null;
      }
    } else {
      setCheck(false)
      setConfirm(true)
    }
  };

  useEffect(() => {
    if (usernameInputValue) {
      CheckUsername();

    }

  }, [usernameInputValue]);

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
                  minLength={0}
                  maxLength={16}
                  debounceTimeout={1000}
                  aria-label="Username"
                  placeholder="brugernavn"
                  width="100%"
                  contentRight={loading && <Loading size="xs" />}
                  onChange={handleChange}
                  element={Input}
                />
              </div>
              {check === true && (
                <div>
                  <Tooltip
                    content={
                      "Brugernavn skal være mellem 3-16 tegn og må kun indeholde bogstaver eller tal uden MELLEMRUM og ÆØÅ."
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
              )}
              {check === false && (
                <div>
                  <Tooltip
                    content={
                      "Brugernavn skal være mellem 3-16 tegn og må kun indeholde bogstaver eller tal uden MELLEMRUM og ÆØÅ."
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
            <div className="h-4 flex items-center">
              <Text b color={statusColor}>{usernameInputValue}&nbsp;</Text>
              <Text color={statusColor}>{usernameStatus}</Text>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="primary"
            disabled={confirm}
            onClick={SetUsername}
          >
            Færdiggør
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SetUsernameModal;
