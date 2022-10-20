import { Dropdown, Text } from "@nextui-org/react";
import { EditDocumentIcon } from "../../SVG/EditDocumentIcon.js";
import { DeleteDocumentIcon } from "../../SVG/DeleteDocumentIcon.js";
import { deleteSubFolderModalState } from "../../../atoms/deleteSubFolderModalState.js";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createCodeFolderModalState } from "../../../atoms/createCodeFolderModalAtom.js";
import { Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { CgChevronDown } from "react-icons/cg";

export default function SubFolderDropdown({ selectedSubFolder }) {
  const setEditOpen = useSetRecoilState(createCodeFolderModalState);
  const setDelOpen = useRecoilState(deleteSubFolderModalState);

  return (
    <Menu>
      <MenuButton
        px={4}
        py={2}
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        borderTopLeftRadius={0}
        height={10}
        _hover={{ bg: "iGray" }}
        _expanded={{ bg: "PrimaryLighter" }}
        _focus={{ boxShadow: "outline" }}
      >
        <CgChevronDown />
      </MenuButton>
      <MenuList minWidth={0} width="36" p={1} mt={-2}>
        <MenuItem
          onClick={() =>
            setEditOpen({ default: true, view: 1, folder: selectedSubFolder })
          }
        >
          <Icon as={EditDocumentIcon} h={7} w={7} fill="Primary" />
          &nbsp; Redigere
        </MenuItem>
        <MenuItem
          onClick={() =>
            setDelOpen({ default: true, id: selectedSubFolder?.subFolderId })
          }
        >
          <Icon as={DeleteDocumentIcon} h={7} w={7} fill="Red" />
          &nbsp; Slet
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
