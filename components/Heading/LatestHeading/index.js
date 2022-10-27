import { Box, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TbSortDescending } from "react-icons/tb";

const LatestHeading = ({ headingIcon, headingType }) => {
  return (
    <Box
      pt={1}
      px={2}
      pb={1}
      borderBottomWidth={2}
      borderColor="Gray"
      bg="iGray"
      borderTopRadius="md"
    >
      <div className="flex items-center gap-2">
        <Icon as={TbSortDescending} w={6} h={6} color="DarkBlue" />
        <Text variant="H4" textTransform="uppercase" color="DarkBlue">
          {headingType}
        </Text>
      </div>
    </Box>
  );
};

export default LatestHeading;
