import { Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import PatchTable from "./PatchTable";
import { CgExternal } from "react-icons/cg";
const PatchNotes = () => {
  return (
    <div>
      <div>
        <Text h4>Opdateringer</Text>
      </div>
      <hr />
      <div className="my-5">
        <div>
          <div className="flex gap-1">
            <Text h5>Der er en ny version</Text>
            <Text h5 color="primary" className="underline">
              1.2.3
            </Text>
          </div>
          <div className="flex gap-1">
            <Text h6>
              Opdatere ved at synkronisere de seneste commits på din
            </Text>
            <Link href="">
              <Text h6 color="primary" className="underline">
                Github repository
                <CgExternal />
              </Text>
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <div className="my-3 flex flex-col gap-3">
        <div>
          <Text h5>Versioner</Text>
          <Text small>
            Kun vigtigt commits er synlige som opdateringer, for små tweak
            commits hold øje med den original repository.
          </Text>
        </div>
        <PatchTable />
      </div>
    </div>
  );
};

export default PatchNotes;
