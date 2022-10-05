import { Button, Text } from "@nextui-org/react";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
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

export default function CreatedSubFolders({
  setSelectedCodeSubFolder,
  selectedCodeSubFolder,
  selectedCodeMainFolder,
  setSubFolders,
  subFolders,
  id,
  dataFetched,
  selectSubValue,
  setSelectSubValue,
}) {

  const [open, setOpen] = useRecoilState(createCodeFolderModalState);
  const [update, setUpdate] = useRecoilState(updateStateAtom);

  function handleSelect(data) {
    setSelectSubValue(data);
    setSelectedCodeSubFolder(data);
  }

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;
    if(selectedCodeMainFolder.language?.langId > 0) {
      const folderColRef = query(collection(db, "UsersData1", user.uid, "CodeSubFolders"),
      where("mainFolderId", "==", selectedCodeMainFolder.mainFolderId))
      const getFolders = async () => {
        const userData = await getDocs(folderColRef);
        setSubFolders(
          userData.docs.map((doc) => ({ ...doc.data(), subFolderId: doc.id }))
        );
      }
      getFolders();
    }
  }, [user, update, selectedCodeMainFolder, setSelectedCodeSubFolder, setSubFolders]);

  useEffect(() => {
    if (id) {
      setSelectSubValue(setSelectedCodeSubFolder)
      setUpdate(!update)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dataFetched]);

  // console.log("selectedCodeSubFolder", selectedCodeSubFolder);
  // console.log("subFolders", subFolders[0]);

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
              <div className="w-full">
                <Select
                  options={subFolders} 
                  placeholder="Valg en rodmappe"
                  value={selectSubValue}
                  onChange={handleSelect}
                  isSearchable={true}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  components={{ NoOptionsMessage, Option: OptionFileExt, SingleValue: ValueFileExt}}
                />
              </div>
              <div>
                <Text
                  h3
                  color="primary"
                  onClick={() => {setOpen({default: true, view: 1})}}
                  className="cursor-pointer pt-3"
                >
                  <FaFolderPlus />
                </Text>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1">
            <Text>
              Du har ingen undermappe for <span className="font-semibold">{selectedCodeMainFolder.label}</span>&nbsp;
              <Text color="error" b>
                *
              </Text>
            </Text>
            <div>
              <Button color="primary" auto onClick={() => {setOpen({default: true, view: 1})}}>
                Opret
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
