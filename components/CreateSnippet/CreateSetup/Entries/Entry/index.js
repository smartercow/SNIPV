import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import PackageBox from "../Packages/PackageBox";
import Syntax from "../Syntax";
import parse from "html-react-parser";
import EditMenu from "../EditMenu";

const Entry = ({
  entries,
  setEntries,
  editState,
  editId,
  moveUp,
  moveDown,
  EditSummary,
  EditPackages,
  EditFiles,
  DeleteEntry,
}) => {
  return (
    <Box>
      {Object.keys(entries).length > 0 && (
        <div className="flex flex-col gap-4">
          {entries.map((entry, index) => {
            return (
              <Box key={index}>
                <EditMenu
                  editState={editState}
                  editId={editId}
                  index={index}
                  entry={entry}
                  moveUp={moveUp}
                  moveDown={moveDown}
                  EditEntry={
                    entry.summary
                      ? EditSummary
                      : entry.packages
                      ? EditPackages
                      : EditFiles
                  }
                  DeleteEntry={DeleteEntry}
                  entries={entries}
                  setEntries={setEntries}
                  entryType={
                    entry.summary
                      ? `Opsummering`
                      : entry.packages
                      ? `Pakker`
                      : `Filer`
                  }
                />
                <Box
                  borderColor={
                    editState && editId === entry?.entryId
                      ? "Primary"
                      : "BorderGray"
                  }
                  borderWidth={1}
                  borderRadius="md"
                  borderTopLeftRadius="none"
                  className="parse flex-grow"
                >
                  {entry.summary && (
                    <>
                      <Box p={4} className="parse">
                        {parse(entry.summary)}
                      </Box>
                    </>
                  )}

                  {entry.packages && (
                    <Box p={4} className="flex flex-col gap-3">
                      {entry.packages.map((pack, index) => (
                        <Box borderWidth={1} borderRadius="md" key={index}>
                          <PackageBox pack={pack} />
                        </Box>
                      ))}
                    </Box>
                  )}

                  {entry.files && (
                    <Tabs variant="mainTab">
                      <TabList>
                        {entry.files.map((entry, index) => {
                          return (
                            <Tab key={index}>
                              {entry.file.name}
                              {entry.file.entryFileExt.label}
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
                  )}
                </Box>
              </Box>
            );
          })}
        </div>
      )}
    </Box>
  );
};

export default Entry;
