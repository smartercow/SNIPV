import { Text } from "@nextui-org/react";
import { collection, getDocs, query } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { mainFolderDeleteUpdateState } from "../../atoms/mainFolderDeleteUpdateState";
import { mainFolderEditUpdateState } from "../../atoms/mainFolderEditUpdateState";
import ErrorFolders from "../../components/Folders/ErrorFolders";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import MyErrorSnippets from "../../components/MySnippets/MyErrorSnippets";
import { auth, db } from "../../firebase/clientApp";
const Errors = () => {
  const [user] = useAuthState(auth);
  const [loadingMain, setLoadingMain] = useState(false);
  const [folders, setFolders] = useState([]);

  const [mainDeleted, setMainDeleted] = useRecoilState(mainFolderDeleteUpdateState);
  const [mainEdited, setMainEdited] = useRecoilState(mainFolderEditUpdateState);


  const [selectedMainFolder, setSelectedMainFolder] = useState();
  const [selectedSubFolder, setSelectedSubFolder] = useState([]);

  useEffect(() => {
    if (!user) return;
    setLoadingMain(true);
    const folderColRef = query(
      collection(db, "UsersData1", user.uid, "ErrorMainFolders")
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

      <div className="flex flex-col gap-3">
        <ErrorFolders
          folders={folders}
          loadingMain={loadingMain}
          setLoadingMain={setLoadingMain}
          selectedMainFolder={selectedMainFolder}
          setSelectedMainFolder={setSelectedMainFolder}
          selectedSubFolder={selectedSubFolder}
          setSelectedSubFolder={setSelectedSubFolder}
        />

        {selectedMainFolder?.mainFolderId && (
          <MyErrorSnippets
            loadingMain={loadingMain}
            setLoadingMain={setLoadingMain}
            selectedSubFolder={selectedSubFolder}
          />
        )}

        {!selectedMainFolder?.mainFolderId && (
          <div className="flex justify-center mt-10">
            <Text b size={13} transform="uppercase">
              Valg en rodmappe!
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Errors;