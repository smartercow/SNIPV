import { Button, Card, Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { ImFolderOpen } from "react-icons/im";
const CodeFolders = ({ myCodeFolders }) => {
  return (
    <div>
      {myCodeFolders && (
        <div className="flex flex-col gap-3">
          {myCodeFolders.map((folder) => (
            <div key={folder.id} className="">
              <Link href={`/folder/${folder.id}`}>
                <Card isPressable variant="bordered" css={{ mw: "100%" }}>
                  <Card.Body>
                    <div className="flex items-center gap-3">
                      <div className="w-auto">
                        <h3>
                          <ImFolderOpen />
                        </h3>
                      </div>
                      <div className="w-full">
                        <div>
                          <Text h4>{folder.folderName}</Text>
                        </div>
                        <div>
                          {folder.framework?.label ? (
                            <Text weight="semibold" color="#889096">
                              {folder.framework?.label}
                            </Text>
                          ) : (
                            <Text weight="semibold" color="#889096">
                              {folder.language?.label}
                            </Text>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
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
