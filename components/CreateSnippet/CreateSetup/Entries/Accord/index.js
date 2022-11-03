import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ButtonGroup,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import Syntax from "../Syntax";
import parse from "html-react-parser";
import PackageBox from "../Packages/PackageBox";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CloseIcon,
  EditIcon,
} from "@chakra-ui/icons";

const Accord = ({
  entries,
  setEntries,
  allEntries,
  setAllEntries,
  editSectionState,
  setEditSectionState,
  editSectionId,
  setEditSectionId,
  setMenu,
}) => {
  const moveUp = (index) => {
    if (index < 1 || index >= allEntries.length) return;

    setAllEntries((allEntries) => {
      allEntries = [...allEntries];

      [allEntries[index - 1], allEntries[index]] = [
        allEntries[index],
        allEntries[index - 1],
      ];

      return allEntries;
    });
  };

  const moveDown = (index) => {
    if (index >= allEntries.length - 1) return;

    setAllEntries((allEntries) => {
      allEntries = [...allEntries];

      [allEntries[index + 1], allEntries[index]] = [
        allEntries[index],
        allEntries[index + 1],
      ];

      return allEntries;
    });
  };

  const DeleteEntry = (entry) => {
    setAllEntries(entries.filter((ent) => ent.entryId !== entry.entryId));
  };

  console.log("allEntries", allEntries);
  console.log("entries", entries);
  console.log("editSectionId", editSectionId);

  return (
    <div>
      {allEntries && (
        <Accordion allowToggle>
          {allEntries.map((entry, index) => {
            return (
              <AccordionItem key={index}>
                <div className="flex-none">
                  <ButtonGroup size="sm" isAttached variant="outline">
                    <IconButton
                      aria-label="Up"
                      borderBottomRadius="outline"
                      borderBottom="none"
                      onClick={() => moveUp(index)}
                      icon={
                        <ArrowUpIcon height={5} width={5} color="gray.500" />
                      }
                    />
                    <IconButton
                      aria-label="Down"
                      borderBottom="none"
                      onClick={() => moveDown(index)}
                      icon={
                        <ArrowDownIcon height={5} width={5} color="gray.500" />
                      }
                    />
                    <IconButton
                      aria-label="Edit"
                      borderBottom="none"
                      onClick={() => {
                        setEntries(entry.entries),
                          setEditSectionState(true),
                          setEditSectionId(entry.sectionId);
                        setMenu(entry.section);
                      }}
                      icon={<EditIcon height={4} width={4} color="Primary" />}
                    />
                    <IconButton
                      aria-label="Delete"
                      borderBottomRadius="none"
                      borderBottom="none"
                      /* disabled={
                        editState && editId === entry.entryId ? true : false
                      } */
                      onClick={() => DeleteEntry(entry)}
                      icon={<CloseIcon height={3} width={3} color="Red" />}
                    />
                  </ButtonGroup>
                </div>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {index + 1}
                      {". "}
                      {entry.section}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                {entry.entries && (
                  <AccordionPanel>
                    {entry.entries.map((entry, index) => (
                      <Box key={index} p={2} mb={2}>
                        {entry.summary && (
                          <Box className="parse">{parse(entry.summary)}</Box>
                        )}

                        {entry.packages && (
                          <div className="flex flex-col gap-2">
                            {entry.packages.map((pack, index) => (
                              <Box
                                key={index}
                                borderWidth={1}
                                borderRadius="md"
                                height={10}
                              >
                                <PackageBox pack={pack} />
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
                                    {e.file.name}
                                    {e.file.entryFileExt.label}
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
