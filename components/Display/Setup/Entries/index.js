import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import PackageBox from "../../../CreateSnippet/CreateSetup/Entries/Packages/PackageBox";
import SyntaxPage from "../SyntaxPage";
import SideMenu from "../SideMenu";
import SetupContent from "./SetupContent";

const Entries = ({ snippet }) => {
  const { asPath } = useRouter();
  const router = useRouter();
  const {
    query: { id },
    query: { slug },
  } = useRouter();

  const [tabUpdate, setTabUpdate] = useState(false);
  const [ents, setEnts] = useState();

  const handleHref = (link, hash) => {
    router.push(link).then(() => {
      if (hash) router.push(hash);
    });
  };

  useEffect(() => {
    if (snippet) {
      setEnts(Object.values(snippet.modules));
    }
  }, [snippet]);

  return (
    <div>
      {ents && (
        <div className="flex gap-5 justify-between">
          <SideMenu modules={ents} />

          <Box className=" w-full max-w-[54rem]">
            {ents && (
              <>
                {ents.map((modul, index) => {
                  if (
                    asPath.startsWith(
                      `/setup/${id}/${String(modul.moduleTitle).replace(
                        / /g,
                        "-"
                      )}`
                    )
                  )
                    return (
                      <Box key={index} className="flex flex-col gap-2 w-full">
                        {Array.isArray(modul.sections) && (
                          <>
                            <Box>
                              {modul.sections.map((sect) => {
                                if (
                                  asPath.endsWith(
                                    `/${String(modul.moduleTitle).replace(
                                      / /g,
                                      "-"
                                    )}#${String(sect.sectionTitle).replace(
                                      / /g,
                                      "-"
                                    )}`
                                  )
                                )
                                  return (
                                    <Box className="flex flex-col gap-2">
                                      <Box>
                                        <Text variant="breadcrumb">
                                          {modul.moduleTitle} -{" "}
                                          {sect.sectionTitle}
                                        </Text>
                                      </Box>

                                      <Box className="w-full flex flex-col gap-8">
                                        {Array.isArray(sect.entries) && (
                                          <>
                                            {sect.entries.map((entry) => (
                                              <SetupContent
                                                key={entry.entryId}
                                                entry={entry}
                                                tabUpdate={tabUpdate}
                                                setTabUpdate={setTabUpdate}
                                              />
                                            ))}
                                          </>
                                        )}
                                      </Box>
                                    </Box>
                                  );
                              })}
                            </Box>
                          </>
                        )}

                        {asPath.endsWith(
                          `/${String(modul.moduleTitle).replace(/ /g, "-")}`
                        ) && (
                          <Box className="flex flex-col gap-2">
                            <Box>
                              <Text variant="breadcrumb">
                                {modul.moduleTitle} -{" "}
                                {modul.sections[0].sectionTitle}
                              </Text>
                            </Box>

                            <Box className="w-full flex flex-col gap-8">
                              {modul.sections[0].entries.map((entry) => (
                                <SetupContent
                                  key={entry.entryId}
                                  entry={entry}
                                  tabUpdate={tabUpdate}
                                  setTabUpdate={setTabUpdate}
                                />
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    );
                })}
              </>
            )}

            {asPath.endsWith(id) && (
              <>
                {ents && (
                  <>
                    {Array.isArray(ents[0].sections[0].entries) && (
                      <Box className="flex flex-col gap-2">
                        <Box>
                          <Text variant="breadcrumb">
                            {ents[0].moduleTitle} -{" "}
                            {ents[0].sections[0]?.sectionTitle}
                          </Text>
                        </Box>
                        <Box className="w-full flex flex-col gap-8">
                          <>
                            {ents[0].sections[0].entries.map((entry) => (
                              <SetupContent
                                key={entry.entryId}
                                entry={entry}
                                tabUpdate={tabUpdate}
                                setTabUpdate={setTabUpdate}
                              />
                            ))}
                          </>
                        </Box>
                      </Box>
                    )}
                  </>
                )}
              </>
            )}
          </Box>
        </div>
      )}
    </div>
  );
};

export default Entries;
