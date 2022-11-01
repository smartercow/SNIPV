import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import Head from "next/head";
import Details from "../../../components/Elements/Page/Details";
import Entries from "../../../components/Display/Setup/Entries";
import Footer from "../../../components/Elements/Page/Footer";
import LoadingSNIPS from "../../../components/LoadingState/LoadingSNIPS";

const Setup = () => {
  const {
    query: { id },
  } = useRouter();

  const [snippet, setSnippet] = useState();
  const [loading, setLoading] = useState(true);

  const getSnippetData = async () => {
    const snippetDocref = doc(db, "SetupsData", `${id}`);
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
    <div className="">
      <Head>
        <title>{snippet?.title}&nbsp;- SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {snippet && (
        <div className="flex flex-col gap-4 h-[80vh]">
          <Details snippet={snippet} />

          <div className="flex-grow">
            <Entries snippet={snippet} />
          </div>

          <Footer snippet={snippet} />
        </div>
      )}

      {loading && <LoadingSNIPS size={10} />}
    </div>
  );
};

export default Setup;
