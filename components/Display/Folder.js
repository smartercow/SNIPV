import { Button, Card, Popover } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import CodeSnippetsCounter from "../Folders/CodeFolders/CodeSnippetsCounter";
import { DeleteFolder } from "../NonModal/DeleteFolder";
import { DeleteDocumentIcon } from "../SVG/DeleteDocumentIcon";
import { EditDocumentIcon } from "../SVG/EditDocumentIcon";
import { FolderIcon } from "../SVG/FolderIcon";
import { LoginIcon } from "../SVG/LoginIcon";
import { excerpt } from "../../utilities/excerpt";

const Folder = ({ folder, handleDelete }) => {
  const [allOpenStates, setAllOpenStates] = useState({});

  return (
    <div>
      <div key={folder.id} className="hoverable-item flex gap-2">
        <Link href={`/folders/codes/${folder.id}`}>
          <Card isPressable variant="flat" css={{ mw: "100%", padding: "$0" }}>
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
                        {excerpt(/* folder.folderName */"asddas", 60)}
                      </p>
                    </div>
                    <div>
                      <CodeSnippetsCounter id={folder.id} />
                    </div>
                  </div>
                  <div className="MonoHeading">
                    {/* <LanguageBadge snippet={} /> */}
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
                <DeleteFolder
                  id={folder.id}
                  handleDelete={handleDelete}
                  setAllOpenStates={setAllOpenStates}
                />
              </Popover.Content>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
