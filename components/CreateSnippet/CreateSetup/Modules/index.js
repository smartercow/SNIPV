import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Input,
  Divider,
  Button,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ButtonCheckBox from "../ButtonCheckBox";
import Entries from "../Entries";
import Accord from "../Entries/Accord";
import FolderStructure from "../Entries/FolderStructure";
import MarkdownSyntax from "../../../Display/Setup/MarkdownSyntax";
import { ArrowDownIcon, ArrowUpIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

const initialSelectedLangFileExt = {
  label: "JavaScript",
  value: "javascript",
  langId: "1",
  fileExtensions: [
    { label: ".js", value: "js", extId: "1", syntaxHighlight: "javascript" },
    { label: ".jsx", value: "jsx", extId: "2", syntaxHighlight: "jsx" },
    { label: ".glFT", value: "glft", extId: "3", syntaxHighlight: "json" },
  ],
};

const initialSelectedFileExt = {
  label: ".js",
  value: "js",
  extId: "1",
  syntaxHighlight: "javascript",
};

const SnipMenu = [
  { type: "folder", text: "Mappestruktur for denne modul", size: 7 },
  { type: "numeric", text: "Numeriske titler for denne modul", size: 6 },
];

const Modules = ({ modules, setModules, allHasNumericTitles }) => {
  const [hasFolderStructure, setHasFolderStructure] = useState(false);
  const [hasNumericTitles, setHasNumericTitles] = useState(false);

  const [folderStructure, setFolderStructure] = useState("");
  const [allEntries, setAllEntries] = useState([]);
  const [entries, setEntries] = useState([]);
  const [selectLangFileExt, setSelectLangFileExt] = useState({});
  const [selectedLangFileExt, setSelectedLangFileExt] = useState({});
  const [selectFileExt, setSelectFileExt] = useState({});
  const [selectedFileExt, setSelectedFileExt] = useState({});
  const [moduleTitle, setModuleTitle] = useState("");
  const [disableModuleBtn, setDisableModuleBtn] = useState(true);

  const [editModuleState, setEditModuleState] = useState(false);
  const [editModuleId, setEditModuleId] = useState("");

  const showEditMenu = false;
  const randomValue = (Math.random() + 3).toString(36).substring(2);

  useEffect(() => {
    if (moduleTitle && Object.keys(allEntries).length > 0) {
      setDisableModuleBtn(false);
    } else {
      setDisableModuleBtn(true);
    }
  }, [moduleTitle, allEntries]);

  const AddModule = (e) => {
    e.preventDefault();
    setModules((oldForm) => [
      ...oldForm,
      {
        moduleId: randomValue,
        hasFolderStructure: hasFolderStructure,
        folderStructure: folderStructure,
        numericTitles: hasNumericTitles,
        moduleTitle: moduleTitle,
        sections: allEntries,
      },
    ]);
    resetModule();
  };

  const moveUp = (index) => {
    if (index < 1 || index >= modules.length) return;

    setModules((modules) => {
      modules = [...modules];

      [modules[index - 1], modules[index]] = [modules[index], modules[index - 1]];

      return modules;
    });
  };

  const moveDown = (index) => {
    if (index >= modules.length - 1) return;

    setModules((modules) => {
      modules = [...modules];

      [modules[index + 1], modules[index]] = [modules[index], modules[index + 1]];

      return modules;
    });
  };

  const updateModule = () => {
    const editedModule = modules.map((obj) => {
      if (obj.moduleId === editModuleId) {
        return {
          ...obj,
          hasFolderStructure: hasFolderStructure,
          folderStructure: folderStructure,
          numericTitles: hasNumericTitles,
          moduleTitle: moduleTitle,
          sections: allEntries,
        };
      }

      return obj;
    });
    setModules(editedModule);
    resetModule();
  };

  const resetModule = () => {
    setAllEntries([]);
    setEditModuleState(false);
    setEditModuleId("");
    setModuleTitle("");
    setFolderStructure("");
    setHasFolderStructure(false);
    setHasNumericTitles(false);
  };

  console.log("modules", modules);
  console.log("allEntries", allEntries);

  return (
    <Box>
      {!Object.keys(modules).length > 0 && (
        <Box my={4} py={2} px={2}>
          <Text fontWeight="semibold" color="gray.400">
            Tilføj modul...
          </Text>
        </Box>
      )}
      {modules && (
        <Accordion mt={4} mb={8} allowToggle>
          {modules.map((modul, index) => (
            <AccordionItem key={modul.moduleId} mt={3} border="none">
              <ButtonGroup size="sm" isAttached variant="outline">
                <IconButton
                  aria-label="Up"
                  borderBottomRadius="outline"
                  borderBottomLeftRadius="none"
                  borderBottom="none"
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
                    setAllEntries(modul.sections),
                      setEditModuleState(true),
                      setEditModuleId(modul.moduleId),
                      setModuleTitle(modul.moduleTitle),
                      setHasFolderStructure(modul.hasFolderStructure),
                      setFolderStructure(modul.folderStructure);
                    setHasNumericTitles(modul.numericTitles);
                  }}
                  icon={<EditIcon height={4} width={4} color="Primary" />}
                />
                <IconButton
                  aria-label="Delete"
                  borderBottomRadius="none"
                  borderBottom="none"
                  disabled={editModuleState && editModuleId === modul.moduleId ? true : false}
                  onClick={() => setModules(modules.filter((ent) => ent.moduleId !== modul.moduleId))}
                  icon={<CloseIcon height={3} width={3} color="Red" />}
                />
              </ButtonGroup>
              <h2>
                <AccordionButton
                  borderRadius={10}
                  bg="iGrayLight"
                  borderTopLeftRadius="none"
                  _hover={{ bg: "PrimaryELight" }}
                  _expanded={{
                    borderBottomRadius: "none",
                  }}>
                  <Box flex="1" textAlign="left">
                    {allHasNumericTitles ? (
                      <>
                        {index + 1}
                        {". "}
                      </>
                    ) : (
                      modul.hasNumericTitles && <>{"1. "}</>
                    )}
                    {modul.moduleTitle}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} borderWidth={1} borderColor="iGrayLight">
                {modul.hasFolderStructure && (
                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            Mappestruktur
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <MarkdownSyntax folderStructure={modul.folderStructure} />
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                )}

                <Accord
                  allHasNumericTitles={allHasNumericTitles}
                  hasFolderStructure={hasFolderStructure}
                  setHasFolderStructure={setHasFolderStructure}
                  hasNumericTitles={hasNumericTitles}
                  setHasNumericTitles={setHasNumericTitles}
                  currIndex={index + 1}
                  showEditMenu={showEditMenu}
                  allEntries={modul.sections}
                />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <Box borderWidth={1} borderColor="iGrayLight" borderRadius="md">
        <ButtonCheckBox
          SnipMenu={SnipMenu}
          hasFolderStructure={hasFolderStructure}
          setHasFolderStructure={setHasFolderStructure}
          hasNumericTitles={hasNumericTitles}
          setHasNumericTitles={setHasNumericTitles}
          setFolderStructure={setFolderStructure}
        />
        {hasFolderStructure && (
          <FolderStructure folderStructure={folderStructure} setFolderStructure={setFolderStructure} />
        )}

        <Box px={4} my={2} className="flex gap-6 items-center">
          <Text variant="H5" fontWeight="semibold" whiteSpace="nowrap">
            Modul titel
          </Text>
          <Input
            placeholder="Next.js setup"
            value={moduleTitle}
            maxLength={22}
            onChange={(e) => setModuleTitle(e.target.value)}
          />
        </Box>

        <Divider my={2} />

        <Entries
          allHasNumericTitles={allHasNumericTitles}
          hasFolderStructure={hasFolderStructure}
          setHasFolderStructure={setHasFolderStructure}
          hasNumericTitles={hasNumericTitles}
          setHasNumericTitles={setHasNumericTitles}
          allEntries={allEntries}
          setAllEntries={setAllEntries}
          entries={entries}
          setEntries={setEntries}
          selectLangFileExt={selectLangFileExt}
          setSelectLangFileExt={setSelectLangFileExt}
          selectFileExt={selectFileExt}
          setSelectFileExt={setSelectFileExt}
          selectedLangFileExt={selectedLangFileExt}
          setSelectedLangFileExt={setSelectedLangFileExt}
          selectedFileExt={selectedFileExt}
          setSelectedFileExt={setSelectedFileExt}
          initialSelectedLangFileExt={initialSelectedLangFileExt}
          initialSelectedFileExt={initialSelectedFileExt}
        />

        <Box bg="Primary" borderBottomRadius="md" px={4} py={3} className="flex gap-4 justify-end">
          <Button
            disabled={disableModuleBtn}
            onClick={editModuleState ? updateModule : AddModule}
            variant="entry"
            bg="white"
            color="Primary">
            {editModuleState ? "Opdatere modul" : "Tilføj modul"}
          </Button>

          {editModuleState && (
            <Button onClick={resetModule} variant="entry" bg="white" color="Primary">
              Anullere
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Modules;
