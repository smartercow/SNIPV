import Head from "next/head";
import React from "react";
import TagsInfo from "../../../components/Info/Tags";

const TagsInfoPage = () => {
  return (
    <div className="min-h-[70vh] w-full">
      <Head>
        <title>Fork SNIPV projekt</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full">
        <TagsInfo />
      </div>
    </div>
  );
};

export default TagsInfoPage;
