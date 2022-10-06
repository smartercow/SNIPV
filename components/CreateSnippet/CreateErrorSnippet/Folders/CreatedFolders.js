import { Button, Text } from "@nextui-org/react";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Select from "react-select";
import { useRecoilState } from "recoil";
import { createErrorFolderModalState } from "../../../../atoms/createErrorFolderModalAtom";
import { updateStateAtom } from "../../../../atoms/updateStateAtom";
import { auth, db } from "../../../../firebase/clientApp";
import { FaFolderPlus } from "react-icons/fa";
import { OptionFileExt, ValueFileExt } from "../../Select/SelectProps";
import { NoOptionsMessage } from "../../Select/NoOptionsMessage";

export default function CreatedFolders({
  setSelectedMainFolder,
  selectedMainFolder,
  setSelectedSubFolder,
  selectedSubFolder,
  id,
  dataFetched,
  selectValue,
  setSelectValue,
  setSelectSubValue
}) {
  const [folders, setFolders] = useState([]);

  const [open, setOpen] = useRecoilState(createErrorFolderModalState);
  const [update, setUpdate] = useRecoilState(updateStateAtom);

  function handleSelect(data) {
    setSelectValue(data)
    setSelectedMainFolder(data);
    setSelectSubValue(null)
  }

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;
    const folderColRef = collection(
      db,
      "UsersData1",
      user.uid,
      "ErrorMainFolders"
    );
    const getFolders = async () => {
      const userData = await getDocs(folderColRef);
      setFolders(
        userData.docs.map((doc) => ({ ...doc.data(), mainFolderId: doc.id }))
      );
    };
    getFolders();
  }, [user, update]);

  useEffect(() => {
    if (id) {
      setSelectValue(setSelectedMainFolder);
      setUpdate(!update);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dataFetched]);

  // console.log("FOLDERS", folders);
  // console.log("selectedMainFolder", selectedMainFolder);

  return (
    <div>
      {folders.length > 0 ? (
        <div>
          <div className="flex flex-col">
            <div className="w-20">
              <Text h6 transform="uppercase">
                Rodmappe&nbsp;
                <Text color="error" b>
                  *
                </Text>
              </Text>
            </div>

            <div className="flex gap-3 items-center">
              <div className="w-full">
                <Select
                  options={folders}
                  placeholder="Valg en rodmappe"
                  value={selectValue}
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
              <div>
                <Text
                  h3
                  color="primary"
                  onClick={() => {setOpen({default: true, view: 0})}}
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
              Du har ingen rodmapper for fejl SNIPS&nbsp;
              <Text color="error" b>
                *
              </Text>
            </Text>
            <div>
              <Button color="primary" auto onClick={() => {setOpen({default: true, view: 0})}}>
                Opret
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
