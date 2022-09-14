import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/clientApp";
import { Loading } from "@nextui-org/react";
import CodeSnippetPage from "../../components/SnippetPage/CodeSnippetPage";

const Snippet = () => {
  const {
    query: { id },
  } = useRouter();

  const [snippet, setSnippet] = useState();
  const [loading, setLoading] = useState(true);

  const getSnippetData = async () => {
    const snippetDocref = doc(db, "CodeSnippetsData1", `${id}`);
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
    <div>
      {snippet && (
        <CodeSnippetPage snippet={snippet} />
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
