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
import { AddIcon, ArrowDownIcon, ArrowUpIcon, CloseIcon, EditIcon, MinusIcon } from "@chakra-ui/icons";

const Accord = ({
  allHasNumericTitles,
  showEditMenu,
  currIndex,
  setHasFolderStructure,
  hasNumericTitles,
  setHasNumericTitles,
  entries,
  setEntries,
  allEntries,
  setAllEntries,
  editSectionState,
  setEditSectionState,
  editId,
  editState,
  editSectionId,
  setEditSectionId,
  setMenu,
}) => {
  const moveUp = (index) => {
    if (index < 1 || index >= allEntries.length) return;

    setAllEntries((allEntries) => {
      allEntries = [...allEntries];

      [allEntries[index - 1], allEntries[index]] = [allEntries[index], allEntries[index - 1]];

      return allEntries;
    });
  };

  const moveDown = (index) => {
    if (index >= allEntries.length - 1) return;

    setAllEntries((allEntries) => {
      allEntries = [...allEntries];

      [allEntries[index + 1], allEntries[index]] = [allEntries[index], allEntries[index + 1]];

      return allEntries;
    });
  };

  const DeleteEntry = (entry) => {
    setAllEntries(entries.filter((ent) => ent.entryId !== entry.entryId));
  };

  return (
    <div>
      {allEntries && (
        <Accordion allowToggle>
          {allEntries.map((entry, index) => {
            return (
              <AccordionItem key={index} mb={2} border="none">
                {({ isExpanded }) => (
                  <>
                    <div className="flex-none">
                      {showEditMenu && (
                        <ButtonGroup size="sm" isAttached variant="outline">
                          <IconButton
                            aria-label="Up"
                            borderBottomRadius="outline"
                            borderBottom="none"
                            borderBottomLeftRadius="none"
                            onClick={() => moveUp(index)}
                            icon={<ArrowUpIcon height={5} width={5} color="gray.500" />}
                          />
                          <IconButton
                            aria-label="Down"
                            borderBottom="none"
                            onClick={() => moveDown(index)}
                            icon={<ArrowDownIcon height={5} width={5} color="gray.500" />}
                          />
                          <IconButton
                            aria-label="Edit"
                            borderBottom="none"
                            onClick={() => {
                              setEntries(entry.entries),
                                setEditSectionState(true),
                                setEditSectionId(entry.sectionId),
                                setMenu(entry.sectionTitle),
                                setHasFolderStructure(entry.hasFolderStructure),
                                setHasNumericTitles(entry.numericTitles);
                            }}
                            icon={<EditIcon height={4} width={4} color="Primary" />}
                          />
                          <IconButton
                            aria-label="Delete"
                            borderBottomRadius="none"
                            borderBottom="none"
                            disabled={
                              editSectionState && editSectionId === entry.entryId
                                ? true
                                : editState && editId === entry.entryId
                                ? true
                                : false
                            }
                            onClick={() => DeleteEntry(entry)}
                            icon={<CloseIcon height={3} width={3} color="Red" />}
                          />
                        </ButtonGroup>
                      )}
                    </div>
                    <h2>
                      <AccordionButton
                        borderRadius={10}
                        bg="iGrayLight"
                        borderTopLeftRadius="none"
                        _hover={{ bg: "PrimaryELight" }}
                        _expanded={{
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                        }}>
                        <Box flex="1" textAlign="left">
                          {allHasNumericTitles && (
                            <>
                              {currIndex}
                              {". "}
                            </>
                          )}
                          {hasNumericTitles && (
                            <>
                              {index + 1}
                              {". "}
                            </>
                          )}
                          {entry.sectionTitle}
                        </Box>
                        {isExpanded ? <MinusIcon fontSize="12px" /> : <AddIcon fontSize="12px" />}
                      </AccordionButton>
                    </h2>
                    {entry.entries && (
                      <AccordionPanel borderWidth={1} borderColor="iGrayLight">
                        {entry.entries.map((entry, index) => (
                          <Box key={index} p={2} mb={1}>
                            {entry.summary && <Box className="parse">{parse(entry.summary)}</Box>}

                            {entry.packages && (
                              <div className="flex flex-col gap-2">
                                {entry.packages.map((pack, index) => (
                                  <Box key={index} height={10}>
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
                  </>
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
