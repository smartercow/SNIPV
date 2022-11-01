import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Syntax = ({ entry }) => {
  const [show, setShow] = useState(false);
  const [view, setView] = useState("5rem");

  useEffect(() => {
    if (show) {
      setView("max-content");
    } else {
      setView("7rem");
    }
  }, [show]);

  return (
    <Box borderWidth={1} borderRadius="md">
      <SyntaxHighlighter
        language="javascript"
        customStyle={{ height: "auto", maxHeight: view, margin: 0 }}
        style={oneLight}
        showLineNumbers={true}
        // wraplonglineslines={true}
        lineProps={{
          style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
        }}
      >
        {entry.file.code}
      </SyntaxHighlighter>
      <Box borderTopWidth={1} className="flex justify-center">
        <Button onClick={() => setShow(!show)} variant="ghost">
          {show ? "Vis mindre" : "Vis mere"}
        </Button>
      </Box>
    </Box>
  );
};

export default Syntax;
