import { Text } from "@nextui-org/react";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Firebase/clientApp";
import NoUser from "../NoPage/NoUser";
import Feed from "./Feed";

const HomePage = () => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState(true);
  const [snippets, setSnippets] = useState([]);
  const [tags, setTags] = useState([]);


  const getSnippets = async () => {
    try {
      const postsQuery = query(
        collection(db, "SnippetsData"),
        where("isPublic", "==", true),
        orderBy("postedAt", "desc")
      );
      const snippetDocs = await getDocs(postsQuery);
      const snippets = snippetDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSnippets((prev) => ({
        ...prev,
        snips: snippets,
      }));
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  useEffect(() => {
    getSnippets();
  }, [user]);

  return (
    <div>
      {user ? (
        <div>
          {snippets ? (
            <Feed user={user} snippets={snippets} tags={tags} />
          ) : (
            <div>
              <Text>Du har ingen snippets endnu</Text>
            </div>
          )}
        </div>
      ) : (
        <NoUser />
      )}
    </div>
  );
};

export default HomePage;
