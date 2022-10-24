import Link from "next/link";
import React, { useEffect, useState } from "react";
import PatchTable from "./PatchTable";
import { CgExternal } from "react-icons/cg";
import { getUpdates } from "../../../helpers/updates";
import { CurrentVersion } from "../../../pages/api/updates/CurrentVersion";
import SnippetLoading from "../../LoadingState/SnippetLoading";
import { Text } from "@chakra-ui/react";

const PatchNotes = () => {
  const [updateData, setUpdateData] = useState();
  const [lastUpdate, setLastUpdate] = useState();
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
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

  return (
    <div className="w-full">
      <div className="my-5">
        {lastUpdate && (
          <>
            {lastUpdate?.id !== CurrentVersion.id && (
              <div>
                <div className="flex gap-1">
                  <Text>Der er en ny version</Text>
                  <Link href="https://github.com/smartercow/SNIPV">
                    <a target="_blank" className="font-bold">
                      {lastUpdate.version}

                      <CgExternal />
                    </a>
                  </Link>
                </div>

                <div className="flex gap-1">
                  <Text>
                    Opdatere ved at synkronisere de seneste commits på din
                    Github repository.
                  </Text>

                  {/*                   <Link href="">
                    <a target="_blank">
                      <Text h6 color="primary" className="underline">
                        Github repository
                        <CgExternal />
                      </Text>
                    </a>
                  </Link> */}
                </div>
              </div>
            )}

            {lastUpdate?.id === CurrentVersion.id && (
              <div className="flex gap-1">
                <Text>Din version </Text>

                <Text color="Primary" className="underline">
                  {lastUpdate.version}
                </Text>

                <Text>er up to date! 👍</Text>
              </div>
            )}
          </>
        )}

        {loading && <SnippetLoading />}
      </div>

      <div className="w-full">
        <Text>Seneste versioner</Text>
        <hr />

        <div className="my-3 flex flex-col gap-3">
          {lastUpdate && (
            <>
              <div>
                <Text small>
                  Kun vigtigt commits er synlige som opdateringer, for små tweak
                  commits hold øje med den&nbsp;
                  <span>
                    <Link href="https://github.com/smartercow/SNIPV">
                      <a target="_blank">
                        original repository
                        <CgExternal />
                      </a>
                    </Link>
                  </span>
                  .
                </Text>
              </div>

              <PatchTable updateData={updateData} />
            </>
          )}

          {loading && <SnippetLoading />}
        </div>
      </div>
    </div>
  );
};

export default PatchNotes;
