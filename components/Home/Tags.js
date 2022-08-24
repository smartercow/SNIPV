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
            <Card variant="flat" css={{ mw: "100%", padding: "$0" }}>
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-opacity-60 flex flex-col gap-5 pt-1 pb-5 px-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="pt-1">
                      <Text h3 color="error">
                        <MdLocalFireDepartment />
                      </Text>
                    </div>
                    <div className="uppercase mt-3 text-white">
                      <h5>Populær tags</h5>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 flex-wrap -mt-4">
                    {tags.slice(0, 10).map((tag, index) => (
                      <Link key={index} href="/">
                        <div className="px-3 py-1 bg-[#ffffffc2] rounded-md opacity-80 cursor-pointer hover:opacity-70 mr-2">
                          <Text b transform="lowercase" color="black">
                            {tag}
                          </Text>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Tags;
