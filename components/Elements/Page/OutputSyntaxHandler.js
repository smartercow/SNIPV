import { Box, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Paper } from "../../SVG/Paper";

const OutputSyntaxHandler = ({ snippet }) => {
  const [codeLang, setCodeLang] = useState("");

  useEffect(() => {
    setCodeLang(snippet.folder.language.fileExtension?.syntaxHighlight);
  }, [snippet]);

  return (
    <Box my={4}>
      <div className="flex items-center justify-between">
        <Box className="flex items-center">
          <Text fontSize={16} fontWeight="semibold">
            Output
          </Text>
        </Box>
      </div>

      <Box boxShadow="lg" borderRadius="base" className="md:mx-8 lg:mx-36">
        <SyntaxHighlighter
          language=""
          customStyle={{
            height: "auto",
            width: "100%",
            margin: 0,
            paddingTop: 14,
            paddingBottom: 14,
            overflow: "hidden",
          }}
          codeTagProps={{ style: { fontFamily: "Source Code Pro" } }}
          style={oneLight}>
          {snippet.output}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
};

export default OutputSyntaxHandler;
