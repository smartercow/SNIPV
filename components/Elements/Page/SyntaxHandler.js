import { CopyIcon } from "@chakra-ui/icons";
import { Box, Icon, IconButton, Text, useClipboard, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

const SyntaxHandler = ({ snippet, SyntaxType, textColor, type }) => {
  const [code, setCode] = useState("");
  const [codeLang, setCodeLang] = useState("");
  const [title, setTitle] = useState("");

  const { onCopy } = useClipboard(snippet.code);
  const toast = useToast();

  useEffect(() => {
    setCodeLang(snippet.folder.language.fileExtension?.syntaxHighlight);
    setTitle(snippet.title);
    if (snippet.snippetType === "code" || (snippet.folder.folderSnippetType && type === "code")) {
      setCode(snippet.code);
    } else if (snippet.snippetType === "error" || (snippet.folder.folderSnippetType && type === "errorcode")) {
      setCode(snippet.errorcode);
    } else {
      setCode(snippet.solutioncode);
    }
  }, [snippet, type]);

  console.log("SNIPPET", snippet);
  return (
    <>
      {snippet && (
        <div className="">
          <div className="flex items-center justify-between">
            <Box mb={2}>
              <Text fontSize={16} fontWeight="semibold" color={textColor}>
                {SyntaxType}
              </Text>
            </Box>

            {/*         <div className="px-4 bg-blue-500 rounded-t-2xl">
              <Text color="white" fontWeight="semibold">
                {snippet.folder.language.fileExtension?.label}
              </Text>
            </div> */}
          </div>

          <Box boxShadow="lg" borderRadius="base" className="mt-2 relative md:mx-8 lg:mx-20">
            <SyntaxHighlighter
              language={codeLang}
              customStyle={{
                height: "auto",
                width: "100%",
                margin: 0,
                paddingTop: 14,
                paddingBottom: 14,
                overflow: "hidden",
              }}
              codeTagProps={{ style: { fontFamily: "Source Code Pro" } }}
              style={oneLight}
              showLineNumbers={snippet.model === "file" ? true : false}
              lineProps={{
                style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
              }}>
              {code}
            </SyntaxHighlighter>

            <Box className="absolute top-0 right-0">
              <IconButton
                aria-label="Up"
                variant="custom"
                borderTop="none"
                borderRight="none"
                borderTopLeftRadius="none"
                borderBottomRightRadius="none"
                onClick={() => {
                  onCopy(),
                    toast({
                      title: "Kopieret!",
                      // description: `${String(title).slice(0, 30)}...`,
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                }}
                icon={<CopyIcon height={4} width={4} color="Primary" />}
              />
            </Box>
          </Box>
        </div>
      )}
    </>
  );
};

export default SyntaxHandler;
