import { Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { CgExternal } from "react-icons/cg";

const About = () => {
  return (
    <div>
      <div className="w-full flex flex-col gap-4">
        <div>
          <Text size="lg">
            <Text size="lg" b>
              SNIPV
            </Text>
            (Snippets Vault) er en bankboks for genanvendelig kildekode,
            maskinkode eller tekst.
          </Text>
        </div>
        <div>
          <div className="flex gap-3 items-center">
            <Text h5>Et projekt af PG -</Text>
            <Text h5 className="underline text-blue-600">
              <Link href="https://github.com/smartercow"><a target="_blank">https://github.com/smartercow<CgExternal /></a></Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
