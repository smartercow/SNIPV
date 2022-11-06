import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import PackageBox from "../../../CreateSnippet/CreateSetup/Entries/Packages/PackageBox";
import SyntaxPage from "../SyntaxPage";
import parse from "html-react-parser";

const SetupContent = ({ entry, tabUpdate, setTabUpdate }) => {
  return (
    <Box className="flex flex-col gap-4">
      {entry.summary && (
        <Box className="parse w-full">{parse(entry.summary)}</Box>
      )}

      {entry.packages && (
        <Box className="flex flex-col gap-3 justify-center items-center w-full">
          {entry.packages.map((pack) => (
            <PackageBox key={pack.packageId} pack={pack} />
          ))}
        </Box>
      )}

      {entry.files && (
        <Box
          mx={2}
          // className="flex justify-center"
        >
          <Box boxShadow="lg">
            <Tabs variant="mainTab">
              <TabList>
                {entry.files.map((f) => {
                  return (
                    <Tab
                      key={f.fileId}
                      onClick={() => setTabUpdate(!tabUpdate)}
                    >
                      {f.file.name}
                      {f.file.entryFileExt.label}
                    </Tab>
                  );
                })}
              </TabList>
              <TabPanels p={0}>
                {entry.files.map((f) => {
                  return (
                    <TabPanel key={f.fileId}>
                      <SyntaxPage tabUpdate={tabUpdate} entry={f} />
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SetupContent;
