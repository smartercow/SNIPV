import {
  collection,
  FieldPath,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Firebase/clientApp";
import { Button, Card, Text } from "@nextui-org/react";

const Folder = () => {
  const [user] = useAuthState(auth);
  const {
    query: { id },
  } = useRouter();

  const [loading, setLoading] = useState(true);
  const [thisFolderSnippets, setThisFolderSnippets] = useState();

  const getFolder = async () => {
    try {
      const snippetsColRef = collection(db, "CodeSnippetsData1");
      const snippetsQuery = query(
        snippetsColRef,
        where(new FieldPath("folder", "folderId"), "==", id)
      );

      onSnapshot(snippetsQuery, (snapshot) => {
        let snippets = [];
        snapshot.docs.forEach((doc) => {
          snippets.push({ ...doc.data(), id: doc.id });
        });
        setThisFolderSnippets(snippets);
      });
    } catch (error) {
      console.log("getsnippet error", error.message);
    }
  };

  useEffect(() => {
    if (id && user) {
      getFolder();
    }
  }, [id, user]);

  /* console.log(folder); */
  console.log("This folder snips:", thisFolderSnippets);
  return (
    <div>
      {thisFolderSnippets && (
        <div className="flex flex-col gap-4">
          {thisFolderSnippets.map((snips) => (
            <div key={snips.id} className="">
              <Link href={`/s/${snips.id}`}>
                <Card isPressable variant="bordered" css={{ mw: "100%" }}>
                  <Card.Body>
                    <div className="flex items-center gap-3">
                      <div className="w-auto">
                        <h3>-</h3>
                      </div>
                      <div className="w-full">
                        <div>
                          <Text h4>{snips.title}</Text>
                        </div>
                        <div>
                          <Text weight="semibold" color="#889096">
                            {snips.description}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
