import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import Syntax from "./Syntax";
import parse from "html-react-parser";

const Accord = ({ allEntries }) => {
  console.log("allEntries", allEntries);
  return (
    <div>
      {allEntries && (
        <Accordion allowToggle>
          {allEntries.map((item, index) => {
            return (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {index + 1}
                      {". "}
                      {item.section}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                {item.entries && (
                  <AccordionPanel>
                    {item.entries.map((entry, index) => (
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
                                    <Syntax entry={e} />
                                  </TabPanel>
                                );
                              })}
                            </TabPanels>
                          </Tabs>
                        )}
                      </Box>
                    ))}
                  </AccordionPanel>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
};

export default Accord;
