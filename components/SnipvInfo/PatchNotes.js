import { Button, Spacer, Text } from "@nextui-org/react";
import React from "react";
import Link from "next/link";

const PatchNotes = () => {
  return (
    <div className="min-h-[70vh]">
      <div className="flex justify-center items-center h-20">
        <Text h4 b>
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
            <Button light size="lg" color="gradient">
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
            <Text size="lg" b>
              KOMMENDE FUNKTIONER
            </Text>
            <hr />
            
            <ul className="list-disc italic">
              <li><Text color="" size="lg">Side for hver snippets</Text></li>
              <li><Text color="" size="lg">Rediger og slet snippets</Text></li>
              <li><Text color="" size="lg">Opret fejl snippet</Text></li>
              <li><Text color="" size="lg">Opret noter</Text></li>
              <li><Text color="" size="lg">Mapper side</Text></li>
              <li><Text color="" size="lg">Login med Github</Text></li>
              <li><Text color="" size="lg">...</Text></li>

            </ul>
          </div>
          {/* <div>context</div> */}
        </div>
      </div>
    </div>
  );
};

export default PatchNotes;
