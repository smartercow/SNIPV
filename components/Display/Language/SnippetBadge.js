import { Box, Text } from "@chakra-ui/react";
import React from "react";
import FileExtension from "./FileExtension";

const SnippetBadge = ({ snippet }) => {
  return (
    <div className="flex items-center h-[20px]">
      {snippet.snippetType === "code" && (
        <Box px={3} py="0.18rem" bg="Blue" borderBottomLeftRadius="lg">
          <Text fontSize={12} color="white" fontWeight="semibold">
            KODE
          </Text>
        </Box>
      )}

      {snippet.snippetType === "error" && (
        <Box px={3} py="0.18rem" bg="Red" borderBottomLeftRadius="lg">
          <Text fontSize={12} color="white" fontWeight="semibold">
            FEJL
          </Text>
        </Box>
      )}

      {snippet.snippetType === "setup" && (
        <Box px={3} py="0.18rem" bg="purple" borderBottomLeftRadius="lg">
          <Text fontSize={12} color="white" fontWeight="semibold">
            SETUP
          </Text>
        </Box>
      )}

      {snippet?.folder?.mainFolder?.language?.langId && (
        <Box
          className={`${snippet?.folder?.mainFolder?.language?.classTree} py-[0.24rem] px-2`}
        >
          <p className="text-xs MonoHeading font-semibold lowercase">
            {snippet.folder?.mainFolder?.language?.label}
          </p>
        </Box>
      )}

      {snippet?.folder?.language?.acc?.accId && (
        <div
          className={`${snippet?.folder?.language?.acc?.classTree} py-[0.24rem] px-2`}
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
  );
};

export default SnippetBadge;
