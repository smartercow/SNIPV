import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase/clientApp";
import Snippet from "../../../components/Display/Snippet";
import LoadingSNIPS from "../../../components/LoadingState/LoadingSNIPS";
import { Box } from "@chakra-ui/react";
import LatestHeading from "../../../components/Heading/LatestHeading";
const CodeTagPage = () => {
  const {
    query: { id },
  } = useRouter();

  const [user] = useAuthState(auth);

  const [codeTagSnippetsSearch, setCodeTagSnippetsSearch] = useState();
  const [loading, setLoading] = useState(true);

  const getMySnippets = async () => {
    try {
      const snippetQuery = query(
        collection(db, "CodeSnippetsData1"),
        where("tags", "array-contains", id),
        orderBy("postedAt", "desc")
      );
      const snippetDocs = await getDocs(snippetQuery);

      const snippets = snippetDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCodeTagSnippetsSearch(snippets);
      setLoading(false);
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getMySnippets();
    }
  }, [user]);

  return (
    <div className="min-h-[70vh]">
      {user && (
        <div>
          <LatestHeading headingType={`Kode SNIPS med tag: ${id}`} />
          <div>
            <Box
              px={4}
              pt={2}
              pb={4}
              borderBottomRadius="md"
              boxShadow="md"
              bg="white"
            >
              <div className="flex flex-col gap-4">
                {codeTagSnippetsSearch?.map((snippet) => (
                  <Snippet key={snippet.id} snippet={snippet} />
                ))}

                {loading && (
                  <div className="flex justify-center items-center h-[20vh]">
                    <LoadingSNIPS size={12} />
                  </div>
                )}

                {/*           {!loading && (
            <>
              {!isEmpty && (
                <div className="flex justify-center">
                  <Button size="sm" onClick={fetchMore}>
                    <MdRefresh />HENT MERE
                  </Button>
                </div>
              )}
            </>
          )} */}
              </div>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeTagPage;
