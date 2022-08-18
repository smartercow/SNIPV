import { Card, Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const Tags = ({ tags }) => {
  return (
    <div>
      <Card variant="flat" css={{ mw: "100%" }}>
        <Card.Header>
            <Text h4>🔥 Trending tags</Text>
        </Card.Header>
        <Card.Body>
          <div className="flex gap-2 flex-wrap -mt-4">
            {tags &&
              tags.slice(1, 13).map((tag, index) => (
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
    </div>
  );
};

export default Tags;
