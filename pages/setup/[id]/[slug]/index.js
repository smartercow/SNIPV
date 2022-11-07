import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/clientApp";
import Head from "next/head";
import Details from "../../../../components/Elements/Page/Details";
import Entries from "../../../../components/Display/Setup/Entries";
import Footer from "../../../../components/Elements/Page/Footer";
import LoadingSNIPS from "../../../../components/LoadingState/LoadingSNIPS";

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
        <div className=" relative min-h-[80vh]">
          <div className="">
            <Details snippet={snippet} />
          </div>

          <div className="mb-10">
            <Entries snippet={snippet} />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-5">
            <Footer snippet={snippet} />
          </div>
        </div>
      )}

      {loading && <LoadingSNIPS size={10} />}
    </div>
  );
};

export default Setup;
