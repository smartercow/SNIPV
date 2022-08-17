import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/clientApp";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Loading, Text } from "@nextui-org/react";

const Snippet = () => {
  const {
    query: { id },
  } = useRouter();

  const [snippet, setSnippet] = useState();
  const [loading, setLoading] = useState(true);

  const getSnippet = async () => {
    const snippetDocref = doc(db, "SnippetsData", `${id}`);
    const snippetData = await getDoc(snippetDocref);
    setSnippet(snippetData.data());
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getSnippet();
    }
  }, [id]);

  console.log(snippet);
  return (
    <div>
      {snippet && (
        <div className="flex flex-col gap-3">
          <div>
            <Text h3>{snippet.title}</Text>
          </div>
          <div>{snippet.description}</div>
          <div>
            <SyntaxHighlighter language="javascript" style={oneLight}>
              {snippet.code}
            </SyntaxHighlighter>
          </div>
          <div>
            <Text>
              Af <Text b>{snippet.author}</Text>
            </Text>
          </div>
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center h-[20vh]">
          <Loading size="lg" />
        </div>
      )}
    </div>
  );
};

export default Snippet;
