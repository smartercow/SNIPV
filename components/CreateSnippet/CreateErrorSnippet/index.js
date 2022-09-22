import React, { useEffect, useState } from "react";
import {
  Input,
  Spacer,
  Textarea,
  Button,
  Collapse,
  Text,
  Tooltip,
  Switch,
  Loading,
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
import CreatedFolders from "./CreatedFolders";
import { BsQuestionCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { InfoCircle } from "../../SVG/InfoCircle";
import Link from "next/link";
import { CgExternal } from "react-icons/cg";

const initialState = {
  title: "",
  description: "",
  errorcode: "",
  solutioncode: "",
  linkHeading: "",
  link: "",
};

const initialStateLowercase = {
  title: "",
  description: "",
};

const initialSelectedFolderValue = {
  label: "",
  value: "",
  langId: 0,
};

const CreateErrorSnippet = ({ id, setLoading, setDataError }) => {
  const [form, setForm] = useState(initialState);
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState("");
  const [snippetPublic, setSnippetPublic] = useState(false);

  const [selectedFolder, setSelectedFolder] = useState(
    initialSelectedFolderValue
  );
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [dataFetched, setDataFetched] = useState(false);

  const { title, description, errorcode, solutioncode, linkHeading, link } =
    form;

  const [lowercaseForm, setLowercaseForm] = useState(initialStateLowercase);

  const [username, setUsername] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [uid, setUid] = useState("");

  const [user] = useAuthState(auth);

  /*   const { id } = useRouter(); */
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLowercaseForm({
      ...lowercaseForm,
      [e?.target.name]: e?.target.value.toLowerCase(),
    });
  };

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
    if (title && errorcode && selectedFolder?.language?.langId) {
      if (!id) {
        try {
          await addDoc(collection(db, "ErrorSnippetsData1"), {
            ...form,
            search: {
              title: lowercaseForm.title,
              description: lowercaseForm.description,
            },
            postedAt: serverTimestamp(),
            userData: {
              username: username,
              usernameValue: usernameValue,
              uid: uid,
              photoURL: photoURL,
            },
            category: selectedCategory,
            folder: selectedFolder,
            tags: tags,
            isPublic: snippetPublic,
            notes: notes,
          });
          router.push("/snips/errors");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await updateDoc(doc(db, "ErrorSnippetsData1", id), {
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
            /*             isPublic: snippetPublic, */
          });
          router.push(`/e/${id}`);
        } catch (error) {
          console.log("Fejl i opdatering af SNIP!", error);
        }
      }
    } else {
      return toast.error("Valg en mappe!");
    }
  };

  const getErrorSnipData = async () => {
    try {
      const docRef = doc(db, "ErrorSnippetsData1", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        //Error SNIP data from {id}
        setForm({ ...snapshot.data() });
        setSelectedCategory(snapshot.data().category);
        setSelectedFolder(snapshot.data().folder);
        setTags(snapshot.data().tags);
        setNotes(snapshot.data().notes);

        setDataError(false);
      }
    } catch (error) {
      console.log("Kan ikke hente fejl SNIP til at opdatere!", error);
      setDataError(true)
      setLoading(false)
    } finally {
      //Error SNIP data have been fetched
      setDataFetched(true);
      setDataError(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getErrorSnipData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 mx-3">
              <div className="w-full flex gap-4 items-center">
                <div className="w-20">
                  <Text>
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
                <div className="w-20">
                  <Text>Beskrivelse</Text>
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

              <div className="w-full">
                <CreatedFolders
                  setSelectedFolder={setSelectedFolder}
                  selectedFolder={selectedFolder}
                  setSelectedCategory={setSelectedCategory}
                  id={id}
                  dataFetched={dataFetched}
                />
              </div>

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
                <Collapse title={<Text b>Fejl forhåndsvisning</Text>}>
                  <SyntaxHighlighter language="javascript" style={oneLight}>
                    {form.errorcode}
                  </SyntaxHighlighter>
                </Collapse>
              </div>

              <div className="mt-1">
                <Text>Løsning kode</Text>
                <Spacer y={0.4} />
                <Textarea
                  placeholder="her..."
                  name="solutioncode"
                  value={solutioncode}
                  onChange={handleChange}
                  css={{ height: "auto" }}
                  size="lg"
                  width="100%"
                  shadow="false"
                  animated="false"
                  aria-label="kode"
                />
              </div>
            </div>

            <Collapse.Group>
              <Collapse title={<Text b>Løsning forhåndsvisning</Text>}>
                <SyntaxHighlighter language="javascript" style={oneLight}>
                  {form.solutioncode}
                </SyntaxHighlighter>
              </Collapse>
              <Collapse title={<Text b>Notat</Text>}>
                <Textarea
                  placeholder="Noter her..."
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
              <Collapse title={<Text b>Link</Text>}>
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
              <Collapse expanded title={<Text b>Tags</Text>}>
                <div className="flex flex-col gap-2">
                  <div className="w-full flex gap-2 items-center">
                    <div className="w-full">
                      <TagsInput
                        value={tags}
                        onChange={setTags}
                        name="tags"
                        placeHolder="Skriv og tryk ENTER"
                      />
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
                    <Link href="/help/tags">
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
              {/*               <div>
                      <Text>Offentlig</Text>
                      <Switch onChange={() => setSnippetPublic(!snippetPublic)} />
                    </div> */}

              <div>
                <Button color="primary" type="submit">
                  Gem
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateErrorSnippet;
