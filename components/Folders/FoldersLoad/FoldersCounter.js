import {
  collection,
  FieldPath,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase/clientApp";

const FoldersCounter = ({ id }) => {
  const [user] = useAuthState(auth);
  const { asPath } = useRouter();

  const [subFolder, setSubFolder] = useState("");

  const [subFolders, setSubFolders] = useState();

  useEffect(() => {
    if (asPath.startsWith("/snips/codes")) {
      setSubFolder("CodeSubFolders");
    }
    if (asPath.startsWith("/snips/errors")) {
      setSubFolder("ErrorSubFolders");
    }
    if (asPath.startsWith("/setups")) {
      setSubFolder("SetupSubFolders");
    }
  }, [asPath]);

  const getThisFolderSubFolders = async () => {
    try {
      const folderColRef = collection(db, "UsersData1", user?.uid, subFolder);
      const foldersQuery = query(
        folderColRef,
        where(new FieldPath("mainFolder", "mainFolderId"), "==", id)
      );

      onSnapshot(foldersQuery, (snapshot) => {
        let folders = [];
        snapshot.docs.forEach((doc) => {
          folders.push({ ...doc.data(), id: doc.id });
        });
        setSubFolders(folders);
      });
    } catch (error) {
      console.log("Get subFolders error", error.message);
    }
  };

  useEffect(() => {
    if (id && subFolder) {
      getThisFolderSubFolders();
    }
  }, [id, subFolder]);

  return (
    <div className="text-[#031b4eac] bg-[#ECF4FF] py-[.35rem] px-3 rounded-lg whitespace-nowrap">
      <div>
        {subFolders?.length > 0 ? (
          <div className="flex gap-1 items-center">
            <div>
              <p className="text-xs font-bold">{subFolders.length}</p>
            </div>
          </div>
        ) : (
          <div className="flex gap-1 items-center">
            <div>
              <p className="text-xs font-bold">0</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoldersCounter;
