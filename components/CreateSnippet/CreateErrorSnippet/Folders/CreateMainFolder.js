import { Button, Input, Text } from "@nextui-org/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Select from "react-select";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createErrorFolderModalState } from "../../../../atoms/createErrorFolderModalAtom";
import { updateStateAtom } from "../../../../atoms/updateStateAtom";
import { auth, db } from "../../../../firebase/clientApp";
import { LanguageOptions } from "../../../../utilities/Language";
import { JavaScriptFrameworks } from "../../../../utilities/Language/Javascript/Frameworks";
import { JavaScriptLibraries } from "../../../../utilities/Language/JavaScript/Libraries";
import { NoOptionsMessage } from "../../Select/NoOptionsMessage";

const initialSelectedLanguage = {
  label: "JavaScript",
  value: "javascript",
  langId: "1",
  fileExtensions: [
    { label: ".js", value: "js", syntaxHighlight: "javascript" },
  ],
  accessory: true,
  accessories: [
    {
      label: "Framework",
      value: "framework",
      accessoryId: "1",
      langId: "1",
      options: JavaScriptFrameworks,
    },
    {
      label: "Library",
      value: "library",
      accessoryId: "2",
      langId: "1",
      options: JavaScriptLibraries,
    },
  ],
};

const CreateMainFolder = () => {
  const [user] = useAuthState(auth);
  const setOpen = useSetRecoilState(createErrorFolderModalState);
  const [update, setUpdate] = useRecoilState(updateStateAtom);

  const sortedLanguageOptions = useMemo(
    () =>
      LanguageOptions.sort(({ label: labelA = "" }, { label: labelB = "" }) =>
        labelA.localeCompare(labelB)
      ),
    [LanguageOptions]
  );

  const [folderName, setFolderName] = useState("");
  const randomValue = (Math.random() + 2).toString(36).substring(2);

  const [language, setLanguage] = useState(initialSelectedLanguage);

  const [disableBtn, setDisableBtn] = useState(true);

  function handleSelectLanguage(data) {
    setLanguage(data);
  }

  useEffect(() => {
    if (language && folderName) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [language, folderName]);

  const createFolder = async (e) => {
    e.preventDefault();
    if (folderName) {
      setDisableBtn(true);
      try {
        await addDoc(
          collection(db, "UsersData1", user?.uid, "ErrorMainFolders"),
          {
            language: {
              label: language.label,
              value: language.value,
              langId: language.langId,
              accessory: language.accessory,
              classTree: `lang${language.langId}`,
              fileExtension: language.fileExtensions,
            },
            createdAt: serverTimestamp(),
            rootDirectory: "main",
            folderSnippetType: "error",
            label: folderName,
            value: randomValue,
            userId: user.uid,
          }
        );
        setOpen({ default: true, view: 1 }), setUpdate(!update);
      } catch (error) {
        setDisableBtn(false);
      }
    } /* else {
      setInputStatus("- skal udfyldes!");
    } */
  };

  console.log("language", language);
  // console.log("folderName", folderName);

  return (
    <div>
      <form onSubmit={createFolder}>
        <div className="flex flex-col gap-3">
          <div>
            <div>
              <Text>
                Navn&nbsp;
                <Text color="error" b>
                  *
                </Text>
              </Text>
            </div>
            <Input
              underlined
              placeholder="Mappe navn"
              onChange={(e) => setFolderName(e.target.value)}
              width="100%"
              size="lg"
              aria-label="Folder name"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div>
              <Text>Sprog</Text>
            </div>
            <div className="w-full">
              <Select
                options={sortedLanguageOptions}
                placeholder="Søg og valg"
                value={language}
                onChange={handleSelectLanguage}
                isSearchable={true}
                className="w-full"
                aria-label="Select"
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                components={{
                  NoOptionsMessage,
                }}
              />
            </div>
          </div>

          <div className="flex gap-2 w-full justify-end my-1">
            <Button auto light color="error" onClick={() => setOpen(false)}>
              Luk
            </Button>
            <Button disabled={disableBtn} color="primary" auto type="submit">
              Opret mappe
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMainFolder;
