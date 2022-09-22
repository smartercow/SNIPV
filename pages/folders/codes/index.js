import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import FolderType from "../../../components/Heading/FolderType";
import { auth, db } from "../../../firebase/clientApp";
import CodeFolders from "../../../components/Folders/CodeFolders";
import NoUser from "../../../components/NoPage/NoUser";
import Head from "next/head";
import LatestHeading from "../../../components/Heading/LatestHeading";

const MyCodesFolders = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [myCodeFolders, setCodeMyFolders] = useState();
  const [update, setUpdate] = useState(false);

  const getMyCodeFolders = async () => {
    try {
      const folderQuery = query(
        collection(db, "UsersData1", user?.uid, "CodeFolders"),
        where("folderSnippetType", "==", "code"),
        orderBy("createdAt", "desc")
      );
      const folderDocs = await getDocs(folderQuery);
      const folders = folderDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCodeMyFolders(folders);
      setLoading(false);
    } catch (error) {
      console.log("getMyCodeFolders error", error.message);
    }
  };

  useEffect(() => {
    getMyCodeFolders();
  }, [user, update]);

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

            <CodeFolders
              myCodeFolders={myCodeFolders}
              loading={loading}
              update={update}
              setUpdate={setUpdate}
            />
          </div>
        </div>
      )}
      {!user && <NoUser />}
    </div>
  );
};

export default MyCodesFolders;
