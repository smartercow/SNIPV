import { Card } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { excerpt } from "../../utilities/excerpt";
import { FolderIcon } from "../SVG/FolderIcon";

const CodeFolders = ({ myCodeFolders }) => {
  return (
    <div>
      {myCodeFolders && (
        <div className="flex flex-col gap-3">
          {myCodeFolders.map((folder) => (
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
    </div>
  );
};

export default CodeFolders;
