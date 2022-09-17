import { Button, Container, Grid, Row, Spacer, Text } from "@nextui-org/react";
import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Select from "react-select";
import { useRecoilState } from "recoil";
import { createCodeFolderModalState } from "../../../atoms/createCodeFolderModalAtom";
import { updateStateAtom } from "../../../atoms/updateStateAtom";
import { auth, db } from "../../../firebase/clientApp";
import { FaFolderPlus } from "react-icons/fa";

export default function CreatedFolders({
  setSelectedFolder,
  setSelectedCategory,
}) {
  const [folders, setFolders] = useState([]);
  const [selectValue, setSelectValue] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useRecoilState(createCodeFolderModalState);
  const [update, setUpdate] = useRecoilState(updateStateAtom);

  function handleSelect(data) {
    setSelectValue(data);
    setSelectedCategory(data.language);
    setSelectedFolder(data);
  }

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;
    const folderColRef = collection(db, "UsersData1", user.uid, "CodeFolders");
    const getFolders = async () => {
      const userData = await getDocs(folderColRef);
      setFolders(
        userData.docs.map((doc) => ({ ...doc.data(), folderId: doc.id }))
      );
    };
    getFolders();
  }, [user, update]);

  return (
    <div>
      {folders.length > 0 ? (
        <div>
          <div className="flex items-center gap-4 mt-3">
            <div className="w-20">
              <Text>
                Mappe&nbsp;
                <Text color="error" b>
                  *
                </Text>
              </Text>
            </div>

            <div className="flex gap-3 items-center w-full">
              <div className="w-1/2">
                <Select
                  options={folders}
                  placeholder="Valg en mappe"
                  value={selectValue}
                  onChange={handleSelect}
                  isSearchable={true}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                />
              </div>
              <div>
                <Text
                  h3
                  color="primary"
                  onClick={() => setOpen(true)}
                  className="cursor-pointer"
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
              Du har ingen mapper for kode snippets&nbsp;
              <Text color="error" b>
                *
              </Text>
            </Text>
            <div>
              <Button color="primary" auto onClick={() => setOpen(true)}>
                Opret
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
