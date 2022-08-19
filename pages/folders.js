import { Button } from "@nextui-org/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase/clientApp";
import CodeFolders from "../Folders/CodeFolders";

const MyFolders = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [myCodeFolders, setCodeMyFolders] = useState();

  const getMyCodeFolders = async () => {
    try {
      const folderQuery = query(
        collection(db, "UsersData1", user?.uid, "CodeFolders1"),
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
  }, [user]);

  console.log("mycodefolders", myCodeFolders);

  return (
    <div>
      <div>
        <div className="mb-4">
          <Button.Group color="secondary" size="sm">
            <Button>Koder</Button>
            <Button disabled>Fejl</Button>
            <Button disabled>Links</Button>
            <Button disabled>Noter</Button>
          </Button.Group>
        </div>
        <div>
          <CodeFolders myCodeFolders={myCodeFolders} />
        </div>
      </div>
    </div>
  );
};

export default MyFolders;
