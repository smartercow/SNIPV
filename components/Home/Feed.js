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

const Feed = ({ user, snippets, tags, loading }) => {
  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-[20vh]">
          <Loading size="lg" />
        </div>
      )}
      {snippets && (
        <div className="w-full">
          <div className="flex flex-col gap-4">
            {snippets.snips &&
              snippets.snips.slice(0, 10).map((snip) => (
                <div key={snip.id}>
                  <Link href={`/snippet/${snip.id}`}>
                    <Card
                      isPressable
                      variant="flat"
                      css={{ mw: "100%" }}
                      key={snip.id}
                    >
                      <Card.Body>
                        <div className="flex items-center">
                          <div className="w-auto">
                            <User src={snip.userPhoto} zoomed squared />
                          </div>
                          <div className="w-full">
                            <div>
                              <Text h4>{snip.title}</Text>
                            </div>
                            <div>
                              <Text weight="semibold" color="#889096">{snip.description}</Text>
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
      )}
    </div>
  );
};

export default Feed;
