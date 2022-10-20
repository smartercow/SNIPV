import React, { useEffect, useMemo, useState } from "react";

import {
  addDoc,
  collection,
  doc,
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
import CreatedFolders from "./Folders/CreatedFolders";
import { toast } from "react-toastify";
import NextLink from "next/link";
import { CgExternal } from "react-icons/cg";
import CreatedSubFolders from "./Folders/CreatedSubFolders";
import CreateSnippetFolderHeading from "../CreateSnippetFolderHeading";
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

const initialState = {
  title: "",
  description: "",
  code: "",
  output: "",
  linkHeading: "",
  link: "",
};

const CreateCodeSnippet = ({ id, setLoading, setDataError }) => {
  const [user] = useAuthState(auth);

  const [selectedMainFolder, setSelectedMainFolder] = useState([]);
  const [selectedSubFolder, setSelectedSubFolder] = useState();
  const [subFolders, setSubFolders] = useState([]);

  const [form, setForm] = useState(initialState);
  const { title, description, code, output, linkHeading, link } = form;
  const [lowercaseForm, setLowercaseForm] = useState([]); //Search
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInputValues, setTagInputValues] = useState([]);

  const [selectValue, setSelectValue] = useState([]);
  const [selectSubValue, setSelectSubValue] = useState();

  const [username, setUsername] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [uid, setUid] = useState("");

  const router = useRouter();
  const [dataFetched, setDataFetched] = useState(false);

  const [disableCode, setDisableCode] = useState(true);
  const [codeExpanded, setCodeExpanded] = useState(false);
  const [folderExpanded, setFolderExpanded] = useState(true);

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
    if (title && code) {
      if (!id) {
        try {
          await addDoc(collection(db, "CodeSnippetsData1"), {
            ...form,
            search: {
              title: lowercaseForm.title,
              description: lowercaseForm.description,
            },
            snippetType: "code",
            postedAt: serverTimestamp(),
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
          router.push("/snips");
        } catch (error) {
          console.log("Fejl i opretning af SNIP!", error);
        }
      } else {
        try {
          await updateDoc(doc(db, "CodeSnippetsData1", id), {
            ...form,
            search: {
              title: lowercaseForm.title ? lowercaseForm.title : form.title,
              description: lowercaseForm.description
                ? lowercaseForm.description
                : form.description,
            },
            snippetType: "code",
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
      getCodeSnipData();
      setDisableCode(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getCodeSnipData = async () => {
    try {
      const docRef = doc(db, "CodeSnippetsData1", id);
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
      setCodeExpanded(true);
      setDisableCode(false);
      setFolderExpanded(false);
    } else {
      setCodeExpanded(false);
      setFolderExpanded(true);
      setDisableCode(true);
    }
  }, [selectSubValue, selectedMainFolder]);

  return (
    <div className="">
      <div className="">
        <Accordion defaultIndex={[0]} allowToggle variant="main">
          <AccordionItem border="none">
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
          <AccordionItem isDisabled={disableCode} borderBottom="none">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <div className="flex gap-5">
                    <Text variant="folderHeading">SNIP</Text>
                    {codeExpanded && (
                      <CreateSnippetFolderHeading
                        selectedSubFolder={selectedSubFolder}
                      />
                    )}
                  </div>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-5 mx-3">
                    <div className="w-full flex gap-4 items-center">
                      <div className="w-24">
                        <Text variant="label">Titel</Text>
                      </div>
                      <Input
                        name="title"
                        size="md"
                        required
                        variant="main"
                        maxLength={100}
                        onChange={handleChange}
                        value={title}
                      />
                    </div>

                    <div className="w-full flex gap-4 items-center">
                      <div className="w-24">
                        <Text variant="label">Beskrivelse</Text>
                      </div>
                      <Input
                        name="description"
                        size="md"
                        required
                        variant="main"
                        maxLength={100}
                        onChange={handleChange}
                        value={description}
                      />
                    </div>

                    <div>
                      <div className="flex flex-col gap-2">
                        <Text variant="label">Kode</Text>

                        <Textarea
                          name="code"
                          size="md"
                          required
                          onChange={handleChange}
                          value={code}
                        />
                      </div>

                      <div>
                        <Accordion allowToggle variant="preview">
                          <AccordionItem>
                            <h2>
                              <AccordionButton role="heading">
                                <Box flex="1" textAlign="left">
                                  <Text variant="preview">Forhåndsvisning</Text>
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel>
                              <SyntaxHighlighter
                                language="javascript"
                                style={oneLight}
                              >
                                {form.code}
                              </SyntaxHighlighter>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>

                    <div className="">
                      <div className="flex flex-col gap-2">
                        <Text variant="label">Output</Text>
                        <Textarea
                          name="output"
                          size="md"
                          variant="main"
                          value={output}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <Accordion allowToggle variant="preview">
                          <AccordionItem>
                            <h2>
                              <AccordionButton role="heading">
                                <Box flex="1" textAlign="left">
                                  <Text variant="preview">Forhåndsvisning</Text>
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel>
                              <SyntaxHighlighter
                                language="javascript"
                                style={oneLight}
                              >
                                {form.output}
                              </SyntaxHighlighter>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  </div>

                  <Accordion allowToggle variant="sub">
                    <AccordionItem>
                      <h2>
                        <AccordionButton role="heading">
                          <Box flex="1" textAlign="left">
                            <Text variant="accLabel">Noter</Text>
                          </Box>
                          <AccordionIcon mr={2} />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Textarea
                          name="notes"
                          size="md"
                          maxLength={400}
                          onChange={(e) => setNotes(e.target.value)}
                          value={notes}
                        />
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <h2>
                        <AccordionButton role="heading">
                          <Box flex="1" textAlign="left">
                            <Text variant="accLabel">Link</Text>
                          </Box>
                          <AccordionIcon mr={2} />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <div className="flex flex-col gap-5 mb-5">
                          <div className="w-full flex gap-4 items-center">
                            <div className="w-20">
                              <Text variant="subLabel">Heading</Text>
                            </div>

                            <div className="w-full">
                              <Input
                                name="linkHeading"
                                size="md"
                                onChange={handleChange}
                                value={linkHeading}
                              />
                            </div>
                          </div>

                          <div className="w-full flex gap-4 items-center">
                            <div className="w-20">
                              <Text variant="subLabel">Link</Text>
                            </div>

                            <div className="w-full">
                              <Input
                                name="link"
                                size="md"
                                onChange={handleChange}
                                value={link}
                              />
                            </div>
                          </div>
                        </div>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <h2>
                        <AccordionButton role="heading">
                          <Box flex="1" textAlign="left">
                            <Text variant="accLabel">Tags</Text>
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
                          <div className="mt-2">
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

                  <div className="mx-3 flex flex-col gap-5">
                    <div>
                      {id ? (
                        <Button variant="create" color="primary" type="submit">
                          OPDATERE
                        </Button>
                      ) : (
                        <Button variant="create" color="primary" type="submit">
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

export default CreateCodeSnippet;
