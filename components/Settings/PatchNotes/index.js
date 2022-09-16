import { Text } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PatchTable from "./PatchTable";
import { CgExternal } from "react-icons/cg";
import { getUpdates } from "../../../helpers/updates";
import { currentUpdate } from "../../../pages/api/currentupdate";

const PatchNotes = () => {
  const [updateData, setUpdateData] = useState();
  const [lastUpdate, setLastUpdate] = useState();

  useEffect(() => {
    getUpdates()
      .then((uData) => {
        if (uData) {
          setUpdateData(uData.data);
        } else {
          console.log("fejl");
        }
      })
      .finally(() => {
        console.log("");
      });
  }, []);

  useEffect(() => {
    if (updateData) {
      updateData.map(function (element, index, array) {
        setLastUpdate(array[0]);
        return array;
      }, 80);
    }
  }, [updateData]);

  console.log("last", lastUpdate?.id);
  console.log("current", currentUpdate.id);

  return (
    <div>
      <div>
        <Text h4>Opdateringer</Text>
      </div>
      <hr />
      <div className="my-5">
        {lastUpdate && (
          <>
            {lastUpdate?.id !== currentUpdate.id && (
              <div>
                <div className="flex gap-1">
                  <Text h5>Der er en ny version</Text>
                  <Text h5 color="primary" className="underline">
                    {lastUpdate.version}
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
            )}
            
            {lastUpdate?.id === currentUpdate.id && (
              <div>
                <Text h5>Din version er up to date! 👍</Text>
              </div>
            )}
          </>
        )}
      </div>
      <hr />
      <div className="my-3 flex flex-col gap-3">
        <div>
          <Text h5>Seneste versioner</Text>
          <Text small>
            Kun vigtigt commits er synlige som opdateringer, for små tweak
            commits hold øje med den original repository.
          </Text>
        </div>
        <PatchTable updateData={updateData} />
      </div>
    </div>
  );
};

export default PatchNotes;
