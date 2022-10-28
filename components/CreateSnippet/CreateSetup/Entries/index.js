import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Files from "./Files";
import parse from "html-react-parser";

import {
  Box,
  Button,
  Divider,
  Icon,
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

const Quill = dynamic(() => import("./Quill"), {
  ssr: false,
});

const initialCodeFileValue = {
  title: "",
  code: "",
};

let nextId = 0;

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

  const [editSum, setEditSum] = useState(false);

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
    setEntries((oldForm) => [...oldForm, { codeFiles }]);
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
    setEntries((oldForm) => [...oldForm, { packages: packages }]);
    setSelectedEntry("summary");
    setPackages([]);
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
      { id: nextId++, summary: summaryValue },
    ]);
    setSummaryValue({});
  };

  useEffect(() => {
    if (menu && Object.keys(entries).length > 0) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [menu, entries]);

  console.log("ENTRIES", entries);

  function editSumEntry(summary) {
    setSummaryValue({});
    const edit = entries.map((obj) => {
      if (entries.summary === summary) {
        return { ...object, summary: summaryValue };
      }
    });
    setEditSum(false);
    console.log("EDITTT", edit);
  }

  const moveUp = (index) => {
    if (index < 1 || index >= entries.length) {
      return;
    }

    setEntries(
      ([entries[index - 1], entries[index]] = [
        entries[index],
        entries[index - 1],
      ])
    );
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
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Box>
        <Accord allEntries={allEntries} />
      </Box>
      <div className="border border-gray-400 rounded-md">
        <Box p={4} className="flex flex-col gap-3">
          <Box className="flex gap-6 items-center">
            <div className="flex gap-1">
              <Text variant="H5">Menu</Text>
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
          <Box>
            {!Object.keys(entries).length > 0 && (
              <Box
                borderColor="Gray"
                borderWidth={1}
                borderRadius="md"
                className=""
                py={4}
                px={2}
              >
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
                      p={2}
                      mb={2}
                      key={index}
                    >
                      {entry.summary && (
                        <div className="flex flex-col">
                          <div className="flex">
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
                            />
                            <Icon
                              as={EditDocumentIcon}
                              h={6}
                              w={6}
                              fill="Primary"
                              cursor="pointer"
                              onClick={() => {
                                setSummaryValue(entry.summary),
                                  setEditSum(true);
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
                          <div className="parse flex grow">
                            {parse(entry.summary)}
                          </div>
                        </div>
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

        <Divider my={3} />

        <Box boxShadow="2xl" borderRadius="lg">
          <Box p={4}>{renderEntry(selectedEntry)}</Box>

          <Box bg="PrimaryLighter" className="p-2">
            <div>
              <Text variant="heading">Ny entry</Text>
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
      </div>
    </div>
  );
};

export default Entries;
