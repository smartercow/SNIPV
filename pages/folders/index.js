import { Button, Card, Loading, Popover, Text } from "@nextui-org/react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import FolderType from "../../components/Heading/FolderType";
import { auth, db } from "../../firebase/clientApp";
import CodeFolders from "../../components/Folders/CodeFolders";
import NoUser from "../../components/NoPage/NoUser";
import Head from "next/head";
import { FolderIcon } from "../../components/SVG/FolderIcon";
import { excerpt } from "../../utilities/excerpt";
import LatestHeading from "../../components/Heading/LatestHeading";
import { DeleteDocumentIcon } from "../../components/SVG/DeleteDocumentIcon";
import { DeleteErrorFolder } from "../../components/NonModal/DeleteErrorFolder";
import { EditDocumentIcon } from "../../components/SVG/EditDocumentIcon";
import { LoginIcon } from "../../components/SVG/LoginIcon";
import ErrorSnippetsCounter from "../../components/Folders/ErrorFolders/ErrorSnippetsCounter";
import CodeSnippetsCounter from "../../components/Folders/CodeFolders/CodeSnippetsCounter";

const MyFolders = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [allOpenStates, setAllOpenStates] = useState({});

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
  }, [user, update]);

  const handleCodeFolderDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "UsersData1", user?.uid, "CodeFolders", id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  const handleErrorFolderDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "UsersData1", user?.uid, "ErrorFolders", id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>Mine mapper - SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && (
        <div>
          <>
            <FolderType />
          </>

          <div>
            <div className="flex flex-col gap-2 w-full">
              <>
                <LatestHeading headingType={"Seneste kode mapper"} />
              </>

              {myCodeFolders?.length > 0 && (
                <div className="flex flex-col gap-3">
                  {myCodeFolders.slice(0, 5).map((folder) => (
                    <div key={folder.id} className="hoverable-item flex gap-2">
                      <Link href={`/folders/codes/${folder.id}`}>
                        <Card
                          isPressable
                          variant="flat"
                          css={{ mw: "100%", padding: "$0" }}
                        >
                          <div className="cardHover hoverable-item flex gap-3 items-center p-2 shadow-2xl border-b rounded-xl w-full h-full">
                            <div className="flex gap-4 items-center w-full">
                              <div className="w-auto">
                                <FolderIcon
                                  fill="#0072F5"
                                  className="cursor-pointer"
                                  width={40}
                                  height={40}
                                />
                              </div>

                              <div className="w-full flex gap-3 justify-between items-center MonoHeading">
                                <div className="MonoHeading flex flex-col gap-2 justify-center w-full">
                                  <div>
                                    <p className="text-[#031B4E] text-lg font-[500]">
                                      {excerpt(folder.folderName, 60)}
                                    </p>
                                  </div>
                                  <div>
                                    <CodeSnippetsCounter id={folder.id} />
                                  </div>
                                </div>
                                <div className="MonoHeading">
                                  <div className="flex gap-2 flex-row-reverse">
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

                            <div className="hoverable-show">
                              <LoginIcon
                                width={30}
                                height={30}
                                fill="#0072F5"
                              />
                            </div>
                          </div>
                        </Card>
                      </Link>

                      <div className="hoverable-show flex flex-col gap-1 justify-center items-center">
                        <div>
                          <a href="">
                            <Button auto light disabled>
                              <EditDocumentIcon
                                fill="#0072F5"
                                className="cursor-pointer"
                                width={26}
                                height={26}
                              />
                            </Button>
                          </a>
                        </div>
                        <div>
                          <Popover
                            placement="bottom"
                            isOpen={allOpenStates[folder.id]}
                            onOpenChange={(nowOpen) =>
                              setAllOpenStates((oldState) => ({
                                ...oldState,
                                [folder.id]: nowOpen,
                              }))
                            }
                          >
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
                              <DeleteErrorFolder
                                id={folder.id}
                                handleDelete={handleCodeFolderDelete}
                                setAllOpenStates={setAllOpenStates}
                              />
                            </Popover.Content>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="text-center my-3">
                    <Link href="/folders/codes">
                      <Text h5 className="cursor-pointer hover:underline">
                        SE ALLE
                      </Text>
                    </Link>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="flex justify-center items-center h-[20vh]">
                  <Loading size="lg" />
                </div>
              ) : (
                <div>
                  {!myCodeFolders?.length > 0 && (
                    <div className="flex justify-center mt-10">
                      <Text b size={13} transform="uppercase">
                        Du har ingen kode mapper! 😔
                      </Text>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <>
                <LatestHeading headingType={"Seneste fejl mapper"} />
              </>

              {myErrorFolders?.length > 0 && (
                <div className="flex flex-col gap-3">
                  {myErrorFolders.slice(0, 5).map((folder) => (
                    <div key={folder.id} className="hoverable-item flex gap-2">
                      <Link href={`/folders/codes/${folder.id}`}>
                        <Card
                          isPressable
                          variant="flat"
                          css={{ mw: "100%", padding: "$0" }}
                        >
                          <div className="cardHover hoverable-item flex gap-3 items-center p-2 shadow-2xl border-b rounded-xl w-full h-full">
                            <div className="flex gap-4 items-center w-full">
                              <div className="w-auto">
                                <FolderIcon
                                  fill="#0072F5"
                                  className="cursor-pointer"
                                  width={40}
                                  height={40}
                                />
                              </div>

                              <div className="w-full flex gap-3 justify-between items-center MonoHeading">
                                <div className="MonoHeading flex flex-col gap-2 justify-center w-full">
                                  <div>
                                    <p className="text-[#031B4E] text-lg font-[500]">
                                      {excerpt(folder.folderName, 60)}
                                    </p>
                                  </div>
                                  <div>
                                    <ErrorSnippetsCounter id={folder.id} />
                                  </div>
                                </div>
                                <div className="MonoHeading">
                                  <div className="flex gap-2 flex-row-reverse">
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

                            <div className="hoverable-show">
                              <LoginIcon
                                width={30}
                                height={30}
                                fill="#0072F5"
                              />
                            </div>
                          </div>
                        </Card>
                      </Link>

                      <div className="hoverable-show flex flex-col gap-1 justify-center items-center">
                        <div>
                          <a href="">
                            <Button auto light disabled>
                              <EditDocumentIcon
                                fill="#0072F5"
                                className="cursor-pointer"
                                width={26}
                                height={26}
                              />
                            </Button>
                          </a>
                        </div>
                        <div>
                          <Popover
                            placement="bottom"
                            isOpen={allOpenStates[folder.id]}
                            onOpenChange={(nowOpen) =>
                              setAllOpenStates((oldState) => ({
                                ...oldState,
                                [folder.id]: nowOpen,
                              }))
                            }
                          >
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
                              <DeleteErrorFolder
                                id={folder.id}
                                handleDelete={handleErrorFolderDelete}
                                setAllOpenStates={setAllOpenStates}
                              />
                            </Popover.Content>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="text-center my-3">
                    <Link href="/folders/errors">
                      <Text h5 className="cursor-pointer hover:underline">
                        SE ALLE
                      </Text>
                    </Link>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="flex justify-center items-center h-[20vh]">
                  <Loading size="lg" />
                </div>
              ) : (
                <div>
                  {!myErrorFolders?.length > 0 && (
                    <div className="flex justify-center mt-10">
                      <Text b size={13} transform="uppercase">
                        Du har ingen fejl mapper! 😔
                      </Text>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!user && <NoUser />}
    </div>
  );
};

export default MyFolders;
