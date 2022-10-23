import React from "react";
import Link from "next/link";
import { BiGitRepoForked } from "react-icons/bi";
import { Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <div>
      <div className="flex justify-between items-center max-w-6xl mx-5 lg:mx-auto my-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="cursor-pointer">
            <Link href="/info/about">
              <Text className="hover:underline cursor-pointer">OM SNIPV</Text>
            </Link>
          </div>
          <div>
            <Link href="/info/forkproject">
              <div className="flex items-center">
                <Text>
                  <BiGitRepoForked />
                </Text>

                <Text className="hover:underline cursor-pointer">
                  FORK PROJEKT
                </Text>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/info/help">
              <Text className="hover:underline cursor-pointer">HJÆLP</Text>
            </Link>
          </div>
        </div>
        <div className="">
          <Text>© 2022 SNIPV</Text>
        </div>
      </div>
    </div>
  );
};

export default Footer;
