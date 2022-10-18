import { Dropdown, Text } from "@nextui-org/react";
import { EditDocumentIcon } from "../../SVG/EditDocumentIcon.js";
import { DeleteDocumentIcon } from "../../SVG/DeleteDocumentIcon.js";
import { deleteSubFolderModalState } from "../../../atoms/deleteSubFolderModalState.js";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createCodeFolderModalState } from "../../../atoms/createCodeFolderModalAtom.js";

export default function SubFolderDropdown({ selectedSubFolder }) {
  const setEditOpen = useSetRecoilState(createCodeFolderModalState);
  const setDelOpen = useRecoilState(deleteSubFolderModalState);

  return (
    <Dropdown>
      <Dropdown.Button auto light size="sm" color="primary">
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
            aria-label="Slet"
            color="primary"
            b
            size={12}
            transform="uppercase"
            onClick={() =>
              setEditOpen({ default: true, view: 1, folder: selectedSubFolder })
            }
          >
            Redigere
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
              setDelOpen({ default: true, id: selectedSubFolder?.subFolderId })
            }
          >
            Slet
          </Text>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
