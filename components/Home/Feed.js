import React from "react";
import Link from "next/link";
import { MdFormatIndentIncrease } from "react-icons/md";
import { LoginIcon } from "../SVG/LoginIcon";
import LanguageBadge from "../Display/LanguageBadge";
import { Avatar, Badge, Box, Icon, Text, Tooltip } from "@chakra-ui/react";
import LatestHeading from "../Heading/LatestHeading";
import Snippet from "../Display/Snippet";

const Feed = ({ snippet, user }) => {
  return (
    <div className="">
      {snippet && (
        <div className="">
          {snippet.snips && (
            <Box className="flex flex-col">
              <div>
                <LatestHeading headingType={`SENESTE SNIPS`} />
              </div>

              <Box
                px={4}
                pt={3}
                borderBottomRadius="md"
                boxShadow="md"
                bg="white"
              >
                <div className="flex flex-col gap-4">
                  {snippet.snips.slice(0, 10).map((snippet, index) => (
                    <Snippet key={snippet.id} snippet={snippet} user={user} />
                  ))}
                </div>

                <div className="mt-5 text-center">
                  <Link href="/snips" passHref>
                    <a>
                      <Text variant="seeMore">SE ALLE</Text>
                    </a>
                  </Link>
                </div>
              </Box>
            </Box>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;
