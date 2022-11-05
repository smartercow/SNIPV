import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

const SyntaxPage = ({ entry, tabUpdate }) => {
  const [codeLang, setCodeLang] = useState("");
  const [view, setView] = useState();
  const [show, setShow] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [height, setHeight] = useState();

  const ref = useRef(null);

  const { onCopy } = useClipboard(entry.file.code);
  const toast = useToast();

  useEffect(() => {
    setCodeLang(entry.file.entryFileExt.syntaxHighlight);
  }, [entry]);

  useEffect(() => {
    if (show) {
      setView("max-content");
    } else {
      setView("16rem");
    }
  }, [show]);

  useEffect(() => {
    setHeight(ref.current?.clientHeight);
    if (height && height > 240) {
      setShowBtn(true);
      setView("16rem");
      setShow(false);
    } else {
      setShowBtn(false);
    }
  }, [height, tabUpdate]);

  return (
    <div>
      <Box borderWidth={1} className="relative w-full">
        <div ref={ref} className="flex w-full">
          <SyntaxHighlighter
            language={codeLang}
            customStyle={{
              height: "auto",
              maxHeight: view,
              width: "100%",
              margin: 0,
              paddingTop: 10,
              paddingBottom: 10,
              overflow: "hidden",
            }}
            codeTagProps={{ style: { fontFamily: "Source Code Pro" } }}
            style={oneLight}
            showLineNumbers={true}
            lineProps={{
              style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
            }}
          >
            {entry.file.code}
          </SyntaxHighlighter>
        </div>
        {showBtn && (
          <Box borderTopWidth={1} py={1} className="flex justify-center">
            <Button
              onClick={() => setShow(!show)}
              fontSize={12}
              height={6}
              variant="ghost"
            >
              {show ? "Vis mindre" : "Vis mere"}
            </Button>
          </Box>
        )}

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
                  title: "Kopieret",
                  description: `${entry.file.name}${entry.file.entryFileExt.label}`,
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
  );
};

export default SyntaxPage;
