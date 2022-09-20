import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SnippetsFolderType from "../../../components/Heading/SnippetsFolderType";
import { auth, db } from "../../../firebase/clientApp";
import CodeFolders from "../../../components/Folders/CodeFolders";
import NoUser from "../../../components/NoPage/NoUser";
import { Text } from "@nextui-org/react";
import Head from "next/head";
const MyCodesFolders = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [myCodeFolders, setCodeMyFolders] = useState();

  const [foldersType, setFoldersType] = useState("code");

  const getMyCodeFolders = async () => {
    try {
      const folderQuery = query(
        collection(db, "UsersData1", user?.uid, "CodeFolders"),
        where("folderSnippetType", "==", foldersType),
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
          <div className="mb-4">
            <SnippetsFolderType />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Text h5 className="text-[#031B4E]">
                KODE MAPPER
              </Text>
              <hr />
            </div>
            <CodeFolders myCodeFolders={myCodeFolders} loading={loading} />
          </div>
        </div>
      )}
      {!user && <NoUser />}
    </div>
  );
};

export default MyCodesFolders;
