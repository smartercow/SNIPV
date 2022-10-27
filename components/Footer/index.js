import React from "react";
import Link from "next/link";
import { BiGitRepoForked } from "react-icons/bi";
import { Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <div className="flex justify-between items-center max-w-6xl mx-5 lg:mx-auto py-2 mt-4 border-t-2">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="cursor-pointer">
          <Link href="/info/about">
            <Text
              fontSize={14}
              className="hover:underline cursor-pointer underline-offset-4"
            >
              OM SNIPV
            </Text>
          </Link>
        </div>
        <div>
          <Link href="/info/forkproject">
            <div className="flex items-center">
              <Text>
                <BiGitRepoForked />
              </Text>

              <Text
                fontSize={14}
                className="hover:underline cursor-pointer underline-offset-4"
              >
                FORK PROJEKT
              </Text>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/info/help">
            <Text
              fontSize={14}
              className="hover:underline cursor-pointer underline-offset-4"
            >
              HJÆLP
            </Text>
          </Link>
        </div>
      </div>
      <div className="">
        <Text fontSize={14}>© 2022 SNIPV</Text>
      </div>
    </div>
  );
};

export default Footer;
