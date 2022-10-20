import dynamic from "next/dynamic";
import React, { useState } from "react";
import Files from "./Files";
import parse from "html-react-parser";

import {
  Box,
  Button,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Syntax from "./Syntax";

const Quill = dynamic(() => import("./Quill"), {
  ssr: false,
});

const initialCodeFileValue = {
  title: "",
  code: "",
};

const Entries = ({
  enteries,
  setEnteries,
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
  //Code
  const [codeFile, setCodeFile] = useState(initialCodeFileValue);
  const [codeFiles, setCodeFiles] = useState([]);

  const [summaryValue, setSummaryValue] = useState({});

  const [selectedEntry, setSelectedEntry] = useState("summary");

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
    setEnteries((oldForm) => [...oldForm, codeFiles]);
    setSelectedEntry("summary");
    setCodeFile(initialCodeFileValue);
    setCodeFiles([]);
    setSelectLangFileExt(initialSelectedLangFileExt);
    setSelectedLangFileExt(initialSelectedLangFileExt);
    setSelectedFileExt(initialSelectedFileExt);
    setSelectFileExt(initialSelectedFileExt);
  };
  //Code

  //Summary

  const addSummary = (e) => {
    e.preventDefault();
    setEnteries((entSum) => [...entSum, { summary: summaryValue }]);
    setSummaryValue({});
  };

  const renderEntry = (ent) => {
    switch (ent) {
      case "summary":
        return (
          <Quill
            summaryValue={summaryValue}
            setSummaryValue={setSummaryValue}
            addSummary={addSummary}
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
      default:
        return (
          <Quill
            summaryValue={summaryValue}
            setSummaryValue={setSummaryValue}
            addSummary={addSummary}
          />
        );
    }
  };

  console.log("enteries", enteries);
  return (
    <div className="mb-5">
      <Box mb={3}>
        {!Object.keys(enteries).length > 0 && (
          <Box
            borderColor="iGrayLight"
            borderWidth={1}
            borderRadius="md"
            p={2}
            className=""
          >
            <Text variant="heading" color="gray.400">
              Tilføj enteries...
            </Text>
          </Box>
        )}

        {enteries.map((entry, index) => {
          return (
            <Box
              borderColor="Gray"
              borderWidth={1}
              borderRadius="md"
              p={2}
              key={index}
              mb={2}
            >
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
      </Box>

      <Box boxShadow="2xl" borderRadius="lg">
        <div className="p-2">{renderEntry(selectedEntry)}</div>
        <Divider my={2} />
        <Box bg="PrimaryLighter" className="p-2">
          <div>
            <Text variant="heading">Tilføj ny entry</Text>
          </div>
          <div className="flex gap-4">
            <Button
              style={{ color: "white" }}
              variant="entry"
              onClick={() => setSelectedEntry("summary")}
            >
              SUM {/* Opsummering */}
            </Button>
            <Button
              style={{ color: "white" }}
              variant="entry"
              onClick={() => setSelectedEntry("code")}
            >
              FILER
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Entries;
