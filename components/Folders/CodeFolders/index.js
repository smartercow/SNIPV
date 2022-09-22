import { Button, Card, Loading, Popover, Text } from "@nextui-org/react";
import { deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase/clientApp";
import { excerpt } from "../../../utilities/excerpt";
import { DeleteCodeFolder } from "../../NonModal/DeleteCodeFolder";
import { DeleteDocumentIcon } from "../../SVG/DeleteDocumentIcon";
import { EditDocumentIcon } from "../../SVG/EditDocumentIcon";
import { FolderIcon } from "../../SVG/FolderIcon";
import { LoginIcon } from "../../SVG/LoginIcon";
import SnippetsCounter from "./SnippetsCounter";

const CodeFolders = ({ myCodeFolders, loading, update, setUpdate }) => {
  const [user] = useAuthState(auth)
  const [allOpenStates, setAllOpenStates] = useState({});

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "UsersData1", user?.uid, "CodeFolders", id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  console.log("myCodeFolders", myCodeFolders);
  return (
    <div>
      {myCodeFolders?.length > 0 && (
        <div className="flex flex-col gap-3">
          {myCodeFolders.map((folder) => (
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
                            <SnippetsCounter id={folder.id}/>
                          </div>
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

                    <div className="hoverable-show">
                      <LoginIcon width={30} height={30} fill="#0072F5" />
                    </div>
                  </div>
                </Card>
              </Link>

              <div className="hoverable-show flex flex-col gap-1 justify-center items-center">
                <div>
                  <a href="">
                    <Button auto light>
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
                      <DeleteCodeFolder
                        id={folder.id}
                        handleDelete={handleDelete}
                        setAllOpenStates={setAllOpenStates}
                      />
                    </Popover.Content>
                  </Popover>
                </div>
              </div>
            </div>
          ))}

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
      )}
    </div>
  );
};

export default CodeFolders;
