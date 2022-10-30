import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { CgExternal } from "react-icons/cg";

const About = () => {
  return (
    <div>
      <div className="w-full flex flex-col gap-4">
        <div>
          <Text fontWeight="semibold">
            <span className="font-bold">SNIPV</span>&nbsp; (Snippets Vault) er
            en bankboks for genanvendelig kildekode, maskinkode eller tekst.
          </Text>
        </div>
        <div>
          <div className="flex gap-3 items-center">
            <Text fontWeight="semibold">
              Et projekt af PG -{" "}
              <NextLink href="https://github.com/smartercow" passHref>
                <Link isExternal color="Primary">
                  https://github.com/smartercow
                  <ExternalLinkIcon h={3} w={3} />
                </Link>
              </NextLink>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
