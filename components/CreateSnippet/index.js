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
import { auth, db } from "../../Firebase/clientApp";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { TagsInput } from "react-tag-input-component";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useRecoilState } from "recoil";
import { createFolderModalState } from "../../atoms/createFolderModalAtom";
import CreatedFolders from "./CreatedFolders";

const initialState = {
  title: "",
  description: "",
  code: "",
};

const initialSelectedFolderValue = {
  label: "",
  value: "",
  langId: 0,
};

const CreateSnippet = () => {
  /*   const [open, setOpen] = useRecoilState(createFolderModalState); */
  const [form, setForm] = useState(initialState);
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState("");
  const [snippetPublic, setSnippetPublic] = useState(false);

  const [status, setStatus] = useState("")
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
    if (title && code && selectedCategory) {
      try {
        await addDoc(collection(db, "SnippetsData"), {
          ...form,
          postedAt: serverTimestamp(),
          author: user.displayName,
          userId: user.uid,
          userPhoto: user.photoURL,
          category: selectedCategory,
          folder: selectedFolder,
          tags: tags,
          isPublic: snippetPublic,
          notes: notes
        });
        router.push("/mysnippets");
      } catch (error) {
        console.log(error);
      }
    } else {
      /* return toast.error("All fields are mandatory to fill!"); */
    }
  };
  return (
    <div>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 flex-col md:flex-row md:gap-8 justify-between">
            <div className="w-full">
              <Text>Titel <Text color="error" b>*</Text></Text>
              <Input
                clearable
                underlined
                name="title"
                value={title}
                size="lg"
                onChange={handleChange}
                required
                width="100%"
                aria-label="Titel"
              />
              <Spacer y={1.7} />
              <Text>Beskrivelse</Text>
              <Input
                clearable
                underlined
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
          </div>
          <Spacer y={1.5} />
          <div>
            <Text>Din kode <Text color="error" b>*</Text></Text>
            <Spacer y={0.3} />
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
          <Spacer y={1} />
          <div>
            <Collapse title={<Text b>Kode forhåndsvisning</Text>}>
              <SyntaxHighlighter language="javascript" style={oneLight}>
                {form.code}
              </SyntaxHighlighter>
            </Collapse>
          </div>
          <Collapse title={<Text b>Noter</Text>}>
          <Textarea
              placeholder="Noter her..."
              name="notes"
              onChange={(e) => setNotes(e.target.value) }
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
          <Spacer y={1.5} />
          {/* MODAL OPEN */}
          {/* <Button onClick={() => setOpen(true)}>Open</Button> */}
          <div className="flex justify-between gap-2">
            <div className="w-full">
              <TagsInput
                value={tags}
                onChange={setTags}
                name="tags"
                placeHolder="tags"
              />
            </div>
            <div>
              <Tooltip
                content={"Tags for denne snippet - Tryk ENTER for at tilføj"}
                color="primary"
              >
                <Button color="primary" rounded auto flat>
                  ?
                </Button>
              </Tooltip>
            </div>
          </div>
          <Spacer y={1} />
          <div>
            <Text>Offentlig</Text>
            <Switch onChange={() => setSnippetPublic(!snippetPublic)} />
          </div>
          <Spacer y={1.5} />
          <Button color="gradient" type="submit">
            Gem
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateSnippet;
