import React, { useEffect, useMemo, useState } from "react";
import {
  Input,
  Spacer,
  Textarea,
  Button,
  Collapse,
  Text,
  Tooltip,
  Card,
} from "@nextui-org/react";
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
import { BsQuestionCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { InfoCircle } from "../../SVG/InfoCircle";
import Link from "next/link";
import { CgExternal } from "react-icons/cg";
import CreatedSubFolders from "./Folders/CreatedSubFolders";

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
          router.push("/snips/codes");
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

  // console.log("selectedMainFolder", selectedMainFolder);
  // console.log("selectValue", selectValue);
  // console.log("selectedSubFolder", selectedSubFolder);
  // console.log("lowercaseForm", lowercaseForm);
  // console.log("lowercaseForm.title", lowercaseForm.title);
  // console.log("lowercaseForm.description", lowercaseForm.description);
  // console.log("form.title", form.title);
  // console.log("form.description", form.description);
  // console.log("selectSubValue", selectSubValue);

  return (
    <div className="">
      <div className="">
        <Collapse.Group className="pb-0">
          <Collapse
            title={
              <div className="flex items-center gap-7">
                <div>
                  <Text h3>MAPPE</Text>
                </div>
                <div className="flex items-center gap-4">
                  {codeExpanded && (
                    <>
                      <div className="flex items-center gap-4">
                        <div className="flex gap-2 items-center">
                          <Text h5 transform="uppercase">
                            {selectedSubFolder?.mainFolder?.label}
                          </Text>
                          <div
                            className={`${selectedSubFolder?.mainFolder?.language?.classTree} lBadge rounded-3xl flex justify-center items-center`}
                          >
                            <p className="text-xs MonoHeading font-semibold lowercase">
                              {
                                selectedSubFolder?.mainFolder?.language
                                  ?.label
                              }
                            </p>
                          </div>
                        </div>
                        <div>
                          <Text className="text-gray-500" size={20}>
                            &#129094;
                          </Text>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <div>
                          <Text h5 transform="uppercase">
                            {selectedSubFolder?.label}
                          </Text>
                        </div>
                        <div
                          className={`${selectedSubFolder?.language?.acc?.classTree} lBadge rounded-3xl flex justify-center items-center`}
                        >
                          <p className="text-xs MonoHeading font-semibold lowercase">
                            {selectedSubFolder?.language?.acc?.label}
                          </p>
                        </div>
                        <div className="">
                          {
                            selectedSubFolder?.language?.fileExtension
                              ?.label
                          }
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            }
            expanded={folderExpanded}
          >
            <div className="mx-3 min-h-[10rem] w-[95%]">
              <CreatedFolders
                setSelectedMainFolder={setSelectedMainFolder}
                selectedMainFolder={selectedMainFolder}
                setSelectedSubFolder={setSelectedSubFolder}
                selectedSubFolder={selectedSubFolder}
                id={id}
                dataFetched={dataFetched}
                selectValue={selectValue}
                setSelectValue={setSelectValue}
                setSelectSubValue={setSelectSubValue}
              />

              {selectedMainFolder?.language?.langId && (
                <div>
                  <CreatedSubFolders
                    setSelectedSubFolder={setSelectedSubFolder}
                    selectedSubFolder={selectedSubFolder}
                    selectedMainFolder={selectedMainFolder}
                    setSubFolders={setSubFolders}
                    subFolders={subFolders}
                    selectSubValue={selectSubValue}
                    setSelectSubValue={setSelectSubValue}
                  />
                </div>
              )}
            </div>
          </Collapse>
          <Collapse title="SNIP" disabled={disableCode} expanded={codeExpanded}>
            <Card>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-5 mx-3">
                    <div className="w-full flex gap-4 items-center">
                      <div className="w-24">
                        <Text h6 transform="uppercase">
                          Titel&nbsp;
                          <Text color="error" b>
                            *
                          </Text>
                        </Text>
                      </div>
                      <Input
                        underlined
                        clearable
                        name="title"
                        value={title}
                        size="lg"
                        onChange={handleChange}
                        required
                        width="100%"
                        aria-label="Titel"
                      />
                    </div>

                    <div className="w-full flex gap-4 items-center">
                      <div className="w-24">
                        <Text h6 transform="uppercase">
                          Beskrivelse&nbsp;
                          <Text color="error" b>
                            *
                          </Text>
                        </Text>
                      </div>
                      <Input
                        underlined
                        clearable
                        name="description"
                        value={description}
                        size="lg"
                        onChange={handleChange}
                        width="100%"
                        aria-label="Beskrivelse"
                        required
                      />
                    </div>

                    <div>
                      <div className="mt-1">
                        <Text h6 transform="uppercase">
                          Kode&nbsp;
                          <Text color="error" b>
                            *
                          </Text>
                        </Text>
                        <Spacer y={0.4} />
                        <Textarea
                          placeholder="her..."
                          name="code"
                          value={code}
                          onChange={handleChange}
                          css={{ height: "auto" }}
                          size="lg"
                          cacheMeasurements
                          width="100%"
                          height="100%"
                          shadow="false"
                          animated="false"
                          aria-label="kode"
                          required
                        />
                      </div>

                      <div>
                        <Collapse.Group>
                          <Collapse title={<Text b>Kode forhåndsvisning</Text>}>
                            <SyntaxHighlighter
                              language="javascript"
                              style={oneLight}
                            >
                              {form.code}
                            </SyntaxHighlighter>
                          </Collapse>
                        </Collapse.Group>
                      </div>
                    </div>

                    <div className="-mt-5">
                      <div className="mt-1">
                        <Text h6 transform="uppercase">
                          Output
                        </Text>
                        <Spacer y={0.4} />
                        <Textarea
                          placeholder="her..."
                          name="output"
                          value={output}
                          onChange={handleChange}
                          css={{ height: "auto" }}
                          size="lg"
                          cacheMeasurements
                          width="100%"
                          height="100%"
                          shadow="false"
                          animated="false"
                          aria-label="output"
                        />
                      </div>

                      <div>
                        <Collapse.Group>
                          <Collapse
                            title={<Text b>Output forhåndsvisning</Text>}
                          >
                            <SyntaxHighlighter
                              language="javascript"
                              style={oneLight}
                            >
                              {form.output}
                            </SyntaxHighlighter>
                          </Collapse>
                        </Collapse.Group>
                      </div>
                    </div>
                  </div>

                  <Collapse.Group className="pb-0">
                    <Collapse
                      title={
                        <Text h6 transform="uppercase">
                          Notat
                        </Text>
                      }
                    >
                      <Textarea
                        placeholder="her..."
                        name="notes"
                        onChange={(e) => setNotes(e.target.value)}
                        css={{ height: "auto" }}
                        size="lg"
                        cacheMeasurements
                        width="100%"
                        height="100%"
                        shadow="false"
                        animated="false"
                        aria-label="noter"
                        value={notes}
                      />
                    </Collapse>
                    <Collapse
                      title={
                        <Text h6 transform="uppercase">
                          Link
                        </Text>
                      }
                    >
                      <div className="flex flex-col gap-5 mb-5">
                        <div className="w-full flex gap-4 items-center">
                          <div className="w-20">
                            <Text>Heading</Text>
                          </div>
                          <div className="w-full">
                            <Input
                              underlined
                              clearable
                              name="linkHeading"
                              value={linkHeading}
                              size="lg"
                              onChange={handleChange}
                              width="100%"
                              aria-label="linkHeading"
                            />
                          </div>
                        </div>
                        <div className="w-full flex gap-4 items-center">
                          <div className="w-20">
                            <Text>Link</Text>
                          </div>
                          <div className="w-full">
                            <Input
                              underlined
                              clearable
                              name="link"
                              value={link}
                              size="lg"
                              onChange={handleChange}
                              width="100%"
                              aria-label="link"
                            />
                          </div>
                        </div>
                      </div>
                    </Collapse>
                    <Collapse
                      expanded
                      title={
                        <Text h6 transform="uppercase">
                          Tags
                        </Text>
                      }
                    >
                      <div className="flex flex-col gap-2 mb-5">
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
                          <Link href="/info/help/tags">
                            <a target="_blank">
                              <Text
                                color="primary"
                                className="cursor-pointer underline"
                                size={14}
                              >
                                Læs hvordan man skriver søgbare tags
                                <span className="text-blue-500">
                                  <CgExternal />
                                </span>
                              </Text>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </Collapse>
                  </Collapse.Group>

                  <div className="mx-3 flex flex-col gap-5">
                    <div>
                      {id ? (
                        <Button color="primary" type="submit">
                          OPDATERE
                        </Button>
                      ) : (
                        <Button color="primary" type="submit">
                          GEM
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </Card>
          </Collapse>
        </Collapse.Group>
      </div>
    </div>
  );
};

export default CreateCodeSnippet;
