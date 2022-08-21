import {
  Button,
  Checkbox,
  Input,
  Spacer,
  Text,
  Tooltip,
} from "@nextui-org/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Select from "react-select";
import { auth, db } from "../../../Firebase/clientApp";
import { LanguageOptions } from "../../../utilities/LanguageOptions";
import { JavascriptFrameworks } from "../../../utilities/JavascriptFrameworks";
import { CSSprocessors } from "../../../utilities/CSSprocessors";
import { BsQuestionCircleFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { createFolderModalState } from "../../../atoms/createFolderModalAtom";
import { updateStateAtom } from "../../../atoms/updateStateAtom";
import { toast } from "react-toastify";

const initialSelectedLang = {
  label: "JavaScript",
  value: "javascript",
  langId: "54",
};
const initialSelectedFramework = {
  label: "React.js",
  value: "reactjs",
  langId: "28",
};

const initialSelectedProcessor = {
  label: "SCSS",
  value: "scss",
  langId: "1",
};

export default function CreateFolder() {
  const [language, setLanguage] = useState(initialSelectedLang);

  const [framework, setFramework] = useState(initialSelectedFramework);
  const [frameworkOn, setFrameworkOn] = useState(true);
  const [frameworkOption, setFrameworkOption] = useState(true);

  const [processor, setProcessor] = useState(initialSelectedProcessor);
  const [processorOn, setProcessorOn] = useState(true);
  const [processorOption, setProcessorOption] = useState(true);

  const [folderName, setFolderName] = useState("");
  const [user] = useAuthState(auth);

  const [open, setOpen] = useRecoilState(createFolderModalState);
  const [update, setUpdate] = useRecoilState(updateStateAtom);

  const [inputStatus, setInputStatus] = useState("");

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
    if (!frameworkOn) {
      setFramework([]);
    } else {
      setFramework(initialSelectedFramework);
    }
  }, [frameworkOn]);

  useEffect(() => {
    if (language.langId === "54") {
      setFrameworkOption(true);
      setFramework(initialSelectedFramework);
    } else {
      setFrameworkOption(false);
      setFramework([]);
    }
  }, [language]);

  useEffect(() => {
    if (!processorOn) {
      setProcessor([]);
    } else {
      setProcessor(initialSelectedProcessor);
    }
  }, [processorOn]);

  useEffect(() => {
    if (language.langId === "19") {
      setProcessorOption(true);
      setProcessor(initialSelectedProcessor);
    } else {
      setProcessorOption(false);
      setProcessor([]);
    }
  }, [language]);

  const createFolder = async (e) => {
    e.preventDefault();
    if (language && folderName) {
      try {
        const userDataDocRef = doc(db, "UsersData1", user?.uid);

        await setDoc(userDataDocRef, JSON.parse(JSON.stringify(user)));

        await addDoc(collection(db, "UsersData1", user?.uid, "CodeFolders1"), {
          createdAt: serverTimestamp(),
          userId: user.uid,
          author: user.displayName,
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
        return null;
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
        <Spacer y={0.4} />
        <div className="flex justify-between items-center gap-3">
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

          <div className="">
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

        <div hidden={!frameworkOption}>
          <Checkbox
            size="sm"
            defaultSelected={frameworkOn}
            onChange={() => setFrameworkOn(!frameworkOn)}
          >
            Javascript framework
          </Checkbox>
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
        </div>

        <div className="flex gap-2 w-full justify-end my-3">
          <Button auto light color="error" onClick={() => setOpen(false)}>
            Luk
          </Button>
          <Button color="gradient" auto type="submit">
            Opret mappe
          </Button>
        </div>
      </form>
    </div>
  );
}
