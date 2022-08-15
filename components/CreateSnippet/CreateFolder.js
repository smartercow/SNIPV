import { Button, Input, Spacer, Text, Tooltip } from "@nextui-org/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Select from "react-select";
import { auth, db } from "../../Firebase/clientApp";
import { LanguageOptions } from "../../utilities/LanguageOptions";

const initialSelectedLang = {
  label: "JavaScript",
  value: "javascript",
  langId: "54",
};

export default function CreateFolder({ setCreateFolderOn, update, setUpdate }) {
  const [language, setLanguage] = useState(initialSelectedLang);

  const [folderName, setFolderName] = useState("");
  const [user] = useAuthState(auth);

  function handleSelect(data) {
    setLanguage(data);
  }

  function handelCancel() {
    setCreateFolderOn(false)
    setUpdate(!update)
  }

  const createFolder = async (e) => {
    e.preventDefault();
    if (language && folderName) {
      try {
        const userDataDocRef = doc(db, "UsersData", user?.uid);

        await setDoc(userDataDocRef, JSON.parse(JSON.stringify(user)));

        await addDoc(collection(db, "UsersData", user?.uid, "Folders"), {
          createdAt: serverTimestamp(),
          userId: user.uid,
          author: user.displayName,
          folderName: folderName,
          language: language,
          label: folderName,
          value: folderName,
        });
        setCreateFolderOn(false);
        setUpdate(!update)
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
  };
  return (
    <div>
      <div>
        <Text h5>Opret mappe</Text>
      </div>
      <Spacer y={0.5} />
      <div>
        <Text>Navn</Text>
        <Input
          underlined
          placeholder="Mappe navn"
          onChange={(e) => setFolderName(e.target.value)}
          width="100%"
          size="lg"
        />
      </div>
      <Spacer y={0.7} />
      <Text>Sprog</Text>
      <Spacer y={0.4} />

      <div className="flex justify-between gap-3">
        <div className="flex gap-2">
          <Select
            options={LanguageOptions}
            placeholder="Search and select"
            value={language}
            onChange={handleSelect}
            isSearchable={true}
            className="w-full"
          />
          <Tooltip
            content={"Programmeringssprog for denne mappe"}
            color="primary"
          >
            <Button auto flat>
              ?
            </Button>
          </Tooltip>
        </div>
        <div className="flex gap-2">
          <Button color="gradient" auto onClick={createFolder}>
            Opret
          </Button>
          <Button auto flat color="error" onClick={handelCancel}>X</Button>
        </div>
      </div>
    </div>
  );
}
