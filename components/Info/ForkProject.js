import Link from "next/link";
import React from "react";
import { BiGitRepoForked } from "react-icons/bi";
import { CgExternal } from "react-icons/cg";
import { BsStarFill } from "react-icons/bs";
import { Text } from "@chakra-ui/react";

const ForkProject = () => {
  return (
    <div className="w-full">
      <Text>Fork SNIPV projekt på Github</Text>
      <hr className="my-3" />
      <div className="flex">
        <Text>&#10149;</Text>
        <pre>
          <code className="p-3">
            <BiGitRepoForked />
            &nbsp;
            <Link href="https://github.com/smartercow/SNIPV">
              <a target="_blank">
                https://github.com/smartercow/SNIPV
                <CgExternal />
              </a>
            </Link>
          </code>
        </pre>
      </div>
      <div className="flex gap-1 items-center">
        <Text>Glem ikke og give en</Text>
        <p className="text-yellow-400 text-md pt-1">
          <BsStarFill />
        </p>
      </div>
    </div>
  );
};

export default ForkProject;
