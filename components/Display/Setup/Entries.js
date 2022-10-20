import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Syntax from "../../CreateSnippet/CreateSetup/Entries/Syntax";
import parse from "html-react-parser";

const Entries = ({ snippet }) => {
  //   const ets = Object.values(entries);
  //   console.log("ets", ets);
  const [ents, setEnts] = useState();

  useEffect(() => {
    if (snippet) {
      setEnts(Object.values(snippet.entries));
    }
  }, [snippet]);

  console.log("snippet", snippet);
  console.log("ents", ents);
  return (
    <div>
      {ents && (
        <>
          {ents.map((entry, index) => {
            return (
              <Box key={index} mb={5}>
                {!Array.isArray(entry) && (
                  <div className="parse">{parse(entry.summary)}</div>
                )}
                {Array.isArray(entry) && (
                  <Tabs variant="mainTab">
                    <TabList>
                      {entry.map((entry, index) => {
                        return (
                          <Tab key={index}>
                            {entry.title}
                            {entry.entryFileExt.label}
                          </Tab>
                        );
                      })}
                    </TabList>

                    <TabPanels>
                      {entry.map((entry, index) => {
                        return (
                          <TabPanel key={index}>
                            <Syntax entry={entry} />
                          </TabPanel>
                        );
                      })}
                    </TabPanels>
                  </Tabs>
                )}
              </Box>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Entries;
