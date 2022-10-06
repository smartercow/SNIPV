import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import FolderType from "../../../components/Heading/FolderType";
import { auth, db } from "../../../firebase/clientApp";
import CodeFolders from "../../../components/Folders/CodeFolders";
import NoUser from "../../../components/NoPage/NoUser";
import Head from "next/head";
import LatestHeading from "../../../components/Heading/LatestHeading";
import Select from "react-select";

const MyCodesFolders = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([])

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (!user) return;

      const folderColRef = query(collection(db, "UsersData1", user.uid, "CodeMainFolders"))
      const getFolders = async () => {
        const userData = await getDocs(folderColRef);
        setFolders(
          userData.docs.map((doc) => ({ ...doc.data(), mainFolderId: doc.id }))
        );
      }

      getFolders();
  }, [user]);

  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>Mine kode mapper - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <div>
          <>
            <FolderType />
          </>
          
          <div className="flex flex-col gap-3">
            <>
              <LatestHeading headingType={"Alle kode mapper"}/>
            </>

{/*             <CodeFolders
              folders={folders}
              loading={loading}
              update={update}
              setUpdate={setUpdate}
            /> */}
          </div>
        </div>
      )}
      {!user && <NoUser />}
    </div>
  );
};

export default MyCodesFolders;
