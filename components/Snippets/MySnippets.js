import { Button, Collapse, Loading, Text } from "@nextui-org/react";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { auth, db } from "../../Firebase/clientApp";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import NoUser from "../NoPage/NoUser";

const MySnippets = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [mySnippets, setMySnippets] = useState();

  const getMySnippets = async () => {
    try {
      const postsQuery = query(
        collection(db, "SnippetsData"),
        where("userId", "==", user?.uid),
        orderBy("postedAt", "desc")
      );
      const snippetDocs = await getDocs(postsQuery);
      const snippets = snippetDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMySnippets((prev) => ({
        ...prev,
        snips: snippets,
      }));
      setLoading(false);
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  useEffect(() => {
    getMySnippets();
  }, [user]);
  return (
    <div>
      {user ? (
        <div className="min-h-[80vh]">
          <div className="mb-4">
            <Button.Group color="secondary" size="sm">
              <Button>Koder</Button>
              <Button disabled>Fejl</Button>
              <Button disabled>Noter</Button>
            </Button.Group>
          </div>
          <div>
            <Collapse.Group shadow>
              {mySnippets?.snips?.map((item) => (
                <Collapse
                  key={item.id}
                  title={<Text h4>{item.title}</Text>}
                  subtitle={item.description}
                >
                  <div>
                    <SyntaxHighlighter language="javascript" style={oneLight}>
                      {item.code}
                    </SyntaxHighlighter>
                  </div>
                </Collapse>
              ))}
            </Collapse.Group>
          </div>
          {loading && (
            <div className="flex justify-center items-center h-[20vh]">
              <Loading size="lg" />
            </div>
          )}
        </div>
      ) : (
        <div>
          <NoUser />
        </div>
      )}
    </div>
  );
};

export default MySnippets;
