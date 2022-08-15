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
  }, [user]);

  return (
    <div>
      <div>
        {createFolderOn ? (
          <div>
            <CreateFolder setCreateFolderOn={setCreateFolderOn} />
          </div>
        ) : (
          <div>
            <Text>Mappe</Text>
            <Spacer y={0.3} />
            <div className="flex gap-3">
              <div>
                <Select
                  options={folders}
                  placeholder="Valg en mappe"
                  value={selectValue}
                  onChange={handleSelect}
                  isSearchable={true}
                />
              </div>
              <div>
                <Button color="gradient" auto onClick={() => setCreateFolderOn(true)}>
                  +
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
