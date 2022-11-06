import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DeleteDocumentIcon } from "../../SVG/DeleteDocumentIcon";
import { EditDocumentIcon } from "../../SVG/EditDocumentIcon";
import { DocumentIcon } from "../../SVG/DocumentIcon";
import { Paper } from "../../SVG/Paper";
import { LoginIcon } from "../../SVG/LoginIcon";
import SnippetBadge from "../Language/SnippetBadge";
import { Box, Icon, IconButton, Text } from "@chakra-ui/react";
import { DeleteSNIPModalState } from "../../../atoms/DeleteSNIPModalState";
import { useSetRecoilState } from "recoil";
import ModelIcon from "./ModelIcon";

const Snippet = ({ snippet, user }) => {
  const openModal = useSetRecoilState(DeleteSNIPModalState);
  const [modulesArr, setModulesArr] = useState("");
  const IconSize = 6;

  useEffect(() => {
    setModulesArr(snippet.modules);
  }, [snippet]);

  console.log("SNIPPET", snippet);

  /*   : snippet.snippetType == "error" && Array.isArray()
  `/setup/${snippet.id}/${String(
      snippet.modules[0]?.moduleTitle
    ).replace(/ /g, "-")}` */
  return (
    <>
      {modulesArr && (
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
                  : `/setup/${snippet.id}/${String(
                      modulesArr[0].moduleTitle
                    ).replace(/ /g, "-")}#${String(
                      modulesArr[0].sections[0].sectionTitle
                    ).replace(/ /g, "-")}`
              }
              passHref
            >
              <a>
                <div className="flex items-center gap-4 w-full justify-between">
                  <div className="flex items-center gap-5 w-full">
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex">
                        <ModelIcon snippet={snippet} />

                        <div className="flex flex-col justify-center max-w-xl pl-2 w-full">
                          <div className="">
                            <Text variant="snipHeading">{snippet.title}</Text>
                          </div>

                          {snippet.description && (
                            <div className="">
                              <Text variant="snipDescription">
                                {snippet.description}
                              </Text>
                            </div>
                          )}
                        </div>
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
                    <Icon
                      as={LoginIcon}
                      width={30}
                      height={30}
                      fill="Primary"
                    />
                  </div>
                </div>
              </a>
            </Link>
          </div>

          {!user && (
            <div className="hidden md:inline-flex">
              <div className="hoverable-show flex flex-col gap-1 justify-center rounded-xl items-center">
                {snippet.folder.subFolderId && (
                  <div>
                    <Link
                      href={
                        snippet.snippetType === "code"
                          ? `/upsert/code/${snippet.id}`
                          : snippet.snippetType === "error"
                          ? `/upsert/error/${snippet.id}`
                          : `/upsert/setup/${snippet.id}/`
                      }
                      passHref
                    >
                      <a>
                        <IconButton
                          icon={
                            <Icon
                              as={EditDocumentIcon}
                              fill="Primary"
                              width={IconSize}
                              height={IconSize}
                            />
                          }
                          cursor="pointer"
                        />
                      </a>
                    </Link>
                  </div>
                )}

                <div>
                  <IconButton
                    icon={
                      <Icon
                        as={DeleteDocumentIcon}
                        fill="Red"
                        width={IconSize}
                        height={IconSize}
                      />
                    }
                    cursor="pointer"
                    onClick={() => {
                      openModal({ default: true, snip: snippet });
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </Box>
      )}
    </>
  );
};

export default Snippet;
