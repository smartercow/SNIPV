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
import { Tooltip } from "@nextui-org/react";

const Snippet = ({ snippet, user, handleDelete }) => {
  const [allOpenStates, setAllOpenStates] = useState({});

  return (
    <Box
      key={snippet.id}
      boxShadow="md"
      borderRadius="xl"
      py={2}
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
                  <div className="flex items-center">
                    <div className="w-20">
                      {!user && snippet.snippetType == "code" && (
                        <div className="w-full flex justify-center">
                          <Paper
                            fill="#0072F5"
                            className="cursor-pointer"
                            width={45}
                            height={45}
                          />
                        </div>
                      )}

                      {!user && snippet.snippetType == "error" && (
                        <div className="w-full flex justify-center">
                          <PaperFail
                            fill="#F31260"
                            className="cursor-pointer"
                            width={45}
                            height={45}
                          />
                        </div>
                      )}

                      {!user && snippet.snippetType == "setup" && (
                        <div className="w-full flex justify-center">
                          <DocumentIcon
                            fill="purple"
                            className="cursor-pointer"
                            width={45}
                            height={45}
                          />
                        </div>
                      )}

                      {user && (
                        <div className="w-full flex justify-center">
                          <Tooltip label={user.displayName}>
                            <Avatar src={user.photoURL} size="md" />
                          </Tooltip>
                        </div>
                      )}
                    </div>

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
                  <div className="flex w-full">
                    <div className="min-w-[5rem]">
                      {snippet.snippetType === "code" && (
                        <div className="w-full flex justify-center">
                          <Badge
                            height="18px"
                            colorScheme="blue"
                            variant="outline"
                          >
                            KODE
                          </Badge>
                        </div>
                      )}

                      {snippet.snippetType === "error" && (
                        <div className="w-full flex justify-center">
                          <Badge
                            height="18px"
                            colorScheme="red"
                            variant="outline"
                          >
                            FEJL
                          </Badge>
                        </div>
                      )}

                      {snippet.snippetType === "setup" && (
                        <div className="w-full flex justify-center">
                          <Badge
                            height="18px"
                            colorScheme="purple"
                            variant="outline"
                          >
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
              </div>

              <div className="hoverable-show w-8">
                <Icon as={LoginIcon} width={30} height={30} fill="Primary" />
              </div>
            </div>
          </a>
        </Link>
      </div>

      {!user && (
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
      )}
    </Box>
  );
};

export default Snippet;
