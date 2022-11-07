import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

const FolderStructure = ({ folderStructure, setFolderStructure }) => {
  return (
    <div>
      <Accordion allowToggle>
        <AccordionItem border="none">
          <h2>
            <AccordionButton
              bg="iGrayLight"
              borderRadius="md"
              borderTopRadius="none"
              _hover={{ bg: "PrimaryELight" }}
              _expanded={{
                bg: "PrimaryELight",
                borderBottomRadius: "none",
              }}>
              <Box flex="1" textAlign="left">
                <Text variant="H5">Mappestruktur</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} borderWidth={1} borderColor="iGrayLight">
            <Textarea value={folderStructure} onChange={(e) => setFolderStructure(e.target.value)} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FolderStructure;
