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
import { auth, db } from "../../Firebase/clientApp";
import { LanguageOptions } from "../../utilities/LanguageOptions";
import { JavascriptFrameworks } from "../../utilities/JavascriptFrameworks";
import { CSSprocessors } from "../../utilities/CSSprocessors";

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

export default function CreateFolder({ setCreateFolderOn, update, setUpdate }) {
  const [language, setLanguage] = useState(initialSelectedLang);

  const [framework, setFramework] = useState(initialSelectedFramework);
  const [frameworkOn, setFrameworkOn] = useState(true);
  const [frameworkOption, setFrameworkOption] = useState(true);

  const [processor, setProcessor] = useState(initialSelectedProcessor);
  const [processorOn, setProcessorOn] = useState(true);
  const [processorOption, setProcessorOption] = useState(true);

  const [folderName, setFolderName] = useState("");
  const [user] = useAuthState(auth);

  function handleSelectLang(data) {
    setLanguage(data);
  }

  function handleSelectFramework(data) {
    setFramework(data);
  }

  function handleSelectProcessor(data) {
    setProcessor(data);
  }

  function handelCancel() {
    setCreateFolderOn(false);
    setUpdate(!update);
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
      setFramework(initialSelectedFramework)
    } else {
      setFrameworkOption(false);
      setFramework([])
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
      setProcessor(initialSelectedProcessor)
    } else {
      setProcessorOption(false);
      setProcessor([])
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
        setCreateFolderOn(false);
        setUpdate(!update);
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
  };

  return (
    <div>
      <div>
        <Text h5>Opret mappe</Text>
      </div>
      <Spacer y={0.5} />
      <div>
        <Text>Navn</Text>
        <Input
          underlined
          placeholder="Mappe navn"
          onChange={(e) => setFolderName(e.target.value)}
          width="100%"
          size="lg"
          aria-label="Folder name"
        />
      </div>
      <Spacer y={0.7} />
      <Text>Sprog</Text>
      <Spacer y={0.4} />
      <div className="flex justify-between gap-3">
        <div className="flex gap-2 w-full">
          <Select
            options={LanguageOptions}
            placeholder="Søg og valg"
            value={language}
            onChange={handleSelectLang}
            isSearchable={true}
            className="w-full"
            aria-label="Select"
            menuPortalTarget={document.body} 
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          />
          <Tooltip
            content={"Programmeringssprog for denne mappe"}
            color="primary"
          >
            <Button color="primary" rounded auto flat>
              ?
            </Button>
          </Tooltip>
        </div>
        <div className="flex gap-2 w-full justify-end"></div>
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
          <div className="flex justify-between gap-3">
            <div className="flex gap-2 w-full">
              <Select
                options={JavascriptFrameworks}
                placeholder="Valg Framework"
                value={framework}
                onChange={handleSelectFramework}
                isSearchable={true}
                className="w-full"
                aria-label="Select"
                menuPortalTarget={document.body} 
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              />
              <Tooltip content={"JS framework for denne mappe"} color="primary">
                <Button color="primary" rounded auto flat>
                  ?
                </Button>
              </Tooltip>
            </div>
            <div className="flex gap-2 w-full justify-end"></div>
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
          <div className="flex justify-between gap-3">
            <div className="flex gap-2 w-full">
              <Select
                options={CSSprocessors}
                placeholder="Valg processor"
                value={processor}
                onChange={handleSelectProcessor}
                isSearchable={true}
                className="w-full"
                aria-label="Select"
                menuPortalTarget={document.body} 
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              />
              <Tooltip content={"Processor for denne mappe"} color="primary">
                <Button color="primary" rounded auto flat>
                  ?
                </Button>
              </Tooltip>
            </div>
            <div className="flex gap-2 w-full justify-end"></div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 w-full justify-end">
        <Button color="gradient" auto onClick={createFolder}>
          Opret
        </Button>
        <Button rounded auto flat color="error" onClick={handelCancel}>
          X
        </Button>
      </div>
    </div>
  );
}
