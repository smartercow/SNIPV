import Link from "next/link";
import React, { useEffect, useState } from "react";
import PatchTable from "./PatchTable";
import { CgExternal } from "react-icons/cg";
import { getUpdates } from "../../../helpers/updates";
import { CurrentVersion } from "../../../pages/api/updates/CurrentVersion";
import SnippetLoading from "../../LoadingState/SnippetLoading";
import { Text } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const PatchNotes = () => {
  const [updateData, setUpdateData] = useState();
  const [lastUpdate, setLastUpdate] = useState();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({});

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

  useEffect(() => {
    const getAccess = async () => {
      const docRef = doc(db, "Settings", "General");
      const access = await getDoc(docRef);
      setForm(access.data());
    };
    getAccess();
  }, []);

  return (
    <div className="w-full">
      <div>
        {lastUpdate && (
          <>
            {lastUpdate?.id !== CurrentVersion.id && (
              <div>
                <div className="flex gap-1">
                  <Text fontWeight="semibold">Der er en ny version</Text>
                  <Link href="https://github.com/smartercow/SNIPV">
                    <a target="_blank" className="font-bold">
                      <Text fontSize={18} fontWeight="semibold" color="Primary">
                        {lastUpdate.version} <ExternalLinkIcon h={3} w={3} />
                      </Text>
                    </a>
                  </Link>
                </div>

                <div className="flex gap-1">
                  <Text fontWeight="semibold">
                    Opdatere ved at synkronisere de seneste commits på din{" "}
                    {!form.repo && "Github repository."}
                  </Text>
                  {form.repo && (
                    <>
                      <Link href={form.repo}>
                        <a target="_blank">
                          <Text fontWeight="semibold" color="Primary">
                            Github repository <ExternalLinkIcon h={3} w={3} />.
                          </Text>
                        </a>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}

            {lastUpdate?.id === CurrentVersion.id && (
              <div className="flex gap-1">
                <Text fontWeight="semibold">Din version </Text>

                <Text color="Primary" fontWeight="semibold">
                  {lastUpdate.version}
                </Text>

                <Text fontWeight="semibold">er up to date! 👍</Text>
              </div>
            )}
          </>
        )}

        {loading && <SnippetLoading />}
      </div>

      <div className="w-full mt-3">
        <Text fontSize={14} textTransform="uppercase" fontWeight="semibold">
          Seneste versioner
        </Text>
        <hr />

        <div className="my-3 flex flex-col gap-3">
          {lastUpdate && <PatchTable updateData={updateData} />}

          {loading && <SnippetLoading />}
        </div>
      </div>
    </div>
  );
};

export default PatchNotes;
