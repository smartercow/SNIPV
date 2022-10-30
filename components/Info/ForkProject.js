import NextLink from "next/link";
import React from "react";
import { BiGitRepoForked } from "react-icons/bi";
import { CgExternal } from "react-icons/cg";
import { BsStarFill } from "react-icons/bs";
import { Link, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const ForkProject = () => {
  return (
    <div className="w-full">
      <Text fontSize={18} fontWeight="semibold" textTransform="uppercase">
        Fork SNIPV projekt på Github
      </Text>
      <hr className="my-3" />
      <div className="flex">
        <Text>&#10149;</Text>
        <pre>
          <code>
            &nbsp;
            <NextLink href="https://github.com/smartercow/SNIPV">
              <Link isExternal>
                https://github.com/smartercow/SNIPV
                <ExternalLinkIcon h={3} w={3} />
              </Link>
            </NextLink>
          </code>
        </pre>
      </div>
      <div className="flex gap-1 items-center">
        <Text fontSize={14} fontWeight="semibold">
          Glem ikke og give en
        </Text>
        <p className="text-yellow-400 text-md">
          <BsStarFill />
        </p>
      </div>
    </div>
  );
};

export default ForkProject;
