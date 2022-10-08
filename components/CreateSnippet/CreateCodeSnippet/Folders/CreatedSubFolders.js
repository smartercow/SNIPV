import { Button, Text } from "@nextui-org/react";
import {
  collection,
  FieldPath,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Select from "react-select";
import { useRecoilState } from "recoil";
import { createCodeFolderModalState } from "../../../../atoms/createCodeFolderModalAtom";
import { updateStateAtom } from "../../../../atoms/updateStateAtom";
import { auth, db } from "../../../../firebase/clientApp";
import { FaFolderPlus } from "react-icons/fa";
import { OptionFileExt, ValueFileExt } from "../../Select/SelectProps";
import { NoOptionsMessage } from "../../Select/NoOptionsMessage";
import SubFolderDropdown from "../../../Display/SubFolderDropdown";
import { AddNoteIcon } from "../../../SVG/AddNoteIcon";
import { subFolderDeleteUpdateState } from "../../../../atoms/subFolderDeleteUpdateState";

export default function CreatedSubFolders({
  setSelectedSubFolder,
  selectedSubFolder,
  selectedMainFolder,
  setSubFolders,
  subFolders,
  id,
  dataFetched,
  selectSubValue,
  setSelectSubValue,
}) {
  const [open, setOpen] = useRecoilState(createCodeFolderModalState);
  const [update, setUpdate] = useRecoilState(updateStateAtom);
  const [subDeleted, setSubDeleted] = useRecoilState(
    subFolderDeleteUpdateState
  );
  function handleSelect(data) {
    setSelectSubValue(data);
    setSelectedSubFolder(data);
  }

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;
    if (selectedMainFolder.language?.langId > 0) {
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
  }, [
    user,
    update,
    selectedMainFolder,
    selectedSubFolder,
    subDeleted,
  ]);

  useEffect(() => {
    if (id) {
      setSelectSubValue(setSelectedSubFolder);
      setUpdate(!update);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dataFetched]);

  useEffect(() => {
    if (subDeleted) {
      // setUpdateSub(!updateSub);
      setSelectSubValue(null);
      setSelectedSubFolder({});
      setSubDeleted(false);
    }
  }, [subDeleted]);

  // console.log("subFolders", subFolders);

  console.log("selectedMainFolder", selectedMainFolder);
  console.log("selectedSubFolder", selectedSubFolder);
  // console.log("SELECTSUBVALUE", selectSubValue[0]);

  return (
    <div>
      {subFolders?.length > 0 ? (
        <div>
          <div className="flex flex-col">
            <div className="w-20">
              <Text h6 transform="uppercase">
                Undermappe&nbsp;
                <Text color="error" b>
                  *
                </Text>
              </Text>
            </div>

            <div className="flex gap-3 items-center w-full">
              <div>
                <Text
                  h3
                  color="primary"
                  onClick={() => {
                    setOpen({ default: true, view: 1 });
                  }}
                  className="cursor-pointer pt-3"
                >
                  <AddNoteIcon size={30} fill="var(--nextui-colors-primary)" />
                </Text>
              </div>

              <div className="w-full">
                <Select
                  options={subFolders}
                  placeholder="Valg en rodmappe"
                  value={selectSubValue}
                  onChange={handleSelect}
                  isSearchable={true}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  components={{
                    NoOptionsMessage,
                    Option: OptionFileExt,
                    SingleValue: ValueFileExt,
                  }}
                />
              </div>

              <div className="w-40">
                {selectedSubFolder?.subFolderId && (
                  <SubFolderDropdown selectedSubFolder={selectedSubFolder} />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <Text>
              Du har ingen undermappe for&nbsp;
              <span className="font-semibold">{selectedMainFolder.label}</span>
              &nbsp;
              <Text color="error" b>
                *
              </Text>
            </Text>
            <div>
              <Button
                flat
                color="primary"
                size="sm"
                auto
                onClick={() => {
                  setOpen({ default: true, view: 1 });
                }}
              >
                Opret
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
