import { Badge, Card, Loading, Popover } from "@nextui-org/react";
import {
  collection,
  deleteDoc,
  doc,
  FieldPath,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LatestHeading from "../../components/Heading/LatestHeading";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import { auth, db } from "../../firebase/clientApp";
import Snippet from "../../components/Display/Snippet";
import { Text } from "@chakra-ui/react";
import LoadingSNIPS from "../../components/LoadingState/LoadingSNIPS";

const MySnippets = () => {
  const [user] = useAuthState(auth);

  const [myCodeSnippets, setMyCodeSnippets] = useState();
  const [myErrorSnippets, setMyErrorSnippets] = useState();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  const getMyCodeSnippets = async () => {
    try {
      const snippetQuery = query(
        collection(db, "CodeSnippetsData1"),
        where(new FieldPath("userData", "uid"), "==", user?.uid),
        orderBy("postedAt", "desc"),
        limit(4)
      );

      const snippetDocs = await getDocs(snippetQuery);
      const snippets = snippetDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMyCodeSnippets(snippets);
      setLoading(false);
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  const getMyErrorSnippets = async () => {
    try {
      const snippetQuery = query(
        collection(db, "ErrorSnippetsData1"),
        where(new FieldPath("userData", "uid"), "==", user?.uid),
        orderBy("postedAt", "desc"),
        limit(4)
      );

      const snippetDocs = await getDocs(snippetQuery);
      const snippets = snippetDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMyErrorSnippets(snippets);
      setLoading(false);
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getMyCodeSnippets();
      getMyErrorSnippets();
    }
  }, [user, update]);

  const handleCodeSnippetDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "CodeSnippetsData1", id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  const handleErrorSnippetDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "ErrorSnippetsData1", id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  return (
    <div>
      {user && (
        <>
          <Head>
            <title>Mine SNIPS - SNIPV</title>
            <meta name="description" content="Created by Peter G" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <>
            <>
              <SnippetsTypeLinks />
            </>

            <>
              <LatestHeading headingType={"Seneste kode SNIPS"} />
            </>

            <div>
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex flex-col gap-2 w-full">
                    {myCodeSnippets?.length > 0 && (
                      <div className="flex flex-col gap-4">
                        {myCodeSnippets.map((snippet) => (
                          <Snippet
                            key={snippet.id}
                            handleDelete={handleCodeSnippetDelete}
                            snippet={snippet}
                          />
                        ))}
                        <div className="text-center">
                          <Link href="/snips/codes">
                            <Text className="cursor-pointer hover:underline">
                              SE ALLE
                            </Text>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {loading ? (
                    <div className="flex justify-center items-center h-[20vh]">
                      <Loading size="lg" />
                    </div>
                  ) : (
                    <div>
                      {!myCodeSnippets?.length > 0 && (
                        <div className="flex justify-center mt-10">
                          <Text size={13}>Du har ingen kode SNIPS! 😔</Text>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <>
                    <LatestHeading headingType={"Seneste fejl SNIPS"} />
                  </>

                  <div className="flex flex-col gap-2 w-full">
                    {myErrorSnippets?.length > 0 && (
                      <div className="flex flex-col gap-3">
                        {myErrorSnippets.map((snippet) => (
                          <Snippet
                            key={snippet.id}
                            handleDelete={handleErrorSnippetDelete}
                            snippet={snippet}
                          />
                        ))}
                        <div className="text-center">
                          <Link href="/snips/errors">
                            <Text className="cursor-pointer hover:underline">
                              SE ALLE
                            </Text>
                          </Link>
                        </div>
                      </div>
                    )}

                    {loading ? (
                      <LoadingSNIPS />
                    ) : (
                      <div>
                        {!myErrorSnippets?.length > 0 && (
                          <div className="flex justify-center mt-10">
                            <Text size={13}>Du har ingen fejl SNIPS! 😔</Text>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default MySnippets;
