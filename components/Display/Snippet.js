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
import { Tooltip } from "@nextui-org/react";

const Snippet = ({ snippet, user, handleDelete }) => {
  const [allOpenStates, setAllOpenStates] = useState({});

  return (
    <Box
      key={snippet.id}
      boxShadow="md"
      borderRadius="xl"
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
            <div className="flex items-center gap-2">
              <div className="pt-1">
                <div className="flex flex-col justify-center pl-2 pb-1">
                  <div className="">
                    <Text variant="snipHeading" letterSpacing="0.03em">
                      {snippet.title}
                    </Text>
                  </div>

                  <div className="">
                    <Text variant="snipDescription">{snippet.description}</Text>
                  </div>
                </div>

                <Box>
                  <div className="flex items-center justify-between w-full">
                    <SnippetBadge snippet={snippet} />

                    <div className="flex gap-3 text-[#031B4E] pr-2">
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
                </Box>
              </div>

              <div className="hoverable-show w-6">
                <Icon as={LoginIcon} width={30} height={30} fill="Primary" />
              </div>
            </div>
          </a>
        </Link>
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
                <Button variant="edel">
                  <Icon as={EditDocumentIcon} fill="Primary" w={6} h={6} />
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
              <Button variant="edel">
                <Icon as={DeleteDocumentIcon} fill="Red" w={6} h={6} />
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
    </Box>
  );
};

export default Snippet;
