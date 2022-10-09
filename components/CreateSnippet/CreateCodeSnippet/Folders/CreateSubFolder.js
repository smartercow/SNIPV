import { Button, Checkbox, Input, Text } from "@nextui-org/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Select from "react-select";
import { auth, db } from "../../../../firebase/clientApp";
import { LanguageOptions } from "../../../../utilities/Language";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createCodeFolderModalState } from "../../../../atoms/createCodeFolderModalAtom";
import { subFolderEditUpdateState } from "../../../../atoms/subFolderEditUpdateState";
import { updateStateAtom } from "../../../../atoms/updateStateAtom";
import { NoOptionsMessage } from "../../Select/NoOptionsMessage";
import { TagsInput } from "react-tag-input-component";

export default function CreateMainFolder() {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useRecoilState(createCodeFolderModalState);
  const [update, setUpdate] = useRecoilState(updateStateAtom);

    const [subEdited, setSubEdited] = useRecoilState(
      subFolderEditUpdateState
  );

  const [folderName, setFolderName] = useState("");

  const [disableExtSelect, setDisableExtSelect] = useState(false);
  const [disableAccSelect, setDisableAccSelect] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);

  const [language, setLanguage] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [accessory, setAccessory] = useState({});
  const [addAccessory, setAddAccessory] = useState(true);
  const [fileExtensions, setFileExtensions] = useState();
  const [fileExtension, setFileExtension] = useState({});

  const [selectedMainFolder, setSelectedMainFolder] = useState([]);

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
    setTags(lowercaseTags);
  }, [tagInputValues]);

  useEffect(() => {
    if (open.folder?.subFolderId) {
      setSelectedMainFolder(open.folder.mainFolder);
      setAccessory(open.folder.language.acc);
      setFileExtension(open.folder.language.fileExtension);
      setFolderName(open.folder.label);
      setTags(open.folder.tags);
    } else {
      setSelectedMainFolder(open.folder);
    }
  }, [open]);
  console.log("open.folder", open?.folder);
  console.log("open.folder.mainFolder", open?.folder?.mainFolder);
  console.log("open.folder.language.acc", open?.folder?.language?.acc);
  console.log("open.folder.language.fileExtension", open?.folder?.language?.fileExtension);

  useEffect(() => {
    if (Object.keys(selectedMainFolder)?.length > 0) {
      const filteredLang = LanguageOptions.filter((lang) => {
        if (lang.langId === selectedMainFolder.language.langId) {
          return lang;
        }
      });

      setLanguage(filteredLang[0]);
    }
  }, [selectedMainFolder]);

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
      if (!open.folder?.subFolder && fileExtensions) {
        setFileExtension(fileExtensions[0]);

        if (Object.keys(fileExtensions)?.length == 1) {
          setDisableExtSelect(true);
        } else {
          setDisableExtSelect(false);
        }
      }
    }
  }, [language, fileExtensions, open]);

  const createFolder = async (e) => {
    e.preventDefault();

    if (!open.folder?.subFolderId) {
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
              mainFolder: selectedMainFolder,
              language: {
                fileExtension: fileExtension,
                acc:
                  Object.keys(accessory).length > 0
                    ? {
                        accId: accessory.accId,
                        accsId: accessory.accsId,
                        accsType: accessory.accsType,
                        label: accessory.label,
                        mainLang: language.label,
                        mainValue: language.value,
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
        } catch (error) {
          setDisableBtn(false);
        } finally {
          setDisableBtn(false);
          setOpen(false);
          setUpdate(!update);
        }
      }
    } else {
      try {
        await updateDoc(
          doc(
            db,
            "UsersData1",
            user?.uid,
            "CodeSubFolders",
            open.folder?.subFolderId
          ),
          {
            updatedAt: serverTimestamp(),
            label: folderName,
            language: {
              fileExtension: fileExtension,
              acc:
                Object.keys(accessory).length > 0
                  ? {
                      accId: accessory.accId,
                      accsId: accessory.accsId,
                      accsType: accessory.accsType,
                      label: accessory.label,
                      classTree: `lang${language.langId}__accs${accessory.accsId}-acc${accessory.accId}`,
                    }
                  : {},
            },
            tags: tags,
          }
        );
        setSubEdited(true)
      } catch (error) {
        setDisableBtn(false);
      } finally {
        setDisableBtn(false);
        setOpen(false);
        setUpdate(!update);
      }
    }
    /* else {
        setInputStatus("- skal udfyldes!");
      } */
  };

  return (
    <div>
      <form onSubmit={createFolder}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Text h6 size={13} transform="uppercase">
              Rodmappe:
            </Text>
            <div>
              <Text h6 transform="uppercase">
                {selectedMainFolder?.label}
              </Text>
            </div>
          </div>

          {Object.keys(selectedMainFolder).length > 0 && (
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
                  value={folderName}
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

              <div className="flex flex-col gap-1">
                <div>
                  <Text>Mappe tags</Text>
                </div>
                <div>
                  {!open.folder?.subFolderId && (
                    <TagsInput
                      value={tags}
                      onChange={setTagInputValues}
                      name="tags"
                      placeHolder="Skriv og tryk ENTER"
                    />
                  )}

                  {open.folder?.subFolderId && (
                    <TagsInput
                      value={tags}
                      onChange={setTagInputValues}
                      name="tags"
                      placeHolder="Skriv og tryk ENTER"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 w-full justify-end my-3">
          <Button auto light color="error" onClick={() => setOpen(false)}>
            Luk
          </Button>

          {open.folder?.subFolderId ? (
            <Button disabled={disableBtn} color="primary" auto type="submit">
              Opdatere mappe
            </Button>
          ) : (
            <Button disabled={disableBtn} color="primary" auto type="submit">
              Opret mappe
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
