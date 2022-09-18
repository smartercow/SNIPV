import { Text } from "@nextui-org/react";
import Head from "next/head";
import React from "react";
import Heading from "../../components/SnipvInfo/Heading";
import SidebarInfo from "../../components/SnipvInfo/Sidebar";
import TagsInfo from "../../components/SnipvInfo/Tags";

const TagsInfoPage = () => {
  return (
    <div className="min-h-[80vh]">
      <Head>
        <title>Fork SNIPV projekt</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div>
          <Heading />
        </div>
        <div className="flex gap-4">
        <div>
            <SidebarInfo />
          </div>
          <div className="w-full">
            <TagsInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsInfoPage;
