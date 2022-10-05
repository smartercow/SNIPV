import React, { useEffect, useMemo, useState } from "react";
import {
  Input,
  Spacer,
  Textarea,
  Button,
  Collapse,
  Text,
  Tooltip,
  Loading,
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
import AdditionalFileExt from "../../Testing/AdditionalFileExt";
import CreatedSubFolders from "./Folders/CreatedSubFolders";

const CreateErrorSnippet = ({ id, setLoading, setDataError }) => {
  const [form, setForm] = useState(initialState);
  const [tags, setTags] = useState([]);
  const [tagInputValues, setTagInputValues] = useState([]);
  const [notes, setNotes] = useState("");

  const [username, setUsername] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [uid, setUid] = useState("");

  const [lowercaseForm, setLowercaseForm] = useState([]);

  const [selectedCodeMainFolder, setSelectedCodeMainFolder] = useState([]);

  const [selectedCodeSubFolder, setSelectedCodeSubFolder] = useState();

  const [subFolders, setSubFolders] = useState([]);

  const [dataFetched, setDataFetched] = useState(false);

  const { title, description, errorcode, solutioncode, linkHeading, link } =
    form;

  const [user] = useAuthState(auth);

  const router = useRouter();

  const [disableCode, setDisableCode] = useState(true);
  const [codeExpanded, setCodeExpanded] = useState(false);
  const [folderExpanded, setFolderExpanded] = useState(true);

  const [selectSubValue, setSelectSubValue] = useState([]);

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
          await addDoc(collection(db, "ErrorSnippetsData1"), {
            ...form,
            search: {
              title: lowercaseForm.title,
              description: lowercaseForm.description,
            },
            snippetType: "error",
            postedAt: serverTimestamp(),
            userData: {
              username: username,
              usernameValue: usernameValue,
              uid: uid,
              photoURL: photoURL,
            },
            folder: selectedCodeSubFolder.language,
            tags: tags,
            notes: notes,
          });
          router.push("/snips/errors");
        } catch (error) {
          console.log("Fejl i opretning af SNIP!", error);
        }
      } /* else {
        try {
          await updateDoc(doc(db, "CodeSnippetsData1", id), {
            ...form,
            search: {
              title: lowercaseForm.title,
              description: lowercaseForm.description,
            },
            updatedAt: serverTimestamp(),
            userData: {
              username: username,
              usernameValue: usernameValue,
              uid: uid,
              photoURL: photoURL,
            },
            category: selectedCategory,
            folder: selectedFolder,
            tags: tags,
            notes: notes,
          });
          router.push(`/s/${id}`);
        } catch (error) {
          console.log("Fejl i opdatering af SNIP!", error);
        }
      } */
    } else {
      // return toast.error("Valg en mappe!");
      return toast.error("FEJL!");
    }
  };

  const getCodeSnipData = async () => {
    try {
      const docRef = doc(db, "CodeSnippetsData1", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        //Code SNIP data from {id}
        setForm({ ...snapshot.data() });
        setSelectedFolder(snapshot.data().folder);
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
    if (id) {
      getCodeSnipData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (selectedCodeMainFolder.langId > 0) {
      setDisableCode(false);
      if (Object.keys(selectedCodeSubFolder).length > 0) {
        setSelectSubValue(subFolders[0]);
      } else {
        setSelectSubValue({});
      }
    } else {
      setDisableCode(true);
    }
  }, [selectedCodeMainFolder, subFolders, selectedCodeSubFolder]);

/*   useEffect(() => {

  }, [selectedCodeSubFolder, subFolders]); */

  useEffect(() => {
    if (Object.keys(selectSubValue).length > 0) {
      setCodeExpanded(true);
      setDisableCode(false);
      setFolderExpanded(false);
    } else {
      setCodeExpanded(false);
      setFolderExpanded(true);
      setDisableCode(true);
    }
  }, [selectSubValue]);

  // console.log("selectedCodeMainFolder", selectedCodeMainFolder);
  // console.log("selectedSubCodeFolder", selectedCodeSubFolder);
  // console.log("selectedCodeFolder", selectedCodeSubFolder);

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
                            {selectedCodeMainFolder.label}
                          </Text>
                          <div
                            className={`${selectedCodeSubFolder?.language?.classTree} lBadge rounded-3xl flex justify-center items-center`}
                          >
                            <p className="text-xs MonoHeading font-semibold lowercase">
                              {selectedCodeMainFolder.language?.label}
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
                            {selectedCodeSubFolder?.label}
                          </Text>
                        </div>
                        <div
                          className={`${selectedCodeSubFolder?.language.acc?.classTree} lBadge rounded-3xl flex justify-center items-center`}
                        >
                          <p className="text-xs MonoHeading font-semibold lowercase">
                            {selectedCodeSubFolder?.language?.acc?.label}
                          </p>
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
                setSelectedCodeMainFolder={setSelectedCodeMainFolder}
                selectedCodeMainFolder={selectedCodeMainFolder}
                setSelectedCodeSubFolder={setSelectedCodeSubFolder}
                selectedCodeSubFolder={selectedCodeSubFolder}
                id={id}
                dataFetched={dataFetched}
              />

              {selectedCodeMainFolder.language?.langId > 0 && (
                <div>
                  <CreatedSubFolders
                    setSelectedCodeSubFolder={setSelectedCodeSubFolder}
                    selectedCodeSubFolder={selectedCodeSubFolder}
                    selectedCodeMainFolder={selectedCodeMainFolder}
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
                      <div className="w-20 text-right">
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
                      <div className="w-20 text-right">
                        <Text h6 transform="uppercase">
                          Beskrivelse
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
                      />
                    </div>

                    <div>
                      <div className="mt-1">
                        <Text h6 transform="uppercase">
                          Din kode&nbsp;
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

                    <div>
                      <div className="mt-1">
                        <Text>
                          Fejl kode&nbsp;
                          <Text color="error" b>
                            *
                          </Text>
                        </Text>
                        <Spacer y={0.4} />
                        <Textarea
                          placeholder="her..."
                          name="errorcode"
                          value={errorcode}
                          onChange={handleChange}
                          css={{ height: "auto" }}
                          size="lg"
                          width="100%"
                          shadow="false"
                          animated="false"
                          aria-label="kode"
                          required
                        />
                      </div>

                      <div>
                        
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
                      <div className="flex flex-col gap-5">
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
                      <div className="flex flex-col gap-2 py-1">
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
                          {/*                     <Tooltip
                            content={"Undgå at bruge specialtegn."}
                            color="primary"
                            css={{ zIndex: 9999 }}
                          >
                            <Text h5 color="primary">
                              <BsQuestionCircleFill />
                            </Text>
                          </Tooltip> */}
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

export default CreateErrorSnippet;
