import React from "react";
import Link from "next/link";
import { BiGitRepoForked } from "react-icons/bi";
import { Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <div className="flex justify-between items-center max-w-6xl w-full mx-5 lg:mx-auto py-3 mt-4 border-t-2">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="cursor-pointer">
          <Link href="/info/about" passHref>
            <a>
              <Text
                fontSize={14}
                fontWeight="semibold"
                className=" cursor-pointer underline-offset-4"
                _hover={{ color: "Primary" }}
              >
                OM SNIPV
              </Text>
            </a>
          </Link>
        </div>
        <div>
          <Link href="/info/forkproject" passHref>
            <a>
              <Text
                _hover={{ color: "Primary" }}
                fontSize={14}
                fontWeight="semibold"
                className="flex items-center"
              >
                <span>
                  <BiGitRepoForked />
                </span>
                FORK
              </Text>
            </a>
          </Link>
        </div>
        <div>
          <Link href="/info/help">
            <a>
              <Text
                fontSize={14}
                fontWeight="semibold"
                className="cursor-pointer"
                _hover={{ color: "Primary" }}
              >
                HJÆLP
              </Text>
            </a>
          </Link>
        </div>
      </div>
      <div>
        <Text fontSize={14} fontWeight="semibold" textTransform="uppercase">
          © 2022 SNIPV
        </Text>
      </div>
    </div>
  );
};

export default Footer;
