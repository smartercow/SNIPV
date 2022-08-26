import { Button, Card, Collapse, Loading, Text } from "@nextui-org/react";
import {
  collection,
  deleteDoc,
  doc,
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
import Link from "next/link";
import Image from "next/image";
import { excerpt } from "../../utilities/excerpt";
import Document from "../../components/SVG/Iconly/bulk/Document.svg";
import { DeleteDocumentIcon } from "../SVG/DeleteDocumentIcon";

const MyCodeSnippets = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [myCodeSnippets, setMyCodeSnippets] = useState();

  const [update, setUpdate] = useState(false)

  const getMySnippets = async () => {
    try {
      const snippetQuery = query(
        collection(db, "CodeSnippetsData1"),
        where("userId", "==", user?.uid),
        orderBy("postedAt", "desc")
      );
      const snippetDocs = await getDocs(snippetQuery);
      const snippets = snippetDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("snippetdocs", snippets);

      setMyCodeSnippets((prev) => ({
        ...prev,
        snips: snippets,
      }));
      setLoading(false);
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "CodeSnippetsData1", id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getMySnippets();
    }
  }, [user, update]);
  console.log(myCodeSnippets);
  return (
    <div className="min-h-[80vh]">
      {user ? (
        <div className="flex flex-col gap-4">
          {myCodeSnippets?.snips?.map((item) => (
            <div key={item.id} className="flex gap-2">
              <Link href={`/s/${item.id}`}>
                <Card variant="flat" css={{ mw: "100%", padding: 0 }}>
                  <div className="cardHover p-2 border-b rounded-xl w-full">
                    <div className="flex gap-4 items-center">
                      <div className="w-auto">
                        <Image
                          src={Document}
                          height={40}
                          width={40}
                          fill="responsive"
                          alt=""
                        />
                      </div>

                      <div className="w-full flex flex-col gap-3 MonoHeading">
                        <div>
                          <p className="text-[#4D5B7C] text-lg font-[500]">
                            {excerpt(item.title, 60)}
                          </p>
                        </div>
                        {item.description && (
                          <div className="-mt-2">
                            <h6
                              className="text-gray-500 whitespace-nowrap"
                              color="#889096"
                            >
                              {excerpt(item.description, 60)} <br />
                            </h6>
                          </div>
                        )}
                      </div>
                      {/*                       <div className="hoverable-show">
                        <Image src={Login} fill="responsive" alt="" />
                      </div> */}
                    </div>
                  </div>
                </Card>
              </Link>
              <div className="flex flex-col gap-1 justify-center items-center">
                <div>edit</div>
                <div>
                  <DeleteDocumentIcon
                    fill="#F31260"
                    className="cursor-pointer"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

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

export default MyCodeSnippets;
