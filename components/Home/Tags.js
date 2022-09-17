import { Card, Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { AiTwotoneTags } from "react-icons/ai";

const Tags = ({ tags, snippets }) => {
  return (
    <div>
      {snippets.snips && (
        <div>
          {tags && (
            <Card variant="flat" css={{ w: "300px", padding: "$0" }}>
              <div className="bg-[#F1F7FF] bg-opacity-60 flex flex-col gap-5 pt-1 pb-5 px-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="pt-1">
                      <Text h3 color="error">
                        <AiTwotoneTags />
                      </Text>
                    </div>
                    <div className="uppercase mt-3 text-[#031B4E]">
                      <h5>Seneste tags</h5>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 flex-wrap -mt-4">
                    {tags
                      .slice(0, 20)
                      .reverse()
                      .map((tag, index) => (
                        <Link key={index} href={`/tags/codes/${tag}`}>
                          <div className="px-3 py-1 bg-[#c8dfff85] rounded-md cursor-pointer hover:opacity-70 mr-2 lowercase ease-in duration-300">
                            <p className="font-[500] text-sm SnippetHeadingTwo tracking-wide text-[#031B4E]">
                              {tag}
                            </p>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
                <div className="text-center">
                  <Link href="/tags">
                    <Text b className="cursor-pointer hover:underline">
                      SE ALLE
                    </Text>
                  </Link>
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
