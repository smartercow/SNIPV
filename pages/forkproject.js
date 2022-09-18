import Head from "next/head";
import React from "react";
import ForkProject from "../components/SnipvInfo/ForkProject";
import Heading from "../components/SnipvInfo/Heading";
import SidebarInfo from "../components/SnipvInfo/Sidebar";

const about = () => {
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
            <ForkProject />
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;
