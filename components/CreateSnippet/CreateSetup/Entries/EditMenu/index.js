import {
  ArrowDownIcon,
  ArrowUpIcon,
  CloseIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { Box, ButtonGroup, IconButton, Text } from "@chakra-ui/react";
import React from "react";

const EditMenu = ({
  editState,
  editId,
  index,
  entry,
  moveUp,
  moveDown,
  EditEntry,
  DeleteEntry,
  entryType,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-none">
        <ButtonGroup size="sm" isAttached variant="outline">
          <IconButton
            aria-label="Up"
            borderBottomRadius="outline"
            borderBottom="none"
            onClick={() => moveUp(index)}
            icon={<ArrowUpIcon height={5} width={5} color="gray.500" />}
          />
          <IconButton
            aria-label="Down"
            borderBottom="none"
            onClick={() => moveDown(index)}
            icon={<ArrowDownIcon height={5} width={5} color="gray.500" />}
          />
          <IconButton
            aria-label="Edit"
            borderBottom="none"
            onClick={() => EditEntry(entry)}
            icon={<EditIcon height={4} width={4} color="Primary" />}
          />
          <IconButton
            aria-label="Delete"
            borderBottomRadius="none"
            borderBottom="none"
            disabled={editState && editId === entry.entryId ? true : false}
            onClick={() => DeleteEntry(entry)}
            icon={<CloseIcon height={3} width={3} color="Red" />}
          />
        </ButtonGroup>
      </div>
      {entryType && (
        <Box className="flex-grow">
          <Text fontSize={14} fontWeight="semibold" textTransform="uppercase">
            {entryType}
          </Text>
        </Box>
      )}
    </div>
  );
};

export default EditMenu;
