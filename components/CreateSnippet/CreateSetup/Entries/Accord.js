import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import Syntax from "./Syntax";
import parse from "html-react-parser";
import { CopyIcon } from "@chakra-ui/icons";

const Accord = ({ allEntries }) => {
  const { onCopy, hasCopied } = useClipboard("");
  const toast = useToast();

  console.log("allEntries", allEntries);

  return (
    <div>
      {allEntries && (
        <Accordion allowToggle>
          {allEntries.map((entries, index) => {
            return (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {index + 1}
                      {". "}
                      {entries.section}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                {entries.entries && (
                  <AccordionPanel>
                    {entries.entries.map((entry, index) => (
                      <Box key={index} p={2} mb={2}>
                        {entry.summary && (
                          <div className="parse">{parse(entry.summary)}</div>
                        )}

                        {entry.packages && (
                          <div className="flex flex-col gap-2">
                            {entry.packages.map((pack, index) => (
                              <Box
                                key={index}
                                borderWidth={1}
                                borderRadius="md"
                                height={10}
                                className="flex items-center gap-2"
                              >
                                <Box
                                  bg="BorderGray"
                                  borderLeftRadius="md"
                                  height={10}
                                  className="w-6 select-none flex items-center justify-center"
                                >
                                  <Text
                                    fontWeight="semibold"
                                    className="text-center"
                                    color="Primary"
                                    fontSize={17}
                                  >
                                    $
                                  </Text>
                                </Box>
                                <Box className="flex-grow">
                                  <Text>{pack.package}</Text>
                                </Box>
                                <div className="flex-none">
                                  <IconButton
                                    aria-label="Up"
                                    onClick={() => {
                                      onCopy,
                                        toast({
                                          title: "Kopieret",
                                          description: pack.package,
                                          status: "success",
                                          duration: 3000,
                                          isClosable: true,
                                        });
                                    }}
                                    icon={
                                      <CopyIcon
                                        height={4}
                                        width={4}
                                        color="Primary"
                                      />
                                    }
                                  />
                                </div>
                              </Box>
                            ))}
                          </div>
                        )}

                        {entry.files && (
                          <Tabs variant="mainTab">
                            <TabList>
                              {entry.files.map((e, index) => {
                                return (
                                  <Tab key={index}>
                                    {e.file.title}
                                    {e.entryFileExt.label}
                                  </Tab>
                                );
                              })}
                            </TabList>

                            <TabPanels>
                              {entry.files.map((e, index) => {
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
