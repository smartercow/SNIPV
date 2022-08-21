import React, { useMemo, useState } from "react";
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
};

const initialSelectedFolderValue = {
  label: "",
  value: "this",
  langId: 0,
};

const CreateCodeSnippet = () => {
  const [form, setForm] = useState(initialState);
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState("");
  const [snippetPublic, setSnippetPublic] = useState(false);

  const [selectedFolder, setSelectedFolder] = useState(
    initialSelectedFolderValue
  );
  const [selectedCategory, setSelectedCategory] = useState([]);

  const { title, description, code } = form;

  const [user] = useAuthState(auth);

  /*   const { id } = useRouter(); */
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && code && selectedFolder?.language?.langId) {
      try {
        await addDoc(collection(db, "CodeSnippetsData1"), {
          ...form,
          postedAt: serverTimestamp(),
          author: user.displayName,
          userId: user.uid,
          userPhoto: user.photoURL,
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

            <div>
              <Collapse title={<Text b>Kode forhåndsvisning</Text>}>
                <SyntaxHighlighter language="javascript" style={oneLight}>
                  {form.code}
                </SyntaxHighlighter>
              </Collapse>
            </div>

            <div>
              <Collapse title={<Text b>Noter</Text>}>
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
                />
              </Collapse>
            </div>

            <div className="flex justify-between gap-2 items-center">
              <div className="w-full">
                <TagsInput
                  value={tags}
                  onChange={setTags}
                  name="tags"
                  placeHolder="tags"
                />
              </div>
              <div className="">
                <Tooltip
                  content={"Tags for denne snippet - Tryk ENTER for at tilføj"}
                  color="primary"
                  css={{ zIndex: 9999 }}
                >
                  <Text h5 color="primary">
                    <BsQuestionCircleFill />
                  </Text>
                </Tooltip>
              </div>
            </div>

            <div>
              <Text>Offentlig</Text>
              <Switch onChange={() => setSnippetPublic(!snippetPublic)} />
            </div>

            <div>
              <Button color="gradient" type="submit">
                Gem
              </Button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCodeSnippet;
