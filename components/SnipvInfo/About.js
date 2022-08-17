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
        <div className="flex flex-col gap-4">
          <Link href="/about">
            <Button light size="lg" color="primary">
              <Text b color="black">
                Om SNIPV
              </Text>
            </Button>
          </Link>
          <Link href="/patchnotes">
            <Button light size="lg" color="primary">
              <Text b color="black">
                Patch noter
              </Text>
            </Button>
          </Link>
          <Button light size="lg" color="gradient" disabled>
            Rapporter fejl
          </Button>
          <Button light size="lg" color="gradient" disabled>
            Forslag
          </Button>
          <Button light size="lg" color="gradient" disabled>
            FAQ
          </Button>
          <Button light size="lg" color="gradient" disabled>
            Hjælp
          </Button>
        </div>
        <div className="w-full">
          <div>
            <Text size="lg">
              <Text size="lg" b>
                SNIPV
              </Text>
              (Snippets Vault) er en bankboks for genanvendelig kildekode,
              maskinkode eller tekst.
            </Text>
          </div>
          {/* <div>context</div> */}
        </div>
      </div>
    </div>
  );
};

export default About;
