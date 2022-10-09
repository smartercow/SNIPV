import { Badge, Button, Card, Loading, Popover, Text } from "@nextui-org/react";
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
import NoUser from "../NoPage/NoUser";
import { MdRefresh } from "react-icons/md";
import LatestHeading from "../Heading/LatestHeading";
import Snippet from "../Display/Snippet";

const MyCodeSnippets = ({
  selectedSubFolder,
  loadingMain,
  setLoadingMain,
}) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [loadingSub, setLoadingSub] = useState(false);
  const [myCodeSnippets, setMyCodeSnippets] = useState([]);
  const [lastSnippet, setLastSnippet] = useState();
  const [update, setUpdate] = useState(false);

  const [truncate, setTruncate] = useState(50);

  const [isEmpty, setIsEmpty] = useState(false);

  const getMySnippets = async () => {
    setLoadingMain(false)
    setLoadingSub(true)
    try {
      const snippetQuery = query(
        collection(db, "CodeSnippetsData1"),
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
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  const fetchMore = async () => {
    setLoadingSub(true);
    try {
      const snippetQuery = query(
        collection(db, "CodeSnippetsData1"),
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

  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 1100px)").matches) {
        setTruncate(90);
      } else if (window.matchMedia("(min-width: 900px)").matches) {
        setTruncate(60);
      } else if (window.matchMedia("(min-width: 600px)").matches) {
        setTruncate(40);
      } else if (window.matchMedia("(min-width: 400px)").matches) {
        setTruncate(20);
      }
    });
  }, [truncate]);

  return (
    <div className="min-h-[70vh] w-full">
      {selectedSubFolder?.mainFolder?.mainFolderId && (
        <>
          <>
            <LatestHeading
              headingType={`${selectedSubFolder.label}`}
            />
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
                      <Button size="sm" onClick={fetchMore}>
                        <MdRefresh />
                        HENT MERE
                      </Button>
                    </div>
                  )}
                </>
              )}

              {loadingMain ? (
                <div className="flex justify-center mt-10">
                  <Text b size={13} transform="uppercase">
                    Valg en undermappe!
                  </Text>
                </div>
              ) : (
                <>
                  {loadingSub ? (
                    <div className="flex justify-center items-center h-[20vh]">
                      <Loading size="lg" />
                    </div>
                  ) : (
                    <>
                      {!myCodeSnippets?.length > 0 && (
                        <div className="flex justify-center mt-10">
                          <Text b size={13} transform="uppercase">
                            Du har ingen SNIPS i denne mappe! 😔
                          </Text>
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

export default MyCodeSnippets;
