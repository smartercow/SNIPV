import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase/clientApp";
import Link from "next/link";
import { LoginIcon } from "../../../components/SVG/LoginIcon";
import { PaperFail } from "../../../components/SVG/PaperFail";
import { MdRefresh } from "react-icons/md";
import { Text } from "@chakra-ui/react";
import Snippet from "../../../components/Display/Snippet";
import LoadingSNIPS from "../../../components/LoadingState/LoadingSNIPS";

const SetupTagPage = () => {
  const {
    query: { id },
  } = useRouter();

  const [user] = useAuthState(auth);

  const [errorTagSnippetsSearch, setErrorTagSnippetsSearch] = useState();
  const [loading, setLoading] = useState(true);

  const getMySnippets = async () => {
    try {
      const snippetQuery = query(
        collection(db, "ErrorSnippetsData1"),
        where("tags", "array-contains", id),
        orderBy("postedAt", "desc")
      );
      const snippetDocs = await getDocs(snippetQuery);

      const snippets = snippetDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setErrorTagSnippetsSearch(snippets);
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
          <div className="flex gap-2 items-center">
            <Text>Kode snips med tag:</Text>
            <Text color="primary" transform="lowercase" h4>
              {id}
            </Text>
          </div>
          <div>
            <div>
              <div className="flex flex-col gap-4">
                {errorTagSnippetsSearch?.map((snippet, index) => (
                  <Snippet key={snippet.id} snippet={snippet} />
                ))}

                {loading && <LoadingSNIPS size={10} />}

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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetupTagPage;
