import { Button, Container, Grid, Row, Spacer, Text } from "@nextui-org/react";
import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Select from "react-select";
import { auth, db } from "../../Firebase/clientApp";
import CreateFolder from "./CreateFolder";

export default function CreatedFolders({
  setSelectedFolder,
  setSelectedCategory,
}) {
  const [folders, setFolders] = useState([]);
  const [selectValue, setSelectValue] = useState([]);
  const [createFolderOn, setCreateFolderOn] = useState(false);
  const [update, setUpdate] = useState(false)

  function handleSelect(data) {
    setSelectValue(data);
    setSelectedCategory(data.language);
    setSelectedFolder(data);
  }

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;
    const folderColRef = collection(db, "UsersData", user.uid, "Folders");
    const getFolders = async () => {
      const userData = await getDocs(folderColRef);
      setFolders(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getFolders();
  }, [user, update]);

  return (
    <div>
      {folders.length > 0 ? (
        <div>
          {createFolderOn ? (
            <div>
              <CreateFolder update={update} setUpdate={setUpdate} setCreateFolderOn={setCreateFolderOn} />
            </div>
          ) : (
            <div>
              <Text>Mappe *</Text>
              <Spacer y={0.3} />
              <div className="flex gap-3">
                <div className="w-full">
                  <Select
                    options={folders}
                    placeholder="Valg en mappe"
                    value={selectValue}
                    onChange={handleSelect}
                    isSearchable={true}
                  />
                </div>
                <div>
                  <Button
                    color="secondary"
                    auto
                    rounded
                    onClick={() => setCreateFolderOn(true)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {createFolderOn ? (
            <CreateFolder update={update} setUpdate={setUpdate} setCreateFolderOn={setCreateFolderOn} />
          ) : (
            <div className="flex flex-col gap-1">
              <Text>Du har ingen mapper</Text>
              <div>
                <Button
                  color="gradient"
                  auto
                  onClick={() => setCreateFolderOn(true)}
                >
                  opret
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
