import { Button } from "@nextui-org/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SnippetsFolderType from "../../components/Heading/SnippetsFolderType";
import { auth, db } from "../../Firebase/clientApp";
import CodeFolders from "../../components/Folders/CodeFolders";
import NoUser from "../../components/NoPage/NoUser";

const MyFolders = () => {
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
    <div>
      {user && (
        <div>
          <div className="mb-4">
            <SnippetsFolderType />
          </div>
          <div>
            <CodeFolders myCodeFolders={myCodeFolders} />
          </div>
        </div>
      )}
      {!user && <NoUser />}
    </div>
  );
};

export default MyFolders;
