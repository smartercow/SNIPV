import { Button, Text } from "@chakra-ui/react";
import {
  collection,
  FieldPath,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdRefresh } from "react-icons/md";
import { useRecoilState } from "recoil";
import { mainFolderDeleteUpdateState } from "../../atoms/mainFolderDeleteUpdateState";
import { mainFolderEditUpdateState } from "../../atoms/mainFolderEditUpdateState";
import { auth, db } from "../../firebase/clientApp";
import Snippet from "../Display/Snippet";
import FoldersLoad from "../Folders/FoldersLoad";
import LatestHeading from "../Heading/LatestHeading";
import LoadingSNIPS from "../LoadingState/LoadingSNIPS";

const Category = ({
  mainFolder,
  loadingMain,
  setLoadingMain,
  col,
  handleDelete,
  selectedSubFolder,
}) => {
  const [user] = useAuthState(auth);

  const [loadingSub, setLoadingSub] = useState(false);
  const [mySNIPS, setMySNIPS] = useState([]);
  const [lastSnippet, setLastSnippet] = useState();
  const [isEmpty, setIsEmpty] = useState(false);

  const getMySnippets = async () => {
    setLoadingSub(true);
    try {
      if (Object.keys(selectedSubFolder).length > 0 && col) {
        const snippetQuery = query(
          collection(db, col),
          where(new FieldPath("userData", "uid"), "==", user?.uid),
          where(
            new FieldPath("folder", "subFolderId"),
            "==",
            selectedSubFolder.subFolderId
          ),
          orderBy("postedAt", "desc"),
          limit(10)
        );
        const snippetDocs = await getDocs(snippetQuery);

        const colEmpty = snippetDocs.docs.length === 0;

        if (snippetDocs.docs.length < 10) {
          setIsEmpty(true);
        }

        if (!colEmpty) {
          const lastDoc = snippetDocs.docs[snippetDocs.docs.length - 1];
          const snippets = snippetDocs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setLastSnippet(lastDoc);
          setMySNIPS(snippets);
          setLoadingSub(false);
        } else {
          setIsEmpty(true);
          setLoadingSub(false);
        }
      }
    } catch (error) {
      console.log("Get SNIPS error!", error.message);
    }
  };

  const fetchMore = async () => {
    setLoadingSub(true);
    try {
      if (col) {
        const snippetQuery = query(
          collection(db, col),
          where(new FieldPath("userData", "uid"), "==", user?.uid),
          where(
            new FieldPath("folder", "subFolderId"),
            "==",
            selectedSubFolder.subFolderId
          ),
          orderBy("postedAt", "desc"),
          startAfter(lastSnippet),
          limit(10)
        );
        const snippetDocs = await getDocs(snippetQuery);

        const colEmpty = snippetDocs.size === 0;

        if (!colEmpty) {
          const lastDoc = snippetDocs.docs[snippetDocs.docs.length - 1];
          const snippets = snippetDocs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setLastSnippet(lastDoc);

          setMySNIPS((prev) => [...prev, ...snippets]);
          setLoadingSub(false);
        } else {
          setIsEmpty(true);
          setLoadingSub(false);
        }
      }
    } catch (error) {
      console.log("Fetch more SNIPS error!", error.message);
    }
  };

  useEffect(() => {
    setMySNIPS([]);

    if (user && selectedSubFolder) {
      setLoadingMain(false);
      getMySnippets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, selectedSubFolder]);

  console.log("col", col);

  return (
    <div className="flex flex-col gap-4 w-full">
      {Object.keys(mySNIPS).length > 0 && (
        <>
          {mySNIPS?.map((snippet) => (
            <Snippet
              key={snippet.id}
              snippet={snippet}
              handleDelete={handleDelete}
            />
          ))}

          {!isEmpty && !loadingSub && (
            <div className="flex justify-center">
              <Button onClick={fetchMore}>
                <MdRefresh />
                HENT MERE
              </Button>
            </div>
          )}
        </>
      )}

      {loadingMain ? (
        <div className="flex justify-center mt-10">
          <Text>Valg en undermappe!</Text>
        </div>
      ) : (
        <>
          {loadingSub ? (
            <LoadingSNIPS />
          ) : (
            <>
              {!mySNIPS?.length > 0 && (
                <div className="flex justify-center mt-10">
                  <Text>Du har ingen SNIPS i denne mappe! 😔</Text>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Category;
