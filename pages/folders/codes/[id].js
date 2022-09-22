import {
  collection,
  doc,
  FieldPath,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase/clientApp";
import { Badge, Button, Card, Loading, Popover } from "@nextui-org/react";
import { DeleteDocumentIcon } from "../../../components/SVG/DeleteDocumentIcon";
import { EditDocumentIcon } from "../../../components/SVG/EditDocumentIcon";
import { Paper } from "../../../components/SVG/Paper";
import { ArrowLeftSquare } from "../../../components/SVG/ArrowLeftSquare";
import { LoginIcon } from "../../../components/SVG/LoginIcon";
import Head from "next/head";
import FolderType from "../../../components/Heading/FolderType";
import { DeleteCodeSnippet } from "../../../components/NonModal/DeleteCodeSnippet";

const Folder = () => {
  const [user] = useAuthState(auth);
  const {
    query: { id },
  } = useRouter();

  const [loading, setLoading] = useState(true);
  const [thisFolderSnippets, setThisFolderSnippets] = useState();

  const [folder, setFolder] = useState();

  const getFolderName = async () => {
    const folderRef = doc(db, "UsersData1", user.uid, "CodeFolders", `${id}`);
    const folder = await getDoc(folderRef);

    setFolder(folder.data());
    setLoading(false);
  };

  const getFolder = async () => {
    setLoading(true);
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
        setLoading(false);
      });
    } catch (error) {
      console.log("getsnippet error", error.message);
    }
  };

  useEffect(() => {
    if (id && user) {
      getFolder();
      getFolderName();
    }
  }, [id, user]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "CodeSnippetsData1", id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>{folder?.folderName}&nbsp;- SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <>
          <FolderType />
        </>

        {thisFolderSnippets && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Card variant="flat" css={{ mw: "100%", padding: 0 }}>
                <div className="w-full p-2 flex gap-4 items-center bg-[#b3cff6]">
                  <div className="pt-2">
                    <Link href="/folders">
                      <ArrowLeftSquare
                        fill="#4D5B7C"
                        className="cursor-pointer"
                        width={30}
                        height={30}
                      />
                    </Link>
                  </div>
                  <div className="w-full flex gap-1">
                    <Link href="/folders">
                      <p className="text-[#636c82] text-lg font-[500] cursor-pointer MonoHeading">
                        /mapper/
                      </p>
                    </Link>

                    <p className="text-[#4D5B7C] text-lg font-[500]">
                      {folder?.folderName}
                    </p>
                  </div>
                  <div className="mr-3">
                    {folder?.folderSnippetType === "code" && (
                      <div className="text-white bg-blue-300 px-1 rounded-md font-mono">
                        <p>kode</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
              <div className="hoverable-show">
                <Button auto light>
                  <EditDocumentIcon fill="#0072F5" className="cursor-pointer" />
                </Button>
              </div>
            </div>

            {thisFolderSnippets.slice(0, 10).map((snip) => (
              <div key={snip.id} className="hoverable-item flex gap-2">
                <Link href={`/s/${snip.id}`}>
                  <div className="hoverable-item w-full">
                    <Card
                      isPressable
                      variant="flat"
                      css={{ mw: "100%", padding: "$0" }}
                      key={snip.id}
                    >
                      <div className="cardHover bg-[#F1F7FF] hoverable-item flex gap-3 items-center p-2 border-b rounded-xl w-full">
                        <div className="w-full flex flex-col gap-2">
                          <div className="flex gap-6 items-center">
                            <div className="pl-2">
                              <Paper
                                fill="#0072F5"
                                className="cursor-pointer"
                                width={50}
                                height={50}
                              />
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
                                  <Badge
                                    isSquared
                                    color="primary"
                                    variant="flat"
                                  >
                                    KODE
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
                        <DeleteCodeSnippet
                          snip={snip}
                          handleDelete={handleDelete}
                        />
                      </Popover.Content>
                    </Popover>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center h-[20vh]">
            <Loading size="lg" />
          </div>
        )}
      </>
    </div>
  );
};

export default Folder;
