import {
  collection,
  FieldPath,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/clientApp";

const ErrorSnippetsCounter = ({ id }) => {
  const [thisFolderSnippets, setThisFolderSnippets] = useState();
  const getThisFolderSnippets = async () => {
    try {
      const snippetsColRef = collection(db, "ErrorSnippetsData1");
      const snippetsQuery = query(
        snippetsColRef,
        where(new FieldPath("folder", "subFolderId"), "==", id)
      );

      onSnapshot(snippetsQuery, (snapshot) => {
        let snippets = [];
        snapshot.docs.forEach((doc) => {
          snippets.push({ ...doc.data(), id: doc.id });
        });
        setThisFolderSnippets(snippets);
      });
    } catch (error) {
      console.log("Get snippets error", error.message);
    }
  };

  useEffect(() => {
    if (id) {
      getThisFolderSnippets();
    }
  }, [id]);
  return (
    <div className="text-[#031b4eac] bg-[#ECF4FF] py-[.35rem] px-3 rounded-lg whitespace-nowrap">
      {thisFolderSnippets && (
        <div>
          {thisFolderSnippets.length > 0 ? (
            <div className="flex gap-1 items-center">
              <div>
                <p className="text-xs font-bold">{thisFolderSnippets.length}</p>
              </div>
              {/*               <div>
                <p className="text-xs font-bold">SNIPS</p>
              </div> */}
            </div>
          ) : (
            <div>
              <p className="text-xs font-bold">0</p>
            </div>
          )}

          {/*           {thisFolderSnippets.length === 0 && (
              <div>
                <p className=" text-xs font-bold">0 SNIPS</p>
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
          )} */}
        </div>
      )}
    </div>
  );
};

export default ErrorSnippetsCounter;
