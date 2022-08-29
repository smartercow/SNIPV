import {
  Badge,
  Button,
  Card,
  Collapse,
  Loading,
  Popover,
  Text,
} from "@nextui-org/react";
import {
  collection,
  deleteDoc,
  doc,
  FieldPath,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
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
import { DeleteDocumentIcon } from "../SVG/DeleteDocumentIcon";
import { DeleteSnippet } from "../NonModal/DeleteSnippet";
import { EditDocumentIcon } from "../SVG/EditDocumentIcon";
import { DocumentIcon } from "../SVG/DocumentIcon";
import { LoginIcon } from "../SVG/LoginIcon";

const MyCodeSnippets = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [myCodeSnippets, setMyCodeSnippets] = useState();

  const [update, setUpdate] = useState(false);

  const [truncate, setTruncate] = useState(50);

  const getMySnippets = async () => {
    try {
      const snippetQuery = query(
        collection(db, "CodeSnippetsData1"),
        where(new FieldPath("userData", "uid"), "==", user?.uid),
        orderBy("postedAt", "desc")
      );
      const snippetDocs = await getDocs(snippetQuery);
      const snippets = snippetDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMyCodeSnippets((prev) => ({
        ...prev,
        snips: snippets,
      }));
      setLoading(false);
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getMySnippets();
    }
  }, [user, update]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "CodeSnippetsData1", id));
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

  console.log(myCodeSnippets);

  return (
    <div className="min-h-[80vh]">
      {user ? (
        <div className="flex flex-col gap-4">
          {myCodeSnippets?.snips?.map((item) => (
            <div key={item.id} className="hoverable-item flex gap-2">
              <Link href={`/s/${item.id}`} key={item.id}>
                <div key={item.id} className="flex gap-2 w-full cursor-pointer">
                  <Card variant="flat" css={{ mw: "100%", padding: 0 }}>
                    <div className="cardHover hoverable-item p-2 border-b rounded-xl w-full">
                      <div className="flex gap-4 items-center justify-center">
                        <div className="px-1">
                          <div>
                            <DocumentIcon
                              fill="#0072F5"
                              className="cursor-pointer"
                              width={50}
                              height={50}
                            />
                          </div>
                          <div>
                            {item.folder.folderSnippetType === "code" && (
                              <div className="pr-[.60rem]">
                                <Badge isSquared color="primary" variant="flat">
                                  KODE
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="w-full flex flex-col gap-3 MonoHeading">
                          <div>
                            <p className="text-[#031B4E] text-lg font-[500]">
                              {excerpt(item.title, 60)}
                            </p>
                          </div>
                          {item.description && (
                            <div className="-mt-2">
                              <h6 className="text-[#031b4ed4] truncateHeading ">
                                {excerpt(item.description, truncate)}
                              </h6>
                            </div>
                          )}
                          <div className="-mt-2 flex justify-between gap-1">
                            <div>
                              <h6 className="text-[#031b4e9f] whitespace-nowrap hidden sm:inline">
                                MAPPER /
                                {excerpt(item.folder?.folderName, truncate)}
                              </h6>
                            </div>
                            <div>
                              <h6 className="text-[#031b4e9f] whitespace-nowrap">
                                {/* {new Date(item.postedAt).toDate()} */}
                                27/08/2022
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="hoverable-show">
                          <LoginIcon width={30} height={30} fill="#0072F5" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </Link>
              <div className="hoverable-show flex flex-col gap-1 justify-center items-center">
                <div>
                  <Button auto light>
                    <EditDocumentIcon
                      fill="#0072F5"
                      className="cursor-pointer"
                      width={26}
                      height={26}
                    />
                  </Button>
                </div>
                <div>
                  <Popover placement="top">
                    <Popover.Trigger>
                      <Button auto light>
                        <DeleteDocumentIcon
                          fill="#F31260"
                          className="cursor-pointer"
                          width={26}
                          height={26}
                        />
                      </Button>
                    </Popover.Trigger>
                    <Popover.Content>
                      <DeleteSnippet item={item} handleDelete={handleDelete} />
                    </Popover.Content>
                  </Popover>
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
