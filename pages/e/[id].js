import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/clientApp";
import { Loading } from "@nextui-org/react";
import ErrorSnippetPage from "../../components/SnippetPage/ErrorSnippetPage";
import Head from "next/head";

const Snippet = () => {
  const {
    query: { id },
  } = useRouter();

  const [snippet, setSnippet] = useState();
  const [loading, setLoading] = useState(true);

  const getSnippetData = async () => {
    const snippetDocref = doc(db, "ErrorSnippetsData1", `${id}`);
    const snippetData = await getDoc(snippetDocref);
    setSnippet(snippetData.data());
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getSnippetData();
    }
  }, [id]);

  return (
    <div className="min-h-[80vh]">
      <Head>
        <title>{snippet?.title}&nbsp;- SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {snippet && <ErrorSnippetPage snippet={snippet} />}
      {loading && (
        <div className="flex justify-center items-center h-[20vh]">
          <Loading size="lg" />
        </div>
      )}
    </div>
  );
};

export default Snippet;
