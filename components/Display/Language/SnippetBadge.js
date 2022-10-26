import { Badge, Box, Text } from "@chakra-ui/react";
import React from "react";
import FileExtension from "./FileExtension";

const SnippetBadge = ({ snippet }) => {
  return (
    <>
      <div className="flex items-center h-5 overflow-hidden">
        <div className="h-full">
          {snippet.snippetType === "code" && (
            <Box px={2} h="full" bg="#0072F5" borderBottomLeftRadius="lg">
              <Text fontSize={12} color="white">
                KODE
              </Text>
            </Box>
          )}

          {snippet.snippetType === "error" && (
            <Badge height="18px" colorScheme="red" variant="outline">
              FEJL
            </Badge>
          )}

          {snippet.snippetType === "setup" && (
            <Badge height="18px" colorScheme="purple" variant="outline">
              SETUP
            </Badge>
          )}
        </div>
        {snippet?.folder?.mainFolder?.language?.langId && (
          <Box
            className={`${snippet?.folder?.mainFolder?.language?.classTree} py-[0.17rem] px-2`}
          >
            <p className="text-xs MonoHeading font-semibold lowercase">
              {snippet.folder?.mainFolder?.language?.label}
            </p>
          </Box>
        )}

        {snippet?.folder?.language?.acc?.accId && (
          <div
            className={`${snippet?.folder?.language?.acc?.classTree} py-[0.17rem] px-2`}
          >
            <p className="text-xs MonoHeading font-semibold lowercase">
              {snippet?.folder?.language?.acc?.label}
            </p>
          </div>
        )}

        {snippet.folder?.language?.fileExtension?.extId && (
          <FileExtension snippet={snippet} />
        )}
      </div>
    </>
  );
};

export default SnippetBadge;
