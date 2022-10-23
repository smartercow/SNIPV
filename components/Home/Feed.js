import React from "react";
import Link from "next/link";
import { MdFormatIndentIncrease } from "react-icons/md";
import { LoginIcon } from "../SVG/LoginIcon";
import LanguageBadge from "../Display/LanguageBadge";
import { Avatar, Badge, Box, Icon, Text, Tooltip } from "@chakra-ui/react";

const Feed = ({ snippet }) => {
  return (
    <div className="">
      {snippet && (
        <div className="">
          {snippet.snips && (
            <div className="flex flex-col gap-4 ">
              <div>
                <Box className="flex items-center bg-[#ebecf0] gap-2 px-2 h-10">
                  <Icon
                    as={MdFormatIndentIncrease}
                    w={6}
                    h={6}
                    color="BlackLighter"
                  />
                  <Text variant="boxHeading">Seneste SNIPS</Text>
                </Box>
              </div>

              <div>
                <div className="flex flex-col gap-4">
                  {snippet.snips.slice(0, 10).map((snippet, index) => (
                    <div key={index} className="">
                      <Link
                        href={
                          snippet.snippetType === "code"
                            ? `/s/${snippet.id}`
                            : snippet.snippetType === "error"
                            ? `/e/${snippet.id}`
                            : `/setup/${snippet.id}`
                        }
                      >
                        <div className="hoverable-item cursor-pointer">
                          <Box
                            key={snippet.id}
                            borderColor="PrimaryLighter"
                            borderWidth={1}
                            borderRadius="lg"
                            shadow="md"
                            userSelect="none"
                            p={2}
                            bg="PrimaryELight"
                            _hover={{ bg: "PrimaryLighter" }}
                          >
                            <div className="hoverable-item flex gap-3 items-center w-full">
                              <div className="w-full flex flex-col gap-2">
                                <div className="flex items-center">
                                  <div className="w-20 flex justify-center">
                                    <div className="-ml-3">
                                      <Tooltip
                                        label={snippet.userData.username}
                                        color="Primary"
                                        bg="PrimaryLighter"
                                        placement="top"
                                      >
                                        <Avatar
                                          src={snippet.userData?.photoURL}
                                          h={10}
                                          w={10}
                                        />
                                      </Tooltip>
                                    </div>
                                  </div>

                                  <div className="flex flex-col justify-center gap-2 w-full max-w-2xl">
                                    <div className="w-full">
                                      <Text variant="snipHeading">
                                        {snippet.title}
                                      </Text>
                                    </div>

                                    {snippet.description && (
                                      <div className="-mt-3 h-5">
                                        <Text variant="snipDescription">
                                          {snippet.description}
                                        </Text>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <div className="w-20 flex justify-center">
                                    {snippet.snippetType == "code" && (
                                      <div>
                                        <Badge
                                          colorScheme="blue"
                                          variant="outline"
                                        >
                                          KODE
                                        </Badge>
                                      </div>
                                    )}
                                    {snippet.snippetType == "error" && (
                                      <div className="">
                                        <Badge
                                          colorScheme="red"
                                          variant="outline"
                                        >
                                          FEJL
                                        </Badge>
                                      </div>
                                    )}
                                    {snippet.snippetType == "setup" && (
                                      <div>
                                        <Badge
                                          colorScheme="purple"
                                          variant="outline"
                                        >
                                          SETUP
                                        </Badge>
                                      </div>
                                    )}
                                  </div>

                                  <div className="w-full">
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
