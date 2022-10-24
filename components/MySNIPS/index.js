import {
  collection,
  deleteDoc,
  doc,
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
import { auth, db } from "../../firebase/clientApp";
import { MdRefresh } from "react-icons/md";
import LatestHeading from "../Heading/LatestHeading";
import Snippet from "../Display/Snippet";
import { useRouter } from "next/router";
import LoadingSNIPS from "../LoadingState/LoadingSNIPS";
import { Button, Text } from "@chakra-ui/react";

const MySNIPS = ({ selectedSubFolder, loadingMain, setLoadingMain }) => {
  const [user] = useAuthState(auth);
  const { asPath } = useRouter();

  const [loadingSub, setLoadingSub] = useState(false);
  const [myCodeSnippets, setMyCodeSnippets] = useState([]);
  const [lastSnippet, setLastSnippet] = useState();
  const [update, setUpdate] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);

  const [col, setCol] = useState("");

  useEffect(() => {
    if (asPath.startsWith("/snips/codes")) {
      setCol("CodeSnippetsData1");
    }
    if (asPath.startsWith("/snips/errors")) {
      setCol("ErrorSnippetsData1");
    }
    if (asPath.startsWith("/setups")) {
      setCol("SetupData");
    }
  }, [asPath]);

  const getMySnippets = async () => {
    setLoadingMain(false);
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
          setMyCodeSnippets(snippets);
          setLoadingSub(false);
        } else {
          setIsEmpty(true);
          setLoadingSub(false);
        }
      }
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  const fetchMore = async () => {
    setLoadingSub(true);
    try {
      if (col) {
        const snippetQuery = query(
          collection(db, col),
          where(new FieldPath("userData", "uid"), "==", user?.uid),
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

          setMyCodeSnippets((prev) => [...prev, ...snippets]);
          setLoadingSub(false);
        } else {
          setIsEmpty(true);
          setLoadingSub(false);
        }
      }
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  useEffect(() => {
    setMyCodeSnippets([]);

    if (user && selectedSubFolder) {
      getMySnippets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, selectedSubFolder]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "CodeSnippetsData1", id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  return (
    <div className="w-full">
      {selectedSubFolder?.mainFolder?.mainFolderId && (
        <>
          <>
            <LatestHeading headingType={`${selectedSubFolder.label}`} />
          </>

          <div className="w-full">
            <div className="flex flex-col gap-4">
              {Object.keys(myCodeSnippets).length > 0 && (
                <>
                  {myCodeSnippets?.map((snippet) => (
                    <Snippet
                      key={snippet.id}
                      handleDelete={handleDelete}
                      snippet={snippet}
                    />
                  ))}

                  {!isEmpty && (
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
                      {!myCodeSnippets?.length > 0 && (
                        <div className="flex justify-center mt-10">
                          <Text>Du har ingen SNIPS i denne mappe! 😔</Text>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MySNIPS;
