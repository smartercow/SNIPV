import { Button, Card, Text } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ImFolderOpen } from "react-icons/im";
import { excerpt } from "../../utilities/excerpt";
import Folder from "../../components/SVG/Iconly/bulk/Folder.svg";
import { FolderIcon } from "../SVG/FolderIcon";
const CodeFolders = ({ myCodeFolders }) => {
  return (
    <div>
      {myCodeFolders && (
        <div className="flex flex-col gap-3">
          {myCodeFolders.map((folder) => (
            <div key={folder.id} className="">
              <Link href={`/folder/${folder.id}`}>
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

                      <div className="w-full flex flex-col gap-3 MonoHeading">
                        <div className="MonoHeading">
                          <p className="text-[#031B4E] text-lg font-[500]">
                            {excerpt(folder.folderName, 60)}
                          </p>
                        </div>
                        <div className="-mt-2">
                          <h6
                            className="text-[#031b4ed4] whitespace-nowrap"
                          >
                            {excerpt(folder.language?.label, 60)}
                          </h6>
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
    </div>
  );
};

export default CodeFolders;
