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
import Link from "next/link";
import { DeleteDocumentIcon } from "../SVG/DeleteDocumentIcon";
import { EditDocumentIcon } from "../SVG/EditDocumentIcon";
import { LoginIcon } from "../SVG/LoginIcon";
import { PaperFail } from "../SVG/PaperFail";
import { MdRefresh } from "react-icons/md";
import { TbSortDescending } from "react-icons/tb";
import { DeleteErrorSnippet } from "../NonModal/DeleteErrorSnippet";
import LatestHeading from "../Heading/LatestHeading";
import Snippet from "../Display/Snippet";

const MyCodeSnippets = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [myErrorSnippets, setMyErrorSnippets] = useState();
  const [lastSnippet, setLastSnippet] = useState();
  const [update, setUpdate] = useState(false);

  const [truncate, setTruncate] = useState(50);

  const [isEmpty, setIsEmpty] = useState(false);

  const [allOpenStates, setAllOpenStates] = useState({});

  const getMyErrorSnippets = async () => {
    try {
      const snippetQuery = query(
        collection(db, "ErrorSnippetsData1"),
        where(new FieldPath("userData", "uid"), "==", user?.uid),
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
        setMyErrorSnippets(snippets);
        setLoading(false);
      } else {
        setIsEmpty(true);
        setLoading(false);
      }
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  const fetchMore = async () => {
    setLoading(true);
    try {
      const snippetQuery = query(
        collection(db, "ErrorSnippetsData1"),
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

        setMyErrorSnippets((prev) => [...prev, ...snippets]);
        setLoading(false);
      } else {
        setIsEmpty(true);
        setLoading(false);
      }
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getMyErrorSnippets();
    }
  }, [user, update]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "ErrorSnippetsData1", id));
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
    <div className="min-h-[70vh]">
      {user && (
        <div>
          <>
            <LatestHeading headingType={"Alle fejl SNIPS"} />
          </>

          <div className="flex flex-col gap-4">
            {myErrorSnippets && (
              <>
                {myErrorSnippets?.map((snippet) => (
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

            {loading ? (
              <div className="flex justify-center items-center h-[20vh]">
                <Loading size="lg" />
              </div>
            ) : (
              <div>
                {!myErrorSnippets?.length > 0 && (
                  <div className="flex justify-center mt-10">
                    <Text b size={13} transform="uppercase">
                      Du har ingen kode SNIPS! 😔
                    </Text>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {!user && <NoUser />}
    </div>
  );
};

export default MyCodeSnippets;
