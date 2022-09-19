import { Button, Card, Text } from "@nextui-org/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SnippetsFolderType from "../../components/Heading/SnippetsFolderType";
import { auth, db } from "../../firebase/clientApp";
import CodeFolders from "../../components/Folders/CodeFolders";
import NoUser from "../../components/NoPage/NoUser";
import Head from "next/head";
import { FolderIcon } from "../../components/SVG/FolderIcon";
import { excerpt } from "../../utilities/excerpt";

const MyFolders = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [myCodeFolders, setCodeMyFolders] = useState();
  const [myErrorFolders, setErrorMyFolders] = useState();

  const getMyCodeFolders = async () => {
    try {
      const folderQuery = query(
        collection(db, "UsersData1", user?.uid, "CodeFolders"),
        where("folderSnippetType", "==", "code"),
        orderBy("createdAt", "desc")
      );
      const folderDocs = await getDocs(folderQuery);
      const folders = folderDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCodeMyFolders(folders);
      setLoading(false);
    } catch (error) {
      console.log("getMyCodeFolders error", error.message);
    }
  };

  const getMyErrorFolders = async () => {
    try {
      const folderQuery = query(
        collection(db, "UsersData1", user?.uid, "ErrorFolders"),
        where("folderSnippetType", "==", "error"),
        orderBy("createdAt", "desc")
      );
      const folderDocs = await getDocs(folderQuery);
      const folders = folderDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setErrorMyFolders(folders);
      setLoading(false);
    } catch (error) {
      console.log("getMyCodeFolders error", error.message);
    }
  };

  useEffect(() => {
    getMyCodeFolders();
    getMyErrorFolders();
  }, [user]);

  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>Mine mapper - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <div>
          <div className="mb-4">
            <SnippetsFolderType />
          </div>
          <div>
            <div>
              <div>
                <Text transform="uppercase" h5>Seneste kode mapper</Text>
              </div>
              {myCodeFolders && (
                <div className="flex flex-col gap-3">
                  {myCodeFolders.slice(0, 5).map((folder) => (
                    <div key={folder.id} className="">
                      <Link href={`/folders/codes/${folder.id}`}>
                        <Card
                          isPressable
                          variant="flat"
                          css={{ mw: "100%", padding: "$0" }}
                        >
                          <div className="cardHover p-2 shadow-2xl border-b rounded-xl w-auto">
                            <div className="flex gap-4 items-center">
                              <div className="w-auto">
                                <FolderIcon
                                  fill="#0072F5"
                                  className="cursor-pointer"
                                  width={40}
                                  height={40}
                                />
                              </div>

                              <div className="w-full flex gap-3 justify-between MonoHeading">
                                <div className="MonoHeading w-full">
                                  <p className="text-[#031B4E] text-lg font-[500]">
                                    {excerpt(folder.folderName, 60)}
                                  </p>
                                </div>
                                <div className="MonoHeading">
                                  <div className="flex gap-2">
                                    <div
                                      className={`l${folder.language.langId} lBadge rounded-3xl flex justify-center items-center whitespace-nowrap`}
                                    >
                                      <p className="text-xs MonoHeading font-semibold lowercase">
                                        {folder.language?.label}
                                      </p>
                                    </div>
                                    {folder.framework.frameworkId && (
                                      <div
                                        className={`f${folder.framework.frameworkId} lBadge rounded-3xl flex justify-center items-center whitespace-nowrap`}
                                      >
                                        <p className="text-xs MonoHeading font-semibold lowercase">
                                          {folder.framework?.label}
                                        </p>
                                      </div>
                                    )}
                                    {folder.processor.processorId && (
                                      <div
                                        className={`p${folder.processor.processorId} lBadge rounded-3xl flex justify-center items-center whitespace-nowrap`}
                                      >
                                        <p className="text-xs MonoHeading font-semibold lowercase">
                                          {folder.processor.label}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-center my-3">
                <Link href="/folders/codes">
                  <Text h5 className="cursor-pointer hover:underline">
                    SE ALLE
                  </Text>
                </Link>
              </div>
            </div>

            <div>
              <div>
              <Text transform="uppercase" h5>Seneste fejl mapper</Text>
              </div>
              {myErrorFolders && (
                <div className="flex flex-col gap-3">
                  {myErrorFolders.slice(0, 5).map((folder) => (
                    <div key={folder.id} className="">
                      <Link href={`/folders/codes/${folder.id}`}>
                        <Card
                          isPressable
                          variant="flat"
                          css={{ mw: "100%", padding: "$0" }}
                        >
                          <div className="cardHover p-2 shadow-2xl border-b rounded-xl w-auto">
                            <div className="flex gap-4 items-center">
                              <div className="w-auto">
                                <FolderIcon
                                  fill="#0072F5"
                                  className="cursor-pointer"
                                  width={40}
                                  height={40}
                                />
                              </div>

                              <div className="w-full flex gap-3 justify-between MonoHeading">
                                <div className="MonoHeading w-full">
                                  <p className="text-[#031B4E] text-lg font-[500]">
                                    {excerpt(folder.folderName, 60)}
                                  </p>
                                </div>
                                <div className="MonoHeading">
                                  <div className="flex gap-2">
                                    <div
                                      className={`l${folder.language.langId} lBadge rounded-3xl flex justify-center items-center whitespace-nowrap`}
                                    >
                                      <p className="text-xs MonoHeading font-semibold lowercase">
                                        {folder.language?.label}
                                      </p>
                                    </div>
                                    {folder.framework.frameworkId && (
                                      <div
                                        className={`f${folder.framework.frameworkId} lBadge rounded-3xl flex justify-center items-center whitespace-nowrap`}
                                      >
                                        <p className="text-xs MonoHeading font-semibold lowercase">
                                          {folder.framework?.label}
                                        </p>
                                      </div>
                                    )}
                                    {folder.processor.processorId && (
                                      <div
                                        className={`p${folder.processor.processorId} lBadge rounded-3xl flex justify-center items-center whitespace-nowrap`}
                                      >
                                        <p className="text-xs MonoHeading font-semibold lowercase">
                                          {folder.processor.label}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-center my-3">
                <Link href="/folders/errors">
                  <Text h5 className="cursor-pointer hover:underline">
                    SE ALLE
                  </Text>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {!user && <NoUser />}
    </div>
  );
};

export default MyFolders;
