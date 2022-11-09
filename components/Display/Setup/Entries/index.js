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
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Entries = ({ snippet }) => {
  const { asPath } = useRouter();
  const {
    query: { id },
  } = useRouter();

  const [tabUpdate, setTabUpdate] = useState(false);
  const [ents, setEnts] = useState();

  useEffect(() => {
    if (snippet) {
      setEnts(Object.values(snippet.modules));
    }
  }, [snippet]);

  console.log(snippet);

  return (
    <div>
      {ents && (
        <div className="flex gap-5 justify-between">
          <SideMenu snippet={snippet} modules={ents} />

          <Box className=" w-full max-w-[54rem]">
            {snippet && asPath.endsWith("/folderstructure") && (
              <Box>
                <Text variant="breadcrumb">Mappestruktur</Text>
                <SyntaxHighlighter
                  language=""
                  codeTagProps={{ style: { fontFamily: "Source Code Pro" } }}
                  style={oneLight}
                  lineProps={{
                    style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
                  }}>
                  {snippet.setupFolderStructure}
                </SyntaxHighlighter>
              </Box>
            )}

            {ents.map((modul, index) => {
              if (asPath.startsWith(`/setup/${id}/${String(modul.moduleTitle).replace(/ /g, "-")}`))
                return (
                  <Box key={index} className=" w-full">
                    {snippet && asPath.endsWith(`/${String(modul.moduleTitle).replace(/ /g, "-")}#folderstructure`) && (
                      <Box>
                        <Box className="flex gap-1">
                          <Text variant="breadcrumb">{modul.moduleTitle}</Text>
                          <Text variant="breadcrumb">
                            <ChevronRightIcon fontSize={24} />
                          </Text>
                          <Text variant="breadcrumb">Mappestruktur</Text>
                        </Box>

                        <SyntaxHighlighter
                          language=""
                          codeTagProps={{ style: { fontFamily: "Source Code Pro" } }}
                          style={oneLight}
                          lineProps={{
                            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
                          }}>
                          {modul.folderStructure}
                        </SyntaxHighlighter>
                      </Box>
                    )}

                    {Array.isArray(modul.sections) && (
                      <>
                        <Box>
                          {modul.sections.map((sect) => {
                            if (
                              asPath.endsWith(
                                `/${String(modul.moduleTitle).replace(/ /g, "-")}#${String(sect.sectionTitle).replace(
                                  / /g,
                                  "-"
                                )}`
                              )
                            )
                              return (
                                <Box key={sect.sectionId} className="flex flex-col gap-3">
                                  <Box className="flex gap-1">
                                    <Text variant="breadcrumb">{modul.moduleTitle}</Text>
                                    <Text variant="breadcrumb">
                                      <ChevronRightIcon fontSize={24} />
                                    </Text>
                                    <Text variant="breadcrumb">{sect.sectionTitle}</Text>
                                  </Box>

                                  <Box className="w-full flex flex-col gap-8">
                                    {Array.isArray(sect.entries) && (
                                      <>
                                        {sect.entries.map((entry, index) => (
                                          <SetupContent
                                            key={index}
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

                    {asPath.endsWith(`/${String(modul.moduleTitle).replace(/ /g, "-")}`) && (
                      <Box className="flex flex-col gap-2">
                        <Box>
                          <Text variant="breadcrumb">
                            {modul.moduleTitle} - {modul.sections[0].sectionTitle}
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

            {asPath.endsWith(id) && (
              <>
                {ents && (
                  <>
                    {Array.isArray(ents[0].sections[0].entries) && (
                      <Box className="flex flex-col gap-2">
                        <Box>
                          <Text variant="breadcrumb">
                            {ents[0].moduleTitle} - {ents[0].sections[0]?.sectionTitle}
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
