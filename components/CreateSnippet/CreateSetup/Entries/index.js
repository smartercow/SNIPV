import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Files from "./Files";
import { Box, Button, Divider, Input, Text } from "@chakra-ui/react";
import Accord from "./Accord";
import Packages from "./Packages";
import Entry from "./Entry";

const Quill = dynamic(() => import("./Quill"), {
  ssr: false,
});

const Entries = ({
  allHasNumericTitles,
  setAllHasNumericTitles,
  hasFolderStructure,
  setHasFolderStructure,
  hasNumericTitles,
  setHasNumericTitles,
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
  const initialCodeFileValue = {
    name: "",
    code: "",
    entryFileLang: initialSelectedLangFileExt,
    entryFileExt: initialSelectedFileExt,
  };
  const [codeFile, setCodeFile] = useState(initialCodeFileValue);
  const [codeFiles, setCodeFiles] = useState([]);

  const [summaryValue, setSummaryValue] = useState({});

  const [packages, setPackages] = useState([]);

  const [menu, setMenu] = useState("");
  const [selectedEntry, setSelectedEntry] = useState("summary");

  const showEditMenu = true;
  const [editSectionState, setEditSectionState] = useState(false);
  const [editSectionId, setEditSectionId] = useState("");
  const [editState, setEditState] = useState(false);
  const [editId, setEditId] = useState("");

  const [disableSave, setDisableSave] = useState(true);
  const [disableSum, setDisableSum] = useState(false);
  const [disableFiles, setDisableFiles] = useState(false);
  const [disablePackages, setDisablePackages] = useState(false);

  const randomValue = (Math.random() + 3).toString(36).substring(2);

  function ResetFiles() {
    setSelectLangFileExt(initialSelectedLangFileExt);
    setSelectedLangFileExt(initialSelectedLangFileExt);
    setSelectedFileExt(initialSelectedFileExt);
    setSelectFileExt(initialSelectedFileExt);
  }
  const AddCodeFile = (e) => {
    e.preventDefault();
    setCodeFiles((oldForm) => [
      ...oldForm,
      {
        fileId: randomValue,
        file: codeFile,
      },
    ]);
    setCodeFile(initialCodeFileValue);
    ResetFiles();
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
    ResetFiles();
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

  const addSummary = (e) => {
    e.preventDefault();
    setEntries((entSum) => [
      ...entSum,
      { entryId: randomValue, summary: summaryValue },
    ]);
    setSummaryValue({});
  };

  const AddSection = (e) => {
    e.preventDefault();
    setAllEntries((oldForm) => [
      ...oldForm,
      { sectionId: randomValue, sectionTitle: menu, entries: entries },
    ]);
    setSelectedEntry("summary");
    setCodeFile(initialCodeFileValue);
    setCodeFiles([]);
    setEntries([]);
    setMenu("");
    ResetFiles();
  };

  useEffect(() => {
    if (menu && Object.keys(entries).length > 0) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [menu, entries]);

  const editSection = () => {
    const editedSection = allEntries.map((obj) => {
      if (obj.sectionId === editSectionId) {
        return {
          ...obj,
          sectionTitle: menu,
          allHasNumericTitles: allHasNumericTitles,
          hasFolderStructure: hasFolderStructure,
          hasNumericTitles: hasNumericTitles,
          entries: entries,
        };
      }

      return obj;
    });
    setAllEntries(editedSection);
    setEntries([]);
    setEditSectionState(false);
    setEditSectionId("");
    setMenu("");
  };

  const CancelSectionEdit = () => {
    setEntries([]);
    setSummaryValue("");
    setPackages([]);
    setCodeFiles([]);
    setEditSectionState(false);
    setEditSectionId("");
    setMenu("");
  };

  const editSumEntry = () => {
    const editedSummary = entries.map((obj) => {
      if (obj.entryId === editId) {
        return { ...obj, summary: summaryValue };
      }

      return obj;
    });
    setEntries(editedSummary);
    setSummaryValue({});
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

  const DeleteEntry = (entry) => {
    setEntries(entries.filter((ent) => ent.entryId !== entry.entryId));
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

  const EditSummary = (entry) => {
    setSummaryValue(entry.summary),
      setEditState(true),
      setSelectedEntry("summary"),
      setEditId(entry.entryId);
  };

  const EditPackages = (entry) => {
    setPackages(entry.packages),
      setEditState(true),
      setSelectedEntry("packages"),
      setEditId(entry.entryId);
  };

  const EditFiles = (entry) => {
    setEditState(true),
      setEditId(entry.entryId),
      setSelectedEntry("code"),
      setCodeFiles(entry.files);
  };

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
    <Box className="flex flex-col gap-2">
      <Box>
        {!Object.keys(allEntries).length > 0 && (
          <Box py={2} px={4}>
            <Text fontWeight="semibold" color="gray.400">
              Tilføj sektion...
            </Text>
          </Box>
        )}

        <Accord
          showEditMenu={showEditMenu}
          entries={entries}
          setEntries={setEntries}
          allEntries={allEntries}
          setAllEntries={setAllEntries}
          editSectionState={editSectionState}
          setEditSectionState={setEditSectionState}
          editState={editState}
          editSectionId={editSectionId}
          setEditSectionId={setEditSectionId}
          setMenu={setMenu}
        />
      </Box>
      <Box p={4}>
        <Box borderWidth={1} borderRadius="md">
          <Box className="flex flex-col gap-3">
            <Box px={4} mt={4} className="flex gap-6 items-center">
              <div>
                <Text variant="H5" fontWeight="semibold" whiteSpace="nowrap">
                  Sektion Titel
                </Text>
              </div>
              <Input
                placeholder="Installation"
                value={menu}
                maxLength={20}
                onChange={(e) => setMenu(e.target.value)}
              />
            </Box>

            <Divider />

            <Box p={4}>
              {!Object.keys(entries).length > 0 && (
                <Box py={2} px={2}>
                  <Text fontWeight="semibold" color="gray.400">
                    Tilføj afsnit...
                  </Text>
                </Box>
              )}

              {Object.keys(entries).length > 0 && (
                <div className="flex flex-col gap-4">
                  <Entry
                    editState={editState}
                    editId={editId}
                    moveUp={moveUp}
                    moveDown={moveDown}
                    EditSummary={EditSummary}
                    EditPackages={EditPackages}
                    EditFiles={EditFiles}
                    DeleteEntry={DeleteEntry}
                    entries={entries}
                    setEntries={setEntries}
                  />
                </div>
              )}
            </Box>
          </Box>

          <Divider mt={3} />

          <Box>
            <Box p={4}>{renderEntry(selectedEntry)}</Box>

            <Box bg="PrimaryLighter" p={4}>
              <div>
                <Text variant="heading">Ny afsnit</Text>
              </div>

              <div className="flex gap-2 justify-between mt-1">
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
                    variant="entry"
                    disabled={disablePackages}
                    onClick={() => setSelectedEntry("packages")}
                  >
                    PAKKER
                  </Button>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="entry"
                    disabled={disableSave}
                    onClick={editSectionState ? editSection : AddSection}
                  >
                    {editSectionState ? "Opdatere" : "Tilføj sektion"}
                  </Button>

                  {editSectionState && (
                    <Button variant="entry" onClick={CancelSectionEdit}>
                      Annullere
                    </Button>
                  )}
                </div>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Entries;
