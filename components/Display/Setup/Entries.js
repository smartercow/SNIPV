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
  const [ents, setEnts] = useState();

  useEffect(() => {
    if (snippet) {
      setEnts(Object.values(snippet.entries));
    }
  }, [snippet]);

  console.log("PATH", asPath.match("Configuration"));
  return (
    <div>
      {ents && (
        <div className="flex gap-2">
          <div className="w-64">
            {ents.map((item, index) => (
              <div className="flex flex-col" key={index}>
                <a href={`#${String(item.section).replace(/ /g, "-")}`}>
                  <Box className="h-8 cursor-pointer hover:bg-gray-400 transition ease-in-out duration-300">
                    {item.section}
                  </Box>
                </a>
              </div>
            ))}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Entries;
