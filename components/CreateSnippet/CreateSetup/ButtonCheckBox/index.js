import {
  Box,
  ButtonGroup,
  Icon,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { FolderIcon } from "../../../SVG/FolderIcon";
import { BsSortNumericDown } from "react-icons/bs";

const ButtonCheckBox = ({
  SnipMenu,
  hasFolderStructure,
  setHasFolderStructure,
  hasNumericTitles,
  setHasNumericTitles,
}) => {
  return (
    <Box>
      {/*       <Box className="w-24 mb-1">
        <Text variant="H5">Type</Text>
      </Box> */}
      <Box className="flex">
        <Box bg="#F6F7F9" borderRadius="md" className="flex-grow w-full">
          <ButtonGroup isAttached variant="outline">
            {SnipMenu.map((spm) => (
              <Tooltip
                label={spm.text}
                key={spm.type}
                hasArrow
                bg="Primary"
                color="white"
              >
                <IconButton
                  bg={
                    (spm.type === "folder" && hasFolderStructure) ||
                    (spm.type === "numeric" && hasNumericTitles)
                      ? "Primary"
                      : "BorderGray"
                  }
                  onClick={() => {
                    spm.type === "folder"
                      ? setHasFolderStructure(!hasFolderStructure)
                      : setHasNumericTitles(!hasNumericTitles);
                  }}
                  _hover="none"
                  icon={
                    <Icon
                      as={
                        spm.type === "folder" ? FolderIcon : BsSortNumericDown
                      }
                      fill={
                        (spm.type === "folder" && hasFolderStructure) ||
                        (spm.type === "numeric" && hasNumericTitles)
                          ? "white"
                          : "Primary"
                      }
                      color="red"
                      height={spm.size}
                      width={spm.size}
                    />
                  }
                />
              </Tooltip>
            ))}
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default ButtonCheckBox;
