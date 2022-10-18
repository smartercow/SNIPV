import { EditDocumentIcon } from "../../SVG/EditDocumentIcon.js";
import { DeleteDocumentIcon } from "../../SVG/DeleteDocumentIcon.js";
import { deleteSubFolderModalState } from "../../../atoms/deleteSubFolderModalState.js";
import { useSetRecoilState } from "recoil";
import { createErrorFolderModalState } from "../../../atoms/createErrorFolderModalAtom.js";
import { Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { CgChevronDown } from "react-icons/cg";

export default function SubFolderDropdown({ selectedSubFolder }) {
  const setEditOpen = useSetRecoilState(createErrorFolderModalState);
  const setDelOpen = useSetRecoilState(deleteSubFolderModalState);

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
