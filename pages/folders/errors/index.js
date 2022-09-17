import { Button, Text } from "@nextui-org/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SnippetsFolderType from "../../../components/Heading/SnippetsFolderType";
import { auth, db } from "../../../firebase/clientApp";
import ErrorFolders from "../../../components/Folders/ErrorFolders";
import NoUser from "../../../components/NoPage/NoUser";
import Head from "next/head";

const MyErrorsFolders = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [myErrorFolders, setMyErrorFolders] = useState();

  const [foldersType, setFoldersType] = useState("error");

  const getMyErrorFolders = async () => {
    try {
      const folderQuery = query(
        collection(db, "UsersData1", user?.uid, "ErrorFolders"),
        where("folderSnippetType", "==", foldersType),
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
  }, [user]);

  return (
    <div className="min-h-[80vh]">
      <Head>
        <title>Mine fejl mapper - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <div>
          <div className="mb-4">
            <SnippetsFolderType />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Text h5 className="text-[#031B4E]">
                FEJL MAPPER
              </Text>
              <hr />
            </div>
            <ErrorFolders myErrorFolders={myErrorFolders} />
          </div>
        </div>
      )}
      {!user && <NoUser />}
    </div>
  );
};

export default MyErrorsFolders;
