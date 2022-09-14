import { Button, Text } from "@nextui-org/react";
import React from "react";
import Link from "next/link";

const About = () => {
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
        <div className="flex flex-col gap-4 w-60 text-center">
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
        <div className="w-full flex flex-col gap-4">
          <div className="text-center">
            <Text size="lg">
              <Text size="lg" b>
                SNIPV
              </Text>
              (Snippets Vault) er en bankboks for genanvendelig kildekode,
              maskinkode eller tekst.
            </Text>
          </div>
          <div className="text-center">
            <div className="flex gap-3 justify-center items-center">
            <Text h5>Et projekt af PG -</Text>
            <Text h5 className="underline text-blue-600">https://github.com/smartercow</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
