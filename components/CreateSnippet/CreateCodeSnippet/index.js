import React, { useEffect, useMemo, useState } from "react";
import {
  Input,
  Spacer,
  Textarea,
  Button,
  Collapse,
  Text,
  Tooltip,
  Switch,
} from "@nextui-org/react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../Firebase/clientApp";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { TagsInput } from "react-tag-input-component";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import CreatedFolders from "./CreatedFolders";
import { BsQuestionCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  code: "",
  linkHeading: "",
  link: "",
};

const initialSelectedFolderValue = {
  label: "",
  value: "",
  langId: 0,
};

const CreateCodeSnippet = () => {
  const [form, setForm] = useState(initialState);
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState("");
  const [snippetPublic, setSnippetPublic] = useState(false);

  const [userData, setUserData] = useState([]);

  const [selectedFolder, setSelectedFolder] = useState(
    initialSelectedFolderValue
  );
  const [selectedCategory, setSelectedCategory] = useState([]);

  const { title, description, code, linkHeading, link } = form;

  const [user] = useAuthState(auth);

  /*   const { id } = useRouter(); */
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getUser = async () => {
    try {
      const userDocRef = doc(db, "UsersData1", user.uid);

      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userDocRef);

        if (userDoc.exists()) {
          const User = await getDoc(userDocRef);

          setUserData(User.data());
          console.log("USERDATA", userData);
        }
      });
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && code && selectedFolder?.language?.langId) {
      try {
        await addDoc(collection(db, "CodeSnippetsData1"), {
          ...form,
          postedAt: serverTimestamp(),
          userData: userData,
          category: selectedCategory,
          folder: selectedFolder,
          tags: tags,
          isPublic: snippetPublic,
          notes: notes,
        });
        router.push("/mysnippets/codes");
      } catch (error) {
        console.log(error);
      }
    } else {
      return toast.error("Valg en mappe!");
    }
  };

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
                />
              </div>

              <div className="mt-1">
                <Text>
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
            </div>
            <Collapse.Group>
              <Collapse title={<Text b>Kode forhåndsvisning</Text>}>
                <SyntaxHighlighter language="javascript" style={oneLight}>
                  {form.code}
                </SyntaxHighlighter>
              </Collapse>
              <Collapse title={<Text b>Notat</Text>}>
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
              <Collapse title={<Text b>Tags</Text>}>
                <div className="flex justify-between gap-2 items-center">
                  <div className="w-full">
                    <TagsInput
                      value={tags}
                      onChange={setTags}
                      name="tags"
                      placeHolder="Skriv og tryk enter"
                    />
                  </div>
                  <div className="">
                    <Tooltip
                      content={
                        "Tags for denne snippet - Tryk ENTER for at tilføj"
                      }
                      color="primary"
                      css={{ zIndex: 9999 }}
                    >
                      <Text h5 color="primary">
                        <BsQuestionCircleFill />
                      </Text>
                    </Tooltip>
                  </div>
                </div>
              </Collapse>
            </Collapse.Group>

            <div className="mx-3 flex flex-col gap-5">
              <div className="">
                <p>Offentlig</p>
                <Switch onChange={() => setSnippetPublic(!snippetPublic)} />
              </div>

              <div>
                <Button color="gradient" type="submit">
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

export default CreateCodeSnippet;
