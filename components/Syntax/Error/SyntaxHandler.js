import { Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

const SyntaxHandler = ({ snippet }) => {
  const [codeLang, setCodeLang] = useState("");

  useEffect(() => {
    setCodeLang(snippet.folder.language.fileExtension?.syntaxHighlight);
  }, [snippet]);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div>
          <Text h6 transform="uppercase" color="error">
            Fejl kode
          </Text>
        </div>

        <div className="px-4 bg-[#F31260] rounded-t-2xl">
          <Text color="white" weight="semibold">{snippet.folder.language.fileExtension?.label}</Text>
        </div>
      </div>
      
      <div className="errorCodeSyntaxStyle">
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
          {snippet.errorcode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default SyntaxHandler;
