import { Box, Button, Text } from "@chakra-ui/react";
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
import { useRecoilValue } from "recoil";
import { updateStateAtom } from "../../atoms/updateStateAtom";
import { auth, db } from "../../firebase/clientApp";
import Snippet from "../Display/Snippet";
import LoadingSNIPS from "../LoadingState/LoadingSNIPS";

const AllType = ({ setLoadingMain, col, snip, handleDelete }) => {
  const [user] = useAuthState(auth);

  const update = useRecoilValue(updateStateAtom);

  const [loadingSub, setLoadingSub] = useState(false);
  const [mySNIPS, setMySNIPS] = useState([]);
  const [lastSnippet, setLastSnippet] = useState();
  const [isEmpty, setIsEmpty] = useState(false);

  const getMySnippets = async () => {
    setLoadingMain(false);
    setLoadingSub(true);
    try {
      if (col) {
        const snippetQuery = query(
          collection(db, col),
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
    getMySnippets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, update, col]);

  return (
    <Box px={4} pt={3} pb={4} borderBottomRadius="md" boxShadow="md" bg="white">
      <div className="flex flex-col gap-4">
        {Object.keys(mySNIPS).length > 0 && (
          <>
            {mySNIPS?.map((snippet) => (
              <Snippet
                key={snippet.id}
                snippet={snippet}
                handleDelete={handleDelete}
                col={col}
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

        {loadingSub && <LoadingSNIPS size={14} />}

        {!loadingSub && !mySNIPS?.length > 0 && (
          <div className="flex justify-center mt-10">
            <Text variant="nonLabel">Du har ingen {snip}! 😔</Text>
          </div>
        )}
      </div>
    </Box>
  );
};

export default AllType;
