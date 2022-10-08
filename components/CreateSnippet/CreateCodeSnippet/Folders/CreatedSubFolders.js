import { Button, Loading, Text } from "@nextui-org/react";
import {
  collection,
  FieldPath,
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
import { OptionFileExt, ValueFileExt } from "../../Select/SelectProps";
import { NoOptionsMessage } from "../../Select/NoOptionsMessage";
import SubFolderDropdown from "../../../Display/SubFolderDropdown";
import { AddNoteIcon } from "../../../SVG/AddNoteIcon";
import { subFolderDeleteUpdateState } from "../../../../atoms/subFolderDeleteUpdateState";
import { subFolderEditUpdateState } from "../../../../atoms/subFolderEditUpdateState";

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
  const [user] = useAuthState(auth);
  const [open, setOpen] = useRecoilState(createCodeFolderModalState);
  const [update, setUpdate] = useRecoilState(updateStateAtom);
  
  const [subEdited, setSubEdited] = useRecoilState(subFolderEditUpdateState);
  const [subDeleted, setSubDeleted] = useRecoilState(
    subFolderDeleteUpdateState
  );
  const [subLoading, setSubLoading] = useState(true);


  function handleSelect(data) {
    setSelectSubValue(data);
    setSelectedSubFolder(data);
  }

  useEffect(() => {
    if (!user) return;
    setSubLoading(true);
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
        setSubLoading(false);
      };
      getFolders();
    }
  }, [user, update, selectedMainFolder, subDeleted]);

  useEffect(() => {
    if (id) {
      setSelectSubValue(setSelectedSubFolder);
      setUpdate(!update);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dataFetched]);

  useEffect(() => {
    if (subDeleted) {
      setUpdate(!update);
      setSelectSubValue(null);
      setSelectedSubFolder({});
      setSubDeleted(false);
    }
  }, [subDeleted]);

  useEffect(() => {
    if (subEdited) {
      setUpdate(!update);
      setSelectSubValue(null);
      setSelectedSubFolder({});
      setSubEdited(false);
    }
  }, [subEdited]);

  return (
    <div>
      {!subLoading && (
        <>
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
                        setOpen({
                          default: true,
                          view: 1,
                          folder: selectedMainFolder,
                        });
                      }}
                      className="cursor-pointer pt-3"
                    >
                      <AddNoteIcon
                        size={30}
                        fill="var(--nextui-colors-primary)"
                      />
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
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      components={{
                        NoOptionsMessage,
                        Option: OptionFileExt,
                        SingleValue: ValueFileExt,
                      }}
                    />
                  </div>

                  <div className="w-10">
                    {selectedSubFolder?.subFolderId && (
                      <SubFolderDropdown
                        selectedSubFolder={selectedSubFolder}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <Text b size={13} transform="uppercase">
                  Ingen undermapper!
                </Text>

                <div>
                  <Button
                    flat
                    color="primary"
                    size="sm"
                    auto
                    onClick={() => {
                      setOpen({
                        default: true,
                        view: 1,
                        folder: selectedMainFolder,
                      });
                    }}
                  >
                    Opret
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {subLoading && (
        <div className="flex justify-center items-center h-20">
          <Loading size="md" />
        </div>
      )}
    </div>
  );
}
