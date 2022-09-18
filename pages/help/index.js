import { Text } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Heading from "../../components/SnipvInfo/Heading";
import SidebarInfo from "../../components/SnipvInfo/Sidebar";
import TagsInfo from "../../components/SnipvInfo/Tags";

const HelpPage = () => {
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
            <div>
              <Text h4>Hjælp</Text>
            </div>
            <hr className="my-3"/>
            <div>
              <Link href="/help/tags">
                <Text b className="cursor-pointer underline">
                  Hvordan man skriver søgbare tags
                </Text>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
