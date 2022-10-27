import { Box } from "@chakra-ui/react";
import { Card, Loading, Text } from "@nextui-org/react";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/clientApp";
import NoUser from "../NoPage/NoUser";
import Feed from "./Feed";
import Post from "./Post";
import Tags from "./Tags";

const HomePage = () => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState(true);
  const [snippets, setSnippets] = useState([]);
  const [tags, setTags] = useState([]);

  const getSnippets = async () => {
    try {
      const codeQuery = query(collection(db, "CodeSnippetsData1"));

      const errorQuery = query(collection(db, "ErrorSnippetsData1"));

      const setupQuery = query(collection(db, "SetupsData"));

      const codeDocs = await getDocs(codeQuery);
      const errorDocs = await getDocs(errorQuery);
      const setupDocs = await getDocs(setupQuery);

      Promise.all([codeDocs, errorDocs, setupDocs])
        .then((PromiseResults) => {
          const mergedSnippets = [];

          PromiseResults.forEach((snapshot) => {
            snapshot.forEach((doc) => {
              mergedSnippets.push({ ...doc.data(), id: doc.id });
            });
          });
          return mergedSnippets;
        })
        .then((mergedData) =>
          mergedData.sort((a, b) => a.postedAt - b.postedAt).reverse()
        )
        .then((sortedSnippets) => {
          setSnippets((prev) => ({
            ...prev,
            snips: sortedSnippets,
          }));
        })
        .catch((e) => console.log("error", e));
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  useEffect(() => {
    getSnippets();
    setLoading(true);
    const snapSub = onSnapshot(
      collection(db, "CodeSnippetsData1"),
      (snapshot) => {
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      snapSub();
      getSnippets();
    };
  }, [user]);

  return (
    <div className="w-full">
      {user ? (
        <>
          {snippets.snips && (
            <div className="flex gap-6 pt-3">
              <div className="flex flex-col gap-2 w-full">
                <Post />

                <div className="w-full">
                  <Feed
                    user={user}
                    loading={loading}
                    snippet={snippets}
                    tags={tags}
                  />
                </div>
              </div>
              <div className="hidden md:inline-flex">
                <Tags snippets={snippets} headTitle={`Tags`} tags={tags} />
              </div>
            </div>
          )}
          {loading && (
            <div className="flex justify-center items-center h-[20vh]">
              <Loading size="lg" />
            </div>
          )}
        </>
      ) : (
        <NoUser />
      )}
    </div>
  );
};

export default HomePage;
