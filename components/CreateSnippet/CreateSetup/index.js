import React, { useEffect, useMemo, useState } from "react";

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  FieldValue,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase/clientApp";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { TagsInput } from "react-tag-input-component";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { toast } from "react-toastify";
import NextLink from "next/link";
import { CgExternal } from "react-icons/cg";
import FolderHeading from "../FolderHeading";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Input,
  Link,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Entries from "./Entries";
import CreatedFolders from "../../Folders/CreateFolder/CreatedFolders";
import CreatedSubFolders from "../../Folders/CreateFolder/CreatedSubFolders";

const initialState = {
  title: "",
  description: "",
};

const initialSelectedLangFileExt = {
  label: "JavaScript",
  value: "javascript",
  langId: "1",
  fileExtensions: [
    { label: ".js", value: "js", extId: "1", syntaxHighlight: "javascript" },
    { label: ".jsx", value: "jsx", extId: "2", syntaxHighlight: "jsx" },
    { label: ".glFT", value: "glft", extId: "3", syntaxHighlight: "json" },
  ],
};

const initialSelectedFileExt = {
  label: ".js",
  value: "js",
  extId: "1",
  syntaxHighlight: "javascript",
};

const CreateSetup = ({ id, setLoading, setDataError }) => {
  const [user] = useAuthState(auth);

  const [selectedMainFolder, setSelectedMainFolder] = useState([]);
  const [selectedSubFolder, setSelectedSubFolder] = useState();
  const [subFolders, setSubFolders] = useState([]);

  const [form, setForm] = useState(initialState);
  const { title, description } = form;
  const [lowercaseForm, setLowercaseForm] = useState([]); //Search
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInputValues, setTagInputValues] = useState([]);

  const [selectValue, setSelectValue] = useState([]);
  const [selectSubValue, setSelectSubValue] = useState();

  const [allEntries, setAllEntries] = useState([]);
  const [entries, setEntries] = useState([]);
  const [selectLangFileExt, setSelectLangFileExt] = useState(
    initialSelectedLangFileExt
  );
  const [selectedLangFileExt, setSelectedLangFileExt] = useState(
    initialSelectedLangFileExt
  );
  const [selectFileExt, setSelectFileExt] = useState(initialSelectedFileExt);
  const [selectedFileExt, setSelectedFileExt] = useState(
    initialSelectedFileExt
  );

  const [username, setUsername] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [uid, setUid] = useState("");

  const router = useRouter();
  const [dataFetched, setDataFetched] = useState(false);

  const [disableCode, setDisableCode] = useState(true);
  const [accordionIndex, setAccordionIndex] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLowercaseForm({
      ...lowercaseForm,
      [e?.target.name]: e?.target.value.toLowerCase(),
    });
  };

  const lowercaseTags = tagInputValues.map((element) => {
    return element.toLowerCase();
  });

  useEffect(() => {
    setTags(lowercaseTags);
  }, [tagInputValues]);

  useEffect(() => {
    if (!user) return;
    const userDocRef = doc(db, "UsersData1", user.uid);
    const getUser = async () => {
      const userData = await getDoc(userDocRef);

      setUsername(userData?.data().username);
      setUsernameValue(userData?.data().usernameValue);
      setUid(userData?.data().user?.uid);
      setPhotoURL(userData?.data().user?.photoURL);
    };
    getUser();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {
      if (!id) {
        try {
          await addDoc(collection(db, "SetupsData"), {
            ...form,
            search: {
              title: lowercaseForm.title,
              description: lowercaseForm.description,
            },
            entries: { ...allEntries },
            snippetType: "setup",
            postedAt: serverTimestamp(),
            userData: {
              username: username,
              usernameValue: usernameValue,
              uid: uid,
              photoURL: photoURL,
            },
            folder: selectedSubFolder,
            tags: tags,
          });
          router.push("/setups");
        } catch (error) {
          console.log("Fejl i opretning af Setup!", error);
        }
      } else {
        try {
          await updateDoc(doc(db, "SetupsData", id), {
            ...form,
            search: {
              title: lowercaseForm.title ? lowercaseForm.title : form.title,
              description: lowercaseForm.description
                ? lowercaseForm.description
                : form.description,
            },
            snippetType: "setup",
            updatedAt: serverTimestamp(),
            userData: {
              username: username,
              usernameValue: usernameValue,
              uid: uid,
              photoURL: photoURL,
            },
            folder: selectedSubFolder,
            tags: tags,
            notes: notes,
          });
          router.push(`/s/${id}`);
        } catch (error) {
          console.log("Fejl i opdatering af SNIP!", error);
        }
      }
    } else {
      // return toast.error("Valg en mappe!");
      return toast.error("FEJL!");
    }
  };

  useEffect(() => {
    if (id) {
      getSetupsData();
      setDisableCode(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getSetupsData = async () => {
    try {
      const docRef = doc(db, "SetupsData", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        //Code SNIP data from {id}
        setSelectedMainFolder(snapshot.data().folder.mainFolder);
        setSelectValue(snapshot.data().folder.mainFolder);
        setSelectedSubFolder(snapshot.data().folder);
        setSelectSubValue(snapshot.data().folder);
        setForm({
          title: snapshot.data().title,
          description: snapshot.data().description,
          code: snapshot.data().code,
          output: snapshot.data().output,
          linkHeading: snapshot.data().linkHeading,
          link: snapshot.data().link,
        });
        setTags(snapshot.data().tags);
        setNotes(snapshot.data().notes);

        setLoading(false);
      }
    } catch (error) {
      console.log("Kan ikke hente kode SNIP til at opdatere!", error);
      setDataError(true);
      setLoading(false);
    } finally {
      //Code SNIP data have been fetched
      setDataFetched(true);
      setDataError(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectSubValue) {
      // setCodeExpanded(true);
      setAccordionIndex(1);
      setDisableCode(false);
      // setFolderExpanded(false);
    } else {
      // setCodeExpanded(false);
      setAccordionIndex(0);
      // setFolderExpanded(true);
      setDisableCode(true);
    }
  }, [selectSubValue, selectedMainFolder]);

  // console.log("entries", entries);

  return (
    <div className="">
      <div className="">
        <Accordion allowToggle variant="main">
          <AccordionItem border="none" index={accordionIndex}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text variant="folderHeading">Mappe</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <div className="flex flex-col gap-4 mx-1 h-40">
                <CreatedFolders
                  selectedMainFolder={selectedMainFolder}
                  setSelectedMainFolder={setSelectedMainFolder}
                  selectedSubFolder={selectedSubFolder}
                  setSelectedSubFolder={setSelectedSubFolder}
                  id={id}
                  selectValue={selectValue}
                  setSelectValue={setSelectValue}
                  setSelectSubValue={setSelectSubValue}
                />

                {selectedMainFolder?.language?.langId && (
                  <div>
                    <CreatedSubFolders
                      selectedMainFolder={selectedMainFolder}
                      selectedSubFolder={selectedSubFolder}
                      setSelectedSubFolder={setSelectedSubFolder}
                      setSubFolders={setSubFolders}
                      subFolders={subFolders}
                      selectSubValue={selectSubValue}
                      setSelectSubValue={setSelectSubValue}
                    />
                  </div>
                )}
              </div>
            </AccordionPanel>
          </AccordionItem>
          <Divider my={2} />
          <AccordionItem
            index={accordionIndex}
            isDisabled={disableCode}
            borderBottom="none"
          >
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <div className="flex gap-5">
                    <Text variant="folderHeading">SETUP</Text>
                  </div>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <form onSubmit={handleSubmit} className="mx-3">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-5 h-full">
                    <div className="w-full flex gap-4 items-center">
                      <div className="w-24">
                        <Text variant="H5">Titel</Text>
                      </div>
                      <Input
                        name="title"
                        size="md"
                        required
                        variant="main"
                        maxLength={130}
                        onChange={handleChange}
                        value={title}
                      />
                    </div>

                    <div className="w-full flex gap-4 items-center">
                      <div className="w-24">
                        <Text variant="H5">Beskrivelse</Text>
                      </div>
                      <Input
                        name="description"
                        size="md"
                        required
                        variant="main"
                        maxLength={180}
                        onChange={handleChange}
                        value={description}
                      />
                    </div>
                  </div>

                  <Accordion allowToggle variant="sub">
                    <AccordionItem>
                      <h2>
                        <AccordionButton role="heading">
                          <Box flex="1" textAlign="left">
                            <Text variant="H5">Tags</Text>
                          </Box>
                          <AccordionIcon mr={2} />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <div className="flex flex-col gap-2">
                          <div className="w-full flex gap-2 items-center">
                            <div className="w-full">
                              {!id && (
                                <TagsInput
                                  value={tags}
                                  onChange={setTagInputValues}
                                  name="tags"
                                  placeHolder="Skriv og tryk ENTER"
                                />
                              )}

                              {dataFetched && (
                                <TagsInput
                                  value={tags}
                                  onChange={setTagInputValues}
                                  name="tags"
                                  placeHolder="Skriv og tryk ENTER"
                                />
                              )}
                            </div>
                          </div>
                          <div className="">
                            <NextLink href="/info/help/tags" passHref>
                              <Link
                                target="_blank"
                                colorScheme="Primary"
                                variant="info"
                              >
                                Læs hvordan man skriver søgbare tags.
                              </Link>
                            </NextLink>
                          </div>
                        </div>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <div className="">
                    <Entries
                      allEntries={allEntries}
                      setAllEntries={setAllEntries}
                      entries={entries}
                      setEntries={setEntries}
                      selectLangFileExt={selectLangFileExt}
                      setSelectLangFileExt={setSelectLangFileExt}
                      selectFileExt={selectFileExt}
                      setSelectFileExt={setSelectFileExt}
                      selectedLangFileExt={selectedLangFileExt}
                      setSelectedLangFileExt={setSelectedLangFileExt}
                      selectedFileExt={selectedFileExt}
                      setSelectedFileExt={setSelectedFileExt}
                      initialSelectedLangFileExt={initialSelectedLangFileExt}
                      initialSelectedFileExt={initialSelectedFileExt}
                    />
                  </div>

                  <div className="flex flex-col gap-5">
                    <div>
                      {id ? (
                        <Button
                          style={{ color: "white" }}
                          variant="create"
                          color="primary"
                          type="submit"
                        >
                          OPDATERE
                        </Button>
                      ) : (
                        <Button
                          style={{ color: "white" }}
                          variant="create"
                          color="primary"
                          type="submit"
                        >
                          GEM
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default CreateSetup;
