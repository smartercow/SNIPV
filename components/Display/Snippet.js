import React, { useState } from "react";
import { Popover } from "@nextui-org/react";
import Link from "next/link";
import { DeleteSnippet } from "../NonModal/DeleteSnippet";
import { DeleteDocumentIcon } from "../SVG/DeleteDocumentIcon";
import { EditDocumentIcon } from "../SVG/EditDocumentIcon";
import { DocumentIcon } from "../SVG/DocumentIcon";
import { LoginIcon } from "../SVG/LoginIcon";
import { Paper } from "../SVG/Paper";
import { PaperFail } from "../SVG/PaperFail";
import FileExtension from "./FileExtension";
import LanguageBadge from "./LanguageBadge";
import { Badge, Box, Button, Icon, Text } from "@chakra-ui/react";

const Snippet = ({ snippet, handleDelete }) => {
  const [allOpenStates, setAllOpenStates] = useState({});

  return (
    <div className="hoverable-item">
      <Link
        href={
          snippet.snippetType == "code"
            ? `/s/${snippet.id}`
            : snippet.snippetType == "error"
            ? `/e/${snippet.id}`
            : `/setup/${snippet.id}`
        }
      >
        <div className="hoverable-item w-full">
          <Box
            key={snippet.id}
            boxShadow="md"
            borderRadius="xl"
            cursor="pointer"
          >
            <div className="cardHover bg-white hoverable-item items-center p-2 rounded-xl">
              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex gap-4 items-center pl-1">
                    {snippet.snippetType == "code" && (
                      <div className="w-18 flex justify-center">
                        <Paper
                          fill="#0072F5"
                          className="cursor-pointer"
                          width={45}
                          height={45}
                        />
                      </div>
                    )}

                    {snippet.snippetType == "error" && (
                      <div>
                        <PaperFail
                          fill="#F31260"
                          className="cursor-pointer"
                          width={45}
                          height={45}
                        />
                      </div>
                    )}

                    {snippet.snippetType == "setup" && (
                      <div>
                        <DocumentIcon
                          fill="purple"
                          className="cursor-pointer"
                          width={45}
                          height={45}
                        />
                      </div>
                    )}

                    <div className="flex flex-col justify-center gap-3 max-w-xl">
                      <div className="h-4">
                        <Text variant="snipHeading" letterSpacing="0.03em">
                          {snippet.title}
                        </Text>
                      </div>

                      {snippet.description && (
                        <div className="h-4">
                          <Text variant="snipDescription">
                            {snippet.description}
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4 pl-2">
                    <div className="w-18 flex justify-center">
                      {snippet.snippetType === "code" && (
                        <div>
                          <Badge colorScheme="blue" variant="outline">
                            KODE
                          </Badge>
                        </div>
                      )}

                      {snippet.snippetType === "error" && (
                        <div>
                          <Badge colorScheme="red" variant="outline">
                            FEJL
                          </Badge>
                        </div>
                      )}

                      {snippet.snippetType === "setup" && (
                        <div>
                          <Badge colorScheme="purple" variant="outline">
                            SETUP
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <LanguageBadge snippet={snippet} />
                        {snippet.folder?.language?.fileExtension?.extId && (
                          <FileExtension snippet={snippet} />
                        )}
                      </div>

                      <div className="flex gap-3 text-[#031B4E]">
                        {snippet.updatedAt && (
                          <p className="text-xs font-mono">
                            OPDATERET:&nbsp;
                            {new Date(
                              snippet.updatedAt.seconds * 1000
                            ).toLocaleDateString("da-DK")}
                          </p>
                        )}

                        <p className="text-xs font-mono">
                          OPRETTET:&nbsp;
                          {new Date(
                            snippet.postedAt.seconds * 1000
                          ).toLocaleDateString("da-DK")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hoverable-show">
                  <Icon as={LoginIcon} width={30} height={30} fill="Primary" />
                </div>

                <div className="hoverable-show flex flex-col gap-1 justify-center rounded-xl items-center">
                  {snippet.folder.subFolderId && (
                    <>
                      <div>
                        <a
                          href={
                            snippet.snippetType == "code"
                              ? `/upsert/code/${snippet.id}`
                              : `/upsert/error/${snippet.id}`
                          }
                        >
                          <Button>
                            <Icon
                              as={EditDocumentIcon}
                              fill="Primary"
                              className="cursor-pointer"
                              width={26}
                              height={26}
                            />
                          </Button>
                        </a>
                      </div>
                    </>
                  )}

                  <div>
                    <Popover
                      placement="bottom"
                      isOpen={allOpenStates[snippet.id]}
                      onOpenChange={(nowOpen) =>
                        setAllOpenStates((oldState) => ({
                          ...oldState,
                          [snippet.id]: nowOpen,
                        }))
                      }
                    >
                      <Popover.Trigger>
                        <Button>
                          <Icon
                            as={DeleteDocumentIcon}
                            fill="Red"
                            className="cursor-pointer"
                            width={26}
                            height={26}
                          />
                        </Button>
                      </Popover.Trigger>
                      <Popover.Content>
                        <DeleteSnippet
                          id={snippet.id}
                          handleDelete={handleDelete}
                          setAllOpenStates={setAllOpenStates}
                        />
                      </Popover.Content>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </Link>
    </div>
  );
};

export default Snippet;
