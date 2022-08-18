import {
  Avatar,
  Card,
  Collapse,
  Grid,
  Loading,
  Pagination,
  Text,
  Tooltip,
  User,
} from "@nextui-org/react";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Link from "next/link";
import { MdPublic } from "react-icons/md";

const Feed = ({ user, snippets, tags, loading }) => {
  return (
    <div>
      {snippets && (
        <div className="w-full">
          {snippets.snips && (
            <div className="flex flex-col gap-4">
              <div className="">
                <Card variant="flat">
                  <div className="flex items-center gap-2 pl-2">
                    <div className="pt-1">
                      <Text h3 color="$gray900">
                        <MdPublic />
                      </Text>
                    </div>
                    <div>
                      <Text h4 color="$gray900">Offentlige snippets</Text>
                    </div>
                  </div>
                </Card>
              </div>
              <div>
                <div className="flex flex-col gap-4">
                  {snippets.snips.slice(0, 10).map((snip) => (
                    <div key={snip.id}>
                      <Link href={`/s/${snip.id}`}>
                        <Card
                          isPressable
                          variant="flat"
                          css={{ mw: "100%" }}
                          key={snip.id}
                        >
                          <Card.Body>
                            <div className="flex items-center">
                              <div className="w-auto">
                                <Tooltip content={snip.author} color="primary">
                                  <User
                                    src={snip.userPhoto}
                                    zoomed
                                    squared
                                    pointer
                                  />
                                </Tooltip>
                              </div>
                              <div className="w-full">
                                <div>
                                  <Text h4>{snip.title}</Text>
                                </div>
                                <div>
                                  <Text weight="semibold" color="#889096">
                                    {snip.description}
                                  </Text>
                                </div>
                              </div>
                            </div>
                            <Text></Text>
                          </Card.Body>
                        </Card>
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
