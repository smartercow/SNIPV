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
import { LanguageOptions } from "../../../../utilities/Language";
import { BsQuestionCircleFill } from "react-icons/bs";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createCodeFolderModalState } from "../../../../atoms/createCodeFolderModalAtom";
import { updateStateAtom } from "../../../../atoms/updateStateAtom";
import { NoOptionsMessage } from "../../Select/NoOptionsMessage";
import { JavaScriptFrameworks } from "../../../../utilities/Language/Javascript/Frameworks";
import { JavaScriptLibraries } from "../../../../utilities/Language/JavaScript/Libraries";
import CreatedFolders from "./CreatedFolders";
import { TagsInput } from "react-tag-input-component";
const initialSelectedLanguage = {
  label: "JavaScript",
  value: "javascript",
  langId: "54",
  fileExtensions: [
    { label: ".js", value: "js", syntaxHighlight: "javascript" },
  ],
  accessory: true,
  accessories: [
    {
      label: "Framework",
      value: "framework",
      accessoryId: "1",
      langId: "54",
      options: JavaScriptFrameworks,
    },
    {
      label: "Library",
      value: "library",
      accessoryId: "2",
      langId: "54",
      options: JavaScriptLibraries,
    },
  ],
};

export default function CreateMainFolder() {
  const [user] = useAuthState(auth);
  // const setOpen = useSetRecoilState(createCodeFolderModalState);
  // const [update, setUpdate] = useRecoilState(updateStateAtom);

  const [folderName, setFolderName] = useState("");
  const [disableSelect, setDisableSelect] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const [language, setLanguage] = useState(initialSelectedLanguage);
  const [accessories, setAccessories] = useState({});
  const [accessory, setAccessory] = useState({});
  const [addAccessory, setAddAccessory] = useState(true);
  const [fileExtensions, setFileExtensions] = useState({});
  const [fileExtension, setFileExtension] = useState({});

  const [selectedMainCodeFolder, setSelectedMainCodeFolder] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const [tags, setTags] = useState([]);
  const [tagInputValues, setTagInputValues] = useState([]);

  const lowercaseTags = tagInputValues.map((element) => {
    return element.toLowerCase();
  });

  useEffect(() => {
    setTags(lowercaseTags);
  }, [tagInputValues]);

  function handleSelectLanguage(data) {
    setLanguage(data);
  }

  function handleSelectAccessories(data) {
    setAccessory(data);
  }

  function handleSelectFileExtension(data) {
    setFileExtension(data);
  }

  useEffect(() => {
    if (language.accessory && addAccessory) {
      setAccessories(language.accessories);
    } else {
      setFileExtensions(language.fileExtensions);
      setAccessories({});
      setAccessory({});
    }
  }, [language, addAccessory]);

  useEffect(() => {
    if (!Object.keys(accessories).length == 0) {
      setAccessory(accessories[0]?.options[0]);
    }
  }, [accessories]);

  useEffect(() => {
    if (!Object.keys(accessory).length == 0) {
      setFileExtensions(accessory.fileExtensions);
    } else {
      setFileExtensions(language.fileExtensions);
    }
  }, [accessory, language.fileExtensions]);

  useEffect(() => {
    if (fileExtensions) {
      setFileExtension(fileExtensions[0]);
    }

    if (Object.keys(fileExtensions).length == 1) {
      setDisableSelect(true);
    } else {
      setDisableSelect(false);
    }
  }, [fileExtensions]);

  const createFolder = async (e) => {
    e.preventDefault();
    if (selectedMainCodeFolder && language && folderName) {
      setDisableBtn(true);
      try {
        await addDoc(
          collection(db, "UsersData1", user?.uid, "SubCodeFolders"),
          {
            createdAt: serverTimestamp(),
            rootDirectory: "sub",
            folderSnippetType: "code",
            mainFolderId: selectedMainCodeFolder.mainFolderId,
            label: folderName,
            value: randomValue,
            language: {
              label: language.label,
              value: language.value,
              langId: language.langId,
              fileExtension: fileExtension,
              addAccessory: addAccessory,
              accessory:
                Object.keys(accessory).length > 0
                  ? {
                      label: accessory.label,
                      langId: accessory.langId,
                      value: accessory.value,
                    }
                  : {},
            },
            tags: {},
            userId: user.uid,
          }
        );
        setOpen(false);
        // setUpdate(!update);
      } catch (error) {
        setDisableBtn(false);
      }
    } /* else {
      setInputStatus("- skal udfyldes!");
    } */
  };

  console.log("selectedMainCodeFolder", selectedMainCodeFolder.mainFolderId);
  // console.log("dataFetched", dataFetched);

  console.log("TAGS", tags);

  // console.log("language", language);
  // console.log("accessories", accessories);
  // console.log("accessory", accessory);
  // console.log("fileExtensions", fileExtensions);
  // console.log("fileExtension", fileExtension);
  // console.log("addAccessory", addAccessory);
  // console.log("folderName", folderName);
  // console.log("disableSelect", disableSelect);
  // console.log("fileExtensionsObject", Object.keys(fileExtensions).length);

  return (
    <div>
      <form onSubmit={createFolder}>
        <div>
          <CreatedFolders
            setSelectedMainCodeFolder={setSelectedMainCodeFolder}
            selectedMainCodeFolder={selectedMainCodeFolder}
            // id={id}
            dataFetched={dataFetched}
          />
        </div>
        <div className="flex flex-col gap-4">
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

          <div className="flex md:gap-4">
            <div className="flex flex-col gap-1 w-full">
              <div>
                <Text>
                  Sprog&nbsp;
                  <Text color="error" b>
                    *
                  </Text>
                </Text>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div className="w-full">
                  <Select
                    options={LanguageOptions}
                    placeholder="Søg og valg"
                    value={language}
                    onChange={handleSelectLanguage}
                    isSearchable={true}
                    className="w-full"
                    aria-label="Select"
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    components={{
                      NoOptionsMessage,
                    }}
                  />
                </div>
              </div>
            </div>

            {language.accessory && (
              <div className="flex flex-col gap-1 w-full">
                <div>
                  <Checkbox
                    size="sm"
                    onChange={() => setAddAccessory(!addAccessory)}
                    isSelected={addAccessory}
                  >
                    <p>Tilbehør for {language.label}</p>
                  </Checkbox>
                </div>
                {addAccessory && (
                  <div>
                    <Select
                      options={accessories}
                      placeholder="Valg tilbehør"
                      value={accessory}
                      onChange={handleSelectAccessories}
                      isSearchable={true}
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      components={{ NoOptionsMessage }}
                      // defaultValue={ext[0]}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-5">
            <div className="w-32 flex flex-col gap-1">
              <div>
                <Text>
                  Filtypenavn&nbsp;
                  <Text color="error" b>
                    *
                  </Text>
                </Text>
              </div>
              <div className="w-full">
                <Select
                  options={fileExtensions}
                  placeholder="Filtypenavn"
                  isDisabled={disableSelect}
                  value={fileExtension}
                  onChange={handleSelectFileExtension}
                  isSearchable={true}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  components={{ NoOptionsMessage }}
                  // defaultInputValue={addValue[0]?.options[0]}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div>
                <Text>Kode mappe type</Text>
              </div>
              <div className="flex pt-1">
                <div className="fileExtension extensionBadge rounded-lg flex justify-center items-center">
                  <p className="text-xs MonoHeading font-semibold lowercase">
                    {fileExtension?.label}
                  </p>
                </div>

                <div
                  className={`languageId${language?.langId} lBadge rounded-3xl flex justify-center items-center`}
                >
                  <p className="text-xs MonoHeading font-semibold lowercase">
                    {language?.label}
                  </p>
                </div>

                {accessory && (
                  <div
                    className={`accessoryId${accessory.langId} lBadge rounded-3xl flex justify-center items-center`}
                  >
                    <p className="text-xs MonoHeading font-semibold lowercase">
                      {accessory?.label}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div>
              <Text>Mappe tags</Text>
            </div>
            <div>
              <TagsInput
                value={tags}
                onChange={setTagInputValues}
                name="tags"
                placeHolder="Skriv og tryk ENTER"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full justify-end my-3">
          <Button auto light color="error" onClick={() => setOpen(false)}>
            Luk
          </Button>
          <Button disabled={disableBtn} color="primary" auto type="submit">
            Opret mappe
          </Button>
        </div>
      </form>
    </div>
  );
}
