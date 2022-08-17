import {
  Avatar,
  Collapse,
  Grid,
  Loading,
  Pagination,
  Text,
  Tooltip,
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
          <Collapse.Group shadow>
            {snippets?.snips?.slice(0, 10).map((item) => (
              <Collapse
                key={item.uid}
                title={<Text h4>{item.title}</Text>}
                subtitle={item.description}
                contentLeft={
                  <Tooltip content={item.author} color="primary">
                    <Avatar
                      size="lg"
                      src={item.userPhoto}
                      color="secondary"
                      bordered
                      squared
                    />
                  </Tooltip>
                }
              >
                <div>
                  <SyntaxHighlighter language="javascript" style={oneLight}>
                    {item.code}
                  </SyntaxHighlighter>
                  <div>
                    <Link href={`/snippet/${item.id}`}>
                      <Text b color="primary" className="cursor-pointer">
                        Snippet link →
                      </Text>
                    </Link>
                  </div>
                </div>
              </Collapse>
            ))}
          </Collapse.Group>
          <div className="mt-5 text-center">
            <Pagination color="primary" total={10} initialPage={1} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
