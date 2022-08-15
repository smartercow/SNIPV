import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Feed = ({user, snippets, tags}) => {
  console.log("Snippets",snippets);
  return (
    <div>
      {snippets?.map((item) => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <div>{item.tags}</div>
          <div>
          <SyntaxHighlighter language="javascript" style={oneLight}>
            {item.code}
          </SyntaxHighlighter>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
