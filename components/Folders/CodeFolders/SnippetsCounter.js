import {
  collection,
  FieldPath,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/clientApp";

const SnippetsCounter = ({ id }) => {
  const [thisFolderSnippets, setThisFolderSnippets] = useState();
  const getThisFolderSnippets = async () => {
    try {
      const snippetsColRef = collection(db, "CodeSnippetsData1");
      const snippetsQuery = query(
        snippetsColRef,
        where(new FieldPath("folder", "folderId"), "==", id)
      );

      onSnapshot(snippetsQuery, (snapshot) => {
        let snippets = [];
        snapshot.docs.forEach((doc) => {
          snippets.push({ ...doc.data(), id: doc.id });
        });
        setThisFolderSnippets(snippets);
      });
    } catch (error) {
      console.log("getsnippet error", error.message);
    }
  };

  useEffect(() => {
    if (id) {
      getThisFolderSnippets();
    }
  }, [id]);
  return (
    <div className="text-[#031b4eac]">
      {thisFolderSnippets && (
        <div>
          {thisFolderSnippets.length > 1 && (
            <div className="flex gap-1 items-center">
              <div>
                <p className="text-xs font-bold">{thisFolderSnippets.length}</p>
              </div>
              <div>
                <p className="text-xs font-bold">SNIPS</p>
              </div>
            </div>
          )}

          {thisFolderSnippets.length === 0 && (
              <div>
                <p className=" text-xs font-bold">INGEN SNIPS</p>
              </div>
            )}

          {thisFolderSnippets.length === 1 && (
            <div className="flex gap-1 items-center">
              <div>
                <p className="text-xs font-bold">{thisFolderSnippets.length}</p>
              </div>
              <div>
                <p className="text-xs font-bold">SNIP</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SnippetsCounter;
