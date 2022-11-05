import {
  Box,
  ButtonGroup,
  Icon,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { Paper } from "../../../SVG/Paper";
import { DocumentIcon } from "../../../SVG/DocumentIcon";

const ButtonCheckBox = ({ SnipMenu, snipMenu, setSnipMenu }) => {
  const handleChange = (type) => {
    setSnipMenu(type);
  };

  const iconSize = 8;
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
                  bg={snipMenu === spm.type ? "Primary" : "BorderGray"}
                  onClick={() => handleChange(spm.type)}
                  _hover="none"
                  icon={
                    <Icon
                      as={spm.icon === "paper" ? Paper : DocumentIcon}
                      fill={snipMenu === spm.type ? "white" : "Primary"}
                      height={iconSize}
                      width={iconSize}
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
