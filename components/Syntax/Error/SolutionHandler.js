import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

const SyntaxSolutionCodeHandler = ({snippet}) => {
    const [codeLang, setCodeLang] = useState("")
    const [framework, setFramework] = useState("")
    const [processor, setProcessor] = useState("")

    useEffect(() => {
        setCodeLang(snippet.folder.language.syntaxHighlight)
        setFramework(snippet.folder.framework.syntaxHighlight)
        setProcessor(snippet.folder.processor.syntaxHighlight)
    }, [snippet])

  return (
    <div>
      <SyntaxHighlighter
        language={framework ? framework : processor ? processor : codeLang}
        style={oneLight}
        className="p-0"
        showLineNumbers={true}
        wrapLongLinesLines={true}
        lineProps={{
          style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
        }}
      >
        {snippet.solutioncode}
      </SyntaxHighlighter>
    </div>
  );
};

export default SyntaxSolutionCodeHandler;
