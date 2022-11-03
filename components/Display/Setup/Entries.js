import {
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
      setEnts(Object.values(snippet.entries));
    }
  }, [snippet]);

  console.log("snippet1", snippet);
  return (
    <div>
      {ents && (
        <div className="flex gap-10">
          <div className="flex flex-col min-w-[10rem] max-w-[10rem]">
            {ents.map((item) => {
              if (
                asPath.endsWith(`#${String(item.section).replace(/ /g, "-")}`)
              )
                return (
                  <Box
                    bg="PrimaryLighter"
                    key={item.sectionId}
                    onClick={() =>
                      handleHref(`#${String(item.section).replace(/ /g, "-")}`)
                    }
                    className="py-2 px-3 cursor-pointer transition ease-in-out duration-300"
                  >
                    <Text color="Primary" fontWeight="semibold">
                      {item.section}
                    </Text>
                  </Box>
                );
              else
                return (
                  <Box
                    _hover={{ bg: "PrimaryLighter" }}
                    key={item.sectionId}
                    onClick={() =>
                      handleHref(`#${String(item.section).replace(/ /g, "-")}`)
                    }
                    className="py-2 px-3 cursor-pointer hover:bg-gray-400 transition ease-in-out duration-300"
                  >
                    {item.section}
                  </Box>
                );
            })}
          </div>

          <div className="h-full">
            {ents.map((item, index) => (
              <Box
                // id={`${String(item.section).replace(/ /g, "-")}`}
                key={item.sectionId}
                className="flex flex-col gap-2"
              >
                {asPath.endsWith(
                  `#${String(item.section).replace(/ /g, "-")}`
                ) === item.section && (
                  <Box>
                    <Text variant="breadcrumb">{item.section}</Text>
                  </Box>
                )}

                <Box className="flex flex-col gap-8">
                  {item.entries.map((entry, index) => {
                    if (
                      asPath.endsWith(
                        `#${String(item.section).replace(/ /g, "-")}`
                      )
                    )
                      return (
                        <Box key={index}>
                          {entry.summary && (
                            <Box className="parse">{parse(entry.summary)}</Box>
                          )}

                          {entry.packages && (
                            <Box className="flex flex-col gap-3 justify-center items-center">
                              {entry.packages.map((pack) => (
                                <PackageBox key={pack.packageId} pack={pack} />
                              ))}
                            </Box>
                          )}

                          {entry.files && (
                            <Box mx={2} className="flex justify-center">
                              <Box boxShadow="lg">
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
                      );
                  })}
                </Box>
              </Box>
            ))}

            {asPath.endsWith(id) && (
              <>
                {ents && (
                  <>
                    {ents[0].entries.map((entry, index) => (
                      <Box key={index} p={2} mb={2}>
                        {entry.summary && (
                          <Box className="parse">{parse(entry.summary)}</Box>
                        )}

                        {entry.packages && (
                          <Box className="flex flex-col gap-3 justify-center items-center">
                            {entry.packages.map((pack) => (
                              <PackageBox key={pack.packageId} pack={pack} />
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
                                        onClick={() => setTabUpdate(!tabUpdate)}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Entries;
