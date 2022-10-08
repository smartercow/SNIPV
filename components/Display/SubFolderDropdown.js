import { Button, Dropdown, Text } from "@nextui-org/react";
import { EditDocumentIcon } from "../SVG/EditDocumentIcon.js";
import { DeleteDocumentIcon } from "../SVG/DeleteDocumentIcon.js";
import { AddNoteIcon } from "../SVG/AddNoteIcon.js";
import { deleteSubFolderModalState } from "../../atoms/deleteSubFolderModalState.js";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createCodeFolderModalState } from "../../atoms/createCodeFolderModalAtom.js";

export default function SubFolderDropdown({ selectedSubFolder }) {
  const [subOpen, setSubOpen] = useRecoilState(deleteSubFolderModalState);
  const setOpen = useSetRecoilState(createCodeFolderModalState);

  return (
    <Dropdown>
      <Dropdown.Button light size="sm" color="primary">

      </Dropdown.Button>
      <Dropdown.Menu color="primary" aria-label="Actions">
        <Dropdown.Item
          key="edit"
          icon={
            <EditDocumentIcon size={22} fill="var(--nextui-colors-primary)" />
          }
          textValue
        >
          <Text
            aria-label="Slet"
            onClick={() =>
              setOpen({ default: true, view: 1, folder: selectedSubFolder })
            }
          >
            Redigere mappe
          </Text>
        </Dropdown.Item>
        <Dropdown.Item
          withDivider
          key="delete"
          color="error"
          icon={<DeleteDocumentIcon size={22} fill="currentColor" />}
          textValue
        >
          <Text
            aria-label="Slet"
            color="error"
            onClick={() => setSubOpen({ default: true, id: selectedSubFolder.subFolderId })}
          >
            Slet mappe
          </Text>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
