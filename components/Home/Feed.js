import {
  Avatar,
  Card,
  Collapse,
  Dropdown,
  Grid,
  Loading,
  Pagination,
  Text,
  Tooltip,
  User,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Link from "next/link";
import { MdPublic } from "react-icons/md";
import Login from "../SVG/Iconly/bulk/Login.svg"
import Image from "next/image"
import {excerpt} from "../../utilities/excerpt"

const Feed = ({ user, snippets, tags, loading }) => {
  
  return (
    <div>
      {snippets && (
        <div className="w-full">
          {snippets.snips && (
            <div className="flex flex-col gap-4 ">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                <div className="flex items-center gap-2 pl-2">
                  <div className="pt-1">
                    <Text h3 color="white">
                      <MdPublic />
                    </Text>
                  </div>
                  <div className="w-full ">
                    <div className="uppercase MonoHeading ">
                      <p h4 color="$gray900" className="font-semibold">
                        Offentlige snippets
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-4">
                  {snippets.snips.slice(0, 20).map((snip, index) => (
                    <div key={snip.id}>
                      <Link href={`/s/${snip.id}`}>
                        <div className="hoverable-item">
                          <Card
                            isPressable
                            variant="flat"
                            css={{ mw: "100%", padding: "$0" }}
                            key={snip.id}
                          >
                            <div className="cardHover p-3 shadow-2xl border-b rounded-xl w-auto">
                              <div className="flex items-center">
                                <div className="w-auto">
                                  <Tooltip
                                    content={snip.userData.username}
                                    color="primary"
                                  >
                                    <User
                                      src={snip.userData?.photoURL}
                                      zoomed
                                      squared
                                      pointer
                                    />
                                  </Tooltip>
                                </div>

                                <div className="w-full flex flex-col gap-3 MonoHeading">
                                  <div>
                                    <p className="text-[#4D5B7C] text-lg font-[500]">
                                      {excerpt(snip.title, 60)}
                                    </p>
                                  </div>
                                  {snip.description && (
                                    <div className="-mt-2">
                                      <h6
                                        className="text-gray-500 whitespace-nowrap"
                                        color="#889096"
                                      >
                                        {excerpt(snip.description, 60)}
                                      </h6>
                                    </div>
                                  )}
                                </div>
                                <div className="hoverable-show">
                                  <Image src={Login} fill="responsive" alt="" />
                                </div>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="mt-5 text-center">
                  <Pagination color="primary" total={10} />
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
