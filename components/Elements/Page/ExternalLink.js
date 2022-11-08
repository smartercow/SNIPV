import { Box, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const ExternalLink = ({ snippet }) => {
  return (
    <Box className="flex justify-center my-2">
      <Box className="linkSection bg-[#EFF2FB] px-4 py-1 w-full md:mx-8 lg:mx-36">
        {snippet.linkHeading && (
          <div>
            <p className="font-semibold">{snippet.linkHeading}</p>
          </div>
        )}

        {snippet.link && (
          <div>
            <NextLink href={snippet.link} passHref>
              <Link isExternal color="Blue" fontSize={16} fontWeight="semibold" className="truncate whitespace-nowrap">
                {snippet.link} <ExternalLinkIcon h={3} w={3} />
              </Link>
            </NextLink>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default ExternalLink;
