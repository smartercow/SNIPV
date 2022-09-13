import {
  Badge,
  Button,
  Card,
  Collapse,
  Loading,
  Popover,
  Text,
  Tooltip,
  User,
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
          {myCodeSnippets?.snips?.map((snip, index) => (
            <div key={index}>
              <Link href={`/s/${snip.id}`}>
                <div className="hoverable-item">
                  <Card
                    isPressable
                    variant="flat"
                    css={{ mw: "100%", padding: "$0" }}
                    key={snip.id}
                  >
                    <div className="cardHover bg-[#F1F7FF] hoverable-item flex gap-3 items-center p-2 border-b rounded-xl w-full">
                      <div className="w-full flex flex-col gap-2">
                        <div className="flex items-center">
                          <div className="">
                            <Tooltip
                              content={snip.userData.username}
                              color="primary"
                            >
                              <User
                                src={snip.userData?.photoURL}
                                zoomed
                                squared
                                pointer
                              />
                            </Tooltip>
                          </div>

                          <div className="w-full flex flex-col justify-center gap-3 MonoHeading">
                            <div className="w-full">
                              <p className="text-[#031B4E] text-lg font-[500] truncateText">
                                {snip.title}
                              </p>
                            </div>
                            {snip.description && (
                              <div className="-mt-2 h-5">
                                <h6 className="text-[#031b4ed4] whitespace-nowrap MonoHeading truncateText">
                                  {snip.description}
                                </h6>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-24 flex justify-center">
                            {snip.folder.folderSnippetType === "code" && (
                              <div className="pr-[.60rem]">
                                <Badge isSquared color="primary" variant="flat">
                                  KODE
                                </Badge>
                              </div>
                            )}
                            {snip.folder.folderSnippetType === "error" && (
                              <div className="pr-[.60rem]">
                                <Badge isSquared color="error" variant="flat">
                                  FEJL
                                </Badge>
                              </div>
                            )}
                          </div>
                          <div className="w-full MonoHeading">
                            <div className="flex gap-2">
                              <div
                                className={`l${snip.category.langId} lBadge rounded-3xl flex justify-center items-center`}
                              >
                                <p className="text-xs MonoHeading font-semibold lowercase">
                                  {snip.folder.language?.label}
                                </p>
                              </div>
                              {snip.folder?.framework.frameworkId && (
                                <div
                                  className={`f${snip.folder.framework.frameworkId} lBadge rounded-3xl flex justify-center items-center`}
                                >
                                  <p className="text-xs MonoHeading font-semibold lowercase">
                                    {snip.folder.framework?.label}
                                  </p>
                                </div>
                              )}
                              {snip?.folder?.processor.processorId && (
                                <div
                                  className={`p${snip.folder?.processor.processorId} lBadge rounded-3xl flex justify-center items-center`}
                                >
                                  <p className="text-xs MonoHeading font-semibold lowercase">
                                    {snip.folder.processor?.label}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-[#031B4E]">
                            <p className="text-xs font-mono">
                              {new Date(
                                snip.postedAt.seconds * 1000
                              ).toLocaleDateString("da-DK")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="hoverable-show">
                        <LoginIcon width={30} height={30} fill="#0072F5" />
                      </div>
                    </div>
                  </Card>
                </div>
              </Link>
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
