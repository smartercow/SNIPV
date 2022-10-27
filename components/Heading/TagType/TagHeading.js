import { Box, Divider, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TicketStar } from "../../SVG/TicketStar";

const TagHeading = ({ headingType, headingColor }) => {
  return (
    <Box
      mb={2}
      px={2}
      pt={1}
      pb={1}
      borderBottomWidth={2}
      borderColor="Gray"
      bg="iGray"
      borderTopRadius="md"
      className="min-w-[300px]"
    >
      <div className="flex gap-2 items-center">
        <Icon as={TicketStar} fill="DarkBlue" h={7} w={7} />
        <Text variant="H4" textTransform="uppercase" color={headingColor}>
          {headingType}
        </Text>
      </div>
    </Box>
  );
};

export default TagHeading;
