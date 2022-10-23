import { Text } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { mainFolderDeleteUpdateState } from "../../atoms/mainFolderDeleteUpdateState";
import { mainFolderEditUpdateState } from "../../atoms/mainFolderEditUpdateState";
import FoldersLoad from "../../components/Folders/FoldersLoad";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import MySNIPS from "../../components/MySNIPS";
import Tags from "../../components/MySNIPS/Tags";
import { auth, db } from "../../firebase/clientApp";
const Setups = () => {
  const [user] = useAuthState(auth);
  const [loadingMain, setLoadingMain] = useState(false);
  const [folders, setFolders] = useState([]);

  const [mainDeleted, setMainDeleted] = useRecoilState(
    mainFolderDeleteUpdateState
  );
  const [mainEdited, setMainEdited] = useRecoilState(mainFolderEditUpdateState);

  const [selectedMainFolder, setSelectedMainFolder] = useState();
  const [selectedSubFolder, setSelectedSubFolder] = useState([]);

  useEffect(() => {
    if (!user) return;
    setLoadingMain(true);
    const folderColRef = query(
      collection(db, "UsersData1", user.uid, "SetupMainFolders")
    );
    const getFolders = async () => {
      const userData = await getDocs(folderColRef);
      setFolders(
        userData.docs.map((doc) => ({ ...doc.data(), mainFolderId: doc.id }))
      );
    };

    getFolders();
  }, [user, mainDeleted, mainEdited]);

  return (
    <div className="min-h-[70vh] w-full">
      <Head>
        <title>Mine kode SNIPS - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <SnippetsTypeLinks />
      </>

      <div className="flex gap-6">
        <div className="flex flex-col gap-3 w-full">
          <FoldersLoad
            folders={folders}
            loadingMain={loadingMain}
            setLoadingMain={setLoadingMain}
            selectedMainFolder={selectedMainFolder}
            setSelectedMainFolder={setSelectedMainFolder}
            selectedSubFolder={selectedSubFolder}
            setSelectedSubFolder={setSelectedSubFolder}
          />

          {selectedMainFolder?.mainFolderId && (
            <MySNIPS
              loadingMain={loadingMain}
              setLoadingMain={setLoadingMain}
              selectedSubFolder={selectedSubFolder}
            />
          )}

          {!selectedMainFolder?.mainFolderId && (
            <div className="flex justify-center mt-10">
              <Text>Valg en rodmappe!</Text>
            </div>
          )}
        </div>

        <div>
          <Tags />
        </div>
      </div>
    </div>
  );
};

export default Setups;
