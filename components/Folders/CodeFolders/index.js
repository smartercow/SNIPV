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
import { DeleteDocumentIcon } from "../../SVG/DeleteDocumentIcon";
import { DeleteSnippet } from "../../NonModal/DeleteSnippet";
import { DeleteFolder } from "../../NonModal/DeleteFolder";
import SubFolderDropdown from "../../Display/SubFolderDropdown";
import { useRecoilState } from "recoil";
import { subFolderDeleteUpdateState } from "../../../atoms/subFolderDeleteUpdateState";
import { mainFolderDeleteUpdateState } from "../../../atoms/mainFolderDeleteUpdateState";
import MainFolderDropdown from "../../Display/MainFolderDropdown";

const CodeFolders = ({
  folders,
  loadingMain,
  setLoadingMain,
  update,
  setUpdate,
  selectedMainFolder,
  setSelectedMainFolder,
  selectedSubFolder,
  setSelectedSubFolder,
}) => {
  const [user] = useAuthState(auth);
  // const [loading, setLoading] = useState(true);
  const [subDeleted, setSubDeleted] = useRecoilState(
    subFolderDeleteUpdateState
  );
  const [mainDeleted, setMainDeleted] = useRecoilState(mainFolderDeleteUpdateState);

  const [subFolders, setSubFolders] = useState([]);

  const [selectValue, setSelectValue] = useState();
  const [selectSubValue, setSelectSubValue] = useState({});

  const [updateSub, setUpdateSub] = useState(false);

  const [loading, setLoading] = useState(true);

  const [allOpenStates, setAllOpenStates] = useState({});

  function handleMainSelect(data) {
    setSelectValue(data);
    setSelectedMainFolder(data);
    setSelectSubValue(null);
    setSelectedSubFolder({});
    setLoadingMain(true);
  }

  function handleSubSelect(data) {
    setSelectSubValue(data);
    setSelectedSubFolder(data);
    setLoadingMain(false);
  }

  const handleDeleteMainFolders = async (id) => {
    try {
      await deleteDoc(doc(db, "UsersData1", user?.uid, "CodeMainFolders", id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  const handleDeleteSubFolders = async (id) => {
    try {
      await deleteDoc(doc(db, "UsersData1", user?.uid, "CodeSubFolders", id));
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  useEffect(() => {
    if (subDeleted) {
      // setUpdateSub(!updateSub);
      setSelectSubValue(null);
      setSelectedSubFolder({});
      setSubDeleted(false);
    }
  }, [subDeleted]);

  useEffect(() => {
    if (mainDeleted) {
      // setUpdateSub(!updateSub);
      setSelectValue(null);
      setSelectedMainFolder({});
      setMainDeleted(false);
    }
  }, [mainDeleted]);

  useEffect(() => {
    if (!user) return;
    if (selectedMainFolder?.mainFolderId) {
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
  }, [user, selectedMainFolder, updateSub]);

  console.log("selectedMainFolder", selectedMainFolder);
  // console.log("subFolders", subFolders);
  // console.log("selectedSubFolder", selectedSubFolder);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Text b size={13} transform="uppercase">
            Rodmappe
          </Text>

          <div className="flex gap-3 items-center">
            <div className="w-full">
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
            </div>

            <div className="w-40">
              {selectedMainFolder?.mainFolderId && (
                <MainFolderDropdown id={selectedMainFolder.mainFolderId} />
              )}
            </div>
          </div>
        </div>

        {selectedMainFolder?.mainFolderId && (
          <div className="flex flex-col gap-1">
            <Text b size={13} transform="uppercase">
              Undermappe
            </Text>

            <div className="flex gap-3 items-center">
              <div className="w-full">
                <Select
                  options={subFolders}
                  placeholder="Valg en undermappe"
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

              <div className="w-40">
                {selectedSubFolder.subFolderId && (
                  <SubFolderDropdown id={selectedSubFolder.subFolderId} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeFolders;
