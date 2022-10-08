import { Dropdown } from "@nextui-org/react";
import { AddNoteIcon } from "./AddNoteIcon.js"
import { CopyDocumentIcon } from "./CopyDocumentIcon.js"
import { EditDocumentIcon } from "./EditDocumentIcon.js"
import { DeleteDocumentIcon } from "./DeleteDocumentIcon.js"

export default function App() {
  return (
    <Dropdown>
      <Dropdown.Button flat color="secondary">
        Trigger
      </Dropdown.Button>
      <Dropdown.Menu color="secondary" aria-label="Actions">
        <Dropdown.Item
          key="new"
          command="⌘N"
          icon={<AddNoteIcon size={22} fill="var(--nextui-colors-secondary)" />}
        >
          New file
        </Dropdown.Item>
        <Dropdown.Item
          key="copy"
          command="⌘C"
          icon={
            <CopyDocumentIcon size={22} fill="var(--nextui-colors-secondary)" />
          }
        >
          Copy link
        </Dropdown.Item>
        <Dropdown.Item
          key="edit"
          command="⌘⇧E"
          icon={
            <EditDocumentIcon size={22} fill="var(--nextui-colors-secondary)" />
          }
        >
          Edit file
        </Dropdown.Item>
        <Dropdown.Item
          withDivider
          key="delete"
          color="error"
          command="⌘⇧D"
          icon={<DeleteDocumentIcon size={22} fill="currentColor" />}
        >
          Delete file
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}