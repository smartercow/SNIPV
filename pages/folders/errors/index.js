import { Text } from "@nextui-org/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import FolderType from "../../../components/Heading/FolderType";
import { auth, db } from "../../../firebase/clientApp";
import ErrorFolders from "../../../components/Folders/ErrorFolders";
import NoUser from "../../../components/NoPage/NoUser";
import Head from "next/head";
import LatestHeading from "../../../components/Heading/LatestHeading";

const MyErrorsFolders = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false)
  const [myErrorFolders, setMyErrorFolders] = useState();

  const getMyErrorFolders = async () => {
    try {
      const folderQuery = query(
        collection(db, "UsersData1", user?.uid, "ErrorFolders"),
        where("folderSnippetType", "==", "error"),
        orderBy("createdAt", "desc")
      );
      const folderDocs = await getDocs(folderQuery);
      const folders = folderDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyErrorFolders(folders);
      setLoading(false);
    } catch (error) {
      console.log("getMyErrorFolders error", error.message);
    }
  };

  useEffect(() => {
    getMyErrorFolders();
  }, [user, update]);

  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>Mine fejl mapper - SNIPV</title>
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
              <LatestHeading headingType={"Alle fejl mapper"} />
            </>

            <ErrorFolders myErrorFolders={myErrorFolders} loading={loading} update={update} setUpdate={setUpdate} />
          </div>
        </div>
      )}
      {!user && <NoUser />}
    </div>
  );
};

export default MyErrorsFolders;
