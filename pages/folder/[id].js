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
import { Button, Card, Text } from "@nextui-org/react";
import { excerpt } from "../../utilities/excerpt";
import Image from "next/image";
import ArrowLeftSquare from "../../components/SVG/Iconly/bulk/ArrowLeftSquare.svg";
import Document from "../../components/SVG/Iconly/bulk/Document.svg";

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
  };

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

  console.log(folder);
  return (
    <div>
      {thisFolderSnippets && (
        <div className="flex flex-col gap-4">
          <div>
            <Card variant="flat" css={{ mw: "100%", padding: 0 }}>
              <div className="p-2 flex gap-4 items-center bg-[#bed1ed]">
                <div className="pt-2">
                  <Link href="/folders">
                    <Image
                      src={ArrowLeftSquare}
                      height={30}
                      width={30}
                      fill="responsive"
                      alt=""
                      className="cursor-pointer"
                    />
                  </Link>
                </div>
                <div className="w-full flex gap-1">
                  <Link href="/folders">
                    <p className="text-[#929ec1] text-lg font-[500] cursor-pointer MonoHeading">
                      /mapper/
                    </p>
                  </Link>

                  <p className="text-[#4D5B7C] text-lg font-[500]">
                    {folder?.folderName}
                  </p>
                </div>
                <div className="mr-3">
                  {folder?.folderSnippetType === "code" ? (
                    <div className="bg-[#1be959] text-white rounded-lg py-1 px-3 hover:langHover MonoHeading">
                      <p className="">Kode</p>
                    </div>
                  ) : (
                    <div className="bg-[#FF3137] text-white rounded-lg py-1 px-3 hover:langHover MonoHeading">
                      <p className="">Fejl</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
          {thisFolderSnippets.map((snips) => (
            <div key={snips.id} className="">
              <Link href={`/s/${snips.id}`}>
                <Card
                  isPressable
                  variant="flat"
                  css={{ mw: "100%", padding: 0 }}
                >
                  <div className="cardHover p-2 border-b rounded-xl w-auto">
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
                            {excerpt(snips.title, 60)}
                          </p>
                        </div>
                        {snips.description && (
                          <div className="-mt-2">
                            <h6
                              className="text-gray-500 whitespace-nowrap"
                              color="#889096"
                            >
                              {excerpt(snips.description, 60)}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
