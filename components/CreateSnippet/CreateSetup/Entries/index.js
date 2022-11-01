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
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CloseIcon,
  CopyIcon,
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

  const [editState, setEditState] = useState(false);
  const [editId, setEditId] = useState("");

  const [disableSave, setDisableSave] = useState(true);
  const [disableSum, setDisableSum] = useState(false);
  const [disableFiles, setDisableFiles] = useState(false);
  const [disablePackages, setDisablePackages] = useState(false);

  const randomValue = (Math.random() + 3).toString(36).substring(2);

  const AddCodeFile = (e) => {
    e.preventDefault();
    setCodeFiles((oldForm) => [
      ...oldForm,
      {
        fileId: randomValue,
        file: codeFile,
        entryFileLang: selectedLangFileExt,
        entryFileExt: selectedFileExt,
      },
    ]);
    setCodeFile(initialCodeFileValue);
    setSelectLangFileExt(initialSelectedLangFileExt);
    setSelectedLangFileExt(initialSelectedLangFileExt);
    setSelectedFileExt(initialSelectedFileExt);
    setSelectFileExt(initialSelectedFileExt);
  };

  const AddCodeFiles = (e) => {
    e.preventDefault();
    setEntries((oldForm) => [
      ...oldForm,
      { entryId: randomValue, files: codeFiles },
    ]);
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
      { entryId: randomValue, packages: packages },
    ]);
    setSelectedEntry("summary");
    setPackages([]);
  };

  const AddSection = (e) => {
    e.preventDefault();
    setAllEntries((oldForm) => [
      ...oldForm,
      { sectionId: randomValue, section: menu, entries: entries },
    ]);
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
      { entryId: randomValue, summary: summaryValue },
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

  const editSumEntry = () => {
    const editedSummary = entries.map((obj) => {
      if (obj.entryId === editId) {
        return { ...obj, summary: summaryValue };
      }

      return obj;
    });
    setSummaryValue({});
    setEntries(editedSummary);
    setEditState(false);
    setEditId("");
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
            editState={editState}
            setEditState={setEditState}
            editSumEntry={editSumEntry}
            setEditId={setEditId}
          />
        );
      case "code":
        return (
          <Files
            initialCodeFileValue={initialCodeFileValue}
            initialSelectedFileExt={initialSelectedFileExt}
            initialSelectedLangFileExt={initialSelectedLangFileExt}
            codeFile={codeFile}
            setCodeFile={setCodeFile}
            codeFiles={codeFiles}
            setCodeFiles={setCodeFiles}
            AddCodeFiles={AddCodeFiles}
            AddCodeFile={AddCodeFile}
            editId={editId}
            setEditId={setEditId}
            editState={editState}
            entries={entries}
            setEntries={setEntries}
            setEditState={setEditState}
            selectLangFileExt={selectLangFileExt}
            setSelectLangFileExt={setSelectLangFileExt}
            selectFileExt={selectFileExt}
            setSelectFileExt={setSelectFileExt}
            selectedLangFileExt={selectedLangFileExt}
            setSelectedLangFileExt={setSelectedLangFileExt}
            selectedFileExt={selectedFileExt}
            setSelectedFileExt={setSelectedFileExt}
            setSelectedEntry={setSelectedEntry}
          />
        );
      case "packages":
        return (
          <Packages
            packages={packages}
            setPackages={setPackages}
            AddAllPackages={AddAllPackages}
            editState={editState}
            setEditState={setEditState}
            editId={editId}
            setEditId={setEditId}
            entries={entries}
            setEntries={setEntries}
          />
        );
      default:
        return (
          <Quill
            summaryValue={summaryValue}
            setSummaryValue={setSummaryValue}
            addSummary={addSummary}
            editState={editState}
            setEditState={setEditState}
            editSumEntry={editSumEntry}
            setEditId={setEditId}
          />
        );
    }
  };

  console.log("ENTERIES", entries);
  useEffect(() => {
    if (editState) {
      if (selectedEntry === "summary") {
        setDisableSum(false);
        setDisableFiles(true);
        setDisablePackages(true);
      }
      if (selectedEntry === "code") {
        setDisableSum(true);
        setDisableFiles(false);
        setDisablePackages(true);
      }
      if (selectedEntry === "packages") {
        setDisableSum(true);
        setDisableFiles(true);
        setDisablePackages(false);
      }
    } else {
      setDisableSum(false);
      setDisableFiles(false);
      setDisablePackages(false);
    }
  }, [editState, selectedEntry]);

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
              <div className="flex flex-col gap-4">
                {entries.map((entry, index) => {
                  return (
                    <Box key={index}>
                      {entry.summary && (
                        <Box>
                          <div className="flex gap-2 items-center">
                            <div className="flex-none">
                              <ButtonGroup
                                size="sm"
                                isAttached
                                variant="outline"
                              >
                                <IconButton
                                  aria-label="Up"
                                  borderBottomRadius="none"
                                  borderBottom="none"
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
                                  borderBottom="none"
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
                                  borderBottom="none"
                                  onClick={() => {
                                    setSummaryValue(entry.summary),
                                      setEditState(true),
                                      setSelectedEntry("summary"),
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
                                  aria-label="Delete"
                                  borderBottomRadius="none"
                                  borderBottom="none"
                                  disabled={
                                    editState && editId === entry.entryId
                                      ? true
                                      : false
                                  }
                                  onClick={() => {
                                    setEntries(
                                      entries.filter(
                                        (ent) => ent.entryId !== entry.entryId
                                      )
                                    );
                                  }}
                                  icon={
                                    <CloseIcon
                                      height={3}
                                      width={3}
                                      color="Red"
                                    />
                                  }
                                />
                              </ButtonGroup>
                            </div>
                            <Box className="flex-grow">
                              <Text
                                fontSize={14}
                                fontWeight="semibold"
                                textTransform="uppercase"
                              >
                                1.{index + 1}&nbsp;- Opsummering
                              </Text>
                            </Box>
                          </div>
                          <Box
                            borderColor={
                              editState && editId === entry.entryId
                                ? "PrimaryLighter"
                                : "Gray"
                            }
                            bg={
                              editState && editId === entry.entryId
                                ? "PrimaryLighter"
                                : "white"
                            }
                            p={4}
                            borderWidth={1}
                            borderRadius="md"
                            borderTopLeftRadius="none"
                            className="parse flex-grow"
                          >
                            {parse(entry.summary)}
                          </Box>
                        </Box>
                      )}

                      {entry.packages && (
                        <Box>
                          <div className="flex gap-2 items-center">
                            <div>
                              <ButtonGroup
                                size="sm"
                                isAttached
                                variant="outline"
                              >
                                <IconButton
                                  aria-label="Up"
                                  borderBottomRadius="none"
                                  borderBottom="none"
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
                                  borderBottom="none"
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
                                  borderBottom="none"
                                  onClick={() => {
                                    setPackages(entry.packages),
                                      setEditState(true),
                                      setSelectedEntry("packages"),
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
                                  aria-label="Delete"
                                  borderBottomRadius="none"
                                  borderBottom="none"
                                  disabled={
                                    editState && editId === entry.entryId
                                      ? true
                                      : false
                                  }
                                  onClick={() => {
                                    setEntries(
                                      entries.filter(
                                        (ent) => ent.entryId !== entry.entryId
                                      )
                                    );
                                  }}
                                  icon={
                                    <CloseIcon
                                      height={3}
                                      width={3}
                                      color="Red"
                                    />
                                  }
                                />
                              </ButtonGroup>
                            </div>
                            <Box className="flex-grow">
                              <Text
                                fontSize={14}
                                fontWeight="semibold"
                                textTransform="uppercase"
                              >
                                1.{index + 1}&nbsp;- Pakker
                              </Text>
                            </Box>
                          </div>
                          <Box
                            borderColor={
                              editState && editId === entry.entryId
                                ? "Primary"
                                : "Gray"
                            }
                            p={4}
                            borderWidth={1}
                            zIndex={4}
                            borderRadius="md"
                            borderTopLeftRadius="none"
                            className="flex flex-col gap-2"
                          >
                            {entry.packages.map((pack, index) => (
                              <Box
                                borderWidth={1}
                                borderRadius="md"
                                key={index}
                                className="flex items-center gap-1"
                              >
                                <div className="w-4 select-none">
                                  <Text
                                    fontWeight="semibold"
                                    className="text-center"
                                  >
                                    &nbsp;$
                                  </Text>
                                </div>
                                <div className="flex-grow">{pack.package}</div>
                                <div className="flex-none">
                                  <IconButton
                                    aria-label="Up"
                                    onClick={() => {}}
                                    icon={
                                      <CopyIcon
                                        height={4}
                                        width={4}
                                        color="gray.500"
                                      />
                                    }
                                  />
                                </div>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}

                      {entry.files && (
                        <>
                          <div className="flex items-center gap-2">
                            <div>
                              <ButtonGroup
                                size="sm"
                                isAttached
                                variant="outline"
                              >
                                <IconButton
                                  aria-label="Up"
                                  onClick={() => moveUp(index)}
                                  borderBottomRadius="none"
                                  borderBottom="none"
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
                                  borderBottom="none"
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
                                  borderBottom="none"
                                  onClick={() => {
                                    setEditState(true),
                                      setEditId(entry.entryId),
                                      setSelectedEntry("code"),
                                      setCodeFiles(entry.files);
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
                                  aria-label="Delete"
                                  borderBottomRadius="none"
                                  borderBottom="none"
                                  disabled={
                                    editState && editId === entry.entryId
                                      ? true
                                      : false
                                  }
                                  onClick={() => {
                                    setEntries(
                                      entries.filter(
                                        (ent) => ent.entryId !== entry.entryId
                                      )
                                    );
                                  }}
                                  icon={
                                    <CloseIcon
                                      height={3}
                                      width={3}
                                      color="Red"
                                    />
                                  }
                                />
                              </ButtonGroup>
                            </div>
                            <Box className="flex-grow">
                              <Text
                                fontSize={14}
                                fontWeight="semibold"
                                textTransform="uppercase"
                              >
                                1.{index + 1}&nbsp;- Filer
                              </Text>
                            </Box>
                          </div>
                          <Box
                            borderColor={
                              editState && editId === entry.entryId
                                ? "Primary"
                                : "Gray"
                            }
                            borderWidth={1}
                            borderRadius="md"
                            borderTopLeftRadius="none"
                          >
                            <Tabs variant="mainTab">
                              <TabList>
                                {entry.files.map((entry, index) => {
                                  return (
                                    <Tab key={index}>
                                      {entry.file.title}
                                      {entry.entryFileExt.label}
                                    </Tab>
                                  );
                                })}
                              </TabList>

                              <TabPanels>
                                {entry.files.map((entry, index) => {
                                  return (
                                    <TabPanel key={index}>
                                      <Syntax entry={entry} />
                                    </TabPanel>
                                  );
                                })}
                              </TabPanels>
                            </Tabs>
                          </Box>
                        </>
                      )}
                    </Box>
                  );
                })}
              </div>
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
                  disabled={disableSum}
                  onClick={() => setSelectedEntry("summary")}
                >
                  SUM
                </Button>
                <Button
                  variant="entry"
                  disabled={disableFiles}
                  onClick={() => setSelectedEntry("code")}
                >
                  FILER
                </Button>
                <Button
                  disabled={disablePackages}
                  onClick={() => setSelectedEntry("packages")}
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
