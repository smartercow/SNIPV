import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import TagHeading from "../Heading/TagType/TagHeading";
const Tags = ({ tags, snippets }) => {
  return (
    <div className="min-w-[300px]">
      {snippets.snips && (
        <div>
          {tags && (
            <Box className="rounded-md shadow-md bg-opacity-60 flex flex-col gap-5 pt-2 pb-5 px-3">
              <TagHeading headingType={"Seneste tags"} />

              <div className="flex gap-2 flex-wrap -mt-4 select-none">
                {tags
                  .slice(0, 20)
                  .reverse()
                  .map((tag, index) => (
                    <Link key={index} href={`/tags/codes/${tag}`}>
                      <Box
                        bg="PrimaryTLight"
                        className="px-3 py-1 rounded-md cursor-pointer hover:opacity-70 mr-2 lowercase ease-in duration-300"
                      >
                        <p className="font-[500] text-sm SnippetHeadingTwo tracking-wide text-[#031B4E]">
                          {tag}
                        </p>
                      </Box>
                    </Link>
                  ))}
              </div>

              <div className="text-center">
                <Link href="/tags">
                  <Text className="text-center" variant="seeMore">
                    SE ALLE
                  </Text>
                </Link>
              </div>
            </Box>
          )}
        </div>
      )}
    </div>
  );
};

export default Tags;
