import {
  collection,
  doc,
  FieldPath,
  getDoc,
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
import { Button, Card, Popover, Text } from "@nextui-org/react";
import { excerpt } from "../../utilities/excerpt";
import { DeleteDocumentIcon } from "../../components/SVG/DeleteDocumentIcon";
import { FolderDeleteSnippet } from "../../components/NonModal/FolderDeleteSnippet";
import { EditDocumentIcon } from "../../components/SVG/EditDocumentIcon";
import { Paper } from "../../components/SVG/Paper";
import { ArrowLeftSquare } from "../../components/SVG/ArrowLeftSquare";
import { LoginIcon } from "../../components/SVG/LoginIcon";
import Head from "next/head";

const Folder = () => {
  const [user] = useAuthState(auth);
  const {
    query: { id },
  } = useRouter();

  const [loading, setLoading] = useState(true);
  const [thisFolderSnippets, setThisFolderSnippets] = useState();

  const [folder, setFolder] = useState();

  const getFolderName = async () => {
    const folderRef = doc(db, "UsersData1", user.uid, "ErrorFolders", `${id}`);
    const folder = await getDoc(folderRef);

    setFolder(folder.data());
  };

  const getFolder = async () => {
    try {
      const snippetsColRef = collection(db, "ErrorSnippetsData1");
      const snippetsQuery = query(
        snippetsColRef,
        where(new FieldPath("folder", "folderId"), "==", id)
      );

      onSnapshot(snippetsQuery, (snapshot) => {
        let snippets = [];
        snapshot.docs.forEach((doc) => {
          snippets.push({ ...doc.data(), id: doc.id });
        });
        console.log("snippts", snippets);
        setThisFolderSnippets(snippets);
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
      await deleteDoc(doc(db, "ErrorSnippetsData1", id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  return (
    <div>
      <Head>
        <title>{folder?.folderName}nbsp;- SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
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
                  {folder?.folderSnippetType === "code" ? (
                    <div className="text-white bg-blue-300 px-1 rounded-md font-mono">
                      <p>kode</p>
                    </div>
                  ) : (
                    <div className="bg-[#FF3137] text-white rounded-lg py-1 px-3 hover:langHover MonoHeading">
                      <p className="">Fejl</p>
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
                <Card
                  isPressable
                  variant="flat"
                  css={{ mw: "100%", padding: 0 }}
                >
                  <div className="cardHover p-2 border-b rounded-xl w-auto">
                    <div className="flex gap-4 items-center">
                      <div className="w-auto">
                        <Paper
                          fill="#0072F5"
                          className="cursor-pointer"
                          width={40}
                          height={40}
                        />
                      </div>

                      <div className="w-full flex flex-col gap-3 MonoHeading">
                        <div>
                          <p className="text-[#4D5B7C] text-lg font-[500]">
                            {excerpt(snip.title, 60)}
                          </p>
                        </div>
                        {snip.description && (
                          <div className="-mt-2">
                            <h6
                              className="text-gray-500 whitespace-nowrap"
                              color="#889096"
                            >
                              {excerpt(snip.description, 60)}
                            </h6>
                          </div>
                        )}
                      </div>
                      <div className="hoverable-show">
                        <LoginIcon fill="#0072F5" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
              <div className="hoverable-show flex flex-col gap-1 justify-center items-center">
                <div>
                  <Button auto light>
                    <EditDocumentIcon
                      fill="#0072F5"
                      className="cursor-pointer"
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
                        />
                      </Button>
                    </Popover.Trigger>
                    <Popover.Content>
                      <FolderDeleteSnippet
                        item={snip}
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
    </div>
  );
};

export default Folder;
