import { Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

const SyntaxCodeHandler = ({ snippet }) => {
  const [codeLang, setCodeLang] = useState("");

  useEffect(() => {
    setCodeLang(snippet.folder.fileExtension?.syntaxHighlight);
  }, [snippet]);

  // console.log("CODELANGSYNTAX", codeLang);
  // console.log("SNIPPET", snippet);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div>
          <Text h6 transform="uppercase" color="primary">
            Kode
          </Text>
        </div>
        <div className="px-4 bg-blue-500 rounded-t-2xl">
          <Text color="white" weight="semibold">{snippet.folder.fileExtension?.label}</Text>
        </div>
      </div>
      <div className="syntaxStyle">
        <SyntaxHighlighter
          language={codeLang}
          style={oneLight}
          className="p-0"
          showLineNumbers={true}
          wrapLongLinesLines={true}
          lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
          }}
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default SyntaxCodeHandler;
