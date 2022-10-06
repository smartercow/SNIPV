import { Button, Card, Loading, Popover, Text } from "@nextui-org/react";
import {
  collection,
  deleteDoc,
  doc,
  FieldPath,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase/clientApp";
import Folder from "../../Display/Folder";
import CodeSnippetsCounter from "./CodeSnippetsCounter";
import Select from "react-select";
import {
  OptionFileExt,
  ValueFileExt,
} from "../../CreateSnippet/Select/SelectProps";
import { NoOptionsMessage } from "../../CreateSnippet/Select/NoOptionsMessage";

const CodeFolders = ({ folders, update, setUpdate, selectedMainFolder, setSelectedMainFolder, selectedSubFolder, setSelectedSubFolder }) => {
  const [user] = useAuthState(auth);
  // const [loading, setLoading] = useState(true);

  const [subFolders, setSubFolders] = useState([]);

  const [selectValue, setSelectValue] = useState({});
  const [selectSubValue, setSelectSubValue] = useState({});

  const [loading, setLoading] = useState(true);

  function handleMainSelect(data) {
    setSelectValue(data);
    setSelectedMainFolder(data);
    setSelectSubValue(null)
  }

  function handleSubSelect(data) {
    setSelectSubValue(data);
    setSelectedSubFolder(data);
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "UsersData1", user?.uid, "CodeFolders", id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  useEffect(() => {
    if (!user) return;
    if (Object.keys(selectedMainFolder).length > 0) {
      const folderColRef = query(
        collection(db, "UsersData1", user.uid, "CodeSubFolders"),
        where(
          new FieldPath("mainFolder", "mainFolderId"),
          "==",
          selectedMainFolder.mainFolderId
        )
      );
      const getFolders = async () => {
        const userData = await getDocs(folderColRef);
        setSubFolders(
          userData.docs.map((doc) => ({ ...doc.data(), subFolderId: doc.id }))
        );
      };
      getFolders();
    }
  }, [user, selectedMainFolder]);

  // console.log("selectedMainFolder", selectedMainFolder);
  // console.log("subFolders", subFolders);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <Select
          options={folders}
          placeholder="Valg en rodmappe"
          value={selectValue}
          onChange={handleMainSelect}
          isSearchable={true}
          // menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          components={{
            NoOptionsMessage,
            Option: OptionFileExt,
            SingleValue: ValueFileExt,
          }}
        />

        <Select
          options={subFolders}
          placeholder="Valg en rodmappe"
          value={selectSubValue}
          onChange={handleSubSelect}
          isSearchable={true}
          // menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          components={{
            NoOptionsMessage,
            Option: OptionFileExt,
            SingleValue: ValueFileExt,
          }}
        />
      </div>
    </div>
  );
};

export default CodeFolders;
