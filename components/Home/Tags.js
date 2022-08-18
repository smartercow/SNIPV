import { Card, Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { MdLocalFireDepartment } from "react-icons/md";

const Tags = ({ tags, snippets }) => {
  return (
    <div>
      {snippets.snips && (
        <div>
          {tags && (
            <Card variant="flat" css={{ mw: "100%" }}>
              <Card.Header>
                <div className="flex items-center gap-2">
                  <div className="pt-1">
                    <Text h3 color="error">
                      <MdLocalFireDepartment />
                    </Text>
                  </div>
                  <div>
                    <Text h4>Trending tags</Text>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="flex gap-2 flex-wrap -mt-4">
                  {tags.slice(1, 13).map((tag, index) => (
                    <Link key={index} href="/">
                      <div className="px-3 py-1 bg-[#ffffffc2] rounded-md">
                        <Text b transform="lowercase" color="black">
                          {tag}
                        </Text>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Tags;
