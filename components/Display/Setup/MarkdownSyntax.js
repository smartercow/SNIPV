import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
const MarkdownSyntax = ({ folderStructure }) => {
  console.log("FOLDERZZZ", folderStructure);
  return (
    <div>
      <SyntaxHighlighter
        language="javascript"
        codeTagProps={{ style: { fontFamily: "Source Code Pro" } }}
        style={oneLight}
      >
        {folderStructure}
      </SyntaxHighlighter>
    </div>
  );
};

export default MarkdownSyntax;
