import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import SyntaxPage from "./SyntaxPage";
import { useRouter } from "next/router";

const Entries = ({ snippet }) => {
  const { asPath } = useRouter();
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();

  const [ents, setEnts] = useState();

  const handleHref = (link) => {
    router.push(link);
  };

  useEffect(() => {
    if (snippet) {
      setEnts(Object.values(snippet.entries));
    }
  }, [snippet]);

  console.log(id);
  console.log("ents", ents);
  return (
    <div>
      {ents && (
        <div className="flex gap-2">
          <div className="w-64">
            <div className="flex flex-col">
              {ents.map((item, index) => {
                if (
                  asPath.endsWith(`#${String(item.section).replace(/ /g, "-")}`)
                )
                  return (
                    <Box
                      bg="PrimaryLighter"
                      key={index}
                      onClick={() =>
                        handleHref(
                          `#${String(item.section).replace(/ /g, "-")}`
                        )
                      }
                      className="py-2 px-3 cursor-pointer transition ease-in-out duration-300"
                    >
                      {item.section}
                    </Box>
                  );
                else
                  return (
                    <Box
                      _hover={{ bg: "PrimaryLighter" }}
                      key={index}
                      onClick={() =>
                        handleHref(
                          `#${String(item.section).replace(/ /g, "-")}`
                        )
                      }
                      className="py-2 px-3 cursor-pointer hover:bg-gray-400 transition ease-in-out duration-300"
                    >
                      {item.section}
                    </Box>
                  );
              })}
            </div>
          </div>

          <div>
            {ents.map((item, index) => (
              <div
                id={`${String(item.section).replace(/ /g, "-")}`}
                className=""
                key={item + index}
              >
                {item.entries.map((entry, index) => {
                  if (
                    asPath.endsWith(
                      `#${String(item.section).replace(/ /g, "-")}`
                    )
                  )
                    return (
                      <Box key={index} p={2} mb={2}>
                        {entry.summary && (
                          <div className="parse">{parse(entry.summary)}</div>
                        )}

                        {entry.packages && (
                          <>
                            {entry.packages.map((pack, index) => (
                              <div key={index}>{pack}</div>
                            ))}
                          </>
                        )}

                        {entry.codeFiles && (
                          <Tabs variant="mainTab">
                            <TabList>
                              {entry.codeFiles.map((e, index) => {
                                return (
                                  <Tab key={index}>
                                    {e.title}
                                    {e.entryFileExt.label}
                                  </Tab>
                                );
                              })}
                            </TabList>

                            <TabPanels>
                              {entry.codeFiles.map((e, index) => {
                                return (
                                  <TabPanel key={index}>
                                    <SyntaxPage entry={e} />
                                  </TabPanel>
                                );
                              })}
                            </TabPanels>
                          </Tabs>
                        )}
                      </Box>
                    );
                })}
              </div>
            ))}

            {asPath.endsWith(id) && (
              <>
                {ents && (
                  <>
                    {ents[0].entries.map((entry, index) => (
                      <Box key={index} p={2} mb={2}>
                        {entry.summary && (
                          <div className="parse">{parse(entry.summary)}</div>
                        )}

                        {entry.packages && (
                          <>
                            {entry.packages.map((pack, index) => (
                              <div key={index}>{pack}</div>
                            ))}
                          </>
                        )}

                        {entry.codeFiles && (
                          <Tabs variant="mainTab">
                            <TabList>
                              {entry.codeFiles.map((e, index) => {
                                return (
                                  <Tab key={index}>
                                    {e.title}
                                    {e.entryFileExt.label}
                                  </Tab>
                                );
                              })}
                            </TabList>

                            <TabPanels>
                              {entry.codeFiles.map((e, index) => {
                                return (
                                  <TabPanel key={index}>
                                    <SyntaxPage entry={e} />
                                  </TabPanel>
                                );
                              })}
                            </TabPanels>
                          </Tabs>
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
