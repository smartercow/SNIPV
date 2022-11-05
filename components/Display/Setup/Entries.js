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
import Syntax from "../../CreateSnippet/CreateSetup/Entries/Syntax";
import PackageBox from "../../CreateSnippet/CreateSetup/Entries/Packages/PackageBox";
import SyntaxPage from "./SyntaxPage";

const Entries = ({ snippet }) => {
  const { asPath } = useRouter();
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();

  const [tabUpdate, setTabUpdate] = useState(false);
  const [ents, setEnts] = useState();

  const handleHref = (link) => {
    router.push(link);
  };

  useEffect(() => {
    if (snippet) {
      setEnts(Object.values(snippet.modules));
    }
  }, [snippet]);

  console.log("ENTSSS", ents);
  return (
    <div>
      {ents && (
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col min-w-[10rem] max-w-[10rem]">
            <Accordion allowToggle>
              {ents.map((item) => {
                if (
                  asPath.endsWith(
                    `#${String(item.moduleTitle).replace(/ /g, "-")}`
                  )
                )
                  return (
                    <Box
                      key={item.moduleId}
                      onClick={() =>
                        handleHref(
                          `#${String(item.moduleTitle).replace(/ /g, "-")}`
                        )
                      }
                      className="cursor-pointer transition ease-in-out duration-300 w-[16rem]"
                    >
                      <AccordionItem>
                        <h2>
                          <AccordionButton p={2}>
                            <Box flex="1" textAlign="left">
                              <Text
                                fontSize={15}
                                color="Primary"
                                fontWeight="semibold"
                              >
                                {item.moduleTitle}
                              </Text>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel p={0}>
                          {item.sections.map((sect, index) => (
                            <Box key={index} py={1} px={4} bg="PrimaryLighter">
                              <Text
                                fontSize={15}
                                color="Primary"
                                fontWeight="semibold"
                              >
                                {sect.section}
                              </Text>
                            </Box>
                          ))}
                        </AccordionPanel>
                      </AccordionItem>
                    </Box>
                  );
                else
                  return (
                    <Box
                      _hover={{ bg: "PrimaryLighter" }}
                      key={item.moduleId}
                      onClick={() =>
                        handleHref(
                          `#${String(item.moduleTitle).replace(/ /g, "-")}`
                        )
                      }
                      className="cursor-pointer hover:bg-gray-400 transition ease-in-out duration-300 w-[16rem]"
                    >
                      <AccordionItem p={0}>
                        <h2>
                          <AccordionButton p={2}>
                            <Box flex="1" textAlign="left">
                              <Text fontSize={15} fontWeight="semibold">
                                {item.moduleTitle}
                              </Text>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel p={0}>
                          {item.sections.map((sect, index) => (
                            <Box key={index}>
                              <Text fontSize={15} fontWeight="semibold">
                                {sect.section}
                              </Text>
                            </Box>
                          ))}
                        </AccordionPanel>
                      </AccordionItem>
                    </Box>
                  );
              })}
            </Accordion>
          </div>

          <Box className=" w-full max-w-[54rem]">
            {ents && (
              <>
                {ents.map((modul, index) => {
                  if (
                    asPath.endsWith(
                      `#${String(modul.moduleTitle).replace(/ /g, "-")}`
                    )
                  )
                    return (
                      <Box key={index} className="flex flex-col gap-2 w-full">
                        <Box>
                          <Text variant="breadcrumb">{modul.moduleTitle}</Text>
                        </Box>
                        {Array.isArray(modul.sections) && (
                          <>
                            <Box>
                              {modul.sections.map((sect, index) => (
                                <Box
                                  key={index}
                                  className="w-full flex flex-col gap-8"
                                >
                                  {Array.isArray(sect.entries) && (
                                    <>
                                      {sect.entries.map((item, index) => (
                                        <Box
                                          // id={`${String(item.section).replace(/ /g, "-")}`}
                                          key={index}
                                          className="flex flex-col gap-4"
                                        >
                                          {item.summary && (
                                            <Box className="parse w-full">
                                              {parse(item.summary)}
                                            </Box>
                                          )}

                                          {item.packages && (
                                            <Box className="flex flex-col gap-3 justify-center items-center w-full">
                                              {item.packages.map((pack) => (
                                                <PackageBox
                                                  key={pack.packageId}
                                                  pack={pack}
                                                />
                                              ))}
                                            </Box>
                                          )}

                                          {item.files && (
                                            <Box
                                              mx={2}
                                              // className="flex justify-center"
                                            >
                                              <Box boxShadow="lg">
                                                <Tabs variant="mainTab">
                                                  <TabList>
                                                    {item.files.map((f) => {
                                                      return (
                                                        <Tab
                                                          key={f.fileId}
                                                          onClick={() =>
                                                            setTabUpdate(
                                                              !tabUpdate
                                                            )
                                                          }
                                                        >
                                                          {f.file.name}
                                                          {
                                                            f.file.entryFileExt
                                                              .label
                                                          }
                                                        </Tab>
                                                      );
                                                    })}
                                                  </TabList>
                                                  <TabPanels p={0}>
                                                    {item.files.map((f) => {
                                                      return (
                                                        <TabPanel
                                                          key={f.fileId}
                                                        >
                                                          <SyntaxPage
                                                            tabUpdate={
                                                              tabUpdate
                                                            }
                                                            entry={f}
                                                          />
                                                        </TabPanel>
                                                      );
                                                    })}
                                                  </TabPanels>
                                                </Tabs>
                                              </Box>
                                            </Box>
                                          )}
                                        </Box>
                                      ))}
                                    </>
                                  )}
                                </Box>
                              ))}
                            </Box>
                          </>
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
                      <>
                        {ents[0].sections[0].entries.map((entry, index) => (
                          <Box key={index} p={2} mb={2}>
                            {entry.summary && (
                              <Box className="parse">
                                {parse(entry.summary)}
                              </Box>
                            )}
                            {entry.packages && (
                              <Box className="flex flex-col gap-3 justify-center items-center">
                                {entry.packages.map((pack) => (
                                  <PackageBox
                                    key={pack.packageId}
                                    pack={pack}
                                  />
                                ))}
                              </Box>
                            )}

                            {entry.files && (
                              <Box mx={2} className="flex justify-center">
                                <Box boxShadow="lg" borderRadius="md">
                                  <Tabs variant="mainTab">
                                    <TabList>
                                      {entry.files.map((f) => {
                                        return (
                                          <Tab
                                            key={f.fileId}
                                            onClick={() =>
                                              setTabUpdate(!tabUpdate)
                                            }
                                          >
                                            {f.file.name}
                                            {f.file.entryFileExt.label}
                                          </Tab>
                                        );
                                      })}
                                    </TabList>
                                    <TabPanels p={0}>
                                      {entry.files.map((f) => {
                                        return (
                                          <TabPanel key={f.fileId}>
                                            <SyntaxPage
                                              tabUpdate={tabUpdate}
                                              entry={f}
                                            />
                                          </TabPanel>
                                        );
                                      })}
                                    </TabPanels>
                                  </Tabs>
                                </Box>
                              </Box>
                            )}
                          </Box>
                        ))}
                      </>
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
