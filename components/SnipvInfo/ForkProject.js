import { Button, Spacer, Text } from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import { BiGitRepoForked } from "react-icons/bi";

const ForkProject = () => {
  return (
    <div className="min-h-[70vh]">
      <div className="flex justify-center items-center h-20">
        <Text
          h3
          css={{
            textGradient: "90deg, $blue600 -20%, $pink600 50%",
          }}
          weight="extrabold"
        >
          SNIPV
        </Text>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-4 w-60">
          <Link href="/about">
            <Text h5 className="cursor-pointer hover:underline">
              <Text b color="black">
                Om SNIPV
              </Text>
            </Text>
          </Link>
          <Link href="/forkproject">
            <Text h5 className="cursor-pointer hover:underline">
              Fork projekt
            </Text>
          </Link>
        </div>
        <div className="w-full">
          <div>
            <Text size="lg" b>
              FORK DENNE PROJEKT PÅ GITHUB
            </Text>
            <hr className="my-3" />
            <div className="flex">
              <Text h5>&#10149;</Text>
              <pre>
                <code className="p-3">
                  <BiGitRepoForked /> https://github.com/smartercow/SNIPV
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForkProject;
