import React, { useState } from "react";
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
import SnippetBadge from "./Language/SnippetBadge";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

const Snippet = ({ snippet, user, handleDelete }) => {
  const [allOpenStates, setAllOpenStates] = useState({});

  return (
    <Box
      key={snippet.id}
      boxShadow="sm"
      borderWidth={1}
      borderColor="PrimaryLighter"
      borderRadius="xl"
      pr={2}
      className="hoverable-item w-full cardHover bg-white hoverable-item justify-between flex gap-5 items-center"
    >
      <div className="w-full">
        <Link
          href={
            snippet.snippetType == "code"
              ? `/s/${snippet.id}`
              : snippet.snippetType == "error"
              ? `/e/${snippet.id}`
              : `/setup/${snippet.id}`
          }
          passHref
        >
          <a>
            <div className="flex items-center gap-4 w-full justify-between">
              <div className="flex items-center gap-5 w-full">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col justify-center gap-3 max-w-xl pl-2">
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

                  <div className="flex w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <SnippetBadge snippet={snippet} />
                      </div>

                      <div className="hidden md:inline-flex">
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
                </div>
              </div>

              <div className="hoverable-show w-8">
                <Icon as={LoginIcon} width={30} height={30} fill="Primary" />
              </div>
            </div>
          </a>
        </Link>
      </div>

      {!user && (
        <div className="hidden md:inline-flex">
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
                onOpen={allOpenStates[snippet.id]}
                onClose={(nowOpen) =>
                  setAllOpenStates((oldState) => ({
                    ...oldState,
                    [snippet.id]: nowOpen,
                  }))
                }
              >
                <PopoverTrigger>
                  <Button>
                    <Icon
                      as={DeleteDocumentIcon}
                      fill="Red"
                      className="cursor-pointer"
                      width={26}
                      height={26}
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <DeleteSnippet
                    id={snippet.id}
                    handleDelete={handleDelete}
                    setAllOpenStates={setAllOpenStates}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Snippet;
