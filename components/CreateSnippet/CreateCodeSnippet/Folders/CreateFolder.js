import {
  Button,
  Checkbox,
  Input,
  Spacer,
  Text,
  Tooltip,
} from "@nextui-org/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Select from "react-select";
import { auth, db } from "../../../../firebase/clientApp";
import { LanguageOptions } from "../../../../utilities/LanguageOptions";
import { BsQuestionCircleFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { createCodeFolderModalState } from "../../../../atoms/createCodeFolderModalAtom";
import { updateStateAtom } from "../../../../atoms/updateStateAtom";
import Accessory from "../../Accessory";

const initialSelectedLang = {
  label: "JavaScript",
  value: "javascript",
  langId: "54",
  fileExtension: "js",
  syntaxHighlight: "javascript",
  accessory: true,
};

const initialSelectedFramework = {
  label: "React.js",
  value: "reactjs",
  frameworkId: "28",
/*   fileExtension: "", */
  syntaxHighlight: "jsx",
};

const initialSelectedProcessor = {
  label: "SCSS",
  value: "scss",
  processorId: "1",
  fileExtension: "",
  syntaxHighlight: "scss",
};

export default function CreateFolder() {
  const [language, setLanguage] = useState(initialSelectedLang);
  const [framework, setFramework] = useState(initialSelectedFramework);
  const [processor, setProcessor] = useState(initialSelectedProcessor);

  const [accessoryOption, setAccessoryOption] = useState(true);
  const [additional, setAdditional] = useState(true);

  const [folderName, setFolderName] = useState("");
  const [user] = useAuthState(auth);

  const [open, setOpen] = useRecoilState(createCodeFolderModalState);
  const [update, setUpdate] = useRecoilState(updateStateAtom);

  const [inputStatus, setInputStatus] = useState("");

  const [disableBtn, setDisableBtn] = useState(false);

  function handleSelectLang(data) {
    setLanguage(data);
  }

  function handleSelectFramework(data) {
    setFramework(data);
  }

  function handleSelectProcessor(data) {
    setProcessor(data);
  }

  useEffect(() => {
    if (language.accessory === true) {
      setAccessoryOption(true);

      if (language.langId === "54") {
        setFramework(initialSelectedFramework);
      } else {
        setFramework({});
      }

      if (language.langId === "19") {
        setProcessor(initialSelectedProcessor);
      } else {
        setProcessor({});
      }
    } else {
      setAdditional(false);
      setAccessoryOption(false);
      setFramework({});
      setProcessor({});
    }
  }, [language]);

  useEffect(() => {
    if (accessoryOption) {
      setAdditional(true);
    } else {
      setAdditional(false);
      setFramework({});
      setProcessor({});
    }
  }, [accessoryOption]);

  useEffect(() => {
    if (additional) {
      if (language.langId === "54" || language.langId === "127") {
        setFramework(initialSelectedFramework);
      } else {
        setFramework({});
      }

      if (language.langId === "19") {
        setProcessor(initialSelectedProcessor);
      } else {
        setProcessor({});
      }
    }
  }, [language, additional]);

  const createFolder = async (e) => {
    e.preventDefault();
    if (language && folderName) {
      setDisableBtn(true);
      try {
        await addDoc(collection(db, "UsersData1", user?.uid, "CodeFolders"), {
          createdAt: serverTimestamp(),
          additional: additional,
          userId: user.uid,
          folderName: folderName,
          language: language,
          label: folderName,
          value: folderName,
          framework: framework,
          processor: processor,
          folderSnippetType: "code",
        });
        setOpen(false);
        setUpdate(!update);
      } catch (error) {
        setDisableBtn(false);
      }
    } else {
      setInputStatus("- skal udfyldes!");
    }
  };

  return (
    <div>
      <form onSubmit={createFolder}>
        <div>
          <div className="flex gap-1">
            <Text>Navn</Text>
            <Text color="error">{inputStatus}</Text>
          </div>
          <Input
            underlined
            placeholder="Mappe navn"
            onChange={(e) => setFolderName(e.target.value) | setInputStatus("")}
            width="100%"
            size="lg"
            aria-label="Folder name"
          />
        </div>
        <Spacer y={0.5} />

        <Text>Sprog</Text>
        <Spacer y={0.1} />
        <div className="flex justify-between items-center gap-2">
          <div className="w-full">
            <Select
              options={LanguageOptions}
              placeholder="Søg og valg"
              value={language}
              onChange={handleSelectLang}
              isSearchable={true}
              className="w-full"
              aria-label="Select"
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          </div>

          <div className="pt-2">
            <Tooltip
              content={"Programmeringssprog for denne mappe"}
              color="primary"
              keepMounted="true"
              css={{ zIndex: 999999 }}
            >
              <Text h5 color="primary">
                <BsQuestionCircleFill />
              </Text>
            </Tooltip>
          </div>
        </div>
        <Spacer y={0.7} />

        {language.accessory === true && (
          <div>
            <div>
              <Checkbox
                size="sm"
                onChange={() => setAccessoryOption(!accessoryOption)}
                isSelected={accessoryOption}
              >
                {language.langId === "54" && <>Javascript framework</>}
                {language.langId === "127" && <>Javascript framework</>}
                {language.langId === "19" && <>Pre/Post processors</>}
                {/*                 {language.langId === "50" && <>Web template systems</>} */}
              </Checkbox>
            </div>
            <Spacer y={0.1} />

            {accessoryOption && (
              <>
                <Accessory
                  language={language}
                  framework={framework}
                  processor={processor}
                  handleSelectFramework={handleSelectFramework}
                  handleSelectProcessor={handleSelectProcessor}
                />
              </>
            )}
          </div>
        )}

        <div className="flex gap-2 w-full justify-end my-3">
          <Button auto light color="error" onClick={() => setOpen(false)}>
            Luk
          </Button>
          <Button disabled={disableBtn} color="primary" auto type="submit">
            Opret mappe
          </Button>
        </div>
        {/*         <div hidden={!frameworkOption}>

          <Spacer y={0.7} />

          <div hidden={!frameworkOn}>
            <div className="flex gap-2 w-full items-center">
              <div className="w-full">
                <Select
                  options={JavascriptFrameworks}
                  placeholder="Valg Framework"
                  value={framework}
                  onChange={handleSelectFramework}
                  isSearchable={true}
                  className="w-full"
                  aria-label="Select"
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                />
              </div>

              <div className="pt-2">
                <Tooltip
                  content={"Javascript framework for denne mappe"}
                  color="primary"
                  css={{ zIndex: 999999 }}
                >
                  <Text h5 color="primary">
                    <BsQuestionCircleFill />
                  </Text>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        <Spacer y={0.7} />
        <div hidden={!processorOption}>
          <Checkbox
            size="sm"
            defaultSelected={processorOn}
            onChange={() => setProcessorOn(!processorOn)}
          >
            Pre/post processor
          </Checkbox>
          <Spacer y={0.7} />

          <div hidden={!processorOn}>
            <div className="flex gap-2 w-full items-center">
              <div className="w-full">
                <Select
                  options={CSSprocessors}
                  placeholder="Valg processor"
                  value={processor}
                  onChange={handleSelectProcessor}
                  isSearchable={true}
                  className="w-full"
                  aria-label="Select"
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                />
              </div>
              <div className="">
                <Tooltip
                  content={"Processor for denne mappe"}
                  color="primary"
                  css={{ zIndex: 999999 }}
                >
                  <Text h5 color="primary">
                    <BsQuestionCircleFill />
                  </Text>
                </Tooltip>
              </div>
            </div>
          </div>
        </div> */}
      </form>
    </div>
  );
}
