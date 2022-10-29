import { Badge, Box, Text } from "@chakra-ui/react";
import React from "react";
import FileExtension from "./FileExtension";

const SnippetBadge = ({ snippet }) => {
  return (
    <>
      <div className="flex items-center h-5 overflow-hidden -mb-1">
        <div className="h-full">
          {snippet.snippetType === "code" && (
            <Box
              pl={3}
              pr={2}
              h="full"
              bg="#0072F5"
              borderBottomLeftRadius="lg"
            >
              <Text fontSize={12} color="white" fontWeight="semibold">
                KODE
              </Text>
            </Box>
          )}

          {snippet.snippetType === "error" && (
            <Box pl={3} pr={2} h="full" bg="Red" borderBottomLeftRadius="lg">
              <Text fontSize={12} color="white" fontWeight="semibold">
                FEJL
              </Text>
            </Box>
          )}

          {snippet.snippetType === "setup" && (
            <Box pl={3} pr={2} h="full" bg="purple" borderBottomLeftRadius="lg">
              <Text fontSize={12} color="white" fontWeight="semibold">
                SETUP
              </Text>
            </Box>
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
