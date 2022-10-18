import { Button, Dropdown, Text } from "@nextui-org/react";
import { EditDocumentIcon } from "../../SVG/EditDocumentIcon.js";
import { DeleteDocumentIcon } from "../../SVG/DeleteDocumentIcon.js";
import { AddNoteIcon } from "../../SVG/AddNoteIcon.js";
import { deleteMainFolderModalState } from "../../../atoms/deleteMainFolderModalState";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createCodeFolderModalState } from "../../../atoms/createCodeFolderModalAtom.js";

export default function MainFolderDropdown({ selectedMainFolder }) {
  const [mainOpen, setMainOpen] = useRecoilState(deleteMainFolderModalState);
  const setOpen = useSetRecoilState(createCodeFolderModalState);

  return (
    <Dropdown>
      <Dropdown.Button auto size="sm" light color="primary">
        {" "}
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
            aria-label="Redigere"
            color="primary"
            b
            size={12}
            transform="uppercase"
            onClick={() =>
              setOpen({ default: true, view: 0, folder: selectedMainFolder })
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
            b
            size={12}
            transform="uppercase"
            onClick={() =>
              setMainOpen({
                default: true,
                id: selectedMainFolder?.mainFolderId,
              })
            }
          >
            Slet mappe
          </Text>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
