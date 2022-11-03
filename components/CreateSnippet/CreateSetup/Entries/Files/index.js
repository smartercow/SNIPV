import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Select, CreatableSelect, AsyncSelect } from "chakra-react-select";
import { FileExtOptions } from "../../../../../utilities/Language/FileExtensions";
import { NoOptionsMessage } from "../../../../Select/NoOptionsMessage";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CloseIcon,
  EditIcon,
} from "@chakra-ui/icons";

const Files = ({
  initialCodeFileValue,
  initialSelectedFileExt,
  initialSelectedLangFileExt,
  codeFile,
  setCodeFile,
  codeFiles,
  setCodeFiles,
  AddCodeFile,
  AddCodeFiles,
  editId,
  setEditId,
  editState,
  setEditState,
  entries,
  setEntries,
  selectedLangFileExt, //Selected File lang
  setSelectedLangFileExt,
  selectLangFileExt, //Value Lang
  setSelectLangFileExt,
  selectedFileExt, //Selected File ext
  setSelectedFileExt,
  selectFileExt, //Value file ext
  setSelectFileExt,
  setSelectedEntry,
}) => {
  const { name, code } = codeFile;

  const [fileExts, setFileExts] = useState({});

  const [disableNew, setDisableNew] = useState(true);
  const [disableSave, setDisableSave] = useState(true);
  const [disableSelect, setDisableSelect] = useState(true);

  const [editFilesState, setEditFilesState] = useState(false);
  const [editFilesId, setEditFilesId] = useState("");

  function handleLangSelect(data) {
    setSelectedLangFileExt(data);
    setSelectLangFileExt(data);
    setFileExts(data.fileExtensions);
    setSelectFileExt(data.fileExtensions[0]);
    setCodeFile({
      ...codeFile,
      entryFileLang: data,
      entryFileExt: data.fileExtensions[0],
    });
  }

  function handleFileExtSelect(data) {
    setSelectFileExt(data);
    setCodeFile({
      ...codeFile,
      entryFileExt: data,
    });
  }

  const onChange = (e) => {
    e.preventDefault();
    setCodeFile({
      ...codeFile,
      [e.target.name]: e.target.value,
    });
  };

  const editCodeFiles = () => {
    const editedCodeFiles = codeFiles.map((obj) => {
      if (obj.fileId === editFilesId) {
        return {
          ...obj,
          file: {
            ...codeFile,
            entryFileLang: selectLangFileExt,
            entryFileExt: selectFileExt,
          },
        };
      }

      return obj;
    });
    setCodeFiles(editedCodeFiles);
    setEditFilesState(false);
  };

  const editCodeFilesEntry = () => {
    const editedCodeFilesEntry = entries.map((obj) => {
      if (obj.entryId === editId) {
        return {
          ...obj,
          files: codeFiles,
        };
      }

      return obj;
    });
    setEntries(editedCodeFilesEntry);
    setCodeFiles([]);
    setEditState(false);
    setEditId("");
  };

  const Cancel = () => {
    setEditFilesState(false);
  };

  const CancelEntry = () => {
    setEditState(false);
    setCodeFiles([]);
  };

  const moveUp = (index) => {
    if (index < 1 || index >= codeFiles.length) return;

    setCodeFiles((codeFiles) => {
      codeFiles = [...codeFiles];

      [codeFiles[index - 1], codeFiles[index]] = [
        codeFiles[index],
        codeFiles[index - 1],
      ];

      return codeFiles;
    });
  };

  const moveDown = (index) => {
    if (index >= codeFiles.length - 1) return;

    setCodeFiles((codeFiles) => {
      codeFiles = [...codeFiles];

      [codeFiles[index + 1], codeFiles[index]] = [
        codeFiles[index],
        codeFiles[index + 1],
      ];

      return codeFiles;
    });
  };

  useEffect(() => {
    if (name && code) {
      setDisableNew(false);
    } else {
      setDisableNew(true);
    }
  }, [name, code]);

  useEffect(() => {
    if (Object.keys(codeFiles).length > 0) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [codeFiles]);

  useEffect(() => {
    if (!editFilesState && FileExtOptions) {
      setEditFilesId("");
      setCodeFile(initialCodeFileValue);
      setFileExts(FileExtOptions[0].fileExtensions);
      setSelectLangFileExt(FileExtOptions[0]);
      setSelectedLangFileExt(FileExtOptions[0]);
      setSelectFileExt(FileExtOptions[0].fileExtensions[0]);
    }
  }, [editFilesState]);

  console.log("codeFile", codeFile);
  console.log("codeFiles", codeFiles);
  console.log("selectLang", selectLangFileExt);
  console.log("selectFileExt", selectFileExt);
  return (
    <div>
      <div className="">
        <div>
          <Text textTransform="uppercase" fontSize={14} fontWeight="semibold">
            Tilføjet filer:
          </Text>
        </div>
        <div className=" flex flex-col gap-3 mt-2">
          {!codeFiles.length > 0 && (
            <Box borderWidth={1} borderRadius="md" p={2}>
              <Text color="gray.400">her...</Text>
            </Box>
          )}
          {codeFiles.length > 0 && (
            <>
              {codeFiles.map((c, index) => (
                <Box key={index}>
                  <div>
                    <ButtonGroup size="sm" isAttached variant="outline">
                      <IconButton
                        aria-label="Up"
                        borderBottomRadius="none"
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
                          setSelectLangFileExt(c.file.entryFileLang);
                          setSelectedLangFileExt(c.file.entryFileLang);
                          setSelectFileExt(c.file.entryFileExt);
                          setCodeFile({
                            code: c.file.code,
                            name: c.file.name,
                          });
                          setEditFilesState(true);
                          setEditFilesId(c.fileId);
                        }}
                        icon={<EditIcon height={4} width={4} color="Primary" />}
                      />
                      <IconButton
                        aria-label="Delete"
                        borderBottomRadius="none"
                        borderBottom="none"
                        disabled={
                          editFilesState && editFilesId === c.fileId
                            ? true
                            : false
                        }
                        onClick={() => {
                          setCodeFiles(
                            codeFiles.filter((cf) => cf.fileId !== c.fileId)
                          );
                        }}
                        icon={<CloseIcon height={3} width={3} color="Red" />}
                      />
                    </ButtonGroup>
                  </div>
                  <Box
                    borderColor={
                      editFilesState && editFilesId === c.fileId
                        ? "Primary"
                        : "BorderGray"
                    }
                    borderWidth={1}
                    borderRadius="md"
                    borderTopLeftRadius="none"
                    p={2}
                  >
                    <Text color="Primary" fontSize={16} fontWeight="semibold">
                      {c.file.name}
                      {c.file.entryFileExt.label}
                    </Text>
                  </Box>
                </Box>
              ))}
            </>
          )}
        </div>
      </div>
      <Divider my={3} />
      <div className="flex flex-col gap-3">
        <div>
          <Text
            textTransform="uppercase"
            variant="heading"
            fontWeight="semibold"
            fontSize={14}
          >
            Tilføj filer
          </Text>
        </div>
        <div className="flex gap-3">
          <div className="w-full">
            <Input
              name="name"
              onChange={onChange}
              placeholder="App"
              type="text"
              value={name}
              focusBorderColor="Primary"
            />
          </div>

          <div className="w-full">
            <Select
              name="entryFileLang"
              options={FileExtOptions}
              placeholder="Valg sprog"
              value={selectLangFileExt}
              onChange={handleLangSelect}
              isSearchable={true}
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              components={{
                NoOptionsMessage,
                // Option: OptionFileExt,
                // SingleValue: ValueFileExt,
              }}
            />
          </div>

          <div className="w-full">
            <Select
              name="entryFileExt"
              options={fileExts}
              placeholder="Valg en rodmappe"
              value={selectFileExt}
              onChange={handleFileExtSelect}
              isSearchable={true}
              // isDisabled={disableSelect}
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              components={{
                NoOptionsMessage,
                // Option: OptionFileExt,
                // SingleValue: ValueFileExt,
              }}
            />
          </div>
        </div>

        <div>
          <Textarea
            className=""
            name="code"
            cols="30"
            rows="10"
            value={code}
            placeholder="Al filkode inklusive imports"
            onChange={onChange}
            focusBorderColor="Primary"
          />
        </div>

        <div className="flex gap-4">
          <Button
            variant="btnSub"
            onClick={editFilesState ? editCodeFiles : AddCodeFile}
            isDisabled={disableNew}
          >
            {editFilesState ? "Opdatere fil" : "Tilføj fil"}
          </Button>

          <Button
            variant="btnSub"
            onClick={
              editFilesState
                ? Cancel
                : editState
                ? editCodeFilesEntry
                : AddCodeFiles
            }
            isDisabled={editFilesState && editState ? true : disableSave}
          >
            {editFilesState && !editState
              ? "Annullere"
              : editState
              ? "Opdatere filer"
              : "Tilføj filer"}
          </Button>

          {editState && (
            <Button
              variant="btnSub"
              onClick={editFilesState ? Cancel : CancelEntry}
            >
              Annullere
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Files;
