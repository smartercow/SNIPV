import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Select, CreatableSelect, AsyncSelect } from "chakra-react-select";
import { auth, db } from "../../../firebase/clientApp";
import { LanguageOptions } from "../../../utilities/Language";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CreateFolderModalState } from "../../../atoms/CreateFolderModalAtom";
import { subFolderEditUpdateState } from "../../../atoms/subFolderEditUpdateState";
import { updateStateAtom } from "../../../atoms/updateStateAtom";
import { NoOptionsMessage } from "../../Select/NoOptionsMessage";
import { TagsInput } from "react-tag-input-component";
import { useRouter } from "next/router";
import { Box, Button, Checkbox, Input, Text } from "@chakra-ui/react";

export default function CreateMainFolder() {
  const [user] = useAuthState(auth);
  const { asPath } = useRouter();
  const [open, setOpen] = useRecoilState(CreateFolderModalState);
  const [update, setUpdate] = useRecoilState(updateStateAtom);

  const [subEdited, setSubEdited] = useRecoilState(subFolderEditUpdateState);

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

  const [subFolder, setSubFolder] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (asPath.startsWith("/upsert/code")) {
      setSubFolder("CodeSubFolders");
      setType("code");
    }
    if (asPath.startsWith("/upsert/error")) {
      setSubFolder("ErrorSubFolders");
      setType("error");
    }
    if (asPath.startsWith("/upsert/setup")) {
      setSubFolder("SetupSubFolders");
      setType("setup");
    }
  }, [asPath]);

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
    if (!open.folder?.subFolderId) {
      if (language.accessory && addAccessory) {
        setAccessories(language.accessories);
        setDisableAccSelect(false);
      } else {
        setFileExtensions(language.fileExtensions);
        setDisableAccSelect(true);
        setAccessories({});
        setAccessory({});
      }
    }
  }, [language, addAccessory, open]);

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
          await addDoc(collection(db, "UsersData1", user?.uid, subFolder), {
            createdAt: serverTimestamp(),
            rootDirectory: "sub",
            folderSnippetType: type,
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
          });
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
        await updateDoc(doc(db, "UsersData1", user?.uid, subFolder, open.folder?.subFolderId), {
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
        });
        setSubEdited(true);
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
            <div className="w-20">
              <Text variant="H5">Rodmappe</Text>
            </div>
            <div>
              <Text fontSize="15px" className="truncate">
                {selectedMainFolder?.label}
              </Text>
            </div>
          </div>

          {Object.keys(selectedMainFolder).length > 0 && (
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex gap-2 items-center">
                <div className="w-20">
                  <Text variant="H5">Sprog</Text>
                </div>
                <div>
                  <div className="flex">
                    <div className={`lang${language.langId} lBadge rounded-3xl flex justify-center items-center`}>
                      <p className={`text-xs MonoHeading font-semibold lowercase`}>{language?.label}</p>
                    </div>

                    {accessory && (
                      <div
                        className={`lang${language.langId}__accs${accessory.accsId}-acc${accessory.accId} lBadge rounded-3xl flex justify-center items-center`}>
                        <p className="text-xs MonoHeading font-semibold lowercase">{accessory?.label}</p>
                      </div>
                    )}

                    <Box color="white" bg="Primary" className="lBadge rounded-3xl flex justify-center items-center">
                      <p className="text-xs MonoHeading font-semibold lowercase">{fileExtension?.label}</p>
                    </Box>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex mb-2">
                  <Text variant="H5">Navn&nbsp;</Text>
                  <Text color="Red" variant="H5">
                    *
                  </Text>
                </div>
                <Input
                  placeholder="Mappe navn"
                  onChange={(e) => setFolderName(e.target.value)}
                  value={folderName}
                  size="md"
                  aria-label="Folder name"
                />
              </div>

              <Box
                pointerEvents={open.folder?.subFolderId && "none"}
                opacity={open.folder?.subFolderId && 0.4}
                className="flex gap-4">
                <div className="w-52 flex flex-col gap-2">
                  <div className="flex pt-1">
                    <Text variant="H5">Filtypenavn&nbsp;</Text>
                    <Text color="Red" variant="H5">
                      *
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
                  <div className="flex flex-col gap-2 w-full">
                    <div>
                      <Checkbox size="md" onChange={() => setAddAccessory(!addAccessory)} isChecked={addAccessory}>
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
                      />
                    </div>
                  </div>
                )}
              </Box>

              <div className="flex flex-col gap-1">
                <div>
                  <Text variant="H5">Mappe tags</Text>
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

        <div className="flex gap-4 w-full justify-end my-3">
          <Button color="Red" onClick={() => setOpen(false)} variant="btnCloseGhost">
            Luk
          </Button>

          {open.folder?.subFolderId ? (
            <Button disabled={disableBtn} type="submit" variant="btnMain">
              Opdatere mappe
            </Button>
          ) : (
            <Button disabled={disableBtn} type="submit" variant="btnMain">
              Opret mappe
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
