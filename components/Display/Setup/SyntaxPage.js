import { Button, Text, useClipboard } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

const SyntaxPage = ({ entry }) => {
  const [show, setShow] = useState(false);
  const [view, setView] = useState("15rem");

  const { hasCopied, onCopy } = useClipboard(entry.code);

  useEffect(() => {
    if (show) {
      setView("auto");
    } else {
      setView("15rem");
    }
  }, [show]);

  return (
    <div>
      <div className="border border-gray-400 rounded-md relative">
        <SyntaxHighlighter
          language="javascript"
          customStyle={{ height: view }}
          style={oneLight}
          showLineNumbers={true}
          wraplonglineslines="true"
          lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
          }}
        >
          {entry.code}
        </SyntaxHighlighter>
        <div className="flex justify-center border-t border-gray-400">
          <Button onClick={() => setShow(!show)}>
            {show ? "Vis mindre" : "Vis mere"}
          </Button>
        </div>
        <div className="absolute top-0 right-0">
          <Button onClick={onCopy} ml={2}>
            {hasCopied ? "Kopieret" : "Kopier"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SyntaxPage;
