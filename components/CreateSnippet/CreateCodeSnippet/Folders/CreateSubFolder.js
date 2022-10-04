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
import { TagsInput } from "react-tag-input-component";
import CreatedFolders from "./CreatedFolders";
import { OptionFileExt, ValueFileExt } from "../../Select/SelectProps";

export default function CreateMainFolder() {
  const [user] = useAuthState(auth);
  const setOpen = useSetRecoilState(createCodeFolderModalState);
  const [update, setUpdate] = useRecoilState(updateStateAtom);

  const [folderName, setFolderName] = useState("");

  const [disableExtSelect, setDisableExtSelect] = useState(false);
  const [disableAccSelect, setDisableAccSelect] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);

  const [language, setLanguage] = useState([]);
  const [accessories, setAccessories] = useState({});
  const [accessory, setAccessory] = useState({});
  const [addAccessory, setAddAccessory] = useState(true);
  const [fileExtensions, setFileExtensions] = useState();
  const [fileExtension, setFileExtension] = useState({});

  const [selectedCodeMainFolder, setSelectedCodeMainFolder] = useState([]);

  const [tags, setTags] = useState([]);
  const [tagInputValues, setTagInputValues] = useState([]);

  const lowercaseTags = tagInputValues.map((element) => {
    return element.toLowerCase();
  });

  const randomValue = (Math.random() + 2).toString(36).substring(2);

  function handleSelectAccessories(data) {
    setAccessory(data);
  }

  function handleSelectFileExtension(data) {
    setFileExtension(data);
  }

  useEffect(() => {
    if (Object.keys(selectedCodeMainFolder)?.length > 0) {
      const filteredLang = LanguageOptions.filter((lang) => {
        if (lang.langId === selectedCodeMainFolder.language.langId) {
          return lang;
        }
      });

      setLanguage(filteredLang[0]);
    }
  }, [selectedCodeMainFolder]);

  useEffect(() => {
    if (folderName) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [folderName]);

  useEffect(() => {
    if (language.accessory && addAccessory) {
      setAccessories(language.accessories);
      setDisableAccSelect(false);
    } else {
      setFileExtensions(language.fileExtensions);
      setDisableAccSelect(true);
      setAccessories({});
      setAccessory({});
    }
  }, [language, addAccessory]);

  useEffect(() => {
    if (!Object.keys(accessories)?.length == 0) {
      setAccessory(accessories[0]?.options[0]);
    }
  }, [accessories]);

  useEffect(() => {
    if (!Object.keys(accessory)?.length == 0) {
      setFileExtensions(accessory.fileExtensions);
    } else {
      setFileExtensions(language.fileExtensions);
    }
  }, [accessory, language.fileExtensions]);

  useEffect(() => {
    if (Object.keys(language).length > 0) {
      if (fileExtensions) {
        setFileExtension(fileExtensions[0]);

        if (Object.keys(fileExtensions)?.length == 1) {
          setDisableExtSelect(true);
        } else {
          setDisableExtSelect(false);
        }
      }
    }
  }, [language, fileExtensions]);

  useEffect(() => {
    setTags(lowercaseTags);
  }, [tagInputValues]);

  console.log("language", language);
  console.log("accessories", accessories);
  console.log("accessory", accessory);
  // console.log("fileExtensions", fileExtensions);
  console.log("fileExtension", fileExtension);
  // console.log("addAccessory", addAccessory);
  // console.log("folderName", folderName);
  // console.log("disableExtSelect", disableExtSelect);
  // console.log("fileExtensionsObject", Object.keys(fileExtensions).length);
  // console.log("SELECTED MAIN", selectedCodeMainFolder);
  // console.log("accessory.label", accessory.label);
  // console.log("accessory.langId", accessory.langId);
  // console.log("language.langId", language.langId);
  // console.log("accessory.value", accessory.value);
  // console.log("accessory.accessoryId", accessory.value);
  // console.log("accessory.accessoryLangId", accessory.accessoryLangId);

  const createFolder = async (e) => {
    e.preventDefault();
    if (language && folderName) {
      setDisableBtn(true);
      try {
        await addDoc(
          collection(db, "UsersData1", user?.uid, "CodeSubFolders"),
          {
            createdAt: serverTimestamp(),
            rootDirectory: "sub",
            folderSnippetType: "code",
            label: folderName,
            value: randomValue,
            mainFolderId: selectedCodeMainFolder.mainFolderId,
            language: {
              label: language.label,
              value: language.value,
              langId: language.langId,
              fileExtension: fileExtension,
              accs: language.accessory,
              classTree: `lang${language.langId}`,
              acc:
                Object.keys(accessory).length > 0
                  ? {
                      accId: accessory.accId,
                      accsId: accessory.accsId,
                      accsType: accessory.accsType,
                      label: accessory.label,
                      mainLang: language.label,
                      mainLangId: language.langId,
                      value: accessory.value,
                      classTree: `lang${language.langId}__accs${accessory.accsId}-acc${accessory.accId}`,
                    }
                  : {},
            },
            tags: tags,
            userId: user.uid,
          }
        );
        setOpen(false);
        setUpdate(!update);
      } catch (error) {
        setDisableBtn(false);
      }
    } /* else {
        setInputStatus("- skal udfyldes!");
      } */
  };

  return (
    <div>
      <form onSubmit={createFolder}>
        <div className="flex flex-col gap-2">
          <div>
            <CreatedFolders
              setSelectedCodeMainFolder={setSelectedCodeMainFolder}
            />
          </div>

          {Object.keys(selectedCodeMainFolder).length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div>
                  <Text>Sprog</Text>
                </div>
                <div>
                  <div className="flex pt-1">
                    <div className="fileExtension extensionBadge rounded-lg flex justify-center items-center">
                      <p className="text-xs MonoHeading font-semibold lowercase">
                        {fileExtension?.label}
                      </p>
                    </div>

                    <div
                      className={`languageId${language.langId} lBadge rounded-3xl flex justify-center items-center`}
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

              <div className="flex gap-4">
                <div className="w-52 flex flex-col gap-1">
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
                      isDisabled={disableExtSelect}
                      value={fileExtension}
                      onChange={handleSelectFileExtension}
                      isSearchable={true}
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      // defaultInputValue={addValue[0]?.options[0]}
                    />
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

                    <div>
                      <Select
                        options={accessories}
                        placeholder="Valg tilbehør"
                        value={accessory}
                        onChange={handleSelectAccessories}
                        isDisabled={disableAccSelect}
                        isSearchable={true}
                        menuPortalTarget={document.body}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        components={{ NoOptionsMessage }}
                        // defaultValue={ext[0]}
                      />
                    </div>
                  </div>
                )}
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
          )}
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
