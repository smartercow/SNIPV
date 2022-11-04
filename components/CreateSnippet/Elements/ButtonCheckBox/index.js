import { Box, ButtonGroup, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { Paper } from "../../../SVG/Paper";
import { DocumentIcon } from "../../../SVG/DocumentIcon";

const ButtonCheckBox = ({ snipMenu, setSnipMenu }) => {
  const handleChange = (type) => {
    setSnipMenu(type);
  };

  const SnipMenu = [
    { type: "snippet", text: "Snippet", icon: { Paper } },
    { type: "file", text: "Fil", icon: { DocumentIcon } },
  ];

  const iconSize = 8;
  return (
    <Box className="flex" w-full>
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
                    as={Paper}
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
  );
};

export default ButtonCheckBox;
