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
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text variant="H5">Mappestruktur</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Textarea
              value={folderStructure}
              onChange={(e) => setFolderStructure(e.target.value)}
            />
            <Button
              variant="btnSub"
              mt={2}
              onClick={() => setFolderStructure(folderStructure)}
            >
              Tilføj
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FolderStructure;
