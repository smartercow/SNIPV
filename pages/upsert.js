import React, { useMemo, useState } from "react";
import { Input, Spacer, Textarea, Button, Dropdown } from "@nextui-org/react";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../Firebase/clientApp";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { TagsInput } from "react-tag-input-component";

const initialState = {
  title: "",
  description: "",
  snippet: "",
};

const Upsert = () => {
  const [selectedCat, setSelectedCat] = React.useState(new Set(["next"]));

  const selectedCategory = useMemo(
    () => Array.from(selectedCat).join(", ").replaceAll("_", " "),
    [selectedCat]
  );

  const [form, setForm] = useState(initialState);

    const [tags, setTags] = useState([])
  const [user] = useAuthState(auth);

  const { title, description, snippet } = form;

  const { id } = useRouter();

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description && snippet) {
      try {
        await addDoc(collection(db, "Snippets"), {
          ...form,
          timestamp: serverTimestamp(),
          author: user.displayName,
          userId: user.uid,
          category: selectedCategory,
          tags: tags
        });
        /* toast.success("Snippet created successfully"); */
      } catch (error) {
        console.log(error);
      }
    } else {
      /* return toast.error("All fields are mandatory to fill!"); */
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            clearable
            underlined
            labelPlaceholder="Titel *"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
          <Spacer y={1.5} />
          <Input
            clearable
            underlined
            labelPlaceholder="Beskrivelse"
            name="description"
            value={description}
            onChange={handleChange}
          />
          <Spacer y={1.5} />
          <Textarea
            label="Din kode"
            placeholder="her..."
            name="snippet"
            value={snippet}
            onChange={handleChange}
            css={{height: "auto", }}
            size="xl"
            cacheMeasurements
          />
          <Spacer y={1.5} />
          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
              {selectedCategory}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedCat}
              onSelectionChange={setSelectedCat}
            >
              <Dropdown.Item key="next">Next</Dropdown.Item>
              <Dropdown.Item key="react">React</Dropdown.Item>
              <Dropdown.Item key="html">HTML</Dropdown.Item>
              <Dropdown.Item key="css">CSS</Dropdown.Item>
              <Dropdown.Item key="javascript">Javascript</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Spacer y={1.5} />
          <TagsInput
            value={tags}
            onChange={setTags}
            name="tags"
            placeHolder="tags"
          />
          <Spacer y={1.5} />
          <Button color="gradient" type="submit">
            Gem
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Upsert;
