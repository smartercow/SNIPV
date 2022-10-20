import { Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Syntax = ({ entry }) => {
  const [show, setShow] = useState(false);
  const [view, setView] = useState("15rem");

  useEffect(() => {
    if (show) {
      setView("auto");
    } else {
      setView("15rem");
    }
  }, [show]);

  return (
    <div>
      <div className="border border-gray-400 rounded-md">
        <SyntaxHighlighter
          language="javascript"
          customStyle={{ height: view }}
          style={oneLight}
          showLineNumbers={true}
          wrapLongLinesLines={true}
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
      </div>
    </div>
  );
};

export default Syntax;
