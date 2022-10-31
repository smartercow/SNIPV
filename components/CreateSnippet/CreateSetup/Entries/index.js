import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Files from "./Files";
import parse from "html-react-parser";

import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Icon,
  IconButton,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Syntax from "./Syntax";
import Accord from "./Accord";
import Packages from "./Packages";
import { EditDocumentIcon } from "../../../SVG/EditDocumentIcon";
import { CloseSquareIcon } from "../../../SVG/CloseSquareIcon";
import { ArrowUpSquareIcon } from "../../../SVG/ArrowUpSquareIcon";
import { ArrowDownSquareIcon } from "../../../SVG/ArrowDownSquareIcon";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CloseIcon,
  EditIcon,
} from "@chakra-ui/icons";

const Quill = dynamic(() => import("./Quill"), {
  ssr: false,
});

const initialCodeFileValue = {
  title: "",
  code: "",
};

const Entries = ({
  allEntries,
  setAllEntries,
  entries,
  setEntries,
  selectLangFileExt,
  setSelectLangFileExt,
  selectedLangFileExt,
  setSelectedLangFileExt,
  selectFileExt,
  setSelectFileExt,
  selectedFileExt,
  setSelectedFileExt,
  initialSelectedLangFileExt,
  initialSelectedFileExt,
}) => {
  const [codeFile, setCodeFile] = useState(initialCodeFileValue);
  const [codeFiles, setCodeFiles] = useState([]);

  const [summaryValue, setSummaryValue] = useState({});

  const [packages, setPackages] = useState([]);

  const [selectedEntry, setSelectedEntry] = useState("summary");
  const [menu, setMenu] = useState("");

  const [nextId, setNextId] = useState(1);
  const [editSum, setEditSum] = useState(false);
  const [editId, setEditId] = useState(0);

  const [disableSave, setDisableSave] = useState(true);

  const AddCodeFile = (e) => {
    e.preventDefault();
    setCodeFiles((oldForm) => [...oldForm, codeFile]);
    setCodeFile(initialCodeFileValue);
    setSelectLangFileExt(initialSelectedLangFileExt);
    setSelectedLangFileExt(initialSelectedLangFileExt);
    setSelectedFileExt(initialSelectedFileExt);
    setSelectFileExt(initialSelectedFileExt);
  };

  const AddCodeFiles = (e) => {
    e.preventDefault();
    setEntries((oldForm) => [...oldForm, { entryId: nextId, codeFiles }]);
    setSelectedEntry("summary");
    setCodeFile(initialCodeFileValue);
    setCodeFiles([]);
    setSelectLangFileExt(initialSelectedLangFileExt);
    setSelectedLangFileExt(initialSelectedLangFileExt);
    setSelectedFileExt(initialSelectedFileExt);
    setSelectFileExt(initialSelectedFileExt);
  };

  const AddAllPackages = (e) => {
    e.preventDefault();
    setEntries((oldForm) => [
      ...oldForm,
      { entryId: nextId, packages: packages },
    ]);
    setSelectedEntry("summary");
    setPackages([]);
    setNextId(nextId + 1);
  };

  const AddSection = (e) => {
    e.preventDefault();
    setAllEntries((oldForm) => [...oldForm, { section: menu, entries }]);
    setSelectedEntry("summary");
    setCodeFile(initialCodeFileValue);
    setCodeFiles([]);
    setEntries([]);
    setMenu("");
    setSelectLangFileExt(initialSelectedLangFileExt);
    setSelectedLangFileExt(initialSelectedLangFileExt);
    setSelectedFileExt(initialSelectedFileExt);
    setSelectFileExt(initialSelectedFileExt);
  };

  const addSummary = (e) => {
    e.preventDefault();
    setEntries((entSum) => [
      ...entSum,
      { entryId: nextId, summary: summaryValue },
    ]);
    setSummaryValue({});
    setNextId(nextId + 1);
  };

  useEffect(() => {
    if (menu && Object.keys(entries).length > 0) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [menu, entries]);

  const editSumEntry = () => {
    const editedSummary = entries.map((obj) => {
      if (obj.entryId === editId) {
        return { ...obj, summary: summaryValue };
      }

      return obj;
    });
    setSummaryValue({});
    setEntries(editedSummary);
    setEditSum(false);
    setEditId(0);
  };

  const moveUp = (index) => {
    if (index < 1 || index >= entries.length) return;

    setEntries((entries) => {
      entries = [...entries];

      [entries[index - 1], entries[index]] = [
        entries[index],
        entries[index - 1],
      ];

      return entries;
    });
  };

  // console.log("ENTER", entries);
  // console.log("nextId", nextId);

  const moveDown = (index) => {
    if (index >= entries.length - 1) return;

    setEntries((entries) => {
      entries = [...entries];

      [entries[index + 1], entries[index]] = [
        entries[index],
        entries[index + 1],
      ];

      return entries;
    });
  };

  const renderEntry = (ent) => {
    switch (ent) {
      case "summary":
        return (
          <Quill
            summaryValue={summaryValue}
            setSummaryValue={setSummaryValue}
            addSummary={addSummary}
            editSum={editSum}
            setEditSum={setEditSum}
            editSumEntry={editSumEntry}
            setEditId={setEditId}
          />
        );
      case "code":
        return (
          <Files
            codeFile={codeFile}
            setCodeFile={setCodeFile}
            codeFiles={codeFiles}
            AddCodeFiles={AddCodeFiles}
            AddCodeFile={AddCodeFile}
            selectLangFileExt={selectLangFileExt}
            setSelectLangFileExt={setSelectLangFileExt}
            selectFileExt={selectFileExt}
            setSelectFileExt={setSelectFileExt}
            selectedLangFileExt={selectedLangFileExt}
            setSelectedLangFileExt={setSelectedLangFileExt}
            selectedFileExt={selectedFileExt}
            setSelectedFileExt={setSelectedFileExt}
          />
        );
      case "package":
        return (
          <Packages
            packages={packages}
            setPackages={setPackages}
            AddAllPackages={AddAllPackages}
          />
        );
      default:
        return (
          <Quill
            summaryValue={summaryValue}
            setSummaryValue={setSummaryValue}
            addSummary={addSummary}
            editSum={editSum}
            setEditSum={setEditSum}
            editSumEntry={editSumEntry}
            setEditId={setEditId}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Box>
        <Accord allEntries={allEntries} />
      </Box>
      <Box borderWidth={1} borderRadius="md">
        <Box className="flex flex-col gap-3">
          <Box px={4} mt={4} className="flex gap-6 items-center">
            <div className="flex gap-1">
              <Text variant="H5" fontWeight="semibold">
                Menu
              </Text>
              <Text variant="H5" color="Red">
                *
              </Text>
            </div>
            <Input
              placeholder="Installation"
              variant="main"
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
            />
          </Box>

          <Divider />

          <Box p={4}>
            {!Object.keys(entries).length > 0 && (
              <Box py={4} px={2}>
                <Text variant="heading" color="gray.400">
                  Tilføj entries...
                </Text>
              </Box>
            )}

            {Object.keys(entries).length > 0 && (
              <Box>
                {entries.map((entry, index) => {
                  return (
                    <Box
                      borderColor="Gray"
                      borderWidth={1}
                      borderRadius="md"
                      mb={2}
                      p={2}
                      key={index}
                    >
                      {entry.summary && (
                        <div className="flex flex-col">
                          <div>
                            <ButtonGroup size="sm" isAttached variant="outline">
                              <IconButton
                                aria-label="Up"
                                onClick={() => moveUp(index)}
                                icon={
                                  <ArrowUpIcon
                                    height={5}
                                    width={5}
                                    color="gray.500"
                                  />
                                }
                              />
                              <IconButton
                                aria-label="Down"
                                onClick={() => moveDown(index)}
                                icon={
                                  <ArrowDownIcon
                                    height={5}
                                    width={5}
                                    color="gray.500"
                                  />
                                }
                              />
                              <IconButton
                                aria-label="Edit"
                                onClick={() => {
                                  setSummaryValue(entry.summary),
                                    setEditSum(true),
                                    setEditId(entry.entryId);
                                }}
                                icon={
                                  <EditIcon
                                    height={4}
                                    width={4}
                                    color="Primary"
                                  />
                                }
                              />
                              <IconButton
                                aria-label="Down"
                                onClick={() => {
                                  setEntries(
                                    entries.filter(
                                      (ent) => ent.entryId !== entry.entryId
                                    )
                                  );
                                }}
                                icon={
                                  <CloseIcon height={3} width={3} color="Red" />
                                }
                              />
                            </ButtonGroup>
                          </div>
                          <Box
                            mt={1}
                            borderColor={
                              editSum && editId === index
                                ? "PrimaryLighter"
                                : "Gray"
                            }
                            bg={
                              editSum && editId === index
                                ? "PrimaryLighter"
                                : "white"
                            }
                            className="parse flex-grow"
                          >
                            {parse(entry.summary)}
                          </Box>
                        </div>
                      )}

                      {entry.packages && (
                        <Box className="">
                          <div>
                            <Icon
                              as={ArrowUpSquareIcon}
                              h={6}
                              w={6}
                              fill="gray.700"
                              cursor="pointer"
                              onClick={() => moveUp(index)}
                            />
                            <Icon
                              as={ArrowDownSquareIcon}
                              h={6}
                              w={6}
                              fill="gray.700"
                              cursor="pointer"
                              onClick={() => moveDown(index)}
                            />
                            <Icon
                              as={EditDocumentIcon}
                              h={6}
                              w={6}
                              fill="Primary"
                              cursor="pointer"
                              onClick={() => {
                                setSummaryValue(entry.summary),
                                  setEditSum(true),
                                  setEditId(entry.id);
                              }}
                            />
                            <Icon
                              as={CloseSquareIcon}
                              h={6}
                              w={6}
                              fill="Red"
                              cursor="pointer"
                              onClick={() => {
                                setEntries(
                                  entries.filter((ent) => ent.id !== entry.id)
                                );
                              }}
                            />
                          </div>
                          <div>
                            {entry.packages.map((pack, index) => (
                              <div key={index}>{pack}</div>
                            ))}
                          </div>
                        </Box>
                      )}

                      {entry.codeFiles && (
                        <Tabs variant="mainTab">
                          <TabList>
                            {entry.codeFiles.map((entry, index) => {
                              return (
                                <Tab key={index}>
                                  {entry.title}
                                  {entry.entryFileExt.H5}
                                </Tab>
                              );
                            })}
                          </TabList>

                          <TabPanels>
                            {entry.codeFiles.map((entry, index) => {
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
              </Box>
            )}
          </Box>
        </Box>

        <Divider mt={3} />

        <Box>
          <Box p={4}>{renderEntry(selectedEntry)}</Box>

          <Box bg="PrimaryLighter" className="p-2">
            <div>
              <Text
                textTransform="uppercase"
                variant="heading"
                fontWeight="semibold"
              >
                Ny entry
              </Text>
            </div>

            <div className="flex gap-2 justify-between">
              <div className="flex gap-4">
                <Button
                  variant="entry"
                  onClick={() => setSelectedEntry("summary")}
                >
                  SUM
                </Button>
                <Button
                  variant="entry"
                  onClick={() => setSelectedEntry("code")}
                >
                  FILER
                </Button>
                <Button
                  onClick={() => setSelectedEntry("package")}
                  variant="entry"
                >
                  PAKKER
                </Button>
              </div>

              <div>
                <Button
                  disabled={disableSave}
                  variant="entry"
                  onClick={AddSection}
                >
                  FÆRDIG
                </Button>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Entries;
