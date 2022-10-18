import { Badge, Tooltip, User } from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import { MdFormatIndentIncrease } from "react-icons/md";
import { LoginIcon } from "../SVG/LoginIcon";
import LanguageBadge from "../Display/LanguageBadge";
import { Box, Icon, Text } from "@chakra-ui/react";

const Feed = ({ snippet }) => {
  return (
    <div>
      {snippet && (
        <div className="max-w-[46rem]">
          {snippet.snips && (
            <div className="flex flex-col gap-4 ">
              <div>
                <div className="flex items-center bg-[#ebecf0] gap-2 px-2 bg h-10">
                  <Icon
                    as={MdFormatIndentIncrease}
                    w={6}
                    h={6}
                    color="BlackLighter"
                  />
                  <div className="w-full ">
                    <Text
                      color="Primary"
                      className="font-semibold"
                      variant="headUppercase"
                    >
                      Seneste SNIPS
                    </Text>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-4">
                  {snippet.snips.slice(0, 10).map((snippet, index) => (
                    <div key={index}>
                      <Link
                        href={
                          snippet.snippetType === "code"
                            ? `/s/${snippet.id}`
                            : `/e/${snippet.id}`
                        }
                      >
                        <div className="hoverable-item cursor-pointer">
                          <Box
                            key={snippet.id}
                            // borderColor="Primary"
                            borderWidth={1}
                            borderRadius="lg"
                            p={2}
                            bg="GrayLight"
                            _hover={{ bg: "gray.200" }}
                          >
                            <div className="hoverable-item flex gap-3 items-center w-full">
                              <div className="w-full flex flex-col gap-2">
                                <div className="flex items-center">
                                  <div className="">
                                    <Tooltip
                                      content={snippet.userData.username}
                                      color="primary"
                                    >
                                      <User
                                        src={snippet.userData?.photoURL}
                                        zoomed
                                        squared
                                        pointer
                                      />
                                    </Tooltip>
                                  </div>

                                  <div className="w-full flex flex-col justify-center gap-2 MonoHeading">
                                    <div className="w-full">
                                      <Text variant="snipHeading">
                                        {snippet.title}
                                      </Text>
                                    </div>

                                    {snippet.description && (
                                      <div className="-mt-2 h-5">
                                        <p
                                          variant="snipDescription"
                                          className="text-sm MonoHeading font-semibold whitespace-nowrap"
                                        >
                                          {snippet.description}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex">
                                  <div className="w-24 flex justify-center">
                                    {snippet.snippetType == "code" && (
                                      <div className="pr-[.60rem]">
                                        <Badge
                                          isSquared
                                          color="primary"
                                          variant="flat"
                                        >
                                          KODE
                                        </Badge>
                                      </div>
                                    )}
                                    {snippet.snippetType == "error" && (
                                      <div className="pr-[.60rem]">
                                        <Badge
                                          isSquared
                                          color="error"
                                          variant="flat"
                                        >
                                          FEJL
                                        </Badge>
                                      </div>
                                    )}
                                  </div>
                                  <div className="w-full MonoHeading">
                                    <LanguageBadge snippet={snippet} />
                                  </div>
                                  <div className="text-[#031B4E]">
                                    <p className="text-xs font-mono">
                                      {new Date(
                                        snippet.postedAt.seconds * 1000
                                      ).toLocaleDateString("da-DK")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="hoverable-show">
                                <Icon
                                  as={LoginIcon}
                                  width={30}
                                  height={30}
                                  fill="Primary"
                                />
                              </div>
                            </div>
                          </Box>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="mt-5 text-center">
                  <Link href="/snips">
                    <Text variant="seeMore">SE ALLE</Text>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;
