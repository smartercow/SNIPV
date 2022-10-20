import { Button, Input, Text, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Select, CreatableSelect, AsyncSelect } from "chakra-react-select";
import { FileExtOptions } from "../../../../../utilities/Language/FileExtensions";
import { OptionFileExt, ValueFileExt } from "../../../Select/SelectProps";
import { NoOptionsMessage } from "../../../Select/NoOptionsMessage";

const Files = ({
  codeFile,
  setCodeFile,
  codeFiles,
  AddCodeFile,
  AddCodeFiles,
  selectedLangFileExt, //Selected File lang
  setSelectedLangFileExt,
  selectLangFileExt, //Value Lang
  setSelectLangFileExt,
  selectedFileExt, //Selected File ext
  setSelectedFileExt,
  selectFileExt, //Value file ext
  setSelectFileExt,
}) => {
  const { title, code } = codeFile;

  const [fileExts, setFileExts] = useState({});

  const [disableNew, setDisableNew] = useState(true);
  const [disableSave, setDisableSave] = useState(true);
  const [disableSelect, setDisableSelect] = useState(true);

  function handleLangSelect(data) {
    setSelectedLangFileExt(data);
    setSelectLangFileExt(data);
    // setSelectSubValue(null);
  }

  function handleFileExtSelect(data) {
    setSelectedFileExt(data);
    setSelectFileExt(data);
    // setSelectSubValue(null);
  }

  useEffect(() => {
    if (Object.keys(selectLangFileExt).length > 0) {
      setFileExts(selectLangFileExt.fileExtensions);
      setDisableSelect(false);
    } else {
      setSelectFileExt({});
      setDisableSelect(true);
    }
  }, [selectLangFileExt]);

  useEffect(() => {
    if (Object.keys(fileExts).length > 0) {
      setSelectedFileExt(fileExts[0]);
      setSelectFileExt(fileExts[0]);
    }
  }, [fileExts]);

  const onChange = (e) => {
    e.preventDefault();
    setCodeFile({
      ...codeFile,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (title && code) {
      setDisableNew(false);
    } else {
      setDisableNew(true);
    }
  }, [title, code]);

  useEffect(() => {
    if (Object.keys(codeFiles).length > 0) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [codeFiles]);

  useEffect(() => {
    if (Object.keys(selectedLangFileExt).length > 0) {
      setCodeFile({
        ...codeFile,
        entryFileLang: selectedLangFileExt,
      });
    }
  }, [selectedLangFileExt]);

  useEffect(() => {
    if (Object.keys(selectedFileExt).length > 0) {
      setCodeFile({
        ...codeFile,
        entryFileExt: selectFileExt,
      });
    }
  }, [selectedFileExt]);

  console.log("codeFile", codeFile);
  console.log("codeFiles", codeFiles);
  console.log("selectFileExt", selectFileExt);

  return (
    <div className=" flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Text>Tilføjet filer:</Text>
        <div className="flex gap-2 items-center">
          {codeFiles && (
            <>
              {codeFiles.map((c, i) => (
                <div key={i} className="flex">
                  <Text color="Primary">
                    {c.title}
                    {c.entryFileExt?.label}
                  </Text>
                  {","}
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-full">
          <Input
            className=""
            name="title"
            onChange={onChange}
            placeholder="App"
            type="text"
            value={title}
            focusBorderColor="Primary"
            // variant="main"
          />
        </div>

        <div className="w-full">
          <Select
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
            options={fileExts}
            placeholder="Valg en rodmappe"
            value={selectFileExt}
            onChange={handleFileExtSelect}
            isSearchable={true}
            isDisabled={disableSelect}
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

      <div className="flex gap-4">
        <Button
          style={{ color: "#087ea4" }}
          variant="sub"
          onClick={AddCodeFile}
          isDisabled={disableNew}
        >
          Tilføj
        </Button>

        <Button
          style={{ color: "#087ea4" }}
          variant="sub"
          onClick={AddCodeFiles}
          isDisabled={disableSave}
        >
          Færdig
        </Button>
      </div>
    </div>
  );
};

export default Files;
