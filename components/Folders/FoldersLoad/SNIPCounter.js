import {
  collection,
  FieldPath,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/clientApp";

const CodeSnippetsCounter = ({ id }) => {
  const { asPath } = useRouter();

  const [col, setCol] = useState("");

  useEffect(() => {
    if (
      asPath.startsWith("/snips/codes") ||
      asPath.startsWith("/upsert/code")
    ) {
      setCol("CodeSnippetsData1");
    }
    if (
      asPath.startsWith("/snips/errors") ||
      asPath.startsWith("/upsert/error")
    ) {
      setCol("ErrorSnippetsData1");
    }
    if (asPath.startsWith("/setups") || asPath.startsWith("/upsert/setup")) {
      setCol("SetupData");
    }
  }, [asPath]);

  const [thisFolderSnippets, setThisFolderSnippets] = useState();
  const getThisFolderSnippets = async () => {
    try {
      const snippetsColRef = collection(db, col);
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
      console.log("getsnippet error", error.message);
    }
  };

  console.log("COOL", col);

  useEffect(() => {
    if (id && col) {
      getThisFolderSnippets();
    }
  }, [id, col]);

  return (
    <div className="text-[#031b4eac] bg-[#ECF4FF] py-[.35rem] px-3 rounded-lg whitespace-nowrap">
      {thisFolderSnippets && (
        <div>
          {thisFolderSnippets.length > 0 ? (
            <div className="flex gap-1 items-center">
              <div>
                <p className="text-xs font-bold">{thisFolderSnippets.length}</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs font-bold">0</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeSnippetsCounter;
