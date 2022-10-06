import { collection, getDocs, query } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CodeFolders from "../../components/Folders/CodeFolders";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import MyCodeSnippets from "../../components/MySnippets/MyCodeSnippets";
import { auth, db } from "../../firebase/clientApp";
const Codes = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([]);

  const [update, setUpdate] = useState(false);

  const [selectedMainFolder, setSelectedMainFolder] = useState([]);
  const [selectedSubFolder, setSelectedSubFolder] = useState([]);

  useEffect(() => {
    if (!user) return;

    const folderColRef = query(
      collection(db, "UsersData1", user.uid, "CodeMainFolders")
    );
    const getFolders = async () => {
      const userData = await getDocs(folderColRef);
      setFolders(
        userData.docs.map((doc) => ({ ...doc.data(), mainFolderId: doc.id }))
      );
    };

    getFolders();
  }, [user]);

  console.log("selectedSubFolder", selectedSubFolder);

  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>Mine kode SNIPS - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <SnippetsTypeLinks />
      </>

      <div className="flex flex-col gap-3">
        <CodeFolders
          folders={folders}
          loading={loading}
          update={update}
          setUpdate={setUpdate}
          selectedMainFolder={selectedMainFolder}
          setSelectedMainFolder={setSelectedMainFolder}
          selectedSubFolder={selectedSubFolder}
          setSelectedSubFolder={setSelectedSubFolder}
        />

        <MyCodeSnippets
          selectedMainFolder={selectedMainFolder}
          selectedSubFolder={selectedSubFolder}
        />
      </div>
    </div>
  );
};

export default Codes;
