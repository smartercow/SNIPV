import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";
import { Loading } from "@nextui-org/react";
import CodeSnippetPage from "../../components/SnippetPage/CodeSnippetPage";
import Head from "next/head";

const Snippet = () => {
  const {
    query: { id },
  } = useRouter();

  const [snippets, setSnippets] = useState();
  const [loading, setLoading] = useState(true);

  const getSnippetData = async () => {
    const snippetDocref = doc(db, "CodeSnippetsData1", `${id}`);
    const snippetData = await getDoc(snippetDocref);
    setSnippets(snippetData.data());
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getSnippetData();
    }
  }, [id]);

  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>{snippets?.title}&nbsp;- SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {snippets && <CodeSnippetPage snippets={snippets} />}
      {loading && (
        <div className="flex justify-center items-center h-[20vh]">
          <Loading size="lg" />
        </div>
      )}
    </div>
  );
};

export default Snippet;
